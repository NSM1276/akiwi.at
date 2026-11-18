// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Where pages that no longer exist should send people (and Google)
//
// The catalog was rebuilt several times (2026-09 … 2026-11): venues deleted,
// hidden, chains and landing pages gone. Google still knows those URLs. Instead
// of a 404 they get a permanent redirect (308) to the closest page that exists:
//   venue  → its Vienna district page, else its city page, else home
//   chain  → a remaining branch, else where its branches would go, else search
//   city   → home, district → /wien, category or dish → search
// The pages call these only when they would otherwise 404, so a venue or page
// that comes back (hidden: true removed) shows again with no change here.
// ─────────────────────────────────────────────────────────────────────────────

import { RAW_VENUES, VENUES } from './venues';
import { RAW_CHAINS } from './chains';
import { getDistrictPage, getCityPage, listCities } from './landing';
import { districtSlug, slugify } from './slugs';

// Venues that were once on akiwi.at and have since been deleted from venues.js:
// id → [Vienna district (0 = outside Vienna), city]. Generated from git history 2026-11-18.
export const GONE_VENUES = {
  'akakiko-city': [1, "Innere Stadt"],
  'akakiko-donau': [22, "Donaustadt"],
  'akakiko-gerngross': [7, "Neubau"],
  'akakiko-meidling': [12, "Meidling"],
  'akakiko-millennium': [20, "Brigittenau"],
  'akakiko-westbahnhof': [15, "Rudolfsheim-Fünfhaus"],
  'alsalam-innsbruck': [0, "Innsbruck"],
  'bakis-schnitzelparadies': [12, "Meidling"],
  'baobar-1020': [2, "Leopoldstadt"],
  'baobar-1070': [7, "Neubau"],
  'bayleaf-salzburg': [0, "Salzburg"],
  'blue-marlin-1130': [13, "Hietzing"],
  'burgallio-1100': [10, "Favoriten"],
  'burgallio-1170': [17, "Hernals"],
  'cafe-konstantin-1020': [2, "Leopoldstadt"],
  'cardak-1120': [12, "Meidling"],
  'casa-blanca-1200': [20, "Brigittenau"],
  'charlyfresh-city': [1, "Innere Stadt"],
  'charlyfresh-landstrasse': [3, "Landstraße"],
  'damas-grand': [10, "Favoriten"],
  'damas-restaurant': [4, "Wieden"],
  'damas-sweets-city': [1, "Innere Stadt"],
  'damas-sweets-favoriten': [10, "Favoriten"],
  'derya-1100': [10, "Favoriten"],
  'derya-1200': [20, "Brigittenau"],
  'etap-restaurant-1160': [16, "Ottakring"],
  'habibi-nordbahn': [2, "Leopoldstadt"],
  'habibi-siebenstern': [7, "Neubau"],
  'habibi-stadt': [1, "Innere Stadt"],
  'iko-city': [1, "Innere Stadt"],
  'iko-mariahilf': [6, "Mariahilf"],
  'kara-graz': [0, "Graz"],
  'kent-1100': [10, "Favoriten"],
  'lale-1010': [1, "Innere Stadt"],
  'le-doener': [12, "Meidling"],
  'lemir-city': [1, "Innere Stadt"],
  'lemir-millennium': [20, "Brigittenau"],
  'levante-city': [1, "Innere Stadt"],
  'levante-landstrasse': [3, "Landstraße"],
  'levante-mariahilf': [7, "Neubau"],
  'liwan-1120': [12, "Meidling"],
  'liwan-1200': [20, "Brigittenau"],
  'mado-wien': [6, "Mariahilf"],
  'mrbin-1100': [10, "Favoriten"],
  'mrbin-1220': [22, "Donaustadt"],
  'osteria-da-antonio-1010': [1, "Innere Stadt"],
  'pars-grill': [8, "Josefstadt"],
  'philly-cheesesteak-1100': [10, "Favoriten"],
  'pizza-mann-graz': [0, "Graz"],
  'pizza-mann-innsbruck': [0, "Innsbruck"],
  'pizza-mann-leonding': [0, "Leonding"],
  'pizza-mann-linz-restaurant': [0, "Linz"],
  'pizza-mann-linz-zentrum': [0, "Linz"],
  'pizza-mann-salzburg': [0, "Salzburg"],
  'pizza-mann-wels': [0, "Wels"],
  'pizza-mann-wien-02': [2, "Leopoldstadt"],
  'pizza-mann-wien-10': [10, "Favoriten"],
  'pizza-mann-wien-14': [14, "Penzing"],
  'pizza-mann-wien-21': [21, "Floridsdorf"],
  'pizza-mann-wien-22': [22, "Donaustadt"],
  'pizza4you-1120': [12, "Meidling"],
  'radatz-viktorianer': [10, "Favoriten"],
  'safran-1220': [22, "Donaustadt"],
  'sofra-salzburg': [0, "Salzburg"],
  'sultan-kebap-salzburg': [0, "Salzburg"],
  'tasty-kebap-pizza-1040': [4, "Wieden"],
  'turkis-landstrasse': [3, "Landstraße"],
  'turkis-linz': [0, "Linz"],
  'turkis-meidling': [12, "Meidling"],
  'turkis-millennium': [20, "Brigittenau"],
  'vapiano-graz-murpark': [0, "Graz"],
  'vapiano-graz-zentrum': [0, "Graz"],
  'vapiano-innsbruck-dez': [0, "Innsbruck"],
  'vapiano-innsbruck-leopold': [0, "Innsbruck"],
  'vapiano-klagenfurt': [0, "Klagenfurt"],
  'vapiano-linz': [0, "Linz"],
  'vapiano-salzburg': [0, "Salzburg"],
  'vapiano-wien-innenstadt-herren': [1, "Innere Stadt"],
  'vapiano-wien-innenstadt-walfisch': [1, "Innere Stadt"],
  'vapiano-wien-leopoldstadt': [2, "Leopoldstadt"],
  'vapiano-wien-mariahilf': [6, "Mariahilf"],
  'vapiano-wien-westbahnhof': [6, "Mariahilf"],
  'voodoo-burger-1140': [14, "Penzing"],
  'zur-eule-villach': [0, "Villach"],
};

// Chains deleted from chains.js: id → their former branch ids.
export const GONE_CHAINS = {
  'akakiko': ['akakiko-city', 'akakiko-gerngross', 'akakiko-donau'],
  'bao-bar': ['baobar-1020', 'baobar-1070'],
  'burgallio': ['burgallio-1120', 'burgallio-1100', 'burgallio-1170'],
  'charly-fresh': ['charlyfresh-city', 'charlyfresh-landstrasse'],
  'damas-restaurant': ['damas-restaurant', 'damas-grand'],
  'damas-sweets': ['damas-sweets-city', 'damas-sweets-favoriten'],
  'derya': ['derya-1200', 'derya-1100'],
  'habibi': ['habibi-stadt', 'habibi-nordbahn', 'habibi-siebenstern'],
  'iko': ['iko-city', 'iko-mariahilf'],
  'lemir': ['lemir-city', 'lemir-millennium'],
  'levante': ['levante-city', 'levante-mariahilf', 'levante-landstrasse'],
  'liwan': ['liwan-1120', 'liwan-1200'],
  'mrbin': ['mrbin-1100', 'mrbin-1220'],
  'pars': ['pars-hauptrestaurant', 'pars-grill'],
  'pizza-mann': ['pizza-mann-wien-02', 'pizza-mann-wien-10', 'pizza-mann-wien-14', 'pizza-mann-wien-21', 'pizza-mann-wien-22', 'pizza-mann-graz', 'pizza-mann-linz-zentrum', 'pizza-mann-linz-restaurant', 'pizza-mann-leonding', 'pizza-mann-salzburg', 'pizza-mann-innsbruck', 'pizza-mann-wels'],
  'vapiano': ['vapiano-wien-mariahilf', 'vapiano-wien-innenstadt-walfisch', 'vapiano-wien-innenstadt-herren', 'vapiano-wien-leopoldstadt', 'vapiano-wien-westbahnhof', 'vapiano-graz-zentrum', 'vapiano-graz-murpark', 'vapiano-innsbruck-dez', 'vapiano-innsbruck-leopold', 'vapiano-linz', 'vapiano-salzburg', 'vapiano-klagenfurt'],
};

// Every city that ever had a landing page (/<city>).
export const PAST_CITIES = ['bregenz', 'dornbirn', 'feldkirch', 'feldkirchen-bei-graz', 'gramatneusiedl', 'graz', 'hohenems', 'hoerbranz', 'innsbruck', 'klagenfurt', 'klagenfurt-am-woerthersee', 'koblach', 'kufstein', 'leoben', 'leonding', 'linz', 'moedling', 'salzburg', 'schwechat', 'ternitz', 'traiskirchen', 'villach', 'voesendorf', 'wels', 'wiener-neustadt', 'zell-am-see', 'zwoelfaxing'];

function placeTarget(district, city) {
  if (district > 0) {
    const slug = districtSlug(district);
    if (getDistrictPage(slug)) return `/wien/${slug}`;
    return getCityPage('wien') ? '/wien' : '/';
  }
  const slug = city ? slugify(city) : '';
  return slug && getCityPage(slug) ? `/${slug}` : '/';
}

/** Target for /r/<id> that is not public (hidden or deleted), or null for an id that never existed. */
export function movedVenue(id) {
  const raw = RAW_VENUES[id];
  if (raw) return placeTarget(raw.district, raw.districtName);
  const gone = GONE_VENUES[id];
  return gone ? placeTarget(gone[0], gone[1]) : null;
}

/** Target for /chain/<id> that has no public branch left, or null for an id that never existed. */
export function movedChain(id) {
  const ids = RAW_CHAINS[id]?.venueIds || GONE_CHAINS[id];
  if (!ids) return null;
  const live = ids.find((vid) => VENUES[vid]);
  if (live) return `/r/${live}`;
  for (const vid of ids) {
    const t = movedVenue(vid);
    if (t) return t;
  }
  return '/search';
}

/** Target for /<city> that has no page now: a city page under a longer name (klagenfurt → klagenfurt-am-woerthersee), else home. */
export function movedCity(slug) {
  if (!PAST_CITIES.includes(slug)) return null;
  const longer = listCities().find((c) => c.href.startsWith(`/${slug}-`));
  return longer ? longer.href : '/';
}

/** Target for /wien/<district> that has no page now (Vienna district slugs look like 1100-favoriten). */
export const movedDistrict = (city, slug) => (city === 'wien' && /^1\d{2}0-[a-z-]+$/.test(slug) ? '/wien' : null);

/** Categories and dishes come and go with the data: send old ones to search. */
export const movedListing = (slug) => (/^[a-z0-9-]{2,40}$/.test(slug) ? '/search' : null);

