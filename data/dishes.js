// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Dishes people search for ("halal burger", "döner 1120")
//
// A dish page lists every venue whose menu in venues.js contains a matching
// item, with that item's name and price. Only the search vocabulary lives
// here; which venues serve a dish always comes from their menus.
//
// Pizza and Kebab are left out on purpose: they already have category pages.
// ─────────────────────────────────────────────────────────────────────────────

export const DISHES = [
  { name: 'Burger',        en: 'burgers',        pattern: /burger/i },
  { name: 'Döner',         en: 'döner',          pattern: /d[öo]ner/i },
  { name: 'Dürüm & Wraps', en: 'dürüm & wraps',  pattern: /wrap|d[üu]r[üu]m/i },
  { name: 'Falafel',       en: 'falafel',        pattern: /falafel/i },
  { name: 'Hummus',        en: 'hummus',         pattern: /hummus|\bhumus\b/i },
  { name: 'Lahmacun',      en: 'lahmacun',       pattern: /lahmacun/i },
  { name: 'Pide',          en: 'pide',           pattern: /\bpide\b/i },
  { name: 'Schnitzel',     en: 'schnitzel',      pattern: /schnitzel/i },
  { name: 'Pasta',         en: 'pasta',          pattern: /pasta|spaghetti|penne|tagliatelle|lasagne|rigatoni/i },
  { name: 'Sushi',         en: 'sushi',          pattern: /sushi|\bmaki\b|nigiri/i },
  { name: 'Ramen',         en: 'ramen',          pattern: /ramen/i },
  { name: 'Frühstück',     en: 'breakfast',      pattern: /fr[üu]hst[üu]ck/i },
  { name: 'Baklava',       en: 'baklava',        pattern: /baklava/i },
  { name: 'Kunafa',        en: 'kunafa',         pattern: /kunafa|k[üu]nefe|knafeh/i },
];

// A dish needs at least this many venues to earn its own page.
export const MIN_DISH_VENUES = 3;

/** The menu items of a venue that match a dish, e.g. [{ name: 'Cheeseburger', price: '9,90' }]. */
export function dishItems(venue, dish) {
  const items = [];
  for (const cat of venue.menu || []) {
    for (const it of cat.items) {
      if (dish.pattern.test(it.name_de)) {
        items.push({ name_de: it.name_de, name_en: it.name_en, price: it.price || null });
      }
    }
  }
  return items;
}

/** "5,50" → 5.5; anything else → null */
export function parsePrice(price) {
  if (!price) return null;
  const n = Number(String(price).replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/** 5.5 → "€ 5,50" */
export function formatEuro(n) {
  return `€ ${n.toFixed(2).replace('.', ',')}`;
}
