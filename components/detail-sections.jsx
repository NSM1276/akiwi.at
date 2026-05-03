'use client';
import { DETAIL_COPY } from '@/data/venues';
import { Icon, StatusBadge } from './atoms';

export function Menu({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {venue.menu.map((cat) => (
        <div key={cat.cat_de}>
          <h3 style={{
            margin: '0 0 12px',
            fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
          }}>{lang === 'de' ? cat.cat_de : cat.cat_en}</h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cat.items.map((it, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                padding: '12px 0',
                borderBottom: i === cat.items.length - 1 ? 'none' : '1px dashed var(--border)',
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {lang === 'de' ? it.name_de : it.name_en}
                </span>
                {it.tag === 'V' && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    color: '#10B981', border: '1px solid #10B98155',
                    padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase',
                  }}>{c.veg}</span>
                )}
                {it.tag === 'H' && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    color: 'var(--accent)', border: '1px solid rgba(163,230,53,0.35)',
                    padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase',
                  }}>{c.halalTag}</span>
                )}
                <span style={{
                  flex: 1, height: 1, alignSelf: 'center',
                  borderTop: '1px dotted var(--border)',
                  marginInline: 4,
                }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
                  € {it.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Reviews({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: 20,
        background: 'rgba(75,85,99,0.18)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 48, fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {venue.rating.toFixed(1)}
          </span>
          <span style={{ display: 'flex', gap: 2, color: 'var(--accent)' }}>
            {[1,2,3,4,5].map((i) => (
              <Icon.star key={i} size={12} />
            ))}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            {c.reviewsCount(venue.reviews)}
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[5,4,3,2,1].map((stars, i) => {
            const widths = [78, 16, 4, 1, 1];
            return (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <span style={{ width: 12, color: 'var(--text-secondary)' }}>{stars}</span>
                <Icon.star size={10} />
                <span style={{ flex: 1, height: 6, background: 'rgba(75,85,99,0.4)', borderRadius: 999, overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: `${widths[i]}%`, background: 'var(--accent)' }} />
                </span>
                <span style={{ width: 32, textAlign: 'right', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(venue.reviews * widths[i] / 100)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(venue.reviews_list || []).map((r, i) => (
          <li key={i} style={{
            padding: 16,
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: `hsl(${i * 80 + 30}, 50%, 35%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14, color: '#fff',
              }}>{r.author[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.author}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {lang === 'de' ? r.date_de : r.date_en}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 1, color: 'var(--accent)' }}>
                {[1,2,3,4,5].map((s) => (
                  <Icon.star key={s} size={11} />
                )).slice(0, r.rating)}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)' }}>
              {lang === 'de' ? r.text_de : r.text_en}
            </p>
          </li>
        ))}
      </ul>

      <button style={{
        marginTop: 16,
        background: 'transparent', border: '1px solid var(--border)',
        color: 'var(--text-primary)', padding: '10px 18px',
        borderRadius: 999, fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
        cursor: 'pointer',
      }}>{c.writeReview}</button>
    </div>
  );
}

export function Verification({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  return (
    <div>
      <p style={{ margin: '0 0 18px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.55 }}>
        {c.statusBlurbVerified}
      </p>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 7, top: 8, bottom: 8, width: 2,
          background: 'var(--border)',
        }} />
        {(venue.verification_log || []).map((e, i) => (
          <li key={i} style={{ position: 'relative', paddingLeft: 28, paddingBottom: 16 }}>
            <span style={{
              position: 'absolute', left: 0, top: 4,
              width: 16, height: 16, borderRadius: 999,
              background: i === 0 ? 'var(--status-green)' : 'var(--card)',
              border: `2px solid ${i === 0 ? 'var(--status-green)' : 'var(--border-strong)'}`,
              boxShadow: i === 0 ? '0 0 0 4px rgba(16,185,129,0.18)' : 'none',
            }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              {lang === 'de' ? e.event_de : e.event_en}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              {new Date(e.date).toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {lang === 'de' ? e.actor_de : e.actor_en}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SimilarList({ venue, lang }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
      {(venue.similar || []).map((s) => (
        <a key={s.id} href={`/r/${s.id}`} style={{
          textDecoration: 'none',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          transition: 'border-color 150ms, transform 150ms',
        }}>
          <div style={{
            height: 100,
            background: `radial-gradient(circle at 30% 50%, hsla(${s.hue},60%,45%,0.5), hsla(${s.hue+20},50%,20%,0.9))`,
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 8, left: 8 }}>
              <StatusBadge status={s.status} lang={lang} compact />
            </div>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{lang === 'de' ? 'Bezirk' : 'District'} {s.district}</span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--accent)' }}>
                <Icon.star size={10} /> {s.rating}
              </span>
              <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: 11 }}>
                {s.distance_km} km
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function MiniMap({ venue }) {
  return (
    <div style={{
      position: 'relative',
      aspectRatio: '4 / 3',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--card)',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(107,114,128,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,114,128,0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M0,55 C 25,50 50,60 75,55 S 100,50 100,55 L100,68 C 75,68 50,72 25,68 S 0,68 0,68 Z"
          fill="rgba(59,130,246,0.18)" stroke="rgba(59,130,246,0.35)" strokeWidth="0.2" />
        <path d="M30,30 L70,32 L72,75 L28,73 Z" fill="rgba(75,85,99,0.4)" stroke="var(--border-strong)" strokeWidth="0.3" />
        <text x="50" y="55" fontSize="3" textAnchor="middle" fill="var(--text-tertiary)" fontWeight="600">{venue.districtName?.toUpperCase() || ''}</text>
      </svg>
      <div style={{
        position: 'absolute', left: '50%', top: '60%',
        transform: 'translate(-50%, -100%)',
        filter: 'drop-shadow(0 4px 8px rgba(16,185,129,0.4))',
      }}>
        <svg viewBox="0 0 24 30" width="40" height="50">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18C24 5.4 18.6 0 12 0z"
            fill="#10B981" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" fill="#1F2937" />
        </svg>
      </div>
    </div>
  );
}

export function Amenities({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const items = Object.entries(venue.amenities || {}).filter(([, v]) => v);
  const icons = {
    parking: 'P', wheelchair: '♿', prayer: '🕌', delivery: '🛵', outdoor: '☀', wifi: '◎',
  };
  return (
    <ul style={{
      listStyle: 'none', margin: 0, padding: 0,
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8,
    }}>
      {items.map(([k]) => (
        <li key={k} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px',
          background: k === 'prayer' ? 'rgba(163,230,53,0.08)' : 'rgba(75,85,99,0.18)',
          border: `1px solid ${k === 'prayer' ? 'rgba(163,230,53,0.35)' : 'var(--border)'}`,
          borderRadius: 8,
        }}>
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: k === 'prayer' ? 'var(--accent)' : 'var(--background)',
            color: k === 'prayer' ? 'var(--text-on-accent)' : 'var(--text-primary)',
            fontWeight: 700, fontSize: 13,
          }}>{icons[k]}</span>
          <span style={{
            fontSize: 13, fontWeight: k === 'prayer' ? 700 : 500,
            color: k === 'prayer' ? 'var(--accent)' : 'var(--text-primary)',
          }}>{c.amenityLabels[k]}</span>
        </li>
      ))}
    </ul>
  );
}
