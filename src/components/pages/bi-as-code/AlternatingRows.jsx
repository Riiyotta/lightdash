import { Lines } from '../../shared/index.js'
import Block from './Block.jsx'

// specs/product-pages.md §2.7 "Desktop / Cards": 1280×1620, padding 124/0/64, solid border.
// Heading h2-48 centred w624 in a 144-tall block with dashed top/bottom, 64 spacer, then three 640/640
// rows of 408: image cell padding-left 64 (image left) / padding-right 64 (image right), image 576×408
// cover; text cell padding 0 112 0 40 (image left) or 0 40 0 112 (image right): h3-32 #272835 then
// Inter 14/21 #666D80. Rows have dashed borders; pixel decorations sit on cell corners.
// Phone: text above image (reference/pages/bi-as-code-390.png).
export default function AlternatingRows({ heading, items, decorations }) {
  return (
    <Block lines="trbl" className="bg-white pb-[64px] pt-[80px] tab:pt-[124px]">
      <div className="relative flex w-full justify-center px-[24px] tab:min-h-[144px] tab:items-center">
        <h2 className="ld-h2-48 m-0 max-w-[624px] text-center text-ld-ink">{heading}</h2>
        <Lines sides="tb" dashed />
      </div>
      <div className="h-[40px] tab:h-[64px]" />
      <div className="relative w-full">
        {items.map((it) => {
          const left = it.imageSide === 'left'
          return (
            <div key={it.title} className={`relative flex flex-col tab:h-[408px] ${left ? 'tab:flex-row' : 'tab:flex-row-reverse'}`}>
              <div className={`relative order-2 flex w-full tab:order-none tab:w-1/2 ${left ? 'tab:pl-[64px]' : 'tab:pr-[64px]'}`}>
                <img src={it.image} alt="" className="block aspect-[576/408] w-full object-cover tab:h-[408px] tab:w-[576px] tab:max-w-full" />
                <Lines sides={left ? 'r' : 'l'} dashed className="hidden tab:block" />
              </div>
              <div
                className={`relative order-1 flex w-full flex-col justify-center gap-[16px] px-[24px] py-[40px] tab:order-none tab:w-1/2 tab:py-0 ${
                  left ? 'tab:pl-[40px] tab:pr-[112px]' : 'tab:pl-[112px] tab:pr-[40px]'
                }`}
              >
                <h3 className="ld-h3-32 m-0 text-ld-ink">{it.title}</h3>
                <p className="m-0 font-inter text-[14px] leading-[21px] text-ld-body">{it.body}</p>
              </div>
              <Lines sides="b" dashed />
            </div>
          )
        })}
        {decorations.map((d) => (
          <img
            key={d.src + d.left}
            src={d.src}
            alt=""
            width={d.w}
            height={d.h}
            className="pointer-events-none absolute hidden object-cover min-[1280px]:block"
            style={{ left: d.left, top: d.top, width: d.w, height: d.h }}
          />
        ))}
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[64px] hidden border-l border-dashed border-ld-line tab:block" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[64px] hidden border-r border-dashed border-ld-line tab:block" />
    </Block>
  )
}
