// Hours table with "open now" highlight
const Hours = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  // Day index: 0=Monday in our data. JS Date has Sunday=0, so map.
  const jsDay = new Date().getDay(); // 0=Sun
  const todayIdx = (jsDay + 6) % 7; // 0=Mon

  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const todayHours = venue.hours.find((h) => h.day === todayIdx);
  const toMin = (t) => { const [H, M] = t.split(':').map(Number); return H * 60 + M; };
  let openNow = false; let nextLabel = '';
  if (todayHours) {
    const o = toMin(todayHours.open);
    let cl = toMin(todayHours.close);
    if (cl === 0) cl = 24 * 60; // 00:00 means midnight
    if (minutesNow >= o && minutesNow < cl) {
      openNow = true;
      nextLabel = c.closesAt(todayHours.close);
    } else if (minutesNow < o) {
      nextLabel = c.opensAt(todayHours.open);
    } else {
      // closed for today, find next
      const tomorrow = venue.hours.find((h) => h.day === (todayIdx + 1) % 7);
      if (tomorrow) nextLabel = c.opensAt(tomorrow.open);
    }
  }

  return (
    <div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '8px 14px',
        background: openNow ? 'var(--status-green-bg)' : 'rgba(75,85,99,0.25)',
        border: `1px solid ${openNow ? 'var(--status-green)' : 'var(--border)'}`,
        borderRadius: 999,
        marginBottom: 16,
      }}>
        <window.StatusDot status={openNow ? 'verified' : 'unknown'} size={8} />
        <span style={{ fontSize: 13, fontWeight: 700, color: openNow ? 'var(--status-green)' : 'var(--text-secondary)' }}>
          {openNow ? c.openNow : c.closedNow}
        </span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>· {nextLabel}</span>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {venue.hours.map((h) => {
          const isToday = h.day === todayIdx;
          return (
            <li key={h.day} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px',
              background: isToday ? 'rgba(163,230,53,0.06)' : 'transparent',
              border: `1px solid ${isToday ? 'rgba(163,230,53,0.25)' : 'transparent'}`,
              borderRadius: 8,
            }}>
              <span style={{
                fontSize: 14, fontWeight: isToday ? 700 : 500,
                color: isToday ? 'var(--accent)' : 'var(--text-primary)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {c.days[h.day]}
                {isToday && <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--accent)', color: 'var(--text-on-accent)',
                  padding: '2px 6px', borderRadius: 4,
                }}>{c.today}</span>}
              </span>
              <span style={{
                fontSize: 14, fontVariantNumeric: 'tabular-nums',
                color: isToday ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isToday ? 600 : 500,
              }}>
                {h.open} – {h.close === '00:00' ? '24:00' : h.close}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

window.Hours = Hours;
