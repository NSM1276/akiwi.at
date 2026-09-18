'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COPY } from '@/data/data';

export default function Header({ lang, setLang }) {
  const c = COPY[lang];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { key: 'home', label: c.navHome, href: '/', active: pathname === '/' },
    { key: 'search', label: c.navSearch, href: '/search', active: pathname === '/search' },
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
        padding: '16px 24px', gap: 12,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG logo, nothing for next/image to optimise */}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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

          <button
            className="ak-nav-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            style={{
              width: 38, height: 38, borderRadius: 999,
              background: 'var(--card)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', cursor: 'pointer',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
                : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="ak-nav-mobile">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '12px 24px',
                color: item.active ? 'var(--accent)' : 'var(--text-primary)',
                textDecoration: 'none', fontSize: 15, fontWeight: 600,
                borderTop: '1px solid var(--border)',
              }}
            >{item.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
