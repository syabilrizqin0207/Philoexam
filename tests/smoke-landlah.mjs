// Browser smoke test for dist/land-lah.html: plays through every screen and fails on console errors.
//   npm run build:land && npm run smoke:land -- [screenshot-dir]
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });
const url = 'file://' + path.join(root, 'dist/land-lah.html');
const errors = [];
const browser = await chromium.launch();

async function run(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_/.test(m.text())) errors.push(name + ': ' + m.text()); });
  page.on('pageerror', e => errors.push(name + ': ' + e.message));
  const snap = async (label, full = true) => { if (shots) await page.screenshot({ path: path.join(shots, `${name}-${label}.png`), fullPage: full }); };
  const click = (sel) => page.locator(sel).first().click();
  const answerAll = async (n) => {
    for (let i = 0; i < n; i++) {
      await page.locator('.q-card [data-act="pick"]').nth(i % 4).click();
      if (i < n - 1) await click('[data-act="goto"]:has-text("Next")');
    }
  };
  await page.goto(url);
  await page.waitForTimeout(300);
  await snap('title', false);
  await click('[data-act="new-game"]');
  await snap('pick');
  await click('[data-act="choose"][data-id="devi"]');
  await snap('map');
  await click('[data-act="enter"][data-n="9"]');
  await page.waitForTimeout(400);
  await snap('lot');
  // the video lesson: the recorded natural voice drives the captions, then a quick check, the end card, the checkpoint quiz
  await click('.act[data-act="watch"]');
  if ((await page.$eval('#v-voice', el => el.value)) !== 'natural') errors.push(name + ': lesson does not default to the natural voice');
  const cap0 = await page.textContent('.vs-cap-text');
  await page.locator('.vs-big').click({ force: true });
  await page.waitForFunction(c => document.querySelector('.vs-cap-text').textContent !== c, cap0, { timeout: 30000 }).catch(() => errors.push(name + ': natural voice never reached the second line'));
  if ((await page.$eval('#v-voice', el => el.value)) !== 'natural') errors.push(name + ': natural voice fell back to ' + (await page.$eval('#v-voice', el => el.value)));
  await page.selectOption('#v-voice', 'captions');
  await page.selectOption('#v-rate', '1.5');
  if (await page.locator('.vs-big').isVisible()) await page.locator('.vs-big').click({ force: true }); // already playing after the voice check
  await page.waitForTimeout(400);
  await snap('watch', false);
  const segs = page.locator('.vseg');
  const quizAt = await page.$$eval('.vseg', els => els.findIndex(e => e.classList.contains('vseg-quiz')));
  await segs.nth(quizAt).click();
  await page.waitForSelector('.vplayer.is-quiz', { timeout: 20000 });
  await page.keyboard.press('t');
  await page.waitForSelector('.vq-res:not([hidden])');
  await snap('watch-quiz', false);
  const flowAt = await page.$$eval('.vseg', els => els.findIndex(e => e.classList.contains('vseg-flow')));
  if (flowAt >= 0) { await segs.nth(flowAt).click(); await page.waitForTimeout(1200); await snap('watch-flow', false); }
  await segs.nth((await segs.count()) - 1).click();
  await page.waitForSelector('#vs-end:not([hidden])', { timeout: 60000 });
  await snap('watch-end', false);
  await click('[data-act="checkpoint"]');
  for (let i = 0; i < 5; i++) { await click('.q-card [data-act="pick"]'); await click('[data-act="next"]'); }
  if (!(await page.locator('[data-act="test"]').count())) errors.push(name + ': checkpoint summary does not offer the graded test');
  await snap('checkpoint');
  await click('[data-act="enter"]');
  if (!(await page.locator('.act[data-act="watch"] .act-sub:has-text("watched")').count())) errors.push(name + ': lot hub does not show the lesson as watched');
  await click('[data-act="lesson"]');
  await click('[data-act="card"][data-learn]');
  await snap('lesson');
  await click('[data-act="enter"]');
  await click('[data-act="train"]');
  await click('.q-card [data-act="pick"]');
  await snap('train-feedback');
  await click('[data-act="quit-train"]');
  await click('[data-act="lightning"]');
  await click('[data-act="lt-go"]');
  for (let i = 0; i < 4; i++) await click('[data-act="lt"][data-v="' + (i % 2) + '"]');
  await click('[data-act="enter"]');
  await click('[data-act="test"]');
  await click('[data-act="begin-test"]');
  await answerAll(10);
  await snap('exam');
  await click('[data-act="submit"]');
  await click('[data-act="do-submit"]');
  if (!(await page.locator('.auto-sheet').count())) errors.push(name + ': report has no cheat-sheet panel');
  await snap('report');
  await click('[data-act="toggle-review"]');
  // a case drill
  await click('[data-act="lot-cases"]');
  await snap('cases');
  await click('[data-act="open-case"][data-id="punggol"]');
  await click('[data-act="begin-case"]');
  await click('[data-act="ilac"]');
  await page.fill('#ans', 'Issue. Whether Marcus and Mr Lee formed a binding contract.\nLaw. Norwest v Newport Mining: subject to contract creates a strong presumption. OCBC v Wong Hua Choon: all the circumstances. s 6(d) Civil Law Act requires signed writing.\nApplication. Here the OTP was never sent and the $1,000 goodwill payment is not an option fee.\nConclusion. No contract. Marcus should not lodge a caveat (s 115; s 128) and should recover the $1,000.');
  await snap('casework');
  await click('[data-act="case-submit"]');
  await click('[data-act="do-case-submit"]');
  await snap('mark');
  await click('[data-act="award"]');
  // full mock
  await click('#btn-home');
  await click('[data-act="go"][data-view="hall"]');
  await snap('hall');
  await click('[data-act="mock-full"][data-id="m1"]');
  await click('[data-act="begin-mock"]');
  await answerAll(20);
  await snap('mock-a');
  await click('[data-act="mock-tab"][data-tab="B"]');
  await page.fill('#ans', 'Issue. Covenants: privity of contract between Mrs Leong and Gabby. Positive covenants do not run (Austerberry; Rhone v Stephens); Tulk v Moxhay for the negative covenant. Mortgage: Fairclough, Knightsbridge, Kreglinger; s 75 LTA notice; s 23 CLPA lease up to 3 years binds under s 89. Lease: Street v Mountford exclusive possession; fixed term; s 18 notice; s 18A; nuisance. Conclusion for Mrs Leong, Gabby, Bestbank and the students.');
  await snap('mock-b');
  await click('[data-act="submit"]');
  await click('[data-act="do-submit"]');
  await snap('mock-mark');
  await click('#btn-home');
  await click('[data-act="go"][data-view="notebook"]');
  await snap('notebook');
  await click('[data-act="go"][data-view="mysheet"]');
  if ((await page.locator('.sheet-cards .cs-card').count()) < 1) errors.push(name + ': my cheat sheet has no concept cards');
  await snap('mysheet');
  await click('[data-act="mysheet-drill"]');
  await click('.q-card [data-act="pick"]');
  if (!(await page.locator('.auto-note').count()) && !(await page.locator('.v-ok').count())) errors.push(name + ': no cheat-sheet note after an answer');
  await snap('drill');
  await click('[data-act="quit-train"]');
  await click('[data-act="mysheet-learn"]');
  await click('#btn-home');
  await click('[data-act="go"][data-view="cheats"]');
  await page.waitForTimeout(200);
  await snap('cheats');
  await click('[data-act="cheat-all"]');
  await click('#btn-home');
  await click('[data-act="go"][data-view="plan"]');
  await click('[data-act="plan-tick"]');
  await snap('plan');
  await click('#btn-home');
  await click('[data-act="go"][data-view="library"]');
  await page.fill('#lib-q', 'mountford');
  await snap('library');
  await click('#btn-home');
  await click('[data-act="go"][data-view="settings"]');
  await snap('settings');
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  if (width > viewport.width + 1) errors.push(`${name}: page scrolls sideways (${width}px > ${viewport.width}px)`);
  await page.close();
}

await run('desktop', { width: 1280, height: 860 });
await run('phone', { width: 390, height: 844 });
await browser.close();
if (errors.length) { console.error('Smoke test failed:\n' + errors.join('\n')); process.exit(1); }
console.log('Smoke test passed: every screen rendered without console errors, at desktop and phone widths.');
