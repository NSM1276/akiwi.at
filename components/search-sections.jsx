'use client';
// Search page sections: SearchHero, ResultsHeader, ActiveFilterChips, EmptyState

import { useState, useRef, useEffect } from 'react';
import { SEARCH_COPY } from '@/data/search-data';
import { Icon } from '@/components/atoms';

export function SearchHero({ lang, query, setQuery, where, setWhere }) {
  const c = SEARCH_COPY[lang];
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '32px 24px 16px',
    }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(28px, 3.5vw, 40px)',
          fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05,
        }}>
          {c.pageTitle}
        </h1>
        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: 15, maxWidth: 640 }}>
          {c.pageSub}
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 0, alignItems: 'stretch',
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 999, padding: 6,
        boxShadow: 'var(--shadow-elev)',
        flexWrap: 'wrap',
      }}>
        <SearchField
          icon={<Icon.search size={16} />}
          label={c.searchWhat} placeholder={c.searchWhatPh}
          value={query} onChange={setQuery}
        />
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', margin: '6px 0' }} />
        <SearchField
          icon={<Icon.pin size={16} />}
          label={c.searchWhere} placeholder={c.searchWherePh}
          value={where} onChange={setWhere}
          right={
            <button onClick={() => setWhere(c.nearMe)} style={{
              background: 'transparent', border: 'none', color: 'var(--accent)',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', padding: '4px 8px', whiteSpace: 'nowrap',
            }}>📍 {c.nearMe}</button>
          }
        />
        <button style={{
          padding: '0 22px',
          background: 'var(--accent)', border: 'none', color: 'var(--text-on-accent)',
          fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
          borderRadius: 999, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          minHeight: 52,
          letterSpacing: '0.01em',
        }}>
          <Icon.search size={14} /> {c.searchCta}
        </button>
      </div>
    </section>
  );
}

function SearchField({ icon, label, placeholder, value, onChange, right }) {
  return (
    <div style={{
      flex: 1, minWidth: 200,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '6px 18px',
    }}>
      <span style={{ color: 'var(--text-tertiary)', display: 'inline-flex' }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--text-tertiary)', marginBottom: 2,
        }}>{label}</div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontFamily: 'inherit',
            fontSize: 15, fontWeight: 500, padding: 0,
          }}
        />
      </div>
      {right}
    </div>
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
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, flexWrap: 'wrap',
      padding: '12px 0 18px', borderBottom: '1px solid var(--border)', marginBottom: 16,
    }}>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
        <b style={{ color: 'var(--accent)', fontWeight: 700 }}>{count}</b>{' '}
        {c.resultsCount(count).replace(/^\d+\s*/, '')}
        {count !== total && (
          <span style={{ color: 'var(--text-tertiary)', marginLeft: 6 }}>
            ({lang === 'de' ? 'von' : 'of'} {total})
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {/* View toggle */}
        <div style={{
          display: 'inline-flex', background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 999, padding: 3, gap: 2,
        }}>
          {[
            ['list', c.listView],
            ['split', c.splitView],
            ['map', c.mapView],
          ].map(([v, l]) => {
            const on = view === v;
            return (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '6px 12px', border: 'none',
                background: on ? 'var(--primary)' : 'transparent',
                color: on ? 'var(--accent)' : 'var(--text-secondary)',
                borderRadius: 999, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}>{l}</button>
            );
          })}
        </div>

        {/* Density */}
        <button onClick={() => setDense(!dense)} title="Density" style={{
          padding: '8px 12px',
          background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 999,
          color: dense ? 'var(--accent)' : 'var(--text-secondary)',
          fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="2" y1="4" x2="12" y2="4" />
            <line x1="2" y1={dense ? 7 : 8} x2="12" y2={dense ? 7 : 8} />
            <line x1="2" y1={dense ? 10 : 12} x2="12" y2={dense ? 10 : 12} />
          </svg>
          {dense ? (lang === 'de' ? 'Kompakt' : 'Compact') : (lang === 'de' ? 'Komfort' : 'Comfort')}
        </button>

        {/* Sort */}
        <div ref={ref} style={{ position: 'relative' }}>
          <button onClick={(e) => { e.stopPropagation(); setSortOpen((v) => !v); }} style={{
            padding: '8px 14px',
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 999,
            color: 'var(--text-primary)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{c.sortLabel}:</span>
            {c.sort[sort]}
            <Icon.chevron size={12} />
          </button>
          {sortOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 6, minWidth: 200,
              boxShadow: 'var(--shadow-elev)', zIndex: 30,
            }}>
              {Object.entries(c.sort).map(([k, l]) => (
                <button key={k} onClick={() => { setSort(k); setSortOpen(false); }} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', borderRadius: 8, border: 'none',
                  background: sort === k ? 'var(--primary)' : 'transparent',
                  color: sort === k ? 'var(--accent)' : 'var(--text-primary)',
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>{l}</button>
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

  (filters.halal||[]).forEach((s) => chips.push({ k: 'halal:' + s, label: c.halalLabels[s], rm: () => setFilters({ ...filters, halal: filters.halal.filter((x) => x !== s) }) }));
  (filters.cuisine||[]).forEach((s) => chips.push({ k: 'c:' + s, label: s, rm: () => setFilters({ ...filters, cuisine: filters.cuisine.filter((x) => x !== s) }) }));
  (filters.district||[]).forEach((s) => chips.push({ k: 'd:' + s, label: `${1000 + s * 10}`, rm: () => setFilters({ ...filters, district: filters.district.filter((x) => x !== s) }) }));
  (filters.price||[]).forEach((s) => chips.push({ k: 'p:' + s, label: s, rm: () => setFilters({ ...filters, price: filters.price.filter((x) => x !== s) }) }));
  (filters.services||[]).forEach((s) => chips.push({ k: 's:' + s, label: c.serviceLabels[s], rm: () => setFilters({ ...filters, services: filters.services.filter((x) => x !== s) }) }));
  (filters.dietary||[]).forEach((s) => chips.push({ k: 'di:' + s, label: c.dietaryLabels[s], rm: () => setFilters({ ...filters, dietary: filters.dietary.filter((x) => x !== s) }) }));
  if (filters.openNow) chips.push({ k: 'on', label: c.filters.openNow, rm: () => setFilters({ ...filters, openNow: false }) });
  if (filters.family) chips.push({ k: 'fa', label: c.family, rm: () => setFilters({ ...filters, family: false }) });
  if (filters.rating) chips.push({ k: 'ra', label: '★ ' + c.ratingLabels[filters.rating], rm: () => setFilters({ ...filters, rating: null }) });

  if (!chips.length) return null;
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 6,
      padding: '0 0 14px',
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--text-tertiary)', alignSelf: 'center', marginRight: 4,
      }}>{c.activeFilters}</span>
      {chips.map((ch) => (
        <button key={ch.k} onClick={ch.rm} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 6px 4px 10px',
          background: 'var(--primary)', border: '1px solid var(--primary)',
          borderRadius: 999, color: 'var(--accent)',
          fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}>
          {ch.label}
          <Icon.close size={10} />
        </button>
      ))}
      <button onClick={() => setFilters({})} style={{
        padding: '4px 10px', background: 'transparent',
        border: '1px dashed var(--border-strong)', borderRadius: 999,
        color: 'var(--text-secondary)',
        fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
      }}>{c.clearAll}</button>
    </div>
  );
}

export function EmptyState({ lang, onReset }) {
  const c = SEARCH_COPY[lang];
  return (
    <div style={{
      padding: '64px 24px', textAlign: 'center',
      background: 'var(--card)', border: '1px dashed var(--border-strong)',
      borderRadius: 16,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 999,
        background: 'var(--background)', border: '1px solid var(--border)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <Icon.search size={22} />
      </div>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{c.emptyTitle}</h3>
      <p style={{ margin: '8px 0 18px', color: 'var(--text-secondary)', fontSize: 14 }}>{c.emptyBody}</p>
      <ul style={{
        listStyle: 'none', padding: 0, margin: '0 auto 22px',
        display: 'inline-flex', flexDirection: 'column', gap: 6,
        textAlign: 'left', color: 'var(--text-secondary)', fontSize: 13,
      }}>
        {c.emptySuggestions.map((s, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>→</span> {s}
          </li>
        ))}
      </ul>
      <button onClick={onReset} style={{
        padding: '10px 18px', background: 'var(--accent)', color: 'var(--text-on-accent)',
        border: 'none', borderRadius: 999,
        fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer',
      }}>{c.emptyReset}</button>
    </div>
  );
}
