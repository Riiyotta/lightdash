import { Lines } from '../../shared/index.js'

// Appendix B "Comparison / Why It's Different" (<1200 only). Colours sampled from
// reference/pages/data-apps-390.png (not in the spec): accent green #30CF87, check circle #8274FF,
// cross circle #CDD7DD with #818898 cross, Lightdash block tint #F5F4FF.
function Cross() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="block shrink-0">
      <circle cx="10" cy="10" r="10" fill="#CDD7DD" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#818898" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="block shrink-0">
      <circle cx="10" cy="10" r="10" fill="#8274FF" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="#FFFFFF" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Block({ title, items, icon, tinted }) {
  return (
    <div className={`relative flex flex-col ${tinted ? 'bg-[linear-gradient(180deg,#F3F1FF_0%,#FFFFFF_100%)]' : ''}`}>
      <div className="relative px-[40px] py-[16px]">
        <p className="m-0 font-inter text-[16px] font-bold leading-[26px] text-ld-dark">{title}</p>
        <Lines sides="b" dashed />
      </div>
      {items.map((t) => (
        <div key={t} className="relative flex flex-row items-center gap-[16px] px-[40px] py-[24px]">
          {icon}
          <span className="font-inter text-[16px] leading-[24px] text-ld-dark">{t}</span>
          <Lines sides="b" dashed />
        </div>
      ))}
    </div>
  )
}

export default function WhyDifferent({ heading, accent, old, next }) {
  return (
    <section className="relative w-full bg-white">
      <div className="relative h-[64px] w-full">
        <Lines sides="b" dashed />
      </div>
      <div className="relative flex w-full justify-center px-[24px]">
        <h2 className="m-0 text-center font-britti-semi text-[32px] font-normal leading-[35.2px] text-ld-ink">
          {heading}
          <span className="text-[#30CF87]">{accent}</span>
        </h2>
        <Lines sides="b" dashed />
      </div>
      <div className="relative h-[64px] w-full">
        <Lines sides="b" dashed />
      </div>
      <div className="relative mx-[24px]">
        <Block {...old} icon={<Cross />} />
        <Block {...next} icon={<Check />} tinted />
        <Lines sides="rl" dashed />
      </div>
      <div className="h-[48px]" />
      <Lines sides="rl" />
    </section>
  )
}
