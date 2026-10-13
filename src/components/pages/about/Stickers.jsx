import { useRef, useState } from 'react'

// specs/company-pages.md §7.1 draggable stickers (behaviour re-implemented with pointer events; the Framer
// component used framer-motion): layer 968×307 centred over the hero, pointer-events none on the layer.
// Each sticker: drag constrained to the layer (dragElastic 0), whileHover scale 1.05, whileDrag scale 1.1 +
// rotate 5° + z-index 1000, cursor grab / grabbing, transition tween .2s. Otherwise z-index = its index.
const LAYER_W = 968
const LAYER_H = 307

function Sticker({ s, index, layerRef }) {
  const size = s.size ?? 80
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const [dragging, setDragging] = useState(false)
  const start = useRef(null)

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    start.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y }
    setDragging(true)
  }
  const onPointerMove = (e) => {
    if (!start.current) return
    const layer = layerRef.current
    const w = layer ? layer.offsetWidth : LAYER_W
    const h = layer ? layer.offsetHeight : LAYER_H
    const nx = start.current.ox + (e.clientX - start.current.px)
    const ny = start.current.oy + (e.clientY - start.current.py)
    // dragConstraints = layer, dragElastic 0
    const x = Math.min(Math.max(nx, -s.x), w - size - s.x)
    const y = Math.min(Math.max(ny, -s.y), h - size - s.y)
    setOffset({ x, y })
  }
  const end = (e) => {
    if (!start.current) return
    start.current = null
    setDragging(false)
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const scale = dragging ? 1.1 : hover ? 1.05 : 1
  const rotate = dragging ? 5 : 0
  return (
    // outer: position + drag offset (follows the pointer 1:1); inner: the clipped sticker that scales/rotates
    <div
      className="pointer-events-auto absolute select-none [touch-action:none]"
      style={{
        left: s.x,
        top: s.y,
        width: size,
        height: size,
        zIndex: dragging ? 1000 : index,
        cursor: dragging ? 'grabbing' : 'grab',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="h-full w-full overflow-hidden"
        style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, transition: 'transform 0.2s ease' }}
      >
        <img src={s.src} alt="Sticker" width={size} height={size} draggable={false} className="pointer-events-none block h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default function Stickers({ stickers, className = '' }) {
  const layerRef = useRef(null)
  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute left-1/2 top-0 z-[5] -translate-x-1/2 ${className}`}
      style={{ width: LAYER_W, height: LAYER_H }}
    >
      {stickers.map((s, i) => (
        <Sticker key={s.src + i} s={s} index={i} layerRef={layerRef} />
      ))}
    </div>
  )
}
