// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Search snippets and page text built from the venue records
//
// Search Console showed venue pages ranking 5–12 for the venue's own name
// with almost no clicks: people looking up "liwan restaurant karte" want the
// menu, the hours and whether it is halal. Titles, descriptions, the
// "Über …" paragraph and the FAQ answer exactly that — from the record's own
// fields, never from invented copy. A question only appears when the data
// answers it (no "Liefert X?" unless delivery is ticked).
//
// Server-side only: imports the venue registry.
// ─────────────────────────────────────────────────────────────────────────────

import { CHAINS } from './chains';
import { VENUES } from './venues';
import { cityOf } from './listing';
import { postalCode } from './slugs';
import { parsePrice, formatEuro } from './dishes';

const TITLE_MAX = 68;
const DESC_MAX = 158;

const DAY_SHORT = {
  de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

const AMENITY_LABELS = {
  de: { delivery: 'Lieferung', outdoor: 'Terrasse', parking: 'Parkplatz', wheelchair: 'rollstuhlgerecht', prayer: 'Gebetsraum', wifi: 'WLAN' },
  en: { delivery: 'delivery', outdoor: 'terrace', parking: 'parking', wheelchair: 'wheelchair access', prayer: 'prayer room', wifi: 'Wi-Fi' },
};

/** venue id → chain record */
const CHAIN_OF = (() => {
  const map = {};
  for (const chain of Object.values(CHAINS)) {
    for (const id of chain.venueIds) map[id] = chain;
  }
  return map;
})();

// ─── Small helpers ───────────────────────────────────────────────────────────

const lower = (s) => s.toLocaleLowerCase('de');

/** First candidate that fits, else the shortest one. */
function fit(candidates, max) {
  return candidates.find((c) => c.length <= max) || candidates[candidates.length - 1];
}

/** Join sentences until the limit is reached. */
function joinUpTo(parts, max, sep = ' · ') {
  let out = '';
  for (const p of parts.filter(Boolean)) {
    const next = out ? `${out}${sep}${p}` : p;
    if (next.length > max) break;
    out = next;
  }
  return out;
}

/** "Hummus, Falafel und Kibbeh" */
function listDe(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
}
function listEn(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

const isVienna = (v) => cityOf(v) === 'Wien' && v.district > 0;

/** "1120 Wien" or "Graz" — what people type next to a venue name. */
function placeLabel(v) {
  return isVienna(v) ? `${postalCode(v.district)} Wien` : cityOf(v);
}

/** Street part of "Meidlinger Hauptstraße 12, 1120 Wien" */
function street(v) {
  return v.address.split(',')[0].trim();
}

function venueKind(v, lang) {
  const c = v.categories;
  if (c.includes('Konditorei')) return lang === 'de' ? 'eine Konditorei' : 'a pastry shop';
  if (c.includes('Café')) return lang === 'de' ? 'ein Café' : 'a café';
  if (c.includes('Imbiss') || c.includes('Kebab')) return lang === 'de' ? 'ein Imbiss' : 'a takeaway';
  return lang === 'de' ? 'ein Restaurant' : 'a restaurant';
}

// ─── Hours ───────────────────────────────────────────────────────────────────

/** day index → "11:00–15:00, 17:00–22:00" or null when closed */
function daySlots(hours) {
  const slots = Array.from({ length: 7 }, () => []);
  for (const h of hours || []) {
    if (h.open && h.close) slots[h.day].push(`${h.open}–${h.close}`);
  }
  return slots.map((s) => (s.length ? s.sort().join(', ') : null));
}

/** "10:00" → "10", "10:30" → "10:30" */
const shortTime = (s) => s.replace(/(^|\D)0(\d):/g, '$1$2:').replace(/(\d{1,2}):00/g, '$1');

/**
 * Group equal consecutive days: "täglich 10:00–23:00" or
 * "Mo–Fr 11:00–22:00, Sa 12:00–23:00, So geschlossen".
 */
export function hoursSummary(hours, lang, { short = false } = {}) {
  const slots = daySlots(hours);
  const fmt = (s) => (short ? shortTime(s) : s);
  const closed = lang === 'de' ? 'geschlossen' : 'closed';

  if (slots.every((s) => s && s === slots[0])) {
    return `${lang === 'de' ? 'täglich' : 'daily'} ${fmt(slots[0])}${short ? (lang === 'de' ? ' Uhr' : '') : ''}`;
  }

  const groups = [];
  for (let d = 0; d < 7; d++) {
    const last = groups[groups.length - 1];
    if (last && last.value === slots[d]) last.to = d;
    else groups.push({ from: d, to: d, value: slots[d] });
  }
  const names = DAY_SHORT[lang];
  return groups
    .map((g) => {
      const days = g.from === g.to ? names[g.from] : `${names[g.from]}–${names[g.to]}`;
      return `${days} ${g.value ? fmt(g.value) : closed}`;
    })
    .join(', ');
}

// ─── Menu ────────────────────────────────────────────────────────────────────

function menuStats(v) {
  const items = (v.menu || []).flatMap((c) => c.items);
  const prices = items.map((i) => parsePrice(i.price)).filter((n) => n != null);
  return {
    count: items.length,
    min: prices.length ? Math.min(...prices) : null,
    max: prices.length ? Math.max(...prices) : null,
    vegetarian: items.filter((i) => i.tag === 'V').length,
    // A few dishes to name in the text: first item of each menu section.
    examples: (v.menu || []).map((c) => c.items[0]).filter(Boolean).slice(0, 3),
  };
}

// ─── Halal status, worded the same way everywhere on the site ────────────────

function halalShort(status) {
  if (status === 'verified') return 'Halal bestätigt';
  if (status === 'self') return 'Halal laut öffentlichen Angaben';
  return 'Halal-Status ungeprüft';
}

/** One sentence for the "Über …" paragraph. */
function halalSentence(v, lang) {
  if (lang === 'de') {
    if (v.status === 'verified') return 'Der Halal-Status ist laut Betreiber bzw. Website des Lokals bestätigt.';
    if (v.status === 'self') return 'Halal laut öffentlich zugänglichen Angaben; eine Prüfung durch Akiwi steht noch aus.';
    return 'Der Halal-Status ist nicht bestätigt — bitte direkt im Lokal nachfragen.';
  }
  if (v.status === 'verified') return "The halal status is confirmed by the venue's owner or website.";
  if (v.status === 'self') return 'Halal according to publicly available information; Akiwi has not checked it yet.';
  return 'The halal status is not confirmed — please ask at the venue.';
}

// ─── Venue page: title and description ───────────────────────────────────────

export function venueMeta(v) {
  const nameHasPlace = [cityOf(v), v.districtName].some((p) => p && lower(v.name).includes(lower(p)));
  const base = isVienna(v)
    ? `${v.name}, ${placeLabel(v)}`
    : nameHasPlace ? v.name : `${v.name}, ${cityOf(v)}`;

  // Menu and hours are held back until the venue is onboarded (data/public.js),
  // so the title only promises what the page shows.
  const hasMenu = (v.menu || []).length > 0;
  const hasHours = (v.hours || []).length > 0;
  const title = fit([
    ...(hasMenu && hasHours ? [`${base} – Speisekarte, Öffnungszeiten, Halal`, `${base} – Speisekarte & Öffnungszeiten`] : []),
    ...(hasMenu ? [`${base} – Speisekarte & Halal-Status`, `${base} – Speisekarte`] : [`${base} – Halal-Status & Adresse`, `${base} – Adresse`]),
    base,
  ], TITLE_MAX);

  const m = menuStats(v);
  const where = isVienna(v) ? `${placeLabel(v)}-${v.districtName}` : cityOf(v);
  const description = joinUpTo([
    `${halalShort(v.status)}: ${v.tagline_de} in ${where}`,
    hasHours ? hoursSummary(v.hours, 'de', { short: true }).replace(/^täglich/, 'Täglich') : null,
    m.count ? `Speisekarte mit ${m.count} Gerichten und Preisen` : null,
    street(v),
    v.phone ? `Tel. ${v.phone}` : null,
  ], DESC_MAX);

  return { title, description };
}

// ─── Venue page: "Über …" paragraph and FAQ ──────────────────────────────────

export function venueAbout(v, dishes = []) {
  const m = menuStats(v);
  const chain = CHAIN_OF[v.id];
  const chainSize = chain ? chain.venueIds.filter((id) => VENUES[id]).length : 0;
  const amenities = Object.entries(v.amenities || {}).filter(([, on]) => on).map(([k]) => k);
  const examplesDe = (dishes.length ? dishes.map((d) => d.name) : m.examples.map((i) => i.name_de)).slice(0, 3);
  const examplesEn = (dishes.length ? dishes.map((d) => d.name) : m.examples.map((i) => i.name_en)).slice(0, 3);
  const vienna = isVienna(v);

  const de = [
    vienna
      ? `${v.name} ist ${venueKind(v, 'de')} im ${v.district}. Wiener Bezirk ${v.districtName}, ${v.address}.`
      : `${v.name} ist ${venueKind(v, 'de')} in ${cityOf(v)}, ${v.address}.`,
    `Schwerpunkt: ${v.tagline_de}.`,
    (v.hours || []).length ? `Öffnungszeiten: ${hoursSummary(v.hours, 'de')}.` : null,
    m.count
      ? `Die Speisekarte auf Akiwi umfasst ${m.count} Gerichte${m.min != null ? ` von ${formatEuro(m.min)} bis ${formatEuro(m.max)}` : ''}${examplesDe.length ? `, darunter ${listDe(examplesDe)}` : ''}.`
      : null,
    amenities.length ? `Ausstattung: ${listDe(amenities.map((k) => AMENITY_LABELS.de[k]))}.` : null,
    halalSentence(v, 'de'),
    chain && chainSize > 1 ? `${v.name} ist eine von ${chainSize} Filialen von ${chain.name} auf Akiwi.` : null,
  ].filter(Boolean);

  const en = [
    vienna
      ? `${v.name} is ${venueKind(v, 'en')} in Vienna's district ${v.district} (${v.districtName}), at ${v.address}.`
      : `${v.name} is ${venueKind(v, 'en')} in ${cityOf(v)}, at ${v.address}.`,
    `Focus: ${v.tagline_en}.`,
    (v.hours || []).length ? `Opening hours: ${hoursSummary(v.hours, 'en')}.` : null,
    m.count
      ? `The menu on Akiwi lists ${m.count} dishes${m.min != null ? ` from ${formatEuro(m.min)} to ${formatEuro(m.max)}` : ''}${examplesEn.length ? `, including ${listEn(examplesEn)}` : ''}.`
      : null,
    amenities.length ? `Amenities: ${listEn(amenities.map((k) => AMENITY_LABELS.en[k]))}.` : null,
    halalSentence(v, 'en'),
    chain && chainSize > 1 ? `${v.name} is one of ${chainSize} ${chain.name} branches on Akiwi.` : null,
  ].filter(Boolean);

  return { de: de.join(' '), en: en.join(' ') };
}

/**
 * "At a glance" block on a venue page: halal status, opening hours, address.
 * Only what the page itself already shows — no answers written for the venue
 * (delivery, prayer room, vegetarian … stay as listed data, not as claims).
 */
export function venueFacts(v) {
  const where = isVienna(v) ? ` (${v.districtName})` : '';
  return [
    {
      label_de: 'Halal-Status', label_en: 'Halal status',
      text_de: halalSentence(v, 'de'), text_en: halalSentence(v, 'en'),
    },
    {
      label_de: 'Öffnungszeiten', label_en: 'Opening hours',
      text_de: (v.hours || []).length
        ? `${hoursSummary(v.hours, 'de').replace(/^täglich/, 'Täglich')}.`
        : 'Derzeit nicht angegeben — bitte direkt beim Lokal nachfragen.',
      text_en: (v.hours || []).length
        ? `${hoursSummary(v.hours, 'en').replace(/^daily/, 'Daily')}.`
        : 'Not listed at the moment — please ask the venue directly.',
    },
    {
      label_de: 'Adresse', label_en: 'Address',
      text_de: `${v.address}${where}.${v.phone ? ` Telefon: ${v.phone}.` : ''}`,
      text_en: `${v.address}${where}.${v.phone ? ` Phone: ${v.phone}.` : ''}`,
    },
    {
      label_de: 'Datenquelle', label_en: 'Data source',
      text_de: 'Aus öffentlichen Quellen zusammengetragen, nicht vom Lokal bestätigt — im Zweifel direkt beim Lokal nachfragen.',
      text_en: 'Compiled from public sources, not confirmed by the venue — if in doubt, ask the venue directly.',
    },
  ];
}

// ─── Chain page ──────────────────────────────────────────────────────────────

/** Short branch label: "1120 Meidling" in Vienna, otherwise the city. */
function branchLabel(v) {
  return isVienna(v) ? `${postalCode(v.district)} ${v.districtName}` : cityOf(v);
}

export function chainMeta(chain, venues) {
  const cities = [...new Set(venues.map(cityOf))];
  const n = venues.length;
  const where = cities.length === 1
    ? cities[0]
    : cities.length <= 3 ? listDe(cities).replace(' und ', ' & ') : `${cities.slice(0, 2).join(', ')} u. a.`;

  const title = fit([
    `${chain.name}: ${n} Filialen in ${where} – Adressen & Halal-Status`,
    `${chain.name}: ${n} Filialen in ${where} – Adressen`,
    `${chain.name}: alle ${n} Filialen`,
  ], TITLE_MAX);

  const labels = [...new Set(venues.map(branchLabel))];
  const head = `${chain.tagline_de}. `;
  const tail = ' – Adressen und Halal-Status.';
  // As many branch names as fit; the rest become "u. a.".
  let branches = `Filialen: ${labels.join(', ')}`;
  for (let k = labels.length - 1; k > 0 && (head + branches + tail).length > DESC_MAX; k--) {
    branches = `Filialen: ${labels.slice(0, k).join(', ')} u. a.`;
  }
  const description = (head + branches + tail).length <= DESC_MAX ? head + branches + tail : `${head}${branches}.`;

  return { title, description };
}

export function chainAbout(chain, venues) {
  const labels = [...new Set(venues.map(branchLabel))];
  const counts = { verified: 0, self: 0, unknown: 0 };
  for (const v of venues) counts[v.status] += 1;
  const partsDe = [];
  const partsEn = [];
  if (counts.verified) { partsDe.push(`${counts.verified} verifiziert`); partsEn.push(`${counts.verified} verified`); }
  if (counts.self) { partsDe.push(`${counts.self} nicht geprüft`); partsEn.push(`${counts.self} not checked`); }
  if (counts.unknown) { partsDe.push(`${counts.unknown} ungeprüft`); partsEn.push(`${counts.unknown} unverified`); }

  return {
    de: `${chain.name} hat ${venues.length} ${venues.length === 1 ? 'Filiale' : 'Filialen'} auf Akiwi: ${listDe(labels)}. Halal-Status der Filialen: ${partsDe.join(', ')}. Jede Filiale hat eine eigene Seite mit Adresse und Halal-Status.`,
    en: `${chain.name} has ${venues.length} ${venues.length === 1 ? 'branch' : 'branches'} on Akiwi: ${listEn(labels)}. Halal status of the branches: ${partsEn.join(', ')}. Each branch has its own page with address and halal status.`,
  };
}

// ─── Share preview (Open Graph image) ────────────────────────────────────────

/** Short place line for the share card: "1120 Wien · Meidling" or "Graz". */
export function shareWhere(v) {
  return isVienna(v) ? `${placeLabel(v)} · ${v.districtName}` : cityOf(v);
}

/** Status wording on the card; same words as the meta description. */
export const shareHalal = halalShort;
