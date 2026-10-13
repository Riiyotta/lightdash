import { useOutletContext } from 'react-router-dom'
import { Button, Lines } from '../../shared/index.js'

// specs/product-pages.md §2.11 Hero: 1280×407.8, left-aligned, padding 85/0/40, inner padding-left 73.
// Heading built from separate words (Britti Semibold 76/68.4), line 1 #272835, line 2 #000, with inline
// pixel-icon slots (48×47, 55×35, 60×35). Sub lead-18 w545. Buttons: light "Book a demo" (opens the Cal
// modal) + purple "Start for free", neither has an href on the live site. 287×287 decoration top-right.
// GAP: the three inline pixel icons were data-URL backgrounds and are not in the asset set; their slots
// are kept empty at the measured sizes.
// MOTION (Animation agent): H1 words opacity .001 → 1, tween .4 s ease (.44,0,.56,1), delays 0 / .5 / 1 s,
// one element also x −20 → 0. Words carry [data-pg-word] hooks.
function Words({ words, className }) {
  return (
    <span className={`flex flex-row flex-wrap items-center gap-x-[10px] ${className}`}>
      {words.map((w, i) =>
        typeof w === 'string' ? (
          <span key={i} data-pg-word="">
            {w}
          </span>
        ) : (
          <span key={i} aria-hidden="true" className="inline-block shrink-0" style={{ width: w.icon[0], height: w.icon[1] }} />
        ),
      )}
    </span>
  )
}

export default function PlaygroundHero({ line1, line2, sub, decoration }) {
  const ctx = useOutletContext()
  return (
    <section data-hero="" className="relative w-full bg-white px-[24px] pb-[40px] pt-[64px] tab:min-h-[407.8px] tab:pt-[85px]">
      {/* The 287×287 decoration exists in the DOM (Appendix A) but is not visible in
          reference/pages/playground-1440.png, so it is rendered at opacity 0 (hook: [data-pg-decoration]). */}
      <img
        src={decoration}
        alt=""
        width={287}
        height={287}
        data-pg-decoration=""
        className="pointer-events-none absolute right-0 top-0 hidden h-[287px] w-[287px] object-cover opacity-0 tab:block"
      />
      <div className="relative flex flex-col gap-[16px] tab:pl-[73px]">
        <h1 className="m-0 font-britti-semi text-[48px] font-normal leading-[46px] tracking-normal tab:text-[76px] tab:leading-[68.4px]">
          <Words words={line1} className="text-ld-ink" />
          <Words words={line2} className="text-black" />
        </h1>
        <p className="ld-lead-18 m-0 max-w-[545px]">{sub}</p>
        <div className="flex flex-row flex-wrap gap-[16px] pt-[8px]">
          <Button variant="v1-light" onClick={ctx?.openTalk}>
            Book a demo
          </Button>
          <Button variant="v1-purple">Start for free</Button>
        </div>
      </div>
      <Lines sides="b" />
    </section>
  )
}
