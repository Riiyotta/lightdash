import SmartLink from '../shared/SmartLink.jsx'
import { Lines } from '../shared/Frame.jsx'

// cms-templates §1.5 customer story card (variant B).
// Left cells: padding 0 24 0 64; right cells: 0 64 0 24; phone: 0 24.
// Hover (all 0.25s ease): card bg #F8FAFB → #F8F7FA, "Read full story" + chevron #666D80 → #5E4CFF.
export default function StoryCard({ story, side = 'left' }) {
  const pad = side === 'left' ? 'tab:pl-[64px] tab:pr-[24px]' : 'tab:pl-[24px] tab:pr-[64px]'
  const decor = side === 'left' ? '/assets/cms/customer-stories/decor/card-corner-a.png' : '/assets/cms/customer-stories/decor/card-corner-b.png'
  const logo = story.cardLogo ?? story.company.logo
  return (
    <SmartLink href={story.url} className={`group relative block px-[24px] no-underline ${pad}`}>
      <div className="relative flex h-full flex-col">
        <div className="relative flex flex-1 flex-col bg-[#F8FAFB] pb-[32px] transition-all duration-[250ms] ease-[ease] group-hover:bg-[#F8F7FA]">
          <div className="relative h-[70px] pb-[4px] pl-[32px] pt-[44px]">
            <img src={logo.path} alt="" className="block h-[22px] w-full object-contain object-left-top" />
            <Lines sides="b" dashed />
          </div>
          <img src={decor} alt="" width={65} height={65} className="absolute right-0 top-0 z-[2] block h-[65px] w-[65px]" />
          <h3 className="m-0 mt-[90px] px-[32px] font-inter text-[20px] font-medium leading-[28px] tracking-[-0.4px] text-[#1F1F1F]">
            {story.title}
          </h3>
          <span className="mt-[12px] flex items-center gap-[10px] px-[32px] font-inter text-[15px] font-normal leading-[18px] tracking-[-0.32px] text-[#666D80] transition-all duration-[250ms] ease-[ease] group-hover:text-[#5E4CFF]">
            Read full story
            {/* shared/chevron-right-small.svg inlined so its fill can follow the hover colour (#A4ACB9 → #5E4CFF) */}
            <svg width="5" height="7" viewBox="0 0 4.445 6.667" aria-hidden="true" className="block shrink-0 fill-[#A4ACB9] transition-all duration-[250ms] ease-[ease] group-hover:fill-[#5E4CFF]">
              <path d="M 4.445 3.333 L 0 0 L 0 6.667 Z" />
            </svg>
          </span>
        </div>
        <div className="h-[40px] bg-white tab:h-[48px]" />
        <Lines sides="rl" dashed />
      </div>
      {/* dashed top of the white strip, spanning the whole cell */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[40px] z-[1] border-t border-dashed border-ld-line tab:bottom-[48px]" />
      <Lines sides="b" dashed />
    </SmartLink>
  )
}
