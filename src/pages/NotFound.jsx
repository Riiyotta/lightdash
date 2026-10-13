import { PageFrame, Row, Lines, Button } from '../components/shared/index.js'
import { usePageMeta } from '../components/legal/LegalPage.jsx'
import '../components/legal/legal.css'

// /404 and the catch-all — legal-pages §5. No CTA band; the footer follows the wrapper directly.
const ART = '/assets/pages/404/404-pixel.png'

// §5.1 stripe blocks (115px each). A: lines get denser toward the art, #ECEFF3 top lines (none on the
// first row). B: mirror, every row has a #E5E7EB top line. Both have a solid #E5E7EB bottom line.
const A_ROWS = [32, 20, 18, 14, 10, 8, 6, 4, 3]
const B_ROWS = [3, 4, 6, 8, 10, 14, 18, 20, 32]

function Stripes({ rows, color, skipFirst }) {
  return (
    <div className="relative w-full shrink-0" aria-hidden="true">
      {rows.map((h, i) => (
        <Row key={i} height={h} dashed={false} lines={skipFirst && i === 0 ? '' : 't'} color={color} />
      ))}
      <Lines sides="b" />
    </div>
  )
}

export default function NotFound() {
  usePageMeta('Lightdash | Build Intelligence, not just dashboards.')
  return (
    <PageFrame frame="trl" className="items-center">
      <Stripes rows={A_ROWS} color="border-[#ECEFF3]" skipFirst />

      {/* §5.3 glitch stack: static base + 7 layers (layer 0 visible, 1–6 sliced/hue-shifted copies) */}
      <div className="ld404-art">
        <img src={ART} alt="404" width={408} height={192} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <img key={i} src={ART} alt="" aria-hidden="true" className={`ld404-layer ld404-l${i}`} />
        ))}
      </div>

      <Stripes rows={B_ROWS} color="border-ld-line" />

      <div className="flex w-full flex-col items-center gap-[20px] pb-[180px] pt-[24px]">
        <h1 className="ld404-title">Oh zap!</h1>
        <p className="ld404-body">
          The page you&apos;re looking for has been struck by lightning and no longer exists...
        </p>
        <Button variant="v1-purple" href="/">
          Go back home
        </Button>
      </div>
    </PageFrame>
  )
}
