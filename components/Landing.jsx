'use client';
// Landing.jsx — shared page body for the city, district, category and dish pages.
// Everything it shows comes from data/landing.js; no copy is invented here.

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { StatusBadge, District, Crumbs, Icon } from '@/components/atoms';
import { formatEuro, parsePrice } from '@/data/dishes';

const AUSTRIA = { de: 'Österreich', en: 'Austria' };

function intro(kind, name, stats, districtCount, cityCount, lang, place, prices) {
  const de = lang === 'de';
  const n = stats.total;
  const where =
    kind === 'category' || kind === 'dish'
      ? (de ? `in ${place.de}` : `in ${place.en}`)
      : (de ? `in ${name}` : `in ${name}`);

  const what = kind === 'dish'
    ? (de ? `${n} halal-freundliche Lokale mit ${name} auf der Speisekarte` : `${n} halal-friendly venues with ${name} on the menu`)
    : kind === 'category'
      ? (de ? `${n} halal-freundliche Lokale mit ${name}` : `${n} halal-friendly venues serving ${name}`)
      : (de ? `${n} halal-freundliche Lokale` : `${n} halal-friendly venues`);

  const priceText = prices && prices.min != null
    ? (prices.min === prices.max
      ? (de ? ` Preis laut Karte: ${formatEuro(prices.min)}.` : ` Price on the menu: ${formatEuro(prices.min)}.`)
      : (de ? ` Preise laut Karte: ${formatEuro(prices.min)} bis ${formatEuro(prices.max)}.` : ` Menu prices: ${formatEuro(prices.min)} to ${formatEuro(prices.max)}.`))
    : '';

  const spread =
    districtCount > 1 ? (de ? `, verteilt auf ${districtCount} Bezirke` : `, across ${districtCount} districts`)
    : cityCount > 1 ? (de ? `, verteilt auf ${cityCount} Städte` : `, across ${cityCount} cities`)
    : '';

  const parts = [];
  if (stats.verified) parts.push(de ? `${stats.verified} verifiziert` : `${stats.verified} verified`);
  if (stats.self) parts.push(de ? `${stats.self} mit Selbstauskunft` : `${stats.self} self-declared`);
  if (stats.unknown) parts.push(de ? `${stats.unknown} ungeprüft` : `${stats.unknown} unverified`);

  const first = de
    ? `Akiwi listet ${what} ${where}${spread}.`
    : `Akiwi lists ${what} ${where}${spread}.`;
  const second = parts.length
    ? (de ? ` Davon ${parts.join(', ')}.` : ` Of those, ${parts.join(', ')}.`)
    : '';

  return first + priceText + second;
}

function heading(kind, name, lang, place) {
  const de = lang === 'de';
  if (kind === 'city') return de ? `Halal-freundliche Restaurants in ${name}` : `Halal-friendly restaurants in ${name}`;
  if (kind === 'district') return de ? `Halal-freundliche Lokale in ${name}` : `Halal-friendly venues in ${name}`;
  return de ? `Halal ${name} in ${place.de}` : `Halal ${name} in ${place.en}`;
}

const STATUS_TEXT = {
  verified: { de: 'Halal-Status laut Betreiber bzw. Website des Lokals bestätigt.', en: "Halal status confirmed by the venue's owner or website." },
  self: { de: 'Vom Inhaber selbst angegeben. Noch keine Vor-Ort-Prüfung durch Akiwi.', en: 'Declared by the owner. No on-site check by Akiwi yet.' },
  unknown: { de: 'Status unklar — bitte prüfe direkt im Lokal.', en: 'Status unclear — please check directly at the venue.' },
};

export default function Landing({
  kind, name, venues, stats, related, relatedKind,
  cities = [], districtCount = 0, breadcrumb, searchHref,
  place = AUSTRIA, prices = null,
}) {
  const [lang, setLang] = useLang();
  const de = lang === 'de';

  const relatedTitle =
    relatedKind === 'districts' ? (de ? 'Nach Bezirk' : 'By district')
    : relatedKind === 'cities' ? (de ? 'Andere Städte' : 'Other cities')
    : relatedKind === 'dishes' ? (de ? 'Andere Gerichte' : 'Other dishes')
    : (de ? 'Andere Kategorien' : 'Other categories');

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="ak-wrap ak-main">
        <Crumbs trail={breadcrumb} current={name} />

        <h1 className="ak-h1">{heading(kind, name, lang, place)}</h1>
        <p className="ak-lead" style={{ marginTop: 12 }}>
          {intro(kind, name, stats, districtCount, cities.length, lang, place, prices)}
        </p>

        {stats.topCategories.length > 1 && (
          <div className="ak-chips ak-chips--scroll" style={{ marginTop: 16 }}>
            {stats.topCategories.map((c) => (
              <Link key={c.name} href={c.href} className="ak-chip">
                {c.name} <span className="ak-count">{c.count}</span>
              </Link>
            ))}
          </div>
        )}

        {cities.length > 1 && (
          <div style={{ marginTop: 20 }}>
            <h2 className="ak-subh">{de ? 'Nach Stadt' : 'By city'}</h2>
            <div className="ak-chips">
              {cities.map((c) => (
                <Link key={c.href} href={c.href} className="ak-chip">
                  {c.label} <span className="ak-count">{c.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <section style={{ marginTop: 32 }}>
          <h2 className="ak-section-h">
            {de ? 'Alle Lokale' : 'All venues'}
            <span className="ak-district">{venues.length}</span>
          </h2>

          <ul className="ak-list">
            {venues.map((v) => (
              <li key={v.id}>
                <Link href={`/r/${v.id}`} className="ak-list-row">
                  <District district={v.district} city={v.city} green={v.status === 'verified'} />
                  <span style={{ minWidth: 0 }}>
                    <span className="ak-list-title">{v.name}</span>
                    <span style={{ display: 'block', marginTop: 6 }}>
                      <StatusBadge status={v.status} lang={lang} compact />
                    </span>
                    <span className="ak-card-meta" style={{ display: 'block', marginTop: 6 }}>
                      {v.address}
                      <br />
                      {v.categories.join(' · ')} · {v.price}
                      {v.chain && <> · <span style={{ color: 'var(--green-ink)', fontWeight: 600 }}>{v.chain.name}</span></>}
                    </span>
                    {v.items && (
                      <span style={{ display: 'block', marginTop: 8, borderTop: '1px dashed var(--rule-soft)' }}>
                        {v.items.map((it) => (
                          <span key={it.name_de} className="ak-menu-row" style={{ fontSize: 13 }}>
                            <span>{de ? it.name_de : it.name_en}</span>
                            {parsePrice(it.price) != null && <span className="ak-price" style={{ fontSize: 13 }}>{formatEuro(parsePrice(it.price))}</span>}
                          </span>
                        ))}
                        {v.itemCount > v.items.length && (
                          <span className="ak-data ak-muted" style={{ display: 'block', paddingTop: 6 }}>
                            {de ? `+ ${v.itemCount - v.items.length} weitere auf der Speisekarte` : `+ ${v.itemCount - v.items.length} more on the menu`}
                          </span>
                        )}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2 className="ak-section-h">{relatedTitle}</h2>
            <div className="ak-chips">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="ak-chip">
                  {r.label} <span className="ak-count">{r.count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="ak-panel" style={{ marginTop: 36 }}>
          <h2 className="ak-subh">{de ? 'Was der Halal-Status bedeutet' : 'What the halal status means'}</h2>
          <dl style={{ margin: 0, display: 'grid', gap: 12 }}>
            {['verified', 'self', 'unknown'].map((s) => (
              <div key={s}>
                <dt><StatusBadge status={s} lang={lang} compact /></dt>
                <dd className="ak-muted" style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.5 }}>{STATUS_TEXT[s][lang]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p style={{ marginTop: 24 }}>
          <Link href={searchHref} className="ak-btn ak-btn--ink">
            <Icon.search size={14} /> {de ? 'Im Katalog filtern' : 'Filter in the catalogue'}
          </Link>
        </p>
      </main>

      <Footer lang={lang} />
    </>
  );
}
