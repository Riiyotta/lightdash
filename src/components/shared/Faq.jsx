import { useState } from 'react'
import Button from './Button.jsx'
import { Lines } from './Frame.jsx'

// SHARED §7.8 FAQ. Left 549.6 (padding 64, gap 10) | 1px solid divider | right 730.4 (padding 64).
// Items toggle independently; height spring ~150 ms; plus icon rotates 0 → 45° (spring, overshoot).

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13.334 13.333" fill="none" aria-hidden="true" className="block">
      <path d="M6.667 0V13.333 M0 6.667H13.334" stroke="#666D80" strokeWidth="1.667" strokeLinecap="square" />
    </svg>
  )
}

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="relative w-full overflow-hidden pb-[23px] pt-[24px]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer flex-row items-start gap-[10px] border-0 bg-transparent p-0 text-left"
      >
        <span className="ld-faq-q-20 min-w-0 flex-1">{q}</span>
        <span className="shrink-0 pt-[3px]">
          <span className="ld-faq-icon block" style={{ transform: `rotate(${open ? 45 : 0}deg)` }}>
            <PlusIcon />
          </span>
        </span>
      </button>
      {/* live: the collapsed "Answer" row stays 1px tall, so a closed single-line item is 24+20+1+23 = 68 */}
      <div className="ld-faq-acc min-h-[1px]" data-open={open}>
        <div>
          <div className="ld-faq-a-14 pt-[8px]">{a}</div>
        </div>
      </div>
      <Lines sides="b" />
    </div>
  )
}

export const FAQ_LEADS = {
  short: 'For any other questions, reach out to our team.',
  long: 'For any other questions, feel welcome to reach out to our team.',
}

/**
 * @param items    [{ q, a }] — a is rich content (links get #5E4CFF, <strong> 700 automatically)
 * @param heading  default "Your questions, answered"
 * @param lead     default FAQ_LEADS.short
 * @param cta      { label, href } default Third "Talk to our team" → ./start; null to hide
 */
export default function Faq({
  items = [],
  heading = 'Your questions, answered',
  lead = FAQ_LEADS.short,
  cta = { label: 'Talk to our team', href: './start' },
  className = '',
}) {
  return (
    <section className={`relative flex w-full flex-col bg-white tab:flex-row ${className}`}>
      <div className="relative flex w-full flex-col items-start gap-[10px] px-[24px] py-[64px] tab:w-[42.94%] tab:shrink-0 tab:p-[64px]">
        <h2 className="ld-faq-h-48 m-0 max-w-[421.6px]">{heading}</h2>
        {lead && <p className="ld-lead-18 m-0 tracking-[-0.27px]">{lead}</p>}
        {cta && (
          <Button variant="third" href={cta.href}>
            {cta.label}
          </Button>
        )}
        <Lines sides="b" className="tab:hidden" />
        <Lines sides="r" className="hidden tab:block" />
      </div>
      <div className="flex w-full min-w-0 flex-col px-[24px] py-[64px] tab:flex-1 tab:p-[64px]">
        {items.map((it, i) => (
          <FaqItem key={i} q={it.q} a={it.a} defaultOpen={it.defaultOpen} />
        ))}
      </div>
    </section>
  )
}
