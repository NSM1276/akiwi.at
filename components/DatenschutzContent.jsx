'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Crumbs } from '@/components/atoms';
import { useLang } from '@/components/LangProvider';
import { IMPRESSUM as I } from '@/data/legal-copy';
import { DATENSCHUTZ as D } from '@/data/datenschutz-copy';
import EmailButtons from '@/components/EmailButtons';

const sectionStyle = { padding: '16px 0', borderTop: '1px solid var(--rule-soft)', scrollMarginTop: 80 };
const bodyStyle = { fontSize: 15, lineHeight: 1.6 };

// German only: the text is a legal document. The header language switch still
// works for the rest of the site.
export default function DatenschutzContent() {
  const [lang, setLang] = useLang();
  const telHref = `tel:${I.phone.replace(/\s+/g, '')}`;
  const link = { color: 'var(--green-ink)', fontWeight: 600 };

  return (
    <>
      <Header lang={lang} setLang={setLang} />

      <main className="ak-wrap ak-main" style={{ maxWidth: 720 }} lang="de">
        <Crumbs trail={[{ href: '/', label: 'Home' }]} current={D.title} />
        <h1 className="ak-h1">{D.title}</h1>
        <p className="ak-lead" style={{ margin: '10px 0 20px' }}>{D.lead}</p>

        <section id="verantwortlich" style={sectionStyle}>
          <h2 className="ak-subh">Verantwortlicher</h2>
          <div style={bodyStyle}>
            <p style={{ margin: 0 }}>{I.company}</p>
            <p style={{ margin: 0 }}>{I.street}</p>
            <p style={{ margin: 0 }}>{I.postalCity}</p>
            <p style={{ margin: '10px 0 0' }}>Tel: <a href={telHref} style={link}>{I.phone}</a></p>
            <p style={{ margin: '10px 0 0' }}>E-Mail:</p>
            <EmailButtons write="E-Mail schreiben" copy="E-Mail-Adresse kopieren" copied="Kopiert" subject="Datenschutz" />
          </div>
        </section>

        {D.sections.map((s) => (
          <section key={s.id} id={s.id} style={sectionStyle}>
            <h2 className="ak-subh">{s.title}</h2>
            <div style={bodyStyle}>
              {s.body.map((p, i) => <p key={i} style={{ margin: i ? '10px 0 0' : 0 }}>{p}</p>)}
            </div>
          </section>
        ))}
      </main>

      <Footer lang={lang} />
    </>
  );
}
