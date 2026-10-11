// Profile images for Instagram, TikTok, YouTube (and the Google account).
// Run from the project root:  node social/make-profile-assets.mjs
// Output: social/out/*.png (not committed, regenerate any time).

import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

const INK = '#141414';
const GREEN = '#1F9D55';
const BG = '#EDECE7';
const out = path.join('social', 'out');
fs.mkdirSync(out, { recursive: true });

// Google Fonts, only the glyphs used (same approach as components/ogCard.jsx).
async function font(family, weight, text) {
  const q = `family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${q}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error(`font ${family} ${weight}`);
  return { name: family, data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' };
}

const h = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });

// The eight-point star: two overlapping squares.
const star = (size, color) => {
  const side = size * 0.72;
  const off = (size - side) / 2;
  const sq = (extra) => ({
    position: 'absolute', left: off, top: off, width: side, height: side, background: color, ...extra,
  });
  return h('div', { position: 'relative', width: size, height: size }, [
    h('div', sq({}), ''),
    h('div', sq({ transform: 'rotate(45deg)' }), ''),
  ]);
};

async function save(name, element, width, height, fonts = []) {
  const res = new ImageResponse(element, { width, height, fonts });
  fs.writeFileSync(path.join(out, name), Buffer.from(await res.arrayBuffer()));
  console.log('wrote', path.join(out, name), `${width}x${height}`);
}

// 2. YouTube banner 2560x1440. Text stays inside the 1546x423 centre that
//    shows on every device (TV, desktop, phone).
const text = 'AKIWI.AT HALAL ESSEN IN WIEN & ÖSTERREICH Ehrlicher Halal-Status · Unabhängig · Werbefrei halal essen in wien & österreich';
const fonts = [
  await font('Barlow Condensed', 800, text + text.toUpperCase()),
  await font('Inter Tight', 500, text),
];
// 1. Avatar 1000x1000 — platforms crop it to a circle, the star sits well inside.
await save('avatar-1000.png', h('div', {
  width: '100%', height: '100%', background: INK, alignItems: 'center', justifyContent: 'center',
}, [star(560, GREEN)]), 1000, 1000, fonts);

await save('youtube-banner-2560x1440.png', h('div', {
  width: '100%', height: '100%', background: BG, alignItems: 'center', justifyContent: 'center',
  fontFamily: 'Inter Tight',
}, [
  h('div', { width: 1546, height: 423, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }, [
    h('div', { alignItems: 'center' }, [
      star(104, GREEN),
      h('div', { fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 112, lineHeight: 1, letterSpacing: 4, marginLeft: 22, color: INK }, [
        'AKIWI', h('span', { color: GREEN }, '.AT'),
      ]),
    ]),
    h('div', { fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: 96, lineHeight: 1, marginTop: 26, color: INK }, 'HALAL ESSEN IN WIEN & ÖSTERREICH'),
    h('div', { fontSize: 50, fontWeight: 500, lineHeight: 1, marginTop: 22, color: '#3A3A36' }, 'Ehrlicher Halal-Status · Unabhängig · Werbefrei'),
  ]),
]), 2560, 1440, fonts);

// 3. Preview: how the banner is cut on each screen (YouTube shows the middle
//    of the image: TV all of it, desktop 2560x423, tablet 1855x423, phone 1546x423).
const dataUri = 'data:image/png;base64,' + fs.readFileSync(path.join(out, 'youtube-banner-2560x1440.png')).toString('base64');
const K = 0.5;
const view = (label, w, hgt) => h('div', { flexDirection: 'column', marginBottom: 28 }, [
  h('div', { fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 24, color: INK, marginBottom: 8 }, label),
  h('div', { width: w * K, height: hgt * K, overflow: 'hidden', position: 'relative', border: '2px solid ' + INK }, [
    { type: 'img', props: { src: dataUri, width: 2560 * K, height: 1440 * K, style: { position: 'absolute', left: -((2560 - w) / 2) * K, top: -((1440 - hgt) / 2) * K } } },
  ]),
]);
await save('youtube-banner-preview.png', h('div', { width: '100%', height: '100%', background: '#fff', flexDirection: 'column', padding: 30 }, [
  view('Smart TV (2560x1440)', 2560, 1440),
  view('Computer (2560x423)', 2560, 423),
  view('Tablet (1855x423)', 1855, 423),
  view('Handy (1546x423)', 1546, 423),
]), 1340, 1700, fonts);
