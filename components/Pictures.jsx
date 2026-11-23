// Pictures.jsx — AI dish photo with the "KI-Bild" note, and small drawn stickers.
// AiPhoto is for general pages only (dish, category) — never on a venue's page.

import Image from 'next/image';

export function AiPhoto({ src, alt, lang }) {
  return (
    <figure className="ak-photo">
      <Image src={src} alt={alt} fill priority sizes="(min-width: 1200px) 1200px, 100vw" />
      <figcaption className="ak-photo-note">{lang === 'de' ? 'KI-Bild' : 'AI image'}</figcaption>
    </figure>
  );
}

/** Drawn sticker; renders nothing when there is no picture for this item. */
export function Sticker({ src, size = 22, className = 'ak-sticker' }) {
  if (!src) return null;
  return <Image src={src} alt="" width={size} height={size} className={className} />;
}
