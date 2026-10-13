// Copy + assets: specs/product-pages.md §2.11 and Appendix A "playground".
const A = '/assets/pages/playground'
const L = '/assets/shared/logos'
const CS = '/assets/cms/customer-stories/logos'
const STORIES = 'https://www.lightdash.com/customer-stories'

export const hero = {
  // Words are separate elements on the live site; null = inline pixel-icon slot (w×h).
  line1: ['Rethink', 'BI.', { icon: [48, 47] }, 'Build', 'intelligence'],
  line2: [{ icon: [55, 35] }, '...not', 'just', 'dashboards', { icon: [60, 35] }],
  sub: 'Ask questions. Get instant insights from your custom AI analysts. All-in-one open, developer-loved platform.',
  decoration: `${A}/dhDCJdJG79D1hjdms5gJlZ69NHo.png`,
}

// 2 × 6 logos with their measured links. Sizes from Appendix A where given; Collectors / tatango files
// are not in the playground asset set and come from the customer-stories CMS logos (sizes approximate).
export const logos = [
  { alt: 'Kraken', src: `${L}/logo-kraken.svg`, w: 87, h: 15, href: './customer-stories' },
  { alt: 'octopus energy', src: `${L}/logo-octopus-energy.svg`, w: 124, h: 17, href: STORIES },
  { alt: 'workday', src: `${L}/logo-workday.svg`, w: 66, h: 26, href: STORIES },
  { alt: 'Phantom', src: `${A}/tLi5MYBeYQyeZco1DQOGZ3BO00.svg`, w: 93, h: 18.3, href: STORIES },
  { alt: 'Adobe', src: `${L}/logo-adobe.svg`, w: 85, h: 22, href: STORIES },
  { alt: 'fal', parts: [`${L}/logo-fal-icon.svg`, `${L}/logo-fal-wordmark.svg`], href: './customer-story/fal' },
  { alt: 'Tempo', src: `${A}/PeTCrjuAAnFT2xhJsDAlZGXMLn8.svg`, w: 70, h: 15.5, href: STORIES },
  { alt: 'Collectors', src: `${CS}/collectors.png`, h: 18, href: 'https://www.lightdash.com/customer-story/collectors' },
  { alt: 'Model ML', src: `${A}/XJpm5wcFVC6H6oxQ3hJNf20D0M4.svg`, w: 92, h: 16, href: STORIES },
  { alt: 'tatango', src: `${CS}/tatango.svg`, h: 18, href: 'https://www.lightdash.com/customer-story/tatango' },
  { alt: 'ServiceNow', src: `${A}/AIq32rD3yBVpA6v6vT01ljT5sc.svg`, w: 95, h: 13.9, href: STORIES },
  { alt: 'OakNorth', src: `${A}/HhSegQkhKevRNHfWjhD792tCyBc.svg`, w: 88, h: 14.9, href: STORIES },
]
