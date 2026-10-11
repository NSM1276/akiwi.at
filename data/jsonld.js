// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — schema.org JSON-LD builders (server-side only)
// ─────────────────────────────────────────────────────────────────────────────

const BASE = 'https://www.akiwi.at';
// hours[].day: 0=Mo … 6=So (see template in venues.js)
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** "Erdbergstraße 93, 1030 Wien" → { streetAddress, postalCode, addressLocality } */
export function postalAddress(address) {
  const m = address.match(/^(.*?),\s*(\d{4})\s+([^(]+)/);
  return {
    '@type': 'PostalAddress',
    streetAddress: m ? m[1].trim() : address,
    postalCode: m ? m[2] : undefined,
    addressLocality: m ? m[3].trim() : undefined,
    addressCountry: 'AT',
  };
}

function openingHours(hours) {
  return (hours || [])
    .filter((h) => h.open && h.close)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAYS[h.day],
      opens: h.open,
      closes: h.close === '00:00' ? '23:59' : h.close,
    }));
}

function externalUrl(website) {
  if (!website) return undefined;
  return website.startsWith('http') ? website : `https://${website}`;
}

// Categories that describe the kind of place rather than the food.
const VENUE_TYPES = { Imbiss: 'FastFoodRestaurant', 'Café': 'CafeOrCoffeeShop', Konditorei: 'Bakery' };
const NOT_CUISINE = new Set(['Restaurant', 'Imbiss', 'Café', 'Konditorei', 'Healthy Food']);

function schemaType(categories) {
  for (const c of categories) if (VENUE_TYPES[c]) return VENUE_TYPES[c];
  return 'Restaurant';
}

// No aggregateRating: the review counts in venues.js were not collected on
// Akiwi, and Google's review-snippet rules forbid marking up ratings from
// elsewhere. The rating stays visible on the page, just not in the markup.
export function venueJsonLd(venue, description) {
  const cuisines = venue.categories.filter((c) => !NOT_CUISINE.has(c));
  return {
    '@context': 'https://schema.org',
    '@type': schemaType(venue.categories),
    '@id': `${BASE}/r/${venue.id}`,
    name: venue.name,
    url: `${BASE}/r/${venue.id}`,
    description: description || venue.description_de || venue.tagline_de,
    address: postalAddress(venue.address),
    telephone: venue.phone || undefined,
    sameAs: externalUrl(venue.website),
    servesCuisine: cuisines.length ? cuisines : undefined,
    priceRange: venue.price || undefined,
    hasMenu: venue.menu?.length ? `${BASE}/r/${venue.id}#menu` : undefined,
    openingHoursSpecification: (venue.hours || []).length ? openingHours(venue.hours) : undefined,
  };
}

/** Site name for the search result header, and the organisation behind it. */
export function siteJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: 'Akiwi.at',
      alternateName: 'Akiwi',
      url: `${BASE}/`,
      inLanguage: 'de-AT',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'Akiwi.at',
      url: `${BASE}/`,
      logo: `${BASE}/assets/logo.svg`,
    },
  ];
}

export function chainJsonLd(chain, venues) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/chain/${chain.id}`,
    name: chain.name,
    url: `${BASE}/chain/${chain.id}`,
    description: chain.tagline_de,
    sameAs: externalUrl(chain.website),
    location: venues.map((v) => ({
      '@type': 'Restaurant',
      name: v.name,
      url: `${BASE}/r/${v.id}`,
      address: postalAddress(v.address),
      telephone: v.phone || undefined,
    })),
  };
}

/** Home › Wien › 1120 Meidling — trail items are { href, label }, last one is the page itself. */
export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${BASE}${item.href}`,
    })),
  };
}

/** The venues shown on a landing page, in the order they are rendered. */
export function itemListJsonLd(name, venues) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: venues.length,
    itemListElement: venues.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/r/${v.id}`,
      name: v.name,
    })),
  };
}
