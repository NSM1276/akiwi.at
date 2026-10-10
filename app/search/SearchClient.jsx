'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { SEARCH_COPY } from '@/data/search-data';
import { priceLevels } from '@/data/listing';
import { useLang } from '@/components/LangProvider';
import { useNow } from '@/components/useNow';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/SearchFilters';
import SearchResultCard from '@/components/SearchResultCard';
import SearchMap from '@/components/SearchMap';
import { SearchHero, ResultsHeader, ActiveFilterChips, EmptyState } from '@/components/search-sections';

// ─── Opening hours ──────────────────────────────────────────────────────────
// hours entries are { d, o, c } with d 0=Mo…6=Su; JS getDay() is 0=Su…6=Sa.

const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export function isOpenNow(hours, now) {
  if (!now || !hours?.length) return false;
  const today = (now.getDay() + 6) % 7;
  const yesterday = (today + 6) % 7;
  const mins = now.getHours() * 60 + now.getMinutes();
  return hours.some((h) => {
    const o = toMin(h.o);
    let c = toMin(h.c);
    if (c <= o) c += 24 * 60; // closes after midnight
    if (h.d === today && mins >= o && mins < c) return true;
    // a venue that opened yesterday and closes after midnight is still open
    if (h.d === yesterday && c > 24 * 60 && mins + 24 * 60 < c) return true;
    return false;
  });
}

// ─── Filter + sort logic ────────────────────────────────────────────────────

function matchesWhere(r, where) {
  const w = where.toLowerCase().trim();
  if (!w) return true;
  const hay = [...r.cities, ...r.postals, r.districtName, ...r.districts.map((d) => String(1000 + d * 10))]
    .join(' ').toLowerCase();
  return hay.includes(w);
}

function applyFilters(restaurants, query, where, filters, now) {
  const q = (query || '').toLowerCase().trim();
  return restaurants.filter((r) => {
    if (q) {
      const hay = [r.name, r.districtName, ...r.cities, ...(r.tags || []), ...(r.categories || [])]
        .join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (!matchesWhere(r, where || '')) return false;
    if ((filters.halal || []).length && !filters.halal.includes(r.status)) return false;
    if ((filters.category || []).length && !filters.category.some((c) => r.categories.includes(c))) return false;
    if ((filters.city || []).length && !filters.city.some((c) => r.cities.includes(c))) return false;
    if ((filters.district || []).length && !filters.district.some((d) => r.districts.includes(d))) return false;
    if ((filters.price || []).length) {
      const levels = priceLevels(r.price);
      if (!filters.price.some((p) => levels.includes(p))) return false;
    }
    if ((filters.amenities || []).length && !filters.amenities.every((a) => r.amenities.includes(a))) return false;
    // `now` is null until the client has mounted, so the server renders everything.
    if (filters.openNow && now && !isOpenNow(r.hours, now)) return false;
    return true;
  });
}

function applySort(restaurants, sort) {
  const arr = [...restaurants];
  switch (sort) {
    // venues without reviews have no known rating — they go last, not first
    case 'rating': return arr.sort((a, b) =>
      (b.reviews ? b.rating : -1) - (a.reviews ? a.rating : -1));
    case 'alpha': return arr.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    default: return arr; // relevance — keep listing order
  }
}

// ─── URL → query (the only part that needs useSearchParams) ─────────────────
// Kept in its own tiny component so the Suspense boundary wraps nothing
// visible: the list itself renders statically (real links in the HTML).

function QuerySync({ setQuery }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    setQuery(searchParams?.get('q') || '');
  }, [searchParams, setQuery]);
  return null;
}

// ─── Main page ──────────────────────────────────────────────────────────────

function SearchPage({ restaurants, facets }) {
  const [lang, setLang] = useLang();

  const [query, setQuery] = useState('');
  const [where, setWhere] = useState('');

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('list'); // 'list' | 'split' | 'map'
  const [dense, setDense] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Clock for the "open now" filter — null on the server, so it is a no-op there.
  const now = useNow();

  const filtered = applySort(applyFilters(restaurants, query, where, filters, now), sort);
  const total = restaurants.length;

  const c = SEARCH_COPY[lang];
  const activeCount = Object.values(filters)
    .reduce((acc, v) => acc + (Array.isArray(v) ? v.length : (v ? 1 : 0)), 0);

  const hrefOf = (r) => (r.type === 'chain' ? `/chain/${r.id}` : `/r/${r.id}`);

  const resultCards = filtered.map((r) => (
    <Link key={r.id} href={hrefOf(r)} style={{ textDecoration: 'none', color: 'inherit' }}>
      <SearchResultCard
        r={r} lang={lang}
        onHover={setHoveredId}
        hovered={hoveredId === r.id}
        dense={dense || view === 'split'}
        openNow={now ? isOpenNow(r.hours, now) : null}
      />
    </Link>
  ));

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header lang={lang} setLang={setLang} />
      <Suspense fallback={null}><QuerySync setQuery={setQuery} /></Suspense>

      <SearchHero
        lang={lang}
        query={query}
        setQuery={setQuery}
        where={where}
        setWhere={setWhere}
      />

      {/* Mobile filter toggle */}
      <div className="search-mobile-toggle">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className={`ak-btn ak-btn--block${mobileFiltersOpen ? ' ak-btn--ink' : ''}`}
          aria-expanded={mobileFiltersOpen}
        >
          <Sliders />
          {mobileFiltersOpen ? c.hideFilters : c.showFilters}
          {activeCount > 0 && <span className="ak-district ak-district--green" style={{ height: 20, minWidth: 22, fontSize: 13 }}>{activeCount}</span>}
        </button>
      </div>

      {/* Main layout */}
      <div className={`ak-wrap search-layout${view === 'map' ? ' is-map' : ''}`} style={{ paddingBottom: 48 }}>
        {view !== 'map' && (
          <div className={`search-sidebar${mobileFiltersOpen ? ' open' : ''}`}>
            <SearchFilters
              lang={lang}
              filters={filters}
              setFilters={setFilters}
              facets={facets}
              totalCount={total}
              visibleCount={filtered.length}
            />
          </div>
        )}

        <div>
          <ResultsHeader
            lang={lang}
            count={filtered.length}
            total={total}
            sort={sort}
            setSort={setSort}
            view={view}
            setView={setView}
            dense={dense}
            setDense={setDense}
          />

          <ActiveFilterChips lang={lang} filters={filters} setFilters={setFilters} />

          {view === 'split' ? (
            <div className="search-split" style={{ display: 'grid', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.length === 0
                  ? <EmptyState lang={lang} onReset={() => setFilters({})} />
                  : resultCards}
              </div>
              <SearchMap
                lang={lang}
                restaurants={filtered}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            </div>
          ) : view === 'map' ? (
            <SearchMap
              lang={lang}
              restaurants={filtered}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.length === 0
                ? <EmptyState lang={lang} onReset={() => setFilters({})} />
                : resultCards}
            </div>
          )}
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}

function Sliders() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

// ─── Exported page ──────────────────────────────────────────────────────────

export default function SearchClient({ restaurants, facets }) {
  return <SearchPage restaurants={restaurants} facets={facets} />;
}
