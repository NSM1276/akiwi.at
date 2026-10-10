import { ImageResponse } from 'next/og';
import { ogFonts } from '@/components/ogCard';

export const alt = 'Akiwi.at — Halal essen in Wien & Österreich';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The share preview for WhatsApp and social links, in the site's colours.
export default async function OpenGraphImage() {
  const fonts = await ogFonts("Halal essen in Wien & Österreich Restaurants, Imbisse und Cafés — mit Speisekarte, Öffnungszeiten und Halal-Status");
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#EDECE7', color: '#141414', fontFamily: 'Inter Tight, sans-serif',
        border: '12px solid #141414', padding: '56px 64px', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', position: 'relative', width: 64, height: 64 }}>
            <div style={{ position: 'absolute', left: 10, top: 10, width: 44, height: 44, background: '#1F9D55' }} />
            <div style={{ position: 'absolute', left: 10, top: 10, width: 44, height: 44, background: '#1F9D55', transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 60, fontWeight: 800, letterSpacing: 2 }}>
            AKIWI<span style={{ color: '#1F9D55' }}>.AT</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Barlow Condensed', fontSize: 118, fontWeight: 800, lineHeight: 0.95 }}>HALAL ESSEN IN</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 6, fontFamily: 'Barlow Condensed', fontSize: 118, fontWeight: 800, lineHeight: 0.95 }}>
            <span style={{ background: '#1F9D55', color: '#fff', padding: '0 14px' }}>WIEN</span>
            <span style={{ marginLeft: 24 }}>&amp; ÖSTERREICH</span>
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#55544F' }}>
          Restaurants, Imbisse und Cafés — mit Speisekarte, Öffnungszeiten und Halal-Status
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
