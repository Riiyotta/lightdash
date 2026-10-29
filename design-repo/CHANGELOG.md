# Changelog

## 1.1.0 (clone / generation modes, generation-safe assets, baseline R1-R14, 2026-10-29)

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
  "assetRoles": 34,
  "motionPatterns": 20,
  "graphRules": 11,
  "wordcountSpecEntries": 244,
  "citationChecks": 463,
  "catalogEntries": 251,
  "generationExamples": 11,
  "measuredSectionHeights": 296
}
```

### Added
- PageSpec `mode: clone | generation` (required, closed; pageSpecVersion 1.1.0). The existing example is `clone`.
- `GENERATION_MODE_*` rules in `schema/semantic_validate.py`, one per category: BRAND, LOGO, SCREENSHOT, DIAGRAM, ANIMATION (Rive), VIDEO,
  EMBED (iframe / content bundles, booking, YouTube, live demo), ASSET, URL, COPY, CLAIM, PERSON, CUSTOMER. Patterns derived from the real
  source by `extraction/build_source_identity.py` (file:line evidence, hashed 5-word copy shingles, normalised strings) into
  `schema/source-identity.json`; `verify_all.py` rebuilds it from the source tree and fails if it is stale.
- `assets/asset-roles.json`: every role has `availability` (clone-only / generation-safe / blocked-for-generation), `generationSafeSubstitutes`
  and `generatedModeGuidance`; 15 new roles (placeholder brand mark, operator-supplied asset / embed / endpoint / chrome data, generated
  illustration, placeholder screenshot, animation (Rive) placeholder, video placeholder, fictional avatar, placeholder company logo,
  placeholder URL, original copy, plus the clone-only Lightdash wordmark and chrome data). A new policy value `must-be-operator-supplied`.
  Availability pinned in code in `verify_all.py` and `semantic_validate.py` (`PINNED_AVAILABILITY`), cross-checked with the registry.
- Optional slot fields `brandMark` / `chromeData` on navbar, phone nav and footer and `app` on `hero.gameboy-app`: the fixed Lightdash chrome
  and Game Boy bundle render unless a generation-safe role is bound, which generation mode requires.
- 11 generation-mode examples (`schema/examples/generation/`, one per template family; fictional brand, original copy, placeholder assets,
  `.example` URLs), written by `extraction/build_generation_examples.py`.
- R7: closed `source {id, tag, file, lines}` + `semantic {id, category}` on all 100 contracts, re-read from the real files by `verify_all.py`;
  closed `schema/section-contract.schema.json` (it found `content.blog-posts` posts[].target.required = ["navigate-route"], fixed to true).
- R8: `retrievalEligible` (+ 30+ char reason) on every contract, pinned in both validators (`PINNED_RETRIEVAL`): talk modal, phone nav
  drawers and the five Game Boy iframe states are not retrievable.
- R9: `extraction/wrapper_gate.py` (+ whitelist, thresholds pinned in code) wired into `verify_all.py`; measured `sectionHeights` at 1440 for
  all 30 templates from the built clone; `extraction/measure_sections.mjs` re-measures them.
- R6 found by measurement: `content.legal-body` (89% of /terms-of-service) and `content.rich-text` (60% / 67%) are now one node per
  heading-bounded part (repeatable; graph rules NO_ADJACENT_DUPLICATE / MAX_RUN_SAME_CATEGORY collapse consecutive parts).
- Tokens: optional closed `node.style` (catalog token references only) with TOKEN_UNKNOWN / _RAW_COLOR / _ARBITRARY_SPACING /
  _UNSUPPORTED_FONT / _THEME_MISMATCH / _SCOPE / _CATEGORY; `token-policy.json` records the rules (previously "no per-instance overrides").
- `content.faq.lead` changed from a closed enum of the two Lightdash FAQ lead strings to a text field (budget from those strings) so a
  generation page can write its own lead.
- Common-policy binding: `category: saas`, `designPolicy` -> `n0-saas-design-constraints-common` 0.1.0 (commonIrVersion 0.5, hard-and-soft,
  contentHash over the enforcing files) with classification evidence in `policy/design-policy.json`; checked by `verify_all.py` (policy).
- `extraction/prove_drift.py --scratch DIR` replaces the shell drift proof (all its cases plus mode, availability, generation, retrieval,
  contract, wrapper-gate, policy and token-rule cases).

### Honesty
- No human reviewed the pinned patterns or availability (agent attestation, not a human sign-off). Detection is string-based.
- Visual parity with the live site was not measured. Only each template's first route was height-measured.

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
- `extraction/`: `measured-values.json` ledger (every citation has anchor text), `verify_all.py` (16 checks), the shell drift proof (ported to `extraction/prove_drift.py` in 1.1.0) (injects drift into scratch copies), `derive_wordcounts.py` + `wordcount_spec.json` (copy budgets derived from real source strings).
- Tokens: kept all pre-existing token files (219 evidence refs, colours, typography re-verified); added `color.local-*` (9), `icon-size.json` (9), `motion-patterns.json` (20) and `tokens/llm/*`.

### Found while building
- 9 templates' node lists differ from `ia.json` once re-read against the JSX (repeated accordion rows, cards, hatched bands, two-tone headings; DOM order of CMS sidebars; the Playground card band; an unmodelled Fintech band).
- Documented anomalies (see `measured-values.json` `anomalies`): logo file names that disagree with their contents, stale motion comments, dead `_PageStub.jsx`, live URLs inside button targets, reproduced live bugs.
