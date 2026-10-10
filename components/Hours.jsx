'use client';
import { DETAIL_COPY } from '@/data/detail-copy';
import { useNow } from './useNow';

const toMin = (t) => { const [H, M] = t.split(':').map(Number); return H * 60 + M; };

export default function Hours({ venue, lang }) {
  const c = DETAIL_COPY[lang];
  const now = useNow();

  const todayIdx = now ? (now.getDay() + 6) % 7 : -1;
  const minutesNow = now ? now.getHours() * 60 + now.getMinutes() : 0;
  const today = venue.hours.filter((h) => h.day === todayIdx && h.open && h.close);

  let openNow = false;
  let nextLabel = '';
  if (now) {
    for (const h of today) {
      const o = toMin(h.open);
      let cl = toMin(h.close);
      if (cl <= o) cl += 24 * 60;
      if (minutesNow >= o && minutesNow < cl) { openNow = true; nextLabel = c.closesAt(h.close); break; }
      if (minutesNow < o && !nextLabel) nextLabel = c.opensAt(h.open);
    }
    if (!openNow && !nextLabel) {
      const tomorrow = venue.hours.find((h) => h.day === (todayIdx + 1) % 7 && h.open);
      if (tomorrow) nextLabel = c.opensAt(tomorrow.open);
    }
  }

  // One row per day; days with two time slots show both.
  const rows = c.days.map((name, day) => {
    const slots = venue.hours.filter((h) => h.day === day && h.open && h.close);
    return {
      day, name,
      text: slots.length ? slots.map((h) => `${h.open}–${h.close === '00:00' ? '24:00' : h.close}`).join(', ') : (lang === 'de' ? 'geschlossen' : 'closed'),
    };
  });

  return (
    <div>
      {now && (
        <div className={`ak-status ak-status--boxed ${openNow ? 'ak-status--verified' : 'ak-status--unknown'}`} style={{ marginBottom: 14 }}>
          {openNow ? c.openNow : c.closedNow}
          {nextLabel && <span style={{ color: 'var(--ink-2)' }}>· {nextLabel}</span>}
        </div>
      )}
      <table className="ak-hours">
        <tbody>
          {rows.map((r) => (
            <tr key={r.day} className={r.day === todayIdx ? 'is-today' : ''}>
              <td>{r.name}{r.day === todayIdx && <span className="ak-data" style={{ marginLeft: 8, color: 'var(--green-ink)' }}>{c.today}</span>}</td>
              <td>{r.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
