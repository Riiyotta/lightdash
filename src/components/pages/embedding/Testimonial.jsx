import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.4 "Testimonial (photo left)": 1280×424, padding 64. Avatar 124×124 (contain)
// 64 left of a 708-wide quote (Britti Medium 32/40.96 w500 #36394A, accent span #FF7300); attribution
// Inter 15/15 w500: name #272835 · "·" #A4ACB9 · role #666D80. 61×48 corner pixel decorations at
// top-left (17, 16) and bottom-right (16 from the right / bottom edges).
export default function Testimonial({ avatar, corner, quote, name, role }) {
  return (
    <section className="relative flex w-full justify-center bg-white px-[24px] py-[64px] tab:min-h-[424px] tab:items-center tab:px-[64px]">
      <img src={corner} alt="" width={61} height={48} className="pointer-events-none absolute left-[17px] top-[16px] h-[48px] w-[61px] object-cover" />
      <img src={corner} alt="" width={61} height={48} className="pointer-events-none absolute bottom-[16px] right-[16px] h-[48px] w-[61px] object-cover" />
      <div className="flex w-full max-w-[896px] flex-col items-start gap-[32px] tab:flex-row tab:items-center tab:gap-[64px]">
        <img src={avatar} alt={name} width={124} height={124} className="block h-[124px] w-[124px] shrink-0 object-contain" />
        <figure className="m-0 flex min-w-0 flex-col gap-[24px] tab:max-w-[708px]">
          <blockquote className="m-0 font-britti text-[32px] font-medium leading-[40.96px] text-ld-ink-700">{quote}</blockquote>
          <figcaption className="font-inter text-[15px] font-medium leading-[15px] text-ld-body">
            <span className="text-ld-ink">{name}</span> <span className="text-[#A4ACB9]">·</span> {role}
          </figcaption>
        </figure>
      </div>
      <Lines sides="rl" />
    </section>
  )
}
