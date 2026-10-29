// measure_sections.mjs: optional re-measure tool for extraction/measured-values.json `sectionHeights`.
//
// Measures every recorded template node at a 1440 x 900 viewport against a RUNNING build of the clone
// (e.g. `npx vite build --outDir <dir>` then `npx vite preview --outDir <dir> --port <port>` in the project root).
// Each node is located by the DOM path recorded in measured-values.json (`domPath`, child indices from #root,
// derived once from the React dev-build source locations, see sectionHeights.mappingMethod). Heading-bounded parts
// (`part` / `partBoundary`) are split at the boundary headings inside the body element.
//
// Usage:  NODE_PATH="$(npm root -g)" node extraction/measure_sections.mjs http://localhost:<port> [--write]
// Playwright is resolved from NODE_PATH (or PLAYWRIGHT_MODULE); no absolute path lives in this repo.
// Without --write it prints a diff against the recorded heights; with --write it updates measured-values.json.
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MV = path.join(HERE, 'measured-values.json');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2];
const write = process.argv.includes('--write');
if (!base) { console.error('usage: node extraction/measure_sections.mjs <baseUrl> [--write]'); process.exit(2); }

const mv = JSON.parse(fs.readFileSync(MV, 'utf8'));
const sh = mv.sectionHeights;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: sh.viewport.width, height: sh.viewport.height } });
let drift = 0;
for (const [tid, t] of Object.entries(sh.templates)) {
  await page.goto(base + t.route, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1500);
  const res = await page.evaluate((nodes) => {
    const byPath = (p) => { let el = document.querySelector('#root'); for (const i of p.split('.')) { el = el && el.children[Number(i) - 1]; } return el || null; };
    const box = (el) => { const b = el.getBoundingClientRect(); return { top: b.top + scrollY, bottom: b.bottom + scrollY }; };
    return { docH: document.documentElement.scrollHeight, nodes: nodes.map((n) => {
      if (!n.domPath) return null;
      const el = byPath(n.domPath); if (!el) return null;
      const a = box(el); let bottom = a.bottom;
      if (n.domPathLast) { const l = byPath(n.domPathLast); if (l) bottom = box(l).bottom; }
      if (n.partBoundary) {
        const hs = [...el.children].filter((c) => c.tagName.toLowerCase() === n.partBoundary).map((c) => box(c).top).filter((y) => y > a.top + 1);
        const bounds = [a.top, ...hs, a.bottom];
        if (n.part + 1 >= bounds.length) return null;
        return { top: Math.round(bounds[n.part] * 10) / 10, h: Math.round((bounds[n.part + 1] - bounds[n.part]) * 10) / 10 };
      }
      return { top: Math.round(a.top * 10) / 10, h: Math.round((bottom - a.top) * 10) / 10 };
    }) };
  }, t.nodes);
  if (t.documentHeightPx !== undefined && Math.abs(t.documentHeightPx - res.docH) > 1) { drift++; console.log(`DRIFT ${tid} documentHeight ${t.documentHeightPx} -> ${res.docH}`); }
  t.documentHeightPx = res.docH;
  t.nodes.forEach((n, i) => {
    const m = res.nodes[i];
    if (!n.domPath) return;
    if (!m) { drift++; console.log(`MISSING ${tid} node ${i} ${n.section} at ${n.domPath}`); delete n.heightPx; return; }
    if (n.heightPx !== undefined && Math.abs(n.heightPx - m.h) > 1) { drift++; console.log(`DRIFT ${tid} ${n.section}#${i} ${n.heightPx} -> ${m.h}`); }
    n.heightPx = m.h; n.topPx = m.top;
  });
}
await browser.close();
if (write) { fs.writeFileSync(MV, JSON.stringify(mv, null, 2) + '\n'); console.log('measured-values.json sectionHeights updated'); }
console.log(drift ? `${drift} difference(s) vs the recorded heights` : 'all recorded heights reproduce (within 1px)');
