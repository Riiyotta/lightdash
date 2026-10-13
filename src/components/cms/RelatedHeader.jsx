import Button from '../shared/Button.jsx'
import { Row, Spacer } from '../shared/Frame.jsx'

// cms-templates §3.3 / §6.2 "Related articles" / "Related stories" header block:
// solid frame line on top, 58 spacer, 40 header row (dashed t+b), 48 spacer.
// 390: H2 40/40 with the button stacked below (row 96 tall).
export default function RelatedHeader({ id, title, href, gutter = 'desk:px-[40px]' }) {
  return (
    <div id={id} className="relative w-full">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] border-t border-solid border-ld-line" />
      <Spacer height={58} />
      <Row lines="b" className={`flex h-[96px] flex-col items-start justify-center gap-[16px] px-[24px] tab:h-[40px] tab:flex-row tab:items-center tab:justify-between tab:gap-0 ${gutter}`}>
        <h2 className="m-0 font-britti-semi text-[40px] font-normal leading-[40px] text-[#272835] tab:text-[32px] tab:leading-[28.8px]">{title}</h2>
        <Button variant="fourth" href={href}>
          See all posts
        </Button>
      </Row>
      <Spacer height={48} />
    </div>
  )
}
