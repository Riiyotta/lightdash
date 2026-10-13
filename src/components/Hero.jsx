import { useEffect, useState } from 'react'

// §1.1 / §2.1 / §5.3 iframe placement:
//   ≥1100  top 104, height 100vh−104, ?navh=104
//   810–1099  top 64, height 100vh−64, ?navh=104 (as measured on the original)
//   <810   top 0, height 100vh, ?navh=64 (nav overlays it)
const MOBILE_QUERY = '(max-width: 809.98px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

function SeoContent() {
  // §6.6 copy, kept verbatim, visually hidden
  return (
    <div className="sr-only">
      <h1>Lightdash — open source, code-first BI platform</h1>
      <h2>Trusted by leading data teams</h2>
      <ul>
        <li>Kraken</li>
        <li>Octopus Energy</li>
        <li>Workday: “Perfect solution for our BI needs — Lightdash just works exactly how you’d want it to.” — Don Rudish, Director</li>
        <li>Adobe</li>
        <li>ServiceNow</li>
        <li>fal — 85% Data requests answered in 24 hrs: “I spent five minutes in Lightdash and I was like, oh, that was extremely easy.” — Kevin Otte, Data Scientist</li>
        <li>OakNorth — 128 data apps built: “People can build whatever they like, but we still control the data and the permissions.” — David Strudwick, Senior BI Engineer</li>
        <li>JustWatch — 86% Lower BI tool spend: “We create specialized agents for each department, each with the data access and context specific to its team’s domain.” — Aleksandr Zolotukhin, VP of Data &amp; Analytics</li>
      </ul>
      <h2>AI that builds and maintains your analytics on data you can trust</h2>
      <p>Give AI agents access to governed metrics. Works with Slack, Claude, Lightdash.</p>
      <h2>Simple, transparent pricing.</h2>
      <p>Start free, scale when you’re ready.</p>
      <h2>Move off legacy BI without the rebuild.</h2>
      <p>We’ll help you move off legacy BI quickly, without the rebuild.</p>
      <ul>
        <li>Looker — Swap LookML for a code-based open semantic layer. Migrated to Lightdash: Stake, TitanBay, TicketSwap, Generation Home.</li>
        <li>Power BI — Swap the Microsoft-only stack for an open source, AI-native, code-first platform. Migrated to Lightdash: TitanBay, Hypebeast, Optimality, Openup.</li>
        <li>Tableau — Stop paying per seat to look at your data. Migrated to Lightdash: Octopus Energy, ServiceNow, OakNorth, Collectors.</li>
      </ul>
      <h2>Metrics you can actually trust</h2>
      <h2>Let’s talk</h2>
      <p>
        <a href="/start">Book a demo</a>
      </p>
    </div>
  )
}

export default function Hero() {
  const mobile = useIsMobile()
  const src = `/gameboy/index.html?navh=${mobile ? 64 : 104}`

  return (
    <section className="absolute inset-x-0 top-0 z-0 h-screen tab:top-[64px] tab:h-[calc(100vh-64px)] desk:top-[104px] desk:h-[calc(100vh-104px)]">
      <iframe
        key={src}
        src={src}
        title="Lightdash Game Boy"
        aria-label="Lightdash Game Boy"
        loading="eager"
        allow="accelerometer; gyroscope; fullscreen; autoplay"
        className="block h-full w-full rounded-none border-0 bg-iframe-bg"
      />
      <SeoContent />
    </section>
  )
}
