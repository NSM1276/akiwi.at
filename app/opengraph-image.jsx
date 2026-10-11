import { ImageResponse } from 'next/og';
import { ogFonts, OgFrame, OG_SIZE } from '@/components/ogCard';

export const alt = 'Akiwi.at — Halal essen in Wien & Österreich';
export const size = OG_SIZE;
export const contentType = 'image/png';

const SUB = 'Restaurants, Imbisse und Cafés — mit Adresse und Halal-Status';

// The share preview for WhatsApp, Instagram and social links, in the site's colours.
// Everything sits in the centred column of OgFrame so Instagram's square crop keeps it.
export default async function OpenGraphImage() {
  const fonts = await ogFonts(`HALAL ESSEN IN WIEN & ÖSTERREICH Halal essen in Wien & Österreich ${SUB}`);
  const line = { display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 112, fontWeight: 800, lineHeight: 0.98 };
  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', position: 'relative', width: 56, height: 56 }}>
            <div style={{ position: 'absolute', left: 8, top: 8, width: 40, height: 40, background: '#1F9D55' }} />
            <div style={{ position: 'absolute', left: 8, top: 8, width: 40, height: 40, background: '#1F9D55', transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 52, fontWeight: 800, letterSpacing: 2, marginLeft: 14 }}>
            AKIWI<span style={{ color: '#1F9D55' }}>.AT</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={line}>HALAL ESSEN</div>
          <div style={{ ...line, alignItems: 'flex-start' }}>
            <span>IN&nbsp;</span>
            <span style={{ background: '#1F9D55', color: '#fff', padding: '0 12px' }}>WIEN</span>
          </div>
          <div style={line}>&amp; ÖSTERREICH</div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, lineHeight: 1.25, color: '#55544F' }}>{SUB}</div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
