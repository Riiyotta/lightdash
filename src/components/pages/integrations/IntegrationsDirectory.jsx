import { useState } from 'react'
import { Lines } from '../../shared/index.js'

// specs/product-pages.md §2.9 "All" section: sticky TOC (284 wide, padding 32/0/32/64, gap 24) + grid
// (996 wide, dashed left line, padding-right 63, 3 × 311 columns; cards 240 tall, padding 20, gap 24,
// dashed right/bottom). Clicking a category filters the grid (counts: All 21, Warehouse 10, Version
// Control 4, Alerts & sharing 3, Transformation 1, Data observability 2, Marketplace 1). Cards aren't links.
// GAP: the 12px category icons in the TOC are not in the asset set, so they are omitted.
// Phone: the TOC becomes a horizontally scrolling row of categories above a single-column grid.

function Tag({ category, color }) {
  return (
    <span className="relative inline-flex h-[19.5px] shrink-0 items-center px-[8px] font-inter text-[13px] leading-[19.5px]" style={{ color }}>
      <span aria-hidden="true" className="absolute inset-0" style={{ background: color, opacity: 0.15 }} />
      <span className="relative">{category}</span>
    </span>
  )
}

export default function IntegrationsDirectory({ categories, items }) {
  const [active, setActive] = useState('all')
  const colorOf = Object.fromEntries(categories.map((c) => [c.id, c.color]))
  const shown = active === 'all' ? items : items.filter((it) => it.category === active)

  return (
    <section className="relative flex w-full flex-col bg-white tab:flex-row tab:items-start">
      {/* TOC */}
      <nav
        aria-label="Table of contents"
        className="relative w-full shrink-0 overflow-x-auto px-[16px] py-[16px] tab:sticky tab:top-[106px] tab:flex tab:w-[284px] tab:flex-col tab:gap-[24px] tab:overflow-visible tab:py-[32px] tab:pl-[64px] tab:pr-0"
      >
        <p className="m-0 hidden font-britti text-[18px] leading-[18px] tracking-[-0.36px] text-ld-ink tab:block">Table of contents</p>
        <ul className="relative m-0 flex list-none flex-row gap-[18px] p-0 tab:flex-col tab:pl-[16px]">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-px bg-ld-line tab:block" />
          {categories.map((c) => {
            const on = c.id === active
            return (
              <li key={c.id} className="relative shrink-0">
                {on && <span aria-hidden="true" className="absolute -left-[16px] top-[-3px] hidden h-[20px] w-px bg-ld-ink tab:block" />}
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.id)}
                  className={`cursor-pointer whitespace-nowrap border-0 bg-transparent p-0 font-inter text-[14px] font-medium leading-[14px] tracking-[-0.36px] ${
                    on ? 'text-ld-ink' : 'text-ld-muted'
                  }`}
                >
                  {c.label}
                </button>
              </li>
            )
          })}
        </ul>
        <Lines sides="tb" dashed className="tab:hidden" />
      </nav>

      {/* Grid */}
      <div className="relative w-full min-w-0 tab:flex-1 tab:pr-[63px]">
        <Lines sides="l" dashed className="hidden tab:block" />
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-3 tab:grid-cols-2">
          {shown.map((it) => (
            <div key={it.name} className="relative flex min-h-[240px] flex-col gap-[24px] p-[20px]">
              <div className="flex flex-row items-start justify-between gap-[8px]">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center p-[9px] shadow-[inset_0_0_0_1px_#DFE1E7,rgba(39,40,53,.05)_0_0_0_5px]">
                  <img src={it.logo} alt="" width={30} height={30} className="block h-[30px] w-[30px] object-contain" />
                </span>
                <Tag category={it.category} color={colorOf[it.category]} />
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="m-0 font-britti text-[20px] font-normal leading-[20px] tracking-[0.24px] text-ld-ink-700">{it.name}</h3>
                <p className="m-0 max-w-[271px] font-inter text-[16px] leading-[24px] tracking-[-0.32px] text-ld-body">{it.body}</p>
              </div>
              <Lines sides="rb" dashed />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
