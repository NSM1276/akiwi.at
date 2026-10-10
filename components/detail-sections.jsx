'use client';
import Link from 'next/link';
import { DETAIL_COPY } from '@/data/detail-copy';
import { Icon, StatusBadge, District } from './atoms';

export function Menu({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const de = lang === 'de';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {venue.menu.map((cat) => (
        <div key={cat.cat_de}>
          <h3 className="ak-subh">{de ? cat.cat_de : cat.cat_en}</h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {cat.items.map((it, i) => (
              <li key={i} className="ak-menu-row">
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  {de ? it.name_de : it.name_en}
                  {it.tag === 'V' && <span className="ak-veg">{c.veg}</span>}
                  {it.tag === 'H' && <span className="ak-veg">{c.halalTag}</span>}
                </span>
                {it.price && <span className="ak-price">€ {it.price}</span>}
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
  if (!venue.reviews) {
    return <p className="ak-muted" style={{ margin: 0, fontSize: 14 }}>{lang === 'de' ? 'Noch keine Bewertungen.' : 'No reviews yet.'}</p>;
  }
  return (
    <div className="ak-panel" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span className="ak-display" style={{ fontSize: 56 }}>{venue.rating.toFixed(1)}</span>
      <span>
        <span style={{ display: 'flex', gap: 2, color: 'var(--green)' }}>
          {[1, 2, 3, 4, 5].map((i) => <Icon.star key={i} size={14} />)}
        </span>
        <span className="ak-data ak-muted">{c.reviewsCount(venue.reviews)}</span>
      </span>
    </div>
  );
}

export function Verification({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const de = lang === 'de';
  return (
    <div>
      <p className="ak-muted" style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.55 }}>
        {venue.status === 'verified' ? c.statusBlurbVerified : venue.status === 'self' ? c.statusBlurbSelf : c.statusBlurbUnknown}
      </p>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '4px solid var(--green)' }}>
        {(venue.verification_log || []).map((e, i) => (
          <li key={i} style={{ padding: '2px 0 14px 14px' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{de ? e.event_de : e.event_en}</div>
            <div className="ak-data ak-muted" style={{ marginTop: 3 }}>
              {new Date(e.date).toLocaleDateString(de ? 'de-AT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {de ? e.actor_de : e.actor_en}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SimilarList({ venue, lang }) {
  return (
    <ul className="ak-list">
      {(venue.similar || []).map((s) => (
        <li key={s.id}>
          <Link href={`/r/${s.id}`} className="ak-list-row" style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}>
            <District district={s.district} city="" />
            <span>
              <span className="ak-list-title">{s.name}</span>
              <span style={{ display: 'block', marginTop: 5 }}><StatusBadge status={s.status} lang={lang} compact /></span>
            </span>
            <span className="ak-data ak-muted">{s.distance_km} km</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Not a real map: the district as a big sign on the pattern band. */
export function MiniMap({ venue }) {
  return (
    <div className="ak-pattern--green" style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'var(--line) solid var(--ink)' }}>
      <span className="ak-district" style={{ minWidth: 64, height: 56, fontSize: venue.district > 0 ? 40 : 18, padding: '0 12px' }}>
        {venue.district > 0 ? venue.district : venue.districtName}
      </span>
    </div>
  );
}

const AMENITY_ICON = {
  parking: 'P', wheelchair: '♿', prayer: '✦', delivery: '→', outdoor: '☀', wifi: '◎',
};

export function Amenities({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const items = Object.entries(venue.amenities || {}).filter(([, v]) => v);
  if (!items.length) return null;
  return (
    <ul className="ak-chips" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map(([k]) => (
        <li key={k} className={`ak-chip${k === 'prayer' ? ' is-on' : ''}`} style={{ cursor: 'default' }}>
          <span aria-hidden="true" style={{ fontFamily: 'var(--font-data)' }}>{AMENITY_ICON[k]}</span>
          {c.amenityLabels[k]}
        </li>
      ))}
    </ul>
  );
}
