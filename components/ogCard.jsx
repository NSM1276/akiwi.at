import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// Part of every share image URL (…/opengraph-image/<version>). Messengers cache images
// by URL, so bump this whenever the design of the share images changes.
export const OG_VERSION = 'v2';

// Fonts are fetched from Google Fonts while the image is built (only the
// glyphs used), so no font files live in the repo. If the fetch fails the
// card falls back to the default sans-serif.
async function loadFont(family, weight, text) {
  try {
    const query = `family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return { name: family, data: await (await fetch(url)).arrayBuffer(), weight, style: 'normal' };
  } catch {
    return null;
  }
}

export async function ogFonts(text) {
  const all = `AKIWI.AT0123456789 ${text}`;
  const fonts = await Promise.all([
    loadFont('Barlow Condensed', 800, all.toUpperCase() + all),
    loadFont('Inter Tight', 500, all),
    loadFont('Inter Tight', 700, all),
  ]);
  return fonts.filter(Boolean);
}

const STATUS = {
  verified: { fill: '#1F9D55', color: '#fff', border: '#1F9D55' },
  self: { fill: '#FFF4DC', color: '#6B4A00', border: '#E0A030' },
  unknown: { fill: '#fff', color: '#55544F', border: '#8C8B85' },
};

// Instagram and some messengers show link previews almost square and crop the
// image from the sides, WhatsApp shows all 1200x630. So everything that matters
// sits in a centred column (COLUMN px wide); the sides only carry decoration.
const COLUMN = 640;

function Star({ size, color, style }) {
  const side = size * 0.72;
  const off = (size - side) / 2;
  return (
    <div style={{ display: 'flex', position: 'absolute', width: size, height: size, ...style }}>
      <div style={{ position: 'absolute', left: off, top: off, width: side, height: side, background: color }} />
      <div style={{ position: 'absolute', left: off, top: off, width: side, height: side, background: color, transform: 'rotate(45deg)' }} />
    </div>
  );
}

function Logo({ size = 52 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', position: 'relative', width: size, height: size }}>
        <Star size={size} color="#1F9D55" style={{ left: 0, top: 0 }} />
      </div>
      <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: size * 0.9, fontWeight: 800, letterSpacing: 2, marginLeft: 14 }}>
        AKIWI<span style={{ color: '#1F9D55' }}>.AT</span>
      </div>
    </div>
  );
}

/** Frame shared by every share image: border, faint stars at the sides, centred column. */
export function OgFrame({ children }) {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden',
      background: '#EDECE7', color: '#141414', fontFamily: 'Inter Tight, sans-serif',
      border: '12px solid #141414', alignItems: 'stretch', justifyContent: 'center',
    }}>
      <Star size={520} color="#E3E2DC" style={{ left: -250, top: 55 }} />
      <Star size={520} color="#E3E2DC" style={{ right: -250, top: 55 }} />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: COLUMN, padding: '40px 0',
      }}>
        {children}
      </div>
    </div>
  );
}

// Share card for WhatsApp, Instagram and social links: site colours, the place's
// name large, and the facts a reader wants before tapping.
export async function ogCard({ kicker, title, lines = [], status, statusLabel, tag }) {
  const st = status ? STATUS[status] || STATUS.unknown : null;
  const size = title.length > 34 ? 72 : title.length > 22 ? 88 : 104;
  const fonts = await ogFonts([kicker, title, statusLabel, tag, ...lines].filter(Boolean).join(' '));
  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo size={48} />
          {kicker && (
            <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 32, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#55544F' }}>
              {kicker}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: size, fontWeight: 800, lineHeight: 0.98, textTransform: 'uppercase' }}>
            {title}
          </div>
          {lines.map((l) => (
            <div key={l} style={{ display: 'flex', fontSize: 32, lineHeight: 1.2, marginTop: 12, color: '#2A2A27' }}>{l}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {st && (
            <div style={{
              display: 'flex', fontSize: 28, fontWeight: 700, padding: '10px 20px',
              background: st.fill, color: st.color, border: `3px solid ${st.border}`,
            }}>
              {statusLabel}
            </div>
          )}
          {tag && (
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, padding: '10px 20px', background: '#fff', border: '3px solid #141414', marginLeft: 12 }}>
              {tag}
            </div>
          )}
        </div>
      </OgFrame>
    ),
    { ...OG_SIZE, fonts },
  );
}
