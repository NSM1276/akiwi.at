import { Barlow_Condensed, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import { LangProvider } from '@/components/LangProvider';
import './globals.css';

// Self-hosted at build time as woff2 subsets. latin-ext carries the Turkish
// and Slavic letters in venue names (ş, ğ, č).
const display = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-barlow',
});
const body = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-plex',
});

export const metadata = {
  metadataBase: new URL('https://www.akiwi.at'),
  title: {
    default: 'Akiwi.at — Halal-freundliche Restaurants in Österreich',
    template: '%s | Akiwi.at',
  },
  description: 'Der Halal-Guide für Österreich: Restaurants, Imbisse, Cafés und Konditoreien in Wien, Graz, Linz, Salzburg und Innsbruck — mit Adresse und Halal-Status.',
  openGraph: {
    siteName: 'Akiwi.at',
    locale: 'de_AT',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#141414',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
