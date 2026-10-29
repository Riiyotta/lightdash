#!/usr/bin/env python3
"""verify_all.py: one-shot verification of the Lightdash design-repo.

Usage:  python3 extraction/verify_all.py          (exit 0 = every check passed; warnings never fail)

Checks (each prints PASS / FAIL / WARN):
  self-containment   no absolute machine paths anywhere, no ../ in registry.manifest.json, entryPoints exist inside the repo
  json               every .json parses; required folder layout exists
  schema             pagespec.schema.json is a valid draft-07 schema; example.pagespec.json has 0 errors (semantic validator included)
  structure          section contracts closed + complete; templates are structured nodes; every section is used by a template (or is a home iframe state)
  maxwords           copy budgets: extraction/derive_wordcounts.py (spec <-> contracts <-> real source) + schema x-maxWords == contract
  allowlist parity   tokens/llm/component-allowlist.json <-> primitives/, components/, sections/, schema enums (no phantoms, no orphans)
  allowlistVersion   machine-checked: manifest == allowlist == catalog == policy.  repositoryVersion / pageSpecVersion are doc-only (versionFieldNote)
  manifest counts    registry.manifest.json counts recomputed from disk; README / CHANGELOG count blocks recomputed
  routes             route -> template admission consistency, 1:1 coverage, chrome axis derived from node lists; vs ia/ia.json, specs/sitemap.txt and src/App.jsx when present
  graph              every graph rule id has an implementation in schema/semantic_validate.py and vice versa; every named exception is still needed
  assets             asset-roles.json: closed policy set, PINNED policy per role (not just membership), parity with schema / allowlist / contracts
  tokens             catalog parity with token files; policy keys are real catalog keys; themes resolve; component tokensUsed resolve; tokens vs tailwind.config.js / src/index.css when present
  motion             motion-patterns.json: closed enums; every contract fallback / basis equals its pattern; schema const-locks equal the patterns
  citations          every path:line[-line] resolves in-range AND its anchor text is in the cited lines; every citation in the repo is covered by extraction/measured-values.json
  packaging          every script / file the docs mention exists, prove_drift.py exists, no zip / .DS_Store / __MACOSX inside the repo
  source-claims      framework versions in measured-values.json == package.json; documented anomalies still reproduce (keyword greps)
  contracts          sections/*.json valid against schema/section-contract.schema.json; source {id, tag, file, lines} re-read from
                     the real file (range in file, tag at the start line); semantic.id == id; retrievalEligible == PINNED_RETRIEVAL;
                     generatedAssetRoles == the generation-safe roles of the contract's media fields
  generation         asset availability == PINNED_AVAILABILITY here, in semantic_validate.py and in the registry; substitutes are
                     generation-safe; one mode "generation" example per template family passes with 0 errors / 0 warnings;
                     schema/source-identity.json matches a fresh build from the source tree
  wrapper gate       extraction/wrapper_gate.py over measured sectionHeights (HERO 1800 / 3000 px, page share 50% / 60%)
  policy             registry.manifest.json category + designPolicy binding; policy file exists; contentHash recomputed

Source-tree checks need a sibling project (parent folder with src/ and a package.json named lightdash-clone). Without one they WARN
and are skipped; they never fail. The repo root is derived from __file__.
"""
import glob
import hashlib
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO0 = os.path.dirname(HERE)
CITE = re.compile(r'^([A-Za-z0-9_@./\[\]%-]+\.[A-Za-z0-9]+):(\d+)(?:-(\d+))?$')
PIN_POLICIES = ['may-generate-new', 'must-reuse-exact', 'must-not-fabricate', 'must-not-reuse-live-endpoint', 'must-be-operator-supplied']
# pinned in code, independent of assets/asset-roles.json (semantic_validate.py holds the same table; both are cross-checked)
PINNED_AVAILABILITY = {
    'animation.rive': 'clone-only', 'app.iframe-bundle': 'clone-only', 'brand.lightdash-wordmark': 'clone-only',
    'content.lightdash-chrome-data': 'clone-only', 'illustration.hero-diagram': 'clone-only', 'illustration.html-diagram': 'clone-only',
    'image.cms-cover': 'clone-only', 'logo.customer-partner': 'clone-only', 'logo.integration': 'clone-only',
    'photo.person-avatar': 'clone-only', 'photo.team-member': 'clone-only', 'screenshot.product-ui': 'clone-only', 'video.self-hosted': 'clone-only',
    'badge.compliance': 'blocked-for-generation', 'embed.booking-cal': 'blocked-for-generation', 'embed.live-demo': 'blocked-for-generation',
    'embed.youtube': 'blocked-for-generation', 'form.submission-endpoint': 'blocked-for-generation',
    'animation.placeholder': 'generation-safe', 'asset.operator-supplied': 'generation-safe', 'avatar.fictional-person': 'generation-safe',
    'brand.placeholder-mark': 'generation-safe', 'content.operator-supplied-chrome': 'generation-safe', 'copy.original': 'generation-safe',
    'decor.pixel-tile': 'generation-safe', 'decor.sticker': 'generation-safe', 'embed.operator-supplied': 'generation-safe',
    'endpoint.operator-supplied': 'generation-safe', 'icon.pixel-art': 'generation-safe', 'illustration.generated': 'generation-safe',
    'link.placeholder-url': 'generation-safe', 'logo.placeholder-company': 'generation-safe', 'screenshot.placeholder': 'generation-safe',
    'video.placeholder': 'generation-safe',
}
PINNED_RETRIEVAL = {
    'chrome.talk-modal': False, 'chrome.mobile-nav-light': False, 'chrome.mobile-nav-dark': False,
    'app.view-customers': False, 'app.view-governance': False, 'app.view-migration': False, 'app.view-pricing': False, 'app.view-product': False,
}
RUNTIME_UI_RE = re.compile(r'modal|dialog|drawer|popup|pop-up|cookie|consent|preloader|toast|overlay|mobile-nav|app\.view-')
SAAS_POLICY = ('n0-saas-design-constraints-common', '0.1.0')
REQUIRED_DIRS = ['tokens/00-foundation', 'tokens/10-semantic', 'tokens/20-component', 'tokens/30-layout', 'tokens/themes', 'tokens/llm', 'primitives', 'components', 'sections',
                 'templates', 'compatibility', 'schema/tests', 'assets', 'extraction']
ENTRY_KEYS = ['readme', 'changelog', 'schema', 'example', 'semanticValidator', 'adversarialTests', 'verifyAll', 'driftProof', 'wordcountDerivation', 'measuredValues',
              'wordcountSpec', 'templates', 'compatibilityGraph', 'assetRoles', 'tokenCatalog', 'tokenPolicy', 'componentAllowlist', 'motionPatterns', 'sections', 'primitives', 'components',
              'generationExamples', 'sectionContractSchema', 'sourceIdentity', 'sourceIdentityBuilder', 'generationExampleBuilder', 'wrapperGate', 'wrapperGateWhitelist',
              'measureSections', 'designPolicy']
FAMILY_EXAMPLES = {'home': 'home', 'T1 product': 'product', 'T1b product': 'product-code', 'T2 directory': 'directory', 'T3 event landing': 'event-landing',
                   'T4 draft': 'draft', 'company A': 'company-a', 'company B': 'company-b', 'cms': 'cms', 'legal': 'legal', 'utility': 'utility'}


class Ctx:
    def __init__(self, root):
        self.root = root
        self.project = os.path.dirname(root)
        pj = os.path.join(self.project, 'package.json')
        self.src = None
        if os.path.isdir(os.path.join(self.project, 'src')) and os.path.isfile(pj):
            try:
                if json.load(open(pj)).get('name') == 'lightdash-clone':
                    self.src = self.project
            except Exception:
                pass
        self.cache = {}

    def j(self, rel):
        if rel not in self.cache:
            self.cache[rel] = json.load(open(os.path.join(self.root, rel), encoding='utf8'))
        return self.cache[rel]

    def files(self, pattern):
        return sorted(glob.glob(os.path.join(self.root, pattern), recursive=True))

    def sections(self):
        return {os.path.basename(p)[:-5]: json.load(open(p, encoding='utf8')) for p in self.files('sections/*.json')}

    def srcfile(self, rel):
        return os.path.join(self.src, rel) if self.src else None


def all_text_files(root):
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d != '__pycache__']
        for f in fn:
            if f.endswith(('.json', '.md', '.py', '.sh', '.txt')):
                yield os.path.join(dp, f)


def walk_strings(o, path=''):
    if isinstance(o, str):
        yield path, o
    elif isinstance(o, dict):
        for k, v in o.items():
            yield from walk_strings(v, f'{path}/{k}')
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk_strings(v, f'{path}[{i}]')


def contract_text_fields(c):
    def walk(f, path):
        t = f['type']
        if t in ('text', 'paragraphs'):
            yield path, f
        elif t == 'cta':
            yield path + '.label', f
        elif t == 'list':
            it = f['item']
            if 'type' in it:
                yield from walk(it, path + '[]')
            else:
                for k, sub in it.items():
                    yield from walk(sub, f'{path}[].{k}')
    for k, f in c['content']['fields'].items():
        yield from walk(f, k)


# ------------------------------------------------------------------------------------------------ counts
def compute_counts(root):
    c = Ctx(root)
    toks = 0
    for p in c.files('tokens/00-foundation/*.json'):
        if p.endswith('motion-patterns.json'):
            continue
        d = json.load(open(p, encoding='utf8'))
        for k, v in d.items():
            if isinstance(v, dict) and not k.startswith('$'):
                toks += sum(1 for x in v.values() if isinstance(x, dict) and '$value' in x)
    toks += len(c.j('tokens/10-semantic/semantic.json')['semantic']) + len(c.j('tokens/20-component/component.json')['component']) + len(c.j('tokens/30-layout/layout.json')['layout'])
    secs = c.sections()
    tj = c.j('templates/templates.json')
    cat = c.j('tokens/llm/token-catalog.json')['categories']
    mv = c.j('extraction/measured-values.json')
    return {
        'tokens': toks,
        'primitives': len(c.files('primitives/*.json')),
        'components': len(c.files('components/*.json')),
        'sections': len(secs),
        'composableSections': sum(1 for s in secs.values() if s['composable']),
        'templates': len(tj['templates']),
        'routes': len(tj['routes']),
        'iframeStates': sum(len(t.get('iframeStates', [])) for t in tj['templates'].values()),
        'assetRoles': len(c.j('assets/asset-roles.json')['roles']),
        'motionPatterns': len(c.j('tokens/00-foundation/motion-patterns.json')['patterns']),
        'graphRules': len(c.j('compatibility/graph.json')['rules']),
        'wordcountSpecEntries': len(c.j('extraction/wordcount_spec.json')['entries']),
        'citationChecks': len(mv['citationChecks']),
        'catalogEntries': sum(len(v) for v in cat.values()),
        'generationExamples': len(c.files('schema/examples/generation/*.pagespec.json')),
        'measuredSectionHeights': sum(len([n for n in t['nodes'] if n.get('heightPx') is not None]) for t in mv.get('sectionHeights', {}).get('templates', {}).values()),
    }


def json_block(text, heading):
    m = re.search(re.escape(heading) + r'.*?```json\s*(\{.*?\})\s*```', text, re.S)
    return json.loads(m.group(1)) if m else None


# ------------------------------------------------------------------------------------------------ checks
def chk_self(c):
    fails, warns = [], []
    # patterns are assembled from pieces so this file never contains a literal machine path itself
    pat = re.compile('/' + 'Users' + '/|/home/[a-z]+/|[A-Za-z]:' + chr(92) * 2 + 'Users|/' + 'private' + '/tmp|/var/' + 'folders')
    for p in all_text_files(c.root):
        rel = os.path.relpath(p, c.root)
        txt = open(p, encoding='utf8', errors='ignore').read()
        if pat.search(txt):
            fails.append(f'{rel}: absolute machine path found')
    man = json.dumps(c.j('registry.manifest.json'))
    if '../' in man:
        fails.append('registry.manifest.json contains a ../ path')
    for k in ENTRY_KEYS:
        v = c.j('registry.manifest.json')['entryPoints'].get(k)
        if v is None:
            fails.append(f'manifest entryPoints missing {k}')
        elif v.startswith('..') or os.path.isabs(v) or not os.path.exists(os.path.join(c.root, v)):
            fails.append(f'manifest entryPoint {k}={v} is not a file/folder inside the repo')
    for p in c.files('**/*.py'):
        t = open(p, encoding='utf8').read()
        if '__file__' not in t:
            fails.append(f'{os.path.relpath(p, c.root)}: does not derive its root from __file__')
    return fails, warns


def chk_json(c):
    fails = []
    for d in REQUIRED_DIRS:
        if not os.path.isdir(os.path.join(c.root, d)):
            fails.append(f'missing folder {d}')
    for p in c.files('**/*.json'):
        try:
            json.load(open(p, encoding='utf8'))
        except Exception as e:
            fails.append(f'{os.path.relpath(p, c.root)}: invalid JSON ({e})')
    for f in ('README.md', 'CHANGELOG.md', 'registry.manifest.json'):
        if not os.path.isfile(os.path.join(c.root, f)):
            fails.append(f'missing {f}')
    return fails, []


def chk_schema(c):
    fails = []
    try:
        from jsonschema import Draft7Validator
    except ModuleNotFoundError:
        return ['jsonschema is not installed (pip install jsonschema)'], []
    sch = c.j('schema/pagespec.schema.json')
    try:
        Draft7Validator.check_schema(sch)
    except Exception as e:
        return [f'pagespec.schema.json is not a valid draft-07 schema: {e}'], []
    if sch.get('$schema') != 'http://json-schema.org/draft-07/schema#':
        fails.append('schema $schema is not draft-07')
    sys.path.insert(0, os.path.join(c.root, 'schema'))
    import importlib
    import semantic_validate as sv
    importlib.reload(sv)
    repo = sv.Repo(c.root)
    errs, warns = sv.validate(c.j('schema/example.pagespec.json'), repo)
    for e in errs:
        fails.append(f'example.pagespec.json: {e}')
    if warns:
        fails.append(f'example.pagespec.json has {len(warns)} warning(s): {warns[:2]}')
    # closedness
    def closed(node, path):
        out = []
        if isinstance(node, dict):
            if node.get('type') == 'object' and 'properties' in node and node.get('additionalProperties') is not False:
                out.append(path)
            for k, v in node.items():
                out += closed(v, f'{path}/{k}')
        elif isinstance(node, list):
            for i, v in enumerate(node):
                out += closed(v, f'{path}[{i}]')
        return out
    for pth in closed(sch, '#')[:5]:
        fails.append(f'schema object without additionalProperties:false at {pth}')
    mo = sch['definitions']['motion']
    if mo.get('additionalProperties') is not False:
        fails.append('schema motion object is not closed')
    if 'reducedMotionFallback' not in mo['required'] or 'reducedMotionBasis' not in mo['required']:
        fails.append('motion.required must include reducedMotionFallback and reducedMotionBasis')
    return fails, []


def chk_structure(c):
    fails = []
    secs = c.sections()
    tj = c.j('templates/templates.json')
    need = ['id', 'category', 'purpose', 'status', 'composable', 'content', 'constraints', 'motion', 'responsive', 'measuredFrom', 'notes', 'schemaVersion', 'usedByTemplates', 'implementedBy']
    cats = {'CHROME', 'HERO', 'APP', 'PROOF', 'FEATURES', 'CONTENT', 'CONVERSION', 'LISTING', 'CTA', 'DECOR'}
    for sid, s in secs.items():
        for k in need:
            if k not in s:
                fails.append(f'{sid}: missing key {k}')
        if s.get('id') != sid:
            fails.append(f'{sid}: id field {s.get("id")} != file name')
        if s.get('category') not in cats:
            fails.append(f'{sid}: unknown category {s.get("category")}')
        if s.get('content', {}).get('additionalProperties') is not False:
            fails.append(f'{sid}: content is not closed')
        m = s.get('motion', {})
        if not m.get('reducedMotionFallbackRequired') or not m.get('allowedPatterns'):
            fails.append(f'{sid}: motion needs allowedPatterns + reducedMotionFallbackRequired')
        if not s.get('responsive') and not s.get('responsiveNote'):
            fails.append(f'{sid}: responsive is empty and has no responsiveNote')
        for r in s.get('responsive', []):
            if not CITE.match(r.get('cssCite', '')) or not r.get('query') or not r.get('change'):
                fails.append(f'{sid}: malformed responsive entry {r}')
        if not s.get('measuredFrom'):
            fails.append(f'{sid}: no measuredFrom citation')
        vf = s.get('variantField')
        if vf and vf not in s['content']['fields']:
            fails.append(f'{sid}: variantField {vf} is not a content field')
        if s['category'] == 'APP' and s['composable']:
            fails.append(f'{sid}: app views are iframe states and must not be composable')
    used = {}
    for tid, t in tj['templates'].items():
        for need_k in ('name', 'chrome', 'theme', 'routes', 'nodes', 'iaTemplateId'):
            if need_k not in t:
                fails.append(f'template {tid}: missing {need_k}')
        for i, n in enumerate(t['nodes']):
            if not (isinstance(n, dict) and set(n) >= {'section', 'required', 'repeatable'} and isinstance(n['required'], bool) and isinstance(n['repeatable'], bool)):
                fails.append(f'template {tid} node[{i}] is not a structured {{section, required, repeatable}} object')
                continue
            if n['section'] not in secs:
                fails.append(f'template {tid} node[{i}] unknown section {n["section"]}')
                continue
            if not secs[n['section']]['composable']:
                fails.append(f'template {tid} node[{i}] {n["section"]} is not composable')
            vf = secs[n['section']].get('variantField')
            if 'variant' in n:
                if not vf:
                    fails.append(f'template {tid} node[{i}] has a variant but {n["section"]} has no variantField')
                elif n['variant'] not in secs[n['section']]['content']['fields'][vf]['values']:
                    fails.append(f'template {tid} node[{i}] variant {n["variant"]} not in {vf} values')
            used.setdefault(n['section'], set()).add(tid)
        for st in t.get('iframeStates', []):
            if st not in secs or secs[st]['composable']:
                fails.append(f'template {tid} iframe state {st} must be a non-composable section')
            used.setdefault(st, set()).add(tid)
    for sid, s in secs.items():
        u = used.get(sid)
        if not u:
            fails.append(f'{sid}: used by no template (orphan contract)')
        elif sorted(u) != sorted(s['usedByTemplates']):
            fails.append(f'{sid}: usedByTemplates {s["usedByTemplates"]} != computed {sorted(u)}')
    return fails, []


def chk_maxwords(c):
    sys.path.insert(0, c.root + '/extraction')
    import importlib
    import derive_wordcounts as dw
    importlib.reload(dw)
    fails, warns = dw.run(root=c.root, quiet=True)
    sch = c.j('schema/pagespec.schema.json')
    alts = {a['title']: a for a in sch['definitions']['node']['oneOf']}
    secs = c.sections()

    def schema_fields(node):
        return node['properties'], node.get('required', [])
    for sid, s in secs.items():
        if not s['composable']:
            if sid in alts:
                fails.append(f'{sid}: non-composable section present in the schema')
            continue
        if sid not in alts:
            fails.append(f'{sid}: composable section missing from the schema')
            continue
        cs = alts[sid]['properties']['content']

        def cmp(cf, sf, path):
            t = cf['type']
            if t == 'text' and sf.get('x-maxWords') != cf['maxWords']:
                fails.append(f'{sid}.{path}: schema x-maxWords {sf.get("x-maxWords")} != contract {cf["maxWords"]}')
            elif t == 'cta' and sf['properties']['label'].get('x-maxWords') != cf['labelMaxWords']:
                fails.append(f'{sid}.{path}: schema label x-maxWords != contract')
            elif t == 'media' and cf.get('altMaxWords') != sf['properties'].get('alt', {}).get('x-maxWords'):
                fails.append(f'{sid}.{path}: schema alt x-maxWords != contract altMaxWords')
            elif t == 'list':
                if (sf['minItems'], sf['maxItems']) != (cf['minItems'], cf['maxItems']):
                    fails.append(f'{sid}.{path}: schema list bounds != contract')
                it = cf['item']
                if 'type' in it:
                    cmp(it, sf['items'], path + '[]')
                else:
                    for k, sub in it.items():
                        cmp(sub, sf['items']['properties'][k], f'{path}[].{k}')
            elif t == 'enum' and sf.get('enum') != cf['values']:
                fails.append(f'{sid}.{path}: schema enum != contract values')
        if set(cs['properties']) != set(s['content']['fields']):
            fails.append(f'{sid}: schema content properties != contract fields')
            continue
        if set(cs['required']) != {k for k, f in s['content']['fields'].items() if f['required']}:
            fails.append(f'{sid}: schema content.required != contract required fields')
        for k, f in s['content']['fields'].items():
            cmp(f, cs['properties'][k], k)
        if set(alts[sid]['properties']['motion']['allOf'][1]['properties']['pattern']['enum']) != set(s['motion']['allowedPatterns']):
            fails.append(f'{sid}: schema motion pattern enum != contract allowedPatterns')
    return fails, warns


def chk_allowlist(c):
    fails = []
    a = c.j('tokens/llm/component-allowlist.json')
    sch = c.j('schema/pagespec.schema.json')
    prims = sorted(os.path.basename(p)[:-5] for p in c.files('primitives/*.json'))
    comps = sorted(os.path.basename(p)[:-5] for p in c.files('components/*.json'))
    secs = c.sections()
    for name, listed, real in (('primitives', a['primitives'], prims), ('components', a['components'], comps)):
        for x in sorted(set(listed) - set(real)):
            fails.append(f'allowlist {name}: phantom entry {x} (no contract file)')
        for x in sorted(set(real) - set(listed)):
            fails.append(f'allowlist {name}: orphan contract {x} (no allowlist entry)')
    comp_secs = sorted(s for s, v in secs.items() if v['composable'])
    non = sorted(s for s, v in secs.items() if not v['composable'])
    for x in sorted(set(a['sections']) - set(comp_secs)):
        fails.append(f'allowlist sections: phantom entry {x}')
    for x in sorted(set(comp_secs) - set(a['sections'])):
        fails.append(f'allowlist sections: orphan contract {x}')
    if sorted(a['nonComposableSections']) != non:
        fails.append('allowlist nonComposableSections != non-composable contracts')
    for p in c.files('primitives/*.json') + c.files('components/*.json'):
        d = json.load(open(p, encoding='utf8'))
        if d['id'] != os.path.basename(p)[:-5]:
            fails.append(f'{os.path.relpath(p, c.root)}: id != file name')
        for s in d['usedBySections']:
            if s not in secs:
                fails.append(f'{d["id"]}: usedBySections {s} is not a section')
    tj = c.j('templates/templates.json')['templates']
    if sorted(a['templates']) != sorted(tj):
        fails.append('allowlist templates != templates.json')
    if sorted(a['templates']) != sorted(sch['properties']['template']['enum']):
        fails.append('allowlist templates != schema template enum')
    mp = c.j('tokens/00-foundation/motion-patterns.json')['patterns']
    if sorted(a['motionPatterns']) != sorted(mp) or sorted(a['motionPatterns']) != sorted(sch['definitions']['motion']['properties']['pattern']['enum']):
        fails.append('allowlist motionPatterns != motion-patterns.json / schema enum')
    if sorted(a['motionFields']) != sorted(sch['definitions']['motion']['properties']):
        fails.append('allowlist motionFields != schema motion properties')
    if sorted(a['pageSpecRootProperties']) != sorted(sch['properties']):
        fails.append('allowlist pageSpecRootProperties != schema root properties')
    node_props = set()
    for alt in sch['definitions']['node']['oneOf']:
        node_props |= set(alt['properties'])
    if sorted(a['sectionNodeProperties']) != sorted(node_props):
        fails.append(f'allowlist sectionNodeProperties {a["sectionNodeProperties"]} != schema node properties {sorted(node_props)}')
    used_roles, used_actions = set(), set()

    def walk(n):
        if isinstance(n, dict):
            if 'assetRole' in n.get('properties', {}):
                used_roles.update(n['properties']['assetRole']['enum'])
            if 'action' in n.get('properties', {}) and 'enum' in n['properties']['action']:
                used_actions.update(n['properties']['action']['enum'])
            for v in n.values():
                walk(v)
        elif isinstance(n, list):
            for v in n:
                walk(v)
    walk(sch)
    if sorted(a['assetRoles']) != sorted(used_roles):
        fails.append(f'allowlist assetRoles != roles in schema ({sorted(set(a["assetRoles"]) ^ used_roles)})')
    if sorted(a['ctaActions']) != sorted(used_actions):
        fails.append('allowlist ctaActions != schema action enums')
    if a.get('modes') != sch['properties'].get('mode', {}).get('enum'):
        fails.append('allowlist modes != schema mode enum')
    if sorted(a.get('styleFields', [])) != sorted(sch['definitions'].get('style', {}).get('properties', {})):
        fails.append('allowlist styleFields != schema style properties')
    if sorted(a.get('generationSafeAssetRoles', [])) != sorted(r for r in used_roles if PINNED_AVAILABILITY.get(r) == 'generation-safe'):
        fails.append('allowlist generationSafeAssetRoles != generation-safe roles used by the schema')
    if sorted(a['themes']) != sorted(sch['properties']['theme']['enum']) or sorted(a['chromeAxis']) != sorted(sch['properties']['chrome']['enum']):
        fails.append('allowlist themes / chromeAxis != schema enums')
    return fails, []


def chk_versions(c):
    fails = []
    m = c.j('registry.manifest.json')
    v = m['allowlistVersion']
    for rel in ('tokens/llm/component-allowlist.json', 'tokens/llm/token-catalog.json', 'tokens/llm/token-policy.json'):
        if c.j(rel)['allowlistVersion'] != v:
            fails.append(f'allowlistVersion drift: manifest {v} != {rel} {c.j(rel)["allowlistVersion"]}')
    note = m.get('versionFieldNote', '')
    if 'documentation-only' not in note or 'repositoryVersion' not in note or 'pageSpecVersion' not in note or 'allowlistVersion' not in note:
        fails.append('manifest versionFieldNote must say allowlistVersion is machine-checked and repositoryVersion/pageSpecVersion are documentation-only')
    if m.get('status') != 'design-review-pending' or m.get('productionApproved') is not False:
        fails.append('manifest status must be design-review-pending with productionApproved false')
    if not m.get('visibility', '').startswith('PRIVATE'):
        fails.append('manifest visibility must start with PRIVATE')
    if m.get('defaultTheme') not in m.get('schemaValidatedThemes', []):
        fails.append('defaultTheme must be one of schemaValidatedThemes')
    sch_themes = c.j('schema/pagespec.schema.json')['properties']['theme']['enum']
    if sorted(m['schemaValidatedThemes']) != sorted(sch_themes):
        fails.append('schemaValidatedThemes != schema theme enum')
    note2 = m.get('sourceProject', {}).get('note', '')
    if 'design-repo.zip' not in note2 or 'gitignore' not in note2.lower():
        fails.append('sourceProject.note must say design-repo.zip is a build artifact that is gitignored')
    if c.src and os.path.isdir(os.path.join(c.src, '.git')):
        gi = os.path.join(c.src, '.gitignore')
        if not os.path.isfile(gi) or 'design-repo.zip' not in open(gi, encoding='utf8').read():
            fails.append('the project is a git repository but .gitignore does not list design-repo.zip')
    return fails, []


def chk_counts(c):
    fails = []
    real = compute_counts(c.root)
    m = c.j('registry.manifest.json')['counts']
    for k, v in real.items():
        if m.get(k) != v:
            fails.append(f'manifest counts.{k} = {m.get(k)} but disk says {v}')
    for k in m:
        if k not in real:
            fails.append(f'manifest counts.{k} has no recomputation')
    for doc in ('README.md', 'CHANGELOG.md'):
        txt = open(os.path.join(c.root, doc), encoding='utf8').read()
        blk = json_block(txt, 'Counts (machine-checked)') if doc == 'README.md' else json_block(txt, 'counts (machine-checked)')
        if blk is None:
            fails.append(f'{doc}: no "counts (machine-checked)" JSON block')
            continue
        for k, v in real.items():
            if blk.get(k) != v:
                fails.append(f'{doc} count block {k} = {blk.get(k)} but disk says {v}')
    return fails, []


def route_pattern_re(p):
    return re.compile('^' + re.sub(r':[A-Za-z]+', '[^/]+', re.escape(p).replace('\\:', ':')) + '$')


def derive_chrome(t):
    secs = [n['section'] for n in t['nodes']]
    if 'chrome.navbar-dark' in secs:
        return 'dark-home'
    banner = 'chrome.announcement-bar' in secs
    cta = any(s in ('cta.snake-band', 'cta.snake-band-narrow') for s in secs)
    if banner and cta:
        return 'light-banner-cta'
    if cta and not banner:
        return 'light-cta'
    if not cta and not banner:
        return 'light-no-cta'
    return 'INCONSISTENT'


def chk_routes(c):
    fails, warns = [], []
    tj = c.j('templates/templates.json')
    tpls, routes = tj['templates'], tj['routes']
    listed = {}
    for tid, t in tpls.items():
        for r in t['routes']:
            if r in listed:
                fails.append(f'route {r} listed by two templates: {listed[r]} and {tid}')
            listed[r] = tid
        if len(t['routes']) < 1:
            fails.append(f'template {tid} has no routes')
        if t.get('newRoutePattern'):
            rx = route_pattern_re(t['newRoutePattern'])
            for r in t['routes']:
                if not rx.match(r.replace('%E2%80%99', '’')) and not rx.match(r):
                    fails.append(f'template {tid}: route {r} does not match newRoutePattern {t["newRoutePattern"]}')
        if derive_chrome(t) != t['chrome']:
            fails.append(f'template {tid}: chrome {t["chrome"]} but its node list implies {derive_chrome(t)}')
        if t['theme'] != ('dark-home' if t['chrome'] == 'dark-home' else 'light'):
            fails.append(f'template {tid}: theme {t["theme"]} inconsistent with chrome {t["chrome"]}')
    for r, info in routes.items():
        if listed.get(r) != info['template']:
            fails.append(f'route {r}: registry says {info["template"]} but templates list it under {listed.get(r)}')
        if info['evidence']['level'] not in ('measured', 'measured-sample', 'template-derived'):
            fails.append(f'route {r}: unknown evidence level')
    for r in listed:
        if r not in routes:
            fails.append(f'route {r} listed by a template but absent from the route registry')
    excl = tj['excludedRoutes']['urls']
    for r in excl:
        if r in routes:
            fails.append(f'unpublished route {r} must NOT be a route')
    if '/__shared' in routes:
        fails.append('/__shared is a dev-only demo route and must not be a route')
    if len(routes) != 118:
        fails.append(f'expected 118 routes, found {len(routes)}')
    if c.src:
        ia = json.load(open(os.path.join(c.src, 'ia/ia.json'), encoding='utf8'))
        ia_routes = {}
        for t in ia['templates']:
            for r in t['routes']:
                ia_routes[r] = t['id'].replace('template.', '')
        if set(ia_routes) != set(routes):
            fails.append(f'routes differ from ia/ia.json: {sorted(set(ia_routes) ^ set(routes))[:4]}')
        for r, tid in ia_routes.items():
            if routes.get(r, {}).get('template') != tid:
                fails.append(f'route {r}: template {routes.get(r, {}).get("template")} != ia.json {tid}')
        if sorted(excl) != sorted(ia['meta']['excludedRoutes']):
            fails.append('excludedRoutes != ia.json meta.excludedRoutes')
        sm = [l.strip().replace('https://www.lightdash.com', '') or '/' for l in open(os.path.join(c.src, 'specs/sitemap.txt')) if l.strip()]
        sm = [s or '/' for s in sm]
        if sorted(set(sm) - set(excl)) != sorted(routes):
            fails.append('routes != specs/sitemap.txt minus the unpublished routes')
        app = open(os.path.join(c.src, 'src/App.jsx'), encoding='utf8').read()
        app_paths = set(re.findall(r'path="([^"]+)"', app))
        for tid, t in tpls.items():
            for r in t['routes']:
                ok = r in app_paths or any('/:' in ap and route_pattern_re(ap).match(r.replace('%E2%80%99', '’')) for ap in app_paths)
                if not ok:
                    fails.append(f'route {r} has no matching <Route path> in src/App.jsx')
        extra = app_paths - set(routes) - {'*'}
        pats = {t['newRoutePattern'] for t in tpls.values() if t.get('newRoutePattern')}
        extra = {e for e in extra if e not in pats and e != tj['devOnlyRoutes']['urls'][0]}
        if extra:
            fails.append(f'src/App.jsx has routes the design-repo does not know: {sorted(extra)}')
        # differsFromIa must equal the real diff of node lists
        diff_real = {}
        for t in ia['templates']:
            tid = t['id'].replace('template.', '')
            mine = [n['section'] for n in tpls[tid]['nodes']]
            ia_nodes = [s for s in t['sections'] if not s.startswith('app.')]
            if sorted(tpls[tid].get('iframeStates', [])) != sorted(s for s in t['sections'] if s.startswith('app.')):
                fails.append(f'template {tid}: iframeStates != the ia.json app.* sections')
            if mine != ia_nodes:
                diff_real[tid] = True
        declared = {d['template'] for d in tj['differsFromIa']}
        if declared != set(diff_real):
            fails.append(f'templates differing from ia.json: declared {sorted(declared)} vs real {sorted(diff_real)}')
        # CMS member counts vs specs/cms
        def n_routes(prefix):
            return sum(1 for r in routes if r.startswith(prefix))
        cms = {'/blogpost/': ('blog', 'posts'), '/customer-story/': ('customer-stories', 'stories'), '/events/': ('events', 'events'), '/blog-categories/': ('blog-categories', 'categories')}
        for prefix, (f, k) in cms.items():
            real = len(json.load(open(os.path.join(c.src, f'specs/cms/{f}.json'), encoding='utf8'))[k])
            if real != n_routes(prefix):
                fails.append(f'{prefix}* routes {n_routes(prefix)} != specs/cms/{f}.json {real}')
        for r, info in routes.items():
            ref = info['evidence']['ref']
            if not os.path.exists(os.path.join(c.src, ref)):
                fails.append(f'route {r}: evidence ref {ref} does not exist')
    else:
        warns.append('no sibling source tree: routes not compared with ia/ia.json, specs/sitemap.txt, src/App.jsx or specs/cms (graceful skip)')
    return fails, warns


def chk_graph(c):
    fails = []
    sys.path.insert(0, os.path.join(c.root, 'schema'))
    import importlib
    import semantic_validate as sv
    importlib.reload(sv)
    g = c.j('compatibility/graph.json')
    ids = [r['id'] for r in g['rules']]
    if len(set(ids)) != len(ids):
        fails.append('duplicate rule ids in graph.json')
    for i in ids:
        if i not in sv.RULES:
            fails.append(f'graph rule {i} has no implementation in semantic_validate.py')
    for i in sv.RULES:
        if i not in ids:
            fails.append(f'semantic_validate.py implements {i} but graph.json does not declare it')
    repo = sv.Repo(c.root)
    tj = c.j('templates/templates.json')['templates']
    for r in g['rules']:
        if r['severity'] not in ('error', 'warn'):
            fails.append(f'{r["id"]}: severity must be error|warn')
        for e in r.get('exceptions', []):
            if e['template'] not in tj:
                fails.append(f'{r["id"]}: exception names unknown template {e["template"]}')
            if not e.get('reason'):
                fails.append(f'{r["id"]}: exception for {e["template"]} has no reason')
    # every named exception must still be NEEDED: the rule fires on that template without it; and no template violates a rule it is not excepted from
    for r in g['rules']:
        fn = sv.RULES.get(r['id'])
        if fn is None:
            continue
        excepted = {e['template'] for e in r.get('exceptions', [])}
        for tid, t in tj.items():
            nodes = [{'section': n['section'], 'content': ({repo.sections[n['section']]['variantField']: n['variant']} if 'variant' in n else {}), 'motion': {'pattern': repo.sections[n['section']]['motion']['allowedPatterns'][0]}} for n in t['nodes']]
            ctx = {'repo': repo, 'nodes': nodes, 'route': t['routes'][0], 'template': tid, 'chrome': t['chrome'], 'exceptions': []}
            msgs = fn(ctx, r.get('params', {}))
            if r['id'] == 'OPENER_IS_HERO':
                ctx['template'] = '__none__'
                msgs = fn(ctx, r.get('params', {}))
            if tid in excepted and not msgs:
                fails.append(f'{r["id"]}: exception for {tid} is stale (the rule does not fire there)')
            if tid not in excepted and msgs:
                fails.append(f'{r["id"]}: real template {tid} violates the rule without an exception: {msgs[0]}')
    return fails, []


def chk_assets(c):
    fails = []
    d = c.j('assets/asset-roles.json')
    sch = c.j('schema/pagespec.schema.json')
    secs = c.sections()
    pols = list(d['generationPolicies'])
    if sorted(pols) != sorted(PIN_POLICIES):
        fails.append(f'generationPolicies must be exactly {PIN_POLICIES}')
    roles = d['roles']
    pins = d['pinnedPolicies']
    for r, v in roles.items():
        if v['generationPolicy'] not in PIN_POLICIES:
            fails.append(f'role {r}: generationPolicy {v["generationPolicy"]} is not in the closed set')
        if r not in pins:
            fails.append(f'role {r}: not pinned in pinnedPolicies')
        elif v['generationPolicy'] != pins[r]:
            fails.append(f'role {r}: generationPolicy {v["generationPolicy"]} != pinned {pins[r]} (pinned-value check)')
    for r in pins:
        if r not in roles:
            fails.append(f'pinnedPolicies names unknown role {r}')
    expect = {
        'logo.customer-partner': 'must-not-fabricate', 'logo.integration': 'must-not-fabricate', 'badge.compliance': 'must-not-fabricate', 'photo.person-avatar': 'must-not-fabricate',
        'photo.team-member': 'must-not-fabricate', 'image.cms-cover': 'must-not-fabricate', 'screenshot.product-ui': 'must-reuse-exact', 'illustration.hero-diagram': 'must-reuse-exact',
        'illustration.html-diagram': 'must-reuse-exact', 'animation.rive': 'must-reuse-exact', 'video.self-hosted': 'must-reuse-exact', 'app.iframe-bundle': 'must-reuse-exact',
        'icon.pixel-art': 'may-generate-new', 'decor.pixel-tile': 'may-generate-new', 'decor.sticker': 'may-generate-new', 'embed.booking-cal': 'must-not-reuse-live-endpoint',
        'embed.live-demo': 'must-not-reuse-live-endpoint', 'embed.youtube': 'must-not-reuse-live-endpoint', 'form.submission-endpoint': 'must-not-reuse-live-endpoint',
        'brand.lightdash-wordmark': 'must-reuse-exact', 'content.lightdash-chrome-data': 'must-reuse-exact', 'brand.placeholder-mark': 'may-generate-new',
        'asset.operator-supplied': 'must-be-operator-supplied', 'illustration.generated': 'may-generate-new', 'screenshot.placeholder': 'may-generate-new',
        'animation.placeholder': 'may-generate-new', 'video.placeholder': 'may-generate-new', 'embed.operator-supplied': 'must-be-operator-supplied',
        'endpoint.operator-supplied': 'must-be-operator-supplied', 'content.operator-supplied-chrome': 'must-be-operator-supplied',
        'avatar.fictional-person': 'may-generate-new', 'logo.placeholder-company': 'may-generate-new', 'link.placeholder-url': 'may-generate-new', 'copy.original': 'may-generate-new'}
    for r, pol in expect.items():
        if roles.get(r, {}).get('generationPolicy') != pol:
            fails.append(f'role {r}: must be pinned to {pol} (this verifier hard-codes the intended policy, independent of the file)')
    for r in roles:
        if r not in expect:
            fails.append(f'role {r} has no hard-coded expected policy in verify_all.py')
    # parity with contracts / schema
    contract_roles = {}
    for sid, s in secs.items():
        def w(f, path):
            if f['type'] == 'media':
                for role in f['assetRoles']:
                    contract_roles.setdefault(role, set()).add(f'{sid}.{path}')
            elif f['type'] == 'list':
                it = f['item']
                if 'type' in it:
                    w(it, path + '[]')
                else:
                    for k, v in it.items():
                        w(v, f'{path}[].{k}')
        for k, f in s['content']['fields'].items():
            w(f, k)
    for r, v in roles.items():
        if v['usedInPageSpec']:
            if r not in contract_roles:
                fails.append(f'role {r}: marked usedInPageSpec but no contract field uses it')
            elif sorted(v['usedByFields']) != sorted(contract_roles[r]):
                fails.append(f'role {r}: usedByFields != contracts')
        elif r in contract_roles:
            fails.append(f'role {r}: used by contracts but marked usedInPageSpec false')
    for r in contract_roles:
        if r not in roles:
            fails.append(f'contracts use role {r} which is not in asset-roles.json')
    for p in d['forbiddenLiveHostPatterns']:
        try:
            re.compile(p['pattern'])
        except re.error as e:
            fails.append(f'forbidden pattern {p["pattern"]} invalid: {e}')
    need = {'cal\\.com', 'youtube\\.com', 'vercel\\.app', 'ashbyhq\\.com', 'hsforms|hubspot|hs-scripts'}
    have = {p['pattern'] for p in d['forbiddenLiveHostPatterns']}
    if not need <= have:
        fails.append(f'forbiddenLiveHostPatterns missing {sorted(need - have)}')
    # schema must restrict assetRef to slots
    if 'slot-' not in sch['definitions']['assetRef']['pattern']:
        fails.append('schema assetRef must be restricted to slot-* ids')
    if not d['licensing']['repoVisibility'].startswith('PRIVATE'):
        fails.append('licensing.repoVisibility must start with PRIVATE')
    return fails, []


def resolve_ref(tok, c, d):
    """'category.name' -> value in catalog or None"""
    cat, _, name = tok.partition('.')
    return d['categories'].get(cat, {}).get(name)


def chk_tokens(c):
    fails, warns = [], []
    cat = c.j('tokens/llm/token-catalog.json')['categories']
    pol = c.j('tokens/llm/token-policy.json')
    def lj(p): return c.j('tokens/' + p)
    expected = {
        'color': {k: v['$value'] for k, v in lj('00-foundation/color.json')['color'].items()},
        'fontFamily': {k: v['$value'] for k, v in lj('00-foundation/font-family.json')['fontFamily'].items()},
        'typography': {k: v['$value'] for k, v in lj('00-foundation/typography.json')['typography'].items()},
        'radius': {k: v['$value'] for k, v in lj('00-foundation/radius.json')['radius'].items()},
        'spacing': {k: v['$value'] for k, v in lj('00-foundation/spacing.json')['spacing'].items()},
        'breakpoint': {k: v['$value'] for k, v in lj('00-foundation/breakpoint.json')['breakpoint'].items()},
        'elevation': {k: v['$value'] for k, v in lj('00-foundation/elevation.json')['elevation'].items()},
        'iconSize': {k: v['$value'] for k, v in lj('00-foundation/icon-size.json')['iconSize'].items()},
        'semantic': {k: v['$value'] for k, v in lj('10-semantic/semantic.json')['semantic'].items()},
        'layout': {k: v['$value'] for k, v in lj('30-layout/layout.json')['layout'].items()},
    }
    for k, want in expected.items():
        got = {n: e['$value'] for n, e in cat.get(k, {}).items()}
        if got != want:
            fails.append(f'token-catalog category {k} differs from the token files ({sorted(set(got) ^ set(want))[:3] or "values"})')
    mo = lj('00-foundation/motion.json')['motion']
    for pre in ('easing', 'spring', 'duration', 'delay', 'distance', 'opacity'):
        want = {k.split('.', 1)[1]: v['$value'] for k, v in mo.items() if k.startswith(pre + '.')}
        got = {n: e['$value'] for n, e in cat.get(pre, {}).items()}
        if got != want:
            fails.append(f'token-catalog category {pre} differs from motion.json')
    if set(cat['component']) != set(lj('20-component/component.json')['component']):
        fails.append('token-catalog component category differs from component.json')
    for k in pol['rawValueRestrictions']:
        if k not in cat:
            fails.append(f'token-policy category {k} is not a real catalog key')
    if pol['overrides']['perInstanceTokenOverrides'] != 'catalog-tokens-only':
        fails.append('token-policy must record that node.style accepts catalog token references only')
    sch_style = c.j('schema/pagespec.schema.json')['definitions'].get('style', {}).get('properties', {})
    if sorted(pol['overrides'].get('styleFields', {})) != sorted(sch_style):
        fails.append('token-policy overrides.styleFields != schema definitions.style properties')
    sv_text = open(os.path.join(c.root, 'schema', 'semantic_validate.py'), encoding='utf8').read()
    need_rules = {'TOKEN_UNKNOWN', 'TOKEN_RAW_COLOR', 'TOKEN_ARBITRARY_SPACING', 'TOKEN_UNSUPPORTED_FONT', 'TOKEN_THEME_MISMATCH', 'TOKEN_SCOPE', 'TOKEN_CATEGORY'}
    have_rules = {r['id'] for r in pol.get('semanticRules', [])}
    if have_rules != need_rules:
        fails.append(f'token-policy semanticRules {sorted(have_rules)} != {sorted(need_rules)}')
    for r in need_rules:
        if f"'{r}: " not in sv_text and f'{r}: ' not in sv_text:
            fails.append(f'token rule {r} is declared but not implemented in semantic_validate.py')
    # themes
    sem = set(lj('10-semantic/semantic.json')['semantic'])
    def resolves(ref):
        m = re.fullmatch(r'\{([A-Za-z]+)\.(.+)\}', ref)
        return bool(m) and m.group(2) in cat.get(m.group(1), {})
    for th in ('light', 'dark-home'):
        t = lj(f'themes/{th}.json')
        if set(t['resolves']) != sem:
            fails.append(f'theme {th} does not resolve exactly the semantic keys ({sorted(set(t["resolves"]) ^ sem)[:3]})')
        for k, v in t['resolves'].items():
            if not resolves(v):
                fails.append(f'theme {th}: {k} -> {v} does not resolve')
    themes = {th: lj(f'themes/{th}.json')['resolves'] for th in ('light', 'dark-home')}
    for k, v in lj('10-semantic/semantic.json')['semantic'].items():
        if v['$value'] == '{theme}':
            # a theme-resolved key: both themes must resolve it and to DIFFERENT values (otherwise it is not theme-dependent)
            if themes['light'].get(k) == themes['dark-home'].get(k):
                fails.append(f'semantic {k} is {{theme}} but light and dark-home resolve it identically')
        elif not resolves(v['$value']):
            fails.append(f'semantic {k} -> {v["$value"]} does not resolve')
    for k, v in lj('20-component/component.json')['component'].items():
        for f, x in v.items():
            if isinstance(x, str) and x.startswith('{') and not resolves(x):
                fails.append(f'component {k}.{f} -> {x} does not resolve')
    for p in c.files('primitives/*.json'):
        d = json.load(open(p, encoding='utf8'))
        for t in d.get('tokensUsed', []):
            cname, _, n = t.partition('.')
            if n not in cat.get(cname, {}):
                fails.append(f'primitive {d["id"]}: tokensUsed {t} is not a catalog token')
    # evidence quotes (tokens): resolve + quote present
    n_ev = 0
    if c.src:
        for p in c.files('tokens/**/*.json'):
            def walk(o, path=''):
                nonlocal n_ev
                if isinstance(o, dict):
                    if 'evidence' in o and isinstance(o['evidence'], list):
                        for e in o['evidence']:
                            if not isinstance(e, dict):
                                continue  # motion-patterns.json evidence is plain citation strings, covered by the citations check
                            n_ev += 1
                            m = CITE.match(e['ref'])
                            if not m:
                                fails.append(f'{os.path.relpath(p, c.root)}{path}: malformed ref {e["ref"]}')
                                continue
                            f = os.path.join(c.src, m.group(1))
                            if not os.path.isfile(f):
                                fails.append(f'{e["ref"]}: file missing')
                                continue
                            L = open(f, encoding='utf8').read().split('\n')
                            a, b = int(m.group(2)), int(m.group(3) or m.group(2))
                            if b > len(L):
                                fails.append(f'{e["ref"]}: beyond end of file ({len(L)} lines)')
                            elif e['quote'] not in '\n'.join(L[a - 1:b]):
                                fails.append(f'{e["ref"]}: quote "{e["quote"][:40]}" not in the cited lines')
                    for k, v in o.items():
                        walk(v, f'{path}/{k}')
                elif isinstance(o, list):
                    for i, v in enumerate(o):
                        walk(v, f'{path}[{i}]')
            walk(json.load(open(p, encoding='utf8')))
        # colours vs tailwind.config.js, typography vs src/index.css
        tw = open(os.path.join(c.src, 'tailwind.config.js'), encoding='utf8').read()
        twc = dict(re.findall(r"'([\w-]+)':\s*'([^']+)'", tw.split('colors:')[1].split('fontFamily')[0]))
        colors = lj('00-foundation/color.json')['color']
        for k, v in twc.items():
            if colors.get(k, {}).get('$value') != v:
                fails.append(f'color {k}: tailwind.config.js says {v}, color.json says {colors.get(k, {}).get("$value")}')
        for k, v in colors.items():
            if k not in twc and k != 'black' and v.get('scope') != 'page-local':
                fails.append(f'color {k} is in color.json but neither in tailwind.config.js nor marked page-local')
        css = open(os.path.join(c.src, 'src/index.css'), encoding='utf8').read()
        for k, v in lj('00-foundation/typography.json')['typography'].items():
            m = re.search(r'\.ld-' + re.escape(k) + r'\s*\{([^}]*)\}', css)
            if not m:
                continue
            body, val = m.group(1), v['$value']
            for prop, key, cast in (('font-size', 'fontSize', float), ('line-height', 'lineHeight', float), ('font-weight', 'fontWeight', int)):
                mm = re.search(prop + r':\s*([\d.]+)', body)
                if mm and cast(mm.group(1)) != val[key]:
                    fails.append(f'typography {k}.{key}: index.css {mm.group(1)} != {val[key]}')
    else:
        warns.append('no sibling source tree: token evidence quotes, tailwind colours and index.css typography not re-checked (graceful skip)')
    return fails, warns


def chk_motion(c):
    fails = []
    mp = c.j('tokens/00-foundation/motion-patterns.json')
    pats = mp['patterns']
    sch = c.j('schema/pagespec.schema.json')
    for pid, p in pats.items():
        if p['reducedMotionFallback'] not in mp['reducedMotionFallbacks']:
            fails.append(f'{pid}: fallback {p["reducedMotionFallback"]} not in the closed set')
        if p['reducedMotionBasis'] not in mp['reducedMotionBases']:
            fails.append(f'{pid}: basis {p["reducedMotionBasis"]} not in the closed set')
        if p['trigger'] not in mp['triggers']:
            fails.append(f'{pid}: trigger not in the closed set')
        if pid != 'none' and not p['evidence']:
            fails.append(f'{pid}: no evidence')
        if p['reducedMotionBasis'] == 'source-implemented' and pid not in ('none',) and not any('reduced' in e or 'useRouteMotion' in e or 'legal.css' in e or 'VideoSection' in e or 'Replay' in e for e in p['evidence']):
            fails.append(f'{pid}: basis source-implemented but no evidence cites the reduced-motion handling')
    rules = {r['if']['properties']['pattern']['const']: r['then']['properties'] for r in sch['definitions']['motion']['allOf']}
    for pid, p in pats.items():
        t = rules.get(pid)
        if not t:
            fails.append(f'schema has no const-lock rule for pattern {pid}')
        elif t['reducedMotionFallback']['const'] != p['reducedMotionFallback'] or t['reducedMotionBasis']['const'] != p['reducedMotionBasis']:
            fails.append(f'schema const-lock for {pid} != motion-patterns.json')
    for sid, s in c.sections().items():
        m = s['motion']
        if set(m['reducedMotionFallbacks']) != set(m['allowedPatterns']) or set(m['reducedMotionBases']) != set(m['allowedPatterns']):
            fails.append(f'{sid}: reducedMotionFallbacks / Bases keys != allowedPatterns')
        for pat in m['allowedPatterns']:
            if pat not in pats:
                fails.append(f'{sid}: unknown pattern {pat}')
                continue
            if m['reducedMotionFallbacks'].get(pat) != pats[pat]['reducedMotionFallback'] or m['reducedMotionBases'].get(pat) != pats[pat]['reducedMotionBasis']:
                fails.append(f'{sid}: fallback/basis for {pat} != motion-patterns.json')
    return fails, []


def parse_cite(ref):
    m = CITE.match(ref)
    return (m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))) if m else None


def chk_citations(c):
    fails, warns = [], []
    mv = c.j('extraction/measured-values.json')
    idx = {}
    for e in mv['citationChecks']:
        idx.setdefault(e['ref'], []).extend(e['contains'])
    skip = {'extraction/wordcount_spec.json'}
    found = {}
    for p in c.files('**/*.json'):
        rel = os.path.relpath(p, c.root)
        if rel in skip or (rel.startswith('tokens/') and rel != 'tokens/00-foundation/motion-patterns.json') or rel.startswith('schema/'):
            continue
        doc = json.load(open(p, encoding='utf8'))
        if rel == 'extraction/measured-values.json':
            doc = {k: v for k, v in doc.items() if k not in ('citationChecks',)}
        for pth, s in walk_strings(doc):
            if CITE.match(s) and not s.startswith(('http', '#')):
                found.setdefault(s, []).append(rel)
    for ref, where in found.items():
        if ref not in idx:
            fails.append(f'{where[0]}: citation {ref} is not covered by measured-values.json citationChecks')
    for ref in idx:
        if parse_cite(ref) is None:
            fails.append(f'citationChecks ref {ref} malformed')
    unused = [r for r in idx if r not in found]
    if unused:
        fails.append(f'{len(unused)} citationChecks entries are not cited anywhere (stale), e.g. {unused[0]}')
    if not c.src:
        warns.append(f'no sibling source tree: {len(idx)} citations ({len(found)} in contracts/templates/roles/patterns) not resolved against source (graceful skip)')
        return fails, warns
    bad = 0
    for ref, contains in idx.items():
        pc = parse_cite(ref)
        if pc is None:
            continue
        f = os.path.join(c.src, pc[0])
        if not os.path.isfile(f):
            fails.append(f'{ref}: file does not exist'); bad += 1
            continue
        L = open(f, encoding='utf8').read().split('\n')
        if pc[1] < 1 or pc[2] > len(L) or pc[1] > pc[2]:
            fails.append(f'{ref}: out of range (file has {len(L)} lines)'); bad += 1
            continue
        chunk = '\n'.join(L[pc[1] - 1:pc[2]])
        for s in contains:
            if s not in chunk:
                fails.append(f'{ref}: anchor "{s[:50]}" not in the cited lines (in range but describing other code)'); bad += 1
                break
    return fails, warns


def chk_packaging(c):
    fails = []
    for dp, dn, fn in os.walk(c.root):
        for n in fn + dn:
            if n in ('.DS_Store',) or n == '__MACOSX' or n.endswith('.zip'):
                fails.append(f'{os.path.relpath(os.path.join(dp, n), c.root)}: must not ship inside the repo')
    ps = os.path.join(c.root, 'extraction/prove_drift.py')
    if not os.path.isfile(ps):
        fails.append('extraction/prove_drift.py does not exist')
    elif '--scratch' not in open(ps, encoding='utf8').read():
        fails.append('extraction/prove_drift.py does not support --scratch')
    ref_re = re.compile(r'\b((?:extraction|schema|tokens|assets|compatibility|templates|sections|primitives|components|policy)/[A-Za-z0-9_./*-]+\.(?:py|sh|json|mjs))\b')
    for p in list(all_text_files(c.root)):
        rel = os.path.relpath(p, c.root)
        if rel.startswith(('sections/', 'primitives/', 'components/')):
            continue
        txt = open(p, encoding='utf8', errors='ignore').read()
        for m in ref_re.finditer(txt):
            r = m.group(1)
            if '*' in r or r.startswith('sections/'):
                continue
            if not os.path.exists(os.path.join(c.root, r)):
                fails.append(f'{rel}: mentions {r} which does not exist')
    return fails, []


def chk_source_claims(c):
    fails, warns = [], []
    mv = c.j('extraction/measured-values.json')
    if not c.src:
        return [], ['no sibling source tree: framework versions and documented anomalies not re-diffed (graceful skip)']
    pj = json.load(open(os.path.join(c.src, 'package.json')))
    declared = {**pj.get('dependencies', {}), **pj.get('devDependencies', {})}
    for k, v in mv['frameworkSnapshot']['declared'].items():
        if declared.get(k) != v:
            fails.append(f'frameworkSnapshot.declared {k} = {v} but package.json says {declared.get(k)}')
    for k in declared:
        if k not in mv['frameworkSnapshot']['declared']:
            fails.append(f'package.json dependency {k} missing from frameworkSnapshot')
    for a in mv['anomalies']:
        hits = 0
        for rel in a['grepFiles']:
            f = os.path.join(c.src, rel)
            if os.path.isfile(f) and a['keyword'] in open(f, encoding='utf8', errors='ignore').read():
                hits += 1
        if hits == 0:
            fails.append(f'anomaly {a["id"]}: keyword "{a["keyword"]}" no longer found in {a["grepFiles"]} (the source moved; re-verify the claim)')
    return fails, warns


def _media_roles(f, acc):
    if f['type'] == 'media':
        acc.extend(f['assetRoles'])
    elif f['type'] == 'list':
        it = f['item']
        if 'type' in it:
            _media_roles(it, acc)
        else:
            for v in it.values():
                _media_roles(v, acc)
    return acc


def chk_contracts(c):
    fails, warns = [], []
    try:
        from jsonschema import Draft7Validator
    except ModuleNotFoundError:
        return ['jsonschema is not installed (pip install jsonschema)'], []
    cs = c.j('schema/section-contract.schema.json')
    Draft7Validator.check_schema(cs)
    v = Draft7Validator(cs)
    if cs.get('additionalProperties') is not False:
        fails.append('section-contract.schema.json root is not closed')
    al = c.j('tokens/llm/component-allowlist.json')
    inel = []
    for sid, s in c.sections().items():
        for e in v.iter_errors(s):
            fails.append(f'{sid}: section-contract schema: {"/".join(str(x) for x in e.absolute_path)}: {e.message[:120]}')
        src, sem = s.get('source', {}), s.get('semantic', {})
        if sem.get('id') != sid:
            fails.append(f'{sid}: semantic.id {sem.get("id")} != contract id')
        if sem.get('category') != s.get('category'):
            fails.append(f'{sid}: semantic.category {sem.get("category")} != category {s.get("category")}')
        if src.get('id') == sid:
            fails.append(f'{sid}: source.id must not equal the contract id (provenance is not taxonomy)')
        want = PINNED_RETRIEVAL.get(sid, True)
        if s.get('retrievalEligible') is not want:
            fails.append(f'{sid}: retrievalEligible {s.get("retrievalEligible")} != pinned {want} (PINNED_RETRIEVAL)')
        if RUNTIME_UI_RE.search(sid) and sid not in PINNED_RETRIEVAL:
            fails.append(f'{sid}: looks like runtime UI (modal / drawer / overlay ...) but is not in PINNED_RETRIEVAL')
        if s.get('retrievalEligible') is False:
            inel.append(sid)
        roles = _media_roles({'type': 'list', 'item': s['content']['fields'], 'minItems': 0, 'maxItems': 0}, []) if s['content']['fields'] else []
        gen = sorted({r for r in roles if PINNED_AVAILABILITY.get(r) == 'generation-safe'})
        if sorted(s.get('generatedAssetRoles', [])) != gen:
            fails.append(f'{sid}: generatedAssetRoles {s.get("generatedAssetRoles")} != generation-safe roles of its media fields {gen}')
        for r in roles:
            if PINNED_AVAILABILITY.get(r) != 'generation-safe':
                alts = [x for x in roles if PINNED_AVAILABILITY.get(x) == 'generation-safe']
                if not alts:
                    fails.append(f'{sid}: a media field allows {r} but offers no generation-safe substitute')
        if c.src:
            locs = [src] + src.get('alsoRenderedAt', [])
            for loc in locs:
                f = os.path.join(c.src, loc.get('file', ''))
                if not os.path.isfile(f):
                    fails.append(f'{sid}: source file {loc.get("file")} does not exist'); continue
                L = open(f, encoding='utf8').read().split('\n')
                a, _, b = loc['lines'].partition('-')
                a, b = int(a), int(b or a)
                if not (1 <= a <= b <= len(L)):
                    fails.append(f'{sid}: source lines {loc["lines"]} outside {loc["file"]} ({len(L)} lines)'); continue
                if not re.search(r'<' + re.escape(loc['tag']) + r'\b', L[a - 1]):
                    fails.append(f'{sid}: source tag <{loc["tag"]}> is not at {loc["file"]}:{a}')
    if sorted(al.get('retrievalIneligibleSections', [])) != sorted(inel):
        fails.append('allowlist retrievalIneligibleSections != contracts with retrievalEligible false')
    if not c.src:
        warns.append('no sibling source tree: contract source ranges / tags not re-read (graceful skip)')
    return fails, warns


def chk_generation(c):
    fails, warns = [], []
    d = c.j('assets/asset-roles.json')
    roles = d['roles']
    for r, v in roles.items():
        pin = PINNED_AVAILABILITY.get(r)
        if pin is None:
            fails.append(f'role {r} has no PINNED_AVAILABILITY entry in verify_all.py')
            continue
        if v.get('availability') != pin:
            fails.append(f'role {r}: availability {v.get("availability")} != pinned {pin}')
        if d.get('pinnedAvailability', {}).get(r) != pin:
            fails.append(f'role {r}: asset-roles.json pinnedAvailability {d.get("pinnedAvailability", {}).get(r)} != pinned {pin}')
        subs = v.get('generationSafeSubstitutes')
        if subs is None or not v.get('generatedModeGuidance'):
            fails.append(f'role {r}: missing generationSafeSubstitutes / generatedModeGuidance')
            continue
        if pin != 'generation-safe' and not subs:
            fails.append(f'role {r}: {pin} role without generationSafeSubstitutes')
        for x in subs:
            if PINNED_AVAILABILITY.get(x) != 'generation-safe':
                fails.append(f'role {r}: substitute {x} is not generation-safe')
        if pin != 'generation-safe' and v['generationPolicy'] == 'must-reuse-exact' and 'REJECTED' not in v['generatedModeGuidance']:
            fails.append(f'role {r}: must-reuse-exact clone asset must say it is REJECTED in generation mode')
    for r in PINNED_AVAILABILITY:
        if r not in roles:
            fails.append(f'PINNED_AVAILABILITY names {r} which is not in asset-roles.json')
    if roles.get('brand.lightdash-wordmark', {}).get('availability') == 'generation-safe':
        fails.append('the real Lightdash wordmark can never be generation-safe')
    need_safe = {'brand.placeholder-mark', 'asset.operator-supplied', 'illustration.generated', 'screenshot.placeholder', 'avatar.fictional-person',
                 'logo.placeholder-company', 'link.placeholder-url', 'copy.original', 'animation.placeholder', 'embed.operator-supplied'}
    for r in need_safe:
        if PINNED_AVAILABILITY.get(r) != 'generation-safe' or r not in roles:
            fails.append(f'required generation-safe role {r} missing')
    sys.path.insert(0, os.path.join(c.root, 'schema'))
    import importlib
    import semantic_validate as sv
    importlib.reload(sv)
    if sv.PINNED_AVAILABILITY != PINNED_AVAILABILITY:
        fails.append(f'semantic_validate.py PINNED_AVAILABILITY differs from verify_all.py: {sorted(set(sv.PINNED_AVAILABILITY.items()) ^ set(PINNED_AVAILABILITY.items()))[:3]}')
    if sv.PINNED_RETRIEVAL != PINNED_RETRIEVAL:
        fails.append('semantic_validate.py PINNED_RETRIEVAL differs from verify_all.py')
    for r, a in PINNED_AVAILABILITY.items():
        if a != 'generation-safe' and r not in sv.ROLE_RULE:
            fails.append(f'semantic_validate.py ROLE_RULE has no generation rule for {r}')
    sch = c.j('schema/pagespec.schema.json')
    if sch['properties'].get('mode', {}).get('enum') != ['clone', 'generation'] or 'mode' not in sch.get('required', []):
        fails.append('schema: mode must be a required closed enum [clone, generation]')
    ex = c.j('schema/example.pagespec.json')
    if ex.get('mode') != 'clone':
        fails.append('schema/example.pagespec.json must be mode clone')
    repo = sv.Repo(c.root)
    tj = c.j('templates/templates.json')['templates']
    groups = {t.get('group') for t in tj.values()}
    if set(FAMILY_EXAMPLES) != groups:
        fails.append(f'FAMILY_EXAMPLES {sorted(FAMILY_EXAMPLES)} != template groups {sorted(groups)}')
    for grp, fam in FAMILY_EXAMPLES.items():
        rel = f'schema/examples/generation/{fam}.generated.pagespec.json'
        if not os.path.isfile(os.path.join(c.root, rel)):
            fails.append(f'{rel} missing (template family {grp})')
            continue
        spec = c.j(rel)
        if spec.get('mode') != 'generation':
            fails.append(f'{rel}: mode must be generation')
        if tj.get(spec.get('template'), {}).get('group') != grp:
            fails.append(f'{rel}: template {spec.get("template")} is not in family {grp}')
        errs, ws = sv.validate(spec, repo)
        for e in errs[:5]:
            fails.append(f'{rel}: {e}')
        if ws:
            fails.append(f'{rel}: {len(ws)} warning(s): {ws[:2]}')
    idt = c.j('schema/source-identity.json')
    for k in ('brand', 'hosts', 'people', 'customers', 'claims', 'numericClaims'):
        if not idt.get(k):
            fails.append(f'schema/source-identity.json has no {k} patterns')
    if not idt.get('copyShingles', {}).get('hashes'):
        fails.append('schema/source-identity.json has no copy shingles')
    if c.src:
        sys.path.insert(0, os.path.join(c.root, 'extraction'))
        import build_source_identity as bsi
        importlib.reload(bsi)
        fresh = json.dumps(bsi.build(c.src), indent=1, ensure_ascii=False) + '\n'
        if open(os.path.join(c.root, 'schema/source-identity.json'), encoding='utf8').read() != fresh:
            fails.append('schema/source-identity.json is stale: it differs from a fresh build from the source tree (run extraction/build_source_identity.py)')
        for k in ('brand', 'hosts', 'people', 'customers', 'claims', 'numericClaims'):
            for e in idt[k][:400]:
                for ref in e['evidence'][:1]:
                    f, ln = ref.rsplit(':', 1)
                    p = os.path.join(c.src, f)
                    if not os.path.isfile(p) or int(ln) > len(open(p, encoding='utf8', errors='ignore').read().split('\n')):
                        fails.append(f'source-identity {k} evidence {ref} does not resolve')
    else:
        warns.append('no sibling source tree: schema/source-identity.json not rebuilt from source (graceful skip)')
    return fails, warns


def chk_wrapper_gate(c):
    sys.path.insert(0, os.path.join(c.root, 'extraction'))
    import importlib
    import wrapper_gate as wg
    importlib.reload(wg)
    fails, warns = wg.run(c.root)
    pins = {'VIEWPORT_WIDTH': 1440, 'HERO_WARN_PX': 1800, 'HERO_ERROR_PX': 3000, 'SHARE_WARN': 0.50, 'SHARE_ERROR': 0.60, 'MIN_INFLOW_FOR_SHARE': 3}
    for k, val in pins.items():
        if getattr(wg, k, None) != val:
            fails.append(f'wrapper_gate.py {k} = {getattr(wg, k, None)} but the pinned threshold is {val}')
    return fails, warns


def policy_hash(root, files):
    h = hashlib.sha256()
    for rel in sorted(files):
        h.update(rel.encode() + b'\0' + open(os.path.join(root, rel), 'rb').read() + b'\0')
    return 'sha256:' + h.hexdigest()


def chk_policy(c):
    fails = []
    m = c.j('registry.manifest.json')
    dp = m.get('designPolicy')
    if m.get('category') != 'saas':
        fails.append(f'manifest category {m.get("category")} != saas (B2B SaaS evidence in policy/design-policy.json)')
    if not dp:
        return fails + ['manifest has no designPolicy binding'], []
    if (dp.get('policyId'), dp.get('policyVersion')) != SAAS_POLICY:
        fails.append(f'designPolicy binds {dp.get("policyId")}@{dp.get("policyVersion")}, expected {SAAS_POLICY[0]}@{SAAS_POLICY[1]}')
    if dp.get('commonIrVersion') != '0.5' or dp.get('enforcementMode') != 'hard-and-soft':
        fails.append('designPolicy commonIrVersion must be 0.5 and enforcementMode hard-and-soft')
    ref = dp.get('ref', '')
    if not os.path.isfile(os.path.join(c.root, ref)):
        return fails + [f'designPolicy.ref {ref} does not exist'], []
    pol = c.j(ref)
    if (pol.get('policyId'), pol.get('policyVersion'), pol.get('commonIrVersion')) != (SAAS_POLICY[0], SAAS_POLICY[1], '0.5'):
        fails.append(f'{ref} policyId / version / commonIrVersion disagree with the manifest binding')
    if pol.get('classification', {}).get('isSaaS') is not True or not pol.get('classification', {}).get('evidence'):
        fails.append(f'{ref} must classify the product as SaaS with evidence')
    for e in pol.get('classification', {}).get('evidence', []):
        if c.src:
            f, ln = e['ref'].rsplit(':', 1)
            p = os.path.join(c.src, f)
            if not os.path.isfile(p) or int(ln) > len(open(p, encoding='utf8').read().split('\n')):
                fails.append(f'{ref}: evidence {e["ref"]} does not resolve')
    files = pol.get('enforcedBy', [])
    for f in files:
        if not os.path.isfile(os.path.join(c.root, f)):
            fails.append(f'{ref}: enforcedBy {f} does not exist')
    if not fails:
        want = policy_hash(c.root, files)
        if dp.get('contentHash') != want:
            fails.append(f'designPolicy.contentHash {dp.get("contentHash")} != recomputed {want}')
    if pol.get('approval', {}).get('architectureDecisionRecorded') is not False:
        fails.append(f'{ref}: approval.architectureDecisionRecorded must stay false until a human records it')
    return fails, []


CHECKS = [('self-containment', chk_self), ('json', chk_json), ('schema', chk_schema), ('structure', chk_structure), ('maxwords', chk_maxwords), ('allowlist parity', chk_allowlist),
          ('allowlistVersion', chk_versions), ('manifest counts', chk_counts), ('routes', chk_routes), ('graph', chk_graph), ('assets', chk_assets), ('tokens', chk_tokens),
          ('motion', chk_motion), ('citations', chk_citations), ('packaging', chk_packaging), ('source-claims', chk_source_claims),
          ('contracts', chk_contracts), ('generation', chk_generation), ('wrapper gate', chk_wrapper_gate), ('policy', chk_policy)]
ALIASES = {'assets': 'assets', 'counts': 'manifest counts'}


def run_checks(root=None, only=None, quiet=True):
    """Returns the list of FAIL messages. only: list of check names (e.g. ['assets'])."""
    root = root or REPO0
    c = Ctx(root)
    out = []
    for name, fn in CHECKS:
        if only and name not in only:
            continue
        try:
            f, w = fn(c)
        except Exception as e:  # a crashing check is a failing check
            f, w = [f'check crashed: {type(e).__name__}: {e}'], []
        for x in f:
            out.append(f'{name}: {x}')
        if not quiet:
            for x in w:
                print(f'WARN {name}: {x}')
            for x in f[:40]:
                print(f'FAIL {name}: {x}')
            if len(f) > 40:
                print(f'FAIL {name}: ... {len(f) - 40} more')
            if not f:
                print(f'PASS {name}')
    return out


def main():
    c = Ctx(REPO0)
    print(f'design-repo: {REPO0 if False else "."}  source tree: {"present" if c.src else "absent (source-dependent checks WARN and skip)"}')
    fails = run_checks(REPO0, quiet=False)
    nchecks = len(CHECKS)
    print(f'SUMMARY {nchecks} checks, {len(fails)} failure(s)')
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
