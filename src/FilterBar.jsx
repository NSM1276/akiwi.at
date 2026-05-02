// Sticky filter bar: verified toggle, district dropdown, category pills
const FilterBar = ({ lang, filters, setFilters, resultCount }) => {
  const c = window.COPY[lang];
  const [districtOpen, setDistrictOpen] = React.useState(false);
  const dropRef = React.useRef(null);

  React.useEffect(() => {
    function onDoc(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDistrictOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const toggleCat = (cat) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((x) => x !== cat)
      : [...filters.categories, cat];
    setFilters({ ...filters, categories: next });
  };

  return (
    <div style={{
      position: 'sticky', top: 61, zIndex: 15,
      background: 'rgba(31,41,55,0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* Verified toggle */}
        <button
          onClick={() => setFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 14px 8px 10px',
            background: filters.verifiedOnly ? 'var(--status-green-bg)' : 'var(--card)',
            border: `1px solid ${filters.verifiedOnly ? 'var(--status-green)' : 'var(--border)'}`,
            borderRadius: 999,
            color: filters.verifiedOnly ? 'var(--status-green)' : 'var(--text-secondary)',
            fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
            cursor: 'pointer',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
        >
          <span style={{
            width: 28, height: 16, borderRadius: 999,
            background: filters.verifiedOnly ? 'var(--status-green)' : 'var(--border-strong)',
            position: 'relative',
            transition: 'background var(--dur-fast) var(--ease-out)',
          }}>
            <span style={{
              position: 'absolute', top: 2, left: filters.verifiedOnly ? 14 : 2,
              width: 12, height: 12, borderRadius: 999, background: '#fff',
              transition: 'left var(--dur-fast) var(--ease-out)',
            }} />
          </span>
          {c.verifiedOnly}
        </button>

        {/* District dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setDistrictOpen((v) => !v); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: filters.district ? 'var(--primary)' : 'var(--card)',
              border: `1px solid ${filters.district ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 999,
              color: filters.district ? 'var(--accent)' : 'var(--text-primary)',
              fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <window.Icon.pin size={14} />
            {filters.district
              ? `${1000 + filters.district * 10} · ${c.district}`
              : c.allDistricts}
            <window.Icon.chevron size={12} />
          </button>
          {districtOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 8,
              boxShadow: 'var(--shadow-elev)',
              width: 260, maxHeight: 320, overflowY: 'auto',
              zIndex: 30,
            }}>
              <button onClick={() => { setFilters({ ...filters, district: null }); setDistrictOpen(false); }}
                style={dropItemStyle(!filters.district)}>
                {c.allDistricts}
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {window.DISTRICTS.map((d) => (
                  <button key={d} onClick={() => { setFilters({ ...filters, district: d }); setDistrictOpen(false); }}
                    style={dropItemStyle(filters.district === d)}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500, marginRight: 6 }}>
                      {1000 + d * 10}
                    </span>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {window.CATEGORIES.map((cat) => {
            const on = filters.categories.includes(cat);
            return (
              <button key={cat} onClick={() => toggleCat(cat)} style={{
                padding: '7px 14px',
                background: on ? 'var(--accent)' : 'transparent',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 999,
                color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}>{cat}</button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* Count */}
        <div style={{
          color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          <b style={{ color: 'var(--accent)', fontWeight: 700 }}>{resultCount}</b>{' '}
          {c.resultsCount(resultCount).replace(/^\d+\s*/, '')}
        </div>
      </div>
    </div>
  );
};

const dropItemStyle = (on) => ({
  width: '100%',
  textAlign: 'left',
  padding: '8px 12px',
  background: on ? 'var(--primary)' : 'transparent',
  border: 'none',
  color: on ? 'var(--accent)' : 'var(--text-primary)',
  borderRadius: 8,
  fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
  cursor: 'pointer',
});

window.FilterBar = FilterBar;
