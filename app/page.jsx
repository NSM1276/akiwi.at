import { getListing, getFacets } from '@/data/listing';
import { listCities, listDistricts, listCategories, listDishes } from '@/data/landing';
import { VENUE_COUNT } from '@/data/venues';
import { siteJsonLd } from '@/data/jsonld';
import HomeClient from './HomeClient';

export function generateMetadata() {
  const cities = listCities().map((c) => c.name);
  const others = cities.filter((c) => c !== 'Wien').slice(0, 3);
  const title = 'Halal Restaurants in Wien & Österreich – Akiwi.at';
  const description =
    `${VENUE_COUNT} halal-freundliche Restaurants, Imbisse und Cafés in Wien, ${others.join(', ')} und mehr – ` +
    'mit Speisekarte, Öffnungszeiten und Halal-Status. Unabhängig und werbefrei.';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: '/' },
    openGraph: { title, description },
  };
}

export default function HomePage() {
  const listing = getListing();
  return (
    <>
      {siteJsonLd().map((ld) => (
        <script
          key={ld['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <HomeClient
        restaurants={listing}
        venueCount={VENUE_COUNT}
        facets={getFacets(listing)}
        browse={{
          cities: listCities(),
          districts: listDistricts(),
          categories: listCategories(),
          dishes: listDishes(),
        }}
      />
    </>
  );
}
