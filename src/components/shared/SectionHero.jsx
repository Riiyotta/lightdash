import Button from './Button.jsx'
import { Lines } from './Frame.jsx'

// SHARED §7.1 centred product Hero: top spacer with pixel squares → H1 → subtitle → buttons →
// 56 spacer (dashed bottom) → HeroImage (dashed bottom).
//
// MOTION (not implemented here, Animation agent): the whole hero fades opacity .001 → 1 on load
// (spring bounce .2, .4 s) and every pixel square drops in from translateY(data-pixel-drop px) → 0
// (spring bounce 0, .6 s, delay 1 s, no stagger). Hooks: [data-hero] and [data-hero-pixel][data-pixel-drop].

const SHARED = '/assets/shared'
export const REGISTER_URL = 'https://app.lightdash.cloud/register'

/** Cluster coordinates relative to the hero's top-left corner in the 1280 frame (SHARED §7.1). */
export const HERO_PIXEL_POSITIONS = {
  left: [
    [0, 0],
    [32, 32],
    [0, 64],
    [64, 0],
  ],
  leftExtra: [[128, 0]],
  right: [
    [1184, 0],
    [1216, 32],
    [1248, 0],
    [1248, 64],
  ],
  rightExtra: [[1120, 0]],
}

/** Shared pixel files (SHARED §7.1). Per-page assignment of file → position is in product-pages.md. */
export const HERO_PIXEL_SETS = {
  purple: ['yGf6glYNCy9vFPbhqRvK3HFGibw.png', 'uB7eivLm76XmEcwSoR7NdFWfE9w.png', 'uAlfjPfpO9rjiU9CV9steG7Ythg.png', 'fBtVNQ5ztQ8ixYw2hMZjUaHn3TI.png'].map(
    (f) => `${SHARED}/${f}`,
  ),
  lavender: ['u7dNRCA7eBT5ijuB3LwSSfJMPw.png', '1mJCqq22wlHJTEtL6wg98s8lIc8.png', '1kZ2cjGoFa40wKm8T64QebKfrR8.png', '1dXtMtg8ao6Uylqs5vsrxyDAmvM.png'].map(
    (f) => `${SHARED}/${f}`,
  ),
}

export const HERO_GLOW = `${SHARED}/cSMwpvaQWkHp3Yhk4eEhvPwj4.png`

export const HERO_BUTTONS = [
  { label: 'Talk to our team', href: './start', variant: 'third' },
  { label: 'Start for free', href: REGISTER_URL, variant: 'fourth' },
]

/**
 * Pixel square. x ≥ 640 is treated as part of the right cluster and anchored to the frame's right
 * edge (so it follows the frame below 1280). On phones only the y=0 squares of the left cluster are
 * shown (reference/pages/*-390.png).
 */
function HeroPixel({ src, x, y, size = 32, drop = -32 }) {
  const right = x >= 640
  const pos = right ? { right: 1280 - x - size, top: y } : { left: x, top: y }
  const phone = !right && y === 0
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      data-hero-pixel=""
      data-pixel-drop={drop}
      className={`pointer-events-none absolute object-cover ${phone ? 'block' : 'hidden tab:block'}`}
      style={{ ...pos, width: size, height: size }}
    />
  )
}

/**
 * @param pixels       [{ src, x, y, size?=32, drop?=-32 }] — positions from HERO_PIXEL_POSITIONS
 * @param title        node (wrap accent words in <span className="text-brand-purple">)
 * @param titleVariant '72' (display-72, w1024) | '56' (display-56, dashed top line)
 * @param titleClassName  e.g. "text-ld-dark" (bi-as-code #0D0D12 → "text-ld-ink-strong", beyond-copilots "text-black")
 * @param subtitle     node; subtitleWidth px (measured 475–498)
 * @param buttons      [{ label, href, variant, newTab? }] (default Third + Fourth)
 * @param image        HeroImage contents (img / iframe / svg / Rive …); omit to skip the image block
 * @param imagePadding CSS padding of the HeroImage block, e.g. "48px 24px 0" (conv-analytics)
 * @param imageBackground CSS background (default: lavender glow cover); pass null for none
 * @param imageHeight  px height of the HeroImage block (else content height)
 * @param spacerHeight px height of the dashed spacer between the buttons and the HeroImage (default 56;
 *                     0 = no spacer, e.g. data-apps where the image block follows the buttons directly)
 */
export default function SectionHero({
  pixels = [],
  title,
  titleVariant = '72',
  titleClassName = '',
  subtitle,
  subtitleWidth = 498,
  subtitleClassName = '',
  buttons = HERO_BUTTONS,
  image,
  imagePadding = '0 24px',
  imageBackground = `url(${HERO_GLOW}) center / cover no-repeat`,
  imageHeight,
  imageClassName = '',
  spacerHeight = 56,
  className = '',
}) {
  return (
    <section data-hero="" className={`relative flex w-full flex-col items-center bg-white ${className}`}>
      {/* top spacer (100) holding the pixel clusters */}
      <div className="relative h-[60px] w-full shrink-0 tab:h-[100px]">
        {pixels.map((p, i) => (
          <HeroPixel key={i} {...p} />
        ))}
      </div>

      {/* title block: flex column gap 10, centred */}
      <div className="relative flex w-full flex-col items-center gap-[10px] px-[24px] tab:px-0">
        {titleVariant === '56' && <Lines sides="t" dashed />}
        <h1
          className={`m-0 w-full max-w-[1024px] text-center ${titleVariant === '56' ? 'ld-display-56' : 'ld-display-72'} ${titleClassName}`}
        >
          {title}
        </h1>
      </div>

      {subtitle && (
        // live: Subtitle starts flush under Title (no 1px gap) on every page measured
        <div className="flex w-full justify-center px-[24px] py-[24px] tab:px-0">
          <p className={`ld-lead-18 m-0 text-center ${subtitleClassName}`} style={{ maxWidth: subtitleWidth }}>
            {subtitle}
          </p>
        </div>
      )}

      {buttons?.length > 0 && (
        <div className="flex flex-row flex-wrap justify-center gap-[16px] pb-px pl-[4px]">
          {buttons.map((b) => (
            <Button key={b.label} variant={b.variant} href={b.href} newTab={b.newTab}>
              {b.label}
            </Button>
          ))}
        </div>
      )}

      {/* spacer (56 by default), dashed bottom */}
      {spacerHeight > 0 && (
        <div className="relative w-full shrink-0" style={{ height: spacerHeight }}>
          <Lines sides="b" dashed />
        </div>
      )}

      {image && (
        <div
          className={`relative flex w-full justify-center overflow-hidden ${imageClassName}`}
          style={{ padding: imagePadding, background: imageBackground ?? undefined, height: imageHeight }}
        >
          {image}
          <Lines sides="b" dashed />
        </div>
      )}
    </section>
  )
}
