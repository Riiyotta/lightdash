import html from './context-diagram.html?raw'

// specs/product-pages.md §2.6: the live "Context Layer" code component (.cl-root), captured verbatim
// with all its CSS (21 keyframes: connector pulses, dots, arrow glow, platform glow, cl-rise on load)
// to public/assets/pages/context-layer/context-diagram.html. A copy lives next to this file so it can be
// bundled with ?raw; icons + font stay in public/assets/pages/context-layer/diagram/.
// The diagram is responsive through its own @container queries (stacks vertically on phones).
export default function ContextDiagram() {
  return <div className="w-full" dangerouslySetInnerHTML={{ __html: html }} />
}
