# g6 – new venues, Vienna west and centre (districts 1, 3–9, 12–19)

Research date: 2026-11-12. Sources: Falter "Wien, wie es isst", Wolt and Lieferando listings, Zabihah, venue websites. Full data is in `g6-new-wien-west.json`, with `id: null` and a `proposed_id` for each venue.

**Result: 18 new candidates** (the target was about 25). None is in `_existing-input.json`, and none is a branch of an excluded chain. I dropped several more candidates because the evidence was too weak or contradicted (list below). I chose not to pad the list.

## Strength of the halal evidence

No venue has a **certificate from a named certifier**. Ferhatovic's menu says "halal-zertifiziert" but names no body.

**Strongest (recommended first):**

| proposed_id | Venue | Evidence |
|---|---|---|
| maman-paz-1190 | Maman Paz, Billrothstraße 18, 1190 (Persian) | Own website shows a "Halal" badge and has a page "Halal Restaurant Wien". Falter says "alles halal" and Wolt says "Halal". Hours agree across sources. |
| asala-1080 | Asala Halal Food, Alser Straße 21, 1080 (Egyptian) | "Halal Food" is in the venue's own name and site title. The official site gives the hours. |
| ferhatovic-1120 | Restaurant Ferhatovic, Steinbauergasse 8/1, 1120 (Bosnian grill) | Own menu text on Lieferando says "mit halal-zertifiziertem Fleisch". Wolt says "Halal grill specialities". |
| chicken-plus-1160 | Chicken Plus, Thaliastraße 18, 1160 | Falter says "alle Speisen halal". Wolt tags it halal. |
| smash-house-1080 | Smash House Vienna, Lerchenfelder Straße 128, 1080 (burger) | Falter says "alle Zutaten halal". No menu found. |
| wiener-deewan-1090 / meidlinger-deewan-1120 | Pakistani pay-as-you-wish curry buffets | Zabihah, Lieferando and Falter. In Meidling only the 2 meat curries are named halal. |
| jasmin-al-sham-1190 | Jasmin al Sham, Heiligenstädter Straße 9 (Syrian) | Falter: no alcohol. Zabihah: the restaurant states it serves halal. |

**Medium or weak (only directory or app tags):** Bab Alhara 1160 (Falter only, no hours), Maza Burger 1060, Corner XVI 1160, Munchos 1050, Schnitzel Madam 1050 (Wolt only, a single source), Ammi's Kitchen 1150 (only the meat main dishes are marked halal, and there is pizza salami).

**Halal claim but alcohol sold (the owner decides):** Al Fayrooz 1010 (beer on Wolt), Hafes 1070 (beer, halal only on Zabihah), Berliner Döner 1070 (beer and Currywurst on Wolt, Zabihah says "no alcohol"), Buon Giorno 1070 (Falter: wine and beer).

## Checked and excluded

- **Nayeb**, Gumpendorfer Straße 22, 1060: **closed**. Falter (March 2026) says Bistro Fantasy has replaced it. A trip101 article still lists it as halal.
- **Zum Moghulhof**, Burggasse 12, 1070: a Zabihah review reports pork on the menu and alcohol.
- **König Kebab (…Helal)**, Pilgrambrücke 1050: "Helal" is in the name, but the menu has beer, Jägermeister and Käsekrainer (a pork sausage).
- **Hayat Pizza Kebap**, 1030: a "Schinken" (ham) topping with no meat type given.
- **Loco Chicken 15. Bezirk**: probably delivery only. The only confirmed Vienna restaurant is on Favoritenstraße (1100, the other agent's area). It is also a chain.
- **Style Pizza & Burger**, 1150: delivery only from 18:30 to 05:30, with Schinken and Speck on the menu.
- **Nirvana**, 1010, and **Curry N Masala**, 1030: halal appears only on old Zabihah entries, nothing current.
- **Lokanta Oase**, 1160: serves alcohol, and the halal claim rests only on a Zabihah photo.
- **Kabul Ziba Grill Haus**, 1150: no trace beyond one Falter list entry.

## Open questions and caveats

- **Hours**: for most venues they come from Wolt or Lieferando, so they are delivery hours, not necessarily opening hours. `hours_source` marks this each time. I could not read Google Maps, so "dauerhaft geschlossen" was not checked there. Venues with no active delivery listing or website are marked `status: "unclear"`: Smash House, Bab Alhara, Corner XVI and Meidlinger Deewan.
- **Prices**: almost all are delivery-app prices (`kind: "delivery_app"`) and probably higher than in the venue.
- **Maza Burger**: Wolt gives Gumpendorfer Straße 82, Lieferando gives Hirschengasse 2/9 (the same corner). The entrance needs checking.
- **"Bacon" items** at Maza Burger and Chicken Plus: the meat type is not stated, so `pork = null`.
- **Asala**: there is also a sister venue, "Basata" (phone 01/2089938). I did not find its address.
- I could not read Instagram pages (login wall), so I could not check the venues' own Instagram posts.
