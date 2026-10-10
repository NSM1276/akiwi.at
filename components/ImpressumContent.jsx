'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Crumbs } from '@/components/atoms';
import { useLang } from '@/components/LangProvider';
import { IMPRESSUM as I } from '@/data/legal-copy';

function Section({ title, children }) {
  return (
    <section style={{ padding: '16px 0', borderTop: '1px solid var(--rule-soft)' }}>
      <h2 className="ak-subh">{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.6 }}>{children}</div>
    </section>
  );
}

export default function ImpressumContent() {
  const [lang, setLang] = useLang();
  const de = lang === 'de';
  const telHref = `tel:${I.phone.replace(/\s+/g, '')}`;
  const link = { color: 'var(--green-ink)', fontWeight: 600 };

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="ak-wrap ak-main" style={{ maxWidth: 720 }}>
        <Crumbs trail={[{ href: '/', label: 'Home' }]} current="Impressum" />
        <h1 className="ak-h1">Impressum</h1>
        <p className="ak-lead" style={{ margin: '10px 0 20px' }}>
          {de ? 'Angaben gemäß § 5 ECG' : 'Legal disclosure under Austrian law (§ 5 ECG)'}
        </p>

        <Section title={de ? 'Unternehmen' : 'Company'}>
          <p style={{ margin: 0 }}>{I.company}</p>
          <p style={{ margin: 0 }}>{I.street}</p>
          <p style={{ margin: 0 }}>{I.postalCity}</p>
        </Section>

        <Section title={de ? 'Kontakt' : 'Contact'}>
          <p style={{ margin: 0 }}>{de ? 'E-Mail: ' : 'Email: '}<a href={`mailto:${I.email}`} style={link}>{I.email}</a></p>
          <p style={{ margin: 0 }}>{de ? 'Tel: ' : 'Phone: '}<a href={telHref} style={link}>{I.phone}</a></p>
        </Section>

        <Section title={de ? 'Unternehmensgegenstand' : 'Business purpose'}>
          <p style={{ margin: 0 }}>{I.purpose}</p>
        </Section>

        <Section title={de ? 'UID-Nummer' : 'VAT ID'}>
          <p className="ak-data" style={{ margin: 0, fontSize: 14 }}>{I.uid}</p>
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
