/* Land Lah! — pixel art: icon maps, a portrait generator, clouds and skylines. */
(function (root) {
  'use strict';
  var LL = root.LL;
  var PX = LL.px = {};

  /* Shared palette for icon maps. */
  var PAL = {
    k: '#2a0508', K: '#120204', w: '#fff6ec', W: '#ffffff',
    y: '#ffd23f', Y: '#ffef9a', o: '#ff8a3d', O: '#c95a1b', c: '#f2694e', r: '#b3261e', R: '#7a1418',
    p: '#ffb3a1', P: '#e9837a', v: '#3d2a8c', V: '#6a55d6', b: '#3b6fd8', B: '#1d3b8a',
    g: '#8a8f9c', G: '#52566a', n: '#7a4b2a', N: '#4a2a14', t: '#2fa07a', T: '#16664a',
    s: '#f6c9a0', l: '#c9e3ff', m: '#d9d2c7'
  };
  PX.PAL = PAL;

  var ICONS = {
    star: [
      '....k....',
      '...kyk...',
      '...kyk...',
      'kkkyYykkk',
      'kyyyYyyyk',
      '.kyyyyyk.',
      '..kyyyk..',
      '.kyykyyk.',
      '.kyk.kyk.',
      '.kk...kk.'
    ],
    starOff: [
      '....k....',
      '...kRk...',
      '...kRk...',
      'kkkRRRkkk',
      'kRRRRRRRk',
      '.kRRRRRk.',
      '..kRRRk..',
      '.kRRkRRk.',
      '.kRk.kRk.',
      '.kk...kk.'
    ],
    bolt: [
      '....kkkkk',
      '...kyyyyk',
      '...kyyyk.',
      '..kyyyk..',
      '..kyyykkk',
      '.kyyyYyyk',
      '.kkkyyyk.',
      '...kyyk..',
      '..kyyk...',
      '..kyk....',
      '.kyk.....',
      '.kk......'
    ],
    bulb: [
      '..kkkkk..',
      '.kYYYYyk.',
      'kYYwYyyyk',
      'kYwYyyyyk',
      'kYYyyyyyk',
      'kyyyyyyyk',
      '.kyyyyyk.',
      '..kyyyk..',
      '..kgggk..',
      '..kGGGk..',
      '..kgggk..',
      '...kkk...'
    ],
    brain: [
      '...kkkkkk...',
      '..kppPpppk..',
      '.kpPppPpPpk.',
      'kppPpppPpppk',
      'kpPPppPPppPk',
      'kppppPpppPpk',
      'kpPppPppPppk',
      '.kppPppPppk.',
      '..kkppppkk..',
      '....kPPk....',
      '.....kk.....'
    ],
    hourglass: [
      'kkkkkkkkk',
      'knnnnnnnk',
      '.kYYYYYk.',
      '.kyyyyyk.',
      '..kyyyk..',
      '...kyk...',
      '...kYk...',
      '..kwYwk..',
      '.kwwyywk.',
      '.kwyyyyk.',
      'knnnnnnnk',
      'kkkkkkkkk'
    ],
    smiley: [
      '...kkkk...',
      '.kkyyyykk.',
      '.kyyyyyyk.',
      'kyykyykyyk',
      'kyykyykyyk',
      'kyyyyyyyyk',
      'kykyyyykyk',
      '.kykkkkyk.',
      '.kkyyyykk.',
      '...kkkk...'
    ],
    cursor: [
      'k.......',
      'kk......',
      'kok.....',
      'kook....',
      'koook...',
      'kooook..',
      'koooook.',
      'koookkk.',
      'kokok...',
      'kk.kok..',
      '....kok.',
      '.....kk.'
    ],
    lock: [
      '..kkkk..',
      '.kgGGgk.',
      '.kG..Gk.',
      '.kG..Gk.',
      'kkkkkkkk',
      'kyyyyyyk',
      'kyyKKyyk',
      'kyyKKyyk',
      'kyyyyyyk',
      'kkkkkkkk'
    ],

    /* Land Lah! landmarks */
    scales: [
      '......kk......',
      '..kkkkyykkkk..',
      '..ky..yy..yk..',
      '.kyk..yy..kyk.',
      '.kyk..yy..kyk.',
      'kyyyk.yy.kyyyk',
      'kkkkk.yy.kkkkk',
      '......yy......',
      '......yy......',
      '....kkyykk....',
      '...kyyyyyyk...',
      '..kkkkkkkkkk..'
    ],
    bank: [
      '......kk......',
      '....kkwwkk....',
      '..kkwwyywwkk..',
      'kkwwwwwwwwwwkk',
      'kkkkkkkkkkkkkk',
      '.kwk.kwwk.kwk.',
      '.kwk.kwwk.kwk.',
      '.kwk.kwwk.kwk.',
      '.kwk.kwwk.kwk.',
      'kkkkkkkkkkkkkk',
      'kmmmmmmmmmmmmk',
      'kkkkkkkkkkkkkk'
    ],
    key: [
      '..kkkk..........',
      '.kyyyyk.........',
      'kyykkyyk........',
      'kyk..kyk........',
      'kyykkyykkkkkkkk.',
      '.kyyyyyyyyyyyyyk',
      '..kkkkkkkkyykyyk',
      '.........kyk.kk.',
      '..........k.....'
    ],
    scroll: [
      '.kkkkkkkkkk.',
      'kmmmmmmmmmmk',
      '.kwwwwwwwwk.',
      '.kwkkkkkkwk.',
      '.kwwwwwwwwk.',
      '.kwkkkkkwwk.',
      '.kwwwwwwwwk.',
      '.kwkkkkkkwk.',
      '.kwwwwwrrwk.',
      '.kwwwwrRRrk.',
      'kmmmmmmmmmmk',
      '.kkkkkkkkkk.'
    ],
    factory: [
      '.kk...........',
      'kgk...........',
      'kgk...k...k...',
      'kgk..kwk.kwk..',
      'kgk.kwwkkwwkk.',
      'kkkkkkkkkkkkkk',
      'kwwwwwwwwwwwwk',
      'kwykwykwykwykk',
      'kwwwwwwwwwwwwk',
      'kwwwwkkkkwwwwk',
      'kwwwwknnkwwwwk',
      'kkkkkkkkkkkkkk',
      'gGgGgGgGgGgGgG'
    ],
    tower: [
      '....kkkk....',
      '...kyyyyk...',
      '..kkkkkkkk..',
      '..kwlwlwlk..',
      '..kwwwwwwk..',
      '..kwlwlwlk..',
      '..kwwwwwwk..',
      '..kwlwlwlk..',
      '..kwwwwwwk..',
      '..kwlwlwlk..',
      '..kwwnnwwk..',
      'kkkkkkkkkkkk'
    ],
    pen: [
      '.........kk.',
      '........kyyk',
      '.......kyyk.',
      '......kyyk..',
      '.....kyyk...',
      '....kyyk....',
      '...kyyk.....',
      '..kwyk......',
      '..kkk.......',
      '.kb.........',
      'kbkbkbbkbbk.'
    ],
    stamp: [
      '....kkkk....',
      '...knnnnk...',
      '...knNnnk...',
      '....knnk....',
      '....knnk....',
      '..kkkkkkkk..',
      '.knnnnnnnnk.',
      'kkkkkkkkkkkk',
      'krrrrrrrrrrk',
      'kkkkkkkkkkkk',
      '............',
      '.rr.rrr.rr..',
      '.r..r.r.r...'
    ],
    sign: [
      'kkkkkkkkkkkk',
      'kyyyyyyyyyyk',
      'kykkykykkkyk',
      'kyyyyyyyyyyk',
      'kykykkykykyk',
      'kyyyyyyyyyyk',
      'kkkkkkkkkkkk',
      '...kn..kn...',
      '...kn..kn...',
      '...kn..kn...',
      'tTtTtTtTtTtT'
    ],
    gavel: [
      '..kkkkk.......',
      '.knnnnnk......',
      'knnNnnnnk.....',
      '.knnnnnnnk....',
      '..knnnnnk.k...',
      '...kkkkk.knk..',
      '..........knk.',
      '...........knk',
      '............kk',
      'kkkkkkkk......',
      'kmmmmmmk......',
      'kkkkkkkk......'
    ],
    sheet: [
      'kkkkkkkk...',
      'kwwwwwwkk..',
      'kwkkkkwkwk.',
      'kwwwwwwkkkk',
      'kwkkkkkkwwk',
      'kwwwwwwwwwk',
      'kwkkkkkkkwk',
      'kwwwwwwwwwk',
      'kwkkkkkrrwk',
      'kwwwwwwrrwk',
      'kkkkkkkkkkk'
    ],
    tv: [
      '...k....k...',
      '....k..k....',
      'kkkkkkkkkkkk',
      'kbbbbbbbbbgk',
      'kbbwbbbbbbgk',
      'kbbwwbbbbbGk',
      'kbbwwwbbbbgk',
      'kbbwwbbbbbGk',
      'kbbwbbbbbbgk',
      'kbbbbbbbbbgk',
      'kkkkkkkkkkkk',
      '..kk....kk..'
    ],
    calendar: [
      '.kk....kk.',
      'kkkkkkkkkk',
      'krrrrrrrrk',
      'kkkkkkkkkk',
      'kwkwkwkwwk',
      'kwwwwwwwwk',
      'kwkwkwkwwk',
      'kwwwwwwwwk',
      'kwkwkyykwk',
      'kwwwwyywwk',
      'kkkkkkkkkk'
    ],
    /* Location landmarks */
    school: [
      '......kk......',
      '....kkyykk....',
      '..kkyyyyyykk..',
      'kkkkkkkkkkkkkk',
      '.kwwwwwwwwwwk.',
      '.kwkwwkwwkwwk.',
      '.kwkwwkwwkwwk.',
      '.kwkwwkwwkwwk.',
      '.kwkwwkwwkwwk.',
      '.kwkwwkwwkwwk.',
      'kkkkkkkkkkkkkk',
      'kmmmmmmmmmmmmk',
      'kkkkkkkkkkkkkk'
    ],
    stall: [
      'kkkkkkkkkkkkkk',
      'kcwcwcwcwcwcwk',
      'kcwcwcwcwcwcwk',
      '.kkkkkkkkkkkk.',
      '.k..........k.',
      '.k..kyyyyk..k.',
      '.k..kyKKyk..k.',
      '.k..kyyyyk..k.',
      'kkkkkkkkkkkkkk',
      'knnnnnnnnnnnnk',
      'knNnnnnnnnnNnk',
      'kkkkkkkkkkkkkk'
    ],
    train: [
      '..kkkkkkkkkk..',
      '.kwwwwwwwwwwk.',
      'kwkkkkkkkkkkwk',
      'kwklllllllkwwk',
      'kwkllllllllkwk',
      'kwkkkkkkkkkkwk',
      'kwwwwwwwwwwwwk',
      'kwrrrrrrrrrrwk',
      'kwYwwwwwwwwYwk',
      'kwwwwwwwwwwwwk',
      '.kkkkkkkkkkkk.',
      '..kgk....kgk..',
      'kkkkkkkkkkkkkk'
    ],
    book: [
      '.kkkkk..kkkkk.',
      'kwwwwwk.kwwwwwk'.slice(0, 14),
      'kwkkkwkkkwkkwk',
      'kwwwwwkkwwwwwk',
      'kwkkkwkkwkkkwk',
      'kwwwwwkkwwwwwk',
      'kwkkwwkkwkkwwk',
      'kwwwwwkkwwwwwk',
      'kkkkkkkkkkkkkk',
      'kccccccccccccK'.replace('K', 'k'),
      'kkkkkkkkkkkkkk'
    ],
    supertree: [
      'kkkkkkkkkkkkkk',
      'kVvVvVvVvVvVvk',
      '.kVvVvVvVvVvk.',
      '..kkkvVvkkkk..',
      '.....kvVk.....',
      '.....kVvk.....',
      '.....kvVk.....',
      '.....kVvk.....',
      '.....kvVk.....',
      '....kvVvVk....',
      '...kvVvVvVk...',
      'kkkkkkkkkkkkkk'
    ],
    dice: [
      '.kkkkkkkkkk.',
      'kwwwwwwwwwwk',
      'kwkkwwwwkkwk',
      'kwkkwwwwkkwk',
      'kwwwwkkwwwwk',
      'kwwwwkkwwwwk',
      'kwkkwwwwkkwk',
      'kwkkwwwwkkwk',
      'kwwwwwwwwwwk',
      'kmwwwwwwwwmk',
      '.kkkkkkkkkk.'
    ],
    plane: [
      '......kk.......',
      '......kwk......',
      '......kwwk.....',
      '.kk...kwwwk....',
      '.kwk..kwwwwkkk.',
      'kkwwkkkwwwwwwwk',
      'kwwwwwwwwwwwwlk',
      'kkwwkkkwwwwwwk.',
      '.kwk..kwwwwkk..',
      '.kk...kwwwk....',
      '......kwwk.....',
      '......kwk......',
      '......kk.......'
    ],
    house: [
      '......kk......',
      '....kknnkk....',
      '..kknnnnnnkk..',
      'kknnnnnnnnnnkk',
      'kkkkkkkkkkkkkk',
      '.kmmmmmmmmmmk.',
      '.kmkkmmmkkkmk.',
      '.kmkymmmknkmk.',
      '.kmkkmmmknkmk.',
      '.kkkkkkkkkkkk.',
      '..kn..kn..kn..',
      '..kn..kn..kn..',
      'tTtTtTtTtTtTtT'
    ],
    flask: [
      '....kkkk....',
      '....kwwk....',
      '....kwwk....',
      '....kwwk....',
      '...kwwwwk...',
      '..kwwwwwwk..',
      '.kwttttttwk.',
      'kwttTttTttwk',
      'kwtttTttttwk',
      'kwttttttTtwk',
      '.kkkkkkkkkk.'
    ],
    mic: [
      '...kkkkk...',
      '..kgGgGgk..',
      '..kGgGgGk..',
      '..kgGgGgk..',
      '..kkkkkkk..',
      '.k.kgggk.k.',
      '.k..kgk..k.',
      '..k.kgk.k..',
      '...kkgkk...',
      '.....g.....',
      '...kkkkk...',
      '..knnnnnk..',
      '.knnnnnnnk.',
      'kkkkkkkkkkk'
    ],
    kopi: [
      '...k..k...',
      '....k..k..',
      '...k..k...',
      'kkkkkkkkk.',
      'kwwwwwwwkk',
      'kwnnnnnwkwk',
      'kwNnnnnwkwk',
      'kwnnnnnwkk',
      '.kwwwwwk..',
      'kkkkkkkkk.',
      'kmmmmmmmk.',
      '.kkkkkkk..'
    ],
    merlion: [
      '.....kkkkk......',
      '....kwwwwwk.....',
      '...kwwkwwwwk....',
      '...kwwwwwwwwk...',
      '..kmwwwwwwkk.ll.',
      '..kmmwwwwkk.lll.',
      '..kmmwwwwwk..ll.',
      '...kmwwwwwk...l.',
      '....kwwwwk......',
      '....kwmwwk......',
      '...kwwmwwk......',
      '..kwwwmwk.......',
      '..kwwmwwk.......',
      '.kkkkkkkkkk.....',
      '.kgggggggggk....',
      'kkkkkkkkkkkkk...'
    ],
    gradcap: [
      '.......kk.......',
      '.....kkVVkk.....',
      '...kkVVvvVVkk...',
      '.kkVVvvvvvvVVkk.',
      'kVVvvvvyyvvvvVVk',
      '.kkvvvvvvvvyykk.',
      '...kkvvvvvvkkyk.',
      '...kvkkkkkkvkyk.',
      '...kvvvvvvvvkyk.',
      '...kvvvvvvvvkyyk',
      '....kkkkkkkk.kk.'
    ]
  };
  /* Tidy any accidental ragged rows. */
  Object.keys(ICONS).forEach(function (k) {
    var rows = ICONS[k], w = 0;
    rows.forEach(function (r) { w = Math.max(w, r.length); });
    ICONS[k] = rows.map(function (r) { while (r.length < w) r += '.'; return r; });
  });
  PX.ICONS = ICONS;

  function gridFromMap(map) {
    return map.map(function (row) {
      return row.split('').map(function (ch) { return ch === '.' || ch === ' ' ? null : (PAL[ch] || null); });
    });
  }

  PX.paint = function (canvas, grid, scale) {
    var h = grid.length, w = grid[0].length;
    canvas.width = w * scale; canvas.height = h * scale;
    var ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var c = grid[y][x];
      if (c) { ctx.fillStyle = c; ctx.fillRect(x * scale, y * scale, scale, scale); }
    }
    return canvas;
  };
  PX.icon = function (canvas, name, scale) {
    var map = ICONS[name] || ICONS.star;
    return PX.paint(canvas, gridFromMap(map), scale || 3);
  };

  /* ---------- portrait generator (16 x 18) ---------- */
  function blank(w, h) {
    var g = [];
    for (var y = 0; y < h; y++) { var r = []; for (var x = 0; x < w; x++) r.push(null); g.push(r); }
    return g;
  }
  function rect(g, x, y, w, h, c) {
    for (var j = y; j < y + h; j++) for (var i = x; i < x + w; i++)
      if (j >= 0 && j < g.length && i >= 0 && i < g[0].length) g[j][i] = c;
  }
  function px(g, x, y, c) { rect(g, x, y, 1, 1, c); }
  function shade(hex, amt) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, gg = (n >> 8) & 255, b = n & 255;
    var f = function (v) { return Math.max(0, Math.min(255, Math.round(v * (1 + amt)))); };
    return '#' + [f(r), f(gg), f(b)].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }
  /* Outline every filled pixel's empty 4-neighbours in the dark outline colour. */
  function outline(g, c) {
    var h = g.length, w = g[0].length, add = [];
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      if (g[y][x]) continue;
      var n = (y > 0 && g[y - 1][x]) || (y < h - 1 && g[y + 1][x]) || (x > 0 && g[y][x - 1]) || (x < w - 1 && g[y][x + 1]);
      if (n) add.push([x, y]);
    }
    add.forEach(function (p) { g[p[1]][p[0]] = c; });
  }

  var HAIR = {
    short: function (g, c) { rect(g, 4, 2, 8, 1, c); rect(g, 3, 3, 10, 2, c); rect(g, 3, 5, 1, 2, c); rect(g, 12, 5, 1, 2, c); rect(g, 4, 5, 3, 1, c); rect(g, 10, 5, 2, 1, c); },
    buzz: function (g, c) { rect(g, 4, 2, 8, 1, c); rect(g, 3, 3, 10, 2, c); rect(g, 3, 5, 1, 1, c); rect(g, 12, 5, 1, 1, c); },
    spiky: function (g, c) { HAIR.short(g, c); px(g, 4, 1, c); px(g, 6, 1, c); px(g, 9, 1, c); px(g, 11, 1, c); px(g, 7, 0, c); rect(g, 6, 5, 2, 1, c); },
    long: function (g, c) { HAIR.short(g, c); rect(g, 2, 4, 2, 10, c); rect(g, 12, 4, 2, 10, c); rect(g, 4, 5, 4, 1, c); },
    ponytail: function (g, c) { HAIR.short(g, c); rect(g, 13, 4, 2, 2, c); rect(g, 14, 6, 1, 6, c); rect(g, 13, 11, 1, 2, c); },
    bun: function (g, c) { HAIR.short(g, c); rect(g, 6, 0, 4, 2, c); },
    curly: function (g, c) { rect(g, 3, 2, 10, 3, c); px(g, 4, 1, c); px(g, 6, 1, c); px(g, 8, 1, c); px(g, 10, 1, c); rect(g, 2, 3, 1, 5, c); rect(g, 13, 3, 1, 5, c); rect(g, 3, 5, 2, 2, c); rect(g, 11, 5, 2, 2, c); px(g, 6, 5, c); px(g, 9, 5, c); },
    bald: function (g, c) { rect(g, 3, 5, 1, 3, c); rect(g, 12, 5, 1, 3, c); },
    wild: function (g, c) { rect(g, 1, 4, 3, 5, c); rect(g, 12, 4, 3, 5, c); px(g, 0, 5, c); px(g, 15, 5, c); px(g, 0, 7, c); px(g, 15, 7, c); rect(g, 4, 2, 2, 1, c); rect(g, 10, 2, 2, 1, c); },
    wig: function (g, c) { HAIR.short(g, c); rect(g, 1, 4, 3, 8, c); rect(g, 12, 4, 3, 8, c); px(g, 1, 5, shade(c, -0.2)); px(g, 14, 7, shade(c, -0.2)); px(g, 2, 9, shade(c, -0.2)); px(g, 13, 10, shade(c, -0.2)); },
    hijab: function (g, c) {
      rect(g, 3, 1, 10, 4, c); rect(g, 2, 3, 2, 11, c); rect(g, 12, 3, 2, 11, c);
      rect(g, 3, 11, 10, 3, c); rect(g, 4, 5, 1, 1, c); rect(g, 11, 5, 1, 1, c);
      rect(g, 1, 13, 14, 3, c); px(g, 4, 2, shade(c, 0.35)); px(g, 5, 2, shade(c, 0.35));
      px(g, 11, 12, '#ffd23f');
    },
    cap: function (g, c) { rect(g, 3, 1, 10, 4, c); rect(g, 3, 5, 11, 1, shade(c, -0.35)); px(g, 7, 2, '#ffd23f'); px(g, 8, 2, '#ffd23f'); rect(g, 3, 6, 1, 1, '#1b1012'); rect(g, 12, 6, 1, 1, '#1b1012'); },
    detective: function (g, c) { rect(g, 4, 0, 8, 3, c); rect(g, 2, 3, 12, 2, shade(c, -0.25)); rect(g, 4, 2, 8, 1, '#2a0508'); }
  };

  /* o = {skin, hair, style, shirt, acc:[], eye} */
  PX.person = function (o) {
    var g = blank(16, 18);
    var skin = o.skin, skinD = shade(skin, -0.16);
    /* body */
    rect(g, 2, 14, 12, 1, o.shirt); rect(g, 1, 15, 14, 3, o.shirt);
    rect(g, 9, 15, 5, 3, shade(o.shirt, -0.18));
    rect(g, 6, 12, 4, 2, skinD);
    /* head */
    rect(g, 4, 3, 8, 9, skin); rect(g, 3, 4, 10, 7, skin);
    rect(g, 12, 5, 1, 5, skinD); rect(g, 5, 11, 6, 1, skinD);
    /* face */
    var eye = o.eye || '#1b0b0b';
    rect(g, 5, 7, 1, 2, eye); rect(g, 10, 7, 1, 2, eye);
    px(g, 4, 9, '#f28b82'); px(g, 11, 9, '#f28b82');
    if (o.frown) { rect(g, 7, 10, 2, 1, '#7a2a20'); px(g, 6, 11, '#7a2a20'); px(g, 9, 11, '#7a2a20'); }
    else { rect(g, 7, 10, 2, 1, '#7a2a20'); px(g, 6, 9, '#7a2a20'); px(g, 9, 9, '#7a2a20'); }
    var acc = o.acc || [];
    if (acc.indexOf('beard') >= 0) { rect(g, 4, 9, 8, 3, o.beard || o.hair); rect(g, 5, 12, 6, 1, o.beard || o.hair); rect(g, 7, 10, 2, 1, '#7a2a20'); }
    if (acc.indexOf('mustache') >= 0) { rect(g, 6, 9, 4, 1, o.beard || o.hair); }
    if (acc.indexOf('whiskers') >= 0) { rect(g, 3, 7, 1, 4, o.beard || o.hair); rect(g, 12, 7, 1, 4, o.beard || o.hair); }
    (HAIR[o.style] || HAIR.short)(g, o.hair);
    if (acc.indexOf('glasses') >= 0) {
      var fc = o.frame || '#2a0508';
      rect(g, 4, 6, 3, 1, fc); rect(g, 4, 9, 3, 1, fc); rect(g, 4, 7, 1, 2, fc); rect(g, 6, 7, 1, 2, fc);
      rect(g, 9, 6, 3, 1, fc); rect(g, 9, 9, 3, 1, fc); rect(g, 9, 7, 1, 2, fc); rect(g, 11, 7, 1, 2, fc);
      px(g, 7, 7, fc); px(g, 8, 7, fc); px(g, 5, 7, eye); px(g, 10, 7, eye); px(g, 5, 8, '#c9e3ff'); px(g, 10, 8, '#c9e3ff');
    }
    if (acc.indexOf('collar') >= 0) { px(g, 5, 14, '#fff6ec'); px(g, 6, 14, '#fff6ec'); px(g, 9, 14, '#fff6ec'); px(g, 10, 14, '#fff6ec'); }
    if (acc.indexOf('tie') >= 0) { rect(g, 7, 14, 2, 4, '#b3261e'); }
    if (acc.indexOf('lanyard') >= 0) { px(g, 5, 14, '#3b6fd8'); px(g, 6, 15, '#3b6fd8'); px(g, 10, 14, '#3b6fd8'); px(g, 9, 15, '#3b6fd8'); rect(g, 7, 16, 2, 2, '#fff6ec'); }
    if (acc.indexOf('apron') >= 0) { rect(g, 5, 15, 6, 3, '#fff6ec'); px(g, 5, 14, '#fff6ec'); px(g, 10, 14, '#fff6ec'); }
    if (acc.indexOf('sash') >= 0) { px(g, 3, 14, '#b3261e'); px(g, 4, 15, '#b3261e'); px(g, 5, 16, '#b3261e'); px(g, 6, 17, '#b3261e'); }
    if (acc.indexOf('labcoat') >= 0) { rect(g, 1, 15, 5, 3, '#fff6ec'); rect(g, 10, 15, 5, 3, '#e8ddd0'); px(g, 2, 14, '#fff6ec'); px(g, 13, 14, '#e8ddd0'); }
    if (acc.indexOf('epaulettes') >= 0) { rect(g, 1, 15, 2, 1, '#ffd23f'); rect(g, 13, 15, 2, 1, '#ffd23f'); px(g, 5, 16, '#ffd23f'); }
    if (acc.indexOf('singlet') >= 0) { rect(g, 1, 15, 3, 3, skin); rect(g, 12, 15, 3, 3, skinD); rect(g, 2, 14, 2, 1, skin); rect(g, 12, 14, 2, 1, skinD); }
    if (acc.indexOf('headset') >= 0) { rect(g, 3, 2, 10, 1, '#2a0508'); rect(g, 2, 6, 1, 3, '#2a0508'); rect(g, 13, 6, 1, 3, '#2a0508'); }
    if (acc.indexOf('glow') >= 0) { px(g, 5, 7, '#ffd23f'); px(g, 10, 7, '#ffd23f'); }
    outline(g, '#2a0508');
    return g;
  };
  PX.portrait = function (canvas, look, scale) { return PX.paint(canvas, PX.person(look), scale || 4); };

  /* ---------- procedural clouds and skylines ---------- */
  PX.clouds = function (canvas, seed, opts) {
    opts = opts || {};
    var cell = opts.cell || 6;
    var w = Math.max(1, Math.floor(canvas.clientWidth || canvas.width || 300));
    var h = Math.max(1, Math.floor(canvas.clientHeight || canvas.height || 120));
    canvas.width = w; canvas.height = h;
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    var rand = LL.util.rng(seed || 3);
    var cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    var puffs = [];
    var count = opts.count || Math.max(5, Math.round(cols / 6));
    /* Keep every puff fully inside the canvas so no cloud is cut by a straight edge. */
    for (var i = 0; i < count; i++) {
      var r = Math.min(rows * (0.2 + rand() * 0.2), cols / 2.2), ry = r / 1.15 + 1;
      var x = r + 1 + rand() * Math.max(0, cols - 2 * r - 2);
      var y = Math.max(ry, rows - ry - rand() * rows * 0.3);
      puffs.push({ x: x, y: y, r: r });
    }
    for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
      var best = -1, d0 = 99;
      for (var p = 0; p < puffs.length; p++) {
        var dx = x - puffs[p].x, dy = (y - puffs[p].y) * 1.15;
        var d = Math.sqrt(dx * dx + dy * dy) / puffs[p].r;
        if (d < d0) { d0 = d; best = p; }
      }
      if (d0 <= 1) {
        var py = (y - puffs[best].y) / puffs[best].r;
        var col = d0 > 0.86 ? '#1b5f86' : (py < -0.45 ? '#f4fbff' : (py < -0.1 ? '#bfe6f5' : '#7cc6e3'));
        if (d0 > 0.86 && py < -0.3) col = '#d9f1fa';
        ctx.fillStyle = col; ctx.fillRect(x * cell, y * cell, cell, cell);
        if (((x * 7 + y * 13) % 17 === 0) && py < -0.2 && d0 < 0.8) { ctx.fillStyle = '#ffffff'; ctx.fillRect(x * cell, y * cell, cell, cell); }
      }
    }
  };

  PX.skyline = function (canvas, seed, landmark) {
    var w = Math.max(1, Math.floor(canvas.clientWidth || 320));
    var h = Math.max(1, Math.floor(canvas.clientHeight || 120));
    canvas.width = w; canvas.height = h;
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var cell = 4, rand = LL.util.rng(seed || 11);
    ctx.clearRect(0, 0, w, h);
    /* sun */
    var sx = Math.floor(w * (0.6 + rand() * 0.25) / cell) * cell, sy = Math.floor(h * 0.18 / cell) * cell, sr = 7;
    for (var yy = -sr; yy <= sr; yy++) for (var xx = -sr; xx <= sr; xx++) {
      if (xx * xx + yy * yy <= sr * sr) {
        ctx.fillStyle = (yy % 3 === 0 && yy > 0) ? 'rgba(0,0,0,0)' : (yy < -2 ? '#fff1a8' : '#ffc94a');
        if (!(yy % 3 === 0 && yy > 0)) ctx.fillRect(sx + xx * cell, sy + yy * cell, cell, cell);
      }
    }
    /* buildings: HDB-ish slabs */
    var x = 0;
    while (x < w) {
      var bw = (3 + Math.floor(rand() * 6)) * cell;
      var bh = Math.floor((0.25 + rand() * 0.5) * h / cell) * cell;
      var top = h - bh;
      ctx.fillStyle = rand() < 0.5 ? '#0b3550' : '#082a40';
      ctx.fillRect(x, top, bw, bh);
      ctx.fillStyle = '#165a80';
      ctx.fillRect(x, top, bw, cell);
      for (var wy = top + cell * 2; wy < h - cell; wy += cell * 2) {
        for (var wx = x + cell; wx < x + bw - cell; wx += cell * 2) {
          if (rand() < 0.45) { ctx.fillStyle = rand() < 0.5 ? '#ffd56a' : '#ffb238'; ctx.fillRect(wx, wy, cell, cell); }
        }
      }
      x += bw + (rand() < 0.3 ? cell * 2 : 0);
    }
    /* ground line */
    ctx.fillStyle = '#041521'; ctx.fillRect(0, h - cell, w, cell);
  };

  /* Render every <canvas data-icon> / data-portrait inside a root element. */
  PX.hydrate = function (rootEl) {
    var els = (rootEl || document).querySelectorAll('canvas[data-icon]');
    Array.prototype.forEach.call(els, function (c) { PX.icon(c, c.getAttribute('data-icon'), +c.getAttribute('data-scale') || 3); });
    var ps = (rootEl || document).querySelectorAll('canvas[data-portrait]');
    Array.prototype.forEach.call(ps, function (c) {
      var look = LL.looks && LL.looks[c.getAttribute('data-portrait')];
      if (look) PX.portrait(c, look, +c.getAttribute('data-scale') || 4);
    });
    var cl = (rootEl || document).querySelectorAll('canvas[data-clouds]');
    Array.prototype.forEach.call(cl, function (c) { PX.clouds(c, +c.getAttribute('data-clouds') || 3, { cell: +c.getAttribute('data-cell') || 6 }); });
    var sk = (rootEl || document).querySelectorAll('canvas[data-skyline]');
    Array.prototype.forEach.call(sk, function (c) { PX.skyline(c, +c.getAttribute('data-skyline') || 5); });
  };
})(typeof window !== 'undefined' ? window : globalThis);
