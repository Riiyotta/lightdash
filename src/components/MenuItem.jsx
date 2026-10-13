// §3.1 "Dark" menu item: 56 tall, padding 8/16/8/24, gap 10, icon 40, title 15/18 500, desc 13/15.6 400.
// Desktop: 320 wide with a 230-wide text stack. Mobile (§5.2): full-width rows.
// Light (SHARED §2, live-measured): title #000, desc #818898, row bg #FFF -> #F6F8FA on hover (instant, live transition "all 0s").
export default function MenuItem({ item, fullWidth = false, variant = 'dark' }) {
  const light = variant === 'light'
  return (
    <a
      href={item.href}
      className={`flex h-[56px] items-center gap-[10px] py-[8px] pl-[24px] pr-[16px] no-underline ${
        fullWidth ? 'w-full' : 'w-[320px] max-w-full'
      }${light ? ' bg-white hover:bg-[#F6F8FA]' : ''}`}
    >
      <img src={item.icon} alt="" width={40} height={40} className="h-[40px] w-[40px] shrink-0 object-cover" />
      <span className={`flex min-w-0 flex-col gap-[4px] ${fullWidth ? 'flex-1' : 'w-[230px]'}`}>
        <span className={`font-inter text-[15px] font-medium leading-[18px] ${light ? 'text-[#000000]' : 'text-text-item'}`}>{item.title}</span>
        <span className={`font-inter text-[13px] font-normal leading-[15.6px] ${light ? 'text-[#818898]' : 'text-text-item-sub'}`}>{item.desc}</span>
      </span>
    </a>
  )
}
