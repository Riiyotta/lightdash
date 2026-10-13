import { Lines, Button } from '../components/shared/index.js'
import TestimonialCarousel from '../components/pages/partnerships/TestimonialCarousel.jsx'
import PartnerForm from '../components/pages/partnerships/PartnerForm.jsx'

// /partnerships — specs/company-pages.md §6 (Template B, no CTA band: the partner form replaces it).
// <main>-like wrapper padding 0 16; sections max 1280 with a 1px solid #E5E7EB frame (first: all sides).
const P = '/assets/pages/partnerships'

// §6.2 — live cell 4 href is "https://https://northstaranalytics.co.uk/"; fixed per the live-site bug policy.
const PARTNERS = [
  { alt: 'Nayuta', src: `${P}/nayuta-mr8uAghSvtTFWPKdjwe40rk2318.png`, w: 113, h: 34, href: 'https://nayuta.co.uk/' },
  { alt: 'Gemma Analytics', src: `${P}/database-tycoon-wnBqGBkGWUrP0E4suiYXPv02WQ.svg`, w: 155, h: 18.9, href: 'https://www.databasetycoon.com/' },
  { alt: 'Snowpack Data', src: `${P}/snowpack-data-mdQmUtnKJVr2Bv776Mn8MgpxA.png`, w: 155, h: 33.6, href: 'https://snowpack-data.com/' },
  { alt: 'Northstar Analytics', src: `${P}/pyne-nwS4nOJmIf4PpipNFvz9fEW4fSI.svg`, w: 130, h: 56, href: 'https://northstaranalytics.co.uk/' },
  { alt: 'Driftwave', src: `${P}/driftwave-A9BLX9WDLuZWDDIyhYnvbCHkj0.png`, w: 116, h: 36.5, href: 'https://driftwave.io/' },
]

const REASONS = [
  {
    icon: `${P}/icon-4CdGa577cCOKeb71APBe3n7jF4.png`,
    title: 'Solve the backlog problem',
    body: 'Give business users direct access to insights through natural language and AI agents, while data teams maintain control through dbt governance. Help clients ship outcomes, not tickets.',
  },
  {
    icon: `${P}/icon-rJrChVv7AIg3AWfjxqeXK8AZc.png`,
    title: 'Ship BI like you ship code',
    body: 'Data teams already use Git, dbt, and CI/CD for their data pipelines. Lightdash brings that same workflow to BI with versioned metrics, code-based charts, and governance built in. Ship faster, break less, iterate confidently.',
  },
  {
    icon: `${P}/icon-GFNcLCaX81x5gPuHhatG0VPx9I.png`,
    title: 'Self-serve for business users',
    body: 'Most self-serve BI fails because users still need to understand the data model. Lightdash uses AI to let them ask questions in natural language and get governed, trustworthy answers.',
  },
  {
    icon: `${P}/icon-dtp2UVGLloD3F0aNhJMv1LZbdu8.png`,
    title: 'Plug into anything',
    body: 'Lightdash is open not just open-source. Connect to any stack, embed anywhere, and use our APIs to extend and integrate.',
  },
  {
    icon: `${P}/call-hWPKoSXEznuiSGjDNAW2Zpqjk.png`,
    title: 'Support that shows up',
    body: 'We’re not a black box. You’ll get real access to the team building Lightdash, so you can move faster and unblock clients when it counts.',
  },
]

const BENEFITS = [
  {
    icon: `${P}/business-product-startup-1-streamline-pi-012e51c1.svg`,
    title: 'Test for free',
    body: 'Get full Lightdash Cloud Pro access. Build live demos with real client data and show clients how Agentic BI eliminates their backlog.',
  },
  {
    icon: `${P}/business-product-check-streamline-pixel-93d5f35e.svg`,
    title: 'Get trained and certified',
    body: 'Free certification covering dbt integration, AI analytics, and how to position against legacy BI. Become the expert clients trust to modernize their stack.',
  },
  {
    icon: `${P}/business-money-coin-currency-streamline--bf12d370.svg`,
    title: 'Earn as you grow',
    body: 'Revenue share on every customer you bring. Earn money for all qualified leads that start a POC and sign a contract.',
  },
  {
    icon: `${P}/email-mail-chat-streamline-pixel-e7c8e22a.svg`,
    title: 'Access expert support',
    body: 'Dedicated partner Slack channel with our engineering team. Get technical questions answered same-day, and co-present on enterprise deals.',
  },
  {
    icon: `${P}/business-products-deal-handshake-streaml-94e5f35c.svg`,
    title: 'Sell side-by-side',
    body: "Joint sales enablement, co-marketing, and direct intros to our pipeline. We'll promote you to customers looking for implementation partners.",
  },
  {
    icon: `${P}/business-products-climb-top-streamline-p-90acf7b2.svg`,
    title: 'Grow your business',
    body: 'Our partners are becoming the go-to experts in Agentic BI. Be first to market in your region before the competition catches up.',
  },
]

const SEMI = "font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] font-semibold"

function Box({ first = false, className = '', children, ...rest }) {
  return (
    <section className={`relative mx-auto w-full max-w-[1280px] bg-white ${className}`} {...rest}>
      {children}
      <Lines sides={first ? 'trbl' : 'rbl'} />
    </section>
  )
}

// dashed vertical guide at `x` px from the left (or right) of the nearest relative box
function VGuide({ left, right, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 border-0 border-l border-dashed border-ld-line ${className}`}
      style={left != null ? { left } : { right }}
    />
  )
}

export default function Partnerships() {
  return (
    <div className="w-full bg-white px-[16px]">
      {/* 1 · Hero: border all sides, padding 20, 604 tall; centred stack gap 24 */}
      <Box first data-hero="" className="flex h-[604px] flex-col items-center justify-center overflow-hidden p-[20px]">
        <VGuide left={48} className="hidden tab:block" />
        <VGuide right={48} className="hidden tab:block" />
        <img
          src={`${P}/renders/hero-bg-element-01@2x.png`}
          alt=""
          width={120}
          height={72}
          data-hero-pixel=""
          className="pointer-events-none absolute left-0 top-0 block h-[72px] w-[120px]"
        />
        <img
          src={`${P}/renders/hero-bg-element-02@2x.png`}
          alt=""
          width={108}
          height={54}
          data-hero-pixel=""
          className="pointer-events-none absolute bottom-0 right-0 block h-[54px] w-[108px]"
        />
        <div className="relative flex w-full flex-col items-center gap-[24px]">
          <img
            src={`${P}/hero-hand-cursor.svg`}
            alt=""
            width={130}
            height={132}
            className="pointer-events-none absolute left-[calc(50%+34px)] top-[-118px] block h-[132px] w-[130px] max-tab:scale-[0.8] tab:left-[calc(50%+217px)] tab:top-[-24px]"
          />
          <img
            src={`${P}/hero-rocket.svg`}
            alt=""
            width={126}
            height={129}
            className="pointer-events-none absolute left-[calc(50%-150px)] top-[250px] block h-[129px] w-[126px] max-tab:scale-[0.85] tab:left-[calc(50%-268px)] tab:top-[238px]"
          />
          <h1 className={`${SEMI} m-0 max-w-[554px] text-center text-[42px] leading-[39.9px] tracking-[-1.44px] text-[#1F1F1F] tab:text-[72px] tab:leading-[68.4px]`}>
            Become a Lightdash partner
          </h1>
          <p className="ld-lead-18 m-0 max-w-[458px] text-center">Apply to become a partner. You get access to certified training, partner discounts and more!</p>
          <Button
            variant="v1-purple"
            href="#partner-form"
            onClick={(e) => {
              const el = document.getElementById('partner-form')
              if (el) {
                e.preventDefault()
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Apply now
          </Button>
        </div>
      </Box>

      {/* 2 · Partner logos: heading (side lines) + 5 linked cells 256×80 */}
      <Box className="flex flex-col">
        <div className="flex w-full justify-center px-[24px] py-[32px]">
          <p className="ld-caption-18 m-0 text-center">Official Lightdash partners</p>
        </div>
        <div className="relative grid w-full grid-cols-5">
          {PARTNERS.map((l) => (
            <a
              key={l.alt}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.alt}
              className="relative flex h-[80px] items-center justify-center overflow-hidden"
            >
              <img
                src={l.src}
                alt=""
                width={l.w}
                height={l.h}
                className="block max-w-none object-contain max-tab:scale-[0.4]"
                style={{ width: l.w, height: l.h }}
              />
              <Lines sides="r" />
            </a>
          ))}
          <Lines sides="t" />
        </div>
      </Box>

      {/* 3 · "Why Lightdash?": 2 columns × 640 */}
      <Box className="flex flex-col tab:flex-row">
        <div className="relative flex w-full flex-col pb-[40px] tab:w-1/2 tab:pb-[80px]">
          <VGuide left={64} className="hidden tab:block" />
          <VGuide right={64} className="hidden tab:block" />
          <div className="relative h-[80px] w-full shrink-0">
            <Lines sides="b" dashed />
          </div>
          <div className="flex flex-col gap-[24px] px-[24px] tab:px-[64px]">
            <h2 className={`${SEMI} m-0 text-[56px] leading-[56px] tracking-[-1.12px] text-ld-ink`}>Why Lightdash?</h2>
            <div className="flex max-w-[512px] flex-col gap-[20px] font-inter text-[16px] leading-[24px] tracking-[-0.18px] text-ld-body tab:text-[18px] tab:leading-[32px]">
              <p className="m-0">
                Traditional BI creates a bottleneck: business users submit requests, data teams build dashboards, backlogs pile up. Agentic BI breaks the cycle.
              </p>
              <p className="m-0">
                Lightdash lets data teams ship BI like code: with dbt-native governance and self-service that actually works. Business users get insights without the
                wait. Data teams focus on high-impact work, not one-off requests.
              </p>
              <p className="m-0">
                As a Lightdash partner, you're solving the problem every data leader faces: <em>"My team is drowning in ad hoc requests."</em> Here's how.
              </p>
            </div>
          </div>
          <img
            src={`${P}/renders/why-bg-element@2x.png`}
            alt=""
            width={256}
            height={256}
            className="pointer-events-none ml-[24px] mt-[40px] block h-[64px] w-[256px] object-cover object-top tab:ml-[64px] tab:mt-[64px] tab:h-[256px]"
          />
          <Lines sides="r" className="hidden tab:block" />
        </div>
        <div className="relative flex w-full flex-col pb-[40px] tab:w-1/2 tab:pb-[80px]">
          <VGuide left={64} className="hidden tab:block" />
          <VGuide right={64} className="hidden tab:block" />
          <div className="relative hidden h-[80px] w-full shrink-0 tab:block">
            <Lines sides="b" dashed />
          </div>
          {REASONS.map((r) => (
            <div key={r.title} className="relative flex flex-col gap-[12px] px-[24px] py-[25px] tab:px-[64px]">
              <div className="flex flex-row items-center gap-[12px]">
                <img src={r.icon} alt="" width={32} height={32} className="block h-[32px] w-[32px] shrink-0" />
                <h3 className="m-0 font-britti text-[20px] font-medium leading-[28px] tracking-[-0.4px] text-[#1F1F1F]">{r.title}</h3>
              </div>
              <p className="m-0 max-w-[512px] font-inter text-[14px] leading-[21px] text-ld-body">{r.body}</p>
              <Lines sides="b" />
            </div>
          ))}
        </div>
      </Box>

      {/* 4 · Testimonial carousel */}
      <Box>
        <TestimonialCarousel />
      </Box>

      {/* 5 · "Why become a Lightdash partner?" */}
      <Box className="flex flex-col pb-[80px] pt-[80px]">
        <div className="relative flex min-h-[96px] items-center justify-center px-[24px] tab:px-[64px]">
          <h2 className={`${SEMI} m-0 text-center text-[42px] leading-[42px] tracking-[-0.96px] text-ld-ink tab:text-[48px] tab:leading-[48px]`}>
            Why become
            <br />a Lightdash <span className="text-ld-muted">partner</span>?
          </h2>
          <Lines sides="tb" dashed />
        </div>
        <div className="relative mt-[64px] grid grid-cols-1 tab:grid-cols-3 tab:px-[64px]">
          {BENEFITS.map((b) => (
            <div key={b.title} className="relative flex min-h-[200px] flex-row">
              <div className="relative w-[48px] shrink-0">
                <img src={b.icon} alt="" width={48} height={48} className="block h-[48px] w-[48px]" />
              </div>
              <div className="relative flex min-w-0 flex-1 flex-col">
                <div className="relative flex h-[48px] items-center px-[12px] py-[11px]">
                  <h3 className="m-0 font-inter text-[18px] font-medium leading-[26px] tracking-[-0.27px] text-ld-ink">{b.title}</h3>
                  <Lines sides="b" dashed />
                </div>
                <p className="m-0 max-w-[284px] px-[12px] py-[16px] font-inter text-[14px] leading-[24px] tracking-[-0.28px] text-ld-body">{b.body}</p>
                <Lines sides="l" dashed />
              </div>
              <Lines sides="lb" dashed />
            </div>
          ))}
          <Lines sides="t" dashed />
          <VGuide right={64} className="hidden tab:block" />
        </div>
      </Box>

      {/* 6 · Form Section (#partner-form): padding 40, dotted pattern bg; card 1200 radius 16, padding 120/0, gap 40 */}
      <Box id="partner-form" className="scroll-mt-[106px] overflow-hidden px-[24px] py-[40px] tab:p-[40px]">
        <img src={`${P}/bg-pattern-KsQ21PJT6e9XU2YmglGUiR4.png`} alt="" className="pointer-events-none absolute inset-0 block h-full w-full object-cover" />
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[40px] rounded-[16px] bg-white px-[24px] py-[120px] shadow-ld-cta-card tab:px-0">
          <VGuide left={48} className="hidden tab:block" />
          <VGuide right={48} className="hidden tab:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[48px] hidden border-0 border-t border-dashed border-ld-line tab:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[48px] hidden border-0 border-t border-dashed border-ld-line tab:block" />
          <img
            src={`${P}/renders/form-card-corner-block@2x.png`}
            alt=""
            width={32}
            height={32}
            className="pointer-events-none absolute left-[48px] top-[48px] hidden h-[32px] w-[32px] tab:block"
          />
          <img
            src={`${P}/renders/form-card-bottom-right-cluster@2x.png`}
            alt=""
            width={256}
            height={192}
            className="pointer-events-none absolute bottom-[24px] right-[16px] hidden h-[192px] w-[256px] desk:block"
          />
          <img src={`${P}/icon-be52be02.svg`} alt="" width={64} height={64} className="relative block h-[64px] w-[64px]" />
          <h2 className={`${SEMI} relative m-0 text-center text-[42px] leading-[39.9px] tracking-[-1.12px] tab:text-[56px] tab:leading-[50.4px]`}>
            <span className="block text-ld-ink">Ready to become</span>
            <span className="block text-ld-muted">a Lightdash partner?</span>
          </h2>
          <div className="relative mt-[24px] flex w-full justify-center">
            <PartnerForm />
          </div>
        </div>
      </Box>
    </div>
  )
}
