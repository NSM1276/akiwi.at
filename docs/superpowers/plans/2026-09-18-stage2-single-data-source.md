# Этап 2 — Единый источник данных. План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Главная, поиск, страницы сетей и блок «похожие» строятся из `data/venues.js` + `data/chains.js`. Ручной список карточек `RESTAURANTS` в `data/data.js` исчезает. Статус сети выводится из филиалов. Изменение одного поля в `venues.js` меняет сайт везде.

**Architecture:** Новый модуль `data/listing.js` собирает карточки для главной/поиска из VENUES и CHAINS. Он вызывается только в серверных компонентах (`app/page.jsx`, `app/search/page.jsx`), которые передают готовый массив в клиентские компоненты пропсом. Так 370 KB `venues.js` не попадает в клиентский бандл. Тексты интерфейса детальной страницы (`DETAIL_COPY`) переезжают из `venues.js` в `data/detail-copy.js`, чтобы `venues.js` был только данными.

**Правила вывода для карточки сети:**
- `locationCount` = число филиалов.
- `status` = минимальный статус среди филиалов (`verified` только если все филиалы verified; `self` если все self или verified; иначе `unknown`).
- `reviews` = сумма отзывов филиалов; `rating` = среднее по филиалам с отзывами, взвешенное по числу отзывов, округлённое до 0.1; 0 если отзывов нет.
- `district`/`districtName`: если все филиалы в одном районе Вены — этот район; иначе `district: 0` и подпись: все в Вене → `Wien (N Filialen)`; больше трёх городов → `Österreichweit`; иначе города через ` · `.
- `x`, `y`, `img`, `accentHue`: `img`/`accentHue` из `chains.js`, `x`/`y` от филиала `primaryId`.
- `featured` из `chains.js` (только Vapiano).

**Правила для одиночного заведения:** все поля из записи VENUES; `img` = `[gallery[0].a, gallery[0].b]`, `accentHue` = `gallery[0].hue`. Одиночные = все заведения, не входящие ни в одну сеть.

**Tech Stack:** Next.js 15 App Router (server component → client component props), без новых зависимостей.

---

### Task 1: `data/listing.js`

**Files:**
- Create: `data/listing.js`

- [x] **Step 1: Создать файл**

```js
// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Listing builder
//
// Builds the card list for the homepage and the search page from
// VENUES (venues.js) and CHAINS (chains.js). Server-side only:
// call getListing() in a server component and pass the result as a prop.
// Never import this file from a 'use client' component — it pulls in
// the whole venue registry.
// ─────────────────────────────────────────────────────────────────────────────

import { VENUES } from './venues';
import { CHAINS } from './chains';

const STATUS_RANK = { unknown: 0, self: 1, verified: 2 };

/** Lowest status among venues: a chain is only as verified as its least-verified branch. */
export function chainStatus(venues) {
  if (!venues.length) return 'unknown';
  return venues.reduce((min, v) =>
    STATUS_RANK[v.status] < STATUS_RANK[min] ? v.status : min, 'verified');
}

/** Weighted average rating and total reviews over venues that have reviews. */
export function chainRating(venues) {
  const rated = venues.filter((v) => v.reviews > 0);
  const reviews = rated.reduce((s, v) => s + v.reviews, 0);
  if (!reviews) return { rating: 0, reviews: 0 };
  const rating = rated.reduce((s, v) => s + v.rating * v.reviews, 0) / reviews;
  return { rating: Math.round(rating * 10) / 10, reviews };
}

/** "Erdbergstraße 93, 1030 Wien" → "Wien"; "… 1150 Wien (Westbahnhof)" → "Wien". */
function cityOf(venue) {
  const m = venue.address.match(/\d{4}\s+([^,(]+)/);
  return m ? m[1].trim() : venue.districtName;
}

function chainLocation(venues) {
  const districts = [...new Set(venues.map((v) => v.district))];
  if (districts.length === 1 && districts[0] > 0) {
    return { district: districts[0], districtName: venues[0].districtName };
  }
  const cities = [...new Set(venues.map(cityOf))];
  if (cities.length === 1 && cities[0] === 'Wien') {
    return { district: 0, districtName: `Wien (${venues.length} Filialen)` };
  }
  if (cities.length > 3) return { district: 0, districtName: 'Österreichweit' };
  return { district: 0, districtName: cities.join(' · ') };
}

export function chainCard(chain) {
  const venues = chain.venueIds.map((id) => VENUES[id]).filter(Boolean);
  const primary = VENUES[chain.primaryId] || venues[0];
  return {
    id: chain.id,
    type: 'chain',
    locationCount: venues.length,
    name: chain.name,
    ...chainLocation(venues),
    status: chainStatus(venues),
    categories: chain.categories,
    tags: chain.tags,
    price: chain.price,
    ...chainRating(venues),
    x: primary.x, y: primary.y,
    img: chain.img, accentHue: chain.accentHue,
    featured: !!chain.featured,
  };
}

export function venueCard(v) {
  const g = v.gallery[0];
  return {
    id: v.id,
    type: 'venue',
    name: v.name,
    district: v.district, districtName: v.districtName,
    status: v.status,
    categories: v.categories,
    tags: v.tags,
    price: v.price,
    rating: v.rating, reviews: v.reviews,
    x: v.x, y: v.y,
    img: [g.a, g.b], accentHue: g.hue,
    featured: !!v.featured,
  };
}

/** Chains first (in chains.js order), then solo venues (in venues.js order). */
export function getListing() {
  const inChain = new Set(Object.values(CHAINS).flatMap((c) => c.venueIds));
  const chains = Object.values(CHAINS).map(chainCard);
  const solo = Object.values(VENUES).filter((v) => !inChain.has(v.id)).map(venueCard);
  return [...chains, ...solo];
}
```

### Task 2: Данные — убрать дубли

**Files:**
- Modify: `data/data.js` (удалить `RESTAURANTS`, оставить `COPY`, `CATEGORIES`, `DISTRICTS`)
- Modify: `data/search-data.js` (удалить импорт и `SEARCH_RESTAURANTS`)
- Modify: `data/chains.js` (удалить поле `status` у всех сетей, добавить `featured: true` у `vapiano`, обновить шапку)
- Create: `data/detail-copy.js` (перенести `DETAIL_COPY` из `venues.js`)
- Modify: `data/venues.js` (удалить `DETAIL_COPY`, переписать инструкцию в шапке)

- [x] **Step 1: data.js.** Удалить всё от `export const RESTAURANTS = [` до `];` включительно. Шапку файла заменить на: `// AKIWI — UI copy (DE/EN) and filter constants. The card list is built in listing.js.`

- [x] **Step 2: search-data.js.** Удалить строки `import { RESTAURANTS } …` и `export const SEARCH_RESTAURANTS = RESTAURANTS;`, поправить комментарий: `// Copy for the Search/Catalog page. Data comes from listing.js via the page's props.`

- [x] **Step 3: chains.js.** Удалить строку `status: '…',` у всех 19 сетей. У `vapiano` добавить `featured: true,`. В шапке добавить: `// status → NOT stored here: derived from the branches (lowest status wins), see listing.js`.

- [x] **Step 4: detail-copy.js.** Создать файл, начинающийся с `// AKIWI — UI copy (DE/EN) for the venue detail page.` и содержащий `export const DETAIL_COPY = { … }` в точности как сейчас в `venues.js` (обе секции de/en). Из `DETAIL_COPY` убрать неиспользуемые `breadcrumb`, `navHome`, `navSubmit`, `navImprint`.

- [x] **Step 5: venues.js.** Удалить блок `export const DETAIL_COPY = { … };` до конца файла. Шапку (строки 1–12) заменить на:

```js
// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Venue registry (single source of truth)
//
// HOW TO ADD A VENUE:
//   1. Copy the template block at the bottom of this file, paste it into
//      VENUES (before the closing }; ) and fill in the fields.
//   2. If the venue belongs to a chain, add its id to that chain's venueIds
//      in chains.js (or create the chain there). Otherwise nothing else:
//      the homepage and the search page pick it up automatically.
//   3. git add . && git commit -m "Add <name>" && git push → live in ~1 min.
//
// HOW TO CHANGE A VERIFICATION STATUS:
//   Edit the `status` field of the venue: 'verified' | 'self' | 'unknown'.
//   A chain's status is derived from its branches (lowest status wins).
//
// Rating/reviews: only shown when reviews > 0. Leave rating: 0, reviews: 0
// for a new venue.
// ─────────────────────────────────────────────────────────────────────────────
```

### Task 3: Главная как server → client

**Files:**
- Create: `app/HomeClient.jsx` (содержимое текущего `app/page.jsx`, с изменениями ниже)
- Modify: `app/page.jsx`
- Modify: `components/Hero.jsx`

- [x] **Step 1: HomeClient.jsx.** Скопировать текущий `app/page.jsx`. Изменить: убрать `import { RESTAURANTS, COPY } from '@/data/data'` → `import { COPY } from '@/data/data'`; сигнатура `export default function HomeClient({ restaurants, venueCount })`; в `filtered` заменить `RESTAURANTS.filter` на `restaurants.filter` и в зависимости `useMemo` добавить `restaurants`; `<Hero lang={lang} query={query} setQuery={setQuery} restaurants={restaurants} venueCount={venueCount} />`.

- [x] **Step 2: page.jsx.**

```jsx
import { getListing } from '@/data/listing';
import { VENUE_COUNT } from '@/data/venues';
import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient restaurants={getListing()} venueCount={VENUE_COUNT} />;
}
```

- [x] **Step 3: Hero.jsx.** Убрать импорты `RESTAURANTS` и `VENUE_COUNT` (оставить `COPY`). `HeroTicker({ rtl = false, restaurants })` и `const data = restaurants || [];`. `Hero({ lang, query, setQuery, restaurants, venueCount })`; `<HeroTicker restaurants={restaurants} />`, `<HeroTicker rtl restaurants={restaurants} />`, `<AnimatedCount to={venueCount} />`.

### Task 4: Поиск как server → client

**Files:**
- Create: `app/search/SearchClient.jsx` (содержимое текущего `app/search/page.jsx`)
- Modify: `app/search/page.jsx`

- [x] **Step 1: SearchClient.jsx.** Скопировать текущий `app/search/page.jsx`. Изменить: импорт `import { SEARCH_COPY } from '@/data/search-data'`; `function SearchPage({ restaurants })`; `applyFilters(restaurants, …)` и `const total = restaurants.length;`; обёртка `export default function SearchClient({ restaurants })` с `<SearchPage restaurants={restaurants} />` внутри `Suspense`.

- [x] **Step 2: page.jsx.**

```jsx
import { getListing } from '@/data/listing';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return <SearchClient restaurants={getListing()} />;
}
```

### Task 5: Сети и «похожие» из единого источника

**Files:**
- Modify: `app/chain/[id]/page.jsx`
- Modify: `app/r/[id]/page.jsx`

- [x] **Step 1: chain page.** Импортировать `chainStatus` из `@/data/listing`; передавать `chain={{ ...chain, status: chainStatus(venues) }}`.

- [x] **Step 2: venue page.** Блок «похожие» брать из актуальных записей, а не из вшитых копий:

```js
const similar = (venue.similar || [])
  .map((s) => {
    const v = VENUES[s.id];
    if (!v) return null;
    return { id: v.id, name: v.name, district: v.district, status: v.status,
             cat: v.categories[0], distance_km: s.distance_km, hue: v.gallery[0].hue };
  })
  .filter(Boolean);
return <Detail venue={{ ...venue, similar }} />;
```

### Task 6: Импорты DETAIL_COPY

**Files:**
- Modify: `app/r/[id]/Detail.jsx`, `components/Gallery.jsx`, `components/Hours.jsx`, `components/detail-sections.jsx`

- [x] **Step 1:** Во всех четырёх файлах `import { DETAIL_COPY } from '@/data/venues'` → `import { DETAIL_COPY } from '@/data/detail-copy'`.

### Task 7: Проверка

- [x] **Step 1:** `grep -rn "RESTAURANTS\|SEARCH_RESTAURANTS\|from '@/data/venues'" app components data` → `RESTAURANTS` нигде, `@/data/venues` импортируется только в `app/page.jsx`, `app/r/[id]/page.jsx`, `app/chain/[id]/page.jsx`, `data/listing.js`.
- [x] **Step 2:** `npm run build` → успех, 111 страниц. Размер `/` и `/search` First Load JS не больше, чем до этапа (146 kB / 120 kB).
- [x] **Step 3:** Скрипт: `getListing()` возвращает 29 карточек, 19 `chain` + 10 `venue`, все id уникальны, у каждой есть `img`, `x`, `y`, `districtName`; статус `turkis` = `self`, `pizza-mann` = `verified`, `alaturka` = `unknown`.
- [x] **Step 4:** Браузер: главная показывает 29 карточек, поиск 29, у Türkis бейдж «Selbstauskunft», страница `/chain/turkis` тот же бейдж, `/r/alaturka-1030` блок «похожие» работает, тексты детальной страницы на месте.
