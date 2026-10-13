import CtaBand from '../components/shared/CtaBand.jsx'
import { PageFrame, Row, Spacer } from '../components/shared/Frame.jsx'
import StoryCard from '../components/cms/StoryCard.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import { LISTED_STORIES } from './data/cms.js'

// cms-templates §5: /customer-stories index. 11 listed stories (ubie-jp excluded), 2 / 2 / 1 columns.
export default function CustomerStories() {
  usePageTitle('Customer Stories | Lightdash')
  return (
    <PageFrame frame="trbl">
      <Spacer height={100} />
      <Row className="flex h-[44px] items-start px-[24px] tab:h-[57px] tab:px-[64px]">
        <h1 className="m-0 font-britti-semi text-[40px] font-normal leading-[44px] tracking-[-1.6px] text-[#272835] tab:text-[56px] tab:leading-[56px] tab:tracking-[-2.24px]">
          Customer stories
        </h1>
      </Row>
      <Row className="px-[24px] py-[14px] tab:px-[64px]">
        <p className="m-0 max-w-[514px] font-inter text-[16px] font-normal leading-[28px] tracking-[-0.27px] text-[#666D80] tab:text-[18px] tab:leading-[32px]">
          From migration to rollout, teams share how they use Lightdash to simplify their BI workflows and ship better analytics, faster.
        </p>
      </Row>
      <Spacer height={88} />
      <div className="grid w-full grid-cols-1 tab:grid-cols-2">
        {LISTED_STORIES.map((s, i) => (
          <StoryCard key={s.slug} story={s} side={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
      <Row height={49} lines="" className="bg-white" />
      <CtaBand lines="trl" />
    </PageFrame>
  )
}
