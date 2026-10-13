import { useEffect } from 'react'
import { PageFrame, Lines, Button, CtaBand } from '../components/shared/index.js'
import { COLUMNS, ITEMS, ROADMAP_ASSETS as RA, ROADMAP_TILES } from './data/roadmap.js'

// /roadmap — specs/company-pages.md §8 (Template A).
const SEMI = "font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] font-semibold"

// §8.1 item ("Variant 1"): 320 wide, #FFF, padding 20/20/16, gap 13, dashed bottom. Linked items: full-cover
// <a> (_blank) + 8×8 purple ↗ at the top-right; hover bg #FFFFFF → #F8F5FF.
function Item({ it }) {
  const linked = !!it.href
  return (
    <div className={`group relative flex w-full shrink-0 flex-row items-start gap-[13px] bg-white pb-[16px] pl-[20px] pr-[20px] pt-[20px] ${linked ? 'transition-colors duration-200 hover:bg-[#F8F5FF]' : ''}`}>
      <span className="w-[22px] shrink-0 font-inter text-[20px] leading-[24px] text-ld-ink-700" aria-hidden="true">
        {it.emoji}
      </span>
      <div className="flex min-w-0 flex-col gap-[2.4px] pr-[16px]">
        <p className="m-0 max-w-[235px] font-inter text-[15px] font-medium leading-[21px] text-ld-ink-700 max-tab:max-w-none">{it.title}</p>
        {it.date && <p className="m-0 font-inter text-[13px] leading-[15.6px] text-ld-muted">{it.date}</p>}
      </div>
      {linked && (
        <>
          <img src={RA.arrow} alt="" width={8} height={8} className="pointer-events-none absolute right-[22px] top-[24px] block h-[8px] w-[8px]" />
          <a href={it.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-[2]" aria-label={`${it.title} (opens in a new tab)`} />
        </>
      )}
      <Lines sides="b" dashed />
    </div>
  )
}

function Column({ col }) {
  const items = ITEMS[col.key]
  const body =
    col.overflow === 'scroll' ? (
      // Completed: independently scrolling 526-tall list on a transparent bg (native scrollbar kept)
      <div className="h-[526px] overflow-y-auto overscroll-contain">
        {items.map((it) => (
          <Item key={it.title + (it.date ?? '')} it={it} />
        ))}
      </div>
    ) : (
      <div className={`flex h-[528px] flex-col bg-ld-surface ${col.overflow === 'auto' ? 'overflow-auto' : 'overflow-clip'}`}>
        {items.map((it) => (
          <Item key={it.title} it={it} />
        ))}
      </div>
    )
  return (
    <div className="relative flex min-w-0 flex-col">
      {/* header 82: padding 20, solid bottom */}
      <div className="relative flex h-[82px] flex-row items-start gap-[10px] p-[20px]">
        <img src={col.icon} alt="" width={24} height={24} className="mt-[-1px] block h-[24px] w-[24px] shrink-0" />
        <div className="flex flex-col gap-[4px]">
          <p className="m-0 font-britti text-[18px] font-medium leading-[21.6px] text-ld-ink-700">{col.title}</p>
          <p className="m-0 font-inter text-[14px] leading-[16.8px] text-ld-body">{col.sub}</p>
        </div>
        <Lines sides="b" />
      </div>
      {body}
      <Lines sides="rb" />
    </div>
  )
}

function FooterCard({ icon, title, body, button }) {
  return (
    <div className="relative flex flex-col items-center gap-[24px] px-[24px] py-[41px] text-center">
      <div className="relative h-[48px] w-[48px] overflow-hidden bg-white shadow-[0_0_0_5px_rgba(39,40,53,0.05)]">
        <img src={icon} alt="" width={48} height={48} className="block h-[48px] w-[48px] object-cover" />
        <Lines sides="trbl" color="border-[#DFE1E7]" />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <p className="m-0 font-britti text-[18px] font-medium leading-[18px] tracking-[-0.36px] text-ld-ink">{title}</p>
        <p className="m-0 max-w-[309px] font-inter text-[16px] leading-[24px] tracking-[-0.32px] text-ld-muted">{body}</p>
      </div>
      {button}
    </div>
  )
}

export default function Roadmap() {
  useEffect(() => {
    document.title = 'Lightdash Roadmap'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* pixel strips (16px), hidden on phone (reference roadmap-390.png) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[2] hidden tab:block">
        {ROADMAP_TILES.map((t, i) => {
          const right = t.x >= 640
          return (
            <img
              key={i}
              src={t.src}
              alt=""
              width={16}
              height={16}
              data-roadmap-pixel=""
              className="absolute block h-[16px] w-[16px] object-cover"
              style={{ top: t.y, ...(right ? { right: 1280 - t.x - 16 } : { left: t.x }) }}
            />
          )
        })}
      </div>

      {/* 1 · Spacer 100 */}
      <div className="h-[56px] w-full tab:h-[100px]" aria-hidden="true" />
      {/* 2 · Title (top dashed) 50 */}
      <div className="relative w-full">
        <h1 className={`${SEMI} m-0 text-left text-[42px] leading-[44px] tracking-[-0.27px] text-ld-ink tab:text-center tab:text-[56px] tab:leading-[50.4px]`}>
          Lightdash Public Roadmap
        </h1>
        <Lines sides="t" dashed />
      </div>
      {/* 3 · Subtitle: dashed top/bottom, padding 16/0 */}
      <div className="relative flex w-full justify-start py-[16px] tab:justify-center">
        <p className="m-0 max-w-[468px] font-inter text-[16px] leading-[28px] text-ld-body tab:text-center tab:text-[18px] tab:leading-[31.86px] tab:tracking-[-0.27px]">
          We ship fast, like really fast. Here's what we're working on at and what we've already shipped!
        </p>
        <Lines sides="tb" dashed />
      </div>
      {/* 4 · Spacer 72, solid bottom */}
      <div className="relative h-[20px] w-full tab:h-[72px]">
        <Lines sides="b" />
      </div>

      {/* 5 · Board: 4 × 320 (2 × 389 at 810; 1 column on phone) */}
      <section className="grid w-full grid-cols-1 tab:grid-cols-2 desk:grid-cols-4">
        {COLUMNS.map((c) => (
          <Column key={c.key} col={c} />
        ))}
      </section>

      {/* 6 · FooterGrid: 2 × 640 cards, solid divider */}
      <section className="relative grid w-full grid-cols-1 tab:grid-cols-2">
        <div className="relative">
          <FooterCard
            icon={RA.bolt}
            title="Request a feature"
            body="Let's build Lightdash. Have an idea for something we should build, let us know"
            button={
              <Button variant="third" href="https://github.com/lightdash/lightdash/issues/new?template=feature-request.md">
                Request
              </Button>
            }
          />
          <Lines sides="b" className="tab:hidden" />
          <Lines sides="r" className="hidden tab:block" />
        </div>
        <FooterCard
          icon={RA.slack}
          title="Join our community"
          body="Want to contribute to Lightdash or learn more - join our Slack community"
          button={
            <Button variant="fourth" href="https://go.lightdash.com/community">
              Join now
            </Button>
          }
        />
      </section>

      {/* 7 · CTA */}
      <CtaBand lines="trl" />
    </PageFrame>
  )
}
