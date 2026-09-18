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

export function venueJsonLd(venue) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${BASE}/r/${venue.id}`,
    name: venue.name,
    url: `${BASE}/r/${venue.id}`,
    description: venue.description_de || venue.tagline_de,
    address: postalAddress(venue.address),
    telephone: venue.phone || undefined,
    sameAs: externalUrl(venue.website),
    servesCuisine: venue.categories,
    priceRange: venue.price,
    openingHoursSpecification: openingHours(venue.hours),
  };
  if (venue.reviews > 0) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviews,
      bestRating: 5,
    };
  }
  return ld;
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
