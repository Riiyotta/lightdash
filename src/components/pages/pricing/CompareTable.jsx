import { useState } from 'react'
import { Lines } from '../../shared/index.js'
import { PRICING_ASSETS } from '../../../pages/data/pricing.jsx'

// specs/company-pages.md §2.4 "Compare our plans" table (page-local: the shared ComparisonTable is the
// 4×320 "Maintenance Comparison" layout and can't express this one).
// Table: bg #F6F8FA, padding 20/80/0 (last 20/80/64); inner 1120. Header 60 tall white, dashed all sides.
// Rows ≥44 tall, white, dashed 0 1 1 1. Label col 446.2 (39.84%), 3 value cols 224.6.
// 390: the wrapper scrolls horizontally; inner 768 = 249 + 3 × 173.

const COLS = 'grid-cols-[249px_repeat(3,173px)] tab:grid-cols-[39.84%_repeat(3,minmax(0,1fr))]'
const COLUMN_TITLES = ['Open Source', 'Cloud Pro', 'Enterprise']

// Tooltip label: dotted #8378FF underline (offset 5). Hover → 220-wide box to the right (label right + 10),
// vertically centred, opacity 0 → 1 in ~200 ms.
function TipLabel({ label, tip }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <span className="underline decoration-[#8378FF] decoration-dotted underline-offset-[5px]">{label}</span>
      <span
        role="tooltip"
        aria-hidden={!open}
        className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-30 w-[220px] -translate-y-1/2 whitespace-pre-line rounded-[10px] bg-[rgba(39,40,53,0.8)] px-[16px] py-[12px] font-inter text-[12px] font-normal leading-[20px] tracking-normal text-[#F8FAFB] shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-opacity duration-200 ease-out"
        style={{ opacity: open ? 1 : 0 }}
      >
        {tip}
      </span>
    </span>
  )
}

function Value({ v, list }) {
  if (v === true) return <img src={PRICING_ASSETS.check} alt="Yes" width={19} height={18} className="block h-[18px] w-[19px]" />
  if (v === false)
    return <img src={PRICING_ASSETS.cross} alt="No" width={19} height={18} className="block h-[18px] w-[19px] rounded-[10px] opacity-[0.33]" />
  if (v && v.embedPro) {
    return (
      <div className="flex flex-col font-inter text-[14px] font-medium leading-[18px] text-[#818898]">
        <p className="m-0">
          <strong className="font-bold text-[#36394A]">Pay as you go</strong> (first 1000 free then $0.05/load)
        </p>
        <p className="m-0 text-[#36394A]">or</p>
        <p className="m-0">
          <strong className="font-bold text-[#36394A]">Predictable</strong> ($790/month for 100k loads per Embed Worker)
        </p>
      </div>
    )
  }
  if (list) return <p className="m-0 font-inter text-[12px] font-normal leading-[17px] tracking-[-0.28px] text-[#36394A]">{v}</p>
  return <p className="m-0 whitespace-pre-line font-inter text-[14px] font-medium leading-[15px] tracking-[-0.28px] text-[#36394A]">{v}</p>
}

export default function CompareTable({ table, last = false }) {
  return (
    <div className={`w-[768px] bg-ld-well tab:w-auto tab:pt-[20px] tab:px-[20px] desk:px-[80px] ${last ? 'pb-0 tab:pb-[64px]' : ''}`}>
      <div className="w-full">
        {/* header row */}
        <div className={`relative grid h-[60px] bg-white ${COLS}`}>
          <div className="relative flex items-center gap-[10px] px-[16px]">
            <img src={table.icon} alt="" width={22} height={22} className="block h-[22px] w-[22px] shrink-0 object-cover" />
            <span className="font-britti text-[20px] font-medium leading-[20px] tracking-[-0.4px] text-ld-ink">{table.title}</span>
          </div>
          {COLUMN_TITLES.map((t) => (
            <div key={t} className="relative flex items-center justify-center px-[8px] text-center">
              <span className="font-britti text-[16px] font-medium leading-[15px] tracking-[-0.4px] text-ld-ink">{t}</span>
              <Lines sides="l" dashed />
            </div>
          ))}
          <Lines sides="trbl" dashed />
        </div>

        {/* rows */}
        {table.rows.map((row) => (
          <div key={row.label} className={`relative grid min-h-[44px] bg-white ${COLS}`}>
            <div className="relative flex items-center px-[16px] py-[8px] font-inter text-[15px] font-medium leading-[20px] tracking-[-0.28px] text-ld-body">
              {row.tip ? <TipLabel label={row.label} tip={row.tip} /> : <span>{row.label}</span>}
            </div>
            {row.values.map((v, i) =>
              v && v.ssoPro ? (
                // ‡ live inconsistency: unstyled cell (Inter 16/19.2 w400 #000, left aligned)
                <div key={i} className="relative flex items-center px-[16px] py-[12px] font-inter text-[16px] font-normal leading-[19.2px] text-black">
                  Google
                  <Lines sides="l" dashed />
                </div>
              ) : (
                // value cells: padding 12/16 (multi-line rows measure 54/58/75); the Embedding Pro cell is 124 = 108 + 2×8
                <div key={i} className={`relative flex items-center justify-center px-[16px] text-center ${v && v.embedPro ? 'py-[8px]' : 'py-[12px]'}`}>
                  <Value v={v} list={row.list} />
                  <Lines sides="l" dashed />
                </div>
              ),
            )}
            <Lines sides="rbl" dashed />
          </div>
        ))}
      </div>
    </div>
  )
}
