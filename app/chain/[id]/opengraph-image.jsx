import { CHAINS } from '@/data/chains';
import { VENUES } from '@/data/venues';
import { chainStatus } from '@/data/listing';
import { shareHalal } from '@/data/seo';
import { ogCard, OG_SIZE } from '@/components/ogCard';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Akiwi.at – Halal-freundliche Kette';

export function generateStaticParams() {
  return Object.keys(CHAINS).map((id) => ({ id }));
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
