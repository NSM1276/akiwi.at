// Hero: big lime headline + tagline + search
const Hero = ({ lang, query, setQuery, tweaks }) => {
  const c = window.COPY[lang];
  const [focused, setFocused] = React.useState(false);
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto',
      padding: '64px 24px 40px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center',
    }}>
      {/* Eyebrow */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        border: '1px solid var(--border)',
        background: 'rgba(55,65,81,0.5)',
        borderRadius: 999,
        fontSize: 12, fontWeight: 500,
        color: 'var(--text-secondary)',
        marginBottom: 28,
        letterSpacing: '0.02em',
      }}>
        <window.StatusDot status="verified" size={6} />
        {lang === 'de' ? '142 Lokale verifiziert · Stand April 2026' : '142 venues verified · as of April 2026'}
      </div>

      <h1 className="ak-hero-title" style={{
        fontSize: 'clamp(44px, 7vw, 88px)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 0.95,
        margin: 0,
        color: 'var(--accent)',
      }}>
        akiwi<span style={{ color: 'var(--text-primary)' }}>.at</span>
      </h1>

      <p style={{
        marginTop: 20, marginBottom: 0,
        fontSize: 'clamp(16px, 1.6vw, 20px)',
        color: 'var(--text-secondary)',
        maxWidth: 560,
        lineHeight: 1.5,
      }}>{c.heroTagline}</p>

      {/* Search */}
      <form onSubmit={(e) => { e.preventDefault(); window.location.href = 'Akiwi Search.html' + (query ? '?q=' + encodeURIComponent(query) : ''); }} style={{
        marginTop: 36,
        width: '100%', maxWidth: 620,
        display: 'flex', alignItems: 'center',
        background: 'var(--card)',
        border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 999,
        padding: '6px 6px 6px 20px',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        boxShadow: focused ? '0 0 0 4px rgba(163,230,53,0.12)' : 'none',
      }}>
        <span style={{ color: focused ? 'var(--accent)' : 'var(--text-secondary)', display: 'flex', marginRight: 10, transition: 'color var(--dur-fast) var(--ease-out)' }}>
          <window.Icon.search size={20} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={c.searchPlaceholder}
          style={{
            flex: 1, minWidth: 0,
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: 16, padding: '12px 0',
          }}
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} style={{
            background: 'transparent', border: 'none', color: 'var(--text-secondary)',
            padding: 8, cursor: 'pointer', display: 'flex',
          }} aria-label="Clear">
            <window.Icon.close />
          </button>
        )}
        <button type="submit" style={{
          background: 'var(--accent)',
          color: 'var(--text-on-accent)',
          border: 'none', borderRadius: 999,
          padding: '10px 18px',
          fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          transition: 'background var(--dur-fast) var(--ease-out)',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
        >
          {lang === 'de' ? 'Suchen' : 'Search'}
        </button>
      </form>

      {/* Quick chips */}
      <div style={{
        marginTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8,
      }}>
        {(lang === 'de'
          ? ['Kebab in 1070', 'Cafés mit Terrasse', 'Vegan', 'Verifiziert']
          : ['Kebab in 1070', 'Cafés with terrace', 'Vegan', 'Verified']
        ).map((t) => (
          <button key={t} onClick={() => setQuery(t)} style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            padding: '6px 12px',
            borderRadius: 999,
            fontFamily: 'inherit', fontSize: 12, fontWeight: 500,
            cursor: 'pointer',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >{t}</button>
        ))}
      </div>
    </section>
  );
};

window.Hero = Hero;
