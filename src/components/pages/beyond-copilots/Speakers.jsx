import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.10 "Built live by": h2-48 left, "Speakers" grid 3 × 365.3, gap 20,
// padding 20/72/0. Card: dashed border all round. Photo band 124 tall = background strip (cover) + a
// 124×124 photo with filter brightness(1.2) grayscale(1) (the #364AFF soft-light "Tint" is omitted, see below).
// Details padding 20/24/0, gap 8: company logo, name Britti Medium 20/28 w500, role lead-18.
export default function Speakers({ heading, strip, items }) {
  return (
    <section className="relative flex w-full flex-col bg-white pb-[72px] pt-[72px]">
      <div className="px-[24px] py-[16px] tab:px-[72px]">
        <h2 className="ld-h2-48 m-0">{heading}</h2>
      </div>
      <div className="grid grid-cols-1 gap-[20px] px-[24px] pt-[20px] tab:grid-cols-3 tab:px-[72px]">
        {items.map((s) => (
          <div key={s.name} className="relative flex flex-col pb-[26px]">
            <div className="relative flex h-[124px] w-full justify-center overflow-hidden" style={{ background: `url(${strip}) center / cover no-repeat` }}>
              <div className="relative h-[124px] w-[124px]">
                {/* DEVIATION: the spec's #364AFF soft-light "Tint" overlay is not rendered. Over the photo it turns
                    it visibly blue, while reference/pages/beyond-copilots-1440.png shows plain grayscale photos. */}
                <img src={s.photo} alt={s.name} width={124} height={124} className="relative block h-[124px] w-[124px] object-cover [filter:brightness(1.2)_grayscale(1)]" />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] px-[24px] pt-[20px]">
              <img src={s.logo.src} alt={s.logo.alt} width={s.logo.w} height={s.logo.h} className="block object-cover" style={{ width: s.logo.w, height: s.logo.h }} />
              <p className="m-0 font-britti text-[20px] font-medium leading-[28px] text-ld-ink-700">{s.name}</p>
              <p className="ld-lead-18 m-0">{s.role}</p>
            </div>
            <Lines sides="trbl" dashed />
          </div>
        ))}
      </div>
    </section>
  )
}
