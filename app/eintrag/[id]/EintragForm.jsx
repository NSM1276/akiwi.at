'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LangProvider';
import { Sticker } from '@/components/Pictures';
import { UI } from '@/data/images';
import { EINTRAG_COPY, EINTRAG_LANGS } from '@/data/eintrag-copy';

const FIELDS = ['name', 'address', 'phone', 'website', 'instagram'];
const DAY_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const LABEL_DE = { name: 'Name', address: 'Adresse', phone: 'Telefon', website: 'Website', instagram: 'Instagram' };

// "@Name", "instagram.com/name/?igsh=…" or "name" → "name".
export function normInstagram(raw) {
  const s = String(raw || '').trim();
  const m = s.match(/instagram\.com\/([^/?#\s]+)/i);
  return (m ? m[1] : s).replace(/^@+/, '').replace(/[/\s]+$/, '').toLowerCase();
}
// "https://www.lokal.at/" → "www.lokal.at"
export function normWebsite(raw) {
  return String(raw || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
}
const norm = (key, val) => (key === 'instagram' ? normInstagram(val) : key === 'website' ? normWebsite(val) : String(val || '').trim());

function initialDays(hours) {
  return DAY_SHORT.map((_, day) => {
    const slots = hours.filter((h) => h.day === day && h.open && h.close).map((h) => ({ open: h.open, close: h.close }));
    return { closed: hours.length > 0 && slots.length === 0, slots: slots.length ? slots : [{ open: '', close: '' }] };
  });
}
const dayText = (d) => (d.closed ? 'geschlossen' : d.slots.filter((s) => s.open && s.close).map((s) => `${s.open}–${s.close}`).join(', ') || '—');

export default function EintragForm({ venue }) {
  const [siteLang, setSiteLang] = useLang();
  const [turkish, setTurkish] = useState(false);
  const lang = turkish ? 'tr' : siteLang;
  const c = EINTRAG_COPY[lang];
  const pick = (next) => { setTurkish(next === 'tr'); if (next !== 'tr') setSiteLang(next); };

  const [fields, setFields] = useState(() => Object.fromEntries(FIELDS.map((k) => [k, venue[k]])));
  const startDays = initialDays(venue.hours);
  const [days, setDays] = useState(startDays);
  const [menu, setMenu] = useState(venue.menuCount ? 'ok' : 'photo');
  const [certificate, setCertificate] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [note, setNote] = useState('');
  const [sender, setSender] = useState('');
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);

  const setDay = (i, patch) => setDays((ds) => ds.map((d, j) => (j === i ? { ...d, ...patch } : d)));
  const setSlot = (i, k, patch) => setDays((ds) => ds.map((d, j) => (j === i ? { ...d, slots: d.slots.map((s, m) => (m === k ? { ...s, ...patch } : s)) } : d)));

  // Fixed German labels: Nasim reads every message the same way.
  function buildMessage() {
    const lines = [`Akiwi-Eintrag: ${venue.id} (${venue.name})`];
    const changed = FIELDS.filter((k) => norm(k, fields[k]) !== norm(k, venue[k]));
    lines.push(...changed.map((k) => `${LABEL_DE[k]}: ${norm(k, fields[k]) || '(löschen)'}`));
    const hoursChanged = days.some((d, i) => dayText(d) !== dayText(startDays[i]));
    if (hoursChanged) lines.push('Öffnungszeiten:', ...days.map((d, i) => `  ${DAY_SHORT[i]} ${dayText(d)}`));
    if (!changed.length && !hoursChanged) lines.push('Kontakt, Adresse und Öffnungszeiten: stimmen');
    else lines.push('Alles andere: stimmt');
    lines.push(`Speisekarte: ${{ ok: 'stimmt', photo: 'Foto folgt', later: 'später' }[menu]}`);
    if (certificate) lines.push('Halal-Zertifikat: Foto folgt');
    if (photos) lines.push('Fotos vom Lokal: folgen');
    if (note.trim()) lines.push(`Anmerkung: ${note.trim()}`);
    if (sender.trim()) lines.push(`Absender: ${sender.trim()}`);
    lines.push('Bestätigt: Inhaber/Betreiber, Akiwi darf die Angaben zeigen.');
    return lines.join('\n');
  }

  // With consent the submit button carries data-contact: the namax form script
  // catches the click and opens the request form with buildMessage() as text,
  // so the form submit never fires. Without consent there are no attributes and
  // submit only shows the consent error.
  function send(e) {
    e.preventDefault();
    setTried(true);
  }
  const contact = consent
    ? { 'data-contact': 'eintrag', 'data-role': 'owner', 'data-wish': 'fix', 'data-topic': venue.name, 'data-text': buildMessage() }
    : {};

  return (
    <>
      <Header lang={siteLang} setLang={(l) => { setTurkish(false); setSiteLang(l); }} />

      <main className="ak-wrap ak-main ak-lokale" lang={lang}>
        <div className="ak-row-between" style={{ alignItems: 'center', marginBottom: 14 }}>
          <p className="ak-kicker" style={{ margin: 0, color: 'var(--green-ink)' }}>{c.kicker}</p>
          <div className="ak-seg" role="group" aria-label="Sprache · Dil · Language">
            {EINTRAG_LANGS.map((l) => (
              <button key={l} type="button" className={l === lang ? 'is-on' : ''} aria-pressed={l === lang} onClick={() => pick(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <Sticker src={UI.addVenue} size={72} className="ak-page-icon" />
        <h1 className="ak-h1">{venue.name}</h1>
        <p className="ak-lead" style={{ margin: '12px 0 6px' }}>{c.lead}</p>
        <p className="ak-data ak-muted" style={{ margin: '0 0 8px' }}>{c.free}</p>

        <form onSubmit={send} noValidate>
          <fieldset className="ak-form-block">
            <legend className="ak-h3">{c.basics}</legend>
            {FIELDS.map((k) => (
              <label key={k} className="ak-field">
                <span className="ak-field-label">{c.fields[k]}</span>
                <input
                  className="ak-input"
                  type={k === 'phone' ? 'tel' : 'text'}
                  inputMode={k === 'website' ? 'url' : undefined}
                  autoCapitalize={k === 'website' || k === 'instagram' ? 'none' : undefined}
                  autoCorrect="off"
                  value={fields[k]}
                  placeholder={c.placeholders[k] || ''}
                  onChange={(e) => setFields({ ...fields, [k]: e.target.value })}
                  onBlur={() => (k === 'instagram' || k === 'website') && setFields((f) => ({ ...f, [k]: norm(k, f[k]) }))}
                />
                {k === 'instagram' && <span className="ak-field-hint">{c.instagramHint}</span>}
              </label>
            ))}
          </fieldset>

          <fieldset className="ak-form-block">
            <legend className="ak-h3">{c.hours}</legend>
            {venue.hours.length === 0 && <p className="ak-muted" style={{ margin: '0 0 10px', fontSize: 14 }}>{c.hoursEmpty}</p>}
            <div className="ak-hours-edit">
              {days.map((d, i) => (
                <div key={i} className="ak-hours-row">
                  <span className="ak-hours-day">{c.days[i]}</span>
                  <label className="ak-check ak-check--sm">
                    <input type="checkbox" checked={d.closed} onChange={(e) => setDay(i, { closed: e.target.checked })} />
                    <span>{c.closed}</span>
                  </label>
                  {!d.closed && d.slots.map((s, k) => (
                    <span key={k} className="ak-hours-slot">
                      <input className="ak-input ak-input--time" type="time" aria-label={`${c.days[i]} von`} value={s.open} onChange={(e) => setSlot(i, k, { open: e.target.value })} />
                      <span aria-hidden="true">–</span>
                      <input className="ak-input ak-input--time" type="time" aria-label={`${c.days[i]} bis`} value={s.close} onChange={(e) => setSlot(i, k, { close: e.target.value })} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="ak-form-block">
            <legend className="ak-h3">{c.menu}</legend>
            <p className="ak-muted" style={{ margin: '0 0 10px', fontSize: 14 }}>{venue.menuCount ? c.menuShown(venue.menuCount) : c.menuNone}</p>
            {venue.menuCount > 0 && (
              <label className="ak-check"><input type="radio" name="menu" checked={menu === 'ok'} onChange={() => setMenu('ok')} /><span>{c.menuOk}</span></label>
            )}
            <label className="ak-check"><input type="radio" name="menu" checked={menu === 'photo'} onChange={() => setMenu('photo')} /><span>{venue.menuCount ? c.menuPhoto : c.menuPhotoNew}</span></label>
            <label className="ak-check"><input type="radio" name="menu" checked={menu === 'later'} onChange={() => setMenu('later')} /><span>{c.menuLater}</span></label>
          </fieldset>

          <fieldset className="ak-form-block">
            <legend className="ak-h3">{c.halal}</legend>
            <p className="ak-muted" style={{ margin: '0 0 10px', fontSize: 14 }}>{c.halalLead}</p>
            <label className="ak-check"><input type="checkbox" checked={certificate} onChange={(e) => setCertificate(e.target.checked)} /><span>{c.halalPhoto}</span></label>
          </fieldset>

          <fieldset className="ak-form-block">
            <legend className="ak-h3">{c.photos}</legend>
            <label className="ak-check"><input type="checkbox" checked={photos} onChange={(e) => setPhotos(e.target.checked)} /><span>{c.photosBox}</span></label>
          </fieldset>

          <fieldset className="ak-form-block">
            <label className="ak-field">
              <span className="ak-field-label">{c.note}</span>
              <textarea className="ak-input" rows={3} value={note} placeholder={c.notePlaceholder} onChange={(e) => setNote(e.target.value)} />
            </label>
            <label className="ak-field">
              <span className="ak-field-label">{c.sender}</span>
              <input className="ak-input" type="text" autoComplete="name" value={sender} onChange={(e) => setSender(e.target.value)} />
            </label>
            <label className={`ak-check ak-check--consent${tried && !consent ? ' is-error' : ''}`}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>{c.consent}</span>
            </label>
            {tried && !consent && <p role="alert" className="ak-field-error">{c.needConsent}</p>}
          </fieldset>

          <button type="submit" className="ak-btn ak-btn--green ak-btn--block ak-lokale-cta" {...contact}>{c.send}</button>
          <p className="ak-muted" style={{ margin: '10px 0 0', fontSize: 13, textAlign: 'center' }}>{c.after}</p>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Link className="ak-btn ak-btn--sm" href={`/r/${venue.id}`}>{c.view} →</Link>
        </div>
      </main>

      <Footer lang={siteLang} />
    </>
  );
}
