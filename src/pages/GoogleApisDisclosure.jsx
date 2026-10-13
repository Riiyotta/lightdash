import LegalPage from '../components/legal/LegalPage.jsx'

// /google-apis-disclosure — legal-pages §0/§2.3: one rich-text block with a single paragraph + one inline link.
// The link keeps the body colour with no hover change (§3.1 "Link (google page)").
export default function GoogleApisDisclosure() {
  return (
    <LegalPage title="Google APIs Disclosure" docTitle="Lightdash Google APIs Disclosure" updated="Last Updated: Oct 2023">
      <div className="ld-legal-rt">
        <p>
          This placeholder statement describes how information received from third-party APIs is handled, in
          line with the{' '}
          <a className="ld-legal-link-plain" href="https://developers.google.com/terms/api-services-user-data-policy">
            <span>relevant provider policy</span>
          </a>
          , including any usage requirements.
        </p>
      </div>
    </LegalPage>
  )
}
