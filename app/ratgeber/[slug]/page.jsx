import { notFound } from 'next/navigation';
import { OG_VERSION } from '@/components/ogCard';
import { RATGEBER, getArticle } from '@/data/ratgeber';
import { articleJsonLd, breadcrumbJsonLd } from '@/data/jsonld';
import { RatgeberArticle } from '@/components/RatgeberContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return RATGEBER.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: 'Nicht gefunden' };
  return {
    title: { absolute: `${a.title} | Akiwi.at` },
    description: a.description,
    alternates: { canonical: `/ratgeber/${slug}` },
    openGraph: { title: a.title, description: a.description, images: [{ url: `/opengraph-image/${OG_VERSION}`, width: 1200, height: 630 }], siteName: 'Akiwi.at', locale: 'de_AT', type: 'article', modifiedTime: a.stand },
  };
}

export default async function RatgeberArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const trail = [{ href: '/', label: 'Home' }, { href: '/ratgeber', label: 'Ratgeber' }, { href: `/ratgeber/${slug}`, label: a.title }];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }} />
      <RatgeberArticle article={a} />
    </>
  );
}
