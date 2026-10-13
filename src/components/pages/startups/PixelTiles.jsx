// specs/company-pages.md §1.7 hero pixel corners (startups, jp): 32×32 tiles at the top-left / top-right of
// the hero column. Positions are relative to the hero's top-left corner in the 1280 frame; x ≥ 640 anchors
// to the right edge so the right cluster follows the frame below 1280.
// MOTION (Animation agent): translateY(-32px) → 0, spring 0.6s bounce 0, delay 1.0s, all together, opacity
// stays 1. Hooks: [data-hero-pixel][data-pixel-drop].
// Phone (reference *-390.png): only some left-cluster tiles show — startups (0,0) (32,32) (64,0); jp (0,0) (64,0) (128,0).
export const LAVENDER = {
  a: '/assets/pages/startups/image-u7dNRCA7eBT5ijuB3LwSSfJMPw.png',
  b: '/assets/pages/startups/image-1mJCqq22wlHJTEtL6wg98s8lIc8.png',
  c: '/assets/pages/startups/image-1kZ2cjGoFa40wKm8T64QebKfrR8.png',
  d: '/assets/pages/startups/image-1dXtMtg8ao6Uylqs5vsrxyDAmvM.png',
}

export const STARTUPS_TILES = [
  { src: LAVENDER.a, x: 0, y: 0 },
  { src: LAVENDER.b, x: 32, y: 32 },
  { src: LAVENDER.c, x: 0, y: 64 },
  { src: LAVENDER.d, x: 64, y: 0 },
  { src: LAVENDER.d, x: 1184, y: 0 },
  { src: LAVENDER.b, x: 1216, y: 32 },
  { src: LAVENDER.a, x: 1248, y: 0 },
  { src: LAVENDER.c, x: 1248, y: 64 },
]

export default function PixelTiles({ tiles, size = 32, phone = ['0,0', '32,32', '64,0'] }) {
  return (
    <>
      {tiles.map((t, i) => {
        const right = t.x >= 640
        const onPhone = !right && phone.includes(`${t.x},${t.y}`)
        return (
          <img
            key={i}
            src={t.src}
            alt=""
            width={size}
            height={size}
            data-hero-pixel=""
            data-pixel-drop={-32}
            className={`pointer-events-none absolute z-[2] object-cover ${onPhone ? 'block' : 'hidden tab:block'}`}
            style={{ width: size, height: size, top: t.y, ...(right ? { right: 1280 - t.x - size } : { left: t.x }) }}
          />
        )
      })}
    </>
  )
}
