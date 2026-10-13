import { PageFrame, SectionHero, LogosRow, AccordionTabs, FeatureCards, CustomerQuote, Faq, CtaBand } from '../components/shared/index.js'
import * as D from './data/interactive-dashboards.jsx'

// /interactive-dashboards — T1 product template (specs/product-pages.md §1, §2.5).
// Order: Hero(72) → Logos → Accordion tabs (1 row) → 3x2 image cards → 1x3 cards → Quote + stats → FAQ → CTA.
// The CTA section is 1169 wide at x=136 here (§1). Phone: §4 says the Quote moves after the CTA, but
// reference/pages/interactive-dashboards-390.png shows it before the FAQ, so the order is unchanged.
export default function InteractiveDashboards() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        title={D.hero.title}
        subtitle={D.hero.subtitle}
        subtitleWidth={498}
        imagePadding="0 24px"
        imageBackground={null}
        image={<img src={D.hero.image} alt="" width={1168} height={763} className="block aspect-[1168/763] w-[1168px] max-w-full" />}
      />
      <LogosRow caption={D.logosCaption} />
      <AccordionTabs {...D.tabs} imageSide="right" />
      <FeatureCards mobileCarousel layout="3x2-images" heading={D.explore.heading} cards={D.explore.cards} />
      <FeatureCards mobileCarousel layout="1x3" heading={D.speed.heading} cards={D.speed.cards} />
      <CustomerQuote {...D.quote} />
      <Faq items={D.faq} />
      <CtaBand className="min-[1200px]:mx-auto min-[1200px]:max-w-[1169px]" />
    </PageFrame>
  )
}
