import { useEffect } from 'react'
import useCalInline from './shared/useCalInline.js'

// The Cal card content: embed.js inline (namespace "talk-modal"); a bare iframe stays blank until the
// embed handshake, see useCalInline.
function CalInline() {
  const ref = useCalInline('talk-modal')
  return <div ref={ref} className="h-full w-full" />
}

// §4 "Talk to our team" modal. Backdrop z10 sits under the nav (z11).
// Positioner: top 104 under the desktop nav (64 under the phone nav – not specified, see report),
// padding 20px 0, centered. Frame 1000×620, padding 32/24, rgba(0,0,0,.6).
// Card 700×556 white with the Cal.com inline embed (lightdash/talk, month_view, light).
// Motion (live): backdrop shows/hides instantly (Framer tween duration 0); frame fades .001->1 over .15 s
// and the card over .2 s, both cubic-bezier(.44,0,.56,1), no scale; closing unmounts instantly.
export default function TalkModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-10 bg-modal-overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed inset-x-0 top-[64px] z-10 box-border flex h-[calc(100vh-64px)] items-center justify-center overflow-clip py-[20px] desk:top-[104px] desk:h-[calc(100vh-104px)]"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Talk to our team"
          className="talk-frame box-border flex h-[620px] max-h-full w-[1000px] max-w-full items-center justify-center bg-modal-overlay px-[24px] py-[32px]"
        >
          <div
            className="talk-card h-[556px] max-h-full w-[700px] max-w-full overflow-scroll bg-modal-card [box-shadow:rgba(0,0,0,0.25)_0px_1px_2px_0px]"
            onClick={(e) => e.stopPropagation()}
          >
            <CalInline />
          </div>
        </div>
      </div>
    </>
  )
}
