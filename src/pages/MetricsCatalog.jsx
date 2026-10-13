import { PageFrame, SectionHero, LogosRow, PillTabs, FeatureCards, Faq, CtaBand } from '../components/shared/index.js'
import * as D from './data/metrics-catalog.jsx'

// /metrics-catalog — T1 product template (specs/product-pages.md §1, §2.3).
// Order: Hero(56) → Logos → Pill tabs visual (§3.2) → 1x3 cards → FAQ ×8 → CTA.
export default function MetricsCatalog() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        titleVariant="56"
        title={D.hero.title}
        subtitle={D.hero.subtitle}
        subtitleWidth={468}
        subtitleClassName="leading-[31.86px] tracking-[-0.27px]"
        imagePadding="24px 24px 0"
        imageClassName="items-end"
        image={<img src={D.hero.image} alt="" width={1091} height={601} className="block aspect-[1091/601] w-[1091px] max-w-full" />}
      />
      <LogosRow caption={D.logosCaption} />
      <PillTabs sectionClassName="px-[24px] py-[64px]" maxWidth={1180} imageAspect="1132 / 580" tabs={D.pillTabs} />
      <FeatureCards layout="1x3" heading={D.curate.heading} sub={D.curate.sub} cards={D.curate.cards} />
      <Faq items={D.faq} />
      <CtaBand />
    </PageFrame>
  )
}
