'use client';
import Link from 'next/link';
import { COPY } from '@/data/data';
import { Logo } from './atoms';
import SocialLinks from './SocialLinks';

export default function Footer({ lang }) {
  const c = COPY[lang];
  return (
    <footer className="ak-footer">
      <div className="ak-footer-grid">
        <div>
          <Logo />
          <p style={{ margin: '14px 0 0', fontSize: 14, lineHeight: 1.6, maxWidth: 340 }}>{c.footerBlurb}</p>
        </div>

        <div>
          <h4>{c.followUs}</h4>
          <SocialLinks variant="list" lang={lang} />
        </div>

        {Object.entries(c.footerSections).map(([key, items]) => (
          <div key={key}>
            <h4>{c.footerSectionTitles[key]}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}><Link href={c.footerLinks[item] || '/'}>{item}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ak-footer-bottom">
        <span>{c.copyright}</span>
        <span>{c.footerMadeWith}</span>
      </div>
    </footer>
  );
}
