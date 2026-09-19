// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — UI copy (DE/EN) and filter constants.
// The card list for the homepage/search is built in listing.js.
// ─────────────────────────────────────────────────────────────────────────────

export const COPY = {
  de: {
    // Header
    navHome: 'Home',
    navSearch: 'Suche',
    // Hero
    searchPlaceholder: 'Restaurant, Küche oder Bezirk suchen…',
    // Filter
    verifiedOnly: 'Nur verifiziert',
    district: 'Bezirk',
    allDistricts: 'Alle Bezirke',
    // Status
    statusVerified: 'Verifiziert',
    statusSelf: 'Selbstauskunft',
    statusUnknown: 'Unbekannt',
    // Results
    resultsCount: (n) => `${n} ${n === 1 ? 'Eintrag' : 'Einträge'} in Österreich`,
    emptyTitle: 'Keine Ergebnisse',
    emptyBody: 'Versuche einen anderen Bezirk oder eine andere Kategorie.',
    reset: 'Filter zurücksetzen',
    featured: 'Empfohlen',
    reviewsSuffix: (n) => `${n} Bewertungen`,
    // Map
    mapHeading: 'Karte',
    mapSub: 'Alle Lokale auf einen Blick — gefiltert nach deinen Kriterien.',
    // Footer
    footerBlurb: 'Der ehrliche halal-freundliche Guide für Österreich. Verifiziert, transparent, werbefrei.',
    // Datenschutz und Eintragen kommen dazu, sobald diese Seiten existieren.
    footerSections: {
      product: ['Home', 'Suche'],
      legal: ['Impressum'],
    },
    footerSectionTitles: { product: 'Navigation', legal: 'Rechtliches' },
    footerLinks: {
      'Home': '/',
      'Suche': '/search',
      'Impressum': '/impressum',
    },
    footerMadeWith: 'Gemacht mit ❤️ für Österreich',
    copyright: '© 2026 Akiwi.at — Alle Rechte vorbehalten.',
  },
  en: {
    navHome: 'Home',
    navSearch: 'Search',
    searchPlaceholder: 'Search restaurants, cuisines, or districts…',
    verifiedOnly: 'Verified only',
    district: 'District',
    allDistricts: 'All districts',
    statusVerified: 'Verified',
    statusSelf: 'Self-declared',
    statusUnknown: 'Unknown',
    resultsCount: (n) => `${n} ${n === 1 ? 'entry' : 'entries'} in Austria`,
    emptyTitle: 'No results',
    emptyBody: 'Try a different district or category.',
    reset: 'Reset filters',
    featured: 'Featured',
    reviewsSuffix: (n) => `${n} reviews`,
    mapHeading: 'Map',
    mapSub: 'Every venue at a glance — filtered to match your picks.',
    footerBlurb: 'The honest halal-friendly guide to Austria. Verified, transparent, ad-free.',
    footerSections: {
      product: ['Home', 'Search'],
      legal: ['Imprint'],
    },
    footerSectionTitles: { product: 'Navigation', legal: 'Legal' },
    footerLinks: {
      'Home': '/',
      'Search': '/search',
      'Imprint': '/impressum',
    },
    footerMadeWith: 'Made with ❤️ for Austria',
    copyright: '© 2026 Akiwi.at — All rights reserved.',
  },
};
