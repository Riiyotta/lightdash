import { Button, HERO_BUTTONS, Lines } from '../../shared/index.js'
import Block from './Block.jsx'
import Tile from './Tile.jsx'

// specs/product-pages.md §2.7 Hero: 1280×604, 1px solid #E5E7EB all sides, padding 20, content centred.
// H1 display-72 #0D0D12 (w608), subtitle lead-18 w554, standard button pair. Dashed inner column guides
// 48px in from each side (reference/pages/bi-as-code-1440.png). Pixel tiles: 24px grid top-left,
// 27px grid bottom-right.
// MOTION (Animation agent): hero fade-in; [data-hero] hook as on SectionHero.
export default function BiHero({ title, subtitle, tilesTopLeft, tilesBottomRight }) {
  return (
    <Block lines="trbl" className="flex flex-col items-center justify-center bg-white p-[20px] py-[96px] tab:min-h-[604px] tab:py-[20px]" as="section">
      <div data-hero="" className="flex flex-col items-center">
        <h1 className="ld-display-72 m-0 max-w-[608px] text-center text-ld-ink-strong">{title}</h1>
        <div className="mt-px flex w-full justify-center py-[24px]">
          <p className="ld-lead-18 m-0 max-w-[554px] text-center">{subtitle}</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-[16px] pb-px pl-[4px]">
          {HERO_BUTTONS.map((b) => (
            <Button key={b.label} variant={b.variant} href={b.href}>
              {b.label}
            </Button>
          ))}
        </div>
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[48px] hidden border-l border-dashed border-ld-line tab:block" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[48px] hidden border-r border-dashed border-ld-line tab:block" />
      {tilesTopLeft.map((t, i) => (
        <Tile key={`tl${i}`} {...t} />
      ))}
      {tilesBottomRight.map((t, i) => (
        <Tile key={`br${i}`} size={27} {...t} />
      ))}
    </Block>
  )
}
