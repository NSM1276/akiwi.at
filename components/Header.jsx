'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COPY } from '@/data/data';

export default function Header({ lang, setLang }) {
  const c = COPY[lang];
  const pathname = usePathname();
  const nav = [
    { key: 'home', label: c.navHome, href: '/', active: pathname === '/' },
    { key: 'submit', label: c.navSubmit, href: '/for-owners', active: pathname === '/for-owners' },
    { key: 'imprint', label: c.navImprint, href: '/impressum', active: pathname === '/impressum' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(31,41,55,0.82)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/assets/logo.svg" height="28" alt="Akiwi.at" />
        </Link>
        <nav className="ak-nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {nav.map((item) => (
            <Link key={item.key} href={item.href} style={{
              padding: '8px 14px',
              color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              borderRadius: 8,
              transition: 'color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
            }}>{item.label}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div role="group" aria-label="Sprache" style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 999, padding: 3,
          }}>
            {['DE', 'EN'].map((l) => {
              const on = lang === l.toLowerCase();
              return (
                <button key={l} onClick={() => setLang(l.toLowerCase())} style={{
                  border: 'none', background: on ? 'var(--primary)' : 'transparent',
                  padding: '5px 11px', borderRadius: 999,
                  color: on ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.04em',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}>{l}</button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
