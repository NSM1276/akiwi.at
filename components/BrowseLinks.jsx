'use client';
// BrowseLinks — the homepage entry points into the city, district and
// category pages. Without these links those pages would be orphans.

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';

export default function BrowseLinks({ cities, districts, categories }) {
  const [lang] = useLang();
  const de = lang === 'de';

  const groups = [
    { key: 'cities', title: de ? 'Nach Stadt' : 'By city', items: cities.map((c) => ({ ...c, label: c.name })) },
    { key: 'districts', title: de ? 'Nach Wiener Bezirk' : 'By Vienna district', items: districts },
    { key: 'categories', title: de ? 'Nach Kategorie' : 'By category', items: categories.map((c) => ({ ...c, label: c.name })) },
  ];

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 0' }}>
      <h2 className="ak-h2" style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 34px)' }}>
        {de ? 'Stöbern' : 'Browse'}
      </h2>
      <p style={{ margin: '8px 0 24px', color: 'var(--text-secondary)', fontSize: 15 }}>
        {de
          ? 'Alle Lokale nach Ort und Kategorie — jede Seite listet die Adressen.'
          : 'Every venue by place and category — each page lists the addresses.'}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 28,
      }}>
        {groups.map((g) => (
          <div key={g.key}>
            <h3 style={{
              margin: '0 0 12px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
            }}>{g.title}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.items.map((item) => (
                <Link key={item.href} href={item.href} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '6px 12px', borderRadius: 999,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}>
                  {item.label}
                  <span style={{ color: 'var(--text-tertiary)', marginLeft: 6 }}>{item.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
