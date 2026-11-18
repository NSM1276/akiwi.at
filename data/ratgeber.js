// ratgeber.js — articles for /ratgeber. German only for now.
//
// Rules (owner decision 2026-11-18): every claim has a source and a "Stand"
// date; no rankings, no religious rulings, no invented facts. Statements about
// chains quote only what the chain itself publishes for Austria.
//
// Text is written as "rich" arrays: a plain string, { b: 'bold' } or
// { href: '/path', text: 'link' }. External links (http…) open in a new tab.
//
// Blocks: { p: rich }, { h2: 'text' }, { list: [rich, …] },
//         { table: { head: [..], rows: [[rich, rich, …], …] } }, { note: rich }

export const RATGEBER = [
  {
    slug: 'fastfood-ketten-halal',
    title: 'Fast-Food-Ketten in Österreich – was sagen sie selbst zu Halal?',
    description: 'McDonald’s, Burger King, KFC, Five Guys & Co.: Was die Ketten in Österreich selbst über Halal schreiben – mit Quelle und Datum.',
    stand: '2026-11-18',
    blocks: [
      { p: ['„Ist McDonald’s halal?“ – diese Frage wird oft gestellt, und im Internet gibt es viele Antworten. Wir haben nachgesehen, was die Ketten ', { b: 'selbst' }, ' auf ihren österreichischen Websites schreiben. Was andere über sie sagen – Bewertungsportale, Lieferdienste, Foren –, zählt hier nicht.'] },
      { p: ['Die Antwort kann in jedem Land anders sein. Dass eine Kette etwa in Großbritannien oder in den Emiraten Halal-Filialen hat, sagt nichts über Österreich.'] },
      { h2: 'Die Übersicht' },
      { table: {
        head: ['Kette', 'Was die Kette in Österreich selbst sagt', 'Quelle'],
        rows: [
          ['Five Guys', ['„We do not offer Halal in this market.“'], [{ href: 'https://www.fiveguys.at/support-hub/faqs/', text: 'FAQ fiveguys.at' }]],
          ['McDonald’s', ['Keine Halal-Angabe. Die eigene Zutatenliste nennt beim Bacon und bei den Schinkenscheiben Schweinefleisch.'], [{ href: 'https://www.mcdonalds.at/wp-content/uploads/2026/04/standardprodukte-ab-21042026.pdf', text: 'Zutatenliste, Stand 21.04.2026' }]],
          ['Burger King', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.burgerking.at', text: 'burgerking.at' }]],
          ['KFC', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://kfc.co.at/ueber-kfc', text: 'kfc.co.at' }]],
          ['Subway', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.subway.com/de-AT', text: 'subway.com/de-AT' }]],
          ['Vapiano', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.vapiano.at/faqs/', text: 'vapiano.at' }]],
          ['Nordsee', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.nordsee.com/at/', text: 'nordsee.com/at' }]],
          ['Dunkin’', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.dunkin.at/', text: 'dunkin.at' }]],
          ['Burgerista', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.burgerista.com/speisekarte', text: 'burgerista.com' }]],
          ['Le Burger', ['Keine Halal-Angabe gefunden.'], [{ href: 'https://www.leburger.at', text: 'leburger.at' }]],
        ],
      } },
      { note: ['„Keine Halal-Angabe gefunden“ heißt: Auf der österreichischen Website der Kette steht nichts dazu. Es heißt ', { b: 'nicht' }, ', dass das Essen sicher nicht halal ist – nur, dass die Kette es nicht sagt. Wer es genau wissen will, fragt die Kette direkt.'] },
      { h2: 'Und wo gibt es Burger und Döner, die halal sind?' },
      { p: ['Auf Akiwi listen wir Lokale mit ihrem Halal-Status. Bei „Halal laut Lokal“ verlinken wir die Stelle, an der das Lokal selbst schreibt, dass es halal ist.'] },
      { list: [
        [{ href: '/gericht/burger', text: 'Halal Burger' }],
        [{ href: '/gericht/doener', text: 'Halal Döner' }],
      ] },
      { h2: 'Etwas hat sich geändert?' },
      { p: ['Ketten ändern ihre Lieferanten und ihre Websites. Wenn du eine neue Angabe einer Kette findest, schreib uns – die Kontaktdaten stehen im ', { href: '/impressum', text: 'Impressum' }, '. Diese Übersicht prüfen wir spätestens alle sechs Monate neu.'] },
    ],
  },
];

export const getArticle = (slug) => RATGEBER.find((a) => a.slug === slug) || null;

/** "2026-11-18" → "18. November 2026" */
export function formatStand(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return `${d}. ${months[m - 1]} ${y}`;
}
