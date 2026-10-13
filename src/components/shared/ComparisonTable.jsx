import { Lines } from './Frame.jsx'

// SHARED §7.7 "Maintenance Comparison". 4 columns × 320 at 1440; column 2 (Lightdash) highlighted.
const DECOR = '/assets/shared/DJ9t63CK7AvK96kcCGb3lB6I4Ac.png' // 96×48 pixel decoration (first header cell)

const HEAD_LABEL = 'font-inter text-[18px] font-medium leading-[26px] tracking-[-0.27px]'
const COL1 = 'font-inter text-[18px] font-medium leading-[26px] text-ld-ink'
const COL2 = 'font-inter text-[18px] font-medium leading-[26px] text-ld-ink-strong'
const COL34 = 'font-inter text-[18px] font-normal leading-[23.4px] tracking-[-0.36px] text-ld-dark'
const LAST_ROW_FADE = 'linear-gradient(180deg, rgba(130,116,255,.1), rgba(130,116,255,0))'

/**
 * @param heading     node (h2-48 centred, w720, #272835; accent span text-brand-purple)
 * @param columns     4 header labels; the first is usually '' (holds the pixel decoration)
 * @param rows        [[c1, c2, c3, c4], …] — strings or nodes (cells are flex rows with gap 6)
 * @param headingBlock  true → heading in its own 250-tall block (padding 53/64) instead of the gap-64 stack
 * @param decoration  first header cell image (default shared 96×48)
 */
export default function ComparisonTable({ heading, columns = ['', 'Lightdash', '', ''], rows = [], headingBlock = false, decoration = DECOR, className = '' }) {
  const cell = (i) => (i === 0 ? COL1 : i === 1 ? COL2 : COL34)
  return (
    <section className={`relative flex w-full flex-col bg-white ${headingBlock ? '' : 'gap-[64px] py-[51px]'} ${className}`}>
      <Lines sides="rl" dashed />
      {heading && (
        <div className={`flex w-full justify-center px-[24px] ${headingBlock ? 'min-h-[250px] items-center tab:px-[64px] tab:py-[53px]' : ''}`}>
          <h2 className="ld-h2-48 m-0 max-w-[720px] text-center text-ld-ink">{heading}</h2>
        </div>
      )}

      {/* ≥810: 4-column table */}
      <div role="table" className="relative hidden w-full tab:block">
        <Lines sides="tb" dashed />
        <div role="row" className="grid min-h-[58px] grid-cols-4">
          {columns.map((label, i) => (
            <div
              key={i}
              role="columnheader"
              className={`relative flex items-center px-[24px] py-[16px] ${i === 1 ? 'bg-ld-purple-10' : 'bg-ld-surface'}`}
            >
              {i === 0 && decoration ? (
                <img src={decoration} alt="" width={96} height={48} className="block h-[48px] w-[96px] object-cover" />
              ) : (
                <span className={`${HEAD_LABEL} ${i === 1 ? 'text-ld-ink-strong' : 'text-ld-ink'}`}>{label}</span>
              )}
              {i > 0 && <Lines sides="l" dashed />}
            </div>
          ))}
        </div>
        {rows.map((r, ri) => (
          <div role="row" key={ri} className="relative grid grid-cols-4">
            <Lines sides="t" dashed />
            {r.map((c, i) => (
              <div
                key={i}
                role="cell"
                className={`relative flex flex-row items-start gap-[6px] p-[24px] ${cell(i)} ${i === 1 && ri < rows.length - 1 ? 'bg-ld-purple-10' : ''}`}
                style={i === 1 && ri === rows.length - 1 ? { background: LAST_ROW_FADE } : undefined}
              >
                {c}
                {i > 0 && <Lines sides="l" dashed />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* <810: stacked rows (layout not measured, see README gaps) */}
      <div className="relative flex w-full flex-col tab:hidden">
        {rows.map((r, ri) => (
          <div key={ri} className="relative flex flex-col">
            <Lines sides="t" dashed />
            <div className={`bg-ld-surface px-[24px] py-[16px] ${COL1}`}>{r[0]}</div>
            {r.slice(1).map((c, i) => (
              <div
                key={i}
                className={`relative flex flex-col gap-[6px] px-[24px] py-[16px] ${i === 0 ? 'bg-ld-purple-10' : ''}`}
              >
                <Lines sides="t" dashed />
                {columns[i + 1] && <span className={`${HEAD_LABEL} ${i === 0 ? 'text-ld-ink-strong' : 'text-ld-ink'}`}>{columns[i + 1]}</span>}
                <div className={`flex flex-row items-start gap-[6px] ${cell(i + 1)}`}>{c}</div>
              </div>
            ))}
          </div>
        ))}
        <div className="relative">
          <Lines sides="t" dashed />
        </div>
      </div>
    </section>
  )
}
