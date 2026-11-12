# g8 – Neue Lokale außerhalb Wiens (Recherche 2026-11-12)

32 neue Kandidaten (Ziel waren ~35) in Graz, Linz, Salzburg, Innsbruck, Klagenfurt, Villach, St. Pölten, Wiener Neustadt, Wels und Steyr. Alle `id: null`, Vorschlags-Slug in `proposed_id`. Abgleich mit `_existing-input.json`: keine Dubletten, keine Filialen der ausgeschlossenen Ketten.

**Ehrliches Fazit:** Außerhalb Wiens gibt es kaum starke Halal-Belege. **Kein einziges Lokal mit Zertifikat** (Zertifizierer + URL) wurde gefunden. 11 Lokale sagen selbst „halal“, 2 nur teilweise, 19 nur über Dritte (Lieferando-Kategorie „Halal“, Zabihah, Wolt-Tag, Bewertungen). Viele Öffnungszeiten stammen aus Liefer-Apps, nicht vom Lokal.

## Stärkste Belege (das Lokal sagt selbst „halal“)

| Lokal | Stadt | Beleg |
|---|---|---|
| Burgerliebe | Linz | eigene Website: „halal, selbstgemacht…“; Rinderspeck; Zeiten in 3 Quellen gleich → **high** |
| Top Burger | Klagenfurt | eigene Website: „100 % HALAL Fleisch“ – aber Bier und „Bacon/Schinken“ ohne Angabe der Fleischart |
| Pommes Boutique Itzling | Salzburg | „Alle unsere Produkte sind zur 100% HALAL“ – **verkauft aber Bier/Spritzer** |
| Afghan Restaurant Azadi | Innsbruck | Wolt-Beschreibung „100% halal“ + Google-Name – **verkauft Zipfer Bier** |
| Aria Persisches Restaurant | Graz | Wolt-Beschreibung „Halal food.“; Zeiten aus 2 Quellen gleich |
| Alarabe Restaurant | Linz | eigene Website: „halal, koschere und vegane Speisen“ (nicht eindeutig „alles halal“) |
| Restaurant Safran (Halal) | Innsbruck | „Halal/حلال“ im eigenen Google-Namen |
| Royal Foods | Villach | „حلال100“ im eigenen Google-Namen |
| Stern Pizza – Halal Food | Salzburg | „Halal Food“ im Google-Namen; Öffnungszeiten unbekannt |
| Zaffran Indian | Salzburg | Herold-Text „100% halal“ – **Adresse widersprüchlich** (s. u.) |
| Original Berliner Döner | Steyr | Speisekarte (Lieferando) markiert Schinken/Salami-Pizzen mit „(Halal)“ |

Teilweise halal: **Smokey Burger Villach** („Auf Anfrage … auch halal“), **Zimt Graz** („kitchen also prepares … halal“).

## Offene Fragen / Probleme

- **Zaffran Salzburg:** Herold/Wanderlog sagen Vogelweiderstraße 9 (Hotel Drei Kreuz), Lieferando sagt Schillerstraße 27. Status `unclear`.
- **Würstl Scheich Graz:** Halal laut Steiermark Tourismus („completely halal“), aber Zeiten widersprechen sich (Google: nur Do–So; HappyCow: Mo–Fr 11–22). Website zeigt nur eine Lieferando-Platzhalterseite.
- **Alkohol trotz Halal-Angabe:** Pommes Boutique, Azadi, Top Burger, Way to India, Tandoori Delight Villach verkaufen Bier.
- **O'Tacos** (Seiersberg, Salzburg, Klagenfurt): Halal nur über Lieferando-Kategorie und Kettenangaben aus Frankreich; keine österreichische Ketten-Website gefunden. Neue Kette – eventuell eigene Chain-Seite.
- **Schwach, vor Aufnahme prüfen:** Dama Rose Graz (nur Bewertungen, Lieferando markiert NICHT halal), Dönerman Linz (nur TikTok-Snippet), Orient Express Innsbruck (nur Halal-Verzeichnis), MAY Cafe St. Pölten (nur Bewertungen), Del-Bar Wels und CHIX Salzburg (nur Lieferando-Kategorie).
- **Liefer-App-Zeiten:** Bei 16 Lokalen kommen die Zeiten nur von Lieferando/Wolt (Lieferzeiten, nicht unbedingt Öffnungszeiten vor Ort). Alle Preise sind `delivery_app`.

## Bewusst NICHT aufgenommen (Widerspruch oder kein Beleg)

- **Steirer Pizza & Kebap Graz:** ein Verzeichnis nennt „100 % halal“, aber Wolt-Karte hat Schinken, Speck und Puntigamer → widersprüchlich.
- **Halfetto Linz, Tasty Tantuni Salzburg, Kadi Innsbruck:** Lieferando/Wolt-„Halal“, aber Schinken/Bacon/Prosciutto ohne Halal-Hinweis auf der Karte.
- **Ya Habibi Graz:** kein Halal-Beleg, angeblich Wein- und Bierkarte.
- **Loco Chicken / Koco Chicken / Moco Chicken / Ay Papi:** „Halal“-Lieferkonzepte, laut Wolt „virtual venue“ (keine echte Adresse).
- **Vulkan Kebap Graz:** Zabihah-Eintrag von 2014; an der Adresse ist heute offenbar „Ali Baba“.
- **Big Joe Falafel, Güven Kebap (Linz), Alsalam (Innsbruck), Sofra, Hana's Rasoi, Tokyo (Salzburg):** nur Zabihah, keine zweite Quelle für „geöffnet“ gefunden – Kandidaten für eine spätere Runde.
- **Dornbirn/Bregenz:** kein Lokal mit brauchbarem Halal-Beleg gefunden.

## Methode

Halal-Verzeichnisse (Zabihah, halalfoodle) für Hinweise; geprüft gegen eigene Websites, Lieferando- und Wolt-Seiten (Adresse, Halal-Kennzeichnung, Karte, Alkohol, Preise) sowie Google-synchronisierte Öffnungszeiten (halalfoodle, swipein). Automatisch generierte Swipein-Texte und -„Badges“ wurden nicht als Halal-Beleg gewertet. Kein Kontakt mit Lokalen, keine Logins.
