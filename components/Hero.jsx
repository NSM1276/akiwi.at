'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COPY } from '@/data/data';
import { Icon } from './atoms';

export default function Hero({ lang, query, setQuery, venueCount, cityCount, districts, dishes }) {
  const c = COPY[lang];
  const de = lang === 'de';
  const router = useRouter();

  // Busiest districts first, like the main stops on a line.
  const line = [...districts].sort((a, b) => b.count - a.count || a.district - b.district).slice(0, 7);

  return (
    <section className="ak-hero">
      <div className="ak-hero-grid">
        <div className="ak-hero-main">
          <div className="ak-kicker" style={{ marginBottom: 12 }}>
            {venueCount} {de ? 'Lokale' : 'venues'} · {cityCount} {de ? 'Städte' : 'cities'} · {districts.length} {de ? 'Wiener Bezirke' : 'Vienna districts'}
          </div>

          <h1 className="ak-display">
            {de
              ? <>Halal essen in <span className="ak-mark">Wien</span> &amp; Österreich</>
              : <>Halal food in <span className="ak-mark">Vienna</span> &amp; Austria</>}
          </h1>

          <p className="ak-lead" style={{ marginTop: 14 }}>
            {de
              ? 'Restaurants, Imbisse und Cafés — mit Adresse und ehrlichem Halal-Status.'
              : 'Restaurants, takeaways and cafés — with addresses and an honest halal status.'}
          </p>

          <form
            className="ak-search"
            style={{ marginTop: 18, maxWidth: 620 }}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/search' + (query ? '?q=' + encodeURIComponent(query) : ''));
            }}
          >
            <label htmlFor="hero-q" className="sr-only">{c.searchPlaceholder}</label>
            <input
              id="hero-q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={c.searchPlaceholder}
              autoComplete="off"
              enterKeyHint="search"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear"
                style={{ background: 'transparent', border: 0, padding: '0 10px', cursor: 'pointer', color: 'var(--ink-2)' }}>
                <Icon.close />
              </button>
            )}
            <button type="submit" className="ak-btn ak-btn--ink">
              <Icon.search size={16} /> {de ? 'Suchen' : 'Search'}
            </button>
          </form>

          {dishes.length > 0 && (
            <div className="ak-chips ak-chips--scroll" style={{ marginTop: 12 }}>
              {dishes.slice(0, 6).map((d) => (
                <Link key={d.href} href={d.href} className="ak-chip">
                  {d.name} <span className="ak-count">{d.count}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside className="ak-hero-line" aria-label={de ? 'Bezirke' : 'Districts'}>
          <div className="ak-subh">{de ? 'Wien · nach Bezirk' : 'Vienna · by district'}</div>
          <ul className="ak-line">
            {line.map((d) => (
              <li key={d.href}>
                <Link href={d.href}>
                  <span className="ak-district">{d.district}</span>
                  {d.name}
                  <span className="ak-data">{d.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/wien" className="ak-btn ak-btn--sm ak-btn--block" style={{ marginTop: 16 }}>
            {de ? 'Alle Bezirke' : 'All districts'} <Icon.arrow size={12} />
          </Link>
        </aside>
      </div>
    </section>
  );
}
