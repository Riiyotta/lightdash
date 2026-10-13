// CMS metadata for the blog / customer-story / event templates (specs/cms-templates.md §8).
// Imported straight from the spec JSON so there is a single source of truth.
import blogJson from '../../../specs/cms/blog.json'
import categoriesJson from '../../../specs/cms/blog-categories.json'
import storiesJson from '../../../specs/cms/customer-stories.json'
import eventsJson from '../../../specs/cms/events.json'

export const REGISTER_URL = 'https://app.lightdash.cloud/register'
export const PAGE_SIZE = blogJson.pageSize // 9

/** All 62 posts, live order (date desc). */
export const POSTS = blogJson.posts
export const POSTS_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]))

/** All 11 categories. */
export const CATEGORIES = categoriesJson.categories
export const CATEGORIES_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]))

/** §2.2 filter bar: "All posts" + the 5 categories with showInFilterBar, in filterOrder. */
export const FILTER_PILLS = [
  { label: 'All posts', href: '/blog', slug: null },
  ...CATEGORIES.filter((c) => c.showInFilterBar)
    .sort((a, b) => a.filterOrder - b.filterOrder)
    .map((c) => ({ label: c.name, href: `/blog-categories/${c.slug}`, slug: c.slug })),
]

export function postsForCategory(slug) {
  const cat = CATEGORIES_BY_SLUG[slug]
  if (!cat) return []
  const set = new Set(cat.postSlugs)
  return POSTS.filter((p) => set.has(p.slug))
}

/** §3.3 Related articles: always the 3 most recent posts site-wide. */
export const RELATED_POSTS = POSTS.slice(0, 3)

/** Customer stories (12, incl. unlisted ubie-jp). */
export const STORIES = storiesJson.stories
export const STORIES_BY_SLUG = Object.fromEntries(STORIES.map((s) => [s.slug, s]))
/** §5 index: 11 listed stories in indexOrder. */
export const LISTED_STORIES = STORIES.filter((s) => s.listed).sort((a, b) => a.indexOrder - b.indexOrder)

/** Company name for breadcrumbs / sidebar: breadcrumbName if set, else derived from the slug. */
const COMPANY_NAMES = {
  ollie: 'Ollie', fal: 'fal', 'gen-h': 'Gen H', justwatch: 'JustWatch', qargo: 'Qargo', collectors: 'Collectors',
  tatango: 'Tatango', stake: 'Stake', ubie: 'Ubie', 'ubie-jp': 'Ubie', 'neo-financial': 'Neo Financial', hypebeast: 'Hypebeast',
}
export function companyName(story) {
  return story.breadcrumbName ?? COMPANY_NAMES[story.slug] ?? story.slug
}

export const EVENTS = eventsJson.events
export const EVENTS_BY_SLUG = Object.fromEntries(EVENTS.map((e) => [e.slug, e]))

/** Framer-relative "../x" hrefs → app paths. */
export function normalizeHref(href) {
  if (!href) return href
  if (href.startsWith('../')) return '/' + href.replace(/^(\.\.\/)+/, '')
  return href
}

/** Site-search index (§2.2): local blog posts + listed customer stories. */
export const SEARCH_INDEX = [
  ...POSTS.map((p) => ({ title: p.title, path: p.url })),
  ...LISTED_STORIES.map((s) => ({ title: s.title, path: s.url })),
]

export const DECOR = {
  blogHeader: '/assets/cms/shared/blog-header-pixels.png',
  blogTitle: '/assets/cms/shared/blog-title-pixels.png',
  inlineCta: '/assets/cms/shared/inline-cta-pixels.png',
  chevron: '/assets/cms/shared/chevron-right-small.svg',
  magnifier: '/assets/cms/shared/search-magnifier.svg',
  postPixels: [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/cms/shared/post-pixel-${n}.png`),
}
