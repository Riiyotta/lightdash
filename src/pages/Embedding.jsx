import {
  PageFrame,
  SectionHero,
  LogosRow,
  AccordionTabs,
  FeatureCards,
  HatchedSpacer,
  Faq,
  FAQ_LEADS,
  CtaBand,
} from '../components/shared/index.js'
import RiveHero from '../components/pages/embedding/RiveHero.jsx'
import IntegrationPaths from '../components/pages/embedding/IntegrationPaths.jsx'
import Testimonial from '../components/pages/embedding/Testimonial.jsx'
import * as D from './data/embedding.jsx'

// /embedding — T1 product template (specs/product-pages.md §1, §2.4).
// Order: Hero(56, Rive) → Logos → Accordion tabs (1 row, 4 tabs, no 3-Tab Spacer) → 3x2 bordered cards →
// Integration paths → hatched → Testimonial → hatched → FAQ ×5 → hatched → CTA.
// Phone: the Rive HeroImage is not shown (reference/pages/embedding-390.png).
export default function Embedding() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        titleVariant="56"
        titleClassName="text-ld-dark"
        title={D.hero.title}
        subtitle={D.hero.subtitle}
        subtitleWidth={475}
        imagePadding="0 24px"
        imageBackground={D.hero.background}
        imageClassName="hidden tab:flex"
        image={<RiveHero src={D.hero.rive} />}
      />
      <LogosRow caption={D.logosCaption} />
      <AccordionTabs {...D.tabs} spacer={false} imageSide="right" />
      <FeatureCards mobileCarousel layout="3x2" heading={D.safe.heading} sub={D.safe.sub} cards={D.safe.cards} />
      <IntegrationPaths {...D.paths} />
      <HatchedSpacer />
      <Testimonial {...D.testimonial} />
      <HatchedSpacer />
      <Faq items={D.faq} lead={FAQ_LEADS.long} />
      <HatchedSpacer />
      <CtaBand />
    </PageFrame>
  )
}
