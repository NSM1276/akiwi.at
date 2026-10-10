'use client';
// SearchFilters — filter panel for the catalog page.
// Every group is backed by real data; the options come from getFacets().

import { SEARCH_COPY } from '@/data/search-data';
import { StatusDot } from '@/components/atoms';

export default function SearchFilters({ lang, filters, setFilters, facets, totalCount, visibleCount }) {
  const c = SEARCH_COPY[lang];

  const toggle = (key, value) => {
    const cur = filters[key] || [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    setFilters({ ...filters, [key]: next });
  };
  const setBool = (key) => setFilters({ ...filters, [key]: !filters[key] });

  const isFiltered = Object.values(filters).some((v) => (Array.isArray(v) ? v.length : !!v));

  // The Vienna district grid is noise when the user has narrowed to other cities.
  const cityPick = filters.city || [];
  const showDistricts = !cityPick.length || cityPick.includes('Wien');

  return (
    <aside className="search-filters">
      <div className="ak-row-between" style={{ marginBottom: 6 }}>
        <h2 className="ak-h3">{c.filtersHeading}</h2>
        {isFiltered && (
          <button type="button" onClick={() => setFilters({})} className="ak-chip" style={{ minHeight: 30 }}>{c.clearAll}</button>
        )}
      </div>

      <FilterGroup title={c.filters.halal}>
        {['verified', 'self', 'unknown'].map((s) => (
          <CheckRow key={s} on={(filters.halal || []).includes(s)} onClick={() => toggle('halal', s)}>
            <StatusDot status={s} size={12} />
            <span>{c.halalLabels[s]}</span>
          </CheckRow>
        ))}
      </FilterGroup>

      <FilterGroup title={c.filters.openNow}>
        <CheckRow on={!!filters.openNow} onClick={() => setBool('openNow')}>
          <span>{c.openNowOnly}</span>
        </CheckRow>
      </FilterGroup>

      <FilterGroup title={c.filters.category}>
        <div className="ak-chips">
          {facets.categories.map((cat) => (
            <Chip key={cat} on={(filters.category || []).includes(cat)} onClick={() => toggle('category', cat)}>{cat}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={c.filters.city}>
        <div className="ak-chips">
          {facets.cities.map((city) => (
            <Chip key={city} on={(filters.city || []).includes(city)} onClick={() => toggle('city', city)}>{city}</Chip>
          ))}
        </div>
      </FilterGroup>

      {showDistricts && (
        <FilterGroup title={c.filters.district}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 4 }}>
            {facets.districts.map((d) => {
              const on = (filters.district || []).includes(d);
              return (
                <button key={d} type="button" onClick={() => toggle('district', d)} aria-pressed={on}
                  title={`${1000 + d * 10}`}
                  className={`ak-district${on ? ' ak-district--green' : ''}`}
                  style={{ border: 0, cursor: 'pointer', height: 34, background: on ? undefined : 'var(--paper)', color: on ? '#fff' : 'var(--ink)', boxShadow: on ? 'none' : 'inset 0 0 0 1.5px var(--ink)' }}>
                  {d}
                </button>
              );
            })}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title={c.filters.price}>
        <div className="ak-chips">
          {facets.prices.map((p) => (
            <Chip key={p} on={(filters.price || []).includes(p)} onClick={() => toggle('price', p)}>{p}</Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={c.filters.amenities} last>
        {facets.amenities.map((a) => (
          <CheckRow key={a} on={(filters.amenities || []).includes(a)} onClick={() => toggle('amenities', a)}>
            <span>{c.amenityLabels[a]}</span>
          </CheckRow>
        ))}
      </FilterGroup>

      <div className="ak-data" style={{ marginTop: 10, paddingTop: 12, borderTop: 'var(--line) solid var(--ink)' }}>
        <b style={{ color: 'var(--green-ink)' }}>{visibleCount}</b>{' '}
        {c.showingOf(visibleCount, totalCount).split(' ').slice(1).join(' ')}
      </div>
    </aside>
  );
}

function FilterGroup({ title, children, last }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: last ? 'none' : '1px solid var(--rule-soft)' }}>
      <h3 className="ak-subh">{title}</h3>
      {children}
    </div>
  );
}

function Chip({ on, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={`ak-chip${on ? ' is-on' : ''}`} style={{ minHeight: 32 }}>
      {children}
    </button>
  );
}

function CheckRow({ on, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%', minHeight: 36,
      padding: '4px 0', background: 'transparent', border: 'none', cursor: 'pointer',
      color: 'var(--ink)', fontSize: 14, fontWeight: 500, textAlign: 'left',
    }}>
      <span className="ak-toggle-box" style={{ background: on ? 'var(--green)' : 'var(--paper)', borderColor: on ? 'var(--green)' : 'var(--ink)' }}>
        {on && <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.2 4.8 9 10 3" stroke="#fff" strokeWidth="2" fill="none" /></svg>}
      </span>
      {children}
    </button>
  );
}
