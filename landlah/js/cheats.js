/* Land Lah! — cheat sheets: "My Mistakes" (built from the notebook), the Exam Pack, and one-pagers per lot.
   build() returns an HTML fragment for the in-app preview and a complete A4 document for printing or saving. */
(function (root) {
  'use strict';
  var LL = root.LL, U = LL.util, esc = U.esc;
  var C = LL.cheats = {};

  function clip(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; }
  function lotName(n) { var c = LL.getChapter(n); return c ? c.code + ' · ' + c.title : 'Lot ' + n; }
  function b(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }

  /* Lots that need a one-pager: best graded test below 65%, or several open mistakes. */
  C.weakLots = function (save) {
    var out = [];
    LL.chapters.forEach(function (c) {
      var st = save.ch[c.n], open = 0;
      Object.keys(save.mistakes).forEach(function (id) { var q = LL.findQuestion(id); if (q && q.ch === c.n && !save.mistakes[id].fixed) open++; });
      Object.keys(save.casePts || {}).forEach(function (id) { var p = save.casePts[id]; if (p.ch === c.n && !p.fixed) open++; });
      if ((st && st.best && st.best.pct < 65) || open >= 3) out.push(c.n);
    });
    return out;
  };

  C.counts = function (save) {
    var q = Object.keys(save.mistakes).filter(function (id) { return LL.findQuestion(id); }).length;
    var p = Object.keys(save.casePts || {}).length, k = LL.concepts.counts(save);
    return { q: q, p: p, total: q + p, concepts: k.total, open: k.open, mastered: k.mastered };
  };

  function mistakesHTML(save, includeFixed, ai) {
    return LL.concepts.sectionHTML(save, { mastered: includeFixed, ai: ai });
  }

  function packHTML() {
    var R = LL.ref, h = '<section class="cs-sec cs-pack"><h2>Exam pack</h2>';
    h += '<p class="cs-meta">' + esc(R.exam.when) + ' · ' + esc(R.exam.where) + '</p><ul class="cs-list">' + R.exam.format.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>';
    h += '<h3>Timing (2 hours)</h3><table class="cs-t"><tbody>' + R.timing.map(function (t) { return '<tr><th>' + esc(t[0]) + '</th><td>' + esc(t[1]) + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<h3>ILAC</h3><table class="cs-t"><tbody>' + R.ilac.map(function (t) { return '<tr><th>' + esc(t[0]) + '</th><td>' + esc(t[1]) + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<h3>Sentence frames</h3><ul class="cs-list">' + R.frames.map(function (f) { return '<li><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</li>'; }).join('') + '</ul>';
    h += '<h3>Rules for the hall</h3><ul class="cs-list">' + R.hallRules.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>';
    h += '<h3>MCQ attack</h3><ol class="cs-list">' + R.mcqAttack.map(function (f) { return '<li><b>' + esc(f[0]) + '.</b> ' + esc(f[1]) + '</li>'; }).join('') + '</ol>';
    h += '<h3>Issue spotter</h3><table class="cs-t"><tbody>' + R.spotter.map(function (s) { var c = LL.getChapter(s[1]); return '<tr><td>' + esc(s[0]) + '</td><th>' + esc(c.code + ' ' + c.short) + '</th></tr>'; }).join('') + '</tbody></table>';
    h += '<h3>Authority bank</h3><table class="cs-t"><tbody>' + R.authorityBank.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<h3>Numbers</h3><table class="cs-t"><tbody>' + R.numbers.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<h3>Answer methods</h3>';
    LL.chapters.forEach(function (c) { if (c.method) h += '<p class="cs-m"><b>' + esc(c.method.t) + ' (L' + c.n + '):</b> ' + c.method.steps.map(function (s, i) { return (i + 1) + '. ' + esc(s); }).join(' ') + '</p>'; });
    return h + '</section>';
  }

  function lotHTML(n) {
    var c = LL.getChapter(n);
    var h = '<section class="cs-sec cs-lot-sec"><h2>' + esc(c.code + ' · ' + c.title) + ' <small>' + esc(c.lec) + '</small></h2>';
    h += '<p class="cs-idea"><b>One idea:</b> ' + esc(c.idea) + '</p>';
    h += '<h3>Rules</h3><dl class="cs-dl">' + c.rules.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>';
    h += '<h3>Cases</h3><ul class="cs-list cs-cases">' + c.cases.map(function (r) { return '<li><b>' + esc(r[0]) + '</b>: ' + esc(r[3]) + ' <span class="cs-why">' + esc(clip(r[2], 150)) + '</span></li>'; }).join('') + '</ul>';
    if (c.secs.length) h += '<h3>Sections</h3><ul class="cs-list">' + c.secs.map(function (r) { return '<li><b>' + esc(r[0]) + '</b>: ' + esc(r[1]) + '</li>'; }).join('') + '</ul>';
    if (c.nums.length) h += '<h3>Numbers</h3><ul class="cs-list">' + c.nums.map(function (r) { return '<li><b>' + esc(r[0]) + ':</b> ' + esc(r[1]) + '</li>'; }).join('') + '</ul>';
    h += '<h3>Traps</h3><ul class="cs-list">' + c.traps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
    return h + '</section>';
  }

  function scoresHTML(save) {
    if (!LL.chapters.some(function (c) { return save.ch[c.n] && save.ch[c.n].best; })) return '';
    var rows = LL.chapters.map(function (c) { var s = save.ch[c.n]; return '<td>' + (s && s.best ? s.best.letter + ' ' + Math.round(s.best.pct) + '%' : '–') + '</td>'; }).join('');
    return '<table class="cs-t cs-scores"><thead><tr>' + LL.chapters.map(function (c) { return '<th>L' + c.n + '</th>'; }).join('') + '</tr></thead><tbody><tr>' + rows + '</tr></tbody></table>';
  }

  C.CSS = [
    '.cs-doc{font-family:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",sans-serif;color:#0b1d2a;background:#fff;font-size:12.5px;line-height:1.38}',
    '.cs-doc h1{font-size:17px;margin:0 0 2px}.cs-doc h2{font-size:14px;margin:12px 0 4px;padding:3px 6px;background:#0b3550;color:#fff;break-after:avoid}',
    '.cs-doc h2 small{font-weight:400;opacity:.8}.cs-doc h3{font-size:12.5px;margin:8px 0 3px;color:#0e4a6b;border-bottom:1px solid #b9d6e4;break-after:avoid}',
    '.cs-doc p{margin:2px 0 5px}.cs-meta{color:#3c5a6c}.cs-list{margin:0 0 4px;padding-left:16px}.cs-list li{margin:0 0 3px;break-inside:avoid}',
    '.cs-traps{margin:0 0 4px;padding-left:18px}.cs-traps li{margin:0 0 3px;break-inside:avoid}',
    '.cs-lot{display:inline-block;font-size:10px;font-weight:700;background:#ffd23f;color:#0b1d2a;padding:0 4px;border-radius:2px}',
    '.cs-n{color:#b3261e;font-weight:700}.cs-topic{font-weight:700;color:#0e4a6b}.cs-why{color:#43606f}.cs-pt .cs-topic{color:#b3261e}',
    '.cs-t{border-collapse:collapse;width:100%;margin:0 0 6px;font-size:11.5px}.cs-t th,.cs-t td{border:1px solid #c8dde8;padding:2px 5px;text-align:left;vertical-align:top}',
    '.cs-t th{background:#eef6fa;font-weight:700;width:32%}.cs-scores th,.cs-scores td{text-align:center;width:auto}',
    '.cs-dl{margin:0}.cs-dl dt{font-weight:700;color:#0e4a6b}.cs-dl dd{margin:0 0 4px 10px}.cs-idea{background:#fff6d6;padding:3px 6px}',
    '.cs-m{break-inside:avoid}.cs-empty{color:#43606f;font-style:italic}.cs-foot{color:#43606f;font-size:10.5px;margin-top:8px}',
    '.cs-card{break-inside:avoid;border:1px solid #c8dde8;border-left:4px solid #b3261e;padding:4px 7px;margin:0 0 6px;background:#fff}',
    '.cs-card.mastered{border-left-color:#2f9e5e;background:#f6fbf8}.cs-card-h{display:flex;flex-wrap:wrap;gap:3px 6px;align-items:baseline;margin-bottom:2px}',
    '.cs-cname{color:#0b3550}.cs-kind{font-size:10px;color:#6a55d6;text-transform:uppercase;letter-spacing:.04em}.cs-meta2{margin-left:auto;font-size:10.5px;color:#b3261e;font-weight:700}',
    '.cs-card.mastered .cs-meta2{color:#2f9e5e}.cs-card ul{margin:1px 0 3px;padding-left:15px}.cs-card li{margin:0 0 2px}.cs-card li.fx{color:#5d7480}',
    '.cs-rule{background:#fff6d6;padding:2px 5px;margin:2px 0}.cs-rule ul{margin:0}.cs-notes{background:#eef6fa;padding:2px 5px;margin:2px 0}',
    '.cs-cite{margin:2px 0 0;font-size:11.5px}.cs-line{margin:0;color:#2b4a5a}.cs-ai{border:1px dashed #6a55d6;padding:4px 8px;margin:0 0 8px;background:#f7f5ff;break-inside:avoid}',
    '.cs-ai h5{margin:6px 0 2px;font-size:12px;color:#0b3550}.cs-ai ul{margin:0 0 3px;padding-left:15px}.cs-ai p{margin:2px 0}',
    '@media print{@page{size:A4;margin:9mm}.cs-doc{font-size:10px}.cs-cols{column-count:2;column-gap:7mm}.cs-doc h2{font-size:11.5px}.cs-doc h3{font-size:10.5px}.cs-t{font-size:9.5px}.cs-doc{-webkit-print-color-adjust:exact;print-color-adjust:exact}}'
  ].join('\n');

  /* opts: {mistakes, fixed, pack, lots:[n]} */
  C.build = function (save, opts, who) {
    var parts = [];
    if (opts.mistakes) parts.push(mistakesHTML(save, opts.fixed !== false, opts.ai !== false));
    if (opts.pack) parts.push(packHTML());
    (opts.lots || []).slice().sort(function (a, c) { return a - c; }).forEach(function (n) { parts.push(lotHTML(n)); });
    var date = new Date().toLocaleString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    var head = '<header class="cs-head"><h1>RE2702 Land Law · my cheat sheet</h1><p class="cs-meta">' + (who ? esc(who) + ' · ' : '') + 'built ' + esc(date) + ' from Land Lah! · Exam: ' + esc(LL.ref.exam.when) + ', ' + esc(LL.ref.exam.where) + '</p>' + scoresHTML(save) + '</header>';
    var inner = '<div class="cs-doc">' + head + '<div class="cs-cols">' + (parts.join('') || '<p class="cs-empty">Choose at least one section.</p>') + '</div><p class="cs-foot">Unofficial revision aid built from your course notes. Points marked [check] need confirming against your lecture slides. Lecture material wins every conflict.</p></div>';
    var doc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RE2702 cheat sheet</title><style>body{margin:0;padding:14px;background:#fff}' + C.CSS + '</style></head><body>' + inner + '</body></html>';
    return { inner: inner, doc: doc };
  };

  /* Plain text version (for copying into notes). */
  C.text = function (inner) {
    var d = root.document.createElement('div');
    d.innerHTML = inner;
    return (d.innerText || d.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  };
})(typeof window !== 'undefined' ? window : globalThis);
