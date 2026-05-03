'use client';
import { COPY } from '@/data/data';

const HREF_MAP = {
  'Home': '/', 'Submit': '/for-owners', 'Eintragen': '/for-owners',
  'Karte': '/search', 'Map': '/search', 'Bezirke': '/search', 'Districts': '/search',
  'Über uns': '/about', 'About': '/about',
  'Impressum': '/impressum', 'Imprint': '/impressum',
  'Datenschutz': '/datenschutz', 'Privacy': '/datenschutz',
  'Kontakt': '/about', 'Contact': '/about',
};

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
        gridTemplateColumns: 'minmax(240px, 1.3fr) repeat(2, minmax(140px, 1fr)) minmax(260px, 1.4fr)',
        gap: 48,
      }} className="ak-footer-grid">
        <div>
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
                  <a href={HREF_MAP[item] || '#'} style={{
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 500,
                    transition: 'color var(--dur-fast) var(--ease-out)',
                  }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 style={{
            margin: '0 0 14px', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
          }}>{c.newsletter}</h4>
          <form onSubmit={(e) => e.preventDefault()} style={{
            display: 'flex',
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 999, padding: 4,
          }}>
            <input placeholder={lang === 'de' ? 'deine@email.at' : 'you@email.com'} style={{
              flex: 1, minWidth: 0,
              background: 'transparent', border: 'none', outline: 'none',
              padding: '8px 14px',
              color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: 14,
            }} />
            <button style={{
              background: 'var(--accent)', color: 'var(--text-on-accent)',
              border: 'none', borderRadius: 999,
              padding: '8px 16px', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{c.newsletterCta}</button>
          </form>
          <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--text-tertiary)' }}>
            {lang === 'de'
              ? 'Keine Werbung. Jederzeit abbestellen.'
              : 'No spam. Unsubscribe anytime.'}
          </p>
        </div>
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
