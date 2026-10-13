import SmartLink from '../shared/SmartLink.jsx'
import { Lines } from '../shared/Frame.jsx'

// cms-templates §1.4 blog post card (variant A). Cell 472 tall; inner card 368 max (cell − 48 below that),
// thumbnail 217, body 231. Hover: body bg #FFF → #F6F8FA (0.2s ease). Nothing else changes.
export default function PostCard({ post }) {
  return (
    <SmartLink href={post.url} className="group relative block h-[472px] no-underline">
      <div className="relative mx-auto h-full w-[calc(100%-48px)] max-w-[368px]">
        <div className="relative h-[217px] w-full overflow-hidden">
          <img
            src={post.thumbnail.path}
            alt=""
            className="block h-full w-full object-contain object-center tab:object-cover"
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-solid border-[rgba(0,0,0,0.06)]" />
        </div>
        <div className="flex h-[231px] flex-col bg-white p-[24px] transition-[background-color] duration-200 ease-[ease] group-hover:bg-[#F6F8FA]">
          <div className="flex h-[22.4px] items-center">
            <span className="font-inter text-[14px] font-normal leading-[22.4px] tracking-[-0.28px] text-[#818898]">{post.category}</span>
            <span className="mx-[4px] font-inter text-[14px] font-medium leading-[14px] text-[#C1C7D0]">·</span>
            <time dateTime={post.datetime} className="font-inter text-[14px] font-normal leading-[14px] text-[#818898]">
              {post.date}
            </time>
          </div>
          <h6 className="m-0 mt-[11.6px] line-clamp-3 font-britti text-[24px] font-normal leading-[33.6px] tracking-[-0.48px] text-[#272835]">
            {post.title}
          </h6>
          <div className="mt-auto flex items-center gap-[10px]">
            <img
              src={post.author.avatar}
              alt=""
              width={32}
              height={32}
              className="block h-[32px] w-[32px] shrink-0 bg-[#E8E8E8] object-contain"
            />
            <span className="font-inter text-[14px] font-normal leading-[22.4px] tracking-[-0.28px] text-[#272835]">{post.author.name}</span>
          </div>
        </div>
        <Lines sides="rl" dashed />
      </div>
      {/* full-cell dashed lines at card bottom (y+447) and cell bottom (y+471) */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[447px] z-[1] border-t border-dashed border-ld-line" />
      <Lines sides="b" dashed />
    </SmartLink>
  )
}
