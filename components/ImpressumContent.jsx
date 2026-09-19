'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { IMPRESSUM as I } from '@/data/legal-copy';

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{
        margin: '0 0 8px', fontSize: 13, fontWeight: 700,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
      }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-primary)' }}>
        {children}
      </div>
    </section>
  );
}

export default function ImpressumContent() {
  const [lang, setLang] = useLang();
  const de = lang === 'de';
  const telHref = `tel:${I.phone.replace(/\s+/g, '')}`;

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 64px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 20 }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
          {' › '}
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Impressum</span>
        </nav>

        <h1 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Impressum
        </h1>
        <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)', fontSize: 15 }}>
          {de ? 'Angaben gemäß § 5 ECG' : 'Legal disclosure under Austrian law (§ 5 ECG)'}
        </p>

        <Section title={de ? 'Unternehmen' : 'Company'}>
          <p style={{ margin: 0 }}>{I.company}</p>
          <p style={{ margin: 0 }}>{I.street}</p>
          <p style={{ margin: 0 }}>{I.postalCity}</p>
        </Section>

        <Section title={de ? 'Kontakt' : 'Contact'}>
          <p style={{ margin: 0 }}>
            {de ? 'E-Mail: ' : 'Email: '}
            <a href={`mailto:${I.email}`} style={{ color: 'var(--accent)' }}>{I.email}</a>
          </p>
          <p style={{ margin: 0 }}>
            {de ? 'Tel: ' : 'Phone: '}
            <a href={telHref} style={{ color: 'var(--accent)' }}>{I.phone}</a>
          </p>
        </Section>

        <Section title={de ? 'Unternehmensgegenstand' : 'Business purpose'}>
          <p style={{ margin: 0 }}>{I.purpose}</p>
        </Section>

        <Section title={de ? 'UID-Nummer' : 'VAT ID'}>
          <p style={{ margin: 0 }}>{I.uid}</p>
        </Section>

        <Section title={de ? 'Aufsichtsbehörde' : 'Supervisory authority'}>
          <p style={{ margin: 0 }}>{I.authority}</p>
          <p style={{ margin: 0 }}>{I.chamber}</p>
        </Section>

        <Section title={de ? 'Haftungsausschluss' : 'Disclaimer'}>
          <p style={{ margin: 0 }}>
            {de
              ? 'Alle Inhalte dieser Website wurden sorgfältig erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen.'
              : 'All content on this website has been prepared with care. No guarantee is given for its accuracy, completeness or timeliness.'}
          </p>
        </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
