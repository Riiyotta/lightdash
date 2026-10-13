import { Lines } from '../../shared/index.js'

// 48×48 logo tile: 1px solid #DFE1E7, shadow 0 0 0 5px rgba(39,40,53,.05), overflow clip (shared with /jp)
export default function LogoTile({ src, name }) {
  return (
    <div className="flex flex-col items-center gap-[19px] text-center">
      <div className="relative h-[48px] w-[48px] shrink-0 overflow-clip bg-white shadow-[0_0_0_5px_rgba(39,40,53,0.05)]">
        <img src={src} alt="" width={48} height={48} className="block h-[48px] w-[48px] object-cover" />
        <Lines sides="trbl" color="border-[#DFE1E7]" />
      </div>
      <p className="m-0 whitespace-nowrap font-inter text-[14px] leading-[19.88px] tracking-[-0.28px] text-ld-ink-700">{name}</p>
    </div>
  )
}
