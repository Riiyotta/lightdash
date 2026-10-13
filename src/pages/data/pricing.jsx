// /pricing content (specs/company-pages.md §2). Copy is verbatim from the live site.
const A = '/assets/pages/pricing'

export const PRICING_ASSETS = {
  check: `${A}/variant-1-ac8pM0Numit2MMAYrLC0mGhVyj8.png`, // 19×18 purple check
  cross: `${A}/variant-1-No57bVqVEzUsaazUxqOWybLek.png`, // 19×18 grey cross (opacity .33)
  featureGrey: `${A}/icon-feature-9bd89522.svg`,
  featurePurple: `${A}/icon-feature-e37a4d73.svg`,
  heroImage: `${A}/image-Hlu1ShLNLazxpcPi812eZcUqlU8.png`, // opacity 0 on live (kept for parity)
}

// §2.2 plan cards
export const PLANS = [
  {
    key: 'oss',
    dark: false,
    label: 'Open Source',
    price: 'Self-hosted',
    hiddenMonth: true, // live has an invisible white "/ month" on white
    desc: 'Core BI features for teams happy to self-host',
    button: { label: 'Go to repo', href: 'https://github.com/lightdash/lightdash' },
    eyebrow: 'Hosted by you',
    corner: { src: `${A}/card-S7Ir9ic7GOf6zKsRMNuNHoP0oc.png`, size: 40 },
    phoneMinHeight: 700,
    features: [
      'Deploy Lightdash on your own infrastructure',
      'Access to Lightdash OSS only',
      'Manage your own setup, upgrades and infrastructure',
      'Support via Lightdash community Slack only',
    ],
  },
  {
    key: 'pro',
    dark: true,
    label: 'Cloud Pro',
    price: '$3000',
    month: true,
    desc: (
      <>
        <strong className="font-bold">No per-seat pricing.</strong> Deliver trusted analytics in a powerful AI-native BI platform
      </>
    ),
    button: { label: 'Start free trial', href: './start' },
    eyebrow: 'Hosted by Lightdash',
    corner: { src: `${A}/card-1mb87xFfUlBMpFIuNHsAf26PFI.png`, size: 60 },
    phoneMinHeight: 990,
    features: [
      'Unlimited users',
      'Unlimited visualizations',
      'Native dbt integration + open semantic layer for consistent metrics',
      'Scheduled reports and alerting',
      'Manage charts and dashboards as code',
      'Governed self-serve via metrics catalog and explorer',
      'Dedicated human support',
      'Guided onboarding and tailored training sessions',
      'Automated migration from current BI provider',
      'AI agents and MCP',
      'Embedding via iframe and ReactSDK add-on',
    ],
  },
  {
    key: 'ent',
    dark: false,
    label: 'Enterprise',
    price: 'Let’s talk',
    desc: 'Advanced security, support and customization for enterprise-grade organizations',
    button: { label: 'Get in touch', href: './start' },
    eyebrow: 'Everything in Pro, plus',
    corner: { src: `${A}/card-MXdKTLEx5uZ0rO5k3F7Jbiozno.png`, size: 80 },
    phoneMinHeight: 845,
    features: [
      'Deployment flexibility (Cloud or On Prem)',
      'Advanced security with SSO + SAML + SCIM 2.0',
      'Advanced user management with custom roles',
      'SOC 2–compliant platform with HIPAA and BAA support',
      'Hands-on migration support, including on-site assistance when needed',
      'Priority support with defined SLAs',
      'Dedicated onboarding, enablement, and ongoing success reviews',
      'Early access to new features and the ability to shape new products',
    ],
  },
]

// §2.3 logo grid (layer names differ from the visible brands; files named after the layers)
export const PRICING_LOGOS = [
  { alt: 'Kraken', src: `${A}/kraken-6a49e554.svg`, w: 75, h: 13 },
  { alt: 'octopus energy', src: `${A}/alma-d392c0ab.svg`, w: 124, h: 17 },
  { alt: 'workday', src: `${A}/workday-2a3c4858.svg`, w: 66, h: 26 },
  { alt: 'phantom', src: `${A}/phantom-tLi5MYBeYQyeZco1DQOGZ3BO00.svg`, w: 93, h: 18.3 },
  { alt: 'Adobe', src: `${A}/hyperbound-3f4bc42b.svg`, w: 85, h: 22 },
  {
    alt: 'fal',
    parts: [
      { src: `${A}/swappie-25726fc4.svg`, w: 17, h: 16 },
      { src: `${A}/swappie-4b1d4971.svg`, w: 23, h: 17 },
    ],
  },
  { alt: 'Tempo', src: `${A}/tempo-PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg`, w: 70, h: 15.5 },
  { alt: 'Collectors', src: `${A}/collectors-e79ee675.svg`, w: 90, h: 16 },
  { alt: 'Model ML', src: `${A}/modelml-XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg`, w: 92, h: 16 },
  { alt: 'tatango', src: `${A}/clair-7ec699a5.svg`, w: 70, h: 17 },
  { alt: 'servicenow', src: `${A}/servicenow-AIq32rD3yBVpA6v6vT01ljT5sc.svg`, w: 95, h: 13.9 },
  { alt: 'OakNorth', src: `${A}/oaknorth-HhSegQkhKevRNHfWjhD792tCyBc.svg`, w: 88, h: 14.9 },
]

// §2.4 comparison tables. Cell values: true = ✓, false = ✗, string/node = text.
// `tip` = tooltip copy (label gets the dotted underline). `list` = Inter 12/17 w400 lists.
const WAREHOUSES = 'BigQuery, Snowflake, Redshift, Databricks, Postgres, Trino, ClickHouse, Athena, DuckDB'
const GIT = 'Github, GitLab, Azure Devops, Bitbucket'

export const EMBED_PRO = { embedPro: true }
export const SSO_PRO = { ssoPro: true }

export const TABLES = [
  {
    title: 'Product features',
    icon: `${A}/image-sbgi0qMeD5BtjahnztIVUXjtQ.png`,
    rows: [
      { label: 'Included seats', tip: 'Seats include all permission types', values: ['Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Data explorer and report builder UI', values: [true, true, true] },
      { label: 'Native dbt integration', tip: 'Lightdash supports dbt Core, dbt Cloud and Enterprise', values: [true, true, true] },
      { label: 'Scheduled deliveries', tip: 'Schedule delivery of dashboard/charts via Email, Slack, Teams', values: [true, true, true] },
      { label: 'Alerting', tip: 'Threshold alerting for metrics by Email, Slack, Teams', values: [true, true, true] },
      { label: 'Google Sheets sync', tip: 'Sync data to Google Sheets on a schedule and govern access in Lightdash', values: [true, true, true] },
      { label: 'SQL runner', tip: 'Run SQL directly in Lightdash for ad-hoc queries', values: [true, true, true] },
      { label: 'Private spaces', tip: 'Restrict access to certain content in your organization', values: [true, true, true] },
      { label: 'Global search', tip: 'Search for any chart, dashboard, metric or dimension from anywhere in Lightdash', values: [true, true, true] },
      { label: 'Version history', tip: 'Restore or roll-back to previous versions of charts', values: ['3 days', '30 days', '60 days'] },
      {
        label: 'Usage analytics and insights',
        tip: 'Get in-depth information on how your team is using Lightdash and what content is being used most and more',
        values: ['Basic', 'Advanced', 'Custom'],
      },
      { label: 'API & webhooks', values: [false, true, true] },
      { label: 'Smart caching', values: [false, false, true] },
      { label: 'Pre-aggregates', values: [false, false, true] },
      { label: 'AI agents', values: [false, true, 'Custom pricing'] },
      { label: 'MCP', values: [false, true, true] },
      { label: 'Autopilot', values: [false, true, true] },
      { label: 'Self-improving semantic layer', values: [false, true, true] },
      { label: 'Data Apps [Add on]', values: [false, 'Custom pricing', 'Custom pricing'] },
      {
        label: 'Embedding [Add on]',
        tip: 'Based on embedded chart loads.\nAn embedded chart load happens every time an embedded chart is loaded and viewed by the end user. Loading a dashboard with 4 embedded charts counts as 4 loads. Caching loads can be enabled for an extra cost.',
        values: [false, EMBED_PRO, 'Usage based pricing'],
      },
    ],
  },
  {
    title: 'Sources and integrations',
    icon: `${A}/image-xlvWTiMdcpFvlpQYgenC3Kh0qmc.png`,
    rows: [
      { label: 'Warehouses', list: true, values: [WAREHOUSES, WAREHOUSES, WAREHOUSES] },
      { label: 'Git sync', list: true, values: [GIT, GIT, GIT] },
      { label: 'Slack + Teams integrations', values: [true, true, true] },
      { label: 'CSV export', tip: 'Limit per single export. Cells are calculated by rows x columns in a table', values: ['N/A', '3M cells', 'Custom'] },
    ],
  },
  {
    title: 'Support & Implementation',
    icon: `${A}/image-ePqwBYwX7ktZxXm0WXyI6teCY6M.png`,
    rows: [
      { label: 'Support', values: ['Community Slack Group', 'Private Slack channel, Live chat', 'Private Slack channel and\nPremium support'] },
      { label: 'Response SLA', values: ['3 days', '1 day', '8 hours'] },
      { label: 'Custom domain', tip: 'e.g. yourcompanyname.lightdash.com', values: [false, false, true] },
      { label: 'Service Level Agreement', values: [false, true, true] },
      { label: 'Data Protection Agreement', values: [false, false, true] },
      {
        label: 'Migration support sessions',
        tip: "Moving from another Bl tool? We'll help you transfer over what you need!",
        values: [false, 'Automated migration tools', true],
      },
      { label: 'Dedicated Slack support channel', values: [false, true, true] },
      { label: 'Training calls', tip: 'Have 1:1 training and onboarding sessions for your team', values: [false, false, true] },
      {
        label: 'Custom implementation sessions',
        tip: 'Get dedicated analytics engineering and BI support from the Lightdash experts',
        values: [false, false, true],
      },
      { label: 'Dedicated account manager', values: [false, false, true] },
    ],
  },
  {
    title: 'Security & Compliance',
    icon: `${A}/image-PvfMjeTsl7CcrRi6kcl7c5YdiuU.png`,
    rows: [
      { label: 'SSO', values: ['Google', SSO_PRO, 'Google, Okta, Azure, Custom, other'] },
      { label: 'SCIM 2.0', values: [false, false, true] },
      { label: 'Data warehouse SSH tunnel', values: ['N/A', true, true] },
      { label: 'User groups', tip: 'Manage users into groups and assign permissions accordingly', values: [false, false, true] },
      {
        label: 'Custom role builder',
        tip: 'Go further than our default user Roles (Admin, Editor, Viewer etc.) and define your own custom Roles for fine-tuned access control.',
        values: [false, false, true],
      },
      { label: 'Deployment Region', values: ['N/A', 'US and EU', 'Custom'] },
      { label: 'HIPAA BAA', values: [false, '$490 per month', 'Custom'] },
      { label: 'SOC2 report', values: [false, false, true] },
    ],
  },
]

// §2.5 FAQ
export const PRICING_FAQ = [
  {
    q: 'How does the free trial work?',
    a: (
      <p className="m-0">
        Your 21 day trial period starts from when you first connect and compile your dbt project in Lightdash. You don't need to enter payment details to get
        started. At the end of your trial you have the option to start your subscription and keep using Lightdash!
      </p>
    ),
  },
  {
    q: 'Is Lightdash secure? Where is my data stored?',
    a: (
      <>
        <p className="m-0">
          We are committed to security and focused on keeping you and your data safe. As outlined in our <a href="/terms-of-service">terms of service</a>,
          Lightdash does not store sensitive customer information and follows industry-leading standards. Lightdash does not cache or store the results of
          queries against your data.
        </p>
        <p className="m-0">
          Lightdash is hosted in Google Cloud with servers in Europe and North America. Cloud Pro users can select a European or North American deployment,
          Enterprise customers can request deployments in their region of choice. We can also undertake security questionnaires and have comprehensive
          compliance and security documents we can share on request. For more information, reach out to us at{' '}
          <a href="https://security@lightdash.com">security@lightdash.com</a>.
        </p>
      </>
    ),
  },
  {
    q: 'Is it really unlimited users?',
    a: (
      <p className="m-0">
        Yes. Lightdash was built on the idea that you shouldn't limit access to users having access to data. Being data practitioners and former buyers of BI
        tools, we know how frustrating it can be to have to deal with seat-based pricing limitations. Therefore, we're taking a different approach by giving
        teams the freedom to have as many users as they want and set their permissions accordingly.
      </p>
    ),
  },
  {
    q: 'Do I need to use dbt to use Lightdash?',
    a: (
      <>
        <p className="m-0">
          Yes. Lightdash leverages your existing dbt project to build and govern your entire BI platform. If you don't have a fully fledged dbt project setup,
          you can still use Lightdash. Reach out to us to learn more!
        </p>
        <p className="m-0">Lightdash supports all versions of dbt: dbt Core, dbt Cloud and dbt Enterprise.</p>
      </>
    ),
  },
  {
    q: 'Is it hard to move from my existing BI tool to Lightdash?',
    a: (
      <p className="m-0">
        No. We make it as easy as possible - we've developed a bunch of our own migration tools that massively reduce the overheard required to move your
        existing content from your current BI tool over to Lightdash. As part of Lightdash Cloud Pro and Enterprise onboarding, we can help get this content
        moved over for you.
      </p>
    ),
  },
  {
    q: 'Do you offer 1-on-1 training/support?',
    a: (
      <>
        <p className="m-0">
          Yes! We offer hands-on training and support as part of our Cloud Pro and Enterprise plans. We typically run 1-hour training sessions as part of the
          onboarding, and use shared Slack channels for priority support.
        </p>
        <p className="m-0">
          Cloud Starter users can also access our free resources in{' '}
          <a href="https://www.youtube.com/playlist?list=PL0KkGNSO0W0P0JOrScLet9Nvn9mY0L_H-">Lightdash University</a>.
        </p>
      </>
    ),
  },
  {
    q: 'Do you offer discounts for startups, accelerators, or investors?',
    a: (
      <p className="m-0">
        Yes! <a href="/startups">Lightdash for Startups</a> is available to any qualified company (see page for details). We also work with accelerators and
        investors to offer this deal, or other special deals, to their portfolio companies.
      </p>
    ),
  },
  {
    q: 'I have an infrequently asked question.',
    a: (
      <p className="m-0">
        Great! We're always around to help. You can chat to us through the live chat on this webpage, or talk to us in our{' '}
        <a href="https://join.slack.com/t/lightdash-community/shared_invite/zt-2wgtavou8-VRhwXI~QbjCAHQs0WBac3w">Slack community</a>.
      </p>
    ),
  },
]
