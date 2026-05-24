'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StatusBadge, Icon } from '@/components/atoms';
import { COPY } from '@/data/data';

// ── helpers ──────────────────────────────────────────────────────────────────

const DAYS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function todayHours(hours, lang) {
  if (!hours?.length) return null;
  const today = new Date().getDay();
  const h = hours.find((d) => d.day === today);
  if (!h) return lang === 'de' ? 'Heute geschlossen' : 'Closed today';
  return `${h.open}–${h.close}`;
}

function mapsLink(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=walking`;
}

// ── sub-components ────────────────────────────────────────────────────────────

function LocationCard({ venue, lang }) {
  const hours = todayHours(venue.hours, lang);
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-card)',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>
            {venue.name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.pin size={12} />
            {venue.address}
          </div>
        </div>
        <StatusBadge status={venue.status} lang={lang} />
      </div>

      {/* Hours + phone row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
        {hours && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon.clock size={12} />
            {lang === 'de' ? 'Heute:' : 'Today:'} <strong style={{ color: 'var(--text-primary)' }}>{hours}</strong>
          </span>
        )}
        {venue.phone && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon.phone size={12} />
            {venue.phone}
          </span>
        )}
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
        <a
          href={mapsLink(venue.address)}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            padding: '8px 14px', borderRadius: 999,
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            transition: 'opacity 0.15s',
          }}
        >
          <Icon.pin size={12} />
          {lang === 'de' ? 'Navigation' : 'Navigate'}
        </a>

        {venue.phone && (
          <a
            href={`tel:${venue.phone}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(75,85,99,0.25)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '8px 14px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}
          >
            <Icon.phone size={12} />
            {lang === 'de' ? 'Anrufen' : 'Call'}
          </a>
        )}

        {venue.website && (
          <a
            href={venue.website.startsWith('http') ? venue.website : `https://${venue.website}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(75,85,99,0.25)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '8px 14px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}
          >
            <Icon.arrow size={12} />
            Website
          </a>
        )}

        <button
          onClick={() => window.location.href = '/r/' + venue.id}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            padding: '8px 14px', borderRadius: 999,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {lang === 'de' ? 'Details' : 'Details'}
          <Icon.arrow size={12} />
        </button>
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function ChainDetail({ chain, venues }) {
  const router = useRouter();
  const [lang, setLang] = useState('de');
  const c = COPY[lang];

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('akiwi.lang') : null;
    if (stored && (stored === 'de' || stored === 'en')) setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('akiwi.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const totalReviews = venues.reduce((s, v) => s + (v.reviews || 0), 0);
  const bestRating = venues.reduce((best, v) => Math.max(best, v.rating || 0), 0);
  const tagline = lang === 'de' ? chain.tagline_de : chain.tagline_en;

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, ${chain.img[0]} 0%, ${chain.img[1]} 100%)`,
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(48px, 8vw, 96px) 24px clamp(40px, 6vw, 72px)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 30% 50%, hsla(${chain.accentHue}, 60%, 55%, 0.25) 0%, transparent 65%)`,
        }} />

        {/* Back button */}
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <button
            onClick={() => router.back()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              padding: '6px 14px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', marginBottom: 32,
            }}
          >
            ← {lang === 'de' ? 'Zurück' : 'Back'}
          </button>

          {/* Chain name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
            <h1 style={{
              margin: 0, fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.97)',
              lineHeight: 1.05,
            }}>{chain.name}</h1>
            <StatusBadge status={chain.status} lang={lang} />
          </div>

          {/* Tagline */}
          <p style={{
            margin: '0 0 24px',
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: 'rgba(255,255,255,0.80)',
            fontWeight: 500, lineHeight: 1.5,
            maxWidth: 560,
          }}>{tagline}</p>

          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {chain.categories.map((cat) => (
              <span key={cat} style={{
                padding: '5px 12px',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 999, fontSize: 13, fontWeight: 600,
                color: 'rgba(255,255,255,0.90)',
              }}>{cat}</span>
            ))}
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {[
              { label: lang === 'de' ? 'Filialen' : 'Locations', value: chain.venueIds.length },
              { label: lang === 'de' ? 'Beste Bewertung' : 'Best rating', value: bestRating > 0 ? `★ ${bestRating.toFixed(1)}` : '—' },
              { label: lang === 'de' ? 'Bewertungen' : 'Reviews', value: totalReviews > 0 ? totalReviews : '—' },
              { label: lang === 'de' ? 'Preisklasse' : 'Price range', value: chain.price },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.97)' }}>{value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations list ── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>
        <h2 style={{
          margin: '0 0 28px',
          fontSize: 'clamp(22px, 3vw, 30px)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
        }}>
          {lang === 'de' ? 'Alle Standorte' : 'All locations'}
          <span style={{
            marginLeft: 12,
            fontSize: 15, fontWeight: 600,
            color: 'var(--text-secondary)',
            background: 'rgba(75,85,99,0.25)',
            border: '1px solid var(--border)',
            padding: '3px 10px', borderRadius: 999,
          }}>{chain.venueIds.length}</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {venues.map((venue) => (
            <LocationCard key={venue.id} venue={venue} lang={lang} />
          ))}
        </div>

        {/* Owner CTA */}
        <div style={{
          marginTop: 56, padding: '28px 32px',
          background: 'var(--card)',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--radius-card)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            {lang === 'de' ? 'Bist du der Betreiber?' : 'Are you the owner?'}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
            {lang === 'de'
              ? 'Übernimm dein Profil, aktualisiere Öffnungszeiten, Fotos und Halal-Status.'
              : 'Claim your profile, update opening hours, photos, and halal status.'}
          </div>
          <button
            onClick={() => router.push('/for-owners')}
            style={{
              background: 'var(--accent)', color: 'var(--text-on-accent)',
              border: 'none', borderRadius: 999,
              padding: '12px 24px', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {lang === 'de' ? 'Eintrag beanspruchen →' : 'Claim listing →'}
          </button>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
