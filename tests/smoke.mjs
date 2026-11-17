// Browser smoke test: plays through every screen of dist/reason-lah.html and fails on console errors.
//   npm run build && npm run smoke -- [screenshot-dir]
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// CommonJS require so a globally installed Playwright (NODE_PATH) is found too.
const { chromium } = createRequire(import.meta.url)('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shots = process.argv[2];
if (shots) fs.mkdirSync(shots, { recursive: true });
const url = 'file://' + path.join(root, 'dist/reason-lah.html');

const errors = [];
const browser = await chromium.launch();
async function run(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(name + ': ' + m.text()); });
  page.on('pageerror', e => errors.push(name + ': ' + e.message));
  const snap = async (label) => { if (shots) await page.screenshot({ path: path.join(shots, `${name}-${label}.png`), fullPage: label !== 'title' }); };
  const click = (sel) => page.locator(sel).first().click();
  await page.goto(url);
  await page.waitForTimeout(400);
  await snap('title');
  await click('[data-act="new-game"]');
  await snap('pick');
  await click('[data-act="choose"][data-id="aisyah"]');
  await page.waitForTimeout(900);
  await snap('hub');
  await click('[data-act="lesson"]');
  await snap('lesson');
  await click('[data-act="card"][data-learn]');
  await click('[data-act="enter"]');
  await click('[data-act="train"]');
  await snap('train');
  const tf = page.locator('[data-act="tf"]');
  if (await tf.count()) {
    const n = await tf.count();
    for (let i = 0; i < n; i += 2) await tf.nth(i).click();
    await click('[data-act="check"]');
  } else {
    await click('[data-act="pick"]');
  }
  await page.waitForTimeout(200);
  await snap('train-feedback');
  await click('[data-act="quit-train"]');
  await click('[data-act="lightning"]');
  await click('[data-act="lt-go"]');
  for (let i = 0; i < 4; i++) await click('[data-act="lt"][data-v="' + (i % 2) + '"]');
  await snap('lightning');
  await click('[data-act="enter"]');
  await click('[data-act="test"]');
  await click('[data-act="begin-test"]');
  for (let i = 0; i < 10; i++) {
    const opts = page.locator('.q-card [data-act="pick"]');
    if (await opts.count()) await opts.first().click();
    else { const b = page.locator('.q-card [data-act="tf"][data-v="1"]'); const n = await b.count(); for (let j = 0; j < n; j++) await b.nth(j).click(); }
    if (i === 2) { await click('[data-act="flag"]'); await snap('exam'); }
    if (i < 9) await click('[data-act="goto"]:has-text("Next")');
  }
  await click('.exam-tools [data-act="submit"]');
  await snap('submit');
  await click('[data-act="do-submit"]');
  await page.waitForTimeout(200);
  await snap('report');
  await click('[data-act="toggle-review"]');
  await click('.report [data-act="go"][data-view="map"]');
  await snap('map');
  await click('[data-act="go"][data-view="library"]');
  await snap('library');
  await click('[data-act="go"][data-view="map"]');
  await click('[data-act="go"][data-view="settings"]');
  await click('[data-act="toggle-unlock"]');
  await click('[data-act="go"][data-view="map"]');
  await click('.map-tools [data-view="finalHub"]');
  await snap('final-hub');
  await click('[data-act="final"][data-count="15"]');
  await click('[data-act="begin-final"]');
  await click('[data-act="notes"]');
  await snap('notes');
  await click('[data-act="close-overlay"]');
  await click('.exam-tools [data-act="submit"]');
  await click('[data-act="do-submit"]');
  await click('[data-act="go"][data-view="map"]');
  await click('[data-act="go"][data-view="notebook"]');
  await snap('notebook');
  await click('[data-act="nb-train"]');
  await snap('nb-train');
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  if (width > viewport.width + 1) errors.push(`${name}: page scrolls sideways (${width}px > ${viewport.width}px)`);
  await page.close();
}
await run('desktop', { width: 1280, height: 860 });
await run('phone', { width: 390, height: 844 });
await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('smoke ok' + (shots ? ' · screenshots in ' + shots : ''));
