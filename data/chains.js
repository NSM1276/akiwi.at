import { publicChains } from './public';
import { VENUES } from './venues';
// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Chain registry
//
// Each chain groups multiple venues that share a brand.
// venueIds  → keys in VENUES (venues.js) for full location details
// primaryId → used for map pin (x,y) and main card image
// status    → NOT stored here: derived from the branches (lowest status wins), see listing.js
// featured  → optional, highlights the card on the homepage
// ─────────────────────────────────────────────────────────────────────────────

const RAW_CHAINS = {

  'alaturka': {
    id: 'alaturka',
    name: 'Alaturka',
    tagline_de: 'Türkische Spezialitäten — Döner, Pide, Pizza',
    tagline_en: 'Turkish specialties — Döner, Pide, Pizza',
    website: 'alaturka-doener.at',
    categories: ['Kebab', 'Pizza'],
    tags: ['Take-away', 'Türkisch', 'Döner', 'Catering'],
    price: '€',
    img: ['#7C2D12', '#431407'],
    accentHue: 18,
    primaryId: 'alaturka-1030',
    venueIds: ['alaturka-1030', 'alaturka-1120', 'alaturka-1150', 'alaturka-1230', 'alaturka-2700'],
  },

  'turkis': {
    id: 'turkis',
    name: 'Türkis',
    tagline_de: 'Orientalischer Grill & Döner — Österreichweit',
    tagline_en: 'Oriental grill & döner — Austria-wide',
    website: 'tuerkis.at',
    categories: ['Restaurant', 'Kebab'],
    tags: ['Orientalisch', 'Grill', 'Halal', 'Lieferung', 'Catering', 'Döner'],
    price: '€–€€',
    img: ['#0D9488', '#14B8A6'],
    accentHue: 190,
    primaryId: 'turkis-city',
    venueIds: ['turkis-city', 'turkis-neubau', 'turkis-westbahnhof', 'turkis-donau', 'turkis-voesendorf', 'turkis-praterstern'],
  },

  'kent': {
    id: 'kent',
    name: 'Kent',
    tagline_de: 'Türkisch-levantinische Küche & Bäckerei',
    tagline_en: 'Turkish-Levantine cuisine & bakery',
    website: 'kentrestaurant.at',
    categories: ['Restaurant', 'Türkisch'],
    tags: ['Türkisch', 'Levantinisch', 'Grill', 'Halal', 'Bäckerei', 'Frühstück', 'Lieferung'],
    price: '€€',
    img: ['#A0522D', '#CD853F'],
    accentHue: 15,
    primaryId: 'kent-1150',
    venueIds: ['kent-1150', 'kent-1160', 'kent-1200'],
  },

  'otacos': {
    id: 'otacos',
    name: "O'Tacos",
    tagline_de: 'French Tacos — gefüllte Tortillas mit Fleisch, Pommes und Käsesauce',
    tagline_en: 'French tacos — filled tortillas with meat, fries and cheese sauce',
    website: null,
    categories: ['Imbiss'],
    tags: [],
    price: '',
    img: ['#7C2D12', '#431407'],
    accentHue: 18,
    primaryId: 'o-tacos-karntner-strasse-1010',
    venueIds: ['o-tacos-karntner-strasse-1010', 'o-tacos-kohlmarkt-1010', 'o-tacos-rotenturmstrasse-1010', 'o-tacos-naschmarkt-1040', 'o-tacos-mariahilfer-strasse-34-1070', 'o-tacos-mariahilfer-strasse-84-1070', 'o-tacos-hauptbahnhof-1100', 'o-tacos-wahringer-strasse-1180', 'o-tacos-donauzentrum-1220'],
  },

};

export const CHAINS = publicChains(RAW_CHAINS, VENUES);
