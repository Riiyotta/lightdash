// §3.3 logo link (160×40, object-fit cover) with optional "Read case study" pill centered under it.
// Pill: padding 0 8, bg #0C0C0C, radius 4, 1px inset border rgba(255,255,255,.2) (live ::after), label Inter 9/9 600 ls −0.28 rgba(255,255,255,.55).
// Light (live-measured on inner pages): logos are the #333742 artwork in /assets/nav/customers-light/ (the phone menu
// uses its own fal / inDrive files), pill bg #FFF, 1px #C1C7D0, label #666D80; hover handled in index.css.
const LIGHT_MOBILE_ONLY = ['fal', 'indrive']
const lightSrc = (src, mobile) => {
  const out = src.replace('/customers/', '/customers-light/')
  const slug = out.split('/').pop().replace('.svg', '')
  return mobile && LIGHT_MOBILE_ONLY.includes(slug) ? out.replace('.svg', '-mobile.svg') : out
}

export default function CustomerLogo({ logo, className = 'h-[40px] w-[160px] object-cover', pillTop = '100%', pillHeight = 16, wrapClassName = '', variant = 'dark', mobile = false }) {
  const light = variant === 'light'
  return (
    <a href={logo.href} className={`relative flex items-center justify-center no-underline ${wrapClassName}`}>
      <img src={light ? lightSrc(logo.src, mobile) : logo.src} alt={logo.name} className={className} />
      {logo.caseStudy && (
        <span className="absolute left-1/2 flex w-[160px] -translate-x-1/2 justify-center" style={{ top: pillTop, height: pillHeight }}>
          <span
            className={`flex h-full items-center rounded-[4px] ring-1 ring-inset px-[8px] font-inter text-[9px] font-semibold leading-[9px] tracking-[-0.28px] ${
              light ? 'bg-white ring-[#C1C7D0] text-[#666D80]' : 'bg-menu-panel ring-white/20 text-pill-label'
            }`}
          >
            Read case study
          </span>
        </span>
      )}
    </a>
  )
}
