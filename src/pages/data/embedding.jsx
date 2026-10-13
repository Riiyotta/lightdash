// Copy + assets: specs/product-pages.md §2.4 and Appendix A "embedding".
const A = '/assets/pages/embedding'
const S = '/assets/shared'
const [o0, o1, o2, o3] = ['ok5ihbleCIOP7kasZsFxxjBROA', 'pUFJPew4GSXKimogZE4b5FebCVQ', 'nBGI1zT0I3WluAxCI9w6JbUFo', 'D5EKRZDwA0Qnr21AkBU2iCweciY'].map(
  (f) => `${A}/${f}.png`,
)

// Orange squares, 8 positions; file → position read off reference/pages/embedding-1440.png
export const pixels = [
  { src: o0, x: 0, y: 0 },
  { src: o2, x: 32, y: 32 },
  { src: o3, x: 0, y: 64 },
  { src: o1, x: 64, y: 0 },
  { src: o1, x: 1184, y: 0 },
  { src: o2, x: 1216, y: 32 },
  { src: o0, x: 1248, y: 0 },
  { src: o3, x: 1248, y: 64 },
]

export const hero = {
  title: (
    <>
      <span className="block">Embed AI-powered analytics</span>
      <span className="block">into your product</span>
    </>
  ),
  subtitle: 'Governed dashboards, AI analysts, and the power for customers to build their own apps - all embeddable inside your product.',
  rive: `${A}/28O3NwnpOvDD6xz1NZJC0nHhFtw.riv`,
  background: 'linear-gradient(180deg, rgba(255,115,0,.11) 0%, #F0C5C5 100%)',
}

export const logosCaption = 'Teams shipping customer-facing analytics on Lightdash.'

export const tabs = {
  heading: 'Your customers ask, build, and save. Your team stays out of the loop.',
  lead: 'Every customer wants a slightly different report. Instead of your team building each one, give them the tools to answer themselves.',
  tabs: [
    {
      title: 'Embed the AI analyst',
      body: 'Your customers ask questions in plain English inside your product and get answers generated through your semantic layer.',
      image: `${S}/weMGLE6761i2jyEQCzZpjFZSf3w.png`,
    },
    {
      title: 'Embed a dashboard builder',
      body: 'Your customers can create, edit, and save charts and dashboards into a space you control, without a Lightdash account.',
      image: `${S}/KMZXbZggONd7XDVETzkGJLaGYI.png`,
    },
    {
      title: 'Embed data apps',
      body: 'Ship interactive, on-brand experiences vis data apps. Each app is built in natural language on your governed data.',
      image: `${A}/tuJZ1c4LhKeth9Uscr8ADJk2xU0.png`,
    },
    {
      title: 'Embed the metrics catalog',
      body: 'Give customers a browsable glossary of every metric as their entry point into exploration.',
      image: `${A}/uk4RGpeDInDgHG4RxjEVBhbHQzo.png`,
    },
  ],
}

export const safe = {
  heading: 'Safe to point at your own customers',
  sub: "Opening analytics to external users is a trust decision before it's a feature decision. Here's how the trust part works.",
  cards: [
    {
      title: 'One embed, every tenant',
      body: 'A signed JWT scopes each viewer to what they should see. No accounts to provision, no per-customer setup.',
    },
    {
      title: 'Row-level security in SQL',
      body: "User attributes from the JWT flow into your models, so the restriction lives in the query, and an end user can't touch it.",
    },
    {
      title: 'Same numbers, everywhere',
      body: 'Embedded charts run through your semantic layer. The figure your customer sees matches the ones you see.',
    },
    { title: 'You control the surface', body: 'Toggle filters, exports, and drill-downs per embed, straight from the token.' },
    { title: 'Decide where things go', body: 'Customers build and save their content into a destination space you set.' },
    { title: 'No hallucinated numbers', body: 'Embedded AI answers with the metrics you defined in code.' },
  ],
}

export const paths = {
  title: 'Choose your integration path',
  subtitle: 'Pick what fits your workflow',
  columns: [
    {
      title: 'React SDK',
      body: 'Build highly custom analytics experiences directly inside your React app.',
      items: ['Native component theming', 'Built to support localization', 'Pre-org or per-user configuration', 'Maximum control with minimal code'],
    },
    {
      title: 'iFrame',
      body: 'Drop dashboards into your app with a simple HTML snippet.',
      items: ['Zero engineering overhead', 'Works instantly', 'Still gives users interactivity', 'Fast POCs'],
    },
  ],
}

export const testimonial = {
  avatar: `${A}/ExsUAS8wNHv3mL0drXNptUF3Z90.png`,
  corner: `${A}/Zd3z0SbN1AfU8axsLgfCPRovQ.png`,
  quote: (
    <>
      “We evaluated several embedded BI solutions, but Lightdash was the only one that <span className="text-[#FF7300]">ticked all our boxes</span>. The
      token-based auth means we don't have to manage thousands of users, and the React SDK lets us make it feel like part of our platform.”
    </>
  ),
  name: 'Joeri De Turck',
  role: 'Co-founder & CTO @ Qargo',
}

export const faq = [
  {
    q: 'How much does embedding cost?',
    a: (
      <>
        <p className="m-0">You can choose from two pricing options:</p>
        <ul className="m-0 pl-[17px]">
          <li>
            <strong>Pay-as-you-go:</strong> First 1,000 loads free, then $0.05 per load
          </li>
          <li>
            <strong>Predictable plan:</strong> $790/month for 100k loads per Embed Worker
          </li>
        </ul>
        <p className="m-0">We also offer custom pricing tailored to your use case.</p>
      </>
    ),
  },
  {
    q: 'How do I integrate Lightdash into my app?',
    a: (
      <>
        <p className="m-0">You can embed Lightdash dashboards via:</p>
        <ul className="m-0 pl-[17px]">
          <li>
            <strong>iFrame</strong> - easiest setup
          </li>
          <li>
            <strong>React SDK</strong> - more control &amp; customization options
          </li>
        </ul>
      </>
    ),
  },
  {
    q: 'How fast are embedded dashboards?',
    a: "All embeds load quickly. Lightdash queries live against your warehouse so there's no extracting and no stale data.",
  },
  {
    q: 'Can I customize the look & feel of embedded content?',
    a: 'Yes. You can set the font family and background color, and some host styles will cascade into the embed. More advanced styling options are coming soon.',
  },
  {
    q: 'Is my customer data secure?',
    a: 'Absolutely. With row-level security, multi-tenancy, audit logs, and optional self-hosting, you stay fully in control.',
  },
]
