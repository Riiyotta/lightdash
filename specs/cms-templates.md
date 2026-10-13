Source: https://www.lightdash.com/

# Lightdash CMS templates: blog, blog categories, blog posts, customer stories, events

Measured live on 2026-10-13 with headless Chromium (Playwright 1.63, DPR 1) at **1440×900**, **810×900** and **390×900**. Every value comes from `getComputedStyle` / `getBoundingClientRect` unless it is marked *(screenshot)*. All y values are document coordinates at 1440 (page top = 0, nav = 0–106).

**Not in this file.** Navbar and footer belong to `specs/SHARED.md`. On every template here the nav is the **light / white variant** (bg `#FFFFFF`, 106 px tall, bottom hairline `1px solid #E5E7EB`; 64 px tall below 1100 px). Footer = dark `#1A1B25` block, 600 px tall at 1440/810 and 826 px at 390. The **"Ready to free up your data team?" snake CTA** (§1.6) appears on these pages and also on `/conversational-analytics`. It is specced here because SHARED.md did not exist when this was written. If SHARED.md later covers it, prefer that version.

**Content rule.** Article, story and event bodies were **not** copied. Build fills them with neutral placeholder rich text using the styles in §4. Metadata is in `specs/cms/*.json`. Images are in `public/assets/cms/`.

Reference screenshots (full page, Intercom hidden) are in `reference/pages/`:
`blog-index-1440/390.png`, `blog-category-1440/390.png`, `blog-category-empty-1440.png`, `blogpost-1440/390.png` (sample: *introducing-dashboards-as-code*), `customer-stories-index-1440/390.png`, `customer-story-1440/390.png` (sample: *ollie*), `event-1440/390.png` (sample: *lightdash-at-coalesce-2025*).

---

## 0. Inventory

| Template | Route | Count | Data |
|---|---|---|---|
| Blog index | `/blog` | 1 page, lists 62 posts (9 per page + Load More) | `specs/cms/blog.json` |
| Blog category | `/blog-categories/:slug` | 11 pages (5 with posts, 6 empty) | `specs/cms/blog-categories.json` |
| Blog post | `/blogpost/:slug` | 62 | `specs/cms/blog.json` |
| Customer stories index | `/customer-stories` | 1 page, lists 11 stories | `specs/cms/customer-stories.json` |
| Customer story | `/customer-story/:slug` | 12 (`ubie-jp` is unlisted, Japanese) | `specs/cms/customer-stories.json` |
| Event | `/events/:slug` | 4 (there is **no events index page**) | `specs/cms/events.json` |

Category counts: Product 31, Building Lightdash 13 (slug `ecommerce`), Feature Friday 9 (`feature-fridays`), News 7 (`company`), Events 2 (`events`). These have 0 posts: `marketplace`, `data-observability`, `transformation`, `alerts-sharing`, `version-control`, `warehouse`.

Assets (all under `public/assets/cms/`, 129 files, 17 MB):
- `blog/<post-slug>.<ext>`: 62 card thumbnails. These double as cover / og images. Originals wider than 1600 px were resized to 1600 wide (original dims are in the JSON).
- `blog/authors/<name>.<ext>`: 15 author avatars.
- `customer-stories/logos/<company>.<png|svg>` (11), `people/<slug>-avatar.*` (12), `banners/banner-*.png` (3 shared pixel banners), `decor/card-corner-{a,b}.png`.
- `events/icons/event-{format,location,date,extra}.png` (4) and `events/og/*` (4).
- `shared/`: blog header pixel art, post-header pixel squares (`post-pixel-1..7.png`), CTA pixel art (`cta-corner-pixels.png`, `inline-cta-pixels.png`), `snake-cell-0..6.svg` (snake CTA cell textures, extracted from inline data URIs), `chevron-right-small.svg` ("Read full story" chevron), and `search-magnifier.svg`. The manifest is `specs/cms/shared-decor.json`.
- New fonts for rich text, added to `public/fonts/`: `inter-400-italic-latin.woff2` (framer `pKRFNWFoZl77qYCAIp84lN1h944`), `inter-700-italic-latin.woff2` (`QxmhnWTzLtyjIiZcfaLIJ8EFBXU`), and `fragment-mono-400-latin.woff2` (Google Fonts, `4iCr6K5wfMRRjxp0DA6-2CLnB4NHhg`). Inter 700 is already present as `inter-700-latin.woff2`.

---

## 1. Shared building blocks (all templates)

### 1.1 Page frame (the "blueprint" grid)
- Body bg `#FFFFFF`. Root has `padding-top:106px` (desktop nav) or `64px` (<1100).
- **Frame column**: centered box, **1280 wide at x=80** (1440). At 810 it is x=16, w=778; at 390 it is x=16, w=358. It has a `1px solid #E5E7EB` border on all 4 sides, drawn as an absolutely positioned `::after` with inset 0. It runs from the nav bottom to the footer top.
- **Horizontal rule rows**: the header area is a vertical stack of full-frame-width rows. Each row has a `1px dashed #E5E7EB` **bottom** border (again an `::after`). Empty spacer rows (20/24/32/40/100 px tall) give the "graph paper" look. Row heights are listed per template.
- **Content gutter**: text inside the frame starts at **x=144** (64 px inside the frame) at 1440, and at **x=40** (24 px inside) at 810 and 390. Blog index/category title rows use 24 px (x=104) at every width.
- Inner columns use `1px dashed #E5E7EB` **left/right** borders (`::after`).
- Breakpoints (Framer): desktop ≥1100, tablet 810–1099, phone <810.

### 1.2 Colors used by the templates
| Token | Value | Use |
|---|---|---|
| ink | `#272835` | headings, H1, card titles, active pill text, TOC active |
| body | `#36394A` rgb(54,57,74) | rich-text paragraphs, lists, sidebar copy |
| muted | `#818898` rgb(129,136,152) | meta text, breadcrumb links, inactive pills, TOC items, dates |
| muted-2 | `#666D80` | subtitles, "Read full story", person role |
| dot | `#C1C7D0` | "·" separators, breadcrumb "/" |
| title-grey | `#A4ACB9` | "posts" in "Lightning posts" |
| story-title | `#1F1F1F` | customer story card title |
| frame | `#E5E7EB` | frame + dashed lines |
| surface | `#F8FAFB` | story card bg, sidebar wells, Search button bg |
| pill-active | `#F6F8FA` | active filter pill bg, blog card hover bg, dot-grid bg |
| purple | `#5E4CFF` | links, blockquote bar, story card hover text, CTA buttons |
| quote-bg | `#F8F7FF` | blockquote background |
| dark | `#1A1B25` | inline CTA, snake CTA panel, event CTA button, footer |
| code-bg | `#161820` rgb(22,24,32) | code block |
| tag-bg | `rgba(243,237,252,0.7)` / border `#D8D5F5` / text `#7668F7` | event tag pill |

### 1.3 Fonts (CSS family names as on the live site)
- `"Britti Sans Trial Semibold"` (`public/fonts/britti-sans-semibold.woff2`): page H1, rich-text H2, "Related …" H2, story stats, snake CTA headline. Rendered at font-weight 400 (600 on the snake CTA). It is a single-weight file.
- `"Britti Sans Medium"` (`britti-sans-medium.woff2`): blog card titles (H6), rich-text H3, TOC heading, inline CTA title, sidebar values, event subtitle, event tag.
- `Inter` 400/500/600/700, italic 400/700: all UI and body text.
- `"Fragment Mono"` 400: inline `code` and code blocks.
- The TOC buttons use the **generic `sans-serif`** at 14 px (they inherit no family). This renders as Helvetica/Arial. Reproduce it exactly with `font-family: sans-serif`.

### 1.4 Blog post card (variant A). Used by `/blog`, `/blog-categories/*` and "Related articles"
Grid cell = `<a>` **427×472** (1440; 3 columns spanning the 1280 frame, x = 80 / 507 / 933). At 810: 389×472, 2 columns. At 390: 358×472, 1 column. The 3 cells fill the frame width exactly.
- Inner card is centered in the cell: **368×448** at 1440 (29.5 px side gutters, x=109 within cell 80). At 810 it is 341×448 with a 24 px gutter. At 390 it is 310×448 with a 24 px gutter. Card has a `1px dashed #E5E7EB` left+right border. Below the card is a 24 px strip that continues the same dashed L/R lines. Two full-cell-width 1px dashed horizontal lines sit at card-bottom (y+447) and cell-bottom (y+471).
- **Thumbnail**: full card width × **217 px**, `object-fit:cover`, centered. Overlay `::after` border `1px solid rgba(0,0,0,0.06)`. Radius 0. At 390 the live site uses `object-fit:contain` inside the same 310×217 box.
- **Body**: 368×231, bg `#FFFFFF`, padding **24px**, flex column.
  - Meta row at body-top+24: category `Inter 14px/22.4px 400, ls −0.28px, #818898`, then a 4 px gap, then "·" `Inter 14px/14px 500 #C1C7D0`, then a 4 px gap, then `<time>` `Inter 14px/14px 400 #818898` (format "October 9, 2026").
  - Title `<h6>` at meta+34 (y 727 for card top 452): `"Britti Sans Medium" 24px/33.6px 400, ls −0.48px, #272835`. Width 320. **Clamped to 3 lines with an ellipsis** (101 px max; see "…to automate project…").
  - Author row is pinned to the body bottom (top = card top + 392; body padding-bottom 24): avatar **32×32** (bg `#E8E8E8`, `object-fit:contain`, radius 0), a 10 px gap, then name `Inter 14px/22.4px 400, ls −0.28px, #272835`. A hidden 32×32 `#364AFF` overlay (opacity 0) sits on the avatar. It never became visible in testing, so ignore it.
- **Hover** (whole card is a link): body bg `#FFFFFF → #F6F8FA`. Polled: 60 ms `#FBFCFD`, 180 ms `#F6F8FA` (done). Use `transition: background-color 0.2s ease`. Nothing else changes (no lift, no image zoom).
- No excerpt and no read time anywhere.

### 1.5 Customer story card (variant B). Used by `/customer-stories` and "Related stories"
Cell `<a>` **640×326** (1440, 2 columns). Left cell padding `0 24px 0 64px`, right cell padding `0 64px 0 24px`. Cell bottom border `1px dashed #E5E7EB`.
- Inner card **552×326**, bg `#F8FAFB`, `1px dashed #E5E7EB` L/R.
  - Header row 552×70, padding `44px 0 4px 32px`, bottom border `1px dashed #E5E7EB`. Customer logo `<img>` box **520×22**, `object-fit:contain; object-position:0% 0%` (left-aligned, 22 px tall).
  - Corner pixel decor **65×65** at the card's top-right corner (absolute, top 0 / right 0). It alternates: left-column cards use `decor/card-corner-a.png` (128² source) and right-column cards use `card-corner-b.png` (64² source).
  - Title at card-top+160: `Inter 20px/28px 500, ls −0.4px, #1F1F1F`, width 488 (32 px side padding).
  - "Read full story" sits 12 px below the title: `Inter 15px/18px 400, ls −0.32px, #666D80`, then a 10 px gap, then the chevron `shared/chevron-right-small.svg` (5×7, vertically centered).
  - Bottom 32 px padding, then a **48 px white strip** (`#FFFFFF`, 552 wide; 40 px at 390) with a 1px dashed top line spanning the cell. Card height = 160 + title height + 12 + 18 + 32 + 48 (= 326 for 2-line titles). At 810/390 the title wraps to 4 lines, so the cards are 382/374 tall.
- **Hover**: card bg `#F8FAFB → #F8F7FA` (≈250 ms; at 150 ms it reads `#F8F8FA`). "Read full story" color `#666D80 → #5E4CFF` (50 ms `#656B8F`, 150 ms `#5F52EE`, 250 ms done), and the chevron turns purple too (the SVG is swapped). Use `transition: all 0.25s ease`.
- 810: 2 columns, cell 389 wide, inner 301. 390: 1 column, cell 358, inner 310, padding 0 24px.

### 1.6 "Ready to free up your data team?" snake CTA (pre-footer). On blog index, categories, stories index and events. **Not** on blog posts or story pages.
- Wrapper: 1280×473 (frame width, x=80). bg `#CDD2D9` overlaid with an 8 px dot grid: `background-image: linear-gradient(transparent 1px, #F6F8FA 0), linear-gradient(90deg, transparent 1px, #F6F8FA 0); background-size: 8px 8px`. This shows 1 px `#CDD2D9` dots every 8 px. **Exception, `/blog` index only**: the wrapper is 968 wide centered (x=236), with the inner panel 840 wide (x=300).
- Panel **1152×326** (x=144, 75 px from wrapper top, 72 px bottom). bg `#1A1B25`, `box-shadow: 0 0 0 1px rgba(39,40,53,0.1), 0 24px 24px -12px rgba(39,40,53,0.08)`. Columns: 64 px gutter (right border `1px dashed #36394A`) holding `shared/cta-corner-pixels.png` 64×64 at its top. Then the text column. Then a 1 px dashed `#36394A` divider at panel x+464. Then the game area (622 wide; 310 on the /blog variant). Then a 64 px right gutter (left border dashed `#36394A`).
- Headline (2 lines): `"Britti Sans Trial Semibold" 56px/53.2px 600, ls −1.12px, #FFFFFF`. "Ready to free up" / "your data team?" at panel-top+72. Buttons 24 px below.
  - "Talk to our team" 179×50, bg `#5E4CFF`, radius 6, padding `16px 32px`, `Inter 15px/18px 500 #F8FAFB` → `/start`.
  - "Start for free" 156×50, 16 px to the right, bg `rgba(94,76,255,0.2)`, label `#B4ACFF` → `https://app.lightdash.cloud/register`.
- Game area: a snake made of 30×29 cells (`shared/snake-cell-*.svg`, purple/lavender dithered squares, drawn on a 30 px grid). It **auto-plays** (moves 1 cell about every 125 ms, wraps around the area) and starts the moment it mounts. Cells fade with `transition: opacity 0.24s` (head/food) or `0.32s` (body). Whole area `cursor:pointer`. Clicking starts a playable game (arrow keys). "SCORE 0" label (`"Pixelify Sans" 16px, ls 1px, #FFFFFF`, top-right of the area) goes from opacity 0 → 0.9 when playing. A `snk-message` overlay (opacity 0) exists for game-over text. Pixelify Sans was not downloaded (gap). Fall back to Press Start 2P or self-host Pixelify Sans from Google Fonts.
- 390: **the live site does not adapt this block**. It stays 968 wide and is clipped by the frame (headline cut off; see `blog-index-390.png`). Recommended: replicate the clip, or stack it at your discretion (flagged as a gap).

### 1.7 Inline post CTA (blog posts and customer stories, end of the main column)
- Box = main column width (784 at 1440 on posts, 832 on stories). bg `#1A1B25`, padding `32px 0`. Inner block has `1px dashed rgba(228,230,235,0.2)` top and bottom, padding `0 57px 0 40px`, height 152.
- Title "Ready to free up your data team?" `"Britti Sans Medium" 24px/28.8px 400, ls −0.48px, #FFFFFF`. 4 px gap. Subtitle `Inter 16px/19.2px 400, ls −0.32px, #C1C7D0`.
- Buttons are bottom-aligned (60 px under the subtitle), 10 px apart, both 40 tall, radius 6, padding `0 20px`, `Inter 15px/18px 500`:
  - "Talk to our team" 155 wide, bg `#FFFFFF`, border `1px solid #DFE1E7`, text `#272835` → `/start`.
  - "Start for free" 132 wide, transparent, border `1px solid #666D80`, text `#FFFFFF` → register URL.
- Right: `shared/inline-cta-pixels.png` at **109×152**, flush to the right padding, full inner height.
- 390: padding `0 16px`, title wraps (58 tall), image moves below the buttons and is centered (box 412 tall).

### 1.8 Breadcrumb
`Inter 14px/20px 400`. Links are `#818898`. Hover → `rgba(129,136,152,0.6)`, `transition: color 0.2s cubic-bezier(0.44,0,0.56,1)`. Separators: posts use "·" `#C1C7D0` with 6 px gaps; stories use "/" `#C1C7D0`. The current item is plain `#818898` text.

### 1.9 Motion summary
- **No Framer appear or scroll-reveal animations** on any of these templates. There are no `data-framer-appear-id` nodes apart from one static decor pixel, and nothing below the fold starts hidden. All content is visible on load.
- Hovers: blog card bg (0.2 s), story card bg + link color (≈0.25 s), filter pill text color, breadcrumb color (0.2 s cubic-bezier(.44,0,.56,1)), and TOC item color (`transition: color 0.2s`; no hover change observed, color changes only on active).
- Snake CTA: continuous JS animation (§1.6).
- TOC click: smooth scroll (≈800 ms, ease-out). The target heading lands at **100 px** from the viewport top.
- Load More: about 1.0–3.0 s network delay before the next 9 cards are appended. They appear instantly, with no fade.

---

## 2. `/blog` index and `/blog-categories/:slug` (same template)

`<title>`: `/blog` = "Lightning Posts | Lightdash"; categories = "<Name> - Lightdash" (e.g. "Product - Lightdash"). The H1 is "Lightning posts" on **every** category page too. The category is shown only by the active pill.

### 2.1 Header rows (1440; frame x=80..1360)
| y | h | Content |
|---|---|---|
| 106 | 168 | Spacer row. `shared/blog-header-pixels.png` **762×168** (`object-fit:cover`) pinned top-right of the frame (x=598). |
| 274 | 50 | Title row. H1 at x=104 (24 px gutter), box top 268 (overhangs the row by 6 px): "Lightning" `#272835` + " posts" span `#A4ACB9`, `"Britti Sans Trial Semibold" 56px/56px 400, ls −2.24px` (−0.04em). `shared/blog-title-pixels.png` **193×50** at x=831 in the same row. |
| 324 | 40 | Spacer |
| 364 | 56 | Filter bar, padding `8px 0`, inner x 104..1336 |
| 420 | 32 | Spacer, then the card grid starts at y=452 |

810: rows 64→184 (120, pixel image 762×168 at x=32, overflowing), title row 184 (50; H1 48px/48px, ls −1.92px, at x=40), spacer 40, filter 274 (56), spacer 32, grid at 362. 390: rows 64→136 (72, pixel image offset x=−388 so only its right part shows), title 136 (44; H1 40px/44px, ls −0.8px), spacer 40, filter 220, spacer 32, grid at 308.

### 2.2 Filter pills + search
- Pills are links, 40 tall, padding `8px 16px`, gap 8, radius 0, label `Inter 15px/24px 500, ls −0.3px`.
- Order: **All posts** (`/blog`), **Building Lightdash** (`/blog-categories/ecommerce`), **Events**, **Feature Friday** (`feature-fridays`), **News** (`company`), **Product** (`product`). Widths 91/159/78/130/71/86.
- Inactive: transparent bg, text `#818898`. Hover: text → `#272835` (bg unchanged). Active (current route): bg `#F6F8FA`, text `#272835`. On `/blog` "All posts" is active. On a category page that category is active. On the 6 empty categories nothing is highlighted, because they are not in the bar.
- **Search** button, right-aligned (x=1243, 93×35): bg `#F8FAFB`, `::after` border `1px solid #ECEFF3`, radius 0, padding 10. Contents: 13×12 magnifier (`shared/search-magnifier.svg`, stroke 1.5 black), a 10 px gap, then "Search" `Inter 15px/15px 500 #272835`.
- A 40×40 white→transparent fade (`linear-gradient(#FFF 0%, rgba(255,255,255,0) 100%)` rotated 90°, i.e. a right-to-left fade) sits immediately left of Search. At <1100 the pill row scrolls horizontally (`overflow-x:auto`, pills keep their widths and run under the fade and the Search button, which stays pinned right).
- **Search modal** (Framer site search): opens on click. Page dims to `rgba(0,0,0,0.8)` *(screenshot pixel: white → #333)*. Panel **500 wide**, centered, top at y=195 (viewport), bg `#FFFFFF`, radius **16**, `box-shadow: 0 20px 40px rgba(0,0,0,0.2)`. Input row 56 tall, padding `12px 20px`, magnifier icon (#333 stroke, 16px), input `Inter 16px #333`, placeholder "Search..." `rgba(0,0,0,0.4)`, and a clear (×) circle icon on the right. Results (live, searches **all** site pages, including customer stories) appear below the input row. Each row is 460 wide, x+20, about 73 px pitch. Title `Inter 14px/19.6px 500 #333`. Path line (`/blogpost/slug`) `Inter 12px/16.8px 500 rgba(0,0,0,0.4)`. Keyboard-selected row bg `#F3F3F3`. Implement as a client-side search over blog + stories JSON.

### 2.3 Grid + pagination
- 3/2/1 columns of card variant A (§1.4). Row pitch 472.
- **9 cards initially**. "Load More" button centered 40 px below the grid: 100×40, bg `#272835`, radius 0, label `Inter 14px/16.8px 600 #FFFFFF`. No hover change measured. Each click appends the next 9 (about 1–3 s delay on the live site; you can append instantly). The button disappears once everything is shown. `/blog` reaches 62 after 6 clicks. On categories it hides when the count is ≤ shown (Product 31 = 3 clicks, Building Lightdash 13 = 1 click, Feature Friday 9 / News 7 / Events 2 = no button).
- Sort: date descending (see `blog.json` order).
- After the grid (or button): a 25 px white strip with dashed top/bottom and solid L/R frame lines, a 100 px gap, then the snake CTA (§1.6) at y=1967 (1440, 9 cards), then the footer.
- **Empty category** (e.g. `/blog-categories/warehouse`): filter bar, then the 32 px spacer, the 25 px strip, then the CTA directly (page height 1625). No "no posts" message.

---

## 3. `/blogpost/:slug`

`<title>`: "<Post title> | Lightdash". og:image = the card thumbnail.

### 3.1 Header (1440)
| y | h | Content |
|---|---|---|
| 106 | 66 | Spacer row. Decorative 24×24 pixel squares (`shared/post-pixel-1..7.png`) scattered at the top-right: (1312,106), (1336,106), (1336,130), (1231,148), (1336,192), (948,216), (1007,245). The positions are fixed per template, not per post. |
| 172 | 20 | Breadcrumb at x=144: "Blog" → `/blog` · "<Category>" → `/blog-categories/<slug>` · "<Post title>" (§1.8) |
| 192 | 24 | Spacer |
| 216 | 53+ | H1 `"Britti Sans Trial Semibold" 48px/52.8px 400, ls −0.96px, #272835`, max width **780**, wraps |
| +H1 | 24 | Spacer |
| | 41 | Author row (inner row x=120..1320, padding `0 24px`, height 41 incl. 1px border): avatar **40×40** (`object-fit:cover`, radius 0) then a 12 px gap. Name `Inter 14px/22.4px 400 #272835`, then 6 px "·" `#C1C7D0`, then date `Inter 14px/20px 400 #818898` ("January 10, 2025"). |
| | 40 | Spacer, then the body columns start (y=374 for a 1-line H1) |

### 3.2 Body columns (≥1100)
- Container x=144..1296 (1152) with dashed L/R borders.
- **Main column**: x=144, **784 wide**, right border dashed. The rich text column inside is **681 wide** at x=144 (no left padding; right 103 px empty).
- **TOC column**: x=928..1296 (368). Contents start at x=976 (48 px left padding).
  - Wrapper `position: sticky; top: 78px`.
  - "Table of contents" `"Britti Sans Medium" 18px/20px 400 #272835` at body-top+32.
  - List 24 px below: `<ul>` 320 wide. Each `<li>` is 21 px (35 for 2 lines), with 8 px between items.
  - Each item is a `<button>`, full width, padding-left **16px**, `sans-serif 14px/normal 400`, text-align left. Color `#818898`; active `#272835`; `transition: color 0.2s`.
  - Active indicator: a **1×16 px `#000000` bar** (`<span>`) at the li's left edge, vertically aligned with the first text line (height = button height for multi-line). Only on the active item.
  - Active item = the last H2/H3 whose top has passed about 100 px from the viewport top (scroll-spy). Items are generated from the post's headings, plus a final "Related articles" item that scrolls to the related section.
  - Click → smooth scroll, heading top at 100 px.
- Rich text starts at body-top (no top margin on the first child).
- After the rich text: 40 px, then the inline CTA (§1.7) spanning the main column (784), then 64 px of empty main column.

### 3.3 Related articles (all posts)
- Frame line `1px solid #E5E7EB` at the top. 58 px spacer. Then a 40 px header row with dashed top+bottom: H2 "Related articles" `"Britti Sans Trial Semibold" 32px/28.8px 400 #272835` at x=120 (inner row padding `0 40px`). Right: "See all posts" button 131×40, bg `#F8FAFB`, border `1px solid #DFE1E7`, radius 6, padding `0 20px`, `Inter 15px/18px 500 #272835` → `/blog`.
- 48 px spacer, then **3 cards of variant A** (§1.4). Live behavior: **always the 3 most recent posts site-wide** (the current post can be one of them). They are not category-matched.
- 64 px, then the footer. **No snake CTA on post pages.**
- No share buttons, no tags, no read time, no author bio, no comments.

### 3.4 Responsive
- **810**: TOC hidden. Main column = full inner width (x=40, 730 wide). Header gutters 24 px (x=40). H1 48px/52.8px. Breadcrumb at y=130. Related cards in 1 column but kept at 368 wide, centered in a 778 cell. Related header H2 32px/28.8px.
- **390**: H1 **36px/39.6px**, ls −0.96px, width 310. Author row: avatar 40, name `Inter 16px/25.6px 400, ls −0.32px, #666666`, **date hidden**. Rich-text H2 **28px/28px**. Body x=40, width 310. Related header stacks: H2 "Related articles" **40px/40px** with "See all posts" below it (row 96 tall). Cards are 1 column, 358 cell / 310 card.

---

## 4. Rich-text styles (blog posts, customer stories and events share one Framer RichText style)

Container is `display:flex; flex-direction:column`. Margins are top-only. The **first child has margin 0**. Vertical rhythm = the `margin-top` of the following element.

| Element | font-family | size / line-height | weight | letter-spacing | color | margin-top | Other |
|---|---|---|---|---|---|---|---|
| `p` | Inter | 16px / 30px | 400 | −0.32px | `#36394A` | 16px | white-space: pre-wrap |
| `h2` | "Britti Sans Trial Semibold" | 32px / 32px (390: 28/28) | 400 | −0.64px | `#272835` | 40px (0 if first) | margin-bottom 0; following p gets its 16px |
| `h3` | "Britti Sans Medium" | 32px / 36px | 400 | −0.64px | `#272835` | 32px | |
| `h4` | Inter | 16px / 19.2px | 400 | normal | `#000000` | 20px | Unstyled in the live Framer style. Renders like plain black text. Reproduce as-is. |
| `h1/h5/h6` in body | not present in any of the 62 posts / 12 stories | | | | | | Use the h4 treatment if needed |
| `strong` | Inter | inherit | 700 | inherit | inherit | | |
| `em` | Inter Italic | inherit | 400 | inherit | inherit | | font-style italic |
| `a` | Inter | inherit | 400 | inherit | `#5E4CFF` | | no underline, no hover change; `transition: color 0.2s cubic-bezier(0.44,0,0.56,1)` |
| `ul` / `ol` | | | | | | 20px (stories 24px) | padding 0. The list is a flex column with no gap. |
| `li` | Inter | 16px / 30px | 400 | −0.32px | `#36394A` | 0 | `padding-left: 20.19px`; `list-style: none`. ul marker = `::before` "•" (8.69px wide, color `#36394A`, absolutely positioned at left 0). ol = `list-style-type: decimal` outside, same 20px indent. Text sits in an inner `<p>` (margin 0). |
| `blockquote` | | | | | | 20px | bg **`#F8F7FF`**, padding **`20px 20px 20px 22px`**, radius 0. Left bar = `::before` **2px wide `#5E4CFF`**, full height. Inner p: Inter 16px/**29.92px**, −0.32px, `#36394A`. Attribution lines are `<em>` after `<br>`s in the same p. |
| inline `code` | "Fragment Mono" | 16px / 30px | 400 | −0.32px | `#333333` | | bg `rgba(0,0,0,0.1)`, padding `1.6px 3.2px` (0.1em 0.2em), radius 6px |
| code block | "Fragment Mono", monospace | 14px / 21px | 400 | normal | `#EEEEEE` | 20px | Sandpack/CodeMirror component: wrapper radius **15px**, bg **`#161820`**, overflow hidden. `.cm-content` padding **30px**, each line padding `0 2px 0 4px`. Syntax: punctuation/colon `#999999`, keys `#77DDDD`, keywords `#00BBFF`, default `#EEEEEE`. No copy button, no line numbers, no filename tab. Height = lines × 21 + 60. |
| `img` / figure | | | | | | 20px (stories 24px) | width 100% of the column (681 posts / 752 stories / 641 events), height auto (aspect from source), radius 0, no border, no caption. GIFs are allowed. On events, images can be narrower (501 wide, left-aligned). |
| `table` (inside `figure`, margin-top 20px, overflow auto) | sans-serif (cell text is Inter p 16/30 when the cells contain paragraphs) | 12px/normal | | | `#000` | | `border: 1px solid rgba(153,153,153,0.25)`, **radius 8px**, overflow hidden, border-collapse separate, spacing 0. `th`: bg `rgba(153,153,153,0.1)`, 700, centered, padding 10px, left border between cells `1px solid rgba(153,153,153,0.25)`. `td`: padding 10px, top border + left border (except first col) `1px solid rgba(153,153,153,0.25)`, left-aligned. |
| embed (`iframe` YouTube / Loom) | | | | | | 20px (0 if first) | width 100%, **16:9** (681×383 YouTube; Loom 681×356 with its own padding-box wrapper), radius 0, no border. YouTube uses a lite-embed: thumbnail `img` (sddefault.webp) + 68×48 red play button, swapped for the iframe on click. |
| `hr` | not used | | | | | | |

Gaps measured (prev bottom → next top): p→p 16, h2→p 16, p→h2 40, p→h3 32, h3→p 16, p→ul 20, ul→p 16, p→img 20, img→p 16, p→blockquote 20, p→code-block 20, code-block→p 16, p→table 20.

---

## 5. `/customer-stories` index

`<title>` "Customer Stories | Lightdash".

1440 rows: spacer 106→206 (100). H1 row 206 (57 tall, padding `0 64px`): "Customer stories" `"Britti Sans Trial Semibold" 56px/56px 400, ls −2.24px, #272835` at x=144. Subtitle row 263 (92 tall, padding `14px 64px`): a second `<h1>` element `Inter 18px/32px 400, ls −0.27px, #666D80`, width 514 (2 lines). Spacer 355→443 (88). Then the grid (dashed top) of variant B cards (§1.5), 2 per row, 6 rows (the last row has 1 card; the empty right half is blank). After the grid: a 49 px white strip with a dashed top, a 1px solid `#E5E7EB` line, then the snake CTA (§1.6, full-frame variant: wrapper 1280, panel 1152), then the footer.

Order (listed = 11): ollie, fal, gen-h, justwatch, qargo, collectors, tatango, stake, ubie, neo-financial, hypebeast. `ubie-jp` is not listed. No filters, no pagination, no search.

810: H1 56px at x=80 (frame x=16 plus a 64 px gutter). Subtitle row padding `14px 64px`. 2 columns of 389. 390: H1 **40px/44px, ls −1.6px**, x=40. Subtitle **16px/28px**, padding `14px 24px`. 1 column.

---

## 6. `/customer-story/:slug`

`<title>` "<Story title> | Lightdash". og:image is the same generic image for all stories (`A3BTwvXbAjHYhlotVfVz41cm20w.png`, not downloaded).

### 6.1 Header (1440)
| y | h | Content |
|---|---|---|
| 106 | 100 | Spacer |
| 206 | 20 | Breadcrumb: "Customer stories" (→ `/customer-stories`) / "<Company>" |
| 226 | 24 | Spacer |
| 250 | 53×lines | H1 `"Britti Sans Trial Semibold" 48px/52.8px 400, ls −0.96px, #272835`, max width 780 |
| | 24 | Spacer |
| | 64 | Person row (inner padding-left 64): avatar **64×64** (`object-fit:cover`, radius 0) at x=144, then a 24 px gap. Text block: "A conversation with" `Inter 16px/19.2px 400 #666D80`, then a 5 px gap, then name `Inter 16px/19.2px 500 #272835`, 10 px "·" `Inter 12px #A4ACB9`, then role `Inter 16px/19.2px 400 #666D80` on the same line |
| | 40 | Spacer (column x=144..1296 with dashed L/R begins) |
| | 160 | **Banner** image 1152×160, `object-fit:cover`. One of 3 pixel-pattern banners: `customer-stories/banners/banner-{nsB2IpOc,fomfHUN6,vOw6Q3mY}.png` (mapping per story in the JSON) |

### 6.2 Body (≥1100)
- **Main column** x=144, **832 wide**, dashed L/R.
  - **Stats row** directly under the banner: N equal cells (N = 2–4, `statCount` in the JSON), each 112 tall, padding 20, right + bottom `1px dashed #E5E7EB`, centered text. Value `"Britti Sans Trial Semibold" 32px/32px 400, ls −0.27px, #272835`. Label `Inter 14px/19.88px 400, ls −0.27px, #666D80`, max 2 lines. 4 cells = 208 each; 3 cells = 277.3 each. Values are content: use placeholders such as "00+".
  - Rich text: padding **`40px 40px 116px`**, so text is x=184, **752 wide**. Styles are §4 (ul/img margin-top 24px here).
  - Then the inline CTA (§1.7), 832 wide, and a 64 px tail.
- **Sidebar** x=976, 320 wide, right border dashed. Starts at the stats row top (y=644). `position: sticky; top: 74px`.
  - Well: bg `#F8FAFB`, padding 20. Card: bg `#FFFFFF`, padding 24, 280 wide.
  - Company logo (height 19, width auto ≤ 232, `object-fit:contain`, left).
  - 27 px gap, then the company blurb `Inter 14px/23.94px 400 #36394A` (content; use a placeholder of about 8 lines).
  - Then 3 fact rows with padding `16px 0`. The first row has dashed top+bottom (`#E7E9EA`), the next ones only bottom (last has none). Label `Inter 14px/23.94px 400 #818898` (Industry / Location / Employees). Value 6 px below: `"Britti Sans Medium" 18px/23.94px 400 #36394A`.
- **Related stories**: solid frame line, 58 px spacer, header row 40 tall (dashed top/bottom). H2 "Related stories" (same style as "Related articles") at x=144. "See all posts" button (label is literally "See all posts") → `/customer-stories`. 48 px spacer, then **2 variant-B cards**. Live rule: the first two listed stories excluding the current one (ollie → fal + gen-h; every other story → ollie + fal). Then 96 px, then the footer. **No snake CTA.**

### 6.3 Responsive
- 810: no sidebar column. The **company card moves below the inline CTA** (full width: well 730, card 690). Stats wrap 3 + 1 (cells 246 wide, the last one full width). Rich text x=96 (padding 40 inside a 40-gutter column). H1 48px. Related: 2 columns of 389.
- 390: H1 **36px/39.6px**. Person row: "A conversation with" hidden; name (500 #272835) and role (#666D80) stacked, both 16/19.2. Avatar 64, text at x=128. Banner 358×160 full frame width (x=16). Stats are 1 per row (358×112). Rich text x=40, 310 wide. Company card after the CTA. Related: 1 column, H2 40px/40px.

---

## 7. `/events/:slug`

`<title>` "<Event title> | Lightdash". No breadcrumb. No events index.

### 7.1 Header (1440). Header rows span only the left 832 px of the frame (x=80..912). The right side is empty white.
| y | h | Content |
|---|---|---|
| 106 | 100 | Spacer (full frame) |
| 206 | 30 | Tag row (dashed top+bottom, padding `6px 24px 6px 64px`): tag pill 131×24 auto-width, bg `rgba(243,237,252,0.7)`, border `1px solid #D8D5F5`, radius 4, padding `0 12px`. Text `"Britti Sans Medium" 13px/15.6px 400 #7668F7` ("Lightdash Leagues" on all 4). |
| 236 | 24 | Spacer |
| 260 | 56×lines | H1 `"Britti Sans Trial Semibold" 56px/56px 400, ls −2.24px, #272835`, width 744 (emoji allowed) |
| | 16+text+16 | Subtitle row, padding `16px 24px 16px 64px`: `"Britti Sans Medium" 18px/25.2px 400 #666D80` (content; placeholder) |
| | 41 | CTA row (padding-left 64): dark button, auto width, 40 tall, bg `#1A1B25`, radius 6, padding `0 20px`, `Inter 15px/18px 500 #FFFFFF` (label/href per event in JSON) |
| | 60 | Spacer, then the body starts (dashed top `#E7E9EA` across the full frame) |

### 7.2 Body
- Main column x=144, **641 wide** (the right part up to x=912 is empty). Padding-top 20. Rich text per §4. Tables are common here (agenda). The first child is often a bold `p` then a `ul`.
- **Event details card** at x=912, top = body top (not sticky). Well 384×360, bg `#F8FAFB`, padding 20. Card 344×320, bg `#FFFFFF`, padding 24.
  - "Event details" `"Britti Sans Medium" 18px/24px 400, ls −0.36px, #36394A`.
  - 24 px gap, then 4 rows, each 56 tall, padding `16px 0`. The first row has dashed top+bottom `#E7E9EA`, rows 2–3 bottom only, row 4 none. Each row: icon 20×20 then a 10 px gap, then the value `"Britti Sans Medium" 16px/24px 400, ls −0.36px, #36394A`.
  - Icons (`events/icons/`, 48² purple glyph PNGs): `event-format` (people), `event-location` (pin), `event-date` (calendar), `event-extra` (lightning). The fields are free text: format / location / date / extra (booth, time, city…).
- Body bottom padding about 60, then the snake CTA (§1.6, full-frame variant), then the footer.

### 7.3 Responsive
- 810: header rows span 370 px (x=16..386) with gutters `0 24px`. H1 **46px/46px, ls −1.84px**, width 322. Body column x=40, 325 wide. The details card stays to the right (well 365 wide at x=405, card 325).
- 390: header full width, gutters 24. H1 **40px/44px, ls −1.6px**. Body x=40, 310 wide. The details card moves **below the body** (well 310, card 270), before the snake CTA.

---

## 8. Data files (shapes)
- `specs/cms/blog.json`: `{count:62, pageSize:9, posts:[{slug,url,title,category,categorySlug,date,datetime,author:{name,avatar},readTime:null,thumbnail:{path,source,width,height,format,originalWidth?,originalHeight?,bytes}}]}`, in live order (date desc).
- `specs/cms/blog-categories.json`: `{categories:[{slug,url,name,pageTitle,showInFilterBar,filterOrder,postCount,postSlugs}]}`.
- `specs/cms/customer-stories.json`: `{count:12, listedCount:11, stories:[{slug,url,listed,indexOrder,title,pageTitle,lang,person:{name,role,avatar},company:{industry,location,employees,logo},cardLogo,cardDecor,banner,statCount,related}]}`. Industry/location/employees and person name/role are short metadata fields shown in the sidebar and header.
- `specs/cms/events.json`: `{count:4, events:[{slug,url,title,pageTitle,tag,cta:{label,href},details:[{field,label,icon}],ogImage}]}`.
- `specs/cms/shared-decor.json`: shared decor image manifest.

---

## 9. Gaps / not measured
- **Pixelify Sans** (snake CTA score font) was not downloaded. The snake game logic (speed ≈125 ms/cell, food, collision, scoring) was only observed from outside and should be re-implemented approximately.
- Snake CTA at 390 is clipped on the live site (not responsive). Decide whether to replicate it.
- "Load More" and "See all posts" hover states showed no computed change (the `<a>`/`<button>` bg did not change; a child-layer change cannot be ruled out).
- Search modal: open/close animation not captured (it appeared fully formed within 60 ms). The dim overlay color is derived from a screenshot pixel (`rgba(0,0,0,0.8)`), not computed.
- Blog post og images for stories (single generic image) and in-body images were not downloaded (body content). Blog thumbnails above 1600 px were downscaled to 1600 wide.
- Rich-text `h4` appears unstyled in the live Framer style (Inter 16/19.2 black). This is reproduced as measured, not "fixed".
- The live TOC font is the browser default `sans-serif`, not Inter. This is intentional per the measurement.
