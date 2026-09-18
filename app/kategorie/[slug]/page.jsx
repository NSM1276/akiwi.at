import { notFound } from 'next/navigation';
import { getCategorySlugs, getCategoryPage } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import Landing from '@/components/Landing';

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) return { title: 'Nicht gefunden' };

  const title = `Halal ${page.name} in Österreich — ${page.stats.total} Lokale`;
  const description = `${page.stats.total} halal-freundliche Lokale der Kategorie ${page.name} in ${page.cities.length === 1 ? page.cities[0].label : `${page.cities.length} Städten`} — mit Adresse, Öffnungszeiten und Halal-Status.`;

  return {
    title,
    description,
    alternates: { canonical: `/kategorie/${slug}` },
    openGraph: { title: `${title} | Akiwi.at`, description },
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
          __html: JSON.stringify(itemListJsonLd(`Halal ${page.name} in Österreich`, page.venues)),
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
        breadcrumb={breadcrumb}
        searchHref={`/search?q=${encodeURIComponent(page.name)}`}
      />
    </>
  );
}
