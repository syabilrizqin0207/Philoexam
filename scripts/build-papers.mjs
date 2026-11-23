// Build the two RE2702 revision papers as A4 PDFs (each capped at 30 pages).
//   node scripts/build-papers.mjs                    -> dist/RE2702-where-i-fell-short.pdf, dist/RE2702-section-b-guide.pdf
//   node scripts/build-papers.mjs --record save.json -> first refresh papers/record.json from a Land Lah! save
//                                                       (the {save} document the app syncs, or a bare save object)
// Paper 1 is built from papers/record.json (your mistakes and scores), the app's case guide data and the analysis in
// papers/fell-short.mjs. Paper 2 is written in papers/section-b.mjs.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(repo, 'landlah');
const MAX_PAGES = 30;

/* ---------- load the app's content (chapters, cases, sections, questions) ---------- */
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const ctx = { console, document: { createElement: () => ({}) } };
ctx.window = ctx;
vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"><\/script>/g)) {
  if (/ui\.js$|voice\.js$/.test(m[1])) continue;
  vm.runInContext(fs.readFileSync(path.join(app, m[1]), 'utf8'), ctx, { filename: m[1] });
}
const LL = ctx.LL;

/* ---------- the study record ---------- */
const recordPath = path.join(repo, 'papers', 'record.json');
const ri = process.argv.indexOf('--record');
if (ri > 0) {
  let save = JSON.parse(fs.readFileSync(process.argv[ri + 1], 'utf8'));
  if (save.save) save = typeof save.save === 'string' ? JSON.parse(save.save) : save.save;
  const snap = {
    asOf: new Date(save.updated || Date.now()).toISOString().slice(0, 10),
    lots: Object.fromEntries(Object.entries(save.ch || {}).map(([n, c]) => [n, {
      best: c.best ? c.best.pct : null, attempts: c.attempts || 0, history: (c.history || []).map(h => h.pct),
      trained: c.trained ?? null, check: c.check ?? null, vq: c.vq || null, watched: !!c.watched, lightning: c.lightning || 0
    }])),
    mocks: Object.fromEntries(Object.entries(save.mocks || {}).map(([k, m]) => [k, (m.history || []).map(h => ({ a: h.a, aMax: h.aMax, b: h.b, bMax: h.bMax, pct: h.pct, kind: h.kind }))])),
    cases: Object.fromEntries(Object.entries(save.cases || {}).map(([k, c]) => [k, (c.history || []).map(h => ({ earned: h.earned, max: h.max, src: h.src }))])),
    mistakes: Object.fromEntries(Object.entries(save.mistakes || {}).map(([id, m]) => [id, { n: m.n || 1, fixed: !!m.fixed, miss: m.miss || [] }])),
    lightning: Object.fromEntries(Object.entries(save.ltMiss || {}).map(([k, x]) => [k, { ch: x.ch, i: x.i, n: x.n || 1, fixed: !!x.fixed }]))
  };
  fs.mkdirSync(path.dirname(recordPath), { recursive: true });
  fs.writeFileSync(recordPath, JSON.stringify(snap, null, 1));
  console.log('wrote papers/record.json from', process.argv[ri + 1]);
}
const record = JSON.parse(fs.readFileSync(recordPath, 'utf8'));
const FS = (await import(pathToFileURL(path.join(repo, 'papers', 'fell-short.mjs')))).default;
const SB = (await import(pathToFileURL(path.join(repo, 'papers', 'section-b.mjs')))).default;
const QUOTES = (await import(pathToFileURL(path.join(repo, 'papers', 'quotes.mjs')))).default;
const MA = (await import(pathToFileURL(path.join(repo, 'papers', 'mock-answers.mjs')))).default;
const MS = (await import(pathToFileURL(path.join(repo, 'papers', 'mock-answers-short.mjs')))).default;

/* ---------- tiny markup: **bold**, *italic*, [check] ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<i>$2</i>')
  .replace(/\[check([^\]]*)\]/g, '<span class="chk">[check$1]</span>');
const para = s => (Array.isArray(s) ? s : [s]).map(p => `<p>${md(p)}</p>`).join('');
const list = (a, tag = 'ul') => `<${tag}>${a.map(x => `<li>${md(x)}</li>`).join('')}</${tag}>`;
const roman = i => ['i', 'ii', 'iii', 'iv'][i];

const CSS = `
@page { size: A4; margin: 13mm 12mm 14mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.1pt/1.38 'Bitstream Charter', 'Caladea', 'DejaVu Serif', serif; color: #14202b; }
h1, h2, h3, h4, .lab, .tag, th, .chip { font-family: 'Inter', 'Liberation Sans', sans-serif; }
h1 { font-size: 21pt; line-height: 1.12; margin: 0 0 4px; letter-spacing: -0.01em; }
h2 { font-size: 13.5pt; margin: 0 0 6px; padding: 5px 8px; background: #0e4a6b; color: #fff; break-after: avoid; }
h3 { font-size: 10.6pt; margin: 10px 0 4px; color: #0e4a6b; border-bottom: 1.2px solid #9fc6da; padding-bottom: 2px; break-after: avoid; }
h4 { font-size: 9.4pt; margin: 8px 0 3px; color: #7a2e12; break-after: avoid; }
p { margin: 0 0 5px; }
ul, ol { margin: 0 0 6px; padding-left: 15px; }
li { margin: 0 0 2px; }
b { font-weight: 700; }
.chk { color: #b3261e; font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 600; }
.cover { border: 2px solid #0e4a6b; padding: 12px 14px; margin-bottom: 10px; }
.cover .sub { font-family: 'Inter', sans-serif; font-size: 10pt; color: #33586b; margin-bottom: 6px; }
.cover .meta { font-family: 'Inter', sans-serif; font-size: 8pt; color: #4d6472; }
.cols { column-count: 2; column-gap: 6mm; column-rule: 0.5px solid #c9dbe4; column-fill: auto; orphans: 2; widows: 2; }
.cols h2 { font-size: 11.2pt; margin: 10px 0 6px; padding: 4px 7px; }
.cols h2:first-child { margin-top: 0; }
h2, h3, h4, .lab { break-after: avoid; }
tr, li, .sec { break-inside: avoid; }
.box { border: 1px solid #9fc6da; background: #f3f8fb; padding: 6px 8px; margin: 0 0 7px; }
.box.warn { border-color: #e0a21a; background: #fff8e6; }
.box.bad { border-color: #d9a3a3; background: #fdf3f3; }
.lab { display: inline-block; font-size: 7.2pt; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; background: #0e4a6b; padding: 1px 5px; margin-right: 4px; }
.lab.red { background: #b3261e; } .lab.amb { background: #a86b00; } .lab.grn { background: #2f7d4f; }
table { border-collapse: collapse; width: 100%; margin: 0 0 8px; font-size: 8.3pt; }
th { font-size: 7.6pt; text-align: left; background: #e3eff4; padding: 3px 4px; border: 0.6px solid #b9d2df; }
td { padding: 3px 4px; border: 0.6px solid #c9dbe4; vertical-align: top; }
.miss { border-left: 3px solid #b3261e; padding: 3px 0 3px 7px; margin: 0 0 6px; }
.miss.fixed { border-left-color: #2f7d4f; }
.miss .q { font-style: italic; color: #33414b; }
.miss .a { margin-top: 2px; }
.case { margin: 0 0 6px; padding: 0 0 5px; border-bottom: 0.6px dotted #b9cfdb; break-inside: avoid; }
.case .nm { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 8.8pt; color: #0b3a55; }
.case .ql { margin-top: 2px; padding: 3px 6px; background: #fff8e6; border-left: 2.5px solid #e0a21a; }
.case .ql::before { content: "Quote it: "; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 7.4pt; color: #a86b00; text-transform: uppercase; letter-spacing: 0.04em; }
.sec { margin: 0 0 4px; }
.sec b { font-family: 'Inter', sans-serif; font-size: 8.3pt; }
.tt { font-size: 11pt; margin: 12px 0 5px; padding: 4px 0 3px; border-bottom: 2px solid #0e4a6b; }
.sq { background: #fff8e6; border-left: 3px solid #e0a21a; padding: 5px 8px; margin: 4px 0 7px; font-style: italic; }
.sq .lab { font-style: normal; }
.ans { border-left: 3px solid #2f7d4f; background: #f4faf6; padding: 5px 8px; margin: 0 0 7px; }
.ans .blk { margin: 0 0 6px; padding-bottom: 5px; border-bottom: 0.6px dashed #b8d8c4; }
.ans .blk:last-of-type { border-bottom: 0; }
.ans .il { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 8.6pt; color: #1f5c38; margin: 0 0 3px; }
.ans .k { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 7.6pt; letter-spacing: 0.05em; text-transform: uppercase; color: #0e4a6b; margin-right: 3px; }
.ans .adv { background: #e6f2ea; padding: 4px 6px; margin-top: 4px; }
.law { background: #f3f8fb; border-left: 3px solid #0e4a6b; padding: 5px 8px; margin: 0 0 7px; }
.law .lab, .app .lab { margin-bottom: 2px; }
.app { border-left: 3px solid #2f7d4f; padding: 4px 8px; margin: 0 0 7px; background: #f4faf6; }
.essay { margin: 0 0 9px; padding-bottom: 6px; border-bottom: 1px solid #c9dbe4; }
.small { font-size: 8pt; color: #4d6472; }
.chip { display: inline-block; font-size: 7pt; font-weight: 600; border: 0.7px solid #9fc6da; padding: 0 4px; margin-right: 3px; color: #33586b; }
`;

function doc(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

/* =====================================================================================
   PAPER 1: where I fell short
   ===================================================================================== */
const qById = {};
LL.chapters.forEach(ch => ch.qs.forEach(q => { qById[q.id] = { ...q, ch: ch.n }; }));
const OPTL = 'ABCD';
function mistakeHTML(id, m) {
  const q = qById[id];
  if (!q) return '';
  let body;
  if (q.t === 'set') {
    const st = q.st || q.s || q.items || [];
    const mis = (m.miss || []);
    const rows = st.map((s, i) => `<li${mis.includes(i) ? ' style="color:#b3261e"' : ''}>(${roman(i)}) <b>${s[1] ? 'TRUE' : 'FALSE'}</b>: ${md(s[0])}${s[2] ? ` <span class="small">${md(s[2])}</span>` : ''}${mis.includes(i) ? ' <span class="lab red">you misjudged</span>' : ''}</li>`).join('');
    body = `<div class="q">${md(q.q)}</div><ul style="list-style:none;padding-left:4px;margin:2px 0">${rows}</ul>`;
  } else {
    const right = q.o && q.o[q.a];
    body = `<div class="q">${md(q.q)}</div><div class="a"><b>Answer:</b> ${md(right || '')}</div>${q.why ? `<div><b>Why:</b> ${md(q.why)}</div>` : ''}`;
  }
  const src = /Practice paper/.test(q.src || '') ? `<span class="lab amb">${esc(q.src)}</span>` : '';
  return `<div class="miss${m.fixed ? ' fixed' : ''}"><span class="lab ${m.fixed ? 'grn' : 'red'}">${m.fixed ? 'fixed since' : 'still open'} · missed ×${m.n}</span>${src}<span class="chip">${esc(q.topic || '')}</span>${body}</div>`;
}

function lotStats(n) {
  const L = record.lots[n] || {};
  const ms = Object.entries(record.mistakes).filter(([id]) => qById[id] && qById[id].ch === +n);
  const lt = Object.values(record.lightning).filter(x => x.ch === +n);
  return { L, ms, lt, open: ms.filter(([, m]) => !m.fixed).length };
}

function paper1() {
  const lots = LL.chapters;
  const totalMs = Object.keys(record.mistakes).length;
  const openMs = Object.values(record.mistakes).filter(m => !m.fixed).length;
  const ltN = Object.keys(record.lightning).length;
  const vq = Object.values(record.lots).reduce((a, l) => l.vq ? [a[0] + l.vq.right, a[1] + l.vq.total] : a, [0, 0]);
  const mock = (record.mocks.m1 || [])[0];
  // combination questions: which statement was misjudged
  const setMs = Object.entries(record.mistakes).filter(([id]) => qById[id] && qById[id].t === 'set');
  const ivCount = setMs.filter(([, m]) => (m.miss || []).includes(3)).length;

  let h = `<div class="cover"><h1>${md(FS.title)}</h1><div class="sub">${md(FS.subtitle)}</div>
    <div class="meta">Built from your Land Lah! record as of ${esc(record.asOf)} · ${totalMs} MCQs missed (${openMs} still open) · ${ltN} quick-fire facts missed · Mock Paper 1 Section A ${mock ? mock.pct + '% (' + mock.a + '/' + mock.aMax + ')' : 'not sat'} · video quick checks ${vq[0]}/${vq[1]}</div></div>`;

  /* Part A: diagnosis */
  h += `<div class="cols"><h2>Part A. The honest diagnosis</h2>`;
  h += para(FS.intro);
  h += `<table><tr><th>Lot</th><th>Graded test (best; history)</th><th>Checkpoint</th><th>Training</th><th>MCQs missed (open)</th><th>Quick facts missed</th></tr>` +
    lots.map(ch => { const s = lotStats(ch.n); const L = s.L;
      return `<tr><td><b>${ch.n}</b> ${esc(ch.short)}</td><td>${L.best != null ? L.best + '%' : '–'}${L.history && L.history.length > 1 ? ' (' + L.history.join(' → ') + ')' : ''}</td><td>${L.check != null ? L.check + '%' : '–'}</td><td>${L.trained != null ? L.trained + '%' : '–'}</td><td>${s.ms.length} (${s.open})</td><td>${s.lt.length}</td></tr>`; }).join('') + `</table>`;
  FS.patterns.forEach(p => { h += `<div class="box ${p.tone || ''}"><h4 style="margin-top:0">${md(p.head)}</h4>${para([].concat(p.body).map(x => x.replace('{IV}', ivCount).replace('{SETS}', setMs.length)))}</div>`; });
  h += `<h3>What you already do well</h3>${list(FS.strengths)}`;
  h += `<h3>How to use this essay</h3>${list(FS.howToUse)}`;

  /* Part B: lot by lot */
  lots.forEach(ch => {
    const L = FS.lots[ch.n];
    const s = lotStats(ch.n);
    h += `<h2>Lot ${ch.n}. ${esc(ch.title)} <span style="font-weight:400;font-size:8.5pt">(${esc(ch.lec)})</span></h2>`;
    h += `<h3>Where you fell short</h3>${para(L.diag)}`;
    const ms = s.ms.sort((a, b) => (a[1].fixed - b[1].fixed) || (b[1].n - a[1].n));
    h += ms.map(([id, m]) => mistakeHTML(id, m)).join('');
    if (s.lt.length) {
      h += `<h4>Quick-fire facts you got wrong</h4><ul>` + s.lt.map(x => { const it = ch.quick[x.i]; return it ? `<li><b>${it[1] ? 'TRUE' : 'FALSE'}</b>: ${md(it[0])} <span class="small">${md(it[2])}</span>${x.fixed ? ' <span class="lab grn">fixed</span>' : ''}</li>` : ''; }).join('') + `</ul>`;
    }
    h += `<h3>Key learning points</h3>`;
    L.learn.forEach(pt => { h += `<h4>${md(pt[0])}</h4>${para(pt[1])}`; });
    h += `<h3>Every case in this lot, and how to quote it</h3>`;
    ch.cases.forEach(c => {
      const q = Object.entries(QUOTES[ch.n]).find(([k]) => c[0].startsWith(k));
      if (!q) throw new Error(`No quote line for "${c[0]}" (Lot ${ch.n})`);
      h += `<div class="case"><span class="nm">${md(c[0])}</span><div><b>Facts.</b> ${md(c[1])} <b>Held.</b> ${md(c[2])} <b>Cite it for:</b> ${md(c[3])}</div><div class="ql">${md(q[1])}</div></div>`;
    });
    h += `<h3>Sections to cite</h3>` + ch.secs.map(sc => `<div class="sec"><b>${md(sc[0])}</b>: ${md(sc[1])}. <span class="small">${md(sc[2])}</span></div>`).join('');
  });

  /* Part C */
  h += `<h2>Part C. Your personal exam-day rules</h2>`;
  h += `<h3>Ten rules written from your mistakes</h3>${list(FS.rules, 'ol')}`;
  h += `<h3>The numbers that cost you marks</h3><table><tr><th>Point</th><th>Figure</th></tr>${FS.numbers.map(r => `<tr><td>${md(r[0])}</td><td>${md(r[1])}</td></tr>`).join('')}</table>`;
  h += `<h3>Last word</h3>${para(FS.closing)}</div>`;
  return doc('RE2702 Where I Fell Short', h);
}

/* =====================================================================================
   PAPER 2: Section B topics and how to answer them
   ===================================================================================== */
function paper2() {
  const tbl = rows => `<table><tr>${rows[0].map(c => `<th>${md(c)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(c => `<td>${md(String(c))}</td>`).join('')}</tr>`).join('')}</table>`;
  let h = `<div class="cover"><h1>${md(SB.title)}</h1><div class="sub">${md(SB.subtitle)}</div><div class="meta">${md(SB.meta)}</div></div><div class="cols">`;
  h += `<h2>Part A. How Section B works and how to write it</h2>`;
  SB.method.forEach(b => { h += `<h3>${md(b.head)}</h3>` + (b.paras ? para(b.paras) : '') + (b.list ? list(b.list, b.ordered ? 'ol' : 'ul') : '') + (b.table ? tbl(b.table) : ''); });
  h += `<h2>Part B. Every topic, with a model answer in ILAC</h2>`;
  SB.topics.forEach((t, n) => {
    h += `<h3 class="tt">${n + 1}. ${md(t.title)} <span class="chip">${esc(t.lots)}</span>${t.weight ? `<span class="chip">${esc(t.weight)}</span>` : ''}</h3>`;
    h += `<h4>How it is asked</h4>${list(t.signals)}<h4>Issues to raise, in this order</h4>${list(t.issues, 'ol')}`;
    h += `<div class="sq"><span class="lab amb">Sample question${t.marks ? ' · ' + esc(t.marks) : ''}</span><p>${md(t.q)}</p></div>`;
    h += `<div class="ans"><span class="lab grn">Model answer (ILAC)</span>` + t.answer.map((b, k) =>
      `<div class="blk"><p class="il">Issue ${t.answer.length > 1 ? (k + 1) + ': ' : ''}${md(b.i)}</p>` +
      b.l.map((x, z) => `<p>${z ? '' : '<span class="k">Law</span>'}${md(x)}</p>`).join('') +
      b.a.map((x, z) => `<p>${z ? '' : '<span class="k">Application</span>'}${md(x)}</p>`).join('') +
      `<p><span class="k">Conclusion</span>${md(b.c)}</p></div>`).join('') +
      (t.advice ? `<p class="adv"><span class="k">Advice</span>${md(t.advice)}</p>` : '') + `</div>`;
    h += `<h4>Where marks are lost</h4>${list(t.traps)}`;
    if (t.vary) h += `<h4>If the facts change</h4>${tbl([['Change', 'Effect']].concat(t.vary))}`;
  });
  h += `<h2>Part C. Narrative essay questions</h2>${para(SB.essayIntro)}`;
  SB.essays.forEach(e => { h += `<div class="essay"><h4 style="margin-top:0">${md(e.q)}</h4><p><b>Introduction.</b> ${md(e.intro)}</p><ol>${e.points.map(p => `<li>${md(p)}</li>`).join('')}</ol><p><b>Conclusion.</b> ${md(e.end)}</p></div>`; });
  h += `<h2>Part D. Putting topics together: the combined case study</h2>${para(SB.comboIntro)}`;
  SB.combos.forEach(c => { h += `<h3>${md(c.head)}</h3>${para(c.facts)}${tbl([['Part', 'Model answers in topic no.', 'Marks', 'Minutes']].concat(c.plan))}${c.notes ? list(c.notes) : ''}`; });
  h += `<h3>Final checklist before you submit</h3>${list(SB.checklist, 'ol')}</div>`;
  return doc('RE2702 Section B Guide', h);
}

/* =====================================================================================
   PAPER 3: Section B answer sheet for the six mock papers
   ===================================================================================== */
function ansBlocks(blocks) {
  return blocks.map((b0, k) => {
    const b = b0.ref ? SB.topics[b0.ref[0]].answer[b0.ref[1]] : b0;
    if (!b) throw new Error('bad answer ref ' + JSON.stringify(b0.ref));
    return `<div class="blk"><p class="il">Issue ${blocks.length > 1 ? (k + 1) + ': ' : ''}${md(b.i)}</p>` +
      b.l.map((x, z) => `<p>${z ? '' : '<span class="k">Law</span>'}${md(x)}</p>`).join('') +
      b.a.map((x, z) => `<p>${z ? '' : '<span class="k">Application</span>'}${md(x)}</p>`).join('') +
      `<p><span class="k">Conclusion</span>${md(b.c)}</p></div>`;
  }).join('');
}
function factsHTML(f) {
  const out = []; let ul = [];
  const flush = () => { if (ul.length) { out.push(`<ul>${ul.map(x => `<li>${md(x)}</li>`).join('')}</ul>`); ul = []; } };
  (Array.isArray(f) ? f.join('\n') : f).split('\n').forEach(line => {
    const t = line.trim();
    if (!t) { flush(); return; }
    if (/^[-*•]\s+/.test(t)) ul.push(t.replace(/^[-*•]\s+/, '')); else { flush(); out.push(`<p>${md(t)}</p>`); }
  });
  flush();
  return out.join('');
}
function paper3() {
  let h = `<div class="cover"><h1>${md(MA.title)}</h1><div class="sub">${md(MA.subtitle)}</div><div class="meta">${md(MA.meta)}</div></div><div class="cols">${para(MA.intro)}`;
  LL.ref.mocks.forEach((m, n) => {
    const c = LL.cases.find(x => x.id === m.caseId), A = MA.mocks[m.id];
    if (!c || !A) throw new Error('missing mock ' + m.id);
    if (A.parts.length !== c.parts.length) throw new Error(`${m.id}: ${A.parts.length} answer parts for ${c.parts.length} question parts`);
    h += `<h2>${esc(m.title)}: ${esc(c.title)}</h2><p class="small"><span class="chip">${esc(c.src)}</span><span class="chip">${c.marks} marks</span>${c.chs ? `<span class="chip">Lots ${c.chs.join(', ')}</span>` : ''}</p>`;
    h += `<div class="sq"><span class="lab amb">The question</span>${factsHTML(c.facts)}${c.parts.map(pt => `<p><b>${md(pt.ask)}</b></p>`).join('')}</div>`;
    let mt = `<table><tr><th>What earns the marks</th><th style="text-align:center">Marks</th></tr>`;
    c.parts.forEach(pt => pt.issues.forEach(is => {
      const sum = is.points.reduce((t, x) => t + x.m, 0);
      mt += `<tr><td style="background:#e3eff4;font-family:Inter,sans-serif;font-weight:700;font-size:7.8pt">${pt.label ? esc(pt.label) + ' ' : ''}${md(is.name)}</td><td style="background:#e3eff4;text-align:center;font-weight:700">${sum}</td></tr>`;
      is.points.forEach(x => { mt += `<tr><td>${md(x.t)}</td><td style="text-align:center">${x.m}</td></tr>`; });
    }));
    h += `<h4>Where the ${c.marks} marks are</h4>${mt}</table>`;
    c.parts.forEach((pt, k) => {
      h += `<div class="ans"><span class="lab grn">Model answer (ILAC)${c.parts.length > 1 ? ' · part ' + esc(pt.label) + ' · ' + pt.marks + ' marks' : ''}</span>${c.parts.length > 1 ? `<p class="small"><i>${md(pt.ask)}</i></p>` : ''}${ansBlocks(A.parts[k].blocks)}</div>`;
    });
    h += `<h4>Conclusion for each party</h4><ul>${A.parties.map(p => `<li><b>${md(p[0])}.</b> ${md(p[1])}</li>`).join('')}</ul>`;
    const tricks = [].concat(...c.parts.map(pt => pt.tricks || []));
    if (tricks.length) h += `<h4>Exam tricks for this paper</h4>${list(tricks)}`;
  });
  h += `</div>`;
  return doc('RE2702 Section B Mock Answers', h);
}

/* =====================================================================================
   PAPER 3 (short): the six mock answers on exactly four A4 pages
   ===================================================================================== */
const SHORT_PAGES = 4;
function paper3short(size) {
  const css = `
@page { size: A4; margin: 8mm 8mm 10mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: ${size}pt/1.27 'Bitstream Charter', 'Caladea', serif; color: #14202b; }
.top { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; border-bottom: 2px solid #0e4a6b; padding-bottom: 1.5mm; margin-bottom: 2mm; font-family: Inter, sans-serif; }
.top h1 { margin: 0; font-size: 13pt; color: #0e4a6b; }
.top span { font-size: 7pt; color: #4d6472; text-align: right; }
.cols { column-count: 3; column-gap: 4mm; column-rule: 0.5px solid #c9dbe4; column-fill: auto; orphans: 2; widows: 2; }
h2 { font: 700 ${size + 1.6}pt/1.2 Inter, sans-serif; color: #fff; background: #0e4a6b; padding: 2pt 4pt; margin: ${size * 0.6}pt 0 ${size * 0.3}pt; break-after: avoid; }
h2:first-child { margin-top: 0; }
.facts { font-style: italic; color: #33414b; margin: 0 0 ${size * 0.35}pt; padding: 1.5pt 4pt; background: #fff8e6; border-left: 2px solid #e0a21a; }
.iss { margin: 0 0 ${size * 0.4}pt; padding-bottom: ${size * 0.25}pt; border-bottom: 0.5px dashed #b8d8c4; }
.iq { font: 700 ${size + 0.2}pt/1.22 Inter, sans-serif; color: #1f5c38; margin: 0 0 1pt; break-after: avoid; }
.iq .m { font-weight: 600; color: #a86b00; margin-left: 2pt; }
p { margin: 0 0 1.2pt; }
.k { font: 700 ${Math.max(5.5, size - 1.3)}pt Inter, sans-serif; letter-spacing: 0.04em; text-transform: uppercase; color: #0e4a6b; margin-right: 2pt; }
.adv { background: #e6f2ea; padding: 2pt 4pt; margin: 0 0 ${size * 0.4}pt; }
b { font-weight: 700; color: #0b3a55; }
.chk { color: #b3261e; font: 600 ${Math.max(5.5, size - 1.4)}pt Inter, sans-serif; }`;
  let h = `<div class="top"><h1>${md(MS.title)}</h1><span>${md(MS.note)}</span></div><div class="cols">`;
  LL.ref.mocks.forEach(m => {
    const c = LL.cases.find(x => x.id === m.caseId), S = MS.mocks[m.id];
    const issues = [].concat(...c.parts.map(pt => pt.issues.map(is => ({ part: pt.label, marks: is.points.reduce((t, x) => t + x.m, 0) }))));
    if (!S || S.blocks.length !== issues.length) throw new Error(`${m.id}: ${S ? S.blocks.length : 0} short answers for ${issues.length} scheme issues`);
    h += `<h2>${esc(m.title.replace('Mock Paper', 'Mock'))} · ${esc(c.title)} (40)</h2><p class="facts">${md(S.facts)}</p>`;
    S.blocks.forEach((b, k) => {
      h += `<div class="iss"><p class="iq">${md(b[0])}<span class="m">[${issues[k].marks}]</span></p><p><span class="k">Law</span>${md(b[1])}</p><p><span class="k">Application</span>${md(b[2])}</p><p><span class="k">Conclusion</span>${md(b[3])}</p></div>`;
    });
    h += `<p class="adv"><span class="k">Advice</span>${md(S.advice)}</p>`;
  });
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Section B mock answers (4 pages)</title><style>${css}</style></head><body>${h}</div></body></html>`;
}
async function pdfFit(build, file, label, target) {
  const page = await browser.newPage();
  const opts = { format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font:6.5pt Inter,sans-serif;color:#6b7f8a;padding:0 8mm;display:flex;justify-content:space-between"><span>${esc(label)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>` };
  const count = buf => (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  let lo = 5.5, hi = 13, best = null;
  for (let k = 0; k < 10; k++) {            // the largest type that still fits in the target number of pages
    const mid = (lo + hi) / 2;
    await page.setContent(build(mid), { waitUntil: 'load' });
    if (count(await page.pdf(opts)) <= target) { best = mid; lo = mid; } else hi = mid;
  }
  if (!best) throw new Error(`${file} does not fit in ${target} pages even at 5.5 pt`);
  const size = Math.floor(best * 20) / 20;
  await page.setContent(build(size), { waitUntil: 'load' });
  const out = path.join(repo, 'dist', file);
  await page.pdf({ ...opts, path: out });
  await page.close();
  const n = count(fs.readFileSync(out));
  console.log(`wrote dist/${file}: ${n} pages at ${size} pt`);
  if (n !== target) throw new Error(`${file} came out at ${n} pages, not ${target}`);
}

/* ---------- render to PDF ---------- */
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
async function pdf(htmlStr, file, label) {
  const page = await browser.newPage();
  await page.setContent(htmlStr, { waitUntil: 'load' });
  const out = path.join(repo, 'dist', file);
  await page.pdf({
    path: out, format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font:7pt Inter,sans-serif;color:#6b7f8a;padding:0 12mm;display:flex;justify-content:space-between"><span>${esc(label)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`
  });
  await page.close();
  const buf = fs.readFileSync(out).toString('latin1');
  const pages = (buf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`wrote dist/${file}: ${pages} pages`);
  if (pages > MAX_PAGES) throw new Error(`${file} is ${pages} pages, over the ${MAX_PAGES}-page limit`);
  const dbg = process.argv.indexOf('--html');
  if (dbg > 0) fs.writeFileSync(path.join(process.argv[dbg + 1], file.replace('.pdf', '.html')), htmlStr);
  return pages;
}
try {
  await pdf(paper1(), 'RE2702-where-i-fell-short.pdf', 'RE2702 Land Law · Where I fell short');
  await pdf(paper2(), 'RE2702-section-b-guide.pdf', 'RE2702 Land Law · Section B: every topic and how to answer it');
  await pdf(paper3(), 'RE2702-section-b-mock-answers.pdf', 'RE2702 Land Law · Section B answer sheet: the six mock papers');
  await pdfFit(paper3short, 'RE2702-section-b-mock-answers-4-pages.pdf', 'RE2702 Land Law · Section B: the six mock papers in four pages', SHORT_PAGES);
} finally {
  await browser.close();
}
