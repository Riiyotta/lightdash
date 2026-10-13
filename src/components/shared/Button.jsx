import SmartLink from './SmartLink.jsx'

// SHARED §5 "Button Multi Variant". Radius 6, flex row centred, label btn-15 (Inter 15/18 w500).
// Border = inset 1px (Framer ::after), drawn here as an inset box-shadow so it takes no layout.
// Hover: spring bounce .2 / .4 s (.ld-btn-spring).
const BASE = 'ld-btn-15 ld-btn-spring inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[6px] no-underline'

const VARIANTS = {
  // bg #FFF + 1px #DFE1E7, text #272835 -> hover bg #1A1B25, no border, text #FFF
  primary:
    'h-[40px] gap-[4px] px-[20px] bg-white text-btn-light-text shadow-[inset_0_0_0_1px_theme(colors.btn-light-border)] hover:bg-ld-dark hover:text-white hover:shadow-none',
  // transparent + 1px #666D80, text #FFF -> hover bg #666D80
  secondary: 'h-[40px] gap-[4px] px-[20px] bg-transparent text-white shadow-[inset_0_0_0_1px_#666D80] hover:bg-ld-body',
  // bg #1A1B25, text #FFF, padding 0 20, 40 tall -> hover bg #5E4CFF (measured)
  third: 'h-[40px] gap-[4px] px-[20px] bg-ld-dark text-white hover:bg-brand-purple',
  // bg #F8FAFB + 1px #DFE1E7, text #272835 -> hover #ECEFF3 (measured)
  fourth:
    'h-[40px] gap-[4px] px-[20px] bg-btn-light-bg text-btn-light-text shadow-[inset_0_0_0_1px_theme(colors.btn-light-border)] hover:bg-btn-light-bg-hover',
  // bg #5E4CFF, text #F8FAFB -> hover rgba(94,77,255,.7)
  fifth: 'h-[40px] gap-[4px] px-[20px] bg-brand-purple text-btn-light-bg hover:bg-ld-purple-77-70',
  // CTA primary: padding 16/32 (50 tall); phone 8/12 (40 tall) -> hover rgba(94,76,255,.7)
  sixth:
    'h-[40px] gap-[4px] px-[12px] py-[8px] tab:h-[50px] tab:px-[32px] tab:py-[16px] bg-brand-purple text-btn-light-bg hover:bg-ld-purple-70',
  // CTA secondary: bg rgba(94,76,255,.2), text #B4ACFF -> hover bg rgba(94,76,255,.6), text #DDD9FA
  seventh:
    'h-[40px] gap-[4px] px-[12px] py-[8px] tab:h-[50px] tab:px-[32px] tab:py-[16px] bg-ld-purple-20 text-ld-seventh-text hover:bg-ld-purple-60 hover:text-ld-seventh-text-hover',
  // "Variant 1" purple: #5E4CFF + 1px #4835F2, text #FFF ls -0.3, padding 12/20 (42 tall), gap 8. No hover measured.
  'v1-purple':
    'h-[42px] gap-[8px] px-[20px] py-[12px] tracking-[-0.3px] bg-brand-purple text-white shadow-[inset_0_0_0_1px_theme(colors.brand-purple-border)]',
  // "Variant 1" light: #F8FAFB + 1px #DFE1E7, text #272835 ls -0.3, padding 12/20. No hover measured.
  'v1-light':
    'h-[42px] gap-[8px] px-[20px] py-[12px] tracking-[-0.3px] bg-btn-light-bg text-btn-light-text shadow-[inset_0_0_0_1px_theme(colors.btn-light-border)]',
}

export const BUTTON_VARIANTS = Object.keys(VARIANTS)

/**
 * <Button variant="third" href="./start">Talk to our team</Button>
 * href: "./x" or "/x" -> client-side Link; "https://..." -> <a>; none -> <button>.
 */
export default function Button({ variant = 'third', href, newTab, onClick, icon, className = '', children, type = 'button', ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant] ?? VARIANTS.third} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  )
  if (href) {
    return (
      <SmartLink href={href} newTab={newTab} onClick={onClick} className={cls} {...rest}>
        {content}
      </SmartLink>
    )
  }
  return (
    <button type={type} onClick={onClick} className={`${cls} cursor-pointer border-0`} {...rest}>
      {content}
    </button>
  )
}
