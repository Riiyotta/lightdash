import { useEffect } from 'react'
import { PageFrame, Lines, Button, CtaBand } from '../components/shared/index.js'
import Stickers from '../components/pages/about/Stickers.jsx'
import Timeline from '../components/pages/about/Timeline.jsx'
import { ABOUT_A as A, STICKERS, STICKERS_PHONE, TEAM, TIMELINE } from './data/about.jsx'

// /about — specs/company-pages.md §7 (Template A; desktop ≥1000, tablet 810–999).
const SEMI = "font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] font-semibold"

// §7.2 team item: 72.5×72 static avatar → hover avatar (Framer variant, spring 0.4s ≈ 0.4s cross-fade)
function TeamMember({ m }) {
  return (
    <div className="group flex flex-col items-center pb-[8px] pt-[9px] text-center">
      <div className="relative h-[72px] w-[72.5px]">
        <img
          src={`${A}/team/${m.slug}-static.png`}
          alt={m.name}
          width={73}
          height={72}
          className="absolute inset-0 block h-full w-full object-cover transition-opacity duration-[400ms] ease-[cubic-bezier(.34,1.2,.64,1)] group-hover:opacity-0"
        />
        <img
          src={`${A}/team/${m.slug}-hover.png`}
          alt=""
          width={73}
          height={72}
          className="absolute inset-0 block h-full w-full object-cover opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(.34,1.2,.64,1)] group-hover:opacity-100"
        />
      </div>
      <p className="m-0 mt-[11px] font-inter text-[14px] font-medium leading-[21px] text-ld-ink">{m.name}</p>
      <p className="m-0 mt-[4px] whitespace-nowrap font-inter text-[12px] font-medium leading-[12px] tracking-[-0.3px] text-ld-body">{m.role}</p>
    </div>
  )
}

export default function About() {
  useEffect(() => {
    document.title = 'About Us | Lightdash'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* 1 · Hero: spacer 100 + 206-tall title block (dashed top/bottom), draggable sticker layer on top */}
      <section className="relative w-full">
        <Stickers stickers={STICKERS} className="hidden tab:block" />
        <Stickers stickers={STICKERS_PHONE} className="top-[35px] tab:hidden" />
        <div className="h-[56px] w-full tab:h-[100px]" />
        <div className="relative flex flex-col items-center px-[24px] tab:px-0">
          <h1 className={`${SEMI} m-0 max-w-[527px] text-center text-[42px] leading-[44px] tracking-[-0.27px] text-ld-ink tab:text-[56px] tab:leading-[50.4px]`}>
            Building the BI tool we always wanted
          </h1>
          <p className="m-0 mt-[12px] max-w-[663px] text-center font-inter text-[16px] leading-[28px] tracking-[-0.27px] text-ld-body tab:mt-[10px] tab:text-[18px] tab:leading-[31.86px]">
            We're building a BI tool that's configurable for the SQL experts &amp; intuitive for the rest, so everyone can feel empowered, rather than overwhelmed.
            We're a diverse, nimble bunch with big plans - and we're just getting started!
          </p>
          <Lines sides="tb" dashed />
        </div>
      </section>

      {/* 2 · Spacer 56 */}
      <div className="h-[56px] w-full" aria-hidden="true" />

      {/* 3 · "Meet the Lightdashians" (44 tall, dashed top/bottom) */}
      <div className="relative flex h-[44px] w-full items-center justify-center">
        <p className="m-0 font-britti text-[20px] font-medium leading-[20px] tracking-[-0.3px]">
          <span className="text-ld-body">Meet the </span>
          <span className="text-ld-ink">Lightdash</span>
          <span className="text-ld-muted">ians</span>
        </p>
        <Lines sides="tb" dashed />
      </div>

      {/* 4 · Team grid: 5 × 173 (max 865, centred), row gap 48; phone 2 × 163 */}
      <section className="w-full pb-[116px] pt-[32px]">
        <div className="mx-auto grid w-full max-w-[326px] grid-cols-2 gap-y-[48px] tab:max-w-[865px] tab:grid-cols-5">
          {TEAM.map((m) => (
            <TeamMember key={m.slug} m={m} />
          ))}
        </div>
      </section>

      {/* 5 · Story */}
      <section className="w-full">
        <div className="relative flex h-[56px] w-full items-center justify-center">
          <h2 className={`${SEMI} m-0 text-center text-[48px] leading-[43.2px] tracking-[-0.96px] text-black max-tab:text-[32px]`}>Our story so far</h2>
          <Lines sides="tb" dashed />
        </div>
        <div className="relative flex h-[53px] w-full justify-center">
          <img src={`${A}/image-tSOCKXwBErpovdEAN3dG7BJpZyw.png`} alt="" width={53} height={52.5} className="relative z-[2] block h-[52.5px] w-[53px]" />
          <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 hidden h-full w-1/2 border-0 border-r border-dashed border-ld-line tab:block" />
          <Lines sides="b" dashed />
        </div>
        <Timeline data={TIMELINE} />
      </section>

      {/* 6 · "Join us - we are hiring!" */}
      <section className="w-full">
        <div className="relative flex flex-col items-center gap-[8px] px-[24px] pb-[12px] pt-[64px] text-center">
          <Lines sides="t" dashed />
          <h2 className={`${SEMI} m-0 text-[32px] leading-[35.2px] tracking-[-0.96px] text-black tab:text-[48px] tab:leading-[43.2px]`}>Join us - we are hiring!</h2>
          <p className="ld-lead-18 m-0">Good data tools are rare. Good data teams are rarer. We're building both.</p>
          <Lines sides="b" dashed />
        </div>
        <div className="flex justify-center py-[11px]">
          <Button variant="v1-purple" href="https://jobs.ashbyhq.com/lightdash">
            See open roles
          </Button>
        </div>
      </section>

      {/* 7 · CTA */}
      <CtaBand lines="trl" />
    </PageFrame>
  )
}
