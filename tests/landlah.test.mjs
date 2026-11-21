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

test('combination labels follow the paper', () => {
  assert.equal(LL.comboLabel([2], 4), '(iii) only');
  assert.equal(LL.comboLabel([0, 2], 4), '(i) and (iii)');
  assert.equal(LL.comboLabel([0, 1, 3], 4), '(i), (ii) and (iv)');
  assert.equal(LL.comboLabel([0, 1, 2, 3], 4), 'All of (i) to (iv)');
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
  assert.ok(G.validateGen({ q: 'x', o: ['a', 'b', 'c', 'd'], a: 2, why: 'y' }));
  assert.equal(G.validateGen({ q: 'x', o: ['a', 'b'], a: 0 }), null);
});

test('cheat sheet builds from mistakes, pack and lots', () => {
  const save = LL.newSave();
  save.mistakes['c9-02'] = { n: 2, streak: 0, traps: ['absd-higher'], miss: [], fixed: false };
  save.mistakes['c9-01'] = { n: 1, streak: 0, traps: ['whose-fraud'], miss: [2], fixed: false };
  save.casePts['zen:0.0.0'] = { t: 'Joint tenants by default', m: 2, ch: 7, cs: 'zen', title: 'Zen', n: 1 };
  const out = LL.cheats.build(save, { mistakes: true, pack: true, lots: [9, 7] }, 'Tester');
  assert.ok(out.inner.includes('Traps I fell for'));
  assert.ok(out.inner.includes('higher applicable ABSD') || out.inner.includes('HIGHER applicable ABSD'));
  assert.ok(out.inner.includes('Case point'));
  assert.ok(out.inner.includes('Exam pack'));
  assert.ok(out.inner.includes('LOT 9'));
  assert.ok(out.doc.startsWith('<!doctype html>') && out.doc.includes('@page'));
  const weak = LL.cheats.weakLots(Object.assign(LL.newSave(), { ch: { 5: { best: { pct: 40 } } } }));
  assert.deepEqual([...weak], [5]);
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
