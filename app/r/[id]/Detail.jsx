'use client';
import { useState } from 'react';
import Link from 'next/link';
import { DETAIL_COPY } from '@/data/detail-copy';
import { useLang } from '@/components/LangProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hours from '@/components/Hours';
import { Menu, Reviews, Verification, SimilarList, MiniMap, Amenities } from '@/components/detail-sections';
import { StatusBadge, District, Crumbs, Icon } from '@/components/atoms';

export default function Detail({ venue, breadcrumb, about, facts, dishes, chain }) {
  const v = venue;
  const [lang, setLang] = useLang();
  const [active, setActive] = useState('overview');
  const c = DETAIL_COPY[lang];
  const de = lang === 'de';
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(v.address)}`;
  const website = v.website ? (v.website.startsWith('http') ? v.website : `https://${v.website}`) : null;

  // Details held back until the venue is onboarded (data/public.js) get no section.
  const hasHours = (v.hours || []).length > 0;
  const hasMenu = (v.menu || []).length > 0;

  const sections = [
    ['overview', c.sections.info],
    ...(hasHours ? [['hours', c.sections.hours]] : []),
    ...(hasMenu ? [['menu', c.sections.menu]] : []),
    ['facts', c.sections.facts],
    ...(v.reviews > 0 ? [['reviews', c.sections.reviews]] : []),
    ['verification', c.sections.verification],
    ...(v.similar?.length ? [['similar', c.sections.similar]] : []),
  ];

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main>
        <div className="ak-wrap" style={{ paddingTop: 18 }}>
          <Crumbs trail={breadcrumb} current={v.name} />

          <div className="ak-venue-head">
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                <District district={v.district} city={v.districtName} green={v.status === 'verified'} />
                <StatusBadge status={v.status} lang={lang} />
                {v.price && <span className="ak-data ak-muted">{v.price}</span>}
                {v.reviews > 0 && (
                  <span className="ak-data" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Icon.star size={11} /> {v.rating.toFixed(1)} ({v.reviews})
                  </span>
                )}
              </div>
              <h1 className="ak-h1">{v.name}</h1>
              <p className="ak-lead" style={{ marginTop: 10 }}>{de ? v.tagline_de : v.tagline_en}</p>
              <div className="ak-tags" style={{ marginTop: 12 }}>
                {(v.tags || []).map((t) => <span key={t} className="ak-tag">{t}</span>)}
              </div>
            </div>

            <div className="ak-venue-actions">
              {v.phone && (
                <a href={`tel:${v.phone}`} className="ak-btn">
                  <Icon.phone size={15} /> {c.actions.call}
                </a>
              )}
              <a href={directions} target="_blank" rel="noopener" className="ak-btn ak-btn--green">
                <Icon.pin size={15} /> {c.actions.directions}
              </a>
            </div>
          </div>
        </div>

        <div className="ak-band ak-pattern" aria-hidden="true" />

        <nav className="ak-anchor-nav" aria-label={de ? 'Abschnitte' : 'Sections'}>
          <div className="ak-anchor-nav-inner">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>{label}</a>
            ))}
          </div>
        </nav>

        <div className="ak-wrap" style={{ paddingTop: 20 }}>
          <div className="ak-detail-grid">
            <div style={{ minWidth: 0 }}>
              <section id="overview" className="ak-section">
                <h2 className="ak-section-h">{de ? `Über ${v.name}` : `About ${v.name}`}</h2>
                {(de ? v.description_de : v.description_en) && (
                  <p style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.65 }}>{de ? v.description_de : v.description_en}</p>
                )}
                <p className="ak-muted" style={{ margin: '0 0 18px', fontSize: 15, lineHeight: 1.65 }}>{de ? about.de : about.en}</p>

                {(dishes.length > 0 || chain) && (
                  <div className="ak-chips" style={{ marginBottom: 20 }}>
                    {chain && (
                      <Link href={chain.href} className="ak-chip is-on">
                        {de ? `Alle ${chain.count} Filialen von ${chain.name}` : `All ${chain.count} ${chain.name} branches`}
                      </Link>
                    )}
                    {dishes.map((d) => (
                      <Link key={d.href} href={d.href} className="ak-chip">
                        Halal {d.name} <span className="ak-count">{d.count}</span>
                      </Link>
                    ))}
                  </div>
                )}

                <Amenities venue={v} lang={lang} />
              </section>

              {hasHours && (
                <section id="hours" className="ak-section">
                  <h2 className="ak-section-h">{c.sections.hours}</h2>
                  <Hours venue={v} lang={lang} />
                </section>
              )}

              {hasMenu && (
                <section id="menu" className="ak-section">
                  <h2 className="ak-section-h">{c.sections.menu}</h2>
                  <Menu venue={v} lang={lang} />
                </section>
              )}

              <section id="facts" className="ak-section">
                <h2 className="ak-section-h">{c.sections.facts}</h2>
                <dl className="ak-facts" style={{ margin: 0 }}>
                  {facts.map((f) => (
                    <div key={f.label_de}>
                      <dt>{de ? f.label_de : f.label_en}</dt>
                      <dd>{de ? f.text_de : f.text_en}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {v.reviews > 0 && (
                <section id="reviews" className="ak-section">
                  <h2 className="ak-section-h">{c.sections.reviews}</h2>
                  <Reviews venue={v} lang={lang} />
                </section>
              )}

              <section id="verification" className="ak-section">
                <h2 className="ak-section-h">{c.verifiedHistory}</h2>
                <Verification venue={v} lang={lang} />
              </section>

              {v.similar?.length > 0 && (
                <section id="similar" className="ak-section">
                  <h2 className="ak-section-h">{c.sections.similar}</h2>
                  <SimilarList venue={v} lang={lang} />
                </section>
              )}
            </div>

            <aside className="ak-detail-aside">
              <div className="ak-panel">
                <h3 className="ak-subh">{c.sections.address}</h3>
                <MiniMap venue={v} />
                <p style={{ margin: '12px 0', fontSize: 15, fontWeight: 600 }}>{v.address}</p>
                <a href={directions} target="_blank" rel="noopener" className="ak-btn ak-btn--sm ak-btn--block">
                  {c.minDirections} <Icon.arrow size={12} />
                </a>
              </div>

              {(v.phone || website) && (
                <div className="ak-panel">
                  <h3 className="ak-subh">{de ? 'Kontakt' : 'Contact'}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {v.phone && (
                      <a href={`tel:${v.phone}`} className="ak-data" style={{ fontSize: 14, textDecoration: 'none', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                        <Icon.phone size={14} /> {v.phone}
                      </a>
                    )}
                    {website && (
                      <a href={website} target="_blank" rel="noopener" style={{ fontSize: 14, fontWeight: 600, color: 'var(--green-ink)', overflowWrap: 'anywhere' }}>
                        {v.website} ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer lang={lang} />

      <div className="ak-bottom-bar">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.1 }}>{v.name}</div>
          <div className="ak-data" style={{ color: '#BDBCB5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.address}</div>
        </div>
        {v.phone && <a href={`tel:${v.phone}`} className="ak-btn ak-btn--sm" aria-label={c.actions.call}><Icon.phone size={15} /></a>}
        <a href={directions} target="_blank" rel="noopener" className="ak-btn ak-btn--sm ak-btn--green">
          <Icon.pin size={14} /> {c.actions.directions}
        </a>
      </div>
    </>
  );
}
