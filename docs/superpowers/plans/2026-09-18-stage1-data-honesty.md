# Этап 1 — Честность данных и битые ссылки. План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Убрать с сайта выдуманные данные и заявления (фейковые рестораны, счётчик «142», гистограмма отзывов, общее описание, текст «проверено на месте»), починить переходы на сети и убрать ссылки на несуществующие страницы.

**Architecture:** Только правки существующих файлов в `data/` и `components/`, без новых зависимостей. Правило: если у записи нет реальных данных (отзывы = 0, нет описания, нет поля кухни), элемент не показывается, а не подменяется заглушкой. Коммиты не делаем, пока владелец не попросит (см. `docs/AUDIT-2026-09-18.md`, решения).

**Tech Stack:** Next.js 15, React 19. Тестового фреймворка нет; проверка — `npm run build` + node-скрипт проверки данных + ручная проверка в браузере.

---

### Task 1: Удалить фейковые рестораны из поиска

**Files:**
- Modify: `data/search-data.js:1-62`

- [x] **Step 1: Заменить верх файла (до `export const CUISINES`)**

```js
// Copy for the Search/Catalog page.
// The dataset is the same RESTAURANTS list as the homepage (data.js).
// Fields like cuisine/openNow/distance are not in the data yet —
// components must render nothing when a field is missing.

import { RESTAURANTS } from '@/data/data';

export const SEARCH_RESTAURANTS = RESTAURANTS;
```

- [x] **Step 2: Проверить, что фейков нет**

Run (в корне проекта):
```bash
grep -cE "kabul-corner|tandoor-house|beirut-express|samarkand|masala-king|al-nour" data/search-data.js
```
Expected: `0`

### Task 2: Счётчик и текст в хиро

**Files:**
- Modify: `data/venues.js` (после `export const VENUES = { ... };`)
- Modify: `components/Hero.jsx:6,13,35,179-181,211-213`

- [x] **Step 1: Экспортировать счётчик из venues.js.** Сразу после закрывающей `};` объекта `VENUES` (перед комментарием-шаблоном) добавить:

```js
export const VENUE_COUNT = Object.keys(VENUES).length;
```

- [x] **Step 2: В Hero.jsx** заменить импорт `SEARCH_RESTAURANTS`:

```js
import { RESTAURANTS } from '@/data/data';
import { VENUE_COUNT } from '@/data/venues';
```
В `HeroTicker` заменить `const data = SEARCH_RESTAURANTS || [];` на `const data = RESTAURANTS;`, а строку с `· {1000 + r.district * 10}` на `· {r.districtName}`.

- [x] **Step 3: Счётчик.** Заменить `<AnimatedCount to={142} />` на `<AnimatedCount to={VENUE_COUNT} />`, а текст:

```jsx
{lang === 'de' ? ' Lokale in Österreich' : ' venues across Austria'}
```

- [x] **Step 4: Тэглайн.** «in Wien entdecken» → «in Österreich entdecken», «across Vienna» → «across Austria».

### Task 3: Рейтинг только при реальных отзывах

**Files:**
- Modify: `components/RestaurantCard.jsx:138-146,181`
- Modify: `components/SearchResultCard.jsx:78-95,116`
- Modify: `components/SearchMap.jsx` (строка с `{r.cuisine} · {r.price}`)
- Modify: `app/r/[id]/Detail.jsx:81-89`
- Modify: `app/chain/[id]/ChainDetail.jsx:159-160`
- Modify: `components/detail-sections.jsx:57-143,204-211`

- [x] **Step 1: RestaurantCard.** Обернуть блок со звездой: `{r.reviews > 0 && ( ...звезда и рейтинг... )}`. Строку `<span>{c.reviewsSuffix(r.reviews)}</span>` заменить на `<span>{r.reviews > 0 ? c.reviewsSuffix(r.reviews) : (lang === 'de' ? 'Noch keine Bewertungen' : 'No reviews yet')}</span>`.

- [x] **Step 2: SearchResultCard.** Блок рейтинга обернуть в `{r.reviews > 0 && (...)}`. Блок «Geöffnet/Geschlossen» обернуть в `{r.hours && (...)}` (у реальных данных поля нет, значит не показывается). Строку `{r.cuisine}` заменить на `{r.cuisine || r.categories.join(', ')}`.

- [x] **Step 3: SearchMap.** `{r.cuisine} · {r.price}` → `{r.categories[0]} · {r.price}`.

- [x] **Step 4: Detail.jsx.** Блок `<span ...><Icon.star .../> {v.rating.toFixed(1)} ...</span>` обернуть в `{v.reviews > 0 && (...)}`.

- [x] **Step 5: ChainDetail.** `bestRating` считать только по филиалам с отзывами:

```js
const bestRating = venues.reduce((best, v) => (v.reviews > 0 ? Math.max(best, v.rating || 0) : best), 0);
```

- [x] **Step 6: detail-sections.jsx, Reviews.** В начале функции:

```jsx
if (!venue.reviews || venue.reviews === 0) {
  return (
    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>
      {lang === 'de' ? 'Noch keine Bewertungen.' : 'No reviews yet.'}
    </p>
  );
}
```
Удалить выдуманную гистограмму (блок `{[5,4,3,2,1].map(...)}` вместе с обёрткой `<div style={{ flex: 1, ... }}>`), оставить средний балл и количество.

- [x] **Step 7: SimilarList.** Убрать `<span ... color: 'var(--accent)'><Icon.star size={10} /> {s.rating}</span>` и соседний разделитель `<span>·</span>`. Оставить район и расстояние.

### Task 4: Описание заведения и текст верификации

**Files:**
- Modify: `app/r/[id]/Detail.jsx:122-128`
- Modify: `data/venues.js` (`DETAIL_COPY.de.statusBlurbVerified`, `DETAIL_COPY.en.statusBlurbVerified`)
- Modify: `components/detail-sections.jsx:145-151`

- [x] **Step 1: Detail.jsx.** Заменить захардкоженный `<p>` на:

```jsx
{(lang === 'de' ? v.description_de : v.description_en) && (
  <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 640 }}>
    {lang === 'de' ? v.description_de : v.description_en}
  </p>
)}
```
В шаблон в конце `venues.js` добавить строки-комментарии `description_de` / `description_en` (необязательные поля).

- [x] **Step 2: venues.js, DETAIL_COPY.**
- de: `statusBlurbVerified: 'Halal-Status laut Betreiber bzw. Website des Lokals bestätigt.'`
- en: `statusBlurbVerified: "Halal status confirmed by the venue's owner or website."`

- [x] **Step 3: Verification component.** Выбирать текст по статусу:

```jsx
const blurb =
  venue.status === 'verified' ? c.statusBlurbVerified :
  venue.status === 'self' ? c.statusBlurbSelf :
  c.statusBlurbUnknown;
```
и рендерить `{blurb}` вместо `{c.statusBlurbVerified}`.

### Task 5: Переход из поиска на сети

**Files:**
- Modify: `app/search/page.jsx:112-114`

- [x] **Step 1:**

```js
const handleCardClick = useCallback((r) => {
  router.push(r.type === 'chain' ? `/chain/${r.id}` : `/r/${r.id}`);
}, [router]);
```
Оба вызова `onClick={() => handleCardClick(r.id)}` → `onClick={() => handleCardClick(r)}`.

### Task 6: Убрать ссылки на несуществующие страницы

**Files:**
- Modify: `components/Header.jsx:9-13`
- Modify: `components/Footer.jsx:4-11,36-55`
- Modify: `data/data.js` (`COPY.de/en`: `navSubmit`, `navImprint`, `footerSections`, `footerSectionTitles`, `footerLinks`)
- Modify: `app/chain/[id]/ChainDetail.jsx:270-297`

- [x] **Step 1: Header.** Навигация: Home (`/`) и Suche/Search (`/search`). В `COPY` добавить `navSearch: 'Suche'` / `'Search'`; `navSubmit`, `navImprint` удалить.

```js
const nav = [
  { key: 'home', label: c.navHome, href: '/', active: pathname === '/' },
  { key: 'search', label: c.navSearch, href: '/search', active: pathname === '/search' },
];
```

- [x] **Step 2: Footer + COPY.** В `COPY.de`: `footerSections: { product: ['Home', 'Suche'] }`, `footerSectionTitles: { product: 'Navigation' }`, `footerLinks: { 'Home': '/', 'Suche': '/search' }`. В `COPY.en`: `product: ['Home', 'Search']`, `{ product: 'Navigation' }`, `{ 'Home': '/', 'Search': '/search' }`. В Footer.jsx удалить `HREF_MAP`, ссылка берётся из `c.footerLinks[item]`. Колонок в сетке станет три: `gridTemplateColumns: 'minmax(240px, 1.3fr) minmax(140px, 1fr) minmax(260px, 1.4fr)'`.

- [x] **Step 3: ChainDetail.** Удалить блок «Bist du der Betreiber? … Eintrag beanspruchen» целиком.

### Task 7: Проверка

- [x] **Step 1: Сборка.** `npm run build` → `✓ Compiled successfully`, 111 страниц, без ошибок.

- [x] **Step 2: Скрипт проверки данных.** Создать во временной папке `check.mjs`:

```js
import { SEARCH_RESTAURANTS } from './data/search-data.js';
import { RESTAURANTS } from './data/data.js';
import { VENUES, VENUE_COUNT, DETAIL_COPY } from './data/venues.js';
const fake = ['kabul-corner','tandoor-house','beirut-express','samarkand','masala-king'];
console.assert(SEARCH_RESTAURANTS.length === RESTAURANTS.length, 'search list must equal homepage list');
console.assert(!SEARCH_RESTAURANTS.some(r => fake.includes(r.id)), 'fake venues still present');
console.assert(VENUE_COUNT === Object.keys(VENUES).length && VENUE_COUNT === 87, 'venue count');
console.assert(/laut Betreiber/.test(DETAIL_COPY.de.statusBlurbVerified), 'verified blurb not updated');
console.log('OK');
```
Run: `node check.mjs` → `OK` без assertion-ошибок.

- [x] **Step 3: Grep по дохлым ссылкам.**
```bash
grep -rnE "/for-owners|/impressum|/datenschutz|/about" app components data
```
Expected: пусто.

- [x] **Step 4: В браузере (npm run dev).** `/` — счётчик 87, в бегущей строке нет Kabul Corner; `/search` — 29 карточек, клик по «Türkis» открывает `/chain/turkis`; `/r/alaturka-1030` — нет рейтинга «4.0 (0)», в отзывах «Noch keine Bewertungen», нет текста про Holzkohle-Grill, под верификацией новый текст; шапка: Home, Suche.
