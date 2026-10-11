import { VENUES } from '@/data/venues';
import { shareWhere, shareHalal } from '@/data/seo';
import { ogCard, OG_SIZE, OG_VERSION } from '@/components/ogCard';

export function generateImageMetadata() {
  return [{ id: OG_VERSION, size: OG_SIZE, contentType: 'image/png', alt: 'Akiwi.at – Halal-freundliches Lokal' }];
}

export default async function Image({ params }) {
  const { id } = await params;
  const v = VENUES[id];
  return ogCard({
    kicker: v ? v.categories[0] : 'Halal',
    title: v ? v.name : 'Akiwi.at',
    lines: v ? [shareWhere(v), v.tagline_de] : [],
    status: v?.status,
    statusLabel: v ? shareHalal(v.status) : '',
    tag: v?.price,
  });
}
