// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — URL slugs for the landing pages
//
// Every slug is derived from the data, so a new city or category shows up
// as soon as a venue carrying it is added to venues.js.
// ─────────────────────────────────────────────────────────────────────────────

import { VENUES } from './venues';
import { cityOf } from './listing';

/** "Rudolfsheim-Fünfhaus" → "rudolfsheim-fuenfhaus", "Landstraße" → "landstrasse" */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const venues = Object.values(VENUES);

/** Vienna district number → district name, e.g. 12 → "Meidling" */
export const DISTRICT_NAMES = (() => {
  const names = {};
  for (const v of venues) {
    if (v.district > 0 && !names[v.district]) names[v.district] = v.districtName;
  }
  return names;
})();

/** Vienna postal code for a district number: 12 → "1120" */
export const postalCode = (district) => String(1000 + district * 10);

/** District slug carries both what people type: "1120-meidling" */
export const districtSlug = (district) =>
  `${postalCode(district)}-${slugify(DISTRICT_NAMES[district] || '')}`;

export const CITY_SLUGS = (() => {
  const map = {};
  for (const v of venues) {
    const city = cityOf(v);
    map[slugify(city)] = city;
  }
  return map;
})();

export const CATEGORY_SLUGS = (() => {
  const map = {};
  for (const v of venues) {
    for (const c of v.categories) map[slugify(c)] = c;
  }
  return map;
})();

export const DISTRICT_SLUGS = (() => {
  const map = {};
  for (const v of venues) {
    if (v.district > 0) map[districtSlug(v.district)] = v.district;
  }
  return map;
})();

export const cityHref = (city) => `/${slugify(city)}`;
export const districtHref = (district) => `/wien/${districtSlug(district)}`;
export const categoryHref = (category) => `/kategorie/${slugify(category)}`;
