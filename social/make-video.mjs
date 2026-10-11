// Short vertical intro video (1080x1920, ~18 s, no sound) from the TikTok carousel slides.
// Works for Instagram Reels, TikTok and YouTube Shorts.
// Run after `node social/make-posts.mjs`:  node social/make-video.mjs  → social/out/videos/
// Needs ffmpeg on the PATH.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const OUT = path.join('social', 'out');
const dir = path.join(OUT, 'videos');
fs.mkdirSync(dir, { recursive: true });

const SLIDES = 5;
const CLIP = 4.1;        // seconds per slide
const FADE = 0.5;        // cross-fade
const FPS = 30;
const frames = Math.round(CLIP * FPS);

const inputs = [];
const filters = [];
for (let i = 1; i <= SLIDES; i++) {
  inputs.push('-i', path.join(OUT, 'posts', `was-ist-akiwi-tiktok-${i}.png`));
  // One still frame in, zoompan turns it into CLIP seconds with a slow push-in.
  filters.push(
    `[${i - 1}:v]zoompan=z='1+0.0004*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1080x1920:fps=${FPS},format=yuv420p[v${i - 1}]`,
  );
}
let last = 'v0';
for (let i = 1; i < SLIDES; i++) {
  const offset = (CLIP - FADE) * i;
  filters.push(`[${last}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(2)}[x${i}]`);
  last = `x${i}`;
}

const file = path.join(dir, 'akiwi-intro-9x16.mp4');
const args = [
  '-y', ...inputs,
  '-filter_complex', filters.join(';'),
  '-map', `[${last}]`,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  file,
];
const r = spawnSync('ffmpeg', args, { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status || 1);
console.log('wrote', file);
