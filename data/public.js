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
//
// A second way in: `checked: { date, sources: [{ label, url }] }`. Akiwi has
// compared hours, menu, prices and amenities with the venue's own website,
// Instagram or delivery page on that date and updated the record. Those
// details then show, with the date and sources under "Datenquelle". Ratings,
// reviews and the old "nearby" list stay hidden: they were not collected on Akiwi.

export const isOnboarded = (v) => v.onboarded === true;
export const isChecked = (v) => Boolean(v.checked?.date);
const ratingsOff = { rating: 0, reviews: 0, reviews_list: [], similar: [] };

function hide(v) {
  return {
    ...v,
    hours: [],
    menu: [],
    amenities: {},
    price: '',
    alcohol: undefined,
    rating: 0,
    reviews: 0,
    reviews_list: [],
    tags: [],
    similar: [],
  };
}

// `hidden: true` keeps a record in venues.js but off the site: the halal claim
// rests only on a third party (a Wolt/Lieferando tag, OpenStreetMap, Zabihah),
// or the venue does not fit the catalog. Remove the flag once the venue itself
// says it is halal (then status 'claimed' + halal_source) or Akiwi has checked it.
export const isHidden = (v) => v.hidden === true;

export function publicVenues(raw) {
  return Object.fromEntries(
    Object.entries(raw).filter(([, v]) => !isHidden(v)).map(([id, v]) => [id,
      isOnboarded(v) ? v : isChecked(v) ? { ...v, ...ratingsOff } : hide(v)]),
  );
}

/** A chain's own price level and tags show only once one of its branches is onboarded or checked. */
export function publicChains(raw, venues) {
  return Object.fromEntries(
    Object.entries(raw)
      .map(([id, c]) => [id, { ...c, venueIds: c.venueIds.filter((vid) => venues[vid]) }])
      .filter(([, c]) => c.venueIds.length > 0)
      .map(([id, c]) => {
        const live = c.venueIds.some((vid) => isOnboarded(venues[vid]) || isChecked(venues[vid]));
        return [id, live ? c : { ...c, price: '', tags: [] }];
      }),
  );
}
