import { useState } from 'react'

// specs/company-pages.md §6.6 partner form (UI only). Nothing is sent anywhere: on submit the success
// status ("Form submitted", opacity 0 → 1) is shown locally. Required: Name, Email, Company, Role.
// Inputs: 56 tall, #FFF, 1px #DFE1E7, radius 12, padding 16/24 (Name) or 16/24/16/14 (others),
// shadow 0 1px 2px rgba(10,13,18,.05); Inter 400 16/24 ls -0.24 #272835 (live family "Inter Variable
// Variable Regular" never loads); placeholder #666D80; focus border #0099FF (transition background, box-shadow).
// Submit: 200×42, #1A1B25 → hover rgba(51,51,51,.85), radius 6, padding 12/20, Inter 15/18 w500 ls -0.3 #FFF.
const FIELDS = [
  { name: 'Name', placeholder: 'Name', required: true, pad: 'pl-[24px]' },
  { name: 'Email', placeholder: 'Email', required: true },
  { name: 'Company', placeholder: 'Company', required: true },
  { name: 'Role', placeholder: 'Role', required: true },
  { name: 'LinkedIn profile', placeholder: 'LinkedIn profile', full: true },
  { name: 'What BI tools are you familiar with?', placeholder: 'What BI tools are you familiar with?', full: true },
]

const INPUT =
  'ptn-input box-border block h-[56px] w-full min-w-0 rounded-[12px] border border-solid border-[#DFE1E7] bg-white py-[16px] pr-[24px] font-inter text-[16px] font-normal leading-[24px] tracking-[-0.24px] text-ld-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)] outline-none placeholder:text-ld-body focus:border-[#0099FF]'

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault() // UI only — no network request
    setSubmitted(true)
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[560px] flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-[16px] tab:grid-cols-2">
        {FIELDS.map((f) => (
          <input
            key={f.name}
            type="text"
            name={f.name}
            aria-label={f.name}
            placeholder={f.placeholder}
            required={f.required}
            className={`${INPUT} ${f.pad ?? 'pl-[14px]'} ${f.full ? 'tab:col-span-2' : ''} text-ellipsis`}
          />
        ))}
      </div>

      <button
        type="submit"
        className="ld-btn-15 ptn-submit mt-[64px] flex h-[42px] w-[200px] cursor-pointer items-center justify-center rounded-[6px] border-0 bg-ld-dark px-[20px] py-[12px] tracking-[-0.3px] text-white hover:bg-[rgba(51,51,51,0.85)]"
      >
        Submit
      </button>

      <p
        role="status"
        className="m-0 mt-[16px] h-[24px] text-center font-inter text-[14px] leading-[24px] text-ld-body transition-opacity duration-200 ease-out"
        style={{ opacity: submitted ? 1 : 0 }}
      >
        {submitted ? 'Form submitted' : ''}
      </p>

      <p className="m-0 mt-[16px] max-w-[400px] text-center font-inter text-[14px] leading-[24px] tracking-[-0.28px] text-ld-body">
        By clicking submit you confirm you are happy to be contacted via email about Lightdash Partnership Program
      </p>
      <style>{`
        .ptn-input { transition: background 200ms ease, box-shadow 200ms ease; }
        .ptn-submit { transition: background-color 400ms var(--nav-spring-b2d4, ease); }
      `}</style>
    </form>
  )
}
