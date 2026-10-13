import SmartLink from './SmartLink.jsx'

// SHARED §10. Full-bleed #1A1B25, 600 tall at ≥810 (826 at 390).
const F = '/assets/shared/footer'

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Get started', href: './start' },
      { label: 'Live demo', href: 'https://demo.lightdash.com/login', newTab: true },
      { label: 'Changelog', href: 'https://changelog.lightdash.com/', newTab: true },
      { label: 'Cloud status', href: 'https://status.lightdash.com/', newTab: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: './about' },
      { label: 'Careers', href: 'https://jobs.ashbyhq.com/lightdash', newTab: true },
      { label: 'Privacy Policy', href: './privacy-policy' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: 'https://docs.lightdash.com/introduction', newTab: true },
      { label: 'Security', href: './lightdash-security' },
      { label: 'Blog', href: './blog' },
      { label: 'Lightdash University', href: 'https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA', newTab: true },
      { label: 'Lightdash Merch Store', href: 'https://lightdash.shop/', newTab: true },
    ],
  },
]

export const G2_BADGES = [
  { file: 'g2-easiestadmin-mid-market-easeofadmin.svg', alt: 'G2 Easiest Admin Mid-Market' },
  { file: 'g2-easiesttodobusinesswith-easeofdoingbusinesswith.svg', alt: 'G2 Easiest To Do Business With' },
  { file: 'g2-easiesttodobusinesswith-mid-market-easeofdoingbusinesswith.svg', alt: 'G2 Easiest To Do Business With Mid-Market' },
  { file: 'g2-highperformer-highperformer.svg', alt: 'G2 High Performer' },
  { file: 'g2-highperformer-mid-market-highperformer.svg', alt: 'G2 High Performer Mid-Market' },
  { file: 'g2-momentumleader-leader.svg', alt: 'G2 Momentum Leader' },
  { file: 'g2-usersmostlikelytorecommend-mid-market-nps.svg', alt: 'G2 Users Most Likely To Recommend Mid-Market' },
  { file: 'g2-usersmostlikelytorecommend-nps.svg', alt: 'G2 Users Most Likely To Recommend' },
]

export const SOCIALS = [
  { label: 'X', href: 'https://x.com/lightdash_devs', icon: 'social-x.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/lightdash/', icon: 'social-linkedin.svg' },
  { label: 'Slack', href: 'https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI%7EQbjCAHQs0WBac3w', icon: 'social-slack.svg' },
  { label: 'GitHub', href: 'https://github.com/lightdash/lightdash', icon: 'social-github.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCgVZeT_aqyW8ky4x-4xP_uA', icon: 'social-youtube.svg' },
]

// Full-bleed dashed #272835 row line (2304 wide behind the rows, clipped by the footer).
function RowLine({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-1/2 h-0 w-[2304px] -translate-x-1/2 border-b border-dashed border-ld-footer-line ${className}`}
    />
  )
}

function NewsletterForm() {
  // UI only: the live HubSpot/Framer endpoint was not inspected (SHARED §12), so nothing is submitted.
  return (
    <form
      className="flex w-full flex-row tab:w-[498px]"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Newsletter"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email address"
        aria-label="Email address"
        className="h-[39px] min-w-0 flex-1 rounded-none border-0 bg-ld-footer-frame py-[10px] pl-[24px] pr-[20px] font-inter text-[14px] leading-[19px] text-white outline-none placeholder:text-ld-body"
      />
      <input
        type="submit"
        value="Subscribe"
        className="h-[39px] w-[112.6px] shrink-0 cursor-pointer rounded-none border-0 bg-white px-[20px] py-[10px] font-inter text-[14px] font-medium leading-[19px] text-ld-dark"
      />
    </form>
  )
}

function LinkColumn({ col, className = '' }) {
  return (
    <div className={`flex w-full min-w-0 flex-col gap-[24px] tab:w-auto tab:flex-1 desk:w-[159.3px] desk:flex-none ${className}`}>
      <p className="m-0 font-inter-var text-[14px] leading-[20px] text-ld-footer-head">{col.title}</p>
      {col.links.map((l) => (
        <SmartLink
          key={l.label}
          href={l.href}
          newTab={l.newTab}
          className="ld-footer-link font-inter text-[14px] leading-[20px] tracking-[-0.14px] text-ld-footer-link no-underline hover:text-ld-footer-link-hover"
        >
          {l.label}
        </SmartLink>
      ))}
    </div>
  )
}

function G2Grid() {
  return (
    <div className="grid grid-cols-[repeat(4,70px)] content-start gap-x-[9px] gap-y-[20px] self-start">
      {G2_BADGES.map((b, i) => (
        <div key={b.file} className="relative h-[80px] w-[70px]">
          <img src={`${F}/${b.file}`} alt={b.alt} width={70} height={80} className="block h-[80px] w-[70px]" />
          {/* dashed side lines between badges, running through the 20px row gap */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 border-x border-dashed border-ld-footer-line ${i < 4 ? '-bottom-[20px] top-0' : 'inset-y-0'}`}
          />
        </div>
      ))}
    </div>
  )
}

function Socials() {
  return (
    <div className="flex flex-row items-center gap-[10px]">
      {SOCIALS.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="block h-[23px] w-[23px]">
          <img src={`${F}/${s.icon}`} alt="" width={23} height={23} className="block h-[23px] w-[23px]" />
        </a>
      ))}
    </div>
  )
}

const COPYRIGHT = '© 2026 Telescope Technology Limited. All rights reserved.'

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ld-dark">
      {/* Wrapper: 1280 wide, solid #36394A side lines */}
      <div className="relative mx-auto w-[calc(100%-32px)] max-w-[1280px]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-x border-solid border-ld-footer-frame" />
        {/* Content 1152 wide (64 inside the wrapper at 1440), dashed vertical guides at its edges */}
        <div className="relative mx-auto flex w-full flex-col pt-[84px] tab:min-h-[600px] tab:w-[calc(100%-128px)] tab:max-w-[1152px] desk:h-[600px]">
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden border-l border-dashed border-ld-footer-line tab:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden border-r border-dashed border-ld-footer-line tab:block" />

          {/* ---------- ≥810: desktop rows ---------- */}
          <div className="hidden tab:contents">
            {/* 1. Top (36): logo + newsletter text */}
            <div className="relative flex h-[36px] flex-row items-start justify-between">
              <SmartLink href="/" aria-label="Lightdash home" className="mt-[4px] block h-[28px] w-[135px]">
                <img src={`${F}/lightdash-logo-footer.svg`} alt="Lightdash" width={135} height={28} className="block h-[28px] w-[135px]" />
              </SmartLink>
              <p className="m-0 w-[498px] font-inter-var text-[14px] leading-[20px] tracking-[-0.14px] text-ld-footer-link">
                Join our newsletter to be en-lightened
              </p>
              <RowLine />
            </div>
            {/* 2. Form (40, dashed bottom), right aligned */}
            <div className="relative flex h-[40px] flex-row justify-end">
              <NewsletterForm />
              <RowLine />
            </div>
            {/* 3. Spacer (40, dashed bottom) */}
            <div className="relative h-[40px]">
              <RowLine />
            </div>
            {/* 4. Items (240, dashed bottom): G2 badges + link columns */}
            <div className="relative flex min-h-[240px] flex-row justify-between pb-[20px] desk:h-[240px] desk:pb-0">
              <G2Grid />
              <div className="ml-[24px] flex min-w-0 flex-1 flex-row justify-between gap-[10px] desk:ml-0 desk:w-[498px] desk:flex-none desk:gap-0">
                {FOOTER_COLUMNS.map((c) => (
                  <LinkColumn key={c.title} col={c} />
                ))}
              </div>
              <RowLine />
            </div>
            {/* 5. Bottom (74, align end, padding-bottom 16) */}
            <div className="flex h-[74px] flex-row items-end justify-between pb-[16px]">
              <Socials />
              <p className="m-0 font-inter-var text-[13px] leading-[20px] tracking-[-0.13px] text-ld-body">{COPYRIGHT}</p>
            </div>
          </div>

          {/* ---------- <810: phone stack (SHARED §10 mobile + reference/pages/*-390.png) ---------- */}
          <div className="flex flex-col tab:hidden">
            <div className="flex flex-col items-center gap-[6px]">
              <SmartLink href="/" aria-label="Lightdash home" className="block h-[28px] w-[135px]">
                <img src={`${F}/lightdash-logo-footer.svg`} alt="Lightdash" width={135} height={28} className="block h-[28px] w-[135px]" />
              </SmartLink>
              <p className="m-0 text-center font-inter-var text-[14px] leading-[20px] tracking-[-0.14px] text-ld-footer-link">
                Join our newsletter to be en-lightened
              </p>
            </div>
            <div className="mt-[6px]">
              <NewsletterForm />
            </div>
            <div className="relative mt-[40px] grid grid-cols-2 gap-x-[10px] gap-y-[40px] py-[24px]">
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-ld-footer-frame" />
              {FOOTER_COLUMNS.map((c) => (
                <LinkColumn key={c.title} col={c} />
              ))}
            </div>
            <div className="flex flex-row items-end justify-between pb-[16px] pt-[16px]">
              <Socials />
              <p className="m-0 w-[193px] text-right font-inter-var text-[13px] leading-[20px] tracking-[-0.13px] text-ld-body">{COPYRIGHT}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
