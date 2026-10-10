'use client';
import Link from 'next/link';
import { COPY } from '@/data/data';
import { StatusBadge, District, Icon } from './atoms';

/** "Wien · 1120 · 1200" for a Vienna-only chain, otherwise the list of cities. */
function chainWhere(r) {
  if (r.cities.length === 1 && r.cities[0] === 'Wien' && r.districts.length && r.districts.length <= 4) {
    return ['Wien', ...r.districts.map((d) => 1000 + d * 10)].join(' · ');
  }
  return r.cities.length > 4 ? `${r.cities.slice(0, 3).join(' · ')} …` : r.cities.join(' · ');
}

export default function RestaurantCard({ r, lang, onHoverId }) {
  const c = COPY[lang];
  const de = lang === 'de';
  const isChain = r.type === 'chain';
  const href = isChain ? `/chain/${r.id}` : `/r/${r.id}`;

  return (
    <Link
      href={href}
      className="ak-card ak-card-link"
      onMouseEnter={() => onHoverId && onHoverId(r.id)}
      onMouseLeave={() => onHoverId && onHoverId(null)}
    >
      <div className="ak-card-body">
        <div className="ak-row-between">
          {isChain
            ? <span className="ak-district ak-district--city">{r.locationCount} {de ? 'Filialen' : 'branches'}</span>
            : <District district={r.district} city={r.districtName} green={r.status === 'verified'} />}
          <StatusBadge status={r.status} lang={lang} compact />
        </div>

        <h3 className="ak-card-title">{r.name}</h3>
        <div className="ak-card-meta">
          {r.categories.join(' · ')}
          <br />
          {isChain ? chainWhere(r) : (r.district > 0 ? `${1000 + r.district * 10} Wien · ${r.districtName}` : r.districtName)}
        </div>

        <div className="ak-card-foot">
          <span className="ak-data" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
            {r.price}
            {r.reviews > 0 && <> · <Icon.star size={10} /> {r.rating.toFixed(1)}</>}
            {r.featured && <> · {c.featured}</>}
          </span>
          <span className="ak-data" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--green-ink)' }}>
            {isChain ? (de ? 'Filialen' : 'Branches') : (de ? 'Ansehen' : 'View')}
            <Icon.arrow size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
