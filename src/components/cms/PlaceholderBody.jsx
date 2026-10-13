import './richtext.css'

// Neutral placeholder rich text shared by blog posts, customer stories and events (cms-templates §4).
// The live article bodies were intentionally NOT copied. This body exercises every rich-text style:
// h2, h3, h4, p, strong/em, links, ul, ol, blockquote, inline code, code block, image, table, 16:9 embed.

const LOREM_A =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Donec sed odio dui, cras mattis consectetur purus sit amet fermentum.'
const LOREM_B =
  'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum, aenean lacinia bibendum nulla sed consectetur.'
const LOREM_C =
  'Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis, praesent commodo cursus magna vel scelerisque nisl.'

// Placeholder YAML snippet, pre-tokenised: [text, class] pairs per line.
// key = #77DDDD, punc = #999999, kw = #00BBFF, default #EEEEEE.
const CODE = [
  [['placeholder', 'key'], [':', 'punc']],
  [['  ', ''], ['name', 'key'], [':', 'punc'], [' example_item', '']],
  [['  ', ''], ['type', 'key'], [':', 'punc'], [' string', '']],
  [['  ', ''], ['enabled', 'key'], [':', 'punc'], [' ', ''], ['true', 'kw']],
  [['  ', ''], ['items', 'key'], [':', 'punc']],
  [['    ', ''], ['-', 'punc'], [' ', ''], ['label', 'key'], [':', 'punc'], [' lorem', '']],
  [['    ', ''], ['-', 'punc'], [' ', ''], ['label', 'key'], [':', 'punc'], [' ipsum', '']],
  [['  ', ''], ['default', 'key'], [':', 'punc'], [' ', ''], ['null', 'kw']],
]

/** Headings that appear in the body, in order. Used to build the TOC. */
export const PLACEHOLDER_HEADINGS = [
  { id: 'placeholder-section-one', level: 2, text: 'Lorem ipsum dolor sit amet' },
  { id: 'placeholder-section-two', level: 3, text: 'Consectetur adipiscing elit' },
  { id: 'placeholder-section-three', level: 2, text: 'Sed do eiusmod tempor incididunt ut labore' },
  { id: 'placeholder-section-four', level: 2, text: 'Ut enim ad minim veniam' },
  { id: 'placeholder-section-five', level: 2, text: 'Duis aute irure dolor' },
]
const H = Object.fromEntries(PLACEHOLDER_HEADINGS.map((h) => [h.id, h]))

function Heading({ id }) {
  const h = H[id]
  const Tag = `h${h.level}`
  return (
    <Tag id={h.id} data-toc="">
      {h.text}
    </Tag>
  )
}

function CodeBlock() {
  const cls = { key: 'tok-key', punc: 'tok-punc', kw: 'tok-kw' }
  return (
    <div className="cms-rt-code">
      <pre>
        <code>
          {CODE.map((line, i) => (
            <span key={i} className="cms-rt-line">
              {line.map(([t, k], j) => (
                <span key={j} className={cls[k] ?? undefined}>
                  {t}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

/** Static 16:9 embed placeholder (lite-embed look: dark poster + 68×48 red play button). */
function EmbedPlaceholder() {
  return (
    <div className="cms-rt-embed bg-[#161820]" role="img" aria-label="Video embed placeholder">
      <svg
        width="68"
        height="48"
        viewBox="0 0 68 48"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.3.3 34 .3 34 .3S12.7.3 7.4 1.7c-2.9.8-5.1 3.1-5.9 6C.1 13 .1 24 .1 24s0 11 1.4 16.3c.8 2.9 3 5.2 5.9 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.6-1.4c2.9-.8 5.1-3.1 5.9-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#FF0000" />
        <path d="M45 24 27 14v20z" fill="#FFFFFF" />
      </svg>
    </div>
  )
}

/**
 * @param variant 'post' | 'story' | 'event' (story = 24px list/image margins)
 * @param image   src for the in-body image (a metadata asset such as the post thumbnail)
 */
export default function PlaceholderBody({ variant = 'post', image, className = '' }) {
  return (
    <div className={`cms-rt ${variant === 'story' ? 'cms-rt--story' : ''} ${className}`}>
      <EmbedPlaceholder />
      <p>
        <strong>Placeholder introduction.</strong> {LOREM_A} This paragraph also contains{' '}
        <em>emphasised text</em>, <a href="/blog">an inline link</a> and a fragment of <code>inline_code</code>.
      </p>

      <Heading id="placeholder-section-one" />
      <p>{LOREM_B}</p>
      <p>{LOREM_C}</p>
      <ul>
        <li>
          <p>
            <strong>Lorem ipsum:</strong> dolor sit amet, consectetur adipiscing elit.
          </p>
        </li>
        <li>
          <p>Vestibulum id ligula porta felis euismod semper.</p>
        </li>
        <li>
          <p>Aenean eu leo quam, pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
        </li>
      </ul>
      <p>{LOREM_A}</p>

      <Heading id="placeholder-section-two" />
      <p>
        Praesent commodo cursus magna, run <code>placeholder --example</code> to see sample output:
      </p>
      <CodeBlock />
      <p>{LOREM_B}</p>
      <ol>
        <li>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
        </li>
        <li>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        </li>
        <li>
          <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
        </li>
      </ol>

      <Heading id="placeholder-section-three" />
      <p>{LOREM_C}</p>
      {image && <img src={image} alt="Placeholder illustration" />}
      <p>{LOREM_A}</p>
      <blockquote>
        <p>
          “Placeholder quotation. Donec ullamcorper nulla non metus auctor fringilla, vivamus sagittis lacus vel
          augue laoreet rutrum faucibus dolor auctor.”
          <br />
          <em>- Placeholder Name, Placeholder Role</em>
        </p>
      </blockquote>
      <h4>Placeholder subheading (h4)</h4>
      <p>{LOREM_B}</p>

      <Heading id="placeholder-section-four" />
      <p>Etiam porta sem malesuada magna mollis euismod. Sample table:</p>
      <figure className="cms-rt-table">
        <table>
          <thead>
            <tr>
              <th>
                <p>Column A</p>
              </th>
              <th>
                <p>Column B</p>
              </th>
              <th>
                <p>Column C</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Lorem ipsum</p>
              </td>
              <td>
                <p>
                  <strong>Dolor sit</strong>, amet consectetur
                </p>
              </td>
              <td>
                <p>Adipiscing elit sed do eiusmod tempor.</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Ut enim</p>
              </td>
              <td>
                <p>
                  <strong>Minim veniam</strong>, quis nostrud
                </p>
              </td>
              <td>
                <p>Exercitation ullamco laboris nisi ut aliquip.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </figure>
      <p>{LOREM_C}</p>

      <Heading id="placeholder-section-five" />
      <p>
        {LOREM_B} <a href="/blog">Placeholder call to action link</a>.
      </p>
    </div>
  )
}
