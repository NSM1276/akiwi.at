'use client';
// SearchFilters — left-side filter panel for the catalog page.
// Every group is backed by real data; the options come from getFacets().

import { SEARCH_COPY } from '@/data/search-data';
import { Icon, StatusDot } from '@/components/atoms';

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
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 18,
      }}>
        <h2 style={{
          margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <Icon.sliders size={16} />
          {c.filtersHeading}
        </h2>
        {isFiltered ? (
          <button onClick={() => setFilters({})} style={{
            background: 'transparent', border: 'none',
            color: 'var(--accent)', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            padding: 0,
          }}>{c.clearAll}</button>
        ) : null}
      </div>

      <FilterGroup title={c.filters.halal}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['verified', 'self', 'unknown'].map((s) => (
            <CheckRow key={s} on={(filters.halal || []).includes(s)} onClick={() => toggle('halal', s)}>
              <StatusDot status={s} size={8} />
              <span>{c.halalLabels[s]}</span>
            </CheckRow>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={c.filters.openNow}>
        <SwitchRow on={!!filters.openNow} onClick={() => setBool('openNow')} label={c.openNowOnly} />
      </FilterGroup>

      <FilterGroup title={c.filters.category}>
        <ChipRow>
          {facets.categories.map((cat) => (
            <Chip key={cat} on={(filters.category || []).includes(cat)} onClick={() => toggle('category', cat)}>
              {cat}
            </Chip>
          ))}
        </ChipRow>
      </FilterGroup>

      <FilterGroup title={c.filters.city}>
        <ChipRow>
          {facets.cities.map((city) => (
            <Chip key={city} on={(filters.city || []).includes(city)} onClick={() => toggle('city', city)}>
              {city}
            </Chip>
          ))}
        </ChipRow>
      </FilterGroup>

      {showDistricts && (
        <FilterGroup title={c.filters.district}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
            {facets.districts.map((d) => {
              const on = (filters.district || []).includes(d);
              return (
                <button key={d} onClick={() => toggle('district', d)} style={{
                  padding: '6px 0',
                  background: on ? 'var(--primary)' : 'var(--card)',
                  border: `1px solid ${on ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 6,
                  color: on ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', textAlign: 'center',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }} title={`${1000 + d * 10}`}>{d}</button>
              );
            })}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title={c.filters.price}>
        <ChipRow>
          {facets.prices.map((p) => (
            <Chip key={p} on={(filters.price || []).includes(p)} onClick={() => toggle('price', p)} bold>
              {p}
            </Chip>
          ))}
        </ChipRow>
      </FilterGroup>

      <FilterGroup title={c.filters.amenities} last>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {facets.amenities.map((a) => (
            <CheckRow key={a} on={(filters.amenities || []).includes(a)} onClick={() => toggle('amenities', a)}>
              <span>{c.amenityLabels[a]}</span>
            </CheckRow>
          ))}
        </div>
      </FilterGroup>

      <div style={{
        marginTop: 16, padding: 12,
        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12,
        fontSize: 12, color: 'var(--text-secondary)',
      }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{visibleCount}</span>{' '}
        {c.showingOf(visibleCount, totalCount).split(' ').slice(1).join(' ')}
      </div>
    </aside>
  );
}

function FilterGroup({ title, children, last }) {
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <h3 style={{
        margin: '0 0 10px', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
      }}>{title}</h3>
      {children}
    </div>
  );
}

function ChipRow({ children }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div>;
}

function Chip({ on, onClick, children, bold }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 11px',
      background: on ? 'var(--accent)' : 'transparent',
      border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 999,
      color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
      fontFamily: 'inherit', fontSize: 12, fontWeight: bold ? 700 : 600,
      cursor: 'pointer', whiteSpace: 'nowrap',
      transition: 'all var(--dur-fast) var(--ease-out)',
    }}>{children}</button>
  );
}

function CheckRow({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '6px 0',
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
      textAlign: 'left', width: '100%',
    }}>
      <span style={{
        width: 16, height: 16, borderRadius: 4,
        border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: on ? 'var(--accent)' : 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all var(--dur-fast) var(--ease-out)',
      }}>
        {on && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="var(--text-on-accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

function SwitchRow({ on, onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%', padding: '4px 0', gap: 12,
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: 'var(--text-primary)',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 500, textAlign: 'left',
    }}>
      <span>{label}</span>
      <span style={{
        width: 32, height: 18, borderRadius: 999,
        background: on ? 'var(--status-green)' : 'var(--border-strong)',
        position: 'relative', flexShrink: 0,
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: on ? 16 : 2,
          width: 14, height: 14, borderRadius: 999, background: '#fff',
          transition: 'left var(--dur-fast) var(--ease-out)',
        }} />
      </span>
    </button>
  );
}
