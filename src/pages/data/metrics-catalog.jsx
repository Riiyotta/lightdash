import { HERO_PIXEL_SETS, SmartLink } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.3 and Appendix A "metrics-catalog".
const A = '/assets/pages/metrics-catalog'
const [l0, l1, l2, l3] = HERO_PIXEL_SETS.lavender

// 10 positions, lavender set; file → position read off reference/pages/metrics-catalog-1440.png
export const pixels = [
  { src: l0, x: 0, y: 0 },
  { src: l1, x: 32, y: 32 },
  { src: l3, x: 0, y: 64 },
  { src: l2, x: 64, y: 0 },
  { src: l0, x: 128, y: 0 },
  { src: l0, x: 1120, y: 0 },
  { src: l2, x: 1184, y: 0 },
  { src: l1, x: 1216, y: 32 },
  { src: l0, x: 1248, y: 0 },
  { src: l3, x: 1248, y: 64 },
]

export const hero = {
  title: (
    <>
      <span className="block">Every metric your team agreed on,</span>
      <span className="block text-brand-purple">in one place</span>
    </>
  ),
  subtitle:
    "Search the catalog, click any metric, and see it charted over time with its owner, its definition and last year's comparison already in place.",
  image: `${A}/5Xtb5OGa3oUr6gMYnEnAYcMNrI.png`,
}

export const logosCaption = 'Trusted by data teams who define their metrics once, in code'

export const pillTabs = [
  {
    label: 'Catalog',
    title: 'Everyone knows which number is the real one',
    body: 'Search every metric in your semantic layer. Each metric shows its owner, its category and how often your team actually uses it.',
    image: `${A}/U8HetUam73u69VXcJCAbACLfI.png`,
  },
  {
    label: 'Explorer',
    title: 'A question gets an answer, not a new dashboard',
    body: 'Click a metric and it charts itself over time. Compare it to the same window last year, segment it by any dimension, filter to the slice you care about, then hand off to a full query if needed.',
    image: `${A}/HI8hLMFAppARD07oDfOR8udT8TY.png`,
  },
  {
    label: 'Curate',
    title: "A catalog is useful when it's a shortlist",
    body: 'Curation lives in your YAML, reviewed in pull requests like everything else. Hide by default, assign categories, and pre-select filters so the first chart someone sees is the useful one. Access is still governed by roles, spaces and user attributes.',
    image: `${A}/Qf3WXnCdHKiqkei6Y3l47EhM.png`,
  },
  {
    label: 'Trees',
    title: 'See how the business works, in a picture that stays true',
    body: 'Declare drivers in your YAML and Lightdash draws metric trees for you, or connect metrics by hand and save the tree. Every node carries its period-over-period movement, so the driver that shifted is obvious.',
    image: `${A}/D2lQkMOAUWc9u41Pmp1ekgWwc2Y.png`,
  },
]

export const curate = {
  heading: 'Curate once, and your AI agents get better too',
  sub: 'The categories, owners, descriptions and visibility rules you write for the catalog are the same context your agents and data apps read.',
  cards: [
    { title: 'Agents retrieve the same metrics', body: 'A tighter catalog means answers that land on the approved definition.' },
    { title: 'Data apps inherit the definitions', body: 'Anything on the semantic layer uses your metric, not a fresh piece of SQL.' },
    { title: 'One definition, everywhere', body: 'Edit the metric in code and the catalog, charts, agents and apps all move together.' },
  ],
}

export const faq = [
  {
    q: 'What is the Lightdash Metrics Catalog?',
    a: 'The Metrics Catalog is a searchable list of every metric defined in your Lightdash semantic layer. Each metric carries its definition, its owner, its categories, and how often it is used. From the catalog, anyone with access can open a metric in the Metrics Explorer and chart it over time without writing SQL.',
  },
  {
    q: 'What’s the difference between the Metrics Catalog, the Metrics Explorer and Metric Trees?',
    a: 'They are three views of the same metrics. The Catalog is the searchable list of approved metrics. The Metrics Explorer is what opens when you click one, charting it over time with filters, segments and comparisons. Metric Trees are shareable diagrams showing how metrics drive each other.',
  },
  {
    q: 'How do I control which metrics business users see?',
    a: 'You curate the catalog in YAML. Set spotlight.default_visibility to hide in lightdash.config.yml, then set visibility to show on the metrics you want surfaced. You can also assign categories, set an owner per metric, and restrict which dimensions people can filter and segment by.',
  },
  {
    q: 'Is catalog visibility the same as data access control?',
    a: 'No. Hiding a metric from the catalog is a curation setting for that view, not a permission. It keeps the catalog to a useful shortlist. Actual access is governed separately by Lightdash roles, spaces and user attributes, which the catalog always respects.',
  },
  {
    q: 'Do I need dbt to use the Metrics Catalog?',
    a: 'No. The catalog reads whatever metrics exist in your Lightdash semantic layer. dbt is the most common setup, and the spotlight config sits in your dbt YAML. You can also define metrics in standalone Lightdash YAML against your warehouse without dbt at all.',
  },
  {
    q: 'Does Lightdash charge per user for the Metrics Catalog?',
    a: (
      <>
        No. Lightdash has flat rate pricing with unlimited users. A metrics catalog only works when everyone who asks a data question can reach it, so
        per-seat pricing would defeat the point. Check the <SmartLink href="./pricing">pricing page</SmartLink> for current plans.
      </>
    ),
  },
  {
    q: 'How do Metric Trees work?',
    a: 'Declare drivers on a metric in your YAML and Lightdash draws the relationships for you, or connect metrics by hand on a canvas and save the tree to share it. Each node shows the metric with period-over-period comparison, so you can see which driver moved.',
  },
  {
    q: 'Does the Metrics Catalog work with Lightdash AI agents?',
    a: 'Yes, and they share the same curation. Categories, owners, descriptions and visibility all live in your context layer, so tightening the catalog also narrows and sharpens what AI agents and data apps retrieve. One pass of curation improves every surface at once.',
  },
]
