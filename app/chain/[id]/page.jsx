import { notFound } from 'next/navigation';
import { CHAINS } from '@/data/chains';
import { VENUES } from '@/data/venues';
import { chainStatus } from '@/data/listing';
import { chainJsonLd } from '@/data/jsonld';
import ChainDetail from './ChainDetail';

export function generateStaticParams() {
  return Object.keys(CHAINS).map((id) => ({ id }));
}

function chainVenues(chain) {
  return chain.venueIds.map((vid) => VENUES[vid]).filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const chain = CHAINS[id];
  if (!chain) return { title: 'Nicht gefunden' };
  const n = chainVenues(chain).length;
  const title = `${chain.name} — alle ${n} Filialen`;
  const description = `${chain.tagline_de}. ${n} Standorte mit Adresse, Öffnungszeiten und Halal-Status auf Akiwi.at.`;
  return {
    title,
    description,
    alternates: { canonical: `/chain/${id}` },
    openGraph: { title: `${title} | Akiwi.at`, description },
  };
}

export default async function ChainPage({ params }) {
  const { id } = await params;
  const chain = CHAINS[id];
  if (!chain) notFound();

  const venues = chainVenues(chain);

  // Chain status is not stored — it is derived from the branches.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chainJsonLd(chain, venues)) }}
      />
      <ChainDetail chain={{ ...chain, status: chainStatus(venues) }} venues={venues} />
    </>
  );
}
