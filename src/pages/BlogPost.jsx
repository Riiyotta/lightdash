import { useParams } from 'react-router-dom'
import { Lines, PageFrame, Row, Spacer } from '../components/shared/Frame.jsx'
import Breadcrumb from '../components/cms/Breadcrumb.jsx'
import InlineCta from '../components/cms/InlineCta.jsx'
import PlaceholderBody, { PLACEHOLDER_HEADINGS } from '../components/cms/PlaceholderBody.jsx'
import PostCard from '../components/cms/PostCard.jsx'
import RelatedHeader from '../components/cms/RelatedHeader.jsx'
import Toc from '../components/cms/Toc.jsx'
import usePageTitle from '../components/cms/usePageTitle.js'
import NotFound from './NotFound.jsx'
import { DECOR, POSTS_BY_SLUG, RELATED_POSTS } from './data/cms.js'

// cms-templates §3.1: decorative 24×24 squares, fixed per template. Page coords (1440) → frame-relative,
// anchored to the frame's right edge (right = 1280 − x − 24).
const PIXELS = [
  { x: 1312, y: 106 },
  { x: 1336, y: 106 },
  { x: 1336, y: 130 },
  { x: 1231, y: 148 },
  { x: 1336, y: 192 },
  { x: 948, y: 216 },
  { x: 1007, y: 245 },
].map((p, i) => ({ src: DECOR.postPixels[i], right: 1360 - p.x - 24, top: p.y - 106, deskOnly: p.x < 1100 }))
// The two left-most squares (x 948 / 1007) would sit on the H1 at narrow widths; the 390 reference shows only the right cluster.

const TOC_ITEMS = [
  ...PLACEHOLDER_HEADINGS.filter((h) => h.level === 2 || h.level === 3).map(({ id, text }) => ({ id, text })),
  { id: 'related-articles', text: 'Related articles' },
]

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS_BY_SLUG[slug]
  usePageTitle(post ? `${post.title} | Lightdash` : null)
  if (!post) return <NotFound />

  return (
    <PageFrame frame="trbl">
      {PIXELS.map((p, i) => (
        <img
          key={i}
          src={p.src}
          alt=""
          width={24}
          height={24}
          className={`pointer-events-none absolute z-[2] h-[24px] w-[24px] ${p.deskOnly ? 'hidden desk:block' : 'block'}`}
          style={{ right: p.right, top: p.top }}
        />
      ))}

      <Spacer height={66} />
      <Row height={20} className="flex items-center px-[24px] desk:px-[64px]">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: `/blog-categories/${post.categorySlug}` },
            { label: post.title },
          ]}
        />
      </Row>
      <Spacer height={24} />
      <Row className="px-[24px] desk:px-[64px]">
        <h1 className="m-0 max-w-[780px] font-britti-semi text-[36px] font-normal leading-[39.6px] tracking-[-0.96px] text-[#272835] tab:text-[48px] tab:leading-[52.8px]">
          {post.title}
        </h1>
      </Row>
      <Spacer height={24} />
      <Row height={41} className="flex items-center gap-[12px] px-[24px] desk:px-[64px]">
        <img src={post.author.avatar} alt="" width={40} height={40} className="block h-[40px] w-[40px] shrink-0 object-cover" />
        <span className="flex items-center">
          <span className="font-inter text-[16px] font-normal leading-[25.6px] tracking-[-0.32px] text-[#666666] tab:text-[14px] tab:leading-[22.4px] tab:tracking-normal tab:text-[#272835]">
            {post.author.name}
          </span>
          <span aria-hidden="true" className="mx-[6px] hidden font-inter text-[14px] leading-[20px] text-[#C1C7D0] tab:inline">
            ·
          </span>
          <time dateTime={post.datetime} className="hidden font-inter text-[14px] font-normal leading-[20px] text-[#818898] tab:inline">
            {post.date}
          </time>
        </span>
      </Row>
      <Spacer height={40} />

      {/* §3.2 body columns: main 784 (rich text 681) + TOC 368 */}
      <div className="relative mx-[24px] flex desk:mx-[64px]">
        <div className="relative min-w-0 flex-1 desk:w-[784px] desk:flex-none">
          <PlaceholderBody variant="post" image={post.thumbnail.path} className="desk:w-[681px]" />
          <InlineCta className="mt-[40px]" />
          <div className="h-[64px]" />
          <Lines sides="r" dashed className="hidden desk:block" />
        </div>
        <aside className="relative hidden w-[368px] shrink-0 pl-[48px] desk:block">
          <Toc items={TOC_ITEMS} />
        </aside>
        <Lines sides="rl" dashed />
      </div>

      {/* §3.3 related articles: always the 3 newest posts */}
      <RelatedHeader id="related-articles" title="Related articles" href="/blog" gutter="tab:px-[24px] desk:px-[40px]" />
      <div className="grid w-full grid-cols-1 desk:grid-cols-3">
        {RELATED_POSTS.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
      <div className="h-[64px]" />
    </PageFrame>
  )
}
