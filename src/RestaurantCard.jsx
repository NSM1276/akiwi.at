// Restaurant card — bento grid member. Supports 3 sizes (1x1, 2x1, 2x2)
const RestaurantCard = ({ r, lang, span = 'sm', onClick, onHoverId, hoveredId }) => {
  const c = window.COPY[lang];
  const [hover, setHover] = React.useState(false);
  const isHovered = hoveredId === r.id || hover;

  // size-driven layout
  const tall = span === 'lg';
  const wide = span === 'md';

  const imgHeight = tall ? 260 : wide ? 180 : 160;

  return (
    <article
      onMouseEnter={() => { setHover(true); onHoverId && onHoverId(r.id); }}
      onMouseLeave={() => { setHover(false); onHoverId && onHoverId(null); }}
      onClick={onClick || (() => { window.location.href = 'Akiwi Restaurant Detail.html?id=' + r.id; })}
      style={{
        gridColumn: wide ? 'span 2' : undefined,
        gridRow: tall ? 'span 2' : undefined,
        background: 'var(--card)',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--dur-med) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-med) var(--ease-out)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.35), 0 0 0 1px rgba(163,230,53,0.15)' : 'var(--shadow-elev)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        height: imgHeight,
        background: `linear-gradient(135deg, ${r.img[0]} 0%, ${r.img[1]} 100%)`,
        overflow: 'hidden',
      }}>
        {/* Abstract food-ish pattern */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 40%, hsla(${r.accentHue}, 60%, 55%, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 70% 70%, hsla(${r.accentHue + 20}, 70%, 45%, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 20%, hsla(${r.accentHue - 10}, 50%, 60%, 0.2) 0%, transparent 50%)
          `,
        }} />
        {/* placeholder-restaurant icon for consistency */}
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{
          position: 'absolute', bottom: 16, right: 16,
          opacity: 0.25, color: '#fff',
        }} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.5 4.5L18 8l-3.5 3 .9 5-3.4-2.4L8.6 16l.9-5L6 8l4.5-1.5z"/>
        </svg>
        {/* bottom fade */}
        <div aria-hidden style={{
          position: 'absolute', inset: 'auto 0 0 0', height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
        }} />
        {/* Status badge top-left */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <window.StatusBadge status={r.status} lang={lang} />
        </div>
        {/* price top-right */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '4px 10px',
          borderRadius: 999,
          fontSize: 12, fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
        }}>{r.price}</div>

        {r.featured && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            padding: '4px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
            </svg>
            {c.featured}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{
        padding: 16,
        display: 'flex', flexDirection: 'column', gap: 10,
        flex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{
            margin: 0,
            fontSize: tall ? 22 : 17,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
          }}>{r.name}</h3>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color: 'var(--accent)',
            fontSize: 13, fontWeight: 700,
            flexShrink: 0,
          }}>
            <window.Icon.star size={12} />
            {r.rating.toFixed(1)}
          </div>
        </div>

        <div style={{
          fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {lang === 'de' ? 'Bezirk' : 'District'} {r.district}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span>{r.categories.join(', ')}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {r.tags.slice(0, tall ? 5 : 3).map((t) => (
            <span key={t} style={{
              padding: '3px 8px',
              background: 'rgba(75,85,99,0.35)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              fontSize: 11,
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        {tall && (
          <div style={{
            marginTop: 4, paddingTop: 12,
            borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 12, color: 'var(--text-secondary)',
          }}>
            <span>{c.reviewsSuffix(r.reviews)}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              color: isHovered ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: 600,
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}>
              {lang === 'de' ? 'Ansehen' : 'View'}
              <window.Icon.arrow size={12} />
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

window.RestaurantCard = RestaurantCard;
