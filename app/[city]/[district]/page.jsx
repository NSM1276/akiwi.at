import { notFound } from 'next/navigation';
import { getDistrictSlugs, getDistrictPage } from '@/data/landing';
import { breadcrumbJsonLd, itemListJsonLd } from '@/data/jsonld';
import Landing from '@/components/Landing';

// Districts only exist for Vienna.
export function generateStaticParams() {
  return getDistrictSlugs().map((district) => ({ city: 'wien', district }));
}

export async function generateMetadata({ params }) {
  const { city, district } = await params;
  if (city !== 'wien') return { title: 'Nicht gefunden' };
  const page = getDistrictPage(district);
  if (!page) return { title: 'Nicht gefunden' };

  const title = `Halal in ${page.postal} Wien-${page.districtName} — ${page.stats.total} Lokale`;
  // Venue names in the snippet: most searches are "<venue> <postal code>".
  // Within one district a chain has one branch, so full venue names stay.
  const shown = page.venues.slice(0, 3).map((v) => v.name);
  const rest = page.venues.length - shown.length;
  const names = rest > 0 ? `${shown.join(', ')} und ${rest} weitere` : shown.join(', ');
  const description = `Halal-freundliche Lokale in ${page.postal} Wien-${page.districtName}: ${names} — mit Speisekarte, Adresse, Öffnungszeiten und Halal-Status.`;

  return {
    title,
    description,
    alternates: { canonical: `/wien/${district}` },
    openGraph: { title: `${title} | Akiwi.at`, description },
  };
}

export default async function DistrictPage({ params }) {
  const { city, district } = await params;
  if (city !== 'wien') notFound();
  const page = getDistrictPage(district);
  if (!page) notFound();

  const breadcrumb = [{ href: '/', label: 'Home' }, { href: '/wien', label: 'Wien' }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([...breadcrumb, { href: `/wien/${district}`, label: page.name }])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(`Halal-Lokale in ${page.name}`, page.venues)),
        }}
      />
      <Landing
        kind="district"
        name={page.name}
        venues={page.venues}
        stats={page.stats}
        related={page.related}
        relatedKind={page.relatedKind}
        breadcrumb={breadcrumb}
        searchHref={`/search?q=${encodeURIComponent(page.districtName)}`}
      />
    </>
  );
}
