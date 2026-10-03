import { notFound } from 'next/navigation';
import { CHAINS } from '@/data/chains';
import { VENUES } from '@/data/venues';
import { chainStatus } from '@/data/listing';
import { chainJsonLd } from '@/data/jsonld';
import { chainMeta, chainAbout } from '@/data/seo';
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
  const { title, description } = chainMeta(chain, chainVenues(chain));
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/chain/${id}` },
    openGraph: { title, description },
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
      <ChainDetail
        chain={{ ...chain, status: chainStatus(venues) }}
        venues={venues}
        about={chainAbout(chain, venues)}
      />
    </>
  );
}
