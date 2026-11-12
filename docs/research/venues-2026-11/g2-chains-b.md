# g2-chains-b: Pizza Mann und Vapiano (Prüfung 2026-11-12)

24 bestehende Einträge geprüft (12 Pizza Mann, 12 Vapiano). Dazu 7 fehlende Filialen mit `id: null` und `new_branch: true` (2 Pizza Mann, 5 Vapiano). Details und Quellen stehen in `g2-chains-b.json`.

## Wichtigstes Ergebnis: keine der beiden Ketten ist halal

- **Pizza Mann:** Auf pizzamann.at steht nirgends „halal“. Geprüft wurden die Menüdaten des Online-Shops sowie die Seiten Qualität und Service. Auf der Karte stehen **Schweinsschnitzel**, Pizza Cardinale/Hawaii mit **Pizza Schinken**, Provinciale/Carbonara/Rustica mit **Speck** und Salami. Bei den Getränken gibt es **Gösser-Bier** und **Rotwein**. Ein Halal-Symbol taucht nur auf swipein.restaurant auf, einem automatisch erzeugten Verzeichnis. Als Beleg zählt das nicht. → `evidence: contradicted`.
- **Vapiano Österreich:** vapiano.at sagt nichts zu halal, weder auf der Menüseite noch in der Speisekarte 2026 oder in den FAQ. Es gibt also auch keine Aussage wie „Huhn ist halal“. Die Speisekarte hat ein eigenes Symbol **„enthält Schweinefleisch“**: Carbonara mit Guanciale, Prosciutto crudo, Beinschinken, scharfe Salami. Dazu kommt eine volle Bar mit Wein, Spritz, Prosecco, Birra Moretti und Stiegl. Halal-Hinweise zu Vapiano-Huhn auf Zabihah gibt es nur für deutsche Filialen, und auch dort beruhen sie nur auf mündlichen Aussagen des Personals. → `evidence: contradicted`.
- **Empfehlung:** Beide Ketten aus Akiwi entfernen oder klar als „nicht halal“ markieren. Zertifikate: 0.

## Pizza Mann: unsere Daten sind größtenteils erfunden

Die offizielle Filialliste (API hinter pizzamann.at/filialen) hat heute nur noch **5 Filialen**: Wien 5 Ziegelofengasse 41, Linz Unionstraße 33, Traun Wiener Bundesstraße 196, Salzburg Aiglhofstraße 1, Innsbruck Viaduktbogen 21. Im Webarchiv vom Oktober 2024 waren es noch 12. Der Betreiber PHD Service GmbH hat im Februar 2025 ein Sanierungsverfahren beantragt (MeinBezirk).

- **Keine einzige unserer 12 Adressen** stand je auf der offiziellen Liste. Unsere Telefonnummern (z. B. 216 5555, 684 2222) sind nirgends zu finden. Pizza Mann hatte nie Filialen in **Graz** oder **Leonding**.
- `pizza-mann-salzburg` → richtige Adresse Aiglhofstraße 1. `pizza-mann-innsbruck` → Viaduktbogen 21. `pizza-mann-linz-zentrum` → Unionstraße 33 (die einzige offene Filiale in Linz; die Zuordnung ist mein Vorschlag).
- Geschlossen (fehlen seit spätestens Mai 2026 auf der offiziellen Liste): die echten Filialen Wien 2 Franzensbrückenstraße 13 (`wien-02`) und Wels Dr.-Koss-Straße 3 (`wels`).
- Ohne jeden Beleg, Status `unclear`: wien-10, wien-14, wien-21, wien-22, graz, linz-restaurant, leonding.
- Telefon: Veröffentlicht ist nur die zentrale Bestell-Hotline +43 50 10 10 10.

## Vapiano: 5 von 12 unserer Einträge gibt es nicht (mehr)

Die offizielle Liste auf vapiano.at/restaurants hat 12 Filialen: 8 in Wien und Umgebung, 2 in Innsbruck, 1 in Linz und 1 in Graz (piccolo).

- **Geschlossen:** Walfischgasse 11 / Moulin Rouge (Mitte April 2026, Nachmieter L'Osteria), Praterstraße (fehlt auf der offiziellen Liste; das Schließdatum habe ich nicht gefunden) und Murpark Graz (wurde nach der Insolvenz 2020 nicht wieder geöffnet).
- **Umgezogen:** Graz Sparkassenplatz 4 → **Vapiano piccolo, Kaiserfeldgasse 3** (seit April 2026; gleiche Telefonnummer 839898).
- **Nie existiert:** Salzburg „Hanushplatz 1“ und Klagenfurt „Heuplatz 4“. Für Salzburg ist laut Salzburg24 und weekend.at ein Vapiano piccolo im **FORUM 1 am Hauptbahnhof für November 2026** angekündigt. Auf vapiano.at steht es noch nicht.
- **Korrekturen:** Herrengasse **6-8** (nicht 1-3). Westbahnhof Europaplatz **1**, **1150 Wien**, Bezirk 15 statt 6. Linz Schmidtorstraße 1 (nicht Hauptplatz 11). Alle unsere Telefonnummern (585 0000 usw.) sind falsch. Alle Öffnungszeiten sind falsch: Real öffnen die Filialen um 11:00 (sonntags meist 12:00) und schließen um 22:00 oder 22:30. Linz hat 11:30–21:00/21:30.
- **Fehlende Filialen** (neu aufgenommen): Donauzentrum, Hauptbahnhof, Wien Mitte, Vio Plaza, SCS Vösendorf.

## Offene Fragen

- Pizza Mann Linz: Die Zeiten aus der API (Do–Sa bis 01:45) passen nicht ganz zum Filialtext („Zustellungen Donnerstag bis Sonntag bis 3 Uhr“). Bei den API-Tagen habe ich 1 = Montag angenommen.
- Praterstraße: kein Artikel zur Schließung gefunden. Der Status stützt sich nur darauf, dass die Filiale auf der Kettenliste fehlt.
- Grundsatzfrage für den Inhaber: Sollen nicht-halal Ketten überhaupt auf Akiwi bleiben?
