import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import { venueJsonLd, breadcrumbJsonLd } from '@/data/jsonld';
import { breadcrumbFor, dishesOf } from '@/data/landing';
import { venueMeta, venueAbout, venueFacts } from '@/data/seo';
import { CHAINS } from '@/data/chains';
import Detail from './Detail';

export function generateStaticParams() {
  return Object.keys(VENUES).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const venue = VENUES[id];
  if (!venue) return { title: 'Nicht gefunden' };
  const { title, description } = venueMeta(venue);
  return {
    // The title already names the place; the " | Akiwi.at" suffix would push
    // "Öffnungszeiten" out of the visible part of the search result.
    title: { absolute: title },
    description,
    alternates: { canonical: `/r/${id}` },
    openGraph: { title, description, url: `/r/${id}`, siteName: 'Akiwi.at', locale: 'de_AT', type: 'website' },
  };
}

function chainOf(id) {
  const chain = Object.values(CHAINS).find((c) => c.venueIds.includes(id));
  if (!chain) return null;
  const count = chain.venueIds.filter((vid) => VENUES[vid]).length;
  return count > 1 ? { href: `/chain/${chain.id}`, name: chain.name, count } : null;
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

  const breadcrumb = breadcrumbFor(venue);
  const dishes = dishesOf(venue);
  const about = venueAbout(venue, dishes);
  const facts = venueFacts(venue);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd(venue, about.de)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([...breadcrumb, { href: `/r/${id}`, label: venue.name }])),
        }}
      />
      <Detail
        venue={{ ...venue, similar }}
        breadcrumb={breadcrumb}
        about={about}
        facts={facts}
        dishes={dishes}
        chain={chainOf(id)}
      />
    </>
  );
}
