// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Listing builder
//
// Builds the card list for the homepage and the search page from
// VENUES (venues.js) and CHAINS (chains.js). Server-side only:
// call getListing() in a server component and pass the result as a prop.
// Never import this file from a 'use client' component — it pulls in
// the whole venue registry.
//
// A chain card aggregates its branches: it carries every city, district and
// amenity that at least one branch has, so a chain is found by any of them.
// ─────────────────────────────────────────────────────────────────────────────

import { VENUES } from './venues';
import { CHAINS } from './chains';

const STATUS_RANK = { unknown: 0, self: 1, verified: 2 };

export const AMENITY_KEYS = ['prayer', 'delivery', 'outdoor', 'wifi', 'wheelchair', 'parking'];
export const PRICE_LEVELS = ['€', '€€', '€€€'];

/** Lowest status among venues: a chain is only as verified as its least-verified branch. */
export function chainStatus(venues) {
  if (!venues.length) return 'unknown';
  return venues.reduce((min, v) =>
    STATUS_RANK[v.status] < STATUS_RANK[min] ? v.status : min, 'verified');
}

/** Weighted average rating and total reviews over venues that have reviews. */
export function chainRating(venues) {
  const rated = venues.filter((v) => v.reviews > 0);
  const reviews = rated.reduce((s, v) => s + v.reviews, 0);
  if (!reviews) return { rating: 0, reviews: 0 };
  const rating = rated.reduce((s, v) => s + v.rating * v.reviews, 0) / reviews;
  return { rating: Math.round(rating * 10) / 10, reviews };
}

/** "Erdbergstraße 93, 1030 Wien" → "Wien"; "… 1150 Wien (Westbahnhof)" → "Wien". */
export function cityOf(venue) {
  const m = venue.address.match(/\d{4}\s+([^,(]+)/);
  return m ? m[1].trim() : venue.districtName;
}

/** "Erdbergstraße 93, 1030 Wien" → "1030" */
function postalOf(venue) {
  const m = venue.address.match(/\b(\d{4})\b/);
  return m ? m[1] : '';
}

/** A price may span levels: '€–€€' → ['€', '€€']. */
export function priceLevels(price) {
  if (!price) return [];
  return PRICE_LEVELS.filter((p) => price.split(/[–-]/).map((s) => s.trim()).includes(p));
}

/** Union of amenities that at least one branch offers. */
function amenityList(venues) {
  return AMENITY_KEYS.filter((k) => venues.some((v) => v.amenities?.[k]));
}

/** Distinct opening intervals across branches: [{ d, o, c }], d 0=Mo…6=Su. */
function hourSet(venues) {
  const seen = new Set();
  const out = [];
  for (const v of venues) {
    for (const h of v.hours || []) {
      if (!h.open || !h.close) continue;
      const key = `${h.day}|${h.open}|${h.close}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ d: h.day, o: h.open, c: h.close });
    }
  }
  return out;
}

function facetsOf(venues, withHours) {
  const card = {
    cities: [...new Set(venues.map(cityOf))],
    districts: [...new Set(venues.map((v) => v.district))].filter((d) => d > 0).sort((a, b) => a - b),
    postals: [...new Set(venues.map(postalOf))].filter(Boolean),
    amenities: amenityList(venues),
  };
  if (withHours) card.hours = hourSet(venues);
  return card;
}

function chainLocation(venues) {
  const districts = [...new Set(venues.map((v) => v.district))];
  if (districts.length === 1 && districts[0] > 0) {
    return { district: districts[0], districtName: venues[0].districtName };
  }
  const cities = [...new Set(venues.map(cityOf))];
  if (cities.length === 1 && cities[0] === 'Wien') {
    return { district: 0, districtName: `Wien (${venues.length} Filialen)` };
  }
  if (cities.length > 3) return { district: 0, districtName: 'Österreichweit' };
  return { district: 0, districtName: cities.join(' · ') };
}

export function chainCard(chain, withHours) {
  const venues = chain.venueIds.map((id) => VENUES[id]).filter(Boolean);
  const primary = VENUES[chain.primaryId] || venues[0];
  return {
    id: chain.id,
    type: 'chain',
    locationCount: venues.length,
    name: chain.name,
    ...chainLocation(venues),
    status: chainStatus(venues),
    categories: chain.categories,
    tags: chain.tags,
    price: chain.price,
    ...chainRating(venues),
    x: primary.x, y: primary.y,
    img: chain.img, accentHue: chain.accentHue,
    featured: !!chain.featured,
    ...facetsOf(venues, withHours),
  };
}

export function venueCard(v, withHours) {
  const g = v.gallery[0];
  return {
    id: v.id,
    type: 'venue',
    name: v.name,
    district: v.district, districtName: v.districtName,
    status: v.status,
    categories: v.categories,
    tags: v.tags,
    price: v.price,
    rating: v.rating, reviews: v.reviews,
    x: v.x, y: v.y,
    img: [g.a, g.b], accentHue: g.hue,
    featured: !!v.featured,
    ...facetsOf([v], withHours),
  };
}

/**
 * Chains first (in chains.js order), then solo venues (in venues.js order).
 * `withHours` adds opening times — only the search page needs them.
 */
export function getListing({ withHours = false } = {}) {
  const inChain = new Set(Object.values(CHAINS).flatMap((c) => c.venueIds));
  const chains = Object.values(CHAINS).map((c) => chainCard(c, withHours));
  const solo = Object.values(VENUES)
    .filter((v) => !inChain.has(v.id))
    .map((v) => venueCard(v, withHours));
  return [...chains, ...solo];
}

/** Filter options, derived from the listing — never a hand-written list. */
export function getFacets(listing) {
  const count = (key) => {
    const n = {};
    for (const r of listing) for (const v of r[key]) n[v] = (n[v] || 0) + 1;
    return n;
  };
  const cats = count('categories');
  const cities = count('cities');
  const districts = new Set();
  for (const r of listing) for (const d of r.districts) districts.add(d);
  const amenities = new Set();
  for (const r of listing) for (const a of r.amenities) amenities.add(a);

  return {
    categories: Object.keys(cats).sort((a, b) => cats[b] - cats[a] || a.localeCompare(b, 'de')),
    cities: Object.keys(cities).sort((a, b) =>
      (a === 'Wien' ? -1 : b === 'Wien' ? 1 : 0) || a.localeCompare(b, 'de')),
    districts: [...districts].sort((a, b) => a - b),
    prices: PRICE_LEVELS,
    // Only statuses that exist: nobody is 'verified' until Akiwi has checked a document.
    halal: ['verified', 'self', 'unknown'].filter((s) => listing.some((r) => r.status === s)),
    amenities: AMENITY_KEYS.filter((k) => amenities.has(k)),
  };
}
