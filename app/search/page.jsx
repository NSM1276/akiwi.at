import { getListing, getFacets } from '@/data/listing';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Alle halal-freundlichen Lokale in Österreich',
  description: 'Durchsuche alle halal-freundlichen Restaurants, Imbisse und Cafés in Österreich — nach Halal-Status, Ort, Kategorie, Preis und Ausstattung.',
  alternates: { canonical: '/search' },
};

export default function SearchPage() {
  const listing = getListing({ withHours: true });
  return <SearchClient restaurants={listing} facets={getFacets(listing)} />;
}
