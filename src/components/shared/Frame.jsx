// "Blueprint" primitives shared by product, CMS and legal templates.
// Framer draws every hairline as an absolutely positioned ::after border, so lines never take
// layout space. <Lines/> reproduces that: an inset-0 overlay with only the requested sides.

const SIDE = { t: 'border-t', r: 'border-r', b: 'border-b', l: 'border-l' }

/**
 * Hairline overlay. Place inside a `relative` parent.
 * sides: string of t/r/b/l letters, e.g. "trl" (= Framer "1px 1px 0 1px"), "b", "trbl".
 * dashed: dashed (internal grid lines) vs solid (section frames).
 * color: a Tailwind border-colour class. Default `border-ld-line` (#E5E7EB).
 */
export function Lines({ sides = 'trbl', dashed = false, color = 'border-ld-line', className = '', style }) {
  const cls = [...sides].map((s) => SIDE[s]).filter(Boolean).join(' ')
  return (
    <span
      aria-hidden="true"
      style={style}
      className={`pointer-events-none absolute inset-0 z-[1] ${cls} ${dashed ? 'border-dashed' : 'border-solid'} ${color} ${className}`}
    />
  )
}

/**
 * SHARED §0 Content-wrapper / cms §1.1 frame column.
 * 1280 max, centred, 16px gutters below 1312 (calc(100% - 32px)). Flex column, overflow clip.
 * frame: which sides get the 1px solid #E5E7EB line. Product pages: "trl" (Framer "1px 1px 0 1px").
 *        CMS / legal: "trbl".
 */
export function PageFrame({ frame = 'trl', clip = true, className = '', children, ...rest }) {
  return (
    <div
      className={`relative mx-auto flex w-[calc(100%-32px)] max-w-[1280px] flex-col ${clip ? 'overflow-clip' : ''} ${className}`}
      {...rest}
    >
      {children}
      {frame && <Lines sides={frame} />}
    </div>
  )
}

/**
 * A full-frame-width row with a hairline (cms §1.1 "horizontal rule rows", legal §2.2 rows).
 * height: px number (fixed rows / spacers) or undefined (content height).
 * lines: sides for the line overlay (default bottom). dashed default true.
 */
export function Row({ height, lines = 'b', dashed = true, color, className = '', style, children, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`relative w-full shrink-0 ${className}`} style={{ height, ...style }} {...rest}>
      {children}
      {lines && <Lines sides={lines} dashed={dashed} color={color} />}
    </Tag>
  )
}

/** Empty graph-paper spacer row (20/24/32/40/100 px etc.) with a dashed bottom line. */
export function Spacer({ height, lines = 'b', dashed = true, className = '' }) {
  return <Row height={height} lines={lines} dashed={dashed} className={className} aria-hidden="true" />
}

/**
 * Generic section block inside the 1280 frame: relative, white, optional hairlines.
 * Most library sections build on this.
 */
export function Section({ lines, dashed = false, className = '', children, as: Tag = 'section', ...rest }) {
  return (
    <Tag className={`relative w-full bg-white ${className}`} {...rest}>
      {children}
      {lines && <Lines sides={lines} dashed={dashed} />}
    </Tag>
  )
}
