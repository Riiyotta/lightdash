import PixelDeco from './PixelDeco.jsx'

// 8×8 arrow drawn inline with overflow:visible like the live svg (as an <img> the 1.5px square-cap
// stroke was clipped to the box, making the arrow look thinner/shorter than the original).
export function ArrowUpRight({ hoverAccent = false }) {
  return (
    <svg width="8" height="8" viewBox="0 0 7.833 7.833" fill="none" overflow="visible" aria-hidden="true" className="block h-[8px] w-[8px] overflow-visible">
      <path d="M 7.833 6 L 7.833 0 L 1.833 0 M 0 7.833 L 7.166 0.667" className={`stroke-icon-stroke ${hoverAccent ? 'group-hover:stroke-[#A499FF]' : ''}`} strokeWidth="1.5" strokeLinecap="square" strokeMiterlimit="10" />
    </svg>
  )
}

// §3.1 feature card: bg #272835, padding 16/0/20/16, column gap 4, radius 0.
// Hover (live, all three colour variants): the arrow svg is swapped for one stroked rgb(164,153,255), instantly.
// Title Britti Sans Medium 17/20.4 400 + 16×16 icon box (gap 10) with the 8×8 arrow; desc Inter 13/15.6 #C1C7D0.
export default function FeatureCard({ card, width, className = '' }) {
  return (
    <a
      href={card.href}
      target={card.external ? '_blank' : undefined}
      rel={card.external ? 'noopener noreferrer' : undefined}
      className={`group relative flex flex-col gap-[4px] overflow-hidden bg-menu-card pb-[20px] pl-[16px] pr-0 pt-[16px] no-underline ${className}`}
      style={{ width, height: card.height }}
    >
      <span className="flex items-center gap-[10px]">
        <span className="font-britti text-[17px] font-normal leading-[20.4px] text-text-white">{card.title}</span>
        <span className="flex h-[16px] w-[16px] items-center justify-center">
          <ArrowUpRight hoverAccent />
        </span>
      </span>
      <span className="font-inter text-[13px] font-normal leading-[15.6px] text-text-card-sub">{card.desc}</span>
      <PixelDeco color={card.color} />
    </a>
  )
}
