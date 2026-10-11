import { OG_VERSION } from '@/components/ogCard';
import { notFound } from 'next/navigation';
import { getCategorySlugs, getCategoryPage, placeOf, sampleNames } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import Landing from '@/components/Landing';

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) return { title: 'Nicht gefunden' };

  const place = placeOf(page.cities, page.stats.total);
  const title = `Halal ${page.name} in ${place.de} – ${page.stats.total} Lokale`;
  const names = sampleNames(page.venues).join(', ');
  const description = `${page.stats.total} halal-freundliche Lokale der Kategorie ${page.name}, u. a. ${names} — mit Adresse und Halal-Status.`;

  return {
    title,
    description,
    alternates: { canonical: `/kategorie/${slug}` },
    openGraph: { title: `${title} | Akiwi.at`, description, images: [{ url: `/opengraph-image/${OG_VERSION}`, width: 1200, height: 630 }], siteName: 'Akiwi.at', locale: 'de_AT', type: 'website' },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) notFound();

  const breadcrumb = [{ href: '/', label: 'Home' }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([...breadcrumb, { href: `/kategorie/${slug}`, label: page.name }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(`Halal ${page.name} in ${placeOf(page.cities, page.stats.total).de}`, page.venues)),
        }}
      />
      <Landing
        kind="category"
        name={page.name}
        venues={page.venues}
        stats={page.stats}
        related={page.related}
        relatedKind={page.relatedKind}
        cities={page.cities}
        place={placeOf(page.cities, page.stats.total)}
        breadcrumb={breadcrumb}
        searchHref={`/search?q=${encodeURIComponent(page.name)}`}
      />
    </>
  );
}
