// Neutral placeholder copy for the legal pages. Only titles, dates and heading text come from the spec
// (specs/legal-pages.md §0, §3.2); every body below is written for the clone and is not the live text.

const SENTENCES = [
  'This paragraph is placeholder copy that stands in for the original wording on this page.',
  'It is written to take up a similar amount of space so the layout, spacing and rhythm of the document can be reviewed.',
  'The final wording will be supplied separately and should replace this text in full.',
  'Nothing in this placeholder describes real obligations, rights or commitments of any party.',
  'Sample sentences like this one help confirm line length, wrapping and paragraph spacing at every breakpoint.',
  'Further detail would normally appear here, broken into short and readable sentences.',
  'Where a defined term would usually appear, a neutral example is used instead.',
  'Each item in this section follows the same structure as the reference design.',
]

const SHORT = ['a short placeholder item;', 'another brief example entry; and', 'a final illustrative item.']

/** n sentences starting at an offset, cycling through the pool. */
export function lorem(n, offset = 0) {
  return Array.from({ length: n }, (_, i) => SENTENCES[(offset + i) % SENTENCES.length]).join(' ')
}

export function shortItem(i) {
  return SHORT[i % SHORT.length]
}
