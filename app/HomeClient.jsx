'use client';
import { useState, useMemo } from 'react';
import { COPY } from '@/data/data';
import { useLang } from '@/components/LangProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import ViennaMap from '@/components/Map';
import BrowseLinks from '@/components/BrowseLinks';
import Footer from '@/components/Footer';

export default function HomeClient({ restaurants, venueCount, facets, browse }) {
  const [lang, setLang] = useLang();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    district: null,
    categories: [],
  });
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (filters.verifiedOnly && r.status !== 'verified') return false;
      // a chain matches if any of its branches sits in that district
      if (filters.district && !r.districts.includes(filters.district)) return false;
      if (filters.categories.length && !r.categories.some((c) => filters.categories.includes(c))) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${r.name} ${r.districtName} ${r.cities.join(' ')} ${r.categories.join(' ')} ${r.tags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [restaurants, filters, query]);

  const resetFilters = () => {
    setFilters({ verifiedOnly: false, district: null, categories: [] });
    setQuery('');
  };

  const c = COPY[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero
          lang={lang} query={query} setQuery={setQuery}
          venueCount={venueCount} cityCount={browse.cities.length}
          districts={browse.districts} dishes={browse.dishes}
        />
        <FilterBar lang={lang} filters={filters} setFilters={setFilters} resultCount={filtered.length} facets={facets} />

        <section className="ak-wrap" style={{ paddingTop: 20 }}>
          {filtered.length === 0 ? (
            <div className="ak-card" style={{ padding: '48px 20px', textAlign: 'center' }}>
              <div className="ak-h3">{c.emptyTitle}</div>
              <p className="ak-lead" style={{ margin: '8px auto 16px', fontSize: 14 }}>{c.emptyBody}</p>
              <button type="button" onClick={resetFilters} className="ak-btn ak-btn--ink">{c.reset}</button>
            </div>
          ) : (
            <div className="ak-grid">
              {filtered.map((r) => (
                <RestaurantCard key={r.id} r={r} lang={lang} onHoverId={setHoveredId} />
              ))}
            </div>
          )}
        </section>

        <BrowseLinks
          cities={browse.cities} districts={browse.districts}
          categories={browse.categories} dishes={browse.dishes}
        />

        <ViennaMap
          lang={lang}
          restaurants={filtered}
          filters={filters}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      </main>
      <Footer lang={lang} />
    </>
  );
}
