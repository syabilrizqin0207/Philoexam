/* Land Lah! — core namespace, utilities, storage (local + optional cloud sync), sound, item helpers. */
(function (root) {
  'use strict';
  var LL = root.LL = root.LL || {};

  LL.EXAM_DATE = '2026-11-24T09:00:00+08:00';
  LL.MCQ_MARKS = 3;
  LL.chapters = [];
  LL.TRAPS = {};
  LL.ref = {};
  LL.cases = [];

  /* Register a chapter (called by js/content/chNN.js). */
  LL.chapter = function (c) {
    c.qs.forEach(function (q) { q.ch = c.n; });
    LL.chapters.push(c);
    LL.chapters.sort(function (a, b) { return a.n - b.n; });
  };
  LL.getChapter = function (n) {
    for (var i = 0; i < LL.chapters.length; i++) if (LL.chapters[i].n === n) return LL.chapters[i];
    return null;
  };
  LL.addCase = function (c) { LL.cases.push(c); };
  LL.getCase = function (id) {
    for (var i = 0; i < LL.cases.length; i++) if (LL.cases[i].id === id) return LL.cases[i];
    return null;
  };
  LL.extraQs = []; /* AI-written questions saved on this device, added at boot */
  LL.allQuestions = function () {
    var out = [];
    LL.chapters.forEach(function (c) { c.qs.forEach(function (q) { out.push(q); }); });
    return out.concat(LL.extraQs);
  };
  LL.findQuestion = function (id) {
    var all = LL.allQuestions();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  };

  /* ---------- utilities ---------- */
  var U = LL.util = {};
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
  U.roman = function (i) { return ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'][i]; };
  U.letter = function (i) { return 'ABCDEFGHIJ'.charAt(i); };
  U.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  /* Tiny safe markup: escape, then **bold**, _italic_, line breaks, "- " bullets and "## " sub-heads. */
  U.md = function (s) {
    var lines = U.esc(s).split('\n');
    var html = '', inList = false;
    lines.forEach(function (ln) {
      var bullet = /^\s*-\s+/.test(ln);
      if (bullet && !inList) { html += '<ul>'; inList = true; }
      if (!bullet && inList) { html += '</ul>'; inList = false; }
      var head = /^##\s+/.test(ln);
      var body = ln.replace(/^\s*-\s+/, '').replace(/^##\s+/, '')
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/(^|[\s(])_(.+?)_(?=[\s).,;:!?]|$)/g, '$1<i>$2</i>');
      if (bullet) html += '<li>' + body + '</li>';
      else if (head) html += '<h5>' + body + '</h5>';
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
  U.msToExam = function (now) { return new Date(LL.EXAM_DATE).getTime() - (now || Date.now()); };
  U.round2 = function (x) { return Math.round(x * 100) / 100; };
  U.words = function (s) { var m = String(s || '').trim().match(/\S+/g); return m ? m.length : 0; };
  U.debounce = function (fn, ms) {
    var t = null;
    return function () { var a = arguments; clearTimeout(t); t = setTimeout(function () { fn.apply(null, a); }, ms); };
  };

  /* ---------- items ---------- */
  LL.correctSet = function (q) {
    var out = [];
    q.s.forEach(function (st, i) { if (st[1]) out.push(i); });
    return out;
  };
  LL.sameSet = function (a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  };
  /* Labels in the paper's own style: "(iii) only", "(i) and (iii)", "(i), (ii) and (iv)". */
  LL.comboLabel = function (subset, n) {
    var s = subset.slice().sort(function (a, b) { return a - b; });
    if (s.length === 0) return 'None of the statements';
    var names = s.map(function (i) { return '(' + U.roman(i) + ')'; });
    if (s.length === 1) return names[0] + ' only';
    if (s.length === n && n > 2) return 'All of ' + names[0] + ' to ' + names[n - 1];
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  };
  /* Combination options (A–D) for a statement set. Deterministic for a given seed. */
  LL.comboOptions = function (q, seed) {
    var n = q.s.length, correct = LL.correctSet(q);
    var opts;
    if (q.opts) {
      opts = q.opts.map(function (o) { return o.slice(); });
    } else {
      var rand = U.rng(seed || 7);
      var all = [];
      for (var m = 0; m < (1 << n); m++) {
        var sub = [];
        for (var k = 0; k < n; k++) if (m & (1 << k)) sub.push(k);
        if (!LL.sameSet(sub, correct)) all.push(sub);
      }
      var dist = function (sub) {
        var d = 0;
        for (var k = 0; k < n; k++) if ((sub.indexOf(k) >= 0) !== (correct.indexOf(k) >= 0)) d++;
        return d;
      };
      var near = U.shuffle(all.filter(function (s) { return dist(s) === 1 && s.length; }), rand);
      var far = U.shuffle(all.filter(function (s) { return dist(s) > 1 && s.length; }), rand);
      var picks = near.slice(0, Math.min(2, near.length));
      picks = picks.concat(far.slice(0, 3 - picks.length));
      if (picks.length < 3) picks = picks.concat(near.slice(picks.length, 3));
      opts = picks.concat([correct]);
      opts.sort(function (a, b) {
        if (a.length !== b.length) return a.length - b.length;
        for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
        return 0;
      });
    }
    var answer = -1;
    opts.forEach(function (o, i) { if (LL.sameSet(o, correct)) answer = i; });
    return { sets: opts, labels: opts.map(function (o) { return LL.comboLabel(o, n); }), answer: answer };
  };

  /* ---------- lesson cards, built from each chapter's structured notes ---------- */
  function chunk(arr, n) { var out = []; for (var i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; }
  LL.cardsFor = function (ch) {
    if (ch._cards) return ch._cards;
    var cards = [];
    cards.push({ t: 'In plain English', b: '**The one idea:** ' + ch.idea + '\n\n' + ch.plain.map(function (p) { return '- ' + p; }).join('\n') });
    if (ch.tested && ch.tested.length) {
      cards.push({ t: 'How it is examined', b: ch.tested.map(function (r) { return '- **' + r[0] + '** (' + r[2] + '). ' + r[1]; }).join('\n') });
    }
    chunk(ch.terms, 7).forEach(function (part, i, all) {
      cards.push({ t: 'Key terms' + (all.length > 1 ? ' (' + (i + 1) + '/' + all.length + ')' : ''), b: part.map(function (r) { return '- **' + r[0] + ':** ' + r[1]; }).join('\n') });
    });
    chunk(ch.rules, 4).forEach(function (part, i, all) {
      cards.push({ t: 'Rules at a glance' + (all.length > 1 ? ' (' + (i + 1) + '/' + all.length + ')' : ''), b: part.map(function (r) { return '## ' + r[0] + '\n' + r[1]; }).join('\n\n') });
    });
    if (ch.method) cards.push({ t: ch.method.t, b: ch.method.steps.map(function (s, i) { return '- **' + (i + 1) + '.** ' + s; }).join('\n') });
    chunk(ch.cases, 3).forEach(function (part, i, all) {
      cards.push({ t: 'Case guide (' + (i + 1) + '/' + all.length + ')', b: part.map(function (r) { return '## ' + r[0] + '\n**Facts:** ' + r[1] + '\n**Held:** ' + r[2] + '\n**Cite it for:** ' + r[3]; }).join('\n\n') });
    });
    if (ch.secs.length || ch.nums.length) {
      cards.push({ t: 'Sections and numbers', b: ch.secs.map(function (r) { return '- **' + r[0] + '.** ' + r[1] + (r[2] ? ' _Use it:_ ' + r[2] : ''); }).join('\n') + (ch.nums.length ? '\n\n## Numbers\n' + ch.nums.map(function (r) { return '- **' + r[0] + ':** ' + r[1]; }).join('\n') : '') });
    }
    cards.push({ t: 'Traps and tips', b: ch.traps.map(function (t) { return '- ' + t; }).join('\n') });
    ch._cards = cards;
    return cards;
  };

  /* ---------- storage ---------- */
  var KEY = 'land-lah.save.v1';
  LL.store = {
    load: function () {
      try { var s = root.localStorage && root.localStorage.getItem(KEY); return s ? JSON.parse(s) : null; }
      catch (e) { return null; }
    },
    save: function (d) {
      try { root.localStorage && root.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
    },
    clear: function () {
      try { root.localStorage && root.localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    },
    /* Case-study drafts stay on this device (they can be long). */
    draft: function (id, val) {
      var k = 'land-lah.draft.' + id;
      try {
        if (val === undefined) return root.localStorage ? (root.localStorage.getItem(k) || '') : '';
        if (val === null) root.localStorage.removeItem(k); else root.localStorage.setItem(k, val);
      } catch (e) { return ''; }
      return '';
    }
  };
  LL.newSave = function () {
    return {
      v: 1, char: null, created: Date.now(), updated: 0, sound: true, unlockAll: true,
      ch: {}, mocks: {}, cases: {}, mistakes: {}, casePts: {}, ltMiss: {}, aiSheet: null, plan: {}, gen: []
    };
  };

  /* Cloud sync through the artifact viewer (private per-person document). Absent = local only. */
  LL.cloud = (function () {
    var ref = null, busy = false, queued = null, status = 'local';
    function write(save) {
      if (!ref) return;
      if (busy) { queued = save; return; }
      busy = true;
      var body = { at: save.updated || Date.now(), save: JSON.stringify(save) };
      ref.set(body).then(function () { status = 'synced'; }, function () { status = 'local'; }).then(function () {
        busy = false;
        if (queued) { var q = queued; queued = null; write(q); }
      });
    }
    return {
      status: function () { return status; },
      init: function (onRemote) {
        var c = root.claude;
        if (!c || typeof c.use !== 'function') return;
        var done = false;
        var timer = setTimeout(function () { done = true; }, 12000);
        Promise.all([c.use('user'), c.use('db')]).then(function (r) {
          var user = r[0], db = r[1];
          if (!user || !db || done) return null;
          return user.id().then(function (id) {
            if (!id || done) return null;
            ref = db.collection('data/users/' + id).doc('landlah');
            return ref.get();
          });
        }).then(function (snap) {
          clearTimeout(timer);
          if (!snap) { ref = null; return; }
          status = 'synced';
          if (snap.exists) {
            var d = snap.data();
            try { var remote = JSON.parse(d.save); if (remote && remote.v === 1) onRemote(remote); } catch (e) { /* ignore */ }
          }
        }).catch(function () { clearTimeout(timer); ref = null; status = 'local'; });
      },
      push: U.debounce(function (save) { write(save); }, 2000)
    };
  })();

  /* ---------- 8-bit sound (starts only after a click) ---------- */
  LL.sfx = (function () {
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
      lose: [[392, 0, 0.15], [330, 0.15, 0.15], [262, 0.3, 0.3]]
    };
    return {
      setOn: function (v) { on = !!v; },
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
