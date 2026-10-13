import { HERO_PIXEL_SETS } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.6 and Appendix A "context-layer".
const A = '/assets/pages/context-layer'
const [p0, p1, p2, p3] = HERO_PIXEL_SETS.purple

// Same purple 10-square cluster as conversational-analytics (reference/pages/context-layer-1440.png)
export const pixels = [
  { src: p0, x: 0, y: 0 },
  { src: p1, x: 32, y: 32 },
  { src: p1, x: 0, y: 64 },
  { src: p2, x: 64, y: 0 },
  { src: p3, x: 128, y: 0 },
  { src: p3, x: 1120, y: 0 },
  { src: p2, x: 1184, y: 0 },
  { src: p1, x: 1216, y: 32 },
  { src: p0, x: 1248, y: 0 },
  { src: p2, x: 1248, y: 64 },
]

export const hero = {
  // Element colour is #5E4CFF with the first sentence in a #1C0000 span, weight 600.
  title: (
    <>
      <span className="text-ld-display">One context layer. </span>
      <br />
      Consumed by your agents.
    </>
  ),
  subtitle: 'Give every agent your metrics, business logic, and permissions so the answers you get are accurate, governed, and the same every time.',
}

export const logosCaption = 'The context layer behind data teams at:'

export const split = {
  heading: 'Governed context for your agents',
  lead: 'Lightdash agents always use your governed metrics and business context so you can actually trust what comes back.',
  image: `${A}/qIwD83POaESHeMMGqj2Y7tqtg.png`,
}

export const cards = [
  { title: 'Accurate answers', body: "Agents query your defined metrics, so you don't get hallucinated numbers." },
  { title: 'Traceable', body: 'Each response ties back to the query behind it, so you can check the work.' },
  { title: 'One governed path', body: 'Every agent goes through the same context, instead of improvising against raw SQL.' },
]

export const security = {
  heading: 'Built for data security',
  items: [
    {
      icon: `${A}/H5tZowpEd4SpTFsapCIMxf1Nsc.png`,
      title: 'Permissions carry through',
      body: 'Permissions live inside the context layer, so the same rules apply whether someone opens a dashboard, builds an app, or asks an agent.',
    },
    {
      icon: `${A}/SCIwmtZagj1LIcqHmmCZEUWgo.png`,
      title: 'Row- and column-level security',
      body: 'Control exactly which rows and fields each person sees, defined once and enforced everywhere.',
    },
    {
      icon: `${A}/HO98u4qB1m7tJrfea0uAdSASNf8.png`,
      title: 'Your identity, your rules',
      body: "SSO and access derived from your identity provider and groups, so a restricted metric stays restricted no matter how it's queried.",
    },
    {
      icon: `${A}/tfWD5ZUVO7lLpXhn22AvqiLrESY.png`,
      title: 'Deploy on your terms',
      body: 'SOC 2 compliant, with on-prem options for teams with strict data-residency or compliance requirements.',
    },
  ],
}

export const comparison = {
  heading: 'Why use the Context Layer?',
  columns: ['', 'Lightdash Context Layer', 'Legacy BI', 'Raw LLM on your warehouse'],
  rows: [
    ['Consistent, defined metrics', 'Yes - one definition per metric in code', 'Partial - trapped in the BI tool', 'No - guesses from raw tables'],
    ['Accurate, traceable AI answers', 'Yes, every answer', 'Rarely', 'No'],
    ['Row/column-level permissions', 'Yes, in the context layer', 'Varies, tool-specific', 'No'],
    ['Business context for AI', 'Yes', 'Limited', 'No'],
    ['Version-controlled in code', 'Yes (dbt/Lightdash YAML)', 'No', 'No'],
    ['Caching for speed and cost', 'Yes', 'Varies', 'No'],
    ['Self-host/private deployment', 'Yes', 'Rarely', 'No'],
  ],
}

export const quote = {
  logo: { src: `${A}/REW2v2KOVTTOCSiWiswSWJlqTM.svg`, alt: 'Tatango', width: 100, height: 32 },
  quote:
    '“If you’re tired of fragmented reporting, duplicated work, and inconsistent numbers, Lightdash is the fastest way to get to a single source of truth."',
  person: { name: 'Matthew Powers', role: 'Chief Technology & Product Officer @ Tatango', photo: `${A}/NPS46hvEpGtCdwKJ5teu2VzgDto.jpeg` },
  cta: { href: './customer-story/tatango' },
  stats: [
    { value: '40%', label: 'reduction in data team hours' },
    { value: '100%', label: 'alignment on key metrics' },
    { value: '50%', label: 'faster to create dashboards' },
  ],
  strip: `${A}/A5IcxyocQc5idj7qaqDwtAajEWY.png`,
}

export const faq = [
  {
    q: 'What is the Lightdash context layer?',
    a: "It's the governed layer Lightdash runs on top of your warehouse. It holds your metric definitions, business context, permissions, and caching in one place. Every agent, dashboard, app, and SDK reads from it, so everyone (and every LLM) works from the same source of truth.",
  },
  {
    q: 'Why not just point ChatGPT or Claude at our warehouse?',
    a: 'A raw LLM has no governed metrics, no permissions, and no business context, so it guesses and can return confidently-wrong numbers. Lightdash agents answer only through the context layer, querying your defined metrics. Every answer traces back to its official definition, so you get accuracy you can audit, not fiction.',
  },
  {
    q: 'How does it stop AI from making up metrics?',
    a: "Agents can't query raw tables freely. They answer through your defined metrics in the Context Layer. The richer your descriptions and business context, the more accurate the answers. Every response traces back to the metric and query behind it, so anyone can check it.",
  },
  {
    q: 'How do permissions and security work for enterprise?',
    a: 'Permissions live in the Context Layer, including row- and column-level security, with SSO and access derived from your identity provider. The same rules apply to dashboards, apps, embeds, and AI agents. Lightdash is SOC 2 compliant, with self-hosted and private/on-prem deployment options.',
  },
  {
    q: 'Do I need dbt?',
    a: "No. Most teams build their Context Layer inside an existing dbt project, but you can define it directly in Lightdash YAML against your warehouse tables with no dbt at all. The syntax matches dbt's, so adopting dbt later is straightforward.",
  },
  {
    q: 'What does it cost?',
    a: 'Lightdash is flat-rate with unlimited users — no per-seat pricing. You can open governed access to your whole company. Enterprise plans add private deployment, advanced security, and SSO. Book a demo for specifics on your setup.',
  },
  {
    q: 'I have an infrequently asked question.',
    a: (
      <>
        Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our{' '}
        <a href="https://go.lightdash.com/community" target="_blank" rel="noopener noreferrer">
          Slack community
        </a>
        .
      </>
    ),
  },
]

// <1200 only (NOT in the spec text; seen in reference/pages/context-layer-390.png): the two
// self-improving accordion rows, with dark pills and hatched placeholder wells instead of images.
// Copy matches /self-improving-analytics (§2.8).
export const mobileTabs = [
  {
    pill: 'Self-improving context layer',
    heading: 'Your context layer learns and improves over time.',
    lead: 'As your team queries, Lightdash spots where your context layer is thin, out of date, or duplicated, and proposes the fix.',
    tabs: [
      { title: 'It learns from real questions', body: 'Lightdash proposes changes based on the questions people ask and the metrics they reach for.' },
      { title: 'It proposes the change as a pull request', body: 'The change is opened in your repo and validated with a compile before it reaches you.' },
      {
        title: 'You review and merge',
        body: 'Every change arrives as a reviewable changeset you approve, reject, or revert. Nothing touches your source of truth on its own.',
      },
    ],
  },
  {
    pill: 'Autopilot',
    heading: 'Your project cleans itself up as you use it.',
    lead: 'A scheduled agent that runs on a cadence you set. Each run, it reviews recent activity, fixes what it safely can, and flags the rest for review.',
    tabs: [
      {
        title: 'It clears the dead weight.',
        body: 'Soft-deletes dashboards with zero views, and flags the ones gathering dust. Run in read-only mode if you want it to flag only.',
      },
      { title: 'It fixes what’s broken.', body: "Finds charts pointing at fields that no longer exist, repairs the ones it can, and flags the ones it can't." },
      {
        title: 'It tells you what to build next.',
        body: 'When people keep asking about something with no saved chart, Autopilot drafts one for review. It also flags slow queries and surfaces popular content stuck out of sight.',
      },
    ],
  },
]
