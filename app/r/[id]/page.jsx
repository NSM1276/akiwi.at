import { notFound } from 'next/navigation';
import { VENUES } from '@/data/venues';
import Detail from './Detail';

export function generateStaticParams() {
  return Object.keys(VENUES).map((id) => ({ id }));
}

export function generateMetadata({ params }) {
  const venue = VENUES[params.id];
  if (!venue) return { title: 'Akiwi.at' };
  return {
    title: `${venue.name} — Akiwi.at`,
    description: venue.tagline_de || venue.tagline_en || `${venue.name} in ${venue.address}`,
  };
}

export default function RestaurantDetailPage({ params }) {
  const venue = VENUES[params.id];
  if (!venue) notFound();
  return <Detail venue={venue} />;
}
