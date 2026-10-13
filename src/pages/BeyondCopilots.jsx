import { PageFrame, SplitRow, HatchedSpacer, CtaBand } from '../components/shared/index.js'
import EventHero from '../components/pages/beyond-copilots/EventHero.jsx'
import Replay from '../components/pages/beyond-copilots/Replay.jsx'
import BuildSteps from '../components/pages/beyond-copilots/BuildSteps.jsx'
import Speakers from '../components/pages/beyond-copilots/Speakers.jsx'
import * as D from './data/beyond-copilots.js'

// /beyond-copilots — T3 event / on-demand (specs/product-pages.md §1, §2.10). No banner.
// Order: Event hero → YouTube replay → Split content → Build it yourself → hatched (.6) → Built live by → CTA.
export default function BeyondCopilots() {
  return (
    <PageFrame frame="trl">
      <EventHero {...D.hero} />
      <Replay {...D.replay} />
      <SplitRow {...D.split} />
      <BuildSteps {...D.steps} />
      <HatchedSpacer opacity={0.6} />
      <Speakers {...D.speakers} />
      <CtaBand />
    </PageFrame>
  )
}
