'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { LOKALE_COPY, LOKALE_LANGS, CONTACT } from '@/data/lokale-copy';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.800zm-3.200 4c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.300s1 2.700 1.200 2.900c.1.2 2 3.200 5 4.400 2.400 1 2.900.8 3.500.7.500 0 1.700-.7 1.900-1.300.200-.700.200-1.200.200-1.300l-.500-.300-1.800-.900c-.200-.100-.400-.100-.600.100l-.800 1c-.100.200-.300.200-.500.100-1.500-.700-2.500-1.400-3.400-3-.200-.300 0-.500.200-.700l.500-.600.200-.400v-.500l-.900-2c-.100-.400-.300-.400-.500-.400z" />
  </svg>
);

export default function LokaleContent() {
  const [siteLang, setSiteLang] = useLang();
  // Turkish exists on this page only; DE/EN follow (and set) the site language.
  const [turkish, setTurkish] = useState(false);
  const lang = turkish ? 'tr' : siteLang;
  const c = LOKALE_COPY[lang];

  const pick = (next) => {
    setTurkish(next === 'tr');
    if (next !== 'tr') setSiteLang(next);
  };

  const whatsapp = (
    <a className="ak-btn ak-btn--green ak-btn--block ak-lokale-cta" href={CONTACT.whatsapp(c.whatsappText)} target="_blank" rel="noopener">
      <WhatsAppIcon />{c.whatsapp}
    </a>
  );

  return (
    <>
      <Header lang={siteLang} setLang={(l) => { setTurkish(false); setSiteLang(l); }} />

      <main className="ak-wrap ak-main ak-lokale" lang={lang}>
        <div className="ak-row-between" style={{ alignItems: 'center', marginBottom: 14 }}>
          <p className="ak-kicker" style={{ margin: 0, color: 'var(--green-ink)' }}>{c.kicker}</p>
          <div className="ak-seg" role="group" aria-label="Sprache · Dil · Language">
            {LOKALE_LANGS.map((l) => (
              <button key={l} type="button" className={l === lang ? 'is-on' : ''} aria-pressed={l === lang} onClick={() => pick(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <h1 className="ak-h1">{c.title}</h1>
        <p className="ak-lead" style={{ margin: '12px 0 18px' }}>{c.lead}</p>

        <ol className="ak-steps">
          {c.steps.map((s, i) => (
            <li key={s}><span className="ak-steps-n">{i + 1}</span><span>{s}</span></li>
          ))}
        </ol>

        <div style={{ marginTop: 16 }}>
          {whatsapp}
          <p className="ak-muted" style={{ margin: '8px 0 0', fontSize: 13, textAlign: 'center' }}>{c.reply}</p>
        </div>

        <div className="ak-lokale-pair">
          <a className="ak-btn" href={CONTACT.tel}>{c.call}</a>
          <Link className="ak-btn" href="/">{c.visit} →</Link>
        </div>
        <p className="ak-data" style={{ margin: '10px 0 0', textAlign: 'center' }}>{CONTACT.phone}</p>

        <div className="ak-pattern" style={{ height: 44, margin: '32px 0 8px', border: 'var(--line) solid var(--ink)' }} aria-hidden="true" />

        {c.sections.map((s) => (
          <section key={s.title} className="ak-lokale-section">
            <h2 className="ak-h3">{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <section className="ak-lokale-section">
          <h2 className="ak-h3">{c.plansTitle}</h2>
          <ul className="ak-lokale-plans">
            {c.plans.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>

        <div style={{ marginTop: 24 }}>{whatsapp}</div>
        <p className="ak-muted" style={{ margin: '14px 0 0', fontSize: 13, textAlign: 'center' }}>{c.note}</p>
      </main>

      <Footer lang={siteLang} />
    </>
  );
}
