import { useEffect } from 'react'

/** Sets document.title for the CMS templates (cms-templates §2/§3/§5/§6/§7 <title> values). */
export default function usePageTitle(title) {
  useEffect(() => {
    if (title) document.title = title
  }, [title])
}
