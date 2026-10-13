import { useEffect, useRef } from 'react'

// Cal.com inline embed, wired the way the live Framer "Calcom" component does it: load
// https://app.cal.com/embed/embed.js, init a namespace with origin https://lightdash.cal.com, then
// Cal.ns[ns]("inline", { elementOrSelector, calLink: "lightdash/talk", config: { layout, theme } }).
// embed.js renders <cal-inline> with its own grey loading spinner; the Cal iframe keeps its body
// hidden until the embed handshake completes, so a bare <iframe> renders blank.
const CAL_EMBED_JS = 'https://app.cal.com/embed/embed.js'
export const CAL_ORIGIN = 'https://lightdash.cal.com'
export const CAL_LINK = 'lightdash/talk'
const CAL_CONFIG = { layout: 'month_view', theme: 'light' }

// Cal's documented bootstrap: a queueing stub that injects embed.js once.
function getCal() {
  const w = window
  if (!w.Cal) {
    const push = (api, args) => api.q.push(args)
    w.Cal = function Cal(...args) {
      const cal = w.Cal
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        const script = document.createElement('script')
        script.src = CAL_EMBED_JS
        document.head.appendChild(script)
        cal.loaded = true
      }
      if (args[0] === 'init') {
        const api = (...a) => push(api, a)
        api.q = api.q || []
        const namespace = args[1]
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api
          push(cal.ns[namespace], args)
          push(cal, ['initNamespace', namespace])
        } else push(cal, args)
        return
      }
      push(cal, args)
    }
  }
  return w.Cal
}

const inited = new Set()

// Returns a ref for the container element; mounts one <cal-inline> into it (StrictMode-safe).
// Each consumer passes its own namespace, which is initialised once per page load.
export default function useCalInline(namespace) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || el.dataset.calMounted) return
    el.dataset.calMounted = '1'
    const Cal = getCal()
    if (!inited.has(namespace)) {
      Cal('init', namespace, { origin: CAL_ORIGIN })
      inited.add(namespace)
    }
    Cal.ns[namespace]('inline', { elementOrSelector: el, calLink: CAL_LINK, config: CAL_CONFIG })
    Cal.ns[namespace]('ui', CAL_CONFIG)
  }, [namespace])
  return ref
}
