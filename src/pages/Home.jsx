import { useCallback, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import MobileNav from '../components/MobileNav.jsx'
import TalkModal from '../components/TalkModal.jsx'
import Hero from '../components/Hero.jsx'

// Homepage (CLONE_SPEC.md): fixed dark nav + Gameboy iframe hero, one viewport tall, no footer.
export default function Home() {
  const [talkOpen, setTalkOpen] = useState(false)
  const openTalk = useCallback(() => setTalkOpen(true), [])
  const closeTalk = useCallback(() => setTalkOpen(false), [])

  return (
    <div className="root-frame relative">
      <Navbar onTalk={openTalk} modalOpen={talkOpen} />
      <MobileNav onTalk={openTalk} />
      <Hero />
      <TalkModal open={talkOpen} onClose={closeTalk} />
    </div>
  )
}
