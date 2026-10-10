import { VENUES } from '@/data/venues';
import { shareWhere, shareHalal } from '@/data/seo';
import { ogCard, OG_SIZE } from '@/components/ogCard';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Akiwi.at – Halal-freundliches Lokal';

export function generateStaticParams() {
  return Object.keys(VENUES).map((id) => ({ id }));
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
