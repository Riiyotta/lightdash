import { useParams } from 'react-router-dom'
import BlogListing from '../components/cms/BlogListing.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import NotFound from './NotFound.jsx'
import { CATEGORIES_BY_SLUG, postsForCategory } from './data/cms.js'

// cms-templates §2: /blog-categories/:slug. Empty categories render no cards and no message.
export default function BlogCategory() {
  const { slug } = useParams()
  const cat = CATEGORIES_BY_SLUG[slug]
  usePageTitle(cat?.pageTitle)
  if (!cat) return <NotFound />
  return <BlogListing key={slug} posts={postsForCategory(slug)} activeSlug={cat.showInFilterBar ? slug : undefined} />
}
