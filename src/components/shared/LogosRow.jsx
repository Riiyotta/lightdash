import { Lines } from './Frame.jsx'

// SHARED §7.1 "Heading" (logos caption) + §7.2 "Logos" static 6-column grid. No marquee, no hover.
const L = '/assets/shared/logos'

export const DEFAULT_LOGOS = [
  { alt: 'Kraken', src: `${L}/logo-kraken.svg`, width: 87, height: 15 },
  { alt: 'octopus energy', src: `${L}/logo-octopus-energy.svg`, width: 124, height: 17 },
  { alt: 'workday', src: `${L}/logo-workday.svg`, width: 66, height: 26 },
  { alt: 'JustWatch', src: `${L}/logo-justwatch.png`, width: 111, height: 18.1 },
  { alt: 'Adobe', src: `${L}/logo-adobe.svg`, width: 85, height: 22 },
  {
    alt: 'fal',
    gap: 8,
    parts: [
      { src: `${L}/logo-fal-icon.svg`, width: 17, height: 16 },
      { src: `${L}/logo-fal-wordmark.svg`, width: 23, height: 17 },
    ],
  },
]

function Logo({ logo }) {
  if (logo.parts) {
    return (
      <span className="flex flex-row items-center" style={{ gap: logo.gap ?? 8 }} role="img" aria-label={logo.alt}>
        {logo.parts.map((p, i) => (
          <img key={i} src={p.src} alt="" width={p.width} height={p.height} className="block object-cover" style={{ width: p.width, height: p.height }} />
        ))}
      </span>
    )
  }
  return <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="block object-cover" style={{ width: logo.width, height: logo.height }} />
}

/**
 * @param caption       optional heading text above the grid (caption-18, 87.4 tall, padding 32/0)
 * @param logos         [{ src, alt, width, height }] or [{ alt, parts:[{src,width,height}], gap }]
 * @param fixedColumns  keep 6 columns at every width (self-improving-analytics)
 */
export default function LogosRow({ caption, logos = DEFAULT_LOGOS, fixedColumns = false, className = '' }) {
  const cols = fixedColumns ? 'grid-cols-6' : 'grid-cols-2 tab:grid-cols-3 min-[1200px]:grid-cols-6'
  return (
    <div className={`relative w-full bg-white ${className}`}>
      {caption && (
        <div className="relative flex w-full justify-center px-[24px] py-[32px]">
          <p className="ld-caption-18 m-0 text-center">{caption}</p>
          <Lines sides="rl" />
        </div>
      )}
      <div className={`relative grid w-full py-[24px] ${cols}`}>
        {logos.map((logo) => (
          <div key={logo.alt} className="relative flex h-[64px] min-w-0 items-center justify-center">
            <div className="flex h-[64px] w-[161px] max-w-full flex-col items-center justify-center gap-[8px] overflow-hidden">
              <Logo logo={logo} />
            </div>
          </div>
        ))}
        <Lines sides="trbl" />
      </div>
    </div>
  )
}
