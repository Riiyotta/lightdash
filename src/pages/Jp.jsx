import { useEffect } from 'react'
import { PageFrame, Lines, Button } from '../components/shared/index.js'
import PixelTiles, { LAVENDER } from '../components/pages/startups/PixelTiles.jsx'
import LogoTile from '../components/pages/lightdash-security/LogoTile.jsx'

// /jp — specs/company-pages.md §10 (Template A, Japanese; desktop layout ≥1440, tablet 810–1439; no CTA band).
// Japanese glyphs fall back to the OS CJK font (no CJK web font on live).
const A = '/assets/pages/jp'
const SEMI = "font-['Britti_Sans_Trial_Semibold',_'Britti_Sans_Medium_Placeholder',_sans-serif] font-semibold"

// §1.7: 10 tiles — the startups cluster plus (128,0) and (1120,0)
const JP_TILES = [
  { src: LAVENDER.a, x: 0, y: 0 },
  { src: LAVENDER.b, x: 32, y: 32 },
  { src: LAVENDER.c, x: 0, y: 64 },
  { src: LAVENDER.d, x: 64, y: 0 },
  { src: LAVENDER.a, x: 128, y: 0 },
  { src: LAVENDER.a, x: 1120, y: 0 },
  { src: LAVENDER.d, x: 1184, y: 0 },
  { src: LAVENDER.b, x: 1216, y: 32 },
  { src: LAVENDER.a, x: 1248, y: 0 },
  { src: LAVENDER.c, x: 1248, y: 64 },
]

const COMPANIES = [
  { name: 'Ubie', src: `${A}/image-TMnzqQgs9aJkbQ5u7jX0eUZBSE.png` },
  { name: 'SHE株式会社', src: `${A}/image-U003NExcM6ba5ZJcVmYMHQTPA.png` },
  { name: 'Retty', src: `${A}/image-e1qhDioLmaoYgCp2H8hT1dKCYmw.png` },
  { name: 'TrustHub', src: `${A}/image-khwv9DgdsjwqFvZ4Wnjh5m3KCA.png` },
  { name: 'dely', src: `${A}/image-a8xBLUGJyKoHvgK851nyQPMjVWI.jpg` },
]

const ABOUT_COPY = `Lightdashは、データチームがdbtプロジェクトを完全にインタラクティブな分析プラットフォームに変換できるようにします。
‍
- ダッシュボードを数分で作成し、探索できます。
- dbtモデルを唯一の真実のソースとして使用することで、ビジネス定義の一貫性を維持できます。
- 明確でアクセスしやすく、常に最新のデータで、社内のあらゆる部門と協業できます。

急成長中のスタートアップでもグローバル企業でも、Lightdashはチームと共にスケールします — データをプロプライエタリなシステムにロックインすることなく。`

// Both cards link to the Ubie story on live (card 2 is probably meant to link to the meetup) — kept as live.
const CARDS = [
  {
    image: `${A}/image-8ygid96rygSZCL3zZn2yhLTU6Bc.png`,
    title: 'Ubieとの成功事例をチェック',
    body: 'UbieがLightdashで構築した最先端データガバナンス基盤と、その変革をあなたのチームで実現する方法を学びましょう。',
    link: 'ケーススタディを見る ->',
  },
  {
    image: `${A}/image-VCXo1sy1MVooHh99igE4Sf3wtVM.png`,
    title: '2025年10月2日、東京で私たちとご一緒ください！',
    body: 'チームと交流し、現地ユーザーの体験談から学びましょう。 オープンソースBIがアナリティクス環境をどう変革できるかを探ります。',
    link: 'イベントに申し込む ->',
  },
]
const CARD_HREF = 'https://www.lightdash.com/customer-story/ubie-jp'

export default function Jp() {
  useEffect(() => {
    document.title = 'Lightdashへようこそ'
  }, [])

  return (
    <PageFrame frame="trl">
      {/* 1 · Hero: spacer 100 · title 56 · subtitle 175 · buttons 41 · spacer 56 */}
      <section data-hero="" className="relative flex w-full flex-col items-center">
        <PixelTiles tiles={JP_TILES} phone={['0,0', '64,0', '128,0']} />
        <div className="h-[32px] w-full shrink-0 tab:h-[100px]" />
        <div className="relative flex h-[56px] w-full items-start justify-center pt-[6px]">
          <h1 className={`${SEMI} m-0 text-center text-[32px] leading-[36px] tracking-[-0.27px] text-ld-ink tab:text-[56px] tab:leading-[50.4px]`}>Lightdashへようこそ!</h1>
          <Lines sides="tb" dashed />
        </div>
        <div className="flex w-full justify-center px-[24px] pb-[23px] pt-[24px] tab:px-0">
          <p className="ld-lead-18 m-0 max-w-[468px] text-center max-tab:text-[14px] max-tab:leading-[24.5px]">
            Lightdashは、dbtプロジェクトを瞬時にフルスタックBIプラットフォームに変換します。強力な開発者ワークフローにより、アナリストは主要な指標を定義でき、他のユーザーにはセルフサービス機能を提供できます。
          </p>
        </div>
        <div className="flex flex-row justify-center gap-[16px] pb-px">
          <Button variant="third" href="https://www.meetup.com/lightdash-japan/events/309903323/">
            東京イベント参加
          </Button>
          <Button variant="fourth" href="https://www.lightdash.com/start">
            デモ予約
          </Button>
        </div>
        <div className="relative h-[56px] w-full shrink-0">
          <Lines sides="b" dashed />
        </div>
      </section>

      {/* 2 · Trusted by: grid 5 × 89.6, gap 64 (phone 3 × 84.66, row gap 64, col gap 20) */}
      <section className="relative flex w-full flex-col items-center gap-[32px] pb-[52px] pt-[40px]">
        <p className="m-0 text-center font-inter text-[16px] leading-[24px] text-ld-muted">多くの企業からの信頼</p>
        <div className="grid grid-cols-[repeat(3,84.66px)] gap-x-[20px] gap-y-[64px] tab:grid-cols-[repeat(5,89.6px)] tab:gap-[64px]">
          {COMPANIES.map((c) => (
            <LogoTile key={c.name} {...c} />
          ))}
        </div>
        <Lines sides="b" dashed />
      </section>

      {/* 3 · "Lightdashとは何ですか？" */}
      <section className="flex w-full flex-col items-center gap-[24px] px-[24px] pb-[64px] pt-[48px] desk:min-h-[577px] desk:pt-[100px]">
        <h4 className="m-0 text-center font-britti text-[32px] font-medium leading-[32px] tracking-[-0.64px] text-black">Lightdashとは何ですか？</h4>
        <p className="m-0 max-w-[800px] whitespace-pre-wrap text-center font-inter text-[14px] leading-[24.5px] text-ld-body tab:text-[18px] tab:leading-[31.86px]">
          {ABOUT_COPY}
        </p>
      </section>

      {/* 4 · Grid: two linked cards 567×505, gap 19, padding 72/64 */}
      <section className="relative grid w-full grid-cols-1 gap-[19px] px-[16px] py-[16px] tab:grid-cols-2 tab:px-[64px] tab:py-[72px]">
        <Lines sides="tb" dashed />
        {CARDS.map((c) => (
          <a key={c.title} href={CARD_HREF} className="relative flex min-w-0 flex-col overflow-hidden pb-[32px] no-underline">
            <div className="relative h-[175px] w-full overflow-hidden tab:h-[303px]">
              <img src={c.image} alt="" className="block h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-[4px] px-[24px] py-[16px]">
              <p className="m-0 font-britti text-[20px] font-medium leading-[28px] tracking-[-0.27px] text-ld-ink-700">{c.title}</p>
              <p className="m-0 font-inter text-[14px] leading-[23.94px] text-ld-body">{c.body}</p>
              <p className="m-0 mt-[20px] font-inter text-[14px] font-semibold leading-[23.94px] text-[#7364FE]">{c.link}</p>
            </div>
            <Lines sides="trbl" />
          </a>
        ))}
      </section>

      {/* 5 · Testimonial (same layout as /startups §4.6) */}
      <section className="relative flex w-full items-center justify-center px-[24px] py-[64px] desk:h-[424px] desk:px-[64px]">
        <div className="flex w-full max-w-[896px] flex-col items-center gap-[32px] tab:flex-row tab:items-center tab:gap-[64px]">
          <div className="relative h-[124px] w-[124px] shrink-0">
            <img src={`${A}/image-YiMPHv5nMrPaVzjOHm6ZG4ZM88.png`} alt="石川 有" width={124} height={124} className="absolute inset-0 block h-full w-full object-cover" />
            <img
              src={`${A}/frame-2147233108-J57DPcsPrsFyYiH3o9gxp5prSdE.png`}
              alt=""
              width={124}
              height={124}
              className="absolute inset-0 block h-full w-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-[16px]">
            <p className={`${SEMI} m-0 text-[21px] leading-[26.88px] tracking-[-0.36px] text-ld-ink-700 tab:max-w-[708px]`}>
              <span className="text-[30px] leading-[38.4px]">“</span>
              「迅速なリリースサイクルと手厚いサポートは、Lightdash がエンタープライズニーズを真に理解するチームであることを示しています。チームの対応力とコミュニティが要望する機能の実装への姿勢は、すべてのユーザーに利益をもたらす協業環境を築けました。」
              <span className="text-[30px] leading-[38.4px]">”</span>
            </p>
            <p className="m-0 font-inter text-[16px] leading-[16px]">
              <span className="font-semibold text-ld-body">石川 有</span> <span className="text-[#A4ACB9]">·</span>{' '}
              <span className="font-inter-var font-medium text-ld-ink">Principal Data Architect @ Ubie</span>
            </p>
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
