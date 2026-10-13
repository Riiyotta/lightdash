// Copy + assets: specs/product-pages.md §2.9 and Appendix A "integrations".
// Logo files are not mapped to cards in the spec; mapping below was matched visually against
// reference/pages/integrations-1440.png.
const A = '/assets/pages/integrations'
const png = (f) => `${A}/${f}.png`

// Tag colours (text; background is the same colour at opacity .15)
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Warehouse', label: 'Warehouse', color: '#B3480F' },
  { id: 'Version Control', label: 'Version Control', color: '#567A0A' },
  { id: 'Alerts & sharing', label: 'Alerts & sharing', color: '#CC003C' },
  { id: 'Transformation', label: 'Transformation', color: '#BF00A2' },
  { id: 'Data observability', label: 'Data observability', color: '#2953FF' },
  { id: 'Marketplace', label: 'Marketplace', color: '#2953FF' },
]

const VC_BODY = 'Pull your latest data models directly from git and get all the benefits of version control in Lightdash'

export const INTEGRATIONS = [
  { name: 'Amazon Athena', category: 'Warehouse', logo: `${A}/mRca0EVwLuvqdnJYYX596TAxTk.svg`, body: 'Connect your Amazon Athena warehouse to start building and sharing data insights.' },
  { name: 'Amazon RedShift', category: 'Warehouse', logo: png('ECfsz0d2tgAZ4zcU4Gh5K1YbUk'), body: 'Connect your Redshift warehouse to start building and sharing data insights.' },
  { name: 'Azure DevOps', category: 'Version Control', logo: png('8fV0y12bngbMbIMpsjwoZ7030A'), body: VC_BODY },
  { name: 'BigQuery', category: 'Warehouse', logo: png('TkKIIdkMRkcsVDbkAcmVItyufKI'), body: 'Connect your BigQuery warehouse to start building and sharing data insights.' },
  { name: 'Bitbucket', category: 'Version Control', logo: png('27mQyMmrfnx8uDymZLEw7pEf0'), body: VC_BODY },
  { name: 'ClickHouse', category: 'Warehouse', logo: png('xk0JkY7v8jgtZbXqeaRyNGnWdI'), body: 'Connect your ClickHouse cluster to start building and sharing data insights.' },
  { name: 'Databricks', category: 'Warehouse', logo: png('kb2zDN9v5Q7C6MEV9CymCqzu6FY'), body: 'Connect your Databricks warehouse to start building and sharing data insights.' },
  { name: 'dbt', category: 'Transformation', logo: png('qTJAFCCMCDY219UhMgoxsZsIMY'), body: 'Connect your dbt project and pull through all your metrics.' },
  { name: 'Github', category: 'Version Control', logo: png('zLqeVHHoorTXgQ28IMxJfEfb8'), body: 'Pull your latest data models directly from git.' },
  { name: 'GitLab', category: 'Version Control', logo: png('0ZSGgAOW7BT3DS4HkXicaEVYcI'), body: VC_BODY },
  {
    name: 'Google Cloud Marketplace',
    category: 'Marketplace',
    logo: png('cpv9E7spZqTDhEt93U6z4zqQwc'),
    body: 'Purchase Lightdash through Google Cloud Marketplace to speed up deployment and apply your GCP committed spend.',
  },
  { name: 'Metaplane', category: 'Data observability', logo: png('dY9P9ZZMJgdrHpyEXKzCqbHm3M'), body: 'Ensure your data quality is always correct using Metaplane.' },
  { name: 'MotherDuck', category: 'Warehouse', logo: png('Rkz6X5TZKUJ2a9UrtpB3qmA7Vc'), body: 'Connect your DuckDB warehouse to start building and sharing data insights.' },
  { name: 'MS Teams', category: 'Alerts & sharing', logo: png('b2UnRd6QNYxgIdniPZbTle3CNdw'), body: 'Use MS Teams to send reports or share dashboards where your team already works' },
  { name: 'PostgreSQL', category: 'Warehouse', logo: png('4QD2pSqjJ10VKapoymqK3dzX0TE'), body: 'Connect your Postgres database to start building and sharing data insights.' },
  { name: 'Rollstack', category: 'Alerts & sharing', logo: png('HcCLCLqt6IWofAHNrZKjGCSJ9w'), body: 'Use Rollstack to export Lightdash charts straight into your presentations.' },
  {
    name: 'Secoda',
    category: 'Data observability',
    logo: png('fIFICIvC6aCLoa7qwF4ZcONU530'),
    body: 'Consolidate your data catalog, lineage, governance, monitoring, and observability tools into a single platform.',
  },
  { name: 'Slack', category: 'Alerts & sharing', logo: png('CFBr4xIVwl7AGajjsDtCLA1WCE'), body: 'Use our Slack bot to send reports or share dashboards where your team already works' },
  { name: 'Snowflake', category: 'Warehouse', logo: png('3JXpNOEwf93wQwGLzwjVRCWljk'), body: 'Connect your Snowflake warehouse to start building and sharing data insights.' },
  { name: 'Supabase', category: 'Warehouse', logo: `${A}/c5AFABfm3g45qDtLf1DrFyWZQ.svg`, body: 'Connect your Supabase warehouse to start building and sharing data insights.' },
  { name: 'Trino', category: 'Warehouse', logo: png('kX07DxNzCNPxZf5BFrQqoUG7u38'), body: 'Connect to Trino to start building and sharing data insights.' },
]

export const hero = {
  lines: ['Explore Lightdash', 'Integrations'],
  sub: 'Lightdash integrates with the tools and services you already use and love.',
}

// 18 × 30px squares on a 30px grid, x measured in the 1280 frame (column origin = right edge).
// Top group anchored to the hero top (drops in from y −30), bottom group anchored to the hero bottom
// (rises from +30). File ↔ cell matched visually (spec: "positions in Appendix A" — not actually listed).
const col = (n) => 1250 - 30 * n
export const pixelsTop = [
  [0, 0, '6qxuabf74xrcuQWWVDrganMy7c'],
  [2, 0, '4q3jIAkLfgO3ToypIawHONpHvw'],
  [4, 0, 'MrCsvzk6z8V3Izh5zM9iWqAPhJo'],
  [1, 1, 'og1rxGrnyfKoy6WAWAtIQNfplrs'],
  [3, 1, 'VGOsHnXl8ZW5ALpapKMmucbR4'],
  [5, 1, 'ScH5lXIKGr1OEuYMSii24VTxrA'],
  [0, 2, 'ScH5lXIKGr1OEuYMSii24VTxrA'],
  [2, 2, 'jKUREPWVN8T8NUlX4cLWRg2k'],
  [1, 3, 'bTfxMiyF6fHx0cA68gFQ5ZHZ7SU'],
  [3, 3, 'kfvyfVbNMSKvItRHsNsb6GUs1mc'],
  [2, 4, '4q3jIAkLfgO3ToypIawHONpHvw'],
].map(([c, r, f]) => ({ src: png(f), x: col(c), y: 30 * r }))
// bottom offsets: row 0 is the bottom-most row
export const pixelsBottom = [
  [6, 0, 'kfvyfVbNMSKvItRHsNsb6GUs1mc'],
  [4, 0, 'P7wa5366n0UsiluRklauNrQ0M'],
  [2, 0, 'aybeQpZeAjpffEr9yf6XbTb4Ges'],
  [0, 0, 'b2wPKVlLfwuA986hOQajwfKmaH4'],
  [3, 1, 'OLm03MIh47tjY2Z2qwLZPDINNc'],
  [1, 1, 'aybeQpZeAjpffEr9yf6XbTb4Ges'],
  [2, 2, 'mF6hudIaanGmRRGPsPv8KTgX78'],
].map(([c, r, f]) => ({ src: png(f), x: col(c), bottom: 30 * r }))
