import { ImageResponse } from 'next/og';

export const alt = 'Akiwi.at — Halal-freundliche Restaurants in Österreich';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: '#1F2937', color: '#FFFFFF', fontFamily: 'sans-serif',
      }}>
        <div style={{ display: 'flex', fontSize: 140, fontWeight: 700, letterSpacing: -6 }}>
          <span style={{ color: '#A3E635' }}>akiwi</span>
          <span>.at</span>
        </div>
        <div style={{ fontSize: 40, color: '#9CA3AF', marginTop: 12 }}>
          Halal-freundliche Restaurants in Österreich
        </div>
      </div>
    ),
    size,
  );
}
