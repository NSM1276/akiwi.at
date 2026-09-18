import { getListing, getFacets } from '@/data/listing';
import { listCities, listDistricts, listCategories } from '@/data/landing';
import { VENUE_COUNT } from '@/data/venues';
import HomeClient from './HomeClient';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const listing = getListing();
  return (
    <HomeClient
      restaurants={listing}
      venueCount={VENUE_COUNT}
      facets={getFacets(listing)}
      browse={{ cities: listCities(), districts: listDistricts(), categories: listCategories() }}
    />
  );
}
