import { useEffect } from 'react'
import { PageFrame, Lines, Faq, FAQ_LEADS, CtaBand } from '../components/shared/index.js'
import PlanCard from '../components/pages/pricing/PlanCard.jsx'
import CompareTable from '../components/pages/pricing/CompareTable.jsx'
import { PLANS, PRICING_LOGOS, TABLES, PRICING_FAQ, PRICING_ASSETS } from './data/pricing.jsx'

// /pricing — specs/company-pages.md §2 (Template A). Shared: FAQ (SHARED §7.8), CTA band (SHARED §9).
export default function Pricing() {
  useEffect(() => {
    document.title = 'Lightdash Pricing & Plans'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* 1 · Hero: 209 tall (180 below 1100), text pinned to the bottom, dashed bottom line.
          Phone: the 56px text wraps inside a 282px box and overflows upward behind the nav (live bug,
          reproduced; spec quotes padding 0/130/0/24 but the reference shows 2 words per line = 282 wide). */}
      <section className="relative flex h-[180px] w-full shrink-0 flex-col justify-end pb-[3px] pl-[24px] pr-[52px] tab:pl-[32px] tab:pr-[200px] desk:h-[209px] desk:px-[64px]">
        <div className="font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[56px] font-semibold leading-[50.4px] tracking-[-1.12px] text-black">
          <p className="m-0">
            <strong className="font-semibold">Stop paying per seat </strong>
          </p>
          <p className="m-0">
            <strong className="font-semibold">to look at your own data.</strong>
          </p>
        </div>
        {/* hero Image: opacity 0 at every breakpoint on live */}
        <img
          src={PRICING_ASSETS.heroImage}
          alt=""
          width={223}
          height={209}
          className="pointer-events-none absolute right-0 top-0 hidden h-[209px] w-[223px] object-cover opacity-0 desk:block"
        />
        <Lines sides="b" dashed />
      </section>

      {/* 2 · Spacer 88 */}
      <div className="h-[40px] w-full shrink-0 tab:h-[88px]" aria-hidden="true" />

      {/* 3 · Pricings: bg #F6F8FA, padding 24/64 (24/16 below 1100), grid 3 × 376 gap 12 */}
      <section className="w-full bg-ld-well px-[16px] py-[24px] desk:px-[64px]">
        <div className="mx-auto grid grid-cols-1 gap-[12px] tab:grid-cols-[repeat(2,367px)] tab:justify-center desk:grid-cols-[repeat(3,376px)] desk:justify-between">
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
        </div>
      </section>

      {/* 4 · Logo grid: border 0 1 1 1, padding 24/0/60, 6 × 213.33 (6 at 810, 2 at 390), rows 64 */}
      <section className="relative grid w-full grid-cols-2 pb-[60px] pt-[24px] tab:grid-cols-6">
        {PRICING_LOGOS.map((l) => (
          <div key={l.alt} className="relative flex h-[64px] min-w-0 items-center justify-center" aria-label={l.alt} role="img">
            {l.parts ? (
              <span className="flex flex-row items-center gap-[8px]">
                {l.parts.map((p, i) => (
                  <img key={i} src={p.src} alt="" width={p.w} height={p.h} className="block" style={{ width: p.w, height: p.h }} />
                ))}
              </span>
            ) : (
              <img src={l.src} alt="" width={l.w} height={l.h} className="block" style={{ width: l.w, height: l.h }} />
            )}
          </div>
        ))}
        <Lines sides="rbl" />
      </section>

      {/* 5 · "Compare our plans": padding 104/64/3, dashed bottom */}
      <section className="relative w-full px-[16px] pb-[3px] pt-[104px] tab:px-[64px]">
        <h2 className="m-0 font-britti text-[48px] font-medium leading-[43.2px] tracking-[-0.48px] text-ld-ink">Compare our plans</h2>
        <Lines sides="b" dashed />
      </section>

      {/* 6 · TablesWrapper: padding-top 40, four tables; phone scrolls horizontally */}
      <section className="w-full overflow-x-auto pt-[40px] tab:overflow-visible">
        {TABLES.map((t, i) => (
          <CompareTable key={t.title} table={t} last={i === TABLES.length - 1} />
        ))}
      </section>

      {/* 7 · FAQ (§1.5 / SHARED §7.8), bottom border solid */}
      <div className="relative w-full">
        <Faq items={PRICING_FAQ} lead={FAQ_LEADS.long} />
        <Lines sides="b" />
      </div>

      {/* 8 · CTA */}
      <CtaBand />
    </PageFrame>
  )
}
