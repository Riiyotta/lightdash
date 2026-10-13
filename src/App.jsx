import { useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import InnerLayout from './layouts/InnerLayout.jsx'
import Home from './pages/Home.jsx'
import SharedDemo from './pages/SharedDemo.jsx'
// product (with announcement banner)
import ConversationalAnalytics from './pages/ConversationalAnalytics.jsx'
import DataApps from './pages/DataApps.jsx'
import MetricsCatalog from './pages/MetricsCatalog.jsx'
import Embedding from './pages/Embedding.jsx'
import InteractiveDashboards from './pages/InteractiveDashboards.jsx'
import ContextLayer from './pages/ContextLayer.jsx'
import BiAsCode from './pages/BiAsCode.jsx'
import SelfImprovingAnalytics from './pages/SelfImprovingAnalytics.jsx'
// product (no banner)
import Integrations from './pages/Integrations.jsx'
import BeyondCopilots from './pages/BeyondCopilots.jsx'
import Playground from './pages/Playground.jsx'
// company
import Pricing from './pages/Pricing.jsx'
import About from './pages/About.jsx'
import Roadmap from './pages/Roadmap.jsx'
import LightdashSecurity from './pages/LightdashSecurity.jsx'
import Startups from './pages/Startups.jsx'
import Jp from './pages/Jp.jsx'
import Start from './pages/Start.jsx'
import Fintech from './pages/Fintech.jsx'
import Partnerships from './pages/Partnerships.jsx'
import PadelApply from './pages/PadelApply.jsx'
// cms
import Blog from './pages/Blog.jsx'
import BlogCategory from './pages/BlogCategory.jsx'
import BlogPost from './pages/BlogPost.jsx'
import CustomerStories from './pages/CustomerStories.jsx'
import CustomerStory from './pages/CustomerStory.jsx'
import Event from './pages/Event.jsx'
// legal / utility
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import SubProcessors from './pages/SubProcessors.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import GoogleApisDisclosure from './pages/GoogleApisDisclosure.jsx'
import NotFound from './pages/NotFound.jsx'

// Scroll to top on every pathname change (keep the browser's behaviour for #hash links).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// Components that still render plain <a href="/x"> (Navbar, MobileNav, MenuItem, FeatureCard, CustomerLogo
// — owned by other agents) get client-side navigation here: same-origin, same-tab, unmodified left clicks
// on app routes are routed through react-router. <Link> clicks are already defaultPrevented and skipped.
function LinkInterceptor() {
  const navigate = useNavigate()
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!a || a.hasAttribute('download')) return
      if (a.target && a.target !== '_self') return
      const url = new URL(a.getAttribute('href'), window.location.href)
      if (url.origin !== window.location.origin) return
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return // static files (/gameboy/index.html, assets…)
      e.preventDefault()
      navigate(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LinkInterceptor />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* SHARED §0: pages with the announcement banner (content starts at y=146) */}
        <Route element={<InnerLayout banner />}>
          <Route path="/conversational-analytics" element={<ConversationalAnalytics />} />
          <Route path="/data-apps" element={<DataApps />} />
          <Route path="/metrics-catalog" element={<MetricsCatalog />} />
          <Route path="/embedding" element={<Embedding />} />
          <Route path="/interactive-dashboards" element={<InteractiveDashboards />} />
          <Route path="/context-layer" element={<ContextLayer />} />
          <Route path="/bi-as-code" element={<BiAsCode />} />
          <Route path="/self-improving-analytics" element={<SelfImprovingAnalytics />} />
          <Route path="/__shared" element={<SharedDemo />} />
        </Route>

        {/* no banner (nav fixed at 0; content starts at y=106) */}
        <Route element={<InnerLayout banner={false} />}>
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/beyond-copilots" element={<BeyondCopilots />} />
          <Route path="/playground" element={<Playground />} />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/lightdash-security" element={<LightdashSecurity />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/jp" element={<Jp />} />
          <Route path="/start" element={<Start />} />
          <Route path="/fintech" element={<Fintech />} />
          <Route path="/partnerships" element={<Partnerships />} />
          <Route path="/padel-apply" element={<PadelApply />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-categories/:slug" element={<BlogCategory />} />
          <Route path="/blogpost/:slug" element={<BlogPost />} />
          <Route path="/customer-stories" element={<CustomerStories />} />
          <Route path="/customer-story/:slug" element={<CustomerStory />} />
          <Route path="/events/:slug" element={<Event />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sub-processors" element={<SubProcessors />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/google-apis-disclosure" element={<GoogleApisDisclosure />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
