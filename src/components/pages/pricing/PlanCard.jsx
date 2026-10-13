import { Button, Lines } from '../../shared/index.js'
import { PRICING_ASSETS } from '../../../pages/data/pricing.jsx'

// specs/company-pages.md §2.2 Plan card: Card (padding 32/32/12, 257 tall) → Title row (eyebrow, padding 20/32/10,
// 50 tall, dashed bottom) → Features (padding 16/32/32, gap 10). 1px solid #DFE1E7 border (::after).
// Equal height (950) at ≥1100; phone min heights 700 / 990 / 845 (measured).
export default function PlanCard({ plan }) {
  const { dark } = plan
  return (
    <div
      className={`relative flex min-w-0 flex-col ${dark ? 'bg-[#272835]' : 'bg-white'} min-h-[var(--plan-ph)] tab:min-h-0 desk:min-h-[950px]`}
      style={{ '--plan-ph': `${plan.phoneMinHeight}px` }}
    >
      {/* top-right pixel corner, flush with the inside edge */}
      <img
        src={plan.corner.src}
        alt=""
        width={plan.corner.size}
        height={plan.corner.size}
        className="pointer-events-none absolute right-0 top-0 block object-cover"
        style={{ width: plan.corner.size, height: plan.corner.size }}
      />

      {/* Card */}
      <div className="flex h-[257px] shrink-0 flex-col px-[32px] pb-[24px] pt-[41px]">
        <p className="m-0 font-britti text-[18px] font-medium leading-[16.2px] tracking-[-0.36px]" style={{ color: dark ? '#5E4CFF' : '#818898' }}>
          {plan.label}
        </p>
        <p className="m-0 mt-[16.8px] flex items-baseline gap-[4px]">
          <span
            className="font-['Britti_Sans_Trial_Bold',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[32px] leading-[19.2px] tracking-[-1.12px]"
            style={{ color: dark ? '#F8FAFB' : '#000000' }}
          >
            {plan.price}
          </span>
          {(plan.month || plan.hiddenMonth) && (
            <span
              className="font-inter text-[14px] leading-[12.6px] tracking-[-1.12px]"
              style={{ color: plan.hiddenMonth ? '#FFFFFF' : '#F8FAFB' }}
            >
              {' '}
              / month
            </span>
          )}
        </p>
        <p
          className="m-0 mt-[20px] max-w-[312px] font-inter text-[14px] leading-[20px] tracking-[-0.28px]"
          style={{ color: dark ? '#F8FAFB' : '#666D80' }}
        >
          {plan.desc}
        </p>
        <Button variant="fourth" href={plan.button.href} className="mt-auto w-full">
          {plan.button.label}
        </Button>
      </div>

      {/* Title row: eyebrow */}
      <div className="relative h-[50px] shrink-0 px-[32px] pb-[10px] pt-[20px]">
        <p className="m-0 font-['Britti_Sans_Trial_Regular',_'Britti_Sans_Medium_Placeholder',_sans-serif] text-[14px] uppercase leading-[20px] text-[#818898]">
          {plan.eyebrow}
        </p>
        <Lines sides="b" dashed />
      </div>

      {/* Features */}
      <ul className="m-0 flex list-none flex-col gap-[10px] px-[32px] pb-[32px] pt-[16px]">
        {plan.features.map((f) => (
          <li key={f} className="flex flex-row items-start gap-[10px]">
            <span className="flex h-[20px] w-[13px] shrink-0 items-center justify-end">
              <img src={dark ? PRICING_ASSETS.featurePurple : PRICING_ASSETS.featureGrey} alt="" width={9} height={7} className="block h-[7px] w-[9px]" />
            </span>
            <span className="min-w-0 max-w-[289px] font-inter text-[14px] leading-[20px]" style={{ color: dark ? '#F8FAFB' : '#36394A' }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Lines sides="trbl" color="border-[#DFE1E7]" />
    </div>
  )
}
