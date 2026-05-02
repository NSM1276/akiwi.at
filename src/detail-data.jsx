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

  // ── DAMLA CAFE-KONDITOREI-BÄCKEREI 1120 ───────────────────────────────────────
  'damla': {
    id: 'damla',
    name: 'Damla Cafe-Konditorei-Bäckerei',
    tagline_de: 'Restaurant, Konditorei & Bäckerei unter einem Dach',
    tagline_en: 'Restaurant, pastry shop & bakery under one roof',
    district: 12,
    districtName: 'Meidling',
    address: 'Wilhelmstraße 53, 1120 Wien (Bahnhof Meidling)',
    phone: '+43 1 810 3519',
    website: 'damla.at',
    status: 'unknown',
    categories: ['Restaurant', 'Cafe', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 350, a: '#7F1D1D', b: '#450A0A' },
      { hue: 38,  a: '#713F12', b: '#422006' },
      { hue: 18,  a: '#7C2D12', b: '#431407' },
    ],
    tags: ['Türkisch', 'Konditorei', 'Bäckerei', 'Lieferung', 'Mittagsmenü', 'Baklava'],
    hours: [
      // Lieferzeiten lt. Webseite — Lokalöffnungszeiten ggf. abweichend
      { day: 0, open: '11:00', close: '22:00' },
      { day: 1, open: '11:00', close: '22:00' },
      { day: 2, open: '11:00', close: '22:00' },
      { day: 3, open: '11:00', close: '22:00' },
      { day: 4, open: '11:00', close: '22:00' },
      { day: 5, open: '11:00', close: '22:00' },
      { day: 6, open: '11:00', close: '22:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Pizza', cat_en: 'Pizza', items: [
        { name_de: 'Single Pizza (Abholung)', name_en: 'Single pizza (pickup)', price: '6,90' },
        { name_de: 'Single Pizza + 0,33l Getränk (Abholung)', name_en: 'Single pizza + 0.33l drink (pickup)', price: '6,50' },
      ]},
      { cat_de: 'Kebap & Türkische Speisen', cat_en: 'Kebap & Turkish dishes', items: [
        { name_de: 'Döner Kebap', name_en: 'Döner kebab' },
        { name_de: 'Türkische warme Spezialitäten', name_en: 'Turkish warm specialties' },
      ]},
      { cat_de: 'Klassiker', cat_en: 'Classics', items: [
        { name_de: 'Wiener Schnitzel', name_en: 'Wiener schnitzel' },
        { name_de: 'Burger', name_en: 'Burger' },
        { name_de: 'Pasta', name_en: 'Pasta' },
      ]},
      { cat_de: 'Konditorei & Bäckerei', cat_en: 'Pastry & bakery', items: [
        { name_de: 'Hausgemachte Torten & Kuchen', name_en: 'Homemade cakes' },
        { name_de: 'Türkische Baklava', name_en: 'Turkish baklava' },
        { name_de: 'Frisches Brot & Kleingebäck', name_en: 'Fresh bread & pastries' },
      ]},
      { cat_de: 'Mittagsmenü', cat_en: 'Lunch menu', items: [
        { name_de: 'Wechselnde Mittagsangebote', name_en: 'Rotating lunch specials' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'antep-evi',     name: 'Antep Evi Grillhaus',     district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 1.5, rating: 4.0, hue: 130 },
      { id: 'alaturka-1120', name: 'Alaturka Am Schöpfwerk', district: 12, status: 'unknown', cat: 'Kebab',      distance_km: 2.8, rating: 4.0, hue: 28 },
    ],
    x: 36, y: 68,
  },

  // ── BAKI'S SCHNITZELPARADIES 1120 ─────────────────────────────────────────────
  'bakis-schnitzelparadies': {
    id: 'bakis-schnitzelparadies',
    name: "Baki's Schnitzelparadies",
    tagline_de: 'Schnitzel, Grillhuhn & österreichische Klassiker',
    tagline_en: 'Schnitzel, grilled chicken & Austrian classics',
    district: 12,
    districtName: 'Meidling',
    address: 'Meidlinger Hauptstraße 49/G2, 1120 Wien',
    phone: '+43 664 1563446',
    website: 'foodora.at',
    status: 'unknown',
    categories: ['Restaurant'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 38, a: '#78350F', b: '#451a03' },
      { hue: 50, a: '#713F12', b: '#422006' },
      { hue: 28, a: '#92400E', b: '#451A03' },
    ],
    tags: ['Schnitzel', 'Grill', 'Österreichisch', 'Lieferung', 'Take-away', 'Cordon Bleu'],
    hours: [
      { day: 0, open: '11:00', close: '19:30' },
      { day: 1, open: '11:00', close: '19:30' },
      { day: 2, open: '11:00', close: '19:30' },
      { day: 3, open: '11:00', close: '19:30' },
      { day: 4, open: '11:00', close: '19:30' },
      { day: 5, open: '11:00', close: '19:30' },
      { day: 6, open: null,    close: null    },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Menüs (inkl. 0,33l Getränk)', cat_en: 'Menus (incl. 0.33l drink)', items: [
        { name_de: 'Semmel Menü (Schnitzelsemmel + Pommes)', name_en: 'Sandwich menu (schnitzel sandwich + fries)', price: '10,50' },
        { name_de: 'Schnitzel Menü (Hühnerschnitzel + Beilage)', name_en: 'Schnitzel menu (chicken + side)', price: '13,50' },
        { name_de: 'Hendl Menü (½ Grillhendl + Beilage)', name_en: 'Chicken menu (½ grilled chicken + side)', price: '11,50' },
        { name_de: 'Fischmenü (Gebackener Kabeljau + Beilage)', name_en: 'Fish menu (fried cod + side)', price: '15,50' },
      ]},
      { cat_de: 'Suppen & Semmeln', cat_en: 'Soups & sandwiches', items: [
        { name_de: 'Hühnersuppe (mit Semmel)', name_en: 'Chicken soup (with bread roll)', price: '5,00' },
        { name_de: 'Linsensuppe (mit Semmel)', name_en: 'Lentil soup (with bread roll)', price: '5,00', tag: 'V' },
        { name_de: 'Schnitzelsemmel', name_en: 'Schnitzel sandwich', price: '5,90' },
        { name_de: 'Cordon Bleu Semmel', name_en: 'Cordon bleu sandwich', price: '5,90' },
        { name_de: 'Schnitzel Wrap', name_en: 'Schnitzel wrap', price: '6,90' },
        { name_de: 'Emmentaler Semmel', name_en: 'Emmental sandwich', price: '6,50', tag: 'V' },
      ]},
      { cat_de: 'Hauptgerichte', cat_en: 'Main courses', items: [
        { name_de: 'Hühnerschnitzel (ohne Beilage)', name_en: 'Chicken schnitzel (no side)', price: '10,00' },
        { name_de: 'Hühnerschnitzel mit Beilage', name_en: 'Chicken schnitzel with side', price: '12,50' },
        { name_de: 'Cordon Bleu mit Beilage', name_en: 'Cordon bleu with side', price: '13,90' },
        { name_de: '½ Grillhuhn (ohne Beilage)', name_en: '½ grilled chicken (no side)', price: '6,90' },
        { name_de: 'Ganzes Grillhuhn (ohne Beilage)', name_en: 'Whole grilled chicken (no side)', price: '11,50' },
        { name_de: 'Gebackener Schafskäse mit Beilage', name_en: 'Fried sheep cheese with side', price: '11,50', tag: 'V' },
        { name_de: 'Gebackene Champignons mit Sauce Tartare', name_en: 'Fried mushrooms with tartar sauce', price: '8,90', tag: 'V' },
        { name_de: 'Schnitzel Box (mit Salat, Tomaten, Zwiebeln)', name_en: 'Schnitzel box (with salad, tomatoes, onions)', price: '7,50' },
      ]},
      { cat_de: 'Nachspeisen', cat_en: 'Desserts', items: [
        { name_de: 'Tiramisu', name_en: 'Tiramisu', price: '4,50' },
        { name_de: 'Milchreis', name_en: 'Rice pudding', price: '4,50' },
      ]},
      { cat_de: 'Getränke', cat_en: 'Drinks', items: [
        { name_de: 'Cola / Fanta / Sprite / Almdudler / Eistee / Ayran (0,33l)', name_en: 'Soft drinks / Ayran (0.33l)', price: '2,20' },
        { name_de: 'Mineralwasser (0,5l)', name_en: 'Mineral water (0.5l)', price: '2,00' },
        { name_de: 'Red Bull (0,25l)', name_en: 'Red Bull (0.25l)', price: '3,50' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'damla',         name: 'Damla Cafe-Konditorei-Bäckerei', district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 0.6, rating: 4.0, hue: 350 },
      { id: 'antep-evi',     name: 'Antep Evi Grillhaus',           district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 1.8, rating: 4.0, hue: 130 },
      { id: 'alaturka-1120', name: 'Alaturka Am Schöpfwerk',        district: 12, status: 'unknown', cat: 'Kebab',      distance_km: 2.5, rating: 4.0, hue: 28 },
    ],
    x: 38, y: 65,
  },

  // ── LE DÖNER 1120 ─────────────────────────────────────────────────────────────
  'le-doener': {
    id: 'le-doener',
    name: 'Le Döner',
    tagline_de: 'Bio-Döner & Pizza mit Hawaiian Flavours',
    tagline_en: 'Organic döner & pizza with Hawaiian flavours',
    district: 12,
    districtName: 'Meidling',
    address: 'Meidlinger Hauptstraße 43, 1120 Wien',
    phone: '+43 660 6941900',
    website: 'xn--ledner-jua.at',
    status: 'unknown',
    categories: ['Kebab', 'Pizza'],
    price: '€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 200, a: '#1E3A8A', b: '#0c1e42' },
      { hue: 18,  a: '#7C2D12', b: '#431407' },
      { hue: 130, a: '#1E3A1E', b: '#052e16' },
    ],
    tags: ['Bio', 'Türkisch', 'Hawaiian', 'Ohne Zusatzstoffe', 'Lieferung', 'Take-away'],
    hours: [
      { day: 0, open: '10:00', close: '21:00' },
      { day: 1, open: '10:00', close: '21:00' },
      { day: 2, open: '10:00', close: '21:00' },
      { day: 3, open: '10:00', close: '21:00' },
      { day: 4, open: '10:00', close: '21:00' },
      { day: 5, open: '10:00', close: '21:00' },
      { day: 6, open: '11:00', close: '21:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Döner Spezialitäten', cat_en: 'Döner specialties', items: [
        { name_de: 'Klassischer Döner (Bio-Fleisch)', name_en: 'Classic döner (organic meat)' },
        { name_de: 'Vegetarischer Döner', name_en: 'Vegetarian döner', tag: 'V' },
        { name_de: 'Dürüm Wrap', name_en: 'Dürüm wrap' },
        { name_de: 'Döner Box (mit Salat oder Pommes)', name_en: 'Döner box (with salad or fries)' },
      ]},
      { cat_de: 'Pizza & Imbiss', cat_en: 'Pizza & Snacks', items: [
        { name_de: 'Pizza (italienischer Stil)', name_en: 'Pizza (Italian style)' },
        { name_de: 'Hawaiian Style Spezialitäten', name_en: 'Hawaiian style specialties' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'bakis-schnitzelparadies', name: "Baki's Schnitzelparadies",        district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 0.1, rating: 4.0, hue: 38  },
      { id: 'damla',                   name: 'Damla Cafe-Konditorei-Bäckerei', district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 0.5, rating: 4.0, hue: 350 },
      { id: 'antep-evi',               name: 'Antep Evi Grillhaus',           district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 1.7, rating: 4.0, hue: 130 },
    ],
    x: 39, y: 65,
  },

  // ── BURGALLIO MEIDLING 1120 ───────────────────────────────────────────────────
  'burgallio-1120': {
    id: 'burgallio-1120',
    name: 'Burgallio Meidling',
    tagline_de: 'Burger mit hochwertigem Fleisch & hausgemachten Saucen',
    tagline_en: 'Burgers with quality meat & homemade sauces',
    district: 12,
    districtName: 'Meidling',
    address: 'Meidlinger Hauptstraße 45, 1120 Wien',
    phone: '+43 1 353 17 07',
    website: 'burgallio.at',
    status: 'unknown',
    categories: ['Restaurant'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 12,  a: '#7C2D12', b: '#431407' },
      { hue: 18,  a: '#92400E', b: '#451A03' },
      { hue: 0,   a: '#7F1D1D', b: '#450A0A' },
    ],
    tags: ['Burger', 'Vegan', 'Snacks', 'Lieferung', 'Take-away', 'Hausgemacht'],
    hours: [
      { day: 0, open: '10:30', close: '22:00' },
      { day: 1, open: '10:30', close: '22:00' },
      { day: 2, open: '10:30', close: '22:00' },
      { day: 3, open: '10:30', close: '22:00' },
      { day: 4, open: '10:30', close: '23:00' },
      { day: 5, open: '10:30', close: '23:00' },
      { day: 6, open: '11:30', close: '22:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Burger (Rindfleisch 140g, Medium Well)', cat_en: 'Burgers (beef 140g, medium well)', items: [
        { name_de: 'Classic Burger (Salat, Tomaten, Zwiebeln, Gewürzgurken, Ketchup, Mayo)', name_en: 'Classic burger (lettuce, tomato, onion, pickles, ketchup, mayo)', price: '8,90' },
        { name_de: 'Cheeseburger (Classic + Cheddar)', name_en: 'Cheeseburger (classic + cheddar)', price: '9,90' },
        { name_de: 'Double Burger (2× Rindfleisch, Haus-Sauce)', name_en: 'Double burger (2× beef, house sauce)', price: '13,50' },
        { name_de: 'BBQ Burger (Speck, Röstzwiebeln, BBQ-Sauce, Cheddar)', name_en: 'BBQ burger (bacon, fried onions, BBQ sauce, cheddar)', price: '10,90' },
        { name_de: 'Chili Cheese Burger (Jalapeños, scharfe Sauce, Cheddar)', name_en: 'Chili cheese burger (jalapeños, spicy sauce, cheddar)', price: '10,90' },
        { name_de: 'Mushroom Burger (Champignons, Zwiebeln, Spezialsauce)', name_en: 'Mushroom burger (mushrooms, onions, special sauce)', price: '10,50' },
      ]},
      { cat_de: 'Chicken Burger (100% Hühnerbrust)', cat_en: 'Chicken burgers (100% chicken breast)', items: [
        { name_de: 'Crispy Chicken (paniert, Salat, Mayo)', name_en: 'Crispy chicken (breaded, lettuce, mayo)', price: '8,50' },
        { name_de: 'Grilled Chicken (gegrillt, Tomaten, Haussauce)', name_en: 'Grilled chicken (grilled, tomato, house sauce)', price: '8,90' },
      ]},
      { cat_de: 'Veggie & Vegan', cat_en: 'Veggie & Vegan', items: [
        { name_de: 'Veggie Burger (Gemüse-Patty, Salat, Haussauce)', name_en: 'Veggie burger (veggie patty, lettuce, house sauce)', price: '8,50', tag: 'V' },
        { name_de: 'Halloumi Burger (Halloumi, Rucola, Tomaten)', name_en: 'Halloumi burger (halloumi, arugula, tomato)', price: '9,50', tag: 'V' },
        { name_de: 'Vegan Burger (pflanzliches Patty, vegane Mayo)', name_en: 'Vegan burger (plant patty, vegan mayo)', price: '9,90', tag: 'V' },
      ]},
      { cat_de: 'Beilagen (Fries & Snacks)', cat_en: 'Sides (Fries & Snacks)', items: [
        { name_de: 'Pommes (Klein)', name_en: 'Fries (small)', price: '3,50', tag: 'V' },
        { name_de: 'Pommes (Groß)', name_en: 'Fries (large)', price: '4,90', tag: 'V' },
        { name_de: 'Süßkartoffelpommes', name_en: 'Sweet potato fries', price: '5,50', tag: 'V' },
        { name_de: 'Onion Rings (8 Stk.)', name_en: 'Onion rings (8 pcs)', price: '4,50', tag: 'V' },
        { name_de: 'Chili Cheese Nuggets (6 Stk.)', name_en: 'Chili cheese nuggets (6 pcs)', price: '5,50' },
        { name_de: 'Mozzarella Sticks (5 Stk.)', name_en: 'Mozzarella sticks (5 pcs)', price: '5,50', tag: 'V' },
      ]},
      { cat_de: 'Saucen (Extra)', cat_en: 'Sauces (extra)', items: [
        { name_de: 'Ketchup / Mayo', name_en: 'Ketchup / Mayo', price: '0,70' },
        { name_de: 'Burgallio Haus-Sauce', name_en: 'Burgallio house sauce', price: '1,00' },
        { name_de: 'BBQ / Knoblauch / Chili-Sauce', name_en: 'BBQ / Garlic / Chili sauce', price: '1,00' },
      ]},
      { cat_de: 'Getränke', cat_en: 'Drinks', items: [
        { name_de: 'Dosen 0,33l (Cola, Fanta, Sprite, Mezzo Mix)', name_en: 'Cans 0.33l (Cola, Fanta, Sprite, Mezzo Mix)', price: '2,20' },
        { name_de: 'Eistee / Ayran', name_en: 'Iced tea / Ayran', price: '2,50' },
        { name_de: 'Mineralwasser (0,5l)', name_en: 'Mineral water (0.5l)', price: '2,00' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'burgallio-1100',          name: 'Burgallio Favoriten',          district: 10, status: 'unknown', cat: 'Restaurant', distance_km: 5.4, rating: 4.0, hue: 18  },
      { id: 'burgallio-1170',          name: 'Burgallio Hernals',            district: 17, status: 'unknown', cat: 'Restaurant', distance_km: 7.1, rating: 4.0, hue: 0   },
      { id: 'bakis-schnitzelparadies', name: "Baki's Schnitzelparadies",     district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 0.1, rating: 4.0, hue: 38  },
    ],
    x: 39, y: 66,
  },

  // ── BURGALLIO FAVORITEN 1100 ──────────────────────────────────────────────────
  'burgallio-1100': {
    id: 'burgallio-1100',
    name: 'Burgallio Favoriten',
    tagline_de: 'Burger mit hochwertigem Fleisch & hausgemachten Saucen',
    tagline_en: 'Burgers with quality meat & homemade sauces',
    district: 10,
    districtName: 'Favoriten',
    address: 'Quellenstraße 105, 1100 Wien',
    phone: '+43 1 600 13 33',
    website: 'burgallio.at',
    status: 'unknown',
    categories: ['Restaurant'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 18,  a: '#92400E', b: '#451A03' },
      { hue: 12,  a: '#7C2D12', b: '#431407' },
      { hue: 0,   a: '#7F1D1D', b: '#450A0A' },
    ],
    tags: ['Burger', 'Vegan', 'Snacks', 'Lieferung', 'Take-away', 'Hausgemacht'],
    hours: [
      { day: 0, open: '10:30', close: '23:00' },
      { day: 1, open: '10:30', close: '23:00' },
      { day: 2, open: '10:30', close: '23:00' },
      { day: 3, open: '10:30', close: '23:00' },
      { day: 4, open: '10:30', close: '23:00' },
      { day: 5, open: '10:30', close: '23:00' },
      { day: 6, open: '10:30', close: '23:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Burger (Rindfleisch 140g, Medium Well)', cat_en: 'Burgers (beef 140g, medium well)', items: [
        { name_de: 'Classic Burger (Salat, Tomaten, Zwiebeln, Gewürzgurken, Ketchup, Mayo)', name_en: 'Classic burger (lettuce, tomato, onion, pickles, ketchup, mayo)', price: '8,90' },
        { name_de: 'Cheeseburger (Classic + Cheddar)', name_en: 'Cheeseburger (classic + cheddar)', price: '9,90' },
        { name_de: 'Double Burger (2× Rindfleisch, Haus-Sauce)', name_en: 'Double burger (2× beef, house sauce)', price: '13,50' },
        { name_de: 'BBQ Burger (Speck, Röstzwiebeln, BBQ-Sauce, Cheddar)', name_en: 'BBQ burger (bacon, fried onions, BBQ sauce, cheddar)', price: '10,90' },
        { name_de: 'Chili Cheese Burger (Jalapeños, scharfe Sauce, Cheddar)', name_en: 'Chili cheese burger (jalapeños, spicy sauce, cheddar)', price: '10,90' },
        { name_de: 'Mushroom Burger (Champignons, Zwiebeln, Spezialsauce)', name_en: 'Mushroom burger (mushrooms, onions, special sauce)', price: '10,50' },
      ]},
      { cat_de: 'Chicken Burger (100% Hühnerbrust)', cat_en: 'Chicken burgers (100% chicken breast)', items: [
        { name_de: 'Crispy Chicken (paniert, Salat, Mayo)', name_en: 'Crispy chicken (breaded, lettuce, mayo)', price: '8,50' },
        { name_de: 'Grilled Chicken (gegrillt, Tomaten, Haussauce)', name_en: 'Grilled chicken (grilled, tomato, house sauce)', price: '8,90' },
      ]},
      { cat_de: 'Veggie & Vegan', cat_en: 'Veggie & Vegan', items: [
        { name_de: 'Veggie Burger (Gemüse-Patty, Salat, Haussauce)', name_en: 'Veggie burger (veggie patty, lettuce, house sauce)', price: '8,50', tag: 'V' },
        { name_de: 'Halloumi Burger (Halloumi, Rucola, Tomaten)', name_en: 'Halloumi burger (halloumi, arugula, tomato)', price: '9,50', tag: 'V' },
        { name_de: 'Vegan Burger (pflanzliches Patty, vegane Mayo)', name_en: 'Vegan burger (plant patty, vegan mayo)', price: '9,90', tag: 'V' },
      ]},
      { cat_de: 'Beilagen (Fries & Snacks)', cat_en: 'Sides (Fries & Snacks)', items: [
        { name_de: 'Pommes (Klein)', name_en: 'Fries (small)', price: '3,50', tag: 'V' },
        { name_de: 'Pommes (Groß)', name_en: 'Fries (large)', price: '4,90', tag: 'V' },
        { name_de: 'Süßkartoffelpommes', name_en: 'Sweet potato fries', price: '5,50', tag: 'V' },
        { name_de: 'Onion Rings (8 Stk.)', name_en: 'Onion rings (8 pcs)', price: '4,50', tag: 'V' },
        { name_de: 'Chili Cheese Nuggets (6 Stk.)', name_en: 'Chili cheese nuggets (6 pcs)', price: '5,50' },
        { name_de: 'Mozzarella Sticks (5 Stk.)', name_en: 'Mozzarella sticks (5 pcs)', price: '5,50', tag: 'V' },
      ]},
      { cat_de: 'Saucen (Extra)', cat_en: 'Sauces (extra)', items: [
        { name_de: 'Ketchup / Mayo', name_en: 'Ketchup / Mayo', price: '0,70' },
        { name_de: 'Burgallio Haus-Sauce', name_en: 'Burgallio house sauce', price: '1,00' },
        { name_de: 'BBQ / Knoblauch / Chili-Sauce', name_en: 'BBQ / Garlic / Chili sauce', price: '1,00' },
      ]},
      { cat_de: 'Getränke', cat_en: 'Drinks', items: [
        { name_de: 'Dosen 0,33l (Cola, Fanta, Sprite, Mezzo Mix)', name_en: 'Cans 0.33l (Cola, Fanta, Sprite, Mezzo Mix)', price: '2,20' },
        { name_de: 'Eistee / Ayran', name_en: 'Iced tea / Ayran', price: '2,50' },
        { name_de: 'Mineralwasser (0,5l)', name_en: 'Mineral water (0.5l)', price: '2,00' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'burgallio-1120', name: 'Burgallio Meidling', district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 5.4, rating: 4.0, hue: 12 },
      { id: 'burgallio-1170', name: 'Burgallio Hernals',  district: 17, status: 'unknown', cat: 'Restaurant', distance_km: 9.8, rating: 4.0, hue: 0  },
    ],
    x: 52, y: 75,
  },

  // ── BURGALLIO HERNALS 1170 ────────────────────────────────────────────────────
  'burgallio-1170': {
    id: 'burgallio-1170',
    name: 'Burgallio Hernals',
    tagline_de: 'Burger mit hochwertigem Fleisch & hausgemachten Saucen',
    tagline_en: 'Burgers with quality meat & homemade sauces',
    district: 17,
    districtName: 'Hernals',
    address: 'Hernalser Hauptstraße 126, 1170 Wien',
    phone: '+43 1 484 21 00',
    website: 'burgallio.at',
    status: 'unknown',
    categories: ['Restaurant'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 0,   a: '#7F1D1D', b: '#450A0A' },
      { hue: 12,  a: '#7C2D12', b: '#431407' },
      { hue: 18,  a: '#92400E', b: '#451A03' },
    ],
    tags: ['Burger', 'Vegan', 'Snacks', 'Lieferung', 'Take-away', 'Hausgemacht'],
    hours: [
      { day: 0, open: '11:00', close: '22:30' },
      { day: 1, open: '11:00', close: '22:30' },
      { day: 2, open: '11:00', close: '22:30' },
      { day: 3, open: '11:00', close: '22:30' },
      { day: 4, open: '11:00', close: '22:30' },
      { day: 5, open: '11:00', close: '22:30' },
      { day: 6, open: '11:00', close: '22:30' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Burger (Rindfleisch 140g, Medium Well)', cat_en: 'Burgers (beef 140g, medium well)', items: [
        { name_de: 'Classic Burger (Salat, Tomaten, Zwiebeln, Gewürzgurken, Ketchup, Mayo)', name_en: 'Classic burger (lettuce, tomato, onion, pickles, ketchup, mayo)', price: '8,90' },
        { name_de: 'Cheeseburger (Classic + Cheddar)', name_en: 'Cheeseburger (classic + cheddar)', price: '9,90' },
        { name_de: 'Double Burger (2× Rindfleisch, Haus-Sauce)', name_en: 'Double burger (2× beef, house sauce)', price: '13,50' },
        { name_de: 'BBQ Burger (Speck, Röstzwiebeln, BBQ-Sauce, Cheddar)', name_en: 'BBQ burger (bacon, fried onions, BBQ sauce, cheddar)', price: '10,90' },
        { name_de: 'Chili Cheese Burger (Jalapeños, scharfe Sauce, Cheddar)', name_en: 'Chili cheese burger (jalapeños, spicy sauce, cheddar)', price: '10,90' },
        { name_de: 'Mushroom Burger (Champignons, Zwiebeln, Spezialsauce)', name_en: 'Mushroom burger (mushrooms, onions, special sauce)', price: '10,50' },
      ]},
      { cat_de: 'Chicken Burger (100% Hühnerbrust)', cat_en: 'Chicken burgers (100% chicken breast)', items: [
        { name_de: 'Crispy Chicken (paniert, Salat, Mayo)', name_en: 'Crispy chicken (breaded, lettuce, mayo)', price: '8,50' },
        { name_de: 'Grilled Chicken (gegrillt, Tomaten, Haussauce)', name_en: 'Grilled chicken (grilled, tomato, house sauce)', price: '8,90' },
      ]},
      { cat_de: 'Veggie & Vegan', cat_en: 'Veggie & Vegan', items: [
        { name_de: 'Veggie Burger (Gemüse-Patty, Salat, Haussauce)', name_en: 'Veggie burger (veggie patty, lettuce, house sauce)', price: '8,50', tag: 'V' },
        { name_de: 'Halloumi Burger (Halloumi, Rucola, Tomaten)', name_en: 'Halloumi burger (halloumi, arugula, tomato)', price: '9,50', tag: 'V' },
        { name_de: 'Vegan Burger (pflanzliches Patty, vegane Mayo)', name_en: 'Vegan burger (plant patty, vegan mayo)', price: '9,90', tag: 'V' },
      ]},
      { cat_de: 'Beilagen (Fries & Snacks)', cat_en: 'Sides (Fries & Snacks)', items: [
        { name_de: 'Pommes (Klein)', name_en: 'Fries (small)', price: '3,50', tag: 'V' },
        { name_de: 'Pommes (Groß)', name_en: 'Fries (large)', price: '4,90', tag: 'V' },
        { name_de: 'Süßkartoffelpommes', name_en: 'Sweet potato fries', price: '5,50', tag: 'V' },
        { name_de: 'Onion Rings (8 Stk.)', name_en: 'Onion rings (8 pcs)', price: '4,50', tag: 'V' },
        { name_de: 'Chili Cheese Nuggets (6 Stk.)', name_en: 'Chili cheese nuggets (6 pcs)', price: '5,50' },
        { name_de: 'Mozzarella Sticks (5 Stk.)', name_en: 'Mozzarella sticks (5 pcs)', price: '5,50', tag: 'V' },
      ]},
      { cat_de: 'Saucen (Extra)', cat_en: 'Sauces (extra)', items: [
        { name_de: 'Ketchup / Mayo', name_en: 'Ketchup / Mayo', price: '0,70' },
        { name_de: 'Burgallio Haus-Sauce', name_en: 'Burgallio house sauce', price: '1,00' },
        { name_de: 'BBQ / Knoblauch / Chili-Sauce', name_en: 'BBQ / Garlic / Chili sauce', price: '1,00' },
      ]},
      { cat_de: 'Getränke', cat_en: 'Drinks', items: [
        { name_de: 'Dosen 0,33l (Cola, Fanta, Sprite, Mezzo Mix)', name_en: 'Cans 0.33l (Cola, Fanta, Sprite, Mezzo Mix)', price: '2,20' },
        { name_de: 'Eistee / Ayran', name_en: 'Iced tea / Ayran', price: '2,50' },
        { name_de: 'Mineralwasser (0,5l)', name_en: 'Mineral water (0.5l)', price: '2,00' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Eintrag erstellt — Status noch ungeprüft', event_en: 'Entry created — status not yet verified' },
    ],
    similar: [
      { id: 'burgallio-1120', name: 'Burgallio Meidling',  district: 12, status: 'unknown', cat: 'Restaurant', distance_km: 7.1, rating: 4.0, hue: 12 },
      { id: 'burgallio-1100', name: 'Burgallio Favoriten', district: 10, status: 'unknown', cat: 'Restaurant', distance_km: 9.8, rating: 4.0, hue: 18 },
    ],
    x: 28, y: 38,
  },

  // ── LIWAN RESTAURANT MEIDLING 1120 ────────────────────────────────────────────
  'liwan-1120': {
    id: 'liwan-1120',
    name: 'Liwan Restaurant Meidling',
    tagline_de: 'Libanesische und syrische Grill-Spezialitäten',
    tagline_en: 'Lebanese and Syrian grill specialties',
    district: 12,
    districtName: 'Meidling',
    address: 'Meidlinger Hauptstraße 12, 1120 Wien',
    phone: '+43 1 810 5773',
    website: '',
    status: 'self',
    categories: ['Restaurant', 'Libanesisch'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
    ],
    tags: ['Syrisch', 'Arabisch', 'Grill-Spezialitäten', 'Halal', 'Vegan', 'Schanigarten', 'Lieferung'],
    hours: [
      { day: 0, open: '10:00', close: '23:00' },
      { day: 1, open: '10:00', close: '23:00' },
      { day: 2, open: '10:00', close: '23:00' },
      { day: 3, open: '10:00', close: '23:00' },
      { day: 4, open: '10:00', close: '23:00' },
      { day: 5, open: '10:00', close: '23:00' },
      { day: 6, open: '10:00', close: '23:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: true, wifi: false },
    menu: [
      { cat_de: 'Kalte Vorspeisen', cat_en: 'Cold Appetizers', items: [
        { name_de: 'Hummus', name_en: 'Hummus', price: '5,50', tag: 'V' },
        { name_de: 'Baba Ghanoush', name_en: 'Baba Ghanoush', price: '5,90', tag: 'V' },
        { name_de: 'Mutabbal', name_en: 'Mutabbal', price: '5,90', tag: 'V' },
        { name_de: 'Warak Enab (Gefüllte Weinblätter)', name_en: 'Warak Enab (Stuffed grape leaves)', price: '6,40', tag: 'V' },
        { name_de: 'Muhammara', name_en: 'Muhammara', price: '6,20', tag: 'V' },
      ]},
      { cat_de: 'Warme Vorspeisen & Snacks', cat_en: 'Hot Appetizers & Snacks', items: [
        { name_de: 'Falafel (5 Stück)', name_en: 'Falafel (5 pcs)', price: '5,50', tag: 'V' },
        { name_de: 'Kibbeh (3 Stück)', name_en: 'Kibbeh (3 pcs)', price: '7,90' },
        { name_de: 'Halloumi gegrillt', name_en: 'Grilled halloumi', price: '6,90', tag: 'V' },
        { name_de: 'Batata Harra (Scharfe Kartoffelwürfel)', name_en: 'Batata Harra (Spicy potato cubes)', price: '5,50', tag: 'V' },
        { name_de: 'Sambousek (Käse oder Fleisch)', name_en: 'Sambousek (cheese or meat)', price: '6,50' },
      ]},
      { cat_de: 'Salate', cat_en: 'Salads', items: [
        { name_de: 'Tabouleh', name_en: 'Tabbouleh', price: '6,90', tag: 'V' },
        { name_de: 'Fattoush', name_en: 'Fattoush', price: '6,50', tag: 'V' },
        { name_de: 'Griechischer Salat', name_en: 'Greek salad', price: '7,50' },
      ]},
      { cat_de: 'Hauptspeisen vom Grill', cat_en: 'Grilled Main Courses', items: [
        { name_de: 'Shish Tawook Teller (Hühnerspieße)', name_en: 'Shish Tawook plate (chicken skewers)', price: '14,50' },
        { name_de: 'Kafta Mashwi Teller (Faschiertes)', name_en: 'Kafta Mashwi plate (minced meat)', price: '14,90' },
        { name_de: 'Lamm-Spieß Teller', name_en: 'Lamb skewer plate', price: '18,90' },
        { name_de: 'Lammkoteletts (4 Stück)', name_en: 'Lamb chops (4 pcs)', price: '19,50' },
        { name_de: 'Mixed Grill Teller (für 1 Person)', name_en: 'Mixed grill plate (for 1)', price: '19,90' },
        { name_de: 'Mixed Grill Platte (für 2 Personen)', name_en: 'Mixed grill platter (for 2)', price: '38,00' },
        { name_de: 'Gegrilltes Huhn (Ganz)', name_en: 'Grilled chicken (whole)', price: '18,50' },
        { name_de: 'Gegrilltes Huhn (Halb)', name_en: 'Grilled chicken (half)', price: '11,50' },
      ]},
      { cat_de: 'Sandwiches & Shawarma', cat_en: 'Sandwiches & Shawarma', items: [
        { name_de: 'Shawarma Huhn Teller', name_en: 'Chicken shawarma plate', price: '13,50' },
        { name_de: 'Shawarma Rind Teller', name_en: 'Beef shawarma plate', price: '14,50' },
        { name_de: 'Sandwich Shawarma (Huhn)', name_en: 'Chicken shawarma sandwich', price: '6,50' },
        { name_de: 'Sandwich Shawarma (Rind)', name_en: 'Beef shawarma sandwich', price: '7,00' },
        { name_de: 'Sandwich Falafel', name_en: 'Falafel sandwich', price: '5,50', tag: 'V' },
        { name_de: 'Sandwich Halloumi', name_en: 'Halloumi sandwich', price: '6,00', tag: 'V' },
      ]},
      { cat_de: 'Beilagen', cat_en: 'Sides', items: [
        { name_de: 'Reis', name_en: 'Rice', price: '3,50', tag: 'V' },
        { name_de: 'Pommes Frites', name_en: 'French fries', price: '3,90', tag: 'V' },
        { name_de: 'Knoblauchsauce / Tahina', name_en: 'Garlic sauce / Tahina', price: '1,50' },
      ]},
      { cat_de: 'Desserts & Getränke', cat_en: 'Desserts & Beverages', items: [
        { name_de: 'Kunafa', name_en: 'Kunafa', price: '6,90', tag: 'V' },
        { name_de: 'Baklava (Portion)', name_en: 'Baklava (portion)', price: '5,50', tag: 'V' },
        { name_de: 'Ayran', name_en: 'Ayran', price: '2,70' },
        { name_de: 'Softdrinks (0,33l)', name_en: 'Soft drinks (0.33l)', price: '2,80', tag: 'V' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-03', actor_de: 'Inhaber', actor_en: 'Owner', event_de: 'Selbstauskunft eingereicht', event_en: 'Self-declaration submitted' },
    ],
    similar: [
      { id: 'liwan-1200', name: 'Liwan Restaurant Brigittenau', district: 20, status: 'self', cat: 'Restaurant', distance_km: 8.5, rating: 4.0, hue: 160 },
    ],
    x: 40, y: 68,
  },

  // ── LIWAN RESTAURANT BRIGITTENAU 1200 ─────────────────────────────────────────
  'liwan-1200': {
    id: 'liwan-1200',
    name: 'Liwan Restaurant Brigittenau',
    tagline_de: 'Libanesische und syrische Grill-Spezialitäten',
    tagline_en: 'Lebanese and Syrian grill specialties',
    district: 20,
    districtName: 'Brigittenau',
    address: 'Wallensteinplatz 4, 1200 Wien',
    phone: '+43 1 810 5773',
    website: '',
    status: 'self',
    categories: ['Restaurant', 'Libanesisch'],
    price: '€€',
    rating: 4.0,
    reviews: 0,
    gallery: [
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
      { hue: 160, a: '#1E5C4A', b: '#0B3D2C' },
    ],
    tags: ['Syrisch', 'Arabisch', 'Grill-Spezialitäten', 'Halal', 'Vegan', 'Lieferung'],
    hours: [
      { day: 0, open: '10:00', close: '23:00' },
      { day: 1, open: '10:00', close: '23:00' },
      { day: 2, open: '10:00', close: '23:00' },
      { day: 3, open: '10:00', close: '23:00' },
      { day: 4, open: '10:00', close: '23:00' },
      { day: 5, open: '10:00', close: '23:00' },
      { day: 6, open: '10:00', close: '23:00' },
    ],
    amenities: { parking: false, wheelchair: false, prayer: false, delivery: true, outdoor: false, wifi: false },
    menu: [
      { cat_de: 'Kalte Vorspeisen', cat_en: 'Cold Appetizers', items: [
        { name_de: 'Hummus', name_en: 'Hummus', price: '5,50', tag: 'V' },
        { name_de: 'Baba Ghanoush', name_en: 'Baba Ghanoush', price: '5,90', tag: 'V' },
        { name_de: 'Mutabbal', name_en: 'Mutabbal', price: '5,90', tag: 'V' },
        { name_de: 'Warak Enab (Gefüllte Weinblätter)', name_en: 'Warak Enab (Stuffed grape leaves)', price: '6,40', tag: 'V' },
        { name_de: 'Muhammara', name_en: 'Muhammara', price: '6,20', tag: 'V' },
      ]},
      { cat_de: 'Warme Vorspeisen & Snacks', cat_en: 'Hot Appetizers & Snacks', items: [
        { name_de: 'Falafel (5 Stück)', name_en: 'Falafel (5 pcs)', price: '5,50', tag: 'V' },
        { name_de: 'Kibbeh (3 Stück)', name_en: 'Kibbeh (3 pcs)', price: '7,90' },
        { name_de: 'Halloumi gegrillt', name_en: 'Grilled halloumi', price: '6,90', tag: 'V' },
        { name_de: 'Batata Harra (Scharfe Kartoffelwürfel)', name_en: 'Batata Harra (Spicy potato cubes)', price: '5,50', tag: 'V' },
        { name_de: 'Sambousek (Käse oder Fleisch)', name_en: 'Sambousek (cheese or meat)', price: '6,50' },
      ]},
      { cat_de: 'Salate', cat_en: 'Salads', items: [
        { name_de: 'Tabouleh', name_en: 'Tabbouleh', price: '6,90', tag: 'V' },
        { name_de: 'Fattoush', name_en: 'Fattoush', price: '6,50', tag: 'V' },
        { name_de: 'Griechischer Salat', name_en: 'Greek salad', price: '7,50' },
      ]},
      { cat_de: 'Hauptspeisen vom Grill', cat_en: 'Grilled Main Courses', items: [
        { name_de: 'Shish Tawook Teller (Hühnerspieße)', name_en: 'Shish Tawook plate (chicken skewers)', price: '14,50' },
        { name_de: 'Kafta Mashwi Teller (Faschiertes)', name_en: 'Kafta Mashwi plate (minced meat)', price: '14,90' },
        { name_de: 'Lamm-Spieß Teller', name_en: 'Lamb skewer plate', price: '18,90' },
        { name_de: 'Lammkoteletts (4 Stück)', name_en: 'Lamb chops (4 pcs)', price: '19,50' },
        { name_de: 'Mixed Grill Teller (für 1 Person)', name_en: 'Mixed grill plate (for 1)', price: '19,90' },
        { name_de: 'Mixed Grill Platte (für 2 Personen)', name_en: 'Mixed grill platter (for 2)', price: '38,00' },
        { name_de: 'Gegrilltes Huhn (Ganz)', name_en: 'Grilled chicken (whole)', price: '18,50' },
        { name_de: 'Gegrilltes Huhn (Halb)', name_en: 'Grilled chicken (half)', price: '11,50' },
      ]},
      { cat_de: 'Sandwiches & Shawarma', cat_en: 'Sandwiches & Shawarma', items: [
        { name_de: 'Shawarma Huhn Teller', name_en: 'Chicken shawarma plate', price: '13,50' },
        { name_de: 'Shawarma Rind Teller', name_en: 'Beef shawarma plate', price: '14,50' },
        { name_de: 'Sandwich Shawarma (Huhn)', name_en: 'Chicken shawarma sandwich', price: '6,50' },
        { name_de: 'Sandwich Shawarma (Rind)', name_en: 'Beef shawarma sandwich', price: '7,00' },
        { name_de: 'Sandwich Falafel', name_en: 'Falafel sandwich', price: '5,50', tag: 'V' },
        { name_de: 'Sandwich Halloumi', name_en: 'Halloumi sandwich', price: '6,00', tag: 'V' },
      ]},
      { cat_de: 'Beilagen', cat_en: 'Sides', items: [
        { name_de: 'Reis', name_en: 'Rice', price: '3,50', tag: 'V' },
        { name_de: 'Pommes Frites', name_en: 'French fries', price: '3,90', tag: 'V' },
        { name_de: 'Knoblauchsauce / Tahina', name_en: 'Garlic sauce / Tahina', price: '1,50' },
      ]},
      { cat_de: 'Desserts & Getränke', cat_en: 'Desserts & Beverages', items: [
        { name_de: 'Kunafa', name_en: 'Kunafa', price: '6,90', tag: 'V' },
        { name_de: 'Baklava (Portion)', name_en: 'Baklava (portion)', price: '5,50', tag: 'V' },
        { name_de: 'Ayran', name_en: 'Ayran', price: '2,70' },
        { name_de: 'Softdrinks (0,33l)', name_en: 'Soft drinks (0.33l)', price: '2,80', tag: 'V' },
      ]},
    ],
    reviews_list: [],
    verification_log: [
      { date: '2026-05-03', actor_de: 'Inhaber', actor_en: 'Owner', event_de: 'Selbstauskunft eingereicht', event_en: 'Self-declaration submitted' },
    ],
    similar: [
      { id: 'liwan-1120', name: 'Liwan Restaurant Meidling', district: 12, status: 'self', cat: 'Restaurant', distance_km: 8.5, rating: 4.0, hue: 160 },
    ],
    x: 52, y: 42,
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
