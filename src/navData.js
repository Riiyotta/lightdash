// Copy + hrefs from CLONE_SPEC.md §3, §5.2, §7.
// Relative "./x" routes now exist in the multi-page clone, so they map to local paths ("/x").
// Same-origin <a href="/x"> clicks are turned into client-side navigations by <LinkInterceptor/> (src/App.jsx).
const LD = ''
const icon = (f) => `/assets/nav/${f}`

export const LINKS = {
  home: '/',
  pricing: `${LD}/pricing`,
  start: `${LD}/start`,
  login: 'https://app.lightdash.cloud/login',
  changelog: 'https://changelog.lightdash.com/',
  demo: 'https://demo.lightdash.com/projects/2014e038-ff4b-4761-ae6f-fbf551e7b468/home',
  docs: 'https://docs.lightdash.com/introduction',
  blog: `${LD}/blog`,
  customerStories: `${LD}/customer-stories`,
}

export const CAL_EMBED_URL =
  'https://lightdash.cal.com/lightdash/talk/embed?layout=month_view&theme=light&embedType=inline'

// §3.2 desktop Product panel
export const PRODUCT_ITEMS = [
  { title: 'Conversational analytics', desc: 'Ask AI questions in plain English', href: `${LD}/conversational-analytics`, icon: icon('icon-conversational-analytics.png') },
  { title: 'Data apps', desc: 'Build apps on governed data', href: `${LD}/data-apps`, icon: icon('icon-data-apps.png') },
  { title: 'Metrics Catalog', desc: 'Every KPI in one trusted place', href: `${LD}/metrics-catalog`, icon: icon('icon-metrics-catalog.png') },
  { title: 'Embedded analytics', desc: 'AI-powered insights anywhere', href: `${LD}/embedding`, icon: icon('icon-embedded-analytics.png') },
  { title: 'Interactive dashboards', desc: 'Dig into every number', href: `${LD}/interactive-dashboards`, icon: icon('icon-interactive-dashboards.png') },
]

export const PLATFORM_ITEMS = [
  { title: 'Context layer', desc: 'Use AI to build dashboards', href: `${LD}/context-layer`, icon: icon('icon-context-layer.png') },
  { title: 'BI as code', desc: 'Build & maintain dashboards in code', href: `${LD}/bi-as-code`, icon: icon('icon-bi-as-code.png') },
  { title: 'Self-improving analytics', desc: 'Ditch dashboard upkeep', href: `${LD}/self-improving-analytics`, icon: icon('icon-self-improving-analytics.png') },
  { title: 'Integrations', desc: 'Use the tools you already love', href: `${LD}/integrations`, icon: icon('icon-integrations.png') },
]

// §5.2 mobile copy differs from desktop
export const MOBILE_PRODUCT_ITEMS = [
  { title: 'Conversational analytics', desc: 'Ask AI questions in plain English', href: `${LD}/conversational-analytics`, icon: icon('icon-conversational-analytics.png') },
  { title: 'Data apps', desc: 'Build apps on governed data', href: `${LD}/data-apps`, icon: icon('icon-data-apps.png') },
  { title: 'Metrics catalog', desc: 'Every KPI in one trusted place', href: `${LD}/metrics-catalog`, icon: icon('icon-metrics-catalog.png') },
  { title: 'Embedded analytics', desc: 'AI-powered insights anywhere', href: `${LD}/embedding`, icon: icon('icon-embedded-analytics.png') },
  // spec: mobile uses the integrations icon (0bNX6rvk3HSq9u4ipRLNxgIZWc.png) for this row
  { title: 'Interactive dashboards', desc: 'Explore the story behind every number', href: `${LD}/interactive-dashboards`, icon: icon('icon-integrations.png') },
]

export const MOBILE_PLATFORM_ITEMS = [
  { title: 'Context layer', desc: 'Governed context your AI needs', href: `${LD}/context-layer`, icon: icon('icon-context-layer.png') },
  { title: 'BI as code', desc: 'Build & maintain dashboards in code', href: `${LD}/bi-as-code`, icon: icon('icon-bi-as-code.png') },
  { title: 'Self-improving analytics', desc: 'Free your team from dashboard upkeep', href: `${LD}/self-improving-analytics`, icon: icon('icon-self-improving-analytics.png') },
  { title: 'Integrations', desc: 'Use the tools you already love', href: `${LD}/integrations`, icon: icon('icon-integrations.png') },
]

// §3.1 feature cards
export const PRODUCT_CARDS = [
  { title: 'Changelog', desc: 'Check out our latest product updates', href: LINKS.changelog, color: 'green', external: true, height: 113 },
  { title: 'Try Live demo', desc: 'Give Lightdash a go', href: LINKS.demo, color: 'purple', external: true, height: 110 },
]

export const RESOURCE_CARDS = [
  { title: 'Docs', desc: 'Get stuck in', href: LINKS.docs, color: 'green', external: true, height: 195.5 },
  { title: 'Lightning Posts', desc: 'Our blog!', href: LINKS.blog, color: 'orange', external: false, height: 195.5 },
]

// §3.4
export const RESOURCE_COL2 = [
  { title: 'About Us', desc: 'Our story so far...', href: `${LD}/about`, icon: icon('icon-about-us.jpg') },
  { title: 'Product Roadmap', desc: 'Have a peek at our plans', href: `${LD}/roadmap`, icon: icon('icon-product-roadmap.png') },
]
export const RESOURCE_COL3 = [
  { title: 'Community', desc: 'Join our Slack Community!', href: 'https://go.lightdash.com/community', icon: icon('icon-community.jpg') },
  { title: 'Partnerships', desc: 'Partner with us!', href: `${LD}/partnerships`, icon: icon('icon-partnerships.jpg') },
]

// §3.3 / §5.2 customers
const logo = (slug, name, extra = {}) => ({
  name,
  src: `/assets/nav/customers/${slug}.svg`,
  href: LINKS.customerStories,
  ...extra,
})
const FAL = logo('fal', 'fal', { href: `${LD}/customer-story/fal`, caseStudy: true })

export const CUSTOMER_GROUPS = [
  { desktop: 'Banking & Financial services', mobile: 'Financial services', logos: [logo('wise', 'Wise'), logo('kraken', 'Kraken'), logo('oaknorth', 'OakNorth')] },
  { desktop: 'E-commerce', mobile: 'Enterprise software', logos: [logo('adobe', 'Adobe'), logo('servicenow', 'ServiceNow'), logo('workday', 'Workday')] },
  { desktop: 'AI & Developer tools', mobile: 'AI & developer platforms', logos: [FAL, logo('modelml', 'Model ML'), logo('tempo', 'Tempo')] },
  { desktop: 'Energy & Logistics', mobile: 'Energy, mobility & delivery', logos: [logo('octopus-energy', 'Octopus Energy'), logo('indrive', 'inDrive'), logo('flink', 'Flink')] },
]
