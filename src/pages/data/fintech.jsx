// /fintech content (specs/company-pages.md §5). Copy verbatim from live, including the mismatched FAQ
// answers (live bug, reproduced as instructed: "keep everything else as live").
const A = '/assets/pages/fintech'
export const FIN_A = A

export const FIN_LOGOS = [
  { alt: 'Wise', src: `${A}/hypebeast-X1Rd8CLxwvNU4Tf1KCa2OWalT0.png`, w: 97, h: 25.5 },
  { alt: 'Kroo', src: `${A}/swappie-ggPEyATL8MbnC0lAJYVTopJ7Thc.png`, w: 97, h: 23.8 },
  { alt: 'Neo', src: `${A}/neo-3xZrmqPbNl94upPc3clOzv5PXCk.png`, w: 77, h: 23.6 },
  { alt: 'Titanbay', src: `${A}/kraken-adzhFZdy5jMFUPo6pMJgrSsdL1Y.png`, w: 97, h: 16.5 },
  { alt: 'Peach Payments', src: `${A}/alma-CyF0pGviedxvkYqcKUeio838BY0.png`, w: 85, h: 24 },
]

export const REASONS = [
  { icon: `${A}/renders/reason-icon-01@2x.png`, text: 'Dashboards multiply and trust disappears.' },
  { icon: `${A}/renders/reason-icon-02@2x.png`, text: 'Compliance asks where the number came from but no one knows.' },
  { icon: `${A}/renders/reason-icon-03@2x.png`, text: 'Data teams become the bottleneck.' },
]

export const BENEFITS = [
  {
    title: 'Agentic self-serve without the chaos',
    body: 'Simply ask questions and get instant visualizations, explanations, and recommended follow-ups. Lightdash AI removes friction from analytics, helping teams get answers in seconds instead of waiting on the data team.',
    image: `${A}/renders/benefit-01-illustration@2x.png`,
  },
  {
    title: 'Performance that scales',
    body: 'Payments data and compliance checks involve heavy joins and calculations. Lightdash is built to handle this complexity. Get faster fraud monitoring and financial reporting cycles, and the ability to operate directly on granular data.',
    image: `${A}/renders/benefit-02-illustration@2x.png`,
  },
  {
    title: 'A central metrics catalog your whole company can trust',
    body: 'Fintechs like Wise use Lightdash to store every KPI in a central, certified metrics catalog. All changed are also version-controlled through dbt, giving data teams full governance without slowing down the rest of the business.',
    image: `${A}/renders/benefit-03-illustration@2x.png`,
  },
  {
    title: 'Developer experience your data team will actually love',
    body: 'With Lightdash, data teams get dbt-native metrics & models, preview environments for safe testing, automatic caching, ultra-fast queries, and more. This means faster iteration, fewer errors, and a dramatically happier analytics engineering team.',
    image: `${A}/renders/benefit-04-illustration@2x.png`,
  },
]

export const STATS = [
  { value: '60%', label: 'less time spent on ad-hoc data requests' },
  { value: '200%', label: 'increase in active BI users' },
  { value: '80%', label: 'faster for business users to get answers' },
]

const SLACK = 'https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI%7EQbjCAHQs0WBac3w'
const slackAnswer = (
  <p className="m-0">
    Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our <a href={SLACK}>Slack community</a>.
  </p>
)

export const FIN_FAQ = [
  {
    q: 'Do you offer discounts for startups, accelerators, or investors?',
    a: (
      <p className="m-0">
        Your 21 day trial period starts from when you first connect and compile your dbt project in Lightdash. You don't need to enter payment details to get
        started. At the end of your trial you have the option to start your subscription and keep using Lightdash!
      </p>
    ),
  },
  {
    q: 'Is Lightdash secure? Where is my data stored?',
    a: <p className="m-0">AI agents use your Lightdash project metadata, dbt models, and any additional context you provide during setup to answer your questions.</p>,
  },
  {
    q: 'Do I need to use dbt to use Lightdash?',
    a: (
      <p className="m-0">
        You can rate and correct any incorrect responses directly in the AI agent chat interface. This feedback improves accuracy over time and ensures the
        chances of AI agents giving inaccurate answers is minimized.
      </p>
    ),
  },
  {
    q: 'Is it hard to move from my existing BI tool to Lightdash?',
    a: (
      <p className="m-0">
        Yes. With Lightdash, you can create specialized agents with access to specific data sets, tailored instructions, and team-appropriate terminology.
      </p>
    ),
  },
  {
    q: 'Do you offer 1-on-1 training/support?',
    a: (
      <p className="m-0">
        No. AI agents are exclusively available for Lightdash Cloud Pro and Enterprise customers. This is to ensure optimal performance and security.
      </p>
    ),
  },
  { q: 'Do you offer discounts for startups, accelerators, or investors?', a: slackAnswer },
  { q: 'I have an infrequently asked question.', a: slackAnswer },
]
