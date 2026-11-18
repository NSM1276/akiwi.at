import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import EintragForm from './EintragForm';

// One personal page per shown venue. Sent by Nasim to an owner he is talking to;
// not linked anywhere, not in the sitemap, not indexed (data/eintrag-copy.js).
export function generateStaticParams() {
  return Object.keys(VENUES).map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const v = VENUES[id];
  return {
    title: v ? `Ihr Eintrag: ${v.name}` : 'Nicht gefunden',
    robots: { index: false, follow: false },
  };
}

export default async function EintragPage({ params }) {
  const { id } = await params;
  const v = VENUES[id];
  if (!v) notFound();
  // Only what the form needs, so the page stays small.
  const venue = {
    id: v.id,
    name: v.name,
    address: v.address || '',
    phone: v.phone || '',
    website: v.website || '',
    instagram: v.instagram || '',
    hours: v.hours || [],
    menuCount: (v.menu || []).reduce((n, c) => n + (c.items || []).length, 0),
  };
  return <EintragForm venue={venue} />;
}
