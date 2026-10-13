import { Fragment } from 'react'
import LegalPage, { LegalSeparator } from '../components/legal/LegalPage.jsx'
import { lorem, shortItem } from '../components/legal/placeholder.js'

// /terms-of-service — legal-pages §2.3/§3: one rich-text block (H5 section headings + numbered body
// paragraphs), followed by a Separator. Heading text is from §3.2; all bodies are placeholders.
//
// Section shape: [num, mainClauses] where each main clause is [sentences, subItems].
const SECTIONS = [
  { h: 'RIGHT TO ACCESS AND USE THE SOFTWARE', plain: true, num: 1, clauses: [[4, 3], [3, 0], [1, 3], [3, 0], [4, 0]] },
  { h: 'RESTRICTIONS AND RESPONSIBILITIES', num: 2, ol: true, clauses: [[6, 0], [7, 0], [8, 0], [7, 0], [3, 0]] },
  { empty: true },
  { h: 'CONFIDENTIALITY', num: 3, clauses: [[8, 0], [5, 0], [6, 0], [4, 0]] },
  { h: 'PAYMENT OF FEES', num: 4, clauses: [[4, 0], [5, 3], [6, 0], [4, 0], [3, 0]] },
  { h: '5 TERM AND TERMINATION', num: 5, clauses: [[5, 0], [2, 3], [6, 0], [4, 0]] },
  { h: '6 WARRANTY AND DISCLAIMER', num: 6, clauses: [[6, 0], [8, 0], [4, 0]] },
  { h: '7 INTELLECTUAL PROPERTY RIGHTS INDEMNITY', num: 7, clauses: [[5, 0], [6, 3], [5, 0], [3, 0]] },
  { h: '8 CUSTOMER DATA AND USAGE DATA', num: 8, clauses: [[5, 0], [6, 0], [4, 0], [3, 0], [3, 0], [4, 0], [9, 0]] },
  { h: '9 LIMITATION OF LIABILITY', num: 9, clauses: [[3, 0], [3, 3], [6, 0], [4, 0]] },
  { empty: true },
  { h: '11 FORCE MAJEURE', num: 11, clauses: [[7, 0], [4, 0]] },
  { h: ['Schedule 1', 'DEFINITIONS AND INTERPRETATION'], defs: 12 },
  { h: '12 MISCELLANEOUS', num: 12, clauses: [[4, 0], [5, 0], [3, 0], [6, 0], [4, 0], [3, 0]] },
]

const DEF_TERMS = ['Sample Term', 'Example Term', 'Placeholder Term', 'Illustrative Term']

// Most live headings are wrapped in <strong> (Inter 900); the first one is not (renders at 700).
function Heading({ text, plain }) {
  const content = Array.isArray(text)
    ? text.map((t, i) => (
        <Fragment key={t}>
          {i > 0 && <br />}
          {t}
        </Fragment>
      ))
    : text
  return <h5>{plain ? content : <strong>{content}</strong>}</h5>
}

function renderSection(s, si) {
  const out = []
  if (s.empty) {
    // empty H5 spacer authored on the live page (§3.2)
    out.push(
      <h5 key={`e${si}`} aria-hidden="true">
        <br />
      </h5>,
    )
    return out
  }
  if (s.ol) {
    out.push(
      <ol key={`h${si}`} className="ld-legal-ol" start={s.num}>
        <li>
          <Heading text={s.h} />
        </li>
      </ol>,
    )
  } else {
    out.push(<Heading key={`h${si}`} text={s.h} plain={s.plain} />)
  }
  if (s.defs) {
    for (let d = 0; d < s.defs; d++) {
      out.push(
        <p key={`d${si}-${d}`}>
          <strong>{`${DEF_TERMS[d % DEF_TERMS.length]} ${d + 1}`}</strong> means {lorem(1 + (d % 4), d).replace(/^This/, 'this')}
        </p>,
      )
    }
    return out
  }
  s.clauses.forEach(([sentences, subs], ci) => {
    const n = `${s.num}.${ci + 1}`
    out.push(
      <p key={n}>
        <strong>{n}</strong> {lorem(sentences, si + ci)}
      </p>,
    )
    for (let k = 0; k < subs; k++) {
      const sn = `${n}.${k + 1}`
      out.push(
        <p key={sn}>
          <strong>{sn}</strong> {shortItem(k)}
        </p>,
      )
    }
  })
  return out
}

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      docTitle="Lightdash Terms of Service"
      description="Review Lightdash’s Terms of Service to understand your rights, data usage, and responsibilities when using our AI-first BI platform."
      updated="Last Updated: Feb 2023"
    >
      <div className="ld-legal-rt">{SECTIONS.flatMap(renderSection)}</div>
      <LegalSeparator />
    </LegalPage>
  )
}
