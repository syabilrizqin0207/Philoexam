// Land Lah! content and marking checks. Run: npm run test:land
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'landlah');
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !s.endsWith('ui.js'));

function load() {
  const ctx = { console, document: { createElement: () => ({ innerHTML: '', innerText: '', textContent: '' }) } };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(app, s), 'utf8'), ctx, { filename: s });
  return ctx.LL;
}
const LL = load();
const G = LL.grading;

test('ten lots in lecture order, each complete', () => {
  assert.equal(LL.chapters.length, 10);
  LL.chapters.forEach((c, i) => {
    assert.equal(c.n, i + 1);
    assert.equal(c.code, 'LOT ' + (i + 1));
    for (const k of ['title', 'short', 'place', 'spot', 'lec', 'idea', 'mentorName', 'win']) assert.ok(c[k], `${c.code} ${k}`);
    assert.ok(c.plain.length >= 3, `${c.code} plain`);
    assert.ok(c.terms.length >= 6, `${c.code} terms`);
    assert.ok(c.rules.length >= 5, `${c.code} rules`);
    assert.ok(c.cases.length >= 5, `${c.code} cases`);
    c.cases.forEach(r => assert.equal(r.length, 4, `${c.code} case row ${r[0]}`));
    assert.ok(c.traps.length >= 4, `${c.code} traps`);
    assert.ok(c.qs.length >= 14, `${c.code} has ${c.qs.length} MCQs`);
    assert.ok(c.quick.length >= 12, `${c.code} quick`);
    assert.ok(LL.cardsFor(c).length >= 8, `${c.code} cards`);
    c.mentor.forEach(m => assert.ok(LL.looks[m], `look ${m}`));
    assert.ok(LL.px.ICONS[c.icon], `icon ${c.icon}`);
  });
  assert.ok(LL.looks[LL.PROF.id]);
  LL.players.forEach(p => assert.ok(LL.looks[p.id], p.id));
});

test('MCQs are well formed and answer keys are valid', () => {
  const seen = new Set();
  let n = 0;
  for (const c of LL.chapters) for (const q of c.qs) {
    n++;
    assert.ok(!seen.has(q.id), 'duplicate ' + q.id); seen.add(q.id);
    assert.ok(q.q && q.topic && q.src, q.id + ' fields');
    if (q.t === 'mcq') {
      assert.equal(q.o.length, 4, q.id + ' needs 4 options');
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, q.id + ' key');
      assert.ok(q.why && q.why.length > 30, q.id + ' why');
      assert.equal(new Set(q.o).size, 4, q.id + ' duplicate options');
    } else {
      assert.equal(q.t, 'set', q.id + ' type');
      assert.ok(q.s.length >= 3 && q.s.length <= 5, q.id + ' statements');
      q.s.forEach((s, i) => { assert.equal(typeof s[1], 'boolean', `${q.id} s${i}`); assert.ok(s[2], `${q.id} why ${i}`); });
      for (let seed = 1; seed < 40; seed++) {
        const co = LL.comboOptions(q, seed);
        assert.equal(co.labels.length, 4, q.id + ' needs 4 combos');
        assert.ok(co.answer >= 0, q.id + ' correct set present');
        assert.equal(co.sets.filter(s => LL.sameSet(s, LL.correctSet(q))).length, 1, q.id + ' exactly one correct');
        assert.equal(new Set(co.labels).size, 4, q.id + ' distinct options');
        if (q.opts) break;
      }
    }
    const traps = q.t === 'mcq' ? [q.trap] : q.s.map(s => s[3]);
    traps.filter(Boolean).forEach(k => assert.ok(LL.TRAPS[k], `${q.id} unknown trap ${k}`));
  }
  assert.ok(n >= 150, 'only ' + n + ' MCQs');
  Object.values(LL.TRAPS).forEach(t => assert.ok(t.ch >= 1 && t.ch <= 10 && t.text));
});

test('the four practice-paper MCQs carry the published answers', () => {
  const q1 = LL.findQuestion('c7-01'), q2 = LL.findQuestion('c8-01'), q3 = LL.findQuestion('c9-01'), q4 = LL.findQuestion('c9-02');
  assert.equal(q1.a, 3); // D
  assert.equal(q2.a, 3); // D
  const co = LL.comboOptions(q3, 1);
  assert.equal(co.labels[co.answer], '(iv) only');
  assert.deepEqual([...co.labels], ['(iii) only', '(iv) only', '(i) and (ii)', '(i) and (iii)']);
  assert.equal(q4.a, 2); // C
});

test('option lengths never give the answer away', () => {
  const verbatim = new Set(['c7-01', 'c8-01', 'c9-02']); // copied word for word from the practice paper
  for (const q of LL.allQuestions()) {
    if (q.t === 'mcq') {
      if (verbatim.has(q.id)) continue;
      const L = q.o.map(o => o.length), c = L[q.a], others = L.filter((_, i) => i !== q.a);
      assert.ok(c <= Math.max(...others), `${q.id}: the correct option is the longest (${L.join('/')})`);
      assert.ok(Math.max(...L) / Math.min(...L) <= 1.35, `${q.id}: option lengths too uneven (${L.join('/')})`);
    } else {
      for (let seed = 1; seed < 60; seed++) {
        const co = LL.comboOptions(q, seed), right = co.sets[co.answer].length;
        if (right < q.s.length) assert.ok(co.sets.some((s, i) => i !== co.answer && s.length >= right), `${q.id}: the correct combination lists the most statements`);
        if (q.opts) break;
      }
    }
  }
  assert.equal(G.validateGen({ q: 'x', o: ['short', 'short', 'a much much longer correct option here', 'short'], a: 2, why: 'y' }), null);
});

test('combination labels follow the paper', () => {
  assert.equal(LL.comboLabel([2], 4), '(iii) only');
  assert.equal(LL.comboLabel([0, 2], 4), '(i) and (iii)');
  assert.equal(LL.comboLabel([0, 1, 3], 4), '(i), (ii) and (iv)');
  assert.equal(LL.comboLabel([0, 1, 2, 3], 4), '(i), (ii), (iii) and (iv)');
});

test('case studies: marks add up, keywords compile, scheme matches the model answer', () => {
  assert.ok(LL.cases.length >= 20, 'cases ' + LL.cases.length);
  const ids = new Set();
  for (const cs of LL.cases) {
    assert.ok(!ids.has(cs.id), 'dup case ' + cs.id); ids.add(cs.id);
    assert.ok(cs.facts.length > 120 && cs.title && cs.src, cs.id);
    assert.ok(cs.parties && cs.parties.length, cs.id + ' parties');
    cs.chs.forEach(n => assert.ok(n >= 1 && n <= 10, cs.id + ' lot'));
    assert.equal(cs.parts.reduce((s, p) => s + p.marks, 0), cs.marks, cs.id + ' part marks');
    if (cs.kind === 'exam') assert.equal(cs.marks, 40, cs.id + ' exam size');
    cs.parts.forEach((p, pi) => {
      const sum = p.issues.reduce((s, i) => s + i.points.reduce((t, q) => t + q.m, 0), 0);
      assert.equal(sum, p.marks, `${cs.id} part ${pi}: scheme ${sum} v ${p.marks}`);
      assert.ok(p.model && p.model.length > 300, `${cs.id} model`);
      p.issues.forEach(i => i.points.forEach(q => { assert.ok(q.k.length >= 1); q.k.forEach(k => G.compileK(k)); }));
      const res = G.markPart(cs, pi, p.model);
      const pct = 100 * res.earned / res.max;
      assert.ok(pct >= 70, `${cs.id} part ${pi}: model answer scores only ${pct.toFixed(0)}% on its own scheme`);
      const blank = G.markPart(cs, pi, '');
      assert.equal(blank.earned, 0, cs.id + ' blank');
    });
  }
});

test('section references in keywords match common spellings', () => {
  const re = G.compileK('§23');
  ['s 23 CLPA', 's. 23', 'section 23', 'under s23'].forEach(t => assert.ok(re.test(G.normalize(t)), t));
  assert.ok(!re.test(G.normalize('s 230')));
  assert.ok(G.compileK('18a').test(G.normalize('s 18A CLPA')));
});

test('mock papers: 20 distinct MCQs, two per lot, no repeats across papers', () => {
  const all = new Set();
  for (const m of LL.ref.mocks) {
    const qs = LL.mockMCQs(m);
    assert.equal(qs.length, 20, m.id);
    assert.equal(new Set(qs.map(q => q.id)).size, 20, m.id + ' repeats');
    for (const c of LL.chapters) assert.equal(qs.filter(q => q.ch === c.n).length, 2, `${m.id} lot ${c.n}`);
    (m.forced || []).forEach(id => assert.ok(qs.some(q => q.id === id), m.id + ' forced ' + id));
    qs.forEach(q => { assert.ok(!all.has(q.id), `${q.id} reused in ${m.id}`); all.add(q.id); });
    assert.ok(LL.getCase(m.caseId) && LL.getCase(m.caseId).marks === 40, m.id + ' case');
  }
});

test('Section A marking: 3 marks each, all or nothing', () => {
  const qs = LL.mockMCQs(LL.ref.mocks[0]);
  const entries = qs.map((q, i) => {
    if (q.t === 'mcq') return { q, mode: 'mcq', resp: i < 10 ? q.a : (q.a + 1) % 4 };
    const combo = LL.comboOptions(q, 3);
    return { q, mode: 'combo', combo, resp: i < 10 ? combo.answer : (combo.answer + 1) % 4 };
  });
  const rep = G.report(entries, { kind: 'paper', seconds: 3000, seed: 2 });
  assert.equal(rep.max, 60);
  assert.equal(rep.earned, 30);
  assert.equal(rep.pct, 50);
  assert.equal(rep.letter, 'D+');
  assert.ok(rep.comments.length >= 3);
  const blank = G.report(qs.map(q => q.t === 'mcq' ? { q, mode: 'mcq', resp: null } : { q, mode: 'combo', combo: LL.comboOptions(q, 1), resp: null }), {});
  assert.equal(blank.earned, 0); assert.equal(blank.blanks, 20);
});

test('AI marking replies are validated and clamped', () => {
  const cs = LL.getCase('punggol');
  const res = G.markPart(cs, 0, 'Norwest says no contract.');
  const parsed = G.parseAiMark({ points: [{ n: 1, award: 9, note: 'ok' }, { n: 2, award: 1.3 }, { n: 99, award: 2 }], structure: 'fine', fixes: ['a'] }, res);
  const ids = res.issues[0].points.map(p => p.id);
  assert.equal(parsed.notes[ids[0]].award, res.issues[0].points[0].m);
  assert.equal(parsed.notes[ids[1]].award, 1.5);
  assert.equal(Object.keys(parsed.notes).length, 2);
  assert.equal(G.parseAiMark({ nope: 1 }, res), null);
  assert.ok(G.aiMarkPrompt(cs, 0, 'x').includes('MARKING SCHEME'));
  assert.ok(G.genPrompt(LL.getChapter(8), []).includes('JSON'));
  assert.ok(G.validateGen({ q: 'x', o: ['aaa', 'bbb', 'ccc', 'ddd'], a: 2, why: 'y' }));
  assert.equal(G.validateGen({ q: 'x', o: ['a', 'b'], a: 0 }), null);
});

test('cheat sheet builds from concepts, pack and lots', () => {
  const save = LL.newSave();
  save.mistakes['c9-02'] = { n: 2, streak: 0, traps: ['absd-higher'], miss: [], fixed: false, at: 1 };
  save.mistakes['c9-01'] = { n: 1, streak: 0, traps: ['whose-fraud'], miss: [2], fixed: false, at: 2 };
  save.casePts['zen:0.0.1'] = { t: 'Survivorship: a Will cannot pass a joint tenant\'s share (Shafeeg v Fatimah).', m: 3, ch: 7, cs: 'zen', title: 'Zen', n: 1 };
  const out = LL.cheats.build(save, { mistakes: true, pack: true, lots: [9, 7] }, 'Tester');
  assert.ok(out.inner.includes('My concepts to fix'));
  assert.ok(out.inner.includes('HIGHER applicable ABSD'));
  assert.ok(out.inner.includes('from your case studies'));
  assert.ok(out.inner.includes('Shafeeg v Fatimah'));
  assert.ok(out.inner.includes('Exam pack'));
  assert.ok(out.inner.includes('LOT 9'));
  assert.ok(out.doc.startsWith('<!doctype html>') && out.doc.includes('@page'));
  const weak = LL.cheats.weakLots(Object.assign(LL.newSave(), { ch: { 5: { best: { pct: 40 } } } }));
  assert.deepEqual([...weak], [5]);
});

test('auto cheat sheet: concepts group mistakes, find rules and authorities, and track mastery', () => {
  const K = LL.concepts, save = LL.newSave();
  assert.equal(K.build(save).length, 0);
  const before = K.snapshot(save);
  save.mistakes['c6-01'] = { n: 1, streak: 0, traps: ['label'], miss: [], fixed: false, at: 5 };
  save.mistakes['c6-02'] = { n: 2, streak: 0, traps: ['services'], miss: [], fixed: false, at: 6 };
  save.ltMiss['5:3'] = { ch: 5, i: 3, n: 1, at: 7, fixed: false };
  const l = K.build(save);
  const lease = l.find(c => c.name === 'Lease v licence');
  assert.ok(lease, 'grouped by topic');
  assert.equal(lease.misses, 3);
  assert.equal(lease.qids.length, 2);
  assert.ok(lease.auths.some(a => a.name === 'Street v Mountford'), 'finds the authority');
  assert.ok(lease.rule && /Mountford/.test(lease.rule[1]), 'matches the rule in the notes');
  assert.deepEqual([...lease.traps].sort(), ['label', 'services']);
  assert.ok(l.find(c => c.kind === 'quick' && c.ch === 5), 'lightning misses become a quick-facts card');
  assert.equal(K.added(before, save).length, 2);
  assert.equal(K.added(K.snapshot(save), save).length, 0);
  save.mistakes['c6-01'].fixed = true; save.mistakes['c6-02'].fixed = true;
  const after = K.build(save).find(c => c.name === 'Lease v licence');
  assert.ok(after.mastered);
  assert.equal(K.counts(save).open, 1);
  assert.ok(K.cardHTML(lease).includes('Remember'));
  assert.ok(K.cardHTML(after, { compact: true }).includes('cs-line'));
  assert.ok(K.aiPrompt(save).includes('CONCEPT'));
  assert.ok(K.drillQs(lease).length >= 2);
});

test('every concept the bank can produce names a rule or an authority, with no stray citations', () => {
  const save = LL.newSave();
  for (const q of LL.allQuestions()) save.mistakes[q.id] = { n: 1, streak: 0, at: 1, traps: [], miss: q.s ? q.s.map((_, i) => i) : [], fixed: false };
  const l = LL.concepts.build(save);
  const bare = l.filter(c => !c.rule && !c.auths.length && !c.secs.length && !c.traps.length);
  assert.ok(bare.length <= 12, 'concepts with nothing to cite: ' + bare.map(c => c.name).join(', '));
  l.forEach(c => c.auths.forEach(a => assert.ok(!/\d/.test(a.name), 'citation number left in ' + a.name)));
});

test('plan items deep-link to things that exist', () => {
  for (const d of LL.ref.plan) for (const it of d.items) {
    if (!it.act) continue;
    const [k, v] = it.act.split(':');
    if (k === 'lot') assert.ok(LL.getChapter(+v), it.id);
    if (k === 'case') assert.ok(LL.getCase(v), it.id);
    if (k === 'mock' || k === 'mockA') assert.ok(LL.ref.mocks.some(m => m.id === v), it.id);
  }
});

test('every lot has a narrated video lesson that is well formed', () => {
  const TYPES = new Set(['title', 'talk', 'recap', 'steps', 'compare', 'case', 'trap', 'number', 'flow', 'quiz']);
  for (const ch of LL.chapters) {
    const v = LL.videos[ch.n];
    assert.ok(v, `video for ${ch.code}`);
    const sc = v.scenes;
    assert.equal(sc[0].t, 'title', `${ch.code} opens with a title`);
    assert.equal(sc[sc.length - 1].t, 'recap', `${ch.code} ends with a recap`);
    const quizzes = sc.filter(s => s.t === 'quiz');
    assert.ok(quizzes.length >= 2, `${ch.code} has ${quizzes.length} quick checks`);
    sc.forEach((s, i) => {
      const where = `${ch.code} scene ${i} (${s.t})`;
      assert.ok(TYPES.has(s.t), where + ' type');
      if (s.t === 'quiz') { assert.ok(ch.quick[s.qi], where + ' quick-fire item exists'); return; }
      assert.ok(Array.isArray(s.say) && s.say.length, where + ' has narration');
      const last = s.say.length - 1;
      if (s.t === 'flow') {
        const ids = new Set(s.nodes.map(n => n.id));
        s.nodes.forEach(n => { assert.ok(n.x >= 5 && n.x <= 95 && n.y >= 5 && n.y <= 95, where + ' node inside the box'); assert.ok((n.at || 0) <= last, where + ' node revealed'); });
        s.links.forEach(l => { assert.ok(ids.has(l.from) && ids.has(l.to), where + ` link ${l.from}->${l.to}`); assert.ok((l.at || 0) <= last, where + ' link revealed'); });
      }
      if (s.t === 'case') { for (const k of ['name', 'facts', 'held']) assert.ok(s[k], where + ' ' + k); }
      if (s.t === 'compare') s.rows.forEach(r => assert.equal(r.length, 2, where + ' row'));
      if (s.t === 'trap') assert.ok(s.text, where + ' text');
      if (s.t === 'number') assert.ok(s.big && s.label, where + ' number');
    });
    const lines = LL.videoLines(v);
    lines.forEach(l => {
      assert.ok(l.text.trim().length > 0, `${ch.code} empty line`);
      assert.ok(LL.util.words(l.text) <= 60, `${ch.code} line too long to read aloud: ${l.text.slice(0, 50)}`);
      if (l.stop) return; // quick-check statements come from the quick-fire bank verbatim
      assert.ok(!/(^|[\s(])[sS]{1,2} \d/.test(l.text), `${ch.code} narration says "s 23" instead of "section": ${l.text.slice(0, 60)}`);
      assert.ok(!/ v /.test(l.text), `${ch.code} narration says " v " instead of "versus": ${l.text.slice(0, 60)}`);
    });
    const stops = lines.filter(l => l.stop);
    assert.equal(stops.length, quizzes.length, `${ch.code} every quick check pauses the video`);
    assert.ok(stops.every(l => l.si < sc.length - 1), `${ch.code} no quick check at the very end`);
    const mins = LL.videoMinutes(v);
    assert.ok(mins >= 2 && mins <= 7, `${ch.code} runs ~${mins} min`);
    sc.forEach((s, i) => assert.equal(typeof LL.sceneHTML(v, s, i), 'string'));
  }
});

test('Claude explainer videos are validated before they play', () => {
  assert.equal(LL.validateVideo(null, 3), null);
  assert.equal(LL.validateVideo({ scenes: 'nope' }, 3), null);
  assert.equal(LL.validateVideo({ scenes: [{ t: 'talk', points: ['a'], say: ['x'] }] }, 3), null, 'one scene is not enough');
  const v = LL.validateVideo({ title: 'Severance basics', scenes: [
    { t: 'talk', head: 'H', points: ['p1', 'p2'], say: ['intro', 'one', 'two'] },
    { t: 'script', say: ['<b>bad</b>'] },
    { t: 'compare', left: 'JT', right: 'TIC', rows: [['a', 'b'], 'junk'], say: ['x'] },
    { t: 'trap', text: 'A Will does not sever.', say: ['careful'] },
    { t: 'recap', points: ['done'], say: [''] },
    { t: 'recap', points: ['done'], say: ['bye'] }
  ] }, 7);
  assert.ok(v.custom);
  assert.equal(v.n, 7);
  assert.equal(v.scenes[0].t, 'title');
  assert.deepEqual([...v.scenes.map(s => s.t)], ['title', 'talk', 'compare', 'trap', 'recap']);
  assert.equal(v.scenes[2].rows.length, 1);
  assert.ok(LL.videoLines(v).length >= 6);
  const c = LL.concepts.build({ ...LL.newSave(), mistakes: { [LL.chapters[6].qs[0].id]: { n: 1, streak: 0, at: 1, traps: [], miss: [], fixed: false } } }).find(x => x.ch === 7);
  if (c) { const p = LL.explainerPrompt(c); assert.match(p, /JSON/); assert.ok(p.includes(c.name)); }
});

test('every lesson has a natural-voice recording that matches its script', () => {
  assert.ok(LL.voiceTrack, 'landlah/js/content/voice.js is loaded');
  for (const ch of LL.chapters) {
    const v = LL.videos[ch.n], t = LL.voiceFor(v);
    assert.ok(t, `${ch.code}: script changed since it was recorded; re-run scripts/record-voice.py`);
    const file = path.join(app, t.src);
    assert.ok(fs.existsSync(file) && fs.statSync(file).size > 100000, `${ch.code}: ${t.src} exists`);
    let prev = 0;
    t.lines.forEach(([a, b], i) => { assert.ok(a >= prev && b > a && b <= t.ms, `${ch.code} line ${i} timing ${a}-${b}`); prev = b; });
    for (const s of v.scenes.filter(x => x.t === 'quiz')) {
      for (const right of [true, false]) assert.ok(t.fb[LL.voiceHash(LL.quizFeedback(s._q, right))], `${ch.code} quick check ${s.qi}: ${right ? 'right' : 'wrong'}-answer feedback recorded`);
    }
  }
  assert.equal(LL.voiceFor({ ...LL.videos[1], custom: true }), null, 'Claude explainers have no recording');
});
