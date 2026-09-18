'use client';
import { useState, useMemo } from 'react';
import { COPY } from '@/data/data';
import { useLang } from '@/components/LangProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import ViennaMap from '@/components/Map';
import Footer from '@/components/Footer';

export default function HomeClient({ restaurants, venueCount, facets }) {
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

  const sized = useMemo(() => {
    return filtered.map((r, i) => {
      if (r.featured && i === 0) return { ...r, span: 'lg' };
      if (i === 3) return { ...r, span: 'md' };
      return { ...r, span: 'sm' };
    });
  }, [filtered]);

  const resetFilters = () => {
    setFilters({ verifiedOnly: false, district: null, categories: [] });
    setQuery('');
  };

  const c = COPY[lang];

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} query={query} setQuery={setQuery} restaurants={restaurants} venueCount={venueCount} />
      <FilterBar lang={lang} filters={filters} setFilters={setFilters} resultCount={filtered.length} facets={facets} />

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 0' }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '80px 24px', textAlign: 'center',
            border: '1px dashed var(--border)', borderRadius: 16,
            color: 'var(--text-secondary)',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              {c.emptyTitle}
            </div>
            <div style={{ fontSize: 14, marginBottom: 16 }}>{c.emptyBody}</div>
            <button onClick={resetFilters} style={{
              background: 'var(--accent)', color: 'var(--text-on-accent)',
              border: 'none', borderRadius: 999,
              padding: '10px 20px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{c.reset}</button>
          </div>
        ) : (
          <div className="bento">
            {sized.map((r) => (
              <RestaurantCard
                key={r.id} r={r} lang={lang} span={r.span}
                hoveredId={hoveredId} onHoverId={setHoveredId}
              />
            ))}
          </div>
        )}
      </section>

      <ViennaMap
        lang={lang}
        restaurants={filtered}
        filters={filters}
        hoveredId={hoveredId}
        setHoveredId={setHoveredId}
      />

      <Footer lang={lang} />
    </>
  );
}
