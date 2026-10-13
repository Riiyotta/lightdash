import { useEffect } from 'react'
import {
  PageFrame,
  SectionHero,
  LogosRow,
  AccordionTabs,
  FeatureCards,
  IconBenefits,
  CustomerQuote,
  Faq,
  CtaBand,
} from '../components/shared/index.js'
import * as D from './data/conversational-analytics.jsx'

// /conversational-analytics — T1 product template (specs/product-pages.md §1, §2.1).
// Order: Hero(72) → Logos → Accordion tabs ×2 → 2x2 text cards → Icon grid → Quote + stats → FAQ ×7 → CTA.
// Phone (<810): the Customer Quote is re-ordered after the CTA band (measured, §4).
export default function ConversationalAnalytics() {
  useEffect(() => {
    document.title = 'Conversational Analytics for Data Teams | Lightdash'
  }, [])

  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        title={D.hero.title}
        subtitle={D.hero.subtitle}
        subtitleWidth={D.hero.subtitleWidth}
        imagePadding="48px 24px 0"
        image={<img src={D.hero.image} alt="" width={980} height={659} className="block aspect-[980/659] w-[980px] max-w-full" />}
      />
      <LogosRow caption={D.logosCaption} />
      <AccordionTabs {...D.tabsRow1} imageSide="right" />
      <AccordionTabs {...D.tabsRow2} imageSide="left" />
      <FeatureCards mobileCarousel layout="2x2" heading={D.governed.heading} cards={D.governed.cards} />
      <IconBenefits heading={D.benefits.heading} items={D.benefits.items} />
      <CustomerQuote {...D.quote} className="order-1 tab:order-none" />
      <Faq items={D.faq} />
      <CtaBand />
    </PageFrame>
  )
}
