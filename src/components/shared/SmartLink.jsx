import { Link } from 'react-router-dom'

// Spec hrefs are written as Framer-relative "./x". Normalise them to app paths ("/x").
export function toPath(href) {
  if (!href) return href
  if (href.startsWith('./')) return href.slice(1)
  return href
}

export function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
}

// Internal paths render a react-router <Link>; anything else renders a plain <a>.
// No href -> renders `as` (default 'a', no href) so Framer "<a> with no href" cards keep their markup.
export default function SmartLink({ href, newTab = false, children, as: Tag = 'a', ...rest }) {
  const to = toPath(href)
  if (!to) return <Tag {...rest}>{children}</Tag>
  if (isInternal(to)) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={to} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
