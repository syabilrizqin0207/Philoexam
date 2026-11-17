/* Reason Lah! — core namespace, utilities, storage, sound, item helpers. */
(function (root) {
  'use strict';
  var RL = root.RL = root.RL || {};

  RL.EXAM_DATE = '2026-11-30T13:00:00+08:00';
  RL.chapters = [];
  RL.TRAPS = {};
  RL.ref = {};

  /* Register a chapter (called by js/content/chNN.js). */
  RL.chapter = function (c) {
    RL.chapters.push(c);
    RL.chapters.sort(function (a, b) { return a.n - b.n; });
  };
  RL.getChapter = function (n) {
    for (var i = 0; i < RL.chapters.length; i++) if (RL.chapters[i].n === n) return RL.chapters[i];
    return null;
  };
  RL.allQuestions = function () {
    var out = [];
    RL.chapters.forEach(function (c) { c.qs.forEach(function (q) { q.ch = c.n; out.push(q); }); });
    return out;
  };
  RL.findQuestion = function (id) {
    var all = RL.allQuestions();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  };

  /* ---------- utilities ---------- */
  var U = RL.util = {};
  U.rng = function (seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return (s >>> 0) / 4294967296;
    };
  };
  U.shuffle = function (arr, rand) {
    rand = rand || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  U.roman = function (i) { return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][i]; };
  U.letter = function (i) { return 'ABCDEFGHIJ'.charAt(i); };
  U.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  /* Tiny safe markup: escape, then **bold**, _italic_, line breaks, and "- " bullet lines. */
  U.md = function (s) {
    var lines = U.esc(s).split('\n');
    var html = '', inList = false;
    lines.forEach(function (ln) {
      var bullet = /^\s*-\s+/.test(ln);
      if (bullet && !inList) { html += '<ul>'; inList = true; }
      if (!bullet && inList) { html += '</ul>'; inList = false; }
      var body = ln.replace(/^\s*-\s+/, '')
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/(^|[\s(])_(.+?)_(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>');
      if (bullet) html += '<li>' + body + '</li>';
      else if (body.trim() === '') html += '<span class="gap"></span>';
      else html += '<p>' + body + '</p>';
    });
    if (inList) html += '</ul>';
    return html;
  };
  U.fmtTime = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    var mm = (h ? String(m).padStart(2, '0') : String(m));
    return (h ? h + ':' : '') + mm + ':' + String(s).padStart(2, '0');
  };
  U.daysToExam = function (now) {
    var t = new Date(RL.EXAM_DATE).getTime() - (now || Date.now());
    return t / 86400000;
  };
  U.pct = function (x) { return Math.round(x * 1000) / 10; };
  U.round2 = function (x) { return Math.round(x * 100) / 100; };

  /* ---------- items ---------- */
  /* Correct subset of statement indices for a set item. */
  RL.correctSet = function (q) {
    var out = [];
    q.s.forEach(function (st, i) { if (st[1]) out.push(i); });
    return out;
  };
  RL.sameSet = function (a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  };
  RL.comboLabel = function (subset, n) {
    var s = subset.slice().sort(function (a, b) { return a - b; });
    if (s.length === 0) return 'None of ' + U.roman(0) + ' to ' + U.roman(n - 1);
    var names = s.map(U.roman);
    if (s.length === n && n > 1) return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
    if (s.length === 1) return 'Only ' + names[0];
    return 'Only ' + names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  };
  /* Build combination options (A–D style) for a set item. Deterministic for a given seed. */
  RL.comboOptions = function (q, seed) {
    var n = q.s.length, correct = RL.correctSet(q);
    var opts;
    if (q.opts) {
      opts = q.opts.map(function (o) { return o.slice(); });
    } else {
      var rand = U.rng(seed || 7);
      var all = [];
      for (var m = 0; m < (1 << n); m++) {
        var sub = [];
        for (var k = 0; k < n; k++) if (m & (1 << k)) sub.push(k);
        if (!RL.sameSet(sub, correct)) all.push(sub);
      }
      /* Prefer near-miss distractors (differ by one statement): they test each statement. */
      var dist = function (sub) {
        var d = 0;
        for (var k = 0; k < n; k++) if ((sub.indexOf(k) >= 0) !== (correct.indexOf(k) >= 0)) d++;
        return d;
      };
      var near = U.shuffle(all.filter(function (s) { return dist(s) === 1; }), rand);
      var far = U.shuffle(all.filter(function (s) { return dist(s) > 1; }), rand);
      var want = n >= 3 ? 3 : Math.min(3, all.length);
      var picks = near.slice(0, Math.min(2, near.length));
      picks = picks.concat(far.slice(0, want - picks.length));
      if (picks.length < want) picks = picks.concat(near.slice(picks.length, want));
      opts = picks.concat([correct]);
      opts.sort(function (a, b) {
        if (a.length !== b.length) return a.length - b.length;
        for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
        return 0;
      });
      /* Put "none" last, as exam papers usually do. */
      var noneIdx = -1;
      opts.forEach(function (o, i) { if (o.length === 0) noneIdx = i; });
      if (noneIdx >= 0) { var none = opts.splice(noneIdx, 1)[0]; opts.push(none); }
    }
    var answer = -1;
    opts.forEach(function (o, i) { if (RL.sameSet(o, correct)) answer = i; });
    return {
      sets: opts,
      labels: opts.map(function (o) { return RL.comboLabel(o, n); }),
      answer: answer
    };
  };

  /* ---------- storage (per-viewer convenience; game works without it) ---------- */
  var KEY = 'reason-lah.save.v1';
  RL.store = {
    load: function () {
      try { var s = root.localStorage && root.localStorage.getItem(KEY); return s ? JSON.parse(s) : null; }
      catch (e) { return null; }
    },
    save: function (d) {
      try { root.localStorage && root.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
    },
    clear: function () {
      try { root.localStorage && root.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    }
  };
  RL.newSave = function () {
    return {
      v: 1, char: null, created: Date.now(), sound: true, unlockAll: false,
      ch: {}, final: { best: null, attempts: 0, history: [] },
      mistakes: {}, perkUses: {}
    };
  };

  /* ---------- 8-bit sound (starts only after a click) ---------- */
  RL.sfx = (function () {
    var ctx = null, on = true;
    function tone(f, start, dur, type, vol) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(vol || 0.05, ctx.currentTime + start);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + start); o.stop(ctx.currentTime + start + dur + 0.02);
    }
    var bank = {
      click: [[660, 0, 0.05]],
      ok: [[784, 0, 0.08], [1046, 0.08, 0.12]],
      bad: [[196, 0, 0.18, 'sawtooth', 0.04]],
      combo: [[880, 0, 0.06], [1175, 0.06, 0.06], [1568, 0.12, 0.1]],
      win: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1046, 0.3, 0.25]],
      tick: [[1200, 0, 0.03, 'square', 0.02]],
      lose: [[392, 0, 0.15], [330, 0.15, 0.15], [262, 0.3, 0.3]]
    };
    return {
      setOn: function (v) { on = !!v; },
      isOn: function () { return on; },
      play: function (name) {
        if (!on) return;
        try {
          if (!ctx) { var AC = root.AudioContext || root.webkitAudioContext; if (!AC) return; ctx = new AC(); }
          if (ctx.state === 'suspended') ctx.resume();
          (bank[name] || []).forEach(function (t) { tone(t[0], t[1], t[2], t[3], t[4]); });
        } catch (e) { /* audio is optional */ }
      }
    };
  })();
})(typeof window !== 'undefined' ? window : globalThis);
