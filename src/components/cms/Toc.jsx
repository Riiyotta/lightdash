import { useEffect, useState } from 'react'
import { scrollToElement, TOC_OFFSET } from './smoothScroll.js'

// cms-templates §3.2 table of contents (≥1100 only). Sticky top 78.
// Items = body H2/H3 headings + a final "Related articles" item. Scroll-spy: the active item is the last
// target whose top has passed ~100 px from the viewport top (first item by default).
export default function Toc({ items }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      let idx = 0
      items.forEach((it, i) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= TOC_OFFSET + 1) idx = i
      })
      setActive(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return (
    <nav aria-label="Table of contents" className="sticky top-[78px] pt-[32px]">
      <p className="m-0 font-britti text-[18px] font-normal leading-[20px] text-[#272835]">Table of contents</p>
      <ul className="m-0 mt-[24px] flex w-[320px] list-none flex-col gap-[8px] p-0">
        {items.map((it, i) => (
          <li key={it.id} className="relative">
            {i === active && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[1px] bg-[#000000]" />}
            <button
              type="button"
              style={{ fontFamily: 'sans-serif' }}
              onClick={() => scrollToElement(document.getElementById(it.id))}
              className={`block w-full cursor-pointer border-0 bg-transparent py-0 pl-[16px] pr-0 text-left text-[14px] font-normal leading-normal transition-[color] duration-200 ${
                i === active ? 'text-[#272835]' : 'text-[#818898]'
              }`}
            >
              {it.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
