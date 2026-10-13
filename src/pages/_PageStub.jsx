import { useParams } from 'react-router-dom'
import { PageFrame } from '../components/shared/Frame.jsx'

// Temporary placeholder used by route stubs until the page agents build each page.
export default function PageStub({ title, path }) {
  const params = useParams()
  const slug = params.slug
  return (
    <PageFrame frame="trbl">
      <div className="flex min-h-[480px] flex-col items-center justify-center gap-[12px] px-[24px] py-[100px] text-center">
        <h1 className="ld-h2-48 m-0">{title}</h1>
        <p className="ld-lead-18 m-0">
          Placeholder for <code>{path}</code>
          {slug ? (
            <>
              {' '}
              (slug: <code>{slug}</code>)
            </>
          ) : null}
        </p>
      </div>
    </PageFrame>
  )
}
