'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/navigation';
import { COPY } from '@/data/data';
import { Icon, StatusDot } from './atoms';

// =========================================================
// Ticker — running strip with restaurant names and statuses
// =========================================================
const HeroTicker = memo(function HeroTicker({ rtl = false, restaurants }) {
  const data = restaurants || [];
  if (!data.length) return null;
  // Duplicate so the marquee loops seamlessly
  const items = [...data, ...data];
  return (
    <div
      className={`hero-ticker ${rtl ? 'hero-ticker-rtl hero-ticker-bottom' : 'hero-ticker-top'}`}
      aria-hidden
    >
      <div className="hero-ticker-track">
        {items.map((r, i) => {
          const color =
            r.status === 'verified' ? 'var(--status-green)' :
            r.status === 'self'     ? 'var(--status-yellow)' :
                                      'var(--status-red)';
          return (
            <span key={`${r.id}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 28 }}>
              <span className="hero-ticker-item">
                <span className="hero-ticker-dot" style={{ background: color }} />
                <span>{r.name}</span>
                <span style={{
                  color: 'var(--text-tertiary)', fontWeight: 500, fontSize: 12, marginLeft: 4,
                }}>· {r.districtName}</span>
              </span>
              <span className="hero-ticker-sep" />
            </span>
          );
        })}
      </div>
    </div>
  );
});

// =========================================================
// Word morph — слово в подзаголовке плавно сменяется
// =========================================================
const WordMorph = memo(function WordMorph({ words, interval = 2400 }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    const reduce = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setI((x) => (x + 1) % words.length);
        setPhase('in');
      }, 280);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const word = words[i];
  // Reserve width to avoid layout jump — invisible spacer of longest word
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span style={{ display: 'inline-block', position: 'relative', verticalAlign: 'baseline' }}>
      {/* Width reserved through CSS content, so the spacer word is not page text. */}
      <span aria-hidden className="ak-morph-spacer" data-word={longest} />

      <span
        key={word}
        style={{
          position: 'absolute', inset: 0,
          display: 'inline-flex', alignItems: 'baseline',
          color: 'var(--accent)', fontWeight: 700,
          whiteSpace: 'nowrap',
          opacity: phase === 'in' ? 1 : 0,
          transform: phase === 'in' ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 280ms var(--ease-out), transform 280ms var(--ease-out)',
        }}
      >
        {word}
      </span>
    </span>
  );
});

// =========================================================
// Animated count-up with pulsing dot
// =========================================================
const AnimatedCount = memo(function AnimatedCount({ to, durationMs = 1400 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    if (reduce) {
      raf = requestAnimationFrame(() => setN(to));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{n}</span>;
});

// =========================================================
// Hero
// =========================================================
export default function Hero({ lang, query, setQuery, restaurants, venueCount }) {
  const c = COPY[lang];
  const router = useRouter();
  const [focused, setFocused] = useState(false);

  const morphWords = lang === 'de'
    ? ['Restaurants', 'Cafés', 'Kebab-Spots', 'Falafel-Lokale', 'Imbisse', 'Bäckereien']
    : ['restaurants', 'cafés', 'kebab spots', 'falafel places', 'snack bars', 'bakeries'];

  return (
    <section
      style={{
        position: 'relative',
        maxWidth: 1280, margin: '0 auto',
        padding: '64px 24px 40px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        minHeight: 560,
      }}
    >
      <HeroTicker restaurants={restaurants} />
      <HeroTicker rtl restaurants={restaurants} />

      <div
        style={{
          position: 'relative', zIndex: 1, width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        {/* Eyebrow with live counter */}
        <div
          className="hero-eyebrow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            border: '1px solid var(--border)',
            background: 'rgba(31,41,55,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: 999,
            fontSize: 12, fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: 28,
            letterSpacing: '0.02em',
          }}
        >
          <span
            className="hero-pulse-dot"
            aria-hidden
            style={{
              position: 'relative',
              width: 8, height: 8, borderRadius: 999,
              background: 'var(--status-green)',
              boxShadow: '0 0 0 3px rgba(16,185,129,0.18)',
              flexShrink: 0,
            }}
          />
          <span>
            <b style={{ color: 'var(--text-primary)', fontWeight: 700, marginRight: 2 }}>
              <AnimatedCount to={venueCount} />
            </b>
            {lang === 'de' ? ' Lokale in Österreich' : ' venues across Austria'}
          </span>
        </div>

        {/* Big wordmark — the h1 is the tagline below, which says what the site is. */}
        <div
          className="ak-hero-title"
          style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            margin: 0,
            color: 'var(--accent)',
          }}
        >
          akiwi<span style={{ color: 'var(--text-primary)' }}>.at</span>
        </div>

        {/* Tagline with word morph */}
        <h1
          style={{
            marginTop: 20, marginBottom: 0,
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          {lang === 'de' ? (
            <>Halal-freundliche <WordMorph words={morphWords} /> in Wien &amp; Österreich entdecken</>
          ) : (
            <>Discover halal-friendly <WordMorph words={morphWords} /> in Vienna &amp; across Austria</>
          )}
        </h1>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push('/search' + (query ? '?q=' + encodeURIComponent(query) : ''));
          }}
          style={{
            marginTop: 36,
            width: '100%', maxWidth: 620,
            display: 'flex', alignItems: 'center',
            background: 'var(--card)',
            border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 999,
            padding: '6px 6px 6px 20px',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
            boxShadow: focused ? '0 0 0 4px rgba(163,230,53,0.12)' : 'none',
          }}
        >
          <span
            style={{
              color: focused ? 'var(--accent)' : 'var(--text-secondary)',
              display: 'flex', marginRight: 10,
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}
          >
            <Icon.search size={20} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={c.searchPlaceholder}
            style={{
              flex: 1, minWidth: 0,
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: 16, padding: '12px 0',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                background: 'transparent', border: 'none', color: 'var(--text-secondary)',
                padding: 8, cursor: 'pointer', display: 'flex',
              }}
              aria-label="Clear"
            >
              <Icon.close />
            </button>
          )}
          <button
            type="submit"
            style={{
              background: 'var(--accent)',
              color: 'var(--text-on-accent)',
              border: 'none', borderRadius: 999,
              padding: '10px 18px',
              fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background var(--dur-fast) var(--ease-out)',
            }}
          >
            {lang === 'de' ? 'Suchen' : 'Search'}
          </button>
        </form>

        {/* Quick chips */}
        <div
          style={{
            marginTop: 20, display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: 8,
          }}
        >
          {(lang === 'de'
            ? ['Kebab in 1070', 'Cafés mit Terrasse', 'Vegan', 'Verifiziert']
            : ['Kebab in 1070', 'Cafés with terrace', 'Vegan', 'Verified']
          ).map((t) => (
            <button
              key={t}
              onClick={() => setQuery(t)}
              style={{
                background: 'rgba(31,41,55,0.5)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                borderRadius: 999,
                fontFamily: 'inherit', fontSize: 12, fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
