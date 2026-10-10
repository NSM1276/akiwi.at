'use client';
import { useState } from 'react';
import { COPY } from '@/data/data';
import { StatusBadge, StatusDot } from './atoms';

const VIENNA_DISTRICTS = [
  { n: 1,  name: 'Innere Stadt',      d: 'M49,48 L55,46 L56,52 L51,54 L48,52 Z' },
  { n: 2,  name: 'Leopoldstadt',      d: 'M55,30 L68,28 L70,44 L56,48 Z' },
  { n: 3,  name: 'Landstraße',        d: 'M56,52 L66,50 L70,60 L58,62 Z' },
  { n: 4,  name: 'Wieden',            d: 'M48,54 L56,52 L55,60 L48,60 Z' },
  { n: 5,  name: 'Margareten',        d: 'M41,56 L48,54 L48,62 L42,64 Z' },
  { n: 6,  name: 'Mariahilf',         d: 'M41,50 L49,48 L48,54 L41,56 Z' },
  { n: 7,  name: 'Neubau',            d: 'M41,44 L49,44 L49,48 L41,50 Z' },
  { n: 8,  name: 'Josefstadt',        d: 'M42,40 L49,39 L49,44 L42,44 Z' },
  { n: 9,  name: 'Alsergrund',        d: 'M42,32 L55,30 L55,40 L42,40 Z' },
  { n: 10, name: 'Favoriten',         d: 'M42,64 L58,62 L62,80 L44,82 Z' },
  { n: 11, name: 'Simmering',         d: 'M62,62 L78,58 L82,78 L64,80 Z' },
  { n: 12, name: 'Meidling',          d: 'M28,62 L42,64 L44,76 L30,78 Z' },
  { n: 13, name: 'Hietzing',          d: 'M10,56 L28,58 L30,78 L12,76 Z' },
  { n: 14, name: 'Penzing',           d: 'M10,36 L28,38 L28,58 L10,56 Z' },
  { n: 15, name: 'Rudolfsheim',       d: 'M28,48 L41,46 L42,56 L28,58 Z' },
  { n: 16, name: 'Ottakring',         d: 'M18,32 L34,30 L34,46 L20,48 Z' },
  { n: 17, name: 'Hernals',           d: 'M28,26 L42,24 L42,40 L34,40 Z' },
  { n: 18, name: 'Währing',           d: 'M36,20 L48,18 L49,32 L42,32 Z' },
  { n: 19, name: 'Döbling',           d: 'M42,10 L56,8 L55,28 L42,32 Z' },
  { n: 20, name: 'Brigittenau',       d: 'M44,24 L55,22 L55,30 L45,32 Z' },
  { n: 21, name: 'Floridsdorf',       d: 'M55,8 L80,10 L78,28 L55,28 Z' },
  { n: 22, name: 'Donaustadt',        d: 'M68,28 L92,24 L95,58 L78,58 L70,44 Z' },
  { n: 23, name: 'Liesing',           d: 'M14,76 L44,78 L44,92 L12,88 Z' },
];

const DANUBE = 'M8,18 C 24,22 44,30 62,26 S 90,14 96,20 L96,26 C 84,22 66,32 48,34 S 16,28 8,24 Z';

const PIN = { verified: '#1F9D55', self: '#E0A030', unknown: '#B23A2E' };

export default function ViennaMap({ lang, restaurants, filters, hoveredId, setHoveredId }) {
  const c = COPY[lang];
  const de = lang === 'de';
  const [selected, setSelected] = useState(null);

  return (
    <section className="ak-wrap" style={{ paddingTop: 48 }}>
      <div className="ak-row-between" style={{ alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 14 }}>
        <div>
          <h2 className="ak-h2">{c.mapHeading}</h2>
          <p className="ak-lead" style={{ marginTop: 6, fontSize: 15 }}>{c.mapSub}</p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['verified', 'self', 'unknown'].map((s) => <StatusBadge key={s} status={s} lang={lang} compact />)}
        </div>
      </div>

      <div className="ak-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          <rect width="100" height="100" fill="#F4F3EF" />
          <path d={DANUBE} fill="#CFE3E8" stroke="#9BBFC8" strokeWidth="0.15" />
          <text x="80" y="20" fontSize="1.4" fill="#5E8C97" fontWeight="600" letterSpacing="0.15em">DONAU</text>
          {VIENNA_DISTRICTS.map((d) => {
            const active = filters.district === d.n;
            return (
              <path key={d.n} d={d.d}
                fill={active ? '#E3F2E9' : '#FFFFFF'}
                stroke={active ? '#1F9D55' : '#141414'}
                strokeWidth={active ? 0.4 : 0.15} />
            );
          })}
          {VIENNA_DISTRICTS.map((d) => {
            const coords = d.d.match(/\d+(?:\.\d+)?/g).map(Number);
            let cx = 0, cy = 0, n = 0;
            for (let i = 0; i < coords.length; i += 2) { cx += coords[i]; cy += coords[i + 1]; n++; }
            return (
              <text key={d.n} x={cx / n} y={cy / n + 0.5} fontSize="1.7" textAnchor="middle" fill="#7A7973" fontWeight="700">
                {d.n}
              </text>
            );
          })}
        </svg>

        {restaurants.map((r) => {
          const on = hoveredId === r.id || selected === r.id;
          const color = PIN[r.status] || PIN.unknown;
          return (
            <button
              key={r.id}
              type="button"
              onMouseEnter={() => setHoveredId && setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId && setHoveredId(null)}
              onClick={() => setSelected(r.id === selected ? null : r.id)}
              aria-label={r.name}
              style={{
                position: 'absolute', left: `${r.x}%`, top: `${r.y}%`,
                transform: 'translate(-50%, -100%)',
                background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
                zIndex: on ? 5 : 1,
              }}
            >
              <svg viewBox="0 0 24 30" width={on ? 26 : 20} height={on ? 32 : 25} aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z" fill={color} stroke="#141414" strokeWidth="1.5" />
                <rect x="8.5" y="8.5" width="7" height="7" fill="#fff" />
              </svg>
              {on && (
                <span style={{
                  position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--paper)', border: 'var(--line) solid var(--ink)', boxShadow: 'var(--shadow-elev)',
                  padding: '8px 10px', minWidth: 170, textAlign: 'left', pointerEvents: 'none',
                }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1 }}>{r.name}</span>
                  <span className="ak-data" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5, color: 'var(--ink-2)' }}>
                    <StatusDot status={r.status} size={10} />
                    {r.district > 0 ? `${1000 + r.district * 10}` : r.districtName} · {r.categories[0]}
                  </span>
                </span>
              )}
            </button>
          );
        })}

        <span className="ak-data" style={{
          position: 'absolute', bottom: 8, left: 8, background: 'var(--ink)', color: '#fff', padding: '5px 8px',
        }}>
          {restaurants.length} {de ? 'sichtbar' : 'visible'}
        </span>
      </div>
    </section>
  );
}
