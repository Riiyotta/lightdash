import { PageFrame, Spacer, CtaBand } from '../components/shared/index.js'
import IntegrationsHero from '../components/pages/integrations/IntegrationsHero.jsx'
import IntegrationsDirectory from '../components/pages/integrations/IntegrationsDirectory.jsx'
import * as D from './data/integrations.js'

// /integrations — T2 directory (specs/product-pages.md §1, §2.9). No banner (InnerLayout banner={false}).
// Order: left-aligned hero with pixel cluster → spacer 40 → sticky TOC + 3-col filterable grid → CTA.
export default function Integrations() {
  return (
    <PageFrame frame="trl" clip={false}>
      <IntegrationsHero {...D.hero} pixelsTop={D.pixelsTop} pixelsBottom={D.pixelsBottom} />
      <Spacer height={40} />
      <IntegrationsDirectory categories={D.CATEGORIES} items={D.INTEGRATIONS} />
      <CtaBand />
    </PageFrame>
  )
}
