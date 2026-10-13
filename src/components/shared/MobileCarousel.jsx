import { useCallback, useEffect, useRef, useState } from 'react'
import './mobile-carousel.css'

// Phone (<810) swipe carousel used by FeatureCards (`mobileCarousel`). Measured live at 390 on
// /conversational-analytics (2x2), /embedding (3x2), /interactive-dashboards (3x2 images + 1x3):
//   section padding 72/0/48, gap 20; "Carousel Viewport" 358×400 overflow clip; the scrolling "Cards" row is
//   420 tall (scrollbar hidden under the clip), flex gap 20, scroll-snap x mandatory, scroll-padding-left 24,
//   first card at x=24; cards 280×400 snap start, 1px solid #E5E7EB all round.
//   "Swipe Dots" row 24 tall, padding-top 4: 20×20 buttons (padding 6, gap 8) holding an 8×8 round dot,
//   active #5E4CFF / inactive #D1D5DB, transition background .2s; aria-label "Go to slide n".
// Layout lives in mobile-carousel.css (.ld-mcar*); this file only tracks the active slide.

const STEP_GAP = 20

export function useMobileCarousel(count) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const onScroll = () => {
      const card = track.firstElementChild
      const step = (card?.getBoundingClientRect().width || 280) + STEP_GAP
      setActive(Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / step))))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [count])
  const go = useCallback((i) => {
    const track = trackRef.current
    const card = track?.children[i]
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.firstElementChild.offsetLeft, behavior: 'smooth' })
  }, [])
  return { trackRef, active, go }
}

export function CarouselDots({ count, active, onGo, className = '' }) {
  return (
    <div className={`flex h-[24px] w-full justify-center pt-[4px] tab:hidden ${className}`}>
      <div className="flex flex-row gap-[8px]">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => onGo(i)}
            className="box-border flex h-[20px] w-[20px] cursor-pointer items-center justify-center border-0 bg-transparent p-[6px]"
          >
            <span
              className={`block h-[8px] w-[8px] rounded-[50%] transition-[background] duration-200 ${i === active ? 'bg-brand-purple' : 'bg-[#D1D5DB]'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
