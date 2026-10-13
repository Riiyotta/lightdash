import { Button } from '../../shared/index.js'
import Block from './Block.jsx'
import Tile from './Tile.jsx'

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="block">
      <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CARD_SHADOW =
  'rgba(39,40,53,.01) 0 12px 5px, rgba(39,40,53,.02) 0 7px 4px, rgba(39,40,53,.03) 0 3px 3px, rgba(39,40,53,.03) 0 1px 2px'
const STAT_SHADOW = 'rgba(39,40,53,.02) 0 0 0 1px, rgba(39,40,53,.06) 0 3px 3px'

// specs/product-pages.md §2.7 "Testimonials" (1280×530, bg #F6F8FA, padding 20/0, solid border, overlay
// gradient #F8FAFB → transparent) + "Stats" row (padding 16/80, gap 16, 3 white cards 362.7×130).
// Dark card 1120×296: #1A1B25, radius 16, padding 40/24. Stat number Inter 40/40 w500 ls −0.8 #272835,
// label Inter 14/16.8 ls −0.28 #666D80. STAT_SHADOW: the spec elides the middle layers ("…"); only the
// two given layers are used.
export default function DarkTestimonial({ avatar, name, company, role, quote, cta, tiles, stats }) {
  return (
    <Block lines="trbl" className="bg-ld-well py-[20px]" >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F8FAFB,rgba(248,250,251,0))]" />
      <div className="relative flex w-full flex-col gap-[32px]">
        <div className="px-[16px] tab:px-[80px]">
          <div
            className="relative flex w-full flex-col gap-[24px] overflow-hidden rounded-[16px] bg-ld-dark px-[24px] pb-[64px] pt-[40px] tab:min-h-[296px] tab:flex-row tab:items-start tab:pb-[40px]"
            style={{ boxShadow: CARD_SHADOW }}
          >
            <div className="flex shrink-0 flex-col tab:w-[255px] tab:pl-[24px]">
              <img src={avatar} alt={name} width={64} height={64} className="block h-[64px] w-[64px] object-contain" />
              <p className="m-0 pt-[24px] font-inter text-[16px] leading-[20px] text-ld-body">{name}</p>
              <p className="m-0 pt-[5px] font-inter text-[12px] leading-[20px] text-ld-body">
                <span className="font-medium text-white">{company}</span> <span className="text-[14px] text-[#A4ACB9]">•</span> {role}
              </p>
            </div>
            <blockquote className="m-0 font-inter text-[21px] font-medium leading-[36px] tracking-[-0.315px] text-white tab:max-w-[406px]">{quote}</blockquote>
            <div className="relative z-[1] tab:ml-auto tab:self-end">
              <Button variant="v1-light" href={cta.href} icon={<Arrow />}>
                {cta.label}
              </Button>
            </div>
            {tiles.map((t, i) => (
              <Tile key={i} {...t} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[16px] px-[16px] py-[16px] tab:grid-cols-3 tab:px-[80px]">
          {stats.map((s) => (
            <div key={s.label} className="flex min-h-[130px] flex-row items-center gap-[12px] rounded-[0px] bg-white px-[24px]" style={{ boxShadow: STAT_SHADOW }}>
              <span className="font-inter text-[40px] font-medium leading-[40px] tracking-[-0.8px] text-ld-ink">{s.value}</span>
              <span className="font-inter text-[14px] leading-[16.8px] tracking-[-0.28px] text-ld-body">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Block>
  )
}
