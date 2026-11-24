import DatenschutzContent from '@/components/DatenschutzContent';

export const metadata = {
  title: 'Datenschutz',
  description: 'Wie Akiwi.at mit Ihren Daten umgeht: keine Cookies, keine Besucherstatistik, Anfrageformular.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return <DatenschutzContent />;
}
