'use client';
// Search page sections: SearchHero, ResultsHeader, ActiveFilterChips, EmptyState

import { useState, useRef, useEffect } from 'react';
import { SEARCH_COPY } from '@/data/search-data';
import { Icon } from '@/components/atoms';

export function SearchHero({ lang, query, setQuery, where, setWhere }) {
  const c = SEARCH_COPY[lang];
  return (
    <section className="ak-wrap" style={{ paddingTop: 22, paddingBottom: 16 }}>
      <h1 className="ak-h1">{c.pageTitle}</h1>
      <p className="ak-lead" style={{ margin: '8px 0 16px', fontSize: 15 }}>{c.pageSub}</p>

      <div className="ak-search search-hero-fields">
        <SearchField icon={<Icon.search size={16} />} label={c.searchWhat} placeholder={c.searchWhatPh} value={query} onChange={setQuery} />
        <div className="search-hero-divider" style={{ background: 'var(--ink)' }} />
        <SearchField icon={<Icon.pin size={16} />} label={c.searchWhere} placeholder={c.searchWherePh} value={where} onChange={setWhere} />
        <button
          type="button"
          className="ak-btn ak-btn--ink"
          onClick={(e) => e.currentTarget.closest('section').querySelector('input')?.focus()}
        >
          <Icon.search size={14} /> {c.searchCta}
        </button>
      </div>
    </section>
  );
}

function SearchField({ icon, label, placeholder, value, onChange }) {
  return (
    <label style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}>
      <span style={{ color: 'var(--ink-3)', display: 'inline-flex' }} aria-hidden="true">{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="ak-subh" style={{ display: 'block', margin: '0 0 2px', fontSize: 10 }}>{label}</span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '100%', padding: 0, fontSize: 16, fontWeight: 500 }}
        />
      </span>
    </label>
  );
}

export function ResultsHeader({ lang, count, total, sort, setSort, view, setView, dense, setDense }) {
  const c = SEARCH_COPY[lang];
  const [sortOpen, setSortOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setSortOpen(false); }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap',
      padding: '4px 0 14px', borderBottom: 'var(--line) solid var(--ink)', marginBottom: 14,
    }}>
      <div className="ak-data">
        <b style={{ color: 'var(--green-ink)' }}>{count}</b> {c.resultsCount(count).replace(/^\d+\s*/, '')}
        {count !== total && <span className="ak-muted"> ({lang === 'de' ? 'von' : 'of'} {total})</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <div className="search-view-toggle" style={{ display: 'inline-flex' }}>
          {[['list', c.listView], ['split', c.splitView], ['map', c.mapView]].map(([v, l], i) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}
              className={`ak-chip${view === v ? ' is-on' : ''}`}
              style={{ flex: 1, justifyContent: 'center', marginLeft: i ? -1.5 : 0 }}>
              {l}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => setDense(!dense)} className={`ak-chip search-density${dense ? ' is-on' : ''}`} aria-pressed={dense}>
          {dense ? (lang === 'de' ? 'Kompakt' : 'Compact') : (lang === 'de' ? 'Komfort' : 'Comfort')}
        </button>

        <div ref={ref} style={{ position: 'relative' }}>
          <button type="button" className="ak-chip" aria-expanded={sortOpen} onClick={(e) => { e.stopPropagation(); setSortOpen((v) => !v); }}>
            <span className="ak-muted">{c.sortLabel}:</span> {c.sort[sort]} <Icon.chevron size={12} />
          </button>
          {sortOpen && (
            <div className="ak-dropdown" style={{ left: 'auto', right: 0, width: 220 }}>
              {Object.entries(c.sort).map(([k, l]) => (
                <button key={k} type="button" className={sort === k ? 'is-on' : ''} onClick={() => { setSort(k); setSortOpen(false); }}>{l}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ActiveFilterChips({ lang, filters, setFilters }) {
  const c = SEARCH_COPY[lang];
  const chips = [];

  const dropFrom = (key, value) =>
    setFilters({ ...filters, [key]: filters[key].filter((x) => x !== value) });

  (filters.halal || []).forEach((s) =>
    chips.push({ k: 'halal:' + s, label: c.halalLabels[s], rm: () => dropFrom('halal', s) }));
  (filters.category || []).forEach((s) =>
    chips.push({ k: 'cat:' + s, label: s, rm: () => dropFrom('category', s) }));
  (filters.city || []).forEach((s) =>
    chips.push({ k: 'city:' + s, label: s, rm: () => dropFrom('city', s) }));
  (filters.district || []).forEach((s) =>
    chips.push({ k: 'd:' + s, label: `${1000 + s * 10}`, rm: () => dropFrom('district', s) }));
  (filters.price || []).forEach((s) =>
    chips.push({ k: 'p:' + s, label: s, rm: () => dropFrom('price', s) }));
  (filters.amenities || []).forEach((s) =>
    chips.push({ k: 'a:' + s, label: c.amenityLabels[s], rm: () => dropFrom('amenities', s) }));
  if (filters.openNow) {
    chips.push({ k: 'on', label: c.filters.openNow, rm: () => setFilters({ ...filters, openNow: false }) });
  }

  if (!chips.length) return null;
  return (
    <div className="ak-chips" style={{ paddingBottom: 14, alignItems: 'center' }}>
      <span className="ak-subh" style={{ margin: '0 4px 0 0' }}>{c.activeFilters}</span>
      {chips.map((ch) => (
        <button key={ch.k} type="button" onClick={ch.rm} className="ak-chip is-on">
          {ch.label} <Icon.close size={10} />
        </button>
      ))}
      <button type="button" onClick={() => setFilters({})} className="ak-chip">{c.clearAll}</button>
    </div>
  );
}

export function EmptyState({ lang, onReset }) {
  const c = SEARCH_COPY[lang];
  return (
    <div className="ak-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h3 className="ak-h3">{c.emptyTitle}</h3>
      <p className="ak-muted" style={{ margin: '8px 0 14px', fontSize: 14 }}>{c.emptyBody}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto 18px', display: 'inline-flex', flexDirection: 'column', gap: 6, textAlign: 'left', fontSize: 13 }} className="ak-muted">
        {c.emptySuggestions.map((s, i) => <li key={i}><span style={{ color: 'var(--green-ink)' }}>→</span> {s}</li>)}
      </ul>
      <div><button type="button" onClick={onReset} className="ak-btn ak-btn--ink">{c.emptyReset}</button></div>
    </div>
  );
}
