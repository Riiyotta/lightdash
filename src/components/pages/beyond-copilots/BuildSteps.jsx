import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.10 "Build it yourself": h2-48 left (headings padding 16/72), gap 20, then a
// 2×2 "Features" grid of 568×220 link cards (padding 0 72; dashed #ECEFF3 lines). Card: 72×72 number cell
// (Britti Semibold 40/48 w600 #272835) + 496×72 title bar (padding 13/8/13/16; Britti Medium 20/24 w500
// ls −0.2 #272835); body (padding 12/8/12/16, gap 8): Inter 16/26 ls −0.16 #666D80, then the link line
// Inter 16/30 w700 #5E4CFF. All _blank.
const LINE = 'border-[#ECEFF3]'

export default function BuildSteps({ heading, items }) {
  return (
    <section className="relative flex w-full flex-col gap-[20px] bg-white pt-[72px]">
      <div className="px-[24px] py-[16px] tab:px-[72px]">
        <h2 className="ld-h2-48 m-0">{heading}</h2>
      </div>
      <div className="px-[24px] tab:px-[72px]">
        <div className="relative grid w-full grid-cols-1 tab:grid-cols-2">
          {items.map((it) => (
            <a key={it.n} href={it.href} target="_blank" rel="noopener noreferrer" className="relative grid min-h-[220px] grid-cols-[72px_1fr] no-underline">
              <div className="relative flex h-[72px] items-center justify-center">
                <span className="font-britti-semi text-[40px] font-semibold leading-[48px] text-ld-ink">{it.n}</span>
                <Lines sides="rb" dashed color={LINE} />
              </div>
              <div className="relative flex min-h-[72px] items-center pb-[13px] pl-[16px] pr-[8px] pt-[13px]">
                <h3 className="m-0 font-britti text-[20px] font-medium leading-[24px] tracking-[-0.2px] text-ld-ink">{it.title}</h3>
                <Lines sides="b" dashed color={LINE} />
              </div>
              <div className="relative">
                <Lines sides="r" dashed color={LINE} />
              </div>
              <div className="flex flex-col gap-[8px] pb-[12px] pl-[16px] pr-[8px] pt-[12px]">
                {it.body.map((b, i) => (
                  <p key={i} className="m-0 font-inter text-[16px] leading-[26px] tracking-[-0.16px] text-ld-body">
                    {b}
                  </p>
                ))}
                {it.link && <span className="font-inter text-[16px] font-bold leading-[30px] text-brand-purple">{it.link}</span>}
              </div>
              <Lines sides="trbl" dashed color={LINE} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
