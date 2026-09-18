# Этап 3 — SEO-фундамент. План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Поисковики находят и понимают все 108 страниц: карточки — настоящие ссылки, есть sitemap и robots, у каждой страницы canonical, title, description и Open Graph, у заведений JSON-LD `Restaurant`, есть favicon. Везде «Österreich» вместо «Wien».

**Architecture:** Используем встроенные механизмы Next 15 App Router: `app/sitemap.js`, `app/robots.js`, `app/icon.svg`, `metadata`/`generateMetadata` с `metadataBase`, `app/opengraph-image.jsx` через `ImageResponse` из `next/og`. JSON-LD рендерится серверной страницей заведения тегом `<script type="application/ld+json">`. Карточки становятся `<Link>` из `next/link` (рендерится как `<a href>`), поведение клика не меняется. Заодно переводим динамические страницы на `await params` (Next 15), чтобы убрать устаревший синхронный доступ.

**Базовый URL:** `https://www.akiwi.at` (apex редиректит на www).

---

### Task 1: robots, sitemap, favicon, базовые метаданные

**Files:**
- Create: `app/robots.js`, `app/sitemap.js`, `app/icon.svg`, `app/opengraph-image.jsx`
- Modify: `app/layout.jsx`

- [x] **Step 1: robots.js**
```js
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.akiwi.at/sitemap.xml',
  };
}
```
- [x] **Step 2: sitemap.js** — `/`, `/search`, все `/r/[id]`, все `/chain/[id]`; `lastModified` = дата сборки.
- [x] **Step 3: icon.svg** — кружок логотипа (первая группа из `public/assets/logo.svg`) на тёмном фоне `#1F2937`, viewBox 40×40.
- [x] **Step 4: opengraph-image.jsx** — 1200×630, тёмный фон, «akiwi.at», подзаголовок «Halal-freundliche Restaurants in Österreich».
- [x] **Step 5: layout.jsx** — `metadataBase: new URL('https://www.akiwi.at')`, `title: { default: 'Akiwi.at — Halal-freundliche Restaurants in Österreich', template: '%s | Akiwi.at' }`, `description`, `openGraph: { siteName: 'Akiwi.at', locale: 'de_AT', type: 'website' }`, `alternates: { canonical: '/' }` только в `app/page.jsx` (не в layout).

### Task 2: Метаданные страниц

**Files:**
- Modify: `app/page.jsx` (`export const metadata = { alternates: { canonical: '/' } }`)
- Modify: `app/search/page.jsx` (`metadata`: title «Alle halal-freundlichen Lokale in Österreich», description, canonical `/search`)
- Modify: `app/r/[id]/page.jsx` (`generateMetadata` async, `await params`; title `${name} — ${districtName}`, description из tagline + адрес, canonical `/r/${id}`, `openGraph.title/description`)
- Modify: `app/chain/[id]/page.jsx` (аналогично, canonical `/chain/${id}`)
- Modify: `data/search-data.js` (`pageTitle` → «Restaurants in Österreich» / «Restaurants in Austria»)

### Task 3: JSON-LD Restaurant

**Files:**
- Create: `data/jsonld.js` — `venueJsonLd(venue)`: `@type: Restaurant`, `name`, `url`, `address` (`streetAddress`, `postalCode`, `addressLocality` из адреса, `addressCountry: 'AT'`), `telephone`, `servesCuisine` = categories, `priceRange` = price, `openingHoursSpecification` из `hours` (day 0=Mo → `Monday`…), `aggregateRating` только при `reviews > 0`. `chainJsonLd(chain, venues)`: `@type: Organization`, `name`, `url`, `location` = массив `Restaurant`-адресов филиалов.
- Modify: `app/r/[id]/page.jsx`, `app/chain/[id]/page.jsx` — рендерить `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />` перед клиентским компонентом.

### Task 4: Карточки как ссылки

**Files:**
- Modify: `components/RestaurantCard.jsx` — корневой `<article onClick>` → `<Link href className="bento-card">`, убрать `useRouter`/`onClick` prop.
- Modify: `app/HomeClient.jsx` — убрать `onClick` у `RestaurantCard` и импорт `useRouter`.
- Modify: `app/globals.css` — `.bento > article` → `.bento > .bento-card`.
- Modify: `app/search/SearchClient.jsx` — обёртка `<div onClick>` → `<Link href style={{ textDecoration: 'none', color: 'inherit' }}>`, убрать `handleCardClick` и `useRouter`/`useCallback`.
- Modify: `app/chain/[id]/ChainDetail.jsx` — кнопка «Details» → `<Link href={`/r/${venue.id}`}>` с теми же стилями.

### Task 5: Проверка

- [x] `npm run build` без ошибок; в выводе появляются `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/opengraph-image`.
- [x] `next start`: `curl /sitemap.xml` содержит 108 `<url>`; `curl /robots.txt` содержит `Sitemap:`; HTML главной содержит `<link rel="canonical" href="https://www.akiwi.at/">`, `og:title`, `<link rel="icon"`; HTML `/r/turkis-city` содержит `application/ld+json` с `"@type":"Restaurant"` и canonical; в HTML главной ≥ 29 ссылок `href="/r/…"` или `href="/chain/…"`.
- [x] Браузер: клик по карточке на главной и в поиске открывает страницу; hover-эффекты на месте; кнопка «Details» на странице сети работает.
