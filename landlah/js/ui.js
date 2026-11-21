/* Land Lah! — screens, game loop and input. */
(function (root) {
  'use strict';
  var LL = root.LL, U = LL.util, PX = LL.px, G = LL.grading, CH = LL.cheats;
  var doc = root.document;
  var S = { save: null, view: 'title', params: {}, run: null, mark: null, tick: null, typer: null, ai: null, dl: null, tts: null, player: null, aiBusy: null, vmode: null, vrate: 1 };
  var screen, overlay;
  var esc = U.esc, md = U.md, M = LL.MCQ_MARKS;

  /* ---------------- state ---------------- */
  function load() {
    var s = LL.store.load();
    if (!s || s.v !== 1) s = LL.newSave();
    S.save = fixSave(s);
    LL.sfx.setOn(S.save.sound !== false);
    loadGen();
  }
  function fixSave(s) {
    var base = LL.newSave();
    Object.keys(base).forEach(function (k) { if (s[k] == null) s[k] = base[k]; });
    return s;
  }
  function loadGen() {
    LL.extraQs = (S.save.gen || []).map(function (g) { return g; });
  }
  function persist() {
    S.save.updated = Date.now();
    LL.store.save(S.save);
    LL.cloud.push(S.save);
  }
  function chState(n) {
    var c = S.save.ch[n];
    if (!c) c = S.save.ch[n] = { best: null, stars: 0, learned: [], attempts: 0, lightning: 0, history: [] };
    return c;
  }
  function passed(n) { var c = S.save.ch[n]; return !!(c && c.best && c.best.pct >= G.PASS); }
  function unlocked(n) { return S.save.unlockAll || n === 1 || passed(n - 1); }
  function passedCount() { return LL.chapters.filter(function (c) { return passed(c.n); }).length; }
  function rank() { return LL.RANKS[Math.min(LL.RANKS.length - 1, passedCount() + (bestMock() && bestMock().pct >= G.PASS ? 1 : 0))]; }
  function avgGP() {
    var gps = LL.chapters.map(function (c) { var s = S.save.ch[c.n]; return s && s.best ? s.best.gp : null; }).filter(function (x) { return x != null; });
    return gps.length ? gps.reduce(function (a, b) { return a + b; }, 0) / gps.length : null;
  }
  function bestMock() {
    var best = null;
    Object.keys(S.save.mocks).forEach(function (k) { var m = S.save.mocks[k]; if (m.best && (!best || m.best.pct > best.pct)) best = m.best; });
    return best;
  }
  function player() { return S.save.char ? LL.getPlayer(S.save.char) : null; }
  function openMistakes() { return Object.keys(S.save.mistakes).filter(function (id) { return LL.findQuestion(id) && !S.save.mistakes[id].fixed; }); }
  function openPoints() { return Object.keys(S.save.casePts).filter(function (id) { return !S.save.casePts[id].fixed; }); }
  function inViewer() { return !!(root.claude && typeof root.claude.use === 'function'); }
  function canPrint() { return !inViewer() && typeof root.print === 'function'; }

  /* ---------------- rendering ---------------- */
  function stopTimers() {
    if (S.tick) { clearInterval(S.tick); S.tick = null; }
    if (S.typer) { clearInterval(S.typer); S.typer = null; }
  }
  function go(view, params) {
    stopTimers();
    if (S.player) { try { S.player.stop(); } catch (e) { /* ignore */ } S.player = null; }
    if (S.vcount) { clearInterval(S.vcount); S.vcount = null; }
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
    var c = doc.getElementById('sync-chip');
    if (c) { var st = LL.cloud.status(); c.textContent = st === 'synced' ? 'SYNCED' : 'THIS DEVICE'; c.title = st === 'synced' ? 'Progress syncs to your Claude account' : 'Progress is saved in this browser'; }
  }
  function showOverlay(html, cls) {
    overlay.innerHTML = '<div class="overlay-card ' + (cls || '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    overlay.hidden = false;
    PX.hydrate(overlay);
    var f = overlay.querySelector('button, [tabindex], input');
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
    var ms = U.msToExam();
    if (ms <= 0) return ms > -2 * 3600000 ? 'The paper is on now' : 'The paper is done. Well played';
    var d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000);
    return (d ? d + ' day' + (d > 1 ? 's' : '') + ' ' : '') + h + ' h to the paper';
  }
  function fmtDate(t) { return new Date(t).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' }); }

  /* ---------------- items ---------------- */
  function fixedOrder(q) { return q.fixed || /^Practice paper/.test(q.src || ''); }
  function makeEntry(q, rand) {
    var e = { q: q, resp: null, flag: false, time: 0 };
    if (q.t === 'mcq') {
      e.mode = 'mcq';
      e.order = fixedOrder(q) ? q.o.map(function (_, i) { return i; }) : U.shuffle(q.o.map(function (_, i) { return i; }), rand);
      return e;
    }
    e.mode = 'combo';
    e.combo = LL.comboOptions(q, Math.floor(rand() * 1e9) + 1);
    return e;
  }
  function isAnswered(e) { return e.resp != null; }

  function questionHTML(e, opts) {
    opts = opts || {};
    var q = e.q, h = '';
    h += '<div class="q-meta"><span class="tag">' + (e.mode === 'combo' ? 'Roman-numeral MCQ' : 'MCQ') + ' · ' + M + ' marks</span><span class="tag tag-src">' + esc(q.src) + '</span><span class="tag tag-topic">' + esc(q.topic) + '</span></div>';
    h += '<div class="q-stem">' + md(q.q) + '</div>';
    var labels, answer;
    if (e.mode === 'combo') {
      h += '<ol class="stmts roman">';
      q.s.forEach(function (st, i) { h += '<li><span class="rn">(' + U.roman(i) + ')</span> <span>' + esc(st[0]) + '</span></li>'; });
      h += '</ol>';
      labels = e.combo.labels.map(function (l, i) { return [i, l]; });
      answer = e.combo.answer;
    } else {
      labels = e.order.map(function (oi) { return [oi, q.o[oi]]; });
      answer = q.a;
    }
    h += '<div class="options" role="group" aria-label="Options">';
    labels.forEach(function (pair, di) {
      var v = pair[0], cls = 'opt';
      if (e.resp === v) cls += ' chosen';
      if (opts.showAnswer && v === answer) cls += ' right';
      if (opts.showAnswer && e.resp === v && v !== answer) cls += ' wrong';
      if (opts.eliminated && opts.eliminated.indexOf(v) >= 0) cls += ' struck';
      h += '<button type="button" class="' + cls + '" data-act="pick" data-i="' + v + '"' + (opts.locked ? ' disabled' : '') + ' aria-pressed="' + (e.resp === v) + '"><span class="opt-key">' + U.letter(di) + '</span><span class="opt-text">' + esc(pair[1]) + '</span></button>';
    });
    return h + '</div>';
  }
  function letterOf(e, v) { return e.mode === 'combo' ? U.letter(v) : U.letter(e.order.indexOf(v)); }
  function explainHTML(e) {
    var q = e.q, sc = G.scoreEntry(e), h = '', full = sc.earned >= 1;
    var verdict = sc.blank ? 'Not answered' : (full ? 'Correct' : 'Incorrect');
    var vcls = sc.blank ? 'v-blank' : (full ? 'v-ok' : 'v-no');
    h += '<div class="verdict ' + vcls + '"><span class="v-icon" aria-hidden="true">' + (full ? '✓' : '✗') + '</span><span>' + verdict + '</span><span class="v-marks">' + (sc.earned * M) + ' / ' + M + '</span></div>';
    if (e.mode === 'mcq') {
      h += '<p class="ans-line"><b>Answer ' + letterOf(e, q.a) + '.</b> ' + esc(q.o[q.a]) + '</p><div class="why">' + md(q.why) + '</div>';
      if (!full && !sc.blank && q.trap) h += trapHTML(q.trap);
      if (/^AI/.test(q.src)) h += '<p class="ai-flag">Written by Claude from your notes. Check it against the lesson cards before relying on it.</p>';
    } else {
      h += '<p class="ans-line"><b>Answer ' + U.letter(e.combo.answer) + '.</b> ' + esc(e.combo.labels[e.combo.answer]) + '</p><ul class="st-why">';
      var shown = [];
      q.s.forEach(function (st, i) {
        var miss = sc.misjudged.indexOf(i) >= 0;
        h += '<li class="' + (miss ? 'miss' : '') + '"><span class="st-tv ' + (st[1] ? 'is-t' : 'is-f') + '">(' + U.roman(i) + ') ' + (st[1] ? 'TRUE' : 'FALSE') + '</span>' + (miss ? '<span class="st-you">you misjudged this</span>' : '') + '<div>' + md(st[2]) + '</div></li>';
        if (miss && st[3] && shown.indexOf(st[3]) < 0) shown.push(st[3]);
      });
      h += '</ul>';
      if (q.note) h += '<p class="q-note">' + esc(q.note) + '</p>';
      shown.forEach(function (k) { h += trapHTML(k); });
    }
    return h;
  }
  function trapHTML(k) {
    var T = LL.TRAPS[k]; if (!T) return '';
    var c = LL.getChapter(T.ch);
    return '<div class="trap-note"><span class="trap-label">Trap</span> ' + esc(T.text) + (c ? ' <span class="trap-ref">' + esc(c.code + ' ' + c.short) + '</span>' : '') + '</div>';
  }

  /* ---------------- mistakes notebook ---------------- */
  function noteResult(e) {
    var sc = G.scoreEntry(e), full = sc.earned >= 1, m = S.save.mistakes, id = e.q.id, cur = m[id];
    if (!full) {
      var traps = G.trapsFor(e, sc);
      m[id] = { n: ((cur && cur.n) || 0) + 1, streak: 0, at: Date.now(), traps: traps.length ? traps : (cur && cur.traps) || [], miss: sc.misjudged.length ? sc.misjudged : (cur && cur.miss) || [], fixed: false };
    } else if (cur && !cur.fixed) {
      cur.streak = (cur.streak || 0) + 1;
      if (cur.streak >= 2) cur.fixed = true;
    }
  }

  /* ================= VIEWS ================= */
  var VIEWS = {}, AFTER = {};

  VIEWS.title = function () {
    var has = !!S.save.char;
    return '<section class="title-screen">' +
      '<div class="title-stage">' +
      '<canvas class="clouds clouds-back" data-clouds="5" data-cell="7" aria-hidden="true"></canvas>' +
      icon('scroll', 7, 'title-brain') +
      '<h1 class="pixel-title" aria-label="Land Lah!"><span data-text="LAND">LAND</span><span data-text="LAH!">LAH!</span></h1>' +
      icon('key', 5, 'title-bulb') + icon('stamp', 4, 'title-bolt') + icon('cursor', 4, 'title-cursor') +
      '<canvas class="clouds clouds-front" data-clouds="9" data-cell="7" aria-hidden="true"></canvas>' +
      '</div>' +
      '<div class="title-stars">' + stars(3, 6) + '</div>' +
      '<p class="tagline">Ten lots, one Exam Hall, and a professor who marks in ILAC</p>' +
      '<p class="dateline">RE2702 Land Law final · ' + esc(LL.ref.exam.when) + '<br>' + esc(LL.ref.exam.where) + '</p>' +
      '<p class="countdown"><span>' + esc(countdownText()) + '</span></p>' +
      '<div class="title-actions">' +
      (has ? btn('CONTINUE', 'go', 'data-view="map"', 'btn-big') + btn('New game', 'new-game', '', 'btn-ghost') : btn('PRESS START', 'new-game', '', 'btn-big blink')) +
      btn('3-day plan', 'go', 'data-view="plan"', 'btn-ghost') + btn('Open the notes', 'go', 'data-view="library"', 'btn-ghost') +
      '</div>' +
      '<p class="title-how">Each lot is one chapter of the course: lesson cards, training with feedback, a lightning round, a graded test and case drills. The Exam Hall runs full 2-hour mock papers: 20 MCQs and a 40-mark case study, marked by Prof. Ellen Borough. Everything you get wrong builds your cheat sheet.</p>' +
      '</section>';
  };

  VIEWS.pick = function () {
    var cur = S.save.char;
    var h = '<section class="pick"><h2 class="section-title">Choose your student</h2><p class="lede">Four Real Estate students, four study styles. Perks work only in Training. Prof. Borough marks everyone the same.</p><div class="pick-grid">';
    LL.players.forEach(function (p) {
      h += '<article class="pick-card' + (cur === p.id ? ' current' : '') + '">' +
        '<div class="pick-portrait">' + portrait(p.id, 6) + '</div>' +
        '<h3>' + esc(p.name) + '</h3><p class="from">' + esc(p.from) + '</p>' +
        '<p class="blurb">' + esc(p.blurb) + '</p><p class="quote">"' + esc(p.quote) + '"</p>' +
        '<p class="perk"><b>' + esc(p.perkName) + '.</b> ' + esc(p.perkText) + '</p>' +
        btn(cur === p.id ? 'Playing' : 'Choose ' + esc(p.name), 'choose', 'data-id="' + p.id + '"', 'btn-small') +
        '</article>';
    });
    return h + '</div></section>';
  };

  VIEWS.map = function () {
    var p = player();
    if (!p) return VIEWS.pick();
    var gp = avgGP(), bm = bestMock(), nb = openMistakes().length + openPoints().length;
    var h = '<section class="map">';
    h += '<div class="player-card">' + portrait(p.id, 6) +
      '<div class="pc-text"><h2>' + esc(p.name) + '</h2><p class="pc-rank">' + esc(rank()) + '</p>' +
      '<dl class="pc-stats"><div><dt>Lots cleared</dt><dd>' + passedCount() + ' / 10</dd></div>' +
      '<div><dt>Average GP</dt><dd>' + (gp == null ? '–' : gp.toFixed(2)) + '</dd></div>' +
      '<div><dt>Best mock</dt><dd>' + (bm ? Math.round(bm.pct) + '%' : '–') + '</dd></div>' +
      '<div><dt>Notebook</dt><dd>' + nb + '</dd></div></dl></div>' +
      '<p class="pc-count">' + esc(countdownText()) + '</p></div>';
    h += '<nav class="map-tools" aria-label="Tools">' +
      btn(icon('calendar', 2) + ' 3-day plan', 'go', 'data-view="plan"', 'btn-small') +
      btn(icon('gavel', 2) + ' Exam Hall', 'go', 'data-view="hall"', 'btn-small btn-hot') +
      btn(icon('scroll', 2) + ' Case library', 'go', 'data-view="cases"', 'btn-small') +
      btn(icon('sheet', 2) + ' My cheat sheet (' + LL.concepts.counts(S.save).open + ')', 'go', 'data-view="mysheet"', 'btn-small btn-hot') +
      btn(icon('lock', 2) + ' Notebook (' + nb + ')', 'go', 'data-view="notebook"', 'btn-small') +
      btn('Sheet builder', 'go', 'data-view="cheats"', 'btn-small') +
      btn(icon('book', 2) + ' Notes', 'go', 'data-view="library"', 'btn-small') +
      btn('Settings', 'go', 'data-view="settings"', 'btn-small btn-ghost') + '</nav>';
    h += '<h2 class="section-title">The estate plan</h2><p class="lede">One lot per chapter, in lecture order. A C (' + G.PASS + '%) on a lot\'s graded test clears it.' + (S.save.unlockAll ? ' Crunch mode is on: every lot is open.' : '') + '</p>';
    h += '<ol class="line">';
    LL.chapters.forEach(function (ch) {
      var st = S.save.ch[ch.n], open = unlocked(ch.n), ok = passed(ch.n);
      h += '<li class="station' + (open ? '' : ' locked') + (ok ? ' passed' : '') + '"><button type="button" class="stn" data-act="enter" data-n="' + ch.n + '"' + (open ? '' : ' aria-disabled="true"') + '>' +
        '<span class="stn-dot" aria-hidden="true"></span><span class="stn-code">' + ch.code + '</span>' +
        '<span class="stn-icon">' + icon(open ? ch.icon : 'lock', 3) + '</span>' +
        '<span class="stn-text"><span class="stn-place">' + esc(ch.place) + '</span><span class="stn-title">' + esc(ch.title) + '</span><span class="stn-lec">' + esc(ch.lec) + ' · ' + ch.qs.length + ' MCQs · ' + casesFor(ch.n).length + ' cases</span></span>' +
        '<span class="stn-grade">' + (st && st.best ? '<b>' + st.best.letter + '</b>' + stars(st.stars || 0, 2) : '<span class="stn-new">' + (open ? 'Open' : 'Locked') + '</span>') + '</span>' +
        '</button></li>';
    });
    h += '<li class="station terminal' + (bm && bm.pct >= G.PASS ? ' passed' : '') + '"><button type="button" class="stn" data-act="go" data-view="hall">' +
      '<span class="stn-dot" aria-hidden="true"></span><span class="stn-code">HALL</span><span class="stn-icon">' + icon('gavel', 3) + '</span>' +
      '<span class="stn-text"><span class="stn-place">Exam Hall · Biz2, 05-11</span><span class="stn-title">Full mock papers: 20 MCQs + a 40-mark case study</span><span class="stn-lec">2 hours · open book · marked by Prof. Borough</span></span>' +
      '<span class="stn-grade">' + (bm ? '<b>' + bm.letter + '</b>' : '<span class="stn-new">Open</span>') + '</span></button></li>';
    return h + '</ol></section>';
  };

  function casesFor(n) { return LL.cases.filter(function (c) { return c.chs.indexOf(n) >= 0; }); }

  VIEWS.lot = function (p) {
    var ch = LL.getChapter(p.n), st = chState(p.n), cards = LL.cardsFor(ch);
    var lines = ch.story.slice();
    var line = p.line == null ? (passed(ch.n) ? -1 : 0) : p.line;
    var text = line < 0 ? ch.win : lines[line];
    var last = line < 0 || line >= lines.length - 1;
    var h = '<section class="hub">';
    h += '<div class="hub-banner"><canvas class="skyline" data-skyline="' + ch.sky + '" aria-hidden="true"></canvas><canvas class="clouds clouds-hub" data-clouds="' + (ch.sky + 3) + '" data-cell="5" aria-hidden="true"></canvas>' +
      '<div class="hub-landmark">' + icon(ch.icon, 6) + '</div>' +
      '<div class="hub-title"><span class="stn-code">' + ch.code + '</span><h2>' + esc(ch.place) + '</h2><p>' + esc(ch.spot) + '</p></div></div>';
    h += '<div class="chapter-name"><span>' + esc(ch.lec) + '</span><h3>' + esc(ch.title) + '</h3></div>';
    h += '<div class="dialogue"><div class="mentors">' + ch.mentor.map(function (m) { return portrait(m, 5); }).join('') + '</div>' +
      '<div class="speech"><p class="speaker">' + esc(ch.mentorName) + '</p><p class="speech-text" data-full="' + esc(text) + '">' + esc(text) + '</p>' +
      '<div class="speech-nav">' + (last ? (line < 0 ? btn('Replay intro', 'line', 'data-line="0"', 'btn-small btn-ghost') : '') : btn('Next ▸', 'line', 'data-line="' + (line + 1) + '"', 'btn-small')) +
      (!last ? btn('Skip', 'line', 'data-line="' + (lines.length - 1) + '"', 'btn-small btn-ghost') : '') + '</div></div></div>';
    var learned = (st.learned || []).length, cs = casesFor(ch.n);
    var gen = LL.extraQs.filter(function (q) { return q.ch === ch.n; }).length;
    h += '<div class="activities five">' +
      actBtn('1', 'Watch the lesson', (st.watched ? '✓ watched · ' : '') + '~' + LL.videoMinutes(LL.videos[ch.n]) + ' min · narrated', 'watch', 'tv') +
      actBtn('2', 'Training', ch.qs.length + ' MCQs, instant feedback', 'train', 'brain') +
      actBtn('3', 'Lightning', st.lightning ? 'Best ' + st.lightning + ' pts' : '60 s of rapid true/false', 'lightning', 'bolt') +
      actBtn('4', 'Graded test', st.best ? 'Best ' + st.best.letter + ' (' + st.best.pct + '%)' : '10 MCQs · 25 min · /30', 'test', 'hourglass') +
      actBtn('5', 'Case drills', cs.length + ' case studies (ILAC)', 'lot-cases', 'scroll') +
      '</div>';
    h += '<div class="ai-row">' + btn(icon('book', 2) + ' Read the lesson cards (' + learned + '/' + cards.length + ')', 'lesson', 'data-n="' + ch.n + '"', 'btn-small btn-ghost') + (S.ai ? btn(icon('bulb', 2) + ' New question in the prof\'s style (Claude)', 'gen-q', 'data-n="' + ch.n + '"', 'btn-small') : '') +
      (gen ? btn('Train on ' + gen + ' saved Claude question' + (gen > 1 ? 's' : ''), 'train-gen', 'data-n="' + ch.n + '"', 'btn-small btn-ghost') : '') +
      btn(icon('sheet', 2) + ' One-pager for this lot', 'lot-sheet', 'data-n="' + ch.n + '"', 'btn-small btn-ghost') + '</div>';
    if (st.best) h += '<p class="hub-best">Best result ' + stars(st.stars || 0, 3) + ' <b>' + st.best.letter + '</b> · ' + st.best.pct + '% · ' + st.attempts + ' attempt' + (st.attempts === 1 ? '' : 's') + '</p>';
    h += '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
    return h;
    function actBtn(num, label, sub, act, ic) {
      return '<button type="button" class="act' + (act === 'watch' && !st.watched ? ' act-start' : '') + '" data-act="' + act + '" data-n="' + ch.n + '"> data-n="' + ch.n + '"><span class="act-num">' + num + '</span>' + icon(ic, 4) + '<span class="act-label">' + label + '</span><span class="act-sub">' + esc(sub) + '</span></button>';
    }
  };
  AFTER.lot = function () {
    var el = screen.querySelector('.speech-text'); if (!el) return;
    var full = el.getAttribute('data-full');
    var reduce = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !full) return;
    var i = 0; el.textContent = '';
    S.typer = setInterval(function () { i += 2; el.textContent = full.slice(0, i); if (i >= full.length) { clearInterval(S.typer); S.typer = null; } }, 16);
    el.addEventListener('click', function () { if (S.typer) { clearInterval(S.typer); S.typer = null; } el.textContent = full; });
  };

  VIEWS.lesson = function (p) {
    var ch = LL.getChapter(p.n), cards = LL.cardsFor(ch), i = Math.max(0, Math.min(cards.length - 1, p.i || 0)), card = cards[i], st = chState(p.n);
    var read = st.learned.indexOf(i) >= 0;
    var h = '<section class="lesson"><div class="lesson-head"><span class="stn-code">' + ch.code + '</span><h2>' + esc(ch.title) + '</h2><p>Lesson card ' + (i + 1) + ' of ' + cards.length + '</p></div>';
    h += '<article class="card-big"><h3>' + esc(card.t) + '</h3><div class="card-body">' + md(card.b) + '</div></article>';
    h += '<div class="dots" aria-hidden="true">' + cards.map(function (_, k) { return '<span class="dot' + (k === i ? ' on' : '') + (st.learned.indexOf(k) >= 0 ? ' read' : '') + '"></span>'; }).join('') + '</div>';
    h += '<div class="lesson-nav">' + btn('◂ Prev', 'card', 'data-i="' + (i - 1) + '"' + (i === 0 ? ' disabled' : ''), 'btn-small btn-ghost') +
      (i < cards.length - 1 ? btn(read ? 'Next ▸' : 'Got it ▸', 'card', 'data-i="' + (i + 1) + '" data-learn="' + i + '"', 'btn-small') : btn('Finish: start training', 'train-from-lesson', 'data-n="' + ch.n + '" data-learn="' + i + '"', 'btn-small btn-hot')) +
      '</div><div class="hub-foot">' + btn('◂ Lot', 'enter', 'data-n="' + ch.n + '"', 'btn-small btn-ghost') + '</div></section>';
    return h;
  };

  /* ---------- auto cheat sheet ---------- */
  function addedHTML(cs0) {
    if (!cs0) return '';
    var add = LL.concepts.added(cs0, S.save);
    if (!add.length) return '<div class="auto-sheet clean"><p><b>Your cheat sheet:</b> nothing new from this attempt.</p>' + btn('Open my cheat sheet', 'go', 'data-view="mysheet"', 'btn-small btn-ghost') + '</div>';
    return '<div class="auto-sheet"><div class="auto-head">' + icon('sheet', 3) + '<h3>Added to your cheat sheet</h3><span>' + add.length + ' concept' + (add.length > 1 ? 's' : '') + '</span></div>' +
      '<div class="auto-cards">' + add.slice(0, 6).map(function (c) { return LL.concepts.cardHTML(c, { compact: true }); }).join('') + '</div>' +
      (add.length > 6 ? '<p class="auto-more">+ ' + (add.length - 6) + ' more on your sheet.</p>' : '') +
      '<div class="auto-btns">' + btn('Open my cheat sheet', 'go', 'data-view="mysheet"', 'btn-small btn-hot') + btn('Save it to print', 'mysheet-save', '', 'btn-small') + '</div></div>';
  }
  function findConcept(key) {
    var l = LL.concepts.build(S.save);
    for (var i = 0; i < l.length; i++) if (l[i].key === key) return l[i];
    return null;
  }

  /* ---------- training ---------- */
  function startTraining(n, qs, label, back, extra) {
    var rand = U.rng(Date.now());
    qs = qs || U.shuffle(LL.getChapter(n).qs, rand);
    var p = player();
    var perkUses = p ? ({ hint: 2, eliminate: 2, retry: 2, notes: 3 })[p.perk] || 0 : 0;
    S.run = { kind: 'train', n: n, label: label || null, back: back || null, cs0: LL.concepts.snapshot(S.save), entries: qs.map(function (q) { return makeEntry(q, rand); }), i: 0, checked: false, eliminated: [], score: 0, done: 0, perk: p ? p.perk : null, perkLeft: perkUses, hintShown: false };
    if (extra) Object.keys(extra).forEach(function (k) { S.run[k] = extra[k]; });
    go('train');
  }
  VIEWS.train = function () {
    var r = S.run; if (!r || r.kind !== 'train') return VIEWS.map();
    if (r.i >= r.entries.length) return trainSummary(r);
    var e = r.entries[r.i], ch = LL.getChapter(e.q.ch || r.n);
    var h = '<section class="play"><div class="play-head"><div><span class="stn-code">' + (r.label && !r.checkpoint ? 'NB' : ch.code) + '</span><h2>' + (r.label ? esc(r.label) : 'Training · ' + esc(ch.short)) + '</h2></div>' +
      '<div class="play-progress"><span>' + (r.i + 1) + ' / ' + r.entries.length + '</span><span class="score-chip">' + (r.score * M) + ' marks</span></div></div>';
    h += '<div class="bar"><span style="width:' + (100 * r.i / r.entries.length) + '%"></span></div>';
    h += '<article class="q-card">' + questionHTML(e, { locked: r.checked, showAnswer: r.checked, eliminated: r.eliminated }) + '</article>';
    if (r.hintShown) h += hintHTML(e);
    h += '<div class="play-actions">';
    if (!r.checked) h += perkButton(r, e);
    else {
      h += btn(r.i + 1 < r.entries.length ? 'Next ▸' : 'See results', 'next', '', 'btn-hot');
      if (r.perk === 'retry' && r.perkLeft > 0 && G.scoreEntry(e).earned < 1) h += btn('Second Shot: retry (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    }
    h += btn('Quit', 'quit-train', '', 'btn-ghost btn-small') + '</div>';
    if (r.checked) {
      var wrong = G.scoreEntry(e).earned < 1;
      h += '<div class="explain" aria-live="polite">' + explainHTML(e) + (wrong ? '<p class="auto-note">' + icon('sheet', 2) + ' Saved to your cheat sheet under <b>' + esc(e.q.topic) + '</b> (' + esc((LL.getChapter(e.q.ch) || {}).code || '') + ').</p>' : '') + '</div>';
    }
    return h + '</section>';
  };
  function perkButton(r, e) {
    if (!r.perk || r.perkLeft <= 0) return '';
    var p = player();
    if (r.perk === 'hint' && !r.hintShown) return btn(esc(p.perkName) + ': show trap (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    if (r.perk === 'eliminate') return btn(esc(p.perkName) + ': strike one (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    if (r.perk === 'notes') return btn(esc(p.perkName) + ': open notes (' + r.perkLeft + ')', 'perk', '', 'btn-ghost');
    return '';
  }
  function hintHTML(e) {
    var key = e.q.trap;
    if (!key && e.q.s) for (var i = 0; i < e.q.s.length; i++) if (e.q.s[i][3]) { key = e.q.s[i][3]; break; }
    if (key && LL.TRAPS[key]) return '<div class="hint">' + trapHTML(key) + '</div>';
    return '<div class="hint"><div class="trap-note"><span class="trap-label">Hint</span> No named trap here. Topic: ' + esc(e.q.topic) + '. Read every option to the last word.</div></div>';
  }
  function trainCheck() {
    var r = S.run, e = r.entries[r.i];
    if (r.checked) return;
    r.checked = true;
    var sc = G.scoreEntry(e);
    r.score += sc.earned; r.done++;
    noteResult(e); persist();
    LL.sfx.play(sc.earned >= 1 ? 'ok' : 'bad');
    render();
    var ex = screen.querySelector('.explain'); if (ex) try { ex.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) { /* ignore */ }
  }
  function trainSummary(r) {
    var pct = r.entries.length ? Math.round(100 * r.score / r.entries.length) : 0;
    if (!r.label && r.n) { var st = chState(r.n); st.trained = Math.max(st.trained || 0, pct); persist(); }
    if (r.checkpoint) { var cst = chState(r.n); cst.check = Math.max(cst.check || 0, pct); persist(); }
    return '<section class="summary"><h2 class="section-title">' + (r.checkpoint ? 'Checkpoint complete' : 'Training complete') + '</h2>' +
      '<p class="big-num">' + (r.score * M) + ' <small>/ ' + (r.entries.length * M) + '</small></p><p class="lede">' + pct + '%. Practice only, not graded.</p>' + addedHTML(r.cs0) +
      '<div class="title-actions">' + (r.checkpoint ? btn('Take the graded test', 'test', 'data-n="' + r.n + '"', 'btn-hot') + btn('Rewatch the lesson', 'watch', 'data-n="' + r.n + '"') + btn('◂ Lot', 'enter', 'data-n="' + r.n + '"', 'btn-ghost') : r.label ? btn(r.back === 'mysheet' ? 'Back to my cheat sheet' : 'Back to the Notebook', 'go', 'data-view="' + (r.back || 'notebook') + '"', 'btn-hot') : btn('Take the graded test', 'test', 'data-n="' + r.n + '"', 'btn-hot') + btn('Train again', 'train', 'data-n="' + r.n + '"') + btn('◂ Lot', 'enter', 'data-n="' + r.n + '"', 'btn-ghost')) + '</div></section>';
  }

  /* ---------- video lessons ---------- */
  function voiceModes() {
    var out = [];
    if (S.tts) out.push(['claude', 'Claude voice']);
    if (root.speechSynthesis && root.SpeechSynthesisUtterance) out.push(['device', 'Device voice']);
    out.push(['captions', 'Captions only']);
    return out;
  }
  function defaultMode() {
    var m = voiceModes().map(function (x) { return x[0]; });
    return S.vmode && m.indexOf(S.vmode) >= 0 ? S.vmode : m[0];
  }
  function videoFor(p) { return p.custom || LL.videos[p.n]; }
  VIEWS.watch = function (p) {
    var v = videoFor(p); if (!v) return VIEWS.map();
    var ch = LL.getChapter(v.n), lines = LL.videoLines(v), quizzes = v.scenes.filter(function (s) { return s.t === 'quiz'; }).length;
    var h = '<section class="watch"><div class="play-head"><div><span class="stn-code">' + esc(ch.code) + '</span><h2>' + (v.custom ? 'Explainer · ' : 'Watch · ') + esc(v.title || ch.title) + '</h2></div>' +
      '<div class="play-progress"><span>~' + LL.videoMinutes(v) + ' min</span>' + (quizzes ? '<span class="score-chip">' + quizzes + ' quick checks</span>' : '') + '</div></div>';
    h += '<div class="vplayer" id="vplayer"><div class="vstage">' +
      '<canvas class="vstage-sky" data-skyline="' + ch.sky + '" aria-hidden="true"></canvas>' +
      '<div class="vstage-scene" aria-live="polite"></div>' +
      '<canvas class="vs-mentor" data-portrait="' + esc(ch.mentor[0]) + '" data-scale="4" aria-hidden="true"></canvas>' +
      '<div class="vs-cap" id="vs-cap"><span class="vs-cap-text"></span></div>' +
      '<button type="button" class="vs-big" data-act="v-play" aria-label="Play the lesson"><span>▶</span> PLAY</button>' +
      '<div class="vs-end" id="vs-end" hidden></div>' +
      '</div>' +
      '<div class="vprog" id="vprog" role="group" aria-label="Scenes">' + v.scenes.map(function (s, i) {
        var w = lines.filter(function (l) { return l.si === i; }).reduce(function (a, l) { return a + U.words(l.text); }, 0) || 4;
        return '<button type="button" class="vseg vseg-' + s.t + '" data-act="v-seek" data-i="' + i + '" style="flex-grow:' + w + '" aria-label="Scene ' + (i + 1) + '"></button>';
      }).join('') + '</div>' +
      '<div class="vctrl">' + btn('⏮', 'v-prev', 'aria-label="Previous scene"', 'btn-small btn-ghost') + btn('▶ Play', 'v-toggle', 'id="v-toggle"', 'btn-small btn-hot') + btn('⏭', 'v-next', 'aria-label="Next scene"', 'btn-small btn-ghost') + btn('↺', 'v-restart', 'aria-label="Restart"', 'btn-small btn-ghost') +
      '<label class="vsel"><span>Voice</span><select id="v-voice">' + voiceModes().map(function (m) { return '<option value="' + m[0] + '"' + (m[0] === defaultMode() ? ' selected' : '') + '>' + m[1] + '</option>'; }).join('') + '</select></label>' +
      '<label class="vsel"><span>Speed</span><select id="v-rate">' + [0.85, 1, 1.15, 1.3, 1.5].map(function (r) { return '<option value="' + r + '"' + (r === S.vrate ? ' selected' : '') + '>' + r + '×</option>'; }).join('') + '</select></label>' +
      btn('CC', 'v-cc', 'aria-pressed="true" id="v-cc"', 'btn-small btn-ghost') + '</div></div>';
    h += '<p class="lede small">Keys: Space to play or pause, ← → to change scene, T or F to answer a quick check. ' + (S.tts ? 'The Claude voice reads it to you; the device voice works offline.' : (inViewer() ? 'If you hear nothing, choose another voice. Captions always show the narration.' : 'This copy uses your device\'s built-in voice; captions always show the narration.')) + '</p>';
    return h + '<div class="hub-foot">' + (v.custom ? btn('◂ My cheat sheet', 'go', 'data-view="mysheet"', 'btn-small btn-ghost') : btn('◂ Lot', 'enter', 'data-n="' + v.n + '"', 'btn-small btn-ghost') + btn('Read the cards instead', 'lesson', 'data-n="' + v.n + '"', 'btn-small btn-ghost')) + '</div></section>';
  };
  AFTER.watch = function (p) {
    var v = videoFor(p); if (!v) return;
    var el = doc.getElementById('vplayer'), tbtn = doc.getElementById('v-toggle'), big = el.querySelector('.vs-big');
    var segs = el.querySelectorAll('.vseg');
    var player = new LL.Player({
      video: v, root: el, tts: S.tts, mode: defaultMode(), rate: S.vrate,
      onState: function (st) {
        tbtn.textContent = st === 'playing' ? '❚❚ Pause' : (st === 'ended' ? '↺ Replay' : (st === 'quiz' ? 'Answer the check' : '▶ Play'));
        tbtn.disabled = st === 'quiz';
        big.hidden = st !== 'ready';
        el.classList.toggle('is-quiz', st === 'quiz');
        el.classList.toggle('is-paused', st === 'paused');
      },
      onScene: function (si) { Array.prototype.forEach.call(segs, function (sg, i) { sg.classList.toggle('done', i < si); sg.classList.toggle('cur', i === si); }); },
      onQuiz: function (s, right) {
        if (s.qi == null || v.custom) return;
        var lk = v.n + ':' + s.qi, lm = S.save.ltMiss, cur = lm[lk];
        if (!right) lm[lk] = { ch: v.n, i: s.qi, n: ((cur && cur.n) || 0) + 1, at: Date.now(), streak: 0, fixed: false };
        else if (cur && !cur.fixed) { cur.streak = (cur.streak || 0) + 1; if (cur.streak >= 2) cur.fixed = true; }
        persist();
      },
      onEnd: function (q) {
        if (!v.custom) { var st = chState(v.n); st.watched = Date.now(); st.vq = { right: q.right, total: q.total }; persist(); }
        showEnd(v, q);
      },
      onNotice: function (m) { flash(m); },
      onMode: function (name) { var vs = doc.getElementById('v-voice'); if (vs && vs.querySelector('option[value="' + name + '"]')) vs.value = name; }
    });
    S.player = player;
    player.poster();
    var sel = doc.getElementById('v-voice'), rsel = doc.getElementById('v-rate');
    /* hand focus back to the page after a change so Space and T/F keep driving the player */
    sel.addEventListener('change', function () { S.vmode = sel.value; player.setMode(sel.value); sel.blur(); });
    rsel.addEventListener('change', function () { S.vrate = +rsel.value; player.setRate(S.vrate); rsel.blur(); });
  };
  function showEnd(v, q) {
    var end = doc.getElementById('vs-end'); if (!end) return;
    var ch = LL.getChapter(v.n);
    end.hidden = false;
    if (v.custom) {
      end.innerHTML = '<h3>Explainer done</h3><p>Now prove it: drill the questions on this concept.</p><div class="title-actions">' + btn('Drill this concept', 'mysheet-drill', 'data-key="' + esc(v.key || '') + '"', 'btn-hot') + btn('Rewatch', 'v-restart', '', 'btn-ghost') + '</div>';
      return;
    }
    end.innerHTML = '<h3>Lesson complete</h3>' + (q.total ? '<p class="vs-end-score">Quick checks: <b>' + q.right + ' / ' + q.total + '</b>' + (q.right < q.total ? ' · the ones you missed are on your cheat sheet' : '') + '</p>' : '') +
      '<p>Now let\'s test you: a 5-question checkpoint on ' + esc(ch.short) + ', then the graded test.</p>' +
      '<div class="title-actions">' + btn('Start the checkpoint <span id="v-count">(10)</span>', 'checkpoint', 'data-n="' + v.n + '"', 'btn-hot') + btn('Rewatch', 'v-restart', '', 'btn-ghost') + btn('Not now', 'v-cancel-count', '', 'btn-ghost') + '</div>';
    var left = 10;
    S.vcount = setInterval(function () {
      left--; var c = doc.getElementById('v-count'); if (c) c.textContent = '(' + left + ')';
      if (left <= 0) { clearInterval(S.vcount); S.vcount = null; startCheckpoint(v.n); }
    }, 1000);
  }
  function startCheckpoint(n) {
    var ch = LL.getChapter(n), open = ch.qs.filter(function (q) { var m = S.save.mistakes[q.id]; return m && !m.fixed; });
    var rest = U.shuffle(ch.qs.filter(function (q) { return open.indexOf(q) < 0; }));
    var qs = U.shuffle(open).slice(0, 2).concat(rest).slice(0, 5);
    startTraining(n, qs, 'Checkpoint · ' + ch.short, null, { checkpoint: true });
  }

  /* ---------- lightning ---------- */
  function startLightning(n) {
    var ch = LL.getChapter(n);
    S.run = { kind: 'lightning', n: n, cs0: LL.concepts.snapshot(S.save), pool: U.shuffle(ch.quick), k: 0, left: 60, total: 60, score: 0, combo: 0, answered: 0, correct: 0, misses: [], over: false, flash: null, started: false };
    go('lightning');
  }
  function mult(r) { return Math.min(5, 1 + Math.floor(r.combo / 3)); }
  VIEWS.lightning = function () {
    var r = S.run; if (!r || r.kind !== 'lightning') return VIEWS.map();
    var ch = LL.getChapter(r.n);
    if (r.over) return lightningSummary(r);
    var it = r.pool[r.k % r.pool.length];
    var h = '<section class="lightning"><div class="play-head"><div><span class="stn-code">' + ch.code + '</span><h2>Lightning round</h2></div>' +
      '<div class="lt-hud"><span class="lt-score" id="lt-score">' + r.score + '</span><span class="lt-mult" id="lt-mult">×' + mult(r) + '</span></div></div>' +
      '<div class="bar bar-time"><span id="lt-bar" style="width:' + (100 * r.left / r.total) + '%"></span></div>' +
      '<p class="lt-time"><span id="lt-left">' + Math.ceil(r.left) + '</span>s</p>';
    if (!r.started) h += '<div class="lt-ready"><p>True or false? As many as you can in 60 seconds. Three in a row raises your multiplier. Keys: T / F or ← / →.</p>' + btn('GO!', 'lt-go', '', 'btn-big btn-hot') + '</div>';
    else h += '<div class="lt-card" id="lt-card"><p>' + esc(it[0]) + '</p></div><div class="lt-btns">' + btn('TRUE', 'lt', 'data-v="1"', 'btn-big lt-t') + btn('FALSE', 'lt', 'data-v="0"', 'btn-big lt-f') + '</div>';
    return h + '<div class="hub-foot">' + btn('Quit', 'enter', 'data-n="' + r.n + '"', 'btn-small btn-ghost') + '</div></section>';
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
    var qi = LL.getChapter(r.n).quick.indexOf(it), lk = r.n + ':' + qi, lm = S.save.ltMiss, cur = lm[lk];
    if (v === it[1]) {
      r.correct++; r.combo++; r.score += 100 * mult(r); LL.sfx.play(r.combo % 3 === 0 ? 'combo' : 'ok'); r.flash = 'ok';
      if (cur && !cur.fixed) { cur.streak = (cur.streak || 0) + 1; if (cur.streak >= 2) cur.fixed = true; }
    } else {
      r.combo = 0; r.misses.push(it); LL.sfx.play('bad'); r.flash = 'no';
      if (qi >= 0) lm[lk] = { ch: r.n, i: qi, n: ((cur && cur.n) || 0) + 1, at: Date.now(), streak: 0, fixed: false };
    }
    r.k++;
    if (r.k % r.pool.length === 0) r.pool = U.shuffle(r.pool);
    var card = doc.getElementById('lt-card'), next = r.pool[r.k % r.pool.length];
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
    persist(); LL.sfx.play('win'); render();
  }
  function lightningSummary(r) {
    var acc = r.answered ? Math.round(100 * r.correct / r.answered) : 0;
    var h = '<section class="summary"><h2 class="section-title">Time!</h2><p class="big-num">' + r.score + ' <small>pts</small></p>' +
      '<p class="lede">' + r.correct + ' of ' + r.answered + ' correct (' + acc + '%).' + (r.newBest ? ' New lot record.' : '') + '</p>';
    if (r.misses.length) {
      var seen = {};
      h += '<h3 class="sub">Fix these</h3><ul class="miss-list">';
      r.misses.forEach(function (m) { if (seen[m[0]]) return; seen[m[0]] = 1; h += '<li><span class="st-tv ' + (m[1] ? 'is-t' : 'is-f') + '">' + (m[1] ? 'TRUE' : 'FALSE') + '</span> ' + esc(m[0]) + '<div class="why">' + md(m[2]) + '</div></li>'; });
      h += '</ul>';
    }
    h += addedHTML(r.cs0);
    return h + '<div class="title-actions">' + btn('Play again', 'lightning', 'data-n="' + r.n + '"', 'btn-hot') + btn('◂ Lot', 'enter', 'data-n="' + r.n + '"', 'btn-ghost') + '</div></section>';
  }

  /* ---------- MCQ selection ---------- */
  function lotTest(n, rand) {
    var qs = LL.getChapter(n).qs.slice();
    var groups = {};
    U.shuffle(qs, rand).forEach(function (q) { (groups[q.topic] = groups[q.topic] || []).push(q); });
    var keys = U.shuffle(Object.keys(groups), rand), out = [];
    while (out.length < Math.min(10, qs.length)) {
      var moved = false;
      keys.forEach(function (k) { if (out.length < 10 && groups[k].length) { out.push(groups[k].shift()); moved = true; } });
      if (!moved) break;
    }
    return out;
  }
  /* Section A for a fixed mock: 2 MCQs per lot, deterministic, forced questions included and kept apart across papers. */
  function mockMCQs(mock) { return LL.mockMCQs(mock); }
  function randomMCQs(rand) {
    var out = [];
    LL.chapters.forEach(function (c) { out = out.concat(U.shuffle(c.qs, rand).slice(0, 2)); });
    return out;
  }

  /* ---------- graded test / Section A ---------- */
  function startExam(scope, opts) {
    var seed = Date.now() % 1e9, rand = U.rng(seed), qs, limit, title;
    if (scope === 'lot') { qs = lotTest(opts.n, rand); limit = qs.length * 150; title = LL.getChapter(opts.n).code + ' graded test'; }
    else {
      var mock = opts.mockId === 'random' ? null : findMock(opts.mockId);
      qs = mock ? mockMCQs(mock) : randomMCQs(rand); limit = 60 * 60; title = (mock ? mock.title : 'Random paper') + ' · Section A';
    }
    S.run = { kind: 'exam', cs0: LL.concepts.snapshot(S.save), scope: scope, n: opts.n, mockId: opts.mockId, title: title, seed: seed, entries: qs.map(function (q) { return makeEntry(q, rand); }), i: 0, limit: limit, started: Date.now(), submitted: false };
    go('exam');
  }
  function findMock(id) { for (var i = 0; i < LL.ref.mocks.length; i++) if (LL.ref.mocks[i].id === id) return LL.ref.mocks[i]; return null; }
  function timeLeft(r) { return r.limit - (Date.now() - r.started) / 1000; }
  function qnavHTML(r, activeTab) {
    var h = '<nav class="qnav" aria-label="Questions">';
    r.entries.forEach(function (x, k) {
      h += '<button type="button" class="qn' + (activeTab !== 'B' && k === r.i ? ' cur' : '') + (isAnswered(x) ? ' done' : '') + (x.flag ? ' flag' : '') + '" data-act="goto" data-i="' + k + '" aria-label="Question ' + (k + 1) + (x.flag ? ', flagged' : '') + '">' + (k + 1) + '</button>';
    });
    return h + '</nav>';
  }
  VIEWS.exam = function () {
    var r = S.run; if (!r || r.kind !== 'exam') return VIEWS.map();
    var e = r.entries[r.i];
    var h = '<section class="exam"><div class="exam-bar"><div class="exam-title">' + icon('hourglass', 2) + '<span>' + esc(r.title) + '</span></div>' +
      '<div class="exam-timer" id="exam-timer" role="timer" aria-live="off">' + U.fmtTime(timeLeft(r)) + '</div>' +
      '<div class="exam-tools">' + btn('Notes', 'notes', '', 'btn-small btn-ghost') + btn('Submit', 'submit', '', 'btn-small btn-hot') + '</div></div>';
    h += qnavHTML(r);
    h += '<article class="q-card"><p class="q-num">Question ' + (r.i + 1) + ' of ' + r.entries.length + (e.flag ? ' · <span class="flag-txt">flagged</span>' : '') + '</p>' + questionHTML(e, {}) + '</article>';
    h += '<div class="play-actions">' + btn('◂ Prev', 'goto', 'data-i="' + (r.i - 1) + '"' + (r.i === 0 ? ' disabled' : ''), 'btn-small btn-ghost') +
      btn(e.flag ? 'Unflag' : 'Flag for review', 'flag', '', 'btn-small btn-ghost') +
      (r.i < r.entries.length - 1 ? btn('Next ▸', 'goto', 'data-i="' + (r.i + 1) + '"', 'btn-small') : btn('Review and submit', 'submit', '', 'btn-small btn-hot')) + '</div>';
    return h + '<p class="exam-note">' + M + ' marks each, all or nothing; no penalty assumed for a wrong answer. Open book: tap Notes any time. Keys: A–D to answer, ← → to move.</p></section>';
  };
  AFTER.exam = function () { examTick(); };
  function examTick() {
    var r = S.run; if (!r || r.submitted) return;
    var mark = Date.now();
    S.tick = setInterval(function () {
      var t = timeLeft(r), el = doc.getElementById('exam-timer');
      var now = Date.now(); if (r.entries && r.entries[r.i]) r.entries[r.i].time += (now - mark) / 1000; mark = now;
      if (el) { el.textContent = U.fmtTime(t); el.classList.toggle('low', t < 300); }
      if (t <= 0) { stopTimers(); if (r.kind === 'mock') submitMock(true); else submitExam(true); }
    }, 500);
  }
  function confirmSubmit() {
    var r = S.run;
    var blank = r.entries.filter(function (x) { return !isAnswered(x); }).length;
    var flagged = r.entries.filter(function (x) { return x.flag; }).length;
    var extra = '';
    if (r.kind === 'mock') {
      var cs = LL.getCase(r.caseId), words = cs.parts.map(function (_, i) { return U.words(r.answers[i]); });
      extra = '<p>Section B: ' + words.map(function (w, i) { return (cs.parts[i].label || 'answer') + ' ' + w + ' words'; }).join(' · ') + '.</p>';
    }
    showOverlay('<h2>Submit your script?</h2><p>Section A: ' + (r.entries.length - blank) + ' answered · ' + blank + ' blank · ' + flagged + ' flagged.</p>' + extra +
      (blank ? '<p class="warn">A blank scores zero. Choose something for every question.</p>' : '') +
      '<div class="title-actions">' + btn('Submit for marking', 'do-submit', '', 'btn-hot') + btn('Keep working', 'close-overlay', '', 'btn-ghost') + '</div>');
  }
  function recordLot(n, rep) {
    var st = chState(n), wasPassed = passed(n), rec = { pct: rep.pct, letter: rep.letter, gp: rep.gp, at: Date.now() };
    st.attempts++; st.history.push(rec); if (st.history.length > 20) st.history.shift();
    if (!st.best || rep.pct > st.best.pct) { st.best = rec; st.stars = Math.max(st.stars || 0, rep.stars); }
    return !wasPassed && rep.pass && n < 10 ? n + 1 : null;
  }
  function submitExam(timeUp) {
    var r = S.run; if (!r || r.submitted) return;
    r.submitted = true; stopTimers(); closeOverlay();
    var secs = Math.min(r.limit, (Date.now() - r.started) / 1000);
    var rep = G.report(r.entries, { kind: r.scope === 'lot' ? 'lot' : 'paper', seconds: secs, seed: r.seed });
    rep.timeUp = !!timeUp; rep.seconds = secs;
    var unlockedNow = null;
    if (r.scope === 'lot') unlockedNow = recordLot(r.n, rep);
    else recordMock(r.mockId, { a: rep.earned, b: null, aMax: rep.max, bMax: 0 });
    r.entries.forEach(noteResult);
    persist();
    LL.sfx.play(rep.pass ? 'win' : 'lose');
    go('report', { rep: rep, scope: r.scope, n: r.n, unlocked: unlockedNow, title: r.title, mockId: r.mockId, cs0: r.cs0 });
  }

  function reportHead(rep, title, extraFigs) {
    return '<div class="report-head"><div class="grade-box"><span class="grade-letter" data-text="' + rep.letter + '">' + rep.letter + '</span>' + stars(rep.stars, 5) + '</div>' +
      '<div class="report-figs"><h2>' + esc(title) + '</h2><dl>' + extraFigs + '</dl></div></div>';
  }
  function profBlock(comments, role) {
    var h = '<div class="prof"><div class="prof-head">' + portrait(LL.PROF.id, 4) + '<div><p class="prof-name">' + esc(LL.PROF.name) + '</p><p class="prof-role">' + esc(role || LL.PROF.role) + '</p></div></div><ul class="prof-list">';
    comments.forEach(function (c) { h += '<li class="c-' + c.k + '">' + esc(c.text) + '</li>'; });
    return h + '</ul><p class="prof-note">Letter grades use fixed bands (A+ 90, A 85, A− 80, B+ 75, B 70, B− 65, C+ 60, C 55) for feedback only. The real module grade is moderated.</p></div>';
  }
  function topicBars(topics) {
    var h = '<div class="topic-bars">';
    topics.forEach(function (t) {
      h += '<div class="tb"><span class="tb-name">' + esc(t.name) + '</span><span class="tb-track"><span class="tb-fill' + (t.pct < 60 ? ' low' : (t.pct >= 80 ? ' high' : '')) + '" style="width:' + Math.max(2, t.pct) + '%"></span></span><span class="tb-val">' + U.round2(t.earned) + '/' + t.max + '</span></div>';
    });
    return h + '</div>';
  }
  function reviewHTML(rep) {
    var h = '';
    rep.items.forEach(function (it, k) {
      var e = it.entry, c = LL.getChapter(e.q.ch);
      h += '<article class="q-card review-card"><p class="q-num">Question ' + (k + 1) + ' · ' + esc(c ? c.code : '') + '</p>' + questionHTML(e, { locked: true, showAnswer: true }) + '<div class="explain">' + explainHTML(e) + '</div></article>';
    });
    return h;
  }
  VIEWS.report = function (p) {
    var rep = p.rep, lot = p.scope === 'lot', ch = lot ? LL.getChapter(p.n) : null;
    var h = '<section class="report">';
    h += reportHead(rep, lot ? ch.code + ' · ' + ch.short + ': marked script' : p.title + ': marked script',
      '<div><dt>Marks</dt><dd>' + rep.earned + ' / ' + rep.max + '</dd></div><div><dt>Score</dt><dd>' + rep.pct + '%</dd></div><div><dt>Grade point</dt><dd>' + rep.gp.toFixed(1) + '</dd></div><div><dt>Time used</dt><dd>' + U.fmtTime(rep.seconds) + '</dd></div>');
    if (rep.timeUp) h += '<p class="warn">Time ran out; your script was collected automatically.</p>';
    if (p.unlocked) h += '<p class="unlock">' + icon('star', 2) + ' ' + esc(LL.getChapter(p.unlocked).code + ' ' + LL.getChapter(p.unlocked).place) + ' is now open.</p>';
    h += profBlock(rep.comments, 'Examiner · Section A');
    h += addedHTML(p.cs0);
    h += '<h3 class="sub">Breakdown</h3>' + topicBars(rep.topics);
    h += '<div class="title-actions">' + btn('Review every answer', 'toggle-review', '', 'btn-hot') +
      (lot ? btn('Retake test', 'test', 'data-n="' + p.n + '"') + btn('Case drills', 'lot-cases', 'data-n="' + p.n + '"') + btn('◂ Lot', 'enter', 'data-n="' + p.n + '"', 'btn-ghost') : btn('Exam Hall', 'go', 'data-view="hall"')) +
      btn('Cheat sheets', 'go', 'data-view="cheats"', 'btn-ghost') + '</div>';
    return h + '<div class="review" id="review" hidden>' + reviewHTML(rep) + '</div></section>';
  };

  /* ---------- Exam Hall ---------- */
  function recordMock(id, part) {
    var m = S.save.mocks[id] || (S.save.mocks[id] = { best: null, attempts: 0, history: [] });
    var a = part.a || 0, b = part.b || 0, max = (part.aMax || 0) + (part.bMax || 0);
    var pct = max ? 100 * (a + b) / max : 0, band = G.band(pct);
    var rec = { a: part.a, b: part.b, aMax: part.aMax, bMax: part.bMax, total: U.round2(a + b), max: max, pct: Math.round(pct * 10) / 10, letter: band.letter, at: Date.now(), kind: part.aMax && part.bMax ? 'full' : (part.aMax ? 'A' : 'B') };
    m.attempts++; m.history.push(rec); if (m.history.length > 20) m.history.shift();
    if (rec.kind === 'full' && (!m.best || rec.pct > m.best.pct)) m.best = rec;
    return m.history.length - 1;
  }
  function updateMockRecord(id, idx, part) {
    var m = S.save.mocks[id]; if (!m || !m.history[idx]) return;
    var rec = m.history[idx];
    if (part.b != null) rec.b = part.b;
    var max = (rec.aMax || 0) + (rec.bMax || 0), pct = max ? 100 * ((rec.a || 0) + (rec.b || 0)) / max : 0;
    rec.total = U.round2((rec.a || 0) + (rec.b || 0)); rec.pct = Math.round(pct * 10) / 10; rec.letter = G.band(pct).letter;
    m.best = null;
    m.history.forEach(function (h) { if (h.kind === 'full' && (!m.best || h.pct > m.best.pct)) m.best = h; });
  }
  VIEWS.hall = function () {
    var h = '<section class="final-hub"><div class="hub-banner final-banner"><canvas class="skyline" data-skyline="1212" aria-hidden="true"></canvas><canvas class="clouds clouds-hub" data-clouds="77" data-cell="5" aria-hidden="true"></canvas>' +
      '<div class="hub-landmark">' + icon('gavel', 6) + '</div><div class="hub-title"><span class="stn-code">HALL</span><h2>Exam Hall</h2><p>' + esc(LL.ref.exam.when) + ' · ' + esc(LL.ref.exam.where) + '</p></div></div>';
    h += '<div class="dialogue"><div class="mentors">' + portrait('examiner', 5) + '</div><div class="speech"><p class="speaker">The Invigilator</p><p class="speech-text">Section A: 20 MCQs at 3 marks each. Section B: one case study for 40 marks. Two hours, open book. Copy and paste are disabled in the real paper, so paste is blocked here too. Your script goes to Prof. Borough.</p></div></div>';
    h += '<ul class="exam-facts">' + LL.ref.exam.format.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '<li class="dim">' + esc(LL.ref.exam.note) + '</li></ul>';
    h += '<div class="paper-list">';
    LL.ref.mocks.concat([{ id: 'random', title: 'Random paper', sub: 'Two fresh MCQs from every lot, and a random 40-mark case', caseId: null }]).forEach(function (m) {
      var rec = S.save.mocks[m.id], cs = m.caseId ? LL.getCase(m.caseId) : null;
      h += '<article class="paper"><div class="paper-head"><span class="stn-code">' + (m.id === 'random' ? 'RND' : m.id.toUpperCase()) + '</span><h3>' + esc(m.title) + '</h3>' + (rec && rec.best ? '<span class="paper-best"><b>' + rec.best.letter + '</b> ' + rec.best.pct + '%</span>' : '') + '</div>' +
        '<p>' + esc(m.sub) + '</p>' + (cs ? '<p class="paper-case">Section B: ' + esc(cs.title) + ' (' + cs.parts.map(function (p) { return (p.label ? p.label + ' ' : '') + p.marks; }).join(' + ') + ' marks)</p>' : '') +
        '<div class="paper-btns">' + btn('Full paper · 2 h', 'mock-full', 'data-id="' + m.id + '"', 'btn-small btn-hot') + btn('Section A · 60 min', 'mock-a', 'data-id="' + m.id + '"', 'btn-small') + (cs ? btn('Section B · 45 min', 'open-case', 'data-id="' + cs.id + '" data-exam="1"', 'btn-small btn-ghost') : '') + '</div>' +
        (rec && rec.history.length ? '<p class="paper-hist">' + rec.history.slice(-4).reverse().map(function (x) { return x.letter + ' ' + x.pct + '% (' + x.kind + ', ' + fmtDate(x.at) + ')'; }).join(' · ') + '</p>' : '') + '</article>';
    });
    h += '</div>';
    h += '<div class="attack"><h3 class="sub">How to attack the paper</h3><ol>' + LL.ref.timing.map(function (a) { return '<li><b>' + esc(a[0]) + '.</b> ' + esc(a[1]) + '</li>'; }).join('') + '</ol><h3 class="sub">MCQs</h3><ol>' + LL.ref.mcqAttack.map(function (a) { return '<li><b>' + esc(a[0]) + '.</b> ' + esc(a[1]) + '</li>'; }).join('') + '</ol></div>';
    return h + '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  function startMock(id) {
    var mock = id === 'random' ? null : findMock(id), seed = Date.now() % 1e9, rand = U.rng(seed);
    var qs = mock ? mockMCQs(mock) : randomMCQs(rand);
    var caseId = mock ? mock.caseId : U.shuffle(LL.cases.filter(function (c) { return c.kind === 'exam'; }), rand)[0].id;
    S.run = { kind: 'mock', cs0: LL.concepts.snapshot(S.save), mockId: id, title: (mock ? mock.title : 'Random paper'), seed: seed, entries: qs.map(function (q) { return makeEntry(q, rand); }), i: 0, tab: 'A', part: 0, caseId: caseId, answers: {}, limit: 120 * 60, started: Date.now(), submitted: false };
    go('mock');
  }
  VIEWS.mock = function () {
    var r = S.run; if (!r || r.kind !== 'mock') return VIEWS.map();
    var cs = LL.getCase(r.caseId);
    var h = '<section class="exam"><div class="exam-bar"><div class="exam-title">' + icon('hourglass', 2) + '<span>' + esc(r.title) + '</span></div>' +
      '<div class="exam-timer" id="exam-timer" role="timer" aria-live="off">' + U.fmtTime(timeLeft(r)) + '</div>' +
      '<div class="exam-tools">' + btn('Notes', 'notes', '', 'btn-small btn-ghost') + btn('Submit', 'submit', '', 'btn-small btn-hot') + '</div></div>';
    h += '<div class="tabs" role="tablist">' + btn('Section A · MCQs (' + r.entries.filter(isAnswered).length + '/20)', 'mock-tab', 'data-tab="A" role="tab" aria-selected="' + (r.tab === 'A') + '"', 'btn-small' + (r.tab === 'A' ? ' btn-hot' : ' btn-ghost')) +
      btn('Section B · Case study (40)', 'mock-tab', 'data-tab="B" role="tab" aria-selected="' + (r.tab === 'B') + '"', 'btn-small' + (r.tab === 'B' ? ' btn-hot' : ' btn-ghost')) + '</div>';
    if (r.tab === 'A') {
      var e = r.entries[r.i];
      h += qnavHTML(r);
      h += '<article class="q-card"><p class="q-num">Question ' + (r.i + 1) + ' of 20' + (e.flag ? ' · <span class="flag-txt">flagged</span>' : '') + '</p>' + questionHTML(e, {}) + '</article>';
      h += '<div class="play-actions">' + btn('◂ Prev', 'goto', 'data-i="' + (r.i - 1) + '"' + (r.i === 0 ? ' disabled' : ''), 'btn-small btn-ghost') +
        btn(e.flag ? 'Unflag' : 'Flag for review', 'flag', '', 'btn-small btn-ghost') +
        (r.i < r.entries.length - 1 ? btn('Next ▸', 'goto', 'data-i="' + (r.i + 1) + '"', 'btn-small') : btn('Go to Section B ▸', 'mock-tab', 'data-tab="B"', 'btn-small btn-hot')) + '</div>';
    } else {
      h += caseWorkspace(cs, r, true);
    }
    return h + '</section>';
  };
  AFTER.mock = function () { examTick(); afterWorkspace(); };
  function submitMock(timeUp) {
    var r = S.run; if (!r || r.submitted) return;
    r.submitted = true; stopTimers(); closeOverlay();
    saveDrafts(r);
    var secs = Math.min(r.limit, (Date.now() - r.started) / 1000);
    var repA = G.report(r.entries, { kind: 'paper', seconds: secs, seed: r.seed });
    r.entries.forEach(noteResult);
    var cs = LL.getCase(r.caseId);
    var mk = buildMark(cs, r.answers, { seconds: secs, limit: r.limit, mockId: r.mockId, title: r.title, repA: repA, timeUp: timeUp });
    mk.cs0 = r.cs0;
    mk.recIdx = recordMock(r.mockId, { a: repA.earned, aMax: repA.max, b: mk.total, bMax: mk.max });
    recordCaseAttempt(cs, mk, true);
    persist();
    LL.sfx.play('win');
    S.mark = mk;
    go('mark');
  }

  /* ---------- Case studies ---------- */
  VIEWS.cases = function (p) {
    var f = p.n || 0;
    var h = '<section class="lib-page"><h2 class="section-title">Case library</h2><p class="lede">Write each answer in ILAC under the suggested time, then mark it against the scheme. The keyword marker gives a first mark; adjust each point against the model answer' + (S.ai ? ', or ask Prof. Borough (Claude) to mark it' : '') + '.</p>';
    h += '<div class="chips" role="group" aria-label="Filter by lot">' + btn('All', 'cases-filter', 'data-n="0" aria-pressed="' + (!f) + '"', 'chip-btn' + (!f ? ' on' : '')) +
      LL.chapters.map(function (c) { return btn('L' + c.n + ' ' + esc(c.short), 'cases-filter', 'data-n="' + c.n + '" aria-pressed="' + (f === c.n) + '"', 'chip-btn' + (f === c.n ? ' on' : '')); }).join('') + '</div>';
    [['exam', 'Full exam-size case studies (40 marks)'], ['drill', 'Drills']].forEach(function (grp) {
      var list = LL.cases.filter(function (c) { return c.kind === grp[0] && (!f || c.chs.indexOf(f) >= 0); });
      if (!list.length) return;
      h += '<h3 class="sub">' + grp[1] + '</h3><div class="case-grid">';
      list.forEach(function (c) {
        var rec = S.save.cases[c.id];
        h += '<button type="button" class="case-card" data-act="open-case" data-id="' + c.id + '"><span class="case-marks">' + c.marks + '<small>marks</small></span><span class="case-body"><span class="case-title">' + esc(c.title) + '</span><span class="case-src">' + esc(c.src) + '</span><span class="case-lots">' + c.chs.map(function (n) { return '<span class="stn-code small">L' + n + '</span>'; }).join(' ') + ' · ' + c.mins + ' min' + (rec && rec.best ? ' · best ' + rec.best.earned + '/' + rec.best.max : '') + '</span></span></button>';
      });
      h += '</div>';
    });
    return h + '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  function startCase(id, exam) {
    var cs = LL.getCase(id), answers = {};
    cs.parts.forEach(function (_, i) { answers[i] = LL.store.draft(id + '.' + i); });
    S.run = { kind: 'case', cs0: LL.concepts.snapshot(S.save), caseId: id, exam: !!exam, part: 0, answers: answers, started: Date.now(), limit: (exam ? 45 : cs.mins) * 60, submitted: false };
    go('casework');
  }
  function saveDrafts(r) { Object.keys(r.answers).forEach(function (k) { LL.store.draft(r.caseId + '.' + k, r.answers[k] || ''); }); }

  function caseWorkspace(cs, r, inMock) {
    var part = cs.parts[r.part], h = '';
    h += '<div class="case-ws">';
    h += '<article class="case-facts"><p class="q-num">' + esc(cs.src) + '</p><h3>' + esc(cs.title) + '</h3><div class="facts-body">' + md(cs.facts) + '</div></article>';
    h += '<div class="case-answer">';
    if (cs.parts.length > 1) h += '<div class="tabs">' + cs.parts.map(function (p, i) { return btn(esc(p.label) + ' · ' + p.marks + ' marks' + (U.words(r.answers[i]) ? ' ✓' : ''), 'case-part', 'data-i="' + i + '"', 'btn-small' + (i === r.part ? ' btn-hot' : ' btn-ghost')); }).join('') + '</div>';
    h += '<p class="case-ask"><b>' + esc(part.ask) + '</b></p>';
    h += '<div class="ws-tools">' + btn('Insert ILAC skeleton', 'ilac', '', 'btn-small btn-ghost') + btn('Authority bank', 'auth-bank', '', 'btn-small btn-ghost') + '<span class="wc" id="wc">' + U.words(r.answers[r.part]) + ' words · aim ~' + Math.round(part.marks * 22 / 10) * 10 + '</span></div>';
    h += '<label class="sr-only" for="ans">Your answer</label><textarea id="ans" class="ans" spellcheck="true" data-part="' + r.part + '" placeholder="Issue. Whether ...&#10;Law. Under s ... / In ... the court held ...&#10;Application. Here, because ...&#10;Conclusion. Accordingly, ...">' + esc(r.answers[r.part] || '') + '</textarea>';
    h += '<p class="exam-note">' + (inMock || r.exam ? 'Exam conditions: paste is blocked, as in the real paper.' : 'Drafts save on this device as you type.') + ' Bold is not available here; name each case and section in full.</p>';
    if (!inMock) h += '<div class="play-actions">' + btn('Submit for marking', 'case-submit', '', 'btn-hot') + btn('Save and leave', 'case-leave', '', 'btn-ghost btn-small') + '</div>';
    h += '</div></div>';
    return h;
  }
  VIEWS.casework = function () {
    var r = S.run; if (!r || r.kind !== 'case') return VIEWS.cases({});
    var cs = LL.getCase(r.caseId);
    var h = '<section class="exam"><div class="exam-bar"><div class="exam-title">' + icon('scroll', 2) + '<span>' + esc(cs.title) + ' · ' + cs.marks + ' marks</span></div>' +
      '<div class="exam-timer" id="exam-timer" role="timer" aria-live="off">' + U.fmtTime(timeLeft(r)) + '</div>' +
      '<div class="exam-tools">' + btn('Notes', 'notes', '', 'btn-small btn-ghost') + btn('Submit', 'case-submit', '', 'btn-small btn-hot') + '</div></div>';
    return h + caseWorkspace(cs, r, false) + '</section>';
  };
  AFTER.casework = function () {
    var r = S.run; if (!r) return;
    S.tick = setInterval(function () {
      var t = timeLeft(r), el = doc.getElementById('exam-timer');
      if (el) { el.textContent = t >= 0 ? U.fmtTime(t) : '+' + U.fmtTime(-t); el.classList.toggle('low', t < 120); }
    }, 1000);
    afterWorkspace();
  };
  var saveDraftSoon = U.debounce(function () { if (S.run && S.run.answers) saveDrafts(S.run); }, 800);
  function afterWorkspace() {
    var ta = doc.getElementById('ans'); if (!ta) return;
    var r = S.run;
    ta.addEventListener('input', function () {
      r.answers[r.part] = ta.value;
      var wc = doc.getElementById('wc'); if (wc) wc.textContent = U.words(ta.value) + ' words';
      saveDraftSoon();
    });
    if (r.kind === 'mock' || r.exam) ta.addEventListener('paste', function (ev) { ev.preventDefault(); flash('Paste is disabled in exam conditions.'); });
  }
  function flash(msg) {
    var el = doc.createElement('div'); el.className = 'toast'; el.textContent = msg; el.setAttribute('role', 'status');
    doc.body.appendChild(el); setTimeout(function () { el.remove(); }, 2600);
  }

  function buildMark(cs, answers, meta) {
    var parts = cs.parts.map(function (_, i) { return G.markPart(cs, i, answers[i] || ''); });
    var mk = { caseId: cs.id, answers: JSON.parse(JSON.stringify(answers)), parts: parts, ai: {}, meta: meta || {}, source: 'keyword', at0: Date.now() };
    recalc(mk);
    return mk;
  }
  function recalc(mk) {
    var t = 0, mx = 0;
    mk.parts.forEach(function (p) {
      var pe = 0;
      p.issues.forEach(function (iss) { var e = 0; iss.points.forEach(function (pt) { e += pt.award; }); iss.earned = e; pe += e; });
      p.earned = pe; t += pe; mx += p.max;
    });
    mk.total = U.round2(t); mk.max = mx;
  }
  function recordCaseAttempt(cs, mk, fromMock) {
    var rec = S.save.cases[cs.id] || (S.save.cases[cs.id] = { best: null, attempts: 0, history: [] });
    var entry = { earned: mk.total, max: mk.max, pct: Math.round(1000 * mk.total / mk.max) / 10, at: Date.now(), src: mk.source, mock: !!fromMock };
    rec.attempts++; rec.history.push(entry); if (rec.history.length > 20) rec.history.shift();
    mk.caseIdx = rec.history.length - 1;
    refreshCaseBest(rec);
    notePoints(cs, mk);
  }
  function refreshCaseBest(rec) { rec.best = null; rec.history.forEach(function (h) { if (!rec.best || h.pct > rec.best.pct) rec.best = h; }); }
  function notePoints(cs, mk) {
    mk.parts.forEach(function (p) {
      p.issues.forEach(function (iss) {
        iss.points.forEach(function (pt) {
          var cur = S.save.casePts[pt.id];
          if (pt.award < pt.m * 0.5) S.save.casePts[pt.id] = { t: pt.t, m: pt.m, ch: iss.ch, cs: cs.id, title: cs.title, n: ((cur && cur.n) || 0) + (cur && cur.lastAt === mk.at0 ? 0 : 1), fixed: false, lastAt: mk.at0 };
          else if (cur && pt.award >= pt.m * 0.75) cur.fixed = true;
        });
      });
    });
  }
  function updateCaseRecord(mk) {
    var cs = LL.getCase(mk.caseId), rec = S.save.cases[cs.id];
    if (rec && rec.history[mk.caseIdx]) {
      var h = rec.history[mk.caseIdx]; h.earned = mk.total; h.pct = Math.round(1000 * mk.total / mk.max) / 10; h.src = mk.source;
      refreshCaseBest(rec);
    }
    notePoints(cs, mk);
    if (mk.meta.mockId && mk.recIdx != null) updateMockRecord(mk.meta.mockId, mk.recIdx, { b: mk.total });
    persist();
  }
  function submitCase() {
    var r = S.run; if (!r || r.submitted) return;
    r.submitted = true; stopTimers(); saveDrafts(r);
    var cs = LL.getCase(r.caseId), secs = (Date.now() - r.started) / 1000;
    var mk = buildMark(cs, r.answers, { seconds: secs, limit: r.limit });
    mk.cs0 = r.cs0;
    recordCaseAttempt(cs, mk, false);
    persist(); LL.sfx.play('win');
    S.mark = mk;
    go('mark');
  }

  VIEWS.mark = function () {
    var mk = S.mark; if (!mk) return VIEWS.cases({});
    var cs = LL.getCase(mk.caseId), meta = mk.meta || {};
    var pct = mk.max ? 100 * mk.total / mk.max : 0, band = G.band(pct);
    var h = '<section class="report">';
    if (meta.repA) {
      var a = meta.repA.earned, tot = U.round2(a + mk.total), tp = 100 * tot / (meta.repA.max + mk.max), tb = G.band(tp);
      h += reportHead({ letter: tb.letter, stars: G.stars(tp) }, meta.title + ': marked script',
        '<div><dt>Section A</dt><dd>' + a + ' / ' + meta.repA.max + '</dd></div><div><dt>Section B</dt><dd>' + mk.total + ' / ' + mk.max + '</dd></div><div><dt>Total</dt><dd>' + tot + ' / 100</dd></div><div><dt>Time used</dt><dd>' + U.fmtTime(meta.seconds || 0) + '</dd></div>');
      if (meta.timeUp) h += '<p class="warn">Time ran out; your script was collected automatically.</p>';
      h += '<details class="lib-sec"><summary>Section A: Prof. Borough\'s comments and every answer</summary>' + profBlock(meta.repA.comments, 'Examiner · Section A') + topicBars(meta.repA.topics) + '<div class="review">' + reviewHTML(meta.repA) + '</div></details>';
    } else {
      h += reportHead({ letter: band.letter, stars: G.stars(pct) }, cs.title + ': marked script',
        '<div><dt>Marks</dt><dd>' + mk.total + ' / ' + mk.max + '</dd></div><div><dt>Score</dt><dd>' + Math.round(pct) + '%</dd></div><div><dt>Words</dt><dd>' + mk.parts.reduce(function (s, p) { return s + p.words; }, 0) + '</dd></div><div><dt>Time used</dt><dd>' + U.fmtTime(meta.seconds || 0) + '</dd></div>');
    }
    h += profBlock(G.caseComments(cs, mk, mk.answers, meta), 'Examiner · Section B');
    h += addedHTML(mk.cs0);
    var capped = mk.parts.filter(function (p) { return p.cap < 1; });
    h += '<p class="mark-src">' + (mk.source === 'ai' ? 'Marked by Prof. Borough (Claude) against the scheme. Adjust any point you disagree with.' : 'Keyword marker: a point scores when your script names its rule, authority or key fact. It cannot judge your reasoning, so read the model answer and adjust each point honestly.') +
      (capped.length && mk.source === 'keyword' ? ' <b>Development cap:</b> ' + capped.map(function (p) { return (p.label ? p.label + ' ' : 'your answer ') + 'has ' + p.words + ' words for ' + p.marks + ' marks, so its keyword marks are scaled to ' + Math.round(p.cap * 100) + '%'; }).join('; ') + '. Naming a case is not the same as applying it.' : '') + '</p>';
    mk.parts.forEach(function (p, pi) {
      var part = cs.parts[pi], ai = mk.ai[pi];
      h += '<article class="mark-part"><div class="mark-head"><h3>' + esc(part.label ? part.label + ' ' : '') + esc(part.ask) + '</h3><span class="mark-score">' + U.round2(p.earned) + ' / ' + p.max + '</span></div>';
      if (S.ai) h += '<div class="ai-row">' + (S.aiBusy === pi ? '<span class="ai-busy">Prof. Borough is marking this part. This can take up to a minute.</span>' + btn('Stop', 'ai-stop', '', 'btn-small btn-ghost') : btn(icon('bulb', 2) + (ai ? ' Mark again with Claude' : ' Ask Prof. Borough (Claude) to mark this part'), 'ai-mark', 'data-i="' + pi + '"', 'btn-small')) + '</div>';
      if (ai && (ai.structure || ai.strengths.length || ai.fixes.length)) {
        h += '<div class="ai-box">' + (ai.structure ? '<p><b>Structure:</b> ' + esc(ai.structure) + '</p>' : '') +
          (ai.strengths.length ? '<p><b>Strengths:</b></p><ul>' + ai.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') +
          (ai.fixes.length ? '<p><b>Fix next time:</b></p><ul>' + ai.fixes.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '') + '</div>';
      }
      p.issues.forEach(function (iss, ii) {
        h += '<div class="mark-issue"><h4>' + esc(iss.name) + ' <span>' + U.round2(iss.earned) + ' / ' + iss.max + '</span></h4><ul class="pts">';
        iss.points.forEach(function (pt, qi) {
          var opts = []; for (var v = 0; v <= pt.m; v++) opts.push(v);
          if (opts.indexOf(pt.award) < 0) { opts.push(pt.award); opts.sort(function (a, b) { return a - b; }); }
          var src = cs.parts[pi].issues[ii].points[qi];
          var note = ai && ai.notes[pt.id];
          h += '<li class="pt' + (pt.award >= pt.m ? ' full' : pt.award > 0 ? ' part' : ' none') + '"><div class="pt-text">' + esc(pt.t) +
            '<div class="pt-hits">' + src.k.map(function (k, j) { return '<span class="hit' + (pt.hits[j] ? ' yes' : '') + '">' + (pt.hits[j] ? '✓ ' : '· ') + esc(kwLabel(k)) + '</span>'; }).join('') + '</div>' +
            (note ? '<p class="pt-note">Claude: ' + esc(note.note) + '</p>' : '') + '</div>' +
            '<div class="pt-award" role="group" aria-label="Marks for this point">' + opts.map(function (v) { return '<button type="button" class="aw' + (pt.award === v ? ' on' : '') + '" data-act="award" data-p="' + pi + '" data-s="' + ii + '" data-q="' + qi + '" data-v="' + v + '" aria-pressed="' + (pt.award === v) + '">' + v + '</button>'; }).join('') + '<span class="aw-max">/ ' + pt.m + '</span></div></li>';
        });
        h += '</ul></div>';
      });
      h += '<details class="lib-sec"><summary>Your answer (' + p.words + ' words)</summary><div class="your-ans">' + (mk.answers[pi] ? md(mk.answers[pi]) : '<p><i>Blank.</i></p>') + '</div></details>';
      h += '<details class="lib-sec model"' + (pi === 0 ? ' open' : '') + '><summary>Model answer</summary><div class="model-ans">' + md(part.model) + (part.tricks && part.tricks.length ? '<h5>Exam tricks</h5><ul>' + part.tricks.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') + '</div></details>';
      h += '</article>';
    });
    h += '<p class="lede small">Points you score under half on go straight onto your cheat sheet; raise a point to three-quarters or more and it is marked mastered.</p>';
    h += '<div class="title-actions">' + btn('Try this case again', 'open-case', 'data-id="' + cs.id + '"', 'btn-hot') + btn('Case library', 'go', 'data-view="cases"') + (meta.mockId ? btn('Exam Hall', 'go', 'data-view="hall"') : '') + btn('Cheat sheets', 'go', 'data-view="cheats"', 'btn-ghost') + '</div>';
    return h + '</section>';
  };
  function kwLabel(k) {
    return k.replace(/§(\d+[a-z]?)/g, 's $1').replace(/\\s\*|\\s\?|\\s/g, ' ').replace(/\\b/g, '').replace(/\\\(/g, '(').replace(/\\\)/g, ')').replace(/\\\./g, '.')
      .replace(/\(\?:[^)]*\)/g, '').replace(/[?*+^$]/g, '').replace(/\|/g, ' / ').replace(/\[([^\]]*)\]/g, '-').replace(/\s+/g, ' ').trim().slice(0, 48);
  }

  /* ---------- Claude: marking and question writing ---------- */
  var aiCtl = null;
  function aiErr(code) {
    var map = { not_granted: 'Claude is not allowed for this page. You can allow it from the artifact\'s permissions.', rate_limited: 'Too many requests just now. Try again in a minute.', invalid_json: 'Claude\'s reply could not be read. Try again.', refused: 'Claude declined this request.', session_expired: 'Sign in again to use Claude.', prompt_too_large: 'The answer is too long to send. Shorten it.', sampling_disabled: 'Claude is not available on this account.' };
    return map[code] || 'Claude could not finish (' + (code || 'error') + '). Your keyword marks still stand.';
  }
  function aiMark(pi) {
    var mk = S.mark; if (!mk || !S.ai || S.aiBusy != null) return;
    var cs = LL.getCase(mk.caseId);
    S.aiBusy = pi; render();
    aiCtl = new AbortController();
    S.ai.json(G.aiMarkPrompt(cs, pi, mk.answers[pi] || ''), { modelTier: 'default', signal: aiCtl.signal, cache: false }).then(function (data) {
      var parsed = G.parseAiMark(data, mk.parts[pi]);
      if (!parsed) { flash('Claude\'s marks could not be read. Try again.'); return; }
      mk.ai[pi] = parsed; mk.source = 'ai';
      mk.parts[pi].issues.forEach(function (iss) { iss.points.forEach(function (pt) { var n = parsed.notes[pt.id]; if (n) pt.award = n.award; }); });
      recalc(mk); updateCaseRecord(mk);
    }).catch(function (e) {
      if (e && e.code === 'not_granted' || e && e.code === 'sampling_disabled') S.ai = null;
      if (!(e && e.code === 'cancelled')) flash(aiErr(e && e.code));
    }).then(function () { S.aiBusy = null; aiCtl = null; if (S.view === 'mark') render(); });
  }
  function genQuestion(n) {
    if (!S.ai) return;
    var ch = LL.getChapter(n);
    showOverlay('<h2>Writing a new question</h2><p>Prof. Borough is drafting a question for ' + esc(ch.code + ' ' + ch.title) + ' from your notes. This can take up to a minute.</p><div class="title-actions">' + btn('Cancel', 'ai-stop', '', 'btn-ghost') + '</div>');
    aiCtl = new AbortController();
    var avoid = ch.qs.map(function (q) { return q.q; }).concat(LL.extraQs.filter(function (q) { return q.ch === n; }).map(function (q) { return q.q; }));
    S.ai.json(G.genPrompt(ch, avoid), { modelTier: 'default', signal: aiCtl.signal, cache: false }).then(function (d) {
      var q = G.validateGen(d);
      if (!q) { closeOverlay(); flash('That question did not come back in a usable shape. Try again.'); return; }
      q.id = 'ai-' + n + '-' + Date.now().toString(36); q.ch = n; q.src = 'AI (prof-style, check it)';
      S.save.gen.push(q); if (S.save.gen.length > 40) S.save.gen.shift();
      loadGen(); persist(); closeOverlay();
      startTraining(n, [q], 'Claude question · ' + ch.short);
    }).catch(function (e) {
      closeOverlay();
      if (e && (e.code === 'not_granted' || e.code === 'sampling_disabled')) S.ai = null;
      if (!(e && e.code === 'cancelled')) flash(aiErr(e && e.code));
      render();
    }).then(function () { aiCtl = null; });
  }

  /* ---------- My cheat sheet (automatic) ---------- */
  function aiSheet() {
    if (!S.ai || S.aiBusy != null) return;
    S.aiBusy = 'sheet'; render();
    aiCtl = new AbortController();
    S.ai(LL.concepts.aiPrompt(S.save), { modelTier: 'default', signal: aiCtl.signal, cache: false }).then(function (res) {
      var txt = String((res && res.text) || '').trim();
      if (!txt) { flash('Claude returned nothing. Try again.'); return; }
      S.save.aiSheet = { at: Date.now(), text: txt.slice(0, 9000), n: LL.concepts.counts(S.save).open };
      persist();
    }).catch(function (e) {
      if (e && (e.code === 'not_granted' || e.code === 'sampling_disabled')) S.ai = null;
      if (!(e && e.code === 'cancelled')) flash(aiErr(e && e.code));
    }).then(function () { S.aiBusy = null; aiCtl = null; if (S.view === 'mysheet') render(); });
  }
  VIEWS.mysheet = function () {
    var l = LL.concepts.build(S.save), open = l.filter(function (c) { return !c.mastered; }), done = l.filter(function (c) { return c.mastered; });
    var last = l.reduce(function (m, c) { return Math.max(m, c.lastAt || 0); }, 0);
    var h = '<section class="lib-page"><h2 class="section-title">My cheat sheet</h2>' +
      '<p class="lede">Built automatically from every MCQ, case-study point and lightning fact you get wrong, grouped by concept. Each card gives the rule and the trap, the matching rule from your notes, what to remember, and what to cite. It updates after every attempt. A concept is mastered once you get its questions right twice in a row.</p>';
    h += '<div class="sheet-stats"><span><b>' + open.length + '</b> to fix</span><span><b>' + done.length + '</b> mastered</span>' + (last ? '<span>last updated ' + esc(new Date(last).toLocaleString('en-SG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) + '</span>' : '') + '</div>';
    h += '<div class="title-actions">' + (S.dl || !inViewer() ? btn(icon('sheet', 2) + ' Save to print', 'mysheet-save', '', 'btn-hot') : '') + (canPrint() ? btn('Print now', 'mysheet-print', '') : '') +
      btn('Copy as text', 'mysheet-copy', '', 'btn-ghost') + (open.length ? btn('Drill my weakest concepts', 'mysheet-drill-all', '', '') : '') +
      btn('Add the Exam Pack or lot one-pagers', 'go', 'data-view="cheats"', 'btn-ghost') + '</div>';
    if (inViewer()) h += '<p class="lede small">Printing is blocked inside the Claude viewer: save the sheet, open it in your browser, then press Ctrl+P (Cmd+P on a Mac).</p>';
    if (S.ai && open.length) {
      h += '<div class="ai-sheet"><div class="ai-sheet-head">' + icon('bulb', 3) + '<div><h3>One-page summary by Claude</h3><p>Condenses your open concepts into terse exam bullets, using only the rules and authorities on your cards.</p></div>' +
        (S.aiBusy === 'sheet' ? '<span class="ai-busy">Writing your summary. This can take up to a minute.</span>' + btn('Stop', 'ai-stop', '', 'btn-small btn-ghost') : btn(S.save.aiSheet ? 'Rewrite it' : 'Condense with Claude', 'mysheet-ai', '', 'btn-small btn-hot')) + '</div>';
      if (S.save.aiSheet) h += '<div class="ai-sheet-body">' + md(S.save.aiSheet.text) + '<p class="ai-sheet-meta">Written ' + esc(new Date(S.save.aiSheet.at).toLocaleString('en-SG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) + ' from ' + S.save.aiSheet.n + ' concepts' + (S.save.aiSheet.n !== open.length ? '. Your sheet has changed since; rewrite it to catch up.' : '.') + ' It is printed at the top of your saved sheet.</p></div>';
      h += '</div>';
    } else if (S.save.aiSheet && S.save.aiSheet.text) {
      h += '<div class="ai-sheet"><div class="ai-sheet-body">' + md(S.save.aiSheet.text) + '</div></div>';
    }
    if (!l.length) h += '<div class="empty">' + icon('sheet', 6) + '<p>Your sheet is empty. Take a graded test, a training run, a lightning round or a case drill; everything you get wrong is added here automatically.</p>' + btn('Start with Mock Paper 1, Section A', 'mock-a', 'data-id="m1"', 'btn-hot') + '</div>';
    if (open.length) {
      var lots = {};
      open.forEach(function (c) { (lots[c.ch] = lots[c.ch] || []).push(c); });
      h += '<div class="sheet-lots">' + Object.keys(lots).sort(function (a, b) { return a - b; }).map(function (n) { var c = LL.getChapter(+n); return '<span class="stn-code small">L' + n + '</span> ' + esc(c ? c.short : '') + ' <b>' + lots[n].length + '</b>'; }).join(' · ') + '</div>';
      h += '<div class="sheet-cards cs-doc">' + open.map(function (c) {
        return LL.concepts.cardHTML(c, { actions: function (cc) { return '<div class="cs-actions">' + (S.ai ? btn('▶ Explain it in a video', 'mysheet-video', 'data-key="' + esc(cc.key) + '"', 'btn-small btn-hot') : '') + btn('Drill this concept', 'mysheet-drill', 'data-key="' + esc(cc.key) + '"', 'btn-small') + btn('Mark mastered', 'mysheet-learn', 'data-key="' + esc(cc.key) + '"', 'btn-small btn-paper') + '</div>'; } });
      }).join('') + '</div>';
    }
    if (done.length) h += '<details class="lib-sec"><summary>Mastered (' + done.length + ')</summary><div class="sheet-cards cs-doc">' + done.map(function (c) { return LL.concepts.cardHTML(c, { compact: true }); }).join('') + '</div></details>';
    return h + '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  /* ---------- Notebook ---------- */
  VIEWS.notebook = function () {
    var ids = openMistakes(), pts = openPoints();
    var h = '<section class="notebook"><h2 class="section-title">Mistake notebook</h2><p class="lede">Every MCQ you miss lands here; get it right twice in a row and it is marked fixed. Case-study points you scored under half on are listed too. Fixed items stay on your cheat sheet history.</p>';
    if (!ids.length && !pts.length) h += '<div class="empty">' + icon('smiley', 6) + '<p>Nothing to redo. Mistakes from training, tests, mocks and case drills appear here.</p></div>';
    if (ids.length) {
      h += '<div class="title-actions">' + btn('Redo all ' + ids.length + ' MCQs', 'nb-train', '', 'btn-hot') + btn('Open my cheat sheet', 'go', 'data-view="mysheet"') + '</div><ul class="nb-list">';
      ids.sort(function (a, b) { return S.save.mistakes[b].n - S.save.mistakes[a].n; }).forEach(function (id) {
        var q = LL.findQuestion(id), c = LL.getChapter(q.ch), m = S.save.mistakes[id];
        h += '<li><span class="stn-code">' + esc(c.code) + '</span><span class="nb-topic">' + esc(q.topic) + '</span><span class="nb-n">missed ×' + m.n + (m.streak ? ' · ' + m.streak + '/2 fixed' : '') + '</span><span class="nb-q">' + esc(q.q.length > 140 ? q.q.slice(0, 137) + '…' : q.q) + '</span></li>';
      });
      h += '</ul>';
    }
    if (pts.length) {
      h += '<h3 class="sub">Case-study points to learn</h3><ul class="nb-list">';
      pts.forEach(function (id) {
        var p = S.save.casePts[id], c = LL.getChapter(p.ch);
        h += '<li><span class="stn-code">' + esc(c ? c.code : '') + '</span><span class="nb-topic">' + esc(p.title) + '</span><span class="nb-n">' + p.m + ' mk</span><span class="nb-q">' + esc(p.t) + '</span>' + '<span class="nb-act">' + btn('Mark learned', 'pt-fix', 'data-id="' + esc(id) + '"', 'btn-small btn-ghost') + btn('Redo case', 'open-case', 'data-id="' + p.cs + '"', 'btn-small btn-ghost') + '</span></li>';
      });
      h += '</ul>';
    }
    return h + '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  /* ---------- Cheat sheets ---------- */
  function cheatOpts() {
    if (!S.cheat) S.cheat = { mistakes: true, fixed: true, pack: true, ai: true, lots: CH.weakLots(S.save) };
    return S.cheat;
  }
  VIEWS.cheats = function () {
    var o = cheatOpts(), cnt = CH.counts(S.save), weak = CH.weakLots(S.save);
    var built = CH.build(S.save, o, player() ? player().name : '');
    S.cheatDoc = built;
    var h = '<section class="lib-page"><h2 class="section-title">Cheat sheets</h2><p class="lede">Hard-copy notes are allowed in the exam. Build a sheet from your own mistakes, add the Exam Pack and one-pagers for weak lots, then print it double-sided in two columns.</p>';
    h += '<div class="cheat-opts"><div class="set-row"><div><h3>My concepts to fix (automatic)</h3><p>' + cnt.open + ' concepts to fix and ' + cnt.mastered + ' mastered, built from ' + cnt.q + ' MCQs, ' + cnt.p + ' case points and your lightning misses.</p></div>' + toggle('mistakes', o.mistakes) + '</div>' +
      '<div class="set-row"><div><h3>Include mastered concepts</h3><p>One line each, so you still see the rule.</p></div>' + toggle('fixed', o.fixed) + '</div>' +
      '<div class="set-row"><div><h3>Exam Pack</h3><p>Format, timing, ILAC frames, issue spotter, authority bank, numbers and answer methods.</p></div>' + toggle('pack', o.pack) + '</div>' +
      '<div class="set-row col"><div><h3>Lot one-pagers</h3><p>Rules, cases, sections, numbers and traps per lot.' + (weak.length ? ' Your weak lots: ' + weak.map(function (n) { return 'L' + n; }).join(', ') + '.' : '') + '</p></div><div class="chips">' +
      LL.chapters.map(function (c) { var on = o.lots.indexOf(c.n) >= 0; return btn('L' + c.n + ' ' + esc(c.short), 'cheat-lot', 'data-n="' + c.n + '" aria-pressed="' + on + '"', 'chip-btn' + (on ? ' on' : '') + (weak.indexOf(c.n) >= 0 ? ' weak' : '')); }).join('') +
      '</div><div class="chips">' + btn('Weak lots', 'cheat-weak', '', 'btn-small btn-ghost') + btn('All lots', 'cheat-all', '', 'btn-small btn-ghost') + btn('None', 'cheat-none', '', 'btn-small btn-ghost') + '</div></div></div>';
    h += '<div class="title-actions">' + (S.dl || !inViewer() ? btn(icon('sheet', 2) + ' Save as .html to print', 'cheat-save', '', 'btn-hot') : '') + (canPrint() ? btn('Print now', 'cheat-print', '') : '') + btn('Copy as text', 'cheat-copy', '', 'btn-ghost') + '</div>';
    if (inViewer()) h += '<p class="lede small">Printing is blocked inside the Claude viewer, so save the sheet, open it in your browser and press Ctrl+P (Cmd+P on a Mac). It prints on A4 in two columns.</p>';
    h += '<div class="cheat-preview">' + built.inner + '</div>';
    return h + '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
    function toggle(key, on) { return btn(on ? 'On' : 'Off', 'cheat-toggle', 'data-k="' + key + '" aria-pressed="' + on + '"', 'btn-small' + (on ? ' btn-hot' : '')); }
  };
  function mySheet() { return CH.build(S.save, { mistakes: true, fixed: true, pack: false, ai: true, lots: [] }, player() ? player().name : ''); }
  function saveCheat(built) {
    built = built || S.cheatDoc || CH.build(S.save, cheatOpts(), '');
    var name = 'RE2702-cheat-sheet-' + new Date().toISOString().slice(0, 10) + '.html';
    if (S.dl) {
      S.dl.save({ filename: name, data: built.doc }).then(function () { flash('Saved. Open it in your browser and print.'); }, function (e) { if (!(e && e.code === 'declined')) flash('Could not save the file (' + ((e && e.code) || 'error') + ').'); });
      return;
    }
    try {
      var blob = new Blob([built.doc], { type: 'text/html' }), a = doc.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = name; doc.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    } catch (e) { flash('Saving is not available here. Use Copy as text.'); }
  }
  function printCheat(built) {
    built = built || S.cheatDoc || CH.build(S.save, cheatOpts(), '');
    var pr = doc.getElementById('print-root');
    pr.innerHTML = '<style>' + CH.CSS + '</style>' + built.inner;
    doc.body.classList.add('printing');
    var done = function () { doc.body.classList.remove('printing'); pr.innerHTML = ''; root.removeEventListener('afterprint', done); };
    root.addEventListener('afterprint', done);
    try { root.print(); } catch (e) { done(); }
    setTimeout(function () { if (doc.body.classList.contains('printing') && !root.matchMedia('print').matches) done(); }, 60000);
  }
  function copyCheat(built) {
    var txt = CH.text((built || S.cheatDoc || CH.build(S.save, cheatOpts(), '')).inner);
    var fallback = function () {
      showOverlay('<h2>Copy your sheet</h2><p>Select all and copy.</p><textarea class="copy-box" id="copy-box" readonly>' + esc(txt) + '</textarea><div class="title-actions">' + btn('Done', 'close-overlay', '', 'btn-hot') + '</div>', 'wide');
      var ta = doc.getElementById('copy-box'); if (ta) { ta.focus(); ta.select(); }
    };
    try { navigator.clipboard.writeText(txt).then(function () { flash('Copied.'); }, fallback); } catch (e) { fallback(); }
  }

  /* ---------- Plan ---------- */
  VIEWS.plan = function () {
    var done = 0, total = 0;
    LL.ref.plan.forEach(function (d) { d.items.forEach(function (it) { total++; if (S.save.plan[it.id]) done++; }); });
    var h = '<section class="lib-page"><h2 class="section-title">Your 3-day plan</h2><p class="lede">' + esc(countdownText()) + '. ' + done + ' of ' + total + ' steps done. Tick a step when it is finished; the Go button takes you straight there.</p>';
    h += '<div class="bar"><span style="width:' + (total ? 100 * done / total : 0) + '%"></span></div><div class="plan">';
    LL.ref.plan.forEach(function (d) {
      h += '<article class="plan-day"><h3>' + esc(d.day) + ' <small>' + esc(d.theme) + '</small></h3><ul>';
      d.items.forEach(function (it) {
        var on = !!S.save.plan[it.id];
        h += '<li class="' + (on ? 'done' : '') + '"><button type="button" class="tick" data-act="plan-tick" data-id="' + it.id + '" aria-pressed="' + on + '" aria-label="Mark done">' + (on ? '✓' : '') + '</button><span>' + esc(it.t) + '</span>' + (it.act ? btn('Go', 'plan-go', 'data-to="' + it.act + '"', 'btn-small btn-ghost') : '') + '</li>';
      });
      h += '</ul></article>';
    });
    return h + '</div><div class="hub-foot">' + btn('◂ Back', 'go', 'data-view="' + (S.save.char ? 'map' : 'title') + '"', 'btn-small btn-ghost') + '</div></section>';
  };

  /* ---------- Notes (open book) ---------- */
  function libraryHTML() {
    var R = LL.ref, h = '<div class="library"><label class="search"><span>Search the notes</span><input type="search" id="lib-q" placeholder="e.g. Street v Mountford, caveat, s 23" autocomplete="off"></label><p class="lib-count" id="lib-count"></p>';
    h += '<details class="lib-sec" data-s="exam pack ilac timing"><summary>Exam pack: format, ILAC, timing, frames, issue spotter</summary>' +
      '<ul>' + R.exam.format.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="table-wrap"><table><tbody>' + R.timing.map(function (t) { return '<tr><th>' + esc(t[0]) + '</th><td>' + esc(t[1]) + '</td></tr>'; }).join('') + R.ilac.map(function (t) { return '<tr><th>' + esc(t[0]) + '</th><td>' + esc(t[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<ul>' + R.frames.map(function (f) { return '<li><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</li>'; }).join('') + '</ul>' +
      '<div class="table-wrap"><table><thead><tr><th>If the facts mention…</th><th>Go to</th></tr></thead><tbody>' + R.spotter.map(function (m) { var c = LL.getChapter(m[1]); return '<tr><td>' + esc(m[0]) + '</td><td>' + esc(c.code + ' ' + c.short) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
    h += '<details class="lib-sec" data-s="authority bank numbers"><summary>Authority bank and numbers</summary><div class="table-wrap"><table><tbody>' + R.authorityBank.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table></div><div class="table-wrap"><table><tbody>' + R.numbers.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
    h += '<details class="lib-sec" data-s="trap index"><summary>Trap index</summary><ul class="trap-index">' + Object.keys(LL.TRAPS).map(function (k) { var T = LL.TRAPS[k]; return '<li class="lib-item"><span class="stn-code">L' + T.ch + '</span> ' + esc(T.text) + '</li>'; }).join('') + '</ul></details>';
    var idx = [];
    LL.chapters.forEach(function (ch) {
      ch.cases.forEach(function (c) { idx.push([c[0], ch, c[3], c[2]]); });
      h += '<details class="lib-sec"><summary><span class="stn-code">' + ch.code + '</span> ' + esc(ch.title) + ' <small>' + esc(ch.lec) + '</small></summary>';
      LL.cardsFor(ch).forEach(function (c) { h += '<article class="lib-card lib-item"><h4>' + esc(c.t) + '</h4>' + md(c.b) + '</article>'; });
      h += '</details>';
    });
    idx.sort(function (a, b) { return a[0].localeCompare(b[0]); });
    h += '<details class="lib-sec"><summary>Case index A to Z (' + idx.length + ')</summary><ul class="case-index">' + idx.map(function (x) { return '<li class="lib-item"><b>' + esc(x[0]) + '</b> <span class="stn-code small">L' + x[1].n + '</span> ' + esc(x[2]) + ' <span class="dim">' + esc(x[3]) + '</span></li>'; }).join('') + '</ul></details>';
    return h + '</div>';
  }
  function wireSearch(rootEl) {
    var inp = rootEl.querySelector('#lib-q'); if (!inp) return;
    var count = rootEl.querySelector('#lib-count');
    var norm = function (x) { return x.toLowerCase().replace(/\bv\.?\s/g, 'v ').replace(/\s+/g, ' '); };
    inp.addEventListener('input', function () {
      var q = norm(inp.value.trim()), n = 0;
      Array.prototype.forEach.call(rootEl.querySelectorAll('.library .lib-sec'), function (sec) {
        var items = sec.querySelectorAll('.lib-item, tbody tr'), any = false;
        Array.prototype.forEach.call(items, function (it) {
          var hit = !q || norm(it.textContent).indexOf(q) >= 0;
          it.hidden = !hit; if (hit && q) { any = true; n++; }
        });
        sec.hidden = !!q && !any;
        sec.open = !!q && any;
      });
      count.textContent = q ? (n ? n + ' match' + (n > 1 ? 'es' : '') : 'No matches') : '';
    });
  }
  VIEWS.library = function () {
    return '<section class="lib-page"><h2 class="section-title">Open-book notes</h2><p class="lede">Every lesson card, the exam pack, the trap index and an A to Z case index, built from your Context and Case Guide and Q&A Bank. Lecture slides win every conflict; points marked [check] need confirming.</p>' +
      libraryHTML() + '<div class="hub-foot">' + btn('◂ Back', 'go', 'data-view="' + (S.save.char ? 'map' : 'title') + '"', 'btn-small btn-ghost') + '</div></section>';
  };
  AFTER.library = function () { wireSearch(screen); };

  VIEWS.settings = function () {
    var p = player();
    return '<section class="settings"><h2 class="section-title">Settings</h2>' +
      '<div class="set-row"><div><h3>Sound effects</h3><p>8-bit blips for right and wrong answers.</p></div>' + btn(S.save.sound !== false ? 'On' : 'Off', 'toggle-sound', 'aria-pressed="' + (S.save.sound !== false) + '"', 'btn-small') + '</div>' +
      '<div class="set-row"><div><h3>Crunch mode</h3><p>Every lot open from the start. Turn it off to unlock lots one at a time by passing each graded test.</p></div>' + btn(S.save.unlockAll ? 'On' : 'Off', 'toggle-unlock', 'aria-pressed="' + !!S.save.unlockAll + '"', 'btn-small') + '</div>' +
      '<div class="set-row"><div><h3>Student</h3><p>' + (p ? 'Playing as ' + esc(p.name) + '. Progress is kept if you switch.' : 'No student chosen yet.') + '</p></div>' + btn('Change', 'go', 'data-view="pick"', 'btn-small') + '</div>' +
      '<div class="set-row"><div><h3>Where progress is kept</h3><p>' + (LL.cloud.status() === 'synced' ? 'Synced to your Claude account, so it follows you to other devices where you open this page.' : 'Saved in this browser only.') + ' Case-study drafts always stay on this device.</p></div></div>' +
      '<div class="set-row danger"><div><h3>Reset progress</h3><p>Clears grades, the notebook, mock results and the plan.</p></div>' + btn('Reset', 'ask-reset', '', 'btn-small btn-danger') + '</div>' +
      '<div class="hub-foot">' + btn('◂ Estate plan', 'go', 'data-view="map"', 'btn-small btn-ghost') + '</div></section>';
  };

  /* ================= ACTIONS ================= */
  var A = {};
  function attr(t, k) { return t.getAttribute(k); }
  A.go = function (t) { go(attr(t, 'data-view')); };
  A['new-game'] = function () { go('pick'); };
  A.choose = function (t) { S.save.char = attr(t, 'data-id'); persist(); LL.sfx.play('win'); go('map'); };
  A.enter = function (t) {
    var n = +attr(t, 'data-n');
    if (!unlocked(n)) { LL.sfx.play('bad'); showOverlay('<h2>Lot closed</h2><p>Pass ' + esc(LL.getChapter(n - 1).code) + ' with a C or better to open it, or turn on crunch mode in Settings.</p><div class="title-actions">' + btn('OK', 'close-overlay', '', 'btn-hot') + btn('Settings', 'go-settings', '', 'btn-ghost') + '</div>'); return; }
    go('lot', { n: n });
  };
  A['go-settings'] = function () { closeOverlay(); go('settings'); };
  A.line = function (t) { go('lot', { n: S.params.n, line: +attr(t, 'data-line') }); };
  A.lesson = function (t) { go('lesson', { n: +attr(t, 'data-n'), i: 0 }); };
  A.card = function (t) {
    var learn = attr(t, 'data-learn'), n = S.params.n, st = chState(n);
    if (learn != null && st.learned.indexOf(+learn) < 0) { st.learned.push(+learn); persist(); }
    go('lesson', { n: n, i: +attr(t, 'data-i') });
  };
  A['train-from-lesson'] = function (t) { var n = +attr(t, 'data-n'), st = chState(n), l = +attr(t, 'data-learn'); if (st.learned.indexOf(l) < 0) { st.learned.push(l); persist(); } startTraining(n); };
  A.train = function (t) { startTraining(+attr(t, 'data-n')); };
  A['train-gen'] = function (t) { var n = +attr(t, 'data-n'); startTraining(n, U.shuffle(LL.extraQs.filter(function (q) { return q.ch === n; })), 'Claude questions · ' + LL.getChapter(n).short); };
  A['gen-q'] = function (t) { genQuestion(+attr(t, 'data-n')); };
  A['nb-train'] = function () { var ids = U.shuffle(openMistakes()); if (ids.length) startTraining(null, ids.map(LL.findQuestion), 'Notebook revision'); };
  A['pt-fix'] = function (t) { var p = S.save.casePts[attr(t, 'data-id')]; if (p) { p.fixed = true; persist(); render(); } };
  A.lightning = function (t) { startLightning(+attr(t, 'data-n')); };
  A.watch = function (t) { go('watch', { n: +attr(t, 'data-n') }); };
  A['v-play'] = function () { if (S.player) S.player.play(); };
  A['v-toggle'] = function () { if (S.player) S.player.toggle(); };
  A['v-next'] = function () { if (S.player) S.player.next(); };
  A['v-prev'] = function () { if (S.player) S.player.prev(); };
  A['v-seek'] = function (t) { if (S.player) S.player.seekScene(+attr(t, 'data-i')); };
  A['v-restart'] = function () { if (S.vcount) { clearInterval(S.vcount); S.vcount = null; } var e = doc.getElementById('vs-end'); if (e) e.hidden = true; if (S.player) S.player.restart(); };
  A['v-cancel-count'] = function () { if (S.vcount) { clearInterval(S.vcount); S.vcount = null; } var c = doc.getElementById('v-count'); if (c) c.textContent = ''; };
  A['v-cc'] = function (t) { var el = doc.getElementById('vplayer'), on = el.classList.toggle('no-cc'); t.setAttribute('aria-pressed', String(!on)); };
  A.vq = function (t) { if (S.player) S.player.answer(attr(t, 'data-v') === '1'); };
  A.checkpoint = function (t) { if (S.vcount) { clearInterval(S.vcount); S.vcount = null; } startCheckpoint(+attr(t, 'data-n')); };
  A['mysheet-video'] = function (t) {
    var c = findConcept(attr(t, 'data-key')); if (!c || !S.ai || S.aiBusy != null) return;
    S.aiBusy = 'video';
    showOverlay('<h2>Making your explainer</h2><p>Claude is scripting a short narrated video on <b>' + esc(c.name) + '</b> from your notes. This can take up to a minute.</p><div class="title-actions">' + btn('Cancel', 'ai-stop', '', 'btn-ghost') + '</div>');
    aiCtl = new AbortController();
    S.ai.json(LL.explainerPrompt(c), { modelTier: 'default', signal: aiCtl.signal, cache: false }).then(function (d) {
      var v = LL.validateVideo(d, c.ch);
      closeOverlay();
      if (!v) { flash('That explainer did not come back in a usable shape. Try again.'); return; }
      v.key = c.key;
      go('watch', { custom: v });
    }).catch(function (e) {
      closeOverlay();
      if (e && (e.code === 'not_granted' || e.code === 'sampling_disabled')) S.ai = null;
      if (!(e && e.code === 'cancelled')) flash(aiErr(e && e.code));
    }).then(function () { S.aiBusy = null; aiCtl = null; });
  };
  A['lt-go'] = function () { S.run.started = true; render(); };
  A.lt = function (t) { lightningAnswer(attr(t, 'data-v') === '1'); };
  A.test = function (t) {
    var n = +attr(t, 'data-n');
    showOverlay('<h2>' + esc(LL.getChapter(n).code) + ' graded test</h2><p>10 MCQs, 3 marks each, 25 minutes, marked by Prof. Borough. All or nothing, no penalty for a wrong answer. Perks are off. You may open your notes.</p>' +
      '<div class="title-actions">' + btn('Begin', 'begin-test', 'data-n="' + n + '"', 'btn-hot') + btn('Not yet', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['begin-test'] = function (t) { closeOverlay(); startExam('lot', { n: +attr(t, 'data-n') }); };
  A['lot-cases'] = function (t) { go('cases', { n: +attr(t, 'data-n') }); };
  A['lot-sheet'] = function (t) { S.cheat = { mistakes: false, fixed: true, pack: false, ai: true, lots: [+attr(t, 'data-n')] }; go('cheats'); };
  A['cases-filter'] = function (t) { go('cases', { n: +attr(t, 'data-n') }); };
  A['open-case'] = function (t) {
    var id = attr(t, 'data-id'), exam = attr(t, 'data-exam') === '1', cs = LL.getCase(id);
    var hasDraft = cs.parts.some(function (_, i) { return LL.store.draft(id + '.' + i); });
    closeOverlay();
    showOverlay('<h2>' + esc(cs.title) + '</h2><p>' + cs.marks + ' marks · suggested time ' + (exam ? 45 : cs.mins) + ' minutes. Plan for 3–5 minutes, then write each issue in ILAC. The clock keeps running past the suggested time so you can finish, but note the overrun.</p>' + (hasDraft ? '<p>You have a saved draft for this case.</p>' : '') +
      '<div class="title-actions">' + btn(hasDraft ? 'Continue the draft' : 'Start writing', 'begin-case', 'data-id="' + id + '" data-exam="' + (exam ? 1 : 0) + '"', 'btn-hot') + (hasDraft ? btn('Start fresh', 'begin-case', 'data-id="' + id + '" data-exam="' + (exam ? 1 : 0) + '" data-fresh="1"', 'btn-ghost') : '') + btn('Not yet', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['begin-case'] = function (t) {
    var id = attr(t, 'data-id'), cs = LL.getCase(id);
    if (attr(t, 'data-fresh') === '1') cs.parts.forEach(function (_, i) { LL.store.draft(id + '.' + i, null); });
    closeOverlay(); startCase(id, attr(t, 'data-exam') === '1');
  };
  A['case-part'] = function (t) { var r = S.run; captureAnswer(); r.part = +attr(t, 'data-i'); stopTimers(); render(); };
  A['case-submit'] = function () {
    captureAnswer();
    var r = S.run, cs = LL.getCase(r.caseId), blank = cs.parts.filter(function (_, i) { return !U.words(r.answers[i]); }).length;
    showOverlay('<h2>Submit for marking?</h2><p>' + cs.parts.map(function (p, i) { return (p.label || 'Answer') + ': ' + U.words(r.answers[i]) + ' words'; }).join(' · ') + '.</p>' + (blank ? '<p class="warn">' + blank + ' part' + (blank > 1 ? 's are' : ' is') + ' blank.</p>' : '') +
      '<div class="title-actions">' + btn('Submit', 'do-case-submit', '', 'btn-hot') + btn('Keep writing', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['do-case-submit'] = function () { closeOverlay(); submitCase(); };
  A['case-leave'] = function () { captureAnswer(); saveDrafts(S.run); S.run = null; go('cases', {}); };
  A.ilac = function () {
    var ta = doc.getElementById('ans'); if (!ta) return;
    var sk = 'Issue. Whether \n\nLaw. \n\nApplication. Here, \n\nConclusion. Accordingly, \n';
    ta.value = (ta.value ? ta.value.replace(/\s*$/, '') + '\n\n' : '') + sk;
    S.run.answers[S.run.part] = ta.value; saveDraftSoon(); ta.focus();
  };
  A['auth-bank'] = function () {
    var R = LL.ref;
    showOverlay('<h2>Authority bank</h2><div class="table-wrap"><table><tbody>' + R.authorityBank.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</tbody></table></div><h3 class="sub dark">Sentence frames</h3><ul>' + R.frames.map(function (f) { return '<li><b>' + esc(f[0]) + ':</b> ' + esc(f[1]) + '</li>'; }).join('') + '</ul><div class="title-actions">' + btn('Back to writing', 'close-overlay', '', 'btn-hot') + '</div>', 'wide');
  };
  function captureAnswer() { var ta = doc.getElementById('ans'); if (ta && S.run && S.run.answers) S.run.answers[S.run.part] = ta.value; }
  A.award = function (t) {
    var mk = S.mark; if (!mk) return;
    var pt = mk.parts[+attr(t, 'data-p')].issues[+attr(t, 'data-s')].points[+attr(t, 'data-q')];
    pt.award = +attr(t, 'data-v'); if (mk.source !== 'ai') mk.source = 'self';
    recalc(mk); updateCaseRecord(mk);
    var y = root.scrollY; render(); try { root.scrollTo(0, y); } catch (e) { /* ignore */ }
  };
  A['ai-mark'] = function (t) { aiMark(+attr(t, 'data-i')); };
  A['ai-stop'] = function () { if (aiCtl) aiCtl.abort(); closeOverlay(); };
  A['mock-full'] = function (t) {
    var id = attr(t, 'data-id');
    showOverlay('<h2>Full paper: 2 hours</h2><p>Section A (20 MCQs, 60 marks) and Section B (case study, 40 marks) in one sitting. Switch between sections freely. Paste is blocked in Section B, as in the real paper. When the clock reaches zero your script is collected.</p><p>Suggested split: 55 minutes for Section A, 5 to plan, 50 to write, 10 to check.</p>' +
      '<div class="title-actions">' + btn('Start the clock', 'begin-mock', 'data-id="' + id + '"', 'btn-hot') + btn('Not yet', 'close-overlay', '', 'btn-ghost') + '</div>');
  };
  A['begin-mock'] = function (t) { closeOverlay(); startMock(attr(t, 'data-id')); };
  A['mock-a'] = function (t) { startExam('mockA', { mockId: attr(t, 'data-id') }); };
  A['mock-tab'] = function (t) { var r = S.run; captureAnswer(); saveDrafts(r); r.tab = attr(t, 'data-tab'); stopTimers(); render(); };
  A.pick = function (t) {
    var r = S.run; if (!r) return;
    var e = r.entries[r.i], v = +attr(t, 'data-i');
    if (r.kind === 'train') { if (r.checked) return; e.resp = v; LL.sfx.play('click'); trainCheck(); return; }
    e.resp = e.resp === v ? null : v; LL.sfx.play('click'); stopTimers(); render();
  };
  A.next = function () { var r = S.run; r.i++; r.checked = false; r.eliminated = []; r.hintShown = false; go('train'); };
  A['quit-train'] = function () { var r = S.run; if (r && r.back) go(r.back); else if (r && r.label === 'Notebook revision') go('notebook'); else if (r && r.n && !r.label) go('lot', { n: r.n }); else go('map'); };
  A.perk = function () {
    var r = S.run, e = r.entries[r.i];
    if (!r || r.perkLeft <= 0) return;
    if (r.perk === 'hint') { r.hintShown = true; r.perkLeft--; render(); return; }
    if (r.perk === 'eliminate') {
      var vals = e.mode === 'mcq' ? e.order : e.combo.labels.map(function (_, i) { return i; }), ans = e.mode === 'mcq' ? e.q.a : e.combo.answer;
      var wrong = vals.filter(function (i) { return i !== ans && r.eliminated.indexOf(i) < 0; });
      if (wrong.length > 1) { r.eliminated.push(wrong[Math.floor(Math.random() * wrong.length)]); r.perkLeft--; render(); }
      return;
    }
    if (r.perk === 'retry' && r.checked) { r.score -= G.scoreEntry(e).earned; r.done--; r.checked = false; e.resp = null; r.perkLeft--; render(); return; }
    if (r.perk === 'notes') {
      r.perkLeft--; var ch = LL.getChapter(e.q.ch || r.n); render();
      showOverlay('<h2>' + esc(ch.code + ' ' + ch.title) + '</h2><div class="library">' + LL.cardsFor(ch).map(function (c) { return '<article class="lib-card"><h4>' + esc(c.t) + '</h4>' + md(c.b) + '</article>'; }).join('') + '</div><div class="title-actions">' + btn('Back to the question', 'close-overlay', '', 'btn-hot') + '</div>', 'wide');
    }
  };
  A.goto = function (t) { var i = +attr(t, 'data-i'), r = S.run; if (i < 0 || i >= r.entries.length) return; if (r.kind === 'mock') { captureAnswer(); r.tab = 'A'; } r.i = i; stopTimers(); render(); };
  A.flag = function () { var r = S.run; r.entries[r.i].flag = !r.entries[r.i].flag; stopTimers(); render(); };
  A.submit = function () { captureAnswer(); confirmSubmit(); };
  A['do-submit'] = function () { if (S.run && S.run.kind === 'mock') submitMock(false); else submitExam(false); };
  A.notes = function () { captureAnswer(); showOverlay('<h2>Notes</h2>' + libraryHTML() + '<div class="title-actions">' + btn('Back to the paper', 'close-overlay', '', 'btn-hot') + '</div>', 'wide'); wireSearch(overlay); };
  A['close-overlay'] = function () { closeOverlay(); };
  A['toggle-review'] = function () { var rv = doc.getElementById('review'); if (rv) { rv.hidden = !rv.hidden; if (!rv.hidden) try { rv.scrollIntoView({ behavior: 'smooth' }); } catch (e) { /* ignore */ } } };
  A['toggle-sound'] = function () { S.save.sound = S.save.sound === false; LL.sfx.setOn(S.save.sound); persist(); LL.sfx.play('click'); if (S.view === 'settings') render(); else syncTopbar(); };
  A['toggle-unlock'] = function () { S.save.unlockAll = !S.save.unlockAll; persist(); render(); };
  A['ask-reset'] = function () { showOverlay('<h2>Reset all progress?</h2><p>This clears every grade, mock result, the notebook and the plan. Case drafts on this device stay. It cannot be undone.</p><div class="title-actions">' + btn('Yes, reset', 'do-reset', '', 'btn-danger') + btn('Cancel', 'close-overlay', '', 'btn-ghost') + '</div>'); };
  A['do-reset'] = function () { LL.store.clear(); S.save = LL.newSave(); loadGen(); persist(); closeOverlay(); go('title'); };
  A.home = function () {
    if (S.run && (S.run.kind === 'exam' || S.run.kind === 'mock') && !S.run.submitted) { showOverlay('<h2>Leave the paper?</h2><p>Nothing will be marked. Section B text is kept as a draft.</p><div class="title-actions">' + btn('Leave', 'leave-exam', '', 'btn-danger') + btn('Stay', 'close-overlay', '', 'btn-ghost') + '</div>'); return; }
    if (S.run && S.run.kind === 'case' && !S.run.submitted) { captureAnswer(); saveDrafts(S.run); }
    go(S.save.char ? 'map' : 'title');
  };
  A['leave-exam'] = function () { if (S.run && S.run.answers) { captureAnswer(); saveDrafts(S.run); } S.run = null; closeOverlay(); go('map'); };
  A['cheat-toggle'] = function (t) { var o = cheatOpts(), k = attr(t, 'data-k'); o[k] = !o[k]; render(); };
  A['cheat-lot'] = function (t) { var o = cheatOpts(), n = +attr(t, 'data-n'), i = o.lots.indexOf(n); if (i >= 0) o.lots.splice(i, 1); else o.lots.push(n); render(); };
  A['cheat-weak'] = function () { cheatOpts().lots = CH.weakLots(S.save); render(); };
  A['cheat-all'] = function () { cheatOpts().lots = LL.chapters.map(function (c) { return c.n; }); render(); };
  A['cheat-none'] = function () { cheatOpts().lots = []; render(); };
  A['cheat-save'] = function () { saveCheat(); };
  A['cheat-print'] = function () { printCheat(); };
  A['cheat-copy'] = function () { copyCheat(); };
  A['mysheet-save'] = function () { saveCheat(mySheet()); };
  A['mysheet-print'] = function () { printCheat(mySheet()); };
  A['mysheet-copy'] = function () { copyCheat(mySheet()); };
  A['mysheet-drill'] = function (t) {
    var c = findConcept(attr(t, 'data-key')); if (!c) return;
    var qs = LL.concepts.drillQs(c);
    if (!qs.length) { flash('No practice MCQs match this concept yet. Redo the case study instead.'); return; }
    startTraining(c.ch, qs, 'Drill · ' + (c.kind === 'quick' ? 'quick facts' : c.name), 'mysheet');
  };
  A['mysheet-drill-all'] = function () {
    var qs = [], seen = {};
    LL.concepts.build(S.save).filter(function (c) { return !c.mastered; }).slice(0, 4).forEach(function (c) {
      LL.concepts.drillQs(c).slice(0, 4).forEach(function (q) { if (!seen[q.id]) { seen[q.id] = 1; qs.push(q); } });
    });
    if (!qs.length) { flash('Nothing to drill yet.'); return; }
    startTraining(null, qs, 'Drill · my weakest concepts', 'mysheet');
  };
  A['mysheet-learn'] = function (t) {
    var c = findConcept(attr(t, 'data-key')); if (!c) return;
    c.qids.forEach(function (id) { if (S.save.mistakes[id]) S.save.mistakes[id].fixed = true; });
    c.pids.forEach(function (id) { if (S.save.casePts[id]) S.save.casePts[id].fixed = true; });
    c.lids.forEach(function (id) { if (S.save.ltMiss[id]) S.save.ltMiss[id].fixed = true; });
    persist(); render(); flash('Marked as mastered. It stays on your sheet as one line.');
  };
  A['mysheet-ai'] = function () { aiSheet(); };
  A['plan-tick'] = function (t) { var id = attr(t, 'data-id'); if (S.save.plan[id]) delete S.save.plan[id]; else S.save.plan[id] = Date.now(); persist(); render(); };
  A['plan-go'] = function (t) {
    var to = attr(t, 'data-to').split(':'), k = to[0], v = to[1];
    if (k === 'lot') { if (!S.save.char) { go('pick'); return; } go('lot', { n: +v }); }
    else if (k === 'case') A['open-case']({ getAttribute: function (x) { return x === 'data-id' ? v : null; } });
    else if (k === 'mock') A['mock-full']({ getAttribute: function () { return v; } });
    else if (k === 'mockA') startExam('mockA', { mockId: v });
    else if (k === 'view') { if (v === 'pack') { go('library'); setTimeout(function () { var d = screen.querySelector('.lib-sec'); if (d) d.open = true; }, 0); } else go(v); }
  };

  /* ================= INPUT ================= */
  function onClick(ev) {
    var t = ev.target.closest('[data-act]');
    if (!t || t.disabled || (t.getAttribute('aria-disabled') === 'true' && t.getAttribute('data-act') !== 'enter')) return;
    var act = t.getAttribute('data-act');
    if (A[act]) { ev.preventDefault(); A[act](t, ev); }
  }
  function onKey(ev) {
    if (ev.target && /input|textarea|select/i.test(ev.target.tagName)) return;
    if (ev.key === 'Escape' && !overlay.hidden) { closeOverlay(); return; }
    if (!overlay.hidden) return;
    var r = S.run;
    if (S.view === 'watch' && S.player) {
      if (ev.key === ' ' && ev.target && ev.target.tagName === 'BUTTON' && !ev.target.classList.contains('vseg')) return; /* a focused control handles its own Space */
      if (ev.key === ' ' || ev.key === 'k') { ev.preventDefault(); if (S.player.state() !== 'quiz') S.player.toggle(); return; }
      if (ev.key === 'ArrowRight') { ev.preventDefault(); S.player.next(); return; }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); S.player.prev(); return; }
      if (S.player.state() === 'quiz' && /^[tTfF]$/.test(ev.key)) { S.player.answer(/t/i.test(ev.key)); return; }
      return;
    }
    if (S.view === 'lightning' && r && r.started && !r.over) {
      if (ev.key === 't' || ev.key === 'T' || ev.key === 'ArrowLeft') { ev.preventDefault(); lightningAnswer(true); }
      if (ev.key === 'f' || ev.key === 'F' || ev.key === 'ArrowRight') { ev.preventDefault(); lightningAnswer(false); }
      return;
    }
    var mcqView = S.view === 'train' || S.view === 'exam' || (S.view === 'mock' && r && r.tab === 'A');
    if (mcqView && r && r.entries && r.entries[r.i]) {
      var e = r.entries[r.i], idx = 'ABCD'.indexOf(ev.key.toUpperCase());
      if (idx < 0 && /^[1-4]$/.test(ev.key)) idx = +ev.key - 1;
      if (idx >= 0 && !(S.view === 'train' && r.checked)) {
        var vals = e.mode === 'mcq' ? e.order : e.combo.labels.map(function (_, i) { return i; });
        if (idx < vals.length) A.pick({ getAttribute: function () { return String(vals[idx]); } });
        return;
      }
      if (ev.key === 'Enter' && S.view === 'train' && r.checked && !(ev.target && ev.target.closest && ev.target.closest('button'))) A.next();
      if (S.view !== 'train' && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) {
        var j = r.i + (ev.key === 'ArrowRight' ? 1 : -1);
        if (j >= 0 && j < r.entries.length) { r.i = j; stopTimers(); render(); }
      }
    }
  }

  /* ================= BOOT ================= */
  function lightAI() {
    var c = root.claude;
    if (!c || typeof c.use !== 'function') return;
    c.use('sample').then(function (s) { if (s) { S.ai = s; if (/^(lot|mark|cases|mysheet)$/.test(S.view)) render(); } }, function () { /* absent */ });
    c.use('tts').then(function (t) {
      if (!t) return;
      S.tts = t;
      if (S.view === 'watch') {
        var sel = doc.getElementById('v-voice');
        if (sel && !sel.querySelector('option[value="claude"]')) { var o = doc.createElement('option'); o.value = 'claude'; o.textContent = 'Claude voice'; sel.insertBefore(o, sel.firstChild); }
        if (S.player && S.player.state() === 'ready' && !S.vmode) { S.player.setMode('claude'); if (sel) sel.value = 'claude'; }
      }
    }, function () { /* absent */ });
    c.use('downloads').then(function (d) { if (d) { S.dl = d; if (/^(cheats|mysheet)$/.test(S.view)) render(); } }, function () { /* absent */ });
  }
  function start(data) {
    screen = doc.getElementById('screen');
    overlay = doc.getElementById('overlay');
    try { var cst = doc.createElement('style'); cst.textContent = CH.CSS; (doc.head || doc.body).appendChild(cst); } catch (e) { /* ignore */ }
    load();
    if (data && data.save && data.save.v === 1) { S.save = fixSave(data.save); LL.sfx.setOn(S.save.sound !== false); loadGen(); }
    doc.addEventListener('click', onClick);
    doc.addEventListener('keydown', onKey);
    overlay.addEventListener('click', function (ev) { if (ev.target === overlay) closeOverlay(); });
    PX.hydrate(doc.querySelector('.crt-bg'));
    PX.hydrate(doc.querySelector('.topbar'));
    var rt;
    root.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (S.player) S.player.resize();
        Array.prototype.forEach.call(screen.querySelectorAll('canvas[data-clouds], canvas[data-skyline]'), function (c) {
          if (c.hasAttribute('data-clouds')) PX.clouds(c, +c.getAttribute('data-clouds'), { cell: +c.getAttribute('data-cell') || 6 });
          else PX.skyline(c, +c.getAttribute('data-skyline'));
        });
      }, 150);
    });
    var hot = root.claude && root.claude.hot;
    if (hot && hot.snapshot) { try { hot.snapshot(function () { return { save: S.save }; }); } catch (e) { /* ignore */ } }
    lightAI();
    LL.cloud.init(function (remote) {
      if ((remote.updated || 0) > (S.save.updated || 0)) {
        S.save = fixSave(remote); LL.store.save(S.save); loadGen(); LL.sfx.setOn(S.save.sound !== false);
        if (!S.run && /^(title|map|plan|notebook|cheats|mysheet|hall|cases|settings)$/.test(S.view)) render();
      } else if ((S.save.updated || 0) > (remote.updated || 0)) LL.cloud.push(S.save);
      syncTopbar();
    });
    go(S.save.char ? 'map' : 'title');
  }
  LL.ui = { go: go, state: S };
  var hot = root.claude && root.claude.hot;
  function boot() { if (hot && hot.ready) hot.ready(start); else start((hot && hot.data) || {}); }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
