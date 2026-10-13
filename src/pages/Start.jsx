import { useEffect } from 'react'
import { PageFrame, Lines, Button } from '../components/shared/index.js'
import useCalInline from '../components/shared/useCalInline.js'

// /start — specs/company-pages.md §3 (Template A booking page, no CTA band).
// Desktop: one row, padding 64, gap 32, 747 tall, items centred. Left 560 (gap 16), right 560×619 Cal.com
// inline embed (lightdash/talk, month_view, light), iframe 1344 tall clipped by the box (overflow hidden).
// Phone: stacked; text block padding 24/10 gap 32; Cal block 358×596 flush below.

const BULLETS = [
  { desk: 'See how Lightdash fits your data stack', phone: 'See how Lightdash fits your stack' },
  { desk: 'Walkthrough the Lightdash platform', phone: 'Walkthrough the Lightdash platform' },
  { desk: 'Get tailored advice to move your team faster', phone: 'Get tailored advice to ship faster' },
]

// Cal.com inline embed via the shared embed.js hook (namespace "start-talk").
function CalInline() {
  const ref = useCalInline('start-talk')
  return <div ref={ref} className="h-full w-full overflow-clip" />
}

export default function Start() {
  useEffect(() => {
    document.title = 'Get started with Lightdash'
  }, [])

  return (
    <PageFrame frame="trl">
      <section className="flex w-full flex-col desk:h-[747px] desk:flex-row desk:items-center desk:gap-[32px] desk:p-[64px]">
        {/* left column */}
        <div className="flex w-full flex-col gap-[32px] px-[10px] py-[24px] desk:w-[560px] desk:shrink-0 desk:gap-[16px] desk:p-0">
          <div className="flex flex-col gap-[16px]">
            <h3 className="m-0 font-britti text-[25px] font-normal leading-[36px] tracking-[-0.64px] text-ld-ink tab:text-[32px]">
              Ready to start your free trial?
            </h3>
            <div className="flex max-w-[468px] flex-col gap-[10px] font-inter text-[18px] leading-[31.86px] tracking-[-0.27px]">
              <p className="m-0 text-ld-body">Book a call with our team to</p>
              <ul className="m-0 list-disc pl-[23px] text-ld-ink-strong">
                {BULLETS.map((b) => (
                  <li key={b.desk}>
                    <span className="tab:hidden">{b.phone}</span>
                    <span className="hidden tab:inline">{b.desk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex flex-col items-start gap-[10px] p-[20px]">
            <p className="m-0 font-britti text-[16px] font-medium leading-[28px] tracking-[-0.4px] text-ld-ink-700 tab:text-[20px]">Want to skip the intro?</p>
            <p className="m-0 font-inter text-[16px] leading-[30px] tracking-[-0.32px] text-ld-ink-700">
              Start your free trial in minutes. No need to talk to a human. Unless you want to.
            </p>
            <Button variant="third" href="https://app.lightdash.cloud/register">
              Sign Up
            </Button>
            <Lines sides="trbl" />
          </div>
        </div>

        {/* right column: inline Cal.com embed (container clips at 619 / 596) */}
        <div className="relative h-[596px] w-full overflow-hidden desk:h-[619px] desk:w-[560px] desk:shrink-0">
          <CalInline />
          <Lines sides="trbl" />
        </div>
      </section>
    </PageFrame>
  )
}
