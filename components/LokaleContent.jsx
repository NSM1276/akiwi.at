'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { LOKALE_COPY, LOKALE_LANGS, CONTACT } from '@/data/lokale-copy';
import EmailButtons from '@/components/EmailButtons';

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

  // Opens the shared request form (www.namax.at/js/contact.js, see app/layout.jsx).
  const request = (
    <button type="button" className="ak-btn ak-btn--green ak-btn--block ak-lokale-cta" data-contact="lokale" data-role="owner">{c.write}</button>
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
          {request}
          <p className="ak-muted" style={{ margin: '8px 0 0', fontSize: 13, textAlign: 'center' }}>{c.reply}</p>
        </div>

        <div className="ak-lokale-pair">
          <a className="ak-btn" href={CONTACT.instagram} target="_blank" rel="noopener">{c.instagram}</a>
          <a className="ak-btn" href={CONTACT.tel}>{c.call}</a>
        </div>
        <EmailButtons write={c.emailWrite} copy={c.emailCopy} copied={c.emailCopied} subject={c.emailSubject} />
        <p className="ak-data" style={{ margin: '10px 0 0', textAlign: 'center' }}>{CONTACT.phone}</p>

        <div className="ak-pattern" style={{ height: 44, margin: '32px 0 8px', border: 'var(--line) solid var(--ink)' }} aria-hidden="true" />

        <section className="ak-lokale-section">
          <h2 className="ak-h3">{c.statusTitle}</h2>
          <p>{c.statusLead}</p>
          <ul className="ak-lokale-plans">
            {c.statuses.map((s) => (
              <li key={s.label}><strong>{s.label}:</strong> {s.body}</li>
            ))}
          </ul>
        </section>

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

        <div style={{ marginTop: 24 }}>{request}</div>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link className="ak-btn" href="/">{c.visit} →</Link>
        </div>
        <p className="ak-muted" style={{ margin: '14px 0 0', fontSize: 13, textAlign: 'center' }}>{c.note}</p>
      </main>

      <Footer lang={siteLang} />
    </>
  );
}
