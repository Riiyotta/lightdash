import { Button } from '../../shared/index.js'

// specs/product-pages.md §2.10 "Event Hero": padding 72/72/51, left-aligned.
// Eyebrow Inter 14/16.8 w700 ls 1.12 uppercase #5E4CFF; co-host logos row (padding 20/0, gap 12, "×"
// separators 17 wide); H1 display-72 w600 #000 (w909) with #5E4CFF span; subtitle lead-18 (w795);
// Third + Fourth buttons; meta Inter 14/16.8 #666D80, 20px above.
// GAP: the "Cross" separator asset isn't in the asset set — rendered as a "×" glyph in #818898.
// MOTION (Animation agent): hero fade-in on load ([data-hero]).
export default function EventHero({ eyebrow, cohosts, title, accent, subtitle, buttons, meta }) {
  return (
    <section data-hero="" className="relative flex w-full flex-col items-start bg-white px-[24px] pb-[51px] pt-[48px] tab:px-[72px] tab:pt-[72px]">
      <p className="m-0 font-inter text-[14px] font-bold uppercase leading-[16.8px] tracking-[1.12px] text-brand-purple">{eyebrow}</p>
      <div className="flex flex-row flex-wrap items-center gap-[12px] py-[20px]">
        {cohosts.map((l, i) => (
          <span key={l.alt} className="contents">
            {i > 0 && (
              <span aria-hidden="true" className="w-[17px] text-center font-inter text-[16px] leading-[16px] text-ld-muted">
                ×
              </span>
            )}
            <img src={l.src} alt={l.alt} width={l.w} height={l.h} className="block object-cover" style={{ width: l.w, height: l.h }} />
          </span>
        ))}
      </div>
      <h1 className="ld-display-72 m-0 max-w-[909px] font-semibold text-black">
        {title} <span className="text-brand-purple">{accent}</span>
      </h1>
      <div className="py-[24px]">
        <p className="ld-lead-18 m-0 max-w-[795px]">{subtitle}</p>
      </div>
      <div className="flex flex-row flex-wrap gap-[16px] pl-[4px]">
        {buttons.map((b) => (
          <Button key={b.label} variant={b.variant} href={b.href} newTab={b.newTab}>
            {b.label}
          </Button>
        ))}
      </div>
      <p className="m-0 pt-[20px] font-inter text-[14px] leading-[16.8px] text-ld-body">{meta}</p>
    </section>
  )
}
