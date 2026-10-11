// What the site may show about a venue.
//
// The records in venues.js come from public sources collected more than half a
// year ago, and a spot check against the venues' own websites matched 1 of 8
// (hours). Details that can be wrong are therefore held back: hours, menu and
// prices, price level, ratings, amenities, tags and the "nearby" list.
//
// They appear for a venue once it has joined the catalog, i.e. its record
// carries `onboarded: true` (set it after the venue has confirmed or updated
// its own data). Identity data — name, address, phone, website, category,
// halal status — is always shown; the halal status has its own rules.
//
// The full data stays in venues.js, so nothing is lost: it is simply not
// exposed until the venue is onboarded.

export const isOnboarded = (v) => v.onboarded === true;

function hide(v) {
  return {
    ...v,
    hours: [],
    menu: [],
    amenities: {},
    price: '',
    rating: 0,
    reviews: 0,
    reviews_list: [],
    tags: [],
    similar: [],
  };
}

export function publicVenues(raw) {
  return Object.fromEntries(
    Object.entries(raw).map(([id, v]) => [id, isOnboarded(v) ? v : hide(v)]),
  );
}

/** A chain's own price level and tags show only once one of its branches is onboarded. */
export function publicChains(raw, venues) {
  return Object.fromEntries(
    Object.entries(raw).map(([id, c]) => {
      const live = c.venueIds.some((vid) => venues[vid] && isOnboarded(venues[vid]));
      return [id, live ? c : { ...c, price: '', tags: [] }];
    }),
  );
}
