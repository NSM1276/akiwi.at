'use client';
import { useState, useEffect } from 'react';
import { DETAIL_COPY } from '@/data/venues';
import Header from '@/components/Header';
import Gallery from '@/components/Gallery';
import Hours from '@/components/Hours';
import { Menu, Reviews, Verification, SimilarList, MiniMap, Amenities } from '@/components/detail-sections';
import { StatusBadge, StatusDot, Icon } from '@/components/atoms';

export default function Detail({ venue }) {
  const v = venue;
  const [lang, setLang] = useState('de');
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('akiwi.lang') : null;
    if (stored && (stored === 'de' || stored === 'en')) setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('akiwi.lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const c = DETAIL_COPY[lang];
  const breadcrumb = [
    lang === 'de' ? 'Home' : 'Home',
    `${lang === 'de' ? 'Bezirk' : 'District'} ${v.district}`,
    v.name,
  ];

  const sections = [
    ['overview',     c.sections.info],
    ['hours',        c.sections.hours],
    ['menu',         c.sections.menu],
    ['reviews',      c.sections.reviews],
    ['verification', c.sections.verification],
    ['similar',      c.sections.similar],
  ];

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <div className="ak-anchor-nav">
        <div className="ak-anchor-nav-inner">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}
               onClick={() => setActive(id)}>
              {label}
            </a>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16, display: 'flex', gap: 6 }}>
          {breadcrumb.map((b, i) => {
            const href = i === 0 ? '/' : i === 1 ? '/search' : '#';
            return (
              <span key={i} style={{ display: 'inline-flex', gap: 6 }}>
                {i > 0 && <span>›</span>}
                <a href={href} style={{
                  color: i === breadcrumb.length - 1 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  textDecoration: 'none', fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
                }}>{b}</a>
              </span>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
              <StatusBadge status={v.status} lang={lang} />
              <span style={{
                padding: '4px 10px', background: 'rgba(75,85,99,0.3)',
                border: '1px solid var(--border)', borderRadius: 999,
                fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
              }}>{v.price}</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: 'var(--accent)', fontSize: 13, fontWeight: 700,
              }}>
                <Icon.star size={12} /> {v.rating.toFixed(1)}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, marginLeft: 4 }}>
                  ({v.reviews})
                </span>
              </span>
            </div>
            <h1 style={{
              margin: 0, fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 700,
              letterSpacing: '-0.025em', lineHeight: 1.05,
            }}>{v.name}</h1>
            <p style={{ margin: '10px 0 0', fontSize: 16, color: 'var(--text-secondary)', maxWidth: 560 }}>
              {lang === 'de' ? v.tagline_de : v.tagline_en}
            </p>
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(v.tags || []).map((t) => (
                <span key={t} style={{
                  padding: '4px 10px', borderRadius: 999,
                  background: 'rgba(75,85,99,0.3)', border: '1px solid var(--border)',
                  fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(v.address)}`}
               target="_blank" rel="noopener" style={btn('accent')}>
              <Icon.pin size={14} /> {c.actions.directions}
            </a>
            <a href={`tel:${v.phone}`} style={btn('ghost')}>📞 {c.actions.call}</a>
          </div>
        </div>

        <Gallery venue={v} lang={lang} />

        <div className="ak-detail-grid" style={{ marginTop: 32 }}>
          <div>
            <section id="overview" className="ak-section">
              <h2 className="ak-section-h">{c.sections.info}</h2>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 640 }}>
                {lang === 'de'
                  ? 'Familiengeführtes Lokal mit echtem Holzkohle-Grill. Halal-Fleisch von einem zertifizierten Wiener Lieferanten. Tische auch für Gruppen, Lieferung über die eigene Hotline.'
                  : 'Family-run venue with a proper charcoal grill. Halal meat from a certified Vienna supplier. Tables for groups; delivery via their own hotline.'}
              </p>
              <div style={{ marginTop: 24 }}>
                <h3 style={{
                  margin: '0 0 10px', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                }}>{c.sections.amenities}</h3>
                <Amenities venue={v} lang={lang} />
              </div>
            </section>

            <section id="hours" className="ak-section">
              <h2 className="ak-section-h">{c.sections.hours}</h2>
              <Hours venue={v} lang={lang} />
            </section>

            <section id="menu" className="ak-section">
              <h2 className="ak-section-h">{c.sections.menu}</h2>
              <Menu venue={v} lang={lang} />
            </section>

            <section id="reviews" className="ak-section">
              <h2 className="ak-section-h">{c.sections.reviews}</h2>
              <Reviews venue={v} lang={lang} />
            </section>

            <section id="verification" className="ak-section">
              <h2 className="ak-section-h">{c.verifiedHistory}</h2>
              <Verification venue={v} lang={lang} />
            </section>

            <section id="similar" className="ak-section">
              <h2 className="ak-section-h">{c.sections.similar}</h2>
              <SimilarList venue={v} lang={lang} />
            </section>

            <button style={{
              marginTop: 24, marginBottom: 8,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', padding: '10px 16px',
              borderRadius: 999, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>⚠ {c.reportIssue}</button>
          </div>

          <aside className="ak-detail-aside">
            <div style={asideCard}>
              <h3 style={asideH}>{c.sections.address}</h3>
              <MiniMap venue={v} />
              <div style={{ padding: '12px 0', fontSize: 14, fontWeight: 600 }}>
                {v.address}
              </div>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(v.address)}`}
                 target="_blank" rel="noopener" style={{
                fontSize: 13, color: 'var(--accent)', fontWeight: 600,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {c.minDirections} →
              </a>
            </div>

            <div style={asideCard}>
              <h3 style={asideH}>{lang === 'de' ? 'Kontakt' : 'Contact'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {v.phone && (
                  <a href={`tel:${v.phone}`} style={contactRow}>
                    <span style={{ color: 'var(--text-tertiary)', width: 16 }}>📞</span>
                    <span>{v.phone}</span>
                  </a>
                )}
                {v.website && (
                  <a href={v.website.startsWith('http') ? v.website : `https://${v.website}`}
                     target="_blank" rel="noopener" style={contactRow}>
                    <span style={{ color: 'var(--text-tertiary)', width: 16 }}>↗</span>
                    <span>{v.website}</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 30,
        background: 'rgba(31,41,55,0.95)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusDot status={v.status} size={10} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {v.address}
            </div>
          </div>
        </div>
        {v.phone && <a href={`tel:${v.phone}`} style={btn('ghost', 'sm')}>📞 {c.actions.call}</a>}
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(v.address)}`}
           target="_blank" rel="noopener" style={btn('accent', 'sm')}>
          <Icon.pin size={12} /> {c.actions.directions}
        </a>
      </div>
    </>
  );
}

function btn(variant, size) {
  const padding = size === 'sm' ? '8px 12px' : '10px 16px';
  const fs = size === 'sm' ? 12 : 13;
  if (variant === 'accent') {
    return {
      padding, fontSize: fs, fontWeight: 700,
      background: 'var(--accent)', color: 'var(--text-on-accent)',
      border: 'none', borderRadius: 999, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'inherit', whiteSpace: 'nowrap', textDecoration: 'none',
    };
  }
  return {
    padding, fontSize: fs, fontWeight: 600,
    background: 'var(--card)', color: 'var(--text-primary)',
    border: '1px solid var(--border)', borderRadius: 999, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'inherit', whiteSpace: 'nowrap', textDecoration: 'none',
  };
}

const asideCard = {
  background: 'var(--card)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-card)', padding: 16,
};
const asideH = {
  margin: '0 0 12px', fontSize: 12, fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  color: 'var(--text-tertiary)',
};
const contactRow = {
  display: 'flex', alignItems: 'center', gap: 10,
  textDecoration: 'none', color: 'var(--text-primary)', fontSize: 14, fontWeight: 500,
};
