import Button from './Button.jsx'
import SnakeGame from './SnakeGame.jsx'
import { Lines } from './Frame.jsx'

// SHARED §9 "Snake Game CTA" (+ legal-pages §4 breakpoints, cms-templates §1.6 /blog narrow variant).
const DEMO_URL = 'https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home'
const REGISTER_URL = 'https://app.lightdash.cloud/register'
const CORNER = '/assets/shared/Bsqpl1IRmGZ0SIiYnL7q3tzTD0.png' // 128×128, rendered 64×64 (40×40 on phone)

export const CTA_DEFAULTS = {
  title: ['Ready to free up', 'your data team?'],
  primary: { label: 'Talk to our team', tabletLabel: 'Sign up', href: './start' },
  secondary: { label: 'Start for free', href: REGISTER_URL },
  mobilePrimary: { label: 'Start for free', href: './start' },
  mobileSecondary: { label: 'Try live demo', href: DEMO_URL },
}

/**
 * Pre-footer CTA band with the Snake game. Place it as the last child inside <PageFrame>.
 * lines: hairlines of the band itself (solid #E5E7EB). "rl" by default, "trl" on pages that draw a top line.
 * narrow: /blog index variant (band 968 wide centred, panel 840, game ≈310).
 * cardMaxWidth: max width of the dark card (default 1152; bi-as-code / fintech use 1280 in a 1408 band).
 *
 * Live (measured 1440/1200/1000/810 on /terms-of-service, /pricing, /blog, /bi-as-code, /fintech): the band is a
 * fixed 473 tall with padding 64 and the 326 card centred vertically (73.5 above and below).
 * Phone (390): 358×492, padding 24/16, plain white background (the dotted-grid layer is 0 tall).
 */
export default function CtaBand({
  title = CTA_DEFAULTS.title,
  primary = CTA_DEFAULTS.primary,
  secondary = CTA_DEFAULTS.secondary,
  mobilePrimary = CTA_DEFAULTS.mobilePrimary,
  mobileSecondary = CTA_DEFAULTS.mobileSecondary,
  lines = 'rl',
  narrow = false,
  cardMaxWidth = 1152,
  className = '',
}) {
  const dashed = 'border-ld-footer-frame' // CTA guides: 1px dashed #36394A
  return (
    <section
      className={`ld-cta-grid relative w-full px-[16px] py-[24px] max-[809.98px]:!bg-white max-[809.98px]:!bg-none tab:flex tab:h-[473px] tab:flex-col tab:justify-center tab:p-[64px] ${narrow ? 'mx-auto max-w-[968px]' : ''} ${className}`}
    >
      {lines && <Lines sides={lines} />}
      <div
        className="relative mx-auto flex w-full shrink-0 flex-col overflow-hidden bg-ld-dark shadow-ld-cta-card tab:h-[326px] tab:flex-row"
        style={{ maxWidth: cardMaxWidth }}
      >
        {/* left pattern column (64) — phone: 40px top band */}
        <div className="relative h-[40px] w-full shrink-0 tab:h-auto tab:w-[64px]">
          <img src={CORNER} alt="" width={64} height={64} className="block h-[40px] w-[40px] object-cover tab:h-[64px] tab:w-[64px]" />
          <Lines sides="b" dashed color={dashed} className="tab:hidden" />
          <Lines sides="r" dashed color={dashed} className="hidden tab:block" />
        </div>

        {/* content: text column + game */}
        <div className="flex min-w-0 flex-1 flex-col tab:flex-row">
          <div className="relative flex h-[161px] shrink-0 flex-col items-center justify-center gap-[20px] px-[10px] tab:h-auto tab:w-[403px] tab:items-start tab:justify-start tab:gap-[24px] tab:px-0 tab:pt-[72px]">
            <h2 className="ld-cta-56 m-0 w-full text-center tab:w-[397.5px] tab:text-left">
              <span className="block">{title[0]}</span>
              <span className="block text-white/70 tab:text-white">{title[1]}</span>
            </h2>
            {/* ≥810 buttons */}
            <div className="hidden flex-row gap-[16px] tab:flex">
              <Button variant="sixth" href={primary.href}>
                <span className="min-[1000px]:hidden">{primary.tabletLabel ?? primary.label}</span>
                <span className="hidden min-[1000px]:inline">{primary.label}</span>
              </Button>
              <Button variant="seventh" href={secondary.href}>
                {secondary.label}
              </Button>
            </div>
            {/* phone buttons */}
            <div className="flex flex-row justify-center gap-[16px] tab:hidden">
              <Button variant="sixth" href={mobilePrimary.href}>
                {mobilePrimary.label}
              </Button>
              <Button variant="seventh" href={mobileSecondary.href}>
                {mobileSecondary.label}
              </Button>
            </div>
            {/* dashed guide between text and game (x=608 at 1440) */}
            <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-[400px] hidden border-l border-dashed tab:block ${dashed}`} />
          </div>

          {/* game stage: phone 203 tall under a dashed line; hidden 810–999; fills the rest ≥1000 */}
          <div className="relative h-[203px] w-full tab:h-auto tab:min-w-0 tab:flex-1 min-[810px]:max-[999.98px]:hidden">
            <Lines sides="t" dashed color={dashed} className="tab:hidden" />
            <SnakeGame className="h-full w-full" />
          </div>
        </div>

        {/* right pattern column (64) — phone: 40px bottom band */}
        <div className="relative h-[40px] w-full shrink-0 tab:h-auto tab:w-[64px]">
          <Lines sides="t" dashed color={dashed} className="tab:hidden" />
          <Lines sides="l" dashed color={dashed} className="hidden tab:block" />
        </div>
      </div>
    </section>
  )
}
