'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COPY } from '@/data/data';
import { Logo } from './atoms';

export default function Header({ lang, setLang }) {
  const c = COPY[lang];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { key: 'home', label: c.navHome, href: '/', active: pathname === '/' },
    { key: 'search', label: c.navSearch, href: '/search', active: pathname === '/search' },
    { key: 'wien', label: 'Wien', href: '/wien', active: pathname?.startsWith('/wien') },
  ];

  return (
    <header className="ak-header">
      <div className="ak-header-inner">
        <Logo />

        <nav className="ak-nav-desktop" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link key={item.key} href={item.href} className={item.active ? 'is-on' : ''}>{item.label}</Link>
          ))}
        </nav>

        <div className="ak-header-tools">
          <div className="ak-lang" role="group" aria-label="Sprache">
            {['de', 'en'].map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} className={lang === l ? 'is-on' : ''} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="ak-nav-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              {menuOpen
                ? <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="ak-nav-mobile" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link key={item.key} href={item.href} onClick={() => setMenuOpen(false)} className={item.active ? 'is-on' : ''}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
