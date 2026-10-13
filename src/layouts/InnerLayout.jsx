import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import MobileNav from '../components/MobileNav.jsx'
import TalkModal from '../components/TalkModal.jsx'
import AnnouncementBar from '../components/shared/AnnouncementBar.jsx'
import Footer from '../components/shared/Footer.jsx'
import { RouteMotion } from '../motion/useRouteMotion.js'

// SHARED §0–§2 inner-page shell:
//   [fixed] announcement bar (40; 39 tall on phone) + navbar (106; 64 below 1100) at top 40
//   (live phone nav starts at y=40 and covers the banner's last row: nav bottom rule at y=103)
//   page padding-top = 146 / 104 with banner, 106 / 64 without
//   <Outlet/>  (pages render their own <PageFrame> + sections + <CtaBand/>)
//   <Footer/>
// Scroll: banner + nav move up by min(scrollY, 40) — scroll-linked, no tween (measured). The banner is
// translated here; Navbar / MobileNav apply the same offset themselves via their `top` prop
// (useChromeOffset), which also sizes the open phone menu to calc(100vh - --nav-top).

const BANNER_H = 40

export default function InnerLayout({ banner = true }) {
  const [talkOpen, setTalkOpen] = useState(false)
  const openTalk = useCallback(() => setTalkOpen(true), [])
  const closeTalk = useCallback(() => setTalkOpen(false), [])
  const bannerRef = useRef(null)

  useEffect(() => {
    const el = bannerRef.current
    if (!banner || !el) return
    const apply = () => {
      el.style.transform = `translateY(${-Math.min(Math.max(window.scrollY, 0), BANNER_H)}px)`
    }
    apply()
    window.addEventListener('scroll', apply, { passive: true })
    return () => window.removeEventListener('scroll', apply)
  }, [banner])

  const top = banner ? BANNER_H : 0

  return (
    <div className="relative min-h-screen w-full bg-white">
      {banner && (
        <div ref={bannerRef} data-chrome-banner="" className="fixed inset-x-0 top-0 z-[11] will-change-transform">
          <AnnouncementBar />
        </div>
      )}
      <Navbar onTalk={openTalk} modalOpen={talkOpen} variant="light" top={top} />
      <MobileNav onTalk={openTalk} variant="light" top={top} />
      <main
        className="w-full pt-[var(--pt-phone)] desk:pt-[var(--pt-desk)]"
        style={{ '--pt-phone': `${top + 64}px`, '--pt-desk': `${top + 106}px` }}
      >
        <Outlet context={{ openTalk }} />
        <RouteMotion />
      </main>
      <Footer />
      <TalkModal open={talkOpen} onClose={closeTalk} />
    </div>
  )
}
