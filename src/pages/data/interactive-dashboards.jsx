import { HERO_PIXEL_SETS, SmartLink } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.5 and Appendix A "interactive-dashboards".
const A = '/assets/pages/interactive-dashboards'
const S = '/assets/shared'
const [p0, p1, p2, p3] = HERO_PIXEL_SETS.purple

// Same purple 10-square cluster as conversational-analytics (reference/pages/interactive-dashboards-1440.png)
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
  title: (
    <>
      Build and explore <br />
      <span className="text-brand-purple">in seconds</span>
    </>
  ),
  subtitle: 'Build and maintain dashboards using AI. Everything is governed by your context layer, open for anyone to dig into.',
  image: `${A}/z4BxxqyGs9Mak9PeSM25dshLQGM.png`,
}

export const logosCaption = "The data teams that ship fastest don't build their dashboards by hand."

export const tabs = {
  heading: 'Build however your team works',
  lead: 'Create dashboards in one of three ways using Lightdash.',
  tabs: [
    {
      title: 'Drag and drop',
      body: 'Drop charts onto a canvas in the UI and arrange the dashboard by hand.',
      image: `${S}/KMZXbZggONd7XDVETzkGJLaGYI.png`,
    },
    {
      title: 'Build from your terminal',
      body: 'Create and maintain dashboards at scale using the Lightdash CLI & your coding agent.',
      image: `${A}/CJ4WhRGlRWSJOWpxUHHXMqTfXLQ.png`,
    },
    {
      title: 'Ask the agent',
      body: 'Describe the dashboard you want in plain English and let AI agents build it for you.',
      image: `${A}/84LSb1lj54AidDwGjKh7vWHYVXg.png`,
    },
  ],
}

export const explore = {
  heading: 'Explore the story behind every number.',
  cards: [
    { title: 'Cross-filter', body: 'Click any value to filter every other chart on the dashboard at once.', image: `${A}/vb2zmoA9C70bXTYHm70vTbrQtRk.png` },
    { title: 'Drill in', body: 'Break a metric down by dimension, or open rows for a number.', image: `${A}/ExNzp62naKKRjXdfMJQjspQMI0Q.png` },
    { title: 'Explore from here', body: 'Jump from a chart straight into a full query, without losing your place.', image: `${A}/plKsacpHzuqTiD4GbaLGANmuXw.png` },
    { title: 'Date zoom', body: 'Switch any dashboard from daily to weekly to fiscal-quarter in a click.', image: `${A}/eZIJkJHUKfDuWi0Qvd3Qk7b28.png` },
    { title: 'Scheduled deliveries', body: 'Send a dashboard on a schedule with the right filters already applied.', image: `${A}/EgG8GzJscXxhuLH3FOXqoMyPPMY.png` },
    { title: 'AI bubbles', body: 'Use agents to run queries or edit charts straight from the dashboard.', image: `${A}/hKLRwzg4FLuW3zl7h5bi8kZls.png` },
  ],
}

export const speed = {
  heading: 'Speed you can trust.',
  cards: [
    { title: 'Governed context layer', body: 'Every dashboard runs on your semantic layer where metrics are defined once, in code.' },
    { title: 'Verified content', body: 'Mark charts and dashboards as verified, so teams know which numbers to trust.' },
    { title: 'Locked down', body: 'Permissions follow every viewer, and your data never leaves the controlled environment.' },
  ],
}

export const quote = {
  logo: { src: `${A}/LUAAILodeR6WVJmQ8bEOBbCfEbM.svg`, alt: 'Stake' },
  quote:
    '"Lightdash helped us scale self-serve. It’s easy for business users to use and get answers by dragging dimensions, adding filters, and drilling into data."',
  person: { name: 'Abdelmounim Boufous', role: 'Senior Data Analyst @ Stake', photo: `${A}/iwOkmQ44Uz46TAcsaQ7B8Bmsvk.jpg` },
  cta: { href: './customer-story/stake' },
  stats: [
    { value: '90%', label: 'of employees using Lightdash' },
    { value: '100%', label: 'dashboards migrated' },
    { value: '80%', label: 'fewer ad-hoc data requests' },
  ],
}

export const faq = [
  {
    q: 'Can non-technical business users explore dashboards without SQL?',
    a: "Yes. Business users don't need to know SQL to explore in Lightdash: click to cross-filter, drill into a metric, view the data behind a chart, or change the date range. For anything beyond that, business users ask the embedded AI agent in plain English and get a governed answer in the same dashboard, no SQL required.",
  },
  {
    q: 'Can I embed Lightdash dashboards in my own product?',
    a: (
      <>
        Yes. Embed governed dashboards into your own product or customer portal with iframe embedding or the React SDK. The permissions you've set
        follow every viewer, so each customer sees only their own data. <SmartLink href="./embedding">Learn more about embedding →</SmartLink>
      </>
    ),
  },
  {
    q: 'Are Lightdash dashboards version-controlled?',
    a: 'Yes. Lightdash manages charts and dashboards as code, so every change is tracked and reviewable in Git, and a bad change is one revert away. That makes it safe to give more people edit access, because anything that breaks can be rolled back.',
  },
  {
    q: 'Do I need dbt to use Lightdash?',
    a: (
      <>
        <p className="m-0">No, you don't need dbt to use Lightdash.</p>
        <p className="m-0">
          For teams using dbt, Lightdash builds its semantic layer inside your dbt project. But you can also define your semantic layer in Lightdash
          YAML against your warehouse without dbt. Either way, every dashboard runs on governed metrics defined once, in code.
        </p>
      </>
    ),
  },
  {
    q: 'How do I know which dashboards and numbers to trust?',
    a: 'Every dashboard runs on your semantic layer, so metrics trace back to a single definition in code. Your data team can mark charts and dashboards as verified, so everyone can tell an official, approved number from a quick one-off exploration.',
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
