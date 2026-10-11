import { CHAINS } from '@/data/chains';
import { VENUES } from '@/data/venues';
import { chainStatus } from '@/data/listing';
import { shareHalal } from '@/data/seo';
import { ogCard, OG_SIZE, OG_VERSION } from '@/components/ogCard';

export function generateImageMetadata() {
  return [{ id: OG_VERSION, size: OG_SIZE, contentType: 'image/png', alt: 'Akiwi.at – Halal-freundliche Kette' }];
}

export default async function Image({ params }) {
  const { id } = await params;
  const chain = CHAINS[id];
  const venues = chain ? chain.venueIds.map((v) => VENUES[v]).filter(Boolean) : [];
  return ogCard({
    kicker: 'Alle Filialen',
    title: chain ? chain.name : 'Akiwi.at',
    lines: chain ? [chain.tagline_de] : [],
    status: venues.length ? chainStatus(venues) : undefined,
    statusLabel: shareHalal(chainStatus(venues)),
    tag: venues.length ? `${venues.length} Filialen` : undefined,
  });
}
