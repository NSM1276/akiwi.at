'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StatusBadge, District, Crumbs, Icon } from '@/components/atoms';
import { useLang } from '@/components/LangProvider';
import { useNow } from '@/components/useNow';

function mapsLink(address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/** Today's opening times. venues.js counts days from Monday = 0. */
function todayHours(hours, now, lang) {
  if (!now || !hours?.length) return null;
  const day = (now.getDay() + 6) % 7;
  const slots = hours.filter((h) => h.day === day && h.open && h.close);
  if (!slots.length) return lang === 'de' ? 'heute geschlossen' : 'closed today';
  return slots.map((h) => `${h.open}–${h.close}`).join(', ');
}

function Branch({ venue, lang, now }) {
  const de = lang === 'de';
  const hours = todayHours(venue.hours, now, lang);
  return (
    <li className="ak-card">
      <div className="ak-card-body">
        <div className="ak-row-between">
          <District district={venue.district} city={venue.districtName} green={venue.status === 'verified'} />
          <StatusBadge status={venue.status} lang={lang} compact />
        </div>
        <Link href={`/r/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="ak-card-title">{venue.name}</h3>
        </Link>
        <div className="ak-card-meta">{venue.address}</div>
        {(hours || venue.phone) && (
          <div className="ak-data" style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 14, color: 'var(--ink-2)' }}>
            {hours && <span><Icon.clock size={11} /> {de ? 'Heute' : 'Today'} {hours}</span>}
            {venue.phone && <span>{venue.phone}</span>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: venue.phone ? '1fr 1fr 1fr' : '1fr 1fr', gap: 6, marginTop: 12 }}>
          <Link href={`/r/${venue.id}`} className="ak-btn ak-btn--sm ak-btn--ink">{de ? 'Karte' : 'Menu'}</Link>
          {venue.phone && <a href={`tel:${venue.phone}`} className="ak-btn ak-btn--sm"><Icon.phone size={13} /> {de ? 'Anrufen' : 'Call'}</a>}
          <a href={mapsLink(venue.address)} target="_blank" rel="noopener noreferrer" className="ak-btn ak-btn--sm ak-btn--green">
            <Icon.pin size={13} /> {de ? 'Route' : 'Directions'}
          </a>
        </div>
      </div>
    </li>
  );
}

export default function ChainDetail({ chain, venues, about }) {
  const [lang, setLang] = useLang();
  const de = lang === 'de';
  const now = useNow();
  const tagline = de ? chain.tagline_de : chain.tagline_en;
  const cities = [...new Set(venues.map((v) => (v.district > 0 ? 'Wien' : v.districtName)))];

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <div className="ak-wrap" style={{ paddingTop: 18, paddingBottom: 20 }}>
          <Crumbs trail={[{ href: '/', label: 'Home' }]} current={chain.name} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <span className="ak-district ak-district--city">{venues.length} {de ? 'Filialen' : 'branches'}</span>
            <StatusBadge status={chain.status} lang={lang} />
            {chain.price && <span className="ak-data ak-muted">{chain.price}</span>}
          </div>
          <h1 className="ak-h1">{chain.name}</h1>
          <p className="ak-lead" style={{ marginTop: 10 }}>{tagline}</p>
          <div className="ak-tags" style={{ marginTop: 12 }}>
            {chain.categories.map((cat) => <span key={cat} className="ak-tag">{cat}</span>)}
            {cities.map((city) => <span key={city} className="ak-tag">{city}</span>)}
          </div>
          <p className="ak-muted" style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.65, maxWidth: 720 }}>
            {de ? about.de : about.en}
          </p>
        </div>

        <div className="ak-band ak-pattern" aria-hidden="true" />

        <div className="ak-wrap" style={{ paddingTop: 28 }}>
          <h2 className="ak-section-h">
            {de ? 'Alle Standorte' : 'All locations'}
            <span className="ak-district">{venues.length}</span>
          </h2>
          <ul className="ak-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {venues.map((venue) => (
              <Branch key={venue.id} venue={venue} lang={lang} now={now} />
            ))}
          </ul>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}
