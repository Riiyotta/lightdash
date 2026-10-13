import { useEffect, useRef, useState } from 'react'

// specs/company-pages.md §5.6 role accordion ("Built for every fintech role").
// Exactly one item open; auto-advances every 4400 ms (01 → 02 → 03 → 04 → 01…); clicking a closed item
// opens it immediately and restarts the cycle. Closed 67 tall (padding 16, gap 16, 32px face icon), open 155
// (title + 3 bullets). A 1px #5E4CFF progress line on the left edge of the text column (x +64) grows
// top → bottom over 4 s linear after a 0.4 s delay (src "Usecase/Progress"). Height: spring ~0.4 s bounce .2;
// bullets cross-fade 0.3 s.
const A = '/assets/pages/fintech'
const ADVANCE_MS = 4400

export const ROLES = [
  { title: 'For your Chief Risk Officer', icon: `${A}/noun-face-1-9f14ef01.svg` },
  { title: 'For your Operations Manager', icon: `${A}/noun-face-2-ea0d3d34.svg` },
  { title: 'For your Head of Growth', icon: `${A}/noun-face-3-be958a53.svg` },
  { title: 'For your Head of Compliance', icon: `${A}/noun-face-4-18a7f1a0.svg` },
]
const BULLETS = ['Credit decisioning metrics you can trust', 'Customer transaction classification', 'Repayment models and loan book performance']

export default function RoleAccordion() {
  const [open, setOpen] = useState(0)
  const [cycle, setCycle] = useState(0) // bumps on every activation so the progress line restarts
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setTimeout(() => {
      setOpen((o) => (o + 1) % ROLES.length)
      setCycle((c) => c + 1)
    }, ADVANCE_MS)
    return () => clearTimeout(timer.current)
  }, [open, cycle])

  const activate = (i) => {
    if (i === open) return
    setOpen(i)
    setCycle((c) => c + 1)
  }

  return (
    <div className="flex w-full flex-col">
      {ROLES.map((r, i) => {
        const isOpen = i === open
        return (
          <div
            key={r.title}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={() => activate(i)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), activate(i))}
            className={`relative flex w-full flex-row border-0 border-b border-solid border-ld-footer-frame ${isOpen ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {/* icon column (64) with dashed right line */}
            <div className="relative w-[64px] shrink-0 p-[16px]">
              <img src={r.icon} alt="" width={32} height={32} className="block h-[32px] w-[32px]" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 border-0 border-r border-dashed border-ld-footer-frame" />
            </div>
            {/* text column */}
            <div className="relative min-w-0 flex-1 py-[16px] pl-[23px] pr-[16px]">
              <p className="m-0 flex min-h-[34px] items-center font-inter text-[18px] leading-[23.4px] tracking-[-0.36px] text-white">{r.title}</p>
              <div className="fin-acc" data-open={isOpen}>
                <div>
                  <ul className="fin-acc-body m-0 list-disc pb-[6px] pl-[17px] pt-[10px] font-inter text-[14px] leading-[24px] tracking-[-0.28px] text-ld-body">
                    {BULLETS.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {isOpen && (
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-px overflow-hidden">
                  <span key={cycle} className="fin-acc-progress absolute inset-0 block bg-brand-purple" />
                </span>
              )}
            </div>
          </div>
        )
      })}
      <style>{`
        .fin-acc { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 400ms cubic-bezier(.34,1.2,.64,1); }
        .fin-acc[data-open='true'] { grid-template-rows: 1fr; }
        .fin-acc > * { min-height: 0; overflow: hidden; }
        .fin-acc-body { opacity: 0; transition: opacity 300ms ease; }
        .fin-acc[data-open='true'] .fin-acc-body { opacity: 1; }
        @keyframes fin-acc-progress { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .fin-acc-progress { transform-origin: 50% 0; animation: fin-acc-progress 4s linear 0.4s both; }
        @media (prefers-reduced-motion: reduce) { .fin-acc, .fin-acc-body { transition: none; } }
      `}</style>
    </div>
  )
}
