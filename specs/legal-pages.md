Source: https://www.lightdash.com/

# Legal / utility pages: clone spec

Routes: `/terms-of-service`, `/privacy-policy`, `/sub-processors`, `/google-apis-disclosure`, `/404` (and catch-all `*`).

Measured live on 2026-10-13 with a private headless Chromium (Playwright, DPR 1) at 1440×900, plus 1280, 1100, 1099, 810, 809 and 390. All values come from `getComputedStyle`/`getBoundingClientRect`, `document.getAnimations()` or the site's own Framer CSS/JS unless marked otherwise. Box notation is `[x, y, w, h]` in page px at the stated viewport.

**Out of scope here (see `specs/SHARED.md`):** the navbar (light variant on these pages: 106 px tall on desktop, 64 px at ≤1099) and the dark footer. This file covers everything between them, **including the "Ready to free up your data team?" CTA band with the Snake mini-game**. That band is a Framer component ("Snake Game CTA") placed directly above the footer on all four legal pages, but not on 404. It probably appears on other pages too. If SHARED.md also specs it, use one implementation.

**Content rule:** don't copy the legal bodies. Use neutral placeholder paragraphs. Page titles, "Last Updated" labels, heading text and the 404 copy are listed verbatim below.

Reference screenshots (full page): `reference/pages/{terms-of-service,privacy-policy,sub-processors,google-apis-disclosure,404}-1440.png` and `…-390.png`. Snake game source for porting: `reference/pages/snake-game-cta.framer-module.mjs` (minified Framer module, the logic is the `function Y(e)` component; the tile SVG array is `fe=[…]`, picked at random by `pe()`), plus a live DOM dump in `reference/pages/snake-game-cta.dom.html`.

---

## 0. Templates

| Template | Routes | Notes |
|---|---|---|
| **LegalPage** (one shared component) | terms, privacy, sub-processors, google-apis | Same frame for all: bordered wrapper → pixel "Hero" strip → Meta row (calendar icon + "Last Updated") → Title row (H1) → content column with a dashed left rule → CTA band. Only the rich-text body differs. |
| **NotFound** | `/404` and every unknown URL | Unknown URLs return HTTP 404 and render the same page, pixel-identical to `/404`. Canonical `https://www.lightdash.com/404`. No CTA band; the footer follows directly. |

Per-page data:

| Route | `<title>` | H1 | Date label | Meta description |
|---|---|---|---|---|
| /terms-of-service | `Lightdash Terms of Service` | Terms of Service | `Last Updated: Feb 2023` | "Review Lightdash’s Terms of Service to understand your rights, data usage, and responsibilities when using our AI-first BI platform." |
| /privacy-policy | `Lightdash Privacy Policy` | Privacy Policy | `Last Updated: Jan 2026` | "Learn how Lightdash protects your data. Our privacy policy explains how we handle, store, and secure information across our AI-first BI platform." |
| /sub-processors | `Lightdash Sub Processors` | Sub-processors | `Last Updated: Nov 2025` | site default (below) |
| /google-apis-disclosure | `Lightdash Google APIs Disclosure` | Google APIs Disclosure | `Last Updated: Oct 2023` | site default |
| /404, `*` | `Lightdash | Build Intelligence, not just dashboards.` | (none) | (none) | site default: "Lightdash is the AI-first, open-source BI platform for modern data teams. Connect to dbt, define metrics once, and get instant, trustworthy insights." |

Total document heights at 1440 (nav + body + footer): terms 17892, privacy 7153, sub-processors 1838, google 1506, 404 1507.

---

## 1. Tokens used on these pages

| Token | Value | Used for |
|---|---|---|
| ink-900 | `#272835` rgb(39,40,53) | H1, privacy section headings, 404 "Oh zap!" |
| ink-700 | `#36394A` rgb(54,57,74) | body text, list bullets, CTA dashed lines (on dark) |
| black | `#000000` | Terms H5 section headings, privacy H4 |
| gray-500 | `#818898` rgb(129,136,152) | "Last Updated" label |
| gray-icon | `#A4ACB9` rgb(164,172,185) | calendar icon stroke |
| gray-400 | `#A4ABB8` rgb(164,171,184) | rich-text link (preset) |
| gray-100 | `#ECEFF3` | link hover; 404 upper stripe lines |
| gray-600 | `#666D80` rgb(102,109,128) | 404 body copy |
| line | `#E5E7EB` rgb(229,231,235) | wrapper border (solid), row separators (dashed), 404 lower stripes |
| primary | `#5E4CFF` rgb(94,76,255) | buttons |
| primary-border | `#4835F2` rgb(72,53,242) | 404 button 1px inner border |
| primary-200 | `#B4ACFF` rgb(180,172,255) | CTA secondary button label |
| dark-card | `#1A1B25` rgb(26,27,37) | CTA card |
| dots-bg / dot | `#F6F8FA` / `#CDD2D9` | CTA band dotted background |
| page bg | `#FFFFFF` | |

Fonts (all already in `public/fonts` except two, marked ★):
- `"Britti Sans Trial Semibold"` (600 file, applied with `font-weight:400` on H1 and 600 on CTA). File: `/fonts/britti-sans-semibold.woff2`.
- `"Britti Sans Medium"` (500 file). File: `/fonts/britti-sans-medium.woff2`.
- `Inter` 400/600/700 already exist. ★ **Inter 900** is needed for `<strong>` inside the Terms H5 headings: `public/assets/pages/legal/inter-900-latin.woff2` (Framer asset `rZ5DdENNqIdFTIyQQiP5isO7M`, unicode-range latin). Add `@font-face{font-family:'Inter';font-weight:900;src:url('/assets/pages/legal/inter-900-latin.woff2') format('woff2')}`.
- ★ `"Pixelify Sans"` 400 for the Snake overlay text: `public/assets/pages/legal/pixelify-sans-latin.woff2` (Google Fonts, latin subset). Fallback stack `ui-monospace, monospace`.
- Rich-text Inter uses OpenType features: `font-feature-settings: "blwf","cv09","cv03","cv04","cv11"` (from the Framer presets). Apply them to the H5 and body text styles.

---

## 2. LegalPage template: layout

### 2.1 Breakpoints (measured on google-apis-disclosure)
| Range | Nav height (SHARED) | Wrapper | Title/Meta inner padding | Content column |
|---|---|---|---|---|
| ≥1100 | 106 | `width: calc(100% - 32px); max-width:1280px; margin: 0 auto` → x=80 at 1440, x=16 at 1280 and 1100 | `0 64px` | WrapperContent `padding-left:40px`; TOC spacer shown |
| 1000–1099 | 64 | same formula (x=16) | `0 64px` | same as desktop (TOC spacer shown, snake shown) |
| 810–999 | 64 | same formula (x=16) | `0 64px` | same, but **TOC hidden** (text column grows to 714 at 810) and **snake hidden** |
| ≤809 | 64 | same (x=16, w=vw-32) | `0 20px` | WrapperContent `padding: 0 24px 24px 0` |

The body has its own breakpoint at **1000px**, separate from the nav's 1100px. Bisected: TOC and snake are absent at 999 and present at 1000.

The wrapper starts directly under the nav (top = 106 / 64). There is no gap.

### 2.2 Structure (1440, y in page px)
```
Content-wrapper  [80,106,1280,…]  flex column, gap 0. Border 1px solid #E5E7EB on all 4 sides
                                   (drawn as an ::after inset, so it adds no layout size)
├─ Hero row       h=66   overflow:hidden. Border-bottom 1px dashed #E5E7EB. Empty except pixel decorations (2.4)
├─ Meta row       h=20   border-bottom 1px dashed. Inner Wrapper padding 0 64px, flex row, gap 10px, items centered
│    ├─ calendar icon 14×14 (x=144, y=175), /assets/pages/legal/calendar-icon.svg
│    └─ "Last Updated: …"  Inter 400 14px/20px, #818898 (x=168)
├─ Spacer row     h=24   border-bottom 1px dashed
├─ Title row      h=53 (one line) / 106 (two lines on mobile). Border-bottom 1px dashed. Wrapper padding 0 64px
│    └─ H1 box, max-width 780px (x=144)
├─ Spacer row     h=40   border-bottom 1px dashed
├─ WrapperContent  flex row, padding-left 40px, overflow clip
│    └─ inner column [120,309,1240,…]  padding 20px 0 44px 24px, flex row, gap 48px.
│         Border-left 1px dashed #E5E7EB (the vertical rule at x=120)
│         ├─ Content  max-width 768px, flex column, gap 20px (x=144)
│         │     └─ rich-text block(s), max-width 681px
│         └─ TableOfContent  w=320, position:sticky; top:120px; padding-top 32px. EMPTY on every page
│              (renders nothing, but it takes 320px + 48px gap, which is why text stops at x≈825).
│              Hidden below 1000px.
└─ (after the wrapper) CTA band (§4), then footer
```
Rich-text widths: 681 px at 1440 and 810, about 636 at 1100 (it shrinks with the TOC beside it), 310 at 390 (x=40). On mobile the dashed left rule sits at x=16, the wrapper's own left edge, with text indented 24px.

Dashed row separators run the full wrapper width (x 80→1360). The section **Separator** (privacy, and the end of terms) is a 40px-tall row inside the Content column. It draws dashed 1px #E5E7EB lines on top and bottom from the vertical rule (x=120) to the right border; the band is absolutely positioned and clipped by the content column. Each Separator also holds a section-number label (Inter 600 16px) in the 40px gutter at x≈97. **That label is clipped and invisible on the live site, so don't render it.**

### 2.3 Per-page content column
- **terms**: one rich-text block (97 children), followed by a Separator (40px, top margin = 20px gap). Body height ≈16.4k px at 1440.
- **privacy**: 8 section blocks, each followed by a Separator (gap 20 above and below), then two trailing blocks ("General", "How to contact us"). Those two have `background:#fff`, and the 40px spacer rows between them have **no** dashed lines. Every section block except the intro is `flex column, gap 24px` between the section heading and its sub-blocks.
- **sub-processors**: one rich-text block containing a single `<ul>`, no Separator.
- **google-apis**: one rich-text block with a single 2-line paragraph, no Separator.

After the inner column: bottom padding 44px, then the CTA band starts (its top border is the wrapper's bottom edge).

### 2.4 Pixel decorations (Hero/Meta/Spacer/Title rows)
Static 24×24 images, no animation (positions sampled over 6 s and they never change). Sources are 48×48 PNGs at 2x: `public/assets/pages/legal/pixel-{1..8}.png`. Place them as `position:absolute` children of the row they sit in. Each row clips its own overflow, so pixels that fall outside the row width disappear on narrow screens. Coordinates are relative to the wrapper's top-left corner, row in parentheses:

| # | file | anchor | 1440 pos (x,y) | rule |
|---|---|---|---|---|
| 1 | pixel-1 | right | 1232,0 (Hero) | `right:24px; top:0` |
| 2 | pixel-2 | right | 1256,0 (Hero) | `right:0; top:0` |
| 3 | pixel-3 | right | 1256,24 (Hero) | `right:0; top:24px` |
| 4 | pixel-4 | right | 1136,42 (Hero) | `right:120px; top:42px` (sits on the hero's bottom edge) |
| 5 | pixel-5 | right | 1256,86 (Spacer-24 row) | `right:0; top:0` within that row |
| 6 | pixel-6 | left | 821,110 (Title row) | `left:821px; top:0` |
| 7 | pixel-7 | left | 880,139 (Title row) | `left:880px; bottom:0` |
| 8 | pixel-8 | left | 632,139 (Title row) | `left:632px; bottom:0` |

Verified at 810 and 390: #1–5 track the right edge, #6–8 keep their fixed left offsets and are clipped off-screen on mobile. On mobile #7/#8 move to y=192, because the title row grows to 106px and they are bottom-anchored. Pixel art colours run from deep indigo (#1–4) to hatched violet/lilac (#5–8). Use `image-rendering:auto`.

---

## 3. LegalPage: typography and rich-text styles

### 3.1 Style table (identical at all widths unless noted)
| Role | Element | Family | Size / LH | Tracking | Weight | Color | Spacing |
|---|---|---|---|---|---|---|---|
| Page title | `h1` | Britti Sans Trial Semibold | 48 / 52.8 (1.1) | -0.96px (-0.02em) | 400 | #272835 | n/a. Wraps to 2 lines at 390 (318px box) |
| Date | `p` | Inter | 14 / 20 | normal | 400 | #818898 | n/a |
| Body paragraph (preset `14e7qbr`) | `p` / `div` | Inter | 16 / 30 | -0.32px | 400 (bold = 700) | #36394A | `margin-top:16px` when not first child |
| Inline bold (clause numbers "1.1", "1.1.1") | `strong` | Inter | 16 / 30 | -0.32px | 700 | #36394A | inline, followed by a space |
| **Terms** section heading (preset `rypoep`) | `h5` | Inter | 18 / 25.2 (1.4em) | -0.72px (-0.04em) | 700 | #000 | `margin-top:40px` when not first; the next body paragraph gets 16px. Text is UPPERCASE as authored (no text-transform) |
| Terms heading bold run | `h5 strong` | Inter | 18 / 25.2 | -0.72px | **900** | #000 | most headings are wrapped in `<strong>`, so they render at 900 |
| Terms numbered heading | `ol > li > h5` | as h5 | | | | | `ol` list-style decimal outside (Framer custom marker), `li` padding-left 24.28px. Used once ("2 RESTRICTIONS…"); other numbers are typed inline ("5 TERM AND TERMINATION") |
| **Privacy** intro heading | `p` | Britti Sans Medium | 32 / 32 | normal | 500 | #272835 | paragraph-spacing 32 (the next body p uses 16) |
| Privacy section heading | `p` (H2 role) | Britti Sans Medium | 24 / 24 (31.2 = 1.3 when wrapped to 2 lines) | -0.48px (-0.02em) | 500 (section 2 is authored at 400; use 500) | #272835 | 24px gap to the sub-blocks |
| Privacy sub-heading | `p` | Inter | 16 / 20.8 (1.3) | -0.32px | 600 | #36394A | body p after it: `margin-top:8px` |
| Privacy closing heading (preset `1kxxcgh`) | `h4` | Britti Sans Medium | 32 / 32 | -0.64px (-0.02em) | 400 | #000 | 24px gap to the body |
| Bulleted list (privacy) | `ul > li > p` | Inter | 16 / 30 | -0.32px | 400 | #36394A | `ul` margin-top 16px. `li` padding-left 20.19px, `list-style:none`. Bullet = `li::before{content:"•"; position:absolute; left:0; top:0; font-size:16px; color:#36394A; line-height:30px}` |
| **Sub-processors** list | `ul > li > p` | Inter | 16 / **32** | -0.32px | 400. Name = `span` 600 | #36394A | `li` padding-left 21.11px, same "•" bullet with 32px line-height. 13 items, no gaps between items (each li is 32px tall). Item pattern: **`Name`** + ` - ` (sometimes ` – `) + short purpose. Build fills it with placeholder vendor/purpose pairs |
| Link (preset `1maol95`, privacy body) | `a` | inherits (Inter 16/30) | | | 400 | **#A4ABB8**, hover **#ECEFF3** | `transition: color .2s cubic-bezier(0.44,0,0.56,1)`. No underline in either state |
| Link (google page) | `a > span` | inherits | | | 400 | #36394A, no hover change, no underline | The comma right after the link renders in `#5912FF` (it carries its own color span). Copy that quirk only if you want a pixel match |

No `<table>` exists on any of these pages. Sub-processors is a plain bulleted list, so there are no column headers to capture. No `h2`/`h3`, blockquote, code, `hr` or images appear in any body.

### 3.2 Heading inventory (heading text only)
- **Terms** (H5, in order): RIGHT TO ACCESS AND USE THE SOFTWARE · 2 RESTRICTIONS AND RESPONSIBILITIES (as an ol item) · *(empty H5 spacer)* · CONFIDENTIALITY · PAYMENT OF FEES · 5 TERM AND TERMINATION · 6 WARRANTY AND DISCLAIMER · 7 INTELLECTUAL PROPERTY RIGHTS INDEMNITY · 8 CUSTOMER DATA AND USAGE DATA · 9 LIMITATION OF LIABILITY · *(empty H5)* · 11 FORCE MAJEURE · Schedule 1 / DEFINITIONS AND INTERPRETATION · 12 MISCELLANEOUS. Each is followed by numbered body paragraphs (`**1.1** text`, `**1.1.1** text`, …).
- **Privacy**: Introduction (32px) → sections (24px): What Information Lightdash collects and why [subs: Information from website visitors · Usage data information from self-managed Lightdash instances · Use of Google User Data] · Lawful use of your personal data [para + 4-item bullet list] · Who do we share your data with? · How we use Artificial Intelligence (AI) features and the Model Context Protocol (MCP) [subs: What gets sent to the AI Agent. · What Lightdash stores for MCP sessions. · What Lightdash does NOT store for MCP.] · Where we hold and process your personal data · Your rights · Retention of personal data → H4: General · How to contact us.
- **Sub-processors**: no headings, only the list.
- **Google APIs**: no headings, one paragraph containing one inline link.

---

## 4. CTA band ("Snake Game CTA" component)

Sits after the wrapper on all four legal pages and shares the wrapper's x/width. **1440 geometry** (google page, CTA top y=433):

- **Band** `[80,433,1280,473]`: border-top 1px solid #E5E7EB, left/right borders continue the wrapper's. Background is a dot grid: base `#CDD2D9` with an overlay `background: linear-gradient(transparent 1px, #F6F8FA 0), linear-gradient(90deg, transparent 1px, #F6F8FA 0); background-size: 8px 8px;`, which gives 1px #CDD2D9 dots every 8px. Padding 64px. The card sits 73px from the top and 74px from the bottom.
- **Card** ("Stack") `[144,506,1152,326]`: bg `#1A1B25`, radius 0. Shadow: `0 0 0 1px rgba(39,40,53,.1), 0 24px 24px -12px rgba(39,40,53,.08), 0 12px 12px -6px rgba(39,40,53,.08), 0 6px 6px -3px rgba(39,40,53,.08), 0 2px 2px -1px rgba(39,40,53,.08)`. Flex row:
  - Left column 64px wide, with a 1px dashed `#36394A` right border. A 64×64 corner image sits top-left: `public/assets/pages/legal/cta-pixel-corner.png` (128×128 source; violet square top-right, hatched lilac square bottom-left).
  - Content column `[208,…,1024]`, flex column gap 28. Text block (398 wide, gap 24) is vertically centred (top at y=579):
    - Headline, 2 lines: "Ready to free up" / "your data team?". Britti Sans Trial Semibold 600, 56px/53.2px (0.95), -1.12px, #FFFFFF, left-aligned.
    - Buttons row, gap 16, top 25px below the headline:
      - Primary "Talk to our team" → `/start`. 179×50, padding 16px 32px, radius 6, bg #5E4CFF, label Inter 500 15/18 #F8FAFB. Hover: bg goes to `rgba(94,76,255,.7)`.
      - Secondary "Start for free" → `https://app.lightdash.cloud/register`. 156×50, padding 16px 32px, radius 6, bg `rgba(94,76,255,.2)`, label #B4ACFF. Hover: bg `rgba(94,76,255,.6)`, label `#DDD9FA`.
      - Hover transition is a Framer spring, `{type:"spring", bounce:0.2, duration:0.4}`. In CSS, `transition: background-color .4s cubic-bezier(.3,1.3,.5,1), color .4s` is a close equivalent.
  - A 1px dashed `#36394A` vertical line at x=608, between the text and the game.
  - **Snake game area** `[611,506,622,326]` (fills the rest of the card up to the right column).
  - Right column 64px with a 1px dashed `#36394A` left border.
- **1280**: band 1248 wide, card 1120, snake 590 wide. **1100**: snake 410 wide. **1000**: snake 310 wide.
- **810–999 (tablet variant)**: card `[80,464,650,326]` at 810 (it fills the band minus 64px padding). Headline unchanged (56px). Primary label becomes **"Sign up"** (118×50, still → `/start`). Secondary stays "Start for free". **No snake game in this range** (`.snk-stage` absent from 810 to 999). The text column takes 400px, with the dashed divider at x=544. At 1000–1099 the desktop card variant returns, with the snake 310–409px wide and the card 30px lower (y=494 vs 464).
- **≤809 (390)**: band `[16,558,358,492]`, padding 24px 16px. Card `[32,582,326,444]` becomes a **column**:
  1. Top band 40px tall with a 1px dashed bottom border, holding the corner image at **40×40**.
  2. Centered text block: headline 32px/35.2px, -0.64px. Line 1 #FFFFFF, **line 2 `rgba(255,255,255,.7)`**, centered (306 wide).
  3. Buttons 40px tall, padding 8px 12px, gap 16, centered: **"Start for free"** (primary, → `/start`) and **"Try live demo"** (secondary, → `https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home`).
  4. Dashed 1px line, then the snake area `[32,783,326,203]`.
  5. Bottom band 40px with a 1px dashed top border.

### 4.1 Snake mini-game (port from `reference/pages/snake-game-cta.framer-module.mjs`)
A self-playing Snake that becomes playable on click. It is pure DOM: absolutely positioned divs with SVG data-URI tiles. Constants are read from the module:

- Props: `background` (the CTA passes `rgba(26,27,38,0)`, i.e. transparent over the card), `block` = 30 (target cell px), `interactive` = true.
- Grid: `cols = clamp(round(w/block), 8, 80)`, `rows = clamp(round(h/block), 6, 60)`. Cells are integer device pixels, centred, with a +1px overlap. At 1440 a cell renders 29×29. The grid recomputes through a ResizeObserver.
- **Demo mode** (on load): spawns 5 food tiles staggered 240ms apart (`.snk-food.snk-spawning`, opacity 0→1 over 240ms). A 5-segment snake enters from below the board (start x = cols/2, heading up) and autopilots: A* to the nearest food with heuristic weight 1.8, falling back to the move with the largest flood-fill area. Tick **190ms**. Eating appends a segment using the food's tile, and the food fades out over 240ms. Once all food is eaten, the segments fade (`.snk-gone`, opacity over 320ms), are removed after 360ms, and 250ms later the cycle restarts.
- **Click / tap** (also from the "dead" state): clears the board, shows the score (`SCORE 0`, top 10px, right 14px, 16px, letter-spacing 1px, white at opacity .9). Snake = 3 segments at the centre heading right, plus 1 food. Overlay "READY?", then "GO!" at 800ms, then play starts at 1450ms. Overlays use `.snk-big` (34px, lh 1.1, ls 1px) with a `snk-pop` animation (260ms `cubic-bezier(.22,1,.36,1)`, scale .7→1 plus fade). While an overlay shows, the board dims to opacity .5 (200ms) and the overlay gets `backdrop-filter: blur(7px)`.
- **Play**: tick **135ms**. Controls are Arrow keys / WASD, swipes (24px threshold; a smaller movement counts as a tap) and 180° turns are ignored. Wall or self collision shows "GAME OVER" (34px) with "PLAY AGAIN?" below (16px, lh 1.5, opacity .82); click to restart.
- Cursor pointer, `touch-action:none`, no focus outline. Overlay text is Pixelify Sans in white. The complete CSS is in the dom dump. Respect `prefers-reduced-motion` (it disables `snk-pop`).

---

## 5. 404 / NotFound

### 5.1 Layout (1440)
```
Content-wrapper [80,106,1280,801]  flex column, items centered, overflow hidden.
                                   Border 1px solid #E5E7EB on top/left/right (no bottom; the footer follows)
├─ Stripe block A  h=115, border-bottom 1px solid #E5E7EB. Stacked full-width rows with heights
│     32,20,18,14,10,8,6,4,3. Every row except the first has a 1px solid #ECEFF3 top border, so the
│     lines get denser toward the image. Line y-offsets inside the block: 32,52,70,84,94,102,108,112 (+114 bottom).
├─ 404 art   408×192 at [516,221] (centred). /assets/pages/404/404-pixel.png (816×384 source, 2x)
├─ Stripe block B  h=115, mirror of A: rows 3,4,6,8,10,14,18,20,32, each with a 1px solid **#E5E7EB** top border
│     (B uses #E5E7EB, A uses #ECEFF3), plus border-bottom 1px solid #E5E7EB.
└─ Text block  padding 24px 0 180px, flex column, gap 20px, items centered
     ├─ "Oh zap!"  Britti Sans Medium 32px / 28.8px (90%), -0.64px (-0.02em), weight 400, #272835, centred
     ├─ "The page you're looking for has been struck by lightning and no longer exists..."
     │      Inter 400 18px/32px, -0.18px (-0.01em), #666D80, centred, max-width 545px (2 lines)
     └─ Button "Go back home" → "/" : 140×42, padding 12px 20px, radius 6px, bg #5E4CFF, 1px inner border #4835F2
            (use an inset box-shadow or ::after), label Inter 500 15px/18px, -0.3px, #FFFFFF.
            Hover: no visual change measured.
```
After the wrapper (y=907) comes the footer (SHARED), with no CTA band.

### 5.2 Responsive
- **810**: wrapper `[16,64,778,797]`. Art stays 408×192, centred. Everything else matches desktop.
- **390**: wrapper `[16,64,358,701]`. Stripe blocks stay 115px. **Art shrinks to 230×108** (top y=179). Body text becomes **18px/24px** in a 358 box (2 lines, 48px tall). Heading and button unchanged. Text block padding is still 24/180.

### 5.3 Motion: glitch loop on the 404 art (measured with `getAnimations()`)
The art is stacked in 7 identical layers in one grid cell (`grid-area:1/1/-1/-1`), on top of a static base `<img>`. All layers run one infinite WAAPI animation: **duration 1500ms, `steps(23, jump-start)`, 23 keyframes, iterations Infinity**.
- **Layer 0** (visible): `transform: translate3d(0,0,0)` everywhere except keyframes 12–16 (offsets 0.545–0.727, i.e. ≈818–1091ms of each cycle), where it jumps to random offsets, e.g. `(-4.2%,-4.3%)`, `(12.2%,-5.2%)`, `(17%,-8.7%)`, `(-4.3%,-5.9%)`, `(-0.2%,0.6%)` (x and y up to about ±17% / ±15%).
- **Layers 1–6** (normally `opacity:0`, `pointer-events:none`): on those same 5 keyframes they get `opacity:1`, a horizontal slice `clip-path: polygon(100% a%, 100% b%, 0% b%, 0% a%)` (slice height 2–15%, random position), `filter: hue-rotate(R)` with R random in about [-30°, 226°], and `transform: translate3d(X%,0,0)` with X random in about ±23%. All other keyframes: `opacity:0; clip-path:unset; transform:none`. Each layer also has a tiny static `hue-rotate(±0.6–3.5deg)`.
- The random values are regenerated on every page load, so any random set in these ranges will match. The visible result: about 1s of calm, then a ~270ms burst of 5 hard-cut frames of sliced, colour-shifted, horizontally torn copies, repeating every 1.5s.
- Respect reduced-motion: show only the static image.

---

## 6. Motion summary

| Where | What | Trigger | Timing |
|---|---|---|---|
| All legal pages | none on load: no appear/scroll animations (`getAnimations()` empty, no `opacity:0` appear nodes). Pixel decorations are static | n/a | n/a |
| Privacy body links | color #A4ABB8 → #ECEFF3 | hover | `.2s cubic-bezier(.44,0,.56,1)` |
| CTA buttons | bg/label color (§4) | hover | spring, bounce .2, 0.4s |
| CTA Snake | autoplay + playable game (§4.1) | load / click | ticks 190ms (demo) / 135ms (play) |
| 404 art | glitch loop (§5.3) | load, infinite | 1500ms, steps(23, jump-start) |
| 404 button | none measured | hover | n/a |

---

## 7. Assets (downloaded)

| File | Source | Size | Use |
|---|---|---|---|
| `public/assets/pages/legal/pixel-1.png` … `pixel-8.png` | framerusercontent `w3GZQSkY…`, `JQXhyKop…`, `TfNdlhOi…`, `hhY6K66B…`, `6iQ6o98L…`, `wsWOGCDd…`, `CpvsgbkaA…`, `ART6Db8L…` | 48×48 PNG, rendered 24×24 | header pixel decorations (§2.4, same order) |
| `public/assets/pages/legal/cta-pixel-corner.png` | `Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png` | 128×128 PNG, rendered 64 (40 on mobile) | CTA card corner |
| `public/assets/pages/legal/calendar-icon.svg` | inline SVG symbol from the page (viewBox 0 0 13.333 14.167, stroke #A4ACB9, width 1.667, square caps) | 14×14 | Meta row icon |
| `public/assets/pages/404/404-pixel.png` | `ypIZYVZhbxARYr4kOiG7cC1OL2Q.png` | 816×384 PNG, rendered 408×192 (230×108 mobile) | 404 art (all 8 layers) |
| `public/assets/pages/legal/inter-900-latin.woff2` | Framer asset `rZ5DdENNqIdFTIyQQiP5isO7M` | woff2 | Inter 900 for Terms H5 `<strong>` |
| `public/assets/pages/legal/pixelify-sans-latin.woff2` | Google Fonts Pixelify Sans v3, latin | woff2 | Snake overlay text |
| `reference/pages/snake-game-cta.framer-module.mjs` | `framerusercontent.com/sites/2Mblhz2Y9t7gks8XrJrAVl/rmEAnlsaY.CHTD212Q.mjs` | 53 KB | Snake logic + tile SVGs (reference only, not a runtime asset) |
| `reference/pages/snake-game-cta.dom.html` | live DOM | 25 KB | Snake CSS + markup |

The snake's segment and food tiles are inline SVG data URIs: 32×32 radial-gradient squares in lilac/violet, with a 45° soft-light hatch in `#A499FF`. They are not files. Copy the `fe` array from the module.

---

## 8. Gaps / caveats
- The TableOfContent column is empty on every page (an unfilled Framer placeholder). Reproduce it as an empty 320px sticky spacer at ≥1100 so the text width matches. Don't invent a TOC.
- The privacy section-number labels in the Separator gutter ("1", "2", "2", …) exist in the DOM but are clipped and invisible. Omit them.
- The privacy section-2 heading is authored at weight 400 while the others are 500. This is probably an authoring slip; 500 is recommended.
- The 404 button hover state was measured with Playwright `hover()`: no bg/border/opacity change was detected. A Framer hover variant might only trigger with a real pointer, so treat this as unconfirmed.
- The CTA button labels and links differ per breakpoint (desktop "Talk to our team"/"Start for free"; 810 "Sign up"/"Start for free"; mobile "Start for free"/"Try live demo"). This is reproduced as measured.
- The CTA band spacing (73/74px card inset at 64px padding) comes from nested Framer wrappers. Use the measured offsets.
