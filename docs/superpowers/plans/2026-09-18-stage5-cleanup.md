# Этап 5 — Чистка репозитория и кода. План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** В репозитории остаётся только живой код. Язык хранится в одном месте. Шрифты не весят 1,4 МБ. Есть линтер и README.

**Architecture:** Мёртвый прототип удаляется через `git rm` — файлы остаются в истории и восстанавливаются одной командой. Состояние языка переезжает в клиентский контекст `LangProvider`, подключённый в `app/layout.jsx`, поэтому язык переживает переходы между страницами и хранится под одним ключом. Montserrat подключается через `next/font/google`: Next скачивает и самостоятельно хостит woff2-подмножества на этапе сборки, локальные TTF удаляются.

**Tech Stack:** Next.js 15, React 19, ESLint 9 (flat config) + eslint-config-next.

---

### Task 1: Удалить мёртвый прототип

**Files:** удаляются 34 файла, все под гитом (восстановление: `git checkout HEAD~1 -- <путь>`)

- [x] **Step 1:** `git rm -r --cached` + удаление с диска: `src/` (20 файлов старого Babel-приложения), `assets/` (дубль `public/assets`), 9 файлов `Akiwi *.html`, `index.html`, `tweaks-panel.jsx`, `colors_and_type.css`.
- [x] **Step 2:** Убедиться, что `app/`, `components/`, `data/` ничего оттуда не импортируют. Ссылки на `/assets/logo.svg` ведут в `public/assets/` и остаются рабочими.

### Task 2: Один источник языка

**Files:** Create `components/LangProvider.jsx`; Modify `app/layout.jsx`, `app/HomeClient.jsx`, `app/search/SearchClient.jsx`, `app/r/[id]/Detail.jsx`, `app/chain/[id]/ChainDetail.jsx`

- [x] **Step 1: LangProvider.jsx** — клиентский контекст: состояние `lang`, чтение `localStorage['akiwi.lang']` в `useEffect`, запись при смене, установка `document.documentElement.lang`. Экспорт `LangProvider` и хук `useLang()` → `[lang, setLang]`.
- [x] **Step 2: layout.jsx** — обернуть `children` в `<LangProvider>`.
- [x] **Step 3:** В четырёх страницах убрать локальное состояние и оба `useEffect`, заменить на `const [lang, setLang] = useLang();`. Пропсы `lang` у дочерних компонентов не трогаем.

### Task 3: Убрать неработающие элементы интерфейса

**Files:** Modify `components/Footer.jsx`, `components/detail-sections.jsx`, `app/r/[id]/Detail.jsx`, `components/Map.jsx`

- [x] **Step 1: Footer** — удалить форму подписки: она вызывает `preventDefault` и ничего не отправляет, то есть посетитель вводит почту и не получает ничего. Вернём вместе с рассылкой.
- [x] **Step 2: detail-sections** — удалить кнопку «Bewertung schreiben» (отзывы писать некуда).
- [x] **Step 3: Detail.jsx** — удалить кнопку «Ungenauigkeit melden» (форма не существует).
- [x] **Step 4: Map.jsx** — удалить кнопки «+ / −»: масштаб у самодельной SVG-карты не меняется. Вернутся с настоящей картой на этапе 6.

### Task 4: Неиспользуемые тексты

**Files:** Modify `data/data.js`

- [x] **Step 1:** Удалить из `COPY.de` и `COPY.en` ключи, на которые нет ни одной ссылки: `heroTagline`, `chainLocations`, `chainViewAll`, `districtLabel`. Вместе с формой подписки уходят `newsletter` и `newsletterCta`.

### Task 5: Шрифты

**Files:** Modify `app/layout.jsx`, `app/globals.css`; удалить `public/fonts/`

- [x] **Step 1: layout.jsx** — `import { Montserrat } from 'next/font/google'`, подмножества `latin` и `latin-ext` (нужны для `ş`, `ğ`, `č`), `display: 'swap'`, `variable: '--font-montserrat'`; класс шрифта на `<html>`.
- [x] **Step 2: globals.css** — удалить оба блока `@font-face`, в `--font-sans` подставить `var(--font-montserrat)`.
- [x] **Step 3:** Удалить `public/fonts/Montserrat-VariableFont_wght.ttf` и `public/fonts/Montserrat-Italic-VariableFont_wght.ttf` (1,4 МБ).

### Task 6: ESLint и README

**Files:** Create `eslint.config.mjs`, `README.md`; Modify `package.json`

- [x] **Step 1:** `npm i -D eslint eslint-config-next`.
- [x] **Step 2: eslint.config.mjs** — flat config на базе `eslint-config-next` через `FlatCompat`, игнор `.next/`, `node_modules/`.
- [x] **Step 3: package.json** — `"lint": "eslint ."`.
- [x] **Step 4:** Прогнать линтер, исправить найденное.
- [x] **Step 5: README.md** — что это за проект, как запустить, где лежат данные, как добавить заведение и как поменять статус верификации, ссылка на аудит.

### Task 7: Проверка

- [x] **Step 1:** `npm run build` — успех, 111 страниц.
- [x] **Step 2:** `npm run lint` — без ошибок.
- [x] **Step 3:** `git status` — 34 файла помечены как удалённые, ничего лишнего.
- [x] **Step 4:** В собранном HTML нет ссылок на `/fonts/*.ttf`, есть самостоятельно захостенный woff2.
- [x] **Step 5:** Браузер: переключить язык на EN на главной, перейти в поиск и на страницу заведения — язык сохраняется; шрифт тот же; нет формы подписки, кнопок отзыва, жалобы и зума.

**Не входит в этап:** Vercel Web Analytics. Подключение аналитики — это сбор данных посетителей, а страницы Datenschutz на сайте пока нет по решению владельца. Добавим одной строкой, когда появится страница.
