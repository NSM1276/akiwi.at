// SearchResultCard — horizontal restaurant card optimized for the catalog list view.
const SearchResultCard = ({ r, lang, onHover, hovered, dense }) => {
  const c = window.SEARCH_COPY[lang];
  const isHovered = hovered;
  const imgSize = dense ? 96 : 132;

  const serviceLabels = c.serviceLabels;

  return (
    <article
      onMouseEnter={() => onHover && onHover(r.id)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{
        display: 'flex', gap: dense ? 12 : 16,
        padding: dense ? 12 : 14,
        background: 'var(--card)',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease-out)',
        boxShadow: isHovered ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        width: imgSize, height: imgSize, flexShrink: 0,
        borderRadius: 8, overflow: 'hidden',
        background: `linear-gradient(135deg, ${r.img[0]} 0%, ${r.img[1]} 100%)`,
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, hsla(${r.accentHue}, 60%, 55%, 0.18) 0%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: dense ? 36 : 48,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'rgba(255,255,255,0.85)',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>{r.name.charAt(0)}</span>
        </div>
        {r.featured && (
          <div style={{
            position: 'absolute', top: 6, left: 6,
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            padding: '2px 7px', borderRadius: 999,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>★</div>
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: dense ? 4 : 6 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <window.StatusBadge status={r.status} lang={lang} compact />
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                color: 'var(--accent)', fontSize: 12, fontWeight: 700,
              }}>
                <window.Icon.star size={11} />
                {r.rating.toFixed(1)}
                <span style={{ color: 'var(--text-tertiary)', fontWeight: 500, marginLeft: 2 }}>
                  ({r.reviews})
                </span>
              </span>
              <span style={{
                fontSize: 11, color: r.openNow ? 'var(--status-green)' : 'var(--status-red)',
                fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
                {r.openNow ? c.open : c.closed}
                <span style={{ color: 'var(--text-tertiary)', fontWeight: 500, marginLeft: 2 }}>· {r.hours}</span>
              </span>
            </div>
            <h3 style={{
              margin: 0, fontSize: dense ? 16 : 18, fontWeight: 700,
              letterSpacing: '-0.01em', lineHeight: 1.2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{r.name}</h3>
          </div>
          <div style={{
            fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
            padding: '3px 9px', background: 'rgba(75,85,99,0.3)',
            border: '1px solid var(--border)', borderRadius: 999,
            flexShrink: 0,
          }}>{r.price}</div>
        </div>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          fontSize: 12, color: 'var(--text-secondary)',
        }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{r.cuisine}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <window.Icon.pin size={11} />
            {1000 + r.district * 10} {r.districtName}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span>{c.distanceFromCenter(r.distance)}</span>
        </div>

        {/* Service + dietary tags */}
        {!dense && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
            {r.services.map((s) => (
              <span key={s} style={tagStyle}>{serviceLabels[s]}</span>
            ))}
            {r.dietary.map((d) => (
              <span key={d} style={{ ...tagStyle, color: 'var(--accent)', borderColor: 'rgba(163,230,53,0.3)' }}>
                {c.dietaryLabels[d]}
              </span>
            ))}
            {r.family && <span style={tagStyle}>{c.family}</span>}
            {r.lastVerifiedDays != null && r.lastVerifiedDays < 30 && (
              <span style={{ ...tagStyle, color: 'var(--status-green)', borderColor: 'rgba(16,185,129,0.3)' }}>
                ✓ {c.verifiedAgo(r.lastVerifiedDays)}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const tagStyle = {
  padding: '2px 8px',
  background: 'rgba(75,85,99,0.25)',
  border: '1px solid var(--border)',
  borderRadius: 999,
  fontSize: 10, fontWeight: 600,
  color: 'var(--text-secondary)',
  letterSpacing: '0.02em',
};

window.SearchResultCard = SearchResultCard;
