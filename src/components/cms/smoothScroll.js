// cms-templates §1.9: TOC click → smooth scroll (≈800 ms, ease-out); target lands 100 px from the viewport top.
export const TOC_OFFSET = 100

let raf = 0
export function scrollToElement(el, { offset = TOC_OFFSET, duration = 800 } = {}) {
  if (!el) return
  cancelAnimationFrame(raf)
  const start = window.scrollY
  const target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
  const dist = target - start
  const t0 = performance.now()
  const easeOut = (t) => 1 - Math.pow(1 - t, 3)
  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + dist * easeOut(t))
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}
