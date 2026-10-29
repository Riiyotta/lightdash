# Lightdash marketing-site design-repo

An AI-ready, machine-validated description of the Lightdash marketing site clone (the React app in the sibling project):
design tokens, primitives, components, 100 section contracts, 30 page templates mapped 1:1 to 118 routes, a compatibility graph,
a closed PageSpec schema and the validators that enforce it.

**Version 1.1.0. Status: `design-review-pending`, `productionApproved: false`. Visibility: PRIVATE.** The source is a real, live company.
This repo cites its real customers, employees, quotes, logos, compliance marks, roadmap, a live Cal.com booking calendar, a YouTube
video and form endpoints. Do not publish it or `design-repo.zip`. The source project is a git repository; `design-repo.zip` is a
build artifact listed in `.gitignore` (regenerated last, never tracked; `verify_all.py` checks the ignore entry).

Source stack (re-diffed against `package.json`, see `extraction/measured-values.json` frameworkSnapshot): React 18.3.1 + react-router-dom 6.28.0 (BrowserRouter) + Vite 5.4.21 + Tailwind 3.4.19 + @rive-app/canvas 2.27.5.

## Counts (machine-checked)

Recomputed from disk by `extraction/verify_all.py`; a wrong number here fails the run.

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

`tokens` counts leaf tokens in `tokens/00-foundation` (excluding `motion-patterns.json`), `10-semantic`, `20-component` and `30-layout`.
`sections` = 100 sections, all now present in `ia/ia.json` (the IA update pass of 2026-10-13 added `decor.pixel-border-band`, which was first found while verifying the JSX).
`composableSections` excludes the 5 `app.view-*` iframe states.

## Layout

```
registry.manifest.json   status, counts, entry points (only files inside this folder)
tokens/00-foundation     color, typography, spacing, radius, elevation, breakpoint, font-family, icon-size, motion, motion-patterns
tokens/10-semantic       semantic roles   tokens/20-component   component tokens   tokens/30-layout   layout tokens
tokens/themes            light, dark-home   tokens/llm   token-catalog, token-policy, component-allowlist
primitives/ components/  content-agnostic building blocks, each citing real source
sections/                one contract per section type: content fields + maxWords, constraints, motion, responsive, citations
templates/templates.json  30 templates with structured nodes + the 118-route registry (per-route evidence level)
compatibility/graph.json  11 rhythm / position rules, severity error|warn, named exceptions
schema/                  pagespec.schema.json (draft-07, closed, required mode), example.pagespec.json (mode clone), examples/generation/ (11, one per
                         template family), section-contract.schema.json (closed), source-identity.json (generated), semantic_validate.py, tests/adversarial_test.py
assets/asset-roles.json  closed assetRole vocabulary (34 roles): generation policy + availability (clone-only / generation-safe / blocked-for-generation)
                         pinned per role, generationSafeSubstitutes, generatedModeGuidance, forbidden live-host patterns, licensing
policy/design-policy.json binding to the N0 common SaaS policy n0-saas-design-constraints-common 0.1.0 (classification + evidence)
extraction/              measured-values.json (evidence ledger + measured sectionHeights), verify_all.py, prove_drift.py, wrapper_gate.py (+ whitelist),
                         measure_sections.mjs, build_source_identity.py, build_generation_examples.py, derive_wordcounts.py, wordcount_spec.json
```

## How a PageSpec works

A PageSpec is `{pageSpecVersion, mode, template, route, theme, chrome, nodes[]}`; each node is `{section, content, motion[, style]}`.

`mode` is required: `clone` = faithful reconstruction of the Lightdash clone (real assets and copy may be reused for fidelity);
`generation` = a new page for another brand. In generation mode `semantic_validate.py` rejects, one named rule per category:
`GENERATION_MODE_BRAND` (Lightdash name variants), `_LOGO` (real wordmark, or a navbar / footer without a generation-safe `brandMark`),
`_SCREENSHOT`, `_DIAGRAM`, `_ANIMATION` (Rive), `_VIDEO`, `_EMBED` (Cal.com, YouTube, live demo, the Game Boy iframe bundle, or a home
hero without an operator-supplied `app` slot), `_ASSET` (CMS imagery), `_URL` (any host that is not `*.example` / `*.invalid`, real
Lightdash CMS slugs, form endpoints), `_COPY` (5-word shingles of source copy; chrome without operator-supplied `chromeData`), `_CLAIM`
(certification / award marks and numeric claims of the source), `_PERSON` and `_CUSTOMER`. Patterns are derived from the real source by
`extraction/build_source_identity.py` into `schema/source-identity.json` (file:line evidence; strings normalised: NFKC, zero-width removal,
curly quotes, dashes). Asset availability is pinned in code in both `semantic_validate.py` and `verify_all.py` (`PINNED_AVAILABILITY`) and
cross-checked against the registry. `style` is optional and takes catalog token references only (`TOKEN_*` rules).
`content` follows the section contract (closed fields, `maxWords` budgets, list bounds); media fields carry a closed `assetRole`
plus an `assetRef` that must be a slot id (`slot-...`), never a URL. `motion` carries a closed `pattern` and a const-locked
`reducedMotionFallback` / `reducedMotionBasis`. The semantic validator checks the node list against the declared template's own
node list, keyed on `(section, variant)` (variant = the content field named by a contract's `variantField`: accordion `imageSide`,
playground `blockMode`), applies the graph rules by severity and scans every string for live third-party endpoints.

## Verify

```
python3 extraction/verify_all.py              # 20 checks, exit 0 only if all pass (source-tree checks WARN and skip without the sibling project)
python3 schema/semantic_validate.py [specs]   # default: schema/example.pagespec.json
python3 schema/tests/adversarial_test.py      # controls (30 templates + 118 routes + clone example + 11 generation examples) pass; every mutation rejected
python3 extraction/prove_drift.py --scratch DIR   # injects drift into scratch copies; verify_all.py must catch every case
python3 extraction/wrapper_gate.py            # HERO > 1800 warn / > 3000 error; one in-flow section > 50% warn / > 60% error (measured heights)
NODE_PATH="$(npm root -g)" node extraction/measure_sections.mjs http://localhost:<port>   # re-measure against `vite preview` of the clone
```

Needs Python 3 and `pip install jsonschema`. Every script derives its root from `__file__`.

## Measured section heights and the wrapper gate

`extraction/measured-values.json` `sectionHeights` holds 1440 x 900 heights for every template (first route) measured on the built clone
(`vite build` + `vite preview`, headless Chromium). The DOM element of each node was found once in the React dev build from the JSX source
location that rendered it (the contract `source` range) and recorded as a DOM path; dev and production heights agreed for every node.
Measuring exposed two whole-body sections, which are now one node per heading-bounded part: `content.legal-body` (11672 / 13118 px of
/terms-of-service, 89%) and `content.rich-text` (60% of a blog post, 67% of an event). After that no node crosses an error threshold; three
pages warn between 50% and 60% (integrations directory 53%, playground empty blocks 58%, customer-story grid 57%). The whitelist is empty.
Only the first route of each template was measured; parity with the live site was NOT measured in this pass.

## Structurally unusual things (documented, not normalised away)

- **The homepage is not a normal page.** It is a full-viewport Three.js Game Boy app in an iframe (`public/gameboy/index.html`): one viewport, no scroll, no footer.
  `hero.gameboy-app` is a fixed node; the five `app.view-*` sections are iframe states listed in `templates.json` `iframeStates`, not routes and not nodes.
- **`/__shared`** is a dev-only demo route (`templates.json` `devOnlyRoutes`), not a real route.
- **3 unpublished routes are excluded on purpose** and must NOT be recreated: `/old-home`, `/xdrafts/lightdash-vs-looker`, `/xdrafts/lightdash-vs-looker-v2`. `verify_all.py` fails if one appears; the adversarial suite rejects PageSpecs for them and CTAs that target them.
- **Unknown URLs render the not-found template** (catch-all `*`); not counted as a route.
- **Third-party scripts** (Intercom, Clarity, RudderStack, Warmly, HubSpot) are not part of the design and are never recreated.
- **Real company.** Asset roles are pinned (must-reuse-exact / may-generate-new / must-not-fabricate / must-not-reuse-live-endpoint); PageSpecs may not contain Cal.com, YouTube, vercel.app, Ashby job board, HubSpot, Framer-hosted or meetup.com strings (rule NO_LIVE_ENDPOINT).
- **Placeholder bodies.** Blog, story, event and legal bodies are placeholder text in the clone; only their metadata is measured. PageSpecs carry no body text for them (`bodyMode: placeholder`).
- **Per-route evidence.** 29 routes are `measured` (own reference screenshot); 3 are `measured-sample` (documented CMS samples); the other CMS members are `template-derived`. Families are never flattened to their best-evidenced member.
- **Japanese copy** (`/jp`) has no spaces: word budgets are not meaningful there.
- **Trial fonts.** The Britti Sans files are trial-licence fonts taken from the live site.

## Groundwork assessment (what held up and what did not)

See `extraction/measured-values.json` `groundworkAssessment`. In short: the IA routes / templates held (118 routes, 30 templates, sitemap, `App.jsx` and CMS counts all
reconcile); 6 templates' node lists still differ from `ia.json` by design (repeated sections are modelled as separate nodes; `templates.json` `differsFromIa`), while the missing section and the blog-post / customer-story / fintech ordering were fixed in `ia.json` itself; the
existing tokens held (219 evidence quotes, Tailwind colours, typography) but lacked 9 page-local colours, icon sizes, a motion-pattern vocabulary and the whole `tokens/llm` layer, which were added.
Documented anomalies (stale source comments, logo files whose names disagree with their contents, a dead stub file, live-bug reproductions) are listed in `anomalies` and re-grepped by `verify_all.py`.

## Honesty notes (1.1.0)

- No human reviewed the pinned availability, the generation rules or the source-identity patterns; they are an agent's work
  (agent attestation, not a human sign-off). Detection is string-based: verbatim or lightly reformatted reuse is caught, paraphrase is not.
- The common policy document `n0-saas-design-constraints-common` is not shipped here and was not available to this build; the binding's
  contentHash covers this repo's enforcing files (see `policy/design-policy.json`), and the binding awaits an architecture decision.
- Visual parity with the live site was not measured in this pass.

## Known limitations

- `/playground` blocks are empty on the live site; the phone-only chat mockup there and the scripted chat animation on `/fintech` are not modelled.
- `/data-apps` and `/context-layer` render extra sections below 1200px that are not nodes (`templates.json` `unmodelledResponsiveSections`).
- Most motion is `recommended-not-implemented` for reduced motion: only route motion, the Snake pop (partial) and the 404 glitch honour `prefers-reduced-motion` in source (`motion-patterns.json` `reducedMotionBasis`).
- The app internals of the Game Boy iframe were not inspected; the blog-category screenshot slugs are not recorded in the source.
- Source-tree checks (citations, token evidence, route cross-checks, anomalies) only run when this folder sits inside the project; standalone they WARN and skip.
