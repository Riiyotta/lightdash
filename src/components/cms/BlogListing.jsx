import { useState } from 'react'
import SmartLink from '../shared/SmartLink.jsx'
import CtaBand from '../shared/CtaBand.jsx'
import { Lines, PageFrame, Row, Spacer } from '../shared/Frame.jsx'
import PostCard from './PostCard.jsx'
import SearchModal from './SearchModal.jsx'
import { DECOR, FILTER_PILLS, PAGE_SIZE } from '../../pages/data/cms.js'

// cms-templates §2: /blog and /blog-categories/:slug share this template.
// activeSlug: null = "All posts" (/blog); a category slug; or undefined for categories not in the bar.
export default function BlogListing({ posts, activeSlug, narrowCta = false }) {
  const [shown, setShown] = useState(PAGE_SIZE)
  const [searchOpen, setSearchOpen] = useState(false)
  const visible = posts.slice(0, shown)

  return (
    <PageFrame frame="trbl">
      {/* §2.1 header spacer: 168 / 120 / 72 tall; pixel art 762×168 pinned top-right, clipped to the row */}
      <Row className="h-[72px] overflow-hidden tab:h-[120px] desk:h-[168px]">
        <img
          src={DECOR.blogHeader}
          alt=""
          width={762}
          height={168}
          className="pointer-events-none absolute right-0 top-0 block h-[168px] w-[762px] max-w-none object-cover"
        />
      </Row>

      {/* title row: 50 tall (390: 44). H1 bottom-aligned (overhangs the row top by 6 px at 1440). */}
      <Row className="z-[2] flex h-[44px] items-end px-[24px] tab:h-[50px]">
        <h1 className="m-0 whitespace-nowrap font-britti-semi text-[40px] font-normal leading-[44px] tracking-[-0.8px] text-[#272835] tab:text-[48px] tab:leading-[48px] tab:tracking-[-1.92px] desk:text-[56px] desk:leading-[56px] desk:tracking-[-2.24px]">
          Lightning<span className="text-[#A4ACB9]"> posts</span>
        </h1>
        <img
          src={DECOR.blogTitle}
          alt=""
          width={193}
          height={50}
          className="pointer-events-none absolute left-[751px] top-0 hidden h-[50px] w-[193px] desk:block"
        />
      </Row>

      <Spacer height={40} />

      {/* §2.2 filter bar */}
      <Row height={56} className="flex items-center px-[24px] py-[8px]">
        <div className="flex min-w-0 flex-1 gap-[8px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTER_PILLS.map((pill) => {
            const active = pill.slug === activeSlug
            return (
              <SmartLink
                key={pill.label}
                href={pill.href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-[40px] shrink-0 items-center whitespace-nowrap px-[16px] py-[8px] font-inter text-[15px] font-medium leading-[24px] tracking-[-0.3px] no-underline transition-[color] duration-200 ease-framer ${
                  active ? 'bg-[#F6F8FA] text-[#272835]' : 'bg-transparent text-[#818898] hover:text-[#272835]'
                }`}
              >
                {pill.label}
              </SmartLink>
            )
          })}
        </div>
        <div className="relative flex shrink-0 items-center">
          <span aria-hidden="true" className="pointer-events-none absolute right-full top-1/2 h-[40px] w-[40px] -translate-y-1/2 bg-[linear-gradient(270deg,#FFFFFF_0%,rgba(255,255,255,0)_100%)]" />
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="relative flex h-[35px] cursor-pointer items-center gap-[10px] border-0 bg-[#F8FAFB] p-[10px] font-inter text-[15px] font-medium leading-[15px] text-[#272835]"
          >
            <img src={DECOR.magnifier} alt="" width={13} height={12} className="block h-[12px] w-[13px]" />
            Search
            <Lines sides="trbl" color="border-[#ECEFF3]" />
          </button>
        </div>
      </Row>

      <Spacer height={32} />

      {/* §2.3 grid: 3 / 2 / 1 columns, 9 initial + Load More 9 */}
      {visible.length > 0 && (
        <div className="grid w-full grid-cols-1 tab:grid-cols-2 desk:grid-cols-3">
          {visible.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      {/* 100 px between grid and CTA; holds the Load More button (40 below the grid) when more posts remain */}
      <div className="relative flex h-[100px] w-full justify-center pt-[40px]">
        {shown < posts.length && (
          <button
            type="button"
            onClick={() => setShown((s) => s + PAGE_SIZE)}
            className="h-[40px] w-[100px] cursor-pointer border-0 bg-[#272835] p-0 font-inter text-[14px] font-semibold leading-[16.8px] text-white"
          >
            Load More
          </button>
        )}
      </div>

      {narrowCta ? <CtaBand narrow lines="" /> : <CtaBand lines="trl" />}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </PageFrame>
  )
}
