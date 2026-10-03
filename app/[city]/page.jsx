import { notFound } from 'next/navigation';
import { getCitySlugs, getCityPage, sampleNames } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import Landing from '@/components/Landing';

export function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const page = getCityPage(city);
  if (!page) return { title: 'Nicht gefunden' };

  const n = page.stats.total;
  const title = page.districtCount > 1
    ? `Halal Restaurants in ${page.name} – ${n} Lokale in ${page.districtCount} Bezirken`
    : `Halal Restaurants in ${page.name} – ${n} ${n === 1 ? 'Lokal' : 'Lokale'}`;
  const kinds = page.stats.topCategories.slice(0, 4).map((c) => c.name).join(', ');
  const names = sampleNames(page.venues).join(', ');
  const description = page.districtCount > 1
    ? `${n} halal-freundliche Restaurants, Imbisse und Cafés in ${page.name}: ${kinds}. Nach Bezirk, mit Speisekarte, Öffnungszeiten und Halal-Status.`
    : `Halal-freundliche Lokale in ${page.name}: ${names}. Mit Speisekarte, Adresse, Öffnungszeiten und Halal-Status.`;

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
