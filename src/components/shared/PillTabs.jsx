import { useState } from 'react'

// product-pages §3.2 "Tabbed Visual" (data-apps, metrics-catalog). White card, padding 24, gap 32,
// left-aligned. Click swaps active pill, copy and image instantly (colour spring .4/.2). No autoplay.

/**
 * @param heading        data-apps style: centred h2-48 above the tabs (inside the card)
 * @param tabs           [{ label, title?, body, image, imageAlt? }]
 *                       title → metrics style: h3-38 + tabbed-lead-18 under the tabs (gap 10)
 * @param imageAspect    CSS aspect-ratio of the Product Visual, e.g. "1232 / 765" (data-apps), "1132 / 580" (metrics)
 * @param sectionClassName  outer padding, e.g. "px-[24px] py-[64px]" (metrics: padding 64/24)
 * @param maxWidth       card max width (metrics 1180; data-apps full 1280)
 */
export default function PillTabs({ heading, tabs = [], imageAspect = '1232 / 765', sectionClassName = '', maxWidth, className = '' }) {
  const [active, setActive] = useState(0)
  const t = tabs[active] ?? {}
  return (
    <section className={`relative flex w-full justify-center bg-white ${sectionClassName}`}>
      <div className={`flex w-full flex-col items-start gap-[32px] bg-white p-[24px] ${className}`} style={{ maxWidth }}>
        {heading && <h2 className="ld-h2-48 m-0 w-full text-center">{heading}</h2>}
        {/* live "Tabs": full-width single row, nowrap, overflow clip at every width (phone clips the last pill) */}
        <div role="tablist" className="flex w-full flex-row flex-nowrap gap-[8px] overflow-clip">
          {tabs.map((tab, i) => {
            const on = i === active
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`ld-tab-pill-14 ld-btn-spring h-[36.8px] shrink-0 cursor-pointer rounded-[6px] border-0 px-[16px] py-[10px] ${
                  on ? 'bg-brand-purple text-white' : 'bg-white text-ld-ink shadow-[inset_0_0_0_1px_#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        {(t.title || t.body) && (
          <div className="flex w-full flex-col gap-[10px]">
            {t.title && <h3 className="ld-h3-38 m-0">{t.title}</h3>}
            {t.body && <p className="ld-tabbed-lead-18 m-0">{t.body}</p>}
          </div>
        )}
        <div className="w-full overflow-clip rounded-[6px] bg-ld-well" style={{ aspectRatio: imageAspect }}>
          {t.image && <img src={t.image} alt={t.imageAlt ?? ''} className="block h-full w-full rounded-[6px] object-cover" />}
        </div>
      </div>
    </section>
  )
}
