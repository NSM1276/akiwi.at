'use client';
// RatgeberContent.jsx — the /ratgeber list and article bodies.
// Articles are German only (data/ratgeber.js); the frame follows the site language.

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Crumbs } from '@/components/atoms';
import { Sticker } from '@/components/Pictures';
import { UI } from '@/data/images';
import { useLang } from '@/components/LangProvider';
import { formatStand } from '@/data/ratgeber';

const GERMAN_ONLY = 'This guide is currently available in German only.';

function Rich({ value }) {
  const parts = Array.isArray(value) ? value : [value];
  return parts.map((part, i) => {
    if (typeof part === 'string') return part;
    if (part.b) return <strong key={i}>{part.b}</strong>;
    if (part.href?.startsWith('http')) {
      return <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className="ak-prose-link">{part.text}</a>;
    }
    return <Link key={i} href={part.href} className="ak-prose-link">{part.text}</Link>;
  });
}

function Block({ block }) {
  if (block.h2) return <h2 className="ak-subh ak-prose-h2">{block.h2}</h2>;
  if (block.p) return <p><Rich value={block.p} /></p>;
  if (block.note) return <p className="ak-prose-note"><Rich value={block.note} /></p>;
  if (block.list) {
    return (
      <ul>
        {block.list.map((item, i) => <li key={i}><Rich value={item} /></li>)}
      </ul>
    );
  }
  if (block.table) {
    return (
      <div className="ak-table-wrap">
        <table className="ak-table">
          <thead>
            <tr>{block.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (c === 0
                  ? <th key={c} scope="row"><Rich value={cell} /></th>
                  : <td key={c}><Rich value={cell} /></td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export function RatgeberList({ articles }) {
  const [lang, setLang] = useLang();
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="ak-wrap ak-main" style={{ maxWidth: 820 }}>
        <Crumbs trail={[{ href: '/', label: 'Home' }]} current="Ratgeber" />
        <Sticker src={UI.guide} size={72} className="ak-page-icon" />
        <h1 className="ak-h1">Ratgeber</h1>
        <p className="ak-lead" style={{ margin: '10px 0 24px' }}>
          Antworten rund um Halal-Essen in Österreich – mit Quelle und Datum bei jeder Angabe.
          {lang !== 'de' && <><br />{GERMAN_ONLY}</>}
        </p>
        <ul className="ak-list">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/ratgeber/${a.slug}`} className="ak-list-row" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                <span style={{ minWidth: 0 }}>
                  <span className="ak-list-title">{a.title}</span>
                  <span className="ak-card-meta" style={{ display: 'block', marginTop: 8 }}>{a.description}</span>
                  <span className="ak-data" style={{ display: 'block', marginTop: 8, color: 'var(--ink-3)' }}>Stand: {formatStand(a.stand)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function RatgeberArticle({ article }) {
  const [lang, setLang] = useLang();
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <div className="ak-pattern" style={{ height: 56 }} aria-hidden="true" />
      <main className="ak-wrap ak-main" style={{ maxWidth: 820 }}>
        <Crumbs trail={[{ href: '/', label: 'Home' }, { href: '/ratgeber', label: 'Ratgeber' }]} current={article.title} />
        <article lang="de">
          <h1 className="ak-h2" style={{ margin: '4px 0 0' }}>{article.title}</h1>
          <p className="ak-data" style={{ margin: '12px 0 0', color: 'var(--ink-3)' }}>Stand: {formatStand(article.stand)}</p>
          {lang !== 'de' && <p className="ak-prose-note" lang="en">{GERMAN_ONLY}</p>}
          <div className="ak-prose">
            {article.blocks.map((b, i) => <Block key={i} block={b} />)}
          </div>
        </article>
        <p style={{ marginTop: 32 }}>
          <Link href="/ratgeber" className="ak-btn ak-btn--sm">← Alle Ratgeber-Artikel</Link>
        </p>
      </main>
      <Footer lang={lang} />
    </>
  );
}
