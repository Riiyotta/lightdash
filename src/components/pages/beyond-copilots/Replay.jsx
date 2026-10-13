import { useState } from 'react'
import { Button, Lines } from '../../shared/index.js'

// specs/product-pages.md §2.10 "Replay": 1100 wide (centred), padding 72/65, dashed bottom.
// Placeholder 970×545.6, bg #191923, radius 10, thumbnail + centred play button. On click the hidden
// YouTube iframe (absolute, fills the placeholder) is shown. Then the "After-video booking" row
// (padding 20/0, space-between): Britti Medium 20/28 ls −0.4 #36394A + purple "Start for free".
// Play button: not specced — YouTube-style 68×48 dark rounded rect with a white triangle, as seen in
// reference/pages/beyond-copilots-1440.png.
export default function Replay({ heading, caption, thumbnail, embed, booking, bookingCta }) {
  const [playing, setPlaying] = useState(false)
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col px-[24px] py-[56px] tab:px-[65px] tab:py-[72px]">
        <h2 className="ld-h2-48 m-0">{heading}</h2>
        <p className="ld-caption-18 m-0 max-w-[640px] pt-[16px]">{caption}</p>
        <div className="relative mt-[20px] aspect-[970/545.6] w-full overflow-hidden rounded-[10px] bg-[#191923]">
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0"
            >
              <img src={thumbnail} alt="" className="block h-full w-full object-cover" />
              <span className="absolute left-1/2 top-1/2 flex h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[12px] bg-[rgba(33,33,33,0.8)]">
                <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true">
                  <path d="M0 0l20 11L0 22z" fill="#FFFFFF" />
                </svg>
              </span>
            </button>
          )}
          <iframe
            src={playing ? `${embed.replace('autoplay=0', 'autoplay=1')}` : embed}
            title={heading}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            style={{ display: playing ? 'block' : 'none' }}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start gap-[16px] py-[20px] tab:flex-row tab:items-center tab:justify-between">
          <p className="m-0 font-britti text-[20px] font-medium leading-[28px] tracking-[-0.4px] text-ld-ink-700">{booking}</p>
          <Button variant="v1-purple" href={bookingCta.href}>
            {bookingCta.label}
          </Button>
        </div>
      </div>
      <Lines sides="b" dashed />
    </section>
  )
}
