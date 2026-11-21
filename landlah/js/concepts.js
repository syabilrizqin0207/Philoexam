/* Land Lah! — auto cheat sheet: groups everything you get wrong into concept cards.
   A concept is a topic within a lot (MCQs), an issue within a case study (case points), or the lot's quick facts
   (lightning misses). Each card collects the trap behind the mistake, the matching rule from the lot's notes, what to
   remember, and the cases and sections to cite (looked up in the lot's case guide). It rebuilds from the save every
   time, so it is always current. */
(function (root) {
  'use strict';
  var LL = root.LL, U = LL.util, esc = U.esc;
  var K = LL.concepts = {};

  /* ---------- authority index: every case in every lot's case guide ---------- */
  var STOP_PARTY = ('street national provincial attorney general singapore finance insurance estates properties holdings investment investments ' +
    'capital london corporation council mortgage services garage brewery timber petroleum assurance residuary theatre theatres systems ventures ' +
    'partners enterprises realty chief assessor house energy tobacco imperial refinery marine stores store combined english homes lodge credit ' +
    'chinatown people park bank plantations consolidated hotels trustee electronic mobil holding mining development bookbinding quadrant housing ' +
    'trust cupid jewels central orchard storage chancery court three sixty degree ludgate picture millennium winter garden great yarmouth argyll ' +
    'operative matterhorn homely industries elevator chain asia commercial offshore standard chartered union overseas sawmilling waione port ' +
    'swettenham european flexible residence realty peck teck kian services others limited company mutual assets brothers leong choon terence ' +
    'emmanuel mohammad fatimah eunice christina sisters mother father daughter family').split(' ');
  var authIndex = null;
  function buildIndex() {
    authIndex = [];
    LL.chapters.forEach(function (ch) {
      ch.cases.forEach(function (row) {
        row[0].split(';').forEach(function (seg) {
          var name = seg.replace(/\[[^\]]*\]|\([^)]*\)/g, ' ').replace(/\b(HL|CA|PC|SGCA|UKSC|Aus HC|check)\b/g, ' ').replace(/\s\d.*$/, '').replace(/\s+/g, ' ').trim().replace(/[.,]$/, '');
          if (!name || name.length < 4) return;
          var keys = [name.toLowerCase()];
          var parties = name.split(/\s+v\.?\s+/i);
          parties.forEach(function (p) {
            p.toLowerCase().replace(/[^a-z'& -]/g, ' ').split(/\s+/).forEach(function (w) {
              w = w.replace(/'s$/, '');
              if (w.length >= 5 && STOP_PARTY.indexOf(w) < 0) keys.push(w);
            });
          });
          var two = parties[0].toLowerCase().split(/\s+/).slice(0, 2).join(' ');
          if (two.length >= 9 && two.indexOf(' ') > 0 && STOP_PARTY.indexOf(two.split(' ')[0]) < 0) keys.push(two);
          if (/^bebe\b|\bbebe\b/i.test(name)) keys.push('bebe');
          authIndex.push({ name: name, keys: keys, row: row, ch: ch.n });
        });
      });
    });
    /* Drop one-word keys that point at more than one case (shared surnames). */
    var freq = {};
    authIndex.forEach(function (a) { a.keys.forEach(function (k) { if (k.indexOf(' ') < 0) freq[k] = (freq[k] || 0) + 1; }); });
    authIndex.forEach(function (a) { a.keys = a.keys.filter(function (k, i) { return i === 0 || k.indexOf(' ') > 0 || freq[k] === 1; }); });
  }
  function norm(s) { return ' ' + String(s || '').toLowerCase().replace(/[‘’]/g, "'").replace(/\bvs?\.?\s/g, 'v ').replace(/[^a-z0-9'& ]+/g, ' ').replace(/\s+/g, ' ') + ' '; }
  function findAuths(text) {
    if (!authIndex) buildIndex();
    var t = norm(text), out = [], seen = {};
    authIndex.forEach(function (a) {
      if (seen[a.name]) return;
      for (var i = 0; i < a.keys.length; i++) {
        if (t.indexOf(' ' + a.keys[i] + ' ') >= 0 || t.indexOf(' ' + a.keys[i] + "'") >= 0) { seen[a.name] = 1; out.push(a); return; }
      }
    });
    return out;
  }
  var SEC_RE = /\b(?:ss?\.?|section)\s?\d+[A-Z]?(?:\(\d+\))*(?:\([a-z]\))?(?:\s?(?:LTA|CLPA|CLA|Civil Law Act|Women's Charter|State Lands Act|Misrepresentation Act|Distress Act))?/g;
  function findSecs(text) {
    var m = String(text || '').match(SEC_RE) || [], out = [];
    m.forEach(function (s) { s = s.replace(/\s+/g, ' ').trim(); if (out.indexOf(s) < 0) out.push(s); });
    return out.slice(0, 6);
  }

  /* ---------- matching a concept to the lot's notes ---------- */
  var STOP_W = ('this that with from which under their there must only have been will into then than when where does other more each such also ' +
    'case cases court held rule rules owner party parties right rights would could should about what your they them were being after before ' +
    'because whether between these those here only same some like most made make given gives give said says just even still both either ' +
    'answer option statement true false following most suitable').split(' ');
  function tokens(s) {
    var out = {};
    norm(s).split(' ').forEach(function (w) { w = w.replace(/'s$/, ''); if (w.length >= 4 && STOP_W.indexOf(w) < 0) out[w] = 1; });
    return out;
  }
  function bestRule(ch, topic, extra, auths) {
    var tt = tokens(topic), et = tokens(extra), best = null, bestScore = 0;
    /* authorities the mistake turns on weigh most, then the topic, then the trap */
    ch.rules.forEach(function (r) {
      var title = tokens(r[0]), body = tokens(r[1]), nr = norm(r[0] + ' ' + r[1]), sc = 0;
      Object.keys(tt).forEach(function (w) { if (title[w]) sc += 3; else if (body[w]) sc += 1; });
      Object.keys(et).forEach(function (w) { if (title[w] || body[w]) sc += 0.5; });
      auths.forEach(function (a) { for (var i = 0; i < a.keys.length; i++) if (nr.indexOf(' ' + a.keys[i] + ' ') >= 0) { sc += 5; break; } });
      if (sc > bestScore) { bestScore = sc; best = r; }
    });
    return bestScore >= 3 ? best : null;
  }

  /* ---------- building the cards ---------- */
  function issueOf(id) {
    var m = /^(.*):(\d+)\.(\d+)\.(\d+)$/.exec(id); if (!m) return null;
    var cs = LL.getCase(m[1]); if (!cs) return null;
    var part = cs.parts[+m[2]]; if (!part) return null;
    var iss = part.issues[+m[3]]; if (!iss) return null;
    return { name: iss.name.replace(/\s*\([^)]*\)\s*$/, ''), ch: iss.ch, cs: cs };
  }
  function clip(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; }

  K.build = function (save) {
    var map = {}, list = [];
    function get(key, ch, name, kind) {
      if (!map[key]) { map[key] = { key: key, ch: ch, name: name, kind: kind, items: [], traps: [], text: '', misses: 0, lastAt: 0, open: 0, qids: [], pids: [], lids: [] }; list.push(map[key]); }
      return map[key];
    }
    Object.keys(save.mistakes || {}).forEach(function (id) {
      var m = save.mistakes[id], q = LL.findQuestion(id); if (!q) return;
      var c = get(q.ch + '|' + q.topic, q.ch, q.topic, 'mcq');
      var rem;
      if (q.t === 'mcq') rem = { t: q.o[q.a], why: q.why, fixed: !!m.fixed };
      else {
        var miss = (m.miss && m.miss.length ? m.miss : q.s.map(function (_, i) { return i; }));
        rem = { list: miss.map(function (i) { var s = q.s[i]; return s ? (s[1] ? 'TRUE: ' : 'FALSE: ') + s[0] + ' ' + s[2] : ''; }).filter(Boolean), fixed: !!m.fixed };
      }
      c.items.push(rem); c.qids.push(id);
      c.misses += m.n || 1; c.lastAt = Math.max(c.lastAt, m.at || 0); if (!m.fixed) c.open++;
      var traps = m.traps && m.traps.length ? m.traps : (q.trap ? [q.trap] : []);
      traps.forEach(function (k) { if (LL.TRAPS[k] && c.traps.indexOf(k) < 0) c.traps.push(k); });
      c.text += ' ' + q.q + ' ' + (q.t === 'mcq' ? q.o[q.a] + ' ' + q.why : q.s.map(function (s) { return s[0] + ' ' + s[2]; }).join(' '));
    });
    Object.keys(save.casePts || {}).forEach(function (id) {
      var p = save.casePts[id], iss = issueOf(id);
      var name = iss ? iss.name : (p.title || 'Case study');
      var c = get((p.ch || 0) + '|case|' + name, p.ch || (iss && iss.ch) || 0, name, 'case');
      c.items.push({ t: p.t, fixed: !!p.fixed, from: p.title, m: p.m }); c.pids.push(id);
      c.misses += p.n || 1; c.lastAt = Math.max(c.lastAt, p.lastAt || 0); if (!p.fixed) c.open++;
      c.text += ' ' + p.t;
    });
    Object.keys(save.ltMiss || {}).forEach(function (id) {
      var x = save.ltMiss[id], ch = LL.getChapter(x.ch); if (!ch) return;
      var it = ch.quick[x.i]; if (!it) return;
      var c = get(x.ch + '|quick', x.ch, 'Quick facts', 'quick');
      c.items.push({ t: (it[1] ? 'TRUE: ' : 'FALSE: ') + it[0], why: it[2], fixed: !!x.fixed }); c.lids.push(id);
      c.misses += x.n || 1; c.lastAt = Math.max(c.lastAt, x.at || 0); if (!x.fixed) c.open++;
      c.text += ' ' + it[0] + ' ' + it[2];
    });
    list.forEach(function (c) {
      var ch = LL.getChapter(c.ch);
      var trapText = c.traps.map(function (k) { return LL.TRAPS[k].text; }).join(' ');
      var all = c.text + ' ' + trapText;
      c.auths = findAuths(all).slice(0, 5).map(function (a) { return { name: a.name, cite: a.row[3], held: a.row[2], ch: a.ch }; });
      c.secs = findSecs(all);
      c.rule = ch && c.kind !== 'quick' ? bestRule(ch, c.name, trapText, findAuths(all)) : null;
      c.mastered = c.open === 0;
      c.lot = ch ? ch.code : '';
    });
    list.sort(function (a, b) {
      if (a.mastered !== b.mastered) return a.mastered ? 1 : -1;
      if (b.misses !== a.misses) return b.misses - a.misses;
      return b.lastAt - a.lastAt;
    });
    return list;
  };

  /* Concept keys -> misses, to see what an attempt added. */
  K.snapshot = function (save) {
    var out = {};
    K.build(save).forEach(function (c) { out[c.key] = c.misses; });
    return out;
  };
  K.added = function (before, save) {
    before = before || {};
    return K.build(save).filter(function (c) { return !c.mastered && (before[c.key] == null || c.misses > before[c.key]); });
  };
  K.counts = function (save) {
    var l = K.build(save), open = l.filter(function (c) { return !c.mastered; }).length;
    return { total: l.length, open: open, mastered: l.length - open };
  };

  /* ---------- rendering (shared by the app screen and the printable sheet) ---------- */
  K.cardHTML = function (c, opts) {
    opts = opts || {};
    var lotName = (LL.getChapter(c.ch) || {}).short || '';
    var h = '<article class="cs-card' + (c.mastered ? ' mastered' : '') + '" data-key="' + esc(c.key) + '">';
    h += '<header class="cs-card-h"><span class="cs-lot">L' + c.ch + '</span><b class="cs-cname">' + esc(c.kind === 'quick' ? 'Quick facts · ' + lotName : c.name) + '</b>' +
      (c.kind === 'case' ? '<span class="cs-kind">from your case studies: ' + esc(c.items.map(function (it) { return it.from; }).filter(function (f, i, a) { return f && a.indexOf(f) === i; }).join('; ')) + '</span>' : '') +
      '<span class="cs-meta2">' + (c.mastered ? 'mastered' : 'missed ×' + c.misses) + (c.lastAt ? ' · ' + new Date(c.lastAt).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' }) : '') + '</span></header>';
    if (opts.compact) {
      var line = c.traps.length ? LL.TRAPS[c.traps[0]].text : (c.rule ? c.rule[1] : (c.items[0] && (c.items[0].t || (c.items[0].list || [])[0])) || '');
      return h + '<p class="cs-line">' + esc(clip(line, 220)) + '</p></article>';
    }
    if (c.traps.length) h += '<div class="cs-rule"><b>Rule / trap:</b><ul>' + c.traps.map(function (k) { return '<li>' + esc(LL.TRAPS[k].text) + '</li>'; }).join('') + '</ul></div>';
    if (c.rule) h += '<p class="cs-notes"><b>From your notes, ' + esc(c.rule[0]) + ':</b> ' + esc(clip(c.rule[1], 420)) + '</p>';
    var rem = [];
    c.items.forEach(function (it) {
      if (it.list) it.list.forEach(function (s) { rem.push('<li' + (it.fixed ? ' class="fx"' : '') + '>' + esc(clip(s, 260)) + '</li>'); });
      else rem.push('<li' + (it.fixed ? ' class="fx"' : '') + '>' + (c.kind === 'mcq' ? '<b>Answer:</b> ' : '') + esc(clip(it.t, 260)) + (it.why && c.kind !== 'mcq' ? ' <span class="cs-why">' + esc(clip(it.why, 160)) + '</span>' : '') + (it.why && c.kind === 'mcq' ? ' <span class="cs-why">' + esc(clip(it.why, 200)) + '</span>' : '') + '</li>');
    });
    h += '<div class="cs-rem"><b>Remember:</b><ul>' + rem.slice(0, 6).join('') + '</ul></div>';
    if (c.auths.length || c.secs.length) {
      h += '<p class="cs-cite"><b>Cite:</b> ' + c.auths.map(function (a) { return '<span class="cs-auth"><b>' + esc(a.name) + '</b>: ' + esc(clip(a.cite, 90)) + '</span>'; }).join(' · ') +
        (c.secs.length ? (c.auths.length ? ' · ' : '') + c.secs.map(esc).join(', ') : '') + '</p>';
    }
    if (opts.actions) h += opts.actions(c);
    return h + '</article>';
  };

  /* The "My concepts to fix" section of the printable sheet. */
  K.sectionHTML = function (save, opts) {
    opts = opts || {};
    var l = K.build(save), open = l.filter(function (c) { return !c.mastered; }), done = l.filter(function (c) { return c.mastered; });
    if (!l.length) return '<section class="cs-sec"><h2>My concepts to fix</h2><p class="cs-empty">Nothing yet. Every MCQ, case-study point and quick fact you get wrong is added here automatically.</p></section>';
    var h = '<section class="cs-sec cs-concepts"><h2>My concepts to fix <small>' + open.length + ' to fix · ' + done.length + ' mastered</small></h2>';
    if (opts.ai && save.aiSheet && save.aiSheet.text) h += '<div class="cs-ai"><h3>Claude\'s one-page summary</h3>' + U.md(save.aiSheet.text) + '</div>';
    h += open.map(function (c) { return K.cardHTML(c); }).join('');
    if (done.length && opts.mastered !== false) h += '<h3>Mastered (one line each)</h3>' + done.map(function (c) { return K.cardHTML(c, { compact: true }); }).join('');
    return h + '</section>';
  };

  /* Text Claude condenses into a one-page summary. */
  K.digest = function (save) {
    return K.build(save).filter(function (c) { return !c.mastered; }).slice(0, 18).map(function (c) {
      var lines = ['CONCEPT: ' + c.name + ' (Lot ' + c.ch + ', missed ' + c.misses + 'x)'];
      c.traps.forEach(function (k) { lines.push('Trap: ' + LL.TRAPS[k].text); });
      if (c.rule) lines.push('Notes: ' + c.rule[0] + ': ' + c.rule[1]);
      c.items.slice(0, 4).forEach(function (it) { if (it.list) it.list.forEach(function (s) { lines.push('Point: ' + s); }); else lines.push('Point: ' + it.t + (it.why ? ' (' + it.why + ')' : '')); });
      c.auths.forEach(function (a) { lines.push('Authority: ' + a.name + ': ' + a.cite); });
      if (c.secs.length) lines.push('Sections: ' + c.secs.join(', '));
      return lines.join('\n');
    }).join('\n\n');
  };
  K.aiPrompt = function (save) {
    return [
      'A student is revising for a Singapore university Land Law exam (NUS RE2702, open book, 20 MCQs and a 40-mark ILAC case study).',
      'Below are the concepts they keep getting wrong, with the rules, traps and authorities taken from their own course notes.',
      'Write a one-page exam cheat sheet from this material only. For each concept, most-missed first: a "## " heading with the concept name, then 2 to 4 terse "- " bullets: the rule in one line, the trap to avoid, and the case or section to cite.',
      'Do not add any case, section or rule that is not in the material. Keep anything marked [check]. No introduction or closing remarks. At most 450 words. Plain text with only "## " headings, "- " bullets and **bold** for authorities.',
      '',
      K.digest(save)
    ].join('\n');
  };

  /* Questions to drill a concept: the ones you missed first, then others on the same topic. */
  K.drillQs = function (c) {
    if (c.kind === 'quick' || c.kind === 'case') {
      var ch = LL.getChapter(c.ch);
      var related = ch ? ch.qs.filter(function (q) { var t = norm(q.topic + ' ' + q.q); return Object.keys(tokens(c.name)).some(function (w) { return t.indexOf(' ' + w) >= 0; }); }) : [];
      return U.shuffle(related).slice(0, 6);
    }
    var missed = c.qids.map(LL.findQuestion).filter(Boolean);
    var more = LL.allQuestions().filter(function (q) { return q.ch === c.ch && q.topic === c.name && c.qids.indexOf(q.id) < 0; });
    return missed.concat(U.shuffle(more)).slice(0, 8);
  };
})(typeof window !== 'undefined' ? window : globalThis);
