import { Lines } from './Frame.jsx'

// SHARED §7.10 hatched spacer band: 1280×80 (39 on phone), 1px solid #E5E7EB top + bottom,
// opacity .8 (.6 on some), background = 3840×372 diagonal hatch, cover.
const HATCH = '/assets/shared/6SAvm5QrWZHaUgTNO6f77dMR4zQ.png'

export default function HatchedSpacer({ opacity = 0.8, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[39px] w-full shrink-0 tab:h-[80px] ${className}`}
      style={{ opacity, background: `url(${HATCH}) center / cover no-repeat` }}
    >
      <Lines sides="tb" />
    </div>
  )
}
