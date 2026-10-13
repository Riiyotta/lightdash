/** @type {import('tailwindcss').Config} */
// Every color used by the shell lives here as a named token (CLONE_SPEC.md §1.2).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // §1.1 Framer breakpoints: tablet 810–1099.98, desktop ≥1100
      screens: {
        tab: '810px',
        desk: '1100px',
        wide: '1280px',
      },
      colors: {
        'nav-bg': '#080808',
        'nav-border': 'rgba(229,231,235,0.10)',
        'nav-border-mobile': 'rgba(255,255,255,0.10)',
        'menu-panel': '#0C0C0C',
        'menu-overlay': 'rgba(0,0,0,0.65)',
        'menu-card-well': '#141416',
        'menu-card': '#272835',
        'dashed-line': 'rgba(255,255,255,0.10)',
        'text-white': '#FFFFFF',
        'text-item': '#EDEDED',
        'text-item-sub': '#969696',
        'text-card-sub': '#C1C7D0',
        'text-login-mobile': '#666D80',
        'link-hover': 'rgba(255,255,255,0.7)',
        'brand-purple': '#5E4CFF',
        'brand-purple-border': '#4835F2',
        'btn-light-bg': '#F8FAFB',
        'btn-light-bg-hover': '#ECEFF3',
        // Sampled from reference/sections/talk-to-team-modal-1440.png (not a computed value)
        'btn-light-bg-dimmed': '#C3C5C9',
        'btn-light-border': '#DFE1E7',
        'btn-light-text': '#272835',
        'btn-dark-mobile': '#1A1B25',
        'hamburger-bar': '#F0F0F0',
        'mobile-chevron': '#999999',
        'icon-stroke': '#818898',
        'pill-label': 'rgba(255,255,255,0.55)',
        // Sampled from reference/sections/nav-dropdown-customers-1440.png (spec: "light 1px border")
        'pill-border': '#3D3D3D',
        'modal-overlay': 'rgba(0,0,0,0.60)',
        'modal-card': '#FFFFFF',
        'iframe-bg': '#07060F',
        'page-bg': '#FFFFFF',

        // Inner pages (specs/SHARED.md §4, §5, §9, §10; specs/cms-templates.md §1.2)
        'ld-line': '#E5E7EB', // hairlines (solid frames + dashed grid lines)
        'ld-dark': '#1A1B25', // banner, CTA card, "Third" button, footer, quote text
        'ld-ink': '#272835', // headings / card titles / light button text
        'ld-ink-700': '#36394A', // section titles, FAQ, dark hairline
        'ld-display': '#1C0000', // display-72 hero H1
        'ld-ink-strong': '#0D0D12', // comparison table Lightdash column
        'ld-body': '#666D80', // lead / body grey
        'ld-muted': '#818898', // card body, meta
        'ld-sub': '#6B7280', // sub-16, blog meta
        'ld-well': '#F6F8FA', // hero-image wells, CTA grid, pill-active
        'ld-well-tab': '#F7F8FA', // accordion tab image well
        'ld-icon-cell': '#F3F4F6', // icon benefits cell
        'ld-surface': '#F8FAFB', // table header, light button, story card
        'ld-cta-grid': '#CDD2D9', // CTA band 8px grid lines
        'ld-logo': '#333742', // customer logos row colour
        'ld-footer-link': '#A4ABB8',
        'ld-footer-link-hover': '#ECEFF3',
        'ld-footer-head': '#F8F9FB',
        'ld-footer-line': '#272835', // footer dashed lines
        'ld-footer-frame': '#36394A', // footer solid frame + CTA dashed guides + email input bg
        'ld-seventh-text': '#B4ACFF',
        'ld-seventh-text-hover': '#DDD9FA',
        'ld-purple-10': 'rgba(94,76,255,0.1)',
        'ld-purple-20': 'rgba(94,76,255,0.2)',
        'ld-purple-60': 'rgba(94,76,255,0.6)',
        'ld-purple-70': 'rgba(94,76,255,0.7)',
        'ld-purple-77-70': 'rgba(94,77,255,0.7)', // "Fifth" hover (source value)
        'ld-pill-border': '#5E5B5B', // accordion Subtitle Pill border
        'ld-quote-well': '#F8FAFB', // customer quote gradient end
      },
      fontFamily: {
        britti: ['"Britti Sans Medium"', '"Britti Sans Medium Placeholder"', 'sans-serif'],
        inter: ['Inter', '"Inter Placeholder"', 'sans-serif'],
        'britti-semi': ['"Britti Sans Trial Semibold"', '"Britti Sans Medium Placeholder"', 'sans-serif'],
        'inter-var': ['"Inter Variable"', 'Inter', '"Inter Placeholder"', 'sans-serif'],
        pixelify: ['"Pixelify Sans"', 'ui-monospace', 'monospace'],
        'fragment-mono': ['"Fragment Mono"', 'monospace'],
        geist: ['Geist', 'sans-serif'],
      },
      boxShadow: {
        'modal-card': 'rgba(0,0,0,0.25) 0 1px 2px 0',
        // SHARED §9 CTA card
        'ld-cta-card':
          'rgba(39,40,53,.1) 0 0 0 1px, rgba(39,40,53,.08) 0 24px 24px -12px, rgba(39,40,53,.08) 0 12px 12px -6px, rgba(39,40,53,.08) 0 6px 6px -3px, rgba(39,40,53,.08) 0 2px 2px -1px',
      },
      transitionTimingFunction: {
        framer: 'cubic-bezier(.44,0,.56,1)',
      },
    },
  },
  plugins: [],
}
