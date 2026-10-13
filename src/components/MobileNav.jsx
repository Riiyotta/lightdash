import { useRef, useState } from 'react'
import MenuItem from './MenuItem.jsx'
import CustomerLogo from './CustomerLogo.jsx'
import PixelDeco from './PixelDeco.jsx'
import { ArrowUpRight } from './FeatureCard.jsx'
import { useChromeOffset } from './Navbar.jsx'
import {
  LINKS,
  MOBILE_PRODUCT_ITEMS,
  MOBILE_PLATFORM_ITEMS,
  RESOURCE_COL2,
  RESOURCE_COL3,
  CUSTOMER_GROUPS,
} from '../navData.js'

// §5 "Phone Dark" nav, shown below 1100px.

const rowText = 'font-inter text-[15px] font-normal leading-[18px] text-text-item'
// Rows are 48 tall; their 1px dashed rules are drawn inside the box (live Framer ::after), so they never shift layout.
// Live: Product row has no rule, Pricing has top+bottom, Customers/Resources/Login bottom only.
const rowBase = 'relative box-border flex h-[48px] w-full items-center justify-between border-0 bg-transparent px-[24px] no-underline'
const ruleBottom = "after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-dashed after:border-dashed-line after:content-['']"
const ruleTopBottom = "after:pointer-events-none after:absolute after:inset-0 after:border-y after:border-dashed after:border-dashed-line after:content-['']"
const rowBox = `${rowBase} ${ruleBottom}`
const btnLabel = 'font-inter text-[15px] font-medium leading-[18px]'
// Framer Button "Fourth" hover: bg #F8FAFB -> #ECEFF3, spring bounce .2 / duration .4 (.nav-btn-spring)
const lightBtn = `nav-btn-spring flex h-[40px] cursor-pointer items-center justify-center gap-[4px] rounded-[6px] border-0 bg-btn-light-bg hover:bg-btn-light-bg-hover text-btn-light-text no-underline ring-1 ring-inset ring-btn-light-border ${btnLabel}`
const subHeader = 'px-[24px] py-[10px] font-inter text-[15px] font-normal leading-[18px] text-text-item'

// "Phone" light variant (inner pages), live-measured: row/sub-header text #272835, dashed rules #E5E7EB,
// bar line #E5E7EB, hamburger bars #1D293D, panel #FFF. Buttons are identical to the dark variant.
const lightRule = (cls) => cls.replace('after:border-dashed-line', 'after:border-[#E5E7EB]')
const T = (light) =>
  light
    ? {
        rowText: rowText.replace('text-text-item', 'text-btn-light-text'),
        rowBox: lightRule(rowBox),
        ruleTopBottom: lightRule(ruleTopBottom),
        subHeader: subHeader.replace('text-text-item', 'text-btn-light-text'),
        v: 'light',
      }
    : { rowText, rowBox, ruleTopBottom, subHeader, v: 'dark' }

function MobileChevron({ open }) {
  // 24×24 box holding an 18×18 #999 chevron; rotates 0 <-> 180° with the accordion spring (bounce 0, .3 s).
  // Glyph geometry measured from reference/sections/mobile-menu-810.png (spec gives no path).
  return (
    <span className="flex h-[24px] w-[24px] items-center justify-center text-mobile-chevron">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={`nav-chevron ${open ? 'rotate-180' : ''}`} aria-hidden="true">
        <path d="M4.5 6.75 L9 11.25 L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function Arrow() {
  return (
    <span className="flex h-[16px] w-[16px] items-center justify-center">
      <ArrowUpRight />
    </span>
  )
}

function AccordionRow({ label, open, onClick, rule = true, t }) {
  return (
    <button type="button" aria-expanded={open} onClick={onClick} className={`${rule ? t.rowBox : rowBase} cursor-pointer text-left`}>
      <span className={t.rowText}>{label}</span>
      <MobileChevron open={open} />
    </button>
  )
}

function ProductContent({ t }) {
  return (
    <div className="flex flex-col gap-[4px] pt-[10px]">
      <div className={t.subHeader}>Product</div>
      {MOBILE_PRODUCT_ITEMS.map((it) => (
        <MenuItem key={it.title} item={it} fullWidth variant={t.v} />
      ))}
      <div className={t.subHeader}>Platform</div>
      {MOBILE_PLATFORM_ITEMS.map((it) => (
        <MenuItem key={it.title} item={it} fullWidth variant={t.v} />
      ))}
      <div className="p-[24px] pt-[32px]">
        <a href={LINKS.changelog} target="_blank" rel="noopener noreferrer" className={`${lightBtn} w-full pl-[20px] pr-[12px]`}>
          View changelog
          <Arrow />
        </a>
      </div>
    </div>
  )
}

function CustomersContent({ t }) {
  const light = t.v === 'light'
  return (
    <div className="px-[24px] pt-[19px]">
      <div className={`font-inter text-[15px] font-medium leading-[18px] ${light ? 'text-[#818898]' : 'text-text-item-sub'}`}>Working with the top enterprise companies</div>
      <div className="pt-[13px]">
        {CUSTOMER_GROUPS.map((g) => (
          <div key={g.mobile} className="pt-[19px]">
            <div className={`mb-[13px] font-inter text-[15px] font-medium leading-[18px] ${light ? 'text-btn-light-text' : 'text-text-item'}`}>{g.mobile}</div>
            {/* live: row frame 1px dashed #212121 (inside, no layout), cell dividers 1px SOLID #212121 (light: #E5E7EB) */}
            <div
              className={`relative grid grid-cols-3 before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:border before:border-dashed before:content-[''] ${
                light ? 'before:border-[#E5E7EB]' : 'before:border-[#212121]'
              }`}
            >
              {g.logos.map((l, i) => (
                <div
                  key={l.name}
                  className={`nav-logo-cell relative flex h-[64px] min-w-0 items-center justify-center ${light ? 'bg-white' : 'bg-menu-panel'} ${
                    i < g.logos.length - 1
                      ? `after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:border-r after:border-solid after:content-[''] ${
                          light ? 'after:border-[#E5E7EB]' : 'after:border-[#212121]'
                        }`
                      : ''
                  }`}
                >
                  <CustomerLogo
                    logo={l}
                    wrapClassName="w-full"
                    className="h-auto w-[calc(100%-12px)]"
                    pillTop="calc(100% - 7px)"
                    pillHeight={14}
                    variant={t.v}
                    mobile
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative pb-[14px] pt-[16px]">
        <a
          href={LINKS.customerStories}
          className={`nav-btn-spring inline-flex h-[42px] items-center gap-[4px] rounded-[6px] bg-brand-purple hover:bg-[rgba(94,76,255,0.7)] px-[20px] text-btn-light-bg no-underline ring-1 ring-inset ring-brand-purple-border ${btnLabel}`}
        >
          View all customer stories
          <img src="/assets/nav/arrow-up-right-white.svg" alt="" width={16} height={16} />
        </a>
        <PixelDeco color="purple" variant="stacked" />
      </div>
    </div>
  )
}

function ResourcesContent({ t }) {
  return (
    <div>
      <div className="pb-[8px] pt-[10px]">
        {[...RESOURCE_COL2, ...RESOURCE_COL3].map((it) => (
          <MenuItem key={it.title} item={it} fullWidth variant={t.v} />
        ))}
      </div>
      <div className="flex gap-[10px] p-[24px]">
        <a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className={`${lightBtn} flex-1 pl-[20px] pr-[12px]`}>
          Read Docs
          <Arrow />
        </a>
        <a href={LINKS.blog} className={`${lightBtn} flex-1 pl-[20px] pr-[12px]`}>
          Lightning posts
          <Arrow />
        </a>
      </div>
    </div>
  )
}

const SECTIONS = { product: ProductContent, customers: CustomersContent, resources: ResourcesContent }

// variant: 'dark' (homepage, default) | 'light' (inner pages). top: px offset under the announcement bar
// (SHARED §2: 40 on banner pages -> header 104); scroll-linked like the desktop nav (useChromeOffset).
export default function MobileNav({ onTalk, variant = 'dark', top = 0 }) {
  const light = variant === 'light'
  const t = T(light)
  const rootRef = useRef(null)
  useChromeOffset(rootRef, top)
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState(null) // single-open accordion

  const toggleSection = (id) => setSection((s) => (s === id ? null : id))
  const talk = () => {
    setMenuOpen(false)
    onTalk()
  }

  const accordion = (id, label, rule = true) => {
    const Content = SECTIONS[id]
    return (
      <div key={id}>
        <AccordionRow label={label} open={section === id} onClick={() => toggleSection(id)} rule={rule} t={t} />
        {/* live: section height springs 48 -> content (bounce 0, .3 s), content revealed by clipping;
            on collapse the content stays until the section has closed */}
        <div className="nav-acc" data-open={section === id} inert={section === id ? undefined : ''}>
          <div>
            <Content t={t} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <nav
      ref={rootRef}
      data-framer-name={light ? 'Phone' : 'Phone Dark'}
      data-nav-variant={variant}
      className={`nav-phone fixed inset-x-0 top-0 z-[11] flex flex-col overflow-hidden desk:hidden ${light ? 'bg-white' : 'bg-nav-bg'} ${
        menuOpen ? (top ? 'h-[calc(100vh-var(--nav-top,0px))]' : 'h-screen') : 'h-[64px]'
      }`}
      style={top ? { top } : undefined}
    >
      {/* §5.1 bar: 64 tall, padding 10/15/0/16, 1px line at y=63 */}
      <div className="relative box-border h-[64px] w-full shrink-0 pb-0 pl-[16px] pr-[15px] pt-[10px]">
        <div className="flex h-[44px] items-center">
          <a href={LINKS.home} className="block h-[42px] w-[113px] shrink-0" aria-label="Lightdash home">
            <img src={light ? '/assets/svg/lightdash-logo-dark.svg' : '/assets/svg/lightdash-logo-white.svg'} alt="Lightdash" width={113} height={42} className="block h-[42px] w-[113px]" />
          </a>
          <div className="ml-auto flex items-center gap-[10px]">
            {/* tablet-only cluster (hidden <810) */}
            <div className="hidden items-center gap-[14px] tab:flex">
              {/* live preset 1a5pi9a: hover #666d8099, transition color .2s cubic-bezier(.44,0,.56,1) */}
              <a
                href={LINKS.login}
                className="font-inter text-[15px] font-medium leading-[30px] tracking-[-0.15px] text-text-login-mobile no-underline transition-colors duration-200 ease-framer hover:text-[#666d8099]"
              >
                Login
              </a>
              <button
                type="button"
                onClick={talk}
                className={`nav-btn-spring h-[42px] cursor-pointer rounded-[6px] border-0 bg-btn-light-bg hover:bg-btn-light-bg-hover px-[20px] py-[12px] tracking-[-0.3px] text-btn-light-text ring-1 ring-inset ring-btn-light-border ${btnLabel}`}
              >
                Book a demo
              </button>
              <a
                href={LINKS.start}
                className={`flex h-[42px] items-center rounded-[6px] bg-brand-purple px-[20px] py-[12px] tracking-[-0.3px] text-text-white no-underline ring-1 ring-inset ring-brand-purple-border ${btnLabel}`}
              >
                Start for free
              </a>
            </div>
            {/* §5.1 hamburger: two 20×2 bars at 37.5%/62.5%; open → both at top 21px rotated ±45° */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative h-[44px] w-[44px] shrink-0 cursor-pointer border-0 bg-transparent p-0"
            >
              <span
                className={`nav-hamburger-bar absolute left-[calc(50%-10px)] h-[2px] w-[20px] rounded-[10px] ${light ? 'bg-[#1D293D]' : 'bg-hamburger-bar'} ${
                  menuOpen ? 'top-[21px] rotate-45' : 'top-[calc(37.5%-1px)]'
                }`}
              />
              <span
                className={`nav-hamburger-bar absolute left-[calc(50%-10px)] h-[2px] w-[20px] rounded-[10px] ${light ? 'bg-[#1D293D]' : 'bg-hamburger-bar'} ${
                  menuOpen ? 'top-[21px] -rotate-45' : 'top-[calc(62.5%-1px)]'
                }`}
              />
            </button>
          </div>
        </div>
        <div className={`absolute inset-x-0 top-[63px] h-px ${light ? 'bg-[#E5E7EB]' : 'bg-nav-border-mobile'}`} />
      </div>

      {/* §5.2 open menu */}
      {menuOpen && (
        <div className={`min-h-0 flex-1 overflow-auto ${light ? 'bg-white' : 'bg-nav-bg'}`}>
          {accordion('product', 'Product', false)}
          <a href={LINKS.pricing} className={`${rowBase} ${t.ruleTopBottom}`}>
            <span className={t.rowText}>Pricing</span>
          </a>
          {accordion('customers', 'Customers')}
          {accordion('resources', 'Resources')}
          <a href={LINKS.login} className={t.rowBox}>
            <span className={t.rowText}>Login</span>
          </a>
          <div className="flex gap-[10px] p-[24px] pt-[34px]">
            <button type="button" onClick={talk} className={`${lightBtn} flex-1 px-[20px]`}>
              Book a Demo
            </button>
            <a
              href={LINKS.start}
              className={`nav-btn-spring flex h-[40px] flex-1 items-center justify-center rounded-[6px] bg-btn-dark-mobile hover:bg-brand-purple px-[20px] text-text-white no-underline ${btnLabel}`}
            >
              Start for Free
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
