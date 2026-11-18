import { OG_VERSION } from '@/components/ogCard';
import { RATGEBER } from '@/data/ratgeber';
import { breadcrumbJsonLd } from '@/data/jsonld';
import { RatgeberList } from '@/components/RatgeberContent';

const title = 'Ratgeber – Halal-Essen in Österreich';
const description = 'Antworten rund um Halal-Essen in Österreich, mit Quelle und Datum: was Ketten selbst zu Halal sagen und wie Akiwi Halal-Angaben einordnet.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/ratgeber' },
  openGraph: { title: `${title} | Akiwi.at`, description, images: [{ url: `/opengraph-image/${OG_VERSION}`, width: 1200, height: 630 }], siteName: 'Akiwi.at', locale: 'de_AT', type: 'website' },
};

export default function RatgeberPage() {
  const articles = RATGEBER.map(({ slug, title: t, description: d, stand }) => ({ slug, title: t, description: d, stand }));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ href: '/', label: 'Home' }, { href: '/ratgeber', label: 'Ratgeber' }])) }}
      />
      <RatgeberList articles={articles} />
    </>
  );
}
