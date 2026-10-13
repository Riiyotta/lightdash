import {
  PageFrame,
  SectionHero,
  LogosRow,
  SplitRow,
  FeatureCards,
  IconBenefits,
  ComparisonTable,
  CustomerQuote,
  AccordionTabs,
  Faq,
  CtaBand,
} from '../components/shared/index.js'
import ContextDiagram from '../components/pages/context-layer/ContextDiagram.jsx'
import '../components/pages/context-layer/context-layer.css'
import * as D from './data/context-layer.jsx'

// /context-layer — T1 product template (specs/product-pages.md §1, §2.6).
// ≥1200: Hero(72 two-tone, HTML diagram) → Logos → Split → 1x3 (no heading) → Icon grid →
//   Comparison (7 rows) → Quote + stats + lines divider → FAQ → CTA.
// <1200 (reference/pages/context-layer-390.png): Hero → Logos → Split → 2 accordion rows (mobile only) →
//   Icon grid → Comparison → FAQ → Quote → 1x3 → CTA.
export default function ContextLayer() {
  return (
    <PageFrame frame="trl">
      <SectionHero
        pixels={D.pixels}
        title={D.hero.title}
        titleClassName="font-semibold text-brand-purple"
        subtitle={D.hero.subtitle}
        subtitleWidth={475}
        imagePadding="0 24px"
        imageBackground="#F6F8FA"
        image={<ContextDiagram />}
      />
      <LogosRow caption={D.logosCaption} />
      <SplitRow {...D.split} className="cl-split" />
      <FeatureCards layout="1x3" cards={D.cards} className="cl-cards order-4 min-[1200px]:order-none" />
      <div className="cl-mtabs min-[1200px]:hidden">
        {D.mobileTabs.map((row, i) => (
          <AccordionTabs key={row.pill} {...row} imageSide={i === 0 ? 'right' : 'left'} headingClassName="!text-[#272835]" />
        ))}
      </div>
      <IconBenefits heading={D.security.heading} items={D.security.items} />
      <ComparisonTable heading={D.comparison.heading} columns={D.comparison.columns} rows={D.comparison.rows} />
      <CustomerQuote
        {...D.quote}
        quoteSize="32"
        strip={{ src: D.quote.strip, width: 96, height: 24, className: 'left-[55.16%] top-0' }}
        linesFooter
        className="order-3 min-[1200px]:order-none"
      />
      <Faq items={D.faq} className="order-2 min-[1200px]:order-none" />
      <CtaBand className="order-5 min-[1200px]:order-none" />
    </PageFrame>
  )
}
