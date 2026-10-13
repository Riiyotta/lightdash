import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.4 "Integration paths" + Appendix A (y 2815–3262 at 1440).
// Title block: Britti Semibold 48/43.2 w600 #272835 centred, subtitle Inter 18/31.86 #666D80,
// padding 24/0/53, dashed bottom. Stack: two 640×295 white columns split by a 1px line; column
// content centred: name Britti Medium 18/18 ls −0.36 (10 above the description), description Inter 16/24
// ls −0.32 #818898 (w309), then (24 below) a left-aligned bulleted list (w288.8).
export default function IntegrationPaths({ title, subtitle, columns }) {
  return (
    <section className="relative w-full bg-white">
      <div className="relative flex w-full flex-col items-center px-[24px] pb-[53px]">
        <h2 className="m-0 text-center font-britti-semi text-[48px] font-semibold leading-[43.2px] text-ld-ink">{title}</h2>
        <p className="m-0 pt-[24px] text-center font-inter text-[18px] leading-[31.86px] text-ld-body">{subtitle}</p>
        <Lines sides="b" dashed />
      </div>
      <div className="relative grid w-full grid-cols-1 tab:grid-cols-2">
        {columns.map((c, i) => (
          <div key={c.title} className="relative flex flex-col items-center gap-[24px] bg-white px-[24px] pb-[49px] pt-[50px]">
            <div className="flex flex-col items-center gap-[10px]">
              <h3 className="m-0 font-britti text-[18px] font-medium leading-[18px] tracking-[-0.36px] text-ld-ink">{c.title}</h3>
              <p className="m-0 max-w-[309px] text-center font-inter text-[16px] leading-[24px] tracking-[-0.32px] text-ld-muted">{c.body}</p>
            </div>
            <ul className="m-0 w-full max-w-[288.8px] list-disc pl-[20px] font-inter text-[16px] leading-[24px] tracking-[-0.32px] text-ld-muted">
              {c.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {i === 0 && <Lines sides="r" className="hidden tab:block" />}
            {i === 0 && <Lines sides="b" className="tab:hidden" />}
          </div>
        ))}
      </div>
    </section>
  )
}
