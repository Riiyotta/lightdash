#!/usr/bin/env python3
"""build_generation_examples.py: writes one mode "generation" example PageSpec per template family to
schema/examples/generation/<family>.generated.pagespec.json.

Usage:  python3 extraction/build_generation_examples.py           (rewrite the examples)
        python3 extraction/build_generation_examples.py --check   (exit 1 if a committed example differs)

The brand ("Quillpine", an orchard-operations planning product), every person, company, number and sentence below
is FICTIONAL and was written for these examples; no copy, asset, URL or claim is taken from the Lightdash source.
Media slots use generation-safe roles only (placeholder brand mark, generated illustrations, placeholder screenshots,
fictional avatars, placeholder company logos, operator-supplied embeds / endpoints / chrome data). External URLs use
the reserved .example host. Each example must pass schema + semantic validation with zero errors and zero warnings
(verify_all.py "generation" check and the adversarial suite controls). Root derived from __file__.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
OUT = os.path.join(REPO, 'schema', 'examples', 'generation')
SITE = 'https://www.quillpine.example'

# family -> (template, route)
FAMILIES = {
    'home': ('home', '/'),
    'product': ('product-metrics-catalog', '/harvest-ledger'),
    'product-code': ('product-bi-as-code', '/planner-as-code'),
    'directory': ('integrations', '/connectors'),
    'event-landing': ('beyond-copilots', '/webinar-replay'),
    'draft': ('playground', '/sandbox'),
    'company-a': ('pricing', '/plans'),
    'company-b': ('fintech', '/for-cooperatives'),
    'cms': ('blog-post', '/blogpost/pruning-schedules-without-spreadsheets'),
    'legal': ('legal', '/terms'),
    'utility': ('not-found', '/404'),
}
GROUP_OF = {'home': 'home', 'product': 'T1 product', 'product-code': 'T1b product', 'directory': 'T2 directory', 'event-landing': 'T3 event landing',
            'draft': 'T4 draft', 'company-a': 'company A', 'company-b': 'company B', 'cms': 'cms', 'legal': 'legal', 'utility': 'utility'}

LONG = [
    'Quillpine turns the orchard notebook into a live plan: crews, ladders, bins and weather windows line up before the first truck leaves the yard.',
    'Growers sketch a picking route on a tablet, and the planner reshuffles every crew when a frost warning or a late delivery changes the morning.',
    'Each block of trees keeps its own history of yields, pruning dates and soil notes, so next season starts from evidence instead of memory.',
    'Cooperative managers compare twelve farms on one board and spot the grove that needs extra hands three days before the fruit softens.',
]
SHORT = ['Plan every harvest crew before the frost', 'Orchard ledgers that settle by sundown', 'Bins, ladders and crews on one board',
         'Field notes your whole cooperative trusts', 'Forecast picking days from soil to shed', 'Prune smarter with three seasons of notes']
LABELS = ['Book a walkthrough', 'Open the planner', 'Read the field notes', 'See sample orchards']
QUESTIONS = ['How does Quillpine price seasonal crews?', 'Can we import last year’s yield sheets?', 'Does the planner work without signal in the hills?',
             'Who owns the orchard records we upload?', 'How quickly can a new cooperative start?']
PEOPLE = [('Marisol Quenby', 'Grove operations lead'), ('Teodor Ashgrove', 'Cooperative treasurer'), ('Ines Vardeman', 'Field data steward')]
COMPANIES = ['Fernhollow Growers', 'Brindlemoor Cider Co', 'Saltmarsh Pear Union', 'Oakvale Nurseries', 'Pellbrook Farms', 'Wrenfield Orchards']


def clip(text, n):
    w = text.split()
    return ' '.join(w[:max(1, n)])


class Writer:
    def __init__(self):
        self.i = 0

    def text(self, key, maxw):
        self.i += 1
        k = key.lower()
        if k in ('name', 'personname', 'authorname'):
            return clip(PEOPLE[self.i % 3][0], maxw)
        if k in ('role', 'personrole', 'roles'):
            return clip(PEOPLE[self.i % 3][1], maxw)
        if k == 'company':
            return clip(COMPANIES[self.i % len(COMPANIES)], maxw)
        if k in ('date',):
            return clip('March 4, 2031', maxw)
        if k == 'updated':
            return clip('Revised: March 2031', maxw)
        if k in ('category', 'categories', 'eyebrow', 'meta'):
            return clip('Field notes · Orchard planning', maxw)
        if k in ('value', 'number', 'price'):
            return clip(['$90 / grove', '17 farms', '3 seasons'][self.i % 3], maxw)
        if k == 'question':
            return clip(QUESTIONS[self.i % len(QUESTIONS)], maxw)
        if k in ('label', 'linklabel'):
            return clip(LABELS[self.i % len(LABELS)], maxw)
        if maxw <= 14:
            return clip(SHORT[self.i % len(SHORT)], maxw)
        return clip(LONG[self.i % len(LONG)], maxw)


def target_for(action, w):
    return {'navigate-route': '/contact', 'scroll-anchor': '#apply-form', 'open-external': f'{SITE}/start', 'open-talk-modal': 'talk-modal'}[action]


def media(fd, slot):
    safe = [r for r in fd['assetRoles'] if r in GEN_SAFE]
    v = {'assetRole': safe[0], 'assetRef': slot}
    if fd.get('altMaxWords'):
        v['alt'] = clip('Placeholder company logo' if 'logo' in safe[0] else 'Placeholder Quillpine illustration', fd['altMaxWords'])
    return v


def field(fd, key, w, slot):
    t = fd['type']
    if t in ('text',):
        return w.text(key, fd['maxWords'])
    if t == 'paragraphs':
        return [w.text(key, fd['maxWords'])]
    if t == 'cta':
        a = fd['actions'][0]
        return {'label': clip(LABELS[w.i % len(LABELS)], fd['labelMaxWords']), 'action': a, 'target': target_for(a, w)}
    if t == 'link':
        a = fd['actions'][0]
        return {'action': a, 'target': target_for(a, w)}
    if t == 'media':
        return media(fd, slot)
    if t == 'enum':
        return fd['values'][0]
    if t == 'boolean':
        return True
    if t == 'list':
        it = fd['item']
        n = min(fd['maxItems'], max(fd['minItems'], 3))
        out = []
        for j in range(n):
            if 'type' in it:
                out.append(field(it, key, w, f'{slot}-{j + 1}'))
            else:
                out.append({k: field(sub, k, w, f'{slot}-{k.lower()}-{j + 1}') for k, sub in it.items() if sub['required'] or sub['type'] == 'media'})
        return out
    raise ValueError(t)


def node(sid, tn, w, n_idx):
    sec = SECS[sid]
    content = {}
    for k, fd in sec['content']['fields'].items():
        if fd.get('required') or k in ('brandMark', 'chromeData', 'app'):
            slot = f'slot-{sid.split(".")[-1]}-{k.lower()}-{n_idx}'
            content[k] = field(fd, k, w, slot)
    if 'heading' in content and 'accent' in content and isinstance(content['heading'], str):
        hw = content['heading'].split()
        content['accent'] = ' '.join(hw[-min(len(hw), sec['content']['fields']['accent']['maxWords'], 3):])
    if tn.get('variant') is not None:
        content[sec['variantField']] = tn['variant']
    pat = sec['motion']['allowedPatterns'][0]
    mp = MOTION[pat]
    return {'section': sid, 'content': content, 'motion': {'pattern': pat, 'reducedMotionFallback': mp['reducedMotionFallback'], 'reducedMotionBasis': mp['reducedMotionBasis']}}


def build(family):
    tid, route = FAMILIES[family]
    tpl = TPL[tid]
    w = Writer()
    nodes = []
    for i, tn in enumerate(tpl['nodes']):
        reps = 1
        if tn['section'] == 'content.rich-text':
            reps = 5
        elif tn['section'] == 'content.legal-body':
            reps = 6
        for r in range(reps):
            nodes.append(node(tn['section'], tn, w, len(nodes)))
    spec = {'pageSpecVersion': '1.1.0', 'mode': 'generation', 'template': tid, 'route': route, 'theme': tpl['theme'], 'chrome': tpl['chrome'], 'nodes': nodes}
    if family == 'product':
        spec['nodes'][3]['style'] = {'accentColor': 'color.brand-purple', 'spacingBefore': 'spacing.24', 'fontFamily': 'fontFamily.inter'}
    return spec


def load(rel):
    return json.load(open(os.path.join(REPO, rel), encoding='utf8'))


TPL = load('templates/templates.json')['templates']
SECS = {}
for fn in sorted(os.listdir(os.path.join(REPO, 'sections'))):
    d = load('sections/' + fn)
    SECS[d['id']] = d
MOTION = load('tokens/00-foundation/motion-patterns.json')['patterns']
GEN_SAFE = {r for r, v in load('assets/asset-roles.json')['roles'].items() if v['availability'] == 'generation-safe'}


def main(argv):
    os.makedirs(OUT, exist_ok=True)
    bad = 0
    for fam in FAMILIES:
        text = json.dumps(build(fam), indent=2, ensure_ascii=False) + '\n'
        p = os.path.join(OUT, f'{fam}.generated.pagespec.json')
        if '--check' in argv:
            if not os.path.isfile(p) or open(p, encoding='utf8').read() != text:
                print(f'STALE {os.path.relpath(p, REPO)}')
                bad += 1
        else:
            open(p, 'w', encoding='utf8').write(text)
    if '--check' not in argv:
        print(f'wrote {len(FAMILIES)} generation examples to schema/examples/generation/')
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
