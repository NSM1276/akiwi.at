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

  // ── RESTAURANT 1 ────────────────────────────────────────────────────────────
  'al-nour': {
    id: 'al-nour',
    name: 'Al-Nour Restaurant',
    tagline_de: 'Levantinische Küche & Holzkohle-Grill seit 2014',
    tagline_en: 'Levantine cuisine & charcoal grill since 2014',
    district: 10,
    districtName: 'Favoriten',
    address: 'Quellenstraße 84, 1100 Wien',
    phone: '+43 1 555 0184',
    website: 'al-nour.at',
    status: 'verified',            // 'verified' | 'self' | 'unknown'
    categories: ['Restaurant', 'Kebab'],
    price: '€€',                   // '€' | '€€' | '€€€'
    rating: 4.7,
    reviews: 284,
    // Color gradients — replace with real photos when available:
    // gallery: [{ src: 'restaurants/al-nour/photo1.webp' }, ...]
    gallery: [
      { hue: 18,  a: '#7C2D12', b: '#431407' },
      { hue: 32,  a: '#92400E', b: '#451A03' },
      { hue: 8,   a: '#7F1D1D', b: '#450A0A' },
      { hue: 130, a: '#1E3A1E', b: '#052E16' },
      { hue: 38,  a: '#713F12', b: '#422006' },
    ],
    tags: ['Halal', 'Familiär', 'Lieferung', 'Vegetarisch', 'Gruppen'],
    hours: [
      // day: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
      // Use null for closed days: { day: 0, open: null, close: null }
      { day: 0, open: '11:00', close: '23:00' },
      { day: 1, open: '11:00', close: '23:00' },
      { day: 2, open: '11:00', close: '23:00' },
      { day: 3, open: '11:00', close: '23:00' },
      { day: 4, open: '11:00', close: '00:00' },
      { day: 5, open: '11:00', close: '00:00' },
      { day: 6, open: '12:00', close: '22:00' },
    ],
    amenities: {
      parking:    true,
      wheelchair: true,
      prayer:     true,
      delivery:   true,
      outdoor:    true,
      wifi:       true,
    },
    menu: [
      {
        cat_de: 'Vorspeisen', cat_en: 'Starters',
        items: [
          { name_de: 'Hummus mit Olivenöl', name_en: 'Hummus with olive oil', price: '6,50', tag: 'V' },
          { name_de: 'Fattoush Salat',       name_en: 'Fattoush salad',        price: '8,90', tag: 'V' },
          { name_de: 'Mutabbal',             name_en: 'Mutabbal',              price: '7,20', tag: 'V' },
        ],
      },
      {
        cat_de: 'Vom Grill', cat_en: 'From the grill',
        items: [
          { name_de: 'Lamm Adana',     name_en: 'Lamb Adana',    price: '18,50', tag: 'H' },
          { name_de: 'Hähnchen Shish', name_en: 'Chicken shish', price: '16,90', tag: 'H' },
          { name_de: 'Kafta gemischt', name_en: 'Mixed kafta',   price: '21,00', tag: 'H' },
        ],
      },
      {
        cat_de: 'Süßes', cat_en: 'Sweets',
        items: [
          { name_de: 'Baklava (4 St.)', name_en: 'Baklava (4 pcs)', price: '6,50' },
          { name_de: 'Knafeh',          name_en: 'Knafeh',           price: '7,80' },
        ],
      },
    ],
    reviews_list: [
      {
        author: 'Selma B.', rating: 5,
        date_de: 'vor 2 Wochen', date_en: '2 weeks ago',
        text_de: 'Bestes Adana in Wien. Personal sehr freundlich, Gebetsraum sauber, Halal-Zertifikat sichtbar im Eingang.',
        text_en: 'Best Adana in Vienna. Staff very friendly, prayer room clean, halal certificate visible at the entrance.',
      },
      {
        author: 'Ömer K.', rating: 4,
        date_de: 'vor 1 Monat', date_en: '1 month ago',
        text_de: 'Großzügige Portionen, faire Preise. Etwas voll am Wochenende — am besten reservieren.',
        text_en: 'Generous portions, fair prices. Gets crowded on weekends — best to reserve.',
      },
      {
        author: 'Hanna L.', rating: 5,
        date_de: 'vor 3 Monaten', date_en: '3 months ago',
        text_de: 'Vegetarische Auswahl überraschend gut. Mutabbal ein Traum.',
        text_en: 'Vegetarian selection surprisingly good. Mutabbal was a dream.',
      },
    ],
    verification_log: [
      { date: '2026-03-14', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Vor-Ort-Check & Foto vom Halal-Zertifikat', event_en: 'On-site check & photo of halal certificate' },
      { date: '2025-09-02', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Erstverifizierung',                         event_en: 'Initial verification' },
      { date: '2025-08-21', actor_de: 'Inhaber',    actor_en: 'Owner',      event_de: 'Selbstauskunft eingereicht',                event_en: 'Self-declaration submitted' },
    ],
    similar: [
      { id: 'damaskus-haus',  name: 'Damaskus Haus',  district: 16, status: 'verified', cat: 'Restaurant', distance_km: 4.2, rating: 4.6, hue: 130 },
      { id: 'sultan-grill',   name: 'Sultan Grill',   district: 10, status: 'verified', cat: 'Grill',      distance_km: 0.8, rating: 4.5, hue: 18 },
      { id: 'falafel-freddy', name: 'Falafel Freddy', district: 7,  status: 'verified', cat: 'Kebab',      distance_km: 3.1, rating: 4.5, hue: 60 },
    ],
    x: 52, y: 78,
  },

  // ── RESTAURANT 2 ────────────────────────────────────────────────────────────
  'pizza-medina': {
    id: 'pizza-medina',
    name: 'Pizza Medina',
    tagline_de: 'Knusprige Halal-Pizza aus dem Steinofen seit 2018',
    tagline_en: 'Crispy halal pizza from the stone oven since 2018',
    district: 12,
    districtName: 'Meidling',
    address: 'Längenfeldgasse 22, 1120 Wien',
    phone: '+43 1 555 0122',
    website: '',
    status: 'self',
    categories: ['Pizza'],
    price: '€',
    rating: 4.2,
    reviews: 126,
    gallery: [
      { hue: 38,  a: '#713F12', b: '#422006' },
      { hue: 20,  a: '#7C2D12', b: '#431407' },
      { hue: 50,  a: '#78350F', b: '#451A03' },
      { hue: 10,  a: '#7F1D1D', b: '#450A0A' },
      { hue: 60,  a: '#92400E', b: '#451A03' },
    ],
    tags: ['Halal', 'Take-away', 'Familiär', 'Lieferung'],
    hours: [
      { day: 0, open: '11:00', close: '22:00' },
      { day: 1, open: '11:00', close: '22:00' },
      { day: 2, open: '11:00', close: '22:00' },
      { day: 3, open: '11:00', close: '22:00' },
      { day: 4, open: '11:00', close: '23:00' },
      { day: 5, open: '11:00', close: '23:00' },
      { day: 6, open: '12:00', close: '22:00' },
    ],
    amenities: {
      parking:    false,
      wheelchair: true,
      prayer:     false,
      delivery:   true,
      outdoor:    false,
      wifi:       false,
    },
    menu: [
      {
        cat_de: 'Klassiker', cat_en: 'Classics',
        items: [
          { name_de: 'Margherita',          name_en: 'Margherita',         price: '9,90',  tag: 'V' },
          { name_de: 'Hähnchen Döner Pizza',name_en: 'Chicken döner pizza',price: '13,50', tag: 'H' },
          { name_de: 'Quattro Formaggi',    name_en: 'Four cheese',        price: '12,90', tag: 'V' },
        ],
      },
      {
        cat_de: 'Spezialitäten', cat_en: 'Specialties',
        items: [
          { name_de: 'Lamm & Paprika',  name_en: 'Lamb & pepper',     price: '15,90', tag: 'H' },
          { name_de: 'Veggie Delight',  name_en: 'Veggie Delight',    price: '12,50', tag: 'V' },
        ],
      },
    ],
    reviews_list: [
      {
        author: 'Fatima M.', rating: 4,
        date_de: 'vor 1 Woche', date_en: '1 week ago',
        text_de: 'Sehr leckere Pizza, Teig schön knusprig. Lieferung war pünktlich.',
        text_en: 'Very tasty pizza, nice crispy dough. Delivery was on time.',
      },
      {
        author: 'Ahmet D.', rating: 5,
        date_de: 'vor 3 Wochen', date_en: '3 weeks ago',
        text_de: 'Die Hähnchen-Döner-Pizza ist ein Muss! Wird meine Familie öfter bestellen.',
        text_en: 'The chicken döner pizza is a must! My family will order again.',
      },
    ],
    verification_log: [
      { date: '2025-11-10', actor_de: 'Inhaber', actor_en: 'Owner', event_de: 'Selbstauskunft eingereicht', event_en: 'Self-declaration submitted' },
    ],
    similar: [
      { id: 'al-nour',       name: 'Al-Nour Restaurant', district: 10, status: 'verified', cat: 'Restaurant', distance_km: 3.1, rating: 4.7, hue: 18 },
      { id: 'halal-brothers',name: 'Halal Brothers',      district: 1,  status: 'self',    cat: 'Kebab',      distance_km: 5.2, rating: 4.4, hue: 28 },
    ],
    x: 34, y: 70,
  },

  // ── RESTAURANT 3 ────────────────────────────────────────────────────────────
  'cafe-istanbul': {
    id: 'cafe-istanbul',
    name: 'Café Istanbul',
    tagline_de: 'Türkisches Frühstück & Spezialitäten-Kaffee seit 2016',
    tagline_en: 'Turkish breakfast & specialty coffee since 2016',
    district: 20,
    districtName: 'Brigittenau',
    address: 'Dresdner Straße 41, 1200 Wien',
    phone: '+43 1 555 0220',
    website: 'cafe-istanbul.at',
    status: 'verified',
    categories: ['Cafe'],
    price: '€€',
    rating: 4.8,
    reviews: 412,
    gallery: [
      { hue: 160, a: '#064E3B', b: '#022C22' },
      { hue: 175, a: '#065F46', b: '#022C22' },
      { hue: 145, a: '#14532D', b: '#052E16' },
      { hue: 190, a: '#0F4C4C', b: '#042020' },
      { hue: 155, a: '#1E3A2E', b: '#052E16' },
    ],
    tags: ['Halal', 'Frühstück', 'Terrasse', 'Familiär', 'WLAN'],
    hours: [
      { day: 0, open: '08:00', close: '21:00' },
      { day: 1, open: '08:00', close: '21:00' },
      { day: 2, open: '08:00', close: '21:00' },
      { day: 3, open: '08:00', close: '21:00' },
      { day: 4, open: '08:00', close: '22:00' },
      { day: 5, open: '08:00', close: '22:00' },
      { day: 6, open: '09:00', close: '22:00' },
    ],
    amenities: {
      parking:    true,
      wheelchair: true,
      prayer:     false,
      delivery:   false,
      outdoor:    true,
      wifi:       true,
    },
    menu: [
      {
        cat_de: 'Frühstück', cat_en: 'Breakfast',
        items: [
          { name_de: 'Türkisches Frühstück (für 2)',   name_en: 'Turkish breakfast (for 2)',   price: '28,00', tag: 'V' },
          { name_de: 'Menemen (Rührei mit Tomaten)',   name_en: 'Menemen (scrambled with tomatoes)', price: '10,50', tag: 'V' },
          { name_de: 'Simit & Käse',                  name_en: 'Simit & cheese',              price: '7,90',  tag: 'V' },
        ],
      },
      {
        cat_de: 'Getränke', cat_en: 'Drinks',
        items: [
          { name_de: 'Türkischer Tee (Çay)',  name_en: 'Turkish tea (çay)',  price: '2,50' },
          { name_de: 'Türkischer Kaffee',     name_en: 'Turkish coffee',     price: '3,80' },
          { name_de: 'Ayran',                 name_en: 'Ayran',              price: '3,20' },
        ],
      },
    ],
    reviews_list: [
      {
        author: 'Yasmin S.', rating: 5,
        date_de: 'vor 5 Tagen', date_en: '5 days ago',
        text_de: 'Das beste türkische Frühstück in Wien. Die Terrasse ist wunderschön im Sommer.',
        text_en: 'The best Turkish breakfast in Vienna. The terrace is wonderful in summer.',
      },
      {
        author: 'Marcus W.', rating: 5,
        date_de: 'vor 2 Wochen', date_en: '2 weeks ago',
        text_de: 'Çay und Simit — perfekte Kombination. Personal sehr herzlich.',
        text_en: 'Çay and simit — perfect combination. Staff very warm.',
      },
      {
        author: 'Leila N.', rating: 4,
        date_de: 'vor 1 Monat', date_en: '1 month ago',
        text_de: 'Gemütliche Atmosphäre, gute Portionen. Am Wochenende etwas wartezeit.',
        text_en: 'Cozy atmosphere, good portions. Some wait on weekends.',
      },
    ],
    verification_log: [
      { date: '2026-01-20', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Vor-Ort-Check & Zertifikatsprüfung', event_en: 'On-site check & certificate review' },
      { date: '2025-07-15', actor_de: 'Akiwi-Team', actor_en: 'Akiwi team', event_de: 'Erstverifizierung',                   event_en: 'Initial verification' },
      { date: '2025-07-01', actor_de: 'Inhaber',    actor_en: 'Owner',      event_de: 'Selbstauskunft eingereicht',          event_en: 'Self-declaration submitted' },
    ],
    similar: [
      { id: 'sultan-baklava', name: 'Sultan Baklava', district: 15, status: 'verified', cat: 'Cafe',   distance_km: 5.8, rating: 4.9, hue: 350 },
      { id: 'al-nour',        name: 'Al-Nour Restaurant', district: 10, status: 'verified', cat: 'Restaurant', distance_km: 6.1, rating: 4.7, hue: 18 },
    ],
    x: 48, y: 24,
  },

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
