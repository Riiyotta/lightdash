Source: https://www.lightdash.com/

# Lightdash inner pages: shared site chrome and section library

Measured live with Playwright (own headless Chromium, DPR 1) on 2026-10-13 at 1440×900, 810×900 and 390×844, on the product pages (/conversational-analytics, /data-apps, /metrics-catalog, /embedding, /interactive-dashboards, /context-layer, /bi-as-code, /self-improving-analytics, /integrations, /beyond-copilots, /playground). Values come from `getComputedStyle` / `getBoundingClientRect` unless marked *(source)*, which means they were read from Framer's shipped JS/CSS. Coordinates are page coordinates at 1440 wide unless stated otherwise.

This file covers everything that recurs across inner pages. Per-page content is in `specs/product-pages.md`. The homepage shell (dark navbar, mega-menus, mobile menu, Cal.com modal) is already specced in `CLONE_SPEC.md` and built in `src/components/`. Below, only the **differences** are noted.

Shared assets live in `public/assets/shared/`. File names are the Framer content hashes, so you can trace each one back to `https://framerusercontent.com/images/<file>`. Semantic copies are in `shared/logos/`, `shared/footer/` and `shared/fonts/`, and the CTA game source is in `shared/components/`.

---

## 0. Page shell (all inner pages)

```
body (#FFFFFF)
 ├ [fixed] chrome wrapper: announcement bar (40) + light navbar (106)   ← §1, §2
 ├ page frame: padding-top = 146 (with banner) or 106 (no banner)
 │   └ Content-wrapper: width 1280 (max), centered, flex column, overflow clip,
 │       1px solid #E5E7EB left/right/top hairline (Framer ::after "1px 1px 0 1px")
 │       sections stack with NO gaps; each section draws its own dashed/solid hairlines
 ├ CTA band (473 tall), still inside the 1280 frame                       ← §9
 └ Footer (600 tall, full-bleed #1A1B25)                                   ← §10
```

- **Breakpoints (Framer):** desktop ≥1200 for the content (some pages switch at 1000; the `sizes` attrs show `min-width:1000px` / `1200px`), tablet 810–1199.98, phone ≤809.98. The nav switches to the "Phone" variant (64 px bar) at **<1100** (same as the homepage, CLONE_SPEC §1.1). At 810 the frame becomes `16px` side padding and the Content-wrapper is `778` wide (x=16). At 390 it is `358` wide (x=16).
- **Side gutter:** 80 px at 1440 (`(1440-1280)/2`). Below 1312 the frame is `calc(100vw - 32px)`, i.e. 16 px gutters.
- **Hairline color:** `#E5E7EB` rgb(229,231,235). Solid is used for section frames; **dashed** 1px `#E5E7EB` is used for internal grid lines (Framer `::after` borders). In the footer, lines are dashed `#272835` and the frame is solid `#36394A`.
- **Which pages have the announcement banner:** conversational-analytics, data-apps, metrics-catalog, embedding, interactive-dashboards, context-layer, bi-as-code, self-improving-analytics (content starts at y=146). **No banner:** integrations, beyond-copilots, playground (content starts at y=106, nav at y=0).

## 1. Announcement bar (inner pages only, not on the homepage)

- `a` link, full width × **40** (39 at 390), bg **#1A1B25** rgb(26,27,37), href `./blogpost/build-unlimited-chart-types-with-chart-studio`.
- Content centred: flex row gap **6px**, vertically centred (text box top 12, height 16).
  - Text 1 (desktop/tablet): `⚡️ Build unlimited chart types with Chart Studio`. **At 390** the copy is `⚡️ Build custom chart types in Lightdash`, left aligned at x=17.
  - Divider: 4×10 svg "Vector 5363" (a thin vertical rule) at x+6.
  - Text 2: `Learn how` with a 16×16 `chevron-right-small` icon. Its wrapper has padding-right 17 and **opacity 0.7**.
  - Font: Britti Sans Medium 14px / 16px, weight 400, letter-spacing 0.14px, color #FFFFFF.
- No hover change was measured.
- **Scroll behaviour (measured):** the whole fixed chrome block (banner + nav) gets `transform: translateY(-min(scrollY, 40)px)`. It is **scroll-linked, with no tween** (scrollY 1→-1px, 20→-20px, ≥40→-40px). So the banner scrolls away and the nav sticks at top 0. Scrolling back to 0 restores it. Pages without a banner have the nav fixed at 0 from the start.

## 2. Navbar, light variant ("Desktop" light)

Same geometry, links, menus and behaviour as CLONE_SPEC §2–§3 (106 tall, padding 32/20, inner 1280, logo 119×28, chevron, buttons 155×42 and 127.3×42). The differences are:

| Element | Homepage (dark) | Inner pages (light) |
|---|---|---|
| bar bg | #080808 | **#FFFFFF** |
| bottom hairline | rgba(229,231,235,.1) | **1px solid #E5E7EB** (::after) |
| nav link text (Product/Pricing/Customers/Resources) | #FFFFFF, weight 500 | **#36394A** rgb(54,57,74), Britti Sans Medium 16/32, weight **400**, ls 0.16px |
| Login | #FFF | **#666D80** rgb(102,109,128) (16/16 box) |
| logo | Rive canvas with filter | Rive canvas, `filter:none` (dark artwork). Static fallback: `public/assets/svg/lightdash-logo-dark.svg` |
| "Talk to our team" | #F8FAFB, border #DFE1E7 | same (no `href`, opens Cal modal) |
| "Start for free" | #5E4CFF, border #4835F2 | same, href `./start` |
| "Pricing" link box bg | — | #FFFFFF |
| open trigger | — | the hovered trigger gets a light pill bg (~#F6F8FA, sampled from `reference/pages/_shared-nav-light-product-menu-1440.png`), radius ~6 |

**Light mega-menu** (`reference/pages/_shared-nav-light-product-menu-1440.png`): same layout as CLONE_SPEC §3, but:
- Panel bg **#FFFFFF**; grid lines dashed light grey (`#E5E7EB` family).
- Column headers ("Product", "Platform") are **#818898**.
- Item titles are **#000000** and descriptions **#818898**.
- The well behind the feature cards is **#F6F8FA**. The feature cards ("Changelog", "Try Live demo") stay dark **#272835**, with a white title and #C1C7D0 subtitle.
- The overlay below is still rgba(0,0,0,.65). Panel top is y=146 with the banner, 106 without.
- Product menu item subtitles are the same as the homepage: Conversational analytics / Ask AI questions in plain English, Data apps / Build apps on governed data, Metrics Catalog / Every KPI in one trusted place, Embedded analytics / AI-powered insights anywhere, Interactive dashboards / Dig into every number, Context layer / Use AI to build dashboards, BI as code / Build & maintain dashboards in code, Self-improving analytics / Ditch dashboard upkeep, Integrations / Use the tools you already love.

**Tablet / phone nav (light "Phone" variant):** the bar is 64 tall, bg #FFFFFF, under the 40 px banner, so the total header is 104 and the page `padding-top` is 104. The logo link is 113×42 at (16,51).
- **At 810:** inline Login text (Inter 15/30 w500 #666D80) at x=417, then "Book a demo" (130×42, #F8FAFB + 1px #DFE1E7, r6, padding 12/20, Inter 15/18 w500 #272835, ls −0.3) and "Start for free" (127.3×42, #5E4CFF + 1px #4835F2). Gap 14. Hamburger at the right.
- **At 390:** logo + hamburger only. The hamburger bars are dark (#1A1B25-ish on white; see `reference/pages/*-390.png`).
- Menu panel contents are the same as the homepage mobile menu (CLONE_SPEC §5) but on a white background.

## 3. Typography tokens (inner pages)

Fonts already exist in `public/fonts/`. New font files are in `public/assets/shared/fonts/`:
- `pixelify-sans-latin.woff2` is "Pixelify Sans" (CTA game score).
- `inter-700-latin-DXD0Q7.woff2` is Framer's Inter 700 latin file. `public/fonts/inter-700-latin.woff2` is equivalent.
- `inter-400-latin-ext-JeYwfu.woff2` and `geist-latin.woff2` are used only on /playground.

"Britti Sans Trial Semibold" is a single semibold file (`britti-sans-semibold.woff2`). Framer sets `font-weight:400` or `600` on it, but it renders identically. "Inter Variable" / "Inter Variable Variable Regular" both map to `inter-variable-framer.woff2`.

| Token | Family | size / line-height | weight | letter-spacing | color | Used for |
|---|---|---|---|---|---|---|
| display-72 | Britti Sans Trial Semibold | 72 / 68.4 (0.95) | 400/600 | −1.44px | #1C0000 rgb(28,0,0) (bi-as-code #0D0D12, beyond-copilots #000) + accent span **#5E4CFF** | Hero H1 (centered, max-width 1024) |
| display-56 | Britti Sans Trial Semibold | 56 / 50.4 | 600 | −0.27px | #272835 / #1A1B25, accent line #5E4CFF | Hero H1 variant (metrics-catalog, embedding) |
| cta-56 | Britti Sans Trial Semibold | 56 / 53.2 | 600 | −1.12px | #FFFFFF | CTA band title |
| h2-48 | Britti Sans Trial Semibold | 48 / 48 | 400 | −0.96px | #36394A (sometimes #272835) | Section titles |
| faq-h-48 | Britti Sans Medium | 48 / 43.2 | 400–500 | −0.96px | #36394A | "Your questions, answered" |
| stat-48 | Britti Sans Trial Semibold | 48 / 48 | 600 | −0.96px | #5E4CFF | Quote stats numbers |
| quote-40 | Britti Sans Trial Semibold | 40 / 50 | 600 | −0.8px | #1A1B25 | Customer quote (centered, w780) |
| quote-32 | Britti Sans Trial Semibold | 32 / 40 | 600 | −0.64px | #1A1B25 | Shorter quote variant (context-layer) |
| h3-38 | Britti Sans Trial Semibold | 38 / 41.8 | 600 | −0.76px | #272835 | Tabbed visual heading |
| h3-32 | Britti Sans Medium | 32 / 40 | 400 | −0.32px | #36394A | Tabs-section heading, split rows |
| card-title-24 | Britti Sans Medium | 24 / 26.4 | 500 | normal (−0.24 in icon grid) | #000000 | Feature/benefit card titles |
| faq-q-20 | Britti Sans Medium | 20 / 20 | 400 | −0.4px | #36394A | FAQ question |
| tab-title-18 | Britti Sans Trial Semibold | 18 / 28 | 400 | normal | #36394A | Accordion-tab item title |
| tab-pill-14 | Britti Sans Trial Semibold | 14 / 16.8 | 600 | normal | #FFF active / #272835 | Pill tabs (Finance, Catalog…) |
| lead-18 | Inter | 18 / 32 | 400 | −0.18px | #666D80 | Hero subtitle, section leads |
| tab-body-18 | Inter Variable | 18 / 30.6 | 400 | −0.18px | #666D80 | Open tab description |
| tabbed-lead-18 | Inter Variable | 18 / 27.9 | 400 | −0.18px | #818898 | Pill-tab description |
| caption-18 | Inter | 18 / 23.4 | 400 | −0.36px | #666D80 | Logos heading, stat labels, quote role |
| card-body-16 | Inter | 16 / 25.6 | 500 | −0.16px | #818898 | Card descriptions |
| sub-16 | Inter | 16 / 24 | 400 | normal | #6B7280 | Section subcopy under h2-48 (1x3/3x2 grids) |
| name-20 | Inter | 20 / 26 | 700 | −0.4px | #36394A | Quote attribution name |
| btn-15 | Inter | 15 / 18 | 500 | normal (−0.3 on "Variant 1" buttons) | per button | Buttons |
| faq-a-14 | Inter | 14 / 24 | 400 | −0.28px | #36394A, links #5E4CFF | FAQ answers |
| blog-h2 | Inter Variable | 40 / 47.2 | 400 | −1.2px | #1A1B25 | "Keep building with …" |
| blog-card-22 | Inter Variable | 22 / 27.5 | 400 | −0.44px | #1A1B25 | Blog card title |
| blog-meta-13 | Inter Variable | 13 / 15.6 | 400 | normal | #6B7280 | Blog author |

**Responsive type (measured):**

| Token | 1440 | 810 | 390 |
|---|---|---|---|
| display-72 | 72 / 68.4 | 72 / 68.4 | **42 / 39.9** |
| h2-48 | 48 / 48 | **40 / 40** (ls −0.8) | **32 / 35.2** (ls −0.64) |
| faq-h-48 | 48 / 43.2 | 48 / 43.2 | **36 / 32.4** |
| cta-56 | 56 / 53.2 | 56 / 53.2 | **32 / 35.2**, centered |
| display-56 (metrics/embedding) | 56 / 50.4 | 56 / 50.4 | 56 / 50.4 |
| quote-40, stat-48, h3-32 | | | unchanged |

## 4. Colors (inner pages)

`#FFFFFF` page · `#E5E7EB` hairlines · `#1A1B25` dark (banner, CTA card, "Third" button, footer) · `#5E4CFF` brand (accent text, active pill, progress bar, stats) · `#4835F2` brand border · `#F8FAFB` light button / table header · `#DFE1E7` light button border · `#ECEFF3` light hover / footer link hover · `#F6F8FA` hero-image wells, CTA grid · `#F7F8FA` tab image well · `#F3F4F6` icon cell · `#CDD2D9` CTA grid lines · `#36394A` headings / dark hairline · `#272835` · `#666D80` body grey · `#818898` card body · `#6B7280` subcopy · `#A4ABB8` footer links · `#F8F9FB` footer col headers · `#B4ACFF` "Seventh" button text · `rgba(94,76,255,.1)` highlighted table column.

## 5. Buttons ("Button Multi Variant", source module `lYgsCHeVn`)

All buttons are 40 tall (hero/FAQ) or 42 tall ("Variant 1" with padding 12/20), radius **6px**, flex row centred, gap 4 (8 on Variant 1), label btn-15. The border is drawn as an inset 1px `::after`. **Hover transition: spring, bounce 0.2, duration 0.4s** *(source)*.

| Variant | Base | Hover *(source; Third/Fourth also measured)* | Used for |
|---|---|---|---|
| Primary | bg #FFFFFF, 1px #DFE1E7, text #272835 | bg #1A1B25, no border, text #FFF | — |
| Secondary | transparent, 1px #666D80, text #FFF | bg #666D80 | — |
| **Third** | bg **#1A1B25**, text #FFF, padding 0 20, 155×40 | bg **#5E4CFF** (measured) | Hero "Talk to our team", FAQ "Talk to our team", beyond-copilots "Watch the build" |
| **Fourth** | bg **#F8FAFB**, 1px #DFE1E7, text #272835, 131.5×40 | bg **#ECEFF3** (measured) | Hero "Start for free" |
| Fifth | bg #5E4CFF, text #F8FAFB | rgba(94,77,255,.7) | — |
| **Sixth** | bg #5E4CFF, text #F8FAFB, padding 16/32, 179×50 (mobile 8/12, 40 tall) | rgba(94,76,255,.7) | CTA band primary |
| **Seventh** | bg rgba(94,76,255,.2), text **#B4ACFF**, 155.5×50 | bg rgba(94,76,255,.6), text #DDD9FA | CTA band secondary |
| "Variant 1" purple | bg #5E4CFF + 1px #4835F2, text #FFF ls −0.3, 12/20 | none measured | "Read case study", "Start for free" (beyond-copilots, playground) |
| "Variant 1" light | #F8FAFB + 1px #DFE1E7, text #272835 | — | "Book a demo" (playground/tablet nav), bi-as-code "Read the full case study" (+18px arrow icon) |

Hero button pair: a flex row with gap **16**, centred, wrapper padding `0 0 1px 4px`. Measured hrefs: "Talk to our team" → `./start`; "Start for free" → `https://app.lightdash.cloud/register`. Keep these as-is (they are odd but measured).

## 6. Motion (shared)

From `__framer__appearAnimationsContent` *(source)*, confirmed by polling:

| Element | Trigger | Initial → final | Transition |
|---|---|---|---|
| Hero section (whole block) | page load | opacity 0.001 → 1 | spring, bounce 0.2, **0.4s**, delay 0 |
| Hero pixel squares (8–10 × 32px) | page load | translateY **−32px** → 0 (opacity stays 1) | spring, bounce 0, **0.6s**, **delay 1s** (all at once, no stagger). Integrations: −30 (top cluster) / +30 (bottom cluster) |
| Tabs progress bar | load / tab activation | scale 0 → 1 (origin 50% 0) | **tween 8.8s linear** `[0,0,1,1]`. It restarts when a tab is clicked. **No auto-advance** once full (watched for 15s) |
| Tab open/close | click | height 68 → 137 (layout) | spring ~150–170ms, ~1px overshoot (measured) |
| FAQ item | click | height 68 → open, icon rotate 0 → **45°** (plus becomes ×) | height spring ~150ms; icon spring with overshoot to ~45.6°, settles ≈380ms. Items toggle **independently** (several can be open at once) |
| Buttons | hover | bg color | spring 0.4s bounce 0.2 |
| Footer links | hover | color #A4ABB8 → **#ECEFF3** | Framer link transition |
| Nav chrome | scroll | translateY −min(scrollY,40) | scroll-linked |

**No scroll-reveal (whileInView) animations exist on these pages.** The SSR HTML has no hidden `opacity:0.001` content except the hero, and polling confirmed sections are static when they scroll into view. There are no logo marquees: the Logos row is a static 6-column grid. Page-specific motion (context-layer diagram, snake game, bi-as-code video, embedding Rive) is in product-pages.md and §9.

## 7. Shared section components

All sections are 1280 wide inside the Content-wrapper. "dashed" means 1px dashed #E5E7EB drawn via `::after` with the listed sides (top right bottom left).

### 7.1 Hero (centered, "Hero")
- Top **Spacer** 100 tall. It holds 8–10 **pixel squares** (32×32 images, `object-fit:cover`) at absolute positions relative to the hero top-left corner (0,0). The cluster layout is the same on all pages: (0,0) (32,32) (0,64) (64,0) [(128,0)] on the left; (1184,0) (1216,32) (1248,0) (1248,64) [(1120,0)] on the right. Files differ per page: see product-pages.md. Most pages use shared `yGf6glYNCy9vFPbhqRvK3HFGibw.png`, `uB7eivLm76XmEcwSoR7NdFWfE9w.png`, `uAlfjPfpO9rjiU9CV9steG7Ythg.png`, `fBtVNQ5ztQ8ixYw2hMZjUaHn3TI.png` (purple), or `u7dNRCA7…`, `1mJCqq22…`, `1kZ2cjGo…`, `1dXtMtg8…` (lavender). Embedding uses orange page-specific squares.
- **Title** block: flex column gap 10, centred, H1 w1024 (display-72) at y+100. In the 56px variant (metrics/embedding) there are two lines; the second line is accent #5E4CFF, and there is a 1px dashed top line.
- **Subtitle** block: padding 24/0, lead-18 centred, max width ≈475–498.
- **Buttons** row (Third + Fourth), 41 tall.
- **Spacer** 56 tall with a bottom dashed line.
- **HeroImage**: full 1280 width. Padding varies (48/24/0 conv-analytics, 24/24/0 metrics, 0/24 others). It has a bottom dashed line and a background image `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (2784×1960 lavender glow, cover) on most pages. Contents are page-specific: image, inline SVG, iframe, Rive or HTML diagram.
- **Heading** (logos caption): 87.4 tall, padding 32/0, caption-18 centred, side hairlines solid.
- **Logos** grid (§7.2).

### 7.2 Customer logos row ("Logos")
- 1280×112, padding 24/0, `grid-template-columns: repeat(6, 213.33px)`, 1px solid #E5E7EB border on all sides. Each cell is 161×64, centred (cell content flex column, gap 8). There is a hidden hover overlay `rgba(13,13,18,.02)` at opacity 0 (no visible hover was measured).
- Logos in order, colour #333742 (rgb 51,55,66). Files are in `public/assets/shared/logos/`:
  1. Kraken: `logo-kraken.svg` 87×15
  2. octopus energy: `logo-octopus-energy.svg` 124×17
  3. workday: `logo-workday.svg` 66×26
  4. JustWatch: `logo-justwatch.png` 111×18.1 (raster 416×68)
  5. Adobe: `logo-adobe.svg` 85×22
  6. fal: `logo-fal-icon.svg` 17×16 + `logo-fal-wordmark.svg` 23×17, 8px apart (icon at x+57, wordmark at x+82 in a 162 cell)
- Responsive: **810:** 3 columns × 259.3, 2 rows (176 tall). **390:** 2 columns × 179, 3 rows (240 tall). Exception: self-improving keeps 6 tiny columns.
- No marquee or animation.

### 7.3 Accordion tabs + image ("Self-improving semantic layer" / "Tab 1" split row)
- Each row is 1280×609 (taller with a pill), bg #FFF, with solid hairlines `0 1 1 1`. There are two halves:
  - **Content column** 672 wide with padding-left 64. The inner column is 608 wide with a dashed left line.
  - **Image** 608×609. Well bg **#F7F8FA**, 1px solid left line, `img` 1280×1705 cover.
- Rows alternate: row 1 has text left and image right; row 2 has the image left and text right. The text column then starts at x=688 (with the 64 padding), and the progress bar sits at x≈752.
- Header box: padding `64 20 24 24`, dashed all sides, gap 16. Optional **Subtitle Pill** (bg #5E4CFF, 1px #5E5B5B, r6, padding 6/14, Inter 13/16 w500 ls −0.26 #FFF). Then h3-32 (w564) and lead-18.
- **3-Tab Spacer**: 40 tall, dashed all sides.
- Tab items (3 or 4): top hairline solid; inner box bg #FFF, padding **20/24**, dashed left, gap 8.
  - Closed: 68 tall, title tab-title-18 only.
  - Open: ~137, title + tab-body-18 description (w560).
- **Progress bar**: a 1px-wide clip at the content column's left edge (x=144). Inside it is a #5E4CFF bar, the full height of the open tab, `transform-origin:50% 0`, scale 0 → 1 over 8.8s linear. Visually it is a 1px purple line growing downward along the open tab's left edge.
- Click a closed tab: it opens (spring), the previously open tab closes, the right-hand image swaps instantly (no crossfade measured), and the progress bar restarts.
- Responsive (390): stacks as header → tabs → image, all 358 wide (see `reference/pages/*-390.png`).

### 7.4 Feature cards grid ("Desktop 1x3", "Desktop 3x2", "Desktop 2x2" text cards)
- Section bg #FFF, padding **72/0**, flex column gap 20, centred. Some have solid side hairlines.
- **Headings**: padding 16/72, gap 16. h2-48 is left-aligned for 1x3/3x2 and centred for the 2x2 text grid. Optional sub-16 line in #6B7280.
- **Carousel Viewport**: padding 0/72, so the grid is 1136 wide.
  - **1x3:** 3 cards × 365.3, column gap ≈20 (x 152 / 537 / 923). Each card is a "Text" block with padding 28, gap 10, and a **1px solid top line only**. Title card-title-24, body card-body-16 (w309).
  - **3x2** (embedding): same columns with row gap 20. Each card has a full 1px solid #E5E7EB border and is 169.2 tall.
  - **3x2 with images** (interactive-dashboards): card 365.3×371.6, full solid border. Image 365×228 cover on top, then the Text block (padding 28, top line).
  - **2x2 text** (conv-analytics): grid 556+556, gap 24. The grid has a dashed outer border, and each card has a dashed border all round with padding 28 (169.4 tall).
- Cards are `<a>` with no href and no hover change.

### 7.5 Icon benefits grid ("2x2 Desktop" / "Benefits Grid")
- Section padding `0 65 58`. Headings padding `72 0 48`, h2-48 centred (w787).
- Grid 1150 wide = 2 × 575, with a dashed top/left outer line. Each "Benefit" has a dashed right/bottom line (192.8 tall, 167.2 when single-line).
  - **Icon column** 84 wide: an "Icon Top" 84×84 cell with bg #F3F4F6 and a dashed bottom line holding an 84×84 pixel-art icon (purple dithered square, page-specific svg/png). Below it is an empty "Icon Fill".
  - **Content column** 491 wide: Title Row 84 tall (padding 0/24, dashed bottom, card-title-24 ls −0.24, vertically centred), then Desc Row (padding 15/24/17, card-body-16).
- At 390 the grid becomes a single column (icon 72, see screenshot).

### 7.6 Customer quote ("Customer Quote", component "Customer Quote 2")
- Section bg #FFF, padding **112/0/80**, dashed `1 1 0 1`.
- **Quote Block**: padding 72/64, gap 20, centred. Background `linear-gradient(180deg, rgba(255,255,255,0) 0%, #F8FAFB 100%)`, dashed top/bottom.
  - Corner decorations: a 24×24 pixel square at the top-left (shared `WaafmTzn2YxUMHu8nSSagFz3AVg.png`) and a 72×72 pixel cluster at the bottom-right (shared `X5SDkd1yAACfVgQB3yQXbGxRPc.png`). Context-layer adds a 96×24 strip `A5IcxyocQc5idj7qaqDwtAajEWY.png`.
  - Company **Logo** 100×34 (padding 0/28).
  - Quote: quote-40 centred, w780 (quote-32 on context-layer).
- **Attribution** row: 120 tall, padding 28/80, space-between, dashed bottom.
  - Left: Photo 64×64, `filter: grayscale(1)`, overflow clip, no radius. Then name-20, then role caption-18 ("Title @ Company"), with a 16px gap after the photo.
  - Right: "Read case study" purple Variant 1 button, 154.2×42.
- **Statistics** (optional): 3 cells × 426.7 × 151.4, padding 36/32, gap 8, dashed bottom/left. stat-48 number, then caption-18 label.
- Optional decorative **lines** footer: 4 stacked rows (14, 18, 20, 32 tall), each with a 1px solid top line, opacity 0.6. This shows a "converging lines" divider.
- Responsive: at 390 the quote stacks, and on conv-analytics and interactive the Customer Quote is **re-ordered after the CTA band** (measured y order at 390: FAQ 5155 → CTA 6016 → Quote 6508). Follow the measured order.

### 7.7 Comparison table ("Maintenance Comparison")
- Section bg #FFF, dashed side lines, flex column gap 64 (padding 51/0), or a heading block 250 tall (padding 53/64).
- h2-48 centred w720, #272835 (accent span #5E4CFF where noted).
- Table 1280 wide, 4 columns × 320, dashed top/bottom.
  - **Header row** 58–84 tall: cells padding 16/24, bg #F8FAFB. Column 2 (Lightdash) is **rgba(94,76,255,.1)**, and columns 2–4 have a dashed left line. The first header cell holds a 96×48 pixel decoration (`DJ9t63CK7AvK96kcCGb3lB6I4Ac.png`). Labels are Inter 18/26 w500 ls −0.27 (#0D0D12 for Lightdash, #272835 others).
  - **Body rows**: dashed top line, cells padding 24, gap 6.
    - Col 1: Inter 18/26 w500 #272835.
    - Col 2: Inter 18/26 w500 #0D0D12 on rgba(94,76,255,.1). In the **last row** this column is `linear-gradient(180deg, rgba(130,116,255,.1), rgba(130,116,255,0))`, so it fades out.
    - Cols 3–4: Inter 18/23.4 w400 ls −0.36 #1A1B25.

### 7.8 FAQ ("FAQ", component "Question")
- 1280 wide, flex row. Height = content (468–728).
  - **Left** 549.6 wide: padding 64, gap 10. faq-h-48 ("Your questions, answered", w421.6). Then lead copy Inter 18/32 ls −0.27 #666D80 ("For any other questions, reach out to our team." or "…feel welcome to reach out to our team."). Then a **Third** button "Talk to our team" → `./start`. There is a vertical 1px solid divider between the columns.
  - **Right** 730.4 wide: padding 64, items 602.4 wide.
- Item: padding **24/0/23**, 1px solid #E5E7EB bottom line, overflow hidden, cursor pointer.
  - Trigger row: flex, gap 10, question faq-q-20 (w578.4), then a 14×14 plus icon (wrapper padding-top 3).
  - Plus icon svg: `viewBox 0 0 13.334 13.333`, path `M6.667 0V13.333 M0 6.667H13.334`, stroke **#666D80**, stroke-width 1.667, square caps.
  - Answer: 8px below the trigger, faq-a-14 (rich text, links #5E4CFF, `strong` w700).
- Closed height 68 (single-line question); two-line questions are taller. No hover colour change. Behaviour is in §6.
- Responsive: at 390 it stacks (left block, then items 326 wide); the heading becomes 36/32.4.
- Screenshot: `reference/pages/_shared-faq-open-1440.png`.

### 7.9 Blog posts ("Blog Posts Section")
- Section bg #FFF, padding **80/64**, gap 32, solid side lines.
- Eyebrow "From the blog" caption-18 centred (w720). blog-h2 "Keep building with …".
- 3 **Article Card**s, each 373.3×360, gap ≈16, bg #FFF, dashed border all round, overflow clip.
  - **Thumbnail** 373.3×160 cover (absolute top), solid bottom line.
  - **Content** at y+160: padding 24, gap 14. blog-card-22 title, then an author row: 20×20 avatar (radius 100%) + blog-meta-13 name, 8px gap.
- The whole card is a link to `./blogpost/<slug>`. No hover change was measured.

### 7.10 Hatched spacer band
- 1280×80 block (39 at 390) used between sections on embedding (and as a `lines` header on playground). 1px solid #E5E7EB top and bottom, opacity 0.8 (0.6 on some).
- Background image `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (3840×372 diagonal hatch, cover).

## 8. Split content row ("Split Content")
1280×464, padding 72/65, gap 32. Left: h2-48 (w551, left), then lead-18 (w551). Right: image 551×320 cover at x=744. Used on context-layer and beyond-copilots.

## 9. CTA band ("Snake Game CTA", identical on every inner page)

**Section** 1280×473, padding 64. Background: base **#CDD2D9** with an overlay `linear-gradient(rgba(0,0,0,0) 1px, #F6F8FA 0), linear-gradient(90deg, rgba(0,0,0,0) 1px, #F6F8FA 0)` at `background-size: 8px 8px`. This gives an 8px grid of #CDD2D9 1px lines on #F6F8FA. It has solid side lines (top on some pages).

**Card** ("Stack") 1152×326, bg **#1A1B25**, overflow hidden, shadow:
`rgba(39,40,53,.1) 0 0 0 1px, rgba(39,40,53,.08) 0 24px 24px -12px, rgba(39,40,53,.08) 0 12px 12px -6px, rgba(39,40,53,.08) 0 6px 6px -3px, rgba(39,40,53,.08) 0 2px 2px -1px`. The card is a flex row:
1. **Right Dotted Pattern** 64×326 with a 64×64 pixel cluster at its top (`shared/Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png`, 128×128).
2. **Content** 1024 wide, flex column gap 28, padding-top 72:
   - Title cta-56 ("Ready to free up" / "your data team?", two lines, w397.5).
   - **CTAs**, gap 16:
     - **Sixth** "Talk to our team" 179×50 → `./start`
     - **Seventh** "Start for free" 155.5×50 → `https://app.lightdash.cloud/register`
   - The game stage (621.5×326, starting at x=611) sits to the right inside the content area.
3. **Left Dotted Pattern** 64×326 with a 1px dashed #36394A left line.

There are also faint 1px dashed #36394A vertical guides inside the card at x≈208 and x≈611 (see screenshot).

**Snake game** (code component; full source downloaded to `public/assets/shared/components/cta-snake-game.framer.mjs`. Port it; don't re-invent it):
- `.snk-stage`: position relative, overflow hidden, cursor pointer, font **Pixelify Sans** (Google Fonts, also downloaded), background #1A1B26.
- Grid: cell = round(stage/30px) → 29×29 cells at 1440. cols are clamped 8–80 and rows 6–60.
- Tiles are 6 inline 32×32 SVG pixel tiles: purple #5E4CFF → #8001FE gradients with soft-light diagonal hatching, some lavender. They are drawn as background-image data URLs on absolutely positioned divs.
- **Demo mode (autoplay):**
  - A 5-segment snake path-finds (A* with heuristic weight 1.8) to food. Tick **190ms**.
  - 5 foods spawn staggered **240ms** apart. Food fades in via `opacity 240ms ease` (`.snk-spawning`) and fades out on eat (`.snk-eaten`, removed after 240ms).
  - When all food is eaten, the segments fade out (`.snk-gone`, 320ms ease) and the demo restarts after 360+250ms.
- **Click or tap the stage** to play:
  - The board fades to opacity .5 with a `backdrop-filter: blur(7px)` message.
  - "READY?" pops in (`snk-pop` 260ms cubic-bezier(.22,1,.36,1), scale .7 → 1). "GO!" appears at 800ms and play starts at 1450ms.
  - Tick **135ms**. Arrows/WASD or swipe to steer. "SCORE n" shows top-right (top 10, right 14, Pixelify 16px ls 1px, opacity .9).
  - On a wall or self hit: "GAME OVER" (34px) and "PLAY AGAIN?" (16px, opacity .82).
- Respects `prefers-reduced-motion` (pop disabled).

**Mobile (390):** the section is 358×492, padding 24/16. Card 326×444, stacked:
- 40px pattern strip on top (dashed bottom #36394A).
- Content padding 80/10, gap 20, centred: title 32/35.2 centred; buttons **Sixth "Start for free" → ./start** (115.5×40, padding 8/12) and **Seventh "Try live demo" → https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home**.
- Game stage 326×203 below.
- 40px strip at the bottom.

At 810 some pages show "Sign up / Start for free" labels (data-apps 810 text). Follow the screenshots.

## 10. Footer ("Footer", identical on all inner pages)

Full-bleed bg **#1A1B25**, 1440×600. Inner **Wrapper** 1280 wide with solid #36394A side lines (`::after 0 1 0 1`). Content 1152 wide, padding-top **84**, flex column. Full-bleed **Lines** overlays: dashed #272835 lines extend 2304 wide behind the rows, plus a 64-wide dashed column at the right edge (x=1296).

Rows (y relative to footer top):
1. **Top** (y 84, 36 tall), space-between:
   - Logo 135×28 (`shared/footer/lightdash-logo-footer.svg`, white).
   - Right block at x=798: "Join our newsletter to be en-lightened" (Inter Variable 14/20 ls −0.14 #A4ABB8).
2. **Form** (y 120, 40 tall, dashed bottom), right aligned, 498 wide ("Newsletter Form"):
   - Email `input` 385.4×39, bg #36394A, padding 10/20/10/24, placeholder "Enter your email address" (#666D80-ish).
   - Submit `input` "Subscribe" 112.6×39, bg #FFFFFF, padding 10/20, text #1A1B25 (Inter 14 w500).
   - Square corners, no gap.
3. **Spacer** (40, dashed bottom).
4. **Items** (y 200, 240 tall, dashed bottom), space-between:
   - **G2 badges** grid 4 × 70px, column gap 9, rows of 80 tall + 20 gap. The cells between badges have dashed side lines.
     - Row 1: EasiestAdmin Mid-Market, EasiestToDoBusinessWith, EasiestToDoBusinessWith Mid-Market, HighPerformer.
     - Row 2: HighPerformer Mid-Market, MomentumLeader, UsersMostLikelyToRecommend Mid-Market, UsersMostLikelyToRecommend.
     - Files: `public/assets/shared/footer/g2-*.svg` (viewBox 49×56, render 70×80).
   - **Link columns** at x 798 / 967 / 1137, each 159.3 wide, gap 24 between rows of 20. Headers Inter Variable 14/20 **#F8F9FB**, links Inter 14/20 ls −0.14 **#A4ABB8**, hover **#ECEFF3**:
     - **Product:** Get started → `./start` · Live demo → `https://demo.lightdash.com/login` (_blank) · Changelog → `https://changelog.lightdash.com/` (_blank) · Cloud status → `https://status.lightdash.com/` (_blank)
     - **Company:** About us → `./about` · Careers → `https://jobs.ashbyhq.com/lightdash` (_blank) · Privacy Policy → `./privacy-policy`
     - **Resources:** Documentation → `https://docs.lightdash.com/introduction` (_blank) · Security → `./lightdash-security` · Blog → `./blog` · Lightdash University → `https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA` (_blank) · Lightdash Merch Store → `https://lightdash.shop/` (_blank)
5. **Bottom** (y 440, 74 tall, align end, padding-bottom 16):
   - Socials: 23×23 icons, 10px gap, all `_blank`:
     - X → `https://x.com/lightdash_devs` (`social-x.svg`)
     - LinkedIn → `https://www.linkedin.com/company/lightdash/` (`social-linkedin.svg`)
     - Slack → `https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI%7EQbjCAHQs0WBac3w` (`social-slack.svg`)
     - GitHub → `https://github.com/lightdash/lightdash` (`social-github.svg`)
     - YouTube → `https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA` (`social-youtube.svg`)
   - Copyright right-aligned: "© 2026 Telescope Technology Limited. All rights reserved." Inter Variable 13/20 ls −0.13 **#666D80**.

**Mobile (390):** 390×826. Content 358 wide, padding-top 84:
- Newsletter text centred, then the form (245.4 + 112.6).
- Link columns become a 2-col grid (174 + 174, gaps 40/10), with a dashed #36394A top line and padding 24/0. Order: Product | Company, then Resources.
- G2 badges and the logo stack according to the screenshot.
- Bottom row: socials left, copyright right-aligned (w193, wraps to 2 lines).

## 11. Reference screenshots
- `reference/pages/<slug>-1440.png` and `<slug>-390.png` (full page, Intercom hidden) for all 11 product pages.
- `reference/pages/_shared-nav-light-1440.png`, `_shared-nav-light-product-menu-1440.png`, `_shared-faq-open-1440.png`.

## 12. Not captured / caveats
- Light mega-menu dashed-line colour and the active-trigger pill colour were sampled from the screenshot, not computed.
- The newsletter form submit endpoint (HubSpot/Framer form) was not inspected. The input placeholder colour was not computed.
- Tablet (810) layouts were measured for section order and type scale only. Use the 1440/390 screenshots plus the scale tables for intermediate widths.
- Light phone-menu open state was not screenshotted. Assume the CLONE_SPEC §5.2 structure on white (#FFFFFF bg, dark text).
- Intercom, Framer editor bar and analytics scripts are excluded.
