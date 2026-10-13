import { useEffect } from 'react'
import { PageFrame, Lines, Button, HatchedSpacer, CtaBand, REGISTER_URL } from '../components/shared/index.js'
import PixelTiles, { STARTUPS_TILES } from '../components/pages/startups/PixelTiles.jsx'
import RiveDashboard from '../components/pages/startups/RiveDashboard.jsx'

// /startups — specs/company-pages.md §4 (Template A).
const A = '/assets/pages/startups'

const QUALIFY = [
  { icon: `${A}/icon-card-c08eab20.svg`, text: ['Be less than ', '5', ' years old'] },
  { icon: `${A}/icon-card-37918730.svg`, text: ['Have less than ', '$7.5M', ' in funding'] },
]

const BENEFITS = [
  { icon: `${A}/rectangle-240687995-1GE1QaDy20VenZT6csRDX3flhY.png`, title: 'Half-Price Lightdash Cloud Plans', body: '50% off Lightdash Cloud or Pro for 12 months' },
  { icon: `${A}/rectangle-240687995-xDrzUuuwwZFCD1HzUeVTjWDTik.png`, title: 'Personalized Onboarding', body: 'Kickoff and training calls with the Lightdash data team' },
  {
    icon: `${A}/rectangle-240687995-imRdWA2Jmc2uXNFnWflaVmRvNoE.png`,
    title: 'Referral Bonus Extension',
    body: 'Extend your 50% off for another 6 months by referring other startups',
  },
  { icon: `${A}/rectangle-240687995-MSfUL6XyyGbhrzPFywT2zC2KrI.png`, title: 'Exclusive Lightdash Swag', body: 'Free merch for you and your team' },
  {
    icon: `${A}/rectangle-240687995-HVFK8L6xteZ94FZ5HaVlx5kpI.png`,
    title: 'Dedicated Support Channel',
    body: 'Expert support and direct access to our product team for feedback and beta features',
  },
  { icon: `${A}/rectangle-240687995-jf0EM1m2SKidDl0zNOLApJLd9CI.png`, title: 'Enterprise Grade Security', badges: true },
]

const CARDS = [
  {
    title: 'Self-serve BI',
    first: true,
    body: 'Lightdash instantly turns your dbt project into a full stack BI platform. A powerful developer workflow lets analysts define key metrics, and enable self-serve for everyone else.',
    placeholder: (
      <img src={`${A}/image-TCmH07CpJz9KnFnriUU61CsZuI.png`} alt="" className="absolute left-0 top-[61px] block h-[307px] w-full max-w-none object-contain" />
    ),
  },
  {
    title: 'Open-source, community built and loved',
    body: 'Join a community of data enthusiasts and experts who discuss and contribute to the Lightdash platform and best practice for the modern data stack.',
    bg: `${A}/placeholder-U5YIPk2pDXLwdtmeQk9EdGHIgA.png`,
    placeholder: (
      <img src={`${A}/image-1teNRTMPZ0ZmdsRzttniUjQMZPA.png`} alt="" className="absolute left-[153px] top-[55px] block h-[360px] w-[411px] max-w-none object-contain max-tab:left-[60px]" />
    ),
  },
  {
    title: 'Semantic layer to easily define key metrics',
    body: 'Get to the right answers fast with pre-built metrics. Define your business logic once and make it available everywhere for your whole team to use.',
    bg: `${A}/placeholder-U5YIPk2pDXLwdtmeQk9EdGHIgA.png`,
    placeholder: (
      <img
        src={`${A}/image-kyItmKY1ktmf02N2bElsVyM0w0.png`}
        alt=""
        className="absolute left-[117px] top-[19px] block h-[322px] w-[331px] max-w-none object-contain max-tab:left-0"
      />
    ),
  },
  {
    title: 'Data developer friendly',
    body: 'Lightdash reads directly from your dbt project and offers an easy-to-use CLI for previewing and validating changes.',
    bg: `${A}/placeholder-UfhAmEzi2JL5c6IsWYI3ByKAZIY.png`,
    placeholder: (
      <img
        src={`${A}/image-fxYBss5q9tJlY47rj1oyNrgM0.png`}
        alt=""
        className="absolute left-[64px] top-[-80px] block h-[440px] w-[498.7px] max-w-none object-contain max-tab:left-0"
      />
    ),
  },
]

// SOC2 / HIPAA badges (cell 06): 88 white circle (0.8px #ECEFF3) inside a 96 ring (0.8px #DFE1E6)
function Badge({ children }) {
  return (
    <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border-[0.8px] border-solid border-[#DFE1E6]">
      <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full border-[0.8px] border-solid border-[#ECEFF3] bg-white text-center text-ld-ink">
        {children}
      </div>
    </div>
  )
}

const LINE_SOFT = 'border-[#ECEFF3]'

export default function Startups() {
  useEffect(() => {
    document.title = 'Lightdash for Startups'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* 1 · Hero: spacer 70 · title 50 · subtitle 144 · buttons 41 · spacer 56 (dashed bottom) */}
      <section data-hero="" className="relative flex w-full flex-col items-center">
        <PixelTiles tiles={STARTUPS_TILES} />
        <div className="h-[94px] w-full shrink-0 tab:h-[70px]" />
        <h1 className="ld-display-56 m-0 px-[24px] text-center max-tab:text-[36px] max-tab:leading-[33px]">
          <span className="tab:hidden">Lightdash for startups</span>
          <span className="hidden tab:inline">Lightdash for Startups</span>
        </h1>
        <div className="flex w-full justify-center px-[24px] py-[24px]">
          <p className="ld-lead-18 m-0 max-w-[450px] text-center max-tab:leading-[24px]">
            50% off Lightdash Cloud for a year, plus hands-on expert support to help build your data stack right from the beginning.
          </p>
        </div>
        <div className="flex flex-row justify-center gap-[16px] pb-px">
          <Button variant="third" href="https://lightdash.cal.com/lightdash/startups">
            Talk to our team
          </Button>
          <Button variant="fourth" href={REGISTER_URL}>
            Start for free
          </Button>
        </div>
        <div className="relative h-[56px] w-full shrink-0">
          <Lines sides="b" dashed />
        </div>
      </section>

      {/* 2 · HeroImage: 883 tall, padding 48/24/56, gap 48. Hidden on phone (reference startups-390.png). */}
      <section className="relative hidden w-full flex-col items-center gap-[48px] overflow-hidden px-[24px] pb-[56px] pt-[48px] tab:flex">
        <img
          src={`${A}/heroimage-cSMwpvaQWkHp3Yhk4eEhvPwj4.png`}
          alt=""
          className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
        />
        <div className="relative">
          <RiveDashboard />
        </div>
        <div className="relative flex w-[696px] max-w-full flex-col items-center gap-[8px] overflow-clip bg-white px-[24px] py-[32px]">
          <p className="m-0 text-center font-britti text-[16px] font-medium leading-[28.32px] tracking-[-0.27px] text-ld-muted">To qualify, your company must:</p>
          <div className="flex flex-col items-center gap-[10px]">
            {QUALIFY.map((q) => (
              <div key={q.icon} className="flex flex-row items-center gap-[10px]">
                <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[24px] bg-[#EDE3FF]">
                  <img src={q.icon} alt="" width={22} height={22} className="block h-[22px] w-[22px]" />
                </span>
                <h3 className="m-0 font-britti text-[25px] font-medium leading-[30px] tracking-[-0.5px] text-black">
                  {q.text[0]}
                  <span className="text-[#615AF7]">{q.text[1]}</span>
                  {q.text[2]}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <Lines sides="b" dashed />
      </section>

      {/* 3 · "Why you should apply…": spacer 58 · title 100 · subtitle 204 (padding 24/0/53) */}
      <section className="flex w-full flex-col items-center px-[24px] pt-[58px] tab:px-0">
        <img src={`${A}/title-b80c8ad9.svg`} alt="" width={38} height={37} className="mb-[20px] block h-[37px] w-[38px]" />
        <h2 className="m-0 text-center font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] font-semibold leading-[32px] tracking-[-0.96px] text-[#A4ACB9] tab:text-[48px] tab:leading-[43.2px]">
          Why you should apply to <span className="text-ld-ink">Lightdash for Startups</span>
        </h2>
        <div className="flex w-full flex-col items-center gap-[10px] pb-[53px] pt-[24px]">
          <p className="m-0 max-w-[648px] text-center font-inter text-[18px] leading-[31.86px] tracking-[-0.27px] text-ld-body">
            You'll get up to $18,000 in Lightdash credits and expert support to ensure your data stack is ready to scale.
          </p>
          <div className="pb-px pl-[4px] pt-[12px]">
            <Button variant="third" href="./start">
              Apply to the program
            </Button>
          </div>
        </div>
      </section>

      {/* 4 · Features: 2 rows × 3 cols (426.66 × 198), border 0 1 1 1 dashed #ECEFF3 */}
      <section className="relative grid w-full grid-cols-1 bg-white tab:grid-cols-3">
        {BENEFITS.map((b) => (
          <div key={b.title} className="relative flex min-h-[198px] flex-row">
            <div className="relative h-[48px] w-[48px] shrink-0">
              <img src={b.icon} alt="" width={48} height={48} className="block h-[48px] w-[48px] object-cover" />
              <Lines sides="tb" dashed color={LINE_SOFT} />
            </div>
            <div className="relative flex min-w-0 flex-1 flex-col">
              <div className="relative flex h-[50px] items-center pb-[13px] pl-[16px] pr-[8px] pt-[13px]">
                <h3 className="m-0 whitespace-nowrap font-britti text-[20px] font-medium leading-[24px] tracking-[-0.2px] text-ld-ink">{b.title}</h3>
                <Lines sides="tb" dashed color={LINE_SOFT} />
              </div>
              {b.badges ? (
                <div className="flex flex-1 flex-row">
                  <div className="relative flex h-[147px] flex-1 items-center justify-center bg-[#F8F9FB] px-[40px] py-[29px]">
                    <Badge>
                      <span className="font-inter text-[16.5px] font-semibold leading-[16.5px]">SOC2</span>
                      <span className="font-inter text-[16.5px] font-normal leading-[16.5px]">TYPE II</span>
                    </Badge>
                    <Lines sides="r" dashed color={LINE_SOFT} />
                  </div>
                  <div className="relative flex h-[147px] flex-1 items-center justify-center bg-[#F8F9FB] px-[40px] py-[29px]">
                    <Badge>
                      <img src={`${A}/hipaa-emblem.svg`} alt="" width={65} height={57} className="-mt-[6px] block h-[38px] w-[60px] object-contain" />
                      <span className="font-inter text-[8.5px] font-semibold leading-[10.08px]">
                        HIPAA
                        <br />
                        COMPLIANT
                      </span>
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="m-0 max-w-[354px] py-[12px] pl-[16px] pr-[8px] font-inter text-[16px] leading-[26px] tracking-[-0.16px] text-ld-body">{b.body}</p>
              )}
              <Lines sides="l" dashed color={LINE_SOFT} />
            </div>
            <Lines sides="r" dashed color={LINE_SOFT} />
          </div>
        ))}
        <Lines sides="rbl" dashed color={LINE_SOFT} />
      </section>

      {/* 5 · Hatched band */}
      <HatchedSpacer />

      {/* 6 · "What makes Lightdash the best BI tool for startups": spacer 58 · title 43 · subtitle 106 */}
      <section className="flex w-full flex-col items-center px-[24px] pt-[58px] tab:px-0">
        <h2 className="m-0 text-center font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] font-semibold leading-[32px] tracking-[-0.96px] text-[#A4ACB9] tab:text-[48px] tab:leading-[43.2px]">
          What makes Lightdash the <span className="text-ld-ink">best BI tool for startups</span>
        </h2>
        <div className="flex w-full justify-center pb-[10px] pt-[32px]">
          <p className="m-0 max-w-[648px] text-center font-inter text-[18px] leading-[31.86px] tracking-[-0.27px] text-ld-body">
            Startups love Lightdash for its self-serve BI capabilities, powerful semantic layer for defining key metrics, dbt integration, and scheduling results to
            Slack.
          </p>
        </div>
      </section>

      {/* 7 · Grid: padding 24/65/72, 2 × 565, gap 19 / 20 */}
      <section className="grid w-full grid-cols-1 gap-x-[20px] gap-y-[19px] px-[16px] pb-[72px] pt-[24px] tab:grid-cols-2 desk:px-[65px]">
        {CARDS.map((c) => (
          <article key={c.title} className="relative flex min-w-0 flex-col overflow-hidden">
            <div
              className={`relative h-[360px] w-full overflow-hidden ${c.first ? 'bg-ld-surface' : ''}`}
              style={c.bg ? { background: `url(${c.bg}) center / cover no-repeat` } : undefined}
            >
              {c.placeholder}
              <Lines sides="b" />
            </div>
            <div className="flex flex-col gap-[10px] p-[28px]">
              <h3
                className={`m-0 font-britti font-medium text-black ${c.first ? 'text-[24px] leading-[26.4px]' : 'text-[22px] leading-[22px]'}`}
              >
                {c.title}
              </h3>
              <p
                className={`m-0 text-[16px] leading-[25.6px] tracking-[-0.16px] text-ld-muted ${c.first ? 'max-w-[452px] font-inter font-medium' : 'font-inter-var font-normal'}`}
              >
                {c.body}
              </p>
            </div>
            <Lines sides="trbl" />
          </article>
        ))}
      </section>

      {/* 8 · Hatched band */}
      <HatchedSpacer />

      {/* 9 · Testimonial: padding 64, row max 896 gap 64 */}
      <section className="relative flex w-full items-center justify-center px-[16px] py-[64px] desk:h-[424px] desk:px-[64px]">
        <img src={`${A}/image-NZLtS7MabFwrjf6BA1sbhrTWDMU.png`} alt="" width={61} height={48} className="absolute left-[17px] top-[16px] block h-[48px] w-[61px]" />
        <img
          src={`${A}/image-NZLtS7MabFwrjf6BA1sbhrTWDMU.png`}
          alt=""
          width={61}
          height={48}
          className="absolute bottom-[16px] right-[16px] block h-[48px] w-[61px] rotate-180"
        />
        <div className="flex w-full max-w-[896px] flex-col items-center gap-[32px] tab:flex-row tab:items-center tab:gap-[64px]">
          <img
            src={`${A}/frame-2147233107-YZgEFDVihSQQS8ZIuqSsj8Uu1PE.png`}
            alt="Erik Webb"
            width={124}
            height={124}
            className="block h-[124px] w-[124px] shrink-0 object-cover"
          />
          <div className="flex min-w-0 flex-col gap-[16px]">
            <p className="m-0 font-britti text-[32px] font-medium leading-[40.96px] text-ld-ink-700 tab:max-w-[708px]">
              Lightdash powers self-service at Clair, allowing internal teams to{' '}
              <strong className="font-medium text-brand-purple">quickly get their hands on the data</strong> they need to operate the business.
            </p>
            <p className="m-0 font-inter text-[15px] font-medium leading-[15px]">
              <span className="text-ld-ink">Erik Webb</span> <span className="text-[#A4ACB9]">·</span> <span className="text-ld-body">Head of Data @ Clair</span>
            </p>
          </div>
        </div>
      </section>

      {/* 10 · CTA */}
      <CtaBand lines="trl" />
    </PageFrame>
  )
}
