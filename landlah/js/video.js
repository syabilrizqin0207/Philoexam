/* Land Lah! — narrated, animated video lessons.
   A lesson is a list of scenes. Each scene has narration lines (`say`) and visuals that appear as the lines are
   spoken. The narrator speaks in a Claude voice where the artifact viewer offers it, otherwise in the device's own
   voice (speechSynthesis), otherwise it runs timed captions. Quick-check scenes pause the video until you answer. */
(function (root) {
  'use strict';
  var LL = root.LL, U = LL.util, esc = U.esc;
  LL.videos = {};
  LL.video = function (n, def) { def.n = n; LL.videos[n] = def; };

  /* ---------- flattening a script into narration lines ---------- */
  function quizItem(n, s) {
    var ch = LL.getChapter(n), it = s.qi != null && ch ? ch.quick[s.qi] : null;
    return it ? { text: it[0], a: it[1], why: it[2] } : (s.text ? { text: s.text, a: s.a, why: s.why || '' } : null);
  }
  LL.videoLines = function (v) {
    var lines = [];
    v.scenes.forEach(function (s, si) {
      var say = s.say || [];
      if (s.t === 'quiz') { var q = quizItem(v.n, s); say = (s.say || ['Quick check. True or false?']).concat(q ? [q.text] : []); s._q = q; }
      say.forEach(function (text, li) { lines.push({ g: lines.length, si: si, li: li, text: text, stop: s.t === 'quiz' && li === say.length - 1 }); });
    });
    return lines;
  };
  LL.videoMinutes = function (v) {
    var w = 0; LL.videoLines(v).forEach(function (l) { w += U.words(l.text); });
    return Math.max(1, Math.round(w / 150 + v.scenes.length * 0.05));
  };

  /* ---------- narrator backends ---------- */
  function estimateMs(text, rate) { return Math.max(1800, U.words(text) / 2.6 * 1000) / (rate || 1); }

  function TimerVoice() {
    var timer = null, token = 0, cur = null;
    return {
      name: 'captions',
      speak: function (lines, rate, hooks) {
        var my = ++token, i = 0;
        function step() {
          if (my !== token) return;
          if (i >= lines.length) { hooks.done(); return; }
          cur = { lines: lines, i: i, rate: rate, hooks: hooks };
          hooks.line(lines[i]);
          var d = estimateMs(lines[i].text, rate); i++;
          timer = setTimeout(step, d);
        }
        step();
      },
      pause: function () { token++; clearTimeout(timer); },
      resume: function () { if (cur) this.speak(cur.lines.slice(cur.i), cur.rate, cur.hooks); },
      stop: function () { token++; clearTimeout(timer); cur = null; },
      setRate: function () { /* applies to the next line */ }
    };
  }

  function DeviceVoice() {
    var synth = root.speechSynthesis, token = 0, cur = null, watchdog = null, voice = null;
    function pickVoice() {
      var vs = synth.getVoices() || [], en = vs.filter(function (v) { return /^en/i.test(v.lang); });
      var pref = ['en-SG', 'en-GB', 'en-AU', 'en-US'];
      var nice = en.filter(function (v) { return /natural|neural|google|samantha|daniel|serena|karen|libby|sonia/i.test(v.name); });
      for (var p = 0; p < pref.length && !voice; p++) voice = (nice.filter(function (v) { return v.lang.replace('_', '-') === pref[p]; })[0]) || null;
      voice = voice || nice[0] || en[0] || vs[0] || null;
    }
    return {
      name: 'device',
      ok: function () { return !!(synth && root.SpeechSynthesisUtterance); },
      speak: function (lines, rate, hooks) {
        var my = ++token, i = 0;
        if (!voice) pickVoice();
        try { synth.cancel(); } catch (e) { /* ignore */ }
        function step() {
          if (my !== token) return;
          clearTimeout(watchdog);
          if (i >= lines.length) { hooks.done(); return; }
          var line = lines[i], u = new root.SpeechSynthesisUtterance(line.text);
          cur = { lines: lines, i: i, rate: rate, hooks: hooks };
          if (voice) u.voice = voice;
          u.rate = rate || 1; u.lang = voice ? voice.lang : 'en-GB';
          var advanced = false, started = false, t0 = Date.now(), next = function () { if (advanced || my !== token) return; advanced = true; i++; step(); };
          u.onstart = function () { started = true; };
          /* some engines "finish" without making a sound; if a line ends far too fast, hand over to captions */
          u.onend = function () {
            if (!advanced && my === token && hooks.fail && U.words(line.text) > 4 && Date.now() - t0 < estimateMs(line.text, rate) * 0.25) { advanced = true; token++; hooks.fail(lines.slice(i)); return; }
            next();
          }; u.onerror = function (ev) { if (advanced || my !== token) return; if (!started && hooks.fail && !/interrupted|canceled/.test((ev && ev.error) || '')) { advanced = true; token++; hooks.fail(lines.slice(i)); return; } next(); };
          hooks.line(line);
          var limit = estimateMs(line.text, rate);
          setTimeout(function () { if (my === token && !started && !advanced && hooks.fail) { token++; try { synth.cancel(); } catch (e) { /* ignore */ } hooks.fail(lines.slice(i)); } }, 3500);
          watchdog = setTimeout(function () { try { synth.cancel(); } catch (e) { /* ignore */ } next(); }, limit * 1.8 + 3000);
          try { synth.speak(u); } catch (e) { next(); }
        }
        step();
      },
      pause: function () { token++; clearTimeout(watchdog); try { synth.cancel(); } catch (e) { /* ignore */ } },
      resume: function () { if (cur) this.speak(cur.lines.slice(cur.i), cur.rate, cur.hooks); },
      stop: function () { token++; clearTimeout(watchdog); cur = null; try { synth.cancel(); } catch (e) { /* ignore */ } },
      setRate: function () { /* applies to the next line */ }
    };
  }

  function ClaudeVoice(tts) {
    var token = 0, cur = null, unsub = null, onFail = null, lastIdx = 0;
    return {
      name: 'claude',
      failed: function (cb) { onFail = cb; },
      speak: function (lines, rate, hooks) {
        var my = ++token, byId = {};
        lines.forEach(function (l, k) { byId['l' + k] = l; });
        cur = { lines: lines, rate: rate, hooks: hooks };
        if (unsub) { try { unsub(); } catch (e) { /* ignore */ } }
        unsub = tts.onLine(function (e) {
          if (my !== token) return;
          var l = byId[e.id]; if (!l) return;
          lastIdx = lines.indexOf(l); hooks.line(l);
        });
        lastIdx = 0;
        tts.speak(lines.map(function (l, k) { return { text: l.text, id: 'l' + k }; }), { rate: rate || 1, language: 'en' }).then(function () {
          if (my === token) hooks.done();
        }, function (err) {
          if (my !== token) return;
          var code = err && err.code, reason = err && err.reason;
          if (code === 'stopped' && (reason === 'viewer_stopped' || reason === 'hidden' || reason === 'interrupted' || reason === 'time_limit')) { hooks.paused(lines.slice(lastIdx)); return; }
          if (code === 'stopped') return;
          if (onFail) onFail(code, lines.slice(lastIdx));
        });
      },
      pause: function () { try { tts.pause().catch(function () { /* ignore */ }); } catch (e) { /* ignore */ } },
      resume: function () { try { tts.resume().catch(function () { /* ignore */ }); } catch (e) { /* ignore */ } },
      stop: function () { token++; try { tts.stop().catch(function () { /* ignore */ }); } catch (e) { /* ignore */ } },
      setRate: function (r) { try { tts.setRate(r).catch(function () { /* ignore */ }); } catch (e) { /* ignore */ } }
    };
  }

  /* ---------- scene rendering ---------- */
  function iconC(name, scale, cls) { return '<canvas class="' + (cls || '') + '" data-icon="' + name + '" data-scale="' + (scale || 3) + '" aria-hidden="true"></canvas>'; }
  function lead(s, n) { return s.lead != null ? s.lead : ((s.say || []).length > n ? 1 : 0); }
  function at(s, i, n) { return Math.min(i + lead(s, n), Math.max(0, (s.say || []).length - 1)); }
  function rv(k, cls) { return ' class="rv ' + (cls || '') + '" data-at="' + k + '"'; }

  LL.sceneHTML = function (v, s, si) {
    var ch = LL.getChapter(v.n) || {}, h = '';
    var head = s.head ? '<div class="vs-head"><span class="stn-code">' + esc(ch.code || 'LOT') + '</span><h3>' + esc(s.head) + '</h3></div>' : '';
    switch (s.t) {
      case 'title':
        h = '<div class="vs vs-title"><div class="vt-icon">' + iconC(ch.icon || 'house', 9) + '</div><div class="vt-text"><span class="vt-code">' + esc(ch.code || '') + ' · ' + esc(ch.lec || '') + '</span>' +
          '<h2 class="vt-title" data-text="' + esc(v.title || ch.title) + '">' + esc(v.title || ch.title) + '</h2><p class="vt-sub">' + esc(v.sub || ch.place || '') + '</p></div></div>';
        break;
      case 'talk': case 'recap':
        h = '<div class="vs vs-list' + (s.t === 'recap' ? ' vs-recap' : '') + '">' + head + '<ul class="vl">' + (s.points || []).map(function (p, i) {
          return '<li' + rv(at(s, i, s.points.length)) + '><span class="vl-dot">' + (s.t === 'recap' ? '✓' : '▸') + '</span><span>' + esc(p) + '</span></li>';
        }).join('') + '</ul></div>';
        break;
      case 'steps':
        h = '<div class="vs vs-steps">' + head + '<ol class="vst">' + (s.steps || []).map(function (p, i) {
          return '<li' + rv(at(s, i, s.steps.length)) + '><span class="vst-n">' + (i + 1) + '</span><span>' + esc(p) + '</span></li>';
        }).join('') + '</ol></div>';
        break;
      case 'compare':
        h = '<div class="vs vs-cmp">' + head + '<div class="vc"><div class="vc-h vc-l">' + esc(s.left) + '</div><div class="vc-h vc-r">' + esc(s.right) + '</div>' +
          (s.rows || []).map(function (r, i) { var k = at(s, i, s.rows.length); return '<div' + rv(k, 'vc-c vc-l') + '>' + esc(r[0]) + '</div><div' + rv(k, 'vc-c vc-r') + '>' + esc(r[1]) + '</div>'; }).join('') + '</div></div>';
        break;
      case 'case':
        h = '<div class="vs vs-case">' + head + '<div class="vcase"><span class="vcase-tag">CASE</span><h4 class="vcase-name">' + esc(s.name) + '</h4>' +
          '<p' + rv(s.at ? s.at[0] : 1) + '><b>Facts.</b> ' + esc(s.facts) + '</p>' +
          '<p' + rv(s.at ? s.at[1] : 2, 'vcase-held') + '><span class="vstamp">HELD</span> ' + esc(s.held) + '</p>' +
          (s.cite ? '<p' + rv(s.at ? s.at[2] : Math.min(3, (s.say || []).length - 1), 'vcase-cite') + '><b>Cite it for:</b> ' + esc(s.cite) + '</p>' : '') + '</div></div>';
        break;
      case 'trap':
        h = '<div class="vs vs-trap"><div class="vtrap-band"></div><div class="vtrap"><span class="vtrap-word">TRAP!</span><p>' + esc(s.text) + '</p></div><div class="vtrap-band"></div></div>';
        break;
      case 'number':
        h = '<div class="vs vs-num">' + head + '<div class="vnum">' + esc(s.big) + '</div><p class="vnum-l">' + esc(s.label) + '</p></div>';
        break;
      case 'flow':
        h = '<div class="vs vs-flow">' + head + '<div class="vf" data-si="' + si + '"><svg class="vf-svg" aria-hidden="true"><defs><marker id="vfa' + si + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs></svg>' +
          (s.nodes || []).map(function (nd) {
            return '<div' + rv(nd.at || 0, 'vf-node' + (nd.tone ? ' t-' + nd.tone : '')) + ' data-id="' + esc(nd.id) + '" style="left:' + nd.x + '%;top:' + nd.y + '%">' + (nd.icon ? iconC(nd.icon, 3) : '') + '<b>' + esc(nd.label) + '</b>' + (nd.sub ? '<small>' + esc(nd.sub) + '</small>' : '') + '</div>';
          }).join('') +
          (s.links || []).map(function (lk, k) { return '<span' + rv(lk.at || 0, 'vf-lab' + (lk.tone ? ' t-' + lk.tone : '')) + ' data-k="' + k + '">' + esc(lk.label || '') + '</span>'; }).join('') + '</div></div>';
        break;
      case 'quiz':
        var q = s._q || {};
        h = '<div class="vs vs-quiz"><span class="vq-tag">QUICK CHECK</span><p class="vq-text">' + esc(q.text || '') + '</p>' +
          '<div class="vq-btns"><button type="button" class="btn btn-big lt-t" data-act="vq" data-v="1">TRUE</button><button type="button" class="btn btn-big lt-f" data-act="vq" data-v="0">FALSE</button></div>' +
          '<div class="vq-res" hidden></div></div>';
        break;
      default:
        h = '<div class="vs">' + head + '</div>';
    }
    return h;
  };

  /* Draw the arrows of a flow scene in pixels, from box edge to box edge. */
  LL.drawFlow = function (stage, s, si) {
    var box = stage.querySelector('.vf'); if (!box) return;
    /* portrait screens: turn the diagram on its side so the boxes stack instead of squeezing */
    var tall = stage.clientWidth < 520, defs = {};
    (s.nodes || []).forEach(function (nd) { defs[nd.id] = nd; });
    box.classList.toggle('vf-tall', tall);
    Array.prototype.forEach.call(box.querySelectorAll('.vf-node'), function (el) {
      var nd = defs[el.getAttribute('data-id')]; if (!nd) return;
      el.style.left = (tall ? nd.y : nd.x) + '%'; el.style.top = (tall ? nd.x : nd.y) + '%';
    });
    var svg = box.querySelector('svg'), W = box.clientWidth, H = box.clientHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('width', W); svg.setAttribute('height', H);
    Array.prototype.forEach.call(svg.querySelectorAll('.vf-line'), function (p) { p.remove(); });
    var bRect = box.getBoundingClientRect(), nodes = {};
    Array.prototype.forEach.call(box.querySelectorAll('.vf-node'), function (el) {
      var r = el.getBoundingClientRect();
      nodes[el.getAttribute('data-id')] = { x: r.left - bRect.left + r.width / 2, y: r.top - bRect.top + r.height / 2, hw: r.width / 2 + 6, hh: r.height / 2 + 6 };
    });
    (s.links || []).forEach(function (lk, k) {
      var a = nodes[lk.from], b = nodes[lk.to]; if (!a || !b) return;
      var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
      var rev = (s.links || []).some(function (o) { return o.from === lk.to && o.to === lk.from; });
      var off = rev ? 9 : 0, px = -uy * off, py = ux * off;
      var ta = Math.min(a.hw / Math.abs(ux || 1e-6), a.hh / Math.abs(uy || 1e-6)), tb = Math.min(b.hw / Math.abs(ux || 1e-6), b.hh / Math.abs(uy || 1e-6));
      var x1 = a.x + ux * ta + px, y1 = a.y + uy * ta + py, x2 = b.x - ux * tb + px, y2 = b.y - uy * tb + py;
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', 'M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' L' + x2.toFixed(1) + ',' + y2.toFixed(1));
      p.setAttribute('class', 'vf-line rv' + (lk.tone ? ' t-' + lk.tone : '') + (lk.dash ? ' dash' : ''));
      p.setAttribute('data-at', lk.at || 0);
      p.setAttribute('marker-end', 'url(#vfa' + si + ')');
      var L = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      p.style.setProperty('--len', L.toFixed(0));
      svg.appendChild(p);
      var lab = box.querySelector('.vf-lab[data-k="' + k + '"]');
      if (lab) {
        /* sit the label beside the arrow, not on it: push it out along the normal, away from the box centre */
        var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = -uy, ny = ux, cx = W / 2, cy = H / 2;
        if (!rev && (mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; }
        var push = Math.abs(ny) * (lab.offsetHeight / 2 + 6) + Math.abs(nx) * (lab.offsetWidth / 2 + 6);
        var lw = lab.offsetWidth / 2 + 2, lh = lab.offsetHeight / 2 + 2;
        var lx = Math.max(lw, Math.min(W - lw, mx + nx * push)), ly = Math.max(lh, Math.min(H - lh, my + ny * push));
        lab.style.left = (lx / W * 100) + '%'; lab.style.top = (ly / H * 100) + '%';
      }
    });
  };

  /* ---------- Claude-written explainer for one cheat-sheet concept ---------- */
  LL.explainerPrompt = function (c) {
    var lines = ['CONCEPT: ' + c.name + ' (Lot ' + c.ch + ')'];
    c.traps.forEach(function (k) { lines.push('Trap: ' + LL.TRAPS[k].text); });
    if (c.rule) lines.push('Rule from the notes: ' + c.rule[0] + ': ' + c.rule[1]);
    c.items.slice(0, 5).forEach(function (it) { if (it.list) it.list.forEach(function (x) { lines.push('Point: ' + x); }); else lines.push('Point: ' + it.t + (it.why ? ' (' + it.why + ')' : '')); });
    c.auths.forEach(function (a) { lines.push('Authority: ' + a.name + ': ' + a.cite + '. Held: ' + a.held); });
    return [
      'You are a friendly Singapore law tutor making a short narrated explainer video for a student revising NUS RE2702 Land Law. They keep getting this concept wrong.',
      'Use ONLY the material below. Do not add cases, sections or rules that are not in it. Keep any [check] marks out of the narration.',
      '', lines.join('\n'), '',
      'Reply with JSON only, in this shape:',
      '{"title":"3-6 words","scenes":[',
      ' {"t":"talk","head":"short heading","points":["2-4 short bullets"],"say":["an intro line","one line per bullet"]},',
      ' {"t":"steps","head":"...","steps":["2-4 steps"],"say":["intro","one line per step"]},',
      ' {"t":"compare","head":"...","left":"column title","right":"column title","rows":[["left","right"]],"say":["intro","one line per row"]},',
      ' {"t":"trap","text":"the trap in one sentence","say":["one line"]},',
      ' {"t":"recap","points":["2-4 bullets"],"say":["intro","one line per bullet"]}',
      ']}',
      'Use 3 to 5 scenes, in any order that teaches well, and end with a recap. Narration lines are spoken aloud: under 30 words each, plain words, "section" not "s", "versus" not "v". Bullets and table cells: under 12 words.'
    ].join('\n');
  };
  var KINDS = { talk: 'points', steps: 'steps', compare: 'rows', trap: null, recap: 'points' };
  function str(x, n) { return typeof x === 'string' && x.trim() ? x.trim().slice(0, n) : null; }
  LL.validateVideo = function (d, ch) {
    if (!d || !Array.isArray(d.scenes)) return null;
    var scenes = [];
    d.scenes.slice(0, 6).forEach(function (s) {
      if (!s || !Object.prototype.hasOwnProperty.call(KINDS, s.t)) return;
      var say = (Array.isArray(s.say) ? s.say : []).map(function (x) { return str(x, 320); }).filter(Boolean).slice(0, 6);
      if (!say.length) return;
      var out = { t: s.t, say: say, head: str(s.head, 60) || undefined };
      if (s.t === 'trap') { out.text = str(s.text, 220); if (!out.text) return; }
      else if (s.t === 'compare') {
        out.left = str(s.left, 40) || 'Yes'; out.right = str(s.right, 40) || 'No';
        out.rows = (Array.isArray(s.rows) ? s.rows : []).filter(Array.isArray).slice(0, 4).map(function (r) { return [str(r[0], 140) || '', str(r[1], 140) || '']; });
        if (!out.rows.length) return;
      } else {
        var key = KINDS[s.t], arr = (Array.isArray(s[key]) ? s[key] : []).map(function (x) { return str(x, 140); }).filter(Boolean).slice(0, 5);
        if (!arr.length) return; out[key] = arr;
      }
      scenes.push(out);
    });
    if (scenes.length < 2) return null;
    return { n: ch, custom: true, title: str(d.title, 60) || 'Explainer', scenes: [{ t: 'title', say: ['Let\'s fix one concept you keep missing: ' + (str(d.title, 60) || 'this one') + '.'] }].concat(scenes) };
  };

  /* ---------- the player ---------- */
  LL.Player = function (opts) {
    var v = opts.video, root = opts.root, stage = root.querySelector('.vstage-scene'), cap = root.querySelector('.vs-cap-text');
    var lines = LL.videoLines(v), P = this;
    var state = 'ready', held = false, voice = null, mode = opts.mode || 'captions', rate = opts.rate || 1, idx = 0, sceneIdx = -1, li = -1;
    var quiz = { right: 0, total: 0, answered: {} }, pending = null;
    P.lines = lines;

    function backend(m) {
      if (m === 'claude' && opts.tts) { var c = ClaudeVoice(opts.tts); c.failed(function (code, rest) { opts.onNotice && opts.onNotice('Claude\'s voice is unavailable just now (' + code + '). Switching to your device\'s voice.'); setMode(DeviceVoice().ok() ? 'device' : 'captions'); play(rest.length ? rest[0].g : idx); }); return c; }
      if (m === 'device') { var d = DeviceVoice(); if (d.ok()) return d; }
      return TimerVoice();
    }
    function setMode(m) { if (voice) voice.stop(); mode = m; voice = backend(m); if (opts.onMode) opts.onMode(voice.name); }
    P.setMode = function (m) { var was = state === 'playing'; setMode(m); if (was) play(idx); else if (opts.onState) opts.onState(state); };
    P.mode = function () { return voice ? voice.name : mode; };
    P.setRate = function (r) { rate = r; if (voice && voice.setRate) voice.setRate(r); };

    function show(si) {
      if (si === sceneIdx) return;
      sceneIdx = si; li = -1;
      var s = v.scenes[si];
      stage.classList.remove('in'); void stage.offsetWidth;
      stage.innerHTML = LL.sceneHTML(v, s, si);
      stage.classList.add('in');
      LL.px.hydrate(stage);
      if (s.t === 'flow') requestAnimationFrame(function () { LL.drawFlow(stage, s, si); reveal(li); });
      if (s.t === 'trap') LL.sfx.play('bad'); else if (si > 0) LL.sfx.play('whoosh');
      if (opts.onScene) opts.onScene(si);
    }
    function reveal(k) {
      Array.prototype.forEach.call(stage.querySelectorAll('.rv'), function (el) {
        var on = +el.getAttribute('data-at') <= k;
        if (on && !el.classList.contains('on')) { el.classList.add('on'); if (el.classList.contains('vcase-held')) LL.sfx.play('stamp'); }
      });
    }
    var hooks = {
      line: function (l) {
        if (l.g == null || l.g < 0) { cap.textContent = l.text; return; }
        idx = l.g; show(l.si); li = l.li; reveal(l.li);
        cap.textContent = l.text;
        root.classList.add('talking');
        if (opts.onProgress) opts.onProgress(idx, lines.length);
      },
      done: function () {
        root.classList.remove('talking');
        var l = lines[idx];
        if (l && l.stop && !quiz.answered[l.si]) { state = 'quiz'; if (opts.onState) opts.onState(state); return; }
        if (idx >= lines.length - 1) { state = 'ended'; if (opts.onState) opts.onState(state); if (opts.onEnd) opts.onEnd(quiz); return; }
        play(idx + 1);
      },
      fail: function (rest) {
        if (opts.onNotice) opts.onNotice('Your device\'s voice did not start, so the lesson continues with captions.');
        setMode('captions'); play(rest && rest[0] && rest[0].g >= 0 ? rest[0].g : idx);
      },
      paused: function (rest) { held = false; state = 'paused'; root.classList.remove('talking'); if (rest && rest[0] && rest[0].g >= 0) idx = rest[0].g; if (opts.onState) opts.onState(state); }
    };
    function segment(from) {
      var out = [];
      for (var i = from; i < lines.length; i++) { out.push(lines[i]); if (lines[i].stop && !quiz.answered[lines[i].si]) break; }
      return out;
    }
    function play(from, prefix) {
      clearTimeout(pending); pending = null;
      if (!voice) voice = backend(mode);
      voice.stop(); held = false;
      idx = Math.max(0, Math.min(from, lines.length - 1));
      var seg = (prefix || []).map(function (t) { return { g: -1, text: t }; }).concat(segment(idx));
      state = 'playing'; if (opts.onState) opts.onState(state);
      if (!seg.length) { hooks.done(); return; }
      voice.speak(seg, rate, hooks);
    }
    P.play = function () {
      if (state === 'paused' && held && voice && voice.name === 'claude') { held = false; voice.resume(); state = 'playing'; root.classList.add('talking'); if (opts.onState) opts.onState(state); return; }
      if (state === 'ended') { P.restart(); return; }
      if (state === 'quiz') return;
      play(idx);
    };
    P.pause = function () {
      if (state !== 'playing' || !voice) return;
      voice.pause(); held = true; state = 'paused'; root.classList.remove('talking'); if (opts.onState) opts.onState(state);
    };
    P.toggle = function () { if (state === 'playing') P.pause(); else P.play(); };
    P.stop = function () { clearTimeout(pending); pending = null; if (voice) voice.stop(); root.classList.remove('talking'); state = 'ready'; };
    P.restart = function () { quiz = { right: 0, total: 0, answered: {} }; sceneIdx = -1; play(0); };
    P.seekScene = function (si) {
      si = Math.max(0, Math.min(v.scenes.length - 1, si));
      var first = lines.filter(function (l) { return l.si === si; })[0];
      if (!first) return;
      show(si);
      play(first.g);
    };
    P.next = function () { P.seekScene(sceneIdx + 1); };
    P.prev = function () { P.seekScene(Math.max(0, sceneIdx - (li > 0 ? 0 : 1))); };
    P.scene = function () { return sceneIdx; };
    P.state = function () { return state; };
    P.answer = function (val) {
      var s = v.scenes[sceneIdx]; if (!s || s.t !== 'quiz' || quiz.answered[sceneIdx]) return;
      var q = s._q, right = q.a === val;
      quiz.answered[sceneIdx] = true; quiz.total++; if (right) quiz.right++;
      if (opts.onQuiz) opts.onQuiz(s, right);
      LL.sfx.play(right ? 'ok' : 'bad');
      Array.prototype.forEach.call(stage.querySelectorAll('[data-act="vq"]'), function (b) { b.disabled = true; if ((b.getAttribute('data-v') === '1') === q.a) b.classList.add('vq-right'); else if ((b.getAttribute('data-v') === '1') === val) b.classList.add('vq-wrong'); });
      var res = stage.querySelector('.vq-res');
      res.hidden = false; res.className = 'vq-res ' + (right ? 'ok' : 'no');
      res.innerHTML = '<b>' + (right ? 'Correct.' : 'Not quite: it is ' + (q.a ? 'TRUE' : 'FALSE') + '.') + '</b> ' + esc(q.why);
      var lastQuizLine = lines.filter(function (l) { return l.si === sceneIdx; }).pop();
      pending = setTimeout(function () { play(lastQuizLine.g + 1 < lines.length ? lastQuizLine.g + 1 : lastQuizLine.g, [(right ? 'Correct. ' : 'Not quite. It\'s ' + (q.a ? 'true. ' : 'false. ')) + q.why]); }, 350);
    };
    P.resize = function () { var s = v.scenes[sceneIdx]; if (s && s.t === 'flow') { LL.drawFlow(stage, s, sceneIdx); reveal(li); } };
    P.poster = function () { show(0); cap.textContent = lines[0] ? lines[0].text : ''; };
    setMode(mode);
  };
})(typeof window !== 'undefined' ? window : globalThis);
