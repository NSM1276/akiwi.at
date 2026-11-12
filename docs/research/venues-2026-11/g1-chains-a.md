# g1-chains-a: Türkis, Akakiko, Habibi & Hawara, L'Emir (checked 2026-11-12)

Data: `g1-chains-a.json` (20 existing records + 23 new branches from the official chain lists).

## In short

- **20 checked. 3 permanently closed, 9 "unclear" (most likely never existed), 0 with a certificate.**
- None of the four chains says "halal" on its own website. The only halal evidence is user-maintained Zabihah entries for Türkis.
- Our old data for these chains is badly wrong: almost every address, phone and opening time was off, and several branches seem to have been invented.

## Closed

| id | What happened |
|---|---|
| habibi-stadt, habibi-nordbahn, habibi-siebenstern | Closed after the Habibi & Hawara insolvency in January 2023 (ORF, vienna.at). Our domain habibiundhawara.at no longer resolves. The site is now habibi.at, which shows only one restaurant: **Landstraße** (Platz der Sozialen Sicherheit, 1030). It's added as a new branch, but it has no halal claim and a long alcohol list (Aperol, Gin Tonic, wine). Probably not a fit for Akiwi. |

## Probably never existed: recommend removing

- **lemir-city, lemir-millennium**: lemir.at is a parked domain (a Slovak hosting placeholder). No directory, delivery app, Falter listing or review mentions an "L'Emir" in Vienna. These records look invented.
- **turkis-millennium, turkis-meidling (Meidlinger Hauptstraße 74), turkis-linz**: not on tuerkis.at and not found anywhere else. "Türkis Linz" has the same address as **Akakiko Passage Linz**, so the data seems to be mixed up.
- **akakiko-meidling, akakiko-westbahnhof, akakiko-millennium**: not among the 17 official Akakiko restaurants. No source found.
- **turkis-landstrasse**: our address (No. 21) is wrong. A Türkis at **Landstraßer Hauptstraße 1B** (Wien Mitte) shows up in directories (menu from Oct 2025), and tuerkis.at "Über uns" mentions a new Wien-Mitte branch, but it is missing from the official Standorte page. Status unclear.

## Big corrections (open venues)

- **turkis-city**: the real 1st-district restaurant is **Goldschmiedgasse 4** (Wolt "Türkis am Graben", Zabihah "Türkis City"), not Rotenturmstraße 19. Open Mon–Sun 8:00–23:45.
- **turkis-neubau**: **Mariahilfer Straße 22-24**, not 72. Open Mon–Sun 8:00–23:45.
- **turkis-westbahnhof**: address correct, but it is a To-Go counter. Open daily 8:00–23:45.
- **turkis-donau**: open Mon–Sat 9:00–22:00 (Sunday not stated).
- **turkis-voesendorf**: exists (SCS Top 44, phone in the site's reservation pop-up), but no hours are published.
- **The Türkis phone number we have (+43 1 513 14 00) appears nowhere.** Each branch has its own number (01 600 50 10 + postcode).
- **Akakiko**: City is **Rotenturmstraße 6** (not 15). Donau Zentrum is **Wagramer Str. 79** (not 81). Every branch is open **daily 10:30–23:00**. Phones are 057 333 xxx, and our +43 1 513 84 10 is wrong.

## Halal, alcohol, pork

- **Türkis**: the official menu has no pork (turkey ham, beef salami), but the site makes no halal statement. Zabihah (user-maintained) lists Türkis City as "Fully halal" / "Restaurant states it serves halal food", so the evidence is `third_party`. **Alcohol: yes at Goldschmiedgasse** (Efes and Wieselburger on Wolt). Zabihah contradicts itself on alcohol for the other branches, so those are left `null`.
- **Akakiko**: **no halal statement anywhere** (FAQ, menu) and no certifier. **Alcohol yes** (Stiegl beer, wine on its own online menu). No pork seen on the menu, but that doesn't make the meat halal. Owner decision: **does Akakiko belong on Akiwi at all?**
- **Habibi & Hawara Landstraße**: no halal claim, the chicken is "steirisches Hühnerfleisch", lots of alcohol.

## New branches added (id null, `new_branch: true`)

- **Türkis (8)**: Praterstern restaurant, To-Go Ring/Volkstheater and Ring/Volksgarten (night kiosks open until 4–6 am), Kagran (the site says 1120, but Siebeckstraße is in 1220, likely a typo on their side), Hauptbahnhof, Längenfeldgasse, Bahnhof Meidling, Hütteldorf.
- **Akakiko (14)**: SCS Multiplex, Heidenschuss, Singerstraße, Am Platz, Landstraßer Hauptstraße 59, Julius-Tandler-Platz, Favoritenstraße, Floridsdorf, Hauptbahnhof, Linz Passage, LentiaCity Linz, PlusCity Pasching, Graz, Salzburg.
- **Habibi & Hawara (1)**: Landstraße.

## Open questions for the owner

1. Should Akakiko and Habibi & Hawara stay on Akiwi, given there is no halal evidence and both serve alcohol?
2. Should the Türkis records be renamed and moved to the real branches (Goldschmiedgasse, Mariahilfer Str. 22-24, Bahnhof Meidling)?
3. Türkis prices: the online PDF is gone, so prices come from the restaurant menu on tuerkis.at (Döner Teller €15.90). To-Go prices weren't found.
