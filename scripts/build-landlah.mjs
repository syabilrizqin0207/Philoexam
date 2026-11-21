// Bundle Land Lah! into one self-contained HTML file.
//   node scripts/build-landlah.mjs                 -> dist/land-lah.html (open it in any browser, works offline)
//   node scripts/build-landlah.mjs --artifact out  -> also writes a body-only page for publishing as a claude.ai artifact
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = path.join(repo, 'landlah');
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const between = (a, b) => {
  const i = html.indexOf(a), j = html.indexOf(b);
  if (i < 0 || j < 0) throw new Error('marker missing: ' + a);
  return html.slice(i + a.length, j).trim();
};
const head = between('<!-- APP:HEAD:START -->', '<!-- APP:HEAD:END -->');
const body = between('<!-- APP:BODY:START -->', '<!-- APP:BODY:END -->');
const scriptBlock = between('<!-- APP:SCRIPTS:START -->', '<!-- APP:SCRIPTS:END -->');
const srcs = [...scriptBlock.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
const js = srcs.map(s => `/* ${s} */\n` + fs.readFileSync(path.join(app, s), 'utf8')).join('\n').replace(/<\/script/gi, '<\\/script');
const css = fs.readFileSync(path.join(app, 'css/style.css'), 'utf8');

const inner = `${head}\n<style>\n${css}\n</style>\n${body}\n<script>\n${js}\n</script>\n`;
const standalone = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}\n<style>\n${css}\n</style>\n</head>\n<body>\n${body}\n<script>\n${js}\n</script>\n</body>\n</html>\n`;

fs.mkdirSync(path.join(repo, 'dist'), { recursive: true });
fs.writeFileSync(path.join(repo, 'dist/land-lah.html'), standalone);
console.log('wrote dist/land-lah.html', (standalone.length / 1024).toFixed(1) + ' KB');

const k = process.argv.indexOf('--artifact');
if (k > 0 && process.argv[k + 1]) {
  fs.writeFileSync(process.argv[k + 1], inner);
  console.log('wrote', process.argv[k + 1], (inner.length / 1024).toFixed(1) + ' KB');
}
