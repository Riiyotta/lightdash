import LegalPage, { LegalSeparator } from '../components/legal/LegalPage.jsx'
import { lorem } from '../components/legal/placeholder.js'

// /privacy-policy — legal-pages §2.3/§3: intro block, 7 numbered sections (each followed by a Separator),
// "Retention" then the two trailing H4 blocks separated by line-less 40px spacers.
// Heading text from §3.2; every body is placeholder copy.

function Section({ heading, children }) {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="ld-legal-rt">
        <p className="ld-legal-section-h">{heading}</p>
      </div>
      {children}
    </div>
  )
}

function Sub({ heading, sentences, offset = 0 }) {
  return (
    <div className="ld-legal-rt">
      <p className="ld-legal-sub-h">{heading}</p>
      <p>{lorem(sentences, offset)}</p>
    </div>
  )
}

function Body({ paras }) {
  return (
    <div className="ld-legal-rt">
      {paras.map(([n, o], i) => (
        <p key={i}>{lorem(n, o)}</p>
      ))}
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      docTitle="Lightdash Privacy Policy"
      description="Learn how Lightdash protects your data. Our privacy policy explains how we handle, store, and secure information across our AI-first BI platform."
      updated="Last Updated: Jan 2026"
    >
      {/* Introduction (32px heading, no 24px section gap) */}
      <div className="ld-legal-rt">
        <p className="ld-legal-intro-h">Introduction</p>
        <p>
          This placeholder paragraph introduces the policy and links to the{' '}
          <a href="https://www.lightdash.com">lightdash.com</a> website. {lorem(6, 1)}
        </p>
        <p>{lorem(3, 4)}</p>
      </div>
      <LegalSeparator />

      <Section heading="What Information Lightdash collects and why">
        <Sub heading="Information from website visitors" sentences={7} offset={0} />
        <Sub heading="Usage data information from self-managed Lightdash instances" sentences={5} offset={2} />
        <Sub heading="Use of Google User Data" sentences={6} offset={4} />
      </Section>
      <LegalSeparator />

      <Section heading="Lawful use of your personal data">
        <div className="ld-legal-rt">
          <p>{lorem(3, 3)}</p>
          <ul>
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <p>{lorem(1 + (i % 2), i)}</p>
              </li>
            ))}
          </ul>
          <p>{lorem(2, 6)}</p>
        </div>
      </Section>
      <LegalSeparator />

      <Section heading="Who do we share your data with?">
        <Body paras={[[5, 0], [3, 3], [4, 5]]} />
      </Section>
      <LegalSeparator />

      <Section heading="How we use Artificial Intelligence (AI) features and the Model Context Protocol (MCP)">
        <Body paras={[[3, 1]]} />
        <Sub heading="What gets sent to the AI Agent." sentences={4} offset={2} />
        <Sub heading="What Lightdash stores for MCP sessions." sentences={4} offset={5} />
        <Sub heading="What Lightdash does NOT store for MCP." sentences={3} offset={0} />
      </Section>
      <LegalSeparator />

      <Section heading="Where we hold and process your personal data">
        <Body paras={[[5, 2], [3, 6]]} />
      </Section>
      <LegalSeparator />

      <Section heading="Your rights">
        <Body paras={[[12, 0]]} />
      </Section>
      <LegalSeparator />

      <Section heading="Retention of personal data">
        <Body paras={[[7, 3]]} />
      </Section>

      {/* trailing blocks: white, spacer rows without dashed lines */}
      <LegalSeparator lines={false} />
      <div className="ld-legal-rt bg-white">
        <h4>General</h4>
        <p>{lorem(4, 1)}</p>
      </div>
      <LegalSeparator lines={false} />
      <div className="ld-legal-rt bg-white">
        <h4>How to contact us</h4>
        <p>{lorem(2, 5)}</p>
      </div>
    </LegalPage>
  )
}
