# Этап 4 — Мобильная версия и фильтры поиска. План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сайт нормально работает на телефоне, и каждый фильтр в поиске опирается на реальные данные. Ни одного элемента управления, который ничего не делает.

**Architecture:** Карточка в `data/listing.js` получает поля, которых требуют фильтры: `cities`, `districts`, `amenities`, `hours`. Для сети это объединение по филиалам, поэтому сеть находится по любому своему городу и району. Фильтры и сортировки, под которые данных нет, удаляются вместе с их текстами. Мобильные стили переезжают из инлайнового `<style>` в `app/globals.css`.

**Что остаётся из фильтров (всё на реальных данных):**

| Фильтр | Источник | Покрытие |
|---|---|---|
| Halal-Status | `status` заведения | 87 из 87 |
| Jetzt geöffnet | `hours`, считается в браузере | 87 из 87 |
| Kategorie | `categories`, список выводится из данных | 87 из 87 |
| Ort | город из адреса | 10 городов |
| Bezirk | район Вены | 70 заведений |
| Preis | `price` | 87 из 87 |
| Ausstattung | `amenities` | Lieferung 67, Rollstuhl 68, WLAN 64, Parkplatz 31, Terrasse 14, Gebetsraum 1 |

**Что удаляется (данных нет):** Küche с выдуманным списком (Turkish/Pakistani/Uzbek…), Diät, Familie, фильтр по рейтингу, Service (delivery/takeout/dinein — заменён на Ausstattung), сортировки Entfernung, Zuletzt verifiziert, Neueste, кнопка «In meiner Nähe».

**Tech Stack:** Next.js 15, React 19, без новых зависимостей.

---

### Task 1: Данные для фильтров в `listing.js`

**Files:** Modify `data/listing.js`

- [x] **Step 1:** Добавить `cityOf` в экспорт и функции:

```js
const AMENITY_KEYS = ['prayer', 'delivery', 'outdoor', 'wifi', 'wheelchair', 'parking'];

/** Union of amenities that at least one branch offers. */
function amenityList(venues) {
  return AMENITY_KEYS.filter((k) => venues.some((v) => v.amenities?.[k]));
}

/** Distinct opening intervals across branches: [{ d, o, c }] with d 0=Mo…6=Su. */
function hourSet(venues) {
  const seen = new Set();
  const out = [];
  for (const v of venues) {
    for (const h of v.hours || []) {
      if (!h.open || !h.close) continue;
      const key = `${h.day}|${h.open}|${h.close}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ d: h.day, o: h.open, c: h.close });
    }
  }
  return out;
}
```

- [x] **Step 2:** В `chainCard` добавить `cities: [...new Set(venues.map(cityOf))]`, `districts: [...new Set(venues.map((v) => v.district))].filter((d) => d > 0)`, `amenities: amenityList(venues)`, и `hours: hourSet(venues)` только когда запрошено.
- [x] **Step 3:** В `venueCard` то же самое для одного заведения.
- [x] **Step 4:** `getListing({ withHours = false } = {})` — `hours` попадает в карточку только для страницы поиска, чтобы не раздувать главную.
- [x] **Step 5:** Экспортировать `getFacets(listing)` — списки для панели фильтров, выведенные из данных: `categories` (по убыванию частоты), `cities` (Wien первым, остальные по алфавиту), `districts` (по возрастанию), `prices` (`['€','€€','€€€']`), `amenities` (только те, что реально встречаются).
- [x] **Step 6:** `priceLevels(price)` — `'€–€€'` → `['€','€€']`, иначе `[price]`.

### Task 2: Поиск — фильтры и сортировки

**Files:** Modify `app/search/page.jsx`, `app/search/SearchClient.jsx`

- [x] **Step 1: page.jsx** — `getListing({ withHours: true })`, передать `facets={getFacets(listing)}`.
- [x] **Step 2: applyFilters** переписать под реальные поля: `halal` → `status`; `category` → `categories.includes`; `city` → `cities.includes`; `district` → `districts.includes`; `price` → пересечение `priceLevels`; `amenities` → `every` по `r.amenities`; `openNow` → `isOpenNow(r.hours, now)`. Поиск по тексту: `name`, `districtName`, `cities`, `categories`, `tags`. Поле «Wo?» фильтрует по городу, району и почтовому индексу.
- [x] **Step 3: isOpenNow** в `SearchClient.jsx`:

```js
// hours use d: 0=Mo…6=Su; JS getDay() is 0=Su…6=Sa
function isOpenNow(hours, now) {
  if (!now || !hours?.length) return false;
  const today = (now.getDay() + 6) % 7;
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  return hours.some((h) => {
    const o = toMin(h.o);
    let c = toMin(h.c);
    if (c <= o) c += 24 * 60; // closes after midnight
    const day = h.d === today;
    const spill = h.d === (today + 6) % 7 && c > 24 * 60; // yesterday still running
    if (day && mins >= o && mins < c) return true;
    if (spill && mins + 24 * 60 < c) return true;
    return false;
  });
}
```
`now` — состояние, заполняется в `useEffect` и обновляется раз в минуту, поэтому на сервере фильтр не применяется и гидратация не ломается.

- [x] **Step 4: applySort** — оставить `relevance`, `rating` (карточки без отзывов в конец), `alpha`. Удалить `distance`, `verified`, `newest`.
- [x] **Step 5:** Удалить неработающую кнопку «In meiner Nähe» из `SearchHero`.

### Task 3: Панель фильтров

**Files:** Modify `components/SearchFilters.jsx`, `components/search-sections.jsx`, `data/search-data.js`

- [x] **Step 1: SearchFilters** принимает `facets`, рисует группы: Halal-Status, Jetzt geöffnet, Kategorie, Ort, Bezirk, Preis, Ausstattung. Группы Küche, Bewertung, Service, Diät, Familie удалить. Bezirk показывать только когда среди выбранных городов есть Wien или город не выбран.
- [x] **Step 2: search-data.js** — в `SEARCH_COPY` заменить `filters` на `{ halal, openNow, category, city, district, price, amenities }`, добавить `amenityLabels` (`prayer: 'Gebetsraum'`, `delivery: 'Lieferung'`, `outdoor: 'Terrasse'`, `wifi: 'WLAN'`, `wheelchair: 'Rollstuhlgerecht'`, `parking: 'Parkplatz'`) и английские. Удалить `CUISINES`, `PRICE_LEVELS`, `serviceLabels`, `dietaryLabels`, `ratingLabels`, `family`, `nearMe`, лишние ключи `sort`.
- [x] **Step 3: ActiveFilterChips** обновить под новый набор ключей.

### Task 4: Главная — фильтр по району

**Files:** Modify `app/HomeClient.jsx`, `components/FilterBar.jsx`, `app/page.jsx`

- [x] **Step 1:** `app/page.jsx` передаёт `facets`. `FilterBar` берёт районы и категории из `facets`, а не из статических констант.
- [x] **Step 2:** В `HomeClient` фильтр по району: `r.districts.includes(filters.district)` вместо `r.district === filters.district`, чтобы сети находились по району филиала. Фильтр по категории уже работает.
- [x] **Step 3:** Удалить `CATEGORIES` и `DISTRICTS` из `data/data.js`.

### Task 5: Мобильная версия

**Files:** Modify `app/globals.css`, `app/search/SearchClient.jsx`, `components/Header.jsx`, `app/r/[id]/Detail.jsx`, `components/search-sections.jsx`

- [x] **Step 1: globals.css** — блок мобильных правил: `.search-layout` в одну колонку до 900px; `.search-sidebar` скрыт и показывается при `.open`, `position: static`; `.search-split` в одну колонку; `.search-mobile-toggle` виден; `.search-hero-fields` в колонку. Инлайновый `<style>` из `SearchClient` удалить.
- [x] **Step 2: SearchClient** — навесить классы `search-layout`, `search-sidebar` (+ `open` по `mobileFiltersOpen`), `search-split`; сейчас состояние `mobileFiltersOpen` ни на что не влияет.
- [x] **Step 3: Header** — кнопка-бургер при ширине до 600px, раскрывает список Home/Suche; переключатель языка остаётся.
- [x] **Step 4: Detail.jsx** — добавить `<Footer lang={lang} />` в конец страницы заведения.
- [x] **Step 5: SearchHero** — поля «Was?»/«Wo?» складываются в колонку на узком экране, кнопка «Suchen» на всю ширину.
- [x] **Step 6:** Единый ключ языка: в `SearchClient` заменить `akiwi_lang` на `akiwi.lang`, как на остальных страницах.

### Task 6: Проверка

- [x] **Step 1:** `npm run build` без ошибок, 111 страниц.
- [x] **Step 2:** Скрипт: у каждой карточки есть `cities`, `districts`, `amenities`; у карточки поиска есть `hours`; `getFacets` возвращает непустые списки; `turkis.cities` содержит Wien, Linz и Vösendorf; `pizza-mann.districts` содержит 2, 10, 14, 21, 22.
- [x] **Step 3:** Браузер, десктоп: включить «Gebetsraum» → ровно 1 результат; «Ort: Graz» → только заведения и сети с филиалом в Граце; «Jetzt geöffnet» меняет число результатов; каждая выбранная опция даёт чип, чипы снимаются.
- [x] **Step 4:** Браузер, 375px: на `/search` одна колонка без горизонтального скролла, кнопка «Filter» раскрывает и прячет панель; в шапке работает бургер; на странице заведения есть футер; поля поиска не наезжают друг на друга.
- [x] **Step 5:** `document.documentElement.scrollWidth <= innerWidth` на `/`, `/search`, `/r/...`, `/chain/...` при 375px.
