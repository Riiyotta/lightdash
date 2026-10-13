import Block from './Block.jsx'

// specs/product-pages.md §2.7 "Video Section": 1280×821, padding 40, solid border 0 1 1 1.
// Background: linear-gradient(180deg,#F8FAFB,rgba(248,250,251,0)) over the dotted pattern (cover).
// <video> 1080×741: controls, loop, NOT autoplay, NOT muted, playsInline, preload=metadata, cover, no radius.
export default function VideoSection({ src, pattern }) {
  return (
    <Block
      lines="rbl"
      className="flex justify-center p-[16px] tab:p-[40px]"
      style={{ background: `linear-gradient(180deg, #F8FAFB, rgba(248,250,251,0)), url(${pattern}) center / cover no-repeat` }}
    >
      <video
        src={src}
        controls
        loop
        playsInline
        preload="metadata"
        className="block aspect-[1080/741] w-[1080px] max-w-full object-cover"
      />
    </Block>
  )
}
