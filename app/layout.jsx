import { Montserrat } from 'next/font/google';
import { LangProvider } from '@/components/LangProvider';
import './globals.css';

// Self-hosted at build time: Next ships a woff2 subset instead of the 700 KB TTF.
// latin-ext carries the Turkish and Slavic letters in venue names (ş, ğ, č).
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  metadataBase: new URL('https://www.akiwi.at'),
  title: {
    default: 'Akiwi.at — Halal-freundliche Restaurants in Österreich',
    template: '%s | Akiwi.at',
  },
  description: 'Der Halal-Guide für Österreich: Restaurants, Imbisse, Cafés und Konditoreien in Wien, Graz, Linz, Salzburg und Innsbruck — mit Halal-Status, Öffnungszeiten und Speisekarte.',
  openGraph: {
    siteName: 'Akiwi.at',
    locale: 'de_AT',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={montserrat.variable}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
