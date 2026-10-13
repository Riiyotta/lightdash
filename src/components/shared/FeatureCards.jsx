import { Lines } from './Frame.jsx'
import { useMobileCarousel, CarouselDots } from './MobileCarousel.jsx'

// SHARED §7.4 feature card grids. Cards are <a> without href and have no hover change.
// Section: bg #FFF, padding 72/0, flex column gap 20, centred. Headings padding 16/72, gap 16.
// Carousel viewport padding 0/72 → grid 1136 wide at 1440.

const LAYOUT = {
  // 3 × 365.3, column gap 20; each card: padding 28, gap 10, 1px solid TOP line only
  '1x3': { grid: 'tab:grid-cols-3 gap-[20px]', card: 't', dashed: false },
  // same columns, row gap 20; full 1px solid border (169.2 tall)
  '3x2': { grid: 'tab:grid-cols-3 gap-[20px]', card: 'trbl', dashed: false, minH: 169.2 },
  // 365.3 × 371.6, full solid border; image 365×228 cover on top, then text block with a top line
  '3x2-images': { grid: 'tab:grid-cols-3 gap-[20px]', card: 'trbl', dashed: false },
  // 556 + 556, gap 24; dashed outer border on the grid, each card dashed all round
  '2x2': { grid: 'tab:grid-cols-2 gap-[24px]', card: 'trbl', dashed: true, minH: 169.4, outer: true, bodyFull: true },
}

/**
 * @param heading   node (h2-48). Left-aligned for 1x3 / 3x2, centred for 2x2 (override with `align`)
 * @param sub       optional sub-16 line (#6B7280)
 * @param layout    '1x3' | '3x2' | '3x2-images' | '2x2'
 * @param cards     [{ title, body, image?, imageAlt? }]
 * @param lines     section hairlines, e.g. "rl" for solid side lines (some pages)
 * @param mobileCarousel  below 810 the grid becomes a swipe carousel with dots (live: conversational-analytics
 *                  2x2, embedding 3x2, interactive-dashboards 3x2-images + 1x3). Cards are 280×400 with a
 *                  solid 1px border all round on phone, whatever the desktop layout draws.
 */
export default function FeatureCards({ heading, sub, layout = '1x3', align, cards = [], lines, mobileCarousel = false, className = '' }) {
  const cfg = LAYOUT[layout] ?? LAYOUT['1x3']
  const centred = (align ?? (layout === '2x2' ? 'center' : 'left')) === 'center'
  const car = useMobileCarousel(cards.length)
  const mc = mobileCarousel
  // with the carousel, desktop-only card/grid lines hide below 810 and a solid all-round border shows instead
  const deskOnly = mc ? 'max-[809.98px]:hidden' : ''
  return (
    <section className={`relative flex w-full flex-col items-center gap-[20px] bg-white py-[72px] ${mc ? 'ld-mcar' : ''} ${className}`}>
      {lines && <Lines sides={lines} />}
      {(heading || sub) && (
        <div className={`flex w-full flex-col gap-[16px] px-[24px] py-[16px] tab:px-[72px] ${mc ? 'ld-mcar-head' : ''} ${centred ? 'items-center text-center' : 'items-start text-left'}`}>
          {heading && <h2 className="ld-h2-48 m-0">{heading}</h2>}
          {sub && <p className="ld-sub-16 m-0">{sub}</p>}
        </div>
      )}
      <div className={`w-full px-[24px] tab:px-[72px] ${mc ? 'ld-mcar-viewport' : ''}`}>
        <div ref={mc ? car.trackRef : undefined} className={`relative grid w-full grid-cols-1 ${cfg.grid} ${mc ? 'ld-mcar-track' : ''}`}>
          {cards.map((c) => (
            <a key={c.title} className="relative flex flex-col bg-white no-underline" style={{ minHeight: cfg.minH }}>
              {layout === '3x2-images' && c.image && (
                <img src={c.image} alt={c.imageAlt ?? ''} className={`block h-[228px] w-full object-cover ${mc ? 'ld-mcar-img' : ''}`} />
              )}
              <div className="relative flex flex-col gap-[10px] p-[28px]">
                <h3 className="ld-card-title-24 m-0">{c.title}</h3>
                {c.body && <p className={`ld-card-body-16 m-0 ${cfg.bodyFull ? '' : 'max-w-[309px]'}`}>{c.body}</p>}
                {layout === '3x2-images' && <Lines sides="t" />}
              </div>
              <Lines sides={cfg.card} dashed={cfg.dashed} className={deskOnly} />
              {mc && <Lines sides="trbl" className="tab:hidden" />}
            </a>
          ))}
          {cfg.outer && <Lines sides="trbl" dashed className={deskOnly} />}
        </div>
      </div>
      {mc && <CarouselDots count={cards.length} active={car.active} onGo={car.go} />}
    </section>
  )
}
