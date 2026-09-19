'use client';
import { COPY } from '@/data/data';

export default function Footer({ lang }) {
  const c = COPY[lang];
  return (
    <footer style={{
      marginTop: 64,
      borderTop: '1px solid var(--border)',
      background: 'rgba(55,65,81,0.25)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '48px 24px 24px',
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 1.4fr) minmax(110px, 1fr) minmax(110px, 1fr)',
        gap: 48,
      }} className="ak-footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG logo, nothing for next/image to optimise */}
          <img src="/assets/logo.svg" height="28" alt="Akiwi.at" style={{ marginBottom: 16 }} />
          <p style={{
            margin: 0, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.55,
            maxWidth: 320,
          }}>{c.footerBlurb}</p>
        </div>

        {Object.entries(c.footerSections).map(([key, items]) => (
          <div key={key}>
            <h4 style={{
              margin: '0 0 14px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}>{c.footerSectionTitles[key]}</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((item) => (
                <li key={item}>
                  <a href={c.footerLinks[item] || '/'} style={{
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500,
                    transition: 'color var(--dur-fast) var(--ease-out)',
                  }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '20px 24px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        fontSize: 12, color: 'var(--text-tertiary)',
      }}>
        <span>{c.copyright}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {c.footerMadeWith}
        </span>
      </div>
    </footer>
  );
}
