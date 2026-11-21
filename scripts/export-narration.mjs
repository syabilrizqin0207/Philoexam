// Writes every narrated line of the video lessons (plus quick-check feedback) as JSON, for recording the voice track.
//   node scripts/export-narration.mjs > narration.json
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'landlah');
const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
const ctx = { console, document: { createElement: () => ({}) } };
ctx.window = ctx;
vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"><\/script>/g)) {
  if (/ui\.js$|voice\.js$/.test(m[1])) continue;
  vm.runInContext(fs.readFileSync(path.join(app, m[1]), 'utf8'), ctx, { filename: m[1] });
}
const LL = ctx.LL, out = {};
for (const ch of LL.chapters) {
  const v = LL.videos[ch.n], lines = LL.videoLines(v);
  out[ch.n] = {
    lines: lines.map(l => ({ g: l.g, si: l.si, text: l.text })),
    fb: v.scenes.filter(s => s.t === 'quiz').flatMap(s => [true, false].map(right => LL.quizFeedback(s._q, right)))
  };
}
process.stdout.write(JSON.stringify(out, null, 1));
