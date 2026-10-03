import { VENUES } from '@/data/venues';
import { CHAINS } from '@/data/chains';
import { listCities, listDistricts, listCategories, listDishes } from '@/data/landing';

const BASE = 'https://www.akiwi.at';

// No lastModified: the data has no per-page change date, and stamping every
// URL with the build time teaches Google to ignore the field altogether.
export default function sitemap() {
  const page = (path, priority) => ({ url: `${BASE}${path}`, priority });

  return [
    page('/', 1),
    page('/search', 0.8),
    page('/impressum', 0.3),
    // Landing pages — the entry points for "halal <city>", "halal <dish>" etc.
    ...listCities().map((c) => page(c.href, 0.9)),
    ...listDistricts().map((d) => page(d.href, 0.8)),
    ...listCategories().map((c) => page(c.href, 0.8)),
    ...listDishes().map((d) => page(d.href, 0.8)),
    ...Object.keys(CHAINS).map((id) => page(`/chain/${id}`, 0.7)),
    ...Object.keys(VENUES).map((id) => page(`/r/${id}`, 0.7)),
  ];
}
