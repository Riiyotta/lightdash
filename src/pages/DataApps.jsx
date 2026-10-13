import {
  PageFrame,
  SectionHero,
  LogosRow,
  FeatureCards,
  PillTabs,
  AccordionTabs,
  CustomerQuote,
  Faq,
  FAQ_LEADS,
  BlogCards,
  CtaBand,
} from '../components/shared/index.js'
import UseCases from '../components/pages/data-apps/UseCases.jsx'
import WhyDifferent from '../components/pages/data-apps/WhyDifferent.jsx'
import '../components/pages/data-apps/data-apps.css'
import * as D from './data/data-apps.jsx'

// /data-apps — T1 product template (specs/product-pages.md §1, §2.2).
// ≥1200: Hero(72, iframe) → Logos → 1x3 → Pill tabs → 1x3 → Quote (no stats/button) → FAQ ×6 → Blog → CTA.
// <1200 (Appendix B + reference/pages/data-apps-390.png): Hero → Logos → Use cases → Sprint accordion →
//   Pill tabs → "Data apps as code" → "Trust every app" → Why It's Different → FAQ → Blog → Quote → CTA.
// Flex `order` reorders the shared sections; the three Appendix B sections are hidden at ≥1200.
const BELOW = 'min-[1200px]:hidden'

export default function DataApps() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        title={D.hero.title}
        subtitle={D.hero.subtitle}
        subtitleWidth={D.hero.subtitleWidth}
        imagePadding="19px 0"
        imageHeight={609}
        spacerHeight={0}
        image={
          <iframe
            src={D.hero.iframe.src}
            title={D.hero.iframe.title}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
            className="block h-[577px] w-[656px] max-w-full shrink-0"
            style={{ border: 0, background: 'transparent' }}
          />
        }
      />
      <LogosRow caption={D.logosCaption} />

      <div className={`order-1 ${BELOW}`}>
        <UseCases {...D.useCases} />
      </div>
      <div className={`da-sprint order-2 ${BELOW}`}>
        <AccordionTabs heading={D.sprint.heading} lead={D.sprint.lead} tabs={D.sprint.tabs.map((t) => ({ ...t, image: D.sprint.image }))} />
      </div>

      <FeatureCards
        layout="1x3"
        heading={D.trust.heading}
        sub={D.trust.sub}
        cards={D.trust.cards}
        className="da-force3 order-5 min-[1200px]:order-none"
      />
      <PillTabs heading={D.pillTabs.heading} tabs={D.pillTabs.tabs} imageAspect="1232 / 765" sectionClassName="order-3 min-[1200px]:order-none" />
      <FeatureCards
        layout="1x3"
        heading={D.asCode.heading}
        sub={D.asCode.sub}
        cards={D.asCode.cards}
        className="da-force3 order-4 min-[1200px]:order-none"
      />

      <div className={`order-6 ${BELOW}`}>
        <WhyDifferent {...D.why} />
      </div>

      <CustomerQuote {...D.quote} padded={false} className="order-9 min-[1200px]:order-none" />
      <Faq items={D.faq} lead={FAQ_LEADS.long} className="order-7 min-[1200px]:order-none" />
      <BlogCards heading={D.blog.heading} posts={D.blog.posts} className="order-8 min-[1200px]:order-none" />
      <CtaBand className="order-10 min-[1200px]:order-none" />
    </PageFrame>
  )
}
