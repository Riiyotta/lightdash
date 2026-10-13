import SmartLink from '../shared/SmartLink.jsx'

// cms-templates §1.8. Inter 14/20; links #818898 → hover rgba(129,136,152,0.6) (0.2s framer curve).
// Posts use "·" separators with 6 px gaps, stories "/". Current item is plain #818898 text.
export default function Breadcrumb({ items, sep = '·' }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-[6px] font-inter text-[14px] font-normal leading-[20px] text-[#818898]">
      {items.map((it, i) => (
        <span key={i} className="flex min-w-0 items-center gap-[6px]">
          {i > 0 && <span aria-hidden="true" className="text-[#C1C7D0]">{sep}</span>}
          {it.href ? (
            <SmartLink
              href={it.href}
              className="shrink-0 whitespace-nowrap text-[#818898] no-underline transition-[color] duration-200 ease-framer hover:text-[rgba(129,136,152,0.6)]"
            >
              {it.label}
            </SmartLink>
          ) : (
            <span className="truncate">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
