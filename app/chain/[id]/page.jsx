import { notFound } from 'next/navigation';
import { CHAINS } from '@/data/chains';
import { VENUES } from '@/data/venues';
import ChainDetail from './ChainDetail';

export function generateStaticParams() {
  return Object.keys(CHAINS).map((id) => ({ id }));
}

export function generateMetadata({ params }) {
  const chain = CHAINS[params.id];
  if (!chain) return {};
  return {
    title: `${chain.name} — Alle Filialen in Österreich | Akiwi.at`,
    description: chain.tagline_de,
  };
}

export default function ChainPage({ params }) {
  const chain = CHAINS[params.id];
  if (!chain) notFound();

  const venues = chain.venueIds
    .map((vid) => VENUES[vid])
    .filter(Boolean);

  return <ChainDetail chain={chain} venues={venues} />;
}
