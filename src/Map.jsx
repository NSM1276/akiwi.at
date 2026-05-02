// Stylized Vienna map with pins. Not a real Leaflet tile layer, but captures the feel:
// outlined districts, subtle grid, Danube river, rounded container.
const VIENNA_DISTRICTS = [
  // simplified polygon coords in 0-100 viewBox space
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

// Danube curve polyline
const DANUBE = 'M8,18 C 24,22 44,30 62,26 S 90,14 96,20 L96,26 C 84,22 66,32 48,34 S 16,28 8,24 Z';

const ViennaMap = ({ lang, restaurants, filters, hoveredId, setHoveredId }) => {
  const c = window.COPY[lang];
  const [selected, setSelected] = React.useState(null);

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px' }}>
      <div style={{
        display: 'flex', alignItems: 'end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12, marginBottom: 20,
      }}>
        <div>
          <h2 className="ak-h2" style={{
            margin: 0, fontSize: 'clamp(28px, 3.5vw, 42px)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ color: 'var(--accent)' }}>
              <window.Icon.pin size={30} />
            </span>
            {c.mapHeading}
          </h2>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: 15 }}>
            {c.mapSub}
          </p>
        </div>
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          padding: '8px 12px',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 999,
          fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500,
        }}>
          {[
            { s: 'verified', l: c.statusVerified },
            { s: 'self',     l: c.statusSelf },
            { s: 'unknown',  l: c.statusUnknown },
          ].map((item) => (
            <span key={item.s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <window.StatusDot status={item.s} size={8} />
              {item.l}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        overflow: 'hidden',
        aspectRatio: '16 / 9',
        minHeight: 400,
      }}>
        {/* Subtle grid */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(107,114,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(107,114,128,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Danube */}
          <path d={DANUBE} fill="rgba(59,130,246,0.18)" stroke="rgba(59,130,246,0.35)" strokeWidth="0.15" />
          <text x="80" y="20" fontSize="1.4" fill="rgba(147,197,253,0.7)" fontWeight="600"
            letterSpacing="0.15em">DONAU</text>

          {/* Districts */}
          {VIENNA_DISTRICTS.map((d) => {
            const active = filters.district === d.n;
            return (
              <g key={d.n}>
                <path d={d.d}
                  fill={active ? 'rgba(163,230,53,0.12)' : 'rgba(75,85,99,0.25)'}
                  stroke={active ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={active ? 0.3 : 0.15}
                  style={{ cursor: 'pointer', transition: 'all 150ms' }}
                />
              </g>
            );
          })}
          {/* District numbers */}
          {VIENNA_DISTRICTS.map((d) => {
            // crude centroid from first point
            const coords = d.d.match(/\d+(?:\.\d+)?/g).map(Number);
            let cx = 0, cy = 0, n = 0;
            for (let i = 0; i < coords.length; i += 2) { cx += coords[i]; cy += coords[i+1]; n++; }
            cx /= n; cy /= n;
            return (
              <text key={d.n} x={cx} y={cy + 0.4}
                fontSize="1.6" textAnchor="middle"
                fill="rgba(156,163,175,0.6)" fontWeight="700">
                {d.n}
              </text>
            );
          })}
        </svg>

        {/* Pins */}
        {restaurants.map((r) => {
          const isHover = hoveredId === r.id;
          const isSel = selected === r.id;
          const color =
            r.status === 'verified' ? '#10B981' :
            r.status === 'self' ? '#F59E0B' : '#EF4444';
          return (
            <button
              key={r.id}
              onMouseEnter={() => setHoveredId && setHoveredId(r.id)}
              onMouseLeave={() => setHoveredId && setHoveredId(null)}
              onClick={() => setSelected(r.id === selected ? null : r.id)}
              style={{
                position: 'absolute',
                left: `${r.x}%`, top: `${r.y}%`,
                transform: 'translate(-50%, -100%)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: 0,
                zIndex: isHover || isSel ? 5 : 1,
              }}
              aria-label={r.name}
            >
              <div style={{
                position: 'relative',
                width: isHover || isSel ? 32 : 26,
                height: isHover || isSel ? 40 : 34,
                transition: 'all var(--dur-fast) var(--ease-out)',
                filter: `drop-shadow(0 3px 6px ${color}66)`,
              }}>
                <svg viewBox="0 0 24 30" width="100%" height="100%">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z"
                    fill={color} stroke="#1F2937" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" fill="#1F2937" />
                </svg>
              </div>
              {(isHover || isSel) && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--background)',
                  border: `1px solid ${color}`,
                  borderRadius: 10,
                  padding: '8px 12px',
                  minWidth: 180,
                  boxShadow: 'var(--shadow-elev)',
                  pointerEvents: 'none',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap' }}>
                    {r.name}
                  </div>
                  <div style={{
                    fontSize: 11, color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <window.StatusDot status={r.status} size={6} />
                    {lang === 'de' ? 'Bezirk' : 'District'} {r.district} · {r.categories[0]}
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* Zoom controls (visual) */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          display: 'flex', flexDirection: 'column',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden',
        }}>
          {['+', '−'].map((s) => (
            <button key={s} style={{
              width: 36, height: 36, border: 'none', background: 'transparent',
              color: 'var(--text-primary)', cursor: 'pointer',
              fontSize: 18, fontWeight: 600, fontFamily: 'inherit',
              borderBottom: s === '+' ? '1px solid var(--border)' : 'none',
            }}>{s}</button>
          ))}
        </div>

        {/* Attribution */}
        <div style={{
          position: 'absolute', bottom: 10, right: 14,
          fontSize: 10, color: 'var(--text-tertiary)',
          background: 'rgba(31,41,55,0.6)', padding: '2px 8px', borderRadius: 6,
        }}>
          © Akiwi · OpenStreetMap contributors
        </div>

        {/* Result count */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: 999,
          padding: '6px 12px',
          fontSize: 12, fontWeight: 600, color: 'var(--text-primary)',
        }}>
          <window.Icon.pin size={12} />
          <span style={{ color: 'var(--accent)' }}>{restaurants.length}</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            {lang === 'de' ? 'sichtbar' : 'visible'}
          </span>
        </div>
      </div>
    </section>
  );
};

window.ViennaMap = ViennaMap;
