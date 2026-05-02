// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Restaurant registry
//
// HOW TO ADD A NEW CLIENT:
//   1. Copy the template block at the very bottom of this file
//   2. Paste it as a new entry in VENUES (before the closing }; )
//   3. Fill in all fields — see comments for what each field means
//   4. Create folder:  restaurants/[id]/  and add compressed photos
//   5. Add the restaurant to src/data.jsx (homepage + search listing)
//   6. git add . && git commit -m "Add [Restaurant Name]" && git push
//      → live on [id].akiwi.at within ~30 seconds
// ─────────────────────────────────────────────────────────────────────────────

const VENUES = {

  // ── ALATURKA ERDBERGSTRAßE 1030 ───────────────────────────────────────────────
  'alaturka-1030': {
    id: 'alaturka-1030',
    name: 'Alaturka Erdbergstraße',
    tagline_de: 'Türkische Spezialitäten — Döner, Pide, Pizza',
    tagline_en: 'Turkish specialties — Döner, Pide, Pizza',
    district: 3,
    districtName: 'Landstraße',
    address: 'Erdbergstraße 93, 1030 Wien',
    phone: '+43 699 10327337',
    website: 'alaturka-doener.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 18,  a: '#7C2D12', b: '#431407' },
      { hue: 32,  a: '#92400E', b: '#451A03' },
      { hue: 8,   a: '#7F1D1D', b: '#450A0A' },
    ],
    tags: ['Take-away', 'Schnell', 'Türkisch', 'Catering'],
    hours: [
      { day: 0, open: '10:00', close: '22:00' },
      { day: 1, open: '10:00', close: '22:00' },
      { day: 2, open: '10:00', close: '22:00' },
      { day: 3, open: '10:00', close: '22:00' },
      { day: 4, open: '10:00', close: '22:00' },
      { day: 5, open: '11:00', close: '22:00' },
      { day: 6, open: '11:00', close: '22:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner & Dürüm', cat_en: 'Döner & Dürüm', items: [
        { name_de: 'Döner Sandwich (Kalb)', name_en: 'Döner sandwich (veal)', price: '6,50' },
        { name_de: 'Döner Sandwich (Huhn)', name_en: 'Döner sandwich (chicken)', price: '6,50' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap', price: '7,90' },
        { name_de: 'Vegetarischer Döner', name_en: 'Vegetarian döner', price: '6,50', tag: 'V' },
      ]},
      { cat_de: 'Pide & Pizza', cat_en: 'Pide & Pizza', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun', price: '4,50' },
        { name_de: 'Pide (Käse)', name_en: 'Pide (cheese)', price: '8,90' },
        { name_de: 'Pizza Margherita', name_en: 'Pizza Margherita', price: '8,90' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1120', name: 'Alaturka Am Schöpfwerk', district: 12, status: 'unknown', cat: 'Kebab', distance_km: 5.2, rating: 4.0, hue: 28 },
      { id: 'alaturka-1150', name: 'Alaturka MaHü',         district: 15, status: 'unknown', cat: 'Kebab', distance_km: 4.8, rating: 4.0, hue: 8 },
    ],
    x: 60, y: 52,
  },

  // ── ALATURKA AM SCHÖPFWERK 1120 ───────────────────────────────────────────────
  'alaturka-1120': {
    id: 'alaturka-1120',
    name: 'Alaturka Am Schöpfwerk',
    tagline_de: 'Türkische Spezialitäten bei der U6 Schöpfwerk',
    tagline_en: 'Turkish specialties at U6 Schöpfwerk',
    district: 12,
    districtName: 'Meidling',
    address: 'Am Schöpfwerk 68, 1120 Wien',
    phone: '+43 681 10359266',
    website: 'alaturka-doener.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 28, a: '#92400E', b: '#451A03' },
      { hue: 18, a: '#7C2D12', b: '#431407' },
      { hue: 38, a: '#713F12', b: '#422006' },
    ],
    tags: ['Take-away', 'Schnell', 'Türkisch', 'U-Bahn-Nähe'],
    hours: [
      { day: 0, open: '09:00', close: '21:00' },
      { day: 1, open: '09:00', close: '21:00' },
      { day: 2, open: '09:00', close: '21:00' },
      { day: 3, open: '09:00', close: '21:00' },
      { day: 4, open: '09:00', close: '21:00' },
      { day: 5, open: '10:00', close: '21:00' },
      { day: 6, open: '10:00', close: '21:00' },
    ],
    amenities: { parking: false, wheelchair: true, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner & Dürüm', cat_en: 'Döner & Dürüm', items: [
        { name_de: 'Döner Sandwich (Kalb)', name_en: 'Döner sandwich (veal)', price: '6,50' },
        { name_de: 'Döner Sandwich (Huhn)', name_en: 'Döner sandwich (chicken)', price: '6,50' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap', price: '7,90' },
      ]},
      { cat_de: 'Pide & Pizza', cat_en: 'Pide & Pizza', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun', price: '4,50' },
        { name_de: 'Pide gemischt', name_en: 'Mixed pide', price: '9,50' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1230', name: 'Alaturka Alterlaa', district: 23, status: 'unknown', cat: 'Kebab', distance_km: 3.4, rating: 4.0, hue: 38 },
      { id: 'alaturka-1150', name: 'Alaturka MaHü',    district: 15, status: 'unknown', cat: 'Kebab', distance_km: 4.0, rating: 4.0, hue: 8 },
    ],
    x: 38, y: 70,
  },

  // ── ALATURKA MAHÜ 1150 ────────────────────────────────────────────────────────
  'alaturka-1150': {
    id: 'alaturka-1150',
    name: 'Alaturka MaHü',
    tagline_de: 'Türkisch & Italienisch nahe Westbahnhof',
    tagline_en: 'Turkish & Italian near Westbahnhof',
    district: 15,
    districtName: 'Rudolfsheim-Fünfhaus',
    address: 'Mariahilfer Straße 134, 1150 Wien',
    phone: '+43 678 1314354',
    website: 'alaturka-doener.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 8,  a: '#7F1D1D', b: '#450A0A' },
      { hue: 18, a: '#7C2D12', b: '#431407' },
      { hue: 28, a: '#92400E', b: '#451A03' },
    ],
    tags: ['Take-away', 'Schnell', 'Türkisch', 'Westbahnhof'],
    hours: [
      { day: 0, open: '10:00', close: '22:00' },
      { day: 1, open: '10:00', close: '22:00' },
      { day: 2, open: '10:00', close: '22:00' },
      { day: 3, open: '10:00', close: '22:00' },
      { day: 4, open: '10:00', close: '22:00' },
      { day: 5, open: '10:00', close: '22:00' },
      { day: 6, open: '11:00', close: '22:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner & Dürüm', cat_en: 'Döner & Dürüm', items: [
        { name_de: 'Döner Sandwich (Kalb)', name_en: 'Döner sandwich (veal)', price: '6,50' },
        { name_de: 'Döner Sandwich (Huhn)', name_en: 'Döner sandwich (chicken)', price: '6,50' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap', price: '7,90' },
      ]},
      { cat_de: 'Pide & Pizza', cat_en: 'Pide & Pizza', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun', price: '4,50' },
        { name_de: 'Pizza Salami', name_en: 'Pizza Salami', price: '9,50' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1030', name: 'Alaturka Erdbergstraße', district: 3,  status: 'unknown', cat: 'Kebab', distance_km: 4.8, rating: 4.0, hue: 18 },
      { id: 'alaturka-1230', name: 'Alaturka Alterlaa',      district: 23, status: 'unknown', cat: 'Kebab', distance_km: 6.1, rating: 4.0, hue: 38 },
    ],
    x: 32, y: 52,
  },

  // ── ALATURKA ALTERLAA 1230 ────────────────────────────────────────────────────
  'alaturka-1230': {
    id: 'alaturka-1230',
    name: 'Alaturka Alterlaa',
    tagline_de: 'Erste Alaturka-Filiale seit 2004 — bei der U6 Alterlaa',
    tagline_en: 'First Alaturka location since 2004 — at U6 Alterlaa',
    district: 23,
    districtName: 'Liesing',
    address: 'Anton-Baumgartner-Straße 121, 1230 Wien',
    phone: '+43 699 19671499',
    website: 'alaturka-doener.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 38, a: '#713F12', b: '#422006' },
      { hue: 18, a: '#7C2D12', b: '#431407' },
      { hue: 28, a: '#92400E', b: '#451A03' },
    ],
    tags: ['Take-away', 'Schnell', 'Türkisch', 'Seit 2004'],
    hours: [
      { day: 0, open: '10:00', close: '22:00' },
      { day: 1, open: '10:00', close: '22:00' },
      { day: 2, open: '10:00', close: '22:00' },
      { day: 3, open: '10:00', close: '22:00' },
      { day: 4, open: '10:00', close: '22:00' },
      { day: 5, open: '10:00', close: '22:00' },
      { day: 6, open: '11:00', close: '22:00' },
    ],
    amenities: { parking: false, wheelchair: true, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner & Dürüm', cat_en: 'Döner & Dürüm', items: [
        { name_de: 'Döner Sandwich (Kalb)', name_en: 'Döner sandwich (veal)', price: '6,50' },
        { name_de: 'Döner Sandwich (Huhn)', name_en: 'Döner sandwich (chicken)', price: '6,50' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap', price: '7,90' },
      ]},
      { cat_de: 'Pide & Pizza', cat_en: 'Pide & Pizza', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun', price: '4,50' },
        { name_de: 'Pide Spinat', name_en: 'Spinach pide', price: '8,90', tag: 'V' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1120', name: 'Alaturka Am Schöpfwerk', district: 12, status: 'unknown', cat: 'Kebab', distance_km: 3.4, rating: 4.0, hue: 28 },
      { id: 'alaturka-1030', name: 'Alaturka Erdbergstraße', district: 3,  status: 'unknown', cat: 'Kebab', distance_km: 8.6, rating: 4.0, hue: 18 },
    ],
    x: 38, y: 88,
  },

  // ── ALATURKA WIENER NEUSTADT 2700 ─────────────────────────────────────────────
  'alaturka-2700': {
    id: 'alaturka-2700',
    name: 'Alaturka Wiener Neustadt',
    tagline_de: 'Türkische Spezialitäten in Niederösterreich',
    tagline_en: 'Turkish specialties in Lower Austria',
    district: 0,
    districtName: 'Wiener Neustadt',
    address: 'Stadionstraße 5, 2700 Wiener Neustadt',
    phone: '+43 2622 83542',
    website: 'alaturka-doener.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 22, a: '#78350F', b: '#451a03' },
      { hue: 18, a: '#7C2D12', b: '#431407' },
      { hue: 38, a: '#713F12', b: '#422006' },
    ],
    tags: ['Take-away', 'Schnell', 'Türkisch', 'Niederösterreich'],
    hours: [
      { day: 0, open: '10:00', close: '22:00' },
      { day: 1, open: '10:00', close: '22:00' },
      { day: 2, open: '10:00', close: '22:00' },
      { day: 3, open: '10:00', close: '22:00' },
      { day: 4, open: '10:00', close: '22:00' },
      { day: 5, open: '10:00', close: '22:00' },
      { day: 6, open: '10:00', close: '21:00' },
    ],
    amenities: { parking: true, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner & Dürüm', cat_en: 'Döner & Dürüm', items: [
        { name_de: 'Döner Sandwich (Kalb)', name_en: 'Döner sandwich (veal)', price: '6,50' },
        { name_de: 'Döner Sandwich (Huhn)', name_en: 'Döner sandwich (chicken)', price: '6,50' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap', price: '7,90' },
      ]},
      { cat_de: 'Pide & Pizza', cat_en: 'Pide & Pizza', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun', price: '4,50' },
        { name_de: 'Pide gemischt', name_en: 'Mixed pide', price: '9,50' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1230', name: 'Alaturka Alterlaa', district: 23, status: 'unknown', cat: 'Kebab', distance_km: 42, rating: 4.0, hue: 38 },
    ],
    x: 78, y: 95,
  },

  // ── ANTEP EVI GRILLHAUS 1120 ──────────────────────────────────────────────────
  'antep-evi': {
    id: 'antep-evi',
    name: 'Antep Evi Grillhaus',
    tagline_de: 'Authentische Gaziantep-Küche aus der Südosttürkei',
    tagline_en: 'Authentic Gaziantep cuisine from southeastern Turkey',
    district: 12,
    districtName: 'Meidling',
    address: 'Khleslplatz 5, 1120 Wien',
    phone: '+43 699 1100 27 27',
    website: 'antepevi-grillhaus.at',
    status: 'unknown',
    categories: ['Restaurant', 'Kebab'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 130, a: '#1E3A1E', b: '#052e16' },
      { hue: 18,  a: '#7C2D12', b: '#431407' },
      { hue: 38,  a: '#713F12', b: '#422006' },
    ],
    tags: ['Türkisch', 'Gaziantep', 'Pide', 'Lahmacun', 'Baklava'],
    hours: [
      { day: 0, open: null,    close: null    },
      { day: 1, open: '12:00', close: '23:00' },
      { day: 2, open: '12:00', close: '23:00' },
      { day: 3, open: '12:00', close: '23:00' },
      { day: 4, open: '12:00', close: '23:00' },
      { day: 5, open: '12:00', close: '23:00' },
      { day: 6, open: '12:00', close: '23:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: false, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Frühstück', cat_en: 'Breakfast', items: [
        { name_de: 'Türkisches Frühstück', name_en: 'Turkish breakfast' },
      ]},
      { cat_de: 'Suppen & Vorspeisen', cat_en: 'Soups & Starters', items: [
        { name_de: 'Linsensuppe', name_en: 'Lentil soup', tag: 'V' },
        { name_de: 'Mezze-Auswahl', name_en: 'Mezze selection' },
      ]},
      { cat_de: 'Hauptgerichte vom Grill', cat_en: 'Main courses from grill', items: [
        { name_de: 'Adana Kebab', name_en: 'Adana kebab' },
        { name_de: 'Lammspieße', name_en: 'Lamb skewers' },
        { name_de: 'Hähnchen Shish', name_en: 'Chicken shish' },
      ]},
      { cat_de: 'Pide & Lahmacun', cat_en: 'Pide & Lahmacun', items: [
        { name_de: 'Lahmacun', name_en: 'Lahmacun' },
        { name_de: 'Pide gemischt', name_en: 'Mixed pide' },
      ]},
      { cat_de: 'Süßes', cat_en: 'Sweets', items: [
        { name_de: 'Antep Baklava', name_en: 'Antep baklava' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'alaturka-1120', name: 'Alaturka Am Schöpfwerk', district: 12, status: 'unknown', cat: 'Kebab', distance_km: 1.2, rating: 4.0, hue: 28 },
      { id: 'alaturka-1230', name: 'Alaturka Alterlaa',      district: 23, status: 'unknown', cat: 'Kebab', distance_km: 4.0, rating: 4.0, hue: 38 },
    ],
    x: 36, y: 66,
  },

};

// ─────────────────────────────────────────────────────────────────────────────
// ── ADD NEW RESTAURANT HERE ──────────────────────────────────────────────────
//
// Copy this block, paste it above this comment (before the closing }; ),
// and fill in all fields. The id must match the folder name in restaurants/
// and the subdomain slug (e.g. id: 'mein-restaurant' → mein-restaurant.akiwi.at)
//
// 'mein-restaurant': {
//   id: 'mein-restaurant',            // ← slug: lowercase, hyphens only
//   name: 'Mein Restaurant',          // ← full display name
//   tagline_de: 'Beschreibung auf Deutsch',
//   tagline_en: 'Description in English',
//   district: 7,                      // ← Bezirk 1–23
//   districtName: 'Neubau',
//   address: 'Straße 1, 1070 Wien',
//   phone: '+43 1 ...',
//   website: '',                       // ← or 'example.at' (no https://)
//   status: 'self',                    // ← 'verified' | 'self' | 'unknown'
//   categories: ['Restaurant'],        // ← from: Restaurant, Kebab, Pizza, Cafe
//   price: '€€',                       // ← '€' | '€€' | '€€€'
//   rating: 4.5,
//   reviews: 0,
//   // Color gradient (placeholder until real photos):
//   gallery: [
//     { hue: 18, a: '#7C2D12', b: '#431407' },
//     { hue: 18, a: '#7C2D12', b: '#431407' },
//     { hue: 18, a: '#7C2D12', b: '#431407' },
//     { hue: 18, a: '#7C2D12', b: '#431407' },
//     { hue: 18, a: '#7C2D12', b: '#431407' },
//   ],
//   // Real photos (once uploaded to restaurants/mein-restaurant/):
//   // gallery: [
//   //   { src: 'restaurants/mein-restaurant/photo1.webp' },
//   //   { src: 'restaurants/mein-restaurant/photo2.webp' },
//   //   { src: 'restaurants/mein-restaurant/photo3.webp' },
//   //   { src: 'restaurants/mein-restaurant/photo4.webp' },
//   //   { src: 'restaurants/mein-restaurant/photo5.webp' },
//   // ],
//   tags: ['Halal', 'Familiär'],       // ← add as many as needed
//   hours: [
//     // day: 0=Mo, 1=Di, 2=Mi, 3=Do, 4=Fr, 5=Sa, 6=So
//     // Geschlossen: { day: 0, open: null, close: null }
//     { day: 0, open: '11:00', close: '22:00' },
//     { day: 1, open: '11:00', close: '22:00' },
//     { day: 2, open: '11:00', close: '22:00' },
//     { day: 3, open: '11:00', close: '22:00' },
//     { day: 4, open: '11:00', close: '23:00' },
//     { day: 5, open: '11:00', close: '23:00' },
//     { day: 6, open: '12:00', close: '21:00' },
//   ],
//   amenities: {
//     parking:    false,
//     wheelchair: false,
//     prayer:     false,
//     delivery:   false,
//     outdoor:    false,
//     wifi:       false,
//   },
//   menu: [
//     {
//       cat_de: 'Speisen', cat_en: 'Food',
//       items: [
//         { name_de: 'Gericht 1', name_en: 'Dish 1', price: '10,00', tag: 'H' },
//         // tag: 'H' = Halal, 'V' = Vegetarisch, leave out tag if neither
//       ],
//     },
//   ],
//   reviews_list: [],                  // ← leave empty, fills over time
//   verification_log: [
//     { date: '2026-01-01', actor_de: 'Inhaber', actor_en: 'Owner', event_de: 'Selbstauskunft eingereicht', event_en: 'Self-declaration submitted' },
//   ],
//   similar: [],                       // ← leave empty or add nearby restaurants
//   x: 50, y: 50,                      // ← map position (0–100), approximate
// },
//
// ─────────────────────────────────────────────────────────────────────────────

const DETAIL_COPY = {
  de: {
    back: 'Zurück',
    breadcrumb: ['Home', 'Wien', ''],   // overwritten at runtime by venue selector
    navHome: 'Home', navSubmit: 'Eintragen', navImprint: 'Impressum',
    statusVerified: 'Verifiziert',
    statusSelf: 'Selbstauskunft',
    statusUnknown: 'Unbekannt',
    statusBlurbVerified: 'Vor Ort vom Akiwi-Team geprüft. Halal-Zertifikat gesichtet, Foto im Verlauf.',
    statusBlurbSelf: 'Vom Inhaber selbst angegeben. Noch keine Vor-Ort-Prüfung durch Akiwi.',
    statusBlurbUnknown: 'Status unklar — bitte prüfe direkt im Lokal.',
    actions: { directions: 'Route', call: 'Anrufen', share: 'Teilen', save: 'Speichern' },
    sections: {
      gallery: 'Galerie',
      info: 'Info',
      hours: 'Öffnungszeiten',
      menu: 'Karte',
      reviews: 'Bewertungen',
      verification: 'Verifizierung',
      similar: 'Ähnliche Lokale in der Nähe',
      address: 'Adresse',
      amenities: 'Ausstattung',
    },
    openNow: 'Jetzt geöffnet',
    closedNow: 'Geschlossen',
    closesAt: (t) => `Schließt um ${t}`,
    opensAt: (t) => `Öffnet um ${t}`,
    days: ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'],
    daysShort: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    today: 'Heute',
    veg: 'Vegetarisch',
    halalTag: 'Halal',
    reviewsCount: (n) => `${n} Bewertungen`,
    writeReview: 'Bewertung schreiben',
    addedBy: 'durch',
    sourceTrust: 'Quelle: Akiwi-Vor-Ort-Besuch',
    photoCount: (n) => `${n} Fotos`,
    seeAllPhotos: 'Alle Fotos',
    reportIssue: 'Ungenauigkeit melden',
    minDirections: 'Route in Google Maps',
    distance: (km) => `${km} km entfernt`,
    amenityLabels: {
      parking: 'Parkplatz',
      wheelchair: 'Rollstuhlgerecht',
      prayer: 'Gebetsraum',
      delivery: 'Lieferung',
      outdoor: 'Terrasse',
      wifi: 'WLAN',
    },
    similarSub: (n, name) => `Mehr in ${name}`,
    verifiedHistory: 'Verlauf der Verifizierung',
  },
  en: {
    back: 'Back',
    breadcrumb: ['Home', 'Vienna', ''],  // overwritten at runtime by venue selector
    navHome: 'Home', navSubmit: 'Submit', navImprint: 'Imprint',
    statusVerified: 'Verified',
    statusSelf: 'Self-declared',
    statusUnknown: 'Unknown',
    statusBlurbVerified: 'Checked on-site by the Akiwi team. Halal certificate sighted, photo in the log.',
    statusBlurbSelf: 'Declared by the owner. No on-site check by Akiwi yet.',
    statusBlurbUnknown: 'Status unclear — please check directly at the venue.',
    actions: { directions: 'Directions', call: 'Call', share: 'Share', save: 'Save' },
    sections: {
      gallery: 'Gallery',
      info: 'Info',
      hours: 'Hours',
      menu: 'Menu',
      reviews: 'Reviews',
      verification: 'Verification',
      similar: 'Similar nearby',
      address: 'Address',
      amenities: 'Amenities',
    },
    openNow: 'Open now',
    closedNow: 'Closed',
    closesAt: (t) => `Closes at ${t}`,
    opensAt: (t) => `Opens at ${t}`,
    days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    daysShort: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    today: 'Today',
    veg: 'Vegetarian',
    halalTag: 'Halal',
    reviewsCount: (n) => `${n} reviews`,
    writeReview: 'Write a review',
    addedBy: 'by',
    sourceTrust: 'Source: Akiwi on-site visit',
    photoCount: (n) => `${n} photos`,
    seeAllPhotos: 'See all photos',
    reportIssue: 'Report an issue',
    minDirections: 'Open in Google Maps',
    distance: (km) => `${km} km away`,
    amenityLabels: {
      parking: 'Parking',
      wheelchair: 'Wheelchair access',
      prayer: 'Prayer room',
      delivery: 'Delivery',
      outdoor: 'Outdoor seating',
      wifi: 'Wi-Fi',
    },
    similarSub: (n, name) => `More in ${name}`,
    verifiedHistory: 'Verification log',
  },
};

Object.assign(window, { VENUES, DETAIL_COPY });
