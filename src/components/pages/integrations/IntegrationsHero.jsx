import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.9 Hero: 1280×295, flex column, justify flex-end, padding 0 0 15 64, dashed
// bottom. H1 Britti Semibold 56/50.4 ls −1.12 #272835 (two lines); sub Inter 18/32 #666D80 w425.
// Pixel cluster (18 × 30px) top-right; hidden on phones (reference/pages/integrations-390.png).
// MOTION (Animation agent): squares carry [data-hero-pixel][data-pixel-drop] — top group −30 → 0, bottom
// group +30 → 0, spring 0.6 s, delay 1 s.
export default function IntegrationsHero({ lines, sub, pixelsTop, pixelsBottom }) {
  return (
    <section data-hero="" className="relative flex w-full flex-col justify-end bg-white px-[24px] pb-[15px] pt-[80px] tab:min-h-[295px] tab:pl-[64px] tab:pr-0 tab:pt-0">
      <h1 className="ld-display-56 m-0 tracking-[-1.12px] text-ld-ink">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </h1>
      <p className="ld-lead-18 m-0 max-w-[425px] pt-[9px]">{sub}</p>
      {pixelsTop.map((p, i) => (
        <img
          key={`t${i}`}
          src={p.src}
          alt=""
          width={30}
          height={30}
          data-hero-pixel=""
          data-pixel-drop={-30}
          className="pointer-events-none absolute hidden h-[30px] w-[30px] object-cover tab:block"
          style={{ right: 1280 - p.x - 30, top: p.y }}
        />
      ))}
      {pixelsBottom.map((p, i) => (
        <img
          key={`b${i}`}
          src={p.src}
          alt=""
          width={30}
          height={30}
          data-hero-pixel=""
          data-pixel-drop={30}
          className="pointer-events-none absolute hidden h-[30px] w-[30px] object-cover tab:block"
          style={{ right: 1280 - p.x - 30, bottom: p.bottom }}
        />
      ))}
      <Lines sides="b" dashed />
    </section>
  )
}
