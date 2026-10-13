import { HERO_PIXEL_SETS } from '../../components/shared/index.js'

// Copy + assets: specs/product-pages.md §2.8 and Appendix A "self-improving-analytics".
const A = '/assets/pages/self-improving-analytics'
const S = '/assets/shared'
const AU = '/assets/cms/blog/authors'
const [p0, p1, p2, p3] = HERO_PIXEL_SETS.purple

// Same purple 10-square cluster as conversational-analytics (reference/pages/self-improving-analytics-1440.png)
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
  // Two separate H1s on the live site: "The data platform that" (#1C0000) / "maintains itself" (#5E4CFF).
  line1: 'The data platform that',
  line2: 'maintains itself',
  subtitle: 'A context layer that fixes its own gaps and an Autopilot that cleans dashboards, so your team can stop maintaining analytics by hand.',
  image: `${A}/PlYzx93tqqN8O2aV4ymkCQEP90.png`,
}

export const logosCaption = "The fastest data teams don't maintain their BI by hand."

export const statement = (
  <>
    Every analytics tool gets messy the moment real people use it. Lightdash is the only one that{' '}
    <span className="text-brand-purple">cleans itself up</span>.
  </>
)

export const tabsRow1 = {
  pill: 'Self-improving context layer',
  heading: 'Your context layer learns and improves over time.',
  lead: 'As your team queries, Lightdash spots where your context layer is thin, out of date, or duplicated, and proposes the fix.',
  tabs: [
    {
      title: 'It learns from real questions',
      body: 'Lightdash proposes changes based on the questions people ask and the metrics they reach for.',
      image: `${A}/g3m34sQgJJh8ALeeQmK7xTwLGS4.png`,
    },
    {
      title: 'It proposes the change as a pull request',
      body: 'The change is opened in your repo and validated with a compile before it reaches you.',
      image: `${A}/KGrOlmbDd6j8KzFJO6WfS5TYTtM.png`,
    },
    {
      // No image captured; renders an empty well on the live site too (§2.8 / §5).
      title: 'You review and merge',
      body: 'Every change arrives as a reviewable changeset you approve, reject, or revert. Nothing touches your source of truth on its own.',
    },
  ],
}

export const tabsRow2 = {
  pill: 'Autopilot',
  heading: 'Your project cleans itself up as you use it.',
  lead: 'A scheduled agent that runs on a cadence you set. Each run, it reviews recent activity, fixes what it safely can, and flags the rest for review.',
  tabs: [
    {
      title: 'It clears the dead weight.',
      body: 'Soft-deletes dashboards with zero views, and flags the ones gathering dust. Run in read-only mode if you want it to flag only.',
      image: `${A}/PSkHEoMuQirZqvkSEUPncsPTyaA.png`,
    },
    {
      title: 'It fixes what’s broken.',
      body: "Finds charts pointing at fields that no longer exist, repairs the ones it can, and flags the ones it can't.",
      image: `${A}/Bb8QWbxAas0wBv5RwGIQDfIAg3c.png`,
    },
    {
      title: 'It tells you what to build next.',
      body: 'When people keep asking about something with no saved chart, Autopilot drafts one for review. It also flags slow queries and surfaces popular content stuck out of sight.',
      image: `${A}/4qGSp9gkKoLfM6a5ms9ec2JY4.png`,
    },
  ],
}

export const comparison = {
  heading: (
    <>
      Other tools make maintenance your problem. <span className="text-brand-purple">Lightdash makes it the platform’s.</span>
    </>
  ),
  columns: ['', 'Lightdash', 'Legacy BI (Looker, Tableau, Power BI)', 'Raw LLM on your warehouse'],
  rows: [
    ['Keeping the semantic layer current', 'Proposes changes from real usage; you approve', 'Manual: your team does it', 'No governed metrics at all'],
    ['Stale & broken content', 'Autopilot cleans and repairs on a schedule', 'Manual audits, if they happen', 'Not handled'],
    ['Governed & reversible', 'Every change reviewed, logged, revertible', 'Varies by tool', 'No governance, no audit trail'],
  ],
}

export const faq = [
  {
    q: 'How does the self-improving context layer work?',
    a: 'As your team asks questions, Lightdash spots gaps, outdated definitions, and duplicate metrics in your semantic layer. It proposes each fix as a pull request, validated with a compile. You review the change and approve, reject, or revert it.',
  },
  {
    q: 'What does Autopilot do?',
    a: 'Autopilot is a scheduled agent that keeps your Lightdash project clean. On a cadence you set, it soft-deletes charts with zero views older than 30 days, repairs charts that reference missing fields, flags slow queries, and drafts new charts for questions your team keeps asking. Every action is logged with a reason.',
  },
  {
    q: 'Will letting AI edit my context layer or delete dashboards break things?',
    a: 'No. Nothing changes on its own. Context layer edits arrive as pull requests you review before merging. Autopilot only soft-deletes (everything is restorable), never touches content under 30 days old, and reverses its own mistakes on the next run. You can also run it in read-only mode so it only flags.',
  },
  {
    q: 'How is this different from pointing an LLM at my warehouse?',
    a: 'A raw LLM on your warehouse has no governed metrics, no business context, and no permissions, so it guesses. Lightdash works on your governed semantic layer: every metric is defined in code, every change is reviewed, and every action is logged. You get the automation without losing your source of truth.',
  },
  {
    q: 'Do I need dbt to use self-improving analytics?',
    a: 'No. Some teams use use Lightdash to build their semantic layer inside their dbt project, but you can also define it in Lightdash YAML against your warehouse without dbt.',
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
  heading: 'Keep building with self-improving analytics',
  posts: [
    {
      title: 'Your semantic layer can now fix itself',
      href: './blogpost/your-semantic-layer-can-now-fix-itself',
      thumbnail: `${A}/AayfCxJNtiF47uhuYQR5OV2llE.png`,
      author: { name: 'Shanzé Munir', avatar: `${AU}/shanze-munir.jpg` },
    },
    {
      title: "Why your data team is still a bottleneck (and it's not a headcount problem)",
      href: './blogpost/why-your-data-team-is-still-a-bottleneck',
      thumbnail: `${S}/r9UVsrGtVNZpxAmEauOeH12Pokk.png`,
      author: { name: 'Oliver Laslett', avatar: `${AU}/oliver-laslett.webp` },
    },
    {
      title: 'It’s time to build on your data',
      href: './blogpost/it’s-time-to-build-on-your-data',
      thumbnail: `${S}/FYOqNAQBg2pLdVk4AIHeq72cWU.png`,
      author: { name: 'Hamzah Chaudhary', avatar: `${AU}/hamzah-chaudhary.webp` },
    },
  ],
}
