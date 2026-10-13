# Shared inner-page library

Import from the barrel:

```jsx
import { PageFrame, SectionHero, LogosRow, AccordionTabs, FeatureCards, IconBenefits, CustomerQuote,
  ComparisonTable, Faq, BlogCards, HatchedSpacer, SplitRow, PillTabs, CtaBand, Button,
  Row, Spacer, Lines } from '../components/shared/index.js'
```

Live QA page: **`/__shared`** (`src/pages/SharedDemo.jsx`) renders every component with real content.

## Conventions

- **Shell.** `InnerLayout` (`src/layouts/InnerLayout.jsx`) already renders the announcement bar, the light nav, the top padding (146/106 desktop, 104/64 below 1100), the `<Outlet/>`, the footer and the Cal modal. Pages render **only** their frame, their sections and (where specced) `<CtaBand/>`. Which pages get the banner is decided in `src/App.jsx`.
- **Links.** Pass spec hrefs as written (`./start`, `./customer-story/fal`). `./x` and `/x` become client-side `<Link>`s, and `https://…` stays a plain `<a>`. Use `newTab` for `_blank`.
- **Hairlines.** Framer draws every line as an `::after` overlay, so lines take no layout space. Use `<Lines sides="trbl" dashed />` inside any `relative` box. `sides` is any combination of `t r b l`. Solid lines are for section frames and dashed lines are for internal grid lines. The default colour is `border-ld-line` (#E5E7EB).
- **Type tokens** are CSS classes in `src/index.css`: `ld-display-72`, `ld-display-56`, `ld-cta-56`, `ld-h2-48`, `ld-faq-h-48`, `ld-stat-48`, `ld-quote-40`, `ld-quote-32`, `ld-h3-38`, `ld-h3-32`, `ld-card-title-24`, `ld-faq-q-20`, `ld-tab-title-18`, `ld-tab-pill-14`, `ld-lead-18`, `ld-tab-body-18`, `ld-tabbed-lead-18`, `ld-caption-18`, `ld-card-body-16`, `ld-sub-16`, `ld-name-20`, `ld-btn-15`, `ld-faq-a-14`, `ld-blog-h2`, `ld-blog-card-22`, `ld-blog-meta-13`. Each carries its SHARED §3 default colour and its responsive sizes. Override the colour with a `text-*` utility.
- **Colour tokens** (Tailwind, `ld-*`) are in `tailwind.config.js`. Examples: `bg-ld-dark`, `text-ld-ink`, `text-ld-body`, `bg-ld-well`, `border-ld-line`.
- **Breakpoints.** Phone is <810 (`tab:` = ≥810). The nav switches at 1100 (`desk:`). Content desktop is ≥1200 (`min-[1200px]:`).
- **Motion.** Only interaction motion is built in: button hover springs, accordion/FAQ open, the tab progress line and the snake game. Load animations (hero fade and pixel drop) are left to the Animation agent through the `data-hero` and `data-hero-pixel` hooks.

---

## Frame primitives (`Frame.jsx`)

| Component | Props | Notes |
|---|---|---|
| `PageFrame` | `frame='trl'`, `clip=true`, `className` | The 1280 Content-wrapper (`calc(100% - 32px)`, max 1280, centred, flex column). Product pages use `trl`. CMS and legal pages use `trbl`. |
| `Row` | `height`, `lines='b'`, `dashed=true`, `color`, `as`, `className` | A full-width "blueprint" row with a hairline. |
| `Spacer` | `height`, `lines='b'`, `dashed=true` | An empty graph-paper row (20/24/32/40/100…). |
| `Section` | `lines`, `dashed`, `as='section'` | A plain white relative block. |
| `Lines` | `sides`, `dashed`, `color='border-ld-line'`, `className` | A hairline overlay. |

```jsx
<PageFrame frame="trbl">
  <Spacer height={66} />                       {/* legal Hero row */}
  <Row height={20} className="flex items-center gap-[10px] px-[64px]">…Last Updated…</Row>
  <Spacer height={24} />
  <Row className="px-[64px]"><h1 className="…">Privacy Policy</h1></Row>
  <Spacer height={40} />
  …
  <CtaBand lines="trl" />
</PageFrame>
```

## `Button`

`variant`: `primary | secondary | third | fourth | fifth | sixth | seventh | v1-purple | v1-light`. Other props: `href`, `newTab`, `onClick`, `icon` (a node placed after the label) and `className`. With no `href` it renders a `<button>`.

```jsx
<Button variant="third" href="./start">Talk to our team</Button>
<Button variant="fourth" href="https://app.lightdash.cloud/register">Start for free</Button>
<Button variant="v1-light" href="./customer-story/x" icon={<ArrowIcon/>}>Read the full case study</Button>
```

## `AnnouncementBar`

Props: `href`, `text`, `mobileText`, `linkLabel`. The defaults are the Chart Studio copy. It is already rendered by `InnerLayout`.

## `Footer`

It takes no props and is already rendered by `InnerLayout`. The data is exported as `FOOTER_COLUMNS`, `G2_BADGES` and `SOCIALS`. The newsletter form is UI only and does not submit anywhere.

## `CtaBand` (+ `SnakeGame`)

```jsx
<CtaBand />                 // standard band, side lines
<CtaBand lines="trl" />     // + top line (legal pages)
<CtaBand narrow />          // /blog index: 968 band, 840 panel
```

Props: `title` ([line1, line2]), `primary` ({label, tabletLabel, href}), `secondary`, `mobilePrimary`, `mobileSecondary`, `lines='rl'`, `narrow`. The defaults are the measured copy and links, including "Sign up" at 810–999 and the phone labels "Start for free" / "Try live demo". The game is hidden at 810–999, matching the live site.

`SnakeGame` can be used standalone: `<SnakeGame block={30} interactive background="transparent" className="h-full w-full" />`. It fills its box. Don't give it `absolute`, because `.snk-stage` is `position: relative`.

## `SectionHero`

```jsx
import { SectionHero, HERO_PIXEL_POSITIONS as P, HERO_PIXEL_SETS as S } from '…/shared/index.js'
<SectionHero
  pixels={[{ src: S.purple[0], x: 0, y: 0 }, { src: S.purple[1], x: 32, y: 32 }, …]}   // positions from P.*
  title={<>Ask your data a question. <span className="text-brand-purple">Trust every answer</span> that comes back.</>}
  subtitle="Lightdash AI agents answer questions in plain English using your governed semantic layer."
  image={<img src="…" className="block w-[980px] max-w-full" />}
  imagePadding="48px 24px 0"
/>
```

| Prop | Default | Notes |
|---|---|---|
| `pixels` | `[]` | `{src, x, y, size=32, drop=-32}`. Squares with x≥640 anchor to the right edge. Stack two entries at the same x/y for the data-apps layered squares. Integrations: `drop: 30` for the bottom cluster. |
| `title`, `titleVariant` | `'72'` | `'56'` gives display-56 with a dashed top line (metrics, embedding). |
| `titleClassName` | | e.g. `text-ld-ink-strong` (bi-as-code) or `text-black` (beyond-copilots). |
| `subtitle`, `subtitleWidth` | 498 | measured 468–498 |
| `buttons` | Third "Talk to our team" → ./start, Fourth "Start for free" → register | `[{label, href, variant}]`; pass `[]` to hide |
| `image`, `imagePadding`, `imageBackground`, `imageHeight`, `imageClassName` | glow bg, `0 24px` | The HeroImage block. Pass `imageBackground={null}` for no background. |

## `LogosRow`

`<LogosRow caption="The data teams that stopped being a ticket queue." />`. Props: `caption`, `logos` (default: the 6 shared logos), `fixedColumns` (keeps 6 columns at every width, for self-improving). The grid is 6 columns from 1200, 3 columns at 810 and 2 columns on phone.

## `AccordionTabs`

```jsx
<AccordionTabs
  heading="Ask questions where you already work."
  lead="The question usually lands in Slack…"
  tabs={[{ title: 'In the dashboard', body: '…', image: '/assets/…png' }, …]}
  imageSide="right"            // 'left' for the second row
  pill="Optional subtitle pill" spacer={true} minHeight={609}
/>
```

The first tab is open by default (`defaultIndex`). A tab with no `image` renders an empty #F7F8FA well, as on the live site.

## `FeatureCards`

`layout`: `'1x3' | '3x2' | '3x2-images' | '2x2'`. Props: `heading`, `sub`, `align` (centred by default only for 2x2), `cards=[{title, body, image?}]`, `lines` (e.g. `"rl"`).

```jsx
<FeatureCards layout="1x3" heading="Trust every app your team builds." sub="Every Data App runs…" cards={[…]} />
```

## `IconBenefits`

`<IconBenefits heading={<>AI that gets better<br/>the more you use it.</>} items={[{ icon, title, body }, …]} />`. The icon is an 84×84 pixel-art asset.

## `CustomerQuote`

```jsx
<CustomerQuote
  logo={{ src: '/assets/shared/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png', alt: 'JustWatch' }}
  quote={'"We create specialized agents…"'}  quoteSize="40"           // '32' on context-layer
  person={{ name: 'Aleksandr Zolotukhin', role: 'VP of Data & Analytics @ JustWatch', photo: '…' }}
  cta={{ href: './customer-story/justwatch' }}                        // omit → no button
  stats={[{ value: '86%', label: 'reduction in BI tool spend' }, …]}  // optional
  strip={{ src: QUOTE_DECOR.strip, width: 96, height: 24, className: 'left-[…] bottom-0' }} // context-layer
  linesFooter                                                          // context-layer divider
/>
```

## `ComparisonTable`

`<ComparisonTable heading={…} columns={['', 'Lightdash', 'Looker', 'Power BI']} rows={[[label, ld, a, b], …]} headingBlock={false} />`. Cells can be nodes. Below 810 each row stacks as a block.

## `Faq`

`<Faq items={[{ q, a }, …]} lead={FAQ_LEADS.long} />`. `a` is rich content: links are styled #5E4CFF and `<strong>` is set to 700. Items toggle independently. Other props: `heading`, `cta` (`null` hides the button).

## `BlogCards`

`<BlogCards heading="Keep building with Data Apps" posts={[{ title, href: './blogpost/slug', thumbnail, author: { name, avatar } }]} />`. `eyebrow` defaults to "From the blog".

## `HatchedSpacer`

`<HatchedSpacer opacity={0.8} />`. It is 80 tall (39 on phone).

## `SplitRow`

`<SplitRow heading="Governed context for your agents" lead="…" image="/assets/pages/context-layer/qIwD83POaESHeMMGqj2Y7tqtg.png" />`

## `PillTabs`

```jsx
// data-apps: heading above, body only
<PillTabs heading="If you can describe it, your team can ship it." imageAspect="1232 / 765" tabs={[{ label: 'Finance', body, image }, …]} />
// metrics-catalog: h3 + body under the pills, narrower card
<PillTabs sectionClassName="px-[24px] py-[64px]" maxWidth={1180} imageAspect="1132 / 580" tabs={[{ label: 'Catalog', title, body, image }, …]} />
```
