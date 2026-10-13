# Changelog

## 1.0.1 (IA update pass, 2026-10-13)

- `ia/ia.json` now includes `decor.pixel-border-band` (100 sections) and the corrected DOM order of `template.blog-post`, `template.customer-story` and `template.fintech`; `templates.json` `differsFromIa` drops those three (6 remain, all repeated-section cases).
- Two `ia/ia.json:N` citations in `tokens/00-foundation/breakpoint.json` re-pointed (1054 -> 1061, 1117 -> 1124).
- Logo file-name mismatches verified by viewing all five files: alt text is correct everywhere; `fintech/alma-*.png` renders Peach Payments.

## 1.0.0 (initial build)

Built from scratch for the Lightdash clone, using the existing groundwork (`ia/ia.json`, `design-repo/tokens`) as a first draft that was spot-checked
and then verified mechanically, not as gospel.

### counts (machine-checked)

```json
{
  "tokens": 251,
  "primitives": 10,
  "components": 24,
  "sections": 100,
  "composableSections": 95,
  "templates": 30,
  "routes": 118,
  "iframeStates": 5,
  "assetRoles": 19,
  "motionPatterns": 20,
  "graphRules": 11,
  "wordcountSpecEntries": 243,
  "citationChecks": 455,
  "catalogEntries": 251
}
```

### Added
- 10 primitives, 24 components, 100 section contracts (99 from the IA + `decor.pixel-border-band`), each citing real source lines and carrying structured `responsive` entries (or an explicit note).
- 30 templates with structured `{section, required, repeatable[, variant]}` nodes and a 118-route registry with per-route evidence levels; 9 templates differ from `ia.json` and say why.
- `compatibility/graph.json` (11 rules, error|warn, named exceptions each checked as still needed), `schema/pagespec.schema.json` (draft-07, closed enums, closed motion object, per-section content contracts generated from the contracts), a real example for `/metrics-catalog`, `semantic_validate.py`, an adversarial suite with auto-synthesised controls and pinned-value mutations.
- `assets/asset-roles.json` (19 roles, each pinned; live-host patterns for Cal.com, YouTube, vercel.app, Ashby, HubSpot, Framer, meetup.com).
- `extraction/`: `measured-values.json` ledger (every citation has anchor text), `verify_all.py` (16 checks), `prove_drift.sh` (injects drift into scratch copies), `derive_wordcounts.py` + `wordcount_spec.json` (copy budgets derived from real source strings).
- Tokens: kept all pre-existing token files (219 evidence refs, colours, typography re-verified); added `color.local-*` (9), `icon-size.json` (9), `motion-patterns.json` (20) and `tokens/llm/*`.

### Found while building
- 9 templates' node lists differ from `ia.json` once re-read against the JSX (repeated accordion rows, cards, hatched bands, two-tone headings; DOM order of CMS sidebars; the Playground card band; an unmodelled Fintech band).
- Documented anomalies (see `measured-values.json` `anomalies`): logo file names that disagree with their contents, stale motion comments, dead `_PageStub.jsx`, live URLs inside button targets, reproduced live bugs.
