# Lightdash clone: information architecture

The data-driven IA for the lightdash.com clone, built with the `ia-builder` skill.

## Which files to edit

| file | edit? | what it is |
|---|---|---|
| `ia.json` | **hand-edit (only this one)** | Source of truth: meta, categories, 100 sections (each defined once), and 30 templates with ordered section ids |
| `IA.md` | **generated, do not edit** | Readable doc: shape/share table, chrome partition, sections by reuse, per-template tables, section reference |
| `matrix.csv` | **generated, do not edit** | Section × template matrix for a spreadsheet |
| `build.mjs`, `validate.mjs` | do not edit | Copied unchanged from `~/.claude/skills/ia-builder/scripts/` |
| `README.md` | hand-edit | This file |

## Re-running

```bash
cd ia
node validate.mjs   # exits 1 on any hard inconsistency
node build.mjs      # regenerates IA.md and matrix.csv
```

Change routes, sections or `implementedBy` in `ia.json`, then run both scripts again.

## Decisions

- **Root `/` is in scope**, so the IA covers 118 routes (121 sitemap URLs minus the 3 below).
- **Drafts and the old homepage are excluded**: `/xdrafts/lightdash-vs-looker`, `/xdrafts/lightdash-vs-looker-v2` and `/old-home` (`meta.excludedRoutes`).
- **Live-site bugs are replicated** (for example the mismatched FAQ answers on `/fintech`, the empty blocks on `/playground`, both `/jp` cards linking to the Ubie story). The one exception is the double-`https://` partner link on `/partnerships`, which the clone fixes.
- **The CTA band uses the stacked layout below 810** on every page that has it. This settles the conflict between SHARED §9 / legal §4 (stacks) and cms-templates §1.6 (clipped).

## Scope

- **In scope: 118 routes.** That is the 121 URLs in `specs/sitemap.txt` minus 3 unpublished ones: `/xdrafts/lightdash-vs-looker`, `/xdrafts/lightdash-vs-looker-v2` and `/old-home`. These are recorded in `meta.excludedRoutes`. The root `/` stays in scope as `template.home`.
- **Unknown URLs** return HTTP 404 and render `template.not-found`, the same page as `/404`. That catch-all is documented in a note but not counted as a route.
- **The homepage Game Boy views** (Customers, Product, Pricing, Governance, Migration) are iframe app states, not routes. They are modelled as `APP` sections of `template.home`. The sixth planet, "Book a demo", opens `/start` in a new tab.
- **CMS collections** use `routePattern` (`/blogpost/:slug`, `/blog-categories/:slug`, `/customer-story/:slug`, `/events/:slug`) with the complete list of real slugs in `routes`, copied verbatim from the sitemap. The slugs are not numeric, so no `routeRange` is used. They match `specs/cms/*.json` 1:1.
- **Chrome axis** (`chrome` on each template):
  - `dark-home` (1 route): dark navbar and mobile nav plus the Talk modal over the iframe. No banner, no CTA band, no footer.
  - `light-banner-cta` (8 routes): announcement bar, light nav, CTA band and footer. These are the 7 T1 product pages plus `/bi-as-code`.
  - `light-cta` (30 routes): light nav with no banner, the snake CTA band, and the footer.
  - `light-no-cta` (79 routes): light nav and footer, with no snake CTA. This covers blog posts, customer stories, `/start`, `/partnerships`, `/jp`, `/404` and `/padel-apply`.
- **Template families** are kept in an extra `group` field (`T1 product`, `company A`, `company B`, `cms`, …), and per-template caveats are kept in `notes`. The scripts ignore both fields.
- The 7 T1 pages share a Framer page frame but **not** a section stack, so each one gets its own template entry. One "T1" template would have overstated the reuse counts of every optional section.

## Reconciled against the build (2026-10-13)

- **`/padel-apply` was recon'd and built** (`src/pages/PadelApply.jsx`, `reference/pages/padel-apply-{1440,390}.png`). It is no longer a single "probably an embed" section. It is now `content.padel-apply` (eyebrow, H1, note) followed by `conversion.padel-form` (a native Framer form with 3 inputs, a skill-level select and a submit button). That is why there were 99 sections instead of 98. The 100th, `decor.pixel-border-band` (the /fintech "Graphic Border" band), was added in the 2026-10-13 update pass after reading `src/pages/Fintech.jsx`.
- **Load motion is recorded in template `notes`, as measured on live.**
  - Whole hero + logos fade in on conversational-analytics, context-layer, data-apps and interactive-dashboards.
  - Only the hero text fades in on embedding and self-improving-analytics.
  - Hero pixels drop after 1s on those 6 pages plus metrics-catalog, integrations, startups and jp.
  - The roadmap pixel strips slide in.
  - Every other template has no load motion.
- **`/playground` has no word-reveal on live.** `hero.playground` now describes the words as static.

## Findings

These come from the `validate.mjs` / `build.mjs` output.

1. **Three CMS templates hold most of the routes.** Blog post (62), customer story (12) and blog category (11) account for 85 of 118 routes (72%). All four patterned CMS templates together hold 89 routes. The other 29 routes are one-off pages that need 26 templates, and that is where most of the build effort sits. Blog post, customer story, event and legal sections such as `content.post-header`, `content.story-sidebar` and `content.legal-body` are "single-use" by template count but render on 4–62 routes each, so they still deserve proper components.
2. **The chrome is fully shared, and the CTA band is the main split.** `chrome.talk-modal` is on all 118 routes. The light navbar, light mobile nav and footer are on 117. `cta.snake-band` covers 37 routes across 21 templates. The `/blog` index uses a separate `cta.snake-band-narrow` (968/840/≈310 geometry), and posts and stories use `cta.inline-post` instead.
3. **29 sections are shared and 71 are page-local, and every one of them now has a component.** The shared sections that were still unbuilt at the last refresh now map to `src/components/cms/*` (rich text, inline CTA, the three blog listing sections) or to page-level components. Five shared sections are still implemented more than once rather than as one component: `hero.company-centered` (inline on 4 pages), `proof.testimonial-avatar` (embedding component plus inline copies on startups and jp), `proof.dark-testimonial-stats` and `proof.logos-grid-12` (one component plus an inline copy each), and `proof.logo-tiles-named` (shared tile, page-local grids). These are the next consolidation candidates.
4. **The validator is clean.** All hard invariants reconcile, and every number in every `scope` string matches its computed route count.

## implementedBy

All 100 sections have an `implementedBy` that points at real files (every path was checked when this was finalized). Formats used:

- `src/components/shared/CtaBand.jsx`: the file's component renders the section.
- `src/pages/Roadmap.jsx > Column, Item`: named functions inside a file.
- `src/pages/Fintech.jsx (inline)`: JSX written directly in the page, with no separate component.
- `A + B`: the section needs both files, for example `CtaBand.jsx + SnakeGame.jsx` or `Start.jsx > CalInline + shared/useCalInline.js`.

The homepage `APP` views point at `src/components/Hero.jsx > iframe public/gameboy/index.html`, because the mirrored app renders them. Chrome is mounted by `src/layouts/InnerLayout.jsx` on inner routes and by `src/pages/Home.jsx` on `/`. Load motion is not a section: it is applied per route by `src/motion/useRouteMotion.js` and recorded in each template's `notes`.

Primitives are not sections and are not mapped. These are `shared/Frame.jsx`, `Button.jsx`, `SmartLink.jsx`, `MobileCarousel.jsx` (used by `FeatureCards` below 810), and the nav sub-parts `MenuItem.jsx`, `CustomerLogo.jsx`, `FeatureCard.jsx` and `PixelDeco.jsx`. `src/pages/SharedDemo.jsx` (`/__shared`) and `src/pages/_PageStub.jsx` are dev-only and not routes.

## Known gaps (built, but not yet matching live)

- **`/fintech` hero illustration.** On live it is a scripted chat animation. The clone shows a static image of its final state.
- **`/playground` phone chat mockup.** Live shows a phone-only chat mockup below 810. The clone does not build it yet.

## Open judgment calls

- **Variants folded into one section.** `cta.snake-band` is 1408 wide on `/bi-as-code` and `/fintech` and 1169 wide on interactive-dashboards. `proof.testimonial-avatar` uses a 21px quote on `/jp`. `hero.company-centered` has a different pixel-tile layout per page. In each case the difference is frame width or content, not structure. Split any of them if the components end up diverging.
- **Repeated blocks are listed once.** Repeated rows such as accordion tabs ×2, 1x3 cards ×2 on data-apps, hatched band ×3 on embedding and two-tone headings ×2 on startups appear once in `sections` so reuse counts stay accurate. The repeats are recorded in that template's `notes`.
- **Tablet/mobile-only sections are not modelled.** data-apps has three sections that appear only below 1200px (product-pages Appendix B). Separately, below 810/1200 the customer quote moves later on conversational-analytics, data-apps and context-layer (on interactive-dashboards the 390 reference keeps it before the FAQ, despite product-pages §4). Section order here is the 1440 order.
