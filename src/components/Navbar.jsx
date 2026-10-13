import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import MenuItem from './MenuItem.jsx'
import FeatureCard from './FeatureCard.jsx'
import CustomerLogo from './CustomerLogo.jsx'
import PixelDeco from './PixelDeco.jsx'
import { Rive, Layout, Fit, Alignment, RuntimeLoader } from '@rive-app/canvas'
import riveWasmUrl from '@rive-app/canvas/rive.wasm?url'
import {
  LINKS,
  PRODUCT_ITEMS,
  PLATFORM_ITEMS,
  PRODUCT_CARDS,
  RESOURCE_CARDS,
  RESOURCE_COL2,
  RESOURCE_COL3,
  CUSTOMER_GROUPS,
} from '../navData.js'

/* ------------------------------------------------------------------ */
/* §3.5 mega-menu motion, measured on the live site (per-rAF polling) and  */
/* confirmed against the Framer NavBar transitions:                        */
/* - the dropdown layer rests at 100 px tall (invisible) when closed;      */
/* - target variant "Dark Product" / "Dark Resources": spring bounce .2,   */
/*   duration .3 (k 898.9, c 47.97 -> w 29.98, zeta .8): 100->422 peaks     */
/*   ~427 at ~175 ms, settles ~315 ms;                                      */
/* - target "Dark Customers" or closed "Dark": spring k 400, c 40 (w 20,   */
/*   zeta 1, no overshoot), e.g. close 422->100 in ~420 ms;                 */
/* - the Overlay (panel + dim area) opacity rides the same spring (0<->1,  */
/*   clamped), so it reads 0->1 in ~150 ms on open and fades with the       */
/*   collapse on close.                                                     */
/* ------------------------------------------------------------------ */
const CLOSED_H = 100
const SPRING_OPEN = { w: 29.98, z: 0.8 } // Product, Resources
const SPRING_SOFT = { w: 20, z: 1 } // Customers, close

function useMegaMotion(wrapRef, overlayRef, target, active, onRest) {
  const s = useRef({ x: CLOSED_H, v: 0, o: 0, ov: 0, raf: 0 })
  const restRef = useRef(onRest)
  restRef.current = onRest

  useEffect(() => {
    const st = s.current
    const wrap = wrapRef.current
    const overlay = overlayRef.current
    cancelAnimationFrame(st.raf)
    const { w, z } = active === 'product' || active === 'resources' ? SPRING_OPEN : SPRING_SOFT
    const k = w * w
    const c = 2 * z * w
    const oTarget = active ? 1 : 0
    const paint = () => {
      const o = Math.min(1, Math.max(0, st.o))
      if (wrap) {
        wrap.style.height = `${Math.max(0, st.x)}px`
        wrap.style.opacity = String(o)
      }
      if (overlay) overlay.style.opacity = String(o)
    }
    let last = performance.now()
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.064)
      last = now
      const n = Math.max(1, Math.ceil(dt / 0.0005)) // 0.5 ms sub-steps (4 ms steps damp the overshoot)
      const h = dt / n
      for (let i = 0; i < n; i++) {
        const a = -k * (st.x - target) - c * st.v
        st.v += a * h
        st.x += st.v * h
        const ao = -k * (st.o - oTarget) - c * st.ov
        st.ov += ao * h
        st.o += st.ov * h
      }
      const done =
        Math.abs(st.x - target) < 0.25 && Math.abs(st.v) < 4 && Math.abs(st.o - oTarget) < 0.002 && Math.abs(st.ov) < 0.05
      if (done) {
        st.x = target
        st.v = 0
        st.o = oTarget
        st.ov = 0
        paint()
        restRef.current?.(target, oTarget)
        return
      }
      paint()
      st.raf = requestAnimationFrame(step)
    }
    st.raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(st.raf)
  }, [target, active, wrapRef, overlayRef])
}

/* SHARED §1: on inner pages the nav sits under the 40 px announcement bar. The whole chrome block is
   scroll-linked (no tween): translateY(-min(scrollY, top)), i.e. the nav sticks at 0 once the banner has
   scrolled away. Applied here as `top` (and --nav-top for the phone menu height). top=0 -> no-op. */
export function useChromeOffset(ref, top) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !top) return undefined
    const update = () => {
      const t = `${Math.max(0, top - Math.max(0, window.scrollY))}px`
      el.style.top = t
      el.style.setProperty('--nav-top', t)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ref, top])
}

// Light variant (SHARED §2): same structure, colours swapped. Read by the panel helpers below.
const LightCtx = createContext(false)
const useLight = () => useContext(LightCtx)
// light grid lines: dashed/solid 1px #E5E7EB (dark: rgba(255,255,255,.1))
const LIGHT_LINE = '#E5E7EB'

/* ------------------------------ atoms ------------------------------ */

// §2.2 Rive logo. Live: Framer RivePlayer (@rive-app/webgl2 2.27.5) with src EVNOizZDdBFzRA84tNZ9N3dZ5w.riv,
// artboard "lightdash", stateMachines "State Machine 1", autoplay, fit cover, alignment center,
// handleEvents (pointer listeners inside the .riv), canvas 119×27 at +1px in the 119×28 link,
// filter brightness(0) invert(1). Measured: static on load (first frame drawn, no intro), hovering the
// canvas plays a ~1.07 s state-machine animation and returns to the rest pose.
// The static SVG stays visible until the Rive file has loaded (and if it fails).
RuntimeLoader.setWasmUrl(riveWasmUrl)

function RiveLogo({ light }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let r
    try {
      r = new Rive({
        src: '/assets/logo/lightdash-logo.riv',
        canvas,
        artboard: 'lightdash',
        stateMachines: 'State Machine 1',
        autoplay: true,
        layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas()
          setReady(true)
        },
        onLoadError: () => setReady(false),
      })
    } catch {
      return undefined
    }
    return () => r?.cleanup()
  }, [])
  return (
    <>
      <img
        src={light ? '/assets/svg/lightdash-logo-dark.svg' : '/assets/svg/lightdash-logo-white.svg'}
        alt="Lightdash"
        className="absolute left-0 top-1/2 block w-[119px] translate-y-[calc(-50%+1px)]"
        style={{ visibility: ready ? 'hidden' : 'visible' }}
      />
      <canvas
        ref={canvasRef}
        width={119}
        height={27}
        aria-hidden="true"
        className={`absolute left-0 top-[1px] block h-[27px] w-[119px] ${light ? '' : '[filter:brightness(0)_invert(1)]'}`}
        style={{ visibility: ready ? 'visible' : 'hidden' }}
      />
    </>
  )
}

function Chevron() {
  // §2.4: 18×18 box, 6×3 svg; no rotation / color change on open
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center">
      {/* inline + overflow:visible like the live svg; as an <img> the 1.125 square-cap stroke was clipped to the 6×3 box */}
      <svg width="6" height="3" viewBox="0 0 6 3" fill="none" overflow="visible" aria-hidden="true" className="block h-[3px] w-[6px] overflow-visible">
        <path d="M 0 0 L 3 3 L 6 0" className="stroke-icon-stroke" strokeWidth="1.125" strokeLinecap="square" strokeMiterlimit="10" />
      </svg>
    </span>
  )
}

const navText = 'font-britti text-[16px] font-medium leading-[32px] tracking-[0.16px] text-text-white'
// light: #36394A, weight 400 (Login is #666D80, set at the call site)
const navTextLight = 'font-britti text-[16px] font-normal leading-[32px] tracking-[0.16px] text-[#36394A]'

function Trigger({ label, id, active, onOpen, onToggle }) {
  const light = useLight()
  return (
    <button
      type="button"
      aria-expanded={active === id}
      aria-haspopup="true"
      onMouseEnter={() => onOpen(id)}
      onClick={() => onToggle(id)}
      className={`flex h-[42px] cursor-pointer items-center gap-[2px] border-0 py-[5px] pl-[16px] pr-[10px] ${
        // light, live "Open" variant: bg #F8FAFB, radius 8 (closed: #FFF)
        light ? `rounded-[8px] ${active === id ? 'bg-btn-light-bg' : 'bg-white'} ${navTextLight}` : `bg-transparent ${navText}`
      }`}
    >
      <span>{label}</span>
      <Chevron />
    </button>
  )
}

// Grid-line helpers (§3.1), mirroring the live Framer structure measured at 1440 and 1200:
// - horizontal lines are full-bleed absolute 1px rules (they never take layout space);
// - column dividers are absolute 1px rules attached to each column's own edge, so they follow the
//   auto-fill grid when it drops to 3×(vw/3) columns between 1100 and 1279.
const HRule = ({ top, bottom }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 h-0 w-[5000px] -translate-x-1/2 border-t border-dashed border-dashed-line"
    style={{ top, bottom, borderColor: useLight() ? LIGHT_LINE : undefined }}
  />
)
// 1px column divider spanning far beyond the panel (clipped by the dropdown's overflow:hidden).
const ColRule = ({ side = 'right', solid = false }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute -bottom-[600px] -top-[600px] w-px border-r border-dashed-line ${
      solid ? 'border-solid' : 'border-dashed'
    } ${side === 'outside' ? 'left-full' : 'right-0'}`}
    style={useLight() ? { borderColor: LIGHT_LINE } : undefined}
  />
)
const VLine = ({ left, right }) => <div className="vline" style={{ left, right }} aria-hidden="true" />
const EdgeLines = () => (
  <>
    <VLine left={0} />
    <VLine right={0} />
  </>
)
const Container = ({ children, className = '' }) => (
  <div className={`relative mx-auto w-full max-w-[1280px] ${className}`}>{children}</div>
)
const headerText = 'font-inter text-[15px] font-medium leading-[18px] text-text-white'
// light: column headers / "Working with…" / "Resources" #818898; customer group titles #272835
const headerTextLight = 'font-inter text-[15px] font-medium leading-[18px] text-[#818898]'
const useHeaderText = () => (useLight() ? headerTextLight : headerText)
// dashed rule drawn by ::after / ::before
const v = (light) => (light ? 'light' : 'dark')
const lineAfter = (light) => (light ? 'after:border-[#E5E7EB]' : 'after:border-dashed-line')
// Framer auto-fill grid: 4×320 at ≥1280 content width, 3×(width/3) below.
const panelGrid = 'grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))]'

// 320×50 column header, padding 20/24, 1px dashed bottom rule drawn inside the box (Framer ::after).
function ColHeader({ children }) {
  const light = useLight()
  return (
    <div
      className={`relative box-border flex h-[50px] w-[320px] max-w-full shrink-0 items-center px-[24px] after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-dashed ${lineAfter(light)} after:content-[''] ${useHeaderText()}`}
    >
      {children}
    </div>
  )
}

// Hatch column art: the live site serves the 512w Framer variant (sizes=320px), upscaled to cover.
// light: same image at opacity 1
function Hatch({ height, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ height }}>
      <img
        src="/assets/nav/hatch-pattern-512.png"
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${useLight() ? '' : 'opacity-25'}`}
      />
    </div>
  )
}

/* ----------------------------- panels ------------------------------ */

function ProductPanel() {
  const light = useLight()
  return (
    <div className="relative w-full">
      <HRule top={0} />
      <Container className="py-[1px]">
        <div className={`relative ${panelGrid}`}>
          {/* rule under the header row, y=156 */}
          <HRule top={49} />
          <div className="relative flex w-[321px] flex-col gap-[4px] pb-[16px] pl-[1px]">
            <ColHeader>Product</ColHeader>
            {PRODUCT_ITEMS.map((it) => (
              <MenuItem key={it.title} item={it} variant={v(light)} />
            ))}
            <ColRule side="outside" />
          </div>
          <div className="relative flex flex-col gap-[4px] pb-[16px]">
            <ColHeader>Platform</ColHeader>
            {PLATFORM_ITEMS.map((it) => (
              <MenuItem key={it.title} item={it} variant={v(light)} />
            ))}
            <ColRule />
          </div>
          <div className="relative flex flex-col self-start">
            <ColHeader />
            <div className={`flex h-[239px] flex-col gap-[4px] p-[5px] ${light ? 'bg-[#F6F8FA]' : 'bg-menu-card-well'}`}>
              {PRODUCT_CARDS.map((c) => (
                <FeatureCard key={c.title} card={c} width="min(308px, 100%)" />
              ))}
            </div>
            <ColRule side="outside" />
          </div>
          <div className="relative flex flex-col self-start">
            <ColHeader />
            <Hatch
              height={316}
              className={`absolute left-0 top-[50px] w-[320px] max-w-full after:pointer-events-none after:absolute after:inset-0 after:border-r after:border-dashed ${lineAfter(light)} after:content-['']`}
            />
          </div>
        </div>
      </Container>
      <div className="relative h-[54px]">
        <HRule top={-1} />
      </div>
      <Container className="!absolute inset-y-0 left-0 right-0 pointer-events-none">
        <EdgeLines />
      </Container>
    </div>
  )
}

function CustomersPanel() {
  const light = useLight()
  const ht = useHeaderText()
  return (
    <div className="relative w-full">
      <HRule top={0} />
      <Container className="flex h-[50px] items-center px-[24px]">
        <span className={ht}>Working with the top enterprise companies</span>
      </Container>
      <div className="relative py-[1px]">
        <HRule top={0} />
        <HRule bottom={0} />
        <Container className="grid grid-cols-4">
          {CUSTOMER_GROUPS.map((g, gi) => (
            <div key={g.desktop} className="relative flex min-w-0 flex-col">
              <div className={`flex h-[50px] items-center justify-center text-center ${light ? `${headerText} !text-btn-light-text` : headerText}`}>{g.desktop}</div>
              {g.logos.map((l) => (
                <div
                  key={l.name}
                  className={`nav-logo-cell relative flex h-[80px] items-center justify-center before:pointer-events-none before:absolute before:inset-0 before:border-t before:border-dashed before:content-[''] ${
                    light ? 'bg-white before:border-[#E5E7EB]' : 'bg-menu-panel before:border-dashed-line'
                  }`}
                >
                  <CustomerLogo logo={l} variant={v(light)} />
                </div>
              ))}
              {/* §3.3 column dividers are SOLID (live: ::after border-right 1px solid rgba(255,255,255,.1)) */}
              {gi < CUSTOMER_GROUPS.length - 1 && (
                <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 w-px border-r border-solid ${light ? 'border-[#E5E7EB]' : 'border-dashed-line'}`} />
              )}
            </div>
          ))}
        </Container>
      </div>
      <Container className="box-border h-[72px] px-[24px] pb-[14px] pt-[16px]">
        <a
          href={LINKS.customerStories}
          className="nav-btn-spring inline-flex h-[42px] items-center gap-[4px] rounded-[6px] bg-brand-purple px-[20px] hover:bg-[rgba(94,76,255,0.7)] font-inter text-[15px] font-medium leading-[18px] text-btn-light-bg no-underline ring-1 ring-inset ring-brand-purple-border"
        >
          View all customer stories
          <img src="/assets/nav/arrow-up-right-white.svg" alt="" width={16} height={16} className="h-[16px] w-[16px] object-cover" />
        </a>
        <PixelDeco color="purple" variant="stacked" />
      </Container>
      <Container className="!absolute inset-y-0 left-0 right-0 pointer-events-none">
        <EdgeLines />
      </Container>
    </div>
  )
}

function ResourcesPanel() {
  const light = useLight()
  return (
    <div className="relative w-full">
      <HRule top={0} />
      <Container className="flex h-[50px] items-center px-[24px]">
        <span className={useHeaderText()}>Resources</span>
      </Container>
      <div className="relative py-[1px]">
        <HRule top={0} />
        <HRule bottom={0} />
        {/* fixed 415 tall like the live grid; the wrapped hatch row overflows and is clipped at <1280 */}
        <Container className={`h-[415px] ${panelGrid}`}>
          {/* The well never sizes the row (live: cards shrink to 62 tall when the row is 148 at <1280) */}
          <div className="relative w-[308px] max-w-full">
            {/* light well is #F8FAFB here (live), vs #F6F8FA in the Product panel */}
            <div className={`absolute inset-0 flex flex-col gap-[4px] p-[10px] ${light ? 'bg-btn-light-bg' : 'bg-menu-card-well'}`}>
              {RESOURCE_CARDS.map((c) => (
                <FeatureCard key={c.title} card={{ ...c, height: undefined }} width="100%" className="min-h-0 flex-1" />
              ))}
            </div>
            <ColRule />
          </div>
          <div className="relative flex flex-col items-center gap-[4px] py-[16px]">
            {RESOURCE_COL2.map((it) => (
              <MenuItem key={it.title} item={it} variant={v(light)} />
            ))}
            <ColRule />
          </div>
          <div className="relative flex flex-col items-center gap-[4px] py-[16px]">
            {RESOURCE_COL3.map((it) => (
              <MenuItem key={it.title} item={it} variant={v(light)} />
            ))}
            <ColRule />
          </div>
          <Hatch
            height={415}
            className={`relative w-[320px] max-w-full after:pointer-events-none after:absolute after:inset-0 after:border-x after:border-dashed ${lineAfter(light)} after:content-['']`}
          />
        </Container>
      </div>
      <div className="h-[54px]" />
      <Container className="!absolute inset-y-0 left-0 right-0 pointer-events-none">
        <EdgeLines />
      </Container>
    </div>
  )
}

const PANELS = [
  { id: 'product', Comp: ProductPanel },
  { id: 'customers', Comp: CustomersPanel },
  { id: 'resources', Comp: ResourcesPanel },
]

/* ------------------------------ navbar ----------------------------- */

// variant: 'dark' (homepage, default) | 'light' (inner pages, SHARED §2).
// top: px offset under the announcement bar (40 on banner pages, 0 otherwise); scroll-linked, see useChromeOffset.
export default function Navbar({ onTalk, modalOpen, variant = 'dark', top = 0 }) {
  const light = variant === 'light'
  const rootRef = useRef(null)
  useChromeOffset(rootRef, top)
  const [active, setActive] = useState(null) // open panel id or null
  const [shown, setShown] = useState(null) // panel kept mounted while collapsing
  const [target, setTarget] = useState(CLOSED_H)
  const wrapRef = useRef(null)
  const overlayRef = useRef(null)
  const panelRefs = useRef({})

  const open = useCallback((id) => {
    setActive(id)
    setShown(id)
  }, [])
  const close = useCallback(() => setActive(null), [])
  const toggle = useCallback((id) => (active === id ? setActive(null) : open(id)), [active, open])

  useLayoutEffect(() => {
    if (!active) {
      setTarget(CLOSED_H)
      return
    }
    const el = panelRefs.current[active]
    setTarget(el ? el.offsetHeight : CLOSED_H)
  }, [active])

  useMegaMotion(wrapRef, overlayRef, target, active, (h, o) => {
    if (o === 0) setShown(null)
  })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <LightCtx.Provider value={light}>
    <div ref={rootRef} data-nav-variant={variant} className="pointer-events-none fixed left-1/2 top-0 z-[11] hidden w-full -translate-x-1/2 desk:block" style={top ? { top } : undefined}>
      {/* §3.1 overlay below the panel: rgba(0,0,0,.65); opacity driven by the panel spring (useMegaMotion).
          Live: hovering (or clicking) the dimmed area is what closes the menu. */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        onMouseEnter={close}
        onClick={close}
        className={`absolute inset-x-0 top-[106px] h-[calc(100vh-106px)] min-h-[974px] bg-menu-overlay ${
          active ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: 0 }}
      />
      {/* The nav box is bar (106) + the closed dropdown layer (100) = 206 tall; only the bar and the
          visible dropdown layer take pointer events, so the empty strip under the bar stays clickable. */}
      <nav data-framer-name={light ? 'Desktop' : 'Dark'} className="pointer-events-none relative flex w-full flex-col items-center">
        {/* §2.1 bar */}
        <div
          className={`pointer-events-auto relative box-border flex h-[106px] w-full flex-row items-center justify-center gap-[10px] px-[20px] py-[32px] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0 after:border-b after:border-solid after:content-[''] ${
            light ? 'bg-white after:border-[#E5E7EB]' : 'bg-nav-bg after:border-nav-border'
          }`}
        >
          <div className="flex h-[42px] w-full max-w-[1280px] flex-row items-center justify-center">
            <div className="flex flex-1 flex-row items-center gap-[24px]">
              <a href={LINKS.home} className="relative block h-[28px] w-[119px] shrink-0" aria-label="Lightdash home">
                <RiveLogo light={light} />
              </a>
              <div className="flex flex-row items-center gap-0 overflow-hidden">
                <Trigger label="Product" id="product" active={active} onOpen={open} onToggle={toggle} />
                {/* light (live): link box 81 wide (padding-right 16, dark 10), so Customers/Resources sit 6px further right */}
                <a href={LINKS.pricing} onMouseEnter={close} className={`flex h-[42px] items-center py-[5px] pl-[16px] no-underline ${light ? `!pr-[16px] bg-white ${navTextLight}` : navText} pr-[10px]`}>
                  Pricing
                </a>
                <Trigger label="Customers" id="customers" active={active} onOpen={open} onToggle={toggle} />
                <Trigger label="Resources" id="resources" active={active} onOpen={open} onToggle={toggle} />
              </div>
            </div>
            <div className="flex flex-row items-center gap-[14px]">
              {/* live: preset xvr51k has no transition -> hover colour (#ffffffb3) applies instantly.
                  light (live): #666D80 -> rgba(102,109,128,.6), transition color .2s cubic-bezier(.44,0,.56,1), 16 tall box */}
              <a
                href={LINKS.login}
                onMouseEnter={close}
                className={`flex items-center no-underline ${
                  light
                    ? `h-[16px] ${navTextLight} !text-text-login-mobile transition-[color] duration-200 ease-framer hover:!text-[rgba(102,109,128,0.6)]`
                    : `h-[32px] hover:text-link-hover ${navText}`
                }`}
              >
                Login
              </a>
              <button
                type="button"
                onClick={onTalk}
                onMouseEnter={close}
                className={`nav-btn-spring flex h-[42px] cursor-pointer items-center gap-[4px] rounded-[6px] border-0 px-[20px] font-inter text-[15px] font-medium leading-[18px] text-btn-light-text ring-1 ring-inset ring-btn-light-border ${
                  // Live computed bg stays #F8FAFB while the Cal modal is open (no dimmed variant measured)
                  'bg-btn-light-bg hover:bg-btn-light-bg-hover'
                }`}
              >
                Talk to our team
              </button>
              <a
                href={LINKS.start}
                onMouseEnter={close}
                className="flex h-[42px] items-center gap-[8px] rounded-[6px] bg-brand-purple px-[20px] py-[12px] font-inter text-[15px] font-medium leading-[18px] tracking-[-0.3px] text-text-white no-underline ring-1 ring-inset ring-brand-purple-border"
              >
                Start for free
              </a>
            </div>
          </div>
        </div>

        {/* §3 dropdown layer: full-bleed, height springs between panel heights */}
        <div
          ref={wrapRef}
          className={`relative w-full overflow-hidden ${shown ? 'pointer-events-auto' : ''} ${light ? 'bg-white' : 'bg-menu-panel'}`}
          style={{ height: CLOSED_H, opacity: 0, visibility: shown ? 'visible' : 'hidden' }}
        >
          {PANELS.map(({ id, Comp }) => {
            const isActive = active === id
            return (
              <div
                key={id}
                ref={(el) => (panelRefs.current[id] = el)}
                aria-hidden={!isActive}
                data-active={isActive}
                className={`nav-panel absolute inset-x-0 top-0 ${isActive ? '' : 'pointer-events-none'}`}
              >
                <Comp />
              </div>
            )
          })}
        </div>
      </nav>
    </div>
    </LightCtx.Provider>
  )
}
