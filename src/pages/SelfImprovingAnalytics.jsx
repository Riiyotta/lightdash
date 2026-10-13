import {
  PageFrame,
  SectionHero,
  LogosRow,
  Lines,
  AccordionTabs,
  ComparisonTable,
  Faq,
  BlogCards,
  CtaBand,
} from '../components/shared/index.js'
import * as D from './data/self-improving-analytics.jsx'

// /self-improving-analytics — T1 product template (specs/product-pages.md §1, §2.8).
// Order: Hero(72) → Logos (6 fixed columns) → Statement heading → Accordion tabs ×2 (Subtitle Pills) →
// Comparison (3 rows, 250-tall heading block) → FAQ → Blog → CTA.
export default function SelfImprovingAnalytics() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        title={
          <>
            <span className="block">{D.hero.line1}</span>
            <span className="block text-brand-purple">{D.hero.line2}</span>
          </>
        }
        subtitle={D.hero.subtitle}
        subtitleWidth={475}
        imagePadding="0"
        imageBackground={null}
        image={<img src={D.hero.image} alt="" width={1280} height={836} className="block aspect-[1280/836] w-full" />}
      />
      <LogosRow caption={D.logosCaption} fixedColumns />
      {/* Statement heading: 326 tall, padding 85/0/49, dashed bottom; h2-48 centred w624 (#272835) */}
      <section className="relative flex w-full justify-center bg-white px-[24px] pb-[49px] pt-[85px] tab:min-h-[326px]">
        <h2 className="ld-h2-48 m-0 max-w-[624px] text-center text-ld-ink">{D.statement}</h2>
        <Lines sides="b" dashed />
        <Lines sides="rl" />
      </section>
      <AccordionTabs {...D.tabsRow1} imageSide="right" />
      <AccordionTabs {...D.tabsRow2} imageSide="left" />
      <ComparisonTable heading={D.comparison.heading} columns={D.comparison.columns} rows={D.comparison.rows} headingBlock />
      <Faq items={D.faq} />
      <BlogCards heading={D.blog.heading} posts={D.blog.posts} />
      <CtaBand />
    </PageFrame>
  )
}
