'use client';
import Link from 'next/link';
import { COPY } from '@/data/data';

// Eight-point star (khatam): two overlapping squares. Filled = verified,
// outlined = not checked or unknown. The only "halal" motif on the site.
export function Star({ size = 12, filled = true, color = 'currentColor', hole = false }) {
  const sw = filled ? 0 : 4;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="9" y="9" width="22" height="22" fill={filled ? color : 'none'} stroke={color} strokeWidth={sw} />
      <rect x="9" y="9" width="22" height="22" fill={filled ? color : 'none'} stroke={color} strokeWidth={sw} transform="rotate(45 20 20)" />
      {hole && <rect x="16.5" y="16.5" width="7" height="7" fill="var(--ink)" />}
    </svg>
  );
}

const STATUS_COLOR = {
  verified: 'var(--green)',
  self: 'var(--saffron)',
  unknown: 'var(--pomegranate)',
};

/** Small star for maps and lists. */
export const StatusDot = ({ status, size = 10 }) => (
  <Star size={size} filled={status === 'verified'} color={STATUS_COLOR[status] || STATUS_COLOR.unknown} />
);

export const StatusBadge = ({ status, lang, compact = false, boxed = false }) => {
  const c = COPY[lang];
  const key = status === 'verified' || status === 'self' ? status : 'unknown';
  const label = key === 'verified' ? c.statusVerified : key === 'self' ? c.statusSelf : c.statusUnknown;
  return (
    <span className={`ak-status ak-status--${key}${boxed ? ' ak-status--boxed' : ''}`}>
      <StatusDot status={key} size={compact ? 11 : 13} />
      {label}
    </span>
  );
};

/** Vienna district number as a square sign, e.g. "12". Outside Vienna: the city. */
export const District = ({ district, city, green = false }) => (
  district > 0
    ? <span className={`ak-district${green ? ' ak-district--green' : ''}`}>{district}</span>
    : <span className={`ak-district ak-district--city${green ? ' ak-district--green' : ''}`}>{city}</span>
);

export const Logo = () => (
  <Link href="/" className="ak-logo" aria-label="Akiwi.at — Startseite">
    <Star size={26} color="var(--green)" hole />
    <span className="ak-logo-word">AKIWI<span>.AT</span></span>
  </Link>
);

export const Crumbs = ({ trail, current }) => (
  <nav aria-label="Breadcrumb" className="ak-crumbs">
    {trail.map((b) => (
      <span key={b.href} style={{ display: 'inline-flex', gap: 6 }}>
        <Link href={b.href}>{b.label}</Link>
        <span aria-hidden>/</span>
      </span>
    ))}
    <span aria-current="page">{current}</span>
  </nav>
);

export const Icon = {
  search: (p = {}) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  chevron: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  pin: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  star: (p = {}) => (
    <svg width={p.size || 12} height={p.size || 12} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  ),
  sliders: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      <circle cx="8" cy="6" r="2" fill="var(--background)"/><circle cx="16" cy="12" r="2" fill="var(--background)"/><circle cx="10" cy="18" r="2" fill="var(--background)"/>
    </svg>
  ),
  arrow: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  close: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>
    </svg>
  ),
  layers: (p = {}) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  phone: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  clock: (p = {}) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
};
