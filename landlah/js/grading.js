/* Land Lah! — marking.
   Section A: every MCQ (single answer or roman-numeral combination) is worth 3 marks, all or nothing, no penalty.
   Section B: a keyword marker checks each marking point of the scheme; the student (or Claude, where available)
   can then adjust each point against the model answer. Letter grades use fixed NUS-style bands for feedback only. */
(function (root) {
  'use strict';
  var LL = root.LL, U = LL.util;
  var G = LL.grading = {};

  G.PASS = 55;
  G.BANDS = [
    { min: 90, letter: 'A+', gp: 5.0 }, { min: 85, letter: 'A', gp: 5.0 }, { min: 80, letter: 'A-', gp: 4.5 },
    { min: 75, letter: 'B+', gp: 4.0 }, { min: 70, letter: 'B', gp: 3.5 }, { min: 65, letter: 'B-', gp: 3.0 },
    { min: 60, letter: 'C+', gp: 2.5 }, { min: 55, letter: 'C', gp: 2.0 }, { min: 50, letter: 'D+', gp: 1.5 },
    { min: 45, letter: 'D', gp: 1.0 }, { min: 0, letter: 'F', gp: 0.0 }
  ];
  G.band = function (pct) {
    for (var i = 0; i < G.BANDS.length; i++) if (pct >= G.BANDS[i].min - 1e-9) return G.BANDS[i];
    return G.BANDS[G.BANDS.length - 1];
  };
  G.stars = function (pct) { return pct >= 80 ? 3 : pct >= 65 ? 2 : pct >= G.PASS ? 1 : 0; };

  /* ---------------- Section A ---------------- */
  G.scoreEntry = function (e) {
    var out = { earned: 0, max: 1, blank: e.resp == null, misjudged: [] };
    if (out.blank) return out;
    if (e.mode === 'mcq') { out.earned = e.resp === e.q.a ? 1 : 0; return out; }
    var chosen = e.combo.sets[e.resp];
    out.earned = e.resp === e.combo.answer ? 1 : 0;
    e.q.s.forEach(function (st, i) { if ((chosen.indexOf(i) >= 0) !== st[1]) out.misjudged.push(i); });
    return out;
  };
  function trapsFor(e, sc) {
    if (sc.blank || sc.earned >= 1) return [];
    var keys = [];
    if (e.mode === 'mcq') { if (e.q.trap) keys.push(e.q.trap); return keys; }
    sc.misjudged.forEach(function (i) { var k = e.q.s[i][3]; if (k && keys.indexOf(k) < 0) keys.push(k); });
    return keys;
  }
  G.trapsFor = trapsFor;

  function pick(arr, seed) { return arr[Math.abs(seed) % arr.length]; }
  var OPEN = {
    'A+': ['Outstanding. You read every option to the last word and the usual traps did not catch you.', 'Exemplary. This is command of the material, not familiarity with it.'],
    'A': ['Excellent work, with only isolated slips.', 'A very strong script. The errors are few and none is systematic.'],
    'A-': ['Very good. A handful of slips stand between you and the top band.', 'Strong. You know the law; precision under time pressure is the remaining gap.'],
    'B+': ['Good, solid work, with some lapses in precision.', 'A good script. The foundations are there, but some standard traps still catch you.'],
    'B': ['Sound overall, but the errors cluster in particular lots.', 'Reasonable command of the rules. You lose marks on the finer distinctions the lectures stress.'],
    'B-': ['Adequate. You recognise most rules but apply several loosely.', 'Competent in places, but too many marks go on distinctions that are in the notes.'],
    'C+': ['A pass with some way to go. Recognising a case name is not the same as applying its rule.', 'Competent in places, but the errors point to gaps rather than slips.'],
    'C': ['A bare pass. You know the vocabulary but often misapply it.', 'This scrapes through. Treat it as a warning, not a result.'],
    'D+': ['Below the standard. Several basic rules are being confused.', 'Not yet at the required standard. The marks lost are on core rules, not fine print.'],
    'D': ['Well below the standard. Core rules are not yet secure.', 'This needs serious revision before Tuesday.'],
    'F': ['Fail. Go back to the lesson cards for these lots, slowly, before trying again.', 'Fail. Rebuild the foundations: lesson cards first, then training with feedback.']
  };

  /* entries: [{q, mode, combo?, resp}], meta: {kind:'lot'|'paper', seconds, seed} */
  G.report = function (entries, meta) {
    meta = meta || {};
    var seed = meta.seed || 1, M = LL.MCQ_MARKS;
    var total = 0, max = 0, blanks = 0, comboWrong = 0;
    var byTopic = {}, trapCount = {}, trapQs = {}, items = [];
    entries.forEach(function (e, idx) {
      var sc = G.scoreEntry(e);
      total += sc.earned * M; max += M;
      if (sc.blank) blanks++;
      if (e.mode === 'combo' && !sc.blank && sc.earned < 1) comboWrong++;
      var c = LL.getChapter(e.q.ch);
      var key = meta.kind === 'paper' ? (c ? c.code + ' · ' + c.short : 'Other') : e.q.topic;
      var t = byTopic[key] || (byTopic[key] = { earned: 0, max: 0, n: 0, ch: e.q.ch });
      t.earned += sc.earned * M; t.max += M; t.n++;
      var traps = trapsFor(e, sc);
      traps.forEach(function (k) { trapCount[k] = (trapCount[k] || 0) + 1; (trapQs[k] = trapQs[k] || []).push(idx + 1); });
      items.push({ entry: e, score: sc, traps: traps });
    });
    var pct = max ? (total / max) * 100 : 0, b = G.band(pct);
    var topics = Object.keys(byTopic).map(function (k) {
      var t = byTopic[k]; return { name: k, earned: t.earned, max: t.max, n: t.n, pct: t.max ? 100 * t.earned / t.max : 0, ch: t.ch };
    }).sort(function (a, c) { return c.pct - a.pct; });
    var C = [];
    var trapKeys = Object.keys(trapCount).sort(function (a, c) { return trapCount[c] - trapCount[a]; });
    C.push({ k: 'open', text: b.letter === 'A+' && trapKeys.length ? 'Outstanding, marred only by the known traps listed below.' : pick(OPEN[b.letter], seed) });
    var strong = topics.filter(function (t) { return t.n >= 2 && t.pct >= 80; });
    var weak = topics.filter(function (t) { return t.pct < 60; }).sort(function (a, c) { return a.pct - c.pct; });
    if (strong.length) C.push({ k: 'good', text: 'Secure: ' + strong.slice(0, 3).map(function (t) { return t.name + ' (' + Math.round(t.pct) + '%)'; }).join(', ') + '.' });
    if (weak.length) C.push({ k: 'bad', text: 'Not yet at the standard: ' + weak.slice(0, 3).map(function (t) { return t.name + ' (' + Math.round(t.pct) + '%)'; }).join(', ') + '.' });
    trapKeys.slice(0, 4).forEach(function (k) {
      var T = LL.TRAPS[k]; if (!T) return;
      C.push({ k: 'trap', text: 'Q' + trapQs[k].join(', Q') + ': ' + T.text, ch: T.ch });
    });
    if (blanks) C.push({ k: 'fmt', text: 'You left ' + blanks + ' question' + (blanks > 1 ? 's' : '') + ' blank. That is ' + (blanks * M) + ' marks you could not earn. Always choose something.' });
    if (comboWrong >= 2) C.push({ k: 'fmt', text: comboWrong + ' roman-numeral questions went wrong. Find one statement you are sure is false and strike every option containing it before deciding the rest.' });
    if (meta.seconds && entries.length) {
      var avg = meta.seconds / entries.length;
      if (avg < 40 && pct < 75) C.push({ k: 'fmt', text: 'You averaged ' + Math.round(avg) + ' seconds a question. The stems turn on single words ("may", "any", "without exception"). Read them fully.' });
      else if (avg > 200) C.push({ k: 'fmt', text: 'You averaged over ' + Math.round(avg / 60) + ' minutes a question. On Tuesday that leaves too little for Section B. Flag and move on.' });
    }
    var revise = [];
    weak.forEach(function (t) { if (t.ch && revise.indexOf(t.ch) < 0) revise.push(t.ch); });
    trapKeys.forEach(function (k) { var T = LL.TRAPS[k]; if (T && revise.indexOf(T.ch) < 0) revise.push(T.ch); });
    if (revise.length) C.push({ k: 'revise', text: 'Revise before your next attempt: ' + revise.slice(0, 4).map(function (n) { var c = LL.getChapter(n); return c ? c.code + ' ' + c.short : 'Lot ' + n; }).join('; ') + '.' });
    C.push({ k: 'close', text: pct >= G.PASS ? 'Grade awarded: ' + b.letter + (pct >= 80 ? '. Well earned.' : '. Pass, with room to improve.') : 'Grade awarded: ' + b.letter + '. Below the pass mark (C, ' + G.PASS + '%). Revise and resit.' });
    return {
      earned: U.round2(total), max: max, pct: Math.round(pct * 10) / 10, letter: b.letter, gp: b.gp, stars: G.stars(pct), pass: pct >= G.PASS,
      topics: topics, comments: C, items: items, blanks: blanks, traps: trapKeys
    };
  };

  /* Section A of a fixed mock: 2 MCQs per lot, deterministic; forced questions are kept apart across papers. */
  LL.mockMCQs = function (mock) {
    var out = [], forcedAll = [];
    LL.ref.mocks.forEach(function (m) { (m.forced || []).forEach(function (id) { forcedAll.push(id); }); });
    LL.chapters.forEach(function (c) {
      var forced = (mock.forced || []).map(LL.findQuestion).filter(function (q) { return q && q.ch === c.n; });
      var pool = U.shuffle(c.qs.filter(function (q) { return forcedAll.indexOf(q.id) < 0; }), U.rng(2026 + c.n * 7));
      var need = Math.max(0, 2 - forced.length), start = (mock.k * 2) % Math.max(1, pool.length);
      var picks = forced.slice();
      for (var j = 0; j < need; j++) picks.push(pool[(start + j) % pool.length]);
      out = out.concat(picks);
    });
    return out;
  };

  /* ---------------- Section B: keyword marker ---------------- */
  G.normalize = function (s) {
    return ' ' + String(s || '').toLowerCase()
      .replace(/[‘’′]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-')
      .replace(/\bversus\b|\bvs\.?(?=\s)|\bv\.(?=\s)/g, 'v')
      .replace(/\s+/g, ' ') + ' ';
  };
  var reCache = {};
  G.compileK = function (k) {
    if (reCache[k]) return reCache[k];
    var src = k.replace(/§(\d+[a-z]?)/g, function (_, n) { return '(?:\\bs\\.?\\s*|\\bss\\.?\\s*|section\\s*)' + n + '(?![0-9])'; });
    reCache[k] = new RegExp(src, 'i');
    return reCache[k];
  };
  G.pointId = function (caseId, pi, ii, qi) { return caseId + ':' + pi + '.' + ii + '.' + qi; };
  function half(x) { return Math.round(x * 2) / 2; }

  /* Mark one part's answer against its scheme. */
  /* Development cap: naming the right authorities in a few words is not an answer. Keyword marks scale with
     length up to about 12 words per mark (a 40-mark answer needs ~480 words before the cap lifts). */
  G.WORDS_PER_MARK = 12;
  G.devCap = function (words, marks) { return Math.min(1, words / Math.max(1, marks * G.WORDS_PER_MARK)); };
  G.markPart = function (cs, pi, text) {
    var part = cs.parts[pi], norm = G.normalize(text), earned = 0, max = 0, words = U.words(text), cap = G.devCap(words, part.marks);
    var issues = part.issues.map(function (iss, ii) {
      var ie = 0, im = 0;
      var points = iss.points.map(function (p, qi) {
        var hits = p.k.map(function (k) { return G.compileK(k).test(norm); });
        var n = hits.filter(Boolean).length, frac = p.k.length ? n / p.k.length : 0;
        var award = Math.floor(p.m * frac * cap * 2) / 2;
        ie += award; im += p.m;
        return { id: G.pointId(cs.id, pi, ii, qi), t: p.t, m: p.m, hits: hits, frac: frac, auto: award, award: award };
      });
      earned += ie; max += im;
      return { name: iss.name, ch: iss.ch, earned: ie, max: im, points: points };
    });
    return { label: part.label, marks: part.marks, earned: earned, max: max, issues: issues, words: words, cap: cap };
  };

  G.structure = function (text) {
    var n = G.normalize(text);
    return {
      issue: /\bissues?\b|\bwhether\b/.test(n),
      law: /\blaw\b|\brule\b|\bheld\b|\bunder s\b|\bsection\b/.test(n),
      application: /\bappl(y|ication|ying)\b|\bhere,|\bon the facts\b|\bbecause\b/.test(n),
      conclusion: /\bconclu(sion|de)\b|\baccordingly\b|\bin sum\b|\badvise\b|\btherefore\b/.test(n)
    };
  };
  G.authorities = function (text) {
    var m = String(text || '').match(/\b[A-Z][A-Za-z&.'()-]+(?: [A-Z][A-Za-z&.'()-]+)* v\.? [A-Z][A-Za-z&.'()-]+|\b(?:s|ss|section)\.? ?\d+[A-Z]?(?:\(\d+\))*(?:\([a-z]\))?/g);
    return m ? m.length : 0;
  };

  /* Prof. Borough's comments on a marked case script. res = {parts:[markPart...], total, max, text: joined} */
  G.caseComments = function (cs, res, answers, meta) {
    var C = [], pct = res.max ? 100 * res.total / res.max : 0, b = G.band(pct);
    var all = Object.keys(answers).map(function (k) { return answers[k] || ''; }).join('\n');
    var st = G.structure(all), missing = [];
    if (!st.issue) missing.push('Issue'); if (!st.law) missing.push('Law'); if (!st.application) missing.push('Application'); if (!st.conclusion) missing.push('Conclusion');
    C.push({ k: 'open', text: pct >= 75 ? 'A well-organised answer that collects most of the available marks.' : pct >= 55 ? 'A reasonable answer, but marks are left on the table in specific issues.' : 'The answer misses whole issues. Spot every issue before writing.' });
    if (missing.length) C.push({ k: 'fmt', text: 'ILAC: I could not find a clear ' + missing.join(', ') + ' step. Label or paragraph each step so the marker sees it.' });
    var norm = G.normalize(all), noParty = (cs.parties || []).filter(function (p) { return norm.indexOf(p.toLowerCase().replace(/^the /, '').split(' ')[0]) < 0; });
    if (noParty.length) C.push({ k: 'bad', text: 'Every named party needs a conclusion. I see nothing on: ' + noParty.join(', ') + '.' });
    var weakIssues = [];
    res.parts.forEach(function (p) { p.issues.forEach(function (iss) { if (iss.max && iss.earned / iss.max < 0.5) weakIssues.push(iss); }); });
    if (weakIssues.length) C.push({ k: 'bad', text: 'Thin on: ' + weakIssues.slice(0, 4).map(function (i) { return i.name + ' (' + i.earned + '/' + i.max + ')'; }).join('; ') + '.' });
    var auth = G.authorities(all);
    if (auth < Math.max(3, Math.round(res.max / 5))) C.push({ k: 'fmt', text: 'Only about ' + auth + ' authorities cited. Aim for at least one case or section per rule, in bold on the day.' });
    var words = U.words(all), target = res.max * 22;
    if (words < target * 0.5) C.push({ k: 'fmt', text: words + ' words for ' + res.max + ' marks is thin. Aim for roughly ' + Math.round(target / 50) * 50 + ' words: about one developed point per mark.' });
    if (meta && meta.seconds && meta.limit && meta.seconds > meta.limit) C.push({ k: 'fmt', text: 'You went over the suggested time by ' + Math.round((meta.seconds - meta.limit) / 60) + ' minutes. On Tuesday, spend about a minute per mark.' });
    var revise = [];
    weakIssues.forEach(function (i) { if (i.ch && revise.indexOf(i.ch) < 0) revise.push(i.ch); });
    if (revise.length) C.push({ k: 'revise', text: 'Revise: ' + revise.map(function (n) { var c = LL.getChapter(n); return c ? c.code + ' ' + c.short : 'Lot ' + n; }).join('; ') + '.' });
    C.push({ k: 'close', text: 'Section B mark: ' + U.round2(res.total) + ' / ' + res.max + ' (' + b.letter + ' standard).' });
    return C;
  };

  /* ---------------- Prompts for Claude (artifact viewer only) ---------------- */
  G.aiMarkPrompt = function (cs, pi, answer) {
    var part = cs.parts[pi], n = 0, scheme = [];
    part.issues.forEach(function (iss) {
      scheme.push('Issue: ' + iss.name);
      iss.points.forEach(function (p) { n++; scheme.push('  [' + n + '] (' + p.m + ' marks) ' + p.t); });
    });
    return [
      'You are an examiner marking a Singapore university Land Law (NUS RE2702) case-study answer written under exam conditions.',
      'Mark strictly against the marking scheme. Award each point between 0 and its maximum, in steps of 0.5. Give credit for correct law expressed in the student\'s own words; give no credit for a case or section cited for the wrong rule, or for a rule stated without applying it to these facts. Do not reward points the scheme does not list, but mention them in "strengths" if they are correct and relevant.',
      'Course conventions: ILAC structure (Issue, Law, Application, Conclusion); authorities named for each rule; a conclusion for every named party.',
      '',
      'CASE FACTS:\n' + cs.facts,
      '',
      'QUESTION ' + (part.label || '') + ': ' + part.ask,
      '',
      'MARKING SCHEME (' + part.marks + ' marks):\n' + scheme.join('\n'),
      '',
      'MODEL ANSWER (reference only; other well-reasoned routes can earn the marks):\n' + part.model,
      '',
      'STUDENT ANSWER:\n<<<\n' + (answer || '(blank)') + '\n>>>',
      '',
      'Reply with JSON only, no prose before or after, in exactly this shape:',
      '{"points":[{"n":1,"award":0,"note":"one short sentence: what earned or lost the marks"}],"structure":"one sentence on the ILAC structure","strengths":["up to 3 short items"],"fixes":["up to 4 short, specific fixes, naming the missing rule or authority"]}',
      'Include every scheme point exactly once, numbered as above.'
    ].join('\n');
  };
  G.parseAiMark = function (data, partRes) {
    if (!data || !Array.isArray(data.points)) return null;
    var flat = [];
    partRes.issues.forEach(function (iss) { iss.points.forEach(function (p) { flat.push(p); }); });
    var out = { notes: {}, structure: typeof data.structure === 'string' ? data.structure : '', strengths: [], fixes: [] };
    data.points.forEach(function (p) {
      var i = (+p.n) - 1;
      if (i < 0 || i >= flat.length) return;
      var a = Math.max(0, Math.min(flat[i].m, half(+p.award || 0)));
      out.notes[flat[i].id] = { award: a, note: String(p.note || '').slice(0, 300) };
    });
    if (Array.isArray(data.strengths)) out.strengths = data.strengths.slice(0, 3).map(function (s) { return String(s).slice(0, 240); });
    if (Array.isArray(data.fixes)) out.fixes = data.fixes.slice(0, 4).map(function (s) { return String(s).slice(0, 240); });
    return Object.keys(out.notes).length ? out : null;
  };

  /* A fresh MCQ in the practice-paper style, grounded in one lot's notes. */
  G.genPrompt = function (ch, avoid) {
    var rules = ch.rules.map(function (r) { return '- ' + r[0] + ': ' + r[1]; }).join('\n');
    var cases = ch.cases.map(function (c) { return '- ' + c[0] + ': ' + c[2]; }).join('\n');
    var ex = ['c7-01', 'c8-01', 'c9-02'].map(function (id) {
      var q = LL.findQuestion(id); if (!q) return '';
      return 'Q: ' + q.q + '\n' + q.o.map(function (o, i) { return '(' + 'ABCD'[i] + ') ' + o; }).join('\n') + '\nAnswer: ' + 'ABCD'[q.a];
    }).join('\n\n');
    return [
      'Write ONE new multiple-choice question for a Singapore university Land Law exam (NUS RE2702), on the topic "' + ch.title + '".',
      'Match the lecturer\'s style shown in the examples: a short Singapore fact pattern with named parties ending "In this case:", or a stem "The following statement is true about ...". Exactly four options. Exactly one is the most suitable answer. Distractors should be plausible and usually fail on one word or on the reason given. All four options must be about the same length (within 20% of each other) and the correct option must NOT be the longest; give wrong options a plausible-sounding reason so they match in length.',
      'Use ONLY the rules and cases below. Do not invent cases, sections or facts about the law. If a rule is marked [check], do not test it.',
      '',
      'RULES:\n' + rules,
      '',
      'CASES:\n' + cases,
      '',
      'STYLE EXAMPLES:\n' + ex,
      avoid && avoid.length ? '\nAvoid repeating these existing stems:\n' + avoid.slice(0, 12).map(function (s) { return '- ' + s.slice(0, 120); }).join('\n') : '',
      '',
      'Reply with JSON only: {"topic":"2-4 words","q":"the stem","o":["option A","option B","option C","option D"],"a":0,"why":"2-3 sentences: why the answer is right and why each distractor fails, naming the case or section"}',
      '"a" is the 0-based index of the correct option.'
    ].join('\n');
  };
  G.validateGen = function (d) {
    if (!d || typeof d.q !== 'string' || !Array.isArray(d.o) || d.o.length !== 4) return null;
    var a = +d.a;
    if (!(a >= 0 && a <= 3)) return null;
    if (d.o.some(function (o) { return typeof o !== 'string' || !o.trim(); })) return null;
    /* Reject a question whose correct option gives itself away by length. */
    var lens = d.o.map(function (o) { return o.trim().length; }), others = lens.filter(function (_, i) { return i !== a; });
    if (lens[a] > Math.max.apply(null, others) * 1.1) return null;
    return { t: 'mcq', topic: String(d.topic || 'AI question').slice(0, 40), q: d.q.slice(0, 1200), o: d.o.map(function (o) { return o.slice(0, 400); }), a: a, why: String(d.why || '').slice(0, 900) };
  };
})(typeof window !== 'undefined' ? window : globalThis);
