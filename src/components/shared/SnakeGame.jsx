import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Snake mini-game for the CTA band. Behaviour from specs/SHARED.md §9 and specs/legal-pages.md §4.1
// (timings, grid, demo/autopilot, READY/GO/GAME OVER, controls). Written from the spec, not ported.
// Tile textures: the 7 purple/lavender pixel tiles extracted from the live inline data URIs
// (public/assets/cms/shared/snake-cell-0..6.svg).

const TILES = Array.from({ length: 7 }, (_, i) => `url("/assets/cms/shared/snake-cell-${i}.svg")`)

const DEMO_TICK = 190
const PLAY_TICK = 135
const FOOD_COUNT = 5
const FOOD_STAGGER = 240
const FOOD_FADE = 240
const GONE_REMOVE = 360
const RESTART_DELAY = 250
const GO_AT = 800
const PLAY_AT = 1450
const SWIPE_MIN = 24
const ASTAR_WEIGHT = 1.8

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }
const OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' }
const KEYS = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', W: 'up', s: 'down', S: 'down', a: 'left', A: 'left', d: 'right', D: 'right',
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const randTile = () => TILES[Math.floor(Math.random() * TILES.length)]
const key = (x, y) => `${x},${y}`

// ---- pathfinding ----------------------------------------------------------------------------------

function neighbours(x, y, cols, rows, blocked) {
  const out = []
  for (const [name, [dx, dy]] of Object.entries(DIRS)) {
    const nx = x + dx
    const ny = y + dy
    if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
    if (blocked.has(key(nx, ny))) continue
    out.push({ name, x: nx, y: ny })
  }
  return out
}

// Weighted A* (f = g + w*h, Manhattan). Returns the first step's direction name, or null.
function aStar(start, goal, cols, rows, blocked) {
  const startK = key(start.x, start.y)
  const goalK = key(goal.x, goal.y)
  const h = (x, y) => Math.abs(x - goal.x) + Math.abs(y - goal.y)
  const open = [{ x: start.x, y: start.y, g: 0, f: ASTAR_WEIGHT * h(start.x, start.y), first: null }]
  const best = new Map([[startK, 0]])
  const closed = new Set()
  while (open.length) {
    let bi = 0
    for (let i = 1; i < open.length; i++) if (open[i].f < open[bi].f) bi = i
    const cur = open.splice(bi, 1)[0]
    const ck = key(cur.x, cur.y)
    if (ck === goalK) return cur.first
    if (closed.has(ck)) continue
    closed.add(ck)
    for (const n of neighbours(cur.x, cur.y, cols, rows, blocked)) {
      const nk = key(n.x, n.y)
      const g = cur.g + 1
      if (closed.has(nk) || g >= (best.get(nk) ?? Infinity)) continue
      best.set(nk, g)
      open.push({ x: n.x, y: n.y, g, f: g + ASTAR_WEIGHT * h(n.x, n.y), first: cur.first ?? n.name })
    }
  }
  return null
}

function floodArea(x, y, cols, rows, blocked) {
  const seen = new Set([key(x, y)])
  const stack = [[x, y]]
  while (stack.length) {
    const [cx, cy] = stack.pop()
    for (const n of neighbours(cx, cy, cols, rows, blocked)) {
      const nk = key(n.x, n.y)
      if (!seen.has(nk)) {
        seen.add(nk)
        stack.push([n.x, n.y])
      }
    }
  }
  return seen.size
}

// ---- component ------------------------------------------------------------------------------------

/**
 * <SnakeGame block={30} interactive background="transparent" className="h-full w-full" />
 * Fills its box. Grid = clamp(round(w/block), 8, 80) × clamp(round(h/block), 6, 60).
 */
export default function SnakeGame({ block = 30, interactive = true, background = 'transparent', className = '', style }) {
  const stageRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [, setFrame] = useState(0)
  const render = useCallback(() => setFrame((f) => (f + 1) % 1e9), [])

  const g = useRef({
    mode: 'idle', // idle | demo | ready | play | dead
    cols: 0,
    rows: 0,
    snake: [], // head first: { id, x, y, tile, gone }
    foods: [], // { id, x, y, tile, spawning, eaten }
    spawned: 0,
    dir: 'up',
    queue: [],
    score: 0,
    showScore: false,
    faded: false,
    message: null, // { big, small, id }
    lastMessage: null,
    uid: 0,
    timers: new Set(),
    frames: new Set(),
    interval: null,
    pointer: null,
  }).current

  // ---- timer bookkeeping
  const later = useCallback(
    (ms, fn) => {
      const t = setTimeout(() => {
        g.timers.delete(t)
        fn()
      }, ms)
      g.timers.add(t)
    },
    [g],
  )
  const nextFrame = useCallback(
    (fn) => {
      const a = requestAnimationFrame(() => {
        g.frames.delete(a)
        const b = requestAnimationFrame(() => {
          g.frames.delete(b)
          fn()
        })
        g.frames.add(b)
      })
      g.frames.add(a)
    },
    [g],
  )
  const stopAll = useCallback(() => {
    g.timers.forEach(clearTimeout)
    g.timers.clear()
    g.frames.forEach(cancelAnimationFrame)
    g.frames.clear()
    if (g.interval) clearInterval(g.interval)
    g.interval = null
  }, [g])
  const startTick = useCallback(
    (ms, step) => {
      if (g.interval) clearInterval(g.interval)
      g.interval = setInterval(step, ms)
    },
    [g],
  )

  // ---- board helpers
  const occupied = useCallback(() => {
    const s = new Set()
    for (const seg of g.snake) s.add(key(seg.x, seg.y))
    for (const f of g.foods) if (!f.eaten) s.add(key(f.x, f.y))
    return s
  }, [g])

  const spawnFood = useCallback(() => {
    const occ = occupied()
    const free = []
    for (let y = 0; y < g.rows; y++) for (let x = 0; x < g.cols; x++) if (!occ.has(key(x, y))) free.push([x, y])
    if (!free.length) return
    const [x, y] = free[Math.floor(Math.random() * free.length)]
    const food = { id: ++g.uid, x, y, tile: randTile(), spawning: true, eaten: false }
    g.foods.push(food)
    g.spawned += 1
    render()
    nextFrame(() => {
      food.spawning = false
      render()
    })
  }, [g, occupied, nextFrame, render])

  const eatFoodAt = useCallback(
    (x, y) => {
      const food = g.foods.find((f) => !f.eaten && f.x === x && f.y === y)
      if (!food) return null
      food.eaten = true
      later(FOOD_FADE, () => {
        g.foods = g.foods.filter((f) => f !== food)
        render()
      })
      return food
    },
    [g, later, render],
  )

  // Move the snake one cell in `dir`. Returns the eaten food (if any).
  const advance = useCallback(
    (nx, ny) => {
      const tail = g.snake[g.snake.length - 1]
      const tailPos = { x: tail.x, y: tail.y }
      for (let i = g.snake.length - 1; i > 0; i--) {
        g.snake[i].x = g.snake[i - 1].x
        g.snake[i].y = g.snake[i - 1].y
      }
      g.snake[0].x = nx
      g.snake[0].y = ny
      const food = eatFoodAt(nx, ny)
      if (food) g.snake.push({ id: ++g.uid, x: tailPos.x, y: tailPos.y, tile: food.tile, gone: false })
      return food
    },
    [g, eatFoodAt],
  )

  // ---- demo mode
  const startDemoRef = useRef(null)

  const endDemoCycle = useCallback(() => {
    if (g.interval) clearInterval(g.interval)
    g.interval = null
    g.snake.forEach((s) => (s.gone = true))
    render()
    later(GONE_REMOVE, () => {
      g.snake = []
      render()
      later(RESTART_DELAY, () => startDemoRef.current())
    })
  }, [g, later, render])

  const demoStep = useCallback(() => {
    const head = g.snake[0]
    if (!head) return
    let dir = null
    if (head.y >= g.rows) {
      dir = 'up' // still entering from below the board
    } else {
      const blocked = new Set()
      for (let i = 0; i < g.snake.length - 1; i++) blocked.add(key(g.snake[i].x, g.snake[i].y))
      const targets = g.foods.filter((f) => !f.eaten)
      if (targets.length) {
        let target = targets[0]
        let bd = Infinity
        for (const f of targets) {
          const d = Math.abs(f.x - head.x) + Math.abs(f.y - head.y)
          if (d < bd) {
            bd = d
            target = f
          }
        }
        dir = aStar(head, target, g.cols, g.rows, blocked)
      }
      if (!dir) {
        // fallback: the move with the largest flood-fill area
        let bestArea = -1
        for (const n of neighbours(head.x, head.y, g.cols, g.rows, blocked)) {
          const b2 = new Set(blocked)
          b2.add(key(head.x, head.y))
          const area = floodArea(n.x, n.y, g.cols, g.rows, b2)
          if (area > bestArea) {
            bestArea = area
            dir = n.name
          }
        }
      }
    }
    if (!dir) {
      endDemoCycle()
      return
    }
    g.dir = dir
    const [dx, dy] = DIRS[dir]
    advance(head.x + dx, head.y + dy)
    if (g.spawned >= FOOD_COUNT && g.foods.every((f) => f.eaten)) {
      render()
      endDemoCycle()
      return
    }
    render()
  }, [g, advance, endDemoCycle, render])

  const startDemo = useCallback(() => {
    stopAll()
    if (!g.cols || !g.rows) return
    g.mode = 'demo'
    g.message = null
    g.faded = false
    g.showScore = false
    g.foods = []
    g.spawned = 0
    g.queue = []
    g.dir = 'up'
    const x = Math.floor(g.cols / 2)
    g.snake = Array.from({ length: 5 }, (_, i) => ({ id: ++g.uid, x, y: g.rows + i, tile: randTile(), gone: false }))
    for (let i = 0; i < FOOD_COUNT; i++) later(i * FOOD_STAGGER, spawnFood)
    startTick(DEMO_TICK, demoStep)
    render()
  }, [g, stopAll, later, spawnFood, startTick, demoStep, render])
  startDemoRef.current = startDemo

  // ---- play mode
  const die = useCallback(() => {
    if (g.interval) clearInterval(g.interval)
    g.interval = null
    g.mode = 'dead'
    g.faded = true
    g.message = { big: 'GAME OVER', small: 'PLAY AGAIN?', id: ++g.uid }
    render()
  }, [g, render])

  const playStep = useCallback(() => {
    if (g.queue.length) g.dir = g.queue.shift()
    const head = g.snake[0]
    const [dx, dy] = DIRS[g.dir]
    const nx = head.x + dx
    const ny = head.y + dy
    if (nx < 0 || ny < 0 || nx >= g.cols || ny >= g.rows) return die()
    const eating = g.foods.some((f) => !f.eaten && f.x === nx && f.y === ny)
    // the tail cell frees up this tick unless the snake grows
    const bodyEnd = eating ? g.snake.length : g.snake.length - 1
    for (let i = 0; i < bodyEnd; i++) if (g.snake[i].x === nx && g.snake[i].y === ny) return die()
    const food = advance(nx, ny)
    if (food) {
      g.score += 1
      spawnFood()
    }
    render()
  }, [g, advance, die, spawnFood, render])

  const startPlay = useCallback(() => {
    stopAll()
    g.mode = 'ready'
    g.score = 0
    g.showScore = true
    g.foods = []
    g.spawned = 0
    g.queue = []
    g.dir = 'right'
    const cx = Math.floor(g.cols / 2)
    const cy = Math.floor(g.rows / 2)
    g.snake = [0, 1, 2].map((i) => ({ id: ++g.uid, x: cx - i, y: cy, tile: randTile(), gone: false }))
    spawnFood()
    g.faded = true
    g.message = { big: 'READY?', id: ++g.uid }
    render()
    later(GO_AT, () => {
      g.message = { big: 'GO!', id: ++g.uid }
      render()
    })
    later(PLAY_AT, () => {
      g.message = null
      g.faded = false
      g.mode = 'play'
      startTick(PLAY_TICK, playStep)
      render()
    })
  }, [g, stopAll, spawnFood, later, startTick, playStep, render])

  const steer = useCallback(
    (dir) => {
      const last = g.queue.length ? g.queue[g.queue.length - 1] : g.dir
      if (dir === last || dir === OPPOSITE[last]) return // 180° turns are ignored
      if (g.queue.length < 2) g.queue.push(dir)
    },
    [g],
  )

  // ---- measure + (re)start on grid change
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((s) => (s.w === width && s.h === height ? s : { w: width, h: height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cols = size.w ? clamp(Math.round(size.w / block), 8, 80) : 0
  const rows = size.h ? clamp(Math.round(size.h / block), 6, 60) : 0

  useEffect(() => {
    g.cols = cols
    g.rows = rows
    if (cols && rows) startDemo()
    else stopAll()
  }, [cols, rows, g, startDemo, stopAll])

  useEffect(() => stopAll, [stopAll])

  // ---- keyboard (only while a game is running)
  const playing = g.mode === 'ready' || g.mode === 'play'
  useEffect(() => {
    if (!interactive || !playing) return
    const onKey = (e) => {
      const dir = KEYS[e.key]
      if (!dir) return
      e.preventDefault()
      steer(dir)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [interactive, playing, steer])

  // ---- pointer: swipe (≥24px) steers, a smaller movement is a tap
  const onPointerDown = (e) => {
    if (!interactive) return
    g.pointer = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    if (!interactive || !g.pointer) return
    const dx = e.clientX - g.pointer.x
    const dy = e.clientY - g.pointer.y
    g.pointer = null
    if (Math.max(Math.abs(dx), Math.abs(dy)) >= SWIPE_MIN) {
      if (g.mode === 'ready' || g.mode === 'play') steer(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up')
      return
    }
    if (g.mode === 'demo' || g.mode === 'dead') startPlay()
  }

  // ---- geometry: integer device-pixel cells, centred
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const cw = cols ? Math.floor((size.w * dpr) / cols) / dpr : 0
  const ch = rows ? Math.floor((size.h * dpr) / rows) / dpr : 0
  const ox = Math.round(((size.w - cw * cols) / 2) * dpr) / dpr
  const oy = Math.round(((size.h - ch * rows) / 2) * dpr) / dpr
  if (g.message) g.lastMessage = g.message
  const msg = g.message ?? g.lastMessage
  const place = (x, y, tile) => ({ transform: `translate(${ox + x * cw}px, ${oy + y * ch}px)`, backgroundImage: tile })

  return (
    <div
      ref={stageRef}
      className={`snk-stage ${className}`}
      style={{ background, ...style }}
      tabIndex={interactive ? 0 : -1}
      aria-label="Snake game. Click to play, steer with the arrow keys or WASD."
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (g.pointer = null)}
    >
      <div className={`snk-board ${g.faded ? 'snk-faded' : ''}`} style={{ '--cw': `${cw}px`, '--ch': `${ch}px` }}>
        {g.foods.map((f) => (
          <div key={f.id} className={`snk-food ${f.spawning ? 'snk-spawning' : ''} ${f.eaten ? 'snk-eaten' : ''}`} style={place(f.x, f.y, f.tile)} />
        ))}
        {g.snake.map((s, i) => (
          <div key={s.id} className={`snk-seg ${i === 0 ? 'snk-head' : ''} ${s.gone ? 'snk-gone' : ''}`} style={place(s.x, s.y, s.tile)} />
        ))}
      </div>
      <div className={`snk-ui snk-score ${g.showScore ? 'snk-show' : ''}`}>SCORE {g.score}</div>
      <div className={`snk-ui snk-message ${g.message ? 'snk-show snk-dim' : ''}`}>
        {/* keep the last text while the overlay fades out (opacity 180ms) */}
        {msg && (
          <>
            <div key={msg.id} className="snk-big snk-pop">
              {msg.big}
            </div>
            {msg.small && <div className="snk-small">{msg.small}</div>}
          </>
        )}
      </div>
    </div>
  )
}
