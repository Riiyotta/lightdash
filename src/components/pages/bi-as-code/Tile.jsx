// A single pixel "Block-Master" tile, absolutely positioned (left/top or right/bottom offsets).
export default function Tile({ src, size = 24, x, y, right, bottom, className = '' }) {
  const pos = right !== undefined ? { right, bottom } : { left: x, top: y }
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`pointer-events-none absolute block object-cover ${className}`}
      style={{ ...pos, width: size, height: size }}
    />
  )
}
