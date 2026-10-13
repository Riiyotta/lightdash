import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { SEARCH_INDEX } from '../../pages/data/cms.js'

// cms-templates §2.2 site-search modal: client-side search over local blog + customer-story titles.
// Dim rgba(0,0,0,0.8); panel 500 wide at viewport y=195, radius 16, shadow 0 20px 40px rgba(0,0,0,.2).
export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return SEARCH_INDEX.filter((r) => r.title.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSel(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setSel(0), [query])

  if (!open) return null

  const go = (r) => {
    onClose()
    navigate(r.path)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && results[sel]) go(results[sel])
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-[rgba(0,0,0,0.8)]" onMouseDown={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-[195px] w-[500px] max-w-[calc(100%-32px)] -translate-x-1/2 overflow-hidden rounded-[16px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="flex h-[56px] items-center gap-[10px] px-[20px] py-[12px]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#333" strokeWidth="1.5" aria-hidden="true" className="shrink-0">
            <circle cx="7" cy="7" r="5.25" />
            <path d="M11 11l3.5 3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search..."
            aria-label="Search"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-inter text-[16px] text-[#333] outline-none placeholder:text-[rgba(0,0,0,0.4)]"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="flex shrink-0 cursor-pointer border-0 bg-transparent p-0">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="rgba(0,0,0,0.2)" />
                <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        {results.length > 0 && (
          <ul className="m-0 max-h-[calc(100vh-195px-96px)] list-none overflow-y-auto px-[20px] pb-[20px] pt-0">
            {results.map((r, i) => (
              <li key={r.path}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(r)}
                  className={`flex w-full cursor-pointer flex-col gap-0 border-0 px-[12px] py-[18px] text-left ${i === sel ? 'bg-[#F3F3F3]' : 'bg-transparent'}`}
                >
                  <span className="font-inter text-[14px] font-medium leading-[19.6px] text-[#333]">{r.title}</span>
                  <span className="font-inter text-[12px] font-medium leading-[16.8px] text-[rgba(0,0,0,0.4)]">{r.path}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  )
}
