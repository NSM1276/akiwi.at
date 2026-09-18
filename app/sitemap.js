import { VENUES } from '@/data/venues';
import { CHAINS } from '@/data/chains';

const BASE = 'https://www.akiwi.at';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...Object.keys(CHAINS).map((id) => ({
      url: `${BASE}/chain/${id}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7,
    })),
    ...Object.keys(VENUES).map((id) => ({
      url: `${BASE}/r/${id}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6,
    })),
  ];
}
