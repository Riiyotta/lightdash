#!/usr/bin/env python3
"""Semantic validator for Lightdash PageSpecs: everything JSON Schema (draft-07) cannot express.

Usage:  python3 schema/semantic_validate.py [pagespec.json ...]   (default: schema/example.pagespec.json)

Checks, in order:
  1. pagespec.schema.json (Draft7Validator)                                  -> "SCHEMA"
  2. template exists; route <-> template admission (exact route or the
     template's newRoutePattern); chrome and theme equal the template's      -> "ROUTE_RESTRICTION"
  3. PageSpec.template cross-referenced against that template's own node list:
     required nodes present, no extra nodes, order, repeatable; nodes are
     keyed on (section, variant) where variant = content[contract.variantField] -> "TEMPLATE_NODE_MATCH"
  4. rhythm / position rules from compatibility/graph.json, severity-aware    -> rule ids in graph.json
  5. motion.pattern allowed for the section; reducedMotionFallback and
     reducedMotionBasis equal tokens/00-foundation/motion-patterns.json       -> "MOTION"
  6. per-instance maxWords / list bounds / CTA targets from the contracts     -> "MAX_WORDS", "CONTENT"
  7. live third-party endpoint scan (patterns in assets/asset-roles.json)     -> "NO_LIVE_ENDPOINT"

The repo root is derived from __file__; nothing here depends on an absolute path.
Exit status is 1 if any error-severity finding exists (warnings never fail the run).
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INVIS = re.compile('[​-‏⁠-⁤﻿]+')


def load_json(rel, root=None):
    with open(os.path.join(root or REPO, rel), encoding='utf8') as f:
        return json.load(f)


def norm_words(s):
    return INVIS.sub('', s.replace('’', "'").replace('‘', "'")).split()


def nwords(s):
    return len(norm_words(s))


class Repo:
    def __init__(self, root=None):
        self.root = root or REPO
        tj = load_json('templates/templates.json', self.root)
        self.templates = tj['templates']
        self.routes = tj['routes']
        self.graph = load_json('compatibility/graph.json', self.root)
        self.sections = {}
        sdir = os.path.join(self.root, 'sections')
        for fn in sorted(os.listdir(sdir)):
            if fn.endswith('.json'):
                d = load_json('sections/' + fn, self.root)
                self.sections[d['id']] = d
        self.schema = load_json('schema/pagespec.schema.json', self.root)
        self.motion = load_json('tokens/00-foundation/motion-patterns.json', self.root)['patterns']
        roles = load_json('assets/asset-roles.json', self.root)
        self.live = [re.compile(p['pattern'], re.I) for p in roles['forbiddenLiveHostPatterns']]

    def cat(self, section):
        return self.sections[section]['category']

    def variant(self, node):
        vf = self.sections[node['section']].get('variantField')
        return node.get('content', {}).get(vf) if vf else None

    def route_known(self, route):
        if route in self.routes:
            return True
        return any(t.get('newRoutePattern') and pattern_re(t['newRoutePattern']).match(route) for t in self.templates.values())


def pattern_re(p):
    return re.compile('^' + re.sub(r':[A-Za-z]+', '[^/]+', re.escape(p).replace('\\:', ':')) + '$')


def label(sec, var):
    return f'{sec}[{var}]' if var else sec


# ----------------------------------------------------------------------------- node/template matching
def node_matches(tn, section, variant):
    if tn['section'] != section:
        return False
    if 'variant' in tn:
        return variant == tn['variant']
    return True


def match_template(repo, tpl, nodes):
    """Greedy ordered match on (section, variant). Returns (errors, mapping)."""
    errs = []
    tn = tpl['nodes']
    ptr = 0
    last_j = None
    mapping = []
    for i, n in enumerate(nodes):
        sec, var = n.get('section'), repo.variant(n) if n.get('section') in repo.sections else None
        if last_j is not None and tn[last_j].get('repeatable') and node_matches(tn[last_j], sec, var):
            mapping.append(last_j)
            continue
        j = next((k for k in range(ptr, len(tn)) if node_matches(tn[k], sec, var)), None)
        if j is None:
            anywhere = [k for k in range(len(tn)) if node_matches(tn[k], sec, var)]
            if anywhere:
                errs.append(f'node[{i}] {label(sec, var)} is out of order or duplicated (template position {anywhere[0]}, already passed)')
            else:
                errs.append(f'node[{i}] {label(sec, var)} is not part of the template')
            mapping.append(None)
            continue
        for k in range(ptr, j):
            if tn[k]['required']:
                errs.append(f'required node {label(tn[k]["section"], tn[k].get("variant"))} missing before node[{i}]')
        ptr = j + 1
        last_j = j
        mapping.append(j)
    for k in range(ptr, len(tn)):
        if tn[k]['required']:
            errs.append(f'required node {label(tn[k]["section"], tn[k].get("variant"))} missing')
    return errs, mapping


# ----------------------------------------------------------------------------- graph rules
def _n(ctx):
    r = ctx['repo']
    return [(n.get('section'), r.variant(n), (n.get('motion') or {}).get('pattern')) for n in ctx['nodes']]


def rule_SECTION_CONSTRAINTS(ctx, params):
    out = []
    ns = _n(ctx)
    repo = ctx['repo']
    counts = {}
    for s, v, p in ns:
        counts[s] = counts.get(s, 0) + 1
    for s, c in counts.items():
        con = repo.sections[s]['constraints']
        if con.get('onePerPage') and c > 1:
            out.append(f'{s} is onePerPage but appears {c} times')
        if con.get('maxPerPage') is not None and c > con['maxPerPage']:
            out.append(f'{s} allows at most {con["maxPerPage"]} per page but appears {c} times')
        if con.get('homeRouteOnly') and ctx['route'] != '/':
            out.append(f'{s} is home-route-only but route is {ctx["route"]}')
        if con.get('routeOnly') and ctx['route'] not in con['routeOnly'] and not any(ctx['route'] == r for r in con['routeOnly']):
            out.append(f'{s} is only allowed on {con["routeOnly"]} but route is {ctx["route"]}')
        if con.get('chromeAxis') and ctx['chrome'] not in con['chromeAxis']:
            out.append(f'{s} requires chrome in {con["chromeAxis"]} but chrome is {ctx["chrome"]}')
    chrome_secs = {s for s in repo.sections if repo.cat(s) == 'CHROME'}
    for i, (s, v, p) in enumerate(ns):
        con = repo.sections[s]['constraints']
        if con.get('mustBeFirst') and i != 0:
            out.append(f'{s} must be first (index {i})')
        if con.get('mustBeLast') and i != len(ns) - 1:
            out.append(f'{s} must be last (index {i})')
        if con.get('mustFollowNav') and not all(ns[k][0] in chrome_secs for k in range(i)):
            out.append(f'{s} must directly follow the chrome nav nodes (only chrome nodes may precede it)')
        if con.get('mustPrecedeFooter') and (i + 1 >= len(ns) or ns[i + 1][0] != 'chrome.footer'):
            out.append(f'{s} must directly precede chrome.footer')
        if con.get('mustPrecedeTalkModal') and (i + 1 >= len(ns) or ns[i + 1][0] != 'chrome.talk-modal'):
            out.append(f'{s} must directly precede chrome.talk-modal')
        if con.get('mustFollowSection') and (i == 0 or ns[i - 1][0] != con['mustFollowSection']):
            out.append(f'{s} must directly follow {con["mustFollowSection"]}')
    return out


def rule_CHROME_FRAME(ctx, params):
    ns = [s for s, v, p in _n(ctx)]
    chrome = ctx['chrome']
    pre = {'dark-home': ['chrome.navbar-dark', 'chrome.mobile-nav-dark'],
           'light-banner-cta': ['chrome.announcement-bar', 'chrome.navbar-light', 'chrome.mobile-nav-light'],
           'light-cta': ['chrome.navbar-light', 'chrome.mobile-nav-light'],
           'light-no-cta': ['chrome.navbar-light', 'chrome.mobile-nav-light']}[chrome]
    post = ['chrome.talk-modal'] if chrome == 'dark-home' else ['chrome.footer', 'chrome.talk-modal']
    out = []
    if ns[:len(pre)] != pre:
        out.append(f'chrome {chrome} must start with {pre}, found {ns[:len(pre)]}')
    if ns[len(ns) - len(post):] != post:
        out.append(f'chrome {chrome} must end with {post}, found {ns[-len(post):]}')
    middle = ns[len(pre):len(ns) - len(post)] if len(ns) >= len(pre) + len(post) else []
    stray = [s for s in middle if s.startswith('chrome.')]
    if stray:
        out.append(f'chrome sections may only appear in the frame, found in the body: {stray}')
    return out


def rule_CTA_BAND_MATCHES_CHROME(ctx, params):
    ns = [s for s, v, p in _n(ctx)]
    n = sum(1 for s in ns if s in params['bands'])
    want = 1 if ctx['chrome'] in ('light-banner-cta', 'light-cta') else 0
    out = []
    if n != want:
        out.append(f'chrome {ctx["chrome"]} requires {want} CTA band(s), found {n}')
    return out


def rule_OPENER_IS_HERO(ctx, params):
    ns = _n(ctx)
    repo = ctx['repo']
    body = [s for s, v, p in ns if repo.cat(s) != 'CHROME']
    if not body:
        return ['no body nodes']
    if ctx['template'] in {e['template'] for e in ctx['exceptions']}:
        return []
    if repo.cat(body[0]) != params['openerCategory']:
        return [f'first body node must be a {params["openerCategory"]} section, found {body[0]}']
    return []


def rule_ONE_HERO_PER_PAGE(ctx, params):
    repo = ctx['repo']
    ns = _n(ctx)
    heroes = [s for s, v, p in ns if repo.cat(s) == params['category']]
    out = []
    n = sum(1 for s in heroes if s not in params['companions'])
    if n > params['max']:
        out.append(f'{n} {params["category"]} nodes; at most {params["max"]} allowed (companions excluded)')
    for i, (s, v, p) in enumerate(ns):
        if s in params['companions'] and (i == 0 or ns[i - 1][0] != params['companions'][s]):
            out.append(f'{s} must directly follow {params["companions"][s]}')
    return out


def rule_NO_ADJACENT_DUPLICATE(ctx, params):
    ns = _n(ctx)
    return [f'node[{i}] repeats {label(ns[i][0], ns[i][1])} directly after itself' for i in range(1, len(ns)) if ns[i][:2] == ns[i - 1][:2]]


def rule_LOGOS_ROW_ORDER(ctx, params):
    ns = _n(ctx)
    return [f'{params["section"]} must directly follow one of {params["afterAnyOf"]}' for i, n in enumerate(ns) if n[0] == params['section'] and (i == 0 or ns[i - 1][0] not in params['afterAnyOf'])]


def rule_BLOG_POSTS_AFTER_FAQ(ctx, params):
    ns = _n(ctx)
    return [f'{params["section"]} should directly follow {params["after"]}' for i, n in enumerate(ns) if n[0] == params['section'] and (i == 0 or ns[i - 1][0] != params['after'])]


def rule_MAX_RUN_SAME_CATEGORY(ctx, params):
    repo = ctx['repo']
    cats = [repo.cat(n[0]) for n in _n(ctx)]
    out, run, prev = [], 0, None
    for i, c in enumerate(cats):
        if c in params['ignoreCategories']:
            run, prev = 0, None
            continue
        run = run + 1 if c == prev else 1
        prev = c
        if run == params['maxRun'] + 1:
            out.append(f'more than {params["maxRun"]} consecutive {c} nodes ending at node[{i}]')
    return out


def rule_HATCHED_BAND_BUDGET(ctx, params):
    c = sum(1 for n in _n(ctx) if n[0] == params['section'])
    return [f'{c} {params["section"]} nodes; budget is {params["max"]}'] if c > params['max'] else []


def rule_AUTOPLAY_CAROUSEL_BUDGET(ctx, params):
    c = sum(1 for n in _n(ctx) if n[2] == params['pattern'])
    return [f'{c} nodes use {params["pattern"]}; budget is {params["max"]}'] if c > params['max'] else []


RULES = {k[5:]: v for k, v in list(globals().items()) if k.startswith('rule_')}
# rules whose named exceptions mean "skip this rule for that template" (OPENER_IS_HERO handles its own exceptions)
EXCEPTIONS_ARE_SKIPS = {r for r in RULES if r != 'OPENER_IS_HERO'}


# ----------------------------------------------------------------------------- content / maxWords
def check_field(fdef, val, path, out, routes_ok):
    t = fdef['type']
    if t == 'text':
        if isinstance(val, str) and nwords(val) > fdef['maxWords']:
            out.append(f'{path}: {nwords(val)} words exceeds maxWords {fdef["maxWords"]}')
    elif t == 'cta':
        if isinstance(val, dict):
            lab = val.get('label', '')
            if nwords(lab) > fdef['labelMaxWords']:
                out.append(f'{path}.label: {nwords(lab)} words exceeds maxWords {fdef["labelMaxWords"]}')
            check_target(val, path, out, routes_ok)
    elif t == 'link':
        if isinstance(val, dict):
            check_target(val, path, out, routes_ok)
    elif t == 'media':
        if isinstance(val, dict) and 'altMaxWords' in fdef and isinstance(val.get('alt'), str) and nwords(val['alt']) > fdef['altMaxWords']:
            out.append(f'{path}.alt: {nwords(val["alt"])} words exceeds maxWords {fdef["altMaxWords"]}')
    elif t == 'paragraphs':
        if isinstance(val, list) and sum(nwords(p) for p in val if isinstance(p, str)) > fdef['maxWords']:
            out.append(f'{path}: paragraphs exceed maxWords {fdef["maxWords"]}')
    elif t == 'list':
        if not isinstance(val, list):
            return
        if not fdef['minItems'] <= len(val) <= fdef['maxItems']:
            out.append(f'{path}: {len(val)} items outside [{fdef["minItems"]}, {fdef["maxItems"]}]')
        it = fdef['item']
        for i, x in enumerate(val):
            if 'type' in it:
                check_field(it, x, f'{path}[{i}]', out, routes_ok)
            elif isinstance(x, dict):
                for k, sub in it.items():
                    if k in x:
                        check_field(sub, x[k], f'{path}[{i}].{k}', out, routes_ok)


def check_target(val, path, out, routes_ok):
    act, tgt = val.get('action'), val.get('target')
    if act == 'navigate-route' and isinstance(tgt, str) and not routes_ok(tgt.split('#')[0]):
        out.append(f'{path}.target: "{tgt}" is not a known route (unpublished / out-of-scope pages are never route targets)')


def scan_strings(obj, path, out, patterns):
    if isinstance(obj, str):
        for p in patterns:
            if p.search(obj):
                out.append(f'{path}: looks like a live third-party endpoint ("{obj[:48]}", pattern {p.pattern})')
                break
    elif isinstance(obj, dict):
        for k, v in obj.items():
            if k == 'assetRole':
                continue  # closed enum value; the role names are the only sanctioned mention of these vendors
            scan_strings(v, f'{path}.{k}', out, patterns)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            scan_strings(v, f'{path}[{i}]', out, patterns)


# ----------------------------------------------------------------------------- main API
def schema_errors(spec, repo):
    """Draft7Validator errors. oneOf failures on a node are re-validated against the alternative whose
    `section` const matches, so the message names the real offending property."""
    from jsonschema import Draft7Validator
    v = Draft7Validator(repo.schema)
    alts = repo.schema['definitions']['node']['oneOf']
    out = []
    for e in sorted(v.iter_errors(spec), key=lambda e: [str(p) for p in e.absolute_path]):
        path = list(e.absolute_path)
        if e.validator == 'oneOf' and len(path) == 2 and path[0] == 'nodes':
            node = spec['nodes'][path[1]]
            cands = [a for a in alts if a['properties']['section'].get('const') == (node.get('section') if isinstance(node, dict) else None)]
            if not cands:
                out.append(f'nodes/{path[1]}: no section contract named {node.get("section") if isinstance(node, dict) else node!r}')
                continue
            sub = Draft7Validator({**cands[0], 'definitions': repo.schema['definitions']})
            for se in sorted(sub.iter_errors(node), key=lambda x: [str(p) for p in x.absolute_path]):
                out.append(f'nodes/{path[1]}/' + '/'.join(str(x) for x in se.absolute_path) + f': {se.message[:160]}')
            continue
        out.append(f'{"/".join(str(p) for p in path) or "(root)"}: {e.message[:160]}')
    return out


def validate(spec, repo=None, graph=None, with_schema=True):
    """Return (errors, warnings) as lists of 'RULE: message'."""
    repo = repo or Repo()
    graph = graph or repo.graph
    errors, warnings = [], []
    if with_schema:
        errors += ['SCHEMA: ' + e for e in schema_errors(spec, repo)]
        if errors:
            return errors, warnings  # structure is unusable for the rest
    tid, route = spec['template'], spec['route']
    tpl = repo.templates.get(tid)
    if tpl is None:
        return errors + [f'ROUTE_RESTRICTION: unknown template {tid}'], warnings
    if route in repo.routes:
        if repo.routes[route]['template'] != tid:
            errors.append(f'ROUTE_RESTRICTION: route {route} belongs to template {repo.routes[route]["template"]}, not {tid}')
    else:
        pat = tpl.get('newRoutePattern')
        if not pat or not pattern_re(pat).match(route):
            errors.append(f'ROUTE_RESTRICTION: template {tid} admits no new route {route} (pattern: {pat})')
    if spec['chrome'] != tpl['chrome']:
        errors.append(f'ROUTE_RESTRICTION: chrome {spec["chrome"]} must be {tpl["chrome"]} for template {tid}')
    if spec['theme'] != tpl['theme']:
        errors.append(f'ROUTE_RESTRICTION: theme {spec["theme"]} must be {tpl["theme"]} for template {tid}')
    nodes = spec['nodes']
    for n in nodes:
        if n['section'] not in repo.sections:
            return errors + [f'TEMPLATE_NODE_MATCH: unknown section {n["section"]}'], warnings
    terrs, _ = match_template(repo, tpl, nodes)
    errors += ['TEMPLATE_NODE_MATCH: ' + e for e in terrs]
    ctx_base = {'repo': repo, 'nodes': nodes, 'route': route, 'template': tid, 'chrome': spec['chrome']}
    for r in graph['rules']:
        fn = RULES.get(r['id'])
        if fn is None:
            errors.append(f'GRAPH: rule {r["id"]} has no implementation')
            continue
        excs = r.get('exceptions', [])
        if r['id'] in EXCEPTIONS_ARE_SKIPS and tid in {e['template'] for e in excs}:
            continue
        msgs = fn({**ctx_base, 'exceptions': excs}, r.get('params', {}))
        (errors if r['severity'] == 'error' else warnings).extend(f'{r["id"]}: {m}' for m in msgs)
    for i, n in enumerate(nodes):
        sec = repo.sections[n['section']]
        m = n.get('motion')
        if not isinstance(m, dict) or 'reducedMotionFallback' not in m:
            errors.append(f'MOTION: node[{i}] {n["section"]} has no motion.reducedMotionFallback')
            continue
        allowed = sec['motion']['allowedPatterns']
        if m.get('pattern') not in allowed:
            errors.append(f'MOTION: node[{i}] {n["section"]} pattern {m.get("pattern")} not in {allowed}')
        mp = repo.motion.get(m.get('pattern'))
        if mp is not None:
            if m['reducedMotionFallback'] != mp['reducedMotionFallback']:
                errors.append(f'MOTION: node[{i}] {n["section"]} fallback {m["reducedMotionFallback"]} must be {mp["reducedMotionFallback"]} for {m["pattern"]}')
            if m.get('reducedMotionBasis') != mp['reducedMotionBasis']:
                errors.append(f'MOTION: node[{i}] {n["section"]} reducedMotionBasis {m.get("reducedMotionBasis")} must be {mp["reducedMotionBasis"]} for {m["pattern"]}')
    for i, n in enumerate(nodes):
        sec = repo.sections[n['section']]
        out = []
        for k, val in n.get('content', {}).items():
            fdef = sec['content']['fields'].get(k)
            if fdef is None:
                out.append(f'node[{i}].content.{k}: not a field of {n["section"]}')
                continue
            check_field(fdef, val, f'node[{i}].content.{k}', out, repo.route_known)
        errors += [('MAX_WORDS: ' if 'words' in o else 'CONTENT: ') + o for o in out]
    leaks = []
    scan_strings(spec, 'spec', leaks, repo.live)
    errors += ['NO_LIVE_ENDPOINT: ' + m for m in leaks]
    return errors, warnings


def main(argv):
    repo = Repo()
    paths = argv or [os.path.join(REPO, 'schema', 'example.pagespec.json')]
    status = 0
    for p in paths:
        with open(p, encoding='utf8') as f:
            spec = json.load(f)
        errs, warns = validate(spec, repo)
        print(f'{os.path.basename(p)}: {len(errs)} error(s), {len(warns)} warning(s)')
        for e in errs:
            print('  ERROR', e)
        for w in warns:
            print('  WARN ', w)
        status |= 1 if errs else 0
    return status


if __name__ == '__main__':
    try:
        sys.exit(main(sys.argv[1:]))
    except ModuleNotFoundError as e:  # jsonschema missing
        print(f'missing dependency: {e}. Install with: pip install jsonschema', file=sys.stderr)
        sys.exit(2)
