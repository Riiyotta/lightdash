import { useEffect, useRef } from 'react'
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from '@rive-app/canvas'
import riveWasmUrl from '@rive-app/canvas/rive.wasm?url'

// specs/company-pages.md §4.2 HeroImage device frame: 956×547, bg rgba(208,210,214,.8), radius 24,
// padding 12/10, clip → 936×523 radius-12 clip holding the Rive canvas (941×522).
// Rive: artboard "dashboard", state machine "main_interaction", fit cover, alignment center, autoplay,
// pointer events handled by the file (bar_chart_hover etc.).
RuntimeLoader.setWasmUrl(riveWasmUrl)

const SRC = '/assets/pages/startups/lightdash-motion-dashboard-8RgDUjdkC7xmQytT53AmJUGvms.riv'

export default function RiveDashboard() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let r
    try {
      r = new Rive({
        src: SRC,
        canvas,
        artboard: 'dashboard',
        stateMachines: 'main_interaction',
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
        onLoad: () => r.resizeDrawingSurfaceToCanvas(),
      })
    } catch {
      return undefined
    }
    const onResize = () => r?.resizeDrawingSurfaceToCanvas()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      r?.cleanup()
    }
  }, [])

  return (
    <div className="w-[956px] max-w-full shrink-0 overflow-clip rounded-[24px] bg-[rgba(208,210,214,0.8)] px-[10px] py-[12px]">
      <div className="relative h-[523px] w-full overflow-clip rounded-[12px]">
        <canvas ref={canvasRef} className="absolute left-1/2 top-0 block h-[522px] w-[941px] -translate-x-1/2" />
      </div>
    </div>
  )
}
