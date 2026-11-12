// Akiwi brand kit: logo files (SVG + PNG) and a print-ready business card.
// node make-brand.mjs <project-root>
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import QRCode from 'qrcode';
import sharp from 'sharp';

const root = process.argv[2];
const OUT = path.join(root, 'brand');
const LOGO = path.join(OUT, 'logo');
const CARD = path.join(OUT, 'visitenkarte');
fs.mkdirSync(LOGO, { recursive: true });
fs.mkdirSync(CARD, { recursive: true });

const INK = '#141414', GREEN = '#1F9D55', BG = '#EDECE7', WHITE = '#FFFFFF';
const SITE = 'https://www.akiwi.at';
const PHONE = '+43 677 64292055';
const WA = 'https://wa.me/4367764292055?text=' + encodeURIComponent('Hallo Akiwi!');

// ── font → outlines (logo must not depend on installed fonts) ──
async function ttf(family, weight) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}`, { headers: { 'User-Agent': 'curl/8' } })).text();
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error('font url ' + family);
  return opentype.parse(await (await fetch(url)).arrayBuffer());
}
const barlow = await ttf('Barlow Condensed', 800);

/** text → { d, width } at fontSize, letterSpacing in em, baseline at y */
function outline(font, text, x, y, size, spacing = 0) {
  let d = '', cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += (g.advanceWidth / font.unitsPerEm) * size + spacing * size;
  }
  return { d, width: cx - x - spacing * size };
}

// ── logo geometry (same proportions as the site header: star 26px, word 24px, gap 9px) ──
// Star in a 40×40 box: two 22×22 squares, one rotated 45°, square hole 7×7 cut out.
function starSvg(x, y, s, color, holeId) {
  const k = s / 40;
  return `<mask id="${holeId}"><rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fff"/><rect x="${x + 16.5 * k}" y="${y + 16.5 * k}" width="${7 * k}" height="${7 * k}" fill="#000"/></mask>
  <g mask="url(#${holeId})" fill="${color}">
    <rect x="${x + 9 * k}" y="${y + 9 * k}" width="${22 * k}" height="${22 * k}"/>
    <rect x="${x + 9 * k}" y="${y + 9 * k}" width="${22 * k}" height="${22 * k}" transform="rotate(45 ${x + 20 * k} ${y + 20 * k})"/>
  </g>`;
}

function logoSvg({ word, dot, star, bg = null, pad = 8 }) {
  const size = 24, starS = 26, gap = 9;
  const cap = (barlow.tables.os2.sCapHeight / barlow.unitsPerEm) * size; // cap height
  const h = Math.max(starS, cap) + pad * 2;
  const base = pad + (h - pad * 2) / 2 + cap / 2;
  const sx = pad, sy = (h - starS) / 2;
  const a = outline(barlow, 'AKIWI', sx + starS + gap, base, size, 0.03);
  const b = outline(barlow, '.AT', sx + starS + gap + a.width + 0.03 * size, base, size, 0.03);
  const w = sx + starS + gap + a.width + 0.03 * size + b.width + pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(2)} ${h.toFixed(2)}" width="${(w * 10).toFixed(0)}" height="${(h * 10).toFixed(0)}">
  ${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}
  ${starSvg(sx, sy, starS, star, 'h')}
  <path d="${a.d}" fill="${word}"/>
  <path d="${b.d}" fill="${dot}"/>
</svg>`;
}
const starOnly = (color, bg = null) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="1000" height="1000">
  ${bg ? `<rect width="40" height="40" fill="${bg}"/>` : ''}
  ${starSvg(0, 0, 40, color, 'h')}
</svg>`;

const variants = {
  'akiwi-logo': logoSvg({ word: INK, dot: GREEN, star: GREEN }),
  'akiwi-logo-weiss': logoSvg({ word: WHITE, dot: GREEN, star: GREEN }),
  'akiwi-logo-schwarz': logoSvg({ word: INK, dot: INK, star: INK }),
  'akiwi-logo-auf-schwarz': logoSvg({ word: WHITE, dot: GREEN, star: GREEN, bg: INK }),
  'akiwi-stern': starOnly(GREEN),
  'akiwi-stern-weiss': starOnly(WHITE),
  'akiwi-stern-schwarz': starOnly(INK),
  'akiwi-icon': starOnly(GREEN, INK),
};
for (const [name, svg] of Object.entries(variants)) {
  fs.writeFileSync(path.join(LOGO, `${name}.svg`), svg);
  await sharp(Buffer.from(svg), { density: 300 }).resize({ width: name.includes('stern') || name === 'akiwi-icon' ? 1000 : 2400 }).png().toFile(path.join(LOGO, `${name}.png`));
}

// ── business card ──
const qr = async (text) => QRCode.toString(text, { type: 'svg', errorCorrectionLevel: 'M', margin: 0, color: { dark: INK, light: '#0000' } });
const qrSite = await qr(SITE);
const qrWa = await qr(WA);
const inline = (svg) => svg.replace(/^<svg /, '<svg class="qr" ').replace(/width="\d+" height="\d+"/, '');
const logoLight = variants['akiwi-logo-weiss'].replace(/width="\d+" height="\d+"/, 'class="logo"');

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Inter+Tight:wght@500&family=IBM+Plex+Mono:wght@500&display=block" rel="stylesheet">
<style>
@page { size: 91mm 61mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 91mm; }
.side { width: 91mm; height: 61mm; position: relative; overflow: hidden; break-after: page; }
/* 3 mm bleed on every edge: content stays inside the 5 mm safe area below */
.safe { position: absolute; left: 8mm; top: 8mm; right: 8mm; bottom: 8mm; display: flex; flex-direction: column; }
.front { background: ${INK}; color: ${WHITE}; }
.front .safe { justify-content: center; }
.logo { width: 52mm; height: auto; display: block; margin-left: -1.6mm; }
.claim { font-family: 'Barlow Condensed'; font-weight: 700; font-size: 9.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: #CFCEC8; margin-top: 3.2mm; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 6mm; background: ${GREEN}; }
.back { background: ${BG}; color: ${INK}; }
.name { font-family: 'Barlow Condensed'; font-weight: 800; font-size: 15pt; letter-spacing: 0.03em; text-transform: uppercase; line-height: 1; }
.role { font-family: 'IBM Plex Mono'; font-weight: 500; font-size: 6.6pt; letter-spacing: 0.06em; margin-top: 1.2mm; color: #4A4945; }
.codes { display: flex; gap: 5mm; margin-top: auto; }
.code { display: flex; gap: 2.4mm; align-items: flex-end; }
.qrbox { background: ${WHITE}; padding: 1.6mm; border: 0.3mm solid ${INK}; }
.qr { width: 17mm; height: 17mm; display: block; }
.label { font-family: 'Barlow Condensed'; font-weight: 800; font-size: 8pt; letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.05; }
.label small { display: block; font-family: 'IBM Plex Mono'; font-weight: 500; font-size: 5.6pt; letter-spacing: 0; text-transform: none; margin-top: 1.2mm; color: #4A4945; }
.label .g { color: ${GREEN}; }
</style></head><body>
<section class="side front"><div class="safe">${logoLight}<p class="claim">Halal essen in Österreich</p></div><div class="bar"></div></section>
<section class="side back"><div class="safe">
  <p class="name">Nasim Nuridinov</p>
  <p class="role">CEO &amp; Founder · ${PHONE}</p>
  <div class="codes">
    <div class="code"><div class="qrbox">${inline(qrSite)}</div><p class="label">Lokale<br><span class="g">finden</span><small>akiwi.at</small></p></div>
    <div class="code"><div class="qrbox">${inline(qrWa)}</div><p class="label">Für<br><span class="g">Lokale</span><small>WhatsApp</small></p></div>
  </div>
</div></section>
</body></html>`;
fs.writeFileSync(path.join(CARD, 'visitenkarte.html'), html);

// White-paper version: no filled areas at all, only ink and green type/lines.
const logoDark = variants['akiwi-logo'].replace(/width="\d+" height="\d+"/, 'class="logo"');
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error('swap: ' + a); return s.replace(a, b); };
let white = html;
white = swap(white, `.front { background: ${INK}; color: ${WHITE}; }`, `.front { background: ${WHITE}; color: ${INK}; }`);
white = swap(white, 'color: #CFCEC8; margin-top: 3.2mm;', 'color: #4A4945; margin-top: 3.2mm;');
white = swap(white, `.back { background: ${BG}; color: ${INK}; }`, `.back { background: ${WHITE}; color: ${INK}; }`);
white = swap(white, `.qrbox { background: ${WHITE}; padding: 1.6mm; border: 0.3mm solid ${INK}; }`, '.qrbox { padding: 0; }');
white = swap(white, '.code { display: flex; gap: 2.4mm;', '.code { display: flex; gap: 3.6mm;'); // quiet zone without a white box
white = swap(white, '.codes { display: flex; gap: 5mm;', '.codes { display: flex; gap: 6mm;');
white = swap(white, '<div class="bar"></div>', '');
white = swap(white, logoLight, logoDark);
fs.writeFileSync(path.join(CARD, 'visitenkarte-weiss.html'), white);

// One-sided, white paper, no fills: logo + claim + first name left, ONE QR code right.
// The code opens /lokale, which explains Akiwi and has the WhatsApp button.
const qrLokale = await qr(SITE + '/lokale');
const one = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=IBM+Plex+Mono:wght@500&display=block" rel="stylesheet">
<style>
@page { size: 91mm 61mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { width: 91mm; height: 61mm; position: relative; background: ${WHITE}; color: ${INK}; }
.safe { position: absolute; left: 8mm; top: 8mm; right: 8mm; bottom: 8mm; display: flex; justify-content: space-between; }
.left { display: flex; flex-direction: column; }
.logo { width: 40mm; height: auto; display: block; margin-left: -1.2mm; margin-top: -1mm; }
.claim { font-family: 'Barlow Condensed'; font-weight: 700; font-size: 7.6pt; letter-spacing: 0.13em; text-transform: uppercase; color: #4A4945; margin-top: 2mm; }
.who { margin-top: auto; }
.name { font-family: 'Barlow Condensed'; font-weight: 800; font-size: 13pt; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1; }
.tel { font-family: 'IBM Plex Mono'; font-weight: 500; font-size: 7pt; margin-top: 1.2mm; color: #4A4945; }
.right { display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; }
.qr { width: 26mm; height: 26mm; display: block; }
.label { font-family: 'Barlow Condensed'; font-weight: 800; font-size: 8pt; letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.1; text-align: right; margin-bottom: 2.4mm; }
.label .g { color: ${GREEN}; }
</style></head><body><div class="safe">
  <div class="left">
    ${logoDark}
    <p class="claim">Halal essen in Österreich</p>
    <div class="who"><p class="name">Nasim · Akiwi.at</p><p class="tel">${PHONE}</p></div>
  </div>
  <div class="right">
    <p class="label">Scannen<br><span class="g">Infos &amp; WhatsApp</span></p>
    ${inline(qrLokale)}
  </div>
</div></body></html>`;
fs.writeFileSync(path.join(CARD, 'visitenkarte-einseitig.html'), one);
console.log('ok', Object.keys(variants).length, 'logo variants');
