import { SOCIAL } from '@/data/social';

// Simple glyphs, one colour, so they follow the surrounding text colour.
const GLYPH = {
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.3 1.7 4 4 4.2v3.2c-1.5 0-2.9-.5-4-1.3v6.4c0 3.1-2.5 5.6-5.6 5.6S5.4 18.6 5.4 15.5s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v3.3c-.3-.1-.6-.2-.9-.2-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3V3h3.3z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="3.6" />
      <polygon points="10,9.3 15.4,12 10,14.7" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/**
 * Links to Akiwi's profiles. `variant="icons"` is the square icon row for the header and
 * the mobile menu, `variant="list"` adds the platform name and handle (footer).
 */
export default function SocialLinks({ variant = 'icons', lang = 'de' }) {
  const on = lang === 'de' ? 'Akiwi auf' : 'Akiwi on';
  return (
    <ul className={`ak-social ak-social--${variant}`}>
      {SOCIAL.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${on} ${s.label}`} title={s.label}>
            {GLYPH[s.key]}
            {variant === 'list' && (
              <span>
                <b>{s.label}</b>
                <small>{s.handle}</small>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
