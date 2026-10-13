import {
  AccordionTabs,
  BlogCards,
  Button,
  BUTTON_VARIANTS,
  ComparisonTable,
  CtaBand,
  CustomerQuote,
  Faq,
  FeatureCards,
  HatchedSpacer,
  HERO_PIXEL_POSITIONS,
  HERO_PIXEL_SETS,
  IconBenefits,
  LogosRow,
  PageFrame,
  PillTabs,
  Row,
  SectionHero,
  Spacer,
  SplitRow,
} from '../components/shared/index.js'

// QA route (/__shared): every shared component with sample content (copy from conversational-analytics,
// data-apps, metrics-catalog and context-layer in specs/product-pages.md Appendix A).
const CA = '/assets/pages/conversational-analytics'
const DA = '/assets/pages/data-apps'
const MC = '/assets/pages/metrics-catalog'
const CL = '/assets/pages/context-layer'
const SH = '/assets/shared'

const positions = [...HERO_PIXEL_POSITIONS.left, ...HERO_PIXEL_POSITIONS.leftExtra, ...HERO_PIXEL_POSITIONS.right, ...HERO_PIXEL_POSITIONS.rightExtra]
const pixels = positions.map(([x, y], i) => ({ src: HERO_PIXEL_SETS.purple[i % 4], x, y }))

function Label({ children }) {
  return (
    <Row height={40} lines="tb" className="flex items-center bg-ld-surface px-[24px]">
      <code className="font-fragment-mono text-[13px] text-ld-body">{children}</code>
    </Row>
  )
}

export default function SharedDemo() {
  return (
    <PageFrame frame="trl">
      <Label>{'<SectionHero titleVariant="72" />'}</Label>
      <SectionHero
        pixels={pixels}
        title={
          <>
            Ask your data a question. <span className="text-brand-purple">Trust every answer</span> that comes back.
          </>
        }
        subtitle="Lightdash AI agents answer questions in plain English using your governed semantic layer."
        image={<img src={`${CA}/tbdYQV7hIXUeqIPAKQthWfhjIn8.png`} alt="" className="block h-[659px] w-[980px] max-w-full object-cover" />}
        imagePadding="48px 24px 0"
      />
      <LogosRow caption="The data teams that stopped being a ticket queue." />

      <Label>{'<SectionHero titleVariant="56" />'}</Label>
      <SectionHero
        titleVariant="56"
        title={
          <>
            <span className="block">Every metric your team agreed on,</span>
            <span className="block text-brand-purple">in one place</span>
          </>
        }
        subtitle="Search the catalog, click any metric, and see it charted over time with its owner, its definition and last year's comparison already in place."
        subtitleWidth={468}
        image={<img src={`${MC}/5Xtb5OGa3oUr6gMYnEnAYcMNrI.png`} alt="" className="block h-auto w-[1091px] max-w-full self-end" />}
        imagePadding="24px 24px 0"
      />

      <Label>{'<AccordionTabs imageSide="right" />'}</Label>
      <AccordionTabs
        heading="Ask questions where you already work."
        lead="The question usually lands in Slack or on a dashboard. The answer should land there too."
        tabs={[
          { title: 'In the dashboard', body: 'Hit "Ask AI" on any chart or dashboard and start a conversation with that view already pinned as context.', image: `${CA}/tbdYQV7hIXUeqIPAKQthWfhjIn8.png` },
          { title: 'In Slack and Teams', body: 'Tag your agent in a channel or thread and get an answer back where the conversation is happening.', image: `${CA}/zF9BR39x6AxBJpJubwm2qc018wU.jpg` },
          { title: 'Embedded in your product', body: 'Drop a scoped agent into your own app with the React SDK, so your customers can ask their own data questions too.', image: `${SH}/weMGLE6761i2jyEQCzZpjFZSf3w.png` },
        ]}
      />
      <Label>{'<AccordionTabs imageSide="left" pill="…" />'}</Label>
      <AccordionTabs
        imageSide="left"
        pill="Subtitle pill"
        heading="Built for the people who don't write SQL."
        lead="Anyone can ask in plain English and get an answer, without touching SQL or the query builder."
        tabs={[
          { title: 'Ask in any language', body: 'Questions in French, Japanese, Portuguese, and more. All answered, with the chart, in the same language.', image: `${CA}/Px0EMFIkikrkmJIdnu3TEqL0A.png` },
          { title: 'Show me what I can ask', body: 'New users can ask the agent what it knows, and see suggested questions drawn from your verified answers.' },
          { title: 'Even vague questions work', body: 'Instead of erroring on a fuzzy question, the agent coaches the person toward what they actually want to know.', image: `${CA}/74F1dzQeHklPz5Z2xLRCqlLGXs0.png` },
        ]}
      />

      <Label>{'<FeatureCards layout="2x2" />'}</Label>
      <FeatureCards
        layout="2x2"
        heading="Get governed answers each time."
        cards={[
          { title: 'Runs on the semantic layer', body: 'Every answer is built from the metrics you defined once in code, so "revenue" means the same thing here as everywhere else.' },
          { title: 'A semantic query, not raw SQL', body: 'The agent returns a governed query you can open in the normal explore view and check, so you can see exactly how it got there.' },
          { title: 'Permissions follow the person', body: 'Turn on OAuth and each Slack question respects that user’s own data access. People only ever see what they’re allowed to.' },
          { title: 'Says when it can’t', body: 'When the data isn’t there, the agent tells you, instead of hallucinating and inventing wrong answers.' },
        ]}
      />
      <Label>{'<FeatureCards layout="1x3" sub="…" />'}</Label>
      <FeatureCards
        layout="1x3"
        heading="Trust every app your team builds."
        sub="Every Data App runs on your context layer, so the numbers trace to definitions your team already trusts."
        cards={[
          { title: 'Permissions carry over', body: 'Apps inherit your roles, user attributes, and row-level security, so each viewer sees only their own data.' },
          { title: 'Every query is visible', body: 'The network inspector shows each query an app runs. Hover any number in the app to highlight the exact query behind it.' },
          { title: 'Always check the math', body: 'Open any app query in an explore, view the underlying rows, or save it back to Lightdash as a governed chart.' },
        ]}
      />
      <Label>{'<FeatureCards layout="3x2" />'}</Label>
      <FeatureCards
        layout="3x2"
        heading="Bordered 3x2 cards"
        cards={['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((t) => ({ title: `Card ${t}`, body: 'Placeholder description text for the bordered card grid.' }))}
      />
      <Label>{'<FeatureCards layout="3x2-images" />'}</Label>
      <FeatureCards
        layout="3x2-images"
        heading="Image cards"
        cards={[1, 2, 3].map((n) => ({ title: `Image card ${n}`, body: 'Placeholder description text.', image: `${MC}/U8HetUam73u69VXcJCAbACLfI.png` }))}
      />

      <Label>{'<IconBenefits />'}</Label>
      <IconBenefits
        heading={
          <>
            AI that gets better
            <br />
            the more you use it.
          </>
        }
        items={[
          { icon: `${CA}/bqqI6FAwOVvDZPqDpQLLHsMZI.svg`, title: 'Memory', body: "Correct the agent once and it remembers, so the same mistake doesn't come back next week." },
          { icon: `${CA}/crZNgh5koPZHy4Zcv4hVXYYvUI.svg`, title: 'Verified answers', body: 'Mark a great answer as verified; the agent reuses it for similar questions and surfaces it as a suggested starting point.' },
          { icon: `${CA}/Ok6lRZz120wT2QCg4t959aNzJOQ.svg`, title: 'Reviews', body: 'Lightdash flags likely-wrong answers and suggests one-click fixes to your context layer.' },
          { icon: `${CA}/5WNs7VEwF5qbwNWjQpSoM8GhRQ.svg`, title: 'Knowledge documents', body: 'Upload glossaries, metric definitions, and business context the agent reads before it answers.' },
        ]}
      />

      <Label>{'<CustomerQuote stats linesFooter />'}</Label>
      <CustomerQuote
        logo={{ src: `${SH}/Rb5NEX7CC9Uwjm4SBP0fqTnzo.png`, alt: 'JustWatch' }}
        quote={'"We create specialized agents with different instructions and data access for different departments. Each agent has personalised context specific to its team’s domain, allowing it to do nuanced jobs."'}
        person={{ name: 'Aleksandr Zolotukhin', role: 'VP of Data & Analytics @ JustWatch', photo: `${CA}/cjEFP7NIVVQ4kp7d1BeGhHSU.png` }}
        cta={{ href: './customer-story/justwatch' }}
        stats={[
          { value: '86%', label: 'reduction in BI tool spend' },
          { value: '~4000', label: 'queries per day' },
          { value: '45%', label: 'increase in active BI users' },
        ]}
        linesFooter
      />

      <Label>{'<ComparisonTable />'}</Label>
      <ComparisonTable
        heading={
          <>
            Comparison <span className="text-brand-purple">table</span>
          </>
        }
        columns={['', 'Lightdash', 'Legacy BI', 'DIY']}
        rows={[
          ['Row one', 'Lightdash value', 'Other value', 'Other value'],
          ['Row two', 'Lightdash value', 'Other value', 'Other value'],
          ['Row three', 'Lightdash value', 'Other value', 'Other value'],
        ]}
      />

      <Label>{'<SplitRow />'}</Label>
      <SplitRow
        heading="Governed context for your agents"
        lead="Lightdash agents always use your governed metrics and business context so you can actually trust what comes back."
        image={`${CL}/qIwD83POaESHeMMGqj2Y7tqtg.png`}
      />

      <Label>{'<PillTabs heading /> (data-apps)'}</Label>
      <PillTabs
        heading="If you can describe it, your team can ship it."
        imageAspect="1232 / 765"
        tabs={[
          { label: 'Finance', body: 'Is your finance team running forecasts in a spreadsheet? Build a revenue forecasting app on your governed metrics instead.', image: `${DA}/bSZPFKOcLl57YwOzSbVeVP57k.png` },
          { label: 'Marketing', body: 'Attribution models are useless trapped in a notebook only one analyst can run.', image: `${DA}/Sy3V08XNn8U0XstWNRpu9DDUu2Y.png` },
          { label: 'Customer success', body: 'Instead of static QBRs that go out of date quickly, build one QBR app instead.', image: `${DA}/WtdAn8YuvBtJkngpeYPM7qSYGo.png` },
          { label: 'Product', body: 'Product wants Amplitude-style funnels, but your funnel logic is hard-coded in models nobody wants to touch.', image: `${DA}/XHsayKly8sdiowmiqs7qJhD65Q.png` },
        ]}
      />
      <Label>{'<PillTabs /> with tab titles (metrics-catalog)'}</Label>
      <PillTabs
        sectionClassName="px-[24px] py-[64px]"
        maxWidth={1180}
        imageAspect="1132 / 580"
        tabs={[
          { label: 'Catalog', title: 'Everyone knows which number is the real one', body: 'Search every metric in your semantic layer. Each metric shows its owner, its category and how often your team actually uses it.', image: `${MC}/U8HetUam73u69VXcJCAbACLfI.png` },
          { label: 'Explorer', title: 'A question gets an answer, not a new dashboard', body: 'Click a metric and it charts itself over time.', image: `${MC}/HI8hLMFAppARD07oDfOR8udT8TY.png` },
          { label: 'Curate', title: "A catalog is useful when it's a shortlist", body: 'Curation lives in your YAML, reviewed in pull requests like everything else.', image: `${MC}/Qf3WXnCdHKiqkei6Y3l47EhM.png` },
          { label: 'Trees', title: 'See how the business works, in a picture that stays true', body: 'Declare drivers in your YAML and Lightdash draws metric trees for you.', image: `${MC}/D2lQkMOAUWc9u41Pmp1ekgWwc2Y.png` },
        ]}
      />

      <Label>{'<HatchedSpacer />'}</Label>
      <HatchedSpacer />

      <Label>{'<Faq />'}</Label>
      <Faq
        items={[
          { q: 'Can each team have its own agent?', a: 'Placeholder answer. Links look like <a>this</a>.' },
          { q: 'Which LLM does it use?', a: <>Placeholder answer with a <a href="/pricing">pricing page</a> link and <strong>bold</strong> text.</> },
          { q: 'Why not just point ChatGPT or Claude at our warehouse?', a: 'Placeholder answer.' },
          { q: 'I have an infrequently asked question.', a: 'Placeholder answer.' },
        ]}
      />

      <Label>{'<BlogCards />'}</Label>
      <BlogCards
        heading="Keep building with Data Apps"
        posts={[
          { title: 'It’s time to build on your data', href: './blogpost/it’s-time-to-build-on-your-data', thumbnail: `${SH}/FYOqNAQBg2pLdVk4AIHeq72cWU.png`, author: { name: 'Hamzah Chaudhary' } },
          { title: 'Introducing Data Apps: Build custom apps on top your governed data', href: './blogpost/introducing-data-apps', thumbnail: `${DA}/nID2yZafrg98mIPFQ7tN9PfJY.png`, author: { name: 'Shanzé Munir' } },
          { title: "Why your data team is still a bottleneck (and it's not a headcount problem)", href: './blogpost/why-your-data-team-is-still-a-bottleneck', thumbnail: `${SH}/r9UVsrGtVNZpxAmEauOeH12Pokk.png`, author: { name: 'Oliver Laslett' } },
        ]}
      />

      <Label>{'<Button variant=… />'}</Label>
      <div className="flex flex-wrap items-center gap-[16px] bg-ld-dark p-[24px]">
        {BUTTON_VARIANTS.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>

      <Label>{'<Row/> + <Spacer/> blueprint rows'}</Label>
      <Spacer height={24} />
      <Row height={53} className="flex items-center px-[64px]">
        <span className="ld-h3-32">Row with a dashed bottom line</span>
      </Row>
      <Spacer height={40} />

      <Label>{'<CtaBand narrow /> (/blog)'}</Label>
      <CtaBand narrow />
      <Label>{'<CtaBand />'}</Label>
      <CtaBand />
    </PageFrame>
  )
}
