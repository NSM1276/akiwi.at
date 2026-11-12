# Akiwi Brand

Logo and business card in the site's style (Urban Wien): green #1F9D55, ink #141414, concrete #EDECE7, Barlow Condensed. The logo is the same as in the site header: an eight-point star with a square hole, and the word AKIWI.AT. Letters are converted to outlines, so the files don't need the font installed.

## Logo (`logo/`)

| File | For |
|---|---|
| `akiwi-logo.svg/.png` | light backgrounds |
| `akiwi-logo-weiss.svg/.png` | dark backgrounds (transparent) |
| `akiwi-logo-auf-schwarz.svg/.png` | ready-made on a black background |
| `akiwi-logo-schwarz.svg/.png` | single colour (stamp, cheap print, fax) |
| `akiwi-stern*.svg/.png` | star only: stickers, QR stands, avatars |
| `akiwi-icon.svg/.png` | square app icon (green star on black) |

SVG goes to the print shop and to designers; PNG for everything else (2400 px wide, star 1000 px).

## Business card (`visitenkarte/`)

- `akiwi-visitenkarte-druck.pdf` is the print file: 2 pages (front and back), 91 × 61 mm = 85 × 55 mm plus 3 mm bleed on every side, no crop marks. When ordering, choose "85 × 55 mm, mit Beschnitt / mit 3 mm Anschnitt".
- `akiwi-visitenkarte-weiss-druck.pdf` is the version for white paper: no filled areas at all (white background, no green bar, no boxes around the QR codes), only black and green type, the logo and the QR codes. Bleed isn't needed here, but the file has it anyway, so the order settings are the same. Preview: `vorschau-weiss.png`.
- `vorschau.png` is a preview (it shows the bleed, which gets cut off).
- QR codes: "Lokale finden" → https://www.akiwi.at, "Für Lokale" → WhatsApp +43 677 64292055 with the text "Hallo Akiwi!". Both were tested with a decoder, including at a reduced size. Scan once more from the test print before ordering the full run.

## Regenerate

`make-brand.mjs` builds everything again (it needs the npm packages `qrcode`, `opentype.js`, `sharp`):

```
node make-brand.mjs <project folder>
```

Then print `visitenkarte/visitenkarte.html` to PDF from Edge or Chrome (headless `--print-to-pdf`, page size is set in the file). The name, phone and texts are at the top of the script.
