import { Lines, Button, Faq, FAQ_LEADS, CtaBand, REGISTER_URL } from '../components/shared/index.js'
import RoleAccordion from '../components/pages/fintech/RoleAccordion.jsx'
import { FIN_A as A, FIN_LOGOS, REASONS, BENEFITS, STATS, FIN_FAQ } from './data/fintech.jsx'

// /fintech — specs/company-pages.md §5 (Template B "section-boxed" page).
// Main: padding 0 16; each <section> max 1280 with a 1px solid #E5E7EB box (first: all sides, then no top).
// The dark band (#1A1B25) and the graphic border are full-bleed. CTA outer 1408 / stack 1280.

const DARK_LINE = 'border-ld-footer-frame' // #36394A

function Arrow({ color = '#272835' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="block">
      <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Box({ first = false, className = '', children, ...rest }) {
  return (
    <section className={`relative mx-auto w-full max-w-[1280px] bg-white ${className}`} {...rest}>
      {children}
      <Lines sides={first ? 'trbl' : 'rbl'} />
    </section>
  )
}

export default function Fintech() {
  return (
    <div className="w-full bg-white">
      <div className="w-full px-[16px]">
        {/* 1 · Hero: 1280 × 604, flex row gap 24 */}
        <Box first data-hero="" className="flex flex-col overflow-hidden desk:h-[604px] desk:flex-row desk:gap-[24px]">
          {/* decorations */}
          {/* phone: only the top 64px of both clusters show (reference fintech-390.png) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[64px] overflow-hidden tab:h-[416px]">
          <img
            src={`${A}/frame-2147234198-Wt9778OuGJnGtOOmgQJ7FFz3itY.png`}
            alt=""
            width={161}
            height={416}
            data-hero-pixel=""
            className="pointer-events-none absolute left-0 top-0 z-[2] block h-[416px] w-[161px] object-cover"
          />
          <img
            src={`${A}/group-2085662009-6G8yEPoIoue6E7YNcGR3uJXUsg.png`}
            alt=""
            width={225}
            height={129}
            data-hero-pixel=""
            className="pointer-events-none absolute right-[-65px] top-0 z-[2] block h-[129px] w-[225px] object-cover"
          />
          </div>
          {/* Content: 692 wide, padding 48/0/40/46, gap 24, vertically centred. Phone: buttons above the heading. */}
          <div className="relative z-[3] flex w-full flex-col justify-center gap-[24px] px-[24px] pb-[40px] pt-[48px] desk:w-[692px] desk:shrink-0 desk:pl-[46px] desk:pr-0">
            <div className="order-3 flex flex-row flex-wrap gap-[16px] max-tab:order-1">
              <Button variant="third" href="./start">
                Talk to our team
              </Button>
              <Button variant="fourth" href={REGISTER_URL}>
                Start for free
              </Button>
            </div>
            <h1 className="order-1 m-0 max-w-[646px] font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[42px] font-semibold leading-[39.9px] tracking-[-1.44px] text-[#1F1F1F] max-tab:order-2 tab:text-[72px] tab:leading-[68.4px]">
              Stop waiting for dashboards. Start <span className="text-[#A4ACB9]">scaling</span> your fintech.
            </h1>
            <p className="ld-lead-18 order-2 m-0 max-w-[546px] max-tab:order-3 max-tab:text-[16px] max-tab:leading-[24px]">
              The AI-first BI platform built for modern fintech data teams. Powerful enough for analytics engineers, intuitive enough for every business user, and
              secure enough for even the most regulated environments.
            </p>
          </div>
          {/* Illustration 564 × 604 (2× render of the chat widget's final state, incl. the dot-grid bg) */}
          <div className="relative h-[604px] w-full shrink-0 overflow-hidden desk:ml-auto desk:w-[564px]">
            <img
              src={`${A}/bg-XWNyKQ4uuYfmRmWxQWesDEdL18.jpg`}
              alt=""
              className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
            />
            <img
              src={`${A}/renders/hero-illustration@2x.png`}
              alt="Lightdash AI chat answering “Show me profit compared against all channels as a bar chart” with a Profit / Last week bar chart"
              width={564}
              height={604}
              data-fintech-hero-illustration=""
              className="relative mx-auto block h-full w-full max-w-none object-contain tab:h-[604px] tab:w-[564px] tab:object-cover"
            />
          </div>
        </Box>

        {/* 2 · Trusted by: heading 87 (side lines) + logos 122 (full border) */}
        <Box className="flex flex-col">
          <div className="flex w-full justify-center px-[24px] py-[32px]">
            <p className="ld-caption-18 m-0 text-center">Loved by fintech data teams</p>
          </div>
          <div className="relative grid w-full grid-cols-3 tab:grid-cols-5">
            {FIN_LOGOS.map((l) => (
              <div key={l.alt} className="relative flex h-[44px] items-center justify-center overflow-hidden tab:h-[122px]">
                <img
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={l.h}
                  className="block max-w-none object-contain max-tab:scale-[0.62]"
                  style={{ width: l.w, height: l.h }}
                />
                <Lines sides="r" />
              </div>
            ))}
            <Lines sides="t" />
          </div>
        </Box>

        {/* 3 · "Why does traditional BI fail fintechs?": padding 64/0, gap 48 */}
        <Box className="flex flex-col gap-[48px] py-[64px]">
          <div className="relative px-[24px] tab:px-[48px]">
            <h2 className="m-0 font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] font-semibold leading-[35.2px] tracking-[-0.96px] text-ld-ink tab:text-[48px] tab:leading-[48px]">
              Why does traditional BI fail fintechs?
            </h2>
            <Lines sides="tb" dashed />
          </div>
          <div className="relative flex flex-col gap-[24px] px-[24px] tab:flex-row tab:px-[48px]">
            {REASONS.map((r, i) => (
              <div key={r.text} className="relative flex flex-row items-start gap-[16px] py-[48px] pl-[25px] pr-[18px] tab:w-[362px] tab:shrink-0">
                <img src={r.icon} alt="" width={48} height={48} className="block h-[48px] w-[48px] shrink-0" />
                <p className="m-0 font-inter text-[18px] leading-[23.4px] tracking-[-0.36px] text-[#1F1F1F]">{r.text}</p>
                {i > 0 && (
                  <>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden border-0 border-l border-dashed border-ld-line tab:block" />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[25px] hidden border-0 border-l border-dashed border-ld-line tab:block" />
                  </>
                )}
              </div>
            ))}
            <Lines sides="t" dashed />
          </div>
        </Box>

        {/* 4 · Benefit Section: padding 80/0/0, gap 56; heading 96 (dashed top/bottom); cards 2×2 568×465 gap 16 */}
        <Box className="flex flex-col gap-[56px] pt-[80px]">
          <div className="relative flex min-h-[96px] flex-col items-center justify-center px-[24px]">
            <h2 className="m-0 text-center font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] font-semibold leading-[35.2px] tracking-[-0.96px] text-ld-ink tab:text-[48px] tab:leading-[48px]">
              <span className="block">How Lightdash</span>
              <span className="block">is helping fintechs</span>
            </h2>
            <Lines sides="tb" dashed />
          </div>
          <div className="grid grid-cols-1 gap-[16px] px-[24px] pb-[80px] tab:grid-cols-2 desk:px-[64px]">
            {BENEFITS.map((b) => (
              <article key={b.title} className="relative flex flex-col bg-white pb-[32px]">
                <div className="relative h-[305px] w-full overflow-hidden">
                  <img src={b.image} alt="" className="block h-[306px] w-full object-cover object-top" />
                </div>
                <div className="relative flex flex-col gap-[4px] px-[24px]">
                  <h3 className="m-0 font-['Britti_Sans_Trial_Regular',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[20px] font-normal leading-[28px] tracking-[-0.3px] text-ld-ink-700">
                    {b.title}
                  </h3>
                  <p className="m-0 max-w-[480px] pr-[40px] font-inter text-[14px] leading-[24px] text-ld-body">{b.body}</p>
                  <Lines sides="tb" dashed />
                </div>
                <Lines sides="trbl" color="border-[#DFE1E7]" />
              </article>
            ))}
          </div>
        </Box>

        {/* 5 · Testimonials: bg #F6F8FA + linear overlay; padding 80/0; rows padding 16/80 */}
        <Box className="overflow-hidden bg-ld-well py-[80px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(#F8FAFB_0%,rgba(248,250,251,0)_100%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[24px] border-0 border-l border-dashed border-ld-line tab:left-[64px]" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[24px] border-0 border-r border-dashed border-ld-line tab:right-[64px]" />

          <div className="relative px-[24px] py-[16px] desk:px-[80px]">
            <Lines sides="tb" dashed />
            {/* dark card 1120×224, radius 16, padding 40/24 */}
            <div className="relative overflow-hidden rounded-[16px] bg-ld-dark px-[24px] py-[40px] shadow-[0_12px_5px_rgba(39,40,53,0.01),0_7px_4px_rgba(39,40,53,0.02),0_3px_3px_rgba(39,40,53,0.03),0_1px_2px_rgba(39,40,53,0.03)]">
              {/* right-edge pixel BG pattern (188×184, bottom-right; the 2× render also contains the button's
                  left half, which our real button covers at the same position) */}
              <img
                src={`${A}/renders/testimonial-bg-pattern@2x.png`}
                alt=""
                width={188}
                height={184}
                className="pointer-events-none absolute bottom-0 right-0 block h-[184px] w-[188px]"
              />
              <div className="relative mx-auto flex max-w-[1024px] flex-col gap-[24px] desk:flex-row desk:items-end desk:gap-0">
                <div className="flex w-[279px] shrink-0 flex-col gap-[24px]">
                  <img src={`${A}/person-gnaALe5A2PvVeKJOfM2FSTyw.png`} alt="Brandon Rochon" width={64} height={64} className="block h-[64px] w-[64px]" />
                  <div className="flex flex-col">
                    <p className="m-0 font-inter text-[16px] leading-[20px] text-ld-body">Brandon Rochon</p>
                    <p className="m-0 whitespace-nowrap font-inter text-[12px] leading-[20px]">
                      <span className="font-medium text-white">Neo Financial</span> <span className="text-[14px] text-[#A4ACB9]">•</span>{' '}
                      <span className="text-ld-body">Head of Business Intelligence</span>
                    </p>
                  </div>
                </div>
                <p className="m-0 max-w-[406px] font-inter text-[21px] font-medium leading-[36px] tracking-[-0.315px] text-white desk:self-start">
                  "The Lightdash team has been a true partner. Their support is best-in-class, with direct access to their data and BI experts."
                </p>
                <div className="flex flex-1 desk:justify-end">
                  <Button variant="v1-light" href="./customer-story/neo-financial" icon={<Arrow />} className="hover:bg-btn-light-bg-hover">
                    Read the full case study
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* stats: padding 16/80, gap 16, dashed bottom */}
          <div className="relative flex flex-col gap-[16px] px-[24px] py-[16px] tab:flex-row desk:px-[80px]">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="flex min-h-[130px] flex-1 flex-row items-center gap-[12px] rounded-[16px] bg-white p-[24px] shadow-[0_0_0_1px_rgba(39,40,53,0.02),0_19px_5px_rgba(39,40,53,0),0_12px_5px_rgba(39,40,53,0.01),0_7px_4px_rgba(39,40,53,0.03),0_3px_3px_rgba(39,40,53,0.06),0_1px_2px_rgba(39,40,53,0.07)]"
              >
                <span className="font-inter text-[40px] font-medium leading-[40px] tracking-[-0.8px] text-ld-ink">{s.value}</span>
                <span className="max-w-[214px] font-inter text-[14px] leading-[16.8px] tracking-[-0.28px] text-ld-body">{s.label}</span>
              </div>
            ))}
            <Lines sides="b" dashed />
          </div>
        </Box>
      </div>

      {/* 6 · Dark band (full bleed #1A1B25), inner 1280 padding 80/0 with #36394A side lines */}
      <div className="w-full bg-ld-dark px-[16px]">
        <section className="relative mx-auto w-full max-w-[1280px] py-[80px]">
          <Lines sides="rl" color={DARK_LINE} />
          {/* Top content: padding 48/0, bottom solid #36394A; inner row dashed top/bottom, padding 0 48 */}
          <div className="relative py-[48px]">
            <div className="relative flex flex-col tab:flex-row tab:items-start tab:justify-between tab:px-[48px]">
              <h3 className="relative m-0 max-w-[476px] px-[24px] py-[32px] font-inter text-[28px] font-medium leading-[33px] tracking-[-0.42px] text-white tab:pr-0">
                With enterprise-grade governance and fintech-level security
              </h3>
              <img src={`${A}/renders/stamps@2x.png`} alt="SOC2 Type II and HIPAA compliant" width={464} height={209} className="block h-auto w-full max-w-[464px] tab:w-[464px]" />
              <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-[48px] hidden border-0 border-l border-dashed tab:block ${DARK_LINE}`} />
              <Lines sides="tb" dashed color={DARK_LINE} />
            </div>
            <Lines sides="b" color={DARK_LINE} />
          </div>

          {/* Bottom content: Title & CTA (522) | role accordion (710, dashed left) */}
          <div className="relative flex flex-col tab:flex-row tab:pl-[48px]">
            <div className="relative flex min-h-[357px] flex-col justify-between gap-[40px] px-[24px] pb-[44px] pt-[64px] tab:w-[522px] tab:shrink-0">
              <h2 className="m-0 max-w-[368px] font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] font-semibold leading-[35.2px] tracking-[-0.96px] text-white tab:text-[48px] tab:leading-[48px]">
                Built for every fintech role
              </h2>
              <div className="relative z-[2]">
                <Button variant="v1-light" href="./start" icon={<Arrow />} className="hover:bg-btn-light-bg-hover">
                  Start for free
                </Button>
              </div>
              <img
                src={`${A}/bg-element-o00XVYnTMA96BZ1vVmgf5ONccjI.png`}
                alt=""
                width={224}
                height={128}
                className="pointer-events-none absolute bottom-0 right-0 block h-[128px] w-[224px]"
              />
              <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 hidden border-0 border-l border-dashed tab:block ${DARK_LINE}`} />
            </div>
            <div className="relative min-w-0 flex-1">
              <RoleAccordion />
              <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 hidden border-0 border-l border-dashed tab:block ${DARK_LINE}`} />
            </div>
            <Lines sides="b" color={DARK_LINE} />
          </div>
        </section>
      </div>

      {/* 7 · Graphic Border: full-bleed 1440×60 pixel band */}
      <div
        aria-hidden="true"
        className="h-[60px] w-full"
        style={{ background: `url(${A}/graphic-border-lc6YRJAGTi8i3sQyemwJrMzsReo.png) center / cover no-repeat` }}
      />

      <div className="w-full px-[16px]">
        {/* 8 · Gap 60 (side lines) */}
        <div className="relative mx-auto h-[60px] w-full max-w-[1280px]">
          <Lines sides="rl" />
        </div>
        {/* 9 · FAQ (§1.5; fintech left gap 20) */}
        <Box first className="[&>section>div:first-child]:gap-[20px]">
          <Faq items={FIN_FAQ} lead={FAQ_LEADS.long} />
        </Box>
      </div>

      {/* 10 · CTA: outer 1408 (x 16), stack 1280 */}
      <div className="mx-auto w-full max-w-[1440px] px-[16px]">
        <CtaBand lines="" cardMaxWidth={1280} />
      </div>
    </div>
  )
}
