Source: https://www.lightdash.com/

# Company / commercial pages: clone spec

Routes covered: `/pricing`, `/start`, `/startups`, `/fintech`, `/partnerships`, `/about`, `/roadmap`, `/lightdash-security`, `/jp`.

Measured on 2026-10-13 with Playwright and headless Chromium at DPR 1. Widths: 1440×900 (primary), 810×1080 and 390×844. Every px, color and font value here comes from `getComputedStyle` / `getBoundingClientRect`, or from the Framer component source for the page (`framerusercontent.com/sites/…/*.mjs`). Values from source are marked *(src)*. All y values are page-absolute at 1440 unless noted.

**Not in this file.** The **navbar** and **footer** are owned by `specs/SHARED.md` (navbar is also in `CLONE_SPEC.md` §2–5). Every page here uses the **standard footer**, which is 600 px tall at 1440 and 826 px at 390. On these pages the navbar is the **light/white variant**: bar bg `#FFFFFF`, 106 px tall at desktop; 64 px "Primary" bar at ≤1099. Page content starts at `padding-top:106px` (64 px on tablet/mobile). The homepage uses the dark nav; for the light variant, follow SHARED.md.

**Reference screenshots** are in `reference/pages/` as `<slug>-1440.png`, `<slug>-390.png`, and `pricing-faq-open-1440.png`. They are full-page captures taken after a slow scroll, so all scroll-reveals have fired. In some fintech crops the hero chat widget is mid-animation.

**Assets** are in `public/assets/pages/<slug>/` with originals at full resolution (Framer `?width=…` params stripped). The machine-readable manifest is `public/assets/pages/company-pages-manifest.json`, which lists file → source URL → rendered size → intrinsic size for every file. Files named `*-<hash>.svg` are inline SVGs or data-URI backgrounds extracted verbatim. `renders/*@2x.png` are 2× element captures of complex Framer-built illustrations (see §1.9). New fonts were added to `public/fonts/`: `pixelify-sans-400-latin.woff2` and `geist-var-latin.woff2`.

---

## 0. Template groupings

| Template | Pages | Description |
|---|---|---|
| **A. "Bordered column" marketing page** | pricing, startups, about, roadmap, lightdash-security, jp, start | White page. Content sits in a 1280 px column (`max-width:1312px; padding:0 16px` wrapper → inner `Content-wrapper` 1280) with **1px solid `#E5E7EB` left/right/top hairlines** (`border-bottom:0`). Sections stack vertically and are separated by **1px dashed `#E5E7EB`** horizontal rules. Hero = centered or left title block. Most pages end with the shared **"Ready to free up your data team?" CTA block** (§1.6). jp and start do not. |
| **B. "Section-boxed" landing page** | fintech, partnerships | Full-width `Content-wrapper`/`Main` (`padding:0 16px`, bg `#FFF`). Each section is its own `<section>` with `max-width:1280px` and a **1px solid `#E5E7EB` box border**: top+bottom on the first, then `border-top:0` on the following ones. fintech also has a full-bleed dark band (`#1A1B25`). |

Shared components used across pages: Button Multi Variant (§1.4), FAQ accordion (§1.5, pricing + fintech), CTA block with Snake game (§1.6; pricing, startups, fintech, about, roadmap, security), Pixel corner decorations (§1.7), logo strips (per page), Dotted background (§1.6).

---

## 1. Shared tokens and components

> **Relationship to `specs/SHARED.md`.** SHARED.md is canonical for the page shell (§0), light navbar (§2), Button Multi Variant (§5), FAQ (§7.8), the CTA band + Snake game (§9) and the footer (§10). Sections 1.4–1.6 below are my independent measurements on these nine routes. They agree with SHARED, apart from the small additions noted inline (CTA tablet/mobile label swaps, snake stage background is transparent here, FAQ timings). **None of the nine pages in this file has the 40 px announcement banner.** Nav sits at y = 0 and content starts at y = 106.

### 1.1 Breakpoints (page-level, from the page CSS)
| Name | Range | Notes |
|---|---|---|
| Desktop | `min-width:1100px` | most pages. `/about` desktop starts at **1000px** (`(min-width:1000px)`; tablet 810–999). `/fintech` uses 1200 for some inner components (`(max-width:1199px) and (min-width:810px)`). `/jp` uses `min-width:1440px` for desktop and **810–1439.98 = tablet layout**. |
| Tablet | `810px – 1099.98px` | nav switches to the 64 px "Primary" bar; content-wrapper becomes `calc(100vw-32px)` (778 at 810) |
| Mobile | `max-width:809.98px` | single column; content-wrapper 358 at 390 (16 px side padding) |

### 1.2 Colors (computed; Framer token in parentheses where known)
| Token | Value | Use |
|---|---|---|
| page-bg | `#FFFFFF` | body/page |
| line | `#E5E7EB` | column hairlines (solid), section separators (dashed) |
| line-soft | `#ECEFF3` / `#EDEFF3` | startups feature grid dashed lines |
| line-card | `#DFE1E7` (`--token-54e3f719…`) | card borders, light button border, input border |
| surface-1 | `#F6F8FA` | pricing plan well, compare-table well, dotted-bg base, fintech testimonials band |
| surface-2 | `#F8FAFB` (`--token-b6396ce9…`) | light buttons, roadmap column body, startups grid placeholder |
| surface-3 | `#F8F9FB` | startups compliance tiles |
| ink-900 | `#000000` | some headings (pricing hero, about "Our story so far") |
| ink-800 | `#1F1F1F` | fintech/partnerships h1, card titles |
| ink-700 | `#272835` (`--token-5d552e0d…`) | primary headings, dark text on light buttons |
| ink-600 | `#36394A` (`--token-17b2ef6e…`) | body-strong, FAQ text, table values |
| ink-500 | `#666D80` (`--token-cd17b9ef…`) | subtitles/body |
| ink-400 | `#818898` | muted labels ("Open Source" plan name, captions) |
| ink-300 | `#A4ACB9` | grey heading halves ("Why you should apply to …"), separators "·" |
| dark | `#1A1B25` (`--token-460d74c5…`) | dark buttons, CTA stack, fintech dark band, testimonial card |
| dark-2 | `#272835` | pricing "Cloud Pro" card |
| dark-line | `#36394A` | dashed lines on dark |
| brand | `#5E4CFF` (`--token-de0b4b91…`) | brand purple: links, active states, checks |
| brand-border | `#4835F2` | 1px border of purple pill buttons |
| brand-alt | `#615AF7` | startups qualify-card highlighted words |
| brand-text-soft | `#B4ACFF` | "Seventh" button label |
| brand-link-jp | `#7364FE` | JP card links |
| tooltip-bg | `rgba(39,40,53,0.80)` | pricing table tooltip |
| roadmap-hover | `#F8F5FF` | roadmap linked-item hover bg |
| dotted-dot | `#CDD2D9` | Dotted background dots |

### 1.3 Typography
Fonts (all in `public/fonts/`):
* "Britti Sans Medium": `britti-sans-medium.woff2`, weight 500.
* "Britti Sans Trial Semibold": `britti-sans-semibold.woff2`, 600. **Framer requests weight 600 but computed weight shows 400/900 on some nodes. Always render it with the semibold file.**
* "Britti Sans Trial Regular": `britti-sans-regular.woff2`.
* "Britti Sans Trial Bold": `britti-sans-bold.woff2`.
* Inter: 400/500/600/700, the `inter-*-latin.woff2` files.
* "Inter Variable": `inter-variable-framer.woff2`.
* "Pixelify Sans" 400 (snake game): `pixelify-sans-400-latin.woff2`, from https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TTp0E1fZZN4h1mWruk.woff2.
* "Geist" variable (tiny text inside fintech mockups only): `geist-var-latin.woff2`.

Fallback stacks are `"<Family>", "<Family> Placeholder", sans-serif` (see CLONE_SPEC §1.3).

Recurring text roles at 1440 (size / line-height / weight / letter-spacing / color):

| Role | Spec |
|---|---|
| Page title, centered (startups, about, roadmap, security, jp) | Britti Sans Trial Semibold **56/50.4**, ls −0.27px, `#272835`, center |
| Hero h1, large (fintech, partnerships) | Britti Sans Trial Semibold **72/68.4**, ls −1.44px, `#1F1F1F` |
| Pricing hero | Britti Sans Trial Semibold **56/50.4** (line-height 90%), ls −1.12px, `#000`, left, two `<p>`s |
| Section h2 | Britti Sans Trial Semibold **48/43.2**, ls −0.96px, `#272835` (fintech/partnerships: 48/48) |
| Section h2 (Britti Medium) | "Compare our plans", "Your questions, answered": Britti Sans Medium **48/43.2**, ls −0.48 / −0.96px, `#272835` / `#36394A` |
| CTA title | Britti Sans Trial Semibold **56/53.2**, ls −1.12px, `#FFF` (mobile 32/35.2, ls −0.64, centered) |
| Subtitle / lead | Inter **18/31.86** (or 18/32), ls −0.27px (−0.18), `#666D80`, center |
| Card title | Britti Sans Medium 20/24–28, ls −0.2 to −0.4px, `#272835` or `#36394A` |
| Body small | Inter 14/20–24, ls −0.28px, `#666D80` / `#36394A` |
| Button label | Inter **15/18 w500**, ls normal (or −0.3px on "Variant 1" buttons) |
| Eyebrow / uppercase | Britti Sans Trial Regular 14/20, uppercase, `#818898` |

### 1.4 Buttons
**"Button Multi Variant"** *(src, `rmEAnlsaY…mjs`)*.
* Base: `display:flex; gap:4px; align-items:center; justify-content:center; min-height:40px; padding:0 20px` (some instances use 16px 32px, which makes them 50 px tall); `border-radius:6px`; Inter 15/18 w500. Border is drawn by a `::after` overlay: `border:1px solid var(--border-color)`, inset 0, radius inherit.
* Optional trailing arrow: 16×16 box holding an 8×8 diagonal arrow SVG, stroke `#818898` 1.5px.
* Hover transition is a Framer spring (duration 0.4s, bounce 0.2) *(src)*. A CSS approximation is `transition: background-color .3s cubic-bezier(.2,.8,.2,1), color .3s`.

| Variant (framer name) | Rest | Hover | Used for |
|---|---|---|---|
| Primary | bg `#FFF`, 1px `#DFE1E7`, text `#272835` | bg `#1A1B25`, border 0, text `#FFF` | (not on these pages) |
| Secondary | transparent, 1px `#666D80`, text `#FFF` | bg `#666D80` | (dark contexts) |
| **Third** | bg `#1A1B25`, no border, text `#FFF` | bg **`#5E4CFF`** | "Talk to our team", "Request", "Apply to the program", "Sign Up", "Visit Security Centre", "東京イベント参加" |
| **Fourth** | bg `#F8FAFB`, 1px `#DFE1E7`, text `#272835` | bg **`#ECEFF3`** | "Start for free", "Go to repo", "Start free trial", "Get in touch", "Join now", "デモ予約" |
| Fifth | bg `#5E4CFF`, text `#F8FAFB` | `rgba(94,77,255,.7)` | — |
| **Sixth** | bg `#5E4CFF`, no border, text `#F8FAFB` | `rgba(94,76,255,.7)` | CTA block primary |
| **Seventh** | bg `rgba(94,76,255,.2)`, text `#B4ACFF` | bg `rgba(94,76,255,.6)`, text `#DDD9FA` | CTA block secondary |

Other buttons:
* **Purple pill** (partnerships "Apply now", about "See open roles"): framer "Variant 1". bg `#5E4CFF`, 1px `#4835F2`, radius 6, padding 12px 20px, height 42, gap 8, Inter 15/18 w500 ls −0.3px, text `#FFF`. No hover change was measured.
* **"Read the full case study" / fintech "Start for free"**: framer "Variant 1 > Book a demo". Light button, bg `#F8FAFB` → hover `#ECEFF3`, height 42, Inter 15/18 w500 ls −0.3px `#272835`, with trailing arrow.
* **Partnerships form submit**: `<button type=submit>` 200×42, bg `#1A1B25` → hover `rgba(51,51,51,.85)`, radius 6, padding 12px 20px, label "Submit" Inter 15/18 w500 ls −0.3px `#FFF`.

### 1.5 FAQ accordion ("Question" component, used on pricing + fintech)
Layout at 1440 is a two-column row inside a section with a 1px `#E5E7EB` border.
* **Left column**: 550 wide, padding 64, gap 10 (fintech gap 20).
  * h2 "Your questions, answered": Britti Sans Medium 48/43.2, ls −0.96px, `#36394A`, width 421.
  * Lead "For any other questions, feel welcome to reach out to our team.": Inter 18/32, ls −0.27px, `#666D80`.
  * "Talk to our team" button, Third variant, 155×40 → `./start`.
* **Right column**: 730 wide, padding 64, items stacked with no gap.
* **Item, Closed**: width 602, height **68**, padding `24px 0 23px`, bottom border 1px solid `#E5E7EB` (as `::after`).
  * Trigger row: flex, gap 10. Question text is Britti Sans Medium **20/20 (100%)**, ls −0.4px, `#36394A`, width 578.
  * Plus icon is 14×14 (`public/assets/pages/pricing/icon-trigger-1f3ea972.svg`), sitting in a 14×17 box with `padding-top:3px`.
* **Item, Open**: the trigger gets `padding-bottom:8px`, then the Answer appears (Inter **14/24**, ls −0.28px, `#36394A`, width 602; links `#5E4CFF`). Height is 68 + 8 + answer height (e.g. 147 with a 72 px answer).
* **Motion (measured)**: click toggles. The plus rotates **0 → 45°** (becoming ×) on a spring that settles in ~430 ms with slight overshoot. The answer text fades **opacity 0 → 1 in ~200 ms**. Height animates via Framer layout animation (scaleY correction, ~250 ms). Items are **independent**: opening one does not close the others. Hover changes nothing (cursor pointer).
* Mobile (390): single column. Left block padding `64px 24px 24px`; right list padding 24, items 310 wide. Closed items are 68–88 tall (questions wrap).

### 1.6 CTA block: "Ready to free up your data team?" (+ Snake game)
Used on pricing, startups, fintech, about, roadmap and security, always directly above the footer. If SHARED.md also specs this block, SHARED wins; this is the measured reference.

**Desktop (1440)**
* Outer: 1280 × **473**, left/right 1px solid `#E5E7EB`. On fintech the outer is 1408 wide and the Stack is 1280.
* Background is the "DootedBackground" code component *(src)*: wrapper bg `#CDD2D9` with an inner div whose background is `linear-gradient(transparent 1px, #F6F8FA 0), linear-gradient(90deg, transparent 1px, #F6F8FA 0)` and `background-size: 8px 8px`. The result is a 1 px `#CDD2D9` dot every 8 px on `#F6F8FA`.
* Padding 64 → **Stack**: 1152 × 326, bg `#1A1B25`, `overflow:hidden`, box-shadow `0 0 0 1px rgba(39,40,53,.10), 0 24px 24px -12px rgba(39,40,53,.08), 0 12px 12px -6px rgba(39,40,53,.08), 0 6px 6px -3px rgba(39,40,53,.08), 0 2px 2px -1px rgba(39,40,53,.08)`. Radius 0.
* Stack is a row of five parts:
  1. **Left gutter**: 64 wide, right border 1px **dashed `#36394A`**. A 64×64 pixel cluster sits top-left: `public/assets/pages/pricing/group-2085662431-Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png` (128×128 source).
  2. **Text column**: 398 wide, vertically centered, gap 24.
     * Title: two `<p>` lines, "Ready to free up" / "your data team?". Britti Sans Trial Semibold 56/53.2, ls −1.12px, `#FFF`, left.
     * Then a CTA row with gap 16:
       * **Sixth** button "Talk to our team" → `./start`, 179×50, padding 16px 32px.
       * **Seventh** button "Start for free" → `https://app.lightdash.cloud/register`, 155×50.
  3. A 1px **dashed `#36394A`** vertical line.
  4. **Snake stage**: 622 × 326.
  5. **Right gutter**: 64 wide, left border 1px dashed `#36394A`.

**Tablet (810)**: Stack 650 wide, otherwise the same. Button labels change to **"Sign up"** (→ `./start`) and **"Start for free"** (→ register).

**Mobile (390)**: outer 358 × 492 (bg `#FFF`, padding 24px 16px). Stack is 326 × 444, a column:
* Top gutter row 40 tall with bottom border 1px dashed `#36394A`.
* Title "Ready to free up\nyour data team?": Britti Sans Trial Semibold **32/35.2**, ls −0.64px, centered. The second line is a span in `rgba(255,255,255,.7)`.
* Buttons, padding 8px 12px, height 40:
  * Sixth **"Start for free"** → `./start`.
  * Seventh **"Try live demo"** → `https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home`.
* Snake stage 326 × 203.
* Bottom gutter row 40 tall with top border dashed.

**Snake game** (code component; full original source saved verbatim at `public/assets/pages/_cta/snake-game.framer-source.js`; the 7 tile SVGs it uses are at `public/assets/pages/_cta/snake-tiles/tile-1…7.svg`):
* Props on these pages: `background: rgba(26,27,38,0)` (transparent), `block: 30` (cell target size), `interactive: true`.
* Grid: `cols = clamp(round(w/30), 8, 80)`, `rows = clamp(round(h/30), 6, 60)`. Cell size = `floor(w*dpr/cols)/dpr`, which gives **29 px** at 622×326 (21×11 grid). The grid is centered with integer-pixel offsets.
* Each segment and food item is an absolutely positioned div with a random tile SVG as `background-image` (`background-size:100% 100%`).
* CSS *(src)*:
  * `.snk-seg,.snk-food {transition: opacity 320ms ease}`, food 240ms.
  * `.snk-score`: Pixelify Sans 16px, ls 1px, `#FFF`, abs `top:10px; right:14px`, opacity 0 → `.snk-show` 0.9.
  * `.snk-message`: centered overlay, gap 14px, opacity 180ms. `.snk-dim` adds `backdrop-filter: blur(7px)` and `.snk-board.snk-faded {opacity:.5}`.
  * `.snk-big`: 34px/1.1, ls 1px.
  * `.snk-small`: 16px/1.5, opacity .82.
  * `.snk-pop`: keyframes `opacity 0 → 1, scale .7 → 1`, 260ms `cubic-bezier(.22,1,.36,1)`.
  * Cursor pointer, `touch-action:none`.
* **Demo mode** (on load, loops forever): spawns 5 food tiles staggered 240 ms apart, then a 5-segment snake enters from below the bottom edge (center column) and auto-paths to the nearest food. Pathing is A* with heuristic weight 1.8 and a flood-fill fallback. Tick is **190 ms**. When all food is eaten, segments fade out (`snk-gone`) after 360 ms, and the cycle restarts 250 ms later.
* **Play mode**: click or tap the stage while in demo or dead state.
  * Board resets, score shows "SCORE 0", and a 3-segment snake appears mid-board heading right.
  * Message "READY?" (snk-big, pop) shows on a dimmed board, then "GO!" at 800 ms, then play starts at 1450 ms.
  * Tick is **135 ms**. Controls: Arrow keys or WASD (preventDefault), or swipe (24 px threshold; a tap restarts).
  * Eating adds one segment and +1 score, and spawns one new food.
  * Hitting a wall or itself shows "GAME OVER" + "PLAY AGAIN?" (snk-small). A click restarts.

### 1.7 Pixel corner decorations ("Pixel" images)
Small square PNGs (16 or 32 px) placed at the top-left and top-right corners of the hero column on startups, jp and roadmap, forming a stepped pixel cluster.
* **startups / jp**: 32×32 tiles from `image-u7dNRCA7…`, `1mJCqq22…`, `1kZ2cjGo…`, `1dXtMtg8…`. Positioned at (x,y) = (80,106), (112,138), (80,170), (144,106), (208,106) on the left, and mirrored on the right at x = 1200, 1264, 1296, 1328.
* **Load motion** *(src, framer/appear)*: each tile starts at `translateY(-32px)` with opacity 1 and springs to 0 (duration 0.6s, bounce 0, **delay 1.0s**). All tiles move together.
* **roadmap**: 16×16 tiles in two rows.
  * Row 1 at y = 190: x = 80, 96, 112, 128, 144 and 1250, 1266, 1282, 1298, 1314.
  * Row 2 at y = 240: x = 136, 184 and 1213…1277.
  * Load motion: `translateX(-16px)` → 0, spring 0.4s, bounce 0, delays **1.0, 1.1 … 1.7s**, staggered 0.1s in pairs from the outside in.

### 1.8 Common section scaffolding (Template A)
* Hero spacer above the title: 100 px tall (pricing hero 209 with left padding 64). Separators are dashed 1px `#E5E7EB` at the top of Title and the top/bottom of Subtitle.
* Spacer below the hero: 56–88 px with bottom dashed border.
* Button rows: `gap:16px`.

### 1.9 Complex Framer illustrations: build approach
fintech (hero chat widget + 4 benefit mockups) and the startups grid placeholders are built in Framer from hundreds of tiny DOM nodes with variant-timeline animations. Pixel-perfect DOM reconstruction is not practical. Use the 2× renders in `public/assets/pages/fintech/renders/` as `<img>` (final animated state), sized to the measured boxes. Optionally add the entrance motion described per page. The startups ones are already flat PNGs.

---

## 2. `/pricing` (Template A)

Meta:
* `<title>`: "Lightdash Pricing & Plans".
* Description: "Explore Lightdash pricing for modern BI teams. AI-powered, dbt-native analytics with unlimited users, no per-seat pricing, and flexible deployment for teams of any size."
* Page height: 5995 (1440), 6881 (810), 8340 (390). Footer starts at y = 5395.

Section stack at 1440. All sections sit in the 1280 column at x = 80. The column has 1px solid `#E5E7EB` lines left/right/top.

| # | Section (framer name) | y / h | Notes |
|---|---|---|---|
| 1 | Hero | 106 / 209 | flex column, justify end, padding-left 64, bottom border 1px dashed |
| 2 | Spacer | 315 / 88 | padding-left 64 |
| 3 | Pricings | 403 / 998 | bg `#F6F8FA`, padding 24px 64px, grid `3 × 376px`, gap 12 |
| 4 | Logo grid ("Variant 1") | 1401 / 212 | border 0 1 1 1 solid `#E5E7EB`, padding 24px 0 60px, grid 6 × 213.33, rows 64 |
| 5 | "Compare our plans" title | 1613 / 150 | inner padding 104 0 0 (title at y 1717) |
| 6 | TablesWrapper | 1763 / 2417 | padding-top 40, four tables |
| 7 | FAQ | 4180 / 742 | §1.5; bottom border 1px solid |
| 8 | CTA | 4922 / 473 | §1.6 |

### 2.1 Hero
* Two lines at x = 144: **"Stop paying per seat "** (y 211) / **"to look at your own data."** (y 262). Each is a `<p><strong>` in Britti Sans Trial Semibold 56px, line-height 90% (50.4px), ls −1.12px, `#000`. Text block is 1216 wide.
* There is also an `Image` (223×209, `public/assets/pages/pricing/image-Hlu1ShLNLazxpcPi812eZcUqlU8.png`) at the top-right (x 1137). It is **opacity 0 at every breakpoint** and never animates in, so it is invisible. Omit it, or render it with `opacity:0` for parity.
* 810: hero 180 tall, padding `0 200px 0 32px`; text at x 48, width 546; the "to look at your own data." line wraps.
* 390: hero padding `0 130px 0 24px`. The 56px text wraps one word per line inside 282 px, and the block overflows *upward* behind the nav. Only "to look at / your own / data." is visible below the 64 px nav (see `reference/pages/pricing-390.png`). This is an original bug; reproduce it or fix it deliberately.

### 2.2 Plan cards (Pricings)
Each Plan is 376 wide (810: 367; 390: 326) with a 1px solid `#DFE1E7` border (`::after`), and laid out as a column:
* **Card**: padding `32px 32px 12px`, height 257.
* **Title row**: padding `20px 32px 10px`, height 50, bottom border 1px **dashed** `#E5E7EB`.
* **Features**: padding `16px 32px 32px`, gap 10.

A top-right **pixel-corner PNG** is flush with the card's top-right inside edge:
* Open Source: 40×40 `card-S7Ir9ic7GOf6zKsRMNuNHoP0oc.png`.
* Cloud Pro: 60×60 `card-1mb87xFfUlBMpFIuNHsAf26PFI.png`.
* Enterprise: 80×80 `card-MXdKTLEx5uZ0rO5k3F7Jbiozno.png`.

All three plans are 950 tall at 1440 (equal-height grid row).

| | Open Source (bg `#FFF`) | Cloud Pro (bg `#272835`) | Enterprise (bg `#FFF`) |
|---|---|---|---|
| Plan label (Britti Sans Medium 18/16.2, ls −0.36) | "Open Source" `#818898` | "Cloud Pro" `#5E4CFF` | "Enterprise" `#818898` |
| Price (Britti Sans Trial Bold 32/19.2, ls −1.12) | "Self-hosted" `#000` | "$3000" `#F8FAFB` + "/ month" (Inter 14/12.6, ls −1.12, `#F8FAFB`, baseline +6) | "Let’s talk" `#000` |
| Description (Inter 14/20, ls −0.28, width 312) | "Core BI features for teams happy to self-host" `#666D80` | "**No per-seat pricing.** Deliver trusted analytics in a powerful AI-native BI platform" `#F8FAFB` (strong w700) | "Advanced security, support and customization for enterprise-grade organizations" `#666D80` |
| Button (Fourth, 312×40, top at card y+194) | "Go to repo" → https://github.com/lightdash/lightdash | "Start free trial" → ./start | "Get in touch" → ./start |
| Eyebrow (Britti Sans Trial Regular 14/20, uppercase, `#818898`) | HOSTED BY YOU | HOSTED BY LIGHTDASH | EVERYTHING IN PRO, PLUS |
| Features (Inter 14/20, width 289, check 9×7 at left+4) | text `#36394A`, check stroke `#666D80` | text `#F8FAFB`, check stroke `#5E4CFF` | text `#36394A`, check stroke `#666D80` |

The Open Source card also contains a hidden "/ month" in `#FFFFFF` (white on white). Keep it invisible.

Card layout detail:
* Top block: name + price row, then description at gap 20, with 20 px padding-bottom.
* Name baseline y 469; price y 502; description y 541; button y 621; eyebrow y 704; first feature y 750.
* Feature rows: flex row gap 10, multi-line rows 40 tall.
* Check icon: `viewBox 0 0 8.333 6.666`, path `M0 4.166 L2.5 6.666 L8.333 0`, stroke-width 2, square caps. Files: `icon-feature-9bd89522.svg` (grey) and `icon-feature-e37a4d73.svg` (purple).

Features copy:
* **Open Source**:
  * Deploy Lightdash on your own infrastructure
  * Access to Lightdash OSS only
  * Manage your own setup, upgrades and infrastructure
  * Support via Lightdash community Slack only
* **Cloud Pro**:
  * Unlimited users
  * Unlimited visualizations
  * Native dbt integration + open semantic layer for consistent metrics
  * Scheduled reports and alerting
  * Manage charts and dashboards as code
  * Governed self-serve via metrics catalog and explorer
  * Dedicated human support
  * Guided onboarding and tailored training sessions
  * Automated migration from current BI provider
  * AI agents and MCP
  * Embedding via iframe and ReactSDK add-on
* **Enterprise**:
  * Deployment flexibility (Cloud or On Prem)
  * Advanced security with SSO + SAML + SCIM 2.0
  * Advanced user management with custom roles
  * SOC 2–compliant platform with HIPAA and BAA support
  * Hands-on migration support, including on-site assistance when needed
  * Priority support with defined SLAs
  * Dedicated onboarding, enablement, and ongoing success reviews
  * Early access to new features and the ability to shape new products

Responsive:
* 810: grid `2 × 367px` (Enterprise wraps to row 2; its height is 805). Pricings height 1815, padding 24px 16px.
* 390: single column 326, padding 24px 16px. Plan heights are 700 / 990 / 845.

### 2.3 Customer logo grid
Grid with 6 columns at 1440, 6 at 810 (129.66 each) and 2 at 390 (179 each). Cells are 64 tall with the logo centered. Cells contain an `opacity:0` overlay `rgba(13,13,18,.02)`; no hover change was measured.

Logos are monochrome dark SVGs, in reading order. Layer names in Framer differ from the visible brands; files are in `public/assets/pages/pricing/`:

| Row 1 | file | rendered | Row 2 | file | rendered |
|---|---|---|---|---|---|
| KRAKEN | `kraken-6a49e554.svg` | 75×13 | TEMPO | `tempo-PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg` | 70×15.5 |
| octopus energy | `alma-d392c0ab.svg` | 124×17 | Collectors | `collectors-e79ee675.svg` | 90×16 |
| workday | `workday-2a3c4858.svg` | 66×26 | Model ML | `modelml-XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg` | 92×16 |
| phantom | `phantom-tLi5MYBeYQyeZco1DQOGZ3BO00.svg` | 93×18.3 | talane | `clair-7ec699a5.svg` | 70×17 |
| Adobe | `hyperbound-3f4bc42b.svg` | 85×22 | servicenow | `servicenow-AIq32rD3yBVpA6v6vT01ljT5sc.svg` | 95×13.9 |
| fal | `swappie-4b1d4971.svg` (23×17) + `swappie-25726fc4.svg` (17×16, the mark at its left) | — | OakNorth | `oaknorth-HhSegQkhKevRNHfWjhD792tCyBc.svg` | 88×14.9 |

### 2.4 "Compare our plans"
* Title: Britti Sans Medium 48/43.2, ls −0.48px, `#272835`, at x 144 / y 1717 (block padding `0 64px 3px`, inner padding-top 104).
* **Tables** (four): each is bg `#F6F8FA`, padding `20px 80px 0` (the last has `20px 80px 64px`). Inner width is 1120.
* **Header row**: 60 tall, bg `#FFF`, 1px **dashed** `#E5E7EB` on all sides.
  * Left: a 22×22 icon + category title (Britti Sans Medium 20/20, ls −0.4px, `#272835`) at x 176.
  * Right: a 3-column grid with column titles "Open Source" / "Cloud Pro" / "Enterprise" (Britti Sans Medium 16/15, ls −0.4px, `#272835`, centered in 224.6 px columns, with dashed dividers).
* **Rows**: 44 tall (multi-line rows 54/58/75/124), bg `#FFF`, border `0 1 1 1` **dashed** `#E5E7EB`.
  * Label cell: 436 wide, padding 8px 16px, Inter **15/20 w500**, ls −0.28px, `#666D80`.
  * Value cells: 224.6 wide, centered. Text is Inter 14/15 w500, ls −0.28, `#36394A`. Warehouse and Git lists are Inter 12/17 w400.
  * ✓ = 19×18 purple check PNG `variant-1-ac8pM0Numit2MMAYrLC0mGhVyj8.png`.
  * ✗ = 19×18 grey cross PNG `variant-1-No57bVqVEzUsaazUxqOWybLek.png` at **opacity 0.33**, radius 10.
* Category icons (22×22): Product features `image-sbgi0qMeD5BtjahnztIVUXjtQ.png` (purple cursor), Sources `image-xlvWTiMdcpFvlpQYgenC3Kh0qmc.png`, Support `image-ePqwBYwX7ktZxXm0WXyI6teCY6M.png`, Security `image-PvfMjeTsl7CcrRi6kcl7c5YdiuU.png`.
* **Tooltip labels**: the labels marked † below have `text-decoration: underline dotted #8378FF (rgb 131,120,255)`, `text-underline-offset:5px`. On hover, a tooltip appears to the **right of the label** (left = label right + 10 px), vertically centered on it.
  * Box: 220 wide, bg `rgba(39,40,53,.80)`, radius 10, padding 12px 16px, shadow `0 10px 20px rgba(0,0,0,.05)`.
  * Text: Inter 12/20 w400, `#F8FAFB`.
  * Motion: opacity 0 → 1 over ~200 ms on hover, hidden on mouse-out.
* Responsive:
  * 810: tables padding 20px 20px 0, inner 738.
  * 390: the table container is `overflow:auto` and scrolls **horizontally**. Inner table is 768 wide: label col 249, value cols 172 each.

**Product features**

| Feature | Open Source | Cloud Pro | Enterprise | Tooltip (†) |
|---|---|---|---|---|
| Included seats † | Unlimited | Unlimited | Unlimited | Seats include all permission types |
| Data explorer and report builder UI | ✓ | ✓ | ✓ | |
| Native dbt integration † | ✓ | ✓ | ✓ | Lightdash supports dbt Core, dbt Cloud and Enterprise |
| Scheduled deliveries † | ✓ | ✓ | ✓ | Schedule delivery of dashboard/charts via Email, Slack, Teams |
| Alerting † | ✓ | ✓ | ✓ | Threshold alerting for metrics by Email, Slack, Teams |
| Google Sheets sync † | ✓ | ✓ | ✓ | Sync data to Google Sheets on a schedule and govern access in Lightdash |
| SQL runner † | ✓ | ✓ | ✓ | Run SQL directly in Lightdash for ad-hoc queries |
| Private spaces † | ✓ | ✓ | ✓ | Restrict access to certain content in your organization |
| Global search † | ✓ | ✓ | ✓ | Search for any chart, dashboard, metric or dimension from anywhere in Lightdash |
| Version history † | 3 days | 30 days | 60 days | Restore or roll-back to previous versions of charts |
| Usage analytics and insights † | Basic | Advanced | Custom | Get in-depth information on how your team is using Lightdash and what content is being used most and more |
| API & webhooks | ✗ | ✓ | ✓ | |
| Smart caching | ✗ | ✗ | ✓ | |
| Pre-aggregates | ✗ | ✗ | ✓ | |
| AI agents | ✗ | ✓ | Custom pricing | |
| MCP | ✗ | ✓ | ✓ | |
| Autopilot | ✗ | ✓ | ✓ | |
| Self-improving semantic layer | ✗ | ✓ | ✓ | |
| Data Apps [Add on] | ✗ | Custom pricing | Custom pricing | |
| Embedding [Add on] † | ✗ | see below | Usage based pricing | Based on embedded chart loads.⏎An embedded chart load happens every time an embedded chart is loaded and viewed by the end user. Loading a dashboard with 4 embedded charts counts as 4 loads. Caching loads can be enabled for an extra cost. |

The Embedding × Cloud Pro cell (row height 124) contains three stacked paragraphs, each Inter 14/18 w500 `#818898`, with the bolded lead words in `<strong>` w700 `#36394A`:
1. "**Pay as you go** (first 1000 free then $0.05/load)"
2. "or" in `#36394A`
3. "**Predictable** ($790/month for 100k loads per Embed Worker)"

**Sources and integrations**

| Feature | Open Source | Cloud Pro | Enterprise |
|---|---|---|---|
| Warehouses | BigQuery, Snowflake, Redshift, Databricks, Postgres, Trino, ClickHouse, Athena, DuckDB | same | same |
| Git sync | Github, GitLab, Azure Devops, Bitbucket | same | same |
| Slack + Teams integrations | ✓ | ✓ | ✓ |
| CSV export † ("Limit per single export. Cells are calculated by rows x columns in a table") | N/A | 3M cells | Custom |

**Support & Implementation**

| Feature | Open Source | Cloud Pro | Enterprise |
|---|---|---|---|
| Support | Community Slack Group | Private Slack channel, Live chat | Private Slack channel and⏎Premium support |
| Response SLA | 3 days | 1 day | 8 hours |
| Custom domain † ("e.g. yourcompanyname.lightdash.com") | ✗ | ✗ | ✓ |
| Service Level Agreement | ✗ | ✓ | ✓ |
| Data Protection Agreement | ✗ | ✗ | ✓ |
| Migration support sessions † ("Moving from another Bl tool? We'll help you transfer over what you need!") | ✗ | Automated migration tools | ✓ |
| Dedicated Slack support channel | ✗ | ✓ | ✓ |
| Training calls † ("Have 1:1 training and onboarding sessions for your team") | ✗ | ✗ | ✓ |
| Custom implementation sessions † ("Get dedicated analytics engineering and BI support from the Lightdash experts") | ✗ | ✗ | ✓ |
| Dedicated account manager | ✗ | ✗ | ✓ |

**Security & Compliance**

| Feature | Open Source | Cloud Pro | Enterprise |
|---|---|---|---|
| SSO | Google | Google ‡ | Google, Okta, Azure, Custom, other |
| SCIM 2.0 | ✗ | ✗ | ✓ |
| Data warehouse SSH tunnel | N/A | ✓ | ✓ |
| User groups † ("Manage users into groups and assign permissions accordingly") | ✗ | ✗ | ✓ |
| Custom role builder † ("Go further than our default user Roles (Admin, Editor, Viewer etc.) and define your own custom Roles for fine-tuned access control.") | ✗ | ✗ | ✓ |
| Deployment Region | N/A | US and EU | Custom |
| HIPAA BAA | ✗ | $490 per month | Custom |
| SOC2 report | ✗ | ✗ | ✓ |

‡ The Cloud Pro "Google" cell is unstyled on the live site: Inter 16/19.2 w400, `#000`, left-aligned, not centered. This is an original inconsistency.

### 2.5 FAQ (component §1.5), pricing copy
Questions and answers. The ⟨link⟩ markers mean `<a>` in `#5E4CFF`.
1. **How does the free trial work?** "Your 21 day trial period starts from when you first connect and compile your dbt project in Lightdash. You don't need to enter payment details to get started. At the end of your trial you have the option to start your subscription and keep using Lightdash!"
2. **Is Lightdash secure? Where is my data stored?** "We are committed to security and focused on keeping you and your data safe. As outlined in our ⟨terms of service → ./terms-of-service⟩, Lightdash does not store sensitive customer information and follows industry-leading standards. Lightdash does not cache or store the results of queries against your data. ⏎ Lightdash is hosted in Google Cloud with servers in Europe and North America. Cloud Pro users can select a European or North American deployment, Enterprise customers can request deployments in their region of choice. We can also undertake security questionnaires and have comprehensive compliance and security documents we can share on request. For more information, reach out to us at ⟨security@lightdash.com → `https://security@lightdash.com` (sic)⟩." (answer height 192 at 1440)
3. **Is it really unlimited users?** "Yes. Lightdash was built on the idea that you shouldn't limit access to users having access to data. Being data practitioners and former buyers of BI tools, we know how frustrating it can be to have to deal with seat-based pricing limitations. Therefore, we're taking a different approach by giving teams the freedom to have as many users as they want and set their permissions accordingly."
4. **Do I need to use dbt to use Lightdash?** "Yes. Lightdash leverages your existing dbt project to build and govern your entire BI platform. If you don't have a fully fledged dbt project setup, you can still use Lightdash. Reach out to us to learn more! ⏎ Lightdash supports all versions of dbt: dbt Core, dbt Cloud and dbt Enterprise."
5. **Is it hard to move from my existing BI tool to Lightdash?** "No. We make it as easy as possible - we've developed a bunch of our own migration tools that massively reduce the overheard required to move your existing content from your current BI tool over to Lightdash. As part of Lightdash Cloud Pro and Enterprise onboarding, we can help get this content moved over for you."
6. **Do you offer 1-on-1 training/support?** "Yes! We offer hands-on training and support as part of our Cloud Pro and Enterprise plans. We typically run 1-hour training sessions as part of the onboarding, and use shared Slack channels for priority support. ⏎ Cloud Starter users can also access our free resources in ⟨Lightdash University → https://www.youtube.com/playlist?list=PL0KkGNSO0W0P0JOrScLet9Nvn9mY0L_H-⟩."
7. **Do you offer discounts for startups, accelerators, or investors?** "Yes! ⟨Lightdash for Startups → ./startups⟩ is available to any qualified company (see page for details). We also work with accelerators and investors to offer this deal, or other special deals, to their portfolio companies."
8. **I have an infrequently asked question.** "Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our ⟨Slack community → https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI~QbjCAHQs0WBac3w⟩."

### 2.6 Motion on /pricing
No scroll reveals. The only motion is the FAQ (§1.5), tooltips (§2.4), button hovers (§1.4) and the CTA snake (§1.6).

---

## 3. `/start` (Template A, booking page)

Meta:
* Title: "Get started with Lightdash".
* Description: "Start your free trial with Lightdash. The AI-powered, developer-first BI platform that turns your dbt project into a powerful self-serve analytics tool. Book a call to see it in action."
* Height: 1453 (1440), 1784 (810), 1921 (390). **No CTA block**; the standard footer starts at y 853.

1440 layout:
* Content-wrapper 1280 (column hairlines), with one row: padding 64, gap 32, height 747, vertically centered.
* **Left column** (560 wide, gap 16, y 286):
  * h3 "Ready to start your free trial?": Britti Sans Medium **32/36** w400, ls −0.64px, `#272835`.
  * "Book a call with our team to": Inter 18/31.86, ls −0.27px, `#666D80`, max-width 468, gap 10.
  * Bulleted list (`<ul>`, disc bullets, text x 166; bullet marker at x ≈ 147): "See how Lightdash fits your data stack" / "Walkthrough the Lightdash platform" / "Get tailored advice to move your team faster". Inter 18/31.86, ls −0.27px, **`#0D0D12`**.
  * **Card** (560×188, y 485): 1px solid `#E5E7EB`, padding 20, gap 10.
    * "Want to skip the intro?": Britti Sans Medium 20/28 w500, ls −0.4, `#36394A`.
    * "Start your free trial in minutes. No need to talk to a human. Unless you want to.": Inter 16/30, ls −0.32, `#36394A`.
    * **Third** button "Sign Up" (96×40) → https://app.lightdash.cloud/register.
* **Right column** (560×619 at x 736, y 170): 1px solid `#E5E7EB` box holding an inline **Cal.com embed**. The iframe is `https://lightdash.cal.com/lightdash/talk/embed?layout=month_view&theme=light&embedType=inline&embed=cal-…`, wrapped in `<cal-inline>`. The iframe reports 560×1344 but the container clips at 619 (`overflow:hidden`). Reuse the Cal.com integration from CLONE_SPEC §4 with `calLink="lightdash/talk"`, `layout: month_view`, inline. While loading it shows Cal's grey spinner, centered.
* 390: stacked. Text block padding 24px 10px, gap 32 (title 32/36 wraps to 36 tall). Cal block is 358×596 at y 499.
* Motion: none (footer social icons only).

---

## 4. `/startups` (Template A)

Meta:
* Title: "Lightdash for Startups".
* Description: "The Lightdash Startup Program gives growing teams access to AI-first BI. Build powerful analytics fast with startup-friendly pricing and support."
* Height: 5169 / 5170 / 6405. Footer at y 4569.

| # | Section | y / h (1440) | Notes |
|---|---|---|---|
| 1 | Hero | 106 / 361 | Spacer 70 (pixel corners §1.7) · Title 50 · Subtitle 144 (padding 24px 0) · Buttons 41 · Spacer 56 (bottom dashed) |
| 2 | HeroImage | 467 / 883 | padding 48px 24px 56px, gap 48, bottom dashed; full-bleed bg image + framed Rive animation + qualify card |
| 3 | "Why you should apply" | 1352 / 362 | spacer 58 · title 100 (pixel icon + h2) · subtitle 204 (padding 24px 0 53px) |
| 4 | Features (6 benefits) | 1714 / 396 | 2 rows × 3 cols (426.66 each), bg `#FFF`, border `0 1 1 1` dashed `#ECEFF3` |
| 5 | Hatched band | 2110 / 80 | image `content-wrapper-6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (1280×80) |
| 6 | "What makes Lightdash the best BI tool for startups" | 2190 / 207 | spacer 58 · title 43 · subtitle 106 |
| 7 | Grid (4 cards) | 2397 / 1195 | padding 24px 65px 72px, rows gap 19, cards gap 20 |
| 8 | Hatched band | 3592 / 80 | same image as #5 |
| 9 | Testimonial | 3672 / 424 | padding 64 |
| 10 | CTA | 4096 / 473 | §1.6 |

### 4.1 Hero
* **Title** "Lightdash for Startups": Britti Sans Trial Semibold 56/50.4, ls −0.27px, `#272835`, centered (y 176).
* **Subtitle** "50% off Lightdash Cloud for a year, plus hands-on expert support to help build your data stack right from the beginning.": Inter 18/32, ls −0.18px, `#666D80`, center, max-width 450.
* **Buttons** (gap 16, centered, y 370):
  * Third "Talk to our team" → **`https://lightdash.cal.com/lightdash/startups`** (155×40).
  * Fourth "Start for free" → https://app.lightdash.cloud/register (131×40).
* Pixel corners: §1.7. Eight tiles drop in from y −32 after 1 s.

### 4.2 HeroImage
* **Background**: full-section `<img>` `heroimage-cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (2784×1960 source), `object-fit:cover`, 1280×883. It is a soft lavender/grey radial wash.
* **Device frame**: 956×547, centered at y 515. bg `rgba(208,210,214,0.80)`, radius **24**, padding 12px 10px, overflow clip. Inside is a 936×523 radius-**12** clip holding a **Rive** canvas (941×522):
  * File: `public/assets/pages/startups/lightdash-motion-dashboard-8RgDUjdkC7xmQytT53AmJUGvms.riv` (source https://framerusercontent.com/assets/8RgDUjdkC7xmQytT53AmJUGvms.riv).
  * Settings *(src)*: artboard **"dashboard"**, stateMachines **"main_interaction"**, `fit: cover`, `alignment: center`, autoplay, pointer events on (`handleEvents`).
  * Inputs: `bar_chart_hover` (bool), `close` (trigger), `Trigger 1/2` (triggers), `Boolean 2/3`.
  * Use `@rive-app/react-canvas`. It renders a Lightdash explore UI (sidebar "Sales" dimensions/metrics, "Daily Revenue" bar chart) with hover interactions.
* **Qualify card**: 696×184 at y 1110, bg `#FFF`, padding 32px 24px, gap 8, overflow clip, no border or radius. The card overlaps the bottom of the frame.
  * "To qualify, your company must:": Britti Sans Medium 16/28.32, ls −0.27, `#818898`, center.
  * Two rows (gap 10), each with a 36×36 circle (bg `#EDE3FF`, radius 24) holding a 22×22 icon. Icons are `icon-card-c08eab20.svg` (calendar) and `icon-card-37918730.svg` (dollar).
  * Row text is h3 Britti Sans Medium 25/30, ls −0.5px, `#000`, with highlighted spans in **`#615AF7`**: "Be less than **5** years old" / "Have less than **$7.5M** in funding".

### 4.3 "Why you should apply…"
* Pixel sparkle icon 38×37 (`title-b80c8ad9.svg`, purple) centered above the title.
* Title (centered 48/43.2 Britti Sans Trial Semibold, ls −0.96px) is two-tone: "Why you should apply to " in `#A4ACB9` + "**Lightdash for Startups**" in `#272835`.
* Subtitle "You'll get up to $18,000 in Lightdash credits and expert support to ensure your data stack is ready to scale.": Inter 18/31.86, ls −0.27px, `#666D80`, max-width 648.
* Third button "**Apply to the program**" → `./start` (191×40). Its row has padding `12px 0 1px 4px`.

### 4.4 Features grid (6 cells)
Each cell is 426.66 wide and 198 tall, laid out as a row:
* A **48×48 icon square** at the top-left, with top/bottom dashed `#EDEFF3`. Icons are pixel-art PNGs: `rectangle-240687995-1GE1QaDy…png` (01) … `jf0EM1m2…png` (06).
* A 378-wide text column (left border dashed `#ECEFF3`):
  * Title bar: 50 tall, padding 13px 8px 13px 16px, top/bottom dashed. Title is Britti Sans Medium 20/24, ls −0.2px, `#272835`.
  * Description: padding 12px 8px 12px 16px, Inter 16/26, ls −0.16px, `#666D80`, width 354.

| # | Title | Description |
|---|---|---|
| 01 | Half-Price Lightdash Cloud Plans | 50% off Lightdash Cloud or Pro for 12 months |
| 02 | Personalized Onboarding | Kickoff and training calls with the Lightdash data team |
| 03 | Referral Bonus Extension | Extend your 50% off for another 6 months by referring other startups |
| 04 | Exclusive Lightdash Swag | Free merch for you and your team |
| 05 | Dedicated Support Channel | Expert support and direct access to our product team for feedback and beta features |
| 06 | Enterprise Grade Security | (no text). Two 189×147 tiles (bg `#F8F9FB`, padding 29px 40px, divider dashed) |

Cell 06 badges:
* **SOC2 badge**: 88×88 white circle (0.8px `#ECEFF3`) inside a 96×96 ring (0.8px `#DFE1E6`). Text "SOC2" Inter 16.5/16.5 w600 + "TYPE II" w400, `#272835`, centered.
* **HIPAA badge**: same circles, emblem `hipaa-emblem.svg` (65×57) + "HIPAA / COMPLIANT" Inter 8.5/10.08 w600.

At 390 the grid is 1 column (cells 358 wide, 198 tall each).

### 4.5 "What makes Lightdash the best BI tool for startups"
* Title is two-tone: "What makes Lightdash the " in `#A4ACB9` + "**best BI tool for startups**" in `#272835` (48/43.2).
* Subtitle "Startups love Lightdash for its self-serve BI capabilities, powerful semantic layer for defining key metrics, dbt integration, and scheduling results to Slack." (Inter 18/31.86, `#666D80`, max 648).
* **Cards** (2×2, 565 wide):
  * Card: 1px solid `#E5E7EB`, overflow hidden.
  * Top: a 360-tall **Placeholder** (top border dashed; card 1 bg `#F8FAFB`).
  * Bottom: text block, padding 28, gap 10. Title is h3 Britti Sans Medium **22/22** (card 1: 24/26.4), `#000`. Description is Inter 16/25.6, ls −0.16px, `#818898`. Card 1 description uses weight 500; the others use "Inter Variable" 400.

| Card | Title | Description | Placeholder content (files in `startups/`) |
|---|---|---|---|
| 1 | Self-serve BI | Lightdash instantly turns your dbt project into a full stack BI platform. A powerful developer workflow lets analysts define key metrics, and enable self-serve for everyone else. | `image-TCmH07CpJz9KnFnriUU61CsZuI.png` 565×307, `contain`, bottom-aligned (y +61) |
| 2 | Open-source, community built and loved | Join a community of data enthusiasts and experts who discuss and contribute to the Lightdash platform and best practice for the modern data stack. | bg `placeholder-U5YIPk2pDXLwdtmeQk9EdGHIgA.png` (cover) + `image-1teNRTMPZ0ZmdsRzttniUjQMZPA.png` 411×360 right-aligned (x +153, y +55) |
| 3 | Semantic layer to easily define key metrics | Get to the right answers fast with pre-built metrics. Define your business logic once and make it available everywhere for your whole team to use. | bg `placeholder-U5YIPk2…png` + `image-kyItmKY1ktmf02N2bElsVyM0w0.png` 331×322 (x +117, y +19) |
| 4 | Data developer friendly | Lightdash reads directly from your dbt project and offers an easy-to-use CLI for previewing and validating changes. | bg `placeholder-UfhAmEzi2JL5c6IsWYI3ByKAZIY.png` + terminal `image-fxYBss5q9tJlY47rj1oyNrgM0.png` 498×440 (x +64, y −80, clipped) |

At 390 the cards stack as 1 column (326 wide).

### 4.6 Testimonial
* Row, max 896, gap 64.
* **Avatar**: 124×124 pixel-art portrait (`frame-2147233107-YZgEFDVihSQQS8ZIuqSsj8Uu1PE.png`).
* **Quote**: Britti Sans Medium **32/40.96**, `#36394A`, width 708: "Lightdash powers self-service at Clair, allowing internal teams to **quickly get their hands on the data** they need to operate the business." The bold span is `#5E4CFF`.
* **Attribution** (Inter 15/15 w500): "Erik Webb" `#272835` · "·" `#A4ACB9` · "Head of Data @ Clair" `#666D80`.
* Pixel "quote" decorations: two 61×48 images (`image-NZLtS7MabFwrjf6BA1sbhrTWDMU.png`), one at the top-left of the section (x 97, y 3688) and one at the bottom-right rotated 180° (x 1283, y 4032).

### 4.7 Motion
* Pixel-corner drop-in (§1.7). There are no scroll reveals.
* Rive animation (autoplay plus hover inputs).
* CTA snake.

---

## 5. `/fintech` (Template B)

Meta:
* Title: "Lightdash | Build Intelligence, not just dashboards." (generic; reuse the homepage meta).
* Height: 5742 / 5918 / 9244. Footer at y 5142.

| # | Section | y / h (1440) | Box |
|---|---|---|---|
| 1 | Hero `<section>` | 106 / 604 | 1280, 1px solid `#E5E7EB` all sides, flex row gap 24 |
| 2 | Trusted By | 710 / 209 | heading 87 (side borders) + logos 122 (full border) |
| 3 | "Why does traditional BI fail fintechs?" | 919 / 368 | padding 64px 0, gap 48 |
| 4 | Benefit Section | 1287 / 1258 | padding 80px 0 0, gap 56 |
| 5 | Testimonials | 2545 / 578 | bg `#F6F8FA` + `Linear BG` overlay `linear-gradient(#F8FAFB 0%, rgba(248,250,251,0) 100%)` |
| 6 | Dark band (full-bleed `#1A1B25`) | 3123 / 822 | inner Section 1280, padding 80px 0 |
| 7 | Graphic Border | 3945 / 60 | full-bleed 1440×60 pixel band `graphic-border-lc6YRJAGTi8i3sQyemwJrMzsReo.png` |
| 8 | Gap | 4005 / 60 | white, side borders |
| 9 | FAQ | 4065 / 604 | §1.5 |
| 10 | CTA | 4669 / 473 | §1.6, but the outer is 1408 wide (x 16) and the Stack 1280 (x 80) |

### 5.1 Hero
* **Left "Content"**: 692 wide, padding `48px 0 40px 46px`, gap 24.
  * **h1** "Stop waiting for dashboards. Start **scaling** your fintech.": Britti Sans Trial Semibold **72/68.4**, ls −1.44px, `#1F1F1F`, width 646. "scaling" is a span in `#A4ACB9`.
  * Lead "The AI-first BI platform built for modern fintech data teams. Powerful enough for analytics engineers, intuitive enough for every business user, and secure enough for even the most regulated environments.": Inter 18/32, ls −0.18, `#666D80`, max 546.
  * Buttons (gap 16): Third "Talk to our team" → ./start; Fourth "Start for free" → https://app.lightdash.cloud/register.
* **Decorations**:
  * Pixel column `frame-2147234198-Wt9778OuGJnGtOOmgQJ7FFz3itY.png` (161×416) at the top-left (80,106).
  * Pixel cluster `group-2085662009-6G8yEPoIoue6E7YNcGR3uJXUsg.png` (225×129) at the top-right (1200,106).
* **Illustration** (564×604, right):
  * Background `bg-XWNyKQ4uuYfmRmWxQWesDEdL18.jpg` (dot grid), padding 44px 42px.
  * A white 480×516 chat card: radius **24**, shadow `0 1px 2px 3px rgba(231,234,240,.24), 0 0 0 1px rgba(18,55,105,.08)`, overflow clip. User bubbles are bg `#F7F8FB`, radius 6, padding 10px 14px.
  * Content: "Chat started" divider; user "Hannah Mills" bubbles (bg `#F6F8FA`, avatar `ellipse-370-AWB82f6CxAvCGwmYf3RdnaKQIo.png`); Lightdash replies (black bolt avatar `group-48095555-6125e5ac.svg`, bordered white bubbles); and a "Profit / Last week" bar chart card ("In-store" purple / "Online store" orange, Mon…Sun).
  * Chat text: Inter 14/20 `rgba(2,2,16,.7)`; names Inter 14/21 `#020210`; times Inter 14/14 `rgba(102,109,128,.7)`; axis labels Inter 10/12 `#89899F`.
  * **Use `renders/hero-illustration@2x.png`** (1128×1208).
  * Motion *(src "Usecase/Illustration 01")*: a variant timeline auto-plays once on appear (fires when the component is 100% visible, `threshold:1`, once). The sequence is V1 →600 ms→ V2 →600 ms→ V3 →2000 ms→ V4 →2000 ms→ V5 → … →600 ms→ V7.
    * Each new message enters with **opacity 0→1 and translateY(20px)→0, ~550 ms, ease-out**.
    * The thread scrolls up (the inner list translates up 176 px) as new messages arrive.
    * The final chart card's bars grow from scaleY ≈0 → 1 *(src "Usecase/Bar Chart": V1 →8200 ms→ V2, then 500 ms steps)*.
    * Tween transitions in this module are `duration .4–1.2s, ease [.44,0,.56,1]`.

### 5.2 Trusted by
* Heading "Loved by fintech data teams": Inter 18/23.4, ls −0.36px, `#666D80`, center, padding 32px 0.
* Five logo cells, each 256×122 with a right border 1px solid `#E5E7EB` and the logo centered. Layer names differ from the visible brands:

| Visible brand | File (`fintech/`) | Rendered |
|---|---|---|
| wise | `hypebeast-X1Rd8CLxwvNU4Tf1KCa2OWalT0.png` | 97×25.5 |
| KROO | `swappie-ggPEyATL8MbnC0lAJYVTopJ7Thc.png` | 97×23.8 |
| neo | `neo-3xZrmqPbNl94upPc3clOzv5PXCk.png` | 77×23.6 |
| TITANBAY | `kraken-adzhFZdy5jMFUPo6pMJgrSsdL1Y.png` | 97×16.5 |
| peach | `alma-CyF0pGviedxvkYqcKUeio838BY0.png` | 85×24 |

* 390: a 3-column grid of 119.33 px cells, 44 tall.

### 5.3 "Why does traditional BI fail fintechs?"
* h2 at x 128: Britti Sans Trial Semibold 48/48, ls −0.96px, `#272835`, left.
* Three "Reason" cards (row, gap 24, padding `0 48px`). Each is 362 wide, padding `48px 18px 48px 0`, flex row gap 16.
  * A 48×48 pixel icon block (purple pixel square with a white glyph). Use `renders/reason-icon-01…03@2x.png`; glyphs are `icon-648dd287.svg`, `frame-df4cef0c.svg`, `frame-da9b4e57.svg`. The block is rotated −90° in Framer, and the render already includes that.
  * Text: Inter 18/23.4, ls −0.36px, `#1F1F1F`.
  * Copy: "Dashboards multiply and trust disappears." / "Compliance asks where the number came from but no one knows." / "Data teams become the bottleneck."
* 390: the cards stack (310 wide, 144 tall).

### 5.4 Benefit Section, "How Lightdash / is helping fintechs"
* Heading: two centered spans on two lines, 48/48 Britti Sans Trial Semibold `#272835`. Block is 96 tall with dashed top/bottom.
* **Cards** 2×2: 568×465, gap 16, outer padding `0 64px 80px`.
  * Card: bg `#FFF`, 1px solid `#DFE1E7`, padding-bottom 32.
  * Illustration area: 305 tall (use the renders).
  * Content: padding 0 24px, dashed top/bottom, gap 4.
  * Title: Britti Sans Trial Regular **20/28**, ls −0.3px, `#36394A`.
  * Description: Inter 14/24, `#666D80`, width 480 (padding-right 40).

| # | Title | Description | Illustration |
|---|---|---|---|
| 01 | Agentic self-serve without the chaos | Simply ask questions and get instant visualizations, explanations, and recommended follow-ups. Lightdash AI removes friction from analytics, helping teams get answers in seconds instead of waiting on the data team. | `renders/benefit-01-illustration@2x.png` (AI agents list: "Growth Agent", "Finance Assistant", "Marketing Analyst"… with a "Start chat" button) |
| 02 | Performance that scales | Payments data and compliance checks involve heavy joins and calculations. Lightdash is built to handle this complexity. Get faster fraud monitoring and financial reporting cycles, and the ability to operate directly on granular data. | `renders/benefit-02-illustration@2x.png` ("💸 Sales" dashboard + "Katie" access-toggle popover; Geist font) |
| 03 | A central metrics catalog your whole company can trust | Fintechs like Wise use Lightdash to store every KPI in a central, certified metrics catalog. All changed are also version-controlled through dbt, giving data teams full governance without slowing down the rest of the business. | `renders/benefit-03-illustration@2x.png` (metrics catalog table "11 metrics") |
| 04 | Developer experience your data team will actually love | With Lightdash, data teams get dbt-native metrics & models, preview environments for safe testing, automatic caching, ultra-fast queries, and more. This means faster iteration, fewer errors, and a dramatically happier analytics engineering team. | `renders/benefit-04-illustration@2x.png` (salesdashboard.yml + "Open a pull request" card) |

Card illustration motion *(src)*:
* 02: variant loop where the access popover rises in (`opacity 0→1, y 20→0`) and toggles flip.
* 03 ("Usecase/Illustration 04"): V1 →400 ms→ V2 →1000 ms→ V3, a cursor moves to a row and a description tooltip appears.
* 04 ("Illustration 03"): V1 →400 ms→ V2 …, the PR card pops in.

Optional: render the static final frames.

### 5.5 Testimonials (bg `#F6F8FA`)
* Section padding 80px 0. Testimonial row padding 16px 80px, dashed top/bottom.
* **Dark card**: 1120×224, bg `#1A1B25`, radius **16**, padding 40px 24px, overflow clip. Shadow: `0 12px 5px rgba(39,40,53,.01), 0 7px 4px rgba(39,40,53,.02), 0 3px 3px rgba(39,40,53,.03), 0 1px 2px rgba(39,40,53,.03)`. Content max 1024, a row.
  * **Person** (279 wide, gap 24): 64×64 pixel portrait `person-gnaALe5A2PvVeKJOfM2FSTyw.png`; "Brandon Rochon" Inter 16/20 `#666D80`; then "Neo Financial" Inter 12/20 w500 `#FFF` · "•" Inter 14/20 `#A4ACB9` · "Head of Business Intelligence" Inter 12/20 `#666D80`.
  * **Quote** (406 wide): Inter **21/36 w500**, ls −0.315px, `#FFF`: "\"The Lightdash team has been a true partner. Their support is best-in-class, with direct access to their data and BI experts.\""
  * **Button** "Read the full case study" (light, 227×42, with arrow) → `./customer-story/neo-financial`, right-aligned, vertically centered.
  * Right-edge pixel "BG Pattern" (188×184) built from 24 px Block-Master tiles. Use `renders/testimonial-bg-pattern@2x.png`, or the full card `renders/testimonial-card@2x.png`.
* **Stats** row (padding 16px 80px, gap 16, dashed bottom): three cards 362×130, bg `#FFF`, radius 16, padding 24, gap 12. Shadow: `0 0 0 1px rgba(39,40,53,.02), 0 19px 5px rgba(39,40,53,0), 0 12px 5px rgba(39,40,53,.01), 0 7px 4px rgba(39,40,53,.03), 0 3px 3px rgba(39,40,53,.06), 0 1px 2px rgba(39,40,53,.07)`.
  * Number: Inter **40/40 w500**, ls −0.8px, `#272835`.
  * Label to its right: Inter 14/16.8, ls −0.28px, `#666D80`, width 214.
  * Stats: **60%** "less time spent on ad-hoc data requests" · **200%** "increase in active BI users" · **80%** "faster for business users to get answers".
* 390: the card stacks (person, quote, button) to 310×443; stats stack.

### 5.6 Dark band
**Top content**: padding 48px 0, bottom border 1px solid `#36394A`. Inner row is dashed top/bottom `#36394A`, padding-left 48.
* Heading "With enterprise-grade governance and fintech-level security": Inter **28/33 w500**, ls −0.42px, `#FFF`, width 452 (padding-left 24).
* **Stamps**: two 208×208 cells, padding 32.
  * SOC2: a 144 px white circle (1.3px `#ECEFF3`) with "SOC2 / TYPE II" in Inter 27/27 w600/400 `#272835`.
  * HIPAA: `hipaa-emblem.svg` + "HIPAA / COMPLIANT" Inter 13.9/16.49 w600.
  * Or use `renders/stamps@2x.png`.

**Bottom content**: row with padding-left 48 and bottom border solid `#36394A`.
* **Left "Title & CTA"** (522 wide, padding 64px 24px 44px):
  * h2 "Built for every fintech role": Britti Sans Trial Semibold 48/48, ls −0.96px, `#FFF`, max 368.
  * Light button "Start for free" (with arrow) → `./start`.
  * Pixel "BG Element" image `bg-element-o00XVYnTMA96BZ1vVmgf5ONccjI.png` (224×128) bottom-right of the column.
* **Right: role accordion** (710 wide, left border 1px dashed `#36394A`). Four items:
  * **Closed**: 67 tall, padding 16, gap 16, bottom border 1px solid `#36394A`. A 32×32 pixel face icon (`noun-face-1…4-*.svg`) + title (Inter **18/23.4**, ls −0.36px, `#FFF`).
  * **Open**: 155 tall. Title + `<ul>` of three bullets (Inter 14/24, ls −0.28px, `#666D80`, indent 17): "Credit decisioning metrics you can trust" / "Customer transaction classification" / "Repayment models and loan book performance". The same three bullets appear for every role.
  * A 1px vertical **progress line ("Loader") in `#5E4CFF`** runs on the left edge of the text column (x +64) for the open item.
  * Roles, in order: "For your Chief Risk Officer", "For your Operations Manager", "For your Head of Growth", "For your Head of Compliance".
  * **Behaviour** *(src + measured)*:
    * Exactly one item is open. It **auto-advances every 4400 ms** (Reason 01 → 02 → 03 → 04 → 01…).
    * The progress line grows top→bottom over **4 s linear after a 0.4 s delay** *(src "Usecase/Progress": `{delay:.4,duration:4,ease:linear}`)*.
    * Clicking a closed item opens it immediately (onTap).
    * Open/close is a Framer layout animation (height 67↔155 with scaleY correction). The bullets cross-fade.
    * Use a spring of ~0.4s (bounce 0.2) for the height and 0.3s for the opacity.

### 5.7 FAQ (§1.5), fintech copy *(live answers are mismatched with the questions; reproduce verbatim or fix deliberately)*
Left column: same heading, lead and button as pricing. Seven items (question → answer):
1. Do you offer discounts for startups, accelerators, or investors? → "Your 21 day trial period starts from when you first connect and compile your dbt project in Lightdash. You don't need to enter payment details to get started. At the end of your trial you have the option to start your subscription and keep using Lightdash!"
2. Is Lightdash secure? Where is my data stored? → "AI agents use your Lightdash project metadata, dbt models, and any additional context you provide during setup to answer your questions."
3. Do I need to use dbt to use Lightdash? → "You can rate and correct any incorrect responses directly in the AI agent chat interface. This feedback improves accuracy over time and ensures the chances of AI agents giving inaccurate answers is minimized."
4. Is it hard to move from my existing BI tool to Lightdash? → "Yes. With Lightdash, you can create specialized agents with access to specific data sets, tailored instructions, and team-appropriate terminology."
5. Do you offer 1-on-1 training/support? → "No. AI agents are exclusively available for Lightdash Cloud Pro and Enterprise customers. This is to ensure optimal performance and security."
6. Do you offer discounts for startups, accelerators, or investors? → "Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our ⟨Slack community⟩."
7. I have an infrequently asked question. → same as 6. The link is https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI%7EQbjCAHQs0WBac3w.

### 5.8 Responsive (390)
Everything stacks to 358 (inner padding 24):
* Hero: content 473 tall with the Buttons row *above* the heading (Framer order on phone: buttons at y 112, heading at y 177), then the 604-tall illustration.
* Benefit cards: 310 wide.
* Dark band: Top content 403, Bottom content 792 (accordion below the title).
* Total height: 9244.

---

## 6. `/partnerships` (Template B)

Meta:
* Title and description are generic (homepage meta).
* Height: 4785 / 5327 / 6931. Footer at y 4185. **No CTA block**: the partner form replaces it.
* Wrapper is `<main>` "Main" (padding 0 16px, bg `#FFF`). Sections are `max-width:1280`, each with a 1px solid `#E5E7EB` frame.

| # | Section | y / h (1440) |
|---|---|---|
| 1 | Hero `<section>` (border all sides, padding 20) | 106 / 604 |
| 2 | "Official Lightdash partners" logos | 710 / 167 |
| 3 | "Why Lightdash?" (2 columns × 640) | 877 / 920 |
| 4 | Testimonial carousel | 1797 / 600 |
| 5 | "Why become a Lightdash partner?" benefits | 2397 / 720 |
| 6 | Form Section (`id="partner-form"`) | 3117 / 1068 |

### 6.1 Hero
* Centered stack (Headings & CTA, gap 24, y 263):
  * h1 "Become a Lightdash partner": Britti Sans Trial Semibold 72/68.4, ls −1.44px, `#1F1F1F`, center, max-width 554 (2 lines).
  * Lead "Apply to become a partner. You get access to certified training, partner discounts and more!": Inter 18/32, ls −0.18, `#666D80`, max 458.
  * Purple pill "Apply now" (113×42) → `./partnerships#partner-form` (smooth-scroll to the form).
* **Pixel illustrations** (inline SVGs, saved):
  * Hand cursor `hero-hand-cursor.svg`, 130×132 at (937,239), overlapping the end of "Become a".
  * Rocket `hero-rocket.svg`, 126×129 at (452,501), left of the button.
* **Corner pixel clusters**: BG Element 01 (120×72, top-left at 80,106) and BG Element 02 (108×54, bottom-right at 1252,656). Use `renders/hero-bg-element-01@2x.png` and `-02@2x.png`; source tiles are `block-master-*.png`, `grad-*.png`, `texture-*.jpg`.
* 390: section 358×604, headings 318 wide (h1 wraps to ~3 lines).

### 6.2 Partner logos
* Heading "Official Lightdash partners" (Inter 18/23.4, ls −0.36, `#666D80`, padding 32px 0, side borders).
* Logo row: 5 linked cells, each 256×80 with a right border 1px solid `#E5E7EB`, all opening in `target=_blank`. Visible brand ≠ layer name in two cases:

| Cell | Visible logo | File (`partnerships/`) | Rendered | href |
|---|---|---|---|---|
| 1 | nayuta | `nayuta-mr8uAghSvtTFWPKdjwe40rk2318.png` | 113×34 | https://nayuta.co.uk/ |
| 2 | GEMMA ANALYTICS | `database-tycoon-wnBqGBkGWUrP0E4suiYXPv02WQ.svg` | 155×18.9 | https://www.databasetycoon.com/ |
| 3 | SNOWPACK DATA | `snowpack-data-mdQmUtnKJVr2Bv776Mn8MgpxA.png` | 155×33.6 | https://snowpack-data.com/ |
| 4 | NorthstarAnalytics | `pyne-nwS4nOJmIf4PpipNFvz9fEW4fSI.svg` | 130×56 | `https://https://northstaranalytics.co.uk/` (broken on live) |
| 5 | DRIFTWAVE | `driftwave-A9BLX9WDLuZWDDIyhYnvbCHkj0.png` | 116×36.5 | https://driftwave.io/ |

### 6.3 "Why Lightdash?"
* **Left column** (640 wide, side borders, padding-bottom 80, gap 64). The text block has padding `0 64px` and gap 24:
  * Title "Why Lightdash?": Britti Sans Trial Semibold **56/56** w600, ls −1.12px, `#272835`.
  * Three paragraphs (Inter 18/32, ls −0.18, `#666D80`, width 512):
    * "Traditional BI creates a bottleneck: business users submit requests, data teams build dashboards, backlogs pile up. Agentic BI breaks the cycle."
    * "Lightdash lets data teams ship BI like code: with dbt-native governance and self-service that actually works. Business users get insights without the wait. Data teams focus on high-impact work, not one-off requests."
    * "As a Lightdash partner, you're solving the problem every data leader faces: *"My team is drowning in ad hoc requests."* Here's how." The quoted part is `<em>`.
  * Below the text, a 256×256 pixel-cluster "BG Element" at (144,1461). Use `renders/why-bg-element@2x.png`.
* **Right column** "Cards" (640): five "Reason" blocks, gap 24, padding `0 64px`. Each has a 1px `#E5E7EB` divider line drawn as a separate 640×1 "Border" div between items.
  * Icon: 32×32 pixel PNG at x 784 (`icon-4CdGa577…`, `icon-rJrChVv7…`, `icon-GFNcLCaX…`, `icon-dtp2UVGL…`, `call-hWPKoSXE…`).
  * Title at x 828: Britti Sans Medium 20/28 w500, ls −0.4px, `#1F1F1F`.
  * Description below, from x 784, width 512: Inter 14/21, `#666D80`.

| Title | Description |
|---|---|
| Solve the backlog problem | Give business users direct access to insights through natural language and AI agents, while data teams maintain control through dbt governance. Help clients ship outcomes, not tickets. |
| Ship BI like you ship code | Data teams already use Git, dbt, and CI/CD for their data pipelines. Lightdash brings that same workflow to BI with versioned metrics, code-based charts, and governance built in. Ship faster, break less, iterate confidently. |
| Self-serve for business users | Most self-serve BI fails because users still need to understand the data model. Lightdash uses AI to let them ask questions in natural language and get governed, trustworthy answers. |
| Plug into anything | Lightdash is open not just open-source. Connect to any stack, embed anywhere, and use our APIs to extend and integrate. |
| Support that shows up | We’re not a black box. You’ll get real access to the team building Lightdash, so you can move faster and unblock clients when it counts. |

### 6.4 Testimonial carousel ("Partner/Testimonial")
* Section padding 80px 0, gap 64.
* **Quote**: Inter **28/48 w500**, ls −0.42px, `#36394A`, center, max 920 (block max-width 960, padding 0 20).
* **People row** (gap 40, centered): three columns 203 / 164 / 211 wide. Each column, top to bottom:
  * 150×150 pixel-masked portrait, centered.
  * 20 px gap, then a 1px line in `#E5E7EB` ("Default"/"End") spanning the column. For the active person, a `#5E4CFF` **Progress** line grows over it left→right.
  * Name: Inter 16/20 `#666D80`.
  * Company: Inter 16/20 **w500** `#272835` · "•" Inter 12/20 `#A4ACB9` · role Inter 16/20 `#666D80`.
* Portraits have an **On** (duotone blue/purple) and **Off** (grey) state. Files are in `partnerships/people/`:
  * `colin-lee-on.png` / `colin-lee-off.png`
  * `david-olodort-on.png` / `david-olodort-off.png`
  * `chloe-anderson-on.png` / `chloe-anderson-off.png`
* **Behaviour** (measured + *src*):
  * Auto-rotates **Testimonial 01 → 02 → 03 → 01 every 4000 ms**.
  * The active person shows the On image and a progress line that fills linearly over the 4 s.
  * Clicking a portrait (onTap) jumps to that testimonial.
  * Quote text swaps with Framer's default variant transition (spring 0.4s, bounce 0.2; use a ~300 ms cross-fade).

| # | Person (company · role) | Quote (verbatim, including quote characters) |
|---|---|---|
| 01 | Colin Lee (Nayuta Analytics · Founder) | “Lightdash lives up to its name: lightweight, lightning-fast, and constantly improving. For startup clients who need to move fast with agentic analytics, it’s our go-to recommendation.” |
| 02 | David Olodort (Snowpack Data · CRO) | "Lightdash’s fully programmatic, open-source philosophy makes it the extensible data node in your stack. Don’t let GUIs limit you - encode the future of your analytics with Lightdash." |
| 03 | Chloé Anderson (Database Tycoon · Manager) | "We don’t embed with clients to spend months fixing BI. We embed to drive outcomes. Lightdash’s tight dbt integration and real self-serve capabilities let us move fast and focus on building systems that move the business forward." |

Other details:
* Two 24×24 pixel blocks sit at the section's left (152,2085) and right (1264,2210). Use `renders/testimonial-block-left/right@2x.png`.
* 390: "Phone Testimonial" variant (946 tall). Quote block 256 tall (padding 0 24), then a people column (530 tall, gap 40) with the photos stacked.

### 6.5 "Why become a Lightdash partner?"
* Heading (96 tall, dashed top/bottom, padding 0 64): "Why become⏎a Lightdash **partner**?" in Britti Sans Trial Semibold 48/48 w600, ls −0.96, `#272835`, center. The word "partner" is `#818898`.
* **Benefits** grid: 3 × 384, padding 0 64, dashed top/bottom. Each benefit is a 200-tall row:
  * A 48×48 pixel icon (purple-tone SVG): `business-product-startup-1-…svg`, `business-product-check-…svg`, `business-money-coin-currency-…svg`, `email-mail-chat-…svg`, `business-products-deal-handshake-…svg`, `business-products-climb-top-…svg`.
  * A 336-wide text column (left border dashed):
    * Title bar: 48 tall, padding 11px 12px, Inter **18/26 w500**, ls −0.27px, `#272835`.
    * Description: padding 16px 12px, Inter 14/24, ls −0.28px, `#666D80`, width 260.
  * Each cell has a dashed left border.

| Title | Description |
|---|---|
| Test for free | Get full Lightdash Cloud Pro access. Build live demos with real client data and show clients how Agentic BI eliminates their backlog. |
| Get trained and certified | Free certification covering dbt integration, AI analytics, and how to position against legacy BI. Become the expert clients trust to modernize their stack. |
| Earn as you grow | Revenue share on every customer you bring. Earn money for all qualified leads that start a POC and sign a contract. |
| Access expert support | Dedicated partner Slack channel with our engineering team. Get technical questions answered same-day, and co-present on enterprise deals. |
| Sell side-by-side | Joint sales enablement, co-marketing, and direct intros to our pipeline. We'll promote you to customers looking for implementation partners. |
| Grow your business | Our partners are becoming the go-to experts in Agentic BI. Be first to market in your region before the competition catches up. |

### 6.6 Partner form ("Form Section", anchor `#partner-form`)
* Section padding 40. Background is the full-section image `bg-pattern-KsQ21PJT6e9XU2YmglGUiR4.png` (5112 px source, rendered 1280×1068, cover): a light dotted pattern.
* **Card**: 1200×988, bg `#FFF`, radius **16**, padding 120px 0, gap 40. Shadow is the same stack as the CTA Stack (§1.6).
  * Pixel bolt icon 64×64 (`icon-be52be02.svg`), centered.
  * Heading: "Ready to become" (`#272835`) / "a Lightdash partner?" (`#818898`). Britti Sans Trial Semibold 56/50.4 w600, ls −1.12px, center.
  * Decorations: a 32 px block at the top-left (168,3205) → `renders/form-card-corner-block@2x.png`; a cluster at the bottom-right (1048,3929, 256×192) → `renders/form-card-bottom-right-cluster@2x.png`.
* **Form** (560 wide, gap 40):
  * Field grid: 2 columns × 272, gap 16. Rows: [Name, Email] [Company, Role] [LinkedIn profile (full width)] [What BI tools are you familiar with? (full width)].
  * **Input**: height 56, bg `#FFF`, 1px solid `#DFE1E7`, radius **12**, padding 16px 24px (Name) / 16px 24px 16px 14px (the others), shadow `0 1px 2px rgba(10,13,18,.05)`.
    * Font "Inter Variable Variable Regular" 16/24, ls −0.24px (−.015em), color `#272835`. This family never loads, so it renders in the fallback. **Use Inter 400.**
    * Placeholder color `#666D80`.
    * **Focus**: border 1px solid **`#0099FF`** (Framer default). Transition `background, box-shadow`.
  * Required fields: Name, Email, Company, Role. Optional: LinkedIn profile, What BI tools…
  * All inputs are `type=text`; Email is also `type=text` on live.
  * **Honeypot** inputs (hidden, `autocomplete="one-time-code"`): website, company, message, subject, title, description, feedback, notes, details, remarks, comments. Keep them hidden or omit.
  * **Submit** button, centered, 200×42 (§1.4).
  * After submit, a hidden "Form submitted" status (Inter 14 `#666D80`, centered, opacity 0 → 1) appears below the button. **This was not triggered during recon.**
  * Footnote "By clicking submit you confirm you are happy to be contacted via email about Lightdash Partnership Program": Inter 14/24, ls −0.28, `#666D80`, center, width 400.
* 390: card 310 wide, padding 120px 0; the inputs stack to 1 column.

### 6.7 Motion
* Testimonial auto-rotation and progress lines (§6.4).
* Button hovers.
* There are no scroll reveals and no load animations.

---

## 7. `/about` (Template A)

Meta:
* Title: "About Us | Lightdash".
* Description: "We built Lightdash for modern data teams: open-source, dbt-native, and powered by AI. Our mission is to make self-serve analytics effortless without sacrificing governance, trust, or developer experience."
* Height: 5827 / 5696 / 8670. Footer at y 5227.
* Breakpoints: desktop ≥1000, tablet 810–999.

| # | Section | y / h |
|---|---|---|
| 1 | Hero (draggable stickers + title) | 107 / 306 |
| 2 | Spacer | 413 / 56 |
| 3 | "Meet the Lightdashians" title | 469 / 44 |
| 4 | Team grid | 513 / 1210 (padding 32px 0 116px) |
| 5 | Story ("Our story so far" timeline) | 1723 / 2799 |
| 6 | "Join us - we are hiring!" | 4522 / 232 |
| 7 | CTA | 4754 / 473 |

### 7.1 Hero
* Spacer 100 (padding-left 64), then a 206-tall block with dashed top/bottom:
  * Title "Building the BI tool we always wanted": Britti Sans Trial Semibold 56/50.4, ls −0.27px, `#272835`, center, max 527 (2 lines).
  * Subtitle "We're building a BI tool that's configurable for the SQL experts & intuitive for the rest, so everyone can feel empowered, rather than overwhelmed. We're a diverse, nimble bunch with big plans - and we're just getting started!": Inter 18/31.86, ls −0.27, `#666D80`, center, max 663.
* **Draggable stickers** (code component *(src)*): an absolutely positioned layer 968×307 at (236,106), with `pointer-events:none` on the container.
  * Six 80×80 pixel-art stickers (`overflow:hidden; cursor:grab; user-select:none; touch-action:none`). Initial positions are relative to the layer:

| Sticker | x | y | file (`about/`) |
|---|---|---|---|
| 1 | 27 | 54 | `sticker-3jDAfrYsb5KDuuOTsrf6Mf69t5M.png` |
| 2 | 156 | 46 | `sticker-DlEXpkvcod13UbFuJK5SfJhbZE.png` |
| 3 | 92 | 143 | `sticker-MUUZbVAiGjvOSCXQKxPwckDjko.png` |
| 4 | 883 | 64 | `sticker-juWoChWJuM2NEvCg3e5kICWUn0.png` |
| 5 | 768 | 54 | `sticker-cOkRzlkSX0kvBdkYeEfPHwBt8.png` |
| 6 | 829 | 136 | `sticker-67o8LS0xz9NCxTx0Jz1dlmiU.png` |

  * Behaviour (framer-motion):
    * `drag` with `dragConstraints` set to the layer and `dragElastic: 0`.
    * `whileHover: {scale: 1.05}` over 0.2s.
    * `whileDrag: {scale: 1.1, rotate: 5, zIndex: 1000}`.
    * Cursor is `grab` normally and `grabbing` while dragging.
    * The dragged sticker gets z-index 1000; otherwise z-index equals its index.
    * `transition: tween .2s`.
  * Mobile (<810) uses a different instance: the layer is 968 wide at x −289, so only the stickers inside the 390 viewport show. Sticker 1 is size 50 at (309,106) and sticker 6 is size 50 at (586,122).

### 7.2 Team ("Meet the Lightdashians")
* Title row (44 tall, bottom dashed): Britti Sans Medium 20/20, ls −0.3px, three-tone: "Meet the " `#666D80` + "Lightdash" `#272835` + "ians" `#818898`.
* Grid: 5 columns × 173 (max 865, centered), row-gap 48. At 390 it is 2 columns × 163.
* Each item is centered:
  * 72.5×72 "Team Image": the **static** pixel avatar swaps to a **hover** avatar on mouse-over (Framer variant, spring 0.4s).
  * Name: Inter 14/21 w500, `#272835`.
  * Role: Inter 12/12 w500, ls −0.3px, `#666D80`, 4 px below.
* Files are in `about/team/<name>-static.png` and `<name>-hover.png` (both downloaded). In reading order:

| # | Name (as on site) | Role |
|---|---|---|
| 1 | Hamzah Chaudhary | CEO |
| 2 | Oliver Laslett | CTO |
| 3 | Jose Rego | Software Engineer |
| 4 | Priyanka Patel | Product Designer |
| 5 | Javier Rengel | Software Engineer |
| 6 | lan Ahuja (sic, lowercase L) | Partnerships & Growth |
| 7 | Irakli Janiashvili | Software Engineer |
| 8 | João Viana | Software Engineer |
| 9 | Marshall Agnew | Software Engineer |
| 10 | Bruno Almeida | Software Engineer |
| 11 | Jake Peterson | Analytics Eng. Advocate |
| 12 | Oli Ramsay | Analytics Eng. Advocate |
| 13 | Giorgi Bagdavadze | Software Engineer |
| 14 | Rohan Bedi | Growth |
| 15 | Shanzé Munir | Marketing |
| 16 | llonna Babakhanova (sic) | Finance & Ops |
| 17 | Yegor Borisenco | Software Engineer |
| 18 | Tatiana Inama | Software Engineer |
| 19 | Jess Hitchcock | Analytics Eng. Advocate |
| 20 | Tori Whaley | Analytics Eng. Advocate |
| 21 | Lukas Spiss | Software Engineer |
| 22 | Charlie Dowler | Software Engineer |
| 23 | Ash Evans | Marketing Designer |
| 24 | Sandro Dolidze | Product Engineer |
| 25 | Josh Elston-Green | Enterprise Solutions Architect |
| 26 | Idris Affrin | First GTM Engineer |
| 27 | Gwyneth Windflower | Analytics Engineering Advocate |
| 28 | Cloudy | Support |

Rows are at y 554, 739, 924, 1109, 1294, 1479 (185 px pitch). Avatar x positions are 337, 510, 683, 856, 1029. File slugs are the lowercased names (`jo-o-viana`, `shanz-munir`, `lan-ahuja`, `llonna-babakhanova`, …).

### 7.3 Story timeline ("Our story so far")
* Title "Our story so far": Britti Sans Trial Semibold 48/43.2, ls −0.96, `#000` (block 56 tall).
* Icon row (53 tall): a 53×52.5 pixel hourglass `image-tSOCKXwBErpovdEAN3dG7BJpZyw.png` centered. The left half has a dashed right border, which starts the **center vertical dashed line**.
* **Year rows**: 44 tall, dashed bottom. Year label is Britti Sans Medium 20/28, ls −0.3px, `#000`, centered.
* **Content rows**: two columns of 427 (854 total, centered at x 293). Left column padding is `32–40px 70px 0 0` (bottom 32 where it has the image). Right column padding is `32–40px 0 32px 70px`, with a left border 1px dashed `#E5E7EB` (the center line).
* **Milestones**:
  * Each milestone has a **10×10 square `#5E4CFF`** on the center line (x 715), level with its month label.
  * Month label: Inter 14/19.6, ls −0.3px, `#666D80`.
  * Text: Inter 16/24 w500, `#272835`, width 357.
  * Milestones within a group are 20 px apart.
* **Photos**: 357×236, `border: 4px solid #FFF` (inner), shadow `-0.12px 0.6px 1.6px -1.42px rgba(0,0,0,.2), -0.46px 2.29px 6.07px -2.83px rgba(0,0,0,.17), -2px 10px 26.5px -4.25px rgba(0,0,0,.04)`. GIFs are animated.

| Year | Row | Left column | Right column |
|---|---|---|---|
| 2021 | 1 | photo `image-qEi3UXD6LnzJbUwQ7CSkkyiobvU.png` (HN post card) | **April**: First commit for Lightdash added to Github · **June**: Launched open source BI on HackerNews |
| 2021 | 2 | **December**: Lightdash is the first BI tool to natively support dbt metrics | photo `image-44WXvHssPoGe5dPfkaAEIMHeds.png` |
| 2022 | 1 | photo `image-nB0elRiD7izPuHjBwayFAOd4Uhg.gif` | **January**: Lightdash Cloud is available in private beta · **May**: Offsite : We tie-dyed in Barcelona |
| 2022 | 2 | **June**: Lightdash Slack Community launches · **July**: Offsite : We played games in the English countryside | photo `image-e5LM3H0M9dYT8crO6nnbJb74.gif` |
| 2022 | 3 | photo `image-0HevjUNOs4bEKWVJE5c4rahsPEM.gif` | **October**: We raise $8.4M to build the BI tool we always wanted / We brought a whole lot of color to Coalesce · **December**: Offsite : We ate fondue in Chamonix |
| 2023 | 1 | **January**: Lightdash Cloud is launched into public beta · **May**: Offsite : We made pizzas in Porto · **December**: We celebrated an epic year with Lightdash Zapped - check it out | photo `image-9ynMf2CzCfno26Ag6XjnEVCsBdE.png` ("Lightdash Zapped 2023") |
| 2024 | 1 | photo `image-FvpztNaFU3zkpIghB0kooGEZKU.gif` | **January**: Lightdash Cloud is GA 🚀 · **February**: Embedding is released into public beta · **July**: AI Analyst is released in private beta · **September**: Offsite: We hiked in Switzerland · **October**: We raised $11M in series A funding! |
| 2025 | 1 | **January**: Dashboards as code launched · **February**: React SDK launched · **March**: Offsite : We hackathon-ed in Porto · **June**: London HQ opens / AI Agents launch in private beta | photo `image-iOttjsTEpxsLbCEsryRLkVYSKc.gif` |

* **Scroll reveal** *(src)*: every Year row and every Content row (2021–2025) is `opacity 0 → 1`, no transform.
  * Spring: duration **1.2s**, bounce **0.2**.
  * `threshold: 0` (fires as soon as any pixel enters the viewport), animate once.
  * Measured: ~550 ms to reach opacity 1.
  * Approximate with IntersectionObserver (`threshold 0`), `transition: opacity 1.2s cubic-bezier(.2,.8,.2,1)`.
* 390: the timeline collapses to one column (358 wide, padding 0 24px). Left and right entries stack per row.

### 7.4 "Join us - we are hiring!"
* Title: Britti Sans Trial Semibold 48/43.2, ls −0.96, `#000`, center (padding-top 64).
* Sub "Good data tools are rare. Good data teams are rarer. We're building both.": Inter 18/32, ls −0.18, `#666D80`.
* Purple pill "See open roles" (142×42) → https://jobs.ashbyhq.com/lightdash.

---

## 8. `/roadmap` (Template A)

Meta:
* Title: "Lightdash Roadmap".
* Description: "Discover the Lightdash roadmap. See upcoming features for our open, AI-powered BI platform and how we’re building the future of analytics."
* Height: 2403 / 2895 / 4662. Footer at y 1803.

| # | Section | y / h |
|---|---|---|
| 1 | Spacer (pixel strips §1.7) | 106 / 100 |
| 2 | Title "Lightdash Public Roadmap" (top dashed) | 206 / 50 |
| 3 | Subtitle (dashed top/bottom, padding 16px 0) | 256 / 96 |
| 4 | Spacer (bottom **solid**) | 352 / 72 |
| 5 | Board: grid 4 × 320 | 424 / 611 |
| 6 | FooterGrid: 2 × 640 cards | 1035 / 295 |
| 7 | CTA | 1330 / 473 |

* Title: Britti Sans Trial Semibold 56/50.4, ls −0.27, `#272835`, center.
* Subtitle "We ship fast, like really fast. Here's what we're working on at and what we've already shipped!": Inter 18/31.86, `#666D80`, max 468.

### 8.1 Board
**Column**: 320 wide, right border 1px solid `#E5E7EB`.
* **Header**: 82 tall, padding 20, bottom solid border.
  * 24×24 status icon (`header-29bac276.svg` Backlog dotted square, `header-02b608e1.svg` Building empty square, `header-2c131c47.svg` Beta half-filled, `header-87ea6ae5.svg` Completed purple check).
  * Title: Britti Sans Medium 18/21.6, `#36394A`.
  * Sub-label: Inter 14/16.8, `#666D80`.
* **Body**: 528 tall, bg `#F8FAFB`. Backlog is `overflow:auto`, Building and Beta are `overflow:clip`.
  * **Completed** is a 526-tall **independently scrolling list** (`overflow:auto`, scrollHeight 7595) on a transparent bg. Keep the native scrollbar.

**Item ("Variant 1")**:
* 320 wide, bg `#FFF`, padding `20px 20px 16px`, gap 13, bottom border 1px dashed `#E5E7EB`.
* Height 60 (single line), 78 (two lines), 75/96/117 (completed items with a date).
* Contents: emoji (Inter 20/24, `#36394A`, 22 wide) + title (Inter **15/21 w500**, `#36394A`, width ≈235) + optional date (Inter 13/15.6, `#818898`).
* **Linked items**: a full-cover `<a>` (target _blank) and an 8×8 "↗" arrow icon (`icon-variant-1-09837b54.svg`, purple) at the top-right. Hover changes bg `#FFFFFF` → **`#F8F5FF`**.

| Backlog ("To build w/in 3 months") | Building ("Actively working on") | Beta ("Features in early access") |
|---|---|---|
| 🧪 dbt Fusion integration | 🛰️ Embed Al agents | 🧮 Pivot Tables 2.0 |
| ⌨️ In-app semantic layer editor | 🤖 Agents as users in Lightdash | 🌳 Metrics Trees |
| 🏠 Customisable homepage | 🧠 ContextOS - Manage context across platform | ✈️ Autopilot ↗ https://docs.lightdash.com/guides/ai-agents/autopilot#autopilot |
| 🖼️ Build dashboards in embed mode | ♻️ Self-improving Semantic Layer Agent | 🔄 Connect external MCPs to AI agents ↗ (same autopilot URL) |
| 🤓 Custom SQL filters | 💻 Agents-as-code | 🎨 Create org themes for Data Apps ↗ https://docs.lightdash.com/guides/data-apps/themes#themes |
| | | 🪟 Embed Data Apps |

**Completed ("Shipped features")**, 95 items in this order. ↗ marks a link.

Undated:
* 🪄 Custom Data Apps ↗ https://docs.lightdash.com/guides/data-apps#data-apps
* 🧮 Spreadsheet calculations ↗ https://docs.lightdash.com/guides/formula-table-calculations#formula-table-calculations
* ✅ Verified Charts & Dashboards
* 💽 Pre-aggregates/caching ↗ https://docs.lightdash.com/references/pre-aggregates/overview#pre-aggregates-2
* 💬 AI Agents in Slack ↗ https://docs.lightdash.com/guides/data-apps#data-apps
* 🪺 Nested spaces permissions ↗ https://docs.lightdash.com/references/workspace/spaces#nested-space-permissions
* 🦆 Motherduck integration ↗ https://docs.lightdash.com/get-started/setup-lightdash/connect-project#motherduck
* 🗓️ Period over period comparisons ↗ https://docs.lightdash.com/guides/period-over-period#period-comparison-beta
* 🗂️ Metrics Catalog 2.0 ↗ https://docs.lightdash.com/guides/metrics-catalog/catalog#catalog
* 🗺️ Improved map chart types ↗ https://docs.lightdash.com/references/chart-types/map
* 🚀 Dashboards 2.0: faster, easier, dashboards ↗ https://headwayapp.co/lightdash-updates/refreshed-dashboard-look-and-feel-330049
* 🚚 Improved scheduled deliveries ↗ https://docs.lightdash.com/guides/how-to-create-scheduled-deliveries#overview-of-your-scheduled-deliveries
* 🌚 Dark mode ↗ https://docs.lightdash.com/guides/customizing-the-appearance-of-your-project#color-palettes-for-light-and-dark-mode
* 📊 Rollstack integration ↗ https://www.lightdash.com/blogpost/lightdash-now-powers-executive-reporting-with-rollstack-integration
* ✚ Self-improving semantic layer ↗ https://www.lightdash.com/blogpost/your-semantic-layer-can-now-fix-itself
* 🍫 Bars in table cells visualisation
* 🏠 Clickhouse integration ↗ https://docs.lightdash.com/get-started/setup-lightdash/connect-project#clickhouse
* 🔐 Custom Role Builder ↗ https://docs.lightdash.com/references/custom-roles#custom-roles

Dated:
* 🤖 Lightdash MCP Server · Aug 2025 ↗ https://docs.lightdash.com/guides/lightdash-mcp#lightdash-mcp
* 🧙‍♂️ AI Agents · Jul 2025 ↗ https://docs.lightdash.com/guides/ai-agents
* ⛷︎ Dashboard variables · Aug 2025 ↗ https://docs.lightdash.com/guides/using-parameters#how-to-use-parameters
* 🌲 Metric Trees · Jan 2025 ↗ https://www.lightdash.com/blogpost/metric-trees-how-top-data-teams-impact-growth
* 💥 One-to-many joins in Lightdash (fan-outs & chasm traps) · Jul 2025 ↗ https://docs.lightdash.com/references/joins#sql-fanouts
* 🌳 Tree Maps Chart Type · Jul 2025 ↗ https://docs.lightdash.com/references/chart-types#treemap-chart
* 🗂️ Dashboard Tabs · Jun 2025
* 📈 Apply dashboard filters to SQL Runner Charts · Jun 2025
* 🪄 AI Data Analyst in Slack · Apr 2025 ↗ https://docs.lightdash.com/guides/ai-analyst#ai-analyst
* 👥 Microsoft Teams integration · Apr 2025 ↗ https://docs.lightdash.com/guides/how-to-create-scheduled-deliveries#sending-to-microsoft-teams
* 🔄 Write back custom dimensions to dbt · Mar 2025 ↗ https://docs.lightdash.com/references/dbt-write-back#write-back-dimensions-automatically-replacing-custom-dimensions
* 💻 React SDK for Embedding · Feb 2025 ↗ https://lightdash.notion.site/Getting-Started-with-the-Lightdash-React-SDK-196a63207a7a80d8a597e7a36ab55705?pvs=4
* 🔄 Write back custom metrics to dbt · Feb 2025 ↗ (same notion URL)
* 💱 Formatting of dimensions and metrics in the results table · Feb 2025 ↗ https://docs.lightdash.com/references/metrics/#format
* 💻 Charts-as-code · Jan 2025 ↗ https://www.lightdash.com/blogpost/introducing-dashboards-as-code
* 📖 Metrics Catalog · Jan 2025
* ✅ Promote models from SQL runner to Semantic Layer · Jan 2025 ↗ https://www.lightdash.com/blogpost/the-ideal-workflow-for-governed-bi-with-dbt
* ↩️ Pivoting table visualizations · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/1184
* ✅ In-app onboarding checklist · Jan 2024
* 👀 Chart + table interactions (drill-down, see underlying data, etc.) · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/2460
* 🗂 Spaces · Jan 2024 ↗ https://github.com/lightdash/lightdash/milestone/46
* 🔎 Querying dbt metrics in the SQL runner · Jan 2024
* ⚙️ Improvements to settings page · Jan 2024
* 🔒 Spaces-level permissions · Jan 2024
* 🔥 Hot reloading in lightdash preview · Jan 2024
* 👯‍♀️ Make actions consistent in the app (right-click/left-click/three-dot menu) · Jan 2024
* 🥤 Improve dashboard filters · Jan 2024
* 🔭 Omnibar for search · Jan 2024
* 🔩 Drill-by in charts (and results tables) · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/3891
* 📄 Sharing reports via slack · Jan 2024
* 📈 Add vertical and horizontal reference lines to charts · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/3380
* 🥳 Conditional table formatting · Jan 2024
* 🕵️‍♀️ Lightdash Usage Analytics · Jan 2024 ↗ https://github.com/lightdash/lightdash/milestone/27
* 📌 Pinning items on Homepage + Spaces · Jan 2024
* 🏡 Home page redesign · Jan 2024
* 📧 Users with the same email domain should be able to join an organization automatically · Jan 2024
* ⏰ Scheduled reports · Jan 2024
* 🔐 Viewer role who can't explore (permissions) · Jan 2024
* 👩‍💻 Project developer role · Jan 2024
* 1️⃣ Big Number comparisons · Jan 2024
* 🧮 Row totals in table visualizations · Jan 2024
* ✅ Content validation · Jan 2024 ↗ https://github.com/lightdash/lightdash/milestone/83
* 🍜 Add metric filters to custom metrics · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/4523
* 👯‍♀️ Support multiple versions of dbt · Jan 2024
* 🔄 Transposing tables (metrics as rows in tables) · Jan 2024
* #️⃣ Add value formatting to table calculations (in the UI) · Jan 2024 ↗ https://github.com/lightdash/lightdash/issues/3454
* 🥧 Pie charts · Jan 2024
* 🧩 User attribute-based data access · Jan 2024
* 🕹️ Dashboard filters/widgets · Jan 2024
* 🏘️ Grouped dropdown component · Jan 2024
* 📊 Charts that live inside dashboards · Jan 2024
* 📊 Sync to Google Sheets · Jan 2024
* 🔐 Gain SOC2 compliance · Jan 2024
* 🏃 Improve dashboard speed · Jan 2024
* ⏮️ Version History · Oct 2023
* 📲 Make Lightdash work on mobile · Jan 2024
* 🔄 Auto-refresh dashboards · Jan 2024
* ⌚️ Filters in scheduled deliveries · Jan 2024
* 🧮 Add more options for row totals + column totals in table viz · Jan 2024
* 🪄 Custom dimensions · Jan 2024
* 🥒 Date zoom (change date granularity on dashboards) · Jan 2024
* 🐦 Migration from Blueprint to Mantine · Jan 2024
* 🖌️ Format custom metrics in the UI · Feb 2024
* 🙅‍♀️ Simpler table calculations · Mar 2024
* 📊 Create totally custom visualizations · Feb 2024
* 👥 Users can be assigned to groups · Feb 2024
* 🔔 Threshold alerting · Feb 2024
* 💬 Dashboard comments and notifications · Mar 2024
* 🖼️ External embedding of dashboards · Mar 2024
* ➕ subtotals · Apr 2024
* 😇 SQL-less table calculations · Apr 2024
* 🏴‍☠️ Manage space permissions · Mar 2024
* 🎨 Custom dimensions using custom SQL · May 2024
* 🔄 Promoting content to production (from preview environments) · Jul 2024
* 🛟 Save charts from the SQL runner · Sep 2024
* 🔨 Improved semantic layer integrations · Oct 2024
* 🌊 Support MetricFlow and dbt Semantic Layer v2 (no date)

Emojis render as the platform's color emoji font; nothing is image-based.

### 8.2 FooterGrid (two cards, 640×295 each, bg `#FFF`, divider 1px solid)
Each card is centered with gap 24:
* A 48×48 tile: white, 1px `#DFE1E7` border, shadow `0 0 0 5px rgba(39,40,53,.05)`. Icons: bolt `image-s5BCCTUj6yG82Eysn6O61cPRrfw.png` and Slack logo `image-G7wNz6DtEDhrQkI3MKEq2C5ROiI.png`.
* Title: Britti Sans Medium 18/18, ls −0.36, `#272835`.
* Body: Inter 16/24, ls −0.32, `#818898`, width 309, center.

| Card | Title | Body | Button |
|---|---|---|---|
| 1 | Request a feature | Let's build Lightdash. Have an idea for something we should build, let us know | Third "Request" → https://github.com/lightdash/lightdash/issues/new?template=feature-request.md |
| 2 | Join our community | Want to contribute to Lightdash or learn more - join our Slack community | Fourth "Join now" → https://go.lightdash.com/community |

### 8.3 Responsive and motion
* 810: the board becomes a **2 × 389** grid (Backlog/Building, then Beta/Completed); page height 2895.
* 390: a single 358-wide column (board 2441 tall); the completed list keeps its fixed-height scroll.
* Motion: pixel strips slide in on load (§1.7), plus item hover bg and button hovers.

---

## 9. `/lightdash-security` (Template A)

Meta:
* Title: "Security | Lightdash".
* Description: "Enterprise-ready security for AI BI. Lightdash protects your data with robust governance, encryption, and role-based access control."
* Height: 2303 / 2241 / 3452. Footer at y 1703.

| # | Section | y / h |
|---|---|---|
| 1 | Spacer | 106 / 100 |
| 2 | Title "Lightdash Security" (top dashed) | 206 / 50 |
| 3 | Subtitle (dashed top/bottom, padding 16px 0, max 580) | 256 / 159 |
| 4 | Button row (bottom dashed) | 415 / 41 |
| 5 | Logos (badges) | 456 / 208 |
| 6 | GridWrapper (customer grid) | 665 / 566 (padding 16px 0 81px, gap 56) |
| 7 | CTA | 1230 / 473 |

* Subtitle: "We take security seriously. Our platform is built to keep your data safe, with strong safeguards to prevent unauthorized access and protect the integrity of your information. You can explore our security practices, policies, and reports in the Lightdash Security Centre." Inter 18/31.86, `#666D80`, center.
* Third button "Visit Security Centre" (187×40) → https://trust.oneleet.com/lightdash.
* **Badges**: two 104×104 PNGs centered with gap 32: AICPA SOC2 `image-2L86heL3bauYGKrITTrkqSsyc.png` and GDPR `image-ygOWTA0haiIuEe5ZnkTUUQ68gNI.png`. Bottom border dashed.
* **"Lightdash is trusted by:"**: Inter 16/24, ls −0.32, `#818898`, center.
  * Grid: 6 columns × 64, gap 64 (max 704), 3 rows (row pitch 151).
  * Each item: a 48×48 tile (1px solid `#DFE1E7`, shadow `0 0 0 5px rgba(39,40,53,.05)`, overflow clip) holding the brand logo PNG, then the name (Inter 14/19.88, ls −0.28, `#36394A`) centered below.
  * Order: Workday, Collectors, Farewill, Clair, BeautyPie, DaFilo / JustWatch, Copy.ai, ServiceTrade, MorningBrew, Loft, Arcadia / Standard Metrics, CoverFlex, Octopus Energy, Motorway, Kroo Bank, Swappie.
  * Files are `lightdash-security/image-*.png` in the same order; see the manifest at1440 coordinates. The tile frame is `gridwrapper-sziZa7Zd6CtOQPFaPS2FWqAvQc.png`.
* 810: same 6-column grid. 390: **2 columns × 115**, gap 64 (grid 294 wide, 1294 tall).
* Motion: none besides hovers and the CTA.

---

## 10. `/jp` (Template A, Japanese)

Meta:
* Title: "Lightdashへようこそ".
* Description: "Lightdashは、AIを最優先にしたオープンソースのBIプラットフォームで、データチームがセルフサービス分析を構築できるように設計されています。dbt上にネイティブに構築されており、企業はビジネス指標の単一の情報源を確立するのに役立ちます。"
* Height: 3019 / 3533 / 3483. Footer at y 2419. **No CTA block.**
* Breakpoints: desktop ≥1440, tablet layout 810–1439.

| # | Section | y / h |
|---|---|---|
| 1 | Hero: spacer 100 (pixel corners §1.7) · title 56 (padding 6px 0 0 64px) · subtitle 175 · buttons 41 · spacer 56 | 106 / 429 |
| 2 | Features (trusted-by logos) | 535 / 235 |
| 3 | "Lightdashとは何ですか？" | 770 / 577 |
| 4 | Grid (2 cards) | 1346 / 649 (padding 72px 64px) |
| 5 | Testimonial | 1995 / 424 |

* **Title** "Lightdashへようこそ!": Britti Sans Trial Semibold 56/50.4, ls −0.27, `#272835`, center. Japanese glyphs fall back to the system CJK font (Hiragino Sans on macOS). No CJK web font is loaded.
* **Subtitle** (max 468): "Lightdashは、dbtプロジェクトを瞬時にフルスタックBIプラットフォームに変換します。強力な開発者ワークフローにより、アナリストは主要な指標を定義でき、他のユーザーにはセルフサービス機能を提供できます。"
* **Buttons**:
  * Third "東京イベント参加" → https://www.meetup.com/lightdash-japan/events/309903323/
  * Fourth "デモ予約" → https://www.lightdash.com/start
* **Trusted by** "多くの企業からの信頼" (Inter 16/24, `#818898`). Grid of 5 × 89.6, gap 64. Items use the same 48 px tile style as security (390: 3 columns × 84.66, row-gap 64, column-gap 20), with names Ubie, SHE株式会社, Retty, TrustHub, dely. Files: `image-TMnzqQgs…png`, `image-U003NExc…png`, `image-e1qhDioL…png`, `image-khwv9Ddg…png`, `image-a8xBLUGJ…jpg`.
* **"Lightdashとは何ですか？"**: h4 Britti Sans Medium 32/32, ls −0.64, `#000`, center. Body is Inter 18/31.86, `#666D80`, center, max 800, `white-space: pre-wrap`. Copy:
  ```
  Lightdashは、データチームがdbtプロジェクトを完全にインタラクティブな分析プラットフォームに変換できるようにします。
  ‍
  - ダッシュボードを数分で作成し、探索できます。
  - dbtモデルを唯一の真実のソースとして使用することで、ビジネス定義の一貫性を維持できます。
  - 明確でアクセスしやすく、常に最新のデータで、社内のあらゆる部門と協業できます。

  急成長中のスタートアップでもグローバル企業でも、Lightdashはチームと共にスケールします — データをプロプライエタリなシステムにロックインすることなく。
  ```
* **Grid**: two linked cards (`<a>`), 567×505, gap 19.
  * Card: 1px solid `#E5E7EB`, padding-bottom 32. Image area 303 tall: images 570×312 (`image-8ygid96rygSZCL3zZn2yhLTU6Bc.png` Ubie customer story, `image-VCXo1sy1MVooHh99igE4Sf3wtVM.png` Tokyo meetup), cover.
  * Description block: padding 16px 24px, gap 4.
  * Title: Britti Sans Medium 20/28, ls −0.27, `#36394A`.
  * Body: Inter 14/23.94, `#666D80`.
  * Link line: Inter 14/23.94 **w600**, `#7364FE`.

| Card | Title | Body | Link label |
|---|---|---|---|
| 1 | Ubieとの成功事例をチェック | UbieがLightdashで構築した最先端データガバナンス基盤と、その変革をあなたのチームで実現する方法を学びましょう。 | ケーススタディを見る -> |
| 2 | 2025年10月2日、東京で私たちとご一緒ください！ | チームと交流し、現地ユーザーの体験談から学びましょう。 オープンソースBIがアナリティクス環境をどう変革できるかを探ります。 | イベントに申し込む -> |

  Both cards link to https://www.lightdash.com/customer-story/ubie-jp on live (card 2 is probably meant to link to the meetup).
* **Testimonial**: same layout as startups §4.6.
  * Avatar 124×124: `image-YiMPHv5nMrPaVzjOHm6ZG4ZM88.png` with the pixel frame `frame-2147233108-J57DPcsPrsFyYiH3o9gxp5prSdE.png`.
  * Quote: Britti Sans Trial Semibold **21/26.88**, ls −0.36, `#36394A`, with large “ ” glyphs at 30/38.4: "“「迅速なリリースサイクルと手厚いサポートは、Lightdash がエンタープライズニーズを真に理解するチームであることを示しています。チームの対応力とコミュニティが要望する機能の実装への姿勢は、すべてのユーザーに利益をもたらす協業環境を築けました。」”"
  * Attribution: "石川 有" Inter 16/16 w600 `#666D80` · "Principal Data Architect @ Ubie" Inter Variable 16/16 w500 `#272835`.
* Motion: pixel corners drop in (§1.7), 10 tiles.

---

## 11. Motion summary (all nine pages)

| Effect | Where | Trigger | Spec |
|---|---|---|---|
| Pixel tiles drop-in | startups, jp | page load (Framer appear) | `translateY(-32px)` → 0, spring 0.6s bounce 0, delay 1.0s, opacity stays 1 |
| Pixel strips slide-in | roadmap | page load | `translateX(-16px)` → 0, spring 0.4s bounce 0, delays 1.0–1.7s (+0.1s per pair) |
| Timeline reveal | about | in-view (threshold 0, once) | opacity 0→1, spring 1.2s bounce 0.2 |
| Fintech chat timeline | fintech hero | component 100% visible, once | variant chain (600/600/2000/2000/…/600 ms); each message opacity 0→1 + y 20→0 (~550 ms) |
| Fintech card mockups | fintech benefits | in-view / auto | variant chains (400 ms, 1000 ms, 1400 ms steps); tweens 0.4–1.2s `[.44,0,.56,1]` |
| Role accordion | fintech dark band | auto every 4.4s + click | height 67↔155, progress line 4s linear (delay .4s) |
| Testimonial carousel | partnerships | auto every 4.0s + click | quote/variant swap, progress underline 4s |
| FAQ | pricing, fintech | click | §1.5 |
| Table tooltips | pricing | hover | opacity 0→1 ~200 ms |
| Team avatar swap | about | hover | static → hover image |
| Draggable stickers | about hero | drag/hover | §7.1 |
| Roadmap item hover | roadmap | hover | bg → `#F8F5FF` |
| Button hovers | all | hover | §1.4 (spring .4s bounce .2) |
| Snake game | CTA block | autoplay + click | §1.6 |
| Rive dashboard | startups | autoplay + pointer | §4.2 |

There are no marquees, carousels with drag, parallax or scroll-linked transforms on these pages. With the exceptions above, sections are static when scrolled into view.

---

## 12. Gaps and caveats

* **Partnerships form was not submitted.** The success state ("Form submitted" text, opacity 1) and the validation messages are unverified. The form posts to Framer's form backend; a clone needs its own endpoint.
* **Cal.com embed (/start)**: the inside of the iframe (calendar UI) is third-party and was not measured. Embed it rather than rebuild it.
* **Fintech illustrations**: only the end states are captured, as 2× renders. Intermediate variant states, exact per-element easing and the looping behaviour of the benefit-card mockups were read from source chains but not frame-by-frame measured. The hero render shows the chat scrolled to its final position, so the first message is clipped at the top, as on live.
* **Rive (startups)**: the state-machine interactions inside the `.riv` were not enumerated beyond the declared inputs.
* **Live-site bugs to reproduce or fix deliberately**:
  * Pricing 390 hero heading overflows above the nav.
  * Pricing Cloud Pro SSO cell is unstyled.
  * Fintech FAQ answers don't match their questions.
  * Partners logo #4 has an `https://https://` href.
  * JP card 2 links to the Ubie story.
  * About team names "lan Ahuja" and "llonna Babakhanova" use lowercase-L typos.
  * The pricing hero image is permanently at opacity 0.
* **Fonts**:
  * "Britti Sans Trial Semibold" is loaded with `font-weight:600`, but some nodes compute 400/900. Always render with the semibold file.
  * "Inter Variable Variable Regular" (partnerships inputs) never loads; use Inter 400.
  * JP uses the OS CJK fallback.
* **810 measurements** are summarized per page (heights, column counts). The full per-element dumps for 810 and 390 were not transcribed. Use `reference/pages/*-390.png` for mobile visuals. No 810 screenshots were captured.
* The 7th snake tile SVG (`_cta/snake-tiles/tile-7.svg`) uses a `<foreignObject>` blur; it renders in Chrome and Safari.
