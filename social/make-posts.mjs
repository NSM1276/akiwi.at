// First Instagram carousels (1080x1350) and TikTok photo versions (1080x1920).
// Run from the project root:  node social/make-posts.mjs   → social/out/posts/
// Rules (CLAUDE.md): no venue names, hours, prices, ratings or photos while no venue is onboarded.

import fs from 'node:fs';
import path from 'node:path';
import { INK, GREEN, SAFFRON, RED, BG, MUTED, OUT, font, h, star, save } from './lib.mjs';

const SLIDES = {
  'was-ist-akiwi': [
    { kind: 'cover', head: ['HALAL ESSEN IN', 'ÖSTERREICH'], sub: 'Akiwi.at — der ehrliche Halal-Guide' },
    { kind: 'text', head: ['DER HALAL-GUIDE', 'FÜR ÖSTERREICH'], body: 'Restaurants, Imbisse und Cafés in Wien, Graz, Linz, Salzburg und Innsbruck — an einem Ort.' },
    { kind: 'text', head: ['EHRLICH', 'STATT VOLLMUNDIG'], body: 'Wir zeigen klar, was geprüft ist — und was nicht. Kein „halal“-Stempel ohne Grundlage.' },
    { kind: 'text', head: ['UNABHÄNGIG.', 'WERBEFREI.'], body: 'Akiwi ist ein unabhängiges Projekt ohne Werbung.' },
    { kind: 'cta', head: ['JETZT', 'ENTDECKEN'], sub: 'www.akiwi.at', note: 'Link in der Bio' },
  ],
  'halal-status': [
    { kind: 'cover', head: ['HALAL-STATUS', 'SO LESEN SIE IHN'], sub: 'Drei Stufen — klar gekennzeichnet' },
    { kind: 'status', mark: 'verified', head: ['BESTÄTIGT'], body: 'Akiwi hat ein Zertifikat gesehen oder das Lokal besucht. Wir starten gerade mit den Prüfungen.' },
    { kind: 'status', mark: 'self', head: ['NICHT GEPRÜFT'], body: 'Halal laut öffentlich zugänglichen Angaben. Noch nicht von Akiwi geprüft.' },
    { kind: 'status', mark: 'unknown', head: ['UNBEKANNT'], body: 'Keine verlässliche Angabe. Bitte direkt im Lokal nachfragen.' },
    { kind: 'cta', head: ['IM ZWEIFEL:', 'FRAGEN.'], sub: 'www.akiwi.at', note: 'Link in der Bio' },
  ],
};

const allText = JSON.stringify(SLIDES) + 'AKIWI.AT 0123456789/ → Weiter wischen Link in der Bio';
const fonts = [
  await font('Barlow Condensed', 800, allText + allText.toUpperCase()),
  await font('Inter Tight', 500, allText),
  await font('Inter Tight', 700, allText),
];

const MARKS = {
  verified: () => star(220, GREEN),
  self: () => star(220, SAFFRON, BG),
  unknown: () => star(220, RED, BG),
};

function slide(s, i, n, W, H) {
  const dark = s.kind === 'cover';
  const green = s.kind === 'cta';
  const bg = dark ? INK : green ? GREEN : BG;
  const fg = dark ? '#fff' : INK;
  const sub = dark ? '#D6D5CF' : green ? INK : MUTED;
  const wordGreen = dark ? GREEN : INK;
  // Fit the longest line on one row (Barlow Condensed 800 is about 0.44em per capital).
  const longest = Math.max(...s.head.map((l) => l.length));
  const headSize = Math.min(s.kind === 'status' ? 190 : 170, Math.floor((W - 160) / (longest * 0.44)));

  return h('div', {
    width: W, height: H, background: bg, color: fg, flexDirection: 'column', justifyContent: 'space-between',
    padding: 80, fontFamily: 'Inter Tight',
  }, [
    h('div', { justifyContent: 'space-between', alignItems: 'center' }, [
      h('div', { alignItems: 'center' }, [
        star(64, green ? INK : GREEN),
        h('div', { fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 52, letterSpacing: 3, marginLeft: 16 }, [
          'AKIWI', h('span', { color: wordGreen }, '.AT'),
        ]),
      ]),
      h('div', { fontWeight: 500, fontSize: 34, color: sub }, `${i + 1}/${n}`),
    ]),
    h('div', { flexDirection: 'column' }, [
      s.kind === 'status' ? h('div', { marginBottom: 40 }, [MARKS[s.mark]()]) : h('div', {}, ''),
      ...s.head.map((line) => h('div', {
        fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: headSize, lineHeight: 1.04,
      }, line)),
      s.body ? h('div', { fontWeight: 500, fontSize: 52, lineHeight: 1.3, marginTop: 44, color: sub }, s.body) : h('div', {}, ''),
      s.sub ? h('div', { fontWeight: 700, fontSize: 56, marginTop: 44, color: dark ? '#fff' : INK }, s.sub) : h('div', {}, ''),
      s.note ? h('div', { fontWeight: 500, fontSize: 40, marginTop: 14, color: sub }, s.note) : h('div', {}, ''),
    ]),
    h('div', { fontWeight: 700, fontSize: 38, color: sub }, i < n - 1 && H < 1500 ? 'Weiter wischen  →' : ' '),
  ]);
}

fs.mkdirSync(path.join(OUT, 'posts'), { recursive: true });
for (const [name, list] of Object.entries(SLIDES)) {
  for (const [label, W, H] of [['ig', 1080, 1350], ['tiktok', 1080, 1920]]) {
    for (let i = 0; i < list.length; i++) {
      await save(path.join('posts', `${name}-${label}-${i + 1}.png`), slide(list[i], i, list.length, W, H), W, H, fonts);
    }
  }
}
