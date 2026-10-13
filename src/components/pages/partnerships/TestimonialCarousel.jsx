import { useEffect, useState } from 'react'
import { Lines } from '../../shared/index.js'

// specs/company-pages.md §6.4 "Partner/Testimonial" carousel.
// Auto-rotates 01 → 02 → 03 → 01 every 4000 ms; the active person shows the "On" (duotone) portrait and a
// #5E4CFF progress line that fills left → right over the 4 s; clicking a portrait jumps to that testimonial
// (and restarts the timer). Quote swap: ~300 ms cross-fade (approximation of Framer's spring 0.4s / bounce 0.2).
// Desktop: section padding 80/0, gap 64; quote Inter 28/48 w500 #36394A, max 920; people row gap 40, columns
// 203 / 164 / 211. Phone ("Phone Testimonial"): quote block then a column of people (photo left, info right).
const P = '/assets/pages/partnerships'
const ROTATE_MS = 4000

const PEOPLE = [
  {
    slug: 'colin-lee',
    name: 'Colin Lee',
    company: 'Nayuta Analytics',
    role: 'Founder',
    width: 203,
    quote:
      '“Lightdash lives up to its name: lightweight, lightning-fast, and constantly improving. For startup clients who need to move fast with agentic analytics, it’s our go-to recommendation.”',
  },
  {
    slug: 'david-olodort',
    name: 'David Olodort',
    company: 'Snowpack Data',
    role: 'CRO',
    width: 164,
    quote:
      '"Lightdash’s fully programmatic, open-source philosophy makes it the extensible data node in your stack. Don’t let GUIs limit you - encode the future of your analytics with Lightdash."',
  },
  {
    slug: 'chloe-anderson',
    name: 'Chloé Anderson',
    company: 'Database Tycoon',
    role: 'Manager',
    width: 211,
    quote:
      '"We don’t embed with clients to spend months fixing BI. We embed to drive outcomes. Lightdash’s tight dbt integration and real self-serve capabilities let us move fast and focus on building systems that move the business forward."',
  },
]

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % PEOPLE.length)
      setCycle((c) => c + 1)
    }, ROTATE_MS)
    return () => clearTimeout(t)
  }, [active, cycle])

  const go = (i) => {
    setActive(i)
    setCycle((c) => c + 1)
  }

  return (
    <div className="relative flex w-full flex-col items-center gap-[64px] py-[80px]">
      {/* 24×24 pixel blocks at the section's left / right */}
      <img
        src={`${P}/renders/testimonial-block-left@2x.png`}
        alt=""
        width={24}
        height={24}
        className="pointer-events-none absolute left-[72px] top-[288px] hidden h-[24px] w-[24px] desk:block"
      />
      <img
        src={`${P}/renders/testimonial-block-right@2x.png`}
        alt=""
        width={24}
        height={24}
        className="pointer-events-none absolute left-[1184px] top-[413px] hidden h-[24px] w-[24px] desk:block"
      />

      {/* Quote: the block takes the active quote's height (Framer variant swap); ~300 ms fade-in on change */}
      <div className="w-full max-w-[960px] px-[24px] tab:px-[20px]" aria-live="polite">
        <p
          key={active}
          className="ptn-quote m-0 text-center font-inter text-[24px] font-medium leading-[32px] tracking-[-0.42px] text-ld-ink-700 tab:mx-auto tab:max-w-[920px] tab:text-[28px] tab:leading-[48px]"
        >
          {PEOPLE[active].quote}
        </p>
      </div>

      {/* People */}
      <div className="relative flex w-full flex-col items-stretch gap-[40px] px-[24px] tab:flex-row tab:justify-center tab:px-0">
        <Lines sides="t" dashed />
        {PEOPLE.map((p, i) => {
          const on = i === active
          return (
            <div
              key={p.slug}
              className="flex flex-row items-center gap-[20px] tab:flex-col tab:items-stretch tab:gap-0 tab:[width:var(--col-w)]"
              style={{ '--col-w': `${p.width}px` }}
            >
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial from ${p.name}`}
                aria-pressed={on}
                className="relative mx-0 block h-[150px] w-[150px] shrink-0 cursor-pointer border-0 bg-transparent p-0 tab:mx-auto"
              >
                <img
                  src={`${P}/people/${p.slug}-off.png`}
                  alt=""
                  width={150}
                  height={150}
                  className="absolute inset-0 block h-[150px] w-[150px] object-cover"
                />
                <img
                  src={`${P}/people/${p.slug}-on.png`}
                  alt=""
                  width={150}
                  height={150}
                  className="absolute inset-0 block h-[150px] w-[150px] object-cover transition-opacity duration-300 ease-out"
                  style={{ opacity: on ? 1 : 0 }}
                />
              </button>
              <div className="flex min-w-0 flex-1 flex-col tab:flex-none">
                {/* 1px line + progress */}
                <div className="relative h-px w-full bg-ld-line tab:mt-[20px]">
                  {on && <span key={cycle} className="ptn-progress absolute inset-0 block bg-brand-purple" />}
                </div>
                <p className="m-0 mt-[16px] font-inter text-[16px] leading-[20px] text-ld-body">{p.name}</p>
                <p className="m-0 mt-[5px] font-inter text-[16px] leading-[20px] text-ld-body tab:whitespace-nowrap">
                  <span className="font-medium text-ld-ink">{p.company}</span> <span className="text-[12px] text-[#A4ACB9]">•</span> {p.role}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes ptn-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ptn-quote { from { opacity: 0; } to { opacity: 1; } }
        .ptn-quote { animation: ptn-quote 300ms ease-out both; }
        .ptn-progress { transform-origin: 0 50%; animation: ptn-progress ${ROTATE_MS}ms linear both; }
      `}</style>
    </div>
  )
}
