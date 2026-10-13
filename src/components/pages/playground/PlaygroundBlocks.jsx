import { HatchedSpacer, Lines, SmartLink } from '../../shared/index.js'

// specs/product-pages.md §2.11: the WIP blocks under the hero.
// 1. A 1280×629 CTA-style 8px grid band holding a white 1152×549 card with the CTA shadow, EMPTY on the
//    live site (likely an unrendered embed). Card radius isn't specced: ~12px sampled from the screenshot.
// 2. Logos 2×6 (212 tall, padding 24/0/60) linking to customer stories.
// 3. Empty blocks measured on reference/pages/playground-1440.png: 598 empty; Feature 724 (32px "lines"
//    header); Feature 692 (100px hatched header); Feature 716 (32px "lines" footer); gradient 573
//    (#F8FAFB → #FFF). "lines" rows are #E5E7EB at opacity .6. Their content does not render live.

export function EmptyCardBand() {
  return (
    <section className="ld-cta-grid relative w-full px-[16px] py-[24px] tab:px-[64px] tab:py-[40px]">
      <div className="mx-auto h-[300px] w-full max-w-[1152px] rounded-[12px] bg-white shadow-ld-cta-card tab:h-[549px]" />
    </section>
  )
}

function Logo({ l }) {
  if (l.parts) {
    return (
      <span className="flex flex-row items-center gap-[8px]" role="img" aria-label={l.alt}>
        <img src={l.parts[0]} alt="" width={17} height={16} className="block h-[16px] w-[17px]" />
        <img src={l.parts[1]} alt="" width={23} height={17} className="block h-[17px] w-[23px]" />
      </span>
    )
  }
  return <img src={l.src} alt={l.alt} height={l.h} className="block object-contain" style={{ width: l.w ?? 'auto', height: l.h }} />
}

export function LogoGrid({ logos }) {
  return (
    <section className="relative w-full bg-white pb-[60px] pt-[24px]">
      <div className="grid grid-cols-2 tab:grid-cols-3 min-[1200px]:grid-cols-6">
        {logos.map((l) => (
          <SmartLink key={l.alt} href={l.href} className="flex h-[64px] items-center justify-center">
            <Logo l={l} />
          </SmartLink>
        ))}
      </div>
      <Lines sides="b" />
    </section>
  )
}

function LinesRow({ lines = 'b' }) {
  return (
    <div className="relative h-[32px] w-full">
      <Lines sides={lines} className="opacity-60" />
    </div>
  )
}

export function EmptyBlocks() {
  return (
    <>
      <div aria-hidden="true" className="relative h-[598px] w-full bg-white">
        <Lines sides="b" />
      </div>
      <div aria-hidden="true" className="relative h-[724px] w-full bg-white">
        <LinesRow />
        <Lines sides="b" />
      </div>
      <div aria-hidden="true" className="relative h-[692px] w-full bg-white">
        <HatchedSpacer opacity={0.6} className="h-[100px] tab:h-[100px]" />
        <Lines sides="b" />
      </div>
      <div aria-hidden="true" className="relative flex h-[716px] w-full flex-col justify-end bg-white">
        <LinesRow lines="tb" />
      </div>
      <div aria-hidden="true" className="relative h-[573px] w-full bg-[linear-gradient(180deg,#F8FAFB_0%,#FFFFFF_100%)]" />
    </>
  )
}
