Source: https://www.lightdash.com/

# Lightdash product pages: clone spec

Routes: /conversational-analytics, /data-apps, /metrics-catalog, /embedding, /interactive-dashboards, /context-layer, /bi-as-code, /self-improving-analytics, /integrations, /beyond-copilots, /playground

Measured live with Playwright on 2026-10-13 at 1440×900 (plus 810 and 390). **Read `specs/SHARED.md` first.** It defines the page shell, announcement bar, light navbar, type tokens, buttons, motion, every reusable section (Hero, Logos, Accordion tabs, Feature grids, Icon grid, Customer quote, Comparison table, FAQ, Blog cards, Hatched band, Split content), the CTA band with its snake game, and the footer. This file says which of those each page uses, in what order, with what content and assets, and specs the page-unique parts.

Appendix A (end of file) is a machine-generated, **complete copy and asset dump per section at 1440**. Every text node is listed with its type token, position, width and colour, plus every image (with its local path) and every link. Use it for exact copy. Appendix B covers sections that exist only on the data-apps tablet/mobile layout. Appendix C is the asset manifest.

Screenshots: `reference/pages/<slug>-1440.png`, `reference/pages/<slug>-390.png`.

---

## 1. Template groupings

| Template | Pages | Shell |
|---|---|---|
| **T1 Product (Framer "Main With Banner")** | conversational-analytics, data-apps, metrics-catalog, embedding, interactive-dashboards, context-layer, self-improving-analytics | banner + light nav. Content-wrapper 1280 at y=146. Centered Hero → HeroImage → Logos heading + Logos row → library sections → FAQ → (Blog) → CTA → Footer |
| **T1b Product, "Main" variant** | bi-as-code | banner + light nav. No Content-wrapper: a "Main" wrapper (bg #FFF, padding 0 16, so full-bleed rows are 1408 wide) holds bordered 1280 blocks. Unique hero / video / alternating rows / dark testimonial (§2.7) |
| **T2 Directory** | integrations | **no banner**, nav at 0. Left-aligned hero with pixel cluster + sticky category TOC + 3-col card grid + CTA |
| **T3 Event / on-demand** | beyond-copilots | **no banner**. Left-aligned event hero, YouTube replay, split content, numbered steps, speakers, CTA |
| **T4 Draft / WIP** | playground | **no banner**. Old-homepage draft with large empty sections (see §2.11) |

**Section order per T1 page (1440):**

| Page | Sections in order (library refs to SHARED.md §7) |
|---|---|
| conversational-analytics | Hero(72) → Logos → Accordion tabs ×2 rows (§7.3) → 2x2 text cards (§7.4) → Icon grid (§7.5) → Customer quote + stats (§7.6) → FAQ ×7 → CTA |
| data-apps | Hero(72, iframe) → Logos → 1x3 cards → **Pill tabs visual** (§3.2) → 1x3 cards → Customer quote (no stats, no button) → FAQ ×6 → Blog → CTA |
| metrics-catalog | Hero(56) → Logos → **Pill tabs visual** (§3.2) → 1x3 cards → FAQ ×8 → CTA |
| embedding | Hero(56, Rive) → Logos → Accordion tabs (1 row, 4 tabs) → 3x2 bordered cards → **Integration paths** (§2.4) → hatched band → **Testimonial (photo left)** (§2.4) → hatched band → FAQ ×5 → hatched band → CTA |
| interactive-dashboards | Hero(72) → Logos → Accordion tabs (1 row) → 3x2 image cards → 1x3 cards → Customer quote + stats → FAQ → CTA (CTA wrapper here is 1169 wide at x=136) |
| context-layer | Hero(72 two-tone, HTML diagram) → Logos → Split content → 1x3 cards → Icon grid → Comparison table (8 rows) → Customer quote + stats + lines divider → FAQ → CTA |
| self-improving-analytics | Hero(72) → Logos → Statement heading → Accordion tabs ×2 rows (with Subtitle Pills) → Comparison table (3 rows) → FAQ → Blog → CTA |

---

## 2. Per-page specifics

Hero values shared by all T1 pages (from SHARED §7.1):
- The H1 top is at y=246, i.e. 100 below the hero top.
- The subtitle box starts 1px below the H1.
- Buttons are 155×40 "Talk to our team" (Third) and 131.5×40 "Start for free" (Fourth), gap 16, centred (x=571 and 742 at 1440).

### 2.1 /conversational-analytics
- `<title>` "Conversational Analytics for Data Teams | Lightdash". Meta description: "Let anyone ask questions in plain English, in the dashboard or in Slack, and get governed answers from your semantic layer. AI agents your team can trust." og:image `https://framerusercontent.com/images/A3BTwvXbAjHYhlotVfVz41cm20w.png`. Page height 6578.
- **Hero H1** (display-72, #1C0000): "Ask your data a question. **Trust every answer** that comes back." The bold span is #5E4CFF. It wraps to 2 lines in a 1024 box (136.8 tall).
- **HeroImage**: 1280×712, padding 48/24/0. Background `shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png`. Foreground is a **980×659 inline SVG** product mock (FinOps Analyst chat UI) at (230,650), saved as `public/assets/pages/conversational-analytics/inline-svg-1-heroimage-980x659.svg` (2.9 MB, embedded raster). Render it as `<img>`. It is static (no SVG animation).
- Logos caption: "The data teams that stopped being a ticket queue."
- **Tabs row 1** (text left, image right): "Ask questions where you already work." Tabs:
  - In the dashboard → `tbdYQV7hIXUeqIPAKQthWfhjIn8.png`
  - In Slack and Teams → `zF9BR39x6AxBJpJubwm2qc018wU.jpg`
  - Embedded in your product → `weMGLE6761i2jyEQCzZpjFZSf3w.png`
- **Tabs row 2** (image left): "Built for the people who don't write SQL." Tabs:
  - Ask in any language → `Px0EMFIkikrkmJIdnu3TEqL0A.png`
  - Show me what I can ask → no `<img>` in the panel; it renders an empty #F7F8FA well. **Gap**: shows blank on the live site too.
  - Even vague questions work → `74F1dzQeHklPz5Z2xLRCqlLGXs0.png`
- Hidden-tab descriptions:
  - "Tag your agent in a channel or thread and get an answer back where the conversation is happening."
  - "Drop a scoped agent into your own app with the React SDK, so your customers can ask their own data questions too."
  - "New users can ask the agent what it knows, and see suggested questions drawn from your verified answers."
  - "Instead of erroring on a fuzzy question, the agent coaches the person toward what they actually want to know."
- 2x2 text cards "Get governed answers each time." Icon grid "AI that gets better / the more you use it." with icons `bqqI6FAw…svg`, `crZNgh5k…svg`, `Ok6lRZz1…svg`, `5WNs7VEw…svg`.
- Quote: JustWatch logo `Rb5NEX7CC9Uwjm4SBP0fqTnzo.png`. Aleksandr Zolotukhin, VP of Data & Analytics @ JustWatch, photo `cjEFP7NIVVQ4kp7d1BeGhHSU.png`. Button → `./customer-story/justwatch`. Stats: 86% reduction in BI tool spend · ~4000 queries per day · 45% increase in active BI users.
- Hero pixels: purple set (yGf6…, uB7e…, uAlf…, fBtV…), 10 squares (positions in SHARED §7.1).

### 2.2 /data-apps
- Page height 6165 (16524 at 390).
- **Hero H1** "Build **custom apps** on your data from a single prompt" (span #5E4CFF). Hero has a 48px-shorter image block named "Secundary Features" (padding 19/0).
- **HeroImage** 1280×571: background glow image, and an **iframe** `https://forecast-slider.vercel.app/` (656×577 at x=392, title "Data app creator", `loading=lazy`, `allow="clipboard-read; clipboard-write"`, `border:0; background:transparent`). It is an external live mini-app (slide deck generator). Embed the same iframe. The screenshot shows its first frame.
- Pixel squares here are **two stacked layers per position**: a 32px svg (`9q96Ngt…`, `IR4gGpZ…`, `qoS6qse…`, `fM0aEpx…`) under the lavender png set. 8 positions, no (128,0)/(1120,0).
- Logos caption: "The data teams shipping custom apps with Lightdash".
- 1x3 "Trust every app your team builds." / sub-16 "Every Data App runs on your context layer, so the numbers trace to definitions your team already trusts."
- **Pill tabs visual** (§3.2): heading centred "If you can describe it, your team can ship it." Tabs, each with its own description (see Appendix A / tab states):
  - Finance → `bSZPFKOcLl57YwOzSbVeVP57k.png`
  - Marketing → `Sy3V08XNn8U0XstWNRpu9DDUu2Y.png`
  - Customer success → `WtdAn8YuvBtJkngpeYPM7qSYGo.png`
  - Product → `XHsayKly8sdiowmiqs7qJhD65Q.png`
  - Descriptions: Finance "Is your finance team running forecasts in a spreadsheet? Build a revenue forecasting app on your governed metrics instead. Adjust assumptions, watch the impact live, and export the whole thing as a board-ready deck." · Marketing "Attribution models are useless trapped in a notebook only one analyst can run. Give marketing an app to compare models, filter by channel, and drill into what drove pipeline on the same metric definitions your data team already owns." · Customer success "Instead of static QBRs that go out of date quickly, build one QBR app instead. Every CSM gets a branded, per-client version that exports to PDF and never drifts from the source." · Product "Product wants Amplitude-style funnels, but your funnel logic is hard-coded in models nobody wants to touch. Build a funnel explorer where anyone can reorder steps, segment, and compare cohorts powered by metrics you've already defined."
- 1x3 "Data apps as code."
- Quote (570 tall, no stats, no button): OakNorth logo `2an3boLqMqPL3SCsPMA1Z5bNi9E.png`. David Strudwick, Senior BI Engineer @ OakNorth Bank, photo `vAW1WmKvr5NPbFEX3uXUx4XbpGw.jpeg`.
- Blog "Keep building with Data Apps":
  - It's time to build on your data (Hamzah Chaudhary) → `./blogpost/it’s-time-to-build-on-your-data`
  - Introducing Data Apps… (Shanzé Munir) → `./blogpost/introducing-data-apps`
  - Why your data team is still a bottleneck… (Oliver Laslett) → `./blogpost/why-your-data-team-is-still-a-bottleneck`
- **Tablet/mobile layout differs:** extra sections "Use cases", "A request that used to take a sprint now takes a prompt." (an accordion with a 358×477 image) and "Comparison / Why It's Different" exist only below 1200. See Appendix B.

### 2.3 /metrics-catalog
- Page height 4546.
- **Hero H1** display-56 two lines: "Every metric your team agreed on," (#272835) / "in one place" (#5E4CFF). The Title block has a dashed top line. Subtitle (Inter 18/31.86 ls −0.27, w468): "Search the catalog, click any metric, and see it charted over time with its owner, its definition and last year's comparison already in place."
- **HeroImage** 1280×604, padding 24/24/0, `align-items:flex-end`. Background glow + product mock `5Xtb5OGa3oUr6gMYnEnAYcMNrI.png` (1091×601).
- Logos caption: "Trusted by data teams who define their metrics once, in code".
- **Pill tabs visual** ("Tabbed Visual Section", padding 64/24; inner card 1180 wide, bg #FFF, padding 24, gap 32). Tabs, each with H3 (h3-38) + description + 1132×580 image:
  - **Catalog**: "Everyone knows which number is the real one" / "Search every metric in your semantic layer. Each metric shows its owner, its category and how often your team actually uses it." → `U8HetUam73u69VXcJCAbACLfI.png`
  - **Explorer**: "A question gets an answer, not a new dashboard" / "Click a metric and it charts itself over time. Compare it to the same window last year, segment it by any dimension, filter to the slice you care about, then hand off to a full query if needed." → `HI8hLMFAppARD07oDfOR8udT8TY.png`
  - **Curate**: "A catalog is useful when it's a shortlist" / "Curation lives in your YAML, reviewed in pull requests like everything else. Hide by default, assign categories, and pre-select filters so the first chart someone sees is the useful one. Access is still governed by roles, spaces and user attributes." → `Qf3WXnCdHKiqkei6Y3l47EhM.png`
  - **Trees**: "See how the business works, in a picture that stays true" / "Declare drivers in your YAML and Lightdash draws metric trees for you, or connect metrics by hand and save the tree. Every node carries its period-over-period movement, so the driver that shifted is obvious." → `D2lQkMOAUWc9u41Pmp1ekgWwc2Y.png`
- 1x3 "Curate once, and your AI agents get better too".
- FAQ has 8 items. One answer links "pricing page" (#5E4CFF).

### 2.4 /embedding
- Page height 5467.
- **Hero H1** display-56 two lines, both #1A1B25: "Embed AI-powered analytics" / "into your product". Pixel squares are **orange** (`ok5ihble…`, `pUFJPew4…`, `nBGI1zT0…`, `D5EKRZDw…`).
- **HeroImage** 1280×776, padding 0/24, bg `linear-gradient(180deg, rgba(255,115,0,.11) 0%, #F0C5C5 100%)`. The content is a **Rive animation** canvas 1185×776 at x=128 ("s3_a_001_lightdash_motion.riv"). The file is `public/assets/pages/embedding/28O3NwnpOvDD6xz1NZJC0nHhFtw.riv`; play it with `@rive-app/canvas` (autoplay, fit cover). It shows a "Desktop | Mobile" toggle, a browser frame "www.bolts.com" and an orange bar chart.
- The Logos caption sits **below** the hero image: "Teams shipping customer-facing analytics on Lightdash."
- **Accordion tabs** (1 row, 4 tabs, image right). Header has no 3-Tab Spacer; header padding 64/20/24/24. Heading "Your customers ask, build, and save. Your team stays out of the loop." Lead: "Every customer wants a slightly different report. Instead of your team building each one, give them the tools to answer themselves." Tabs:
  - Embed the AI analyst → `weMGLE6761i2jyEQCzZpjFZSf3w.png`
  - Embed a dashboard builder → `KMZXbZggONd7XDVETzkGJLaGYI.png`
  - Embed data apps → `tuJZ1c4LhKeth9Uscr8ADJk2xU0.png`
  - Embed the metrics catalog → `uk4RGpeDInDgHG4RxjEVBhbHQzo.png`
  - Descriptions: "Your customers ask questions in plain English inside your product and get answers generated through your semantic layer." / "Your customers can create, edit, and save charts and dashboards into a space you control, without a Lightdash account." / "Ship interactive, on-brand experiences vis data apps. Each app is built in natural language on your governed data." / "Give customers a browsable glossary of every metric as their entry point into exploration."
- 3x2 bordered cards "Safe to point at your own customers".
- **Integration paths** (page-unique):
  - Title "Choose your integration path" (Britti Semibold 48/43.2 w600 #272835, centred), then subtitle "Pick what fits your workflow" (padding 24/0/53, dashed bottom).
  - Two 640×295 white columns (flex column, gap 24, centred), split by a 1px line:
    - **React SDK**: Britti Medium 18/18 w500 ls −0.36 #272835. Description centred Inter 16/24 ls −0.32 #818898 (w309). Then a bulleted `ul` (left-aligned, w288.8): Native component theming · Built to support localization · Pre-org or per-user configuration · Maximum control with minimal code.
    - **iFrame**: "Drop dashboards into your app with a simple HTML snippet." · Zero engineering overhead · Works instantly · Still gives users interactivity · Fast POCs.
- **Testimonial** (page-unique, 1280×424, padding 64):
  - Avatar 124×124 (`ExsUAS8wNHv3mL0drXNptUF3Z90.png`, contain, pixel-mask style) at x=272.
  - Quote at x=460, w708: Britti Medium 32/40.96 w500 #36394A. "“We evaluated several embedded BI solutions, but Lightdash was the only one that **ticked all our boxes**. The token-based auth means we don't have to manage thousands of users, and the React SDK lets us make it feel like part of our platform.”" The span is **#FF7300**.
  - Attribution: Inter 15/15 w500 #666D80, "Joeri De Turck" #272835 · "·" #A4ACB9 · "Co-founder & CTO @ Qargo".
  - Corner pixel decorations 61×48 (`Zd3z0SbN1AfU8axsLgfCPRovQ.png`) top-left (97,+16) and bottom-right.
- 80px hatched bands (SHARED §7.10) before and after the testimonial, and before the CTA.
- FAQ ×5. Answers have bold run-ins: "Pay-as-you-go:", "Predictable plan:", "iFrame", "React SDK".

### 2.5 /interactive-dashboards
- Page height 6106.
- **Hero H1** "Build and explore / **in seconds**". HeroImage is 1168×763 at x=136 (padding 0/24), a single image `z4BxxqyGs9Mak9PeSM25dshLQGM.png` (no glow background).
- Logos caption: "The data teams that ship fastest don't build their dashboards by hand."
- Accordion tabs "Build however your team works" / "Create dashboards in one of three ways using Lightdash.":
  - Drag and drop → `KMZXbZggONd7XDVETzkGJLaGYI.png`. Description: "Drop charts onto a canvas in the UI and arrange the dashboard by hand."
  - Build from your terminal → `CJ4WhRGlRWSJOWpxUHHXMqTfXLQ.png`. "Create and maintain dashboards at scale using the Lightdash CLI & your coding agent."
  - Ask the agent → `84LSb1lj54AidDwGjKh7vWHYVXg.png`. "Describe the dashboard you want in plain English and let AI agents build it for you."
- 3x2 image cards "Explore the story behind every number." Cards and images:
  - Cross-filter `vb2zmoA9…`
  - Drill in `ExNzp62n…`
  - Explore from here `plKsacpH…`
  - Date zoom `eZIJkJHU…`
  - Scheduled deliveries `EgG8GzJs…`
  - AI bubbles `hKLRwzg4…`
- 1x3 "Speed you can trust."
- Quote: Stake logo `LUAAILodeR6WVJmQ8bEOBbCfEbM.svg`. Abdelmounim Boufous, Senior Data Analyst @ Stake, photo `iwOkmQ44Uz46TAcsaQ7B8Bmsvk.jpg`. Stats: 90% of employees using Lightdash · 100% dashboards migrated · 80% fewer ad-hoc data requests.
- FAQ answer contains the link "Learn more about embedding →".

### 2.6 /context-layer
- Page height 6195.
- **Hero H1** two-tone: "One context layer. " is **#1C0000** and "Consumed by your agents." is **#5E4CFF**. The element colour is #5E4CFF with a dark span; weight 600.
- **HeroImage** 1280×602, bg **#F6F8FA**, padding 0/24: an **animated HTML/SVG architecture diagram** (code component `.cl-root`, 1232×602).
  - Captured verbatim with all CSS (21 keyframes) to `public/assets/pages/context-layer/context-diagram.html`. Icons and the font are localised to `public/assets/pages/context-layer/diagram/`. Port that HTML/CSS 1:1 (e.g. `dangerouslySetInnerHTML` or a JSX conversion).
  - Structure: 4 columns with labels (Inter 11/15.95 w600 ls 1.98 uppercase, oklch(.58 .025 285)):
    - **SOURCE OF TRUTH**: "Your warehouse" card with 8 chips: Amazon Redshift, BigQuery, ClickHouse, Databricks, MotherDuck, PostgreSQL, Snowflake, Trino.
    - **PLATFORM**: "Lightdash Context Layer" with Semantics / Metrics · joins, Context / Business logic · internal docs, Caching / Fast · consistent results, Permissions / Authentication.
    - **ACTIVATION**: "Consumption layer" 2×3 tiles: Agents / Governed autonomous AI, Apps / Data Products · Workflows, Dashboards / Interactive · drill-down, SDKs / Python · JS · API, Embedding / Customer-facing analytics, MCP / Internal / external.
    - **EVALUATION**: "Feedback loop" with Autopilot / Scheduled health, zero effort, Self-improving SL / Metrics that never drift, Caching / S3 · Pre Aggs, Context / .md · .files, Permissions / RLS · Auth · SSO.
  - Outer cards: white, 1px #5E4CFF border, radius 14, padding 16. Sub-cards: radius 10, 1px oklch(.91 .012 280). Circle arrow connectors between columns and a return loop from Feedback to Platform underneath.
  - Motion (12s linear infinite loop): `cl-pulse-0..3` dashed-stroke pulses travel along connectors at offsets 11.5%/27.5%/57%/73%. `cl-dot-core/halo-*` dots appear. `cl-arrowFlow` arrow glow `drop-shadow(#5E4CFF 0 0 3px)`. `cl-platform-glow` box-shadow pulse on the platform card at ~82%. On load, `cl-rise` 700ms `cubic-bezier(.22,1,.36,1)` translateY(8px)/opacity 0 → 0 per column.
- Logos caption: "The context layer behind data teams at:"
- Split content: "Governed context for your agents" / "Lightdash agents always use your governed metrics and business context so you can actually trust what comes back." Image `qIwD83POaESHeMMGqj2Y7tqtg.png` 551×320.
- 1x3 (no heading): Accurate answers / Traceable / One governed path.
- Icon grid "Built for data security" (icons are PNG 372px: `H5tZowpE…`, `SCIwmtZa…`, `HO98u4qB…`, `tfWD5ZUV…`).
- Comparison "Why use the Context Layer?". Columns: (blank) | Lightdash Context Layer | Legacy BI | Raw LLM on your warehouse. 7 rows (see Appendix A).
- Quote (quote-32): Tatango logo `REW2v2KOVTTOCSiWiswSWJlqTM.svg` (100×32 contain). Matthew Powers, Chief Technology & Product Officer @ Tatango, photo `NPS46hvEpGtCdwKJ5teu2VzgDto.jpeg` (**not** grayscale-filtered here). → `./customer-story/tatango`. Stats: 40% reduction in data team hours · 100% alignment on key metrics · 50% faster to create dashboards. Then the converging-lines divider.

### 2.7 /bi-as-code (T1b)
- Page height 6792.
- **Main** wrapper: bg #FFF, padding 0 16, full 1440 wide. Blocks inside are 1280 (bordered) except the Logos rows, which span 1408 (x=16, 6 cols × 234.67).
- **Hero** 1280×604: 1px solid #E5E7EB all sides, padding 20, centred.
  - Decorative "BG Element" pixel tiles (24–28px; gradient `8wv1Axcc…png` / `152SErwT…png` + texture `gUzZDqha…jpg` + "Block-Master" tiles) at the top-left and bottom-right corners.
  - H1 (#0D0D12, w608) "Your entire BI **as code**".
  - Subtitle w554: "Your metrics, charts, and dashboards live as code. Build them with coding agents, review them in pull requests, and update 50 charts in one command. All on your governed context layer". Buttons as standard.
- **Video Section** 1280×821, padding 40. Bg `linear-gradient(180deg,#F8FAFB,rgba(248,250,251,0))` over a dotted pattern image `KsQ21PJT6e9XU2YmglGUiR4.png` (3195×2595, cover). Solid border `0 1 1 1`.
  - `<video>` 1080×741: src `public/assets/pages/bi-as-code/OsiXnkGAa79N5TWI3WZevZyTzg.mp4` (52 MB), **controls, loop, not autoplay, not muted, playsinline, preload=metadata**, object-fit cover, no radius.
- Logos caption: "The best data teams are shipping analytics as software".
- **Desktop / Cards** (1280×1620, padding 124/0/64, solid border):
  - Heading "Coding agents don't have to click through a dashboard builder." (h2-48 centred w624, 144 tall, dashed top/bottom).
  - 3 alternating 640/640 rows, each 408 tall:
    - **Row 1** (image left): image `pLX5BjHn…png` 576×408 in a cell with padding-left 64. Text right (padding 0 112 0 40): h3-32 "Describe the dashboard. Your agent writes it." + Inter 14/21 #666D80 "Use Lightdash skills to teach your coding agents how the platform works, and start building dashboards from prompts."
    - **Row 2** (text left, padding 0 40 0 112): "Review analytics like you review software." / "Every chart and dashboard is a file, so changes move through the workflow your team already trusts: open a PR, spin up a preview environment straight from the CLI, get a review, merge." Image right `8oUr90QL…png`.
    - **Row 3**: image `5rKxGpz6…png` / "Run maintenance in one command." / "Make maintenance work scriptable: validate your whole project in CI, fix what breaks in bulk, and migrate off your current tool with a script instead of a quarter of rebuilds."
  - Pixel "Decoration" PNGs sit on the cell corners: `BN6JN0HS…` 96×48, `cmGuGaI8…` 24×24, `JhduHaBE…` 72×72, `NKVrATXo…` 72×96, `A21JEuMC…` 96×24. Rows have dashed borders.
- Icon grid "What makes BI-as-code work" (svg icons 56px natural: `tHVryl1c…`, `tgo2DvYp…`, `2njj1ggn…`, `QJ0GD09w…`): Lightdash CLI / MCP server / Agent skills / Git integrations.
- **Testimonials** (1280×530, bg #F6F8FA, padding 20/0, solid border, overlay gradient #F8FAFB → transparent):
  - Inner **dark card** 1120×296: bg **#1A1B25**, radius **16**, padding 40/24. Shadow `rgba(39,40,53,.01) 0 12px 5px, rgba(39,40,53,.02) 0 7px 4px, rgba(39,40,53,.03) 0 3px 3px, rgba(39,40,53,.03) 0 1px 2px`.
  - Left: pixel avatar 64×64 (`T3PlGRwQ…png`), "Kevin Otte" Inter 16/20 #666D80, "fal.ai" Inter 12/20 w500 #FFF · "•" #A4ACB9 · "Data Scientist" Inter 12 #666D80.
  - Quote: Inter 21/36 w500 ls −0.315 #FFFFFF (w406): "The shift to dashboards-as-code and agent-driven workflows has been huge for us. We can update, version, and replicate analytics the same way we ship software without spending hours clicking around the UI."
  - Button: light "Read the full case study" + an 18px arrow → `./customer-story/fal`.
  - A cluster of ~20 24px "Block-Master" pixel tiles fills the bottom-right corner (files in the bi-as-code folder).
- **Stats** row (padding 16/80, gap 16): 3 white cards 362.7×130 with a layered shadow (`rgba(39,40,53,.02) 0 0 0 1px, … 0 3px 3px .06`).
  - Number Inter **40/40 w500 ls −0.8 #272835**, label Inter 14/16.8 ls −0.28 #666D80 (w≈215–253).
  - Stats: 90% of agent-generated code approved · 30 minutes to go from data model to dashboard · 85% of data requests answered in 24 hours.
- FAQ ×7 (solid border all sides). Blog "Keep building with BI-as-code" (3 cards). CTA (here the CTA section is 1408 wide at x=16).

### 2.8 /self-improving-analytics
- Page height 6181.
- Hero H1 is two lines as separate H1s: "The data platform that" (#1C0000) / "maintains itself" (#5E4CFF). HeroImage 1280×836 is a single image `PlYzx93tqqN8O2aV4ymkCQEP90.png` (the Autopilot UI).
- Logos caption: "The fastest data teams don't maintain their BI by hand."
- **Statement heading** (326 tall, padding 85/0/49, dashed bottom): h2-48 centred w624 "Every analytics tool gets messy the moment real people use it. Lightdash is the only one that **cleans itself up**." (span #5E4CFF).
- Tabs row 1 (pill "Self-improving context layer"):
  - Heading "Your context layer learns and improves over time." / lead "As your team queries, Lightdash spots where your context layer is thin, out of date, or duplicated, and proposes the fix."
  - It learns from real questions (`g3m34sQg…png`): "Lightdash proposes changes based on the questions people ask and the metrics they reach for."
  - It proposes the change as a pull request (`KGrOlmbD…png`): "The change is opened in your repo and validated with a compile before it reaches you."
  - You review and merge (no img captured; shows an empty well): "Every change arrives as a reviewable changeset you approve, reject, or revert. Nothing touches your source of truth on its own."
- Tabs row 2 (pill "Autopilot", image left):
  - Heading "Your project cleans itself up as you use it." / "A scheduled agent that runs on a cadence you set. Each run, it reviews recent activity, fixes what it safely can, and flags the rest for review."
  - It clears the dead weight. (`PSkHEoMu…png`): "Soft-deletes dashboards with zero views, and flags the ones gathering dust. Run in read-only mode if you want it to flag only."
  - It fixes what's broken. (`Bb8QWbxA…png`): "Finds charts pointing at fields that no longer exist, repairs the ones it can, and flags the ones it can't."
  - It tells you what to build next. (`4qGSp9gk…png`): "When people keep asking about something with no saved chart, Autopilot drafts one for review. It also flags slow queries and surfaces popular content stuck out of sight."
- Comparison: "Other tools make maintenance your problem. **Lightdash makes it the platform's.**" (heading block 250 tall). Columns: Lightdash | Legacy BI (Looker, Tableau, Power BI) | Raw LLM on your warehouse. 3 rows (Appendix A).
- FAQ ×6. Blog "Keep building with self-improving analytics".

### 2.9 /integrations (T2)
- Page height 3194. No banner. Content-wrapper at y=106.
- **Hero** 1280×295, flex column, justify flex-end, padding 0 0 15 64, dashed bottom.
  - H1 two lines (Britti Semibold 56/50.4 ls −1.12 #272835): "Explore Lightdash" / "Integrations". Sub Inter 18/32 #666D80, w425: "Lightdash integrates with the tools and services you already use and love."
  - **Pixel cluster** top-right: 18 × 30px squares in a checkerboard-ish arrangement spanning x 1150–1360, y 0–295 (page-specific PNGs; positions in Appendix A). Appear motion: y −30 → 0 for the top group and +30 → 0 for the bottom group, spring 0.6s, delay 1s.
- Spacer 40 (dashed bottom).
- **"All" section** (flex row):
  - **TabsDesktop**, 284 wide, **position: sticky**, padding 32/0/32/64, gap 24:
    - "Table of contents" (Britti Medium 18/18 ls −0.36 #272835).
    - **Categories** list: padding-left 16, 1px solid #E5E7EB left line, gap 18. Items are Inter 14/14 w500 ls −0.36 with 12px leading icons: All (active, **#272835**, with a dark 1px indicator over the left line), then Warehouse, Version Control, Alerts & sharing, Transformation, Data observability, Marketplace (inactive **#818898**).
  - **Grid** 996 wide (dashed left line, padding-right 63): 3 columns × 311. Each card is 240 tall, padding 20, gap 24, with a dashed right/bottom line.
    - Logo tile 48×48: 1px solid #DFE1E7, shadow `rgba(39,40,53,.05) 0 0 0 5px`, padding 9, holding a 30×30 logo.
    - Category tag top-right: Inter 13/19.5, padding 0 8. The bg is the tag colour at **opacity .15** behind coloured text. Colours: Warehouse **#B3480F**, Version Control **#567A0A**, Alerts & sharing **#CC003C**, Transformation **#BF00A2**, Data observability and Marketplace **#2953FF**.
    - Name: Britti Medium 20/20 ls 0.24 #36394A. Description: Inter 16/24 ls −0.32 #666D80 (w271).
  - **Filtering (measured):** clicking a category filters the grid. Counts: All 21, Warehouse 10, Version Control 4, Alerts & sharing 3, Transformation 1, Data observability 2, Marketplace 1. Cards are not links.
  - Cards, in order: Amazon Athena, Amazon RedShift, Azure DevOps, BigQuery, Bitbucket, ClickHouse, Databricks, dbt, Github, GitLab, Google Cloud Marketplace, Metaplane, MotherDuck, MS Teams, PostgreSQL, Rollstack, Secoda, Slack, Snowflake, Supabase, Trino. Copy and logo files are in Appendix A (logo files are in `public/assets/pages/integrations/`).
- CTA → Footer. At 390 the TOC stacks above a single-column grid (page height 6745).

### 2.10 /beyond-copilots (T3)
- Page height 4308. No banner. Content row 1312 (padding 0 16).
- **Event Hero** (padding 72/72/51, left-aligned):
  - Eyebrow "BEYOND COPILOTS · ON-DEMAND" (Inter 14/16.8 **w700** ls 1.12 uppercase #5E4CFF).
  - Co-host logos row (20px vertical padding, gap 12; × separators "Cross"): Lightdash `YCM9XN0N…svg` 100×21 · MotherDuck `Fn961oCT…svg` 141×17 · dltHub `I56RbgF8…svg` 62×18.
  - H1 display-72 w600 #000 (w909): "We built the data stack live. **Here’s how it worked.**" (span #5E4CFF).
  - Subtitle lead-18 (w795): "Watch dltHub, MotherDuck and Lightdash take a live API from ingestion to a governed AI answer, using agents at every layer and one terminal throughout."
  - Buttons: Third "Watch the build" (151.5×40) → `https://www.youtube.com/live/S9NJrqRYRhs?si=vobO2NBbpbMWaqH6` (_blank); Fourth "Talk to our team" → `./start` (_blank).
  - Meta "Recorded live on 18 August 2026" (Inter 14/16.8 #666D80, 20px above).
- **Replay** block (1100 wide at x=170, padding 72/65, dashed bottom):
  - h2-48 "Watch the full build" + caption "See the stack come together from the first API request to the final governed answer." (w640).
  - Placeholder 970×545.6, bg #191923, radius **10**, with the thumbnail `public/assets/pages/beyond-copilots/youtube-S9NJrqRYRhs-maxresdefault.webp` (1280×720) and a centred play button (see screenshot).
  - On click, show a hidden YouTube iframe `https://www.youtube.com/embed/S9NJrqRYRhs?si=vobO2NBbpbMWaqH6&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0`. It is `display:none` initially, positioned absolute to fill the placeholder.
  - "After-video booking" row (padding 20/0, space-between): "Want to see what this could look like on your data?" (Britti Medium 20/28 w500 ls −0.4 #36394A) + purple "Start for free" → `./start`.
- Split content: "The query was never the hard part." / "The hard part is everything around it: getting data into the warehouse, understanding the schema, defining metrics and giving an agent enough context to return an answer you can trust. This session showed what happens when agents can work across the whole stack instead of stopping at text-to-SQL." Image: terminal mock `9bOIM3S5kIt9dtFBnk013Rqbo.png` 551×320.
- **Build it yourself** (h2-48 left; "Features" grid 2×2 of 568×220 link cards, dashed #ECEFF3 lines):
  - Each card has a 72×72 number cell (Britti Semibold 40/48 w600 #272835: 01–04).
  - Title bar 496×72 (padding 13/8/13/16; Britti Medium 20/24 w500 ls −0.2 #272835).
  - Body (padding 12/8/12/16, gap 8): Inter 16/26 ls −0.16 #666D80, then a link line Inter 16/30 w700 #5E4CFF "Read the … guide →".
  - Cards:
    - 01 Get the source code → `https://github.com/lightdash/lightdash`
    - 02 Build the pipeline with dltHub → `https://dlthub.com/docs/intro`
    - 03 Run it on MotherDuck → `https://motherduck.com/docs/getting-started/`
    - 04 Add governed analytics with Lightdash → `https://docs.lightdash.com/`
    - All `_blank`. Card 01's body text is duplicated on the live site ("See the pipeline, configuration and files used during the live build." twice).
- Hatched band 80 (opacity .6).
- **Built live by** (h2-48 left; "Speakers" grid 3 × 365.3, gap 20, padding 20/72/0). Card: dashed border all round.
  - Photo band 124 tall: background strip `SV72DfJqXdU4uJ2CqoH41tIn0.png` + a 124×124 photo with `filter: brightness(1.2) grayscale(1)` and a "Tint" overlay #364AFF `mix-blend-mode: soft-light`.
  - Details (padding 20/24/0, gap 8): company logo, name Britti Medium 20/28 w500, role lead-18.
  - Speakers: Alena Astrakhantseva / Senior Solutions Engineer / dltHub (`bEOX3oTk…png`) · Jacob Matson / Developer Relations / MotherDuck (`nuvFLTKr…png`) · Oliver Laslett / Co-founder / Lightdash (`iXvDFf6E…png`).
- CTA → Footer.

### 2.11 /playground (T4, WIP)
- Page height 5731. It appears to be an unfinished duplicate of an older homepage.
- **Hero** 1280×407.8, left-aligned (padding 85/0/40, inner padding-left 73):
  - Heading built from separate words (Britti Semibold **76/68.4**): "Rethink BI. Build intelligence" (#272835) / "...not just dashboards" (#000). Inline pixel-icon SVGs (data-URL backgrounds 48×47, 55×35, 60×35) sit between words.
  - Sub lead-18 (w545): "Ask questions. Get instant insights from your custom AI analysts. All-in-one open, developer-loved platform."
  - Buttons: light "Book a demo" (130×42) + purple "Start for free" (127.3×42). **No href** (Cal modal / JS).
  - A 287×287 decorative image `dhDCJdJG79D1hjdms5gJlZ69NHo.png` at the top-right.
  - Appear: H1 words opacity 0.001 → 1 tween 0.4s ease (.44,0,.56,1), with delays 0 / 0.5 / 1s and x −20 → 0 on one element.
- Below: a 1280×629 grid-pattern band (CTA-style 8px grid) holding a **white 1152×549 card with the CTA shadow that is empty on the live site** (likely an unrendered embed).
- Logos 2×6 (212 tall, padding 24/0/60), with 12 logos and links to customer stories:
  - Row 1: Kraken, octopus, workday, Phantom `tLi5MYBe…svg`, Adobe, fal
  - Row 2: Tempo `PeTCrjuA…svg`, Collectors, Model ML `XJpm5wcF…svg`, tatango, ServiceNow `AIq32rD3…svg`, OakNorth `HhSegQkh…svg`
- Then 3 empty "Feature" blocks (724 / 692 / 716 tall) with "lines" headers, and an empty gradient block (573). **Their content does not render on the live site (blank in screenshots). Clone them as empty bordered blocks or skip.**
- CTA → Footer.

---

## 3. Page-unique components used by more than one page in this group

### 3.1 Accordion tabs: see SHARED §7.3 (conv-analytics ×2, embedding, interactive-dashboards, self-improving ×2).

### 3.2 Pill tabs visual ("Tabbed Visual", data-apps + metrics-catalog)
- Container: white card, padding 24, gap 32, flex column, left-aligned.
- **Tabs** row, gap 8. Each tab: padding 10/16, radius 6, 36.8 tall, tab-pill-14 label.
  - Active: bg **#5E4CFF**, text #FFF.
  - Inactive: bg #FFF + 1px solid #E5E7EB inset border, text #272835.
- **Copy**: data-apps uses the centred h2-48 above the tabs and a tabbed-lead-18 paragraph. metrics-catalog uses h3-38 + tabbed-lead-18 below the tabs (gap 10).
- **Product Visual**: bg #F6F8FA, radius 6, overflow clip, full width (1232×765 data-apps, 1132×580 metrics). It holds one cover image (radius 6).
- Click a tab: active styles swap, the copy and image swap. No timed autoplay was measured (no progress bar). Transition: Framer variant change (spring 0.4/0.2 for colours).

---

## 4. Responsive notes (measured)
- **810:** phone nav (64 bar + banner = 104). Content-wrapper 778 wide at x=16. Type: h2 40/40. Logos 3 cols. Two-column rows (tabs, FAQ) mostly stay side by side but narrower. data-apps gains the extra sections in Appendix B.
- **390:** content 358 wide. H1 42/39.9; h2 32/35.2; FAQ heading 36/32.4. Logos 2 cols. Accordion tabs stack (header → tabs → image 358 wide). Feature grids become 1 column. Comparison tables stack (context-layer page grows to 16027 tall). CTA mobile layout per SHARED §9.
  - Customer Quote is re-ordered **after** the CTA band on conversational-analytics, interactive-dashboards, context-layer and data-apps (measured y order). Clone the measured order.
- Page heights at 390: conv 9076, data-apps 16524, metrics 4702, embedding 6600, interactive 7058, context 16027, bi-as-code 8175, self-improving 8286, integrations 6745, beyond-copilots 5488, playground 6070.

## 5. Gaps / not captured
- Rive files (`embedding/28O3NwnpOvDD6xz1NZJC0nHhFtw.riv`, nav logo) are canvas output: their timelines can't be inspected. Use the Rive runtime.
- `forecast-slider.vercel.app` (data-apps hero) is an external app. Embed it, don't rebuild it.
- Tab panels "Show me what I can ask" (conv-analytics) and "You review and merge" (self-improving) had no image element when activated. They render as blank wells on the live site.
- The playground page content blocks are empty on the live site.
- The 52 MB bi-as-code MP4 was downloaded at original quality. Consider transcoding for the clone.
- Framer breakpoint-specific variants other than data-apps may hold copy differences at 810/390. Only section order and type scale were diffed. Check the `-390.png` screenshots.

---

## Appendix A: per-section copy, images and links at 1440 (generated from live DOM)

Type tokens are defined in SHARED.md §3. Colours are given as `(r, g, b)`. Image paths are local (downloaded originals, Framer resize params stripped). The CTA band and footer are omitted (see SHARED §9–10). FAQ answers are listed in DOM order after their questions (they are present but collapsed).

### conversational-analytics (1440, page height 6578px)

**[Hero @y146–1503]**
- `display-72 (28, 0, 0)` @(208,246) w1024: Ask your data a question. Trust every answer that comes back.
- `lead-18 (102, 109, 128)` @(471,407) w498: Lightdash AI agents answer questions in plain English using your governed semantic layer.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,506) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,506) w91.5: Start for free
- IMG 1280×712 @(80,592) fit:cover [HeroImage] → `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (natural 1280×901)
- `body-18s (102, 109, 128)` @(80,1336) w1280: The data teams that stopped being a ticket queue.
- IMG 111×18.1 @(771,1438) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)
- IMG 608×609 @(752,1503) fit:cover [Image Placeholder] → `public/assets/pages/conversational-analytics/tbdYQV7hIXUeqIPAKQthWfhjIn8.png` (natural 1280×1705)

**[Self-improving semantic layer @y1503–2721]**
- IMG 608×609 @(752,1503) fit:cover [Image Placeholder] → `public/assets/pages/conversational-analytics/tbdYQV7hIXUeqIPAKQthWfhjIn8.png` (natural 1280×1705)
- `h3-32 (54, 57, 74)` @(168,1567) w564: Ask questions where you already work.
- `lead-18 (102, 109, 128)` @(168,1623) w564: The question usually lands in Slack or on a dashboard. The answer should land there too.
- `tab-title-18 (54, 57, 74)` @(168,1773) w560: In the dashboard
- `tab-body-18 (102, 109, 128)` @(168,1809) w560: Hit "Ask AI" on any chart or dashboard and start a conversation with that view already pinned as context.
- `tab-title-18 (54, 57, 74)` @(168,1911) w560: In Slack and Teams
- `tab-title-18 (54, 57, 74)` @(168,1980) w560: Embedded in your product
- IMG 608×609 @(80,2112) fit:cover [Image Placeholder] → `public/assets/pages/conversational-analytics/Px0EMFIkikrkmJIdnu3TEqL0A.png` (natural 1280×1705)
- `h3-32 (54, 57, 74)` @(776,2176) w564: Built for the people who don't write SQL.
- `lead-18 (102, 109, 128)` @(776,2232) w564: Anyone can ask in plain English and get an answer, without touching SQL or the query builder.
- `tab-title-18 (54, 57, 74)` @(776,2382) w560: Ask in any language
- `tab-body-18 (102, 109, 128)` @(776,2418) w560: Questions in French, Japanese, Portuguese, and more. All answered, with the chart, in the same language.
- `tab-title-18 (54, 57, 74)` @(776,2520) w560: Show me what I can ask
- `tab-title-18 (54, 57, 74)` @(776,2589) w560: Even vague questions work

**[section @y2721–3328]**
- `h2-48 (54, 57, 74)` @(152,2809) w1136: Get governed answers each time.
- `card-title-24 w500 (0, 0, 0)` @(180,2921) w500: Runs on the semantic layer
- `card-title-24 w500 (0, 0, 0)` @(760,2921) w500: A semantic query, not raw SQL
- `card-body-16 w500 (129, 136, 152)` @(180,2958) w500: Every answer is built from the metrics you defined once in code, so "revenue" means the same thing here as everywhere else.
- `card-body-16 w500 (129, 136, 152)` @(760,2958) w500: The agent returns a governed query you can open in the normal explore view and check, so you can see exactly how it got there.
- `card-title-24 w500 (0, 0, 0)` @(180,3115) w500: Permissions follow the person
- `card-title-24 w500 (0, 0, 0)` @(760,3115) w500: Says when it can’t
- `card-body-16 w500 (129, 136, 152)` @(180,3151) w500: Turn on OAuth and each Slack question respects that user’s own data access. People only ever see what they’re allowed to.
- `card-body-16 w500 (129, 136, 152)` @(760,3151) w500: When the data isn’t there, the agent tells you, instead of hallucinating and inventing wrong answers.

**[section @y3328–3988]**
- `h2-48 (54, 57, 74)` @(327,3400) w787: AI that gets better the more you use it.
- IMG 84×84 @(145,3544) fit:cover [Icon Placeholder] → `public/assets/pages/conversational-analytics/bqqI6FAwOVvDZPqDpQLLHsMZI.svg` (natural 96×96)
- IMG 84×84 @(720,3544) fit:cover [Icon Placeholder] → `public/assets/pages/conversational-analytics/crZNgh5koPZHy4Zcv4hVXYYvUI.svg` (natural 96×96)
- `card-title-24 w500 (0, 0, 0)` @(253,3573) w443: Memory
- `card-title-24 w500 (0, 0, 0)` @(828,3573) w443: Verified answers
- `card-body-16 w500 (129, 136, 152)` @(253,3643) w443: Correct the agent once and it remembers, so the same mistake doesn't come back next week.
- `card-body-16 w500 (129, 136, 152)` @(828,3643) w443: Mark a great answer as verified; the agent reuses it for similar questions and surfaces it as a suggested starting point.
- IMG 84×84 @(145,3737) fit:cover [Icon Placeholder] → `public/assets/pages/conversational-analytics/Ok6lRZz120wT2QCg4t959aNzJOQ.svg` (natural 96×96)
- IMG 84×84 @(720,3737) fit:cover [Icon Placeholder] → `public/assets/pages/conversational-analytics/5WNs7VEwF5qbwNWjQpSoM8GhRQ.svg` (natural 96×96)
- `card-title-24 w500 (0, 0, 0)` @(253,3766) w443: Reviews
- `card-title-24 w500 (0, 0, 0)` @(828,3766) w443: Knowledge documents
- `card-body-16 w500 (129, 136, 152)` @(253,3836) w443: Lightdash flags likely-wrong answers and suggests one-click fixes to your context layer.
- `card-body-16 w500 (129, 136, 152)` @(828,3836) w443: Upload glossaries, metric definitions, and business context the agent reads before it answers.

**[Customer Quote @y3988–4901]**
- IMG 100×34 @(670,4173) fit:cover [Logo] → `public/assets/shared/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png` (natural 100×35)
- `quote-40 w600 (26, 27, 37)` @(330,4227) w780: "We create specialized agents with different instructions and data access for different departments. Each agent has personalised context specific to its team’s domain, allowing it to do nuanced jobs."
- IMG 72×72 @(1288,4478) fit:cover [Element 04] → `public/assets/shared/X5SDkd1yAACfVgQB3yQXbGxRPc.png` (natural 72×71)
- IMG 64×64 @(160,4578) fit:cover [Photo] → `public/assets/pages/conversational-analytics/cjEFP7NIVVQ4kp7d1BeGhHSU.png` (natural 64×78)
- `Inter 20px/26px w700 (54, 57, 74)` @(240,4584) w201.6: Aleksandr Zolotukhin
- LINK "Read case study" → ./customer-story/justwatch
- `btn-15 w500 (255, 255, 255)` @(1146,4601) w114.2: Read case study
- `body-18s (102, 109, 128)` @(240,4612) w295.4: VP of Data & Analytics @ JustWatch
- `h2-48 w600 (94, 76, 255)` @(112,4706) w362.7: 86%
- `h2-48 w600 (94, 76, 255)` @(539,4706) w362.7: ~4000
- `h2-48 w600 (94, 76, 255)` @(965,4706) w362.7: 45%
- `body-18s (102, 109, 128)` @(112,4762) w362.7: reduction in BI tool spend
- `body-18s (102, 109, 128)` @(539,4762) w362.7: queries per day
- `body-18s (102, 109, 128)` @(965,4762) w362.7: increase in active BI users

**[FAQ @y4901–5505]**
- `faq-h-48 (54, 57, 74)` @(144,4965) w421.6: Your questions, answered
- `faq-a-14 (54, 57, 74)` @(694,4974) w602.4: Yes. You can create specialized agents for each team (Marketing, Finance, Growth, etc), each scoped to the right data and business context, and the AI Router sends every question to the best-fit one automatically. You control which tables, fields, and metrics each agent can access.
- `faq-q-20 (54, 57, 74)` @(694,4989) w578.4: Can each team have its own agent?
- `faq-a-14 (54, 57, 74)` @(694,5054) w602.4: Lightdash is LLM-agnostic and works with multiple models from Anthropic and OpenAI. You're not locked into one provider, and you can use the model that performs best for your data.
- `faq-q-20 (54, 57, 74)` @(694,5057) w578.4: Which LLM does it use?
- `lead-18 (102, 109, 128)` @(144,5061) w421.6: For any other questions, reach out to our team.
- `faq-a-14 (54, 57, 74)` @(694,5098) w602.4: A raw LLM on your warehouse guesses at table joins and invents metrics, with no shared definition of "revenue." Lightdash agents answer from your governed semantic layer, return a query you can inspect, and learn from your corrections, so the answer is one you can actually put in a board deck.
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,5114) w115: Talk to our team
- `faq-q-20 (54, 57, 74)` @(694,5125) w578.4: Why not just point ChatGPT or Claude at our warehouse?
- `faq-a-14 (54, 57, 74)` @(694,5178) w602.4: The agent builds answers from the metrics you defined in your semantic layer, not free-form SQL, and returns a query you can open and check. When the data isn't there, it says so rather than inventing a figure. Reviews also flags likely-wrong answers so you can fix the source.
- `faq-q-20 (54, 57, 74)` @(694,5193) w578.4: Does it hallucinate numbers?
- `faq-a-14 (54, 57, 74)` @(694,5258) w602.4: Lightdash is a flat fee with unlimited users and unlimited AI queries. You don't pay more as more of the company starts asking questions.
- `faq-q-20 (54, 57, 74)` @(694,5261) w578.4: What does it cost?
- `faq-a-14 (54, 57, 74)` @(694,5314) w602.4: dbt is the most common setup, and Lightdash builds its semantic layer inside your dbt project. You can also define the semantic layer in Lightdash YAML against your warehouse without dbt. Either way, every dashboard runs on governed metrics defined once, in code.
- `faq-q-20 (54, 57, 74)` @(694,5329) w578.4: Do I need dbt to use Lightdash?
- `faq-a-14 (54, 57, 74)` @(694,5394) w602.4: Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our Slack community.
- `faq-q-20 (54, 57, 74)` @(694,5397) w578.4: I have an infrequently asked question.
- LINK "Slack community" → https://go.lightdash.com/community (_blank)

**[section @y5505]** → shared CTA band (SHARED.md §CTA)

### data-apps (1440, page height 6165px)

**[Hero @y146–1344]**
- `display-72 (28, 0, 0)` @(208,246) w1024: Build custom apps on your data from a single prompt
- `lead-18 (102, 109, 128)` @(483,407) w475: Build an on-brand app on your semantic layer in minutes. Permissions carry over, and every query is visible.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,506) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,506) w91.5: Start for free
- IMG 1280×571 @(80,555) fit:cover [HeroImage] → `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (natural 1280×901)
- `body-18s (102, 109, 128)` @(80,1177) w1280: The data teams shipping custom apps with Lightdash
- IMG 111×18.1 @(771,1279) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)

**[section @y1344–1823]**
- `h2-48 (54, 57, 74)` @(152,1432) w1136: Trust every app your team builds.
- `body-16 (107, 114, 128)` @(152,1496) w1136: Every Data App runs on your context layer, so the numbers trace to definitions your team already trusts.
- `card-title-24 w500 (0, 0, 0)` @(180,1584) w309.3: Permissions carry over
- `card-title-24 w500 (0, 0, 0)` @(565,1584) w309.3: Every query is visible
- `card-title-24 w500 (0, 0, 0)` @(951,1584) w309.3: Always check the math
- `card-body-16 w500 (129, 136, 152)` @(180,1621) w309.3: Apps inherit your roles, user attributes, and row-level security, so each viewer sees only their own data.
- `card-body-16 w500 (129, 136, 152)` @(565,1621) w309.3: The network inspector shows each query an app runs. Hover any number in the app to highlight the exact query behind it.
- `card-body-16 w500 (129, 136, 152)` @(951,1621) w309.3: Open any app query in an explore, view the underlying rows, or save it back to Lightdash as a governed chart.

**[section @y1823–2873]**
- `h2-48 (54, 57, 74)` @(104,1847) w1232: If you can describe it, your team can ship it.
- `Britti Sans Trial Semibold 14px/16.8px w600 (255, 255, 255)` @(120,1937) w49.6: Finance
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(210,1937) w62.7: Marketing
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(312,1937) w117.1: Customer success
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(469,1937) w49.9: Product
- `Inter Variable Variable Regular 18px/27.9px (129, 136, 152)` @(104,1996) w1232: Is your finance team running forecasts in a spreadsheet? Build a revenue forecasting app on your governed metrics instead. Adjust assumptions, watch the impact live, and export the whole thing as a board-ready deck.
- IMG 1232×765.3 @(104,2084) fit:cover r:6px [Editable Visual] → `public/assets/pages/data-apps/bSZPFKOcLl57YwOzSbVeVP57k.png` (natural 1232×765)

**[section @y2873–3352]**
- `h2-48 (54, 57, 74)` @(152,2961) w1136: Data apps as code.
- `body-16 (107, 114, 128)` @(152,3025) w1136: Get a vibe-coding experience for business users and a real dev workflow for your team on the same platform.
- `card-title-24 w500 (0, 0, 0)` @(180,3113) w309.3: Use the CLI
- `card-title-24 w500 (0, 0, 0)` @(565,3113) w309.3: Review in pull requests
- `card-title-24 w500 (0, 0, 0)` @(951,3113) w309.3: Promote and move quickly
- `card-body-16 w500 (129, 136, 152)` @(180,3149) w309.3: Pull an app's source with the CLI, edit locally (your coding agent gets the full context), and upload to publish a new version.
- `card-body-16 w500 (129, 136, 152)` @(565,3149) w309.3: App source lives in Git, so changes get reviewed like the rest of your analytics code.
- `card-body-16 w500 (129, 136, 152)` @(951,3149) w309.3: Promote apps from preview to production, or copy them between projects and instances.

**[Customer Quote @y3352–3922]**
- IMG 100×34 @(670,3425) fit:cover [Logo] → `public/assets/pages/data-apps/2an3boLqMqPL3SCsPMA1Z5bNi9E.png` (natural 100×50)
- `quote-40 w600 (26, 27, 37)` @(330,3479) w780: "As a regulated bank, the data has to come from our golden source. With data apps, people can build whatever they like, but we still control the data and the permissions. That's what lets us open it up."
- IMG 72×72 @(1288,3730) fit:cover [Element 04] → `public/assets/shared/X5SDkd1yAACfVgQB3yQXbGxRPc.png` (natural 72×71)
- IMG 64×64 @(160,3830) fit:cover [Photo] → `public/assets/pages/data-apps/vAW1WmKvr5NPbFEX3uXUx4XbpGw.jpeg` (natural 64×64)
- `Inter 20px/26px w700 (54, 57, 74)` @(240,3836) w153.9: David Strudwick
- `body-18s (102, 109, 128)` @(240,3864) w301: Senior BI Engineer @ OakNorth Bank

**[FAQ @y3922–4458]**
- `faq-h-48 (54, 57, 74)` @(144,3986) w421.6: Your questions, answered
- `faq-a-14 (54, 57, 74)` @(694,3994) w602.4: A Data App is an interactive analytics tool you build inside Lightdash. Think custom reports, analyst workbooks, self-serve dashboards. Anything your stakeholders need that a standard dashboard can't do. Every app runs on your semantic layer, so governance is built-in.
- `faq-q-20 (54, 57, 74)` @(694,4010) w578.4: What is a data app?
- `faq-a-14 (54, 57, 74)` @(694,4062) w602.4: Inside Lightdash, open the app editor and describe what you want. The built-in AI builds it for you. Then tweak it directly in the app: highlight anything and tell it what to change, or use the chat to refine. No code required.
- `faq-q-20 (54, 57, 74)` @(694,4078) w578.4: How do I build a data app?
- `lead-18 (102, 109, 128)` @(144,4082) w421.6: For any other questions, feel welcome to reach out to our team.
- `faq-a-14 (54, 57, 74)` @(694,4142) w602.4: With a data app, you're not limited to the dashboards or visualizations your BI tool supports. You can build exactly what your use case needs.
- `faq-q-20 (54, 57, 74)` @(694,4146) w578.4: How is this different from building a dashboard?
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,4167) w115: Talk to our team
- `faq-a-14 (54, 57, 74)` @(694,4210) w602.4: Yes. Every time your data updates, a model changes, or a metric definition is updated, the app reflects it automatically. No manual refresh, no rebuild.
- `faq-q-20 (54, 57, 74)` @(694,4214) w578.4: Is the data live?
- `faq-a-14 (54, 57, 74)` @(694,4222) w602.4: Tools like Claude Code and Lovable build on raw data.
- `faq-a-14 (54, 57, 74)` @(694,4266) w602.4: Data Apps are different because the foundation is your semantic layer, meaning every app you build gets row-level security, role-based access, caching, and your metric definitions automatically, without configuring any of it yourself.
- `faq-q-20 (54, 57, 74)` @(694,4282) w578.4: How is this different from building with Claude Code or Lovable?
- `faq-a-14 (54, 57, 74)` @(694,4346) w602.4: Data apps is a Cloud feature, so it's not included in the OSS version. On Cloud it's enabled by default, and for On Prem instances it can be configured with a license key.
- `faq-q-20 (54, 57, 74)` @(694,4350) w578.4: Can I access data apps through open source Lightdash?
- `faq-a-14 (54, 57, 74)` @(694,4358) w602.4: It's the only way to build data apps where the governance is already done.

**[section @y4458–5093]**
- `body-18s (102, 109, 128)` @(360,4538) w720: From the blog
- `Inter Variable Variable Regular 40px/47.2px (26, 27, 37)` @(360,4573) w720: Keep building with Data Apps
- IMG 373.3×160 @(144,4652) fit:cover [Thumbnail] → `public/assets/shared/FYOqNAQBg2pLdVk4AIHeq72cWU.png` (natural 373×220)
- LINK "It’s time to build on your data / Hamzah Chaudhary" → ./blogpost/it’s-time-to-build-on-your-data
- IMG 373.3×160 @(533,4652) fit:cover [Thumbnail] → `public/assets/pages/data-apps/nID2yZafrg98mIPFQ7tN9PfJY.png` (natural 373×196)
- LINK "Introducing Data Apps: Build custom apps on top yo" → ./blogpost/introducing-data-apps
- IMG 373.3×160 @(923,4652) fit:cover [Thumbnail] → `public/assets/shared/r9UVsrGtVNZpxAmEauOeH12Pokk.png` (natural 373×210)
- LINK "Why your data team is still a bottleneck (and it's" → ./blogpost/why-your-data-team-is-still-a-bottleneck
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(168,4850) w325.3: It’s time to build on your data
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(557,4850) w325.3: Introducing Data Apps: Build custom apps on top your governed data
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(947,4850) w325.3: Why your data team is still a bottleneck (and it's not a headcount problem)
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(196,4894) w123.1: Hamzah Chaudhary
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(585,4949) w84.4: Shanzé Munir
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(975,4949) w80.2: Oliver Laslett

**[CTA @y5092]** → shared CTA band (SHARED.md §CTA)

### metrics-catalog (1440, page height 4546px)

**[Hero @y146–587]**
- `display-56 w600 (39, 40, 53)` @(80,246) w1280: Every metric your team agreed on,
- `display-56 w600 (94, 76, 255)` @(80,296) w1280: in one place
- `Inter 18px/31.86px (102, 109, 128)` @(486,371) w468: Search the catalog, click any metric, and see it charted over time with its owner, its definition and last year's comparison already in place.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,501) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,501) w91.5: Start for free
- IMG 1280×604 @(80,587) fit:cover [HeroImage] → `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (natural 1280×901)

**[HeroImage @y587–1191]**
- IMG 1280×604 @(80,587) fit:cover [HeroImage] → `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` (natural 1280×901)
- IMG 1091×601.3 @(175,590) fit:cover [111] → `public/assets/pages/metrics-catalog/5Xtb5OGa3oUr6gMYnEnAYcMNrI.png` (natural 1091×601)

**[Heading @y1191–1278]**
- `body-18s (102, 109, 128)` @(80,1223) w1280: Trusted by data teams who define their metrics once, in code

**[Logos @y1279–1391]**
- IMG 111×18.1 @(771,1326) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)

**[Tabbed Visual Section @y1391–2328]**
- `Britti Sans Trial Semibold 14px/16.8px w600 (255, 255, 255)` @(170,1489) w49.2: Catalog
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(259,1489) w52.7: Explorer
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(352,1489) w42.2: Curate
- `Britti Sans Trial Semibold 14px/16.8px w600 (39, 40, 53)` @(434,1489) w34: Trees
- `h3-38 w600 (39, 40, 53)` @(154,1548) w1132: Everyone knows which number is the real one
- `Inter Variable Variable Regular 18px/27.9px (129, 136, 152)` @(154,1599) w1132: Search every metric in your semantic layer. Each metric shows its owner, its category and how often your team actually uses it.
- IMG 1132×580 @(154,1659) fit:cover r:6px [Editable Visual] → `public/assets/pages/metrics-catalog/U8HetUam73u69VXcJCAbACLfI.png` (natural 1132×579)

**[section @y2327–2781]**
- `h2-48 (54, 57, 74)` @(152,2415) w1136: Curate once, and your AI agents get better too
- `body-16 (107, 114, 128)` @(152,2479) w1136: The categories, owners, descriptions and visibility rules you write for the catalog are the same context your agents and data apps read.
- `card-title-24 w500 (0, 0, 0)` @(180,2567) w309.3: Agents retrieve the same metrics
- `card-title-24 w500 (0, 0, 0)` @(565,2567) w309.3: Data apps inherit the definitions
- `card-title-24 w500 (0, 0, 0)` @(951,2567) w309.3: One definition, everywhere
- `card-body-16 w500 (129, 136, 152)` @(951,2604) w309.3: Edit the metric in code and the catalog, charts, agents and apps all move together.
- `card-body-16 w500 (129, 136, 152)` @(180,2630) w309.3: A tighter catalog means answers that land on the approved definition.
- `card-body-16 w500 (129, 136, 152)` @(565,2630) w309.3: Anything on the semantic layer uses your metric, not a fresh piece of SQL.

**[FAQ @y2781–3473]**
- `faq-a-14 (54, 57, 74)` @(694,2842) w602.4: The Metrics Catalog is a searchable list of every metric defined in your Lightdash semantic layer. Each metric carries its definition, its owner, its categories, and how often it is used. From the catalog, anyone with access can open a metric in the Metrics Explorer and chart it over time without writing SQL.
- `faq-h-48 (54, 57, 74)` @(144,2845) w421.6: Your questions, answered
- `faq-q-20 (54, 57, 74)` @(694,2869) w578.4: What is the Lightdash Metrics Catalog?
- `faq-a-14 (54, 57, 74)` @(694,2930) w602.4: They are three views of the same metrics. The Catalog is the searchable list of approved metrics. The Metrics Explorer is what opens when you click one, charting it over time with filters, segments and comparisons. Metric Trees are shareable diagrams showing how metrics drive each other.
- `faq-q-20 (54, 57, 74)` @(694,2937) w578.4: What’s the difference between the Metrics Catalog, the Metrics Explorer and Metric Trees?
- `lead-18 (102, 109, 128)` @(144,2942) w421.6: For any other questions, reach out to our team.
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,2995) w115: Talk to our team
- `faq-a-14 (54, 57, 74)` @(694,3010) w602.4: You curate the catalog in YAML. Set spotlight.default_visibility to hide in lightdash.config.yml, then set visibility to show on the metrics you want surfaced. You can also assign categories, set an owner per metric, and restrict which dimensions people can filter and segment by.
- `faq-q-20 (54, 57, 74)` @(694,3025) w578.4: How do I control which metrics business users see?
- `faq-a-14 (54, 57, 74)` @(694,3078) w602.4: No. Hiding a metric from the catalog is a curation setting for that view, not a permission. It keeps the catalog to a useful shortlist. Actual access is governed separately by Lightdash roles, spaces and user attributes, which the catalog always respects.
- `faq-q-20 (54, 57, 74)` @(694,3093) w578.4: Is catalog visibility the same as data access control?
- `faq-a-14 (54, 57, 74)` @(694,3146) w602.4: No. The catalog reads whatever metrics exist in your Lightdash semantic layer. dbt is the most common setup, and the spotlight config sits in your dbt YAML. You can also define metrics in standalone Lightdash YAML against your warehouse without dbt at all.
- `faq-q-20 (54, 57, 74)` @(694,3161) w578.4: Do I need dbt to use the Metrics Catalog?
- `faq-a-14 (54, 57, 74)` @(694,3214) w602.4: No. Lightdash has flat rate pricing with unlimited users. A metrics catalog only works when everyone who asks a data question can reach it, so per-seat pricing would defeat the point. Check the pricing page for current plans.
- `faq-q-20 (54, 57, 74)` @(694,3229) w578.4: Does Lightdash charge per user for the Metrics Catalog?
- LINK "pricing page" → ./pricing
- `faq-a-14 (54, 57, 74)` @(694,3282) w602.4: Declare drivers on a metric in your YAML and Lightdash draws the relationships for you, or connect metrics by hand on a canvas and save the tree to share it. Each node shows the metric with period-over-period comparison, so you can see which driver moved.
- `faq-q-20 (54, 57, 74)` @(694,3297) w578.4: How do Metric Trees work?
- `faq-a-14 (54, 57, 74)` @(694,3350) w602.4: Yes, and they share the same curation. Categories, owners, descriptions and visibility all live in your context layer, so tightening the catalog also narrows and sharpens what AI agents and data apps retrieve. One pass of curation improves every surface at once.
- `faq-q-20 (54, 57, 74)` @(694,3365) w578.4: Does the Metrics Catalog work with Lightdash AI agents?

**[CTA @y3473]** → shared CTA band (SHARED.md §CTA)

### embedding (1440, page height 5467px)

**[Hero @y146–588]**
- `display-56 w600 (26, 27, 37)` @(80,246) w1280: Embed AI-powered analytics
- `display-56 w600 (26, 27, 37)` @(80,296) w1280: into your product
- `lead-18 (102, 109, 128)` @(483,371) w475: Governed dashboards, AI analysts, and the power for customers to build their own apps - all embeddable inside your product.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,502) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,502) w91.5: Start for free

**[HeroImage @y588–1364]**


**[Heading @y1364–1451]**
- `body-18s (102, 109, 128)` @(80,1396) w1280: Teams shipping customer-facing analytics on Lightdash.

**[Logos @y1452–1564]**
- IMG 111×18.1 @(771,1499) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)

**[section @y1564–2173]**
- IMG 608×609 @(752,1564) fit:cover [Image Placeholder] → `public/assets/shared/weMGLE6761i2jyEQCzZpjFZSf3w.png` (natural 1280×1705)
- `h3-32 (54, 57, 74)` @(168,1628) w564: Your customers ask, build, and save. Your team stays out of the loop.
- `lead-18 (102, 109, 128)` @(168,1724) w564: Every customer wants a slightly different report. Instead of your team building each one, give them the tools to answer themselves.
- `tab-title-18 (54, 57, 74)` @(168,1833) w560: Embed the AI analyst
- `tab-body-18 (102, 109, 128)` @(168,1869) w560: Your customers ask questions in plain English inside your product and get answers generated through your semantic layer.
- `tab-title-18 (54, 57, 74)` @(168,1971) w560: Embed a dashboard builder
- `tab-title-18 (54, 57, 74)` @(168,2040) w560: Embed data apps
- `tab-title-18 (54, 57, 74)` @(168,2109) w560: Embed the metrics catalog

**[Feature Grid @y2173–2815]**
- `h2-48 (54, 57, 74)` @(152,2261) w1136: Safe to point at your own customers
- `body-16 (107, 114, 128)` @(152,2325) w1136: Opening analytics to external users is a trust decision before it's a feature decision. Here's how the trust part works.
- `card-title-24 w500 (0, 0, 0)` @(180,2413) w309.3: One embed, every tenant
- `card-title-24 w500 (0, 0, 0)` @(565,2413) w309.3: Row-level security in SQL
- `card-title-24 w500 (0, 0, 0)` @(951,2413) w309.3: Same numbers, everywhere
- `card-body-16 w500 (129, 136, 152)` @(180,2449) w309.3: A signed JWT scopes each viewer to what they should see. No accounts to provision, no per-customer setup.
- `card-body-16 w500 (129, 136, 152)` @(565,2449) w309.3: User attributes from the JWT flow into your models, so the restriction lives in the query, and an end user can't touch it.
- `card-body-16 w500 (129, 136, 152)` @(951,2449) w309.3: Embedded charts run through your semantic layer. The figure your customer sees matches the ones you see.
- `card-title-24 w500 (0, 0, 0)` @(180,2602) w309.3: You control the surface
- `card-title-24 w500 (0, 0, 0)` @(565,2602) w309.3: Decide where things go
- `card-title-24 w500 (0, 0, 0)` @(951,2602) w309.3: No hallucinated numbers
- `card-body-16 w500 (129, 136, 152)` @(180,2638) w309.3: Toggle filters, exports, and drill-downs per embed, straight from the token.
- `card-body-16 w500 (129, 136, 152)` @(565,2638) w309.3: Customers build and save their content into a destination space you set.
- `card-body-16 w500 (129, 136, 152)` @(951,2638) w309.3: Embedded AI answers with the metrics you defined in code.
- `h2-48b w600 (39, 40, 53)` @(80,2815) w1280: Choose your integration path

**[section @y2815–2967]**
- `h2-48b w600 (39, 40, 53)` @(80,2815) w1280: Choose your integration path
- `Inter 18px/31.86px (102, 109, 128)` @(604,2882) w232.7: Pick what fits your workflow

**[Stack @y2967–3262]**
- `Britti Sans Medium 18px/18px w500 (39, 40, 53)` @(358,3017) w83.6: React SDK
- `Britti Sans Medium 18px/18px w500 (39, 40, 53)` @(1014,3017) w51.1: iFrame
- `body-16 (129, 136, 152)` @(246,3045) w309: Build highly custom analytics experiences directly inside your React app.
- `body-16 (129, 136, 152)` @(886,3045) w309: Drop dashboards into your app with a simple HTML snippet.
- `body-16 (129, 136, 152)` @(266,3117) w288.8: Native component theming
- `body-16 (129, 136, 152)` @(906,3117) w288.8: Zero engineering overhead
- `body-16 (129, 136, 152)` @(266,3141) w288.8: Built to support localization
- `body-16 (129, 136, 152)` @(906,3141) w288.8: Works instantly
- `body-16 (129, 136, 152)` @(266,3165) w288.8: Pre-org or per-user configuration
- `body-16 (129, 136, 152)` @(906,3165) w288.8: Still gives users interactivity
- `body-16 (129, 136, 152)` @(266,3189) w288.8: Maximum control with minimal code
- `body-16 (129, 136, 152)` @(906,3189) w288.8: Fast POCs

**[section @y3262–3342]**
- IMG 1280×80 @(80,3262) fit:cover [Content-wrapper] → `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (natural 2400×232)

**[Testimonial @y3342–3766]**
- IMG 61×48 @(97,3358) fit:cover [Image] → `public/assets/pages/embedding/Zd3z0SbN1AfU8axsLgfCPRovQ.png` (natural 393×306)
- `quote-32m w500 (54, 57, 74)` @(460,3411) w708: “We evaluated several embedded BI solutions, but Lightdash was the only one that ticked all our boxes. The token-based auth means we don't have to manage thousands of users, and the React SDK lets us make it feel like part of our platform.”
- IMG 124×124 @(272,3492) fit:contain [Frame 2147233107] → `public/assets/pages/embedding/ExsUAS8wNHv3mL0drXNptUF3Z90.png` (natural 248×248)
- `Inter 15px/15px w500 (102, 109, 128)` @(460,3667) w708: Joeri De Turck · Co-founder & CTO @ Qargo
- IMG 61×48 @(1283,3702) fit:cover [Image] → `public/assets/pages/embedding/Zd3z0SbN1AfU8axsLgfCPRovQ.png` (natural 393×306)

**[section @y3766–3846]**
- IMG 1280×80 @(80,3766) fit:cover [Content-wrapper] → `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (natural 2400×232)

**[FAQ @y3846–4314]**
- `faq-a-14 (54, 57, 74)` @(694,3873) w602.4: You can choose from two pricing options: / Pay-as-you-go: First 1,000 loads free, then $0.05 per load
- `faq-h-48 (54, 57, 74)` @(144,3910) w421.6: Your questions, answered
- `faq-q-20 (54, 57, 74)` @(694,3934) w578.4: How much does embedding cost?
- `faq-a-14 (54, 57, 74)` @(694,3965) w602.4: Predictable plan: $790/month for 100k loads per Embed Worker / We also offer custom pricing tailored to your use case.
- `faq-a-14 (54, 57, 74)` @(694,3977) w602.4: You can embed Lightdash dashboards via:
- `faq-a-14 (54, 57, 74)` @(711,4001) w584.7: iFrame - easiest setup
- `faq-q-20 (54, 57, 74)` @(694,4002) w578.4: How do I integrate Lightdash into my app?
- `lead-18 (102, 109, 128)` @(144,4007) w421.6: For any other questions, feel welcome to reach out to our team.
- `faq-a-14 (54, 57, 74)` @(711,4025) w584.7: React SDK - more control & customization options
- `faq-a-14 (54, 57, 74)` @(694,4067) w602.4: All embeds load quickly. Lightdash queries live against your warehouse so there's no extracting and no stale data.
- `faq-q-20 (54, 57, 74)` @(694,4070) w578.4: How fast are embedded dashboards?
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,4092) w115: Talk to our team
- `faq-a-14 (54, 57, 74)` @(694,4135) w602.4: Yes. You can set the font family and background color, and some host styles will cascade into the embed. More advanced styling options are coming soon.
- `faq-q-20 (54, 57, 74)` @(694,4138) w578.4: Can I customize the look & feel of embedded content?
- `faq-a-14 (54, 57, 74)` @(694,4203) w602.4: Absolutely. With row-level security, multi-tenancy, audit logs, and optional self-hosting, you stay fully in control.
- `faq-q-20 (54, 57, 74)` @(694,4206) w578.4: Is my customer data secure?

**[section @y4314–4394]**
- IMG 1280×80 @(80,4314) fit:cover [Content-wrapper] → `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (natural 2400×232)

**[CTA @y4394]** → shared CTA band (SHARED.md §CTA)

### interactive-dashboards (1440, page height 6106px)

**[Hero @y146–1554]**
- `display-72 (28, 0, 0)` @(208,246) w1024: Build and explore / in seconds
- `lead-18 (102, 109, 128)` @(471,407) w498: Build and maintain dashboards using AI. Everything is governed by your context layer, open for anyone to dig into.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,506) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,506) w91.5: Start for free
- IMG 1168.3×763 @(136,592) fit:cover [HeroImage] → `public/assets/pages/interactive-dashboards/z4BxxqyGs9Mak9PeSM25dshLQGM.png` (natural 1167×762)
- `body-18s (102, 109, 128)` @(80,1387) w1280: The data teams that ship fastest don't build their dashboards by hand.
- IMG 111×18.1 @(771,1489) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)
- IMG 608×609 @(752,1554) fit:cover [Image Placeholder] → `public/assets/shared/KMZXbZggONd7XDVETzkGJLaGYI.png` (natural 1280×1705)

**[Self-improving semantic layer @y1554–2163]**
- IMG 608×609 @(752,1554) fit:cover [Image Placeholder] → `public/assets/shared/KMZXbZggONd7XDVETzkGJLaGYI.png` (natural 1280×1705)
- `h3-32 (54, 57, 74)` @(168,1618) w564: Build however your team works
- `lead-18 (102, 109, 128)` @(168,1674) w564: Create dashboards in one of three ways using Lightdash.
- `tab-title-18 (54, 57, 74)` @(168,1792) w560: Drag and drop
- `tab-body-18 (102, 109, 128)` @(168,1828) w560: Drop charts onto a canvas in the UI and arrange the dashboard by hand.
- `tab-title-18 (54, 57, 74)` @(168,1930) w560: Build from your terminal
- `tab-title-18 (54, 57, 74)` @(168,1999) w560: Ask the agent

**[Feature Grid @y2163–3170]**
- `h2-48 (54, 57, 74)` @(152,2251) w1136: Explore the story behind every number.
- IMG 365.3×228 @(152,2335) fit:cover [Image] → `public/assets/pages/interactive-dashboards/vb2zmoA9C70bXTYHm70vTbrQtRk.png` (natural 365×226)
- IMG 365.3×228 @(537,2335) fit:cover [Image] → `public/assets/pages/interactive-dashboards/ExNzp62naKKRjXdfMJQjspQMI0Q.png` (natural 365×226)
- IMG 365.3×228 @(923,2335) fit:cover [Image] → `public/assets/pages/interactive-dashboards/plKsacpHzuqTiD4GbaLGANmuXw.png` (natural 365×226)
- `card-title-24 w500 (0, 0, 0)` @(180,2591) w309.3: Cross-filter
- `card-title-24 w500 (0, 0, 0)` @(565,2591) w309.3: Drill in
- `card-title-24 w500 (0, 0, 0)` @(951,2591) w309.3: Explore from here
- `card-body-16 w500 (129, 136, 152)` @(180,2628) w309.3: Click any value to filter every other chart on the dashboard at once.
- `card-body-16 w500 (129, 136, 152)` @(565,2628) w309.3: Break a metric down by dimension, or open rows for a number.
- `card-body-16 w500 (129, 136, 152)` @(951,2628) w309.3: Jump from a chart straight into a full query, without losing your place.
- IMG 365.3×228 @(152,2727) fit:cover [Image] → `public/assets/pages/interactive-dashboards/eZIJkJHUKfDuWi0Qvd3Qk7b28.png` (natural 365×226)
- IMG 365.3×228 @(537,2727) fit:cover [Image] → `public/assets/pages/interactive-dashboards/EgG8GzJscXxhuLH3FOXqoMyPPMY.png` (natural 365×226)
- IMG 365.3×228 @(923,2727) fit:cover [Image] → `public/assets/pages/interactive-dashboards/hKLRwzg4FLuW3zl7h5bi8kZls.png` (natural 365×226)
- `card-title-24 w500 (0, 0, 0)` @(180,2983) w309.3: Date zoom
- `card-title-24 w500 (0, 0, 0)` @(565,2983) w309.3: Scheduled deliveries
- `card-title-24 w500 (0, 0, 0)` @(951,2983) w309.3: AI bubbles
- `card-body-16 w500 (129, 136, 152)` @(180,3019) w309.3: Switch any dashboard from daily to weekly to fiscal-quarter in a click.
- `card-body-16 w500 (129, 136, 152)` @(565,3019) w309.3: Send a dashboard on a schedule with the right filters already applied.
- `card-body-16 w500 (129, 136, 152)` @(951,3019) w309.3: Use agents to run queries or edit charts straight from the dashboard.

**[Feature Grid @y3170–3583]**
- `h2-48 (54, 57, 74)` @(152,3258) w1136: Speed you can trust.
- `card-title-24 w500 (0, 0, 0)` @(180,3370) w309.3: Governed context layer
- `card-title-24 w500 (0, 0, 0)` @(565,3370) w309.3: Verified content
- `card-title-24 w500 (0, 0, 0)` @(951,3370) w309.3: Locked down
- `card-body-16 w500 (129, 136, 152)` @(180,3407) w309.3: Every dashboard runs on your semantic layer where metrics are defined once, in code.
- `card-body-16 w500 (129, 136, 152)` @(565,3407) w309.3: Mark charts and dashboards as verified, so teams know which numbers to trust.
- `card-body-16 w500 (129, 136, 152)` @(951,3407) w309.3: Permissions follow every viewer, and your data never leaves the controlled environment.

**[Customer Quote @y3584–4497]**
- IMG 100×34 @(670,3794) fit:cover [Logo] → `public/assets/pages/interactive-dashboards/LUAAILodeR6WVJmQ8bEOBbCfEbM.svg` (natural 58×20)
- `quote-40 w600 (26, 27, 37)` @(330,3848) w780: "Lightdash helped us scale self-serve. It’s easy for business users to use and get answers by dragging dimensions, adding filters, and drilling into data."
- IMG 72×72 @(1288,4074) fit:cover [Element 04] → `public/assets/shared/X5SDkd1yAACfVgQB3yQXbGxRPc.png` (natural 72×71)
- IMG 64×64 @(160,4174) fit:cover [Photo] → `public/assets/pages/interactive-dashboards/iwOkmQ44Uz46TAcsaQ7B8Bmsvk.jpg` (natural 64×71)
- `Inter 20px/26px w700 (54, 57, 74)` @(240,4180) w215.1: Abdelmounim Boufous
- LINK "Read case study" → ./customer-story/stake
- `btn-15 w500 (255, 255, 255)` @(1146,4197) w114.2: Read case study
- `body-18s (102, 109, 128)` @(240,4208) w232.4: Senior Data Analyst @ Stake
- `h2-48 w600 (94, 76, 255)` @(112,4302) w362.7: 90%
- `h2-48 w600 (94, 76, 255)` @(539,4302) w362.7: 100%
- `h2-48 w600 (94, 76, 255)` @(965,4302) w362.7: 80%
- `body-18s (102, 109, 128)` @(112,4358) w362.7: of employees using Lightdash
- `body-18s (102, 109, 128)` @(539,4358) w362.7: dashboards migrated
- `body-18s (102, 109, 128)` @(965,4358) w362.7: fewer ad-hoc data requests

**[FAQ @y4497–5033]**
- `faq-a-14 (54, 57, 74)` @(694,4558) w602.4: Yes. Business users don't need to know SQL to explore in Lightdash: click to cross-filter, drill into a metric, view the data behind a chart, or change the date range. For anything beyond that, business users ask the embedded AI agent in plain English and get a governed answer in the same dashboard, no SQL required.
- `faq-h-48 (54, 57, 74)` @(144,4561) w421.6: Your questions, answered
- `faq-q-20 (54, 57, 74)` @(694,4585) w578.4: Can non-technical business users explore dashboards without SQL?
- `faq-a-14 (54, 57, 74)` @(694,4638) w602.4: Yes. Embed governed dashboards into your own product or customer portal with iframe embedding or the React SDK. The permissions you've set follow every viewer, so each customer sees only their own data. Learn more about embedding →
- `faq-q-20 (54, 57, 74)` @(694,4653) w578.4: Can I embed Lightdash dashboards in my own product?
- `lead-18 (102, 109, 128)` @(144,4657) w421.6: For any other questions, reach out to our team.
- LINK "Learn more about embedding →" → ./embedding
- LINK "Talk to our team" → ./start
- `faq-a-14 (54, 57, 74)` @(694,4706) w602.4: Yes. Lightdash manages charts and dashboards as code, so every change is tracked and reviewable in Git, and a bad change is one revert away. That makes it safe to give more people edit access, because anything that breaks can be rolled back.
- `btn-15 w500 (255, 255, 255)` @(164,4710) w115: Talk to our team
- `faq-q-20 (54, 57, 74)` @(694,4721) w578.4: Are Lightdash dashboards version-controlled?
- `faq-a-14 (54, 57, 74)` @(694,4752) w602.4: No, you don't need dbt to use Lightdash.
- `faq-q-20 (54, 57, 74)` @(694,4789) w578.4: Do I need dbt to use Lightdash?
- `faq-a-14 (54, 57, 74)` @(694,4796) w602.4: For teams using dbt, Lightdash builds its semantic layer inside your dbt project. But you can also define your semantic layer in Lightdash YAML against your warehouse without dbt. Either way, every dashboard runs on governed metrics defined once, in code.
- `faq-a-14 (54, 57, 74)` @(694,4842) w602.4: Every dashboard runs on your semantic layer, so metrics trace back to a single definition in code. Your data team can mark charts and dashboards as verified, so everyone can tell an official, approved number from a quick one-off exploration.
- `faq-q-20 (54, 57, 74)` @(694,4857) w578.4: How do I know which dashboards and numbers to trust?
- `faq-a-14 (54, 57, 74)` @(694,4922) w602.4: Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our Slack community.
- `faq-q-20 (54, 57, 74)` @(694,4925) w578.4: I have an infrequently asked question.
- LINK "Slack community" → https://go.lightdash.com/community (_blank)

**[section @y5033]** → shared CTA band (SHARED.md §CTA)

### context-layer (1440, page height 6195px)

**[Hero @y146–1426]**
- `display-72 w600 (94, 76, 255)` @(208,246) w1024: One context layer.  / Consumed by your agents.
- `lead-18 (102, 109, 128)` @(483,407) w475: Give every agent your metrics, business logic, and permissions so the answers you get are accurate, governed, and the same every time.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(593,538) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(764,538) w91.5: Start for free
- `Inter 11px/15.95px w600 oklch(0.58 0.025 285)` @(162,689) w180.3: SOURCE OF TRUTH
- `Inter 11px/15.95px w600 oklch(0.58 0.025 285)` @(362,689) w234.7: PLATFORM
- `Inter 11px/15.95px w600 oklch(0.58 0.025 285)` @(617,689) w407.6: ACTIVATION
- `Inter 11px/15.95px w600 oklch(0.58 0.025 285)` @(1045,689) w231.7: EVALUATION
- `Inter 14px/20.3px w600 oklch(0.22 0.022 285)` @(217,736) w108.8: Your warehouse
- `Inter 14px/20.3px w600 oklch(0.22 0.022 285)` @(417,736) w163.1: Lightdash Context Layer
- `Inter 14px/20.3px w600 oklch(0.22 0.022 285)` @(672,736) w126.3: Consumption layer
- `Inter 14px/20.3px w600 oklch(0.22 0.022 285)` @(1099,736) w98.2: Feedback loop
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,779) w146.3: Amazon Redshift
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(392,792) w174.7: Semantics
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(1075,792) w171.7: Autopilot
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(392,812) w174.7: Metrics · joins
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(1075,812) w171.7: Scheduled health, zero effort
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,823) w146.3: BigQuery
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(647,825) w47.7: Agents
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(838,825) w35.1: Apps
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(647,844) w150.1: Governed autonomous AI
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(838,844) w156.8: Data Products · Workflows
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(392,864) w174.7: Context
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(1075,864) w171.7: Self-improving SL
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,868) w146.3: ClickHouse
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(392,883) w174.7: Business logic · internal docs
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(1075,883) w171.7: Metrics that never drift
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,912) w146.3: Databricks
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(647,929) w80.8: Dashboards
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(838,929) w36.5: SDKs
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(392,936) w174.7: Caching
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(1075,936) w171.7: Caching
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(647,949) w132.6: Interactive · drill-down
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(838,949) w97.9: Python · JS · API
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(392,955) w174.7: Fast · consistent results
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(1075,955) w171.7: S3 · Pre Aggs
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,956) w146.3: MotherDuck
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,1000) w146.3: PostgreSQL
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(392,1007) w174.7: Permissions
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(1075,1007) w171.7: Context
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(392,1027) w174.7: Authentication
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(1075,1027) w171.7: .md · .files
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(647,1033) w75.9: Embedding
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(838,1033) w32.1: MCP
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,1044) w146.3: Snowflake
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(647,1053) w155.5: Customer-facing analytics
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(838,1053) w103.5: Internal / external
- `Inter 14px/17.5px w600 oklch(0.22 0.022 285)` @(1075,1079) w171.7: Permissions
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(179,1088) w146.3: Trino
- `Inter 12.5px/18.125px oklch(0.54 0.02 285)` @(1075,1098) w171.7: RLS · Auth · SSO
- `body-18s (102, 109, 128)` @(80,1258) w1280: The context layer behind data teams at:
- IMG 111×18.1 @(771,1361) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)

**[Split Content Preview @y1426–1890]**
- IMG 551×320 @(744,1498) fit:cover [Image] → `public/assets/pages/context-layer/qIwD83POaESHeMMGqj2Y7tqtg.png` (natural 551×415)
- `h2-48 (54, 57, 74)` @(145,1570) w551: Governed context for your agents
- `lead-18 (102, 109, 128)` @(145,1682) w551: Lightdash agents always use your governed metrics and business context so you can actually trust what comes back.

**[section @y1890–2203]**
- `card-title-24 w500 (0, 0, 0)` @(180,1990) w309.3: Accurate answers
- `card-title-24 w500 (0, 0, 0)` @(565,1990) w309.3: Traceable
- `card-title-24 w500 (0, 0, 0)` @(951,1990) w309.3: One governed path
- `card-body-16 w500 (129, 136, 152)` @(180,2026) w309.3: Agents query your defined metrics, so you don't get hallucinated numbers.
- `card-body-16 w500 (129, 136, 152)` @(565,2026) w309.3: Each response ties back to the query behind it, so you can check the work.
- `card-body-16 w500 (129, 136, 152)` @(951,2026) w309.3: Every agent goes through the same context, instead of improvising against raw SQL.

**[Self-improving semantic layer @y2203–2816]**
- `h2-48 (54, 57, 74)` @(327,2276) w787: Built for data security
- IMG 84×84 @(145,2372) fit:cover [Icon Placeholder] → `public/assets/pages/context-layer/H5tZowpEd4SpTFsapCIMxf1Nsc.png` (natural 372×372)
- IMG 84×84 @(720,2372) fit:cover [Icon Placeholder] → `public/assets/pages/context-layer/SCIwmtZagj1LIcqHmmCZEUWgo.png` (natural 372×372)
- `card-title-24 w500 (0, 0, 0)` @(253,2401) w443: Permissions carry through
- `card-title-24 w500 (0, 0, 0)` @(828,2401) w443: Row- and column-level security
- `card-body-16 w500 (129, 136, 152)` @(253,2471) w443: Permissions live inside the context layer, so the same rules apply whether someone opens a dashboard, builds an app, or asks an agent.
- `card-body-16 w500 (129, 136, 152)` @(828,2471) w443: Control exactly which rows and fields each person sees, defined once and enforced everywhere.
- IMG 84×84 @(145,2565) fit:cover [Icon Placeholder] → `public/assets/pages/context-layer/HO98u4qB1m7tJrfea0uAdSASNf8.png` (natural 372×372)
- IMG 84×84 @(720,2565) fit:cover [Icon Placeholder] → `public/assets/pages/context-layer/tfWD5ZUVO7lLpXhn22AvqiLrESY.png` (natural 372×372)
- `card-title-24 w500 (0, 0, 0)` @(253,2594) w443: Your identity, your rules
- `card-title-24 w500 (0, 0, 0)` @(828,2594) w443: Deploy on your terms
- `card-body-16 w500 (129, 136, 152)` @(253,2664) w443: SSO and access derived from your identity provider and groups, so a restricted metric stays restricted no matter how it's queried.
- `card-body-16 w500 (129, 136, 152)` @(828,2664) w443: SOC 2 compliant, with on-prem options for teams with strict data-residency or compliance requirements.

**[Maintenance Comparison @y2816–3632]**
- `h2-48 (39, 40, 53)` @(360,2867) w720: Why use the Context Layer?
- IMG 96×48 @(80,2979) fit:cover [Element 01] → `public/assets/shared/DJ9t63CK7AvK96kcCGb3lB6I4Ac.png` (natural 96×47)
- `Inter 18px/26px w500 (13, 13, 18)` @(424,2995) w272: Lightdash Context Layer
- `Inter 18px/26px w500 (39, 40, 53)` @(744,2995) w272: Legacy BI
- `Inter 18px/26px w500 (39, 40, 53)` @(1064,2995) w272: Raw LLM on your warehouse
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3061) w272: Consistent, defined metrics
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3061) w272: Yes - one definition per metric in code
- `body-18s (26, 27, 37)` @(744,3061) w272: Partial - trapped in the BI tool
- `body-18s (26, 27, 37)` @(1064,3061) w272: No - guesses from raw tables
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3161) w272: Accurate, traceable AI answers
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3161) w272: Yes, every answer
- `body-18s (26, 27, 37)` @(744,3161) w272: Rarely
- `body-18s (26, 27, 37)` @(1064,3161) w272: No
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3235) w272: Row/column-level permissions
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3235) w272: Yes, in the context layer
- `body-18s (26, 27, 37)` @(744,3235) w272: Varies, tool-specific
- `body-18s (26, 27, 37)` @(1064,3235) w272: No
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3309) w272: Business context for AI
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3309) w272: Yes
- `body-18s (26, 27, 37)` @(744,3309) w272: Limited
- `body-18s (26, 27, 37)` @(1064,3309) w272: No
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3383) w272: Version-controlled in code
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3383) w272: Yes (dbt/Lightdash YAML)
- `body-18s (26, 27, 37)` @(744,3383) w272: No
- `body-18s (26, 27, 37)` @(1064,3383) w272: No
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3457) w272: Caching for speed and cost
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3457) w272: Yes
- `body-18s (26, 27, 37)` @(744,3457) w272: Varies
- `body-18s (26, 27, 37)` @(1064,3457) w272: No
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3531) w272: Self-host/private deployment
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3531) w272: Yes
- `body-18s (26, 27, 37)` @(744,3531) w272: Rarely
- `body-18s (26, 27, 37)` @(1064,3531) w272: No

**[Customer Quote @y3632–4518]**
- IMG 96×24 @(786,3744) fit:cover [Element 06] → `public/assets/pages/context-layer/A5IcxyocQc5idj7qaqDwtAajEWY.png` (natural 96×24)
- IMG 100×32 @(670,3816) fit:contain [Logo] → `public/assets/pages/context-layer/REW2v2KOVTTOCSiWiswSWJlqTM.svg` (natural 300×101)
- `quote-32 w600 (26, 27, 37)` @(330,3868) w780: “If you’re tired of fragmented reporting, duplicated work, and inconsistent numbers, Lightdash is the fastest way to get to a single source of truth."
- IMG 72×72 @(1288,3988) fit:cover [Element 04] → `public/assets/shared/X5SDkd1yAACfVgQB3yQXbGxRPc.png` (natural 72×71)
- IMG 64×64 @(160,4088) fit:cover [Person] → `public/assets/pages/context-layer/NPS46hvEpGtCdwKJ5teu2VzgDto.jpeg` (natural 400×400)
- `Inter 20px/26px w700 (54, 57, 74)` @(240,4094) w157.3: Matthew Powers
- LINK "Read case study" → ./customer-story/tatango
- `btn-15 w500 (255, 255, 255)` @(1146,4111) w114.2: Read case study
- `body-18s (102, 109, 128)` @(240,4122) w382.1: Chief Technology & Product Officer @ Tatango
- `h2-48 w600 (94, 76, 255)` @(112,4216) w362.7: 40%
- `h2-48 w600 (94, 76, 255)` @(539,4216) w362.7: 100%
- `h2-48 w600 (94, 76, 255)` @(965,4216) w362.7: 50%
- `body-18s (102, 109, 128)` @(112,4272) w362.7: reduction in data team hours
- `body-18s (102, 109, 128)` @(539,4272) w362.7: alignment on key metrics
- `body-18s (102, 109, 128)` @(965,4272) w362.7: faster to create dashboards

**[FAQ @y4518–5122]**
- `faq-a-14 (54, 57, 74)` @(694,4579) w602.4: It's the governed layer Lightdash runs on top of your warehouse. It holds your metric definitions, business context, permissions, and caching in one place. Every agent, dashboard, app, and SDK reads from it, so everyone (and every LLM) works from the same source of truth.
- `faq-h-48 (54, 57, 74)` @(144,4582) w421.6: Your questions, answered
- `faq-q-20 (54, 57, 74)` @(694,4606) w578.4: What is the Lightdash context layer?
- `faq-a-14 (54, 57, 74)` @(694,4647) w602.4: A raw LLM has no governed metrics, no permissions, and no business context, so it guesses and can return confidently-wrong numbers. Lightdash agents answer only through the context layer, querying your defined metrics. Every answer traces back to its official definition, so you get accuracy you can audit, not fiction.
- `faq-q-20 (54, 57, 74)` @(694,4674) w578.4: Why not just point ChatGPT or Claude at our warehouse?
- `lead-18 (102, 109, 128)` @(144,4678) w421.6: For any other questions, reach out to our team.
- LINK "Talk to our team" → ./start
- `faq-a-14 (54, 57, 74)` @(694,4727) w602.4: Agents can't query raw tables freely. They answer through your defined metrics in the Context Layer. The richer your descriptions and business context, the more accurate the answers. Every response traces back to the metric and query behind it, so anyone can check it.
- `btn-15 w500 (255, 255, 255)` @(164,4731) w115: Talk to our team
- `faq-q-20 (54, 57, 74)` @(694,4742) w578.4: How does it stop AI from making up metrics?
- `faq-a-14 (54, 57, 74)` @(694,4783) w602.4: Permissions live in the Context Layer, including row- and column-level security, with SSO and access derived from your identity provider. The same rules apply to dashboards, apps, embeds, and AI agents. Lightdash is SOC 2 compliant, with self-hosted and private/on-prem deployment options.
- `faq-q-20 (54, 57, 74)` @(694,4810) w578.4: How do permissions and security work for enterprise?
- `faq-a-14 (54, 57, 74)` @(694,4863) w602.4: No. Most teams build their Context Layer inside an existing dbt project, but you can define it directly in Lightdash YAML against your warehouse tables with no dbt at all. The syntax matches dbt's, so adopting dbt later is straightforward.
- `faq-q-20 (54, 57, 74)` @(694,4878) w578.4: Do I need dbt?
- `faq-a-14 (54, 57, 74)` @(694,4931) w602.4: Lightdash is flat-rate with unlimited users — no per-seat pricing. You can open governed access to your whole company. Enterprise plans add private deployment, advanced security, and SSO. Book a demo for specifics on your setup.
- `faq-q-20 (54, 57, 74)` @(694,4946) w578.4: What does it cost?
- `faq-a-14 (54, 57, 74)` @(694,5011) w602.4: Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our Slack community.
- `faq-q-20 (54, 57, 74)` @(694,5014) w578.4: I have an infrequently asked question.
- LINK "Slack community" → https://go.lightdash.com/community (_blank)

**[section @y5122]** → shared CTA band (SHARED.md §CTA)

### bi-as-code (1440, page height 6792px)

**[Main @y146–6792]**
- `display-72 (13, 13, 18)` @(416,287) w608: Your entire BI as code
- `lead-18 (102, 109, 128)` @(443,448) w554: Your metrics, charts, and dashboards live as code. Build them with coding agents, review them in pull requests, and update 50 charts in one command. All on your governed context layer.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,579) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,579) w91.5: Start for free
- IMG 1280×820.7 @(80,750) fit:cover [BG Pattern] → `public/assets/pages/bi-as-code/KsQ21PJT6e9XU2YmglGUiR4.png` (natural 3195×2595)
- `body-18s (102, 109, 128)` @(16,1603) w1408: The best data teams are shipping analytics as software
- IMG 111×18.1 @(782,1705) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)
- `h2-48 (39, 40, 53)` @(408,1894) w624: Coding agents don't have to click through a dashboard builder.
- IMG 576×408 @(144,2102) fit:cover [Visual] → `public/assets/pages/bi-as-code/pLX5BjHnBUTEqg9FE8wy7LkxuI.png` (natural 576×468)
- IMG 96×48 @(912,2102) fit:cover [Decoration] → `public/assets/pages/bi-as-code/BN6JN0HSy81RpKhNjlZpCHklr8Y.png` (natural 384×192)
- `h3-32 (39, 40, 53)` @(760,2239) w488: Describe the dashboard. Your agent writes it.
- `Inter 14px/21px (102, 109, 128)` @(760,2331) w488: Use Lightdash skills to teach your coding agents how the platform works, and start building dashboards from prompts.
- IMG 72×72 @(648,2510) fit:cover [Decoration] → `public/assets/pages/bi-as-code/JhduHaBEXoLTyxl4cyznQ44uZm4.png` (natural 288×288)
- IMG 576×408 @(720,2510) fit:cover [Visual] → `public/assets/pages/bi-as-code/8oUr90QLhaVvXLVTgladwbcg.png` (natural 576×468)
- `h3-32 (39, 40, 53)` @(192,2637) w488: Review analytics like you review software.
- `Inter 14px/21px (102, 109, 128)` @(192,2729) w488: Every chart and dashboard is a file, so changes move through the workflow your team already trusts: open a PR, spin up a preview environment straight from the CLI, get a review, merge.
- IMG 576×408 @(144,2918) fit:cover [Visual] → `public/assets/pages/bi-as-code/5rKxGpz693Mfl90cnIlAvcSCf1c.png` (natural 576×468)
- IMG 72×96 @(1224,2918) fit:cover [Decoration] → `public/assets/pages/bi-as-code/NKVrATXobCHqNyygPoWbTDIKfo.png` (natural 288×384)
- `h3-32 (39, 40, 53)` @(760,3065) w488: Run maintenance in one command.
- `Inter 14px/21px (102, 109, 128)` @(760,3117) w488: Make maintenance work scriptable: validate your whole project in CI, fix what breaks in bulk, and migrate off your current tool with a script instead of a quarter of rebuilds.
- IMG 96×24 @(912,3302) fit:cover [Decoration] → `public/assets/pages/bi-as-code/A21JEuMCe0OY8iydSfZSsiYCvE.png` (natural 384×96)
- `h2-48 (54, 57, 74)` @(327,3462) w787: What makes BI-as-code work
- IMG 84×84 @(145,3558) fit:cover [Icon Placeholder] → `public/assets/pages/bi-as-code/tHVryl1cOkzBYRDGMF4gXpF8gg.svg` (natural 56×56)
- IMG 84×84 @(720,3558) fit:cover [Icon Placeholder] → `public/assets/pages/bi-as-code/tgo2DvYpK4lLVYtDLNIj3cEcQs.svg` (natural 56×56)
- `card-title-24 w500 (0, 0, 0)` @(253,3587) w443: Lightdash CLI
- `card-title-24 w500 (0, 0, 0)` @(828,3587) w443: MCP server
- `card-body-16 w500 (129, 136, 152)` @(253,3657) w443: Deploy, preview, validate, and rename from your terminal or CI.
- `card-body-16 w500 (129, 136, 152)` @(828,3657) w443: Connect Claude, Cursor, or your internal agents to Lightdash.
- IMG 84×84 @(145,3725) fit:cover [Icon Placeholder] → `public/assets/pages/bi-as-code/2njj1ggnAekTB7x9KJJdqvcEnk.svg` (natural 56×56)
- IMG 84×84 @(720,3725) fit:cover [Icon Placeholder] → `public/assets/pages/bi-as-code/QJ0GD09wsmvl61YkCsvxqzQWaE.svg` (natural 56×56)
- `card-title-24 w500 (0, 0, 0)` @(253,3754) w443: Agent skills
- `card-title-24 w500 (0, 0, 0)` @(828,3754) w443: Git integrations
- `card-body-16 w500 (129, 136, 152)` @(253,3824) w443: One command teaches your coding agent Lightdash conventions.
- `card-body-16 w500 (129, 136, 152)` @(828,3824) w443: GitHub, GitLab, Azure DevOps, and Bitbucket, with PR previews.
- `Inter 21px/36px w500 (255, 255, 255)` @(487,4027) w406: "The shift to dashboards-as-code and agent-driven workflows has been huge for us. We can update, version, and replicate analytics the same way we ship software without spending hours clicking around the UI."
- IMG 64×64 @(208,4068) fit:contain [Person] → `public/assets/pages/bi-as-code/T3PlGRwQc4NlEoRzdZxIjbg508.png` (natural 218×218)
- `Inter 16px/20px (102, 109, 128)` @(208,4156) w121.7: Kevin Otte
- `Inter 12px/20px w500 (255, 255, 255)` @(208,4181) w27.7: fal.ai
- `Inter 14px/20px (164, 172, 185)` @(240,4181) w7.9: •
- `Inter 12px/20px (102, 109, 128)` @(252,4181) w78.1: Data Scientist
- LINK "Read the full case study" → ./customer-story/fal
- `btn-15 w500 (39, 40, 53)` @(1025,4213) w164.7: Read the full case study
- `Inter 40px/40px w500 (39, 40, 53)` @(184,4360) w88.3: 90%
- `Inter 40px/40px w500 (39, 40, 53)` @(563,4360) w49.3: 30
- `Inter 40px/40px w500 (39, 40, 53)` @(941,4360) w87.2: 85%
- `Inter 14px/16.8px (102, 109, 128)` @(284,4363) w214.3: of agent-generated code approved
- `Inter 14px/16.8px (102, 109, 128)` @(624,4363) w253.4: minutes to go from data model to dashboard
- `Inter 14px/16.8px (102, 109, 128)` @(1041,4363) w215.4: of data requests answered in 24 hours
- `faq-a-14 (54, 57, 74)` @(694,4541) w602.4: BI as code means your analytics layer is defined in version-controlled files instead of locked inside a UI. In Lightdash, metrics, charts, and dashboards are YAML in Git, so you can build them with AI coding agents like Claude Code or Cursor, review changes in pull requests, and roll back mistakes.
- `faq-h-48 w500 (54, 57, 74)` @(144,4545) w421.6: Your questions, answered
- `faq-q-20 (54, 57, 74)` @(694,4569) w578.4: What is BI as code?
- `faq-a-14 (54, 57, 74)` @(694,4609) w602.4: No. Lightdash builds its semantic layer from your dbt project or from standalone Lightdash YAML files pointed at your warehouse, with the same syntax. If you adopt dbt later, migration is straightforward. Either way, your metrics are defined once, in code, and every chart is built on them.
- `faq-q-20 (54, 57, 74)` @(694,4637) w578.4: Do I need dbt to use BI as code in Lightdash?
- `lead-18 (102, 109, 128)` @(144,4641) w421.6: For any other questions, feel welcome to reach out to our team.
- `faq-a-14 (54, 57, 74)` @(694,4677) w602.4: No. Business users explore data, filter dashboards, and ask questions through the UI and AI agents, same as any analytics tool. BI as code is for your data team and your coding agents: they build and maintain content in Git while everyone else consumes it without knowing the YAML exists.
- `faq-q-20 (54, 57, 74)` @(694,4705) w578.4: Do business users have to write code?
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,4726) w115: Talk to our team
- `faq-a-14 (54, 57, 74)` @(694,4745) w602.4: Run lightdash install-skills and your coding agent learns Lightdash conventions: how to write valid chart and dashboard YAML on your defined metrics. The Lightdash MCP server does the same for Claude and your internal agents. Because agents build on the semantic layer, they use governed definitions instead of guessing at SQL.
- `faq-q-20 (54, 57, 74)` @(694,4773) w578.4: How do Claude Code and Cursor build correct dashboards?
- `faq-a-14 (54, 57, 74)` @(694,4813) w602.4: Changes go through the same controls as your software. Spin up a preview environment from the CLI, run lightdash validate in CI to catch charts a dbt change would break, and review every edit as a pull request before it merges. Nothing lands in production without a human approving it.
- `faq-q-20 (54, 57, 74)` @(694,4841) w578.4: Will AI edits break my production dashboards?
- `faq-a-14 (54, 57, 74)` @(694,4905) w602.4: No. Lightdash supports traditional exploration and dashboards alongside AI. Teams can adopt BI-as-code gradually.
- `faq-q-20 (54, 57, 74)` @(694,4909) w578.4: Do we have to use AI?
- `faq-a-14 (54, 57, 74)` @(694,4973) w602.4: Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our Slack community.
- `faq-q-20 (54, 57, 74)` @(694,4977) w578.4: I have an infrequently asked question.
- LINK "Slack community" → https://go.lightdash.com/community (_blank)
- `body-18s (102, 109, 128)` @(360,5165) w720: From the blog
- `Inter Variable Variable Regular 40px/47.2px (26, 27, 37)` @(360,5200) w720: Keep building with BI-as-code
- IMG 373.3×160 @(144,5279) fit:cover [Thumbnail] → `public/assets/pages/bi-as-code/mfkymFYWMoo30ROb5Whu0GklLA.png` (natural 373×210)
- LINK "AI-native BI: How I build dashboards in Lightdash " → ./blogpost/ai-native-bi-how-i-build-dashboards-in-cursor-with-lightdash
- IMG 373.3×160 @(533,5279) fit:cover [Thumbnail] → `public/assets/pages/bi-as-code/ApyelhkROZm0T027utFwWVhKXh8.png` (natural 373×210)
- LINK "What makes BI agentic? A guide to AI-powered analy" → ./blogpost/what-makes-bi-agentic
- IMG 373.3×160 @(923,5279) fit:cover [Thumbnail] → `public/assets/pages/bi-as-code/yHwTg5GEPNhLXtcpf99NvktHKqE.png` (natural 373×210)
- LINK "How data teams are using the Lightdash CLI to ship" → ./blogpost/how-data-teams-are-using-the-lightdash-cli-to-ship-analytics-with-ai
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(168,5477) w325.3: AI-native BI: How I build dashboards in Lightdash using Cursor
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(557,5477) w325.3: What makes BI agentic? A guide to AI-powered analytics
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(947,5477) w325.3: How data teams are using the Lightdash CLI to ship analytics with AI
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(585,5548) w84.4: Shanzé Munir
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(196,5576) w57.7: Ian Ahuja
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(975,5576) w84.4: Shanzé Munir
- IMG 64×64 @(80,5793) fit:cover [Group 2085662431] → `public/assets/shared/Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png` (natural 128×128)
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- LINK "Get started" → ./start
- LINK "About us" → ./about
- LINK "Documentation" → https://docs.lightdash.com/introduction (_blank)
- LINK "Live demo" → https://demo.lightdash.com/login (_blank)
- LINK "Careers" → https://jobs.ashbyhq.com/lightdash (_blank)
- LINK "Security" → ./lightdash-security
- LINK "Changelog" → https://changelog.lightdash.com/ (_blank)
- LINK "Privacy Policy" → ./privacy-policy
- LINK "Blog" → ./blog
- LINK "Cloud status" → https://status.lightdash.com/ (_blank)
- LINK "Lightdash University" → https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA (_blank)
- LINK "Lightdash Merch Store" → https://lightdash.shop/ (_blank)
- LINK "" → https://x.com/lightdash_devs (_blank)
- LINK "" → https://www.linkedin.com/company/lightdash/ (_blank)
- LINK "" → https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI%7EQbjCAHQs0WBac3w (_blank)
- LINK "" → https://github.com/lightdash/lightdash (_blank)
- LINK "" → https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA (_blank)

### self-improving-analytics (1440, page height 6181px)

**[section @y146–624]**
- `display-72 (28, 0, 0)` @(208,246) w1024: The data platform that
- `display-72 (94, 76, 255)` @(80,314) w1280: maintains itself
- `lead-18 (102, 109, 128)` @(483,407) w475: A context layer that fixes its own gaps and an Autopilot that cleans dashboards, so your team can stop maintaining analytics by hand.
- LINK "Talk to our team" → ./start
- LINK "Start for free" → https://app.lightdash.cloud/register
- `btn-15 w500 (255, 255, 255)` @(591,538) w115: Talk to our team
- `btn-15 w500 (39, 40, 53)` @(762,538) w91.5: Start for free

**[HeroImage @y624–1460]**
- IMG 1280×836 @(80,624) fit:cover [HeroImage] → `public/assets/pages/self-improving-analytics/PlYzx93tqqN8O2aV4ymkCQEP90.png` (natural 1280×836)

**[Heading @y1460–1547]**
- `body-18s (102, 109, 128)` @(80,1492) w1280: The fastest data teams don't maintain their BI by hand.

**[Logos @y1547–1659]**
- IMG 111×18.1 @(771,1594) fit:cover [JustWatch Logo 1] → `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` (natural 416×68)

**[Self-improving semantic layer @y1659–3236]**
- `h2-48 (39, 40, 53)` @(408,1744) w624: Every analytics tool gets messy the moment real people use it. Lightdash is the only one that cleans itself up.
- IMG 608×609.2 @(752,1985) fit:cover [Image Placeholder] → `public/assets/pages/self-improving-analytics/g3m34sQgJJh8ALeeQmK7xTwLGS4.png` (natural 1280×1705)
- `Inter 13px/16px w500 (255, 255, 255)` @(182,2055) w168.5: Self-improving context layer
- `h3-32 (54, 57, 74)` @(168,2093) w564: Your context layer learns and improves over time.
- `lead-18 (102, 109, 128)` @(168,2189) w564: As your team queries, Lightdash spots where your context layer is thin, out of date, or duplicated, and proposes the fix.
- `tab-title-18 (54, 57, 74)` @(168,2339) w560: It learns from real questions
- `tab-body-18 (102, 109, 128)` @(168,2375) w560: Lightdash proposes changes based on the questions people ask and the metrics they reach for.
- `tab-title-18 (54, 57, 74)` @(168,2477) w560: It proposes the change as a pull request
- `tab-title-18 (54, 57, 74)` @(168,2546) w560: You review and merge
- IMG 608×641.2 @(80,2595) fit:cover [Image Placeholder] → `public/assets/pages/self-improving-analytics/PSkHEoMuQirZqvkSEUPncsPTyaA.png` (natural 1280×1705)
- `Inter 13px/16px w500 (255, 255, 255)` @(790,2665) w53.7: Autopilot
- `h3-32 (54, 57, 74)` @(776,2703) w564: Your project cleans itself up as you use it.
- `lead-18 (102, 109, 128)` @(776,2799) w564: A scheduled agent that runs on a cadence you set. Each run, it reviews recent activity, fixes what it safely can, and flags the rest for review.
- `tab-title-18 (54, 57, 74)` @(776,2981) w560: It clears the dead weight.
- `tab-body-18 (102, 109, 128)` @(776,3017) w560: Soft-deletes dashboards with zero views, and flags the ones gathering dust. Run in read-only mode if you want it to flag only.
- `tab-title-18 (54, 57, 74)` @(776,3120) w560: It fixes what’s broken.
- `tab-title-18 (54, 57, 74)` @(776,3189) w560: It tells you what to build next.

**[Maintenance Comparison @y3237–3871]**
- `h2-48 (39, 40, 53)` @(360,3290) w720: Other tools make maintenance your problem. Lightdash makes it the platform’s.
- IMG 96×48 @(80,3487) fit:cover [Element 01] → `public/assets/shared/DJ9t63CK7AvK96kcCGb3lB6I4Ac.png` (natural 96×47)
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3503) w272: Lightdash
- `Inter 18px/26px w500 (39, 40, 53)` @(744,3503) w272: Legacy BI (Looker, Tableau, Power BI)
- `Inter 18px/26px w500 (39, 40, 53)` @(1064,3503) w272: Raw LLM on your warehouse
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3595) w272: Keeping the semantic layer current
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3595) w272: Proposes changes from real usage; you approve
- `body-18s (26, 27, 37)` @(744,3595) w272: Manual: your team does it
- `body-18s (26, 27, 37)` @(1064,3595) w272: No governed metrics at all
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3695) w272: Stale & broken content
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3695) w272: Autopilot cleans and repairs on a schedule
- `body-18s (26, 27, 37)` @(744,3695) w272: Manual audits, if they happen
- `body-18s (26, 27, 37)` @(1064,3695) w272: Not handled
- `Inter 18px/26px w500 (39, 40, 53)` @(104,3795) w272: Governed & reversible
- `Inter 18px/26px w500 (13, 13, 18)` @(424,3795) w272: Every change reviewed, logged, revertible
- `body-18s (26, 27, 37)` @(744,3795) w272: Varies by tool
- `body-18s (26, 27, 37)` @(1064,3795) w272: No governance, no audit trail

**[FAQ @y3871–4427]**
- `faq-h-48 (54, 57, 74)` @(144,3935) w421.6: Your questions, answered
- `faq-a-14 (54, 57, 74)` @(694,3943) w602.4: As your team asks questions, Lightdash spots gaps, outdated definitions, and duplicate metrics in your semantic layer. It proposes each fix as a pull request, validated with a compile. You review the change and approve, reject, or revert it.
- `faq-q-20 (54, 57, 74)` @(694,3959) w578.4: How does the self-improving context layer work?
- `faq-a-14 (54, 57, 74)` @(694,3999) w602.4: Autopilot is a scheduled agent that keeps your Lightdash project clean. On a cadence you set, it soft-deletes charts with zero views older than 30 days, repairs charts that reference missing fields, flags slow queries, and drafts new charts for questions your team keeps asking. Every action is logged with a reason.
- `faq-q-20 (54, 57, 74)` @(694,4027) w578.4: What does Autopilot do?
- `lead-18 (102, 109, 128)` @(144,4031) w421.6: For any other questions, reach out to our team.
- LINK "Talk to our team" → ./start
- `btn-15 w500 (255, 255, 255)` @(164,4084) w115: Talk to our team
- `faq-a-14 (54, 57, 74)` @(694,4087) w602.4: No. Nothing changes on its own. Context layer edits arrive as pull requests you review before merging. Autopilot only soft-deletes (everything is restorable), never touches content under 30 days old, and reverses its own mistakes on the next run. You can also run it in read-only mode so it only flags.
- `faq-q-20 (54, 57, 74)` @(694,4095) w578.4: Will letting AI edit my context layer or delete dashboards break things?
- `faq-a-14 (54, 57, 74)` @(694,4155) w602.4: A raw LLM on your warehouse has no governed metrics, no business context, and no permissions, so it guesses. Lightdash works on your governed semantic layer: every metric is defined in code, every change is reviewed, and every action is logged. You get the automation without losing your source of truth.
- `faq-q-20 (54, 57, 74)` @(694,4183) w578.4: How is this different from pointing an LLM at my warehouse?
- `faq-a-14 (54, 57, 74)` @(694,4247) w602.4: No. Some teams use use Lightdash to build their semantic layer inside their dbt project, but you can also define it in Lightdash YAML against your warehouse without dbt.
- `faq-q-20 (54, 57, 74)` @(694,4251) w578.4: Do I need dbt to use self-improving analytics?
- `faq-a-14 (54, 57, 74)` @(694,4315) w602.4: Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our Slack community.
- `faq-q-20 (54, 57, 74)` @(694,4319) w578.4: I have an infrequently asked question.
- LINK "Slack community" → https://go.lightdash.com/community (_blank)

**[section @y4427–5109]**
- `body-18s (102, 109, 128)` @(360,4507) w720: From the blog
- `Inter Variable Variable Regular 40px/47.2px (26, 27, 37)` @(360,4542) w720: Keep building with self-improving analytics
- IMG 373.3×160 @(144,4668) fit:cover [Thumbnail] → `public/assets/pages/self-improving-analytics/AayfCxJNtiF47uhuYQR5OV2llE.png` (natural 373×210)
- LINK "Your semantic layer can now fix itself / Shanzé Mu" → ./blogpost/your-semantic-layer-can-now-fix-itself
- IMG 373.3×160 @(533,4668) fit:cover [Thumbnail] → `public/assets/shared/r9UVsrGtVNZpxAmEauOeH12Pokk.png` (natural 373×210)
- LINK "Why your data team is still a bottleneck (and it's" → ./blogpost/why-your-data-team-is-still-a-bottleneck
- IMG 373.3×160 @(923,4668) fit:cover [Thumbnail] → `public/assets/shared/FYOqNAQBg2pLdVk4AIHeq72cWU.png` (natural 373×220)
- LINK "It’s time to build on your data / Hamzah Chaudhary" → ./blogpost/it’s-time-to-build-on-your-data
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(168,4866) w325.3: Your semantic layer can now fix itself
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(557,4866) w325.3: Why your data team is still a bottleneck (and it's not a headcount problem)
- `Inter Variable Variable Regular 22px/27.5px (26, 27, 37)` @(947,4866) w325.3: It’s time to build on your data
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(975,4910) w121.7: Hamzah Chaudhary
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(196,4938) w85.4: Shanzé Munir
- `Inter Variable Variable Regular 13px/15.6px (107, 114, 128)` @(585,4965) w80.2: Oliver Laslett

**[section @y5108]** → shared CTA band (SHARED.md §CTA)

### integrations (1440, page height 3194px)

**[Hero @y106–401]**
- `display-56 (39, 40, 53)` @(144,211) w445.6: Explore Lightdash
- `display-56 (39, 40, 53)` @(144,262) w445.6: Integrations
- `lead-18 (102, 109, 128)` @(144,322) w425: Lightdash integrates with the tools and services you already use and love.

**[Spacer @y401–441]**


**[section @y441–2121]**
- `Inter 13px/19.5px (179, 72, 15)` @(578,461) w69.3: Warehouse
- `Inter 13px/19.5px (179, 72, 15)` @(889,461) w69.3: Warehouse
- `Inter 13px/19.5px (86, 122, 10)` @(1174,461) w94.8: Version Control
- `Britti Sans Medium 18px/18px (39, 40, 53)` @(144,473) w130.6: Table of contents
- `Inter 14px/14px w500 (39, 40, 53)` @(182,516) w15.9: All
- `faq-q-20 (54, 57, 74)` @(384,533) w143.3: Amazon Athena
- `faq-q-20 (54, 57, 74)` @(695,533) w157.5: Amazon RedShift
- `faq-q-20 (54, 57, 74)` @(1006,533) w128.8: Azure DevOps
- `Inter 14px/14px w500 (129, 136, 152)` @(182,550) w72.5: Warehouse
- `body-16 (102, 109, 128)` @(384,563) w271: Connect your Amazon Athena warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(695,563) w271: Connect your Redshift warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(1006,563) w271: Pull your latest data models directly from git and get all the benefits of version control in Lightdash
- `Inter 14px/14px w500 (129, 136, 152)` @(182,584) w98.1: Version Control
- `Inter 14px/14px w500 (129, 136, 152)` @(182,618) w100.5: Alerts & sharing
- `Inter 14px/14px w500 (129, 136, 152)` @(182,652) w97.1: Transformation
- `Inter 14px/14px w500 (129, 136, 152)` @(182,686) w114.9: Data observability
- `Inter 13px/19.5px (179, 72, 15)` @(578,701) w69.3: Warehouse
- `Inter 13px/19.5px (86, 122, 10)` @(863,701) w94.8: Version Control
- `Inter 13px/19.5px (179, 72, 15)` @(1200,701) w69.3: Warehouse
- `Inter 14px/14px w500 (129, 136, 152)` @(182,720) w79.3: Marketplace
- `faq-q-20 (54, 57, 74)` @(384,773) w83.1: BigQuery
- `faq-q-20 (54, 57, 74)` @(695,773) w86.1: Bitbucket
- `faq-q-20 (54, 57, 74)` @(1006,773) w102.5: ClickHouse
- `body-16 (102, 109, 128)` @(384,803) w271: Connect your BigQuery warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(695,803) w271: Pull your latest data models directly from git and get all the benefits of version control in Lightdash
- `body-16 (102, 109, 128)` @(1006,803) w271: Connect your ClickHouse cluster to start building and sharing data insights.
- `Inter 13px/19.5px (179, 72, 15)` @(578,941) w69.3: Warehouse
- `Inter 13px/19.5px (191, 0, 162)` @(865,941) w93.3: Transformation
- `Inter 13px/19.5px (86, 122, 10)` @(1174,941) w94.8: Version Control
- `faq-q-20 (54, 57, 74)` @(384,1013) w96.3: Databricks
- `faq-q-20 (54, 57, 74)` @(695,1013) w30.5: dbt
- `faq-q-20 (54, 57, 74)` @(1006,1013) w59.9: Github
- `body-16 (102, 109, 128)` @(384,1043) w271: Connect your Databricks warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(695,1043) w271: Connect your dbt project and pull through all your metrics.
- `body-16 (102, 109, 128)` @(1006,1043) w271: Pull your latest data models directly from git.
- `Inter 13px/19.5px (86, 122, 10)` @(552,1181) w94.8: Version Control
- `Inter 13px/19.5px (41, 83, 255)` @(882,1181) w76.2: Marketplace
- `Inter 13px/19.5px (41, 83, 255)` @(1158,1181) w111: Data observability
- `faq-q-20 (54, 57, 74)` @(384,1253) w59.8: GitLab
- `faq-q-20 (54, 57, 74)` @(695,1253) w240.5: Google Cloud Marketplace
- `faq-q-20 (54, 57, 74)` @(1006,1253) w94.8: Metaplane
- `body-16 (102, 109, 128)` @(384,1283) w271: Pull your latest data models directly from git and get all the benefits of version control in Lightdash
- `body-16 (102, 109, 128)` @(695,1283) w271: Purchase Lightdash through Google Cloud Marketplace to speed up deployment and apply your GCP committed spend.
- `body-16 (102, 109, 128)` @(1006,1283) w271: Ensure your data quality is always correct using Metaplane.
- `Inter 13px/19.5px (179, 72, 15)` @(578,1421) w69.3: Warehouse
- `Inter 13px/19.5px (204, 0, 60)` @(861,1421) w97.2: Alerts & sharing
- `Inter 13px/19.5px (179, 72, 15)` @(1200,1421) w69.3: Warehouse
- `faq-q-20 (54, 57, 74)` @(384,1493) w110: MotherDuck
- `faq-q-20 (54, 57, 74)` @(695,1493) w93.5: MS Teams
- `faq-q-20 (54, 57, 74)` @(1006,1493) w108.8: PostgreSQL
- `body-16 (102, 109, 128)` @(384,1523) w271: Connect your DuckDB warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(695,1523) w271: Use MS Teams to send reports or share dashboards where your team already works
- `body-16 (102, 109, 128)` @(1006,1523) w271: Connect your Postgres database to start building and sharing data insights.
- `Inter 13px/19.5px (204, 0, 60)` @(550,1661) w97.2: Alerts & sharing
- `Inter 13px/19.5px (41, 83, 255)` @(847,1661) w111: Data observability
- `Inter 13px/19.5px (204, 0, 60)` @(1172,1661) w97.2: Alerts & sharing
- `faq-q-20 (54, 57, 74)` @(384,1733) w83.5: Rollstack
- `faq-q-20 (54, 57, 74)` @(695,1733) w69.5: Secoda
- `faq-q-20 (54, 57, 74)` @(1006,1733) w50.6: Slack
- `body-16 (102, 109, 128)` @(384,1763) w271: Use Rollstack to export Lightdash charts straight into your presentations.
- `body-16 (102, 109, 128)` @(695,1763) w271: Consolidate your data catalog, lineage, governance, monitoring, and observability tools into a single platform.
- `body-16 (102, 109, 128)` @(1006,1763) w271: Use our Slack bot to send reports or share dashboards where your team already works
- `Inter 13px/19.5px (179, 72, 15)` @(578,1901) w69.3: Warehouse
- `Inter 13px/19.5px (179, 72, 15)` @(889,1901) w69.3: Warehouse
- `Inter 13px/19.5px (179, 72, 15)` @(1200,1901) w69.3: Warehouse
- `faq-q-20 (54, 57, 74)` @(384,1973) w94.4: Snowflake
- `faq-q-20 (54, 57, 74)` @(695,1973) w90.1: Supabase
- `faq-q-20 (54, 57, 74)` @(1006,1973) w43.5: Trino
- `body-16 (102, 109, 128)` @(384,2003) w271: Connect your Snowflake warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(695,2003) w271: Connect your Supabase warehouse to start building and sharing data insights.
- `body-16 (102, 109, 128)` @(1006,2003) w271: Connect to Trino to start building and sharing data insights.

**[CTA @y2121]** → shared CTA band (SHARED.md §CTA)

### beyond-copilots (1440, page height 4308px)

**[Event Hero @y106–632]**
- `Inter 14px/16.8px w700 (94, 76, 255)` @(152,178) w265.3: BEYOND COPILOTS · ON-DEMAND
- IMG 100×21 @(152,215) fit:cover [Lightdash] → `public/assets/pages/beyond-copilots/YCM9XN0NlnV9HViPxZORGf2UcU.svg` (natural 201×42)
- IMG 62×18 @(475,216) fit:cover [dltHub] → `public/assets/pages/beyond-copilots/I56RbgF8hkAPpAqLuJV2xIqPdaY.svg` (natural 281×83)
- IMG 141×17 @(293,217) fit:cover [MotherDuck] → `public/assets/pages/beyond-copilots/Fn961oCT6e6cacxURxfdSpV37w.svg` (natural 407×49)
- `display-72 w600 (0, 0, 0)` @(152,256) w908.8: We built the data stack live. Here’s how it worked.
- `lead-18 (102, 109, 128)` @(152,417) w795.2: Watch dltHub, MotherDuck and Lightdash take a live API from ingestion to a governed AI answer, using agents at every layer and one terminal throughout.
- LINK "Watch the build" → https://www.youtube.com/live/S9NJrqRYRhs?si=vobO2NBbpbMWaqH6 (_blank)
- LINK "Talk to our team" → ./start (_blank)
- `btn-15 w500 (255, 255, 255)` @(172,516) w111.5: Watch the build
- `btn-15 w500 (39, 40, 53)` @(339,516) w115: Talk to our team
- `Inter 14px/16.8px (102, 109, 128)` @(152,565) w1136: Recorded live on 18 August 2026

**[section @y632–1570]**
- `h2-48 (54, 57, 74)` @(235,720) w898: Watch the full build
- `body-18s (102, 109, 128)` @(235,784) w640: See the stack come together from the first API request to the final governed answer.
- IMG 970×545.6 @(235,851) fit:cover [YouTube replay placeholder] → `https://i.ytimg.com/vi_webp/S9NJrqRYRhs/maxresdefault.webp` (natural 1280×720)
- LINK "Start for free" → ./start
- `Britti Sans Medium 20px/28px w500 (54, 57, 74)` @(235,1444) w422.4: Want to see what this could look like on your data?
- `btn-15 w500 (255, 255, 255)` @(1098,1449) w87.3: Start for free

**[Split Content Preview @y1571–2035]**
- IMG 551×320 @(744,1643) fit:cover [Image] → `public/assets/pages/beyond-copilots/9bOIM3S5kIt9dtFBnk013Rqbo.png` (natural 551×390)
- `h2-48 (54, 57, 74)` @(145,1667) w551: The query was never the hard part.
- `lead-18 (102, 109, 128)` @(145,1779) w551: The hard part is everything around it: getting data into the warehouse, understanding the schema, defining metrics and giving an agent enough context to return an answer you can trust. This session showed what happens when agents can work across the whole stack instead of stopping at text-to-SQL.

**[section @y2035–2647]**
- `h2-48 (54, 57, 74)` @(152,2123) w525: Build it yourself
- LINK "01 / Get the source code / See the pipeline, confi" → https://github.com/lightdash/lightdash (_blank)
- LINK "02 / Build the pipeline with dltHub / Generate and" → https://dlthub.com/docs/intro (_blank)
- `Britti Sans Trial Semibold 40px/48px w600 (39, 40, 53)` @(169,2219) w38.5: 01
- `Britti Sans Trial Semibold 40px/48px w600 (39, 40, 53)` @(733,2219) w45.2: 02
- `Britti Sans Medium 20px/24px w500 (39, 40, 53)` @(240,2231) w472: Get the source code
- `Britti Sans Medium 20px/24px w500 (39, 40, 53)` @(808,2231) w472: Build the pipeline with dltHub
- `Inter 16px/26px (102, 109, 128)` @(240,2291) w472: See the pipeline, configuration and files used during the live build.
- `Inter 16px/26px (102, 109, 128)` @(808,2291) w472: Generate and deploy an ingestion pipeline from an API.
- `Inter 16px/30px (94, 76, 255)` @(808,2325) w472: Read the dltHub guide →
- `Inter 16px/26px (102, 109, 128)` @(240,2351) w472: See the pipeline, configuration and files used during the live build.
- LINK "03 / Run it on MotherDuck / Load and query the dat" → https://motherduck.com/docs/getting-started/ (_blank)
- LINK "04 / Add governed analytics with Lightdash / Defin" → https://docs.lightdash.com/ (_blank)
- `Britti Sans Trial Semibold 40px/48px w600 (39, 40, 53)` @(165,2439) w46: 03
- `Britti Sans Trial Semibold 40px/48px w600 (39, 40, 53)` @(733,2439) w46.9: 04
- `Britti Sans Medium 20px/24px w500 (39, 40, 53)` @(240,2451) w472: Run it on MotherDuck
- `Britti Sans Medium 20px/24px w500 (39, 40, 53)` @(808,2451) w472: Add governed analytics with Lightdash
- `Inter 16px/26px (102, 109, 128)` @(240,2511) w472: Load and query the data in a serverless DuckDB warehouse.
- `Inter 16px/26px (102, 109, 128)` @(808,2511) w472: Define metrics in code and connect your AI agents to a governed semantic layer.
- `Inter 16px/30px (94, 76, 255)` @(240,2545) w472: Read the MotherDuck guide →
- `Inter 16px/30px (94, 76, 255)` @(808,2571) w472: Read the Lightdash guide →

**[section @y2647–2727]**
- IMG 1280×80 @(80,2647) fit:cover [Content-wrapper] → `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (natural 2400×232)

**[section @y2727–3235]**
- `h2-48 (54, 57, 74)` @(152,2815) w1136: Built live by
- IMG 365.3×124 @(152,2899) fit:cover [Photo band] → `public/assets/pages/beyond-copilots/SV72DfJqXdU4uJ2CqoH41tIn0.png` (natural 365×31)
- IMG 124×124 @(273,2899) fit:cover [Photo] → `public/assets/pages/beyond-copilots/bEOX3oTkQZx6qVn8CvQjrG5P1s.png` (natural 124×124)
- IMG 365.3×124 @(537,2899) fit:cover [Photo band] → `public/assets/pages/beyond-copilots/SV72DfJqXdU4uJ2CqoH41tIn0.png` (natural 365×31)
- IMG 124×124 @(658,2899) fit:cover [Photo] → `public/assets/pages/beyond-copilots/nuvFLTKrnfRmXsaqPceoEuaUuM.png` (natural 124×124)
- IMG 365.3×124 @(923,2899) fit:cover [Photo band] → `public/assets/pages/beyond-copilots/SV72DfJqXdU4uJ2CqoH41tIn0.png` (natural 365×31)
- IMG 124×124 @(1043,2899) fit:cover [Photo] → `public/assets/pages/beyond-copilots/iXvDFf6EXj2FjarKbLSYLhjkIM.png` (natural 124×108)
- IMG 61×18 @(176,3043) fit:cover [dltHub] → `public/assets/pages/beyond-copilots/I56RbgF8hkAPpAqLuJV2xIqPdaY.svg` (natural 281×83)
- IMG 135×16 @(561,3043) fit:cover [MotherDuck] → `public/assets/pages/beyond-copilots/Fn961oCT6e6cacxURxfdSpV37w.svg` (natural 407×49)
- IMG 86×18 @(947,3043) fit:cover [Lightdash] → `public/assets/pages/beyond-copilots/YCM9XN0NlnV9HViPxZORGf2UcU.svg` (natural 201×42)
- `Britti Sans Medium 20px/28px w500 (54, 57, 74)` @(561,3067) w317.3: Jacob Matson
- `Britti Sans Medium 20px/28px w500 (54, 57, 74)` @(176,3069) w317.3: Alena Astrakhantseva
- `Britti Sans Medium 20px/28px w500 (54, 57, 74)` @(947,3069) w317.3: Oliver Laslett
- `lead-18 (102, 109, 128)` @(561,3103) w317.3: Developer Relations
- `lead-18 (102, 109, 128)` @(176,3105) w317.3: Senior Solutions Engineer
- `lead-18 (102, 109, 128)` @(947,3105) w317.3: Co-founder

**[section @y3235]** → shared CTA band (SHARED.md §CTA)

### playground (1440, page height 5731px)

**[Hero @y106–1143]**
- IMG 287×287 @(1073,106) fit:cover [Hero] → `public/assets/pages/playground/dhDCJdJG79D1hjdms5gJlZ69NHo.png` (natural 287×287)
- `Britti Sans Trial Semibold 76px/68.4px (39, 40, 53)` @(153,191) w260.5: Rethink
- `Britti Sans Trial Semibold 76px/68.4px (39, 40, 53)` @(424,191) w86.7: BI.
- `Britti Sans Trial Semibold 76px/68.4px (39, 40, 53)` @(578,191) w170.3: Build
- `Britti Sans Trial Semibold 76px/68.4px (39, 40, 53)` @(759,191) w391: intelligence
- `Britti Sans Trial Semibold 76px/68.4px (0, 0, 0)` @(218,259) w163.6: ...not
- `Britti Sans Trial Semibold 76px/68.4px (0, 0, 0)` @(392,259) w122.6: just
- `Britti Sans Trial Semibold 76px/68.4px (0, 0, 0)` @(524,259) w402.9: dashboards
- `lead-18 (102, 109, 128)` @(153,344) w545: Ask questions. Get instant insights from your custom AI analysts. All-in-one open, developer-loved platform.
- `btn-15 w500 (39, 40, 53)` @(173,444) w90: Book a demo
- `btn-15 w500 (255, 255, 255)` @(319,444) w87.3: Start for free

**[section @y1143–1355]**
- LINK "" → ./customer-stories
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → ./customer-story/fal
- IMG 93×18.3 @(780,1190) fit:cover [Phantom] → `public/assets/pages/playground/tLi5MYBeYQyeZco1DQOGZ3BO00.svg` (natural 300×59)
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-story/collectors
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-story/tatango
- LINK "" → https://www.lightdash.com/customer-stories
- LINK "" → https://www.lightdash.com/customer-stories
- IMG 70×15.5 @(152,1255) fit:cover [Tempo] → `public/assets/pages/playground/PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg` (natural 208×46)
- IMG 92×16 @(567,1255) fit:cover [ModelML] → `public/assets/pages/playground/XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg` (natural 300×52)
- IMG 88×14.9 @(1209,1255) fit:cover [OakNorth] → `public/assets/pages/playground/HhSegQkhKevRNHfWjhD792tCyBc.svg` (natural 130×22)
- IMG 95×13.9 @(992,1256) fit:cover [ServiceNow] → `public/assets/pages/playground/AIq32rD3yBVpA6v6vT01ljT5sc.svg` (natural 300×44)

**[section @y1355–1953]**


**[Feature @y1953–2677]**


**[Feature @y2677–3369]**
- IMG 1280×100 @(80,2677) fit:cover [Frame 2147224894] → `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` (natural 2400×232)

**[Feature @y3369–4085]**


**[section @y4085–4658]**


**[section @y4658]** → shared CTA band (SHARED.md §CTA)


## Appendix B: data-apps sections present only at tablet/mobile (measured at 390)

**[Use cases (mobile/tablet only) @390 y1374 h1724]**
- Britti Sans Trial Semibold 32px/35.2px w400 rgb(39, 40, 53): Custom data visualizations for your whole team
- Britti Sans Medium 18px/26px w400 rgb(39, 40, 53): Everyone builds. Nothing breaks.
- Inter 14px/21px w400 rgb(102, 109, 128): Your team is already building things with LLMs. Those tools are useful, but none of them have row-level security, metric definitions, or lineage. Lightdash Data Apps give you the speed of a vibe-coded tool with the governance of your data stack because every query runs through your semantic layer.
- Britti Sans Medium 18px/26px w400 rgb(39, 40, 53): Maintain a dashboard without opening the UI
- Inter 14px/21px w400 rgb(102, 109, 128): The maintenance work everyone hates is now automated. Agentic BI lets you use AI agents to update charts, add breakdowns, and refresh logic on your behalf, without touching a UI.
- Britti Sans Medium 18px/26px w400 rgb(39, 40, 53): Build complete projects from scratch
- Inter 14px/21px w400 rgb(102, 109, 128): With agentic BI you can ship entire analytics projects in one go. Use agents to create a full set of charts and dashboards from scratch, grounded in your existing data models and metric definitions.
- IMG 358x258 WywMuy9rirQ3RZ4tYXxWhfG0.png
- IMG 358x258 IvH1H176pMQrnJRpYIzq3L6gd1E.png
- IMG 358x258 YXDpaXMYAUeUXE98GDK1IabRqM.png

**[section (mobile/tablet only) @390 y3097 h1029]**
- Britti Sans Medium 18px/26px w400 rgb(54, 57, 74): A request that used to take a sprint now takes a prompt.
- Inter 16px/24px w400 rgb(102, 109, 128): Hit New → App, describe what you want, and iterate in plain English.
- Britti Sans Trial Semibold 18px/28px w400 rgb(54, 57, 74): Start from a template
- Inter Variable 18px/30.6px w400 rgb(102, 109, 128): Dashboard, slide deck, PDF report, or fully custom: the template sets the layout, your prompt does the rest.
- Britti Sans Trial Semibold 18px/28px w400 rgb(54, 57, 74): Iterate by talking
- Britti Sans Trial Semibold 18px/28px w400 rgb(54, 57, 74): On-brand by default
- IMG 358x477 eEulBt7tjYuf5C45bVFaR0H3A.png

**[Comparison (mobile/tablet only) @390 y11648 h1099]**
- Britti Sans Trial Semibold 32px/35.2px w400 rgb(39, 40, 53): Why It's Different
- Inter 16px/26px w700 rgb(26, 27, 37): Traditional BI
- Inter 16px/24px w400 rgb(26, 27, 37): SQL baked into the app
- Inter 16px/24px w400 rgb(26, 27, 37): One view for everybody
- Inter 16px/24px w400 rgb(26, 27, 37): Build your own authentication
- Inter 16px/24px w400 rgb(26, 27, 37): No integrations
- Inter 16px/24px w400 rgb(26, 27, 37): DevOps for deployment
- Inter 16px/26px w700 rgb(26, 27, 37): Lightdash Data Apps
- Inter 16px/24px w400 rgb(26, 27, 37): Query governed metrics
- Inter 16px/24px w400 rgb(26, 27, 37): Row + column level security
- Inter 16px/24px w400 rgb(26, 27, 37): Secure by default
- Inter 16px/24px w400 rgb(26, 27, 37): Backed by semantic layer
- Inter 16px/24px w400 rgb(26, 27, 37): 1 click deploy


## Appendix C: asset manifest (downloaded originals)

Grouped by owner. "shared" means the asset is used on 2 or more product pages and lives in `public/assets/shared/`. "(existing)" means it is already in the project. Extra local assets not listed below:
- `public/assets/shared/logos/*` (customer logo SVGs extracted from inline data URLs)
- `public/assets/shared/footer/*` (G2 badges, footer logo, socials)
- `public/assets/shared/fonts/*`
- `public/assets/shared/components/cta-snake-game.framer.mjs`
- `public/assets/pages/context-layer/context-diagram.html` + `diagram/`
- `public/assets/pages/*/inline-svg-*.svg`
- `public/assets/pages/beyond-copilots/youtube-S9NJrqRYRhs-maxresdefault.webp`

**shared** (32)
- `public/assets/shared/yGf6glYNCy9vFPbhqRvK3HFGibw.png` 26KB ← https://framerusercontent.com/images/yGf6glYNCy9vFPbhqRvK3HFGibw.png [4 pages]
- `public/assets/shared/uAlfjPfpO9rjiU9CV9steG7Ythg.png` 32KB ← https://framerusercontent.com/images/uAlfjPfpO9rjiU9CV9steG7Ythg.png [4 pages]
- `public/assets/shared/uB7eivLm76XmEcwSoR7NdFWfE9w.png` 26KB ← https://framerusercontent.com/images/uB7eivLm76XmEcwSoR7NdFWfE9w.png [4 pages]
- `public/assets/shared/cSMwpvaQWkHp3Yhk4eEhvPwj4.png` 380KB ← https://framerusercontent.com/images/cSMwpvaQWkHp3Yhk4eEhvPwj4.png [3 pages]
- `public/assets/shared/fBtVNQ5ztQ8ixYw2hMZjUaHn3TI.png` 27KB ← https://framerusercontent.com/images/fBtVNQ5ztQ8ixYw2hMZjUaHn3TI.png [4 pages]
- `public/assets/shared/f1UyViHFt7PgRe826li08IlhlDk.png` 2KB ← https://framerusercontent.com/images/f1UyViHFt7PgRe826li08IlhlDk.png [8 pages]
- `public/assets/shared/WaafmTzn2YxUMHu8nSSagFz3AVg.png` 24KB ← https://framerusercontent.com/images/WaafmTzn2YxUMHu8nSSagFz3AVg.png [4 pages]
- `public/assets/shared/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png` 8KB ← https://framerusercontent.com/images/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png [2 pages]
- `public/assets/shared/X5SDkd1yAACfVgQB3yQXbGxRPc.png` 120KB ← https://framerusercontent.com/images/X5SDkd1yAACfVgQB3yQXbGxRPc.png [4 pages]
- `public/assets/shared/aNhLepJYgOuWxVgA6iVjX9c9Uk.png` 0KB ← https://framerusercontent.com/images/aNhLepJYgOuWxVgA6iVjX9c9Uk.png [5 pages]
- `public/assets/shared/fonts/inter-700-latin-DXD0Q7.woff2` 27KB ← https://framerusercontent.com/assets/DXD0Q7LSl7HEvDzucnyLnGBHM.woff2 [8 pages]
- `public/assets/shared/fonts/pixelify-sans-latin.woff2` 7KB ← https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TTp0E1fZZN4h1mWruk.woff2 [11 pages]
- `public/assets/shared/Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png` 2KB ← https://framerusercontent.com/images/Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png [11 pages]
- `public/assets/shared/DlMNiIUSWDaNl7JKEjT9Ai787c.svg` 0KB ← https://framerusercontent.com/images/DlMNiIUSWDaNl7JKEjT9Ai787c.svg [11 pages]
- `public/assets/shared/oS9kDdahYwjrYTZKk5N0PNZ8hE.svg` 0KB ← https://framerusercontent.com/images/oS9kDdahYwjrYTZKk5N0PNZ8hE.svg [11 pages]
- `public/assets/shared/kNn3hjGXK0OehyAzEM2rBhDLIMU.svg` 1KB ← https://framerusercontent.com/images/kNn3hjGXK0OehyAzEM2rBhDLIMU.svg [11 pages]
- `public/assets/shared/ig3NZjUJ7m0kjMMmxsxkHzHgQ.svg` 1KB ← https://framerusercontent.com/images/ig3NZjUJ7m0kjMMmxsxkHzHgQ.svg [11 pages]
- `public/assets/shared/weMGLE6761i2jyEQCzZpjFZSf3w.png` 62KB ← https://framerusercontent.com/images/weMGLE6761i2jyEQCzZpjFZSf3w.png [2 pages]
- `public/assets/shared/PUqa4EzlNULKz1ZkVFl5ZikF07s.svg` 1KB ← https://framerusercontent.com/images/PUqa4EzlNULKz1ZkVFl5ZikF07s.svg [11 pages]
- `public/assets/shared/1dXtMtg8ao6Uylqs5vsrxyDAmvM.png` 1KB ← https://framerusercontent.com/images/1dXtMtg8ao6Uylqs5vsrxyDAmvM.png [2 pages]
- `public/assets/shared/u7dNRCA7eBT5ijuB3LwSSfJMPw.png` 2KB ← https://framerusercontent.com/images/u7dNRCA7eBT5ijuB3LwSSfJMPw.png [2 pages]
- `public/assets/shared/1kZ2cjGoFa40wKm8T64QebKfrR8.png` 1KB ← https://framerusercontent.com/images/1kZ2cjGoFa40wKm8T64QebKfrR8.png [2 pages]
- `public/assets/shared/1mJCqq22wlHJTEtL6wg98s8lIc8.png` 1KB ← https://framerusercontent.com/images/1mJCqq22wlHJTEtL6wg98s8lIc8.png [2 pages]
- `public/assets/shared/FYOqNAQBg2pLdVk4AIHeq72cWU.png` 85KB ← https://framerusercontent.com/images/FYOqNAQBg2pLdVk4AIHeq72cWU.png [2 pages]
- `public/assets/shared/r9UVsrGtVNZpxAmEauOeH12Pokk.png` 134KB ← https://framerusercontent.com/images/r9UVsrGtVNZpxAmEauOeH12Pokk.png [2 pages]
- `public/assets/shared/vSPyThx4i8mUXNF61DgDzHlw2ts.jpg` 2154KB ← https://framerusercontent.com/images/vSPyThx4i8mUXNF61DgDzHlw2ts.jpg [3 pages]
- `public/assets/shared/aDraUDkZqAcMBnIyTtQhMUUUY.webp` 18KB ← https://framerusercontent.com/images/aDraUDkZqAcMBnIyTtQhMUUUY.webp [2 pages]
- `public/assets/shared/3JbD3BBZImXvUCc9Kiykn3ZeNY.webp` 35KB ← https://framerusercontent.com/images/3JbD3BBZImXvUCc9Kiykn3ZeNY.webp [2 pages]
- `public/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png` 9KB ← https://framerusercontent.com/images/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png [3 pages]
- `public/assets/shared/KMZXbZggONd7XDVETzkGJLaGYI.png` 45KB ← https://framerusercontent.com/images/KMZXbZggONd7XDVETzkGJLaGYI.png [2 pages]
- `public/assets/shared/EdZ3nlQS82NQKjR57E9SOX9dfKw.png` 6KB ← https://framerusercontent.com/images/EdZ3nlQS82NQKjR57E9SOX9dfKw.png [2 pages]
- `public/assets/shared/DJ9t63CK7AvK96kcCGb3lB6I4Ac.png` 137KB ← https://framerusercontent.com/images/DJ9t63CK7AvK96kcCGb3lB6I4Ac.png [2 pages]

**(existing)** (8)
- `public/fonts/britti-sans-medium.woff2` 31KB ← https://framerusercontent.com/assets/53b0cytkvSXx6L4kjxKUH3MpVk.woff2
- `public/fonts/britti-sans-semibold.woff2` 12KB ← https://framerusercontent.com/assets/57UiwHmxizMK8eML2ST3LbjSE.woff2
- `public/fonts/inter-500-latin.woff2` 27KB ← https://framerusercontent.com/assets/UjlFhCnUjxhNfep4oYBPqnEssyo.woff2
- `public/fonts/inter-400-latin.woff2` 27KB ← https://framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2
- `public/fonts/inter-variable-framer.woff2` 343KB ← https://framerusercontent.com/assets/zGkzF6Kz3BzLVskEElr1XWKCSro.woff2
- `public/assets/logo/lightdash-logo.riv` 15KB ← https://framerusercontent.com/assets/EVNOizZDdBFzRA84tNZ9N3dZ5w.riv
- `public/fonts/inter-600-latin.woff2` 27KB ← https://framerusercontent.com/assets/yDtI2UI8XcEg1W2je9XPN3Noo.woff2
- `public/fonts/inter-var-latin-gstatic.woff2` 47KB ← https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2

**conversational-analytics** (11)
- `public/assets/pages/conversational-analytics/tbdYQV7hIXUeqIPAKQthWfhjIn8.png` 60KB ← https://framerusercontent.com/images/tbdYQV7hIXUeqIPAKQthWfhjIn8.png
- `public/assets/pages/conversational-analytics/Px0EMFIkikrkmJIdnu3TEqL0A.png` 44KB ← https://framerusercontent.com/images/Px0EMFIkikrkmJIdnu3TEqL0A.png
- `public/assets/pages/conversational-analytics/bqqI6FAwOVvDZPqDpQLLHsMZI.svg` 1KB ← https://framerusercontent.com/images/bqqI6FAwOVvDZPqDpQLLHsMZI.svg
- `public/assets/pages/conversational-analytics/Ok6lRZz120wT2QCg4t959aNzJOQ.svg` 1KB ← https://framerusercontent.com/images/Ok6lRZz120wT2QCg4t959aNzJOQ.svg
- `public/assets/pages/conversational-analytics/crZNgh5koPZHy4Zcv4hVXYYvUI.svg` 1KB ← https://framerusercontent.com/images/crZNgh5koPZHy4Zcv4hVXYYvUI.svg
- `public/assets/pages/conversational-analytics/5WNs7VEwF5qbwNWjQpSoM8GhRQ.svg` 1KB ← https://framerusercontent.com/images/5WNs7VEwF5qbwNWjQpSoM8GhRQ.svg
- `public/assets/pages/conversational-analytics/cjEFP7NIVVQ4kp7d1BeGhHSU.png` 348KB ← https://framerusercontent.com/images/cjEFP7NIVVQ4kp7d1BeGhHSU.png
- `public/assets/pages/conversational-analytics/mkFU8xSJy5QodVqfxBpX7sY160.json` 1254KB ← https://framerusercontent.com/assets/mkFU8xSJy5QodVqfxBpX7sY160.json
- `public/assets/pages/conversational-analytics/zF9BR39x6AxBJpJubwm2qc018wU.jpg` 93KB ← https://framerusercontent.com/images/zF9BR39x6AxBJpJubwm2qc018wU.jpg
- `public/assets/pages/conversational-analytics/mwHOH5Mf9Bogiw2PulfdrjC0x90.png` 51KB ← https://framerusercontent.com/images/mwHOH5Mf9Bogiw2PulfdrjC0x90.png
- `public/assets/pages/conversational-analytics/74F1dzQeHklPz5Z2xLRCqlLGXs0.png` 53KB ← https://framerusercontent.com/images/74F1dzQeHklPz5Z2xLRCqlLGXs0.png

**data-apps** (22)
- `public/assets/pages/data-apps/IR4gGpZAJerX83FSufaDlTWoaAc.svg` 1KB ← https://framerusercontent.com/images/IR4gGpZAJerX83FSufaDlTWoaAc.svg
- `public/assets/pages/data-apps/fM0aEpxYsB9cDnlHKCc3jYe5YU.svg` 18KB ← https://framerusercontent.com/images/fM0aEpxYsB9cDnlHKCc3jYe5YU.svg
- `public/assets/pages/data-apps/qoS6qseJctAjBODti8DVQoiQTaE.svg` 1KB ← https://framerusercontent.com/images/qoS6qseJctAjBODti8DVQoiQTaE.svg
- `public/assets/pages/data-apps/9q96NgtQ1rda2gUYvUGRz0RCE.svg` 15KB ← https://framerusercontent.com/images/9q96NgtQ1rda2gUYvUGRz0RCE.svg
- `public/assets/pages/data-apps/WywMuy9rirQ3RZ4tYXxWhfG0.png` 104KB ← https://framerusercontent.com/images/WywMuy9rirQ3RZ4tYXxWhfG0.png
- `public/assets/pages/data-apps/YXDpaXMYAUeUXE98GDK1IabRqM.png` 70KB ← https://framerusercontent.com/images/YXDpaXMYAUeUXE98GDK1IabRqM.png
- `public/assets/pages/data-apps/IvH1H176pMQrnJRpYIzq3L6gd1E.png` 58KB ← https://framerusercontent.com/images/IvH1H176pMQrnJRpYIzq3L6gd1E.png
- `public/assets/pages/data-apps/8l897rrrL7dbottXvBbdqleBJAY.png` 63KB ← https://framerusercontent.com/images/8l897rrrL7dbottXvBbdqleBJAY.png
- `public/assets/pages/data-apps/b0GGDuSYkZMUPWEetqYw0WbJvM.svg` 34KB ← https://framerusercontent.com/images/b0GGDuSYkZMUPWEetqYw0WbJvM.svg
- `public/assets/pages/data-apps/ge3sLewgXfWxdqDbjsfH7WLy1c.svg` 20KB ← https://framerusercontent.com/images/ge3sLewgXfWxdqDbjsfH7WLy1c.svg
- `public/assets/pages/data-apps/8lTKf2j6JCwfzG4ZqaE4coyss.png` 78KB ← https://framerusercontent.com/images/8lTKf2j6JCwfzG4ZqaE4coyss.png
- `public/assets/pages/data-apps/aS5vBKApP3DzMUw4qaEoPRQGB4.svg` 24KB ← https://framerusercontent.com/images/aS5vBKApP3DzMUw4qaEoPRQGB4.svg
- `public/assets/pages/data-apps/JJVfIMtQjcDvEOHieZhk3X2Tqw.svg` 19KB ← https://framerusercontent.com/images/JJVfIMtQjcDvEOHieZhk3X2Tqw.svg
- `public/assets/pages/data-apps/72M7CKVRXS9egjWHtVF8b147c4w.png` 85KB ← https://framerusercontent.com/images/72M7CKVRXS9egjWHtVF8b147c4w.png
- `public/assets/pages/data-apps/eEulBt7tjYuf5C45bVFaR0H3A.png` 39KB ← https://framerusercontent.com/images/eEulBt7tjYuf5C45bVFaR0H3A.png
- `public/assets/pages/data-apps/2an3boLqMqPL3SCsPMA1Z5bNi9E.png` 96KB ← https://framerusercontent.com/images/2an3boLqMqPL3SCsPMA1Z5bNi9E.png
- `public/assets/pages/data-apps/bSZPFKOcLl57YwOzSbVeVP57k.png` 172KB ← https://framerusercontent.com/images/bSZPFKOcLl57YwOzSbVeVP57k.png
- `public/assets/pages/data-apps/vAW1WmKvr5NPbFEX3uXUx4XbpGw.jpeg` 38KB ← https://framerusercontent.com/images/vAW1WmKvr5NPbFEX3uXUx4XbpGw.jpeg
- `public/assets/pages/data-apps/nID2yZafrg98mIPFQ7tN9PfJY.png` 427KB ← https://framerusercontent.com/images/nID2yZafrg98mIPFQ7tN9PfJY.png
- `public/assets/pages/data-apps/Sy3V08XNn8U0XstWNRpu9DDUu2Y.png` 143KB ← https://framerusercontent.com/images/Sy3V08XNn8U0XstWNRpu9DDUu2Y.png
- `public/assets/pages/data-apps/WtdAn8YuvBtJkngpeYPM7qSYGo.png` 94KB ← https://framerusercontent.com/images/WtdAn8YuvBtJkngpeYPM7qSYGo.png
- `public/assets/pages/data-apps/XHsayKly8sdiowmiqs7qJhD65Q.png` 116KB ← https://framerusercontent.com/images/XHsayKly8sdiowmiqs7qJhD65Q.png

**metrics-catalog** (5)
- `public/assets/pages/metrics-catalog/5Xtb5OGa3oUr6gMYnEnAYcMNrI.png` 119KB ← https://framerusercontent.com/images/5Xtb5OGa3oUr6gMYnEnAYcMNrI.png
- `public/assets/pages/metrics-catalog/U8HetUam73u69VXcJCAbACLfI.png` 120KB ← https://framerusercontent.com/images/U8HetUam73u69VXcJCAbACLfI.png
- `public/assets/pages/metrics-catalog/HI8hLMFAppARD07oDfOR8udT8TY.png` 130KB ← https://framerusercontent.com/images/HI8hLMFAppARD07oDfOR8udT8TY.png
- `public/assets/pages/metrics-catalog/Qf3WXnCdHKiqkei6Y3l47EhM.png` 21KB ← https://framerusercontent.com/images/Qf3WXnCdHKiqkei6Y3l47EhM.png
- `public/assets/pages/metrics-catalog/D2lQkMOAUWc9u41Pmp1ekgWwc2Y.png` 206KB ← https://framerusercontent.com/images/D2lQkMOAUWc9u41Pmp1ekgWwc2Y.png

**embedding** (9)
- `public/assets/pages/embedding/D5EKRZDwA0Qnr21AkBU2iCweciY.png` 1KB ← https://framerusercontent.com/images/D5EKRZDwA0Qnr21AkBU2iCweciY.png
- `public/assets/pages/embedding/ok5ihbleCIOP7kasZsFxxjBROA.png` 3KB ← https://framerusercontent.com/images/ok5ihbleCIOP7kasZsFxxjBROA.png
- `public/assets/pages/embedding/nBGI1zT0I3WluAxCI9w6JbUFo.png` 1KB ← https://framerusercontent.com/images/nBGI1zT0I3WluAxCI9w6JbUFo.png
- `public/assets/pages/embedding/pUFJPew4GSXKimogZE4b5FebCVQ.png` 1KB ← https://framerusercontent.com/images/pUFJPew4GSXKimogZE4b5FebCVQ.png
- `public/assets/pages/embedding/Zd3z0SbN1AfU8axsLgfCPRovQ.png` 21KB ← https://framerusercontent.com/images/Zd3z0SbN1AfU8axsLgfCPRovQ.png
- `public/assets/pages/embedding/ExsUAS8wNHv3mL0drXNptUF3Z90.png` 24KB ← https://framerusercontent.com/images/ExsUAS8wNHv3mL0drXNptUF3Z90.png
- `public/assets/pages/embedding/28O3NwnpOvDD6xz1NZJC0nHhFtw.riv` 1085KB ← https://framerusercontent.com/assets/28O3NwnpOvDD6xz1NZJC0nHhFtw.riv
- `public/assets/pages/embedding/tuJZ1c4LhKeth9Uscr8ADJk2xU0.png` 68KB ← https://framerusercontent.com/images/tuJZ1c4LhKeth9Uscr8ADJk2xU0.png
- `public/assets/pages/embedding/uk4RGpeDInDgHG4RxjEVBhbHQzo.png` 67KB ← https://framerusercontent.com/images/uk4RGpeDInDgHG4RxjEVBhbHQzo.png

**interactive-dashboards** (11)
- `public/assets/pages/interactive-dashboards/z4BxxqyGs9Mak9PeSM25dshLQGM.png` 325KB ← https://framerusercontent.com/images/z4BxxqyGs9Mak9PeSM25dshLQGM.png
- `public/assets/pages/interactive-dashboards/iwOkmQ44Uz46TAcsaQ7B8Bmsvk.jpg` 1107KB ← https://framerusercontent.com/images/iwOkmQ44Uz46TAcsaQ7B8Bmsvk.jpg
- `public/assets/pages/interactive-dashboards/LUAAILodeR6WVJmQ8bEOBbCfEbM.svg` 4KB ← https://framerusercontent.com/images/LUAAILodeR6WVJmQ8bEOBbCfEbM.svg
- `public/assets/pages/interactive-dashboards/vb2zmoA9C70bXTYHm70vTbrQtRk.png` 18KB ← https://framerusercontent.com/images/vb2zmoA9C70bXTYHm70vTbrQtRk.png
- `public/assets/pages/interactive-dashboards/plKsacpHzuqTiD4GbaLGANmuXw.png` 13KB ← https://framerusercontent.com/images/plKsacpHzuqTiD4GbaLGANmuXw.png
- `public/assets/pages/interactive-dashboards/eZIJkJHUKfDuWi0Qvd3Qk7b28.png` 12KB ← https://framerusercontent.com/images/eZIJkJHUKfDuWi0Qvd3Qk7b28.png
- `public/assets/pages/interactive-dashboards/EgG8GzJscXxhuLH3FOXqoMyPPMY.png` 10KB ← https://framerusercontent.com/images/EgG8GzJscXxhuLH3FOXqoMyPPMY.png
- `public/assets/pages/interactive-dashboards/hKLRwzg4FLuW3zl7h5bi8kZls.png` 15KB ← https://framerusercontent.com/images/hKLRwzg4FLuW3zl7h5bi8kZls.png
- `public/assets/pages/interactive-dashboards/ExNzp62naKKRjXdfMJQjspQMI0Q.png` 15KB ← https://framerusercontent.com/images/ExNzp62naKKRjXdfMJQjspQMI0Q.png
- `public/assets/pages/interactive-dashboards/CJ4WhRGlRWSJOWpxUHHXMqTfXLQ.png` 78KB ← https://framerusercontent.com/images/CJ4WhRGlRWSJOWpxUHHXMqTfXLQ.png
- `public/assets/pages/interactive-dashboards/84LSb1lj54AidDwGjKh7vWHYVXg.png` 62KB ← https://framerusercontent.com/images/84LSb1lj54AidDwGjKh7vWHYVXg.png

**context-layer** (8)
- `public/assets/pages/context-layer/qIwD83POaESHeMMGqj2Y7tqtg.png` 30KB ← https://framerusercontent.com/images/qIwD83POaESHeMMGqj2Y7tqtg.png
- `public/assets/pages/context-layer/H5tZowpEd4SpTFsapCIMxf1Nsc.png` 1KB ← https://framerusercontent.com/images/H5tZowpEd4SpTFsapCIMxf1Nsc.png
- `public/assets/pages/context-layer/HO98u4qB1m7tJrfea0uAdSASNf8.png` 1KB ← https://framerusercontent.com/images/HO98u4qB1m7tJrfea0uAdSASNf8.png
- `public/assets/pages/context-layer/SCIwmtZagj1LIcqHmmCZEUWgo.png` 2KB ← https://framerusercontent.com/images/SCIwmtZagj1LIcqHmmCZEUWgo.png
- `public/assets/pages/context-layer/tfWD5ZUVO7lLpXhn22AvqiLrESY.png` 1KB ← https://framerusercontent.com/images/tfWD5ZUVO7lLpXhn22AvqiLrESY.png
- `public/assets/pages/context-layer/REW2v2KOVTTOCSiWiswSWJlqTM.svg` 6KB ← https://framerusercontent.com/images/REW2v2KOVTTOCSiWiswSWJlqTM.svg
- `public/assets/pages/context-layer/A5IcxyocQc5idj7qaqDwtAajEWY.png` 99KB ← https://framerusercontent.com/images/A5IcxyocQc5idj7qaqDwtAajEWY.png
- `public/assets/pages/context-layer/NPS46hvEpGtCdwKJ5teu2VzgDto.jpeg` 25KB ← https://framerusercontent.com/images/NPS46hvEpGtCdwKJ5teu2VzgDto.jpeg

**bi-as-code** (40)
- `public/assets/pages/bi-as-code/BhL1WtWLynqh1Pjg4G9bbbViQhs.png` 4KB ← https://framerusercontent.com/images/BhL1WtWLynqh1Pjg4G9bbbViQhs.png
- `public/assets/pages/bi-as-code/8wv1AxccWAnN3OUMe7KFeFj2Nuk.png` 1KB ← https://framerusercontent.com/images/8wv1AxccWAnN3OUMe7KFeFj2Nuk.png
- `public/assets/pages/bi-as-code/gUzZDqhafShmMAeXzIjqrQwZsG4.jpg` 20KB ← https://framerusercontent.com/images/gUzZDqhafShmMAeXzIjqrQwZsG4.jpg
- `public/assets/pages/bi-as-code/x3Z4NKlNcV0qWh3L4QRIWx0fyIc.png` 3KB ← https://framerusercontent.com/images/x3Z4NKlNcV0qWh3L4QRIWx0fyIc.png
- `public/assets/pages/bi-as-code/KsQ21PJT6e9XU2YmglGUiR4.png` 41KB ← https://framerusercontent.com/images/KsQ21PJT6e9XU2YmglGUiR4.png
- `public/assets/pages/bi-as-code/152SErwTdqgjMe2OHNVORcm1OeA.png` 1KB ← https://framerusercontent.com/images/152SErwTdqgjMe2OHNVORcm1OeA.png
- `public/assets/pages/bi-as-code/pLX5BjHnBUTEqg9FE8wy7LkxuI.png` 52KB ← https://framerusercontent.com/images/pLX5BjHnBUTEqg9FE8wy7LkxuI.png
- `public/assets/pages/bi-as-code/cmGuGaI87Y4y440GGpslFyaO2w4.png` 3KB ← https://framerusercontent.com/images/cmGuGaI87Y4y440GGpslFyaO2w4.png
- `public/assets/pages/bi-as-code/BN6JN0HSy81RpKhNjlZpCHklr8Y.png` 14KB ← https://framerusercontent.com/images/BN6JN0HSy81RpKhNjlZpCHklr8Y.png
- `public/assets/pages/bi-as-code/5rKxGpz693Mfl90cnIlAvcSCf1c.png` 37KB ← https://framerusercontent.com/images/5rKxGpz693Mfl90cnIlAvcSCf1c.png
- `public/assets/pages/bi-as-code/8oUr90QLhaVvXLVTgladwbcg.png` 24KB ← https://framerusercontent.com/images/8oUr90QLhaVvXLVTgladwbcg.png
- `public/assets/pages/bi-as-code/NKVrATXobCHqNyygPoWbTDIKfo.png` 10KB ← https://framerusercontent.com/images/NKVrATXobCHqNyygPoWbTDIKfo.png
- `public/assets/pages/bi-as-code/JhduHaBEXoLTyxl4cyznQ44uZm4.png` 13KB ← https://framerusercontent.com/images/JhduHaBEXoLTyxl4cyznQ44uZm4.png
- `public/assets/pages/bi-as-code/A21JEuMCe0OY8iydSfZSsiYCvE.png` 6KB ← https://framerusercontent.com/images/A21JEuMCe0OY8iydSfZSsiYCvE.png
- `public/assets/pages/bi-as-code/2njj1ggnAekTB7x9KJJdqvcEnk.svg` 1KB ← https://framerusercontent.com/images/2njj1ggnAekTB7x9KJJdqvcEnk.svg
- `public/assets/pages/bi-as-code/tHVryl1cOkzBYRDGMF4gXpF8gg.svg` 1KB ← https://framerusercontent.com/images/tHVryl1cOkzBYRDGMF4gXpF8gg.svg
- `public/assets/pages/bi-as-code/tgo2DvYpK4lLVYtDLNIj3cEcQs.svg` 1KB ← https://framerusercontent.com/images/tgo2DvYpK4lLVYtDLNIj3cEcQs.svg
- `public/assets/pages/bi-as-code/SeCe2c6uRDWaVtUtT5jtwQJo9I.jpg` 4348KB ← https://framerusercontent.com/images/SeCe2c6uRDWaVtUtT5jtwQJo9I.jpg
- `public/assets/pages/bi-as-code/QJ0GD09wsmvl61YkCsvxqzQWaE.svg` 1KB ← https://framerusercontent.com/images/QJ0GD09wsmvl61YkCsvxqzQWaE.svg
- `public/assets/pages/bi-as-code/OsiXnkGAa79N5TWI3WZevZyTzg.mp4` 46170KB ← https://framerusercontent.com/assets/OsiXnkGAa79N5TWI3WZevZyTzg.mp4
- `public/assets/pages/bi-as-code/YMsOT2qz1YkzTuUZmk3cD6nbi1I.png` 2KB ← https://framerusercontent.com/images/YMsOT2qz1YkzTuUZmk3cD6nbi1I.png
- `public/assets/pages/bi-as-code/7h5DHw9Ih0HU00zhwOpGBaZXZ68.png` 2KB ← https://framerusercontent.com/images/7h5DHw9Ih0HU00zhwOpGBaZXZ68.png
- `public/assets/pages/bi-as-code/vyxzfG6HrFRJDobTl0kbKDTlXY.png` 4KB ← https://framerusercontent.com/images/vyxzfG6HrFRJDobTl0kbKDTlXY.png
- `public/assets/pages/bi-as-code/DC14QNwkXo15tzFVKM00AG3nJY.png` 1KB ← https://framerusercontent.com/images/DC14QNwkXo15tzFVKM00AG3nJY.png
- `public/assets/pages/bi-as-code/VEksqL8lGXpmIFqCuukdFNuuBtA.png` 3KB ← https://framerusercontent.com/images/VEksqL8lGXpmIFqCuukdFNuuBtA.png
- `public/assets/pages/bi-as-code/T3PlGRwQc4NlEoRzdZxIjbg508.png` 11KB ← https://framerusercontent.com/images/T3PlGRwQc4NlEoRzdZxIjbg508.png
- `public/assets/pages/bi-as-code/E1kWGbmYoL7eYvddDB6OCLTzM.png` 1KB ← https://framerusercontent.com/images/E1kWGbmYoL7eYvddDB6OCLTzM.png
- `public/assets/pages/bi-as-code/EkNC4wRWARgqYS2HRX4x9gjJos.png` 1KB ← https://framerusercontent.com/images/EkNC4wRWARgqYS2HRX4x9gjJos.png
- `public/assets/pages/bi-as-code/3O4EKHJxQiq8P6Modh8LegrHvUo.png` 2KB ← https://framerusercontent.com/images/3O4EKHJxQiq8P6Modh8LegrHvUo.png
- `public/assets/pages/bi-as-code/2u79ISLrqmWzwdlB5IMQhfiyYg.png` 2KB ← https://framerusercontent.com/images/2u79ISLrqmWzwdlB5IMQhfiyYg.png
- `public/assets/pages/bi-as-code/RvagZAeEMLrHhAAnB9nH1LZGmA.png` 1KB ← https://framerusercontent.com/images/RvagZAeEMLrHhAAnB9nH1LZGmA.png
- `public/assets/pages/bi-as-code/ZZKU9XDPDnPOJUPv0PglqsYQA.png` 1KB ← https://framerusercontent.com/images/ZZKU9XDPDnPOJUPv0PglqsYQA.png
- `public/assets/pages/bi-as-code/06brq6A16uaTRRlYr9ucrY27w.png` 1KB ← https://framerusercontent.com/images/06brq6A16uaTRRlYr9ucrY27w.png
- `public/assets/pages/bi-as-code/5xUmJO1puutfElB9sEs21uiHk.png` 2KB ← https://framerusercontent.com/images/5xUmJO1puutfElB9sEs21uiHk.png
- `public/assets/pages/bi-as-code/cpbtvZupY5JNiCSpB7fLDbe3Oc.png` 2KB ← https://framerusercontent.com/images/cpbtvZupY5JNiCSpB7fLDbe3Oc.png
- `public/assets/pages/bi-as-code/zbzl1JbJ9BKEiwJy42x0Es4YDA.png` 1KB ← https://framerusercontent.com/images/zbzl1JbJ9BKEiwJy42x0Es4YDA.png
- `public/assets/pages/bi-as-code/1mY2vbq6kTUgSPdLaSnEVC2rtw.png` 1KB ← https://framerusercontent.com/images/1mY2vbq6kTUgSPdLaSnEVC2rtw.png
- `public/assets/pages/bi-as-code/ApyelhkROZm0T027utFwWVhKXh8.png` 166KB ← https://framerusercontent.com/images/ApyelhkROZm0T027utFwWVhKXh8.png
- `public/assets/pages/bi-as-code/mfkymFYWMoo30ROb5Whu0GklLA.png` 131KB ← https://framerusercontent.com/images/mfkymFYWMoo30ROb5Whu0GklLA.png
- `public/assets/pages/bi-as-code/yHwTg5GEPNhLXtcpf99NvktHKqE.png` 50KB ← https://framerusercontent.com/images/yHwTg5GEPNhLXtcpf99NvktHKqE.png

**self-improving-analytics** (8)
- `public/assets/pages/self-improving-analytics/PlYzx93tqqN8O2aV4ymkCQEP90.png` 321KB ← https://framerusercontent.com/images/PlYzx93tqqN8O2aV4ymkCQEP90.png
- `public/assets/pages/self-improving-analytics/PSkHEoMuQirZqvkSEUPncsPTyaA.png` 68KB ← https://framerusercontent.com/images/PSkHEoMuQirZqvkSEUPncsPTyaA.png
- `public/assets/pages/self-improving-analytics/g3m34sQgJJh8ALeeQmK7xTwLGS4.png` 76KB ← https://framerusercontent.com/images/g3m34sQgJJh8ALeeQmK7xTwLGS4.png
- `public/assets/pages/self-improving-analytics/AayfCxJNtiF47uhuYQR5OV2llE.png` 237KB ← https://framerusercontent.com/images/AayfCxJNtiF47uhuYQR5OV2llE.png
- `public/assets/pages/self-improving-analytics/KGrOlmbDd6j8KzFJO6WfS5TYTtM.png` 65KB ← https://framerusercontent.com/images/KGrOlmbDd6j8KzFJO6WfS5TYTtM.png
- `public/assets/pages/self-improving-analytics/jZos0LvRA1N4gIGLh7tdO4Mwzp4.png` 33KB ← https://framerusercontent.com/images/jZos0LvRA1N4gIGLh7tdO4Mwzp4.png
- `public/assets/pages/self-improving-analytics/Bb8QWbxAas0wBv5RwGIQDfIAg3c.png` 28KB ← https://framerusercontent.com/images/Bb8QWbxAas0wBv5RwGIQDfIAg3c.png
- `public/assets/pages/self-improving-analytics/4qGSp9gkKoLfM6a5ms9ec2JY4.png` 74KB ← https://framerusercontent.com/images/4qGSp9gkKoLfM6a5ms9ec2JY4.png

**integrations** (35)
- `public/assets/pages/integrations/6qxuabf74xrcuQWWVDrganMy7c.png` 2KB ← https://framerusercontent.com/images/6qxuabf74xrcuQWWVDrganMy7c.png
- `public/assets/pages/integrations/og1rxGrnyfKoy6WAWAtIQNfplrs.png` 1KB ← https://framerusercontent.com/images/og1rxGrnyfKoy6WAWAtIQNfplrs.png
- `public/assets/pages/integrations/4q3jIAkLfgO3ToypIawHONpHvw.png` 2KB ← https://framerusercontent.com/images/4q3jIAkLfgO3ToypIawHONpHvw.png
- `public/assets/pages/integrations/ECfsz0d2tgAZ4zcU4Gh5K1YbUk.png` 0KB ← https://framerusercontent.com/images/ECfsz0d2tgAZ4zcU4Gh5K1YbUk.png
- `public/assets/pages/integrations/aybeQpZeAjpffEr9yf6XbTb4Ges.png` 1KB ← https://framerusercontent.com/images/aybeQpZeAjpffEr9yf6XbTb4Ges.png
- `public/assets/pages/integrations/MrCsvzk6z8V3Izh5zM9iWqAPhJo.png` 1KB ← https://framerusercontent.com/images/MrCsvzk6z8V3Izh5zM9iWqAPhJo.png
- `public/assets/pages/integrations/OLm03MIh47tjY2Z2qwLZPDINNc.png` 2KB ← https://framerusercontent.com/images/OLm03MIh47tjY2Z2qwLZPDINNc.png
- `public/assets/pages/integrations/mF6hudIaanGmRRGPsPv8KTgX78.png` 2KB ← https://framerusercontent.com/images/mF6hudIaanGmRRGPsPv8KTgX78.png
- `public/assets/pages/integrations/xk0JkY7v8jgtZbXqeaRyNGnWdI.png` 0KB ← https://framerusercontent.com/images/xk0JkY7v8jgtZbXqeaRyNGnWdI.png
- `public/assets/pages/integrations/ScH5lXIKGr1OEuYMSii24VTxrA.png` 1KB ← https://framerusercontent.com/images/ScH5lXIKGr1OEuYMSii24VTxrA.png
- `public/assets/pages/integrations/b2wPKVlLfwuA986hOQajwfKmaH4.png` 2KB ← https://framerusercontent.com/images/b2wPKVlLfwuA986hOQajwfKmaH4.png
- `public/assets/pages/integrations/jKUREPWVN8T8NUlX4cLWRg2k.png` 1KB ← https://framerusercontent.com/images/jKUREPWVN8T8NUlX4cLWRg2k.png
- `public/assets/pages/integrations/TkKIIdkMRkcsVDbkAcmVItyufKI.png` 1KB ← https://framerusercontent.com/images/TkKIIdkMRkcsVDbkAcmVItyufKI.png
- `public/assets/pages/integrations/8fV0y12bngbMbIMpsjwoZ7030A.png` 0KB ← https://framerusercontent.com/images/8fV0y12bngbMbIMpsjwoZ7030A.png
- `public/assets/pages/integrations/kfvyfVbNMSKvItRHsNsb6GUs1mc.png` 0KB ← https://framerusercontent.com/images/kfvyfVbNMSKvItRHsNsb6GUs1mc.png
- `public/assets/pages/integrations/27mQyMmrfnx8uDymZLEw7pEf0.png` 0KB ← https://framerusercontent.com/images/27mQyMmrfnx8uDymZLEw7pEf0.png
- `public/assets/pages/integrations/Rkz6X5TZKUJ2a9UrtpB3qmA7Vc.png` 6KB ← https://framerusercontent.com/images/Rkz6X5TZKUJ2a9UrtpB3qmA7Vc.png
- `public/assets/pages/integrations/P7wa5366n0UsiluRklauNrQ0M.png` 2KB ← https://framerusercontent.com/images/P7wa5366n0UsiluRklauNrQ0M.png
- `public/assets/pages/integrations/b2UnRd6QNYxgIdniPZbTle3CNdw.png` 6KB ← https://framerusercontent.com/images/b2UnRd6QNYxgIdniPZbTle3CNdw.png
- `public/assets/pages/integrations/VGOsHnXl8ZW5ALpapKMmucbR4.png` 1KB ← https://framerusercontent.com/images/VGOsHnXl8ZW5ALpapKMmucbR4.png
- `public/assets/pages/integrations/mRca0EVwLuvqdnJYYX596TAxTk.svg` 7KB ← https://framerusercontent.com/images/mRca0EVwLuvqdnJYYX596TAxTk.svg
- `public/assets/pages/integrations/zLqeVHHoorTXgQ28IMxJfEfb8.png` 1KB ← https://framerusercontent.com/images/zLqeVHHoorTXgQ28IMxJfEfb8.png
- `public/assets/pages/integrations/c5AFABfm3g45qDtLf1DrFyWZQ.svg` 1KB ← https://framerusercontent.com/images/c5AFABfm3g45qDtLf1DrFyWZQ.svg
- `public/assets/pages/integrations/0ZSGgAOW7BT3DS4HkXicaEVYcI.png` 1KB ← https://framerusercontent.com/images/0ZSGgAOW7BT3DS4HkXicaEVYcI.png
- `public/assets/pages/integrations/cpv9E7spZqTDhEt93U6z4zqQwc.png` 1KB ← https://framerusercontent.com/images/cpv9E7spZqTDhEt93U6z4zqQwc.png
- `public/assets/pages/integrations/qTJAFCCMCDY219UhMgoxsZsIMY.png` 1KB ← https://framerusercontent.com/images/qTJAFCCMCDY219UhMgoxsZsIMY.png
- `public/assets/pages/integrations/4QD2pSqjJ10VKapoymqK3dzX0TE.png` 1KB ← https://framerusercontent.com/images/4QD2pSqjJ10VKapoymqK3dzX0TE.png
- `public/assets/pages/integrations/kb2zDN9v5Q7C6MEV9CymCqzu6FY.png` 1KB ← https://framerusercontent.com/images/kb2zDN9v5Q7C6MEV9CymCqzu6FY.png
- `public/assets/pages/integrations/HcCLCLqt6IWofAHNrZKjGCSJ9w.png` 0KB ← https://framerusercontent.com/images/HcCLCLqt6IWofAHNrZKjGCSJ9w.png
- `public/assets/pages/integrations/dY9P9ZZMJgdrHpyEXKzCqbHm3M.png` 0KB ← https://framerusercontent.com/images/dY9P9ZZMJgdrHpyEXKzCqbHm3M.png
- `public/assets/pages/integrations/bTfxMiyF6fHx0cA68gFQ5ZHZ7SU.png` 2KB ← https://framerusercontent.com/images/bTfxMiyF6fHx0cA68gFQ5ZHZ7SU.png
- `public/assets/pages/integrations/fIFICIvC6aCLoa7qwF4ZcONU530.png` 1KB ← https://framerusercontent.com/images/fIFICIvC6aCLoa7qwF4ZcONU530.png
- `public/assets/pages/integrations/CFBr4xIVwl7AGajjsDtCLA1WCE.png` 1KB ← https://framerusercontent.com/images/CFBr4xIVwl7AGajjsDtCLA1WCE.png
- `public/assets/pages/integrations/kX07DxNzCNPxZf5BFrQqoUG7u38.png` 1KB ← https://framerusercontent.com/images/kX07DxNzCNPxZf5BFrQqoUG7u38.png
- `public/assets/pages/integrations/3JXpNOEwf93wQwGLzwjVRCWljk.png` 1KB ← https://framerusercontent.com/images/3JXpNOEwf93wQwGLzwjVRCWljk.png

**beyond-copilots** (8)
- `public/assets/pages/beyond-copilots/I56RbgF8hkAPpAqLuJV2xIqPdaY.svg` 2KB ← https://framerusercontent.com/images/I56RbgF8hkAPpAqLuJV2xIqPdaY.svg
- `public/assets/pages/beyond-copilots/9bOIM3S5kIt9dtFBnk013Rqbo.png` 242KB ← https://framerusercontent.com/images/9bOIM3S5kIt9dtFBnk013Rqbo.png
- `public/assets/pages/beyond-copilots/SV72DfJqXdU4uJ2CqoH41tIn0.png` 5KB ← https://framerusercontent.com/images/SV72DfJqXdU4uJ2CqoH41tIn0.png
- `public/assets/pages/beyond-copilots/Fn961oCT6e6cacxURxfdSpV37w.svg` 5KB ← https://framerusercontent.com/images/Fn961oCT6e6cacxURxfdSpV37w.svg
- `public/assets/pages/beyond-copilots/bEOX3oTkQZx6qVn8CvQjrG5P1s.png` 815KB ← https://framerusercontent.com/images/bEOX3oTkQZx6qVn8CvQjrG5P1s.png
- `public/assets/pages/beyond-copilots/YCM9XN0NlnV9HViPxZORGf2UcU.svg` 3KB ← https://framerusercontent.com/images/YCM9XN0NlnV9HViPxZORGf2UcU.svg
- `public/assets/pages/beyond-copilots/nuvFLTKrnfRmXsaqPceoEuaUuM.png` 398KB ← https://framerusercontent.com/images/nuvFLTKrnfRmXsaqPceoEuaUuM.png
- `public/assets/pages/beyond-copilots/iXvDFf6EXj2FjarKbLSYLhjkIM.png` 266KB ← https://framerusercontent.com/images/iXvDFf6EXj2FjarKbLSYLhjkIM.png

**playground** (9)
- `public/assets/pages/playground/5V3jyNVfzb4lsJaXyt7uri6CELk.jpg` 16KB ← https://framerusercontent.com/images/5V3jyNVfzb4lsJaXyt7uri6CELk.jpg
- `public/assets/pages/playground/XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg` 4KB ← https://framerusercontent.com/images/XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg
- `public/assets/pages/playground/PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg` 1KB ← https://framerusercontent.com/images/PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg
- `public/assets/pages/playground/HhSegQkhKevRNHfWjhD792tCyBc.svg` 5KB ← https://framerusercontent.com/images/HhSegQkhKevRNHfWjhD792tCyBc.svg
- `public/assets/pages/playground/tLi5MYBeYQyeZco1DQOGZ3BO00.svg` 3KB ← https://framerusercontent.com/images/tLi5MYBeYQyeZco1DQOGZ3BO00.svg
- `public/assets/pages/playground/AIq32rD3yBVpA6v6vT01ljT5sc.svg` 2KB ← https://framerusercontent.com/images/AIq32rD3yBVpA6v6vT01ljT5sc.svg
- `public/assets/pages/playground/dhDCJdJG79D1hjdms5gJlZ69NHo.png` 33KB ← https://framerusercontent.com/images/dhDCJdJG79D1hjdms5gJlZ69NHo.png
- `public/assets/shared/fonts/geist-latin.woff2` 29KB ← https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2
- `public/assets/shared/fonts/inter-400-latin-ext-JeYwfu.woff2` 25KB ← https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2
