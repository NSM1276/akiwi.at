import ImpressumContent from '@/components/ImpressumContent';

export const metadata = {
  title: 'Impressum',
  description: 'Angaben gemäß § 5 ECG zum Betreiber von Akiwi.at.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}
