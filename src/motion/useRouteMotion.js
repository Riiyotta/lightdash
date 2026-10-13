import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SPRING_B0_D04, SPRING_B0_D06, SPRING_B02_D04 } from './curves.js'

// Load ("appear") motion for inner pages, measured on www.lightdash.com (Framer appear animations, read from
// #__framer__appearAnimationsContent + document.getAnimations()). Runs in a layout effect keyed on the
// pathname, i.e. after the new page is committed but before it is painted, so every client-side navigation
// replays the motion exactly like a fresh page load on live. Elements are driven through WAAPI with the
// same sampled spring keyframes Framer ships (fill: both, so the from-state holds during the delay).
//
// Which pages animate what is NOT uniform on live — only these routes have appear animations:
//   hero fade   opacity .001 → 1, spring bounce .2 / .4 s, delay 0
//     'wide': the Hero frame on live also wraps the "Trusted by" heading + logos → [data-hero] + next sibling
//     'text': the Hero frame on live is only spacer → title → subtitle → buttons → 56 spacer (the HeroImage
//             sits outside it and does not fade) → [data-hero] children except the last (image block)
//   pixel drop  [data-hero-pixel][data-pixel-drop]: translateY(drop px) → 0, spring bounce 0 / .6 s, delay 1 s,
//               all together (no stagger), opacity stays 1
//   roadmap     [data-roadmap-pixel]: translateX(-16px) → 0, spring bounce 0 / .4 s; delay per tile from its
//               position in its 5-tile strip, left → right: left strips 1.0…1.4 s, right strips 1.3…1.7 s
const PAGES = {
  '/conversational-analytics': { hero: 'wide', drop: true },
  '/context-layer': { hero: 'wide', drop: true },
  '/data-apps': { hero: 'wide', drop: true },
  '/interactive-dashboards': { hero: 'wide', drop: true },
  '/embedding': { hero: 'text', drop: true },
  '/self-improving-analytics': { hero: 'text', drop: true },
  '/metrics-catalog': { drop: true },
  '/integrations': { drop: true },
  '/startups': { drop: true },
  '/jp': { drop: true },
  '/roadmap': { roadmap: true },
}

const frames = (curve, fn) => curve.map((p) => fn(p))

function heroTargets(mode) {
  const out = []
  for (const hero of document.querySelectorAll('[data-hero]')) {
    if (mode === 'wide') {
      out.push(hero)
      if (hero.nextElementSibling) out.push(hero.nextElementSibling)
    } else {
      const kids = [...hero.children]
      out.push(...(kids.length > 1 ? kids.slice(0, -1) : kids))
    }
  }
  return out
}

// tiles: inline style { top, left | right } (Roadmap.jsx). Group into strips by top + side; rank left → right.
function roadmapDelays(tiles) {
  const strips = new Map()
  for (const el of tiles) {
    const right = el.style.right !== '' && el.style.left === ''
    const key = `${el.style.top}|${right ? 'r' : 'l'}`
    const x = right ? -parseFloat(el.style.right) : parseFloat(el.style.left)
    if (!strips.has(key)) strips.set(key, [])
    strips.get(key).push({ el, x, right })
  }
  const delays = new Map()
  for (const list of strips.values()) {
    list.sort((a, b) => a.x - b.x)
    list.forEach((t, i) => delays.set(t.el, (t.right ? 1300 : 1000) + 100 * i))
  }
  return delays
}

export default function useRouteMotion() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const cfg = PAGES[path]
    if (!cfg || typeof document === 'undefined' || !Element.prototype.animate) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const running = []
    const done = new WeakSet()
    const play = (el, keyframes, opts) => {
      if (done.has(el)) return
      done.add(el)
      running.push(el.animate(keyframes, { fill: 'both', easing: 'linear', ...opts }))
    }

    const run = () => {
      if (cfg.hero) {
        const kf = frames(SPRING_B02_D04, (p) => ({ opacity: 0.001 + 0.999 * p }))
        for (const el of heroTargets(cfg.hero)) play(el, kf, { duration: 400 })
      }
      if (cfg.drop) {
        for (const el of document.querySelectorAll('[data-hero-pixel][data-pixel-drop]')) {
          const d = parseFloat(el.getAttribute('data-pixel-drop')) || 0
          if (!d) continue
          play(el, frames(SPRING_B0_D06, (p) => ({ transform: `translateY(${(d * (1 - p)).toFixed(4)}px)` })), { duration: 600, delay: 1000 })
        }
      }
      if (cfg.roadmap) {
        const tiles = [...document.querySelectorAll('[data-roadmap-pixel]')]
        const delays = roadmapDelays(tiles)
        const kf = frames(SPRING_B0_D04, (p) => ({ transform: `translateX(${(-16 * (1 - p)).toFixed(4)}px)` }))
        for (const el of tiles) play(el, kf, { duration: 400, delay: delays.get(el) ?? 1000 })
      }
    }

    run()
    // safety net for anything the page mounts a frame late
    const raf = requestAnimationFrame(run)
    return () => {
      cancelAnimationFrame(raf)
      for (const a of running) a.cancel()
    }
  }, [pathname])
}

export function RouteMotion() {
  useRouteMotion()
  return null
}
