import { useEffect } from 'react'
import { PageFrame, Lines, Button, CtaBand } from '../components/shared/index.js'
import LogoTile from '../components/pages/lightdash-security/LogoTile.jsx'

// /lightdash-security — specs/company-pages.md §9 (Template A).
const A = '/assets/pages/lightdash-security'
const SEMI = "font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] font-semibold"

// "Lightdash is trusted by:" — order and files from the manifest (GridWrapper images, reading order)
const CUSTOMERS = [
  ['Workday', 'ugwP8VFseGRaEWDX17VNeBzyIg'],
  ['Collectors', '99fOj1sWPBoAbwWAK0R6L8PGk'],
  ['Farewill', 'UyI2YFHX6mjyykhzY03zZKEcAo'],
  ['Clair', '0kwNqxCmYafuGGFNtIMT3dp9EBc'],
  ['BeautyPie', 'nHrKWxtJNwV8qKEtgpd0lqkycZI'],
  ['DaFilo', 'k14rJDgm3Cu4TnryhXzVYu55jfo'],
  ['JustWatch', '2vNbd8rQE7i1Or7G0M8GzGRWoNI'],
  ['Copy.ai', 'oLBfegNuLAI3ekMBmewiZomOpM'],
  ['ServiceTrade', 'pXFaHkgk4ULhSF8H0qMF33Ss8'],
  ['MorningBrew', 'pZqpnpIOxf1lwrFX3zbqKT2Gk4c'],
  ['Loft', 'uX5UVQmrcdj8P71xM1iqvRWATQ'],
  ['Arcadia', '9P9aaPqU1aTfi4OGRNxNonvRdIY'],
  ['Standard Metrics', 'Wg4aNDkF6lt9fWnhHlPSN2XK8'],
  ['CoverFlex', 'dUDFRyv8Wv72QozfdtlEY1a5P4'],
  ['Octopus Energy', '4Jz0kaXEPAwqbmCNgMWTIN7mrc'],
  ['Motorway', 'rthwZBv3iVrHuD1eSMFLqVRk'],
  ['Kroo Bank', 'pQaX8T8KA4ZpE1nvKlpaf01Lc'],
  ['Swappie', 'VQfSqF0f64mmKKqo2q1EcUziU'],
].map(([name, hash]) => ({ name, src: `${A}/image-${hash}.png` }))

export default function LightdashSecurity() {
  useEffect(() => {
    document.title = 'Security | Lightdash'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* 1 · Spacer 100 */}
      <div className="h-[56px] w-full tab:h-[100px]" aria-hidden="true" />
      {/* 2 · Title (top dashed) 50 */}
      <div className="relative w-full px-[24px] tab:px-0">
        <h1 className={`${SEMI} m-0 text-center text-[42px] leading-[44px] tracking-[-0.27px] text-ld-ink tab:text-[56px] tab:leading-[50.4px]`}>Lightdash Security</h1>
        <Lines sides="t" dashed />
      </div>
      {/* 3 · Subtitle: dashed top/bottom, padding 16/0, max 580 */}
      <div className="relative flex w-full justify-center px-[24px] py-[16px] tab:px-0">
        <p className="m-0 max-w-[580px] text-center font-inter text-[18px] leading-[31.86px] tracking-[-0.27px] text-ld-body">
          We take security seriously. Our platform is built to keep your data safe, with strong safeguards to prevent unauthorized access and protect the
          integrity of your information. You can explore our security practices, policies, and reports in the Lightdash Security Centre.
        </p>
        <Lines sides="tb" dashed />
      </div>
      {/* 4 · Button row (bottom dashed) */}
      <div className="relative flex w-full justify-center pb-px">
        <Button variant="third" href="https://trust.oneleet.com/lightdash">
          Visit Security Centre
        </Button>
        <Lines sides="b" dashed />
      </div>
      {/* 5 · Badges: two 104×104, gap 32, bottom dashed */}
      <div className="relative flex h-[208px] w-full items-center justify-center gap-[32px]">
        <img src={`${A}/image-2L86heL3bauYGKrITTrkqSsyc.png`} alt="AICPA SOC2" width={104} height={104} className="block h-[104px] w-[104px]" />
        <img src={`${A}/image-ygOWTA0haiIuEe5ZnkTUUQ68gNI.png`} alt="GDPR" width={104} height={104} className="block h-[104px] w-[104px]" />
        <Lines sides="b" dashed />
      </div>
      {/* 6 · GridWrapper: padding 16/0/81, gap 56; 6 × 64 columns, gap 64 (phone 2 × 115) */}
      <section className="flex w-full flex-col items-center gap-[56px] pb-[81px] pt-[16px]">
        <p className="m-0 text-center font-inter text-[16px] leading-[24px] tracking-[-0.32px] text-ld-muted">Lightdash is trusted by:</p>
        <div className="grid grid-cols-[repeat(2,115px)] gap-[64px] tab:grid-cols-[repeat(6,64px)] tab:gap-x-[64px] tab:gap-y-[64px]">
          {CUSTOMERS.map((c) => (
            <LogoTile key={c.name} {...c} />
          ))}
        </div>
      </section>
      {/* 7 · CTA */}
      <CtaBand lines="trl" />
    </PageFrame>
  )
}
