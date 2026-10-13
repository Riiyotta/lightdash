import { Lines } from './Frame.jsx'

// SHARED §8 "Split Content": 1280×464, padding 72/65, gap 32. Left: h2-48 (w551) + lead-18 (w551),
// 16 apart (measured on context-layer), vertically centred against the image. Right: image 551×320 cover.

/**
 * @param heading, lead  nodes
 * @param image          src; imageAlt
 * @param lines          optional section hairlines (e.g. "rl")
 */
export default function SplitRow({ heading, lead, image, imageAlt = '', lines, className = '' }) {
  return (
    <section className={`relative flex w-full flex-col gap-[32px] bg-white px-[24px] py-[72px] tab:min-h-[464px] tab:flex-row tab:items-center tab:justify-between tab:px-[65px] ${className}`}>
      {lines && <Lines sides={lines} />}
      <div className="flex w-full flex-col gap-[16px] tab:max-w-[551px]">
        {heading && <h2 className="ld-h2-48 m-0">{heading}</h2>}
        {lead && <p className="ld-lead-18 m-0">{lead}</p>}
      </div>
      {image && (
        <img src={image} alt={imageAlt} className="block aspect-[551/320] w-full object-cover tab:h-[320px] tab:w-[551px] tab:shrink" />
      )}
    </section>
  )
}
