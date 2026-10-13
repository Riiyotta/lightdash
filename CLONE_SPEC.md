Source: https://www.lightdash.com/

# Lightdash homepage: clone spec

Measured live with Playwright on 2026-10-13 (Chrome, DPR 1) at 1440×900, 1280×800, 810×1080 and 390×844. The saved Framer HTML (`Lightdash _ Build Intelligence, not just dashboards..html`) was only used to cross-check CSS tokens and `@font-face` rules. Every value below comes from `getComputedStyle` or `getBoundingClientRect` unless it is marked *(source)*, which means it was read from the iframe app's own CSS/JS.

Reference screenshots are in `reference/`: `original-1440.png`, `original-390.png`, and per-state crops in `reference/sections/`. Some of the `hero-*` crops include the third-party Intercom chat bubble; ignore it. The asset manifest is `ASSETS.json`. All assets are already downloaded into `public/`.

---

## 0. READ FIRST: what this page actually is

The homepage is **not** a scrolling marketing page. It has no logo marquee, testimonial section, pricing section or footer in the DOM. The whole document is exactly one viewport tall (`scrollHeight` = viewport height at every width), so there is **no page scroll**. It is built from two layers:

1. **Framer shell (build this in React + Tailwind).** It is a fixed dark navbar with three hover mega-menus (Product / Customers / Resources), a "Talk to our team" Cal.com modal, and a tablet/mobile hamburger accordion menu. Specs are in §2–§5.
2. **Hero = one full-bleed `<iframe>`.** It points to a separate standalone app, `https://gameboy-3d-iota.vercel.app/?navh=104` (`?navh=64` on mobile). That app is a ~650 KB single-file **Three.js r160 WebGL** experience: a 3D Game Boy plus a Lightdash cartridge floating in space, with customer-logo rockets flying past. Clicking inserts the cartridge, boots a pixel title screen, then shows a planet menu. Each planet opens a DOM "view" projected onto the Game Boy screen: Customers, Product, Pricing, Governance, Migration, Book a Demo. All the marketing "sections" (testimonials, logos, pricing tiers, migration, CTA) live **inside this app**.

**Build recommendation (pixel-perfect path).** The app's full source (inline CSS 276 KB + inline JS module 378 KB) and all its relative assets are mirrored verbatim in **`public/gameboy/`**, with `index.html` downloaded from the live URL. Embed it exactly as the original does:

```html
<iframe src="/gameboy/index.html?navh=104" aria-label="Lightdash Game Boy" loading="eager"
        allow="accelerometer; gyroscope; fullscreen; autoplay"
        style="height:100%;width:100%;border:none;border-radius:0;display:block;background:#07060f"></iframe>
```

Use `?navh=64` below 810 px. The app reads `navh` (the height of the nav overlaying it) from the URL, or live from `postMessage({type:'gb-embed', navh, availh}, '*')`. It still loads three.js, three-mesh-bvh and three-bvh-csg from jsDelivr through its importmap, plus Inter, Press Start 2P and JetBrains Mono from Google Fonts. Copies of all of these are in `public/gameboy/vendor/` and `public/fonts/` if you want to self-host. To do that, rewrite the importmap URLs to `./vendor/three/build/three.module.js` and `./vendor/three/examples/jsm/`, and the bvh paths to `./vendor/three-mesh-bvh/index.module.js` and `./vendor/three-bvh-csg/index.module.js`. Also change the helvetiker font URL in the JS to `./vendor/three/examples/fonts/helvetiker_bold.typeface.json`. Do **not** try to re-implement the WebGL scene in React. It is procedural geometry with CSG, Bayer-dither shaders and a camera-spline animation, and only the shipped file can reproduce it exactly. §6 documents the app for reference and QA.

Third-party scripts on the live page are **not part of the design** and should not be cloned: Intercom chat widget (bottom-right launcher + greeting card), Framer editor bar, Clarity, RudderStack, Warmly, HubSpot/analytics.

---

## 1. Global tokens

### 1.1 Breakpoints (Framer)
| Name | Range | Nav variant | Iframe |
|---|---|---|---|
| Desktop | `min-width: 1100px` | "Dark" desktop nav, 106 px tall | `?navh=104`, top 104, height `100vh-104` |
| Tablet | `810px – 1099.98px` | "Phone Dark" nav, 64 px tall (hamburger + inline buttons) | `?navh=104` element, placed at top 64, height `100vh-64` |
| Mobile | `max-width: 809.98px` | "Phone Dark" nav, 64 px, logo + hamburger only | `?navh=64`, top **0**, height `100vh` (nav overlays it) |

The iframe app has its own internal mobile switch: `matchMedia('(max-width: 700px), (orientation: portrait)')` → "mfill" mobile layout *(source)*.

### 1.2 Colors (computed)
| Token | Value | Use |
|---|---|---|
| nav-bg | `#080808` rgb(8,8,8) | desktop + mobile nav bar |
| nav-border | `rgba(229,231,235,0.10)` 1px solid bottom | desktop nav bar bottom hairline |
| nav-border-mobile | `rgba(255,255,255,0.10)` 1px div at y=63 | mobile nav bottom hairline |
| menu-panel-bg | `#0C0C0C` rgb(12,12,12) | mega-menu panel; customer logo cells |
| menu-overlay | `rgba(0,0,0,0.65)` | backdrop below open mega-menu |
| menu-card-well | `#141416` rgb(20,20,22) | well behind feature cards (Changelog/Live demo; Docs/Lightning Posts) |
| menu-card | `#272835` rgb(39,40,53) (Framer token `--token-5d552e0d…`) | feature card bg |
| dashed-line | `rgba(255,255,255,0.10)` 1px **dashed** | all mega-menu grid lines |
| text-white | `#FFFFFF` | nav links, menu headers |
| text-item | `#EDEDED` rgb(237,237,237) | menu item titles |
| text-item-sub | `#969696` rgb(150,150,150) | menu item descriptions |
| text-card-sub | `#C1C7D0` rgb(193,199,208) (token `--token-f2c9987f…`) | feature-card descriptions |
| text-login-mobile | `#666D80` (token `--token-cd17b9ef…`) | "Login" text on tablet/mobile bar |
| brand-purple | `#5E4CFF` (token `--token-de0b4b91…`) | "Start for free" bg, "View all customer stories" bg, cartridge |
| brand-purple-border | `#4835F2` rgb(72,53,242) | 1px border of purple buttons |
| btn-light-bg | `#F8FAFB` (token `--token-b6396ce9…`) | "Talk to our team" / "Book a demo" bg |
| btn-light-bg-hover | `#ECEFF3` (token `--token-10895d02…`) | hover of light button |
| btn-light-border | `#DFE1E7` (token `--token-54e3f719…`) | 1px border of light button |
| btn-light-text | `#272835` | light button label |
| btn-dark-mobile | `#1A1B25` (token `--token-460d74c5…`) | mobile menu "Start for Free" bg |
| hamburger-bar | `#F0F0F0` | 20×2 bars |
| mobile-chevron | `#999999` | 18×18 accordion chevron |
| modal-overlay | `rgba(0,0,0,0.60)` | Talk-to-team modal backdrop |
| iframe-bg | `#07060F` | iframe element background (shows before WebGL paints) |
| gameboy body bg | `#1A1B25` *(source)* | iframe `body` background |

Other Framer tokens present (not visible on this page, but declared): `#E5E7EB #EBEFF3 #36394A #A4ACB9 #0D0D12 #818898 #F6F8FA #666D80 #C1C7D0 #DFE1E7`. `#818898` is the stroke color of the chevron and arrow SVGs.

Game Boy app palette *(source)*: console body `#D2CFC6` / dark `#BFBCB2`, screen `#0B0B0D`, charcoal `#343437`/`#242426`, pill `#6E6E73`, grille `#A5A299`. Cartridge `#5E4CFF` / dark `#4A3AD2` / lite `#7D6DFF`, label `#6A5AFF`. Accent text in view titles is lavender (`#9d8dff`-ish; chip brackets use `#9d8dff`). UI CSS vars: `--bg #f6f8fa`, `--ink #3b4252`, `--ink-hi #6b57d6`, `--line #e4e7ec`.

### 1.3 Fonts
| Family (CSS name) | File (local) | Source URL | Weight | Used for |
|---|---|---|---|---|
| "Britti Sans Medium" | `public/fonts/britti-sans-medium.woff2` | https://framerusercontent.com/assets/53b0cytkvSXx6L4kjxKUH3MpVk.woff2 | 500 (rendered with font-weight 500 in nav, 400 in menu cards; same file) | desktop nav links, menu feature-card titles |
| "Britti Sans Trial Regular" | `public/fonts/britti-sans-regular.woff2` | …/681vGw17x6FM2rhfSgxK8lUnlxo.woff2 | 400 | declared only |
| "Britti Sans Trial Semibold" | `public/fonts/britti-sans-semibold.woff2` | …/57UiwHmxizMK8eML2ST3LbjSE.woff2 | 600 | declared only |
| "Britti Sans Trial Bold" | `public/fonts/britti-sans-bold.woff2` | …/0qEiSVCWILaRkjyIIooN7RC3Io.woff2 | 700 | declared only |
| Inter | `public/fonts/inter-{400,500,600,700}-latin.woff2` | …/GrgcKwrN6d3Uz8EwcLHZxwEfC4 (400), UjlFhCnUjxhNfep4oYBPqnEssyo (500), yDtI2UI8XcEg1W2je9XPN3Noo (600), syRNPWzAMIrcJ3wIlPIP43KjQs (700) | 400/500/600 | buttons, menu items, mobile menu |
| Inter Variable | `public/fonts/inter-variable-framer.woff2` | …/zGkzF6Kz3BzLVskEElr1XWKCSro.woff2 | var | declared |
| 'Britti Medium' (iframe app) | `public/gameboy/britti-medium.ttf` | gameboy-3d-iota.vercel.app/britti-medium.ttf | 500 | view titles inside the Game Boy |
| Inter (iframe app, Google) | `public/fonts/inter-var-latin-gstatic.woff2` | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2 | 400–700 | app body text |
| Press Start 2P | `public/fonts/press-start-2p-latin.woff2` | https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2 | 400 | pixel labels (planet names, CTA buttons, "CLICK TO START") |
| JetBrains Mono | `public/fonts/jetbrains-mono-latin.woff2` | https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2 | 400/700 | terminal in "BI as code" slide |

Fallback stacks used by Framer: `"Britti Sans Medium", "Britti Sans Medium Placeholder", sans-serif` (placeholder = local Arial with ascent 79.96%, descent 19.99%, size-adjust 100.05%), `Inter, "Inter Placeholder", sans-serif` (placeholder = Arial, ascent 89.79%, descent 22.36%, size-adjust 107.89%). Base page font: `12px sans-serif`, `-webkit-font-smoothing: antialiased`.

### 1.4 Page / document
- `<title>`: `Lightdash | Build Intelligence, not just dashboards.`
- meta description: `Lightdash is the AI-first, open-source BI platform for modern data teams. Connect to dbt, define metrics once, and get instant, trustworthy insights.`
- og:title / twitter:title: `Lightdash | Build Intelligence, not just dashboards. ` (trailing space in original); og:type website; twitter:card summary_large_image; og:image + twitter:image → `public/assets/og-image.png` (2400×1260); canonical `https://www.lightdash.com/`.
- favicon (light and dark): `public/favicon.png` (64×64).
- `body` bg `#FFFFFF`, but it is never visible: the root frame is `width:100%; height:100vh; overflow:clip; display:flex; flex-direction:column; align-items:center`.
- No page scroll at any breakpoint.

---

## 2. Navbar: desktop (≥1100 px)

### 2.1 Structure and box model (1440×900)
```
div.fixed  (position:fixed; top:0; left:50%; transform:translateX(-50%); width:100%; z-index:11)   ← box 0,0,1440,1080 (incl. hidden overlay area; pointer-events only on content)
 └ nav[data-framer-name=Dark]  flex column, align center, width 100%
    ├ div.bar  0,0,1440×106  bg #080808  padding 32px 20px  flex row center  gap 10px
    │          border-bottom 1px solid rgba(229,231,235,.1)  (Framer ::after; occupies inside the 106 box)
    │  └ div.inner  80,32,1280×42  max-width 1280px (width 100% of padded bar → 1240 at 1280vw)  flex row, justify-content:center, align-items:center
    │     ├ div.left  80,32,930.6×42  flex row gap 24px  flex:1
    │     │  ├ a.logo href="./"  80,39 119×28  (Rive canvas 119×27, see 2.2)
    │     │  └ div.links  223,32  flex row, align center, gap 0, overflow hidden
    │     │     ├ Trigger "Product"   223,32 102.6×42  padding 5px 10px 5px 16px  gap 2px  [text 56.6×32] [chevron box 18×18 → svg 6×3]
    │     │     ├ a "Pricing" href="./pricing"  325.6,32 75×42  padding 5px 10px 5px 16px
    │     │     ├ Trigger "Customers" 400.6,32 124×42
    │     │     └ Trigger "Resources" 524.6,32 121.5×42
    │     └ div.right 1010.6,32 349.4×42  flex row gap 14px  align center
    │        ├ "Login" link  1010.6,37 39×32
    │        ├ a "Talk to our team" button 1063.6,32 155×42
    │        └ a "Start for free" button href="./start" 1232.7,32 127.3×42
    └ (dropdown layer, see §3)
```
- At **1280** the bar is 0,0,1280×106; inner = 20,32,1240×42 (left 20→910.6, right 910.6→1260). The container is `max-width:1280px` and the bar has `padding: 32px 20px`, so content gets 80 px side gutters at 1440 and 20 px at ≤1280.
- The iframe sits **under** the nav, starting at y=104 (it overlaps the bottom 2 px of the 106 px bar). Height = `100vh − 104` (796 at 900 vh, 696 at 800 vh).

### 2.2 Logo
- The live site uses a **Rive animation** (`public/assets/logo/lightdash-logo.riv`, source https://framerusercontent.com/assets/EVNOizZDdBFzRA84tNZ9N3dZ5w.riv) drawn into a 119×27 canvas. The wrapper is `position:absolute; top:50%; transform:translateY(-50%)` inside a 119×28 link, with `filter: brightness(0) invert(1)` (renders pure white). Either play the .riv with `@rive-app/canvas` (autoplay, same filter) or use the static `public/assets/svg/lightdash-logo-white.svg` (113×42 viewBox; glyph area about 110.6×23 starting at x+0.8, y+9.7) scaled to width 119. The canvas content cannot be read programmatically, so the exact Rive motion is not documented. It is the Lightdash bolt + wordmark.
- Link `href="./"` → in clone `/`.

### 2.3 Text styles (desktop nav)
| Element | font-family | size | weight | line-height | letter-spacing | color |
|---|---|---|---|---|---|---|
| Product / Pricing / Customers / Resources / Login | Britti Sans Medium | 16px | 500 | 32px | 0.16px (0.01em) | #FFFFFF |
| "Talk to our team" | Inter | 15px | 500 | 18px | normal | #272835 |
| "Start for free" | Inter | 15px | 500 | 18px | −0.3px (−0.02em) | #FFFFFF |

### 2.4 Chevron (triggers)
Box 18×18 (flex center), containing an svg 6×3 at offset (6, 7.5). Path `M0 0 L3 3 L6 0`, stroke `#818898`, width 1.125, linecap square, fill none. File: `public/assets/svg/chevron-down.svg`. Gap between label and chevron box: 2px. **No rotation and no color change on open/hover** (measured: computed styles identical before and after hover).

### 2.5 Buttons
| | Talk to our team | Start for free |
|---|---|---|
| box | 155×42 | 127.3×42 |
| padding | `0 20px` (height fixed 42) | `12px 20px` |
| bg | #F8FAFB | #5E4CFF |
| border | 1px solid #DFE1E7 (inset, via ::after) | 1px solid #4835F2 |
| radius | 6px | 6px |
| gap (label↔icon) | 4px | 8px |
| hover | bg → **#ECEFF3**; measured tween ≈150–200 ms ease (frames: 248→246→243→239→237→236 over ~120 ms after the first change) | **no visual change** (measured) |
| action | opens Cal.com modal (§4) | link `./start` |

### 2.6 Links
- "Login" → `https://app.lightdash.cloud/login`. Hover color `rgba(255,255,255,0.7)` (`#ffffffb3`, preset `--framer-link-hover-text-color`). Framer link color transitions use `color .2s cubic-bezier(.44,0,.56,1)`; apply the same here.
- "Pricing" → `./pricing`. Hover: no measured change.
- Triggers are not links. **Hovering** them opens the mega-menu (desktop). Moving onto another trigger swaps panels. Leaving the nav/panel closes it.

---

## 3. Mega-menus (desktop hover dropdowns)

### 3.1 Common shell
- The panel is full-bleed: x 0→vw, starting at y=106 directly under the bar. bg `#0C0C0C`, `overflow:hidden`. Content is 1280 wide, centered (x 80→1360 at 1440).
- Below the panel: **Overlay** `rgba(0,0,0,0.65)` fills from y=106 to the viewport bottom (dims the hero).
- **Grid lines**: everything uses 1px **dashed** `rgba(255,255,255,0.10)`:
  - horizontal full-bleed lines (they extend past the viewport) at the panel top (y=105/106), under the header row (y=156), and above the footer row;
  - the content block has 1px dashed left and right borders (x=80 and x=1360);
  - vertical dashed dividers between the four 320-px columns (x=401/400, 719/720, 1040), running the full panel height.
- Grid: `display:grid; grid-template-columns: 320px 320px 320px 320px; gap:0`.
- Column **Header** row: height 50, padding `20px 24px`, bottom border 1px dashed. Header text: Inter 15/18 500, #FFFFFF.
- **Footer** row: padding `20px 24px 14px` (Customers: `16px 24px 14px`).
- 4th column (Product & Resources) is decorative: hatch image `public/assets/nav/hatch-pattern.png` (2560×536, object-fit cover) at **opacity 0.25**, filling the column under its empty header (320×316 in Product, 320×415 in Resources), with a 1px dashed right border.

#### Menu item (icon + title + description) "Dark" link
- Box 320×56, padding `8px 16px 8px 24px`, flex row, gap 10px, align center. The wrapper column adds `padding:0 0 16px` (Product col 1: `0 0 16px 1px`) and `gap:4px` between items (pitch 60 px).
- Icon 40×40 (`object-fit:cover`, 80×80 source PNG/JPG, no radius).
- Text stack: flex column gap 4px, width 230.
  - Title: Inter 15px / 18px / 500, #EDEDED.
  - Description: Inter 13px / 15.6px / 400, #969696.
- Hover: no measured style change (Framer variant has none).

#### Feature card (Changelog / Try Live demo / Docs / Lightning Posts)
- Well: bg #141416, padding 5px (Product) / 10px (Resources), gap 4px.
- Card: bg #272835, padding `16px 0 20px 16px`, flex column gap 4px, radius 0. Opens in a new tab (`target=_blank`) for external links.
- Title row: Britti Sans Medium **17px / 20.4px / 400**, #FFFFFF, plus a 16×16 icon box with gap 10px holding the arrow-up-right svg (8×8, path `M7.833 6 L7.833 0 L1.833 0 M0 7.833 L7.166 .667`, stroke #818898, width 1.5): `public/assets/svg/arrow-up-right.svg`.
- Description: Inter 13/15.6 400, #C1C7D0.
- Pixel decorations (absolute, z 1): a 20×20 "square" in the top-right corner (flush to the card's top/right edges) and an 80×20 "strip" in the bottom-right corner. Colors per card: Green (`square-green.png`, `strip-green.png`), Purple, Orange (files in `public/assets/nav/`).

### 3.2 Product panel (height 422; y 106→528)
| Col | Header | Items (title / description / href / icon file) |
|---|---|---|
| 1 (x 80–401) | Product | Conversational analytics / Ask AI questions in plain English / `./conversational-analytics` / icon-conversational-analytics.png · Data apps / Build apps on governed data / `./data-apps` / icon-data-apps.png · Metrics Catalog / Every KPI in one trusted place / `./metrics-catalog` / icon-metrics-catalog.png · Embedded analytics / AI-powered insights anywhere / `./embedding` / icon-embedded-analytics.png · Interactive dashboards / Dig into every number / `./interactive-dashboards` / icon-interactive-dashboards.png |
| 2 (400–720) | Platform | Context layer / Use AI to build dashboards / `./context-layer` / icon-context-layer.png · BI as code / Build & maintain dashboards in code / `./bi-as-code` / icon-bi-as-code.png · Self-improving analytics / Ditch dashboard upkeep / `./self-improving-analytics` / icon-self-improving-analytics.png · Integrations / Use the tools you already love / `./integrations` / icon-integrations.png |
| 3 (720–1040) | (empty header) | Well 320×239 at y157 with 2 cards 308×113 and 308×110: **Changelog** / "Check out our latest product updates" → `https://changelog.lightdash.com/` (_blank, Green deco) · **Try Live demo** / "Give Lightdash a go" → `https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home` (_blank, Purple deco) |
| 4 (1040–1360) | (empty) | hatch pattern |
Footer row: 1280×54 at y474 (empty).

Item rows sit at y 161, 221, 281, 341, 401 (first items). Header text baselines: "Product" box at 105,123; "Platform" at 424,123.

### 3.3 Customers panel (height 414; y 106→520)
- Header (full 1280 width): "Working with the top enterprise companies", Inter 15/18 500 #FFF at 104,122.
- Grid row (y156→448, `padding:1px 0`) has 4 category columns, each 320 wide:
  - Category header 50 tall, **centered** text Inter 15/18 500 #FFF: "Banking & Financial services" · "E-commerce" · "AI & Developer tools" · "Energy & Logistics".
  - 3 logo cells per column, each 320×80, bg #0C0C0C, content centered. Each holds a logo link 160×40 (`object-fit:cover`), separated by dashed lines.
  - Col 1: Wise, Kraken, OakNorth. Col 2: Adobe, ServiceNow, Workday. Col 3: fal (→ `./customer-story/fal`, shows a "Read case study" pill), Model ML, Tempo. Col 4: Octopus Energy, inDrive, Flink. All other logos → `./customer-stories`. Logo files: `public/assets/nav/customers/*.svg`.
  - "Read case study" pill: wrap is absolute and centered under the logo (160×16 at logo-bottom); the pill is padding `0 8px`, bg #0C0C0C, radius 4px (plus a light 1px border visible in the screenshot); label Inter **9px / 9px / 600**, letter-spacing −0.28px, color rgba(255,255,255,0.55). Only fal shows it.
- Footer (y448, h72, padding `16px 24px 14px`): **"View all customer stories"** button 240×42 at 104,464 → `./customer-stories`. bg #5E4CFF, radius 6, padding `0 20px`, gap 4. Label Inter 15/18 500 color #F8FAFB, plus a 16×16 white arrow `public/assets/nav/arrow-up-right-white.svg`.
- Decoration bottom-right: purple square 20×20 at (1340,480) and purple strip 80×20 at (1280,500).

### 3.4 Resources panel (height 521; y 106→627)
- Header (full width): "Resources" at 104,122.
- Col 1 (x80, width 308): well bg #141416, padding 10px, gap 4px, holding two tall cards 288×195.5:
  - **Docs** / "Get stuck in" → `https://docs.lightdash.com/introduction` (Green deco: square at card top-right, strip at bottom-right)
  - **Lightning Posts** / "Our blog!" → `./blog` (Orange deco: `square-orange.png`, `strip-orange.png`)
- Col 2 (x400): items (column `padding:16px 0`, gap 4): About Us / Our story so far... / `./about` / icon-about-us.jpg · Product Roadmap / Have a peek at our plans / `./roadmap` / icon-product-roadmap.png
- Col 3 (x720): Community / Join our Slack Community! / `https://go.lightdash.com/community` / icon-community.jpg · Partnerships / Partner with us! / `./partnerships` / icon-partnerships.jpg
- Col 4: hatch pattern 320×415.
- Grid y156→573; footer row 54 tall (empty).

### 3.5 Dropdown motion (measured by polling every 25 ms)
- **Open** (hover a trigger from closed): the panel wrapper **height** animates from ~0 to the target with a **spring overshoot**: 112→176→245→351→383→418→**427 (peak, +5 px)**→426→424→423→422. It settles about **315 ms** after the start. The content card animates `opacity 0→1` over ~190 ms with a `scaleY` counter-transform (Framer layout animation; matrix scaleY 3.76→1). Overlay `opacity 0→1` over ~165 ms (0→.06→.24→.63→.77→.95→.98→1).
  - Tailwind/Framer-motion equivalent: `transition={{ type:'spring', bounce:0.2, duration:0.4 }}` for height, `opacity` tween 0.2 s ease-out for content, overlay 0.17 s ease-out.
- **Switch** panel (Product→Customers→Resources): the same spring layout animation between heights (422 ↔ 414 ↔ 521). The old content fades out while the new one fades in (both briefly in the DOM).
- **Close**: reverse (fade + collapse). The overlay fades out.

---

## 4. "Talk to our team" modal (Cal.com)
- Trigger: desktop "Talk to our team" button (tablet: "Book a demo" / "Book a Demo").
- Backdrop: `position:fixed; inset:0; z-index:10; background:rgba(0,0,0,0.6)`.
- Positioner: fixed, top 104 (under the nav), height `100vh−104`, `padding:20px 0`, overflow clip, centered.
- Frame: 1000×620 at (220,192) for 1440×900, bg rgba(0,0,0,0.6), padding `32px 24px`.
- Inner card: 700×556 at (370,224), bg #FFFFFF, `box-shadow: rgba(0,0,0,0.25) 0 1px 2px 0`, radius 0.
- Content: Cal.com inline embed, `https://lightdash.cal.com/lightdash/talk/embed?layout=month_view&theme=light&embedType=inline` (scrollable container `overflow:scroll`). Use `@calcom/embed-react` `<Cal calLink="lightdash/talk" config={{layout:'month_view', theme:'light'}} />` with origin `https://lightdash.cal.com`, or an iframe.
- Close: click the backdrop. While open, the "Talk to our team" button shows a dimmed state (screenshot `reference/sections/talk-to-team-modal-1440.png`).
- The Cal.com contents are third-party and were not measured.

---

## 5. Navbar: tablet (810–1099) and mobile (<810), "Phone Dark"

### 5.1 Bar
- nav 100%×64, bg #080808, `position:fixed; top:0; z-index` above the iframe; 1px line `rgba(255,255,255,0.1)` at y=63.
- Row: padding `10px 15px 0 16px` → content box x16, y10, (vw−31)×44.
- Logo: link 113×42 at (16,11), inline SVG (`public/assets/svg/lightdash-logo-white.svg`; the original uses the dark-fill SVG with `filter: brightness(0) invert(1)`).
- Right cluster (tablet only, hidden <810): flex gap 14px, right-aligned, ending 10 px before the hamburger:
  - "Login" text link: Inter 15px/30px 500, ls −0.15px, color **#666D80** → `https://app.lightdash.cloud/login`.
  - "Book a demo" button 130×42: bg #F8FAFB, border 1px #DFE1E7, radius 6, padding `12px 20px`, label Inter 15/18 500 ls −0.3px #272835 → opens the Cal modal.
  - "Start for free" 127.3×42: bg #5E4CFF, border 1px #4835F2, radius 6, padding `12px 20px`, label #FFF → `./start`.
  - (At 810: Login x416.7, Book a demo x469.6, Start x613.7, hamburger x751.)
- Hamburger "Open Dark": 44×44 at (vw−59, 10). Two bars 20×2, #F0F0F0, radius 10px, centered horizontally (left 50%−10), at top 37.5% −1 (=15.5 px) and 62.5% −1 (=26.5 px).
- **Close state** ("Close Dark"): both bars move to the center (top 21px) and rotate ±45° (`matrix(.707,±.707,…)`), forming an ✕. Framer transition (spring/ease ≈0.3 s).

### 5.2 Open menu (full-height panel, bg #080808, scrollable `overflow:auto`, min-height/max-height = 100vh)
Rows (each 100%×48, padding `0 24px`, bottom border 1px **dashed** rgba(255,255,255,0.1), label Inter **15px/18px 400 #EDEDED**, chevron box 24×24 holding an 18×18 #999 chevron mask at the right, x = vw−48):
1. Product ▾ (accordion)
2. Pricing → `./pricing`
3. Customers ▾
4. Resources ▾
5. Login → `https://app.lightdash.cloud/login`

Then the Buttons row: padding 24, gap 10, two equal buttons each `(vw−58)/2` × 40, radius 6, padding `0 20px`, label Inter 15/18 500 (letter-spacing normal):
- "Book a Demo": bg #F8FAFB, border 1px #DFE1E7, text #272835 → Cal modal
- "Start for Free": bg **#1A1B25**, no border, text #FFF → `./start`

**Accordion is single-open** (opening one collapses the others); the chevron rotates 180° when open. Expanded contents:
- **Product**: sub-header "Product" (y+10), the same item component as desktop (full-width rows, 56 tall, icon 40, title Inter 15/18 500 #EDEDED, desc 13/15.6 #969696). Mobile copy differs from desktop: Conversational analytics / Ask AI questions in plain English; Data apps / Build apps on governed data; **Metrics catalog** / Every KPI in one trusted place; Embedded analytics / AI-powered insights anywhere; Interactive dashboards / **Explore the story behind every number** (uses the integrations icon `0bNX6rvk3HSq9u4ipRLNxgIZWc.png`); then sub-header "Platform": Context layer / **Governed context your AI needs**; BI as code / Build & maintain dashboards in code; Self-improving analytics / **Free your team from dashboard upkeep**; Integrations / Use the tools you already love. Then a full-width light button "View changelog" (762×40 at 810, padding `0 12px 0 20px`, bg #F8FAFB) → `https://changelog.lightdash.com/`.
- **Customers**: "Working with the top enterprise companies" (Inter 15px, #969696-ish grey), then 4 groups, each a left-aligned title (Inter 15/18 500 #FFF) plus a 3-column logo row (cells about (vw−48)/3 × 64, bg #0C0C0C, dashed borders): **Financial services** (Wise, Kraken, OakNorth) · **Enterprise software** (Adobe, ServiceNow, Workday) · **AI & developer platforms** (fal + "Read case study" pill, Model ML, Tempo) · **Energy, mobility & delivery** (Octopus Energy, inDrive, Flink). Then the purple "View all customer stories ↗" button (auto width, 40 tall) with the purple pixel squares at the right. See `reference/sections/mobile-menu-customers-810.png`.
- **Resources**: items About Us, Product Roadmap, Community, Partnerships (same item component), then two half-width light buttons "Read Docs ↗" (→ docs) and "Lightning posts ↗" (→ `./blog`). See `reference/sections/mobile-menu-resources-810.png`.

### 5.3 Mobile (390) specifics
- Only the logo (16,11,113×42) and hamburger (331,10,44×44) are visible in the bar.
- The iframe fills the **whole viewport** (0,0,390×844, `height:100vh`) under the fixed 64 px nav, with `?navh=64`.

---

## 6. Hero: Game Boy app (iframe), reference documentation

All values are *(source)* from `public/gameboy/index.html` unless marked measured. Iframe viewport at 1440×900 = **1440×796**.

### 6.1 Stack (DOM inside the iframe)
`#seo-content` (visually hidden h1/h2/ul, copy in §6.6) · `#stage` (fixed inset 0, holds the WebGL canvas `#glcanvas`, `data-engine="three.js r160"`, transparent over body `#1A1B25`) · `#boot` (title screen, container-query sized, `border-radius:6cqh`) · `#bootGlare` · `#mfillBg` (mobile starfield) · `#screenUI` (DOM views, matrix3d-projected onto the 3D screen glass; the glass is 3.5×2.62 world units, aspect 1.34) · hidden SVG `<filter>`s `px-a/px-b/px-c/px-lg-*/px-glare` (pixel-dissolve filters; Firefox swaps them for pass-through).

### 6.2 States and motion (measured screenshots + source constants)
1. **Idle / attract** (`reference/sections/hero-idle-1440.png`): a nebula space background (`space-bg.webp` 1672×941, purple galaxy left, purple dust right, WebGL twinkling stars, occasional diagonal shooting stars). Left: the light-grey Game Boy (screen black with a glossy glare, charcoal D-pad, A/B buttons, two pill buttons). Right: the purple Lightdash cartridge with `sticker.webp` (Cloudy-in-UFO label, "LD-VI-EUR MADE WITH LOVE", "THIS SIDE OUT"). Both float/bob gently, and you can drag to tilt them (limited to `TILT_MAX = 0.2` rad ≈ 11°, springs back). Everything is rendered with a Bayer 4×4 ordered dither for the pixel look. Camera keyframe p=0: target (0,−0.08,0), dist 8.9.
2. **Background fleet**: **5 rockets** alive (`SHIP_N=5`), loaded from `rocket.glb`. Each has a customer logo decal on both flanks (roster: Adobe, fal, Kraken, Octopus Energy, Wise, ServiceNow, inDrive, Workday, ModelML, Tempo, Flink, OakNorth), a purple thruster plume, depth 12.6–15 units in front of the camera, size ×0.8–1.25, lean ±0.30 rad. They cruise left↔right across lanes and respawn off-screen. Hovering a ship shows a pixel chip label with the company name (`shipChipPop`/`chipPixIn` keyframes). Clicking opens the customer story.
3. **Insert** (click/tap on the console or cartridge, or scroll; ignored for the first 500 ms): the cartridge flies up and drops into the slot along a Catmull-Rom camera path through CAMK keyframes (p .33 dist 13.2, p .66 dist 9.6, p 1.0 target (0,1.42,0.33) dist 4.47, which zooms onto the screen). **Duration `PLAY_DUR = 2600 ms`**. Sound `insert-sound.m4a`. See `hero-cartridge-inserting-1440.png`.
4. **Boot / title screen** (`hero-boot-screen-1440.png`): `#boot` fades in with `transition: opacity .55s steps(7)`. Content: a pixelated Lightdash bolt+wordmark (canvas, 76cqw wide), Cloudy-in-UFO (inline webp = `public/gameboy/_extracted/boot-ufo.webp`, 800×661) floating with `bootFloat 2.6s steps(7) infinite` (translateY ±2.6%), "CLICK TO START" (Press Start 2P, blinking `bootStartBlink 1.05s steps(1) infinite`: opacity 1 for 0–59%, 0.25 for 60–100%), and the hint "ARROWS+A&B / MOUSE+CLICK". Click anywhere, or Enter/Space/A, to start (`start-click.m4a`).
5. **Planet nav** (`hero-planet-nav-1440.png`): a 2×3 grid of pixel-dithered planets (textures `planets/*.webp`, 256²) with labels in Press Start 2P (uppercase, white, `text-shadow: 0 0 .35em rgba(0,0,0,.85), 0 .06em .1em rgba(0,0,0,.9)`, canvas font `700 19px Inter` with 2.5px tracking for the WebGL labels). Top row: PRODUCT · PRICING · GOVERNANCE. Bottom row: CUSTOMERS · MIGRATION · BOOK A DEMO. Label centers at 1440×796: (438,230), (720,230), (1002,230), (446,554), (720,554), (994,554). The Cloudy UFO cursor (`#uiCloudy`, 13.3% of screen width, drop-shadow `0 3px 8px rgba(126,224,168,.55)`) follows the mouse or arrow keys; flying over a planet shows L-bracket chips (`#9d8dff`). Click / A opens. Mobile grid entrance: `mnavCrashIn .26s cubic-bezier(.2,.86,.3,1.02)` (scale 1.9→0.985→1, blur 1.4px→0).
6. **Views** open over the screen with a ✕ (`.vclose`, top-right). Esc/Backspace/B goes back. View title style `.vtitle`: 'Britti Medium' 4.4cqh / 1.1, weight 500, letter-spacing −0.01em, #FFF, with the accent phrase in lavender. Reveal animations: `fadeUp .55s cubic-bezier(.22,.61,.36,1)` (opacity 0, translateY .45em, blur 4px → none) and the quote `wordIn .55s` per word (pixel-dissolve color #2b2358→#7166cf→#fff, staggered by `--i`).

### 6.3 View: Customers (`view-customers-1440.png`)
Title "Trusted by **leading data teams**." Bento of 4 rows (`CUST_ROWS`): [fal stat | Workday quote card] · [JustWatch stat bar | Octopus Energy] · [Adobe | ServiceNow] · [Kraken | OakNorth stat]. Tiles have a thin lavender pixel frame. The expanded tile shows the logo, quote, avatar (`people/*.jpg`), name/role and the CTA "VIEW CUSTOMERS" (Press Start 2P, white button).
- fal: **85%** "Data requests answered in 24 hrs". Quote "“I spent five minutes in Lightdash and I was like, oh, that was extremely easy.”" Kevin Otte, Data Scientist → https://www.lightdash.com/customer-story/fal
- OakNorth: **128** "data apps built". "“People can build whatever they like, but we still control the data and the permissions.”" David Strudwick, Senior BI Engineer
- JustWatch: **86%** "Lower BI tool spend". "“We create specialized agents for each department, each with the data access and context specific to its team’s domain.”" Aleksandr Zolotukhin, VP of Data & Analytics → https://www.lightdash.com/customer-story/justwatch
- Workday: "“Perfect solution for our BI needs — Lightdash just works exactly how you’d want it to.”" Don Rudish, Director · Workday, CTA "View customers" → https://www.lightdash.com/customer-stories
- Logo-only: Kraken, Octopus Energy, Adobe, ServiceNow.

### 6.4 Views: Product, Pricing, Governance, Migration, Book a Demo
- **Product** (`view-product-1440.png`): a carousel with ‹ › pixel-frame arrows and 5 slides. Each has a title (Britti Medium) and subtitle, plus a "LEARN MORE" Press Start 2P button (bg #5E4CFF):
  1. BI as code: "Build and maintain governed dashboards through code." → /bi-as-code. Visual: a dark JetBrains Mono terminal typing "> Build a dashboard for Q1 European region… Search(pattern: "**/*.yml", path: "~/metrics/sales") └ Found: revenue.yml, conversion_rate.yml, avg_deal_size.yml > Creating dashboard… Charts: 4, Region filter: Europe, Date range: 12 months", overlapping a light "Sales KPI" dashboard (Total Revenue (YTD) $3.8M +12%, Growth vs last year line chart, Revenue by Product for Q1 stacked bars #5c52d6/#83e2b7/#d9b3ff, Deals Closed 1,284 +9%).
  2. Data Apps: "Build custom governed data apps in minutes." → /data-apps (formats: slides / dashboards / pdf)
  3. Conversational Analytics: "Ask your data anything, anywhere, and trust every answer." → /conversational-analytics (agents: Slack, Claude, Lightdash)
  4. Metrics Catalog: "Find, track, and easily explore key metrics to visualize trends." → /spotlight
  5. Embedded analytics: "Embed AI-powered analytics into your product." → /embedding
- **Pricing** (`view-pricing-1440.png`): title "Stop paying per seat to look at **your own data**." with lede "Start free, scale when you’re ready." Three framed cards (eyebrow Inter, title Britti Medium, copy, Press Start 2P CTA in a white button):
  - Open Source / **Self-hosted** / "Core BI features for teams happy to self-host." / GO TO REPO → https://github.com/lightdash/lightdash
  - Cloud Pro / **$3000** `/ month` / "**No per-seat pricing.** Deliver trusted analytics in a powerful AI-native BI platform." / DIVE DEEPER → https://www.lightdash.com/pricing (featured)
  - Enterprise / **Let’s talk** / "Advanced security, support and customization for enterprise-grade organizations." / GET IN TOUCH → https://www.lightdash.com/start
  - Mascots: `ufo-cloudy.webp`, `cloudy-medium.webp`, `cloudy-mothership.webp` (bob `pmBob 3.4s steps(4,end) infinite`).
- **Governance** (`view-governance-1440.png`): "Metrics you can **actually trust**." with sub "Every chart, dashboard, app is powered by your context layer so you get the right numbers everywhere." A central "Revenue" metric card (Sales + ✓ Verified chips, "Total sales revenue from all orders.", 16 uses) is wired by glowing curves to 4 outputs: Sales overview (TOTAL REVENUE $13M, TOTAL ORDERS 110.7K, AVG ORDER VALUE $123, TOTAL PROFIT $1.5M, ✓ Verified), Embedded charts (Jan–Jun), AI Chatbot ("Ask a question..."), Schedule Slack alerts ("You 2:43 PM @lightdash send daily revenue updates"), each with Verify → Verified stamping animations (`govStamp`, `govTravel`, `gcTypingDot`).
- **Migration** (`view-migration-1440.png`): "We’ll help you move off legacy BI, **without the rebuild**." Three cards: **Looker**: "Swap LookML for a code-based open semantic layer." (Stake, TitanBay, TicketSwap, Generation Home) · **Power BI**: "Swap the Microsoft-only stack for an open source, AI-native, code-first platform." (TitanBay, Hypebeast, Optimality, Openup) · **Tableau**: "Stop paying per seat to look at your data." (Octopus Energy, ServiceNow, OakNorth, Collectors). The eyebrow "MIGRATED TO LIGHTDASH" is lavender. Logo pills have Press Start 2P names. Cloudy's green tractor beam abducts pills (hold A/B or click a box; `pillAbduct`, `beamGlow`).
- **Book a Demo**: opens `https://www.lightdash.com/start` in a new tab (no view).
- All CTAs inside the app open in a **new tab** (`window.open(u,'_blank','noopener')`).

### 6.5 Mobile (<=700 px or portrait) inside the app
"mfill" mode (`reference/sections/hero-idle-390.png`, `original-390.png`): the console + cartridge are smaller and centered (console about x18–240, y312–606 at 390×844), and rockets fly around them. After boot, the planet grid becomes a DOM 2×3 tile grid (`.mnavTile`), and views render full-screen below `navh` with mobile line breaks.

### 6.6 SEO copy (hidden `#seo-content`, keep verbatim)
```
h1  Lightdash — open source, code-first BI platform
h2  Trusted by leading data teams
    • Kraken • Octopus Energy • Workday: “Perfect solution for our BI needs — Lightdash just works exactly how you’d want it to.” — Don Rudish, Director
    • Adobe • ServiceNow • fal — 85% Data requests answered in 24 hrs: “I spent five minutes in Lightdash and I was like, oh, that was extremely easy.” — Kevin Otte, Data Scientist
    • OakNorth — 128 data apps built: “People can build whatever they like, but we still control the data and the permissions.” — David Strudwick, Senior BI Engineer
    • JustWatch — 86% Lower BI tool spend: “We create specialized agents for each department, each with the data access and context specific to its team’s domain.” — Aleksandr Zolotukhin, VP of Data & Analytics
h2  AI that builds and maintains your analytics on data you can trust
p   Give AI agents access to governed metrics. Works with Slack, Claude, Lightdash.
h2  Simple, transparent pricing.
p   Start free, scale when you’re ready.
h2  Move off legacy BI without the rebuild.
p   We’ll help you move off legacy BI quickly, without the rebuild.
    • Looker — Swap LookML for a code-based open semantic layer. Migrated to Lightdash: Stake, TitanBay, TicketSwap, Generation Home.
    • Power BI — Swap the Microsoft-only stack for an open source, AI-native, code-first platform. Migrated to Lightdash: TitanBay, Hypebeast, Optimality, Openup.
    • Tableau — Stop paying per seat to look at your data. Migrated to Lightdash: Octopus Energy, ServiceNow, OakNorth, Collectors.
h2  Metrics you can actually trust
h2  Let’s talk   p  <a href="https://www.lightdash.com/start">Book a demo</a>
```
(The app itself generates this at runtime from its data arrays.)

---

## 7. Full link inventory
**Desktop nav:** `./` (logo) · Product ▾ · `./pricing` · Customers ▾ · Resources ▾ · `https://app.lightdash.cloud/login` · Talk to our team (Cal modal `lightdash/talk`) · `./start`
**Product menu:** `./conversational-analytics` `./data-apps` `./metrics-catalog` `./embedding` `./interactive-dashboards` `./context-layer` `./bi-as-code` `./self-improving-analytics` `./integrations` · `https://changelog.lightdash.com/` (_blank) · `https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home` (_blank)
**Customers menu:** `./customer-stories` (all logos except fal) · `./customer-story/fal` · View all → `./customer-stories`
**Resources menu:** `https://docs.lightdash.com/introduction` · `./blog` · `./about` · `./roadmap` · `https://go.lightdash.com/community` · `./partnerships`
**Mobile menu extras:** "View changelog" → changelog · "Read Docs" → docs · "Lightning posts" → `./blog` · Login · Book a Demo (Cal) · Start for Free `./start`
**Footer:** none on this page.
Clone note: relative `./x` links point to other lightdash.com routes that are out of scope. Map them to `https://www.lightdash.com/x`, or keep them as relative placeholders.

---

## 8. Motion summary
| Element | Trigger | Animation (measured unless *source*) |
|---|---|---|
| Mega-menu panel | hover trigger | height spring 0→target with ~5px overshoot, settle ≈315 ms; content opacity 0→1 ≈190 ms; overlay rgba(0,0,0,.65) opacity 0→1 ≈165 ms |
| Talk to our team btn | hover | bg #F8FAFB→#ECEFF3 ≈150–200 ms ease |
| Login link | hover | color #FFF → rgba(255,255,255,.7), `.2s cubic-bezier(.44,0,.56,1)` |
| Start for free, Pricing, menu items, triggers | hover | none measured |
| Hamburger | click | bars → ✕ (top 21px, rotate ±45°) |
| Mobile accordion | click | single-open expand; chevron flips |
| Nav logo | load | Rive animation (canvas; not inspectable) |
| Framer appear effects | load | **none** (no `data-framer-appear-id` in the SSR HTML; nav is static on load) |
| Iframe app | load/interact | see §6.2: idle float + tilt, 5 rockets, starfield, insert 2600 ms, boot fade .55s steps(7), bootFloat 2.6s steps(7), START blink 1.05s steps(1), views fadeUp .55s, wordIn .55s; 57 CSS keyframes total in the app |
| Scroll-triggered reveals / marquees / IntersectionObserver | — | **none on the Framer page** (no scroll). Scrolling over the iframe, as with clicking, triggers the cartridge insert. |

---

## 9. Not captured / caveats
- **WebGL-rendered content** (Game Boy, cartridge, planets, rockets, starfield, pixel labels on planets) is canvas output. Positions and visuals come from screenshots and app source, not computed styles. This is why the plan is to mirror the app verbatim.
- **Rive logo animation**: the canvas timeline is not inspectable. The .riv file is provided, and the static SVG is the fallback.
- **Cal.com modal contents** (third-party iframe) were not measured.
- I could not open the iframe origin as a top-level page (blocked in this environment). It was inspected inside the lightdash.com embed by evaluating in the frame and by reading its source.
- The tablet/mobile mega-menu open/close animation and hamburger morph timings were not polled; Framer defaults (≈0.3 s spring) are assumed.
- `gameboy-3d-iota.vercel.app/background.svg` is referenced in the app CSS comments/code but returns 404 on the live site, so it was not downloaded.
- Intercom, Framer editor bar and analytics scripts are intentionally excluded.
