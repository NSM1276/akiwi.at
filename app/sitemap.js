import { VENUES } from '@/data/venues';
import { CHAINS } from '@/data/chains';
import { listCities, listDistricts, listCategories } from '@/data/landing';

const BASE = 'https://www.akiwi.at';

export default function sitemap() {
  const now = new Date();
  const page = (path, priority, changeFrequency = 'monthly') => ({
    url: `${BASE}${path}`, lastModified: now, changeFrequency, priority,
  });

  return [
    page('/', 1, 'weekly'),
    page('/search', 0.8, 'weekly'),
    // Landing pages — the entry points for "halal <city>" and "halal <category>"
    ...listCities().map((c) => page(c.href, 0.9, 'weekly')),
    ...listDistricts().map((d) => page(d.href, 0.8, 'weekly')),
    ...listCategories().map((c) => page(c.href, 0.8, 'weekly')),
    ...Object.keys(CHAINS).map((id) => page(`/chain/${id}`, 0.7)),
    ...Object.keys(VENUES).map((id) => page(`/r/${id}`, 0.6)),
  ];
}
