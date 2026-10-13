import { useParams } from 'react-router-dom'
import Button from '../components/shared/Button.jsx'
import CtaBand from '../components/shared/CtaBand.jsx'
import { Lines, PageFrame, Row, Spacer } from '../components/shared/Frame.jsx'
import PlaceholderBody from '../components/cms/PlaceholderBody.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import NotFound from './NotFound.jsx'
import { EVENTS_BY_SLUG, normalizeHref } from './data/cms.js'

// §7.2 event details card (well 384 / 365 / 310, card padding 24).
function DetailsCard({ event, className = '' }) {
  return (
    <div className={`bg-[#F8FAFB] p-[20px] ${className}`}>
      <div className="bg-white p-[24px]">
        <p className="m-0 font-britti text-[18px] font-normal leading-[24px] tracking-[-0.36px] text-[#36394A]">Event details</p>
        <ul className="m-0 mt-[24px] list-none p-0">
          {event.details.map((d, i) => (
            <li
              key={d.field}
              className={`flex h-[56px] items-center gap-[10px] border-0 border-dashed border-[#E7E9EA] py-[16px] ${i === 0 ? 'border-y' : ''} ${
                i === 1 || i === 2 ? 'border-b' : ''
              }`}
            >
              <img src={d.icon} alt="" width={20} height={20} className="block h-[20px] w-[20px] shrink-0" />
              <span className="font-britti text-[16px] font-normal leading-[24px] tracking-[-0.36px] text-[#36394A]">{d.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// cms-templates §7: /events/:slug. No breadcrumb, no events index.
export default function Event() {
  const { slug } = useParams()
  const event = EVENTS_BY_SLUG[slug]
  usePageTitle(event?.pageTitle)
  if (!event) return <NotFound />
  const ctaHref = normalizeHref(event.cta.href)

  return (
    <PageFrame frame="trbl">
      <Spacer height={100} />

      {/* §7.1 header rows span the left 832 px (810: 370; phone: full width) */}
      <div className="w-full tab:w-[370px] desk:w-[832px]">
        <Row height={30} lines="b" className="flex items-center px-[24px] py-[6px] desk:pl-[64px]">
          <span className="inline-flex h-[24px] items-center rounded-[4px] border border-solid border-[#D8D5F5] bg-[rgba(243,237,252,0.7)] px-[12px] font-britti text-[13px] font-normal leading-[15.6px] text-[#7668F7]">
            {event.tag}
          </span>
        </Row>
        <Spacer height={24} />
        <Row className="px-[24px] desk:pl-[64px]">
          <h1 className="m-0 font-britti-semi text-[40px] font-normal leading-[44px] tracking-[-1.6px] text-[#272835] tab:max-w-[322px] tab:text-[46px] tab:leading-[46px] tab:tracking-[-1.84px] desk:max-w-[744px] desk:text-[56px] desk:leading-[56px] desk:tracking-[-2.24px]">
            {event.title}
          </h1>
        </Row>
        <Row className="px-[24px] py-[16px] desk:pl-[64px]">
          <p className="m-0 font-britti text-[18px] font-normal leading-[25.2px] text-[#666D80]">
            Placeholder event summary. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Row>
        <Row height={41} lines="" className="flex items-center px-[24px] desk:pl-[64px]">
          <Button variant="third" href={ctaHref}>
            {event.cta.label}
          </Button>
        </Row>
      </div>
      <Spacer height={60} lines="" />

      {/* §7.2 body: main column (641 content) + details card at x=912 (not sticky) */}
      <div className="relative flex flex-col pb-[60px] tab:flex-row tab:pr-[24px] desk:pr-[64px]">
        <Lines sides="t" dashed color="border-[#E7E9EA]" />
        <div className="min-w-0 px-[24px] pt-[20px] tab:flex-1 tab:pr-[40px] desk:w-[832px] desk:flex-none desk:pl-[64px] desk:pr-0">
          <PlaceholderBody variant="event" image={event.ogImage.path} className="desk:w-[641px]" />
        </div>
        <DetailsCard event={event} className="mx-[24px] mt-[40px] self-stretch tab:mx-0 tab:self-start tab:mt-0 tab:w-[365px] tab:shrink-0 desk:w-[384px]" />
      </div>

      <CtaBand lines="trl" />
    </PageFrame>
  )
}
