import { useEffect } from 'react'
import { PageFrame, Row, Spacer, Lines, CtaBand } from '../shared/index.js'
import './legal.css'

// specs/legal-pages.md §0 (site default description) — used where a page has no own description.
export const DEFAULT_DESCRIPTION =
  'Lightdash is the AI-first, open-source BI platform for modern data teams. Connect to dbt, define metrics once, and get instant, trustworthy insights.'

/** Sets <title> and the meta description for the page (§0 per-page data table). */
export function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
}

const PX = '/assets/pages/legal'

// §2.4 static 24×24 pixel decorations (48×48 @2x sources), positioned inside the row they belong to.
function Pixel({ n, style }) {
  return (
    <img
      src={`${PX}/pixel-${n}.png`}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className="pointer-events-none absolute block h-[24px] w-[24px] [image-rendering:auto]"
      style={style}
    />
  )
}

/**
 * §4 Separator: 40px row inside the content column. Dashed 1px #E5E7EB lines top and bottom run from
 * the vertical rule (24px left of the text) to the wrapper's right border (clipped by WrapperContent).
 * The section-number label is clipped/invisible on the live site and is intentionally not rendered.
 */
export function LegalSeparator({ lines = true }) {
  return (
    <div className="relative h-[40px] w-full shrink-0" aria-hidden="true">
      {lines && (
        <span className="pointer-events-none absolute inset-y-0 left-[-24px] right-[-2000px] border-y border-dashed border-ld-line" />
      )}
    </div>
  )
}

/**
 * §2 LegalPage template: bordered wrapper → Hero (66) → Meta (20) → Spacer (24) → Title → Spacer (40)
 * → content column with dashed left rule + empty 320px sticky TOC spacer (≥1000) → CTA band.
 */
export default function LegalPage({ title, docTitle, description, updated, children }) {
  usePageMeta(docTitle, description)
  return (
    <PageFrame frame="trbl">
      {/* Hero row: empty except pixels #1–4 */}
      <Row height={66} className="overflow-hidden" aria-hidden="true">
        <Pixel n={1} style={{ right: 24, top: 0 }} />
        <Pixel n={2} style={{ right: 0, top: 0 }} />
        <Pixel n={3} style={{ right: 0, top: 24 }} />
        <Pixel n={4} style={{ right: 120, top: 42 }} />
      </Row>

      {/* Meta row */}
      <Row height={20} className="overflow-hidden">
        <div className="flex h-full items-center gap-[10px] px-[20px] tab:px-[64px]">
          <img src={`${PX}/calendar-icon.svg`} alt="" aria-hidden="true" width={14} height={14} className="block h-[14px] w-[14px] shrink-0" />
          <p className="ld-legal-date">{updated}</p>
        </div>
      </Row>

      {/* Spacer row with pixel #5 */}
      <Row height={24} className="overflow-hidden" aria-hidden="true">
        <Pixel n={5} style={{ right: 0, top: 0 }} />
      </Row>

      {/* Title row: pixels #6 top-anchored, #7/#8 bottom-anchored */}
      <Row className="overflow-hidden">
        <div className="px-[20px] tab:px-[64px]">
          <h1 className="ld-legal-h1 max-w-[780px]">{title}</h1>
        </div>
        <Pixel n={6} style={{ left: 821, top: 0 }} />
        <Pixel n={7} style={{ left: 880, bottom: 0 }} />
        <Pixel n={8} style={{ left: 632, bottom: 0 }} />
      </Row>

      <Spacer height={40} />

      {/* WrapperContent: padding-left 40 (≥810) / padding 0 24 24 0 (phone) */}
      <div className="flex w-full overflow-clip pb-[24px] pr-[24px] tab:pb-0 tab:pl-[40px] tab:pr-0">
        <div className="relative flex min-w-0 flex-1 flex-row gap-[48px] pb-[44px] pl-[24px] pt-[20px]">
          <Lines sides="l" dashed />
          <div className="flex min-w-0 max-w-[768px] flex-1 flex-col gap-[20px]">{children}</div>
          {/* TableOfContent: empty on every live page — kept as a 320px sticky spacer (§8) */}
          <div aria-hidden="true" className="sticky top-[120px] hidden w-[320px] shrink-0 self-start pt-[32px] min-[1000px]:block" />
        </div>
      </div>

      <CtaBand lines="trl" />
    </PageFrame>
  )
}
