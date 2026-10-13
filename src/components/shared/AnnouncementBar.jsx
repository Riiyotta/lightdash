import SmartLink from './SmartLink.jsx'

// SHARED §1. Full-width link, 40 tall (39 on phone), bg #1A1B25.
// Britti Sans Medium 14/16, weight 400, ls 0.14px, #FFFFFF. Row gap 6, centred (phone: left, x=17).
export const ANNOUNCEMENT = {
  href: './blogpost/build-unlimited-chart-types-with-chart-studio',
  text: '⚡️ Build unlimited chart types with Chart Studio',
  mobileText: '⚡️ Build custom chart types in Lightdash',
  linkLabel: 'Learn how',
}

// "Vector 5363", 4×10 thin vertical rule. The asset was not downloaded (spec gap): drawn as a
// 1px white rule centred in a 4×10 box.
function Divider() {
  return (
    <svg width="4" height="10" viewBox="0 0 4 10" aria-hidden="true" className="block shrink-0">
      <path d="M2 0V10" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

// 16×16 "chevron-right-small". The banner icon was not downloaded; this reuses the triangle path of the
// same-named Framer icon saved at public/assets/cms/shared/chevron-right-small.svg (viewBox 4.445×6.667),
// centred in a 16×16 box, filled white.
function ChevronRightSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="block shrink-0">
      <path d="M 10.2225 8 L 5.7775 4.6665 L 5.7775 11.3335 Z" fill="#FFFFFF" />
    </svg>
  )
}

export default function AnnouncementBar({
  href = ANNOUNCEMENT.href,
  text = ANNOUNCEMENT.text,
  mobileText = ANNOUNCEMENT.mobileText,
  linkLabel = ANNOUNCEMENT.linkLabel,
  className = '',
}) {
  return (
    <SmartLink
      href={href}
      className={`flex h-[39px] w-full items-center justify-start bg-ld-dark pl-[17px] font-britti text-[14px] font-normal leading-[16px] tracking-[0.14px] text-white no-underline tab:h-[40px] tab:justify-center tab:pl-0 ${className}`}
    >
      <span className="flex flex-row items-center gap-[6px]">
        <span className="hidden whitespace-nowrap tab:inline">{text}</span>
        <span className="whitespace-nowrap tab:hidden">{mobileText}</span>
        <Divider />
        <span className="flex flex-row items-center pr-[17px] opacity-70">
          <span className="whitespace-nowrap">{linkLabel}</span>
          <ChevronRightSmall />
        </span>
      </span>
    </SmartLink>
  )
}
