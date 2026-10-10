import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

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

// Share card for WhatsApp and social links: site colours, the place's name
// large, and the facts a reader wants before tapping.
export async function ogCard({ kicker, title, lines = [], status, statusLabel, tag }) {
  const st = status ? STATUS[status] || STATUS.unknown : null;
  const size = title.length > 34 ? 84 : title.length > 22 ? 100 : 120;
  const fonts = await ogFonts([kicker, title, statusLabel, tag, ...lines].filter(Boolean).join(' '));
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#EDECE7', color: '#141414', fontFamily: 'Inter Tight, sans-serif',
        border: '12px solid #141414', padding: '48px 60px', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', position: 'relative', width: 52, height: 52 }}>
              <div style={{ position: 'absolute', left: 8, top: 8, width: 36, height: 36, background: '#1F9D55' }} />
              <div style={{ position: 'absolute', left: 8, top: 8, width: 36, height: 36, background: '#1F9D55', transform: 'rotate(45deg)' }} />
            </div>
            <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 46, fontWeight: 800, letterSpacing: 2 }}>
              AKIWI<span style={{ color: '#1F9D55' }}>.AT</span>
            </div>
          </div>
          {kicker && (
            <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 34, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#55544F' }}>
              {kicker}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: size, fontWeight: 800, lineHeight: 0.98, textTransform: 'uppercase' }}>
            {title}
          </div>
          {lines.map((l) => (
            <div key={l} style={{ display: 'flex', fontSize: 38, marginTop: 14, color: '#2A2A27' }}>{l}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {st && (
            <div style={{
              display: 'flex', fontSize: 30, fontWeight: 700, padding: '10px 22px',
              background: st.fill, color: st.color, border: `3px solid ${st.border}`,
            }}>
              {statusLabel}
            </div>
          )}
          {tag && (
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, padding: '10px 22px', background: '#fff', border: '3px solid #141414' }}>
              {tag}
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
