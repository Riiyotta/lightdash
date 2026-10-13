import { useParams } from 'react-router-dom'
import { Lines, PageFrame, Row, Spacer } from '../components/shared/Frame.jsx'
import Breadcrumb from '../components/cms/Breadcrumb.jsx'
import InlineCta from '../components/cms/InlineCta.jsx'
import PlaceholderBody from '../components/cms/PlaceholderBody.jsx'
import RelatedHeader from '../components/cms/RelatedHeader.jsx'
import StoryCard from '../components/cms/StoryCard.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import NotFound from './NotFound.jsx'
import { STORIES_BY_SLUG, companyName } from './data/cms.js'

const COMPANY_BLURB =
  'Placeholder company description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

// §6.1 sidebar company card (well #F8FAFB p20, card #FFF p24).
function CompanyCard({ story, className = '' }) {
  const facts = [
    ['Industry', story.company.industry],
    ['Location', story.company.location],
    ['Employees', story.company.employees],
  ]
  return (
    <div className={`bg-[#F8FAFB] p-[20px] ${className}`}>
      <div className="bg-white p-[24px]">
        <img src={story.company.logo.path} alt={companyName(story)} className="block h-[19px] w-auto max-w-[232px] object-contain object-left" />
        <p className="m-0 mt-[27px] font-inter text-[14px] font-normal leading-[23.94px] text-[#36394A]">{COMPANY_BLURB}</p>
        <div className="mt-0">
          {facts.map(([label, value], i) => (
            <div
              key={label}
              className={`border-0 border-dashed border-[#E7E9EA] py-[16px] ${i === 0 ? 'border-y' : ''} ${i === 1 ? 'border-b' : ''}`}
            >
              <p className="m-0 font-inter text-[14px] font-normal leading-[23.94px] text-[#818898]">{label}</p>
              <p className="m-0 mt-[6px] font-britti text-[18px] font-normal leading-[23.94px] text-[#36394A]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// cms-templates §6: /customer-story/:slug (incl. the unlisted ubie-jp).
export default function CustomerStory() {
  const { slug } = useParams()
  const story = STORIES_BY_SLUG[slug]
  usePageTitle(story?.pageTitle)
  if (!story) return <NotFound />
  const related = story.related.map((s) => STORIES_BY_SLUG[s]).filter(Boolean)
  const stats = Array.from({ length: story.statCount })

  return (
    <PageFrame frame="trbl" lang={story.lang}>
      <Spacer height={100} />
      <Row height={20} className="flex items-center px-[24px] tab:px-[64px]">
        <Breadcrumb sep="/" items={[{ label: 'Customer stories', href: '/customer-stories' }, { label: companyName(story) }]} />
      </Row>
      <Spacer height={24} />
      <Row className="px-[24px] tab:px-[64px]">
        <h1 className="m-0 max-w-[780px] font-britti-semi text-[36px] font-normal leading-[39.6px] tracking-[-0.96px] text-[#272835] tab:text-[48px] tab:leading-[52.8px]">
          {story.title}
        </h1>
      </Row>
      <Spacer height={24} />

      {/* person row */}
      <Row height={64} className="flex items-center gap-[24px] px-[24px] tab:px-[64px]">
        <img src={story.person.avatar} alt="" width={64} height={64} className="block h-[64px] w-[64px] shrink-0 object-cover" />
        <div className="flex flex-col font-inter text-[16px] leading-[19.2px] tab:gap-[5px]">
          <span className="hidden font-normal text-[#666D80] tab:block">A conversation with</span>
          <span className="flex flex-col tab:flex-row tab:items-center">
            <span className="font-medium text-[#272835]">{story.person.name}</span>
            <span aria-hidden="true" className="mx-[10px] hidden font-inter text-[12px] text-[#A4ACB9] tab:inline">
              ·
            </span>
            <span className="font-normal text-[#666D80]">{story.person.role}</span>
          </span>
        </div>
      </Row>
      <Spacer height={40} />

      {/* §6.1 banner + §6.2 body: column x=144..1296 (dashed L/R) */}
      <div className="relative tab:mx-[24px] desk:mx-[64px]">
        <img src={story.banner.path} alt="" className="block h-[160px] w-full object-cover" />
        <div className="flex flex-col desk:flex-row">
          <div className="relative min-w-0 desk:w-[832px] desk:shrink-0">
            {/* stats: N equal cells (desktop), 3 + 1 at 810, 1 per row on phone */}
            <div className="flex flex-wrap">
              {stats.map((_, i) => (
                <div key={i} className="relative flex h-[112px] grow basis-full flex-col items-center justify-center p-[20px] text-center tab:basis-1/3 desk:basis-0">
                  <span className="font-britti-semi text-[32px] font-normal leading-[32px] tracking-[-0.27px] text-[#272835]">00+</span>
                  <span className="line-clamp-2 font-inter text-[14px] font-normal leading-[19.88px] tracking-[-0.27px] text-[#666D80]">Placeholder metric label</span>
                  <Lines sides="rb" dashed />
                </div>
              ))}
            </div>
            <PlaceholderBody variant="story" image={story.banner.path} className="px-[24px] pb-[116px] pt-[40px] tab:px-[40px]" />
            <InlineCta />
            <CompanyCard story={story} className="desk:hidden" />
            <div className="h-[64px]" />
            <Lines sides="rl" dashed />
          </div>
          <aside className="relative hidden w-[320px] shrink-0 desk:block">
            <CompanyCard story={story} className="sticky top-[74px]" />
            <Lines sides="r" dashed />
          </aside>
        </div>
      </div>

      {/* related stories */}
      <RelatedHeader title="Related stories" href="/customer-stories" gutter="tab:px-[64px]" />
      <div className="grid w-full grid-cols-1 tab:grid-cols-2">
        {related.map((s, i) => (
          <StoryCard key={s.slug} story={s} side={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>
      <div className="h-[96px]" />
    </PageFrame>
  )
}
