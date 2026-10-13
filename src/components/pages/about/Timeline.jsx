import { useEffect, useRef, useState } from 'react'
import { Lines } from '../../shared/index.js'

// specs/company-pages.md §7.3 "Our story so far". Year rows (44, dashed bottom) + content rows (2 × 427
// centred, right column has the dashed centre line on its left). Milestones get a 10×10 #5E4CFF square on
// the centre line, level with the month label. Photos 357×236, 4px white border, soft shadow.
// Scroll reveal (src): every year row and content row fades opacity 0 → 1 once, as soon as any pixel enters
// the viewport (threshold 0); live measured opacity .93 @400ms, 1 @550ms ≈ 0.55s cubic-bezier(.2,.8,.2,1).
// Phone: one column (padding 0 24), text before photo, no centre line / squares (reference about-390.png).

function Reveal({ as: Tag = 'div', className = '', children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ opacity: shown ? 1 : 0, transition: 'opacity 0.55s cubic-bezier(.2,.8,.2,1)' }}
    >
      {children}
    </Tag>
  )
}

const PHOTO_SHADOW =
  '-0.12px 0.6px 1.6px -1.42px rgba(0,0,0,.2), -0.46px 2.29px 6.07px -2.83px rgba(0,0,0,.17), -2px 10px 26.5px -4.25px rgba(0,0,0,.04)'

function Photo({ src }) {
  return (
    <div className="w-full max-w-[357px] tab:w-[357px]" style={{ boxShadow: PHOTO_SHADOW }}>
      <img src={src} alt="" className="block aspect-[357/236] w-full border-[4px] border-solid border-white object-cover" />
    </div>
  )
}

function Items({ items, side }) {
  return (
    <div className="flex flex-col gap-[20px]">
      {items.map((it) => (
        <div key={it.month + it.lines[0]} className="relative flex flex-col gap-[6px]">
          {/* milestone square on the centre line (x = column edge ± 70 padding) */}
          <span
            aria-hidden="true"
            className={`absolute top-[4.8px] z-[2] hidden h-[10px] w-[10px] bg-brand-purple tab:block ${side === 'right' ? 'left-[-75px]' : 'right-[-75px]'}`}
          />
          <p className="m-0 font-inter text-[14px] leading-[19.6px] tracking-[-0.3px] text-ld-body">{it.month}</p>
          <div className="flex flex-col gap-[4px]">
            {it.lines.map((l) => (
              <p key={l} className="m-0 max-w-[357px] font-inter text-[16px] font-medium leading-[24px] text-ld-ink">
                {l}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Cell({ cell, side }) {
  if (cell.photo) return <Photo src={cell.photo} />
  return <Items items={cell.items} side={side} />
}

export default function Timeline({ data }) {
  return (
    <>
      {data.map((y) => (
        <div key={y.year} className="w-full">
          <Reveal className="relative flex h-[44px] w-full items-center justify-center">
            <p className="m-0 font-britti text-[20px] font-medium leading-[28px] tracking-[-0.3px] text-black">{y.year}</p>
            <Lines sides="tb" dashed />
          </Reveal>
          {y.rows.map((r, i) => {
            const leftIsPhoto = !!r.left.photo
            return (
              <Reveal key={i} className="w-full">
                <div className="mx-auto flex w-full flex-col gap-[24px] px-[24px] py-[24px] tab:w-[854px] tab:flex-row tab:gap-0 tab:p-0">
                  {/* left */}
                  <div className={`tab:w-[427px] tab:shrink-0 tab:pr-[70px] tab:pt-[32px] ${leftIsPhoto ? 'order-2 tab:order-none tab:pb-[32px]' : 'order-1 tab:order-none'}`}>
                    <Cell cell={r.left} side="left" />
                  </div>
                  {/* right (dashed centre line on its left) */}
                  <div
                    className={`relative tab:w-[427px] tab:shrink-0 tab:pb-[32px] tab:pl-[70px] tab:pt-[32px] ${leftIsPhoto ? 'order-1 tab:order-none' : 'order-2 tab:order-none'}`}
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden border-0 border-l border-dashed border-ld-line tab:block" />
                    <Cell cell={r.right} side="right" />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      ))}
    </>
  )
}
