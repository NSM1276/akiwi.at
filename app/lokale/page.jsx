import LokaleContent from '@/components/LokaleContent';

export const metadata = {
  title: 'Für Lokale – Ihr Lokal auf Akiwi, kostenlos',
  description: 'Akiwi ist ein unabhängiger Guide für Halal-Essen. Lokale werden kostenlos eingetragen. Mit einem Foto des Halal-Zertifikats wird Ihr Lokal „Verifiziert“. Kontakt per WhatsApp, Instagram oder E-Mail.',
  alternates: { canonical: '/lokale' },
};

export default function LokalePage() {
  return <LokaleContent />;
}
