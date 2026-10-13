// /about content (specs/company-pages.md §7). Names kept verbatim from live, including the lowercase-L
// typos "lan Ahuja" and "llonna Babakhanova".
const A = '/assets/pages/about'
export const ABOUT_A = A

// §7.1 stickers: positions inside the 968×307 layer
export const STICKERS = [
  { src: `${A}/sticker-3jDAfrYsb5KDuuOTsrf6Mf69t5M.png`, x: 27, y: 54 },
  { src: `${A}/sticker-DlEXpkvcod13UbFuJK5SfJhbZE.png`, x: 156, y: 46 },
  { src: `${A}/sticker-MUUZbVAiGjvOSCXQKxPwckDjko.png`, x: 92, y: 143 },
  { src: `${A}/sticker-juWoChWJuM2NEvCg3e5kICWUn0.png`, x: 883, y: 64 },
  { src: `${A}/sticker-cOkRzlkSX0kvBdkYeEfPHwBt8.png`, x: 768, y: 54 },
  { src: `${A}/sticker-67o8LS0xz9NCxTx0Jz1dlmiU.png`, x: 829, y: 136 },
]
// <810 instance (layer at x −289): only sticker 1 (50px at 309,106) and sticker 6 (50px at 586,122) are in view
export const STICKERS_PHONE = [
  { src: STICKERS[0].src, x: 309, y: 106, size: 50 },
  { src: STICKERS[5].src, x: 586, y: 122, size: 50 },
]

const T = (name, role, slug) => ({ name, role, slug })
export const TEAM = [
  T('Hamzah Chaudhary', 'CEO', 'hamzah-chaudhary'),
  T('Oliver Laslett', 'CTO', 'oliver-laslett'),
  T('Jose Rego', 'Software Engineer', 'jose-rego'),
  T('Priyanka Patel', 'Product Designer', 'priyanka-patel'),
  T('Javier Rengel', 'Software Engineer', 'javier-rengel'),
  T('lan Ahuja', 'Partnerships & Growth', 'lan-ahuja'),
  T('Irakli Janiashvili', 'Software Engineer', 'irakli-janiashvili'),
  T('João Viana', 'Software Engineer', 'jo-o-viana'),
  T('Marshall Agnew', 'Software Engineer', 'marshall-agnew'),
  T('Bruno Almeida', 'Software Engineer', 'bruno-almeida'),
  T('Jake Peterson', 'Analytics Eng. Advocate', 'jake-peterson'),
  T('Oli Ramsay', 'Analytics Eng. Advocate', 'oli-ramsay'),
  T('Giorgi Bagdavadze', 'Software Engineer', 'giorgi-bagdavadze'),
  T('Rohan Bedi', 'Growth', 'rohan-bedi'),
  T('Shanzé Munir', 'Marketing', 'shanz-munir'),
  T('llonna Babakhanova', 'Finance & Ops', 'llonna-babakhanova'),
  T('Yegor Borisenco', 'Software Engineer', 'yegor-borisenco'),
  T('Tatiana Inama', 'Software Engineer', 'tatiana-inama'),
  T('Jess Hitchcock', 'Analytics Eng. Advocate', 'jess-hitchcock'),
  T('Tori Whaley', 'Analytics Eng. Advocate', 'tori-whaley'),
  T('Lukas Spiss', 'Software Engineer', 'lukas-spiss'),
  T('Charlie Dowler', 'Software Engineer', 'charlie-dowler'),
  T('Ash Evans', 'Marketing Designer', 'ash-evans'),
  T('Sandro Dolidze', 'Product Engineer', 'sandro-dolidze'),
  T('Josh Elston-Green', 'Enterprise Solutions Architect', 'josh-elston-green'),
  T('Idris Affrin', 'First GTM Engineer', 'idris-affrin'),
  T('Gwyneth Windflower', 'Analytics Engineering Advocate', 'gwyneth-windflower'),
  T('Cloudy', 'Support', 'cloudy'),
]

// §7.3 timeline. Each row: left / right column, either { photo } or { items: [{ month, lines: [] }] }.
const img = (f) => ({ photo: `${A}/${f}` })
export const TIMELINE = [
  {
    year: '2021',
    rows: [
      {
        left: img('image-qEi3UXD6LnzJbUwQ7CSkkyiobvU.png'),
        right: {
          items: [
            { month: 'April', lines: ['First commit for Lightdash added to Github'] },
            { month: 'June', lines: ['Launched open source BI on HackerNews'] },
          ],
        },
      },
      {
        left: { items: [{ month: 'December', lines: ['Lightdash is the first BI tool to natively support dbt metrics'] }] },
        right: img('image-44WXvHssPoGe5dPfkaAEIMHeds.png'),
      },
    ],
  },
  {
    year: '2022',
    rows: [
      {
        left: img('image-nB0elRiD7izPuHjBwayFAOd4Uhg.gif'),
        right: {
          items: [
            { month: 'January', lines: ['Lightdash Cloud is available in private beta'] },
            { month: 'May', lines: ['Offsite : We tie-dyed in Barcelona'] },
          ],
        },
      },
      {
        left: {
          items: [
            { month: 'June', lines: ['Lightdash Slack Community launches'] },
            { month: 'July', lines: ['Offsite : We played games in the English countryside'] },
          ],
        },
        right: img('image-e5LM3H0M9dYT8crO6nnbJb74.gif'),
      },
      {
        left: img('image-0HevjUNOs4bEKWVJE5c4rahsPEM.gif'),
        right: {
          items: [
            { month: 'October', lines: ['We raise $8.4M to build the BI tool we always wanted', 'We brought a whole lot of color to Coalesce'] },
            { month: 'December', lines: ['Offsite : We ate fondue in Chamonix'] },
          ],
        },
      },
    ],
  },
  {
    year: '2023',
    rows: [
      {
        left: {
          items: [
            { month: 'January', lines: ['Lightdash Cloud is launched into public beta'] },
            { month: 'May', lines: ['Offsite : We made pizzas in Porto'] },
            { month: 'December', lines: ['We celebrated an epic year with Lightdash Zapped - check it out'] },
          ],
        },
        right: img('image-9ynMf2CzCfno26Ag6XjnEVCsBdE.png'),
      },
    ],
  },
  {
    year: '2024',
    rows: [
      {
        left: img('image-FvpztNaFU3zkpIghB0kooGEZKU.gif'),
        right: {
          items: [
            { month: 'January', lines: ['Lightdash Cloud is GA 🚀'] },
            { month: 'February', lines: ['Embedding is released into public beta'] },
            { month: 'July', lines: ['AI Analyst is released in private beta'] },
            { month: 'September', lines: ['Offsite: We hiked in Switzerland'] },
            { month: 'October', lines: ['We raised $11M in series A funding!'] },
          ],
        },
      },
    ],
  },
  {
    year: '2025',
    rows: [
      {
        left: {
          items: [
            { month: 'January', lines: ['Dashboards as code launched'] },
            { month: 'February', lines: ['React SDK launched'] },
            { month: 'March', lines: ['Offsite : We hackathon-ed in Porto'] },
            { month: 'June', lines: ['London HQ opens', 'AI Agents launch in private beta'] },
          ],
        },
        right: img('image-iOttjsTEpxsLbCEsryRLkVYSKc.gif'),
      },
    ],
  },
]
