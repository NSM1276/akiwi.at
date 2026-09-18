import { notFound } from 'next/navigation';
import { getCitySlugs, getCityPage } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import Landing from '@/components/Landing';

export function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const page = getCityPage(city);
  if (!page) return { title: 'Nicht gefunden' };

  const title = `Halal-Restaurants in ${page.name} — ${page.stats.total} Lokale`;
  const description = page.districtCount > 1
    ? `${page.stats.total} halal-freundliche Restaurants, Imbisse und Cafés in ${page.name}, verteilt auf ${page.districtCount} Bezirke — mit Adresse, Öffnungszeiten und Halal-Status.`
    : `${page.stats.total} halal-freundliche Lokale in ${page.name} — mit Adresse, Öffnungszeiten und Halal-Status auf Akiwi.at.`;

  return {
    title,
    description,
    alternates: { canonical: `/${city}` },
    openGraph: { title: `${title} | Akiwi.at`, description },
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const page = getCityPage(city);
  if (!page) notFound();

  const breadcrumb = [{ href: '/', label: 'Home' }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([...breadcrumb, { href: `/${city}`, label: page.name }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(`Halal-Lokale in ${page.name}`, page.venues)),
        }}
      />
      <Landing
        kind="city"
        name={page.name}
        venues={page.venues}
        stats={page.stats}
        related={page.related}
        relatedKind={page.relatedKind}
        districtCount={page.districtCount}
        breadcrumb={breadcrumb}
        searchHref={`/search?q=${encodeURIComponent(page.name)}`}
      />
    </>
  );
}
