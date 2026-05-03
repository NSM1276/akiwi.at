'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RESTAURANTS, COPY } from '@/data/data';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import ViennaMap from '@/components/Map';
import Footer from '@/components/Footer';

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState('de');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    district: null,
    categories: [],
  });
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('akiwi.lang') : null;
    if (stored && (stored === 'de' || stored === 'en')) setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('akiwi.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const filtered = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      if (filters.verifiedOnly && r.status !== 'verified') return false;
      if (filters.district && r.district !== filters.district) return false;
      if (filters.categories.length && !r.categories.some((c) => filters.categories.includes(c))) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${r.name} ${r.districtName} ${r.categories.join(' ')} ${r.tags.join(' ')} ${r.district}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filters, query]);

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
      <Hero lang={lang} query={query} setQuery={setQuery} />
      <FilterBar lang={lang} filters={filters} setFilters={setFilters} resultCount={filtered.length} />

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
                onClick={() => router.push('/r/' + r.id)}
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
