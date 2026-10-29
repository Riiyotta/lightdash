#!/usr/bin/env python3
"""build_source_identity.py: derives schema/source-identity.json from the REAL source of the Lightdash clone.

Usage:  python3 extraction/build_source_identity.py            (rewrite schema/source-identity.json)
        python3 extraction/build_source_identity.py --check    (exit 1 if the committed registry differs from a fresh build)

Needs the sibling project (parent folder with src/, specs/, CLONE_SPEC.md, ASSETS.json and a package.json named
lightdash-clone). semantic_validate.py uses the registry to reject Lightdash identity / content in mode "generation":

  brand      Lightdash name variants (wordmark text, domains, the "Lightdashians" demonym)        GENERATION_MODE_BRAND
  hosts      every host name found in the source (lightdash.com, cal.com, youtube.com ...)       GENERATION_MODE_URL
  people     real named people (team, speakers, quote / story / blog authors, partners)          GENERATION_MODE_PERSON
  customers  real customer / partner / co-host / integration names (logo alt text, company keys) GENERATION_MODE_CUSTOMER
  claims     certification / award marks and numeric marketing claims found in the source        GENERATION_MODE_CLAIM
  copy       sha256-16 hashes of every 5-word shingle of the source marketing copy               GENERATION_MODE_COPY

Every pattern keeps up to 3 file:line evidence refs. Strings are normalised before both extraction and matching
(NFKC, zero-width removal, curly quotes -> straight, dashes -> '-', lower case, whitespace collapsed; shingles also
drop punctuation). Detection is string-based: it catches verbatim and lightly reformatted reuse, not paraphrase.
Placeholder bodies (lorem text) are not Lightdash copy and are excluded. Root derived from __file__.
"""
import hashlib
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
OUT = os.path.join(REPO, 'schema', 'source-identity.json')
ZW = re.compile('[​-‏⁠-⁤﻿­]')
DASH = re.compile('[‐-―−]')
QUOTES = {'‘': "'", '’': "'", '‚': "'", '‛': "'", '“': '"', '”': '"', '„': '"', '«': '"', '»': '"'}
EXCLUDE = {'src/components/legal/placeholder.js', 'src/components/cms/PlaceholderBody.jsx'}
SHINGLE = 5


def norm(s):
    s = unicodedata.normalize('NFKC', s)
    s = ZW.sub('', s)
    for a, b in QUOTES.items():
        s = s.replace(a, b)
    s = DASH.sub('-', s)
    return re.sub(r'\s+', ' ', s).strip().lower()


def words(s):
    return re.findall(r"[0-9a-zÀ-ɏ぀-ヿ一-鿿]+(?:'[a-z]+)?", norm(s))


def shingles(s, n=SHINGLE):
    w = words(s)
    return {' '.join(w[i:i + n]) for i in range(len(w) - n + 1)}


def h16(s):
    return hashlib.sha256(s.encode('utf8')).hexdigest()[:16]


def project_root():
    proj = os.path.dirname(REPO)
    pj = os.path.join(proj, 'package.json')
    try:
        if os.path.isdir(os.path.join(proj, 'src')) and json.load(open(pj)).get('name') == 'lightdash-clone':
            return proj
    except Exception:
        pass
    return None


def source_files(proj):
    out = []
    for base in ('src',):
        for dp, dn, fn in os.walk(os.path.join(proj, base)):
            for f in sorted(fn):
                if f.endswith(('.js', '.jsx')):
                    rel = os.path.relpath(os.path.join(dp, f), proj)
                    if rel not in EXCLUDE:
                        out.append(rel)
    for f in sorted(os.listdir(os.path.join(proj, 'specs', 'cms'))):
        if f.endswith('.json'):
            out.append('specs/cms/' + f)
    for f in ('CLONE_SPEC.md', 'specs/SHARED.md', 'specs/company-pages.md', 'specs/product-pages.md', 'specs/cms-templates.md', 'specs/legal-pages.md', 'ASSETS.json', 'public/gameboy/index.html'):
        if os.path.isfile(os.path.join(proj, f)):
            out.append(f)
    return sorted(out)


STR_RE = re.compile(r"'((?:[^'\\\n]|\\.){3,})'|\"((?:[^\"\\\n]|\\.){3,})\"|`([^`]{3,})`|>([^<>{}\n]{3,})<|“([^”\n]{3,})”")


def strings_with_lines(text):
    for i, line in enumerate(text.split('\n'), 1):
        for m in STR_RE.finditer(line):
            s = next(g for g in m.groups() if g is not None)
            yield i, s


def add(d, key, ref, display=None):
    e = d.setdefault(key, {'display': display or key, 'evidence': []})
    if ref not in e['evidence'] and len(e['evidence']) < 3:
        e['evidence'].append(ref)


PERSON_RE = re.compile(r"^[A-ZÀ-Þ][a-zß-ÿ'’-]+(?: [A-ZÀ-Þ][a-zß-ÿ'’.-]+){1,2}$")
HOST_RE = re.compile(r'(?:https?:)?//([a-z0-9-]+(?:\.[a-z0-9-]+)+)|\b([a-z0-9-]+\.(?:com|cloud|io|ai|app|dev|net|org|co|jp|so|sh))\b', re.I)
CLAIM_TERMS = ['soc 2', 'soc2', 'hipaa', 'gdpr', 'iso 27001', 'aicpa', 'g2 high performer', 'g2 momentum leader', 'g2 easiest', 'g2 users most likely to recommend', 'g2 leader']
NUM_CLAIM_RE = re.compile(r"\b\d[\d,.]*\s?(?:%|x\b|\+|k\+|m\+)\s+[a-z']+(?: [a-z']+)?")
BRAND_VARIANTS = [('lightdash', r'light\s*-?\s*dash'), ('lightdashians', r'light\s*-?\s*dashians')]


def build(proj):
    files = source_files(proj)
    brand, hosts, people, customers, claims, num_claims = {}, {}, {}, {}, {}, {}
    copy = set()
    digest = hashlib.sha256()
    for rel in files:
        raw = open(os.path.join(proj, rel), encoding='utf8', errors='ignore').read()
        digest.update(rel.encode() + b'\0' + raw.encode('utf8', 'ignore'))
        lines = raw.split('\n')
        for i, line in enumerate(lines, 1):
            nl = norm(line)
            ref = f'{rel}:{i}'
            for key, pat in BRAND_VARIANTS:
                if re.search(pat, nl):
                    add(brand, key, ref)
            for m in HOST_RE.finditer(line):
                h = (m.group(1) or m.group(2) or '').lower().strip('.')
                if h and not re.search(r'\.(jsx?|css|png|svg|webp|jpe?g|gif|mp4|woff2?|ttf|json|md|html|riv|glb)$', h) and '.' in h:
                    add(hosts, h, ref)
            for t in CLAIM_TERMS:
                if t in nl:
                    add(claims, t, ref)
            # people: name: '<First Last>' near a role key, team T('Name', 'Role', slug), JSON author / person names
            for m in re.finditer(r"name\s*:\s*['\"]([^'\"]{3,40})['\"]", line):
                nm = m.group(1)
                ctx = '\n'.join(lines[max(0, i - 4):i + 3])
                if PERSON_RE.match(nm) and re.search(r'\brole\b|\bavatar\b|\bphoto\b|\bportrait\b', ctx):
                    add(people, norm(nm), ref, nm)
            for m in re.finditer(r"\bT\(\s*'([^']{3,40})'\s*,\s*'", line):
                if PERSON_RE.match(m.group(1)):
                    add(people, norm(m.group(1)), ref, m.group(1))
            for m in re.finditer(r"\b(?:company|alt|companyName|cohost|partner)\s*[:=]\s*['\"]([^'\"]{2,40})['\"]", line):
                nm = m.group(1).strip()
                low = norm(nm)
                if re.search(r'light\s*-?\s*dash|^g2 |placeholder|sticker|^yes$|^no$|icon|illustration|logo$|avatar|^image', low):
                    continue
                add(customers, low, ref, nm)
        if rel == 'src/pages/data/integrations.js':
            for i, line in enumerate(lines, 1):
                for m in re.finditer(r"name\s*:\s*'([^']{2,40})'", line):
                    add(customers, norm(m.group(1)), f'{rel}:{i}', m.group(1))
        if rel.startswith('specs/cms/') and rel.endswith('.json'):
            for i, line in enumerate(lines, 1):
                m = re.search(r'"name"\s*:\s*"([^"]{3,40})"', line)
                if m and PERSON_RE.match(m.group(1)):
                    add(people, norm(m.group(1)), f'{rel}:{i}', m.group(1))
        # copy shingles + numeric claims from string literals / JSX text / quoted spec text
        is_md = rel.endswith('.md')
        for i, s in strings_with_lines(raw):
            if is_md and not re.search(r'[“"].*', s):
                pass
            if re.search(r'[{}<>]|\bclassName\b|^[\w.-]+$|https?://|\.(?:png|svg|webp|jpe?g|riv)\b', s) and not is_md:
                continue
            w = words(s)
            if len(w) < 3:
                continue
            for m in NUM_CLAIM_RE.finditer(norm(s)):
                add(num_claims, m.group(0), f'{rel}:{i}')
            if len(w) >= SHINGLE:
                copy |= {h16(x) for x in shingles(s)}
    # blog / event category names are not people; template literals, numbers and claim marks are not customers
    cats = set()
    bc = os.path.join(proj, 'specs', 'cms', 'blog-categories.json')
    if os.path.isfile(bc):
        cats = {norm(c.get('name', '')) for c in json.load(open(bc, encoding='utf8')).get('categories', [])}
    for k in list(people):
        if k in customers or k in cats:
            del people[k]
    for k in list(customers):
        v = customers[k]
        if '${' in k or re.fullmatch(r'[\d\W]+', k) or k in ('you',) or any(t in k for t in CLAIM_TERMS):
            del customers[k]
        elif PERSON_RE.match(v['display']):
            src_line = v['evidence'][0]
            f, ln = src_line.rsplit(':', 1)
            ctx = '\n'.join(open(os.path.join(proj, f), encoding='utf8', errors='ignore').read().split('\n')[max(0, int(ln) - 4):int(ln) + 2])
            if re.search(r'avatar|photo|portrait|person|author', ctx, re.I):
                people[k] = customers.pop(k)
    num_claims = {k: v for k, v in num_claims.items() if all(len(w) >= 3 for w in k.split()[1:]) and not re.match(r'^\d+ \+', k)}
    hosts = {h: v for h, v in hosts.items() if not h.endswith(('.example', '.invalid', 'w3.org')) and not re.match(r'^\d', h)}
    reg = {
        '$description': 'GENERATED by extraction/build_source_identity.py from the real source of the Lightdash clone (src/, specs/, CLONE_SPEC.md, ASSETS.json, public/gameboy/index.html). Used by schema/semantic_validate.py GENERATION_MODE_* rules. Do not hand-edit: verify_all.py re-builds it from the source tree and fails on any difference. No human reviewed these patterns; detection is string-based (verbatim or lightly reformatted reuse, not paraphrase).',
        'generatedBy': 'extraction/build_source_identity.py',
        'normalization': ['NFKC', 'zero-width / soft-hyphen removal', 'curly quotes -> straight', 'unicode dashes -> -', 'lower case', 'whitespace collapsed', 'shingles: words of [0-9a-z, Latin-1 letters, kana, CJK] only'],
        'sourceFiles': files,
        'sourceDigest': 'sha256:' + digest.hexdigest(),
        'brand': [{'key': k, 'pattern': p, 'evidence': brand[k]['evidence']} for k, p in BRAND_VARIANTS if k in brand],
        'hosts': [{'host': h, 'evidence': v['evidence']} for h, v in sorted(hosts.items())],
        'people': [{'name': v['display'], 'evidence': v['evidence']} for k, v in sorted(people.items())],
        'customers': [{'name': v['display'], 'evidence': v['evidence']} for k, v in sorted(customers.items())],
        'claims': [{'term': k, 'evidence': v['evidence']} for k, v in sorted(claims.items())],
        'numericClaims': [{'phrase': k, 'evidence': v['evidence']} for k, v in sorted(num_claims.items())],
        'copyShingles': {'size': SHINGLE, 'hash': 'sha256 hex, first 16 chars, of the normalised space-joined shingle', 'count': len(copy), 'hashes': sorted(copy)},
    }
    return reg


def main(argv):
    proj = project_root()
    if proj is None:
        print('build_source_identity.py: no sibling source tree (parent with src/ and package.json "lightdash-clone"); nothing to build', file=sys.stderr)
        return 2
    reg = build(proj)
    text = json.dumps(reg, indent=1, ensure_ascii=False) + '\n'
    if '--check' in argv:
        cur = open(OUT, encoding='utf8').read() if os.path.isfile(OUT) else ''
        if cur != text:
            print('schema/source-identity.json is STALE: it differs from a fresh build from the source tree')
            return 1
        print('schema/source-identity.json matches a fresh build')
        return 0
    open(OUT, 'w', encoding='utf8').write(text)
    print(f'wrote schema/source-identity.json: brand {len(reg["brand"])}, hosts {len(reg["hosts"])}, people {len(reg["people"])}, customers {len(reg["customers"])}, claims {len(reg["claims"])}, numericClaims {len(reg["numericClaims"])}, copy shingles {reg["copyShingles"]["count"]}')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
