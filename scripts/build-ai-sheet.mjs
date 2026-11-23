// Print the one-page cheat sheet that Claude writes in Land Lah! ("My cheat sheet" → one-page summary) as a
// single A4 PDF page. The type shrinks until the whole sheet fits on one page.
//   node scripts/build-ai-sheet.mjs <save.json | sheet.md> [out.pdf]
// save.json is the app's synced "landlah" document (or a bare save); the summary is its aiSheet.text.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
const out = path.resolve(process.argv[3] || path.join(repo, 'dist', 'RE2702-my-one-page-cheat-sheet.pdf'));
if (!src) { console.error('usage: node scripts/build-ai-sheet.mjs <save.json | sheet.md> [out.pdf]'); process.exit(1); }

let text, at = null;
if (/\.json$/i.test(src)) {
  let save = JSON.parse(fs.readFileSync(src, 'utf8'));
  if (save.save) save = typeof save.save === 'string' ? JSON.parse(save.save) : save.save;
  if (!save.aiSheet || !save.aiSheet.text) throw new Error('This save has no one-page summary yet. Make one in the app: My cheat sheet → one-page summary.');
  text = save.aiSheet.text; at = save.aiSheet.at;
} else text = fs.readFileSync(src, 'utf8');

/* Points to flag before the sheet is relied on: citations that are not in the course notes. */
const FLAGS = [[/Cite \*\*s 90\*\*\./g, 'Cite **s 90**. [check: no s 90 in your notes; confirm before citing]']];
FLAGS.forEach(([re, rep]) => { text = text.replace(re, rep); });

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\[check([^\]]*)\]/g, '<span class="chk">[check$1]</span>');
let body = '', open = false;
for (const raw of text.split('\n')) {
  const line = raw.trim();
  if (!line) continue;
  const h = line.match(/^#{1,3}\s+(.*)$/);
  if (h) {
    if (open) body += '</ul></section>';
    const m = h[1].match(/^(.*?)\s*\((Lot \d+)(?:,\s*(missed [^)]*))?\)\s*$/);
    body += `<section><h2>${inline(m ? m[1] : h[1])}${m ? ` <span class="tag">${esc(m[2])}</span>${m[3] ? `<span class="tag red">${esc(m[3])}</span>` : ''}` : ''}</h2><ul>`;
    open = true;
  } else {
    if (!open) { body += '<section><ul>'; open = true; }
    body += `<li>${inline(line.replace(/^[-*•]\s+/, ''))}</li>`;
  }
}
if (open) body += '</ul></section>';
const when = at ? new Date(at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Singapore' }) : '';

const html = fs => `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: A4; margin: 7mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: ${fs}pt/1.3 'Bitstream Charter', 'Caladea', serif; color: #14202b; }
.page { width: 196mm; height: 282mm; display: flex; flex-direction: column; }
header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0e4a6b; padding-bottom: 2.5mm; margin-bottom: 2.5mm; font-family: Inter, sans-serif; }
header h1 { margin: 0; font-size: 14pt; color: #0e4a6b; letter-spacing: -0.01em; }
header span { font-size: 7.5pt; color: #4d6472; text-align: right; }
.cols { flex: 1; column-count: 3; column-gap: 4.5mm; column-rule: 0.5px solid #c9dbe4; column-fill: auto; overflow: hidden; }
section { margin: 0 0 ${fs * 0.55}pt; }
h2 { break-after: avoid; } li { break-inside: avoid; }
h2 { font: 700 ${fs + 0.9}pt/1.2 Inter, sans-serif; color: #0e4a6b; margin: 0 0 ${fs * 0.2}pt; padding-bottom: 1pt; border-bottom: 0.8px solid #9fc6da; }
.tag { display: inline-block; font: 600 ${Math.max(5.5, fs - 1.6)}pt Inter, sans-serif; color: #33586b; border: 0.6px solid #9fc6da; padding: 0 3px; margin-left: 3px; vertical-align: 1px; }
.tag.red { color: #b3261e; border-color: #e3a8a8; }
ul { margin: 0; padding-left: ${fs * 1.05}pt; }
li { margin: 0 0 ${fs * 0.18}pt; }
b { font-weight: 700; color: #0b3a55; }
.chk { color: #b3261e; font: 600 ${Math.max(5.5, fs - 1.5)}pt Inter, sans-serif; }
footer { font: 6.5pt Inter, sans-serif; color: #6b7f8a; border-top: 0.6px solid #c9dbe4; padding-top: 1.2mm; margin-top: 1.5mm; }
</style></head><body><div class="page">
<header><h1>RE2702 Land Law · My one-page cheat sheet</h1><span>Written by Claude from my Land Lah! mistakes${when ? ' · ' + esc(when) : ''}<br>Most-missed concepts first · bold = cite it · red [check] = confirm on the slides</span></header>
<div class="cols">${body}</div>
<footer>Final: Tue 24 Nov 2026, 9–11 am, Biz2 05-11 · Section A: 20 MCQs × 3 · Section B: 40-mark case study in ILAC · bold every authority · every named party gets a conclusion</footer>
</div></body></html>`;

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  let lo = 5.5, hi = 11, best = lo;
  for (let k = 0; k < 9; k++) {           // largest type size whose three columns hold everything
    const mid = (lo + hi) / 2;
    await page.setContent(html(mid), { waitUntil: 'load' });
    const fits = await page.$eval('.cols', el => el.scrollWidth <= el.clientWidth + 1);
    if (fits) { best = mid; lo = mid; } else hi = mid;
  }
  const fs_ = Math.floor(best * 10) / 10;
  await page.setContent(html(fs_), { waitUntil: 'load' });
  if (!(await page.$eval('.cols', el => el.scrollWidth <= el.clientWidth + 1))) throw new Error('The summary does not fit on one page even at 5.5 pt');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pages = (fs.readFileSync(out).toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`wrote ${path.relative(repo, out)}: ${pages} page, body type ${fs_} pt`);
  if (pages !== 1) throw new Error(`expected 1 page, got ${pages}`);
} finally {
  await browser.close();
}
