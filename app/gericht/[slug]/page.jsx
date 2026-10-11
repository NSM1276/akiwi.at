import { OG_VERSION } from '@/components/ogCard';
import { notFound } from 'next/navigation';
import { getDishSlugs, getDishPage, placeOf, sampleNames } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import { formatEuro } from '@/data/dishes';
import Landing from '@/components/Landing';

export function generateStaticParams() {
  return getDishSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getDishPage(slug);
  if (!page) return { title: 'Nicht gefunden' };

  const place = placeOf(page.cities, page.venues.length);
  const n = page.venues.length;
  const title = `Halal ${page.name} in ${place.de} – ${n} Lokale mit Preisen`;
  const names = sampleNames(page.venues).join(', ');
  const price = page.priceMin != null ? ` ab ${formatEuro(page.priceMin)}` : '';
  const description = `${page.name}${price} in ${n} halal-freundlichen Lokalen, u. a. ${names}. Mit Adresse und Halal-Status.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/gericht/${slug}` },
    openGraph: { title, description, images: [{ url: `/opengraph-image/${OG_VERSION}`, width: 1200, height: 630 }], siteName: 'Akiwi.at', locale: 'de_AT', type: 'website' },
  };
}

export default async function DishPage({ params }) {
  const { slug } = await params;
  const page = getDishPage(slug);
  if (!page) notFound();

  const place = placeOf(page.cities, page.venues.length);
  const breadcrumb = [{ href: '/', label: 'Home' }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([...breadcrumb, { href: `/gericht/${slug}`, label: page.name }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(`Halal ${page.name} in ${place.de}`, page.venues)),
        }}
      />
      <Landing
        kind="dish"
        name={page.name}
        venues={page.venues}
        stats={page.stats}
        related={page.related}
        relatedKind={page.relatedKind}
        cities={page.cities}
        place={place}
        prices={{ min: page.priceMin, max: page.priceMax }}
        breadcrumb={breadcrumb}
        searchHref={`/search?q=${encodeURIComponent(page.name)}`}
      />
    </>
  );
}
