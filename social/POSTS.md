# Erste Beiträge — Instagram und TikTok

Bilder: `node social/make-posts.mjs` → `social/out/posts/`
- Instagram: `*-ig-1.png … -5.png` (1080×1350), als Karussell in dieser Reihenfolge hochladen
- TikTok: `*-tiktok-1.png … -5.png` (1080×1920), „Fotos“ → Karussell

Regeln: keine Lokalnamen, Öffnungszeiten, Preise, Bewertungen oder Fotos, solange kein Lokal angebunden ist.

## 1. „Was ist Akiwi?“ (`was-ist-akiwi`)

**Instagram-Text**
```
Halal essen in Österreich — ehrlich gekennzeichnet.

Akiwi.at ist der unabhängige Halal-Guide für Wien, Graz, Linz, Salzburg und Innsbruck. Wir zeigen klar, was geprüft ist und was nicht. Ohne Werbung.

👉 www.akiwi.at (Link in der Bio)

Akiwi.at — an independent, honest halal guide for Austria.

#halal #halalösterreich #halalwien #wien #österreich #halalfood #halalessen #akiwi
```

**TikTok-Text** (max. ca. 150 Zeichen)
```
Halal essen in Österreich — ehrlich gekennzeichnet. www.akiwi.at #halal #wien #österreich #halalfood
```

## 2. „Halal-Status: So lesen Sie ihn“ (`halal-status`)

**Instagram-Text**
```
Nicht jedes „halal“ ist gleich. Bei Akiwi sehen Sie sofort, woher die Angabe kommt:

● Bestätigt — Akiwi hat ein Zertifikat gesehen oder das Lokal besucht (wir starten gerade mit den Prüfungen)
○ Nicht geprüft — halal laut öffentlich zugänglichen Angaben
○ Unbekannt — keine verlässliche Angabe

Im Zweifel: direkt im Lokal fragen.

👉 www.akiwi.at (Link in der Bio)

Akiwi.at — three honest halal levels: confirmed, not checked, unknown.

#halal #halalösterreich #halalwien #wien #österreich #halalfood #halalcheck #akiwi
```

**TikTok-Text**
```
Nicht jedes „halal“ ist gleich: bestätigt, nicht geprüft, unbekannt. www.akiwi.at #halal #wien #österreich
```

## 3. Kurzes Intro-Video (`akiwi-intro-9x16.mp4`, 18 s, ohne Ton)
Erzeugen: `node social/make-posts.mjs` dann `node social/make-video.mjs` → `social/out/videos/`. Für Instagram Reels, TikTok und YouTube Shorts.

**Text (alle drei)**
```
Halal essen in Österreich — ehrlich gekennzeichnet. www.akiwi.at #halal #wien #österreich #halalfood
```
YouTube Shorts-Titel: `Halal essen in Österreich — Akiwi.at`

## 4. Instagram-Stories und Highlights (nur in der App)
Erzeugen: `node social/make-stories.mjs` → `social/out/stories/` (1080×1920)

- `story-1-online` — Sticker **Link** → https://www.akiwi.at
- `story-2-status` — Highlight „Halal-Status“
- `story-3-werbefrei` — Sticker **Link** → https://www.akiwi.at
- `story-4-frage` — Sticker **Fragen** (Frage: „Welche Stadt zuerst?“)

Highlights (Profil → Neu → Stories aus dem Archiv wählen → Titel → Cover „Aus Galerie“):
- „Über uns“: story-1, story-3 · Cover `cover-ueber-uns`
- „Halal-Status“: story-2 · Cover `cover-status`
- „Städte“: story-4 · Cover `cover-staedte`

## Reihenfolge und Rhythmus für den Start
1. Tag 1: Karussell 1 (Instagram und TikTok)
2. Tag 3–4: Karussell 2
3. Danach: neue Beiträge nach Absprache (siehe docs/PROJECT-LOG.md)
