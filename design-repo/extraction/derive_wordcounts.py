#!/usr/bin/env python3
"""derive_wordcounts.py: audit (and optionally re-apply) the copy budgets in the section contracts.

Usage:
  python3 extraction/derive_wordcounts.py            # --check (default): exit 0 only if everything agrees
  python3 extraction/derive_wordcounts.py --apply    # rewrite observedMaxWords / maxWords in sections/*.json from wordcount_spec.json

What it checks
  1. wordcount_spec.json is internally consistent: every entry's observedMax is the max word count of its stored samples,
     and every stored sample's word count is recomputed here (so a hand-edited number is caught).
  2. Every section contract text-bearing field (text / paragraphs / cta label) has a wcRef that exists in the spec, its
     observedMaxWords equals the spec, and maxWords == max(observed + 2, ceil(observed * 1.25)) (the budget rule), and
     maxWords >= observedMaxWords.
  3. If the sibling source tree is present (the parent folder holds src/ and a package.json named lightdash-clone), every
     stored sample is re-found in the real source file near its recorded line (tags / whitespace / quote styles
     normalised). Without a source tree this step is a WARN, never a failure.
The repo root is derived from __file__.
"""
import glob
import json
import math
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
PROJECT = os.path.dirname(REPO)
INVIS = re.compile('[​-‏⁠-⁤﻿]+')


def source_root():
    pj = os.path.join(PROJECT, 'package.json')
    if os.path.isdir(os.path.join(PROJECT, 'src')) and os.path.isfile(pj):
        try:
            if json.load(open(pj)).get('name') == 'lightdash-clone':
                return PROJECT
        except Exception:
            pass
    return None


def norm(s):
    s = s.replace('&apos;', "'").replace('&amp;', '&').replace('&quot;', '"')
    s = s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    s = s.replace('\\n', ' ')
    return re.sub(r'\s+', ' ', INVIS.sub('', s)).strip()


def words(s):
    return len(norm(s).split())


def budget(obs):
    return max(obs + 2, math.ceil(obs * 1.25))


def compact(s):
    return re.sub(r'\s+', '', norm(s))


def squash_source(text, strip_tags=True):
    t = re.sub(r"\{' '\}", ' ', text)
    if strip_tags:
        t = re.sub(r'<[^>]*>', ' ', t)
    t = t.replace("\\'", "'").replace('\\"', '"').replace('\\n', ' ')
    return compact(t)


def contract_fields(c):
    """yield (wcRef, kind, fielddict) for every text-bearing field, recursively."""
    def walk(f):
        if f['type'] in ('text', 'paragraphs'):
            yield f['wcRef'], 'text', f
        elif f['type'] == 'cta':
            yield f['labelRef'], 'label', f
        elif f['type'] == 'list':
            it = f['item']
            if 'type' in it:
                yield from walk(it)
            else:
                for sub in it.values():
                    yield from walk(sub)
    for f in c['content']['fields'].values():
        yield from walk(f)


def run(apply=False, root=REPO, quiet=False):
    fails, warns = [], []
    spec = json.load(open(os.path.join(root, 'extraction', 'wordcount_spec.json'), encoding='utf8'))['entries']
    # 1. internal consistency
    for ref, e in spec.items():
        ws = [words(s['text']) for s in e['samples']]
        for s, w in zip(e['samples'], ws):
            if s.get('words') != w:
                fails.append(f'{ref}: stored sample word count {s.get("words")} != recomputed {w}')
        if not ws or e['observedMax'] != max(ws):
            fails.append(f'{ref}: observedMax {e["observedMax"]} != max of samples {max(ws) if ws else None}')
    # 2. contracts vs spec
    seen = set()
    for p in sorted(glob.glob(os.path.join(root, 'sections', '*.json'))):
        c = json.load(open(p, encoding='utf8'))
        changed = False
        for ref, kind, f in contract_fields(c):
            seen.add(ref)
            e = spec.get(ref)
            if e is None:
                fails.append(f'{c["id"]}: wcRef {ref} missing from wordcount_spec.json')
                continue
            ok, mk = ('observedMaxWords', 'maxWords') if kind == 'text' else ('observedLabelMaxWords', 'labelMaxWords')
            want_o, want_m = e['observedMax'], budget(e['observedMax'])
            if apply:
                if f.get(ok) != want_o or f.get(mk) != want_m:
                    f[ok], f[mk] = want_o, want_m
                    changed = True
                continue
            if f.get(ok) != want_o:
                fails.append(f'{ref}: contract {ok} {f.get(ok)} != spec {want_o}')
            if f.get(mk) != want_m:
                fails.append(f'{ref}: contract {mk} {f.get(mk)} != budget rule {want_m}')
            if f.get(mk, 0) < f.get(ok, 0):
                fails.append(f'{ref}: {mk} {f.get(mk)} < {ok} {f.get(ok)}')
        if apply and changed:
            json.dump(c, open(p, 'w', encoding='utf8'), indent=2, ensure_ascii=False)
            open(p, 'a').write('\n')
    for ref in spec:
        if ref not in seen:
            fails.append(f'{ref}: spec entry has no contract field (orphan)')
    # 3. source re-derivation
    sr = source_root()
    if sr is None:
        warns.append('no sibling source tree (src/ + package.json "lightdash-clone"): sample text not re-found in source (graceful skip)')
    else:
        cache = {}
        for ref, e in spec.items():
            for s in e['samples']:
                f = os.path.join(sr, s['file'])
                if not os.path.isfile(f):
                    fails.append(f'{ref}: source file {s["file"]} missing')
                    continue
                if f not in cache:
                    raw = open(f, encoding='utf8').read()
                    cache[f] = (squash_source(raw), squash_source(raw, strip_tags=False))
                for part in (s.get('parts') or [s['text']]):
                    if not any(compact(part) in c for c in cache[f]):
                        fails.append(f'{ref}: sample text "{part[:50]}" not found in {s["file"]}')
                lines = open(f, encoding='utf8').read().split('\n')
                if not 1 <= s['line'] <= len(lines):
                    fails.append(f'{ref}: sample line {s["line"]} out of range for {s["file"]}')
                else:
                    head = compact(s['parts'][0] if s.get('parts') else s['text'])[:12]
                    chunk = '\n'.join(lines[max(0, s['line'] - 2):s['line'] + 14])
                    if head and head not in squash_source(chunk) and head not in squash_source(chunk, strip_tags=False):
                        fails.append(f'{ref}: sample start "{head}" not within lines {s["line"]}-{s["line"] + 14} of {s["file"]}')
    if not quiet:
        for w in warns:
            print('WARN', w)
        for x in fails:
            print('FAIL', x)
        print(f'derive_wordcounts: {len(spec)} entries, {len(fails)} failure(s), {len(warns)} warning(s)' + (' (applied)' if apply else ''))
    return fails, warns


if __name__ == '__main__':
    f, _ = run(apply='--apply' in sys.argv)
    sys.exit(1 if f else 0)
