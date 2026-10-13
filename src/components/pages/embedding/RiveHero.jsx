import { useEffect, useRef } from 'react'
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from '@rive-app/canvas'
import riveWasmUrl from '@rive-app/canvas/rive.wasm?url'

// specs/product-pages.md §2.4 HeroImage: Rive canvas 1185×776 ("s3_a_001_lightdash_motion.riv"),
// autoplay, fit cover. The file's artboards / state machines can't be inspected from the spec, so the
// default artboard is used and its first state machine is started if it has one (else autoplay of the
// first timeline).
RuntimeLoader.setWasmUrl(riveWasmUrl)

export default function RiveHero({ src }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let r
    let ro
    try {
      r = new Rive({
        src,
        canvas,
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
        onLoad: () => {
          const machines = r.stateMachineNames
          if (machines?.length) {
            r.stop()
            r.play(machines[0])
          }
          r.resizeDrawingSurfaceToCanvas()
        },
      })
      ro = new ResizeObserver(() => r?.resizeDrawingSurfaceToCanvas())
      ro.observe(canvas)
    } catch {
      return undefined
    }
    return () => {
      ro?.disconnect()
      r?.cleanup()
    }
  }, [src])
  return (
    <canvas
      ref={canvasRef}
      width={1185}
      height={776}
      aria-hidden="true"
      className="block aspect-[1185/776] w-[1185px] max-w-full shrink-0"
    />
  )
}
