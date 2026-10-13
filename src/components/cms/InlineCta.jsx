import Button from '../shared/Button.jsx'
import { Lines } from '../shared/Frame.jsx'
import { DECOR, REGISTER_URL } from '../../pages/data/cms.js'

// cms-templates §1.7 inline post CTA (end of the main column on blog posts and customer stories).
export default function InlineCta({ className = '' }) {
  return (
    <div className={`w-full bg-[#1A1B25] py-[32px] ${className}`}>
      <div className="relative flex flex-col px-[16px] tab:h-[152px] tab:flex-row tab:pl-[40px] tab:pr-[57px]">
        <Lines sides="tb" dashed color="border-[rgba(228,230,235,0.2)]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="m-0 font-britti text-[24px] font-normal leading-[28.8px] tracking-[-0.48px] text-white">Ready to free up your data team?</p>
          <p className="m-0 mt-[4px] font-inter text-[16px] font-normal leading-[19.2px] tracking-[-0.32px] text-[#C1C7D0]">
            Try out our all in one open, developer-loved platform.
          </p>
          <div className="mt-[60px] flex gap-[10px] tab:mt-auto">
            <Button variant="primary" href="./start">
              Talk to our team
            </Button>
            <Button variant="secondary" href={REGISTER_URL}>
              Start for free
            </Button>
          </div>
        </div>
        <img
          src={DECOR.inlineCta}
          alt=""
          width={109}
          height={152}
          className="mx-auto mt-[15px] block h-[152px] w-[109px] shrink-0 tab:mx-0 tab:mt-0"
        />
      </div>
    </div>
  )
}
