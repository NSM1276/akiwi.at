'use client';
// Landing.jsx — shared page body for the city, district, category and dish pages.
// Everything it shows comes from data/landing.js; no copy is invented here.

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { StatusBadge, Icon } from '@/components/atoms';
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

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 64px' }}>
        <nav aria-label="Breadcrumb" style={{
          fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16,
          display: 'flex', flexWrap: 'wrap', gap: 6,
        }}>
          {breadcrumb.map((b, i) => (
            <span key={b.href} style={{ display: 'inline-flex', gap: 6 }}>
              {i > 0 && <span aria-hidden>›</span>}
              <Link href={b.href} style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>{b.label}</Link>
            </span>
          ))}
          <span style={{ display: 'inline-flex', gap: 6 }}>
            <span aria-hidden>›</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{name}</span>
          </span>
        </nav>

        <h1 style={{
          margin: 0, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700,
          letterSpacing: '-0.025em', lineHeight: 1.08,
        }}>{heading(kind, name, lang, place)}</h1>

        <p style={{
          margin: '14px 0 0', fontSize: 16, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 680,
        }}>{intro(kind, name, stats, districtCount, cities.length, lang, place, prices)}</p>

        {stats.topCategories.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
            {stats.topCategories.map((c) => (
              <Link key={c.name} href={c.href} style={chipStyle}>
                {c.name} <span style={{ color: 'var(--text-tertiary)', marginLeft: 4 }}>{c.count}</span>
              </Link>
            ))}
          </div>
        )}

        {cities.length > 1 && (
          <section style={{ marginTop: 28 }}>
            <h2 style={sectionH}>{de ? 'Nach Stadt' : 'By city'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cities.map((c) => (
                <Link key={c.href} href={c.href} style={chipStyle}>
                  {c.label} <span style={{ color: 'var(--text-tertiary)', marginLeft: 4 }}>{c.count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 36 }}>
          <h2 style={sectionH}>
            {de ? 'Alle Lokale' : 'All venues'}
            <span style={countPill}>{venues.length}</span>
          </h2>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {venues.map((v) => (
              <li key={v.id}>
                <Link href={`/r/${v.id}`} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: 14,
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <span aria-hidden style={{
                    width: 44, height: 44, flexShrink: 0, borderRadius: 10,
                    background: `hsl(${v.hue}, 45%, 28%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 18, color: 'rgba(255,255,255,0.9)',
                  }}>{v.name.charAt(0)}</span>

                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <StatusBadge status={v.status} lang={lang} compact />
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{v.name}</span>
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, color: 'var(--text-secondary)',
                    }}>
                      <Icon.pin size={11} />
                      {v.address}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                      fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4,
                    }}>
                      <span>{v.categories.join(', ')}</span>
                      <span aria-hidden>·</span>
                      <span>{v.price}</span>
                      {v.chain && (
                        <>
                          <span aria-hidden>·</span>
                          <span style={{ color: 'var(--accent)' }}>{v.chain.name}</span>
                        </>
                      )}
                    </span>
                    {v.items && (
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
                        {v.items.map((it) => (
                          <span key={it.name_de} style={{
                            display: 'flex', gap: 10, justifyContent: 'space-between',
                            fontSize: 13, color: 'var(--text-secondary)',
                          }}>
                            <span>{de ? it.name_de : it.name_en}</span>
                            {parsePrice(it.price) != null && (
                              <span style={{ color: 'var(--accent)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                {formatEuro(parsePrice(it.price))}
                              </span>
                            )}
                          </span>
                        ))}
                        {v.itemCount > v.items.length && (
                          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
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
          <section style={{ marginTop: 40 }}>
            <h2 style={sectionH}>{relatedTitle}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {related.map((r) => (
                <Link key={r.href} href={r.href} style={chipStyle}>
                  {r.label} <span style={{ color: 'var(--text-tertiary)', marginLeft: 4 }}>{r.count}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{
          marginTop: 40, padding: 20,
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
        }}>
          <h2 style={{ ...sectionH, marginTop: 0 }}>{de ? 'Was der Halal-Status bedeutet' : 'What the halal status means'}</h2>
          <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['verified', de
                ? 'Halal-Status laut Betreiber bzw. Website des Lokals bestätigt.'
                : "Halal status confirmed by the venue's owner or website."],
              ['self', de
                ? 'Vom Inhaber selbst angegeben. Noch keine Vor-Ort-Prüfung durch Akiwi.'
                : 'Declared by the owner. No on-site check by Akiwi yet.'],
              ['unknown', de
                ? 'Status unklar — bitte prüfe direkt im Lokal.'
                : 'Status unclear — please check directly at the venue.'],
            ].map(([status, text]) => (
              <div key={status} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <dt style={{ flexShrink: 0 }}><StatusBadge status={status} lang={lang} compact /></dt>
                <dd style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1, minWidth: 220 }}>
                  {text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p style={{ marginTop: 28 }}>
          <Link href={searchHref} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 999,
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>
            <Icon.search size={14} />
            {de ? 'Im Katalog filtern' : 'Filter in the catalogue'}
          </Link>
        </p>
      </main>

      <Footer lang={lang} />
    </>
  );
}

const sectionH = {
  margin: '0 0 14px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em',
  display: 'flex', alignItems: 'center', gap: 10,
};

const countPill = {
  fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)',
  background: 'rgba(75,85,99,0.25)', border: '1px solid var(--border)',
  padding: '2px 9px', borderRadius: 999,
};

const chipStyle = {
  display: 'inline-flex', alignItems: 'center',
  padding: '6px 12px', borderRadius: 999,
  background: 'var(--card)', border: '1px solid var(--border)',
  color: 'var(--text-secondary)',
  fontSize: 13, fontWeight: 600, textDecoration: 'none',
};
