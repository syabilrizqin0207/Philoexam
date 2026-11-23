// Print my cheat sheet as a two-page A4 PDF.
//   Page 1: the one-page summary Claude writes in Land Lah! (My cheat sheet → one-page summary), as written.
//   Page 2: papers/cheat-sheet-page2.md, every other topic still to improve, written by Claude from the Land Lah! record.
// Each page is fitted on its own: the type is the largest size at which the page holds everything.
//   node scripts/build-ai-sheet.mjs <save.json | sheet.md> [out.pdf] [--page2 file.md | --no-page2]
// save.json is the app's synced "landlah" document (or a bare save); page 1 is its aiSheet.text.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const noPage2 = args.includes('--no-page2'); if (noPage2) args.splice(args.indexOf('--no-page2'), 1);
const page2Path = flag('--page2') || path.join(repo, 'papers', 'cheat-sheet-page2.md');
const [src, outArg] = args;
const out = path.resolve(outArg || path.join(repo, 'dist', 'RE2702-my-cheat-sheet.pdf'));
if (!src) { console.error('usage: node scripts/build-ai-sheet.mjs <save.json | sheet.md> [out.pdf] [--page2 file.md | --no-page2]'); process.exit(1); }

let text, at = null;
if (/\.json$/i.test(src)) {
  let save = JSON.parse(fs.readFileSync(src, 'utf8'));
  if (save.save) save = typeof save.save === 'string' ? JSON.parse(save.save) : save.save;
  if (!save.aiSheet || !save.aiSheet.text) throw new Error('This save has no one-page summary yet. Make one in the app: My cheat sheet → one-page summary.');
  text = save.aiSheet.text; at = save.aiSheet.at;
} else text = fs.readFileSync(src, 'utf8');

/* Citations to flag before the sheet is relied on: they are not in the course notes. */
const FLAGS = [[/Cite \*\*s 90\*\*\./g, 'Cite **s 90**. [check: no s 90 in your notes; confirm before citing]']];
FLAGS.forEach(([re, rep]) => { text = text.replace(re, rep); });

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\[check([^\]]*)\]/g, '<span class="chk">[check$1]</span>');
function parse(md) {
  let body = '', open = false;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const h = line.match(/^#{1,3}\s+(.*)$/);
    if (h) {
      if (open) body += '</ul></section>';
      const m = h[1].match(/^(.*?)\s*\(([^,()]+)(?:,\s*([^()]*))?\)\s*$/);
      const tone = t => /missed|open|checkpoint|weak/i.test(t) ? ' red' : /fixed/i.test(t) ? ' grn' : '';
      body += `<section><h2>${inline(m ? m[1] : h[1])}${m ? ` <span class="tag">${esc(m[2])}</span>${m[3] ? `<span class="tag${tone(m[3])}">${esc(m[3])}</span>` : ''}` : ''}</h2><ul>`;
      open = true;
    } else {
      if (!open) { body += '<section><ul>'; open = true; }
      body += `<li>${inline(line.replace(/^[-*•]\s+/, ''))}</li>`;
    }
  }
  return body + (open ? '</ul></section>' : '');
}
const when = new Date(at || Date.now()).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Singapore' });
const pages = [{
  title: 'RE2702 Cheat sheet · 1. My most-missed concepts',
  note: `Written by Claude in Land Lah! from my mistakes · ${esc(when)}<br>Most-missed first · bold = cite it · red [check] = confirm on the slides`,
  body: parse(text)
}];
if (!noPage2 && fs.existsSync(page2Path)) pages.push({
  title: 'RE2702 Cheat sheet · 2. Every other topic to improve',
  note: `Written by Claude from my Land Lah! record · ${esc(when)}<br>Still open first, then topics fixed but fragile`,
  body: parse(fs.readFileSync(page2Path, 'utf8'))
});

const CSS = `
@page { size: A4; margin: 7mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; color: #14202b; }
.page { width: 196mm; height: 282mm; display: flex; flex-direction: column; font: var(--f)/1.3 'Bitstream Charter', 'Caladea', serif; }
.page + .page { break-before: page; }
header { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; border-bottom: 2px solid #0e4a6b; padding-bottom: 2.5mm; margin-bottom: 2.5mm; font-family: Inter, sans-serif; }
header h1 { margin: 0; font-size: 13pt; color: #0e4a6b; letter-spacing: -0.01em; }
header span { font-size: 7.3pt; color: #4d6472; text-align: right; }
.cols { flex: 1; column-count: 3; column-gap: 4.5mm; column-rule: 0.5px solid #c9dbe4; column-fill: auto; overflow: hidden; }
section { margin: 0 0 calc(var(--f) * 0.55); }
h2 { font: 700 calc(var(--f) + 0.9pt)/1.2 Inter, sans-serif; color: #0e4a6b; margin: 0 0 calc(var(--f) * 0.2); padding-bottom: 1pt; border-bottom: 0.8px solid #9fc6da; break-after: avoid; }
li { margin: 0 0 calc(var(--f) * 0.18); break-inside: avoid; }
ul { margin: 0; padding-left: calc(var(--f) * 1.05); }
.tag { display: inline-block; font: 600 max(5.5pt, calc(var(--f) - 1.6pt)) Inter, sans-serif; color: #33586b; border: 0.6px solid #9fc6da; padding: 0 3px; margin-left: 3px; vertical-align: 1px; }
.tag.red { color: #b3261e; border-color: #e3a8a8; }
.tag.grn { color: #2f7d4f; border-color: #a8d4b8; }
b { font-weight: 700; color: #0b3a55; }
.chk { color: #b3261e; font: 600 max(5.5pt, calc(var(--f) - 1.5pt)) Inter, sans-serif; }
footer { font: 6.5pt Inter, sans-serif; color: #6b7f8a; border-top: 0.6px solid #c9dbe4; padding-top: 1.2mm; margin-top: 1.5mm; }`;
const FOOT = 'Final: Tue 24 Nov 2026, 9–11 am, Biz2 05-11 · Section A: 20 MCQs × 3 · Section B: 40-mark case study in ILAC · bold every authority · every named party gets a conclusion';
const pageHTML = (p, size) => `<div class="page" style="--f:${size}pt"><header><h1>${esc(p.title)}</h1><span>${p.note}</span></header><div class="cols">${p.body}</div><footer>${FOOT}</footer></div>`;
const doc = inner => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${inner}</body></html>`;

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  const fits = async () => page.$eval('.cols', el => el.scrollWidth <= el.clientWidth + 1);
  const sizes = [];
  for (const p of pages) {                 // largest type at which the three columns hold the whole page
    let lo = 5.5, hi = 11, best = 0;
    for (let k = 0; k < 9; k++) {
      const mid = (lo + hi) / 2;
      await page.setContent(doc(pageHTML(p, mid)), { waitUntil: 'load' });
      if (await fits()) { best = mid; lo = mid; } else hi = mid;
    }
    if (!best) throw new Error(`"${p.title}" does not fit on one page even at 5.5 pt`);
    sizes.push(Math.floor(best * 10) / 10);
  }
  await page.setContent(doc(pages.map((p, i) => pageHTML(p, sizes[i])).join('')), { waitUntil: 'load' });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const n = (fs.readFileSync(out).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`wrote ${path.relative(repo, out)}: ${n} page(s), type ${sizes.map(s => s + ' pt').join(' / ')}`);
  if (n !== pages.length) throw new Error(`expected ${pages.length} page(s), got ${n}`);
} finally {
  await browser.close();
}
