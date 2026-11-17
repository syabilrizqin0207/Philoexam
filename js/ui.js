/* Reason Lah! — screens, game loop and input. */
(function (root) {
  'use strict';
  var RL = root.RL, U = RL.util, PX = RL.px, G = RL.grading;
  var doc = root.document;
  var S = { save: null, view: 'title', params: {}, run: null, tick: null, typer: null };
  var screen, overlay;
  var esc = U.esc, md = U.md;

  /* ---------------- state helpers ---------------- */
  function load() {
    var s = RL.store.load();
    if (!s || s.v !== 1) s = RL.newSave();
    S.save = s;
    RL.sfx.setOn(s.sound !== false);
  }
  function persist() { RL.store.save(S.save); }
  function chState(n) {
    var c = S.save.ch[n];
    if (!c) c = S.save.ch[n] = { best: null, stars: 0, learned: [], attempts: 0, lightning: 0, history: [] };
    return c;
  }
  function passed(n) { var c = S.save.ch[n]; return !!(c && c.best && c.best.pct >= G.PASS); }
  function unlocked(n) { return S.save.unlockAll || n === 1 || passed(n - 1); }
  function finalUnlocked() { return S.save.unlockAll || RL.chapters.every(function (c) { return passed(c.n); }); }
  function passedCount() { return RL.chapters.filter(function (c) { return passed(c.n); }).length; }
  function finalPassed() { return !!(S.save.final.best && S.save.final.best.pct >= G.PASS); }
  function rank() { return finalPassed() ? RL.RANKS[12] : RL.RANKS[Math.min(11, passedCount())]; }
  function cap() {
    var gps = RL.chapters.map(function (c) { var s = S.save.ch[c.n]; return s && s.best ? s.best.gp : null; }).filter(function (x) { return x != null; });
    if (!gps.length) return null;
    return gps.reduce(function (a, b) { return a + b; }, 0) / gps.length;
  }
  function player() { return S.save.char ? RL.getPlayer(S.save.char) : null; }
  function mistakesCount() { return Object.keys(S.save.mistakes).filter(function (id) { return RL.findQuestion(id); }).length; }
  function daysLeft() { return Math.ceil(U.daysToExam()); }

  /* ---------------- rendering ---------------- */
  function stopTimers() {
    if (S.tick) { clearInterval(S.tick); S.tick = null; }
    if (S.typer) { clearInterval(S.typer); S.typer = null; }
  }
  function go(view, params) {
    stopTimers();
    S.view = view; S.params = params || {};
    render();
    try { root.scrollTo(0, 0); } catch (e) { /* ignore */ }
  }
  function render() {
    stopTimers();
    var fn = VIEWS[S.view] || VIEWS.title;
    screen.innerHTML = fn(S.params);
    screen.setAttribute('data-view', S.view);
    PX.hydrate(screen);
    if (AFTER[S.view]) AFTER[S.view](S.params);
    var h = screen.querySelector('h1, h2');
    if (h && S.view !== 'title') { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    syncTopbar();
  }
  function syncTopbar() {
    var b = doc.getElementById('btn-sound');
    if (b) { b.textContent = S.save.sound !== false ? 'SFX ON' : 'SFX OFF'; b.setAttribute('aria-pressed', S.save.sound !== false ? 'true' : 'false'); }
  }
  function showOverlay(html, cls) {
    overlay.innerHTML = '<div class="overlay-card ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    overlay.hidden = false;
    PX.hydrate(overlay);
    var f = overlay.querySelector('button, [tabindex]');
    if (f) try { f.focus(); } catch (e) { /* ignore */ }
  }
  function closeOverlay() { overlay.hidden = true; overlay.innerHTML = ''; }

  function stars(n, scale) {
    var out = '<span class="stars" aria-label="' + n + ' of 3 stars">';
    for (var i = 0; i < 3; i++) out += '<canvas data-icon="' + (i < n ? 'star' : 'starOff') + '" data-scale="' + (scale || 3) + '"></canvas>';
    return out + '</span>';
  }
  function portrait(id, scale, cls) { return '<canvas class="portrait ' + (cls || '') + '" data-portrait="' + id + '" data-scale="' + (scale || 5) + '" aria-hidden="true"></canvas>'; }
  function icon(name, scale, cls) { return '<canvas class="' + (cls || '') + '" data-icon="' + name + '" data-scale="' + (scale || 3) + '" aria-hidden="true"></canvas>'; }
  function btn(label, act, attrs, cls) { return '<button type="button" class="btn ' + (cls || '') + '" data-act="' + act + '" ' + (attrs || '') + '>' + label + '</button>'; }
  function countdownText() {
    var d = daysLeft();
    if (d > 1) return d + ' days to the final';
    if (d === 1) return 'Final is tomorrow';
    if (d === 0) return 'Final is today. Go get it';
    return 'The final has passed. Stay sharp';
  }

  /* ---------------- items ---------------- */
  var PIN = /^(none|not fallacious|nothing|there is no reason)/i;
  function mcqOrder(q, rand) {
    var idx = q.o.map(function (_, i) { return i; });
    var pinned = idx.filter(function (i) { return PIN.test(q.o[i]); });
    var free = U.shuffle(idx.filter(function (i) { return !PIN.test(q.o[i]); }), rand);
    return free.concat(pinned);
  }
  function makeEntry(q, rand, forceMode) {
    var e = { q: q, resp: null, flag: false, time: 0 };
    if (q.t === 'mcq') { e.mode = 'mcq'; e.order = mcqOrder(q, rand); return e; }
    var mode = forceMode || q.mode || (rand() < 0.5 ? 'tf' : 'combo');
    e.mode = mode;
    if (mode === 'combo') e.combo = RL.comboOptions(q, Math.floor(rand() * 1e9) + 1);
    else e.resp = q.s.map(function () { return null; });
    return e;
  }
  function modeLabel(e) {
    if (e.mode === 'tf') return 'T/F set · ' + e.q.s.length + ' statements · partial credit';
    if (e.mode === 'combo') return 'Combination MCQ · all or nothing';
    return 'MCQ · all or nothing';
  }
  function isAnswered(e) {
    if (e.mode === 'tf') return e.resp.every(function (r) { return r != null; });
    return e.resp != null;
  }
  function anyAnswered(e) {
    if (e.mode === 'tf') return e.resp.some(function (r) { return r != null; });
    return e.resp != null;
  }

  /* Question body. opts: {locked, showAnswer, eliminated:[]} */
  function questionHTML(e, opts) {
    opts = opts || {};
    var q = e.q, h = '';
    h += '<div class="q-meta"><span class="tag">' + esc(modeLabel(e)) + '</span><span class="tag tag-src">' + esc(q.src) + '</span><span class="tag tag-topic">' + esc(q.topic) + '</span></div>';
    h += '<div class="q-stem">' + md(q.q) + '</div>';
    if (e.mode === 'mcq') {
      h += '<div class="options" role="group" aria-label="Options">';
      e.order.forEach(function (oi, di) {
        var cls = 'opt';
        if (e.resp === oi) cls += ' chosen';
        if (opts.showAnswer && oi === q.a) cls += ' right';
        if (opts.showAnswer && e.resp === oi && oi !== q.a) cls += ' wrong';
        if (opts.eliminated && opts.eliminated.indexOf(oi) >= 0) cls += ' struck';
        h += '<button type="button" class="' + cls + '" data-act="pick" data-i="' + oi + '"' + (opts.locked ? ' disabled' : '') + ' aria-pressed="' + (e.resp === oi) + '"><span class="opt-key">' + U.letter(di) + '</span><span class="opt-text">' + esc(q.o[oi]) + '</span></button>';
      });
      h += '</div>';
    } else if (e.mode === 'combo') {
      h += '<ol class="stmts roman">';
      q.s.forEach(function (st, i) { h += '<li><span class="rn">' + U.roman(i) + '.</span> <span>' + esc(st[0]) + '</span></li>'; });
      h += '</ol><div class="options" role="group" aria-label="Options">';
      e.combo.labels.forEach(function (lab, i) {
        var cls = 'opt';
        if (e.resp === i) cls += ' chosen';
        if (opts.showAnswer && i === e.combo.answer) cls += ' right';
        if (opts.showAnswer && e.resp === i && i !== e.combo.answer) cls += ' wrong';
        if (opts.eliminated && opts.eliminated.indexOf(i) >= 0) cls += ' struck';
        h += '<button type="button" class="' + cls + '" data-act="pick" data-i="' + i + '"' + (opts.locked ? ' disabled' : '') + ' aria-pressed="' + (e.resp === i) + '"><span class="opt-key">' + U.letter(i) + '</span><span class="opt-text">' + esc(lab) + '</span></button>';
      });
      h += '</div>';
    } else {
      h += '<ol class="stmts tf">';
      q.s.forEach(function (st, i) {
        var r = e.resp[i];
        var mark = '';
        if (opts.showAnswer) mark = r == null ? ' blank' : (r === st[1] ? ' ok' : ' no');
        h += '<li class="tf-row' + mark + '"><span class="rn">' + U.roman(i) + '.</span><span class="tf-text">' + esc(st[0]) + '</span>' +
          '<span class="tf-btns" role="group" aria-label="Statement ' + U.roman(i) + '">' +
          '<button type="button" class="tfb' + (r === true ? ' on' : '') + '" data-act="tf" data-i="' + i + '" data-v="1"' + (opts.locked ? ' disabled' : '') + ' aria-pressed="' + (r === true) + '">T</button>' +
          '<button type="button" class="tfb' + (r === false ? ' on' : '') + '" data-act="tf" data-i="' + i + '" data-v="0"' + (opts.locked ? ' disabled' : '') + ' aria-pressed="' + (r === false) + '">F</button>' +
          '</span></li>';
      });
      h += '</ol>';
    }
    return h;
  }

  /* Explanation block shown after answering (training) or in review. */
  function explainHTML(e) {
    var q = e.q, sc = G.scoreEntry(e), h = '';
    var full = sc.earned >= 0.9999;
    var verdict = sc.blank ? 'Not answered' : (full ? 'Correct' : (sc.earned > 0 ? 'Partly correct' : 'Incorrect'));
    var vcls = sc.blank ? 'v-blank' : (full ? 'v-ok' : (sc.earned > 0 ? 'v-part' : 'v-no'));
    h += '<div class="verdict ' + vcls + '"><span class="v-icon" aria-hidden="true">' + (full ? '✓' : (sc.earned > 0 ? '½' : '✗')) + '</span><span>' + verdict + '</span><span class="v-marks">' + U.round2(sc.earned) + ' / 1</span></div>';
    if (e.mode === 'mcq') {
      var di = e.order.indexOf(q.a);
      h += '<p class="ans-line"><b>Answer: ' + U.letter(di) + '.</b> ' + esc(q.o[q.a]) + '</p>';
      h += '<div class="why">' + md(q.why) + '</div>';
      if (!full && !sc.blank && q.trap && RL.TRAPS[q.trap]) h += trapHTML(q.trap);
    } else {
      if (e.mode === 'combo') {
        h += '<p class="ans-line"><b>Answer: ' + U.letter(e.combo.answer) + '.</b> ' + esc(e.combo.labels[e.combo.answer]) + '</p>';
      }
      h += '<ul class="st-why">';
      var shownTraps = [];
      q.s.forEach(function (st, i) {
        var you = '';
        if (e.mode === 'tf') { var r = e.resp[i]; you = r == null ? ' · you: blank' : (' · you: ' + (r ? 'T' : 'F')); }
        var miss = sc.misjudged.indexOf(i) >= 0;
        h += '<li class="' + (miss ? 'miss' : '') + '"><span class="st-tv ' + (st[1] ? 'is-t' : 'is-f') + '">' + U.roman(i) + ' ' + (st[1] ? 'TRUE' : 'FALSE') + '</span><span class="st-you">' + esc(you) + '</span><div>' + md(st[2]) + '</div></li>';
        if (miss && st[3] && shownTraps.indexOf(st[3]) < 0) shownTraps.push(st[3]);
      });
      h += '</ul>';
      shownTraps.forEach(function (k) { h += trapHTML(k); });
    }
    return h;
  }
  function trapHTML(k) {
    var T = RL.TRAPS[k]; if (!T) return '';
    var c = RL.getChapter(T.ch);
    return '<div class="trap-note"><span class="trap-label">Trap</span> ' + esc(T.text) + (c ? ' <span class="trap-ref">' + esc(c.code + ' ' + c.short) + '</span>' : '') + '</div>';
  }

  /* ---------------- mistakes notebook ---------------- */
  function noteResult(q, full) {
    var m = S.save.mistakes;
    if (!full) { m[q.id] = { n: ((m[q.id] && m[q.id].n) || 0) + 1, streak: 0, at: Date.now() }; }
    else if (m[q.id]) { m[q.id].streak = (m[q.id].streak || 0) + 1; if (m[q.id].streak >= 2) delete m[q.id]; }
  }

  /* ================= VIEWS ================= */
  var VIEWS = {}, AFTER = {};

  VIEWS.title = function () {
    var has = !!S.save.char;
    return '<section class="title-screen">' +
      '<div class="title-stage">' +
      '<canvas class="clouds clouds-back" data-clouds="5" data-cell="7" aria-hidden="true"></canvas>' +
      icon('brain', 7, 'title-brain') +
      '<h1 class="pixel-title" aria-label="Reason Lah!"><span data-text="REASON">REASON</span><span data-text="LAH!">LAH!</span></h1>' +
      icon('bulb', 6, 'title-bulb') + icon('bolt', 4, 'title-bolt') + icon('cursor', 4, 'title-cursor') +
      '<canvas class="clouds clouds-front" data-clouds="9" data-cell="7" aria-hidden="true"></canvas>' +
      '</div>' +
      '<div class="title-stars">' + stars(3, 6) + '</div>' +
      '<p class="tagline">Cultivating bright minds toward the advancement of effective reasoning</p>' +
      '<p class="dateline">Final exam · 30 November 2026 · 1pm<br>@ Kent Ridge · Singapore</p>' +
      '<p class="countdown"><span>' + esc(countdownText()) + '</span></p>' +
      '<div class="title-actions">' +
      (has ? btn('CONTINUE', 'go', 'data-view="map"', 'btn-big') + btn('New game', 'new-game', '', 'btn-ghost') : btn('PRESS START', 'new-game', '', 'btn-big blink')) +
      btn('Open the notes', 'go', 'data-view="library"', 'btn-ghost') +
      '</div>' +
      '<p class="title-how">11 stations, one per lecture. Learn, train, beat the lightning round, then sit the professor\'s graded test. Pass the Reasoning Line and the Final opens.</p>' +
      '</section>';
  };
  AFTER.title = function () { /* nothing */ };

  VIEWS.pick = function () {
    var cur = S.save.char;
    var h = '<section class="pick"><h2 class="section-title">Choose your student</h2><p class="lede">Six NUS students, six study styles. Perks only work in Training and Lightning rounds. The professor marks everyone the same.</p><div class="pick-grid">';
    RL.players.forEach(function (p) {
      h += '<article class="pick-card' + (cur === p.id ? ' current' : '') + '">' +
        '<div class="pick-portrait">' + portrait(p.id, 6) + '</div>' +
        '<h3>' + esc(p.name) + '</h3><p class="from">' + esc(p.from) + '</p>' +
        '<p class="blurb">' + esc(p.blurb) + '</p>' +
        '<p class="quote">"' + esc(p.quote) + '"</p>' +
        '<p class="perk"><b>' + esc(p.perkName) + '.</b> ' + esc(p.perkText) + '</p>' +
        btn(cur === p.id ? 'Playing' : 'Choose ' + esc(p.name), 'choose', 'data-id="' + p.id + '"', 'btn-small') +
        '</article>';
    });
    return h + '</div></section>';
  };

  VIEWS.map = function () {
    var p = player();
    if (!p) return VIEWS.pick();
    var c = cap();
    var h = '<section class="map">';
    h += '<div class="player-card">' + portrait(p.id, 6) +
      '<div class="pc-text"><h2>' + esc(p.name) + '</h2><p class="pc-rank">' + esc(rank()) + '</p>' +
      '<dl class="pc-stats"><div><dt>Stations cleared</dt><dd>' + passedCount() + ' / 11</dd></div>' +
      '<div><dt>Average grade point</dt><dd>' + (c == null ? '–' : c.toFixed(2)) + '</dd></div>' +
      '<div><dt>Notebook</dt><dd>' + mistakesCount() + ' to redo</dd></div></dl></div>' +
      '<p class="pc-count">' + esc(countdownText()) + '</p></div>';
    h += '<div class="map-tools">' +
      btn(icon('book', 2) + ' Notes', 'go', 'data-view="library"', 'btn-small') +
      btn(icon('lock', 2) + ' Notebook (' + mistakesCount() + ')', 'go', 'data-view="notebook"', 'btn-small') +
      btn(icon('gradcap', 2) + ' Final exam', 'go', 'data-view="finalHub"', 'btn-small' + (finalUnlocked() ? ' btn-hot' : '')) +
      btn('Settings', 'go', 'data-view="settings"', 'btn-small btn-ghost') + '</div>';
    h += '<h2 class="section-title">The Reasoning Line</h2><p class="lede">Pass a station\'s graded test with a C (' + G.PASS + '%) or better to open the next one.' + (S.save.unlockAll ? ' Cram mode is on: every station is open.' : '') + '</p>';
    h += '<ol class="line">';
    RL.chapters.forEach(function (ch) {
      var st = S.save.ch[ch.n], open = unlocked(ch.n), ok = passed(ch.n);
      var cls = 'station' + (open ? '' : ' locked') + (ok ? ' passed' : '');
      h += '<li class="' + cls + '"><button type="button" class="stn" data-act="enter" data-n="' + ch.n + '"' + (open ? '' : ' aria-disabled="true"') + '>' +
        '<span class="stn-dot" aria-hidden="true"></span><span class="stn-code">' + ch.code + '</span>' +
        '<span class="stn-icon">' + icon(open ? ch.icon : 'lock', 3) + '</span>' +
        '<span class="stn-text"><span class="stn-place">' + esc(ch.place) + '</span><span class="stn-title">' + esc(ch.title) + '</span><span class="stn-lec">' + esc(ch.lec) + '</span></span>' +
        '<span class="stn-grade">' + (st && st.best ? '<b>' + st.best.letter + '</b>' + stars(st.stars || 0, 2) : (open ? '<span class="stn-new">Open</span>' : '<span class="stn-new">Locked</span>')) + '</span>' +
        '</button></li>';
    });
    var fo = finalUnlocked(), fb = S.save.final.best;
    h += '<li class="station terminal' + (fo ? '' : ' locked') + (finalPassed() ? ' passed' : '') + '"><button type="button" class="stn" data-act="go" data-view="finalHub">' +
      '<span class="stn-dot" aria-hidden="true"></span><span class="stn-code">RL12</span><span class="stn-icon">' + icon('merlion', 2) + '</span>' +
      '<span class="stn-text"><span class="stn-place">Final Exam Hall</span><span class="stn-title">Full mock final, Examplify style</span><span class="stn-lec">All lectures · open book</span></span>' +
      '<span class="stn-grade">' + (fb ? '<b>' + fb.letter + '</b>' + stars(G.stars(fb.pct), 2) : '<span class="stn-new">' + (fo ? 'Open' : 'Locked') + '</span>') + '</span></button></li>';
    h += '</ol></section>';
    return h;
  };

  VIEWS.chapter = function (p) {
    var ch = RL.getChapter(p.n), st = chState(p.n);
    var lines = ch.story.slice();
    var line = p.line == null ? (passed(ch.n) ? -1 : 0) : p.line;
    var text = line < 0 ? ch.win : lines[line];
    var last = line < 0 || line >= lines.length - 1;
    var h = '<section class="hub">';
    h += '<div class="hub-banner"><canvas class="skyline" data-skyline="' + ch.sky + '" aria-hidden="true"></canvas><canvas class="clouds clouds-hub" data-clouds="' + (ch.sky + 3) + '" data-cell="5" aria-hidden="true"></canvas>' +
      '<div class="hub-landmark">' + icon(ch.icon, 6) + '</div>' +
      '<div class="hub-title"><span class="stn-code">' + ch.code + '</span><h2>' + esc(ch.place) + '</h2><p>' + esc(ch.spot) + '</p></div></div>';
    h += '<div class="chapter-name"><span>Chapter ' + ch.n + ' · ' + esc(ch.lec) + '</span><h3>' + esc(ch.title) + '</h3></div>';
    h += '<div class="dialogue"><div class="mentors">' + ch.mentor.map(function (m) { return portrait(m, 5); }).join('') + '</div>' +
      '<div class="speech"><p class="speaker">' + esc(ch.mentorName) + '</p><p class="speech-text" data-full="' + esc(text) + '">' + esc(text) + '</p>' +
      '<div class="speech-nav">' + (last ? (line < 0 ? btn('Replay intro', 'line', 'data-line="0"', 'btn-small btn-ghost') : '') : btn('Next ▸', 'line', 'data-line="' + (line + 1) + '"', 'btn-small')) +
      (!last ? btn('Skip', 'line', 'data-line="' + (lines.length - 1) + '"', 'btn-small btn-ghost') : '') + '</div></div></div>';
    var learned = (st.learned || []).length;
    h += '<div class="activities">' +
      actBtn('1', 'Lesson', learned + ' / ' + ch.cards.length + ' cards read', 'lesson', 'book') +
      actBtn('2', 'Training', ch.qs.length + ' questions, instant feedback', 'train', 'brain') +
      actBtn('3', 'Lightning round', st.lightning ? 'Best ' + st.lightning + ' pts' : '60 seconds of rapid T/F', 'lightning', 'bolt') +
      actBtn('4', 'Graded test', st.best ? 'Best ' + st.best.letter + ' (' + st.best.pct + '%)' : '10 questions · 25 min · marked', 'test', 'hourglass') +
      '</div>';
    if (st.best) h += '<p class="hub-best">Best result ' + stars(st.stars || 0, 3) + ' <b>' + st.best.letter + '</b> · ' + st.best.pct + '% · ' + st.attempts + ' attempt' + (st.attempts === 1 ? '' : 's') + '</p>';
    h += '<div class="hub-foot">' + btn('◂ Map', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
    return h;
    function actBtn(num, label, sub, act, ic) {
      return '<button type="button" class="act" data-act="' + act + '" data-n="' + ch.n + '"><span class="act-num">' + num + '</span>' + icon(ic, 4) + '<span class="act-label">' + label + '</span><span class="act-sub">' + esc(sub) + '</span></button>';
    }
  };
  AFTER.chapter = function () {
    var el = screen.querySelector('.speech-text'); if (!el) return;
    var full = el.getAttribute('data-full');
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !full) return;
    var i = 0; el.textContent = '';
    S.typer = setInterval(function () {
      i += 2; el.textContent = full.slice(0, i);
      if (i >= full.length) { clearInterval(S.typer); S.typer = null; }
    }, 18);
    el.addEventListener('click', function () { if (S.typer) { clearInterval(S.typer); S.typer = null; } el.textContent = full; });
  };

  VIEWS.lesson = function (p) {
    var ch = RL.getChapter(p.n), i = p.i || 0, card = ch.cards[i], st = chState(p.n);
    var read = st.learned.indexOf(i) >= 0;
    var h = '<section class="lesson"><div class="lesson-head"><span class="stn-code">' + ch.code + '</span><h2>' + esc(ch.title) + '</h2><p>Lesson card ' + (i + 1) + ' of ' + ch.cards.length + '</p></div>';
    h += '<article class="card-big"><h3>' + esc(card.t) + '</h3><div class="card-body">' + md(card.b) + '</div></article>';
    h += '<div class="dots" aria-hidden="true">' + ch.cards.map(function (_, k) { return '<span class="dot' + (k === i ? ' on' : '') + (st.learned.indexOf(k) >= 0 ? ' read' : '') + '"></span>'; }).join('') + '</div>';
    h += '<div class="lesson-nav">' + btn('◂ Prev', 'card', 'data-i="' + (i - 1) + '"' + (i === 0 ? ' disabled' : ''), 'btn-small btn-ghost') +
      (i < ch.cards.length - 1 ? btn(read ? 'Next ▸' : 'Got it ▸', 'card', 'data-i="' + (i + 1) + '" data-learn="' + i + '"', 'btn-small') : btn('Finish: start training', 'train-from-lesson', 'data-n="' + ch.n + '" data-learn="' + i + '"', 'btn-small btn-hot')) +
      '</div><div class="hub-foot">' + btn('◂ Station', 'enter', 'data-n="' + ch.n + '"', 'btn-small btn-ghost') + '</div></section>';
    return h;
  };

  /* ---------- training ---------- */
  function startTraining(n, ids) {
    var rand = U.rng(Date.now());
    var qs = ids ? ids.map(RL.findQuestion).filter(Boolean) : U.shuffle(RL.getChapter(n).qs, rand);
    var p = player();
    var perkUses = p ? ({ hint: 2, eliminate: 2, retry: 2, notes: 3 })[p.perk] || 0 : 0;
    S.run = { kind: 'train', n: n, notebook: !!ids, entries: qs.map(function (q) { return makeEntry(q, rand); }), i: 0, checked: false, eliminated: [], score: 0, done: 0, perk: p ? p.perk : null, perkLeft: perkUses, hintShown: false };
    go('train');
  }
  VIEWS.train = function () {
    var r = S.run; if (!r) return VIEWS.map();
    if (r.i >= r.entries.length) return trainSummary(r);
    var e = r.entries[r.i], ch = RL.getChapter(e.q.ch || r.n);
    var h = '<section class="play"><div class="play-head"><div><span class="stn-code">' + (r.notebook ? 'NB' : ch.code) + '</span><h2>' + (r.notebook ? 'Notebook revision' : 'Training · ' + esc(ch.short)) + '</h2></div>' +
      '<div class="play-progress"><span>' + (r.i + 1) + ' / ' + r.entries.length + '</span><span class="score-chip">' + U.round2(r.score) + ' pts</span></div></div>';
    h += '<div class="bar"><span style="width:' + (100 * r.i / r.entries.length) + '%"></span></div>';
    h += '<article class="q-card">' + questionHTML(e, { locked: r.checked, showAnswer: r.checked, eliminated: r.eliminated }) + '</article>';
    if (r.hintShown) h += hintHTML(e);
    h += '<div class="play-actions">';
    if (!r.checked) {
      if (e.mode === 'tf') h += btn('Check answers', 'check', isAnswered(e) ? '' : 'disabled', 'btn-hot');
      h += perkButton(r, e);
    } else {
      h += btn(r.i + 1 < r.entries.length ? 'Next ▸' : 'See results', 'next', '', 'btn-hot');
      var sc = G.scoreEntry(e);
      if (r.perk === 'retry' && r.perkLeft > 0 && sc.earned < 0.9999) h += btn('Second Strum: retry (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    }
    h += btn('Quit', 'quit-train', '', 'btn-ghost btn-small') + '</div>';
    if (r.checked) h += '<div class="explain" aria-live="polite">' + explainHTML(e) + '</div>';
    h += '</section>';
    return h;
  };
  function perkButton(r, e) {
    if (!r.perk || r.perkLeft <= 0) return '';
    if (r.perk === 'hint' && !r.hintShown) return btn('Debate Notes: show trap (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    if (r.perk === 'eliminate' && e.mode !== 'tf') return btn('Chess Mind: strike one (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    if (r.perk === 'notes') return btn('Library Card: open notes (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    return '';
  }
  function hintHTML(e) {
    var key = e.q.trap;
    if (!key && e.q.s) for (var i = 0; i < e.q.s.length; i++) if (e.q.s[i][3]) { key = e.q.s[i][3]; break; }
    if (key && RL.TRAPS[key]) return '<div class="hint">' + trapHTML(key) + '</div>';
    return '<div class="hint"><div class="trap-note"><span class="trap-label">Hint</span> No named trap here. Topic: ' + esc(e.q.topic) + '. Read every word of the stem.</div></div>';
  }
  function trainCheck() {
    var r = S.run, e = r.entries[r.i];
    if (r.checked) return;
    r.checked = true;
    var sc = G.scoreEntry(e), full = sc.earned >= 0.9999;
    r.score += sc.earned; r.done++;
    noteResult(e.q, full);
    persist();
    RL.sfx.play(full ? 'ok' : 'bad');
    render();
    var ex = screen.querySelector('.explain'); if (ex) try { ex.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) { /* ignore */ }
  }
  function trainSummary(r) {
    var pct = r.entries.length ? Math.round(100 * r.score / r.entries.length) : 0;
    if (!r.notebook) { var st = chState(r.n); st.trained = Math.max(st.trained || 0, pct); persist(); }
    var h = '<section class="summary"><h2 class="section-title">Training complete</h2>' +
      '<p class="big-num">' + U.round2(r.score) + ' <small>/ ' + r.entries.length + '</small></p><p class="lede">' + pct + '% · practice only, not graded. Anything you missed went into your Notebook.</p>' +
      '<div class="title-actions">' + (r.notebook ? btn('Back to Notebook', 'go', 'data-view="notebook"', 'btn-hot') : btn('Take the graded test', 'test', 'data-n="' + r.n + '"', 'btn-hot') + btn('Train again', 'train', 'data-n="' + r.n + '"') + btn('◂ Station', 'enter', 'data-n="' + r.n + '"', 'btn-ghost')) + '</div></section>';
    return h;
  }

  /* ---------- lightning ---------- */
  function startLightning(n) {
    var ch = RL.getChapter(n), p = player();
    var time = 60 + (p && p.perk === 'kopi' ? 15 : 0);
    S.run = { kind: 'lightning', n: n, pool: U.shuffle(ch.quick), k: 0, left: time, total: time, score: 0, combo: 0, base: p && p.perk === 'combo' ? 1 : 0, answered: 0, correct: 0, misses: [], over: false, flash: null, started: false };
    go('lightning');
  }
  function mult(r) { return Math.min(5, 1 + r.base + Math.floor(r.combo / 3)); }
  VIEWS.lightning = function () {
    var r = S.run; if (!r) return VIEWS.map();
    var ch = RL.getChapter(r.n);
    if (r.over) return lightningSummary(r);
    var it = r.pool[r.k % r.pool.length];
    var h = '<section class="lightning"><div class="play-head"><div><span class="stn-code">' + ch.code + '</span><h2>Lightning round</h2></div>' +
      '<div class="lt-hud"><span class="lt-score" id="lt-score">' + r.score + '</span><span class="lt-mult" id="lt-mult">×' + mult(r) + '</span></div></div>' +
      '<div class="bar bar-time"><span id="lt-bar" style="width:' + (100 * r.left / r.total) + '%"></span></div>' +
      '<p class="lt-time"><span id="lt-left">' + Math.ceil(r.left) + '</span>s</p>';
    if (!r.started) {
      h += '<div class="lt-ready"><p>True or false? As many as you can in ' + r.total + ' seconds. Every 3 in a row raises your multiplier. Keys: T / F or ← / →.</p>' + btn('GO!', 'lt-go', '', 'btn-big btn-hot') + '</div>';
    } else {
      h += '<div class="lt-card' + (r.flash ? ' flash-' + r.flash : '') + '" id="lt-card"><p>' + esc(it[0]) + '</p></div>' +
        '<div class="lt-btns">' + btn('TRUE', 'lt', 'data-v="1"', 'btn-big lt-t') + btn('FALSE', 'lt', 'data-v="0"', 'btn-big lt-f') + '</div>';
    }
    h += '<div class="hub-foot">' + btn('Quit', 'enter', 'data-n="' + r.n + '"', 'btn-small btn-ghost') + '</div></section>';
    return h;
  };
  AFTER.lightning = function () {
    var r = S.run; if (!r || r.over || !r.started) return;
    var last = Date.now();
    S.tick = setInterval(function () {
      var now = Date.now(); r.left -= (now - last) / 1000; last = now;
      var bar = doc.getElementById('lt-bar'), left = doc.getElementById('lt-left');
      if (bar) bar.style.width = Math.max(0, 100 * r.left / r.total) + '%';
      if (left) left.textContent = Math.max(0, Math.ceil(r.left));
      if (r.left <= 0) { r.over = true; finishLightning(); }
    }, 100);
  };
  function lightningAnswer(v) {
    var r = S.run; if (!r || r.over || !r.started) return;
    var it = r.pool[r.k % r.pool.length];
    r.answered++;
    if (v === it[1]) {
      r.correct++; r.combo++; r.score += 100 * mult(r);
      RL.sfx.play(r.combo % 3 === 0 ? 'combo' : 'ok'); r.flash = 'ok';
    } else {
      r.combo = 0; r.misses.push(it); RL.sfx.play('bad'); r.flash = 'no';
    }
    r.k++;
    if (r.k % r.pool.length === 0) r.pool = U.shuffle(r.pool);
    var card = doc.getElementById('lt-card');
    var next = r.pool[r.k % r.pool.length];
    if (card) {
      card.className = 'lt-card flash-' + r.flash;
      card.innerHTML = '<p>' + esc(next[0]) + '</p>';
      doc.getElementById('lt-score').textContent = r.score;
      doc.getElementById('lt-mult').textContent = '×' + mult(r);
    }
  }
  function finishLightning() {
    stopTimers();
    var r = S.run, st = chState(r.n);
    r.newBest = r.score > (st.lightning || 0);
    if (r.newBest) st.lightning = r.score;
    persist();
    RL.sfx.play('win');
    render();
  }
  function lightningSummary(r) {
    var acc = r.answered ? Math.round(100 * r.correct / r.answered) : 0;
    var h = '<section class="summary"><h2 class="section-title">Time!</h2><p class="big-num">' + r.score + ' <small>pts</small></p>' +
      '<p class="lede">' + r.correct + ' of ' + r.answered + ' correct (' + acc + '%).' + (r.newBest ? ' New station record!' : '') + '</p>';
    if (r.misses.length) {
      h += '<h3 class="sub">Fix these</h3><ul class="miss-list">';
      var seen = {};
      r.misses.forEach(function (m) { if (seen[m[0]]) return; seen[m[0]] = 1; h += '<li><span class="st-tv ' + (m[1] ? 'is-t' : 'is-f') + '">' + (m[1] ? 'TRUE' : 'FALSE') + '</span> ' + esc(m[0]) + '<div class="why">' + md(m[2]) + '</div></li>'; });
      h += '</ul>';
    }
    h += '<div class="title-actions">' + btn('Play again', 'lightning', 'data-n="' + r.n + '"', 'btn-hot') + btn('◂ Station', 'enter', 'data-n="' + r.n + '"', 'btn-ghost') + '</div></section>';
    return h;
  }

  /* ---------- exams ---------- */
  function pickChapterTest(n, rand) {
    var ch = RL.getChapter(n), groups = {};
    U.shuffle(ch.qs, rand).forEach(function (q) { (groups[q.topic] = groups[q.topic] || []).push(q); });
    var keys = U.shuffle(Object.keys(groups), rand), out = [];
    while (out.length < Math.min(10, ch.qs.length)) {
      var progressed = false;
      keys.forEach(function (k) { if (out.length < 10 && groups[k].length) { out.push(groups[k].shift()); progressed = true; } });
      if (!progressed) break;
    }
    return out;
  }
  function pickFinal(count, rand) {
    var pools = RL.chapters.map(function (c) {
      return c.qs.map(function (q) { q.ch = c.n; return { q: q, k: (/2018|GEX23/.test(q.src) ? 0 : 0.45) + rand() }; })
        .sort(function (a, b) { return a.k - b.k; }).map(function (x) { return x.q; });
    });
    var out = [], order = U.shuffle(pools.map(function (_, i) { return i; }), rand);
    while (out.length < count) {
      var moved = false;
      for (var j = 0; j < order.length && out.length < count; j++) { var pool = pools[order[j]]; if (pool.length) { out.push(pool.shift()); moved = true; } }
      if (!moved) break;
    }
    return out.sort(function (a, b) { return a.ch - b.ch; });
  }
  function startExam(scope, n, count) {
    var seed = Date.now() % 1e9, rand = U.rng(seed);
    var qs = scope === 'final' ? pickFinal(count, rand) : pickChapterTest(n, rand);
    if (scope !== 'final') { var ch = RL.getChapter(n); qs.forEach(function (q) { q.ch = ch.n; }); }
    var perQ = scope === 'final' ? 180 : 150;
    S.run = { kind: 'exam', scope: scope, n: n, seed: seed, entries: qs.map(function (q) { return makeEntry(q, rand); }), i: 0, limit: qs.length * perQ, started: Date.now(), submitted: false };
    go('exam');
  }
  function timeLeft(r) { return r.limit - (Date.now() - r.started) / 1000; }
  VIEWS.exam = function () {
    var r = S.run; if (!r) return VIEWS.map();
    var e = r.entries[r.i];
    var title = r.scope === 'final' ? 'GET1026 Final · Mock paper' : RL.getChapter(r.n).code + ' graded test';
    var h = '<section class="exam"><div class="exam-bar"><div class="exam-title">' + icon('hourglass', 2) + '<span>' + esc(title) + '</span></div>' +
      '<div class="exam-timer" id="exam-timer" role="timer" aria-live="off">' + U.fmtTime(timeLeft(r)) + '</div>' +
      '<div class="exam-tools">' + btn('Notes', 'notes', '', 'btn-small btn-ghost') + btn('Submit', 'submit', '', 'btn-small btn-hot') + '</div></div>';
    h += '<nav class="qnav" aria-label="Questions">';
    r.entries.forEach(function (x, k) {
      h += '<button type="button" class="qn' + (k === r.i ? ' cur' : '') + (isAnswered(x) ? ' done' : (anyAnswered(x) ? ' part' : '')) + (x.flag ? ' flag' : '') + '" data-act="goto" data-i="' + k + '" aria-label="Question ' + (k + 1) + (x.flag ? ', flagged' : '') + '">' + (k + 1) + '</button>';
    });
    h += '</nav>';
    h += '<article class="q-card"><p class="q-num">Question ' + (r.i + 1) + ' of ' + r.entries.length + (e.flag ? ' · <span class="flag-txt">flagged</span>' : '') + '</p>' + questionHTML(e, {}) + '</article>';
    h += '<div class="play-actions">' + btn('◂ Prev', 'goto', 'data-i="' + (r.i - 1) + '"' + (r.i === 0 ? ' disabled' : ''), 'btn-small btn-ghost') +
      btn(e.flag ? 'Unflag' : 'Flag for review', 'flag', '', 'btn-small btn-ghost') +
      (r.i < r.entries.length - 1 ? btn('Next ▸', 'goto', 'data-i="' + (r.i + 1) + '"', 'btn-small') : btn('Review & submit', 'submit', '', 'btn-small btn-hot')) + '</div>';
    h += '<p class="exam-note">Marking: MCQs all-or-nothing; T/F sets partial credit, no penalty for wrong answers. Open book: tap Notes any time.</p></section>';
    return h;
  };
  AFTER.exam = function () {
    var r = S.run; if (!r || r.submitted) return;
    var mark = Date.now();
    S.tick = setInterval(function () {
      var t = timeLeft(r), el = doc.getElementById('exam-timer');
      var now = Date.now(); r.entries[r.i].time += (now - mark) / 1000; mark = now;
      if (el) { el.textContent = U.fmtTime(t); el.classList.toggle('low', t < 300); }
      if (t <= 0) { stopTimers(); submitExam(true); }
    }, 500);
  };
  function confirmSubmit() {
    var r = S.run;
    var blank = r.entries.filter(function (x) { return !anyAnswered(x); }).length;
    var part = r.entries.filter(function (x) { return anyAnswered(x) && !isAnswered(x); }).length;
    var flagged = r.entries.filter(function (x) { return x.flag; }).length;
    showOverlay('<h2>Submit your script?</h2><p>' + (r.entries.length - blank - part) + ' answered · ' + part + ' partly answered · ' + blank + ' blank · ' + flagged + ' flagged.</p>' +
      (blank || part ? '<p class="warn">There is no penalty for wrong answers. A blank scores zero.</p>' : '') +
      '<div class="title-actions">' + btn('Submit for marking', 'do-submit', '', 'btn-hot') + btn('Keep working', 'close-overlay', '', 'btn-ghost') + '</div>');
  }
  function submitExam(timeUp) {
    var r = S.run; if (!r || r.submitted) return;
    r.submitted = true; stopTimers(); closeOverlay();
    var secs = Math.min(r.limit, (Date.now() - r.started) / 1000);
    var rep = G.report(r.entries, { kind: r.scope === 'final' ? 'final' : 'chapter', seconds: secs, seed: r.seed });
    rep.timeUp = !!timeUp; rep.seconds = secs;
    var rec = { pct: rep.pct, letter: rep.letter, gp: rep.gp, at: Date.now() };
    var unlockedNow = null;
    if (r.scope === 'final') {
      var f = S.save.final; f.attempts++; f.history.push(rec); if (f.history.length > 20) f.history.shift();
      if (!f.best || rep.pct > f.best.pct) f.best = rec;
    } else {
      var st = chState(r.n), wasPassed = passed(r.n);
      st.attempts++; st.history.push(rec); if (st.history.length > 20) st.history.shift();
      if (!st.best || rep.pct > st.best.pct) { st.best = rec; st.stars = Math.max(st.stars || 0, rep.stars); }
      if (!wasPassed && rep.pass && r.n < 11) unlockedNow = r.n + 1;
    }
    r.entries.forEach(function (x) { var sc = G.scoreEntry(x); noteResult(x.q, sc.earned >= 0.9999); });
    persist();
    RL.sfx.play(rep.pass ? 'win' : 'lose');
    go('report', { rep: rep, scope: r.scope, n: r.n, unlocked: unlockedNow, final: r.scope === 'final' });
  }

  VIEWS.report = function (p) {
    var rep = p.rep, ch = p.n ? RL.getChapter(p.n) : null;
    var h = '<section class="report">';
    h += '<div class="report-head"><div class="grade-box"><span class="grade-letter" data-text="' + rep.letter + '">' + rep.letter + '</span>' + stars(rep.stars, 5) + '</div>' +
      '<div class="report-figs"><h2>' + (p.final ? 'Mock final: marked script' : esc(ch.code + ' · ' + ch.short) + ': marked script') + '</h2>' +
      '<dl><div><dt>Marks</dt><dd>' + rep.earned + ' / ' + rep.max + '</dd></div><div><dt>Score</dt><dd>' + rep.pct + '%</dd></div><div><dt>Grade point</dt><dd>' + rep.gp.toFixed(1) + '</dd></div><div><dt>Time used</dt><dd>' + U.fmtTime(rep.seconds) + '</dd></div></dl>' +
      (rep.timeUp ? '<p class="warn">Time ran out; your script was collected automatically.</p>' : '') +
      (p.unlocked ? '<p class="unlock">' + icon('star', 2) + ' ' + esc(RL.getChapter(p.unlocked).code + ' ' + RL.getChapter(p.unlocked).place) + ' is now open.</p>' : '') +
      (!p.final && !rep.pass ? '<p class="warn">Pass mark is C (' + G.PASS + '%). The next station stays closed until you pass.</p>' : '') + '</div></div>';
    h += '<div class="prof"><div class="prof-head">' + portrait('socratan', 4) + '<div><p class="prof-name">Prof. Socra-Tan</p><p class="prof-role">Module coordinator · examiner\'s comments</p></div></div><ul class="prof-list">';
    rep.comments.forEach(function (c) { h += '<li class="c-' + c.k + '">' + esc(c.text) + '</li>'; });
    h += '</ul><p class="prof-note">Grades here use fixed NUS bands (A+ 90, A 85, A− 80, B+ 75, B 70, B− 65, C+ 60, C 55, D+ 50, D 45). Real module grades are moderated across the cohort.</p></div>';
    h += '<h3 class="sub">Breakdown</h3><div class="topic-bars">';
    rep.topics.forEach(function (t) {
      h += '<div class="tb"><span class="tb-name">' + esc(t.name) + '</span><span class="tb-track"><span class="tb-fill' + (t.pct < 60 ? ' low' : (t.pct >= 80 ? ' high' : '')) + '" style="width:' + Math.max(2, t.pct) + '%"></span></span><span class="tb-val">' + U.round2(t.earned) + '/' + t.max + '</span></div>';
    });
    h += '</div>';
    h += '<div class="title-actions">' + btn('Review every answer', 'toggle-review', '', 'btn-hot') +
      (p.final ? btn('Sit another paper', 'go', 'data-view="finalHub"') : btn('Retake test', 'test', 'data-n="' + p.n + '"') + btn('◂ Station', 'enter', 'data-n="' + p.n + '"', 'btn-ghost')) +
      (p.final && rep.pass ? btn('Graduation', 'go', 'data-view="ending"', 'btn-hot') : '') +
      (p.unlocked ? btn('Go to ' + RL.getChapter(p.unlocked).code, 'enter', 'data-n="' + p.unlocked + '"', 'btn-hot') : '') +
      btn('Map', 'go', 'data-view="map"', 'btn-ghost') + '</div>';
    h += '<div class="review" id="review" hidden>';
    rep.items.forEach(function (it, k) {
      var e = it.entry;
      h += '<article class="q-card review-card"><p class="q-num">Question ' + (k + 1) + ' · Ch ' + e.q.ch + '</p>' + questionHTML(e, { locked: true, showAnswer: true }) + '<div class="explain">' + explainHTML(e) + '</div></article>';
    });
    h += '</div></section>';
    return h;
  };

  VIEWS.finalHub = function () {
    var fo = finalUnlocked(), f = S.save.final;
    var h = '<section class="final-hub"><div class="hub-banner final-banner"><canvas class="skyline" data-skyline="1212" aria-hidden="true"></canvas><canvas class="clouds clouds-hub" data-clouds="77" data-cell="5" aria-hidden="true"></canvas>' +
      '<div class="hub-landmark">' + icon('merlion', 5) + '</div><div class="hub-title"><span class="stn-code">RL12</span><h2>Final Exam Hall</h2><p>Mock final · Examplify style · open book</p></div></div>';
    h += '<div class="dialogue">' + '<div class="mentors">' + portrait('examiner', 5) + '</div><div class="speech"><p class="speaker">The Examiner</p><p class="speech-text">' +
      esc(fo ? 'Questions follow the 2018 and GEX23 papers: combination MCQs and T/F sets in lecture order. You may consult your notes. Your script goes to Prof. Socra-Tan for marking.' : 'The hall is closed. Pass every station on the Reasoning Line first, or switch on cram mode in Settings.') + '</p></div></div>';
    if (fo) {
      h += '<div class="activities three">' +
        '<button type="button" class="act" data-act="final" data-count="15"><span class="act-num">S</span>' + icon('hourglass', 4) + '<span class="act-label">Short paper</span><span class="act-sub">15 questions · 45 min</span></button>' +
        '<button type="button" class="act" data-act="final" data-count="25"><span class="act-num">F</span>' + icon('gradcap', 3) + '<span class="act-label">Full paper</span><span class="act-sub">25 questions · 75 min</span></button>' +
        '<button type="button" class="act" data-act="final" data-count="40"><span class="act-num">M</span>' + icon('brain', 4) + '<span class="act-label">Marathon</span><span class="act-sub">40 questions · 2 hours</span></button></div>';
      h += '<div class="attack"><h3 class="sub">How to attack a question</h3><ol>' + RL.ref.attack.map(function (a) { return '<li><b>' + esc(a[0]) + '.</b> ' + esc(a[1]) + '</li>'; }).join('') + '</ol></div>';
    }
    if (f.history.length) {
      h += '<h3 class="sub">Past attempts</h3><ul class="history">' + f.history.slice().reverse().map(function (x) { return '<li><b>' + x.letter + '</b> · ' + x.pct + '% · ' + new Date(x.at).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' }) + '</li>'; }).join('') + '</ul>';
    }
    h += '<div class="hub-foot">' + btn('◂ Map', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
    return h;
  };

  function libraryHTML(inExam) {
    var h = '<div class="library">';
    h += '<details class="lib-sec" open><summary>Exam rules and how to attack a question</summary><ul>' + RL.ref.rules.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul><ol>' + RL.ref.attack.map(function (a) { return '<li><b>' + esc(a[0]) + '.</b> ' + esc(a[1]) + '</li>'; }).join('') + '</ol>' +
      '<div class="table-wrap"><table><thead><tr><th>If the stem mentions...</th><th>Go to</th></tr></thead><tbody>' + RL.ref.map.map(function (m) { var c = RL.getChapter(m[1]); return '<tr><td>' + esc(m[0]) + '</td><td>' + esc(c.code + ' ' + c.short) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
    h += '<details class="lib-sec"><summary>Master fallacy table</summary><div class="table-wrap"><table><thead><tr><th>Fallacy</th><th>How to spot it</th><th>Cues</th><th>Confused with</th></tr></thead><tbody>' +
      RL.ref.fallacies.map(function (f, i) { return '<tr><td><b>' + (i + 1) + '. ' + esc(f[0]) + '</b></td><td>' + esc(f[1]) + '</td><td>' + esc(f[2]) + '</td><td>' + esc(f[3]) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
    h += '<details class="lib-sec"><summary>Trap index</summary><ul class="trap-index">' + Object.keys(RL.TRAPS).map(function (k) { var T = RL.TRAPS[k]; return '<li><span class="stn-code">RL' + T.ch + '</span> ' + esc(T.text) + '</li>'; }).join('') + '</ul></details>';
    RL.chapters.forEach(function (ch) {
      h += '<details class="lib-sec"><summary><span class="stn-code">' + ch.code + '</span> ' + esc(ch.title) + ' <small>' + esc(ch.lec) + '</small></summary>';
      ch.cards.forEach(function (c) { h += '<article class="lib-card"><h4>' + esc(c.t) + '</h4>' + md(c.b) + '</article>'; });
      h += '</details>';
    });
    return h + '</div>';
  }
  VIEWS.library = function () {
    return '<section class="lib-page"><h2 class="section-title">Open-book notes</h2><p class="lede">Every lesson card, the fallacy table, the trap index and the exam attack plan, built from your cheatsheet. Lecture and tutorial material wins every conflict.</p>' +
      libraryHTML() + '<div class="hub-foot">' + btn('◂ Back', 'go', 'data-view="' + (S.save.char ? 'map' : 'title') + '"', 'btn-small btn-ghost') + '</div></section>';
  };

  VIEWS.notebook = function () {
    var ids = Object.keys(S.save.mistakes).filter(function (id) { return RL.findQuestion(id); });
    var h = '<section class="notebook"><h2 class="section-title">Mistake notebook</h2><p class="lede">Every question you get wrong lands here. Get it right twice in a row and it leaves the notebook.</p>';
    if (!ids.length) {
      h += '<div class="empty">' + icon('smiley', 6) + '<p>Nothing to redo. Questions you miss in training or tests will appear here.</p></div>';
    } else {
      h += '<div class="title-actions">' + btn('Revise all ' + ids.length, 'nb-train', '', 'btn-hot') + '</div><ul class="nb-list">';
      ids.sort(function (a, b) { return S.save.mistakes[b].n - S.save.mistakes[a].n; }).forEach(function (id) {
        var q = RL.findQuestion(id), c = RL.getChapter(q.ch), m = S.save.mistakes[id];
        h += '<li><span class="stn-code">' + c.code + '</span><span class="nb-topic">' + esc(q.topic) + '</span><span class="nb-q">' + esc(q.q.length > 110 ? q.q.slice(0, 107) + '...' : q.q) + '</span><span class="nb-n">missed ×' + m.n + (m.streak ? ' · ' + m.streak + '/2 fixed' : '') + '</span></li>';
      });
      h += '</ul>';
    }
    return h + '<div class="hub-foot">' + btn('◂ Map', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  VIEWS.settings = function () {
    var p = player();
    return '<section class="settings"><h2 class="section-title">Settings</h2>' +
      '<div class="set-row"><div><h3>Sound effects</h3><p>8-bit blips for right and wrong answers.</p></div>' + btn(S.save.sound !== false ? 'On' : 'Off', 'toggle-sound', 'aria-pressed="' + (S.save.sound !== false) + '"', 'btn-small') + '</div>' +
      '<div class="set-row"><div><h3>Cram mode</h3><p>Open every station and the Final now. Useful with the exam ' + Math.max(0, daysLeft()) + ' days away.</p></div>' + btn(S.save.unlockAll ? 'On' : 'Off', 'toggle-unlock', 'aria-pressed="' + !!S.save.unlockAll + '"', 'btn-small') + '</div>' +
      '<div class="set-row"><div><h3>Student</h3><p>' + (p ? 'Playing as ' + esc(p.name) + '. Progress is kept if you switch.' : 'No student chosen yet.') + '</p></div>' + btn('Change', 'go', 'data-view="pick"', 'btn-small') + '</div>' +
      '<div class="set-row danger"><div><h3>Reset progress</h3><p>Clears grades, stars and the notebook on this device.</p></div>' + btn('Reset', 'ask-reset', '', 'btn-small btn-danger') + '</div>' +
      '<p class="lede small">Progress is saved in this browser only.</p>' +
      '<div class="hub-foot">' + btn('◂ Map', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  VIEWS.ending = function () {
    var p = player(), f = S.save.final.best;
    var h = '<section class="ending"><canvas class="clouds clouds-back" data-clouds="31" data-cell="7" aria-hidden="true"></canvas>' +
      '<div class="end-hero">' + icon('gradcap', 6, 'end-cap') + (p ? portrait(p.id, 9) : '') + '</div>' +
      '<h2 class="pixel-sub" data-text="PHILOSOPHER">PHILOSOPHER</h2>' +
      '<p class="lede">' + esc(p ? p.name : 'You') + ' rode the Reasoning Line from Kent Ridge to the Final Exam Hall.' + (f ? ' Best mock final: ' + f.letter + ' (' + f.pct + '%).' : '') + '</p>' +
      '<div class="table-wrap"><table class="transcript"><thead><tr><th>Station</th><th>Chapter</th><th>Best</th><th>GP</th></tr></thead><tbody>' +
      RL.chapters.map(function (c) { var s = S.save.ch[c.n]; return '<tr><td>' + c.code + '</td><td>' + esc(c.short) + '</td><td>' + (s && s.best ? s.best.letter + ' (' + s.best.pct + '%)' : '–') + '</td><td>' + (s && s.best ? s.best.gp.toFixed(1) : '–') + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="lede">Now sleep early, eat breakfast, and bring your printed notes on 30 November.</p>' +
      '<div class="title-actions">' + btn('Back to the map', 'go', 'data-view="map"', 'btn-hot') + '</div></section>';
    return h;
  };

  /* ================= ACTIONS ================= */
  var A = {};
  A.go = function (t) { go(t.getAttribute('data-view')); };
  A['new-game'] = function () { go('pick'); };
  A.choose = function (t) { S.save.char = t.getAttribute('data-id'); persist(); RL.sfx.play('win'); if (!chState(1).attempts && !passed(1)) go('chapter', { n: 1, line: 0 }); else go('map'); };
  A.enter = function (t) {
    var n = +t.getAttribute('data-n');
    if (!unlocked(n)) { RL.sfx.play('bad'); showOverlay('<h2>Station closed</h2><p>Pass ' + esc(RL.getChapter(n - 1).code) + ' with a C or better to open ' + esc(RL.getChapter(n).code) + '. Or turn on cram mode in Settings.</p><div class="title-actions">' + btn('OK', 'close-overlay', '', 'btn-hot') + btn('Settings', 'go-settings', '', 'btn-ghost') + '</div>'); return; }
    go('chapter', { n: n });
  };
  A['go-settings'] = function () { closeOverlay(); go('settings'); };
  A.line = function (t) { go('chapter', { n: S.params.n, line: +t.getAttribute('data-line') }); };
  A.lesson = function (t) { go('lesson', { n: +t.getAttribute('data-n'), i: 0 }); };
  A.card = function (t) {
    var learn = t.getAttribute('data-learn'), n = S.params.n, st = chState(n);
    if (learn != null && st.learned.indexOf(+learn) < 0) { st.learned.push(+learn); persist(); }
    go('lesson', { n: n, i: +t.getAttribute('data-i') });
  };
  A['train-from-lesson'] = function (t) {
    var n = +t.getAttribute('data-n'), st = chState(n), learn = +t.getAttribute('data-learn');
    if (st.learned.indexOf(learn) < 0) { st.learned.push(learn); persist(); }
    startTraining(n);
  };
  A.train = function (t) { startTraining(+t.getAttribute('data-n')); };
  A['nb-train'] = function () {
    var ids = U.shuffle(Object.keys(S.save.mistakes).filter(function (id) { return RL.findQuestion(id); }));
    if (ids.length) startTraining(null, ids);
  };
  A.lightning = function (t) { startLightning(+t.getAttribute('data-n')); };
  A['lt-go'] = function () { S.run.started = true; render(); };
  A.lt = function (t) { lightningAnswer(t.getAttribute('data-v') === '1'); };
  A.test = function (t) {
    var n = +t.getAttribute('data-n');
    showOverlay('<h2>' + esc(RL.getChapter(n).code) + ' graded test</h2><p>10 questions, 25 minutes, marked by Prof. Socra-Tan. MCQs are all-or-nothing; T/F sets earn partial credit with no penalty for wrong answers. Perks are off. You can open your notes.</p>' +
      '<div class="title-actions">' + btn('Begin', 'begin-test', 'data-n="' + n + '"', 'btn-hot') + btn('Not yet', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['begin-test'] = function (t) { closeOverlay(); startExam('chapter', +t.getAttribute('data-n')); };
  A.final = function (t) {
    var c = +t.getAttribute('data-count');
    showOverlay('<h2>Mock final: ' + c + ' questions</h2><p>' + Math.round(c * 3) + ' minutes. Questions run in lecture order like the 2018 paper. Navigate freely, flag questions, and submit when ready. Time running out submits automatically.</p>' +
      '<div class="title-actions">' + btn('Start the clock', 'begin-final', 'data-count="' + c + '"', 'btn-hot') + btn('Not yet', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['begin-final'] = function (t) { closeOverlay(); startExam('final', null, +t.getAttribute('data-count')); };
  A.pick = function (t) {
    var r = S.run, e = r.entries[r.i], v = +t.getAttribute('data-i');
    if (r.kind === 'train') { if (r.checked) return; e.resp = v; RL.sfx.play('click'); trainCheck(); return; }
    if (r.kind === 'exam') { e.resp = e.resp === v ? null : v; RL.sfx.play('click'); render(); }
  };
  A.tf = function (t) {
    var r = S.run, e = r.entries[r.i], i = +t.getAttribute('data-i'), v = t.getAttribute('data-v') === '1';
    if (r.kind === 'train' && r.checked) return;
    e.resp[i] = e.resp[i] === v ? null : v; RL.sfx.play('click'); render();
  };
  A.check = function () { trainCheck(); };
  A.next = function () { var r = S.run; r.i++; r.checked = false; r.eliminated = []; r.hintShown = false; go('train'); };
  A['quit-train'] = function () { var r = S.run; if (r && r.notebook) go('notebook'); else go('chapter', { n: r ? r.n : 1 }); };
  A.perk = function () {
    var r = S.run, e = r.entries[r.i];
    if (!r || r.perkLeft <= 0) return;
    if (r.perk === 'hint') { r.hintShown = true; r.perkLeft--; render(); return; }
    if (r.perk === 'eliminate' && e.mode !== 'tf') {
      var wrong = e.mode === 'mcq' ? e.order.filter(function (i) { return i !== e.q.a && r.eliminated.indexOf(i) < 0; }) : e.combo.labels.map(function (_, i) { return i; }).filter(function (i) { return i !== e.combo.answer && r.eliminated.indexOf(i) < 0; });
      if (wrong.length > 1) { r.eliminated.push(wrong[Math.floor(Math.random() * wrong.length)]); r.perkLeft--; render(); }
      return;
    }
    if (r.perk === 'retry' && r.checked) {
      r.score -= G.scoreEntry(e).earned; r.done--; r.checked = false;
      e.resp = e.mode === 'tf' ? e.q.s.map(function () { return null; }) : null;
      r.perkLeft--; render(); return;
    }
    if (r.perk === 'notes') {
      r.perkLeft--; var ch = RL.getChapter(e.q.ch || r.n);
      render();
      showOverlay('<h2>' + esc(ch.code + ' ' + ch.title) + '</h2><div class="library">' + ch.cards.map(function (c) { return '<article class="lib-card"><h4>' + esc(c.t) + '</h4>' + md(c.b) + '</article>'; }).join('') + '</div><div class="title-actions">' + btn('Back to the question', 'close-overlay', '', 'btn-hot') + '</div>', 'wide');
    }
  };
  A.goto = function (t) { var i = +t.getAttribute('data-i'), r = S.run; if (i < 0 || i >= r.entries.length) return; r.i = i; stopTimers(); render(); };
  A.flag = function () { var r = S.run; r.entries[r.i].flag = !r.entries[r.i].flag; stopTimers(); render(); };
  A.submit = function () { confirmSubmit(); };
  A['do-submit'] = function () { submitExam(false); };
  A.notes = function () { showOverlay('<h2>Notes</h2>' + libraryHTML(true) + '<div class="title-actions">' + btn('Back to the paper', 'close-overlay', '', 'btn-hot') + '</div>', 'wide'); };
  A['close-overlay'] = function () { closeOverlay(); };
  A['toggle-review'] = function () { var rv = doc.getElementById('review'); if (rv) { rv.hidden = !rv.hidden; if (!rv.hidden) try { rv.scrollIntoView({ behavior: 'smooth' }); } catch (e) { /* ignore */ } } };
  A['toggle-sound'] = function () { S.save.sound = S.save.sound === false; RL.sfx.setOn(S.save.sound); persist(); RL.sfx.play('click'); if (S.view === 'settings') render(); else syncTopbar(); };
  A['toggle-unlock'] = function () { S.save.unlockAll = !S.save.unlockAll; persist(); render(); };
  A['ask-reset'] = function () { showOverlay('<h2>Reset all progress?</h2><p>This clears every grade, star, lightning record and the notebook on this device. It cannot be undone.</p><div class="title-actions">' + btn('Yes, reset', 'do-reset', '', 'btn-danger') + btn('Cancel', 'close-overlay', '', 'btn-ghost') + '</div>'); };
  A['do-reset'] = function () { RL.store.clear(); S.save = RL.newSave(); persist(); closeOverlay(); go('title'); };
  A.home = function () { if (S.run && S.run.kind === 'exam' && !S.run.submitted) { showOverlay('<h2>Leave the exam?</h2><p>Your answers so far will be lost and nothing will be marked.</p><div class="title-actions">' + btn('Leave', 'leave-exam', '', 'btn-danger') + btn('Stay', 'close-overlay', '', 'btn-ghost') + '</div>'); return; } go(S.save.char ? 'map' : 'title'); };
  A['leave-exam'] = function () { S.run = null; closeOverlay(); go('map'); };

  /* ================= INPUT ================= */
  function onClick(ev) {
    var t = ev.target.closest('[data-act]');
    if (!t || t.disabled || t.getAttribute('aria-disabled') === 'true' && t.getAttribute('data-act') !== 'enter') return;
    var act = t.getAttribute('data-act');
    if (A[act]) { ev.preventDefault(); A[act](t, ev); }
  }
  function onKey(ev) {
    if (ev.target && /input|textarea|select/i.test(ev.target.tagName)) return;
    if (ev.key === 'Escape' && !overlay.hidden) { closeOverlay(); return; }
    if (!overlay.hidden) return;
    var r = S.run;
    if (S.view === 'lightning' && r && r.started && !r.over) {
      if (ev.key === 't' || ev.key === 'T' || ev.key === 'ArrowLeft') { ev.preventDefault(); lightningAnswer(true); }
      if (ev.key === 'f' || ev.key === 'F' || ev.key === 'ArrowRight') { ev.preventDefault(); lightningAnswer(false); }
      return;
    }
    if ((S.view === 'train' || S.view === 'exam') && r && r.entries && r.entries[r.i]) {
      var e = r.entries[r.i];
      var k = ev.key.toUpperCase(), idx = 'ABCDE'.indexOf(k);
      if (idx < 0 && /^[1-5]$/.test(ev.key)) idx = +ev.key - 1;
      if (idx >= 0 && e.mode !== 'tf' && !(S.view === 'train' && r.checked)) {
        var count = e.mode === 'mcq' ? e.order.length : e.combo.labels.length;
        if (idx < count) { var v = e.mode === 'mcq' ? e.order[idx] : idx; A.pick({ getAttribute: function () { return String(v); } }); }
        return;
      }
      if (ev.key === 'Enter' && S.view === 'train' && !(ev.target && ev.target.closest && ev.target.closest('button'))) {
        if (r.checked) A.next(); else if (e.mode === 'tf' && isAnswered(e)) trainCheck();
      }
      if (S.view === 'exam' && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) {
        var j = r.i + (ev.key === 'ArrowRight' ? 1 : -1);
        if (j >= 0 && j < r.entries.length) { r.i = j; stopTimers(); render(); }
      }
    }
  }

  /* ================= BOOT ================= */
  function start(data) {
    screen = doc.getElementById('screen');
    overlay = doc.getElementById('overlay');
    load();
    if (data && data.save && data.save.v === 1) { S.save = data.save; RL.sfx.setOn(S.save.sound !== false); }
    doc.addEventListener('click', onClick);
    doc.addEventListener('keydown', onKey);
    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) closeOverlay(); });
    PX.hydrate(doc.querySelector('.crt-bg'));
    PX.hydrate(doc.querySelector('.topbar'));
    var rt;
    root.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        Array.prototype.forEach.call(screen.querySelectorAll('canvas[data-clouds], canvas[data-skyline]'), function (c) {
          if (c.hasAttribute('data-clouds')) PX.clouds(c, +c.getAttribute('data-clouds'), { cell: +c.getAttribute('data-cell') || 6 });
          else PX.skyline(c, +c.getAttribute('data-skyline'));
        });
      }, 150);
    });
    var hot = root.claude && root.claude.hot;
    if (hot && hot.snapshot) { try { hot.snapshot(function () { return { save: S.save }; }); } catch (e) { /* ignore */ } }
    go(S.save.char ? 'map' : 'title');
  }
  RL.ui = { go: go, state: S };
  var hot = root.claude && root.claude.hot;
  function boot() { if (hot && hot.ready) hot.ready(start); else start((hot && hot.data) || {}); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
