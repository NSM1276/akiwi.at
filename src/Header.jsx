// Header: logo, nav, DE/EN switcher
const Header = ({ lang, setLang, tweaks }) => {
  const c = window.COPY[lang];
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const nav = [
    { key: 'home',    label: c.navHome,    href: 'Akiwi Homepage.html',   active: current === 'Akiwi Homepage.html' || current === 'index.html' || current === '' },
    { key: 'submit',  label: c.navSubmit,  href: 'Akiwi For Owners.html', active: current === 'Akiwi For Owners.html' },
    { key: 'imprint', label: c.navImprint, href: 'Akiwi Impressum.html',  active: current === 'Akiwi Impressum.html' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(31,41,55,0.82)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
      }}>
        <a href="Akiwi Homepage.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="assets/logo.svg" height="28" alt="Akiwi.at" />
        </a>
        <nav className="ak-nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {nav.map((item) => (
            <a key={item.key} href={item.href} style={{
              padding: '8px 14px',
              color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              borderRadius: 8,
              transition: 'color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = item.active ? 'var(--text-primary)' : 'var(--text-secondary)'; }}
            >{item.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div role="group" aria-label="Sprache" style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 999, padding: 3,
          }}>
            {['DE', 'EN'].map((l) => {
              const on = lang === l.toLowerCase();
              return (
                <button key={l} onClick={() => setLang(l.toLowerCase())} style={{
                  border: 'none', background: on ? 'var(--primary)' : 'transparent',
                  padding: '5px 11px', borderRadius: 999,
                  color: on ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.04em',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}>{l}</button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

window.Header = Header;
