import { Lines } from '../../shared/index.js'

// Appendix B "Use cases" (<1200 only): centred heading (Britti Semibold 32/35.2 #272835) between
// dashed lines, then 3 blocks of image well (358×258) + text (Britti Medium 18/26 title, Inter 14/21 body).
export default function UseCases({ heading, items }) {
  return (
    <section className="relative w-full bg-white">
      <div className="relative h-[64px] w-full">
        <Lines sides="b" dashed />
      </div>
      <div className="relative flex w-full justify-center px-[24px] py-[0px]">
        <h2 className="m-0 max-w-[320px] text-center font-britti-semi text-[32px] font-normal leading-[35.2px] text-ld-ink tab:max-w-[560px]">
          {heading}
        </h2>
        <Lines sides="b" dashed />
      </div>
      <div className="relative h-[64px] w-full">
        <Lines sides="b" dashed />
      </div>
      {items.map((it) => (
        <div key={it.title} className="relative flex flex-col">
          <div className="relative w-full overflow-hidden bg-ld-well px-[32px] pt-[32px]">
            <img src={it.image} alt="" className="block aspect-[1336/963] w-full object-cover object-top" />
            <Lines sides="b" dashed />
          </div>
          <div className="relative flex flex-col gap-[16px] px-[24px] py-[40px]">
            <h3 className="m-0 font-britti text-[18px] font-normal leading-[26px] text-ld-ink">{it.title}</h3>
            <p className="m-0 font-inter text-[14px] leading-[21px] text-ld-body">{it.body}</p>
            <Lines sides="b" dashed />
          </div>
        </div>
      ))}
      <Lines sides="rl" />
    </section>
  )
}
