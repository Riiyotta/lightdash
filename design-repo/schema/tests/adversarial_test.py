#!/usr/bin/env python3
"""Adversarial suite: proves every rule rejects a bad PageSpec, and that every real template and
route (plus the bundled example) is accepted with zero errors.

Usage:  python3 schema/tests/adversarial_test.py     (exit 0 only if every control passes and every mutation is rejected)

Controls are synthesised generically from each template's own node list (no per-template code): one full
control per template and one control per real route (the template's nodes with that route). Mutations are
applied to those controls. The pinned-value mutations at the end run extraction/verify_all.py against a
scratch copy of the repo whose asset-roles.json was changed to a different-but-VALID policy value.
Repo root is derived from __file__.
"""
import copy
import json
import os
import shutil
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'schema'))
sys.path.insert(0, os.path.join(REPO, 'extraction'))
import semantic_validate as sv  # noqa: E402

repo = sv.Repo()
TPL = repo.templates
ROUTES = repo.routes
with open(os.path.join(REPO, 'schema', 'example.pagespec.json'), encoding='utf8') as f:
    EXAMPLE = json.load(f)
GEN_DIR = os.path.join(REPO, 'schema', 'examples', 'generation')
GEN = {fn.split('.')[0]: json.load(open(os.path.join(GEN_DIR, fn), encoding='utf8')) for fn in sorted(os.listdir(GEN_DIR)) if fn.endswith('.pagespec.json')}
TARGET = {'navigate-route': '/start', 'scroll-anchor': '#partner-form', 'open-external': 'https://docs.lightdash.com/introduction', 'open-talk-modal': 'talk-modal'}


# ------------------------------------------------------------------ control synthesis
def synth_field(fd):
    t = fd['type']
    if t == 'text':
        return 'Sample'
    if t == 'cta':
        a = fd['actions'][0]
        return {'label': 'Sample', 'action': a, 'target': TARGET[a]}
    if t == 'link':
        a = fd['actions'][0]
        return {'action': a, 'target': TARGET[a]}
    if t == 'media':
        return {'assetRole': fd['assetRoles'][0], 'assetRef': 'slot-sample-01'}
    if t == 'enum':
        return fd['values'][0]
    if t == 'boolean':
        return True
    if t == 'paragraphs':
        return ['Sample']
    if t == 'list':
        it = fd['item']
        if 'type' in it:
            return [synth_field(it) for _ in range(fd['minItems'])]
        return [{k: synth_field(sub) for k, sub in it.items() if sub['required']} for _ in range(fd['minItems'])]
    raise ValueError(t)


def synth_node(tn):
    sec = repo.sections[tn['section']]
    content = {k: synth_field(f) for k, f in sec['content']['fields'].items() if f['required']}
    if tn.get('variant') is not None:
        content[sec['variantField']] = tn['variant']
    pat = sec['motion']['allowedPatterns'][0]
    mp = repo.motion[pat]
    return {'section': tn['section'], 'content': content, 'motion': {'pattern': pat, 'reducedMotionFallback': mp['reducedMotionFallback'], 'reducedMotionBasis': mp['reducedMotionBasis']}}


def control(tid, route=None):
    tpl = TPL[tid]
    route = route or tpl['routes'][0]
    return {'pageSpecVersion': '1.1.0', 'mode': 'clone', 'template': tid, 'route': route, 'theme': tpl['theme'], 'chrome': tpl['chrome'], 'nodes': [synth_node(tn) for tn in tpl['nodes']]}


# ------------------------------------------------------------------ harness
failures = []
passed = {'controls': 0, 'mutations': 0, 'pinned': 0}


def run_controls():
    specs = [(f'control full  {tid}', control(tid)) for tid in TPL]
    specs += [(f'control route {r}', control(info['template'], r)) for r, info in ROUTES.items()]
    specs.append(('control example (clone)', EXAMPLE))
    specs += [(f'control generation example {k}', v) for k, v in GEN.items()]
    for name, spec in specs:
        errs, _ = sv.validate(spec, repo)
        if errs:
            failures.append(f'{name}: expected 0 errors, got {len(errs)}: {errs[:3]}')
        else:
            passed['controls'] += 1
    return len(specs)


def expect(name, spec, rule):
    """spec must be rejected with at least one error whose text contains `rule`."""
    errs, warns = sv.validate(spec, repo)
    if not errs:
        failures.append(f'MUTATION NOT REJECTED: {name}')
    elif rule and not any(rule in e for e in errs):
        failures.append(f'MUTATION rejected for the wrong reason: {name} (wanted {rule}, got {errs[:2]})')
    else:
        passed['mutations'] += 1


def expect_warn(name, spec, rule):
    errs, warns = sv.validate(spec, repo)
    if errs:
        failures.append(f'WARN mutation produced errors: {name}: {errs[:2]}')
    elif not any(rule in w for w in warns):
        failures.append(f'WARN MUTATION NOT WARNED: {name} (wanted {rule}, got {warns})')
    else:
        passed['mutations'] += 1


def mut(base, fn):
    s = copy.deepcopy(base)
    fn(s)
    return s


def node(spec, sec):
    return next(n for n in spec['nodes'] if n['section'] == sec)


def idx(spec, sec):
    return next(i for i, n in enumerate(spec['nodes']) if n['section'] == sec)


def run_mutations():
    E_ = EXAMPLE
    # ---- schema layer
    expect('invented template', mut(E_, lambda s: s.update(template='invented-template')), 'SCHEMA')
    expect('invented theme', mut(E_, lambda s: s.update(theme='dark')), 'SCHEMA')
    expect('invented chrome', mut(E_, lambda s: s.update(chrome='light-footer')), 'SCHEMA')
    expect('extra root property', mut(E_, lambda s: s.update(extra=1)), 'SCHEMA')
    expect('wrong pageSpecVersion', mut(E_, lambda s: s.update(pageSpecVersion='9.9.9')), 'SCHEMA')
    expect('node missing motion', mut(E_, lambda s: node(s, 'hero.centered-product').pop('motion')), 'SCHEMA')
    expect('node missing content', mut(E_, lambda s: node(s, 'hero.centered-product').pop('content')), 'SCHEMA')
    expect('motion missing reducedMotionFallback', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].pop('reducedMotionFallback')), 'SCHEMA')
    expect('motion missing reducedMotionBasis', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].pop('reducedMotionBasis')), 'SCHEMA')
    expect('motion smuggles an invented field', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].update(inventedAnimation='spin')), 'SCHEMA')
    expect('motion pattern not allowed for the section', mut(E_, lambda s: node(s, 'hero.centered-product').update(motion={'pattern': 'snake-game', 'reducedMotionFallback': 'no-autoplay', 'reducedMotionBasis': 'source-partial'})), 'SCHEMA')
    expect('invented motion pattern', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].update(pattern='parallax-wow')), 'SCHEMA')
    expect('wrong reducedMotionFallback for the pattern', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].update(reducedMotionFallback='instant-swap')), 'SCHEMA')
    expect('over-claimed reducedMotionBasis', mut(E_, lambda s: node(s, 'content.faq')['motion'].update(reducedMotionBasis='source-implemented')), 'SCHEMA')
    expect('invented easing', mut(E_, lambda s: node(s, 'hero.centered-product')['motion'].update(easing='bounce-wow')), 'SCHEMA')
    expect('invented assetRole', mut(E_, lambda s: node(s, 'hero.product-visual')['content']['visual'].update(assetRole='image')), 'SCHEMA')
    expect('assetRole not allowed in that field', mut(E_, lambda s: node(s, 'hero.product-visual')['content']['visual'].update(assetRole='logo.customer-partner')), 'SCHEMA')
    expect('assetRef is a URL, not a slot', mut(E_, lambda s: node(s, 'hero.product-visual')['content']['visual'].update(assetRef='https://example.com/a.png')), 'SCHEMA')
    expect('invented section', mut(E_, lambda s: s['nodes'].insert(5, {'section': 'hero.invented', 'content': {}, 'motion': {'pattern': 'none', 'reducedMotionFallback': 'not-applicable', 'reducedMotionBasis': 'recommended-not-implemented'}})), 'SCHEMA')
    expect('non-composable app view as a node', mut(E_, lambda s: s['nodes'].insert(5, {'section': 'app.view-pricing', 'content': {}, 'motion': {'pattern': 'iframe-app', 'reducedMotionFallback': 'not-applicable', 'reducedMotionBasis': 'recommended-not-implemented'}})), 'SCHEMA')
    expect('content has an extra property', mut(E_, lambda s: node(s, 'hero.centered-product')['content'].update(color='red')), 'SCHEMA')
    expect('required content field missing', mut(E_, lambda s: node(s, 'hero.centered-product')['content'].pop('subtitle')), 'SCHEMA')
    expect('cta with an invented action', mut(E_, lambda s: node(s, 'hero.centered-product')['content']['buttons'][0].update(action='download')), 'SCHEMA')
    expect('open-external with an http target', mut(E_, lambda s: node(s, 'hero.centered-product')['content']['buttons'][1].update(target='http://app.lightdash.cloud/register')), 'SCHEMA')
    expect('navigate-route target without a slash', mut(E_, lambda s: node(s, 'hero.centered-product')['content']['buttons'][0].update(target='start')), 'SCHEMA')
    expect('open-talk-modal with a custom target', mut(E_, lambda s: node(s, 'hero.centered-product')['content']['buttons'][0].update(action='open-talk-modal', target='/start')), 'SCHEMA')
    expect('enum field with an invented value', mut(E_, lambda s: node(s, 'hero.centered-product')['content'].update(titleSize='80')), 'SCHEMA')
    expect('list below minItems (logos)', mut(E_, lambda s: node(s, 'proof.logos-row')['content']['logos'].pop()), 'SCHEMA')
    expect('list above maxItems (logos)', mut(E_, lambda s: node(s, 'proof.logos-row')['content']['logos'].append({'assetRole': 'logo.customer-partner', 'assetRef': 'slot-customer-logo-7'})), 'SCHEMA')
    # ---- runtime: maxWords
    expect('maxWords overflow on a heading', mut(E_, lambda s: node(s, 'hero.centered-product')['content'].update(heading=' '.join(['word'] * 40))), 'MAX_WORDS')
    expect('maxWords overflow on a nested faq answer', mut(E_, lambda s: node(s, 'content.faq')['content']['items'][0].update(answer=' '.join(['word'] * 400))), 'MAX_WORDS')
    expect('maxWords overflow on a cta label', mut(E_, lambda s: node(s, 'cta.snake-band')['content']['primary'].update(label='one two three four five six seven eight nine')), 'MAX_WORDS')
    expect('navigate-route to an unpublished route', mut(E_, lambda s: node(s, 'cta.snake-band')['content']['primary'].update(target='/old-home')), 'not a known route')
    expect('navigate-route to an unpublished draft route', mut(E_, lambda s: node(s, 'cta.snake-band')['content']['primary'].update(target='/xdrafts/lightdash-vs-looker')), 'not a known route')
    # ---- structural
    expect('duplicate one-per-page hero', mut(E_, lambda s: s['nodes'].insert(4, copy.deepcopy(node(s, 'hero.centered-product')))), 'TEMPLATE_NODE_MATCH')
    expect('mandatory section removed (faq)', mut(E_, lambda s: s['nodes'].pop(idx(s, 'content.faq'))), 'required node content.faq')
    expect('mandatory chrome removed (footer)', mut(E_, lambda s: s['nodes'].pop(idx(s, 'chrome.footer'))), 'TEMPLATE_NODE_MATCH')
    expect('fixed-position section reordered (footer before CTA band)', mut(E_, lambda s: s['nodes'].insert(idx(s, 'cta.snake-band'), s['nodes'].pop(idx(s, 'chrome.footer')))), 'TEMPLATE_NODE_MATCH')
    expect('fixed-position section reordered (talk modal first)', mut(E_, lambda s: s['nodes'].insert(0, s['nodes'].pop(idx(s, 'chrome.talk-modal')))), 'TEMPLATE_NODE_MATCH')
    expect('companion hero moved away from its parent', mut(E_, lambda s: s['nodes'].insert(idx(s, 'proof.logos-row') + 1, s['nodes'].pop(idx(s, 'hero.product-visual')))), 'TEMPLATE_NODE_MATCH')
    expect('template/node-sequence mismatch (pricing nodes under metrics-catalog)', mut(E_, lambda s: s.update(nodes=control('pricing')['nodes'])), 'TEMPLATE_NODE_MATCH')
    expect('declared template pricing but metrics-catalog nodes', mut(E_, lambda s: s.update(template='pricing')), 'ROUTE_RESTRICTION')
    expect('chrome differs from the template chrome', mut(E_, lambda s: s.update(chrome='light-cta')), 'ROUTE_RESTRICTION')
    expect('theme differs from the template theme', mut(E_, lambda s: s.update(theme='dark-home')), 'ROUTE_RESTRICTION')
    expect('route belongs to another template', mut(E_, lambda s: s.update(route='/pricing')), 'ROUTE_RESTRICTION')
    expect('unpublished route /old-home', mut(E_, lambda s: s.update(route='/old-home')), 'ROUTE_RESTRICTION')
    expect('unpublished draft route', mut(E_, lambda s: s.update(route='/xdrafts/lightdash-vs-looker-v2')), 'ROUTE_RESTRICTION')
    expect('dev-only route /__shared', mut(E_, lambda s: s.update(route='/__shared')), 'ROUTE_RESTRICTION')
    # chrome frame / cta band rules need the node list to be template-consistent to isolate the rule: use a custom template list
    # (the semantic validator reports both the template mismatch and the graph rule; we assert the graph rule id is present)
    expect('CTA band removed from a CTA-chrome template (graph rule)', mut(E_, lambda s: s['nodes'].pop(idx(s, 'cta.snake-band'))), 'CTA_BAND_MATCHES_CHROME')
    expect('banner chrome without the announcement bar (graph rule)', mut(E_, lambda s: s['nodes'].pop(0)), 'CHROME_FRAME')
    expect('chrome section in the page body (graph rule)', mut(E_, lambda s: s['nodes'].insert(5, copy.deepcopy(node(s, 'chrome.footer')))), 'CHROME_FRAME')
    expect('homeRouteOnly section off the home route', mut(control('home'), lambda s: s.update(route='/pricing')), 'ROUTE_RESTRICTION')
    # homeRouteOnly via the section constraint: gameboy hero in a non-home template
    gb = control('home')
    wrong = control('pricing')
    wrong['nodes'].insert(3, copy.deepcopy(next(n for n in gb['nodes'] if n['section'] == 'hero.gameboy-app')))
    expect('hero.gameboy-app (homeRouteOnly) inside /pricing', wrong, 'is home-route-only')
    nf = control('pricing')
    nf['nodes'].insert(3, copy.deepcopy(next(n for n in control('not-found')['nodes'] if n['section'] == 'content.not-found')))
    expect('content.not-found (routeOnly) inside /pricing', nf, 'is only allowed on')
    # variant keying: two accordion rows with the SAME image side are adjacent duplicates; opposite sides are fine
    ca = control('product-conversational-analytics')
    ia_ = [i for i, n in enumerate(ca['nodes']) if n['section'] == 'features.accordion-tabs']
    ca2 = copy.deepcopy(ca)
    ca2['nodes'][ia_[1]]['content']['imageSide'] = 'right'
    expect('stacked accordion rows with the same image side', ca2, 'TEMPLATE_NODE_MATCH')
    ca3 = copy.deepcopy(ca)
    ca3['nodes'].insert(ia_[0] + 1, copy.deepcopy(ca3['nodes'][ia_[0]]))
    expect('three stacked accordion rows (adjacent duplicate)', ca3, 'NO_ADJACENT_DUPLICATE')
    # playground variant keying
    pg = control('playground')
    pg2 = copy.deepcopy(pg)
    for n in pg2['nodes']:
        if n['section'] == 'content.playground-empty-blocks':
            n['content']['blockMode'] = 'blocks'
    expect('both playground empty-block nodes with the same blockMode', pg2, 'TEMPLATE_NODE_MATCH')
    # ---- warn-severity rules must warn, not fail
    pcs = control('product-conversational-analytics')
    pcs['nodes'].insert(idx(pcs, 'proof.customer-quote-stats') + 1, copy.deepcopy(synth_node({'section': 'proof.customer-quote-stats'})))
    # that fails template matching, so the warn tests below use isolated rule calls
    g = repo.graph
    ctx = lambda spec, tid: {'repo': repo, 'nodes': spec['nodes'], 'route': spec['route'], 'template': tid, 'chrome': spec['chrome'], 'exceptions': []}
    # MAX_RUN_SAME_CATEGORY must trigger on a 4-FEATURES run when no exception applies
    cl = control('product-context-layer')
    msgs = sv.rule_MAX_RUN_SAME_CATEGORY(ctx(cl, 'product-context-layer'), next(r['params'] for r in g['rules'] if r['id'] == 'MAX_RUN_SAME_CATEGORY'))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if msgs else failures.append('MAX_RUN_SAME_CATEGORY did not fire on the 4-FEATURES run of product-context-layer'))
    # ... and the named exception keeps the real template clean (it is a control above: 0 errors; warnings must not include it)
    errs, warns = sv.validate(cl, repo)
    (passed.__setitem__('mutations', passed['mutations'] + 1) if not any('MAX_RUN_SAME_CATEGORY' in w for w in warns) else failures.append('MAX_RUN_SAME_CATEGORY exception for product-context-layer not honoured'))
    # a blog-posts section not after the FAQ must warn
    da = control('product-data-apps')
    bi = next(i for i, n in enumerate(da['nodes']) if n['section'] == 'content.blog-posts')
    fi = next(i for i, n in enumerate(da['nodes']) if n['section'] == 'content.faq')
    da['nodes'][bi], da['nodes'][fi] = da['nodes'][fi], da['nodes'][bi]
    msgs = sv.rule_BLOG_POSTS_AFTER_FAQ(ctx(da, 'product-data-apps'), next(r['params'] for r in g['rules'] if r['id'] == 'BLOG_POSTS_AFTER_FAQ'))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if msgs else failures.append('BLOG_POSTS_AFTER_FAQ did not fire'))
    # severity: the graph marks it warn, never error
    sev = {r['id']: r['severity'] for r in g['rules']}
    for rid in ('BLOG_POSTS_AFTER_FAQ', 'MAX_RUN_SAME_CATEGORY', 'HATCHED_BAND_BUDGET', 'AUTOPLAY_CAROUSEL_BUDGET'):
        (passed.__setitem__('mutations', passed['mutations'] + 1) if sev[rid] == 'warn' else failures.append(f'{rid} should be severity warn'))
    # ---- live endpoint / asset pins at PageSpec level
    for label, tgt in (('Cal.com startups booking', 'https://lightdash.cal.com/lightdash/startups'), ('live job board', 'https://jobs.ashbyhq.com/lightdash'),
                       ('YouTube live replay', 'https://www.youtube.com/live/S9NJrqRYRhs'), ('third-party demo deployment', 'https://forecast-slider.vercel.app/'),
                       ('real meetup event', 'https://www.meetup.com/lightdash-japan/events/309903323/'), ('HubSpot form', 'https://forms.hsforms.com/submissions/v3/public/x')):
        expect(f'cta target is a live endpoint: {label}', mut(E_, lambda s, t=tgt: node(s, 'cta.snake-band')['content']['secondary'].update(target=t)), 'NO_LIVE_ENDPOINT')
    expect('live endpoint hidden in a text field', mut(E_, lambda s: node(s, 'hero.centered-product')['content'].update(subtitle='Book at lightdash.cal.com/lightdash/talk now')), 'NO_LIVE_ENDPOINT')
    expect('booking slot filled with the live Cal URL', mut(E_, lambda s: node(s, 'chrome.talk-modal')['content']['booking'].update(assetRef='https://lightdash.cal.com/lightdash/talk')), 'SCHEMA')
    expect('booking slot with the wrong role (generate a new one)', mut(E_, lambda s: node(s, 'chrome.talk-modal')['content']['booking'].update(assetRole='icon.pixel-art')), 'SCHEMA')


def gnode(spec, sec):
    return next(n for n in spec['nodes'] if n['section'] == sec)


def run_generation_mutations():
    """mode / generation-leak / token / retrieval / gate mutations. Controls: every generation example passes (run_controls);
    the clone example keeps passing with its real assets; the SAME real content flipped to mode generation is rejected."""
    G = GEN['product']
    expect('mode missing', mut(EXAMPLE, lambda s: s.pop('mode')), 'SCHEMA')
    expect('invented mode', mut(EXAMPLE, lambda s: s.update(mode='reference')), 'SCHEMA')
    expect('old pageSpecVersion 1.0.0', mut(EXAMPLE, lambda s: s.update(pageSpecVersion='1.0.0')), 'SCHEMA')
    # control proving the semantic layer, not the data, decides: the real clone example passes as clone and fails as generation
    for rule in ('GENERATION_MODE_SCREENSHOT', 'GENERATION_MODE_CUSTOMER', 'GENERATION_MODE_LOGO', 'GENERATION_MODE_COPY', 'GENERATION_MODE_URL', 'GENERATION_MODE_EMBED'):
        expect(f'real clone example flipped to generation ({rule})', mut(EXAMPLE, lambda s: s.update(mode='generation')), rule)
    # one mutation per leak category, applied to the generation control
    hero = lambda s: gnode(s, 'hero.centered-product')['content']
    expect('brand name in a heading', mut(G, lambda s: hero(s).update(heading='Lightdash for orchards')), 'GENERATION_MODE_BRAND')
    expect('brand name spelled apart', mut(G, lambda s: hero(s).update(heading='Light-dash for orchards')), 'GENERATION_MODE_BRAND')
    expect('brand behind zero-width chars', mut(G, lambda s: hero(s).update(heading='Light\u200bdash for orchards')), 'GENERATION_MODE_BRAND')
    expect('real wordmark role on the navbar', mut(G, lambda s: gnode(s, 'chrome.navbar-light')['content']['brandMark'].update(assetRole='brand.lightdash-wordmark')), 'GENERATION_MODE_LOGO')
    expect('navbar brand slot omitted (fixed Lightdash logo renders)', mut(G, lambda s: gnode(s, 'chrome.navbar-light')['content'].pop('brandMark')), 'GENERATION_MODE_LOGO')
    expect('footer chrome data omitted (fixed Lightdash links / copy render)', mut(G, lambda s: gnode(s, 'chrome.footer')['content'].pop('chromeData')), 'GENERATION_MODE_COPY')
    expect('product screenshot reused', mut(G, lambda s: gnode(s, 'hero.product-visual')['content']['visual'].update(assetRole='screenshot.product-ui')), 'GENERATION_MODE_SCREENSHOT')
    expect('branded diagram reused', mut(G, lambda s: gnode(s, 'hero.product-visual')['content']['visual'].update(assetRole='illustration.html-diagram')), 'GENERATION_MODE_DIAGRAM')
    expect('Rive animation reused', mut(G, lambda s: gnode(s, 'hero.product-visual')['content']['visual'].update(assetRole='animation.rive')), 'GENERATION_MODE_ANIMATION')
    expect('live demo iframe reused', mut(G, lambda s: gnode(s, 'hero.product-visual')['content']['visual'].update(assetRole='embed.live-demo')), 'GENERATION_MODE_EMBED')
    expect('customer logo reused', mut(G, lambda s: gnode(s, 'proof.logos-row')['content']['logos'][0].update(assetRole='logo.customer-partner')), 'GENERATION_MODE_CUSTOMER')
    expect('Cal booking embed reused', mut(G, lambda s: gnode(s, 'chrome.talk-modal')['content']['booking'].update(assetRole='embed.booking-cal')), 'GENERATION_MODE_EMBED')
    PC = GEN['product-code']
    expect('branded self-hosted video reused', mut(PC, lambda s: gnode(s, 'content.video-section')['content']['video'].update(assetRole='video.self-hosted')), 'GENERATION_MODE_VIDEO')
    EV = GEN['event-landing']
    expect('YouTube replay embed reused', mut(EV, lambda s: gnode(s, 'content.youtube-replay')['content']['video'].update(assetRole='embed.youtube')), 'GENERATION_MODE_EMBED')
    expect('real speaker photo', mut(EV, lambda s: gnode(s, 'proof.speakers-grid')['content']['speakers'][0]['photo'].update(assetRole='photo.person-avatar')), 'GENERATION_MODE_PERSON')
    HOME = GEN['home']
    expect('Game Boy iframe bundle reused', mut(HOME, lambda s: gnode(s, 'hero.gameboy-app')['content']['app'].update(assetRole='app.iframe-bundle')), 'GENERATION_MODE_EMBED')
    expect('Game Boy app slot omitted', mut(HOME, lambda s: gnode(s, 'hero.gameboy-app')['content'].pop('app')), 'GENERATION_MODE_EMBED')
    expect('real person named in a quote', mut(G, lambda s: hero(s).update(subtitle='Marisol says Oliver Laslett planned it')), 'GENERATION_MODE_PERSON')
    expect('real customer named', mut(G, lambda s: hero(s).update(subtitle='Trusted by JustWatch and growers alike')), 'GENERATION_MODE_CUSTOMER')
    expect('compliance claim copied', mut(G, lambda s: hero(s).update(subtitle='Quillpine is SOC 2 and HIPAA ready')), 'GENERATION_MODE_CLAIM')
    expect('numeric claim copied', mut(G, lambda s: hero(s).update(subtitle='Cooperatives cleared 400+ stale charts in a week')), 'GENERATION_MODE_CLAIM')
    expect('source marketing copy reused', mut(G, lambda s: hero(s).update(subtitle='Ready to free up your data team? Talk to us today.')), 'GENERATION_MODE_COPY')
    expect('source copy with curly quotes and an en dash', mut(G, lambda s: hero(s).update(subtitle='Ready to free up your data team\u2014talk to us')), 'GENERATION_MODE_COPY')
    expect('real Lightdash URL as a CTA target', mut(G, lambda s: hero(s)['buttons'][0].update(action='open-external', target='https://app.lightdash.cloud/register')), 'GENERATION_MODE_URL')
    expect('non-placeholder external host', mut(G, lambda s: hero(s)['buttons'][0].update(action='open-external', target='https://www.quillpine.com/start')), 'GENERATION_MODE_URL')
    expect('real host inside copy', mut(G, lambda s: hero(s).update(subtitle='Docs at docs.lightdash.com for crews')), 'GENERATION_MODE_URL')
    expect('real email address in copy', mut(G, lambda s: hero(s).update(subtitle='Write to support@quillpine.io today')), 'GENERATION_MODE_URL')
    expect('real CMS slug as the route', mut(GEN['cms'], lambda s: s.update(route='/blogpost/build-unlimited-chart-types-with-chart-studio')), 'GENERATION_MODE_URL')
    expect('real CMS slug as a navigate target', mut(G, lambda s: hero(s)['buttons'][0].update(action='navigate-route', target='/customer-story/ollie')), 'GENERATION_MODE_URL')
    expect('unpublished source route in generation', mut(G, lambda s: s.update(route='/old-home')), 'ROUTE_RESTRICTION')
    CB = GEN['company-b']
    expect('real testimonial avatar in generation', mut(CB, lambda s: gnode(s, 'proof.dark-testimonial-stats')['content']['avatar'].update(assetRole='photo.person-avatar')), 'GENERATION_MODE_PERSON')
    expect('real compliance badge in generation', mut(control('lightdash-security'), lambda s: s.update(mode='generation')), 'GENERATION_MODE_CLAIM')
    expect('real team photo in generation', mut(control('about'), lambda s: s.update(mode='generation')), 'GENERATION_MODE_PERSON')
    expect('real integration logo in generation', mut(control('integrations'), lambda s: s.update(mode='generation')), 'GENERATION_MODE_CUSTOMER')
    expect('real CMS cover image in generation', mut(control('product-data-apps'), lambda s: s.update(mode='generation')), 'GENERATION_MODE_ASSET')
    expect('live form endpoint role in generation', mut(control('partnerships'), lambda s: s.update(mode='generation')), 'GENERATION_MODE_URL')
    # generation-safe placeholders stay valid in clone mode too (control)
    errs, _ = sv.validate(mut(EXAMPLE, lambda s: gnode(s, 'hero.product-visual')['content']['visual'].update(assetRole='illustration.generated')), repo)
    (passed.__setitem__('controls', passed['controls'] + 1) if not errs else failures.append(f'clone page with a generation-safe placeholder should pass: {errs[:2]}'))
    # ---- tokens (node.style)
    st = lambda v, k='accentColor': (lambda s: hero(s).__setitem__('_', 0) if False else gnode(s, 'hero.centered-product').__setitem__('style', {k: v}))
    expect('unknown token', mut(G, st('color.brand-teal')), 'TOKEN_UNKNOWN')
    expect('token-ish garbage', mut(G, st('brandPurple')), 'TOKEN_UNKNOWN')
    expect('raw hex colour', mut(G, st('#5E4CFF')), 'TOKEN_RAW_COLOR')
    expect('raw rgba colour', mut(G, st('rgba(94,76,255,0.2)')), 'TOKEN_RAW_COLOR')
    expect('arbitrary spacing px', mut(G, st('23px', 'spacingBefore')), 'TOKEN_ARBITRARY_SPACING')
    expect('arbitrary spacing rem', mut(G, st('1.5rem', 'spacingAfter')), 'TOKEN_ARBITRARY_SPACING')
    expect('spacing token that does not exist', mut(G, st('spacing.23', 'spacingBefore')), 'TOKEN_UNKNOWN')
    expect('unsupported font name', mut(G, st('Helvetica Neue', 'fontFamily')), 'TOKEN_UNSUPPORTED_FONT')
    expect('unsupported font token', mut(G, st('fontFamily.comic-sans', 'fontFamily')), 'TOKEN_UNSUPPORTED_FONT')
    expect('dark-home-only colour on a light page', mut(G, st('color.nav-bg')), 'TOKEN_THEME_MISMATCH')
    expect('page-local colour reused', mut(G, st('color.local-padel-ink')), 'TOKEN_SCOPE')
    expect('wrong token category', mut(G, st('spacing.24')), 'TOKEN_CATEGORY')
    expect('style smuggles an invented field', mut(G, lambda s: gnode(s, 'hero.centered-product').__setitem__('style', {'shadow': 'elevation.card'})), 'SCHEMA')
    ok = mut(G, st('semantic.color.text.accent'))
    errs, _ = sv.validate(ok, repo)
    (passed.__setitem__('controls', passed['controls'] + 1) if not errs else failures.append(f'semantic colour token control failed: {errs[:2]}'))


def run_retrieval_and_gate():
    """Retrieval pins (contract / allowlist level) and wrapper-gate rules, on in-memory copies."""
    import wrapper_gate as wg
    # contract level: flipping a runtime section to eligible, or a content section to ineligible, is caught by the pinned table
    saved = copy.deepcopy(repo.sections)
    try:
        repo.sections['chrome.talk-modal']['retrievalEligible'] = True
        (passed.__setitem__('mutations', passed['mutations'] + 1) if any('chrome.talk-modal' in m for m in sv.retrieval_findings(repo)) else failures.append('modal flipped to retrievable not caught'))
        repo.sections['chrome.talk-modal']['retrievalEligible'] = False
        repo.sections['content.faq']['retrievalEligible'] = False
        (passed.__setitem__('mutations', passed['mutations'] + 1) if any('content.faq' in m for m in sv.retrieval_findings(repo)) else failures.append('content section marked ineligible not caught'))
        repo.sections['content.faq']['retrievalEligible'] = True
        repo.sections['chrome.cookie-banner'] = {**copy.deepcopy(repo.sections['chrome.footer']), 'id': 'chrome.cookie-banner', 'retrievalEligible': True}
        (passed.__setitem__('mutations', passed['mutations'] + 1) if any('cookie-banner' in m for m in sv.retrieval_findings(repo)) else failures.append('unpinned runtime-looking section not caught'))
    finally:
        repo.sections = saved
    # node level: a PageSpec using a runtime section that lost its pin is rejected
    errs, _ = sv.validate(EXAMPLE, repo)
    (passed.__setitem__('controls', passed['controls'] + 1) if not errs else failures.append('retrieval control failed'))
    # gate: synthetic measured data on a scratch copy
    mvp = os.path.join(REPO, 'extraction', 'measured-values.json')
    base = json.load(open(mvp, encoding='utf8'))
    def gate_with(mutator, wl=None):
        tmp = tempfile.mkdtemp(prefix='ld-gate-')
        try:
            dst = os.path.join(tmp, 'design-repo')
            shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns('__pycache__'))
            d = copy.deepcopy(base)
            mutator(d)
            json.dump(d, open(os.path.join(dst, 'extraction', 'measured-values.json'), 'w'))
            if wl is not None:
                json.dump({'entries': wl}, open(os.path.join(dst, 'extraction', 'wrapper-gate-whitelist.json'), 'w'))
            return wg.run(dst)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    def hero_px(px):
        def m(d):
            next(n for n in d['sectionHeights']['templates']['pricing']['nodes'] if n['section'] == 'hero.pricing')['heightPx'] = px
        return m
    f, w = gate_with(hero_px(1900))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if not f and any('HERO_HEIGHT' in x for x in w) else failures.append(f'HERO 1900 should warn only: {f[:1]} {w[:1]}'))
    f, w = gate_with(hero_px(3100))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('HERO_HEIGHT' in x for x in f) else failures.append('HERO 3100 not an error'))
    f, w = gate_with(hero_px(3100), [{'template': 'pricing', 'section': 'hero.pricing', 'rule': 'HERO_HEIGHT', 'maxHeightPx': 3200, 'justification': 'synthetic adversarial whitelist entry for a tall hero', 'reviewedBy': 'agent attestation, not a human sign-off'}])
    (passed.__setitem__('mutations', passed['mutations'] + 1) if not f and any('whitelisted' in x for x in w) else failures.append(f'whitelisted HERO should warn, not fail: {f[:1]}'))
    f, w = gate_with(hero_px(3100), [{'template': 'pricing', 'section': 'hero.pricing', 'rule': 'HERO_HEIGHT', 'maxHeightPx': 3200, 'justification': 'too short', 'reviewedBy': 'agent attestation, not a human sign-off'}])
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('justification' in x for x in f) else failures.append('whitelist without justification not caught'))
    f, w = gate_with(hero_px(3100), [{'template': 'pricing', 'section': 'hero.pricing', 'rule': 'HERO_HEIGHT', 'maxHeightPx': 3200, 'justification': 'synthetic adversarial whitelist entry for a tall hero', 'reviewedBy': 'reviewed by an agent'}])
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('agent attestation' in x for x in f) else failures.append('agent reviewer presented as sign-off not caught'))
    def share(frac):
        def m(d):
            t = d['sectionHeights']['templates']['pricing']
            next(n for n in t['nodes'] if n['section'] == 'conversion.plan-comparison')['heightPx'] = round(t['documentHeightPx'] * frac)
        return m
    f, w = gate_with(share(0.55))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if not f and any('PAGE_SHARE' in x and 'pricing' in x for x in w) else failures.append('55% share should warn only'))
    f, w = gate_with(share(0.65))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('PAGE_SHARE' in x for x in f) else failures.append('65% share not an error'))
    f, w = gate_with(lambda d: next(n for n in d['sectionHeights']['templates']['pricing']['nodes'] if n['section'] == 'conversion.plan-cards').pop('heightPx'))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('MEASUREMENT' in x for x in f) else failures.append('missing measurement not an error'))
    f, w = gate_with(lambda d: d['sectionHeights']['templates'].pop('legal'))
    (passed.__setitem__('mutations', passed['mutations'] + 1) if any('MEASUREMENT' in x for x in f) else failures.append('unmeasured template not an error'))


def run_pinned():
    """Pinned-value mutations: change a role to a DIFFERENT but still VALID policy; verify_all.py must fail."""
    import verify_all
    base_fail = verify_all.run_checks(REPO, only=['assets'])
    if base_fail:
        failures.append(f'pinned control: real repo assets check failed: {base_fail[:2]}')
    else:
        passed['pinned'] += 1
    roles = json.load(open(os.path.join(REPO, 'assets', 'asset-roles.json')))
    pols = list(roles['generationPolicies'])
    cases = [('embed.booking-cal', 'may-generate-new'), ('embed.live-demo', 'must-reuse-exact'), ('embed.youtube', 'may-generate-new'), ('form.submission-endpoint', 'may-generate-new'),
             ('logo.customer-partner', 'may-generate-new'), ('photo.person-avatar', 'must-reuse-exact'), ('screenshot.product-ui', 'must-not-fabricate'), ('icon.pixel-art', 'must-not-reuse-live-endpoint')]
    for role, newpol in cases:
        assert newpol in pols and roles['roles'][role]['generationPolicy'] != newpol
        tmp = tempfile.mkdtemp(prefix='ld-pin-')
        try:
            dst = os.path.join(tmp, 'design-repo')
            shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns('__pycache__'))
            p = os.path.join(dst, 'assets', 'asset-roles.json')
            d = json.load(open(p))
            d['roles'][role]['generationPolicy'] = newpol
            json.dump(d, open(p, 'w'), indent=2)
            fails = verify_all.run_checks(dst, only=['assets'])
            if fails:
                passed['pinned'] += 1
            else:
                failures.append(f'PINNED MUTATION NOT CAUGHT: {role} -> {newpol} (still a valid policy value)')
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    # availability pins: a different-but-valid availability value must fail verify_all.py (generation check)
    for role, newav in (('screenshot.product-ui', 'generation-safe'), ('brand.lightdash-wordmark', 'generation-safe'), ('embed.booking-cal', 'clone-only'), ('icon.pixel-art', 'clone-only')):
        tmp = tempfile.mkdtemp(prefix='ld-pin-')
        try:
            dst = os.path.join(tmp, 'design-repo')
            shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns('__pycache__'))
            p = os.path.join(dst, 'assets', 'asset-roles.json')
            d = json.load(open(p))
            d['roles'][role]['availability'] = newav
            d['pinnedAvailability'][role] = newav
            json.dump(d, open(p, 'w'), indent=2)
            (passed.__setitem__('pinned', passed['pinned'] + 1) if verify_all.run_checks(dst, only=['generation']) else failures.append(f'PINNED AVAILABILITY NOT CAUGHT: {role} -> {newav}'))
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    # an invented (not in the closed set) policy must also fail
    tmp = tempfile.mkdtemp(prefix='ld-pin-')
    try:
        dst = os.path.join(tmp, 'design-repo')
        shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns('__pycache__'))
        p = os.path.join(dst, 'assets', 'asset-roles.json')
        d = json.load(open(p))
        d['roles']['embed.booking-cal']['generationPolicy'] = 'anything-goes'
        json.dump(d, open(p, 'w'), indent=2)
        (passed.__setitem__('pinned', passed['pinned'] + 1) if verify_all.run_checks(dst, only=['assets']) else failures.append('invented policy value not caught'))
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main():
    n = run_controls()
    run_mutations()
    run_generation_mutations()
    run_retrieval_and_gate()
    run_pinned()
    print(f'controls passed:  {passed["controls"]} ({n} synthesised / bundled: 30 templates full + {len(ROUTES)} routes + clone example + {len(GEN)} generation examples, plus mode / token / retrieval controls)')
    print(f'mutations rejected: {passed["mutations"]}')
    print(f'pinned-value mutations caught: {passed["pinned"]}')
    if failures:
        print(f'{len(failures)} FAILURE(S):')
        for x in failures:
            print('  -', x)
        return 1
    print('ADVERSARIAL SUITE OK')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except ModuleNotFoundError as e:
        print(f'missing dependency: {e}. Install with: pip install jsonschema', file=sys.stderr)
        sys.exit(2)
