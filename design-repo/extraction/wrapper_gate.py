#!/usr/bin/env python3
"""wrapper_gate.py: whole-page-wrapper quality gate over MEASURED section heights (R6 / R9).

Usage:  python3 extraction/wrapper_gate.py      (exit 1 on any error; warnings never fail)
Called by extraction/verify_all.py (check "wrapper gate").

Input: extraction/measured-values.json sectionHeights (1440 x 900, measured on the built clone; re-measure with
extraction/measure_sections.mjs), templates/templates.json, sections/*.json, extraction/wrapper-gate-whitelist.json.

Rules (thresholds pinned HERE in code, not only in JSON):
  HERO_HEIGHT   a HERO-category node taller than 1800px warns; taller than 3000px is an error unless whitelisted
  PAGE_SHARE    an in-flow, non-SHELL node holding > 50% of its page warns; > 60% is an error unless whitelisted
                (skipped on pages with fewer than 3 in-flow nodes; SHELL chrome, nested and aside nodes take no share)
  MEASUREMENT   every template must be measured at the pinned viewport and every non-SHELL template node must have a
                measured height (missing measurement = error)
  WHITELIST     entries need template, section, rule, maxHeightPx above the measured height, a justification of 30+
                characters and reviewedBy; an agent reviewer must say "agent attestation, not a human sign-off".
                Stale entries (rule no longer fires) and over-cap entries (measured > maxHeightPx) are errors; a
                whitelisted hit still warns.
Root derived from __file__.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
VIEWPORT_WIDTH = 1440
HERO_WARN_PX = 1800
HERO_ERROR_PX = 3000
SHARE_WARN = 0.50
SHARE_ERROR = 0.60
MIN_INFLOW_FOR_SHARE = 3
AGENT_ATTESTATION = 'agent attestation, not a human sign-off'


def _load(root, rel):
    with open(os.path.join(root, rel), encoding='utf8') as f:
        return json.load(f)


def run(root=None):
    root = root or REPO
    fails, warns = [], []
    sh = _load(root, 'extraction/measured-values.json').get('sectionHeights')
    tpls = _load(root, 'templates/templates.json')['templates']
    cats = {}
    for fn in os.listdir(os.path.join(root, 'sections')):
        if fn.endswith('.json'):
            d = _load(root, 'sections/' + fn)
            cats[d['id']] = d['category']
    wl_path = os.path.join(root, 'extraction', 'wrapper-gate-whitelist.json')
    wl = _load(root, 'extraction/wrapper-gate-whitelist.json')['entries'] if os.path.isfile(wl_path) else None
    if wl is None:
        fails.append('MEASUREMENT: extraction/wrapper-gate-whitelist.json is missing')
        wl = []
    if not sh:
        return ['MEASUREMENT: extraction/measured-values.json has no sectionHeights'], warns
    if sh.get('viewport', {}).get('width') != VIEWPORT_WIDTH:
        fails.append(f'MEASUREMENT: sectionHeights measured at width {sh.get("viewport", {}).get("width")}, gate requires {VIEWPORT_WIDTH}')
    for w in wl:
        for k in ('template', 'section', 'rule', 'maxHeightPx', 'justification', 'reviewedBy'):
            if k not in w:
                fails.append(f'WHITELIST: entry {w} misses {k}')
        if len(w.get('justification', '')) < 30:
            fails.append(f'WHITELIST: {w.get("template")}/{w.get("section")} justification shorter than 30 characters')
        rb = w.get('reviewedBy', '')
        if 'agent' in rb.lower() and AGENT_ATTESTATION not in rb:
            fails.append(f'WHITELIST: {w.get("template")}/{w.get("section")} reviewedBy names an agent but does not say "{AGENT_ATTESTATION}"')
    used = set()

    def whitelisted(tid, sid, rule, h):
        for i, w in enumerate(wl):
            if w.get('template') == tid and w.get('section') == sid and w.get('rule') == rule:
                used.add(i)
                if h > w.get('maxHeightPx', 0):
                    fails.append(f'WHITELIST: {tid}/{sid} measured {h}px exceeds whitelisted maxHeightPx {w.get("maxHeightPx")}')
                return True
        return False

    for tid, t in tpls.items():
        m = sh.get('templates', {}).get(tid)
        if not m:
            fails.append(f'MEASUREMENT: template {tid} has no measured sectionHeights')
            continue
        doc = m.get('documentHeightPx')
        if not doc:
            fails.append(f'MEASUREMENT: template {tid} has no documentHeightPx')
            continue
        for k, tn in enumerate(t['nodes']):
            if tn['section'].startswith('chrome.'):
                continue
            got = [n for n in m['nodes'] if n.get('templateNode') == k and n.get('section') == tn['section']]
            if not got or any(n.get('heightPx') is None for n in got):
                fails.append(f'MEASUREMENT: {tid} node[{k}] {tn["section"]} has no measured height')
        inflow = [n for n in m['nodes'] if n.get('inFlow') and not n.get('shell') and n.get('heightPx') is not None]
        for n in m['nodes']:
            h = n.get('heightPx')
            if h is None:
                continue
            sid = n['section']
            if cats.get(sid) == 'HERO':
                if h > HERO_ERROR_PX:
                    if whitelisted(tid, sid, 'HERO_HEIGHT', h):
                        warns.append(f'HERO_HEIGHT: {tid} {sid} {h}px > {HERO_ERROR_PX}px (whitelisted)')
                    else:
                        fails.append(f'HERO_HEIGHT: {tid} {sid} {h}px > {HERO_ERROR_PX}px')
                elif h > HERO_WARN_PX:
                    whitelisted(tid, sid, 'HERO_HEIGHT', h)
                    warns.append(f'HERO_HEIGHT: {tid} {sid} {h}px > {HERO_WARN_PX}px')
        if len(inflow) >= MIN_INFLOW_FOR_SHARE:
            for n in inflow:
                share = n['heightPx'] / doc
                sid = n['section']
                if share > SHARE_ERROR:
                    if whitelisted(tid, sid, 'PAGE_SHARE', n['heightPx']):
                        warns.append(f'PAGE_SHARE: {tid} {sid} holds {share:.0%} of the page (whitelisted)')
                    else:
                        fails.append(f'PAGE_SHARE: {tid} {sid} holds {share:.0%} of the page ({n["heightPx"]} / {doc}px) > {SHARE_ERROR:.0%}')
                elif share > SHARE_WARN:
                    whitelisted(tid, sid, 'PAGE_SHARE', n['heightPx'])
                    warns.append(f'PAGE_SHARE: {tid} {sid} holds {share:.0%} of the page ({n["heightPx"]} / {doc}px) > {SHARE_WARN:.0%}')
    for i, w in enumerate(wl):
        if i not in used:
            fails.append(f'WHITELIST: stale entry {w.get("template")}/{w.get("section")} {w.get("rule")} (the rule no longer fires)')
    return fails, warns


def main():
    fails, warns = run()
    for w in warns:
        print('WARN', w)
    for f in fails:
        print('FAIL', f)
    print(f'wrapper gate: {len(fails)} error(s), {len(warns)} warning(s)')
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
