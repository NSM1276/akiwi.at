'use client';
import { useState, useEffect, useRef } from 'react';
import { COPY } from '@/data/data';
import { Icon } from './atoms';

export default function FilterBar({ lang, filters, setFilters, resultCount, facets }) {
  const c = COPY[lang];
  const { districts, categories } = facets;
  const [districtOpen, setDistrictOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDistrictOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const toggleCat = (cat) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((x) => x !== cat)
      : [...filters.categories, cat];
    setFilters({ ...filters, categories: next });
  };

  const pickDistrict = (d) => { setFilters({ ...filters, district: d }); setDistrictOpen(false); };

  return (
    <div className="ak-filterbar">
      <div className="ak-filterbar-inner">
        <div className="ak-filterbar-top">
          <button
            type="button"
            className={`ak-chip ak-toggle${filters.verifiedOnly ? ' is-on' : ''}`}
            aria-pressed={filters.verifiedOnly}
            onClick={() => setFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          >
            <span className="ak-toggle-box" aria-hidden="true">
              {filters.verifiedOnly && (
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6.2 4.8 9 10 3" stroke="#fff" strokeWidth="2" fill="none" /></svg>
              )}
            </span>
            {c.verifiedOnly}
          </button>

          <div ref={dropRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className={`ak-chip${filters.district ? ' is-on' : ''}`}
              aria-expanded={districtOpen}
              onClick={(e) => { e.stopPropagation(); setDistrictOpen((v) => !v); }}
            >
              <Icon.pin size={14} />
              {filters.district ? `${1000 + filters.district * 10} · ${c.district}` : c.allDistricts}
              <Icon.chevron size={12} />
            </button>
            {districtOpen && (
              <div className="ak-dropdown" role="listbox">
                <button type="button" className={!filters.district ? 'is-on' : ''} onClick={() => pickDistrict(null)}>
                  {c.allDistricts}
                </button>
                {districts.map((d) => (
                  <button key={d} type="button" className={filters.district === d ? 'is-on' : ''} onClick={() => pickDistrict(d)}>
                    <span className="ak-district" style={{ minWidth: 26, height: 22, fontSize: 13 }}>{d}</span>
                    {1000 + d * 10}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="ak-data ak-filterbar-count">
            <b style={{ color: 'var(--green-ink)' }}>{resultCount}</b> {c.resultsCount(resultCount).replace(/^\d+\s*/, '')}
          </span>
        </div>

        <div className="ak-chips ak-chips--scroll ak-filterbar-cats">
          {categories.map((cat) => {
            const on = filters.categories.includes(cat);
            return (
              <button key={cat} type="button" className={`ak-chip${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => toggleCat(cat)}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
