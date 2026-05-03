'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { SEARCH_RESTAURANTS, SEARCH_COPY } from '@/data/search-data';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import SearchResultCard from '@/components/SearchResultCard';
import SearchMap from '@/components/SearchMap';
import { SearchHero, ResultsHeader, ActiveFilterChips, EmptyState } from '@/components/search-sections';

// ─── Filter + sort logic ────────────────────────────────────────────────────

function applyFilters(restaurants, query, filters) {
  const q = (query || '').toLowerCase().trim();
  return restaurants.filter((r) => {
    // Text search
    if (q) {
      const hay = [r.name, r.cuisine, r.districtName, ...(r.tags || []), ...(r.categories || [])]
        .join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    // Halal status
    if ((filters.halal || []).length && !filters.halal.includes(r.status)) return false;
    // Cuisine
    if ((filters.cuisine || []).length && !filters.cuisine.includes(r.cuisine)) return false;
    // District
    if ((filters.district || []).length && !filters.district.includes(r.district)) return false;
    // Price
    if ((filters.price || []).length && !filters.price.includes(r.price)) return false;
    // Services
    if ((filters.services || []).length) {
      const rSvc = r.services || [];
      if (!filters.services.every((s) => rSvc.includes(s))) return false;
    }
    // Dietary
    if ((filters.dietary || []).length) {
      const rDiet = r.dietary || [];
      if (!filters.dietary.every((d) => rDiet.includes(d))) return false;
    }
    // Open now
    if (filters.openNow && !r.openNow) return false;
    // Family
    if (filters.family && !r.family) return false;
    // Rating
    if (filters.rating && (r.rating || 0) < filters.rating) return false;

    return true;
  });
}

function applySort(restaurants, sort) {
  const arr = [...restaurants];
  switch (sort) {
    case 'rating':    return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'distance':  return arr.sort((a, b) => (a.distance || 999) - (b.distance || 999));
    case 'verified':  return arr.sort((a, b) => {
      const av = a.lastVerifiedDays ?? 9999;
      const bv = b.lastVerifiedDays ?? 9999;
      return av - bv;
    });
    case 'newest':    return arr.sort((a, b) => (a.addedDaysAgo || 999) - (b.addedDaysAgo || 999));
    case 'alpha':     return arr.sort((a, b) => a.name.localeCompare(b.name));
    default:          return arr; // relevance — keep filtered order
  }
}

// ─── Inner component (needs useSearchParams) ────────────────────────────────

function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Language
  const [lang, setLang] = useState('de');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('akiwi_lang');
      if (saved === 'en' || saved === 'de') setLang(saved);
    } catch {}
  }, []);
  const handleSetLang = (l) => {
    setLang(l);
    try { localStorage.setItem('akiwi_lang', l); } catch {}
  };

  // Search query from URL
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [where, setWhere] = useState('');

  // Filters / sort / view
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('list'); // 'list' | 'split' | 'map'
  const [dense, setDense] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL → query state
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  // Derived results
  const filtered = applySort(applyFilters(SEARCH_RESTAURANTS, query, filters), sort);
  const total = SEARCH_RESTAURANTS.length;

  const c = SEARCH_COPY[lang];

  const handleCardClick = useCallback((id) => {
    router.push(`/r/${id}`);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text-primary)' }}>
      <Header lang={lang} setLang={handleSetLang} />

      {/* Hero search bar */}
      <SearchHero
        lang={lang}
        query={query}
        setQuery={setQuery}
        where={where}
        setWhere={setWhere}
      />

      {/* Mobile filter toggle */}
      <div style={{
        display: 'none',
        maxWidth: 1280, margin: '0 auto', padding: '0 24px 12px',
      }} className="search-mobile-toggle">
        <button
          onClick={() => setMobileFiltersOpen((v) => !v)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px',
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 999,
            color: 'var(--text-primary)',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {c.showFilters}
          {Object.values(filters).some((v) => (Array.isArray(v) ? v.length : v)) && (
            <span style={{
              background: 'var(--accent)', color: 'var(--text-on-accent)',
              borderRadius: 999, fontSize: 10, fontWeight: 700,
              padding: '2px 6px',
            }}>
              {Object.values(filters).reduce((acc, v) => acc + (Array.isArray(v) ? v.length : (v ? 1 : 0)), 0)}
            </span>
          )}
        </button>
      </div>

      {/* Main layout */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px 48px',
        display: 'grid',
        gridTemplateColumns: view === 'map' ? '1fr' : '260px 1fr',
        gap: 28,
      }}>
        {/* Sidebar filters */}
        {view !== 'map' && (
          <div>
            <SearchFilters
              lang={lang}
              filters={filters}
              setFilters={setFilters}
              totalCount={total}
              visibleCount={filtered.length}
            />
          </div>
        )}

        {/* Results column */}
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
            /* Split view: list + map side-by-side */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.length === 0
                  ? <EmptyState lang={lang} onReset={() => setFilters({})} />
                  : filtered.map((r) => (
                    <div key={r.id} onClick={() => handleCardClick(r.id)} style={{ cursor: 'pointer' }}>
                      <SearchResultCard
                        r={r} lang={lang}
                        onHover={setHoveredId}
                        hovered={hoveredId === r.id}
                        dense
                      />
                    </div>
                  ))
                }
              </div>
              <SearchMap
                lang={lang}
                restaurants={filtered}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            </div>
          ) : view === 'map' ? (
            /* Map-only view */
            <SearchMap
              lang={lang}
              restaurants={filtered}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ) : (
            /* List view */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.length === 0
                ? <EmptyState lang={lang} onReset={() => setFilters({})} />
                : filtered.map((r) => (
                  <div key={r.id} onClick={() => handleCardClick(r.id)} style={{ cursor: 'pointer' }}>
                    <SearchResultCard
                      r={r} lang={lang}
                      onHover={setHoveredId}
                      hovered={hoveredId === r.id}
                      dense={dense}
                    />
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .search-mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Exported page (Suspense wrapper required for useSearchParams) ───────────

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Laden…</div>
      </div>
    }>
      <SearchPage />
    </Suspense>
  );
}
