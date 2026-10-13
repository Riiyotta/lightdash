// Copy + assets: specs/product-pages.md §2.7 and Appendix A "bi-as-code".
const A = '/assets/pages/bi-as-code'
const AU = '/assets/cms/blog/authors'
const t = (f) => `${A}/${f}.png`

// "Block-Master" 94px tiles (rendered 24–27px). The spec gives the file list but not the per-tile
// assignment; positions and files below were read off reference/pages/bi-as-code-1440.png (approximate).
const T = {
  lavWave: t('BhL1WtWLynqh1Pjg4G9bbbViQhs'),
  lavStripes: t('x3Z4NKlNcV0qWh3L4QRIWx0fyIc'),
  lavDiag: t('RvagZAeEMLrHhAAnB9nH1LZGmA'),
  lavDiag2: t('VEksqL8lGXpmIFqCuukdFNuuBtA'),
  purpleDiag: t('5xUmJO1puutfElB9sEs21uiHk'),
  purpleDiag2: t('ZZKU9XDPDnPOJUPv0PglqsYQA'),
  purpleDiag3: t('cpbtvZupY5JNiCSpB7fLDbe3Oc'),
  purpleSplit: t('7h5DHw9Ih0HU00zhwOpGBaZXZ68'),
  purpleGrid: t('2u79ISLrqmWzwdlB5IMQhfiyYg'),
  lavGrid: t('YMsOT2qz1YkzTuUZmk3cD6nbi1I'),
  blue: t('06brq6A16uaTRRlYr9ucrY27w'),
  blueBars: t('1mY2vbq6kTUgSPdLaSnEVC2rtw'),
  blueBars2: t('vyxzfG6HrFRJDobTl0kbKDTlXY'),
  navy: t('3O4EKHJxQiq8P6Modh8LegrHvUo'),
  navyGrid: t('DC14QNwkXo15tzFVKM00AG3nJY'),
  navyDiag: t('E1kWGbmYoL7eYvddDB6OCLTzM'),
  navyBars: t('zbzl1JbJ9BKEiwJy42x0Es4YDA'),
  blueGrid: t('EkNC4wRWARgqYS2HRX4x9gjJos'),
  cobalt: t('cmGuGaI87Y4y440GGpslFyaO2w4'),
}

export const hero = {
  title: (
    <>
      Your entire BI <span className="text-brand-purple">as code</span>
    </>
  ),
  subtitle:
    'Your metrics, charts, and dashboards live as code. Build them with coding agents, review them in pull requests, and update 50 charts in one command. All on your governed context layer.',
  // top-left: 24px grid from the hero's top-left corner
  tilesTopLeft: [
    { src: T.lavWave, x: 0, y: 0 },
    { src: T.purpleDiag, x: 48, y: 0 },
    { src: T.lavWave, x: 96, y: 0 },
    { src: T.lavStripes, x: 24, y: 24 },
    { src: T.purpleDiag, x: 0, y: 48 },
  ],
  // bottom-right: 27px grid, offsets measured from the hero's bottom-right corner
  tilesBottomRight: [
    { src: T.lavDiag2, right: 54, bottom: 27 },
    { src: T.lavWave, right: 0, bottom: 27 },
    { src: T.lavStripes, right: 81, bottom: 0 },
    { src: T.purpleDiag, right: 27, bottom: 0 },
    { src: T.purpleDiag2, right: 0, bottom: 0 },
  ],
}

export const video = {
  src: `${A}/OsiXnkGAa79N5TWI3WZevZyTzg.mp4`,
  pattern: `${A}/KsQ21PJT6e9XU2YmglGUiR4.png`,
}

export const logosCaption = 'The best data teams are shipping analytics as software'

export const rows = {
  heading: "Coding agents don't have to click through a dashboard builder.",
  items: [
    {
      image: `${A}/pLX5BjHnBUTEqg9FE8wy7LkxuI.png`,
      title: 'Describe the dashboard. Your agent writes it.',
      body: 'Use Lightdash skills to teach your coding agents how the platform works, and start building dashboards from prompts.',
      imageSide: 'left',
    },
    {
      image: `${A}/8oUr90QLhaVvXLVTgladwbcg.png`,
      title: 'Review analytics like you review software.',
      body: 'Every chart and dashboard is a file, so changes move through the workflow your team already trusts: open a PR, spin up a preview environment straight from the CLI, get a review, merge.',
      imageSide: 'right',
    },
    {
      image: `${A}/5rKxGpz693Mfl90cnIlAvcSCf1c.png`,
      title: 'Run maintenance in one command.',
      body: 'Make maintenance work scriptable: validate your whole project in CI, fix what breaks in bulk, and migrate off your current tool with a script instead of a quarter of rebuilds.',
      imageSide: 'left',
    },
  ],
  // Pixel "Decoration" PNGs on the cell corners (Appendix A positions, relative to the 1280 block / rows top)
  decorations: [
    { src: `${A}/BN6JN0HSy81RpKhNjlZpCHklr8Y.png`, w: 96, h: 48, left: 832, top: 0 },
    { src: `${A}/JhduHaBEXoLTyxl4cyznQ44uZm4.png`, w: 72, h: 72, left: 568, top: 408 },
    { src: `${A}/NKVrATXobCHqNyygPoWbTDIKfo.png`, w: 72, h: 96, left: 1144, top: 816 },
    { src: `${A}/A21JEuMCe0OY8iydSfZSsiYCvE.png`, w: 96, h: 24, left: 832, top: 1200 },
    // cmGuGaI8… 24×24: position not in Appendix A; placed per the screenshot (right edge, end of row 1)
    { src: T.cobalt, w: 24, h: 24, left: 1256, top: 384 },
    { src: T.cobalt, w: 24, h: 24, left: 40, top: 792 },
  ],
}

export const tools = {
  heading: 'What makes BI-as-code work',
  items: [
    { icon: `${A}/tHVryl1cOkzBYRDGMF4gXpF8gg.svg`, title: 'Lightdash CLI', body: 'Deploy, preview, validate, and rename from your terminal or CI.' },
    { icon: `${A}/tgo2DvYpK4lLVYtDLNIj3cEcQs.svg`, title: 'MCP server', body: 'Connect Claude, Cursor, or your internal agents to Lightdash.' },
    { icon: `${A}/2njj1ggnAekTB7x9KJJdqvcEnk.svg`, title: 'Agent skills', body: 'One command teaches your coding agent Lightdash conventions.' },
    { icon: `${A}/QJ0GD09wsmvl61YkCsvxqzQWaE.svg`, title: 'Git integrations', body: 'GitHub, GitLab, Azure DevOps, and Bitbucket, with PR previews.' },
  ],
}

export const testimonial = {
  avatar: `${A}/T3PlGRwQc4NlEoRzdZxIjbg508.png`,
  name: 'Kevin Otte',
  company: 'fal.ai',
  role: 'Data Scientist',
  quote:
    '"The shift to dashboards-as-code and agent-driven workflows has been huge for us. We can update, version, and replicate analytics the same way we ship software without spending hours clicking around the UI."',
  cta: { label: 'Read the full case study', href: './customer-story/fal' },
  // ~20 24px tiles in the card's bottom-right corner (offsets from the card's bottom-right)
  tiles: [
    { src: T.lavDiag2, right: 0, bottom: 168 },
    { src: T.blueGrid, right: 24, bottom: 144 },
    { src: T.purpleSplit, right: 48, bottom: 96 },
    { src: T.lavGrid, right: 0, bottom: 72 },
    { src: T.navyGrid, right: 24, bottom: 72 },
    { src: T.navyBars, right: 24, bottom: 48 },
    { src: T.purpleDiag3, right: 0, bottom: 48 },
    { src: T.blue, right: 72, bottom: 24 },
    { src: T.purpleGrid, right: 0, bottom: 24 },
    { src: T.purpleDiag2, right: 48, bottom: 24 },
    { src: T.lavDiag, right: 96, bottom: 24 },
    { src: T.purpleGrid, right: 144, bottom: 24 },
    { src: T.navy, right: 0, bottom: 0 },
    { src: T.navyDiag, right: 24, bottom: 0 },
    { src: T.blueBars, right: 48, bottom: 0 },
    { src: T.lavWave, right: 96, bottom: 0 },
    { src: T.purpleDiag, right: 120, bottom: 0 },
    { src: T.lavStripes, right: 168, bottom: 0 },
    { src: T.blueBars2, right: 72, bottom: 48 },
    { src: T.cobalt, right: 0, bottom: 96 },
  ],
}

export const stats = [
  { value: '90%', label: 'of agent-generated code approved' },
  { value: '30', label: 'minutes to go from data model to dashboard' },
  { value: '85%', label: 'of data requests answered in 24 hours' },
]

export const faq = [
  {
    q: 'What is BI as code?',
    a: 'BI as code means your analytics layer is defined in version-controlled files instead of locked inside a UI. In Lightdash, metrics, charts, and dashboards are YAML in Git, so you can build them with AI coding agents like Claude Code or Cursor, review changes in pull requests, and roll back mistakes.',
  },
  {
    q: 'Do I need dbt to use BI as code in Lightdash?',
    a: 'No. Lightdash builds its semantic layer from your dbt project or from standalone Lightdash YAML files pointed at your warehouse, with the same syntax. If you adopt dbt later, migration is straightforward. Either way, your metrics are defined once, in code, and every chart is built on them.',
  },
  {
    q: 'Do business users have to write code?',
    a: 'No. Business users explore data, filter dashboards, and ask questions through the UI and AI agents, same as any analytics tool. BI as code is for your data team and your coding agents: they build and maintain content in Git while everyone else consumes it without knowing the YAML exists.',
  },
  {
    q: 'How do Claude Code and Cursor build correct dashboards?',
    a: 'Run lightdash install-skills and your coding agent learns Lightdash conventions: how to write valid chart and dashboard YAML on your defined metrics. The Lightdash MCP server does the same for Claude and your internal agents. Because agents build on the semantic layer, they use governed definitions instead of guessing at SQL.',
  },
  {
    q: 'Will AI edits break my production dashboards?',
    a: 'Changes go through the same controls as your software. Spin up a preview environment from the CLI, run lightdash validate in CI to catch charts a dbt change would break, and review every edit as a pull request before it merges. Nothing lands in production without a human approving it.',
  },
  {
    q: 'Do we have to use AI?',
    a: 'No. Lightdash supports traditional exploration and dashboards alongside AI. Teams can adopt BI-as-code gradually.',
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

export const blog = {
  heading: 'Keep building with BI-as-code',
  posts: [
    {
      title: 'AI-native BI: How I build dashboards in Lightdash using Cursor',
      href: './blogpost/ai-native-bi-how-i-build-dashboards-in-cursor-with-lightdash',
      thumbnail: `${A}/mfkymFYWMoo30ROb5Whu0GklLA.png`,
      author: { name: 'Ian Ahuja', avatar: `${AU}/ian-ahuja.jpg` },
    },
    {
      title: 'What makes BI agentic? A guide to AI-powered analytics',
      href: './blogpost/what-makes-bi-agentic',
      thumbnail: `${A}/ApyelhkROZm0T027utFwWVhKXh8.png`,
      author: { name: 'Shanzé Munir', avatar: `${AU}/shanze-munir.jpg` },
    },
    {
      title: 'How data teams are using the Lightdash CLI to ship analytics with AI',
      href: './blogpost/how-data-teams-are-using-the-lightdash-cli-to-ship-analytics-with-ai',
      thumbnail: `${A}/yHwTg5GEPNhLXtcpf99NvktHKqE.png`,
      author: { name: 'Shanzé Munir', avatar: `${AU}/shanze-munir.jpg` },
    },
  ],
}
