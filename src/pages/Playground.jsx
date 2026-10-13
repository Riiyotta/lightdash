import { PageFrame, CtaBand } from '../components/shared/index.js'
import PlaygroundHero from '../components/pages/playground/PlaygroundHero.jsx'
import { EmptyCardBand, LogoGrid, EmptyBlocks } from '../components/pages/playground/PlaygroundBlocks.jsx'
import * as D from './data/playground.js'

// /playground — T4 draft / WIP (specs/product-pages.md §1, §2.11). No banner. Replicates the live
// page's unfinished state: empty card band, logos, empty Feature blocks, gradient block, CTA.
export default function Playground() {
  return (
    <PageFrame frame="trl">
      <PlaygroundHero {...D.hero} />
      <EmptyCardBand />
      <LogoGrid logos={D.logos} />
      <EmptyBlocks />
      <CtaBand />
    </PageFrame>
  )
}
