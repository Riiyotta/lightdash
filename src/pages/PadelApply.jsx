import { useEffect, useState } from 'react'

// /padel-apply — not in the spec. Built from own recon of https://www.lightdash.com/padel-apply (headless
// Chromium, DPR 1, 1440×900 + 390×844, 2026-10-13; screenshots in reference/pages/padel-apply-{1440,390}.png).
// Measured: no frame hairlines. Wrapper "Padel Application" max 760, padding 96/24/112, flex column gap 32,
// centred → content 712 wide at 1440 (x 364), 342 at 390 (x 24). Footer starts at y 974.8 (1440).
// Form is UI only: nothing is sent anywhere (the live form posts to Framer's form backend).

const FIELDS = [
  { name: 'Name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { name: 'Email', label: 'Work email', type: 'email', placeholder: 'you@company.com' },
  { name: 'Company', label: 'Company', type: 'text', placeholder: 'Your company' },
]
const SKILLS = ['Beginner — new to padel', 'Social — I play occasionally', 'Intermediate — I play regularly', 'Competitive — bring it on']

const LABEL = 'm-0 font-inter text-[14px] font-semibold leading-[16.8px] text-[#1C1E28]'
// input wrapper: #FFF, 1px #D2D6DC (Framer ::after), radius 8, padding 12/14, 43.2 tall; focus border #5C44FF
const WRAP =
  'relative flex h-[43.2px] items-center rounded-[8px] bg-white shadow-[inset_0_0_0_1px_#D2D6DC] transition-[box-shadow,background] duration-200 focus-within:shadow-[inset_0_0_0_1px_#5C44FF]'
const CONTROL =
  'block w-full min-w-0 border-0 bg-transparent p-0 font-inter text-[16px] font-normal leading-[19.2px] text-[#1C1E28] outline-none placeholder:text-[#7C828F]'

export default function PadelApply() {
  const [values, setValues] = useState({ Name: '', Email: '', Company: '', 'Skill level': SKILLS[0] })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Apply for Lightdash Leagues Padel | Lightdash'
  }, [])

  // Button variant "Incomplete" (opacity .55) until every required field has a value, then "Default" (1);
  // measured tween ≈ 0.2–0.3 s.
  const complete = FIELDS.every((f) => values[f.name].trim() !== '') && /.+@.+/.test(values.Email)
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault() // UI only — no network request
    if (complete) setSubmitted(true)
  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-[32px] px-[24px] pb-[112px] pt-[96px]">
        {/* Introduction: gap 16 */}
        <div className="flex flex-col gap-[16px]">
          <p className="m-0 font-inter text-[14px] font-semibold uppercase leading-[16.8px] tracking-[1.12px] text-[#5C44FF]">LIGHTDASH LEAGUES: Padel</p>
          <h1 className="m-0 font-britti text-[56px] font-medium leading-[56px] tracking-[-2.24px] text-[#1C1E28]">Apply to play</h1>
          <p className="m-0 font-inter text-[16px] leading-[30px] tracking-[-0.32px] text-ld-ink-700 [text-wrap:balance]">
            Please note that places are limited, and applying doesn’t guarantee a spot. We’ll email you if you’re offered a place.
          </p>
        </div>

        {/* Form: #F8FAFB, 1px #E5E7EB, radius 16, padding 32, gap 20 */}
        <form
          onSubmit={onSubmit}
          aria-label="Padel Interest Form"
          className="flex flex-col gap-[20px] rounded-[16px] bg-ld-surface p-[32px] shadow-[inset_0_0_0_1px_#E5E7EB]"
        >
          {FIELDS.map((f) => (
            <label key={f.name} className="flex flex-col gap-[8px]">
              <span className={LABEL}>{f.label}</span>
              <span className={`${WRAP} px-[14px] py-[12px]`}>
                <input type={f.type} name={f.name} placeholder={f.placeholder} required value={values[f.name]} onChange={set(f.name)} className={CONTROL} />
              </span>
            </label>
          ))}
          <label className="flex flex-col gap-[8px]">
            <span className={LABEL}>Padel skill level</span>
            <span className={`${WRAP} pr-[14px]`}>
              <select
                name="Skill level"
                required
                value={values['Skill level']}
                onChange={set('Skill level')}
                className={`${CONTROL} h-full cursor-pointer appearance-none px-[14px] py-[12px]`}
              >
                {SKILLS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {/* select chevron (Framer form default; drawn here, exact glyph not captured) */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2">
                <path d="M2.5 4.5 6 8l3.5-3.5" stroke="#7C828F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </label>

          <button
            type="submit"
            name="Submit Application"
            className="flex h-[48px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] border-0 bg-[#5C44FF] px-[22px] py-[14px] transition-opacity duration-300 ease-out"
            style={{ opacity: complete ? 1 : 0.55 }}
          >
            <span className="font-inter text-[16px] font-semibold leading-[19.2px] text-white">{submitted ? 'Application sent' : 'Apply to play'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
