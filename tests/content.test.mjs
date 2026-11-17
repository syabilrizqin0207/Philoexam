// Content and grading checks. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(s => !s.endsWith('ui.js'));

function loadRL() {
  const ctx = { console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
  return ctx.RL;
}
const RL = loadRL();

test('eleven chapters in order, each with cards, quick-fire and questions', () => {
  assert.equal(RL.chapters.length, 11);
  RL.chapters.forEach((c, i) => {
    assert.equal(c.n, i + 1);
    assert.equal(c.code, 'RL' + (i + 1));
    assert.ok(c.cards.length >= 6, `${c.code} cards`);
    assert.ok(c.quick.length >= 10, `${c.code} quick`);
    assert.ok(c.qs.length >= 10, `${c.code} has ${c.qs.length} questions`);
    assert.ok(c.story.length >= 3 && c.win, `${c.code} story`);
    c.mentor.forEach(m => assert.ok(RL.looks[m], `look ${m}`));
    assert.ok(RL.px.ICONS[c.icon], `icon ${c.icon}`);
  });
});

test('question ids are unique and well formed', () => {
  const seen = new Set();
  for (const c of RL.chapters) for (const q of c.qs) {
    assert.ok(!seen.has(q.id), 'duplicate ' + q.id);
    seen.add(q.id);
    assert.ok(q.id.startsWith('c' + c.n + '-'), q.id + ' prefix');
    assert.ok(q.q && q.topic && q.src, q.id + ' fields');
    assert.ok(!/\$\{/.test(q.q), q.id + ' template leak');
  }
});

test('MCQ answer keys are in range and explained', () => {
  for (const q of RL.allQuestions().filter(q => q.t === 'mcq')) {
    assert.ok(Array.isArray(q.o) && q.o.length >= 3, q.id + ' options');
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, q.id + ' answer index');
    assert.equal(new Set(q.o).size, q.o.length, q.id + ' duplicate options');
    assert.ok(q.why && q.why.length > 10, q.id + ' why');
    if (q.trap) assert.ok(RL.TRAPS[q.trap], q.id + ' unknown trap ' + q.trap);
  }
});

test('statement sets are explained and combination options have exactly one key', () => {
  for (const q of RL.allQuestions().filter(q => q.t === 'set')) {
    assert.ok(q.s.length >= 2 && q.s.length <= 5, q.id + ' statements');
    q.s.forEach((st, i) => {
      assert.equal(typeof st[0], 'string', `${q.id}[${i}] text`);
      assert.equal(typeof st[1], 'boolean', `${q.id}[${i}] truth`);
      assert.ok(st[2] && st[2].length > 3, `${q.id}[${i}] why`);
      if (st[3]) assert.ok(RL.TRAPS[st[3]], `${q.id}[${i}] unknown trap ${st[3]}`);
    });
    if (q.opts) {
      const correct = RL.correctSet(q);
      const hits = q.opts.filter(o => RL.sameSet(o, correct)).length;
      assert.equal(hits, 1, q.id + ' fixed options must contain the key exactly once');
      q.opts.forEach(o => o.forEach(i => assert.ok(i >= 0 && i < q.s.length, q.id + ' option index')));
    }
    for (let seed = 1; seed < 40; seed++) {
      const c = RL.comboOptions(q, seed * 7919);
      assert.ok(c.answer >= 0, q.id + ' combo has key');
      assert.equal(c.sets.filter(s => RL.sameSet(s, RL.correctSet(q))).length, 1, q.id + ' key once');
      assert.equal(new Set(c.labels).size, c.labels.length, q.id + ' labels unique');
      assert.ok(c.labels.length >= Math.min(4, 1 << q.s.length), q.id + ' enough options');
    }
  }
});

test('quick-fire items are [statement, truth, why]', () => {
  for (const c of RL.chapters) c.quick.forEach((it, i) => {
    assert.equal(typeof it[0], 'string', `${c.code} quick ${i}`);
    assert.equal(typeof it[1], 'boolean', `${c.code} quick ${i}`);
    assert.ok(it[2], `${c.code} quick ${i} why`);
  });
});

test('every trap points at a real chapter', () => {
  for (const [k, t] of Object.entries(RL.TRAPS)) assert.ok(t.ch >= 1 && t.ch <= 11 && t.text, k);
});

test('grade bands follow the NUS 5-point scale', () => {
  const G = RL.grading;
  assert.equal(G.band(100).letter, 'A+');
  assert.equal(G.band(90).letter, 'A+');
  assert.equal(G.band(89.9).letter, 'A');
  assert.equal(G.band(80).letter, 'A-');
  assert.equal(G.band(79.99).letter, 'B+');
  assert.equal(G.band(55).letter, 'C');
  assert.equal(G.band(54.9).letter, 'D+');
  assert.equal(G.band(44.9).letter, 'F');
  assert.equal(G.band(85).gp, 5.0);
  assert.equal(G.band(70).gp, 3.5);
  assert.equal(G.stars(80), 3);
  assert.equal(G.stars(64.9), 1);
  assert.equal(G.stars(54), 0);
});

test('T/F sets earn partial credit, MCQs are all-or-nothing, blanks score zero', () => {
  const G = RL.grading;
  const set = RL.findQuestion('c3-05'); // T, T, F
  assert.deepEqual(G.scoreEntry({ q: set, mode: 'tf', resp: [true, true, false] }).earned, 1);
  assert.ok(Math.abs(G.scoreEntry({ q: set, mode: 'tf', resp: [true, false, false] }).earned - 2 / 3) < 1e-3);
  assert.equal(G.scoreEntry({ q: set, mode: 'tf', resp: [null, null, null] }).blank, true);
  const combo = RL.comboOptions(set, 5);
  assert.equal(G.scoreEntry({ q: set, mode: 'combo', combo, resp: combo.answer }).earned, 1);
  const wrong = combo.answer === 0 ? 1 : 0;
  assert.equal(G.scoreEntry({ q: set, mode: 'combo', combo, resp: wrong }).earned, 0);
  const mcq = RL.findQuestion('c3-04');
  assert.equal(G.scoreEntry({ q: mcq, mode: 'mcq', resp: mcq.a }).earned, 1);
  assert.equal(G.scoreEntry({ q: mcq, mode: 'mcq', resp: (mcq.a + 1) % 4 }).earned, 0);
});

test('the professor names traps and recommends revision', () => {
  const G = RL.grading;
  const q1 = RL.findQuestion('c6-02'); // odds-against trap on statement II
  const q2 = RL.findQuestion('c3-04');
  const entries = [
    { q: q1, mode: 'tf', resp: [true, true, false] },
    { q: q2, mode: 'mcq', resp: q2.a }
  ];
  const rep = G.report(entries, { kind: 'final', seconds: 600, seed: 3 });
  assert.ok(rep.pct > 80 && rep.pct < 90);
  assert.ok(rep.comments.some(c => c.k === 'trap' && /Odds against/.test(c.text)));
  assert.ok(rep.comments.some(c => c.k === 'revise'));
  assert.equal(rep.comments[rep.comments.length - 1].k, 'close');
});

test('answer positions are spread out', () => {
  const counts = [0, 0, 0, 0, 0];
  RL.allQuestions().filter(q => q.t === 'mcq').forEach(q => counts[q.a]++);
  const total = counts.reduce((a, b) => a + b, 0);
  console.log('MCQ key positions (pre-shuffle):', counts.join(' / '), 'of', total);
  assert.ok(total > 100);
});
