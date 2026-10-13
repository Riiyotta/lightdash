// §3.1 pixel decorations: 20×20 square flush top-right, 80×20 strip flush bottom-right (absolute, z 1).
// `variant="stacked"` is the Customers footer layout (§3.3): square sits directly above the strip's right end.
export default function PixelDeco({ color, variant = 'card' }) {
  const square = `/assets/nav/square-${color}.png`
  const strip = `/assets/nav/strip-${color}.png`
  if (variant === 'stacked') {
    return (
      <>
        <img src={square} alt="" className="pointer-events-none absolute bottom-[20px] right-0 z-[1] h-[20px] w-[20px] object-cover" />
        <img src={strip} alt="" className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[20px] w-[80px] object-cover" />
      </>
    )
  }
  return (
    <>
      <img src={square} alt="" className="pointer-events-none absolute right-0 top-0 z-[1] h-[20px] w-[20px] object-cover" />
      <img src={strip} alt="" className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[20px] w-[80px] object-cover" />
    </>
  )
}
