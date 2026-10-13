import BlogListing from '../components/cms/BlogListing.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import { POSTS } from './data/cms.js'

// cms-templates §2: /blog index (narrow snake CTA variant).
export default function Blog() {
  usePageTitle('Lightning Posts | Lightdash')
  return <BlogListing posts={POSTS} activeSlug={null} narrowCta />
}
