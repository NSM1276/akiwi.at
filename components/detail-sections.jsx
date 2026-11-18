'use client';
import { useState } from 'react';
import Link from 'next/link';
import { DETAIL_COPY } from '@/data/detail-copy';
import { Icon, StatusBadge, District } from './atoms';

// Items shown per category before "Alle … anzeigen".
const MENU_PEEK = 5;

// Lowest price in a category, for "ab € 6,90". Prices are strings like "6,90" or "6,90 / 8,90".
function lowestPrice(items) {
  const nums = items
    .flatMap((it) => String(it.price || '').match(/\d+(?:[.,]\d{1,2})?/g) || [])
    .map((p) => Number(p.replace(',', '.')))
    .filter((n) => n > 0);
  if (!nums.length) return null;
  return Math.min(...nums).toFixed(2).replace('.', ',');
}

function MenuCategory({ cat, index, c, de }) {
  const [open, setOpen] = useState(false);
  const from = lowestPrice(cat.items);
  // Fold only when it hides at least 3 items; hiding one or two is just an extra tap.
  const more = cat.items.length - MENU_PEEK >= 3 ? cat.items.length - MENU_PEEK : 0;
  const items = open || !more ? cat.items : cat.items.slice(0, MENU_PEEK);
  return (
    <div id={`menu-${index}`} className="ak-menu-cat">
      <h3 className="ak-menu-cat-h">
        <span>{de ? cat.cat_de : cat.cat_en}</span>
        {from && <span className="ak-price ak-muted">{c.menuFrom} € {from}</span>}
      </h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} className="ak-menu-row">
            <span style={{ fontSize: 15, fontWeight: 500 }}>
              {de ? it.name_de : it.name_en}
              {it.tag === 'V' && <span className="ak-veg">{c.veg}</span>}
              {it.tag === 'H' && <span className="ak-veg">{c.halalTag}</span>}
            </span>
            {it.price && <span className="ak-price">€ {it.price}</span>}
          </li>
        ))}
      </ul>
      {more > 0 && (
        <button type="button" className="ak-btn ak-btn--sm" style={{ marginTop: 10 }} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? c.menuLess : c.menuAll(cat.items.length)}
        </button>
      )}
    </div>
  );
}

export function Menu({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const de = lang === 'de';
  const cats = venue.menu.filter((cat) => (cat.items || []).length > 0);
  return (
    <div>
      {cats.length > 1 && (
        <nav className="ak-chips ak-chips--scroll" style={{ marginBottom: 18 }} aria-label={c.sections.menu}>
          {cats.map((cat, i) => (
            <a key={cat.cat_de} href={`#menu-${i}`} className="ak-chip">
              {de ? cat.cat_de : cat.cat_en} <span className="ak-count">{cat.items.length}</span>
            </a>
          ))}
        </nav>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {cats.map((cat, i) => <MenuCategory key={cat.cat_de} cat={cat} index={i} c={c} de={de} />)}
      </div>
    </div>
  );
}

export function Reviews({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  if (!venue.reviews) {
    return <p className="ak-muted" style={{ margin: 0, fontSize: 14 }}>{lang === 'de' ? 'Noch keine Bewertungen.' : 'No reviews yet.'}</p>;
  }
  return (
    <div className="ak-panel" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span className="ak-display" style={{ fontSize: 56 }}>{venue.rating.toFixed(1)}</span>
      <span>
        <span style={{ display: 'flex', gap: 2, color: 'var(--green)' }}>
          {[1, 2, 3, 4, 5].map((i) => <Icon.star key={i} size={14} />)}
        </span>
        <span className="ak-data ak-muted">{c.reviewsCount(venue.reviews)}</span>
      </span>
    </div>
  );
}

export function Verification({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const de = lang === 'de';
  return (
    <div>
      <p className="ak-muted" style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.55 }}>
        {{ verified: c.statusBlurbVerified, claimed: c.statusBlurbClaimed, self: c.statusBlurbSelf }[venue.status] || c.statusBlurbUnknown}
      </p>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '4px solid var(--green)' }}>
        {(venue.verification_log || []).map((e, i) => (
          <li key={i} style={{ padding: '2px 0 14px 14px' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{de ? e.event_de : e.event_en}</div>
            <div className="ak-data ak-muted" style={{ marginTop: 3 }}>
              {new Date(e.date).toLocaleDateString(de ? 'de-AT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {de ? e.actor_de : e.actor_en}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SimilarList({ venue, lang }) {
  return (
    <ul className="ak-list">
      {(venue.similar || []).map((s) => (
        <li key={s.id}>
          <Link href={`/r/${s.id}`} className="ak-list-row" style={{ gridTemplateColumns: 'auto minmax(0, 1fr) auto' }}>
            <District district={s.district} city="" />
            <span>
              <span className="ak-list-title">{s.name}</span>
              <span style={{ display: 'block', marginTop: 5 }}><StatusBadge status={s.status} lang={lang} compact /></span>
            </span>
            <span className="ak-data ak-muted">{s.distance_km} km</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Not a real map: the district as a big sign on the pattern band. */
export function MiniMap({ venue }) {
  return (
    <div className="ak-pattern--green" style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'var(--line) solid var(--ink)' }}>
      <span className="ak-district" style={{ minWidth: 64, height: 56, fontSize: venue.district > 0 ? 40 : 18, padding: '0 12px' }}>
        {venue.district > 0 ? venue.district : venue.districtName}
      </span>
    </div>
  );
}

const AMENITY_ICON = {
  parking: 'P', wheelchair: '♿', prayer: '✦', delivery: '→', outdoor: '☀', wifi: '◎',
};

export function Amenities({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const items = Object.entries(venue.amenities || {}).filter(([, v]) => v);
  if (!items.length) return null;
  return (
    <ul className="ak-chips" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map(([k]) => (
        <li key={k} className={`ak-chip${k === 'prayer' ? ' is-on' : ''}`} style={{ cursor: 'default' }}>
          <span aria-hidden="true" style={{ fontFamily: 'var(--font-data)' }}>{AMENITY_ICON[k]}</span>
          {c.amenityLabels[k]}
        </li>
      ))}
    </ul>
  );
}
