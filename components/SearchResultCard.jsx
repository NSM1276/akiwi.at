'use client';
// SearchResultCard — one row of the catalog list. The parent wraps it in a <Link>.

import { SEARCH_COPY } from '@/data/search-data';
import { Icon, StatusBadge } from '@/components/atoms';

export default function SearchResultCard({ r, lang, onHover, hovered, dense, openNow }) {
  const c = SEARCH_COPY[lang];
  const isChain = r.type === 'chain';

  return (
    <article
      className="ak-card"
      onMouseEnter={() => onHover && onHover(r.id)}
      onMouseLeave={() => onHover && onHover(null)}
      style={{ boxShadow: hovered ? 'var(--shadow-elev)' : 'none', transition: 'box-shadow var(--dur-fast) var(--ease-out)' }}
    >
      <div className="ak-card-body" style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr) auto', gap: 12, alignItems: 'start', padding: dense ? 12 : undefined }}>
        {isChain
          ? <span className="ak-district ak-district--city">{r.locationCount}×</span>
          : r.district > 0
            ? <span className={`ak-district${r.status === 'verified' ? ' ak-district--green' : ''}`}>{r.district}</span>
            : <span className="ak-district ak-district--city">{r.districtName}</span>}

        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <StatusBadge status={r.status} lang={lang} compact />
            {/* openNow is null until the clock is available on the client */}
            {openNow !== null && openNow !== undefined && (
              <span className="ak-data" style={{ color: openNow ? 'var(--green-ink)' : 'var(--ink-3)' }}>
                {openNow ? c.open : c.closed}
              </span>
            )}
          </div>
          <h3 className="ak-list-title" style={{ margin: '6px 0 4px', fontSize: dense ? 19 : 22, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {r.name}
          </h3>
          <div className="ak-card-meta">
            {r.categories.join(' · ')} · {r.districtName}
            {isChain && <> · <span style={{ color: 'var(--green-ink)', fontWeight: 600 }}>{c.locations(r.locationCount)}</span></>}
          </div>
          {!dense && r.amenities.length > 0 && (
            <div className="ak-tags" style={{ marginTop: 8 }}>
              {r.amenities.map((a) => <span key={a} className="ak-tag">{c.amenityLabels[a]}</span>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <div className="ak-data">{r.price}</div>
          {r.reviews > 0 && (
            <div className="ak-data" style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <Icon.star size={10} /> {r.rating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
