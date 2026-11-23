// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Pictures for dishes and categories (files in public/assets/)
//
// photo-*.webp are AI-generated (KI-Bild). They may only show on general
// pages (dish, category, home) with the "KI-Bild" note — never on a venue's
// own page or next to a venue as if it were its food.
// sticker-*.webp are drawn stickers and may show anywhere.
// Keys are page slugs (data/slugs.js → slugify).
// ─────────────────────────────────────────────────────────────────────────────

const A = '/assets';

// Dish slug (/gericht/…) → file name part
const DISH = {
  burger: 'burger',
  doener: 'doener',
  'dueruem-wraps': 'dueruem',
  falafel: 'falafel',
  hummus: 'hummus',
  lahmacun: 'lahmacun',
  pide: 'pide',
  schnitzel: 'schnitzel',
  pasta: 'pasta',
  sushi: 'sushi',
  ramen: 'ramen',
  fruehstueck: 'fruehstueck',
  baklava: 'baklava',
  kunafa: 'kuenefe',
};

// Category slug (/kategorie/…) → { photo, sticker }; no photo → sticker only
const CATEGORY = {
  burger: { photo: 'burger', sticker: 'burger' },
  kebab: { photo: 'adana-kebab', sticker: 'adana-kebab' },
  tuerkisch: { photo: 'doener', sticker: 'doener' },
  pizza: { photo: 'pizza', sticker: 'pizza' },
  persisch: { photo: 'chelow-kebab', sticker: 'chelow-kebab' },
  bosnisch: { photo: 'cevapi', sticker: 'cevapi' },
  asiatisch: { photo: 'sushi', sticker: 'dumplings' },
  italienisch: { photo: 'pasta', sticker: 'pasta' },
  indisch: { photo: 'curry', sticker: 'curry' },
  cafe: { photo: 'cay', sticker: 'cay' },
  pakistanisch: { sticker: 'biryani' },
  afghanisch: { sticker: 'kabuli-palaw' },
  orientalisch: { sticker: 'mezze' },
  imbiss: { sticker: 'imbiss' },
  restaurant: { sticker: 'restaurant' },
};

const photo = (name) => (name ? `${A}/photo-${name}.webp` : null);
const sticker = (name) => (name ? `${A}/sticker-${name}.webp` : null);

export const dishPhoto = (slug) => photo(DISH[slug]);
export const dishSticker = (slug) => sticker(DISH[slug]);
export const categoryPhoto = (slug) => photo(CATEGORY[slug]?.photo);
export const categorySticker = (slug) => sticker(CATEGORY[slug]?.sticker);

/** Sticker for a landing-page link like "/gericht/burger" or "/kategorie/kebab". */
export function stickerForHref(href) {
  const m = String(href).match(/^\/(gericht|kategorie)\/([^/?#]+)/);
  if (!m) return null;
  return m[1] === 'gericht' ? dishSticker(m[2]) : categorySticker(m[2]);
}

export const STATUS_ICON = {
  verified: `${A}/status-verified-v2.svg`,
  claimed: `${A}/status-halal-per-venue-v2.svg`,
  self: `${A}/status-not-checked-v2.svg`,
  unknown: `${A}/status-unknown-v2.svg`,
};

export const UI = {
  emptyPlate: `${A}/ui-empty-plate.webp`,
  openNow: `${A}/ui-open-now.webp`,
  guide: `${A}/ui-guide.webp`,
  addVenue: `${A}/ui-add-venue.webp`,
};

export const TAG_STICKER = {
  delivery: `${A}/tag-delivery.webp`,
  takeaway: `${A}/tag-takeaway.webp`,
  grill: `${A}/tag-grill.webp`,
};
