# Research brief: venue data check, November 2026

Akiwi.at is a halal-friendly restaurant guide for Austria. The first data set was collected from the internet more than six months ago and has many errors: when we checked hours, only 1 of 8 matched. Now we want accurate, sourced data. The owner reviews every result and enters it into the site by hand. Nobody edits `data/*.js` in this step.

Today is 2026-11-12. Work only from public web sources: official venue websites, Google Maps or Business Profile snippets in search results, Herold, Falstaff, Lieferando, Wolt, foodora, Instagram and Facebook pages of the venue, press, and halal certifier lists. No contact with venues, no forms, no accounts, no logins.

## Rules

- **Never invent.** If you can't find something, write `null` and say why in `notes`. A gap is fine; a wrong value is the worst outcome.
- Every non-null fact needs a `sources` entry: a URL plus what it says, and the date if the page shows one. Two independent sources for hours, halal and alcohol whenever you can find them.
- Sources disagree → give both values, prefer the official website or the venue's own recent social posts, and set `confidence: "low"`.
- **Halal:** record what the evidence actually is. Allowed values for `halal.evidence`:
  - `certificate`: a named certifier lists the venue, or the venue shows a certificate (name the body, give the URL).
  - `venue_claim`: the venue's own site or social media says halal, e.g. "100% Halal" or "Halal-Fleisch".
  - `third_party`: only directories, delivery apps or reviews say halal.
  - `partial`: only some items are halal (e.g. "chicken is halal").
  - `contradicted`: there is evidence it is NOT halal, e.g. pork on the menu.
  - `none_found`
  Quote the exact wording (≤ 20 words) in `halal.quote`.
- **Alcohol and pork:** `true`, `false` or `null`, each with its source (menu, drinks card, delivery-app listing). "Not on the delivery menu" is weak evidence, so say so in `notes`.
- **Status:** `open`, `permanently_closed`, `temporarily_closed`, `moved` (give the new address) or `unclear`. Look for "Dauerhaft geschlossen" on Google or Herold, a dead website, a branch missing from the chain's own location list, or recent posts.
- **Hours:** Mon–Sun as `{ "mon": "11:00-22:00", … }`, using `"closed"` for closed days, plus `hours_source` and the date it was seen. Prefer the official site; Google snippets are second best.
- **Menu and prices:** `menu_url` (official, or a delivery-app page), plus 3–6 typical dishes with prices in € (e.g. Döner, Dürüm, a main dish, a drink), each with its source and the date seen. Mark delivery-app prices as `"delivery_app"`, because they are often higher than in the venue.
- **Address and contact:** confirm or correct the full address with postcode, `phone` and `website`.
- No personal data about people (owners' names, private profiles). Business data only.
- Use `curl -L -A "Mozilla/5.0 (AkiwiResearch)"` or WebFetch for pages; many sites are JS-heavy, so fall back to search-result snippets and delivery apps. Don't hammer sites.
- Work efficiently. Spend roughly equal effort per venue. For chains, start with the chain's official location and hours page, which often covers all branches at once.

## Output

Write one JSON file: `docs/research/venues-2026-11/<your-group>.json`. It holds an array with one object per venue:

```json
{
  "id": "existing akiwi id, or null for new venues",
  "name": "…",
  "status": "open",
  "address": "Straße Nr, PLZ Ort",
  "address_changed": false,
  "district": 12,
  "city": "Wien",
  "phone": "+43 …",
  "website": "https://…",
  "instagram": "https://instagram.com/… or null",
  "categories": ["Kebab", "Pizza"],
  "hours": { "mon": "…", "tue": "…", "wed": "…", "thu": "…", "fri": "…", "sat": "…", "sun": "…" },
  "hours_source": "url",
  "halal": { "evidence": "venue_claim", "certifier": null, "quote": "…", "sources": ["url"] },
  "alcohol": { "value": false, "sources": ["url"] },
  "pork": { "value": false, "sources": ["url"] },
  "menu_url": "https://…",
  "prices": [{ "item": "Döner Kebab", "price": "6,50", "source": "url", "kind": "venue" }],
  "price_level": "€ / €€ / €€€ or null",
  "confidence": "high | medium | low",
  "sources": [{ "url": "…", "says": "…", "seen": "2026-11-12" }],
  "notes": "what differs from our current data, what is unclear"
}
```

For **existing venues**, the input is in `docs/research/venues-2026-11/_existing-input.json` (our current data: address, phone, website, hours on file). In `notes`, list what is wrong in our current data, e.g. "hours on file Mon 10–22, real 11–23", "phone outdated", "closed since 2025".

For **new venues**, also set `"why_halal_friendly"` (one sentence) and check that the venue is not already in `_existing-input.json`, comparing name and address.

Also write `docs/research/venues-2026-11/<your-group>.md`: a short readable summary for the owner in German or English (closed venues, big corrections, strongest halal evidence, open questions).

Reply to the main session with a short summary: count checked, count closed, count with certificate, biggest problems.
