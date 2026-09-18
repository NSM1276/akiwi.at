import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import { venueJsonLd } from '@/data/jsonld';
import Detail from './Detail';

export function generateStaticParams() {
  return Object.keys(VENUES).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const venue = VENUES[id];
  if (!venue) return { title: 'Nicht gefunden' };
  const title = `${venue.name} — ${venue.districtName}`;
  const description = `${venue.tagline_de} · ${venue.address}`;
  return {
    title,
    description,
    alternates: { canonical: `/r/${id}` },
    openGraph: { title: `${title} | Akiwi.at`, description },
  };
}

export default async function RestaurantDetailPage({ params }) {
  const { id } = await params;
  const venue = VENUES[id];
  if (!venue) notFound();

  // "Similar" entries only carry an id + distance; everything else is read
  // from the current venue record so it can never go stale.
  const similar = (venue.similar || [])
    .map((s) => {
      const v = VENUES[s.id];
      if (!v) return null;
      return {
        id: v.id, name: v.name, district: v.district, status: v.status,
        cat: v.categories[0], distance_km: s.distance_km, hue: v.gallery[0].hue,
      };
    })
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd(venue)) }}
      />
      <Detail venue={{ ...venue, similar }} />
    </>
  );
}
