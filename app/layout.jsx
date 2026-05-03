import './globals.css';

export const metadata = {
  title: 'Akiwi.at — Halal-freundliche Restaurants in Wien',
  description: 'Der Halal-Guide für Wien und Österreich.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
