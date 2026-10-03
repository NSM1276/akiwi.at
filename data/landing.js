// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Landing page data (server-side only)
//
// City, district and category pages list real venues with their addresses,
// not chain cards: someone searching in Graz wants "Pizza Mann Graz Zentrum",
// not a chain with twelve branches.
//
// Never import from a 'use client' component — it pulls in the venue registry.
// ─────────────────────────────────────────────────────────────────────────────

import { VENUES } from './venues';
import { CHAINS } from './chains';
import { cityOf } from './listing';
import {
  CITY_SLUGS, CATEGORY_SLUGS, DISTRICT_SLUGS, DISTRICT_NAMES,
  slugify, districtSlug, postalCode, cityHref, districtHref, categoryHref, dishHref,
} from './slugs';
import { DISHES, MIN_DISH_VENUES, dishItems, parsePrice } from './dishes';

// A category needs at least this many venues to earn its own page.
const MIN_CATEGORY_VENUES = 2;

const venues = Object.values(VENUES);

/** venue id → { id, name } of the chain it belongs to */
const CHAIN_OF = (() => {
  const map = {};
  for (const chain of Object.values(CHAINS)) {
    for (const id of chain.venueIds) map[id] = { id: chain.id, name: chain.name };
  }
  return map;
})();

function venueSummary(v) {
  return {
    id: v.id,
    name: v.name,
    address: v.address,
    city: cityOf(v),
    district: v.district,
    districtName: v.districtName,
    status: v.status,
    categories: v.categories,
    price: v.price,
    hue: v.gallery?.[0]?.hue ?? 0,
    chain: CHAIN_OF[v.id] || null,
  };
}

function statsOf(list) {
  const counts = { verified: 0, self: 0, unknown: 0 };
  const categories = {};
  for (const v of list) {
    counts[v.status] = (counts[v.status] || 0) + 1;
    for (const c of v.categories) categories[c] = (categories[c] || 0) + 1;
  }
  return {
    total: list.length,
    ...counts,
    topCategories: Object.entries(categories)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
      .slice(0, 6)
      .map(([name, count]) => ({ name, count, href: categoryHref(name) })),
  };
}

const byName = (a, b) => a.name.localeCompare(b.name, 'de');

// ─── Cities ──────────────────────────────────────────────────────────────────

export function getCitySlugs() {
  return Object.keys(CITY_SLUGS);
}

/** Every city with its venue count, biggest first. */
export function listCities() {
  const counts = {};
  for (const v of venues) {
    const city = cityOf(v);
    counts[city] = (counts[city] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .map(([name, count]) => ({ name, count, href: cityHref(name) }));
}

export function getCityPage(slug) {
  const name = CITY_SLUGS[slug];
  if (!name) return null;

  const list = venues.filter((v) => cityOf(v) === name).map(venueSummary).sort(byName);
  const isVienna = name === 'Wien';

  return {
    kind: 'city',
    name,
    venues: list,
    stats: statsOf(list),
    districtCount: isVienna ? new Set(list.map((v) => v.district)).size : 0,
    // Vienna links down to its districts, the smaller cities link sideways.
    related: isVienna
      ? listDistricts().map((d) => ({ href: d.href, label: d.label, count: d.count }))
      : listCities().filter((c) => c.name !== name).map((c) => ({ href: c.href, label: c.name, count: c.count })),
    relatedKind: isVienna ? 'districts' : 'cities',
  };
}

// ─── Vienna districts ────────────────────────────────────────────────────────

export function getDistrictSlugs() {
  return Object.keys(DISTRICT_SLUGS);
}

/** Every Vienna district that has at least one venue. */
export function listDistricts() {
  const counts = {};
  for (const v of venues) {
    if (v.district > 0) counts[v.district] = (counts[v.district] || 0) + 1;
  }
  return Object.keys(counts)
    .map(Number)
    .sort((a, b) => a - b)
    .map((d) => ({
      district: d,
      name: DISTRICT_NAMES[d],
      postal: postalCode(d),
      label: `${postalCode(d)} ${DISTRICT_NAMES[d]}`,
      count: counts[d],
      href: districtHref(d),
    }));
}

export function getDistrictPage(slug) {
  const district = DISTRICT_SLUGS[slug];
  if (!district) return null;

  const list = venues.filter((v) => v.district === district).map(venueSummary).sort(byName);

  return {
    kind: 'district',
    name: `${postalCode(district)} ${DISTRICT_NAMES[district]}`,
    districtName: DISTRICT_NAMES[district],
    postal: postalCode(district),
    venues: list,
    stats: statsOf(list),
    related: listDistricts()
      .filter((d) => d.district !== district)
      .map((d) => ({ href: d.href, label: d.label, count: d.count })),
    relatedKind: 'districts',
  };
}

// ─── Categories ──────────────────────────────────────────────────────────────

function categoryCounts() {
  const counts = {};
  for (const v of venues) {
    for (const c of v.categories) counts[c] = (counts[c] || 0) + 1;
  }
  return counts;
}

/** Categories that clear the minimum, biggest first. */
export function listCategories() {
  const counts = categoryCounts();
  return Object.entries(counts)
    .filter(([, n]) => n >= MIN_CATEGORY_VENUES)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .map(([name, count]) => ({ name, count, href: categoryHref(name) }));
}

export function getCategorySlugs() {
  return listCategories().map((c) => slugify(c.name));
}

export function getCategoryPage(slug) {
  const name = CATEGORY_SLUGS[slug];
  if (!name) return null;
  const counts = categoryCounts();
  if ((counts[name] || 0) < MIN_CATEGORY_VENUES) return null;

  const list = venues.filter((v) => v.categories.includes(name)).map(venueSummary).sort(byName);

  // Which cities this category actually appears in — useful links, real data.
  const cities = {};
  for (const v of list) cities[v.city] = (cities[v.city] || 0) + 1;

  return {
    kind: 'category',
    name,
    venues: list,
    stats: statsOf(list),
    cities: Object.entries(cities)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
      .map(([city, count]) => ({ label: city, count, href: cityHref(city) })),
    related: listCategories()
      .filter((c) => c.name !== name)
      .map((c) => ({ href: c.href, label: c.name, count: c.count })),
    relatedKind: 'categories',
  };
}

// ─── Dishes ──────────────────────────────────────────────────────────────────

/** dish name → [{ venue, items }] for every venue whose menu has that dish */
const DISH_INDEX = (() => {
  const index = {};
  for (const dish of DISHES) {
    index[dish.name] = venues
      .map((v) => ({ venue: v, items: dishItems(v, dish) }))
      .filter((m) => m.items.length > 0);
  }
  return index;
})();

/** Dishes that clear the minimum, most venues first. */
export function listDishes() {
  return DISHES
    .map((d) => ({ name: d.name, count: DISH_INDEX[d.name].length, href: dishHref(d.name) }))
    .filter((d) => d.count >= MIN_DISH_VENUES)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'de'));
}

export function getDishSlugs() {
  return listDishes().map((d) => slugify(d.name));
}

export function getDishPage(slug) {
  const dish = DISHES.find((d) => slugify(d.name) === slug);
  if (!dish) return null;
  const matches = DISH_INDEX[dish.name];
  if (matches.length < MIN_DISH_VENUES) return null;

  const list = matches
    .map(({ venue, items }) => ({ ...venueSummary(venue), items: items.slice(0, 4), itemCount: items.length }))
    .sort(byName);

  const prices = matches
    .flatMap((m) => m.items)
    .map((i) => parsePrice(i.price))
    .filter((n) => n != null);

  const cities = {};
  for (const v of list) cities[v.city] = (cities[v.city] || 0) + 1;

  return {
    kind: 'dish',
    name: dish.name,
    nameEn: dish.en,
    venues: list,
    stats: statsOf(list),
    priceMin: prices.length ? Math.min(...prices) : null,
    priceMax: prices.length ? Math.max(...prices) : null,
    cities: Object.entries(cities)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
      .map(([city, count]) => ({ label: city, count, href: cityHref(city) })),
    related: listDishes()
      .filter((d) => d.name !== dish.name)
      .map((d) => ({ href: d.href, label: d.name, count: d.count })),
    relatedKind: 'dishes',
  };
}

/** Dish pages a venue appears on, for the links on its own page. */
export function dishesOf(venue) {
  return listDishes().filter((d) => DISH_INDEX[d.name].some((m) => m.venue.id === venue.id));
}

/** Up to `k` names for a snippet, one per chain: "Burgallio, Liwan, Damla" rather than three Burgallios. */
export function sampleNames(list, k = 3) {
  const seen = new Set();
  const names = [];
  for (const v of list) {
    const key = v.chain ? v.chain.id : v.id;
    if (seen.has(key)) continue;
    seen.add(key);
    names.push(v.chain ? v.chain.name : v.name);
    if (names.length === k) break;
  }
  return names;
}

/**
 * Where a list of venues is, for titles: a single city, "Wien & Österreich"
 * when most are in Vienna, otherwise "Österreich".
 */
export function placeOf(cities, total) {
  if (cities.length === 1) return { de: cities[0].label, en: cities[0].label === 'Wien' ? 'Vienna' : cities[0].label };
  const vienna = cities.find((c) => c.label === 'Wien');
  if (vienna && vienna.count / total >= 0.6) return { de: 'Wien & Österreich', en: 'Vienna & Austria' };
  return { de: 'Österreich', en: 'Austria' };
}

// ─── Breadcrumbs shared with the venue pages ─────────────────────────────────

/** Home › Wien › 1120 Meidling — used on landing pages and venue pages alike. */
export function breadcrumbFor(venue) {
  const city = cityOf(venue);
  const trail = [{ href: '/', label: 'Home' }, { href: cityHref(city), label: city }];
  if (city === 'Wien' && venue.district > 0) {
    trail.push({ href: districtHref(venue.district), label: `${postalCode(venue.district)} ${venue.districtName}` });
  }
  return trail;
}

export { slugify, districtSlug, cityHref, districtHref, categoryHref, dishHref };
