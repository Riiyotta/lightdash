import { useState } from 'react'
import { Lines } from './Frame.jsx'

// SHARED §7.3 accordion tabs + image split row.
// Row 1280 (×609 at 1440), solid hairlines "0 1 1 1". Content column 672 (padding-left 64, inner 608 with
// a dashed left line) + image well 608 (#F7F8FA, solid left line, img cover).
// Behaviour: click a closed tab → it opens (spring ~170 ms), the open one closes, the image swaps
// instantly, and the 1px #5E4CFF progress line restarts (scaleY 0 → 1, 8.8 s linear). No auto-advance.

/**
 * @param heading    node (h3-32, w564)
 * @param lead       node (lead-18)
 * @param pill       optional Subtitle Pill text (self-improving-analytics)
 * @param tabs       [{ title, body, image?, imageAlt? }] — 3 or 4; image may be omitted (blank well)
 * @param imageSide  'right' (row 1, default) | 'left' (row 2)
 * @param spacer     render the 40px "3-Tab Spacer" under the header (default true; embedding: false)
 * @param minHeight  row min-height at ≥810 (609 measured; taller rows with a pill grow with content)
 * @param headingClassName extra classes on the h3 (context-layer phone rows: #272835)
 */
export default function AccordionTabs({
  heading,
  lead,
  pill,
  tabs = [],
  imageSide = 'right',
  spacer = true,
  minHeight = 609,
  defaultIndex = 0,
  headingClassName = '',
  className = '',
}) {
  const [active, setActive] = useState(defaultIndex)
  const [run, setRun] = useState(0) // re-keys the progress line so it restarts
  const open = (i) => {
    if (i === active) return
    setActive(i)
    setRun((r) => r + 1)
  }
  const current = tabs[active]

  const content = (
    <div className="relative flex w-full flex-col tab:min-h-[var(--row-min)] tab:w-[52.5%] tab:shrink-0 tab:pl-[64px]" style={{ '--row-min': `${minHeight}px` }}>
      <div className="relative flex h-full w-full flex-col">
        <Lines sides="l" dashed className="hidden tab:block" />
        {/* header: padding 64 20 24 24, dashed all sides, gap 16 */}
        <div className="relative flex flex-col gap-[16px] pb-[24px] pl-[24px] pr-[20px] pt-[64px]">
          {pill && (
            <span className="self-start rounded-[6px] bg-brand-purple px-[14px] py-[6px] font-inter text-[13px] font-medium leading-[16px] tracking-[-0.26px] text-white shadow-[inset_0_0_0_1px_#5E5B5B]">
              {pill}
            </span>
          )}
          {/* phone (<810, live on every accordion page): heading 18/26 ls -0.18, lead Inter 16/24 ls -0.16 */}
          <h3 className={`ld-h3-32 m-0 max-w-[564px] max-[809.98px]:text-[18px] max-[809.98px]:leading-[26px] max-[809.98px]:tracking-[-0.18px] ${headingClassName}`}>{heading}</h3>
          {lead && <p className="ld-lead-18 m-0 max-[809.98px]:text-[16px] max-[809.98px]:leading-[24px] max-[809.98px]:tracking-[-0.16px]">{lead}</p>}
          <Lines sides="trbl" dashed />
        </div>
        {spacer && (
          <div className="relative h-[40px] w-full shrink-0">
            <Lines sides="trbl" dashed />
          </div>
        )}
        {/* tab items */}
        <div className="flex flex-col">
          {tabs.map((t, i) => {
            const isOpen = i === active
            return (
              <div key={t.title} className="relative">
                <Lines sides="t" />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => open(i)}
                  className="relative flex w-full cursor-pointer flex-col border-0 bg-white px-[24px] py-[20px] text-left"
                >
                  <Lines sides="l" dashed />
                  <span className="ld-tab-title-18 block">{t.title}</span>
                  <span className="ld-acc w-full" data-open={isOpen}>
                    <span>
                      <span className="ld-tab-body-18 block max-w-[560px] pt-[8px]">{t.body}</span>
                    </span>
                  </span>
                  {/* progress: 1px clip at the column's left edge, full height of the open tab */}
                  {isOpen && (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-px overflow-hidden">
                      <span key={run} className="ld-tab-progress absolute inset-0 block bg-brand-purple" />
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
        {tabs.length > 0 && (
          <div className="relative">
            <Lines sides="t" />
          </div>
        )}
      </div>
    </div>
  )

  const image = (
    <div className="relative aspect-[608/609] w-full overflow-hidden bg-ld-well-tab tab:aspect-auto tab:w-[47.5%] tab:shrink-0">
      {current?.image && (
        <img src={current.image} alt={current.imageAlt ?? ''} className="absolute inset-0 h-full w-full object-cover" />
      )}
      <Lines sides={imageSide === 'right' ? 'l' : 'r'} className="hidden tab:block" />
    </div>
  )

  // DOM order is always content → image (phone stacks header → tabs → image); row 2 flips at ≥810.
  return (
    <section className={`relative w-full bg-white ${className}`}>
      <div className={`flex w-full flex-col ${imageSide === 'left' ? 'tab:flex-row-reverse' : 'tab:flex-row'}`}>
        {content}
        {image}
      </div>
      <Lines sides="rbl" />
    </section>
  )
}
