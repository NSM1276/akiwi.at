// Shared helpers for the social image scripts (satori via next/og, no browser needed).
import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/dist/compiled/@vercel/og/index.node.js';

export const INK = '#141414';
export const GREEN = '#1F9D55';
export const SAFFRON = '#E0A030';
export const RED = '#B23A2E';
export const BG = '#EDECE7';
export const MUTED = '#55544F';

export const OUT = path.join('social', 'out');
fs.mkdirSync(OUT, { recursive: true });

// Google Fonts, only the glyphs used (same approach as components/ogCard.jsx).
export async function font(family, weight, text) {
  const q = `family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${q}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error(`font ${family} ${weight}`);
  return { name: family, data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' };
}

export const h = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });

// The eight-point star: two overlapping squares. `ring` draws it as an outline.
export function star(size, color, ring = null) {
  const side = size * 0.72;
  const off = (size - side) / 2;
  const sq = (extra) => ({ position: 'absolute', left: off, top: off, width: side, height: side, background: color, ...extra });
  const parts = [h('div', sq({}), ''), h('div', sq({ transform: 'rotate(45deg)' }), '')];
  if (ring) {
    const inner = side * 0.62;
    const o2 = (size - inner) / 2;
    const isq = (extra) => ({ position: 'absolute', left: o2, top: o2, width: inner, height: inner, background: ring, ...extra });
    parts.push(h('div', isq({}), ''), h('div', isq({ transform: 'rotate(45deg)' }), ''));
  }
  return h('div', { position: 'relative', width: size, height: size }, parts);
}

export async function save(name, element, width, height, fonts) {
  const res = new ImageResponse(element, { width, height, fonts });
  fs.writeFileSync(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
  console.log('wrote', path.join(OUT, name), `${width}x${height}`);
}
