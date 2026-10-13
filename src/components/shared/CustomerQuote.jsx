import Button from './Button.jsx'
import { Lines } from './Frame.jsx'

// SHARED §7.6 "Customer Quote" (component "Customer Quote 2").
const SHARED = '/assets/shared'
export const QUOTE_DECOR = {
  topLeft: `${SHARED}/WaafmTzn2YxUMHu8nSSagFz3AVg.png`, // 24×24
  bottomRight: `${SHARED}/X5SDkd1yAACfVgQB3yQXbGxRPc.png`, // 72×72
  strip: '/assets/pages/context-layer/A5IcxyocQc5idj7qaqDwtAajEWY.png', // 96×24 (context-layer only)
}

/**
 * Live (measured 1440/810/390 on conversational-analytics, interactive-dashboards, data-apps, context-layer):
 * - section padding 112/0/80 (data-apps: none → `padded={false}`), dashed "1 1 0 1" frame.
 * - Quote Block: padding 72/64 (phone 56/28), gap 20, centred. With the 40px quote it is a fixed 450 tall at
 *   ≥810 and the logo + quote are centred vertically; the 32px variant (context-layer) is content height.
 * - Attribution: padding 28/80 (phone 28/32), space-between; phone stacks with gap 16 (32px variant: 20).
 *   Name + Title gap 2, single lines (no wrap); phone type: name Inter 16/26 w700 ls -0.32, role 16/24 ls -0.32.
 * - Photo: no CSS filter on any measured page (`grayscale` opt-in).
 * - Stats: dashed bottom+left cells (phone: bottom only); phone label 16/24 ls -0.32.
 * - Lines footer (context-layer): 8 rows 3/4/6/10/14/18/20/32 at opacity .6, solid #E5E7EB top line each
 *   (top+bottom on the last).
 *
 * @param logo      { src, alt, width?=100, height?=34 }
 * @param quote     node (quote-40 centred, w780; quoteSize '32' → quote-32)
 * @param person    { name, role, photo }  (photo 64×64)
 * @param cta       { label?='Read case study', href } — omit for no button
 * @param stats     [{ value, label }] — optional 3-cell statistics row
 * @param strip     optional extra decoration { src, width, height, className } (context-layer 96×24 strip)
 * @param linesFooter render the 8 stacked "converging lines" rows
 * @param grayscale apply filter: grayscale(1) to the photo (default off; live photos are unfiltered)
 * @param padded    section padding 112/0/80 (default); false = none (data-apps)
 */
const FOOTER_ROWS = [3, 4, 6, 10, 14, 18, 20, 32]
const PHONE = 'max-[809.98px]:text-[16px] max-[809.98px]:tracking-[-0.32px]'

export default function CustomerQuote({
  logo,
  quote,
  quoteSize = '40',
  person,
  cta,
  stats,
  strip,
  linesFooter = false,
  grayscale = false,
  padded = true,
  className = '',
}) {
  const q40 = quoteSize !== '32'
  return (
    <section className={`relative w-full bg-white ${padded ? 'pb-[80px] pt-[112px]' : ''} ${className}`}>
      <Lines sides="trl" dashed />
      {/* Quote Block */}
      <div
        className={`relative flex w-full flex-col items-center justify-center gap-[20px] px-[28px] py-[56px] tab:px-[64px] tab:py-[72px] ${q40 ? 'tab:h-[450px]' : ''}`}
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #F8FAFB 100%)' }}
      >
        <Lines sides="tb" dashed />
        <img src={QUOTE_DECOR.topLeft} alt="" width={24} height={24} className="pointer-events-none absolute left-0 top-0 h-[24px] w-[24px] object-cover" />
        <img src={QUOTE_DECOR.bottomRight} alt="" width={72} height={72} className="pointer-events-none absolute bottom-0 right-0 h-[72px] w-[72px] object-cover" />
        {strip && (
          <img src={strip.src} alt="" width={strip.width} height={strip.height} className={`pointer-events-none absolute object-cover ${strip.className ?? ''}`} style={{ width: strip.width, height: strip.height }} />
        )}
        {logo && (
          <div className="shrink-0 px-[28px]">
            <img src={logo.src} alt={logo.alt ?? ''} width={logo.width ?? 100} height={logo.height ?? 34} className="block object-cover" style={{ width: logo.width ?? 100, height: logo.height ?? 34 }} />
          </div>
        )}
        <blockquote className={`${q40 ? 'ld-quote-40' : 'ld-quote-32'} m-0 max-w-[780px] shrink-0 text-center`}>{quote}</blockquote>
      </div>

      {/* Attribution: 120 tall, padding 28/80, space-between, dashed bottom */}
      {person && (
        <div
          className={`relative flex flex-col items-start px-[32px] py-[28px] tab:min-h-[120px] tab:flex-row tab:items-center tab:justify-between tab:gap-0 tab:px-[80px] ${
            q40 ? 'gap-[16px]' : 'gap-[20px]'
          }`}
        >
          <div className="flex min-w-0 flex-row items-center gap-[16px]">
            {person.photo && (
              <div className="h-[64px] w-[64px] shrink-0 overflow-hidden">
                <img
                  src={person.photo}
                  alt={person.name}
                  width={64}
                  height={64}
                  className={`block h-[64px] w-[64px] object-cover ${grayscale ? 'grayscale' : ''}`}
                />
              </div>
            )}
            <div className="flex flex-col gap-[2px] whitespace-nowrap">
              <p className={`ld-name-20 m-0 ${PHONE}`}>{person.name}</p>
              <p className={`ld-caption-18 m-0 max-[809.98px]:leading-[24px] ${PHONE}`}>{person.role}</p>
            </div>
          </div>
          {cta && (
            <Button variant="v1-purple" href={cta.href} newTab={cta.newTab}>
              {cta.label ?? 'Read case study'}
            </Button>
          )}
          <Lines sides="b" dashed />
        </div>
      )}

      {/* Statistics: 3 cells, padding 36/32, gap 8, dashed bottom/left (phone: bottom) */}
      {stats?.length > 0 && (
        <div className="grid w-full grid-cols-1 tab:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="relative flex flex-col gap-[8px] px-[32px] py-[36px]">
              <p className="ld-stat-48 m-0">{s.value}</p>
              <p className={`ld-caption-18 m-0 max-[809.98px]:leading-[24px] ${PHONE}`}>{s.label}</p>
              <Lines sides="b" dashed className="tab:hidden" />
              <Lines sides="bl" dashed className="hidden tab:block" />
            </div>
          ))}
        </div>
      )}

      {linesFooter && (
        <div aria-hidden="true" className="flex w-full flex-col opacity-60">
          {FOOTER_ROWS.map((h, i) => (
            <div key={h} className="relative w-full" style={{ height: h }}>
              <Lines sides={i === FOOTER_ROWS.length - 1 ? 'tb' : 't'} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
