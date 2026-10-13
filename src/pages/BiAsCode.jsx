import { LogosRow, IconBenefits, Faq, FAQ_LEADS, BlogCards, CtaBand } from '../components/shared/index.js'
import Block from '../components/pages/bi-as-code/Block.jsx'
import BiHero from '../components/pages/bi-as-code/BiHero.jsx'
import VideoSection from '../components/pages/bi-as-code/VideoSection.jsx'
import AlternatingRows from '../components/pages/bi-as-code/AlternatingRows.jsx'
import DarkTestimonial from '../components/pages/bi-as-code/DarkTestimonial.jsx'
import * as D from './data/bi-as-code.jsx'

// /bi-as-code — T1b "Main" variant (specs/product-pages.md §1, §2.7). No Content-wrapper: a white "Main"
// wrapper (padding 0 16 → 1408 at 1440) holds bordered 1280 blocks; the Logos rows and the CTA span 1408.
// Order: Hero → Video → Logos → Alternating rows → Icon grid → Dark testimonial + stats → FAQ ×7 → Blog → CTA.
export default function BiAsCode() {
  return (
    <div className="w-full bg-white px-[16px]">
      <BiHero {...D.hero} />
      <VideoSection {...D.video} />
      <LogosRow caption={D.logosCaption} />
      <AlternatingRows {...D.rows} />
      <Block>
        <IconBenefits heading={D.tools.heading} items={D.tools.items} />
      </Block>
      <DarkTestimonial {...D.testimonial} stats={D.stats} />
      <Block lines="trbl">
        <Faq items={D.faq} lead={FAQ_LEADS.long} />
      </Block>
      <Block lines={null}>
        <BlogCards heading={D.blog.heading} posts={D.blog.posts} />
      </Block>
      <CtaBand cardMaxWidth={1280} />
    </div>
  )
}
