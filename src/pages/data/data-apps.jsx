import { HERO_PIXEL_SETS } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.2, Appendix A "data-apps", Appendix B (<1200 only sections).
const A = '/assets/pages/data-apps'
const S = '/assets/shared'
const AU = '/assets/cms/blog/authors'
const [l0, l1, l2, l3] = HERO_PIXEL_SETS.lavender
const [s0, s1, s2, s3] = ['9q96NgtQ1rda2gUYvUGRz0RCE', 'IR4gGpZAJerX83FSufaDlTWoaAc', 'qoS6qseJctAjBODti8DVQoiQTaE', 'fM0aEpxYsB9cDnlHKCc3jYe5YU'].map(
  (f) => `${A}/${f}.svg`,
)

// Two stacked layers per position (32px svg under the lavender png), 8 positions, no (128,0)/(1120,0).
// svg ↔ png pairing is not given in the spec; paired by index.
const layer = (svg, png, x, y) => [
  { src: svg, x, y },
  { src: png, x, y },
]
export const pixels = [
  ...layer(s0, l0, 0, 0),
  ...layer(s1, l1, 32, 32),
  ...layer(s3, l3, 0, 64),
  ...layer(s2, l2, 64, 0),
  ...layer(s2, l2, 1184, 0),
  ...layer(s1, l1, 1216, 32),
  ...layer(s0, l0, 1248, 0),
  ...layer(s3, l3, 1248, 64),
]

export const hero = {
  title: (
    <>
      Build <span className="text-brand-purple">custom apps</span> on your data from a single prompt
    </>
  ),
  subtitle: 'Build an on-brand app on your semantic layer in minutes. Permissions carry over, and every query is visible.',
  subtitleWidth: 475,
  iframe: { src: 'https://forecast-slider.vercel.app/', title: 'Data app creator' },
}

export const logosCaption = 'The data teams shipping custom apps with Lightdash'

export const trust = {
  heading: 'Trust every app your team builds.',
  sub: 'Every Data App runs on your context layer, so the numbers trace to definitions your team already trusts.',
  cards: [
    {
      title: 'Permissions carry over',
      body: 'Apps inherit your roles, user attributes, and row-level security, so each viewer sees only their own data.',
    },
    {
      title: 'Every query is visible',
      body: 'The network inspector shows each query an app runs. Hover any number in the app to highlight the exact query behind it.',
    },
    {
      title: 'Always check the math',
      body: 'Open any app query in an explore, view the underlying rows, or save it back to Lightdash as a governed chart.',
    },
  ],
}

export const pillTabs = {
  heading: 'If you can describe it, your team can ship it.',
  tabs: [
    {
      label: 'Finance',
      body: 'Is your finance team running forecasts in a spreadsheet? Build a revenue forecasting app on your governed metrics instead. Adjust assumptions, watch the impact live, and export the whole thing as a board-ready deck.',
      image: `${A}/bSZPFKOcLl57YwOzSbVeVP57k.png`,
    },
    {
      label: 'Marketing',
      body: 'Attribution models are useless trapped in a notebook only one analyst can run. Give marketing an app to compare models, filter by channel, and drill into what drove pipeline on the same metric definitions your data team already owns.',
      image: `${A}/Sy3V08XNn8U0XstWNRpu9DDUu2Y.png`,
    },
    {
      label: 'Customer success',
      body: 'Instead of static QBRs that go out of date quickly, build one QBR app instead. Every CSM gets a branded, per-client version that exports to PDF and never drifts from the source.',
      image: `${A}/WtdAn8YuvBtJkngpeYPM7qSYGo.png`,
    },
    {
      label: 'Product',
      body: "Product wants Amplitude-style funnels, but your funnel logic is hard-coded in models nobody wants to touch. Build a funnel explorer where anyone can reorder steps, segment, and compare cohorts powered by metrics you've already defined.",
      image: `${A}/XHsayKly8sdiowmiqs7qJhD65Q.png`,
    },
  ],
}

export const asCode = {
  heading: 'Data apps as code.',
  sub: 'Get a vibe-coding experience for business users and a real dev workflow for your team on the same platform.',
  cards: [
    {
      title: 'Use the CLI',
      body: "Pull an app's source with the CLI, edit locally (your coding agent gets the full context), and upload to publish a new version.",
    },
    {
      title: 'Review in pull requests',
      body: 'App source lives in Git, so changes get reviewed like the rest of your analytics code.',
    },
    {
      title: 'Promote and move quickly',
      body: 'Promote apps from preview to production, or copy them between projects and instances.',
    },
  ],
}

export const quote = {
  logo: { src: `${A}/2an3boLqMqPL3SCsPMA1Z5bNi9E.png`, alt: 'OakNorth' },
  quote:
    '"As a regulated bank, the data has to come from our golden source. With data apps, people can build whatever they like, but we still control the data and the permissions. That\'s what lets us open it up."',
  person: {
    name: 'David Strudwick',
    role: 'Senior BI Engineer @ OakNorth Bank',
    photo: `${A}/vAW1WmKvr5NPbFEX3uXUx4XbpGw.jpeg`,
  },
}

export const faq = [
  {
    q: 'What is a data app?',
    a: "A Data App is an interactive analytics tool you build inside Lightdash. Think custom reports, analyst workbooks, self-serve dashboards. Anything your stakeholders need that a standard dashboard can't do. Every app runs on your semantic layer, so governance is built-in.",
  },
  {
    q: 'How do I build a data app?',
    a: 'Inside Lightdash, open the app editor and describe what you want. The built-in AI builds it for you. Then tweak it directly in the app: highlight anything and tell it what to change, or use the chat to refine. No code required.',
  },
  {
    q: 'How is this different from building a dashboard?',
    a: "With a data app, you're not limited to the dashboards or visualizations your BI tool supports. You can build exactly what your use case needs.",
  },
  {
    q: 'Is the data live?',
    a: 'Yes. Every time your data updates, a model changes, or a metric definition is updated, the app reflects it automatically. No manual refresh, no rebuild.',
  },
  {
    q: 'How is this different from building with Claude Code or Lovable?',
    a: (
      <>
        <p className="m-0">Tools like Claude Code and Lovable build on raw data.</p>
        <p className="m-0">
          Data Apps are different because the foundation is your semantic layer, meaning every app you build gets row-level security, role-based
          access, caching, and your metric definitions automatically, without configuring any of it yourself.
        </p>
        <p className="m-0">It's the only way to build data apps where the governance is already done.</p>
      </>
    ),
  },
  {
    q: 'Can I access data apps through open source Lightdash?',
    a: "Data apps is a Cloud feature, so it's not included in the OSS version. On Cloud it's enabled by default, and for On Prem instances it can be configured with a license key.",
  },
]

export const blog = {
  heading: 'Keep building with Data Apps',
  posts: [
    {
      title: 'It’s time to build on your data',
      href: './blogpost/it’s-time-to-build-on-your-data',
      thumbnail: `${S}/FYOqNAQBg2pLdVk4AIHeq72cWU.png`,
      author: { name: 'Hamzah Chaudhary', avatar: `${AU}/hamzah-chaudhary.webp` },
    },
    {
      title: 'Introducing Data Apps: Build custom apps on top your governed data',
      href: './blogpost/introducing-data-apps',
      thumbnail: `${A}/nID2yZafrg98mIPFQ7tN9PfJY.png`,
      author: { name: 'Shanzé Munir', avatar: `${AU}/shanze-munir.jpg` },
    },
    {
      title: "Why your data team is still a bottleneck (and it's not a headcount problem)",
      href: './blogpost/why-your-data-team-is-still-a-bottleneck',
      thumbnail: `${S}/r9UVsrGtVNZpxAmEauOeH12Pokk.png`,
      author: { name: 'Oliver Laslett', avatar: `${AU}/oliver-laslett.webp` },
    },
  ],
}

// ---- Appendix B: sections that exist only below 1200 ----

export const useCases = {
  heading: 'Custom data visualizations for your whole team',
  items: [
    {
      title: 'Everyone builds. Nothing breaks.',
      body: 'Your team is already building things with LLMs. Those tools are useful, but none of them have row-level security, metric definitions, or lineage. Lightdash Data Apps give you the speed of a vibe-coded tool with the governance of your data stack because every query runs through your semantic layer.',
      image: `${A}/WywMuy9rirQ3RZ4tYXxWhfG0.png`,
    },
    {
      title: 'Maintain a dashboard without opening the UI',
      body: 'The maintenance work everyone hates is now automated. Agentic BI lets you use AI agents to update charts, add breakdowns, and refresh logic on your behalf, without touching a UI.',
      image: `${A}/IvH1H176pMQrnJRpYIzq3L6gd1E.png`,
    },
    {
      title: 'Build complete projects from scratch',
      body: 'With agentic BI you can ship entire analytics projects in one go. Use agents to create a full set of charts and dashboards from scratch, grounded in your existing data models and metric definitions.',
      image: `${A}/YXDpaXMYAUeUXE98GDK1IabRqM.png`,
    },
  ],
}

export const sprint = {
  heading: 'A request that used to take a sprint now takes a prompt.',
  lead: 'Hit New → App, describe what you want, and iterate in plain English.',
  image: `${A}/eEulBt7tjYuf5C45bVFaR0H3A.png`,
  tabs: [
    {
      title: 'Start from a template',
      body: 'Dashboard, slide deck, PDF report, or fully custom: the template sets the layout, your prompt does the rest.',
    },
    // GAP: the descriptions of these two tabs were not captured (Appendix B lists titles only).
    { title: 'Iterate by talking', body: '' },
    { title: 'On-brand by default', body: '' },
  ],
}

export const why = {
  heading: 'Why It\'s ',
  accent: 'Different',
  old: { title: 'Traditional BI', items: ['SQL baked into the app', 'One view for everybody', 'Build your own authentication', 'No integrations', 'DevOps for deployment'] },
  next: {
    title: 'Lightdash Data Apps',
    items: ['Query governed metrics', 'Row + column level security', 'Secure by default', 'Backed by semantic layer', '1 click deploy'],
  },
}
