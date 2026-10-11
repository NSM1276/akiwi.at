// Instagram stories (1080x1920) and highlight covers.
// Run from the project root:  node social/make-stories.mjs   → social/out/stories/
// Safe zones: Instagram covers ~250 px at the top and ~340 px at the bottom, so nothing important lives there.
// Rules (CLAUDE.md): no venue names, hours, prices, ratings or photos while no venue is onboarded.

import fs from 'node:fs';
import path from 'node:path';
import { INK, GREEN, SAFFRON, RED, BG, MUTED, OUT, font, h, star, save } from './lib.mjs';

const W = 1080;
const H = 1920;

const STORIES = [
  {
    file: 'story-1-online',
    bg: INK, fg: '#fff', sub: '#D6D5CF', accent: GREEN,
    head: ['AKIWI.AT', 'IST ONLINE'],
    body: 'Der ehrliche Halal-Guide für Österreich.',
  },
  {
    file: 'story-2-status',
    bg: BG, fg: INK, sub: MUTED, accent: GREEN,
    head: ['HALAL-STATUS', 'IN DREI STUFEN'],
    rows: [
      ['verified', 'Bestätigt', 'Zertifikat gesehen oder Lokal besucht'],
      ['self', 'Nicht geprüft', 'Halal laut öffentlich zugänglichen Angaben'],
      ['unknown', 'Unbekannt', 'Keine verlässliche Angabe'],
    ],
  },
  {
    file: 'story-3-werbefrei',
    bg: GREEN, fg: INK, sub: INK, accent: INK,
    head: ['UNABHÄNGIG.', 'WERBEFREI.'],
    body: 'Akiwi ist ein unabhängiges Projekt ohne Werbung.',
  },
  {
    file: 'story-4-frage',
    bg: BG, fg: INK, sub: MUTED, accent: GREEN,
    head: ['WELCHE STADT', 'ZUERST?'],
    body: 'Wien, Graz, Linz, Salzburg oder Innsbruck — sagt uns, wo ihr Halal-Tipps sucht.',
  },
];

const COVERS = [
  { file: 'cover-ueber-uns', make: () => star(520, GREEN) },
  {
    file: 'cover-status',
    make: () => h('div', { alignItems: 'center', gap: 28 }, [star(180, GREEN), star(180, SAFFRON, INK), star(180, RED, INK)]),
  },
  {
    file: 'cover-staedte',
    make: () => h('div', { flexDirection: 'column', alignItems: 'center' },
      ['WIEN', 'GRAZ', 'LINZ', 'SALZBURG', 'INNSBRUCK'].map((c) => h('div', {
        fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 92, lineHeight: 1.05, color: '#fff',
      }, c))),
  },
];

const text = JSON.stringify([STORIES, COVERS.map((c) => c.file)]) + 'AKIWI.AT WIEN GRAZ LINZ SALZBURG INNSBRUCK 0123456789';
const fonts = [
  await font('Barlow Condensed', 800, text + text.toUpperCase()),
  await font('Inter Tight', 500, text),
  await font('Inter Tight', 700, text),
];

function story(s) {
  const longest = Math.max(...s.head.map((l) => l.length));
  const headSize = Math.min(190, Math.floor((W - 160) / (longest * 0.44)));
  return h('div', {
    width: W, height: H, background: s.bg, color: s.fg, flexDirection: 'column', justifyContent: 'space-between',
    padding: '260px 80px 380px 80px', fontFamily: 'Inter Tight',
  }, [
    h('div', { alignItems: 'center' }, [
      star(72, s.bg === GREEN ? INK : GREEN),
      h('div', { fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 58, letterSpacing: 3, marginLeft: 18 }, [
        'AKIWI', h('span', { color: s.bg === GREEN ? INK : s.bg === INK ? GREEN : INK }, '.AT'),
      ]),
    ]),
    h('div', { flexDirection: 'column' }, [
      ...s.head.map((line, i) => h('div', {
        fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: headSize, lineHeight: 1.04,
        color: s.bg === INK && i === 0 ? GREEN : s.fg,
      }, line)),
      s.body ? h('div', { fontWeight: 500, fontSize: 56, lineHeight: 1.3, marginTop: 48, color: s.sub }, s.body) : h('div', {}, ''),
      ...(s.rows || []).map(([mark, title, desc]) => h('div', { alignItems: 'center', marginTop: 52 }, [
        h('div', { marginRight: 36 }, [star(120, mark === 'verified' ? GREEN : mark === 'self' ? SAFFRON : RED, mark === 'verified' ? null : s.bg)]),
        h('div', { flexDirection: 'column' }, [
          h('div', { fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 78, lineHeight: 1 }, title.toUpperCase()),
          h('div', { fontWeight: 500, fontSize: 38, lineHeight: 1.25, marginTop: 6, color: s.sub, maxWidth: 740 }, desc),
        ]),
      ])),
    ]),
    h('div', {}, ''),
  ]);
}

function cover(c) {
  return h('div', { width: W, height: H, background: INK, alignItems: 'center', justifyContent: 'center' }, [c.make()]);
}

fs.mkdirSync(path.join(OUT, 'stories'), { recursive: true });
for (const s of STORIES) await save(path.join('stories', `${s.file}.png`), story(s), W, H, fonts);
for (const c of COVERS) await save(path.join('stories', `${c.file}.png`), cover(c), W, H, fonts);
