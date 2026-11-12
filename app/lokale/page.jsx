import LokaleContent from '@/components/LokaleContent';

export const metadata = {
  title: 'Für Lokale – Ihr Lokal auf Akiwi, kostenlos',
  description: 'Akiwi ist ein Guide für Halal-Essen in Österreich. Lokale werden kostenlos eingetragen: Daten prüfen, Fotos ergänzen, per WhatsApp melden.',
  alternates: { canonical: '/lokale' },
};

export default function LokalePage() {
  return <LokaleContent />;
}
