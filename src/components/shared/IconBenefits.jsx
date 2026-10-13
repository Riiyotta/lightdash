import { Lines } from './Frame.jsx'

// SHARED §7.5 icon benefits grid ("2x2 Desktop" / "Benefits Grid").
// Section padding 0 65 58. Headings padding 72 0 48, h2-48 centred (w787).
// Grid 1150 = 2 × 575 with a dashed top/left outer line; each Benefit has a dashed right/bottom line.
// Benefit = icon column 84 ("Icon Top" 84×84 #F3F4F6 + dashed bottom, then empty "Icon Fill")
//         + content column (Title Row 84 tall, padding 0/24, dashed bottom; Desc Row padding 15/24/17).

/**
 * @param heading  node (h2-48, centred, max 787)
 * @param items    [{ icon, title, body }] — icon: 84×84 pixel-art svg/png (page-specific)
 */
export default function IconBenefits({ heading, items = [], className = '' }) {
  return (
    <section className={`relative w-full bg-white px-[20px] pb-[58px] tab:px-[65px] ${className}`}>
      {heading && (
        <div className="flex w-full justify-center pb-[48px] pt-[72px]">
          <h2 className="ld-h2-48 m-0 max-w-[787px] text-center">{heading}</h2>
        </div>
      )}
      <div className="relative grid w-full grid-cols-1 tab:grid-cols-2">
        <Lines sides="tl" dashed />
        {items.map((it) => (
          <div key={it.title} className="relative flex flex-row">
            <Lines sides="rb" dashed />
            {/* icon column */}
            <div className="relative flex w-[84px] shrink-0 flex-col">
              <div className="relative h-[84px] w-[84px] bg-ld-icon-cell">
                {it.icon && <img src={it.icon} alt="" width={84} height={84} className="block h-[84px] w-[84px]" />}
                <Lines sides="b" dashed />
              </div>
              <div className="flex-1" />
              <Lines sides="r" dashed />
            </div>
            {/* content column */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="relative flex min-h-[84px] items-center px-[24px]">
                <h3 className="ld-card-title-24 m-0 tracking-[-0.24px]">{it.title}</h3>
                <Lines sides="b" dashed />
              </div>
              <div className="px-[24px] pb-[17px] pt-[15px]">
                <p className="ld-card-body-16 m-0">{it.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
