import LegalPage from '../components/legal/LegalPage.jsx'

// /sub-processors — legal-pages §3.1: a single 13-item bulleted list, Inter 16/32, name in 600.
// Entries are placeholders (Name + " - " or " – " + purpose), not the live vendor list.
const ITEMS = [
  ['Vendor A', ' - ', 'Source hosting and project tracking'],
  ['Vendor B', ' - ', 'Team messaging'],
  ['Vendor C', ' - ', 'Shared documents and email'],
  ['Vendor D', ' - ', 'Contact management'],
  ['Vendor E', ' - ', 'Error monitoring'],
  ['Vendor F', ' - ', 'Payment handling'],
  ['Vendor G', ' - ', 'Invoicing and order forms'],
  ['Vendor H', ' - ', 'Product analytics'],
  ['Vendor I', ' – ', 'Email delivery'],
  ['Vendor J', ' – ', 'Support ticketing'],
  ['Vendor K', ' – ', 'Cloud hosting'],
  ['Vendor L', ' – ', 'Language model provider'],
  ['Vendor M', ' – ', 'Language model provider'],
]

export default function SubProcessors() {
  return (
    <LegalPage
      title="Sub-processors"
      docTitle="Lightdash Sub Processors"
      updated="Last Updated: Nov 2025"
    >
      <div className="ld-legal-rt">
        <ul className="ld-legal-sp">
          {ITEMS.map(([name, sep, purpose]) => (
            <li key={name}>
              <p>
                <span className="ld-legal-sp-name">{name}</span>
                {sep}
                {purpose}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </LegalPage>
  )
}
