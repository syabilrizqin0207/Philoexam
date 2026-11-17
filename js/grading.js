/* Reason Lah! — marking and the professor's report.
   Marking follows the course notice: MCQs and combination MCQs are all-or-nothing;
   T/F sets give partial credit per statement with no penalty for wrong answers.
   Letter grades use the NUS 5-point scale with fixed (un-curved) bands. */
(function (root) {
  'use strict';
  var RL = root.RL;
  var G = RL.grading = {};

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
  G.stars = function (pct) {
    if (pct >= 80) return 3;
    if (pct >= 65) return 2;
    if (pct >= G.PASS) return 1;
    return 0;
  };

  /* Score one exam entry. Returns {earned, max, blank, misjudged:[statement idx], chosen}. */
  G.scoreEntry = function (e) {
    var q = e.q, out = { earned: 0, max: 1, blank: false, misjudged: [] };
    if (e.mode === 'mcq') {
      if (e.resp == null) { out.blank = true; return out; }
      out.earned = e.resp === q.a ? 1 : 0;
      return out;
    }
    if (e.mode === 'combo') {
      if (e.resp == null) { out.blank = true; return out; }
      var chosen = e.combo.sets[e.resp];
      out.earned = e.resp === e.combo.answer ? 1 : 0;
      q.s.forEach(function (st, i) { if ((chosen.indexOf(i) >= 0) !== st[1]) out.misjudged.push(i); });
      return out;
    }
    /* tf */
    var n = q.s.length, per = 1 / n, answered = 0;
    q.s.forEach(function (st, i) {
      var r = e.resp ? e.resp[i] : null;
      if (r == null) return;
      answered++;
      if (r === st[1]) out.earned += per; else out.misjudged.push(i);
    });
    out.blank = answered === 0;
    out.partialBlank = answered > 0 && answered < n;
    out.earned = Math.round(out.earned * 10000) / 10000;
    return out;
  };

  function trapsFor(e, sc) {
    var keys = [];
    if (e.mode === 'mcq') { if (!sc.blank && sc.earned < 1 && e.q.trap) keys.push(e.q.trap); return keys; }
    sc.misjudged.forEach(function (i) { var k = e.q.s[i][3]; if (k) keys.push(k); });
    if (!keys.length && sc.earned < 1 && !sc.blank && e.q.trap) keys.push(e.q.trap);
    return keys;
  }

  /* Seeded pick so the same script always reads the same way. */
  function pick(arr, seed) { return arr[Math.abs(seed) % arr.length]; }

  var OPEN = {
    'A+': [`Outstanding script. You read each stem like a referee and did not fall for the standard traps.`, `Exemplary work. This is what command of the material looks like, not just familiarity with it.`],
    'A': [`Excellent work. Your answers show command of the material, with only isolated slips.`, `A very strong script. The errors are few and none of them is systematic.`],
    'A-': [`Very good work. A handful of slips stand between you and the top band.`, `Strong script. You know the material; precision under pressure is the remaining gap.`],
    'B+': [`Good, solid work, with some lapses in precision.`, `A good script. The foundations are there, but some traps still catch you.`],
    'B': [`Sound work overall, but the errors are not random. They cluster in particular topics.`, `Reasonable command of the basics. You lose marks where the course draws its finer distinctions.`],
    'B-': [`Adequate. You recognise most of the concepts but apply several of them loosely.`, `Competent in places, but too many marks go on distinctions the lectures stress.`],
    'C+': [`Competent in places, but the errors suggest gaps in understanding rather than slips.`, `A pass with some way to go. Recognising a term is not yet the same as applying it.`],
    'C': [`A bare pass. You know the vocabulary but often misapply it.`, `This scrapes through. Treat it as a warning, not a result.`],
    'D+': [`Below the standard for this module. Several basic distinctions are being confused.`, `Not yet at the required standard. The marks lost are on core material, not on fine print.`],
    'D': [`Well below the standard. Core definitions are not yet secure.`, `This needs serious revision before the final.`],
    'F': [`Fail. We need to rebuild the foundations of this material. Please come to consultation hours.`, `Fail. Start again from the lesson cards, slowly, before attempting another paper.`]
  };

  /* entries: [{q, mode, combo?, resp, time?}]  meta: {kind:'chapter'|'final', ch?, seconds?, seed?} */
  G.report = function (entries, meta) {
    meta = meta || {};
    var seed = meta.seed || 1;
    var total = 0, max = 0, blanks = 0, partialBlanks = 0, tfLost = 0, tfItems = 0, comboWrong = 0, mcqWrong = 0;
    var byTopic = {}, trapCount = {}, trapQs = {}, items = [];
    entries.forEach(function (e, idx) {
      var sc = G.scoreEntry(e);
      total += sc.earned; max += sc.max;
      if (sc.blank) blanks++;
      if (sc.partialBlank) partialBlanks++;
      if (e.mode === 'tf') { tfItems++; tfLost += (sc.max - sc.earned); }
      if (e.mode === 'combo' && !sc.blank && sc.earned < 1) comboWrong++;
      if (e.mode === 'mcq' && !sc.blank && sc.earned < 1) mcqWrong++;
      var key = meta.kind === 'final' ? ('Ch ' + e.q.ch + ' · ' + (RL.getChapter(e.q.ch) || {}).short) : e.q.topic;
      var t = byTopic[key] || (byTopic[key] = { earned: 0, max: 0, n: 0, ch: e.q.ch });
      t.earned += sc.earned; t.max += sc.max; t.n++;
      var traps = trapsFor(e, sc);
      traps.forEach(function (k) {
        trapCount[k] = (trapCount[k] || 0) + 1;
        (trapQs[k] = trapQs[k] || []).push(idx + 1);
      });
      items.push({ entry: e, score: sc, traps: traps });
    });
    var pct = max ? (total / max) * 100 : 0;
    var b = G.band(pct);
    var topics = Object.keys(byTopic).map(function (k) {
      var t = byTopic[k]; return { name: k, earned: t.earned, max: t.max, n: t.n, pct: t.max ? 100 * t.earned / t.max : 0, ch: t.ch };
    }).sort(function (a, c) { return c.pct - a.pct; });

    /* ---- the professor's comments ---- */
    var C = [];
    var opening = pick(OPEN[b.letter], seed);
    var trapKeys = Object.keys(trapCount).sort(function (a, c) { return trapCount[c] - trapCount[a]; });
    if (b.letter === 'A+' && trapKeys.length) opening = `Outstanding script, marred only by a couple of known traps listed below.`;
    C.push({ k: 'open', text: opening });

    var strong = topics.filter(function (t) { return t.n >= 2 && t.pct >= 80; });
    var weak = topics.filter(function (t) { return t.pct < 60; }).sort(function (a, c) { return a.pct - c.pct; });
    if (strong.length) {
      C.push({ k: 'good', text: `Secure: ` + strong.slice(0, 3).map(function (t) { return t.name + ' (' + Math.round(t.pct) + '%)'; }).join(', ') + `. Keep doing what you are doing there.` });
    }
    if (weak.length) {
      C.push({ k: 'bad', text: `Not yet at the standard: ` + weak.slice(0, 3).map(function (t) { return t.name + ' (' + Math.round(t.pct) + '%)'; }).join(', ') + `.` });
    }
    trapKeys.slice(0, 4).forEach(function (k) {
      var T = RL.TRAPS[k]; if (!T) return;
      C.push({ k: 'trap', text: `Q${trapQs[k].join(', Q')}: ${T.text}`, ch: T.ch });
    });
    if (blanks || partialBlanks) {
      C.push({ k: 'fmt', text: `You left ${blanks ? blanks + ' question' + (blanks > 1 ? 's' : '') : ''}${blanks && partialBlanks ? ' and ' : ''}${partialBlanks ? partialBlanks + ' T/F set' + (partialBlanks > 1 ? 's' : '') + ' partly' : ''} unanswered. There is no penalty for a wrong answer, so a blank is a guaranteed zero.` });
    }
    if (tfItems && tfLost >= 1) {
      C.push({ k: 'fmt', text: `You dropped ${Math.round(tfLost * 100) / 100} marks across T/F sets. Judge every statement on its own merits and check each reason clause; a right verdict for the wrong reason is false.` });
    }
    if (comboWrong >= 2) {
      C.push({ k: 'fmt', text: `${comboWrong} combination questions went wrong. Find one statement you are certain is false and strike every option that contains it before deciding the rest.` });
    }
    if (meta.seconds && entries.length) {
      var avg = meta.seconds / entries.length;
      if (avg < 20 && pct < 75) C.push({ k: 'fmt', text: `You averaged ${Math.round(avg)} seconds a question. The stems are long for a reason. Slow down and read them.` });
      else if (avg > 240) C.push({ k: 'fmt', text: `You averaged over ${Math.round(avg / 60)} minutes a question. In the real paper, move on and come back to anything that stalls you.` });
    }
    var revise = [];
    weak.forEach(function (t) { if (t.ch && revise.indexOf(t.ch) < 0) revise.push(t.ch); });
    trapKeys.forEach(function (k) { var T = RL.TRAPS[k]; if (T && revise.indexOf(T.ch) < 0) revise.push(T.ch); });
    if (revise.length) {
      C.push({ k: 'revise', text: `Revise before your next attempt: ` + revise.slice(0, 4).map(function (n) { var c = RL.getChapter(n); return c ? c.code + ' ' + c.short : 'Ch ' + n; }).join('; ') + `.` });
    }
    var closing = pct >= G.PASS
      ? (pct >= 80 ? `Grade awarded: ${b.letter}. Well earned.` : `Grade awarded: ${b.letter}. Pass, with room to improve.`)
      : `Grade awarded: ${b.letter}. This does not meet the pass mark (C, ${G.PASS}%). Resit after revision.`;
    C.push({ k: 'close', text: closing });

    return {
      earned: Math.round(total * 100) / 100, max: max, pct: Math.round(pct * 10) / 10,
      letter: b.letter, gp: b.gp, stars: G.stars(pct), pass: pct >= G.PASS,
      topics: topics, comments: C, items: items, blanks: blanks
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
