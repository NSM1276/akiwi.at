# g7 – new venues, Vienna east (districts 2, 10, 11, 20, 21, 22, 23)

Research date: 2026-11-12. Data file: `g7-new-wien-east.json` (21 proposed new venues, `id: null`, slug in `proposed_id`).

## Main finding: no strong halal proof found

- **No certificates.** Not one venue in these districts could be tied to a named certifier (IGGÖ, HQC, IIDC) in a public source.
- **No venue claims halal on its own website or Instagram.** The few official websites found (zeljo.at, gurme.at, aldoumani.com, kayanvie.at) say nothing about halal. Instagram cannot be read without logging in.
- **What we have instead is mostly `third_party` evidence**: the venue appears in the Halal category on Lieferando or Wolt, uses "Halal" in its delivery-app name or description, or carries Wolt halal badges on menu items. Restaurants choose these labels themselves, but under the brief they count as delivery-app evidence, not `venue_claim`.
- So all 21 are `third_party` (19) or `partial` (2). Confidence is `medium` for 9 and `low` for 12. The owner should treat them as leads to check on site, not as verified halal.

## Proposed venues (by strength)

**Better supported (two sources or a strong halal statement):**
- **Loco Chicken Favoriten**, Favoritenstraße 95 (1100). Opened 18 Oct 2026, confirmed by vienna.at. Wolt and Lieferando both say "Halal", and even the bacon is sold as "Halal Bacon".
- **La Mare 10**, Angeligasse 65 (1100). Named "…– Halal" on Wolt and Lieferando; The Vienna Review also says its dishes are halal. Pizza ham, salami and bacon are not labelled beef or turkey, so pork is unclear.
- **Der Leopoldstädter Deewan**, Hillerstraße 4 (1020). Pakistani pay-what-you-want curry place: Wolt halal tag, and The Vienna Review says its meat curries are halal. The hours on the two sources disagree.
- **Ćevapi Drina Grill**, Gudrunstraße 176 (1100), and **Jasmina's Restaurant**, Inzersdorfer Straße 83 (1100). Both Bosnian; tagged Halal on Lieferando, also listed on Wolt.
- **Philly Cheesesteak**, Favoritenstraße 84 (1100): Halal tag on Lieferando, also on Wolt.
- **Elite Kebap House**, Quellenstraße 84 (1100): Wolt halal badges on almost every kebab item.
- **Lezzet Kebap**, Hellwagstraße 24 (1200): Halal is its main category on Wolt.

**Weaker (one source, or a possible delivery-only kitchen):**
- Zeljo Quellenplatz (1100)
- Burger Station (1100)
- Komagene (1100, vegan)
- Rhulo Çiğköfte (1020, vegan)
- Dem's Gourmet (1110)
- Smash & More (1200)
- Tat Schnitzel (1210)
- ORIENTALA (1220)
- La Mare 22 (1220)
- Loco Chicken Liesing (1230)
- Muro's (1230)

**Partial (halal badge on only some items):** Restaurant Al Basha (1020) and EDIP Kebap & Pizza (1230).

## Watch-outs

- **Ghost kitchens.** Several addresses host more than one delivery brand:
  - Angeligasse 65: La Mare, DR.BURGER 10, Burger Way 10
  - Bergengasse 6: La Mare 22, DR.BURGER 22, Burger Way 22
  - Stadlauer Straße 12: ORIENTALA and Loco Chicken 22
  - Ziedlergasse 7: Loco, Moco, Trio Burger, OSES

  Only one entry per address is proposed. Some may have no counter where guests can eat on site.
- **Pork unclear (`pork: null`)** at La Mare 10/22, Zeljo, Burger Station, Jasmina's, EDIP and Muro's. The reason is menu items like "Schinken", "Salami", "Speck", "Käsekrainer" or "Bratwurst" without the meat named.
- **Alcohol `false` everywhere is weak.** It only means no alcohol on the delivery menu; no drinks card in the venue was seen.
- **Hours are delivery-app hours.** Wolt and Lieferando sometimes differ (noted per venue). The Google "dauerhaft geschlossen" check was not possible; every venue was active on at least one delivery app on 2026-11-12.

## Rejected or not proposed

- **Pork or alcohol on the menu despite a halal label:**
  - Das Haus des Kebaps (1210): plain Schinken/Speck everywhere
  - Zum Hungrigen Spatz / Solo Italiano (1220): "Pizzablock-Schinken", Knoblauchwurst
  - Cafe Grill Pizzeria Memo (1100): plain Schinken/Wurst
  - Tybah (1210): mixed Putenschinken and plain Speck/Schinken
  - La Esno (1200): mixed labelling
- **No halal evidence at all**, though they are Middle Eastern, Afghan or Balkan places: Al Doumani (Syrian), Aleppo Sweet 1020/1100, Kabul District, Watan (Afghan), Assaf Kitchen, Baba Döner, Qasioun, Abu Elabed, Gurme, Kanyon, Konya Sofrasi, Restaurant Safran (Persian). Also many kebab shops with beer or pork on the menu (Kebap Del Mar, Kebab Bro's, ADIM, Pizza & Kebab Land, Kebap Xtanbul 22, Semberija, Homolje, Denito …).
- **Leads that could not be confirmed as open:**
  - Malak Al-Aqsa, Floridsdorfer Hauptstraße 21 (1210): zabihah says "fully halal, no alcohol", but there is no second source.
  - Döner'ci, Quellenstraße 171 (1100): zabihah mentions a halal sign, but the reviews date from 2014–15.
  - Bab Al Yemen, Troststraße 60 (1100): no halal source.

## For the existing-data team

- **Aleppo Sweet 1100** is on Wolt at **Quellenstraße 101/G1**, the address we have for **Damas Sweets Favoriten** (Quellenstraße 101). Check whether Damas Sweets was replaced or renamed.
- Our Pizza Mann and Türkis branches in these districts were not re-checked (out of scope).

## Gaps versus the brief

- 21 venues instead of about 25: I preferred fewer venues to adding ones with no halal evidence.
- No Persian, Chechen or certified bakery with any halal evidence was found in these districts.
- Several phone numbers are missing because the delivery apps did not show one.
