import SmartLink from './SmartLink.jsx'
import { Lines } from './Frame.jsx'

// SHARED §7.9 "Blog Posts Section". 3 article cards, 373.3×360, gap 16, dashed border, no hover change.

/**
 * @param eyebrow  default "From the blog" (caption-18, centred, w720)
 * @param heading  blog-h2, e.g. "Keep building with Data Apps"
 * @param posts    [{ title, href: './blogpost/<slug>', thumbnail, author: { name, avatar } }]
 */
export default function BlogCards({ eyebrow = 'From the blog', heading, posts = [], className = '' }) {
  return (
    <section className={`relative flex w-full flex-col gap-[32px] bg-white px-[24px] py-[80px] tab:px-[64px] ${className}`}>
      <Lines sides="rl" />
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-[12px] text-center">
        {eyebrow && <p className="ld-caption-18 m-0">{eyebrow}</p>}
        {heading && <h2 className="ld-blog-h2 m-0">{heading}</h2>}
      </div>
      <div className="grid w-full grid-cols-1 gap-[16px] tab:grid-cols-3">
        {posts.map((p) => (
          <SmartLink key={p.href ?? p.title} href={p.href} className="relative block h-[360px] overflow-clip bg-white no-underline">
            <div className="absolute inset-x-0 top-0 h-[160px]">
              {p.thumbnail && <img src={p.thumbnail} alt="" className="block h-[160px] w-full object-cover" />}
              <Lines sides="b" />
            </div>
            {/* content at y+160, padding 24, gap 14. Title measured at content-top + 38 (= 24 + an empty
                first row + the 14 gap), reproduced with padding-top 38 */}
            <div className="flex flex-col gap-[14px] px-[24px] pb-[24px] pt-[198px]">
              <h3 className="ld-blog-card-22 m-0">{p.title}</h3>
              {p.author && (
                <div className="flex flex-row items-center gap-[8px]">
                  {p.author.avatar && <img src={p.author.avatar} alt="" width={20} height={20} className="block h-[20px] w-[20px] rounded-full object-cover" />}
                  <span className="ld-blog-meta-13">{p.author.name}</span>
                </div>
              )}
            </div>
            <Lines sides="trbl" dashed />
          </SmartLink>
        ))}
      </div>
    </section>
  )
}
