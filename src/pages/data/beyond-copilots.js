// Copy + assets: specs/product-pages.md §2.10 and Appendix A "beyond-copilots".
const A = '/assets/pages/beyond-copilots'

export const LOGOS = {
  lightdash: { src: `${A}/YCM9XN0NlnV9HViPxZORGf2UcU.svg`, alt: 'Lightdash' },
  motherduck: { src: `${A}/Fn961oCT6e6cacxURxfdSpV37w.svg`, alt: 'MotherDuck' },
  dlthub: { src: `${A}/I56RbgF8hkAPpAqLuJV2xIqPdaY.svg`, alt: 'dltHub' },
}

export const hero = {
  eyebrow: 'BEYOND COPILOTS · ON-DEMAND',
  cohosts: [
    { ...LOGOS.lightdash, w: 100, h: 21 },
    { ...LOGOS.motherduck, w: 141, h: 17 },
    { ...LOGOS.dlthub, w: 62, h: 18 },
  ],
  title: 'We built the data stack live.',
  accent: 'Here’s how it worked.',
  subtitle:
    'Watch dltHub, MotherDuck and Lightdash take a live API from ingestion to a governed AI answer, using agents at every layer and one terminal throughout.',
  buttons: [
    { label: 'Watch the build', href: 'https://www.youtube.com/live/S9NJrqRYRhs?si=vobO2NBbpbMWaqH6', variant: 'third', newTab: true },
    { label: 'Talk to our team', href: './start', variant: 'fourth', newTab: true },
  ],
  meta: 'Recorded live on 18 August 2026',
}

export const replay = {
  heading: 'Watch the full build',
  caption: 'See the stack come together from the first API request to the final governed answer.',
  thumbnail: `${A}/youtube-S9NJrqRYRhs-maxresdefault.webp`,
  embed:
    'https://www.youtube.com/embed/S9NJrqRYRhs?si=vobO2NBbpbMWaqH6&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=0',
  booking: 'Want to see what this could look like on your data?',
  bookingCta: { label: 'Start for free', href: './start' },
}

export const split = {
  heading: 'The query was never the hard part.',
  lead: 'The hard part is everything around it: getting data into the warehouse, understanding the schema, defining metrics and giving an agent enough context to return an answer you can trust. This session showed what happens when agents can work across the whole stack instead of stopping at text-to-SQL.',
  image: `${A}/9bOIM3S5kIt9dtFBnk013Rqbo.png`,
}

export const steps = {
  heading: 'Build it yourself',
  items: [
    {
      n: '01',
      title: 'Get the source code',
      // Live-site quirk: card 01's body line is duplicated (§2.10).
      body: ['See the pipeline, configuration and files used during the live build.', 'See the pipeline, configuration and files used during the live build.'],
      href: 'https://github.com/lightdash/lightdash',
    },
    {
      n: '02',
      title: 'Build the pipeline with dltHub',
      body: ['Generate and deploy an ingestion pipeline from an API.'],
      link: 'Read the dltHub guide →',
      href: 'https://dlthub.com/docs/intro',
    },
    {
      n: '03',
      title: 'Run it on MotherDuck',
      body: ['Load and query the data in a serverless DuckDB warehouse.'],
      link: 'Read the MotherDuck guide →',
      href: 'https://motherduck.com/docs/getting-started/',
    },
    {
      n: '04',
      title: 'Add governed analytics with Lightdash',
      body: ['Define metrics in code and connect your AI agents to a governed semantic layer.'],
      link: 'Read the Lightdash guide →',
      href: 'https://docs.lightdash.com/',
    },
  ],
}

export const speakers = {
  heading: 'Built live by',
  strip: `${A}/SV72DfJqXdU4uJ2CqoH41tIn0.png`,
  items: [
    { name: 'Alena Astrakhantseva', role: 'Senior Solutions Engineer', photo: `${A}/bEOX3oTkQZx6qVn8CvQjrG5P1s.png`, logo: { ...LOGOS.dlthub, w: 61, h: 18 } },
    { name: 'Jacob Matson', role: 'Developer Relations', photo: `${A}/nuvFLTKrnfRmXsaqPceoEuaUuM.png`, logo: { ...LOGOS.motherduck, w: 135, h: 16 } },
    { name: 'Oliver Laslett', role: 'Co-founder', photo: `${A}/iXvDFf6EXj2FjarKbLSYLhjkIM.png`, logo: { ...LOGOS.lightdash, w: 86, h: 18 } },
  ],
}
