'use client';
// BrowseLinks — the homepage entry points into the city, district, category
// and dish pages. Without these links those pages would be orphans.

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';

export default function BrowseLinks({ cities, districts, categories, dishes = [] }) {
  const [lang] = useLang();
  const de = lang === 'de';

  const groups = [
    { key: 'districts', title: de ? 'Wien nach Bezirk' : 'Vienna by district', items: districts.map((d) => ({ href: d.href, label: d.name, count: d.count, badge: d.district })) },
    { key: 'dishes', title: de ? 'Nach Gericht' : 'By dish', items: dishes.map((d) => ({ href: d.href, label: d.name, count: d.count })) },
    { key: 'categories', title: de ? 'Nach Kategorie' : 'By category', items: categories.map((c) => ({ href: c.href, label: c.name, count: c.count })) },
    { key: 'cities', title: de ? 'Nach Stadt' : 'By city', items: cities.map((c) => ({ href: c.href, label: c.name, count: c.count })) },
  ].filter((g) => g.items.length > 0);

  return (
    <section className="ak-wrap" style={{ paddingTop: 48 }}>
      <h2 className="ak-h2">{de ? 'Stöbern' : 'Browse'}</h2>
      <p className="ak-lead" style={{ margin: '8px 0 24px' }}>
        {de
          ? 'Alle Lokale nach Bezirk, Kategorie und Stadt — jede Seite listet die Adressen.'
          : 'Every venue by district, category and city — each page lists the addresses.'}
      </p>

      <div style={{ display: 'grid', gap: 28 }}>
        {groups.map((g) => (
          <div key={g.key}>
            <h3 className="ak-subh">{g.title}</h3>
            <div className="ak-chips">
              {g.items.map((item) => (
                <Link key={item.href} href={item.href} className="ak-chip">
                  {item.badge && <span className="ak-district" style={{ minWidth: 24, height: 20, fontSize: 13, margin: '-2px 0 -2px -4px' }}>{item.badge}</span>}
                  {item.label}
                  <span className="ak-count">{item.count}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
