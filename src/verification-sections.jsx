// VerificationSections — composed sections for the verification page

const VEnter = ({ children, style }) => (
  <div style={{ ...style }}>{children}</div>
);

const VHero = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 32px' }}>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 18,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <window.StatusDot status="verified" size={8} />
        {c.eyebrow}
      </div>
      <h1 style={{
        margin: 0, fontSize: 'clamp(36px, 5.5vw, 64px)',
        fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02,
        maxWidth: 900,
      }}>{c.title}</h1>
      <p style={{
        margin: '20px 0 28px', fontSize: 18, color: 'var(--text-secondary)',
        maxWidth: 720, lineHeight: 1.55,
      }}>{c.subtitle}</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button style={btnAccent}>{c.ctaPrimary} →</button>
        <button style={btnGhost}>⚠ {c.ctaSecondary}</button>
      </div>
    </section>
  );
};

const VStats = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px 48px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1,
        background: 'var(--border)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        {c.stats.map((s, i) => (
          <div key={i} style={{
            background: 'var(--card)', padding: '24px 22px',
          }}>
            <div style={{
              fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--accent)', lineHeight: 1,
            }}>{s.v}</div>
            <div style={{
              marginTop: 8, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500,
            }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const VStatuses = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SectionHeader title={c.statusH} sub={c.statusSub} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 28 }}>
        {c.statuses.map((s) => {
          const color =
            s.key === 'verified' ? 'var(--status-green)' :
            s.key === 'self' ? 'var(--status-yellow)' : 'var(--status-red)';
          const bg =
            s.key === 'verified' ? 'var(--status-green-bg)' :
            s.key === 'self' ? 'var(--status-yellow-bg)' : 'var(--status-red-bg)';
          return (
            <div key={s.key} style={{
              background: 'var(--card)', border: `1px solid var(--border)`,
              borderTop: `3px solid ${color}`,
              borderRadius: 14, padding: 22,
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
                background: bg, border: `1px solid ${color}55`,
                color, padding: '5px 12px', borderRadius: 999,
                fontSize: 12, fontWeight: 700,
              }}>
                <window.StatusDot status={s.key} size={8} />
                {s.label}
              </div>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                {s.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {s.body}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {s.bullets.map((b, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-primary)',
                  }}>
                    <span style={{ color, fontWeight: 700 }}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const VCriteria = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SectionHeader title={c.criteriaH} sub={c.criteriaSub} />
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {c.criteria.map((cr) => (
          <div key={cr.n} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '22px 24px',
            display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 20, alignItems: 'start',
          }}>
            <div style={{
              fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--accent)', lineHeight: 1,
            }}>{cr.n}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{cr.title}</h3>
              <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 640 }}>{cr.body}</p>
            </div>
            <div style={{
              padding: '6px 12px', borderRadius: 999,
              background: 'var(--background)', border: '1px solid var(--border)',
              fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>{cr.meta}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const VProcess = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SectionHeader title={c.processH} sub={c.processSub} />
      <div style={{
        marginTop: 28, position: 'relative',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16,
      }}>
        {c.processSteps.map((s, i) => (
          <div key={s.n} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 20, position: 'relative',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 999,
              background: 'var(--primary)', color: 'var(--accent)',
              fontSize: 13, fontWeight: 700, marginBottom: 12,
            }}>{s.n}</div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: 6,
            }}>{s.when}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.t}</h3>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const VMethodology = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 32,
        display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 2fr', gap: 32,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {c.methodologyH}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {c.methodologyBody}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {c.pillars.map((p, i) => (
            <div key={i} style={{
              padding: 16, background: 'var(--background)',
              border: '1px solid var(--border)', borderRadius: 10,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VOwner = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #044534 100%)',
        border: '1px solid #065F46',
        borderRadius: 16, padding: 32,
        display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 2fr', gap: 32, alignItems: 'center',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
            {c.ownerH}
          </h2>
          <p style={{ margin: '12px 0 18px', fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {c.ownerSub}
          </p>
          <button style={{ ...btnAccent }}>{c.ownerCta} →</button>
        </div>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {c.ownerSteps.map((s, i) => (
            <li key={i} style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: 14, background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(163,230,53,0.15)', borderRadius: 10,
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--accent)', color: 'var(--text-on-accent)',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const VFAQ = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
      <SectionHeader title={c.faqH} />
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {c.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '16px 20px', background: 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  color: 'var(--text-primary)', fontFamily: 'inherit',
                  fontSize: 15, fontWeight: 600,
                }}
              >
                <span>{item.q}</span>
                <span style={{
                  flexShrink: 0, color: isOpen ? 'var(--accent)' : 'var(--text-tertiary)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--dur-fast) var(--ease-out)',
                }}>
                  <window.Icon.chevron size={14} />
                </span>
              </button>
              {isOpen && (
                <div style={{
                  padding: '0 20px 18px',
                  fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6,
                }}>{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const VBottom = ({ lang }) => {
  const c = window.VERIFICATION_COPY[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>
      <div style={{
        textAlign: 'center', padding: '48px 24px',
        border: '1px solid var(--border)', borderRadius: 16,
        background: 'var(--card)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {c.bottomH}
        </h2>
        <p style={{ margin: '12px auto 24px', fontSize: 16, color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.55 }}>
          {c.bottomBody}
        </p>
        <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={btnAccent}>{c.bottomCta1} →</button>
          <button style={btnGhost}>⚠ {c.bottomCta2}</button>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, sub }) => (
  <div style={{ maxWidth: 760 }}>
    <h2 style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
      {title}
    </h2>
    {sub && (
      <p style={{ margin: '12px 0 0', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
        {sub}
      </p>
    )}
  </div>
);

const btnAccent = {
  padding: '12px 20px',
  background: 'var(--accent)', color: 'var(--text-on-accent)',
  border: 'none', borderRadius: 999,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
};
const btnGhost = {
  padding: '12px 20px',
  background: 'transparent', color: 'var(--text-primary)',
  border: '1px solid var(--border-strong)', borderRadius: 999,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
};

Object.assign(window, { VHero, VStats, VStatuses, VCriteria, VProcess, VMethodology, VOwner, VFAQ, VBottom });
