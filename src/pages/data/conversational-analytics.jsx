import { HERO_PIXEL_SETS } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.1 and Appendix A "conversational-analytics".
const A = '/assets/pages/conversational-analytics'
const S = '/assets/shared'
const [p0, p1, p2, p3] = HERO_PIXEL_SETS.purple

// SHARED §7.1 cluster; file → position read off reference/pages/conversational-analytics-1440.png
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
      Ask your data a question. <span className="text-brand-purple">Trust every answer</span> that comes back.
    </>
  ),
  subtitle: 'Lightdash AI agents answer questions in plain English using your governed semantic layer.',
  subtitleWidth: 498,
  image: `${A}/inline-svg-1-heroimage-980x659.svg`,
}

export const logosCaption = 'The data teams that stopped being a ticket queue.'

export const tabsRow1 = {
  heading: 'Ask questions where you already work.',
  lead: 'The question usually lands in Slack or on a dashboard. The answer should land there too.',
  tabs: [
    {
      title: 'In the dashboard',
      body: 'Hit "Ask AI" on any chart or dashboard and start a conversation with that view already pinned as context.',
      image: `${A}/tbdYQV7hIXUeqIPAKQthWfhjIn8.png`,
    },
    {
      title: 'In Slack and Teams',
      body: 'Tag your agent in a channel or thread and get an answer back where the conversation is happening.',
      image: `${A}/zF9BR39x6AxBJpJubwm2qc018wU.jpg`,
    },
    {
      title: 'Embedded in your product',
      body: 'Drop a scoped agent into your own app with the React SDK, so your customers can ask their own data questions too.',
      image: `${S}/weMGLE6761i2jyEQCzZpjFZSf3w.png`,
    },
  ],
}

export const tabsRow2 = {
  heading: "Built for the people who don't write SQL.",
  lead: 'Anyone can ask in plain English and get an answer, without touching SQL or the query builder.',
  tabs: [
    {
      title: 'Ask in any language',
      body: 'Questions in French, Japanese, Portuguese, and more. All answered, with the chart, in the same language.',
      image: `${A}/Px0EMFIkikrkmJIdnu3TEqL0A.png`,
    },
    {
      // No image on the live site either: renders an empty #F7F8FA well (spec §2.1 / §5).
      title: 'Show me what I can ask',
      body: 'New users can ask the agent what it knows, and see suggested questions drawn from your verified answers.',
    },
    {
      title: 'Even vague questions work',
      body: 'Instead of erroring on a fuzzy question, the agent coaches the person toward what they actually want to know.',
      image: `${A}/74F1dzQeHklPz5Z2xLRCqlLGXs0.png`,
    },
  ],
}

export const governed = {
  heading: 'Get governed answers each time.',
  cards: [
    {
      title: 'Runs on the semantic layer',
      body: 'Every answer is built from the metrics you defined once in code, so "revenue" means the same thing here as everywhere else.',
    },
    {
      title: 'A semantic query, not raw SQL',
      body: 'The agent returns a governed query you can open in the normal explore view and check, so you can see exactly how it got there.',
    },
    {
      title: 'Permissions follow the person',
      body: 'Turn on OAuth and each Slack question respects that user’s own data access. People only ever see what they’re allowed to.',
    },
    {
      title: 'Says when it can’t',
      body: 'When the data isn’t there, the agent tells you, instead of hallucinating and inventing wrong answers.',
    },
  ],
}

export const benefits = {
  heading: (
    <>
      AI that gets better
      <br />
      the more you use it.
    </>
  ),
  items: [
    {
      icon: `${A}/bqqI6FAwOVvDZPqDpQLLHsMZI.svg`,
      title: 'Memory',
      body: "Correct the agent once and it remembers, so the same mistake doesn't come back next week.",
    },
    {
      icon: `${A}/crZNgh5koPZHy4Zcv4hVXYYvUI.svg`,
      title: 'Verified answers',
      body: 'Mark a great answer as verified; the agent reuses it for similar questions and surfaces it as a suggested starting point.',
    },
    {
      icon: `${A}/Ok6lRZz120wT2QCg4t959aNzJOQ.svg`,
      title: 'Reviews',
      body: 'Lightdash flags likely-wrong answers and suggests one-click fixes to your context layer.',
    },
    {
      icon: `${A}/5WNs7VEwF5qbwNWjQpSoM8GhRQ.svg`,
      title: 'Knowledge documents',
      body: 'Upload glossaries, metric definitions, and business context the agent reads before it answers.',
    },
  ],
}

export const quote = {
  logo: { src: `${S}/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png`, alt: 'JustWatch' },
  quote:
    '"We create specialized agents with different instructions and data access for different departments. Each agent has personalised context specific to its team’s domain, allowing it to do nuanced jobs."',
  person: {
    name: 'Aleksandr Zolotukhin',
    role: 'VP of Data & Analytics @ JustWatch',
    photo: `${A}/cjEFP7NIVVQ4kp7d1BeGhHSU.png`,
  },
  cta: { href: './customer-story/justwatch' },
  stats: [
    { value: '86%', label: 'reduction in BI tool spend' },
    { value: '~4000', label: 'queries per day' },
    { value: '45%', label: 'increase in active BI users' },
  ],
}

const SLACK = 'https://go.lightdash.com/community'

export const faq = [
  {
    q: 'Can each team have its own agent?',
    a: 'Yes. You can create specialized agents for each team (Marketing, Finance, Growth, etc), each scoped to the right data and business context, and the AI Router sends every question to the best-fit one automatically. You control which tables, fields, and metrics each agent can access.',
  },
  {
    q: 'Which LLM does it use?',
    a: "Lightdash is LLM-agnostic and works with multiple models from Anthropic and OpenAI. You're not locked into one provider, and you can use the model that performs best for your data.",
  },
  {
    q: 'Why not just point ChatGPT or Claude at our warehouse?',
    a: 'A raw LLM on your warehouse guesses at table joins and invents metrics, with no shared definition of "revenue." Lightdash agents answer from your governed semantic layer, return a query you can inspect, and learn from your corrections, so the answer is one you can actually put in a board deck.',
  },
  {
    q: 'Does it hallucinate numbers?',
    a: "The agent builds answers from the metrics you defined in your semantic layer, not free-form SQL, and returns a query you can open and check. When the data isn't there, it says so rather than inventing a figure. Reviews also flags likely-wrong answers so you can fix the source.",
  },
  {
    q: 'What does it cost?',
    a: "Lightdash is a flat fee with unlimited users and unlimited AI queries. You don't pay more as more of the company starts asking questions.",
  },
  {
    q: 'Do I need dbt to use Lightdash?',
    a: 'dbt is the most common setup, and Lightdash builds its semantic layer inside your dbt project. You can also define the semantic layer in Lightdash YAML against your warehouse without dbt. Either way, every dashboard runs on governed metrics defined once, in code.',
  },
  {
    q: 'I have an infrequently asked question.',
    a: (
      <>
        Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our{' '}
        <a href={SLACK} target="_blank" rel="noopener noreferrer">
          Slack community
        </a>
        .
      </>
    ),
  },
]
