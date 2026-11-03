/* MÆZE — touch player for the Figma prototype (file IeZpV9KQaZUIBurDj3M3IL, section "Prototype").
   Every screen, component state, timer and link below mirrors the Figma prototype.
   Images are Figma renders; see assets.js. */
(() => {
  'use strict';
  const W = 402, H = 874;
  const IMG = window.MAZE_IMG;
  const BG = { S: '#E6D8B7', U: '#4C372C' };

  /* ---------- actions ---------- */
  const back = () => [14, 54, 72, 44, { t: 'back' }];
  const zoom = (ov) => [344, 54, 44, 44, { t: 'ov', to: ov }];
  const cta = (to) => [36, 786, 330, 50, { t: 'nav', to }];
  const dead = (y = 732, h = 44) => [165, y, 73, h, { t: 'nav', to: '37:7156' }];

  /* ---------- screens: [id, bg, interactive instances [set, start variant, x, y], hotspots] ---------- */
  const SCREENS = [
    ['36:4533', 'S', [['33:1998', '33:1978', 91, 262]], [cta('36:4557')]],                                   // 01 Portal
    ['36:4557', 'S', [['33:2367', '33:2001', 36, 303]], [back(), zoom('23:3089'), cta('36:4645')]],          // 02 Scale
    ['36:4645', 'S', [], [back(), zoom('23:3089'), cta('36:4697')]],                                          // 03 Start at the catalog
    ['36:4697', 'U', [['35:1311', '35:732', 0, 0]], [back(), zoom('23:3089'), cta('36:4917')]],              // 04 Walk to the catalog
    ['36:4917', 'S', [['32:750', '32:732', 36, 373]], [back(), zoom('23:3089'), cta('36:4971')]],            // 05 Q1 Feel
    ['36:4971', 'S', [['31:7967', '31:7317', 36, 300]], [back(), zoom('23:3300'), dead(), cta('36:5055')]],  // 06 Go Drawer
    ['36:5055', 'U', [['35:1600', '35:1315', 0, 0]], [back(), zoom('23:3512'), cta('36:5177')]],             // 07 Walk open the drawer
    ['36:5177', 'S', [['32:875', '32:821', 36, 344]], [back(), zoom('23:3512'), cta('36:5227')]],            // 08 Q2 Social
    ['36:5227', 'S', [['31:8394', '31:8124', 36, 332]], [back(), zoom('23:3725'), dead(), cta('36:5277')]],  // 09 Go Card
    ['36:5277', 'S', [['31:8649', '31:8605', 36, 162], ['31:9017', '31:8654', 36, 405]],
      [back(), zoom('23:3939'), dead(746, 36), cta('36:5350')]],                                             // 10 Your card
    ['36:5350', 'U', [['35:2903', '35:1604', 0, 0]], [back(), zoom('23:3939'), cta('36:5810')]],             // 11 Walk into the stacks
    ['36:5810', 'S', [['32:1815', '32:1350', 36, 339]], [back(), zoom('23:4154'), dead(), cta('36:5937')]],  // 12 Q3 Ladder
    ['36:5937', 'U', [['35:4749', '35:2907', 0, 0]], [back(), zoom('23:4154'), cta('37:6523')]],             // 13 Walk leaning out
    ['37:6523', 'S', [['32:986', '32:932', 36, 363]], [back(), zoom('23:4154'), cta('37:6573')]],            // 14 Q4 Brightness
    ['37:6573', 'U', [['35:4911', '35:4752', 0, 0]], [back(), zoom('23:4370'), cta('37:6653')]],             // 15 Walk open the book
    ['37:6653', 'S', [['32:1893', '32:1821', 36, 334]], [back(), zoom('23:4370'), dead(), cta('37:6720')]],  // 16 Go Page
    ['37:6720', 'S', [['32:1938', '32:1896', 36, 298], ['32:777', '32:759', 36, 541]],
      [back(), zoom('23:4370'), cta('37:6771')]],                                                            // 17 Q5 Touch
    ['37:6771', 'S', [['33:1134', '33:731', 36, 311]], [back(), zoom('23:4587'), dead(), cta('37:6973')]],   // 18 Go Line
    ['37:6973', 'S', [['33:1437', '33:1297', 36, 351]], [back(), zoom('23:4805'), dead(), cta('37:7026')]],  // 21 Go Word
    ['37:7026', 'S', [['33:1557', '33:1485', 36, 355]],
      [back(), zoom('23:4805'), [153, 732, 96, 44, { t: 'nav', to: '36:4917' }], cta('37:7067')]],          // 22 Final word
    ['37:7067', 'S', [['33:1612', '33:1588', 36, 263]], [back(), zoom('23:4805'), cta('37:7104')]],          // 23 Your line
    ['37:7104', 'S', [['33:1964', '33:1615', 36, 290]], [back(), zoom('23:4805'), cta('36:4533')]],          // 24 Book of lines
    ['37:7156', 'S', [['33:2399', '33:2373', 36, 245]],
      [back(), zoom('23:3089'), [160, 732, 82, 44, { t: 'back' }], cta('36:4917')]],                        // 25 Dead end
  ];
  const SCREEN = Object.fromEntries(SCREENS.map(([id, bg, inst, hot]) => [id, { id, bg, inst, hot }]));
  const OVERLAY_HOT = [[331, 62, 35, 21, { t: 'close' }]];

  /* ---------- component sets ---------- */
  // variant: { hot: [[x,y,w,h,to,dur]], timer: [after, to, dur] }
  const SETS = {};
  const set = (id, variants, extra = {}) => { SETS[id] = Object.assign({ v: variants }, extra); };
  const whole = (vid, to, d) => [-2, -2, IMG[vid][3], IMG[vid][4], to, d];

  // looping / timed sets
  set('33:1998', { '33:1978': { timer: [0.2, '33:1988', 1.6] }, '33:1988': { timer: [0.2, '33:1978', 1.6] } });
  set('33:2367', {
    '33:2001': { timer: [0.25, '33:2062', 0.45] }, '33:2062': { timer: [0.35, '33:2123', 0.45] },
    '33:2123': { timer: [0.35, '33:2184', 0.45] }, '33:2184': { timer: [0.35, '33:2245', 0.45] },
    '33:2245': { timer: [0.35, '33:2306', 0.45] }, '33:2306': {},
  });
  const walk = (id, steps) => {
    const v = {};
    steps.forEach((s, i) => {
      if (i < steps.length - 1) v[s] = { timer: [i === 0 ? 0.5 : 1.1, steps[i + 1], 1.5] };
      else v[s] = { hot: [whole(s, steps[0], 0.7)] };
    });
    set(id, v, { walk: true });
  };
  walk('35:1311', ['35:732', '35:925', '35:1118']);
  walk('35:1600', ['35:1315', '35:1410', '35:1505']);
  walk('35:2903', ['35:1604', '35:2037', '35:2470']);
  walk('35:4749', ['35:2907', '35:3828']);
  walk('35:4911', ['35:4752', '35:4805', '35:4858']);
  const answer = (id, [empty, blink, filled]) => set(id, {
    [empty]: { timer: [0.55, blink, 0], hot: [whole(empty, filled, 0.5)] },
    [blink]: { timer: [0.55, empty, 0], hot: [whole(blink, filled, 0.5)] },
    [filled]: { hot: [whole(filled, empty, 0.3)] },
  });
  answer('32:750', ['32:732', '32:738', '32:744']);
  answer('32:777', ['32:759', '32:765', '32:771']);
  set('31:8649', {
    '31:8605': { hot: [whole('31:8605', '31:8616', 0.18)] },
    '31:8616': { timer: [0.01, '31:8627', 0.22] },
    '31:8627': { hot: [whole('31:8627', '31:8638', 0.18)] },
    '31:8638': { timer: [0.01, '31:8605', 0.22] },
  }, { swipe: 'tap' });
  const ladder = ['32:1350', '32:1443', '32:1536', '32:1629', '32:1722'];
  set('32:1815', Object.fromEntries(ladder.map((v, i) => [v, { hot: [[96, 0, 140, 258, ladder[(i + 1) % 5], 0.35]] }])));
  set('32:1893', {
    '32:1821': { hot: [[20, 0, 300, 160, '32:1857', 0.6]] },
    '32:1857': { hot: [[20, 0, 300, 160, '32:1821', 0.4]] },
  }, { swipe: 'tap' });
  set('32:1938', {
    '32:1896': { timer: [0.3, '32:1910', 1.1], hot: [[88, 0, 160, 190, '32:1924', 0.3]] },
    '32:1910': { timer: [0.05, '32:1896', 0], hot: [[88, 0, 160, 190, '32:1924', 0.3]] },
    '32:1924': { hot: [[88, 0, 160, 190, '32:1896', 0.3]] },
  });
  set('33:1612', {
    '33:1588': { hot: [[58, 0, 216, 310, '33:1600', 0.7]] },
    '33:1600': { hot: [[58, 0, 216, 310, '33:1588', 0.5]] },
  }, { swipe: 'tap' });
  const R = (to, d = 0) => [167, 0, 163, 262, to, d], L = (to, d = 0.4) => [2, 0, 163, 262, to, d];
  set('33:1964', {
    '33:1615': { hot: [R('33:1752')] },
    '33:1640': { hot: [R('33:1820'), L('33:1615')] },
    '33:1681': { hot: [R('33:1900'), L('33:1640')] },
    '33:1720': { hot: [R('33:1615', 0.5), L('33:1681')] },
    '33:1752': { timer: [0.01, '33:1786', 0.3] }, '33:1786': { timer: [0.01, '33:1640', 0.3] },
    '33:1820': { timer: [0.01, '33:1861', 0.3] }, '33:1861': { timer: [0.01, '33:1681', 0.3] },
    '33:1900': { timer: [0.01, '33:1932', 0.3] }, '33:1932': { timer: [0.01, '33:1720', 0.3] },
  }, { swipe: 'pages' });
  set('33:2399', { '33:2373': { timer: [0.3, '33:2386', 1] }, '33:2386': { timer: [0.3, '33:2373', 1] } });

  // pick-one sets: tapping an item selects it, tapping the selected item puts it back
  const radio = (id, none, items, rects, dy, d, extra) => {
    const v = {};
    [none, ...items].forEach((state) => {
      v[state] = {
        hot: items.map((vid, i) => {
          const sel = state === vid, [x, y, w, h] = rects[i];
          return [x, y + (sel ? dy : 0), w, h, sel ? none : vid, d];
        }),
      };
    });
    set(id, v, Object.assign({ none, items }, extra));
  };
  const seq = (a, step, n) => Array.from({ length: n }, (_, i) => a.split(':')[0] + ':' + (+a.split(':')[1] + step * i));
  radio('31:7967', '31:7317', seq('31:7367', 50, 12),
    Array.from({ length: 12 }, (_, i) => [[0, 85, 170, 255][i % 4], [0, 64, 128][Math.floor(i / 4)], 74, 54]), 10, 0.45);
  // drawer cards: Card 14 is drawn first (back), Card 1 last (front)
  const cardIdx = Array.from({ length: 14 }, (_, k) => 14 - k);
  radio('31:8394', '31:8124', cardIdx.map((n) => '31:' + (8142 + 18 * (n - 1))),
    cardIdx.map((n) => [10 * n, 130 - 7 * (n - 1), 180, 90]), -34, 0.35);
  const spineX = [0, 33, 67, 100, 134, 167, 200, 234, 267, 301], spineY = [30, 18, 36, 22, 24, 14, 32, 20, 26, 16],
    spineH = [140, 152, 134, 148, 146, 156, 138, 150, 144, 154];
  radio('31:9017', '31:8654', seq('31:8687', 33, 10), spineX.map((x, i) => [x, spineY[i], 29, spineH[i]]), -24, 0.4);
  radio('33:1134', '33:731', seq('33:762', 31, 12),
    Array.from({ length: 12 }, (_, i) => [4, 13 + 17 * i, 159, 17]), 0, 0.3, { scrub: 'lines' });
  radio('33:1437', '33:1297', seq('33:1317', 20, 6),
    [[12, 6, 40, 44], [58, 6, 50, 44], [114, 6, 53, 44], [173, 6, 80, 44], [259, 6, 60, 44], [138, 60, 55, 44]], -6, 0.35);
  radio('33:1557', '33:1485', seq('33:1497', 12, 5),
    [[13, 0, 61, 30], [80, 0, 83, 30], [169, 0, 57, 30], [232, 0, 86, 30], [116, 40, 99, 30]], 0, 0.3);
  // sliders: five stops; the current stop has no link
  const STOPS = [[0, 54, 66, 44], [50, 54, 66, 44], [132, 54, 66, 44], [215, 54, 66, 44], [264, 54, 66, 44]];
  const slider = (id, vids) => set(id, Object.fromEntries(vids.map((v, k) => [v, {
    hot: vids.map((to, j) => (j === k ? null : [...STOPS[j], to, 0.45])).filter(Boolean),
  }])), { items: vids, scrub: 'slider' });
  slider('32:875', ['32:785', '32:803', '32:821', '32:839', '32:857']);
  slider('32:986', ['32:896', '32:914', '32:932', '32:950', '32:968']);

  /* ---------- DOM + scaling ---------- */
  const frame = document.getElementById('frame');
  const stage = document.getElementById('stage');
  // Viewers use their own phone's status bar and home bar, so the mock ones in the design are
  // cropped off: only the band from y 50 (below the 9:41 / Dynamic Island row) to y 850 (above
  // the home indicator line) is shown. It sits inside the device's safe area at actual size,
  // scaled down only if the window is smaller. The page around it takes the screen's colour.
  const TOP = 50, BOTTOM = 850, VISIBLE = BOTTOM - TOP;
  const appEl = document.getElementById('app');
  let scale = 1;
  function layout() {
    const cs = getComputedStyle(appEl);
    const aw = appEl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = appEl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    scale = Math.min(aw / W, ah / VISIBLE);
    frame.style.width = W * scale + 'px';
    frame.style.height = VISIBLE * scale + 'px';
    stage.style.transform = `translateY(${-TOP * scale}px) scale(${scale})`;
  }
  window.addEventListener('resize', layout);
  window.addEventListener('orientationchange', () => setTimeout(layout, 300));
  layout();


  /* ---------- live vector components (animate like Figma Smart Animate, no image blending) ---------- */
  // Portal / Nested: [x, y, w, h, rotation, stroke, strokeWeight, spineX] per book, phase A and B
  const PORTAL = {
    '33:1978': [[10, 9, 200, 272, 0], [37, 46, 146, 198, 0], [63, 81, 94, 128, 0], [87, 114, 46, 62, 0], [106, 141]],
    '33:1988': [[10, 9, 200, 272, 0], [44, 43, 146, 198, 2.5], [76, 75, 94, 128, -3], [104, 106, 46, 62, 4], [123, 133]],
  };
  const PORTAL_STYLE = [['#4C372C', 1, 16], ['#4C372C', 1, 11.68], ['#4C372C', 1, 7.52], ['#DC4733', 1.5, 6]];
  const SVGNS = 'http://www.w3.org/2000/svg';
  const LIVE = {
    '33:1998': {
      make(vid) {
        const svg = document.createElementNS(SVGNS, 'svg');
        svg.setAttribute('width', 220); svg.setAttribute('height', 290);
        svg.setAttribute('viewBox', '0 0 220 290');
        svg.classList.add('live');
        PORTAL_STYLE.forEach(([c, sw, spine], i) => {
          const g = document.createElementNS(SVGNS, 'g');
          const [, , w, h] = PORTAL[vid][i];
          g.innerHTML = `<rect x="${sw / 2}" y="${sw / 2}" width="${w - sw}" height="${h - sw}" fill="#E6D8B7" stroke="${c}" stroke-width="${sw}"/>` +
            `<line x1="${spine}" y1="0" x2="${spine}" y2="${h}" stroke="${c}" stroke-width="1"/>`;
          svg.appendChild(g);
        });
        const dot = document.createElementNS(SVGNS, 'circle');
        dot.setAttribute('r', 4); dot.setAttribute('fill', '#DC4733');
        svg.appendChild(dot);
        this.apply(svg, vid, 0);
        return svg;
      },
      apply(svg, vid, d) {
        const parts = [...svg.children];
        PORTAL[vid].forEach((p, i) => {
          const el = parts[i];
          el.style.transition = d ? `transform ${d}s cubic-bezier(.45,0,.25,1)` : 'none';
          el.style.transform = i < 4 ? `translate(${p[0]}px, ${p[1]}px) rotate(${p[4]}deg)` : `translate(${p[0] + 4}px, ${p[1] + 4}px)`;
        });
      },
    },
  };

  function img(id) {
    const [file, ox, oy, w, h] = IMG[id];
    const el = new Image();
    el.src = 'img/' + file;
    el.alt = '';
    el.draggable = false;
    Object.assign(el.style, { left: ox + 'px', top: oy + 'px', width: w + 'px', height: h + 'px' });
    return el;
  }
  function fadeIn(el, d) {
    if (!d) return;
    el.classList.add('fade');
    el.style.opacity = '0';
    el.style.transitionDuration = d + 's';
    void el.offsetWidth;
    el.style.opacity = '1';
  }

  /* ---------- state ---------- */
  const stack = [];          // [{ id, states: {instanceIndex: variantId} }]
  let cur = null;            // { entry, el, insts: [...] }
  let overlay = null;        // { el }

  function buildScreen(entry) {
    const s = SCREEN[entry.id];
    const el = document.createElement('div');
    el.className = 'screen';
    el.style.background = BG[s.bg];
    const insts = s.inst.map(([setId, start, x, y], i) => {
      const box = document.createElement('div');
      box.className = 'inst';
      box.style.left = x + 'px';
      box.style.top = y + 'px';
      el.appendChild(box);
      const vid = entry.states[i] || start;
      const inst = { i, setId, x, y, vid, box, timer: 0, gen: 0 };
      box.appendChild(LIVE[setId] ? LIVE[setId].make(vid) : img(vid));
      return inst;
    });
    el.appendChild(img(entry.id));
    return { entry, el, insts, bg: s.bg };
  }

  function setTheme(bg) {
    const c = BG[bg];
    document.documentElement.style.setProperty('--bg', c);
    document.documentElement.style.backgroundColor = c;
    document.body.style.backgroundColor = c;
    document.querySelector('meta[name=theme-color]').content = c;
  }

  function show(entry, d = 0.25) {
    const old = cur;
    if (old) old.insts.forEach((n) => clearTimeout(n.timer));
    cur = buildScreen(entry);
    stage.appendChild(cur.el);
    setTheme(cur.bg);
    // never two screens' text on top of each other: the old screen fades out first, then the new one fades in
    if (old) {
      const t = Math.min(Math.max(d, 0.25), 0.5);
      old.el.style.transition = `opacity ${t * 0.45}s ease-in`;
      old.el.style.opacity = '0';
      old.el.style.zIndex = '1';
      cur.el.style.opacity = '0';
      void cur.el.offsetWidth;
      cur.el.style.transition = `opacity ${t * 0.55}s ease-out ${t * 0.45}s`;
      cur.el.style.opacity = '1';
      setTimeout(() => old.el.remove(), t * 1000 + 30);
    }
    cur.insts.forEach((n) => arm(n, 0));
    preloadAround(entry.id);
  }

  function arm(inst, delay) {
    clearTimeout(inst.timer);
    const v = SETS[inst.setId].v[inst.vid];
    if (v && v.timer) {
      const [after, to, d] = v.timer;
      const mine = cur;
      inst.timer = setTimeout(() => { if (cur === mine) change(inst, to, d); }, (delay + after) * 1000);
    }
  }

  // How a component moves to its next state. Flat pictures can't morph like Smart Animate, so
  // two different pictures are never shown half-and-half on top of each other:
  //  - live vector parts (the portal) animate for real;
  //  - walk scenes "step in": the old view moves toward you and fades, then the new view settles in;
  //  - the scale list only adds rows, so new rows fade in over the old picture;
  //  - everything you tap (drawers, cards, spines, sliders, pages...) switches cleanly, like a real control.
  const REVEAL = new Set(['33:2367']);
  function change(inst, to, d = 0.3) {
    if (!to || to === inst.vid) return;
    clearTimeout(inst.timer);
    inst.vid = to;
    cur.entry.states[inst.i] = to;
    const gen = ++inst.gen;
    const live = LIVE[inst.setId];
    if (live) {
      live.apply(inst.box.firstChild, to, d);
      arm(inst, d);
      return;
    }
    const next = img(to);
    const olds = [...inst.box.children];
    const done = (ms) => setTimeout(() => { if (inst.gen === gen) olds.forEach((o) => o.remove()); }, ms);
    if (SETS[inst.setId].walk && d > 0) {
      const t = Math.min(d, 1.1);
      olds.forEach((o) => {
        o.style.transition = `opacity ${t * 0.45}s ease-in, transform ${t * 0.45}s ease-in`;
        o.style.transformOrigin = '50% 45%';
        o.style.transform = 'scale(1.08)';
        o.style.opacity = '0';
      });
      next.style.opacity = '0';
      next.style.transform = 'scale(0.96)';
      next.style.transformOrigin = '50% 45%';
      inst.box.appendChild(next);
      void next.offsetWidth;
      next.style.transition = `opacity ${t * 0.55}s ease-out ${t * 0.45}s, transform ${t * 0.55}s ease-out ${t * 0.45}s`;
      next.style.opacity = '1';
      next.style.transform = 'none';
      done(t * 1000 + 60);
    } else if (REVEAL.has(inst.setId) && d > 0) {
      inst.box.appendChild(next);
      fadeIn(next, d);
      done(d * 1000 + 40);
    } else {
      inst.box.appendChild(next);
      olds.forEach((o) => o.remove());
    }
    arm(inst, d);
  }

  /* ---------- navigation (mirrors browser history, so edge-swipe back works) ---------- */
  function navigate(to) {
    if (overlay) closeOverlay();
    stack.push({ id: to, states: {} });
    history.pushState({ depth: stack.length }, '');
    show(stack[stack.length - 1]);
  }
  function goBack() {
    if (overlay) { history.back(); return; }
    if (stack.length > 1) history.back();
  }
  window.addEventListener('popstate', () => {
    if (overlay) { closeOverlay(); return; }
    if (stack.length > 1) {
      stack.pop();
      show(stack[stack.length - 1]);
    }
  });
  function openOverlay(id) {
    const el = document.createElement('div');
    el.className = 'overlay';
    el.appendChild(img(id));
    stage.appendChild(el);
    fadeIn(el, 0.4);
    overlay = { el };
    setTheme('U');
    history.pushState({ overlay: 1 }, '');
  }
  function closeOverlay() {
    const el = overlay.el;
    overlay = null;
    el.classList.add('fade');
    el.style.transitionDuration = '.3s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 330);
    setTheme(cur.bg);
  }
  function run(a) {
    if (a.t === 'nav') navigate(a.to);
    else if (a.t === 'back') goBack();
    else if (a.t === 'ov') openOverlay(a.to);
    else if (a.t === 'close') history.back();
  }

  /* ---------- hit testing (touch-friendly: exact hit first, then nearest target within reach) ---------- */
  function targets() {
    const list = [];
    if (overlay) {
      OVERLAY_HOT.forEach(([x, y, w, h, a]) => list.push({ x, y, w, h, act: () => run(a), pri: 2 }));
      return list;
    }
    cur.insts.forEach((inst) => {
      const v = SETS[inst.setId].v[inst.vid];
      (v && v.hot ? v.hot : []).forEach(([x, y, w, h, to, d]) =>
        list.push({ x: inst.x + x, y: inst.y + y, w, h, inst, act: () => change(inst, to, d), pri: 0 }));
    });
    SCREEN[cur.entry.id].hot.forEach(([x, y, w, h, a]) => list.push({ x, y, w, h, act: () => run(a), pri: 1 }));
    return list;
  }
  function hit(px, py) {
    const list = targets();
    let best = null;
    // exact: screen buttons beat components; later (front-most) wins within a group
    list.forEach((t, k) => {
      if (px >= t.x && px <= t.x + t.w && py >= t.y && py <= t.y + t.h) {
        if (!best || t.pri > best.pri || (t.pri === best.pri && k > best.k)) best = Object.assign(t, { k });
      }
    });
    if (best) return best;
    // near miss: grow small targets to at least 48 × 48 and take the closest
    let bestD = Infinity;
    list.forEach((t) => {
      const gx = Math.max(0, (48 - t.w) / 2) + 6, gy = Math.max(0, (48 - t.h) / 2) + 6;
      const dx = Math.max(t.x - px, 0, px - (t.x + t.w)), dy = Math.max(t.y - py, 0, py - (t.y + t.h));
      if (dx <= gx && dy <= gy) {
        const dist = Math.hypot(dx, dy);
        if (dist < bestD) { bestD = dist; best = t; }
      }
    });
    return best;
  }
  function instAt(px, py) {
    if (overlay || !cur) return null;
    for (let k = cur.insts.length - 1; k >= 0; k--) {
      const n = cur.insts[k], [, , , w, h] = IMG[n.vid];
      if (px >= n.x - 12 && px <= n.x + w + 12 && py >= n.y - 12 && py <= n.y + h + 12) return n;
    }
    return null;
  }
  function flashHints() {
    targets().forEach((t) => {
      const d = document.createElement('div');
      d.className = 'hint';
      Object.assign(d.style, { left: t.x - 3 + 'px', top: t.y - 3 + 'px', width: t.w + 6 + 'px', height: t.h + 6 + 'px' });
      stage.appendChild(d);
      setTimeout(() => d.remove(), 950);
    });
  }

  /* ---------- gestures: tap, drag along sliders and line lists, swipe cards and pages ---------- */
  function scrub(inst, px, py) {
    const S = SETS[inst.setId], lx = px - inst.x, ly = py - inst.y;
    let to = null;
    if (S.scrub === 'slider') {
      const centers = STOPS.map(([x, , w]) => x + w / 2);
      let k = 0;
      centers.forEach((c, i) => { if (Math.abs(lx - c) < Math.abs(lx - centers[k])) k = i; });
      to = S.items[k];
    } else if (S.scrub === 'lines') {
      const k = Math.min(11, Math.max(0, Math.floor((ly - 13) / 17)));
      to = S.items[k];
    }
    if (to && to !== inst.vid) change(inst, to, 0.15);
  }

  let g = null;
  const pt = (e) => {
    const r = stage.getBoundingClientRect();
    return [(e.clientX - r.left) / scale, (e.clientY - r.top) / scale];
  };
  stage.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary || !cur) return;
    e.preventDefault();
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    const [x, y] = pt(e);
    const inst = instAt(x, y);
    const sc = inst && SETS[inst.setId].scrub;
    g = { x, y, inst, sc, moved: false, scrubbing: false };
    if (sc === 'slider' && y - inst.y > 40) { g.scrubbing = true; scrub(inst, x, y); }
  });
  stage.addEventListener('pointermove', (e) => {
    if (!g || !e.isPrimary) return;
    const [x, y] = pt(e);
    if (!g.moved && Math.hypot(x - g.x, y - g.y) > 8) g.moved = true;
    if (g.moved && g.sc && !(g.sc === 'slider' && g.y - g.inst.y <= 40)) { g.scrubbing = true; scrub(g.inst, x, y); }
  });
  const end = (e) => {
    if (!g || !e.isPrimary) return;
    const [x, y] = pt(e), s = g;
    g = null;
    if (e.type === 'pointercancel' || s.scrubbing) return;
    const dx = x - s.x, dy = y - s.y;
    if (s.moved && Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.2 && s.inst) {
      const S = SETS[s.inst.setId], v = S.v[s.inst.vid];
      if (S.swipe === 'pages' && v.hot) {
        // swipe left = next page (right half), swipe right = previous page (left half)
        const want = dx < 0 ? 167 : 2;
        const h = v.hot.find((t) => t[0] === want);
        if (h) change(s.inst, h[4], h[5]);
        return;
      }
      if (S.swipe === 'tap' && v.hot && v.hot[0]) { change(s.inst, v.hot[0][4], v.hot[0][5]); return; }
    }
    if (s.moved && Math.hypot(dx, dy) > 24) return;
    const t = hit(s.x, s.y);
    if (t) t.act();
    else flashHints();
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); goBack(); }
  });

  /* ---------- preload ---------- */
  const loaded = new Set();
  function preload(id) {
    if (loaded.has(id) || !IMG[id]) return;
    loaded.add(id);
    const i = new Image();
    i.src = 'img/' + IMG[id][0];
  }
  function screenAssets(id) {
    const s = SCREEN[id];
    if (!s) return [];
    const ids = [id];
    s.inst.forEach(([setId]) => ids.push(...Object.keys(SETS[setId].v)));
    s.hot.forEach(([, , , , a]) => { if (a.t === 'ov') ids.push(a.to); });
    return ids;
  }
  function preloadAround(id) {
    screenAssets(id).forEach(preload);
    SCREEN[id].hot.forEach(([, , , , a]) => { if (a.t === 'nav') screenAssets(a.to).forEach(preload); });
  }
  window.addEventListener('load', () => {
    setTimeout(() => Object.keys(IMG).forEach(preload), 1200);
  });

  /* ---------- full screen on touch devices that allow it (Android, iPad; not iPhone Safari) ---------- */
  (function () {
    const de = document.documentElement;
    const req = de.requestFullscreen || de.webkitRequestFullscreen;
    if (!req || !matchMedia('(pointer: coarse)').matches || matchMedia('(display-mode: standalone)').matches) return;
    document.addEventListener('pointerup', () => {
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
      try { const p = req.call(de, { navigationUI: 'hide' }); if (p && p.catch) p.catch(() => {}); } catch (e) {}
    }, { once: true });
    document.addEventListener('fullscreenchange', layout);
    document.addEventListener('webkitfullscreenchange', layout);
  })();

  /* ---------- start ---------- */
  stack.push({ id: '36:4533', states: {} });
  history.replaceState({ depth: 1 }, '');
  show(stack[0], 0);
})();
