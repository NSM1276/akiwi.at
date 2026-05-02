// Section components for static pages: About, Owners, Legal

const PageHero = ({ eyebrow, title, sub, ctas }) => (
  <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 32px' }}>
    {eyebrow && (
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: 18,
      }}>{eyebrow}</div>
    )}
    <h1 style={{
      margin: 0, fontSize: 'clamp(36px, 5.5vw, 60px)', fontWeight: 700,
      letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 880,
    }}>{title}</h1>
    {sub && (
      <p style={{
        margin: '20px 0 28px', fontSize: 18, color: 'var(--text-secondary)',
        maxWidth: 720, lineHeight: 1.55,
      }}>{sub}</p>
    )}
    {ctas && (
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {ctas.map((cta, i) => (
          <button key={i} style={i === 0 ? sBtnAccent : sBtnGhost}>{cta.icon}{cta.label}</button>
        ))}
      </div>
    )}
  </section>
);

// ============== ABOUT ==============

const AboutMission = ({ lang }) => {
  const c = window.STATIC_COPY.about[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 'clamp(28px, 4vw, 48px)',
        display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) 2fr', gap: 'clamp(24px, 3vw, 48px)',
        alignItems: 'start',
      }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {c.missionH}
        </h2>
        <p style={{ margin: 0, fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {c.mission}
        </p>
      </div>
    </section>
  );
};

const AboutPrinciples = ({ lang }) => {
  const c = window.STATIC_COPY.about[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SimpleH title={c.principlesH} />
      <div style={{
        marginTop: 24, display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14,
      }}>
        {c.principles.map((p, i) => (
          <div key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 22,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--primary)', color: 'var(--accent)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, marginBottom: 14,
            }}>{i + 1}</div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{p.t}</h3>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutFounder = ({ lang }) => {
  const c = window.STATIC_COPY.about[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #044534 100%)',
        border: '1px solid #065F46',
        borderRadius: 16, padding: 'clamp(28px, 4vw, 48px)',
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(20px, 3vw, 36px)',
        alignItems: 'center',
      }}>
        <div style={{
          width: 'clamp(96px, 14vw, 140px)', height: 'clamp(96px, 14vw, 140px)',
          borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #064E3B, #022c22)',
          border: '3px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'var(--accent)',
          letterSpacing: '-0.04em',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }}>A</div>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
            {c.foundersH}
          </h2>
          <p style={{ margin: '12px 0 16px', fontSize: 16, color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: 640 }}>
            {c.foundersBody}
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{c.founderName}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{c.founderRole}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutTimeline = ({ lang }) => {
  const c = window.STATIC_COPY.about[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SimpleH title={c.timelineH} />
      <ol style={{
        listStyle: 'none', margin: '24px 0 0', padding: 0,
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14,
      }}>
        {c.timeline.map((t, i) => (
          <li key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderTop: '3px solid var(--accent)',
            borderRadius: 12, padding: 20,
          }}>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8,
            }}>{t.y}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{t.t}</h3>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{t.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

const AboutContact = ({ lang }) => {
  const c = window.STATIC_COPY.about[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>
      <div style={{
        textAlign: 'center', padding: 'clamp(36px, 5vw, 56px) 24px',
        border: '1px solid var(--border)', borderRadius: 16,
        background: 'var(--card)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          {c.contactH}
        </h2>
        <p style={{ margin: '12px auto 24px', fontSize: 16, color: 'var(--text-secondary)', maxWidth: 540, lineHeight: 1.55 }}>
          {c.contactBody}
        </p>
        <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://wa.me/436600000000" style={{ ...sBtnAccent, textDecoration: 'none' }}>
            <WhatsAppIcon /> {c.contactCta}
          </a>
          <a href="mailto:hallo@akiwi.at" style={{ ...sBtnGhost, textDecoration: 'none' }}>
            ✉ {c.contactCta2}
          </a>
        </div>
      </div>
    </section>
  );
};

// ============== OWNERS ==============

const OwnersBenefits = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14,
      }}>
        {c.benefits.map((b, i) => (
          <div key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 24,
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              alignSelf: 'flex-start',
              padding: '4px 10px', borderRadius: 999,
              background: 'var(--primary)', color: 'var(--accent)',
              fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
            }}>{b.tag}</div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
              {b.t}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {b.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const OwnersShare = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 'clamp(24px, 3vw, 36px)',
        display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 1.2fr', gap: 36, alignItems: 'center',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            {c.shareH}
          </h2>
          <p style={{ margin: '14px 0 20px', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {c.shareBody}
          </p>
          <a href="Akiwi Restaurant Detail.html" style={{
            ...sBtnAccent, textDecoration: 'none',
          }}>{c.shareCta}</a>
        </div>
        <MockSharePreview note={c.shareNote} />
      </div>
    </section>
  );
};

const MockSharePreview = ({ note }) => (
  <div style={{
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: 14, padding: 20,
    display: 'flex', flexDirection: 'column', gap: 14,
  }}>
    {/* Browser-like chrome */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
      <div style={{
        marginLeft: 8, flex: 1, padding: '5px 12px',
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 999, fontSize: 11, color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-mono)',
      }}>🔒 {note}</div>
    </div>
    {/* Card preview */}
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--card)',
    }}>
      <div style={{
        height: 140,
        background: 'linear-gradient(135deg, #7C2D12, #431407)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 10px', borderRadius: 999,
          background: 'var(--status-green)', color: '#022c22',
          fontSize: 11, fontWeight: 700,
        }}>✓ Verified</div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>Al-Nour Restaurant</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>Favoriten · Kebab · €€</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '7px', background: 'var(--accent)', color: 'var(--text-on-accent)', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>Bestellen</div>
          <div style={{ flex: 1, textAlign: 'center', padding: '7px', background: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text-primary)', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>Anrufen</div>
        </div>
      </div>
    </div>
    {/* Share affordances */}
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {['Instagram', 'Google', 'WhatsApp', 'QR'].map((s) => (
        <span key={s} style={{
          padding: '5px 10px', borderRadius: 999,
          border: '1px solid var(--border)', background: 'var(--card)',
          fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600,
        }}>{s}</span>
      ))}
    </div>
  </div>
);

const OwnersProcess = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <SimpleH title={c.processH} />
      <div style={{
        marginTop: 24, display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14,
      }}>
        {c.processSteps.map((s, i) => (
          <div key={s.n} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: 22, position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--accent)', marginBottom: 14,
            }}>{s.n}</div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.t}</h3>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const OwnersPricing = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{
        border: '1px solid var(--border)', borderRadius: 16,
        background: 'var(--card)', padding: 'clamp(28px, 4vw, 44px)',
        display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 1fr', gap: 36, alignItems: 'center',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            {c.pricingH}
          </h2>
          <p style={{ margin: '14px 0 0', fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {c.pricingBody}
          </p>
        </div>
        <div style={{
          background: 'var(--background)', border: '1px solid var(--border-strong)',
          borderLeft: '3px solid var(--status-green)',
          borderRadius: 14, padding: 24,
        }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6,
          }}>
            <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)' }}>0€</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{c.pricingFree}</div>
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.55 }}>{c.pricingNote}</div>
        </div>
      </div>
    </section>
  );
};

const OwnersFAQ = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
      <SimpleH title={c.faqH} />
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {c.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', textAlign: 'left',
                padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
              }}>
                <span>{item.q}</span>
                <span style={{
                  flexShrink: 0, color: isOpen ? 'var(--accent)' : 'var(--text-tertiary)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--dur-fast) var(--ease-out)',
                }}>▾</span>
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

const OwnersContact = ({ lang }) => {
  const c = window.STATIC_COPY.owners[lang];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 96px' }}>
      <div style={{
        textAlign: 'center', padding: 'clamp(36px, 5vw, 56px) 24px',
        border: '1px solid var(--border)', borderRadius: 16,
        background: 'linear-gradient(135deg, var(--primary) 0%, #044534 100%)',
      }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--accent)' }}>
          {c.contactH}
        </h2>
        <p style={{ margin: '12px auto 24px', fontSize: 17, color: 'rgba(255,255,255,0.88)', maxWidth: 540, lineHeight: 1.55 }}>
          {c.contactBody}
        </p>
        <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} style={{ ...sBtnAccent, textDecoration: 'none' }}>
            <WhatsAppIcon /> {c.whatsapp}
          </a>
          <a href={`mailto:${c.email}`} style={{
            ...sBtnGhost, textDecoration: 'none',
            background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(163,230,53,0.3)',
          }}>
            ✉ {c.email}
          </a>
        </div>
      </div>
    </section>
  );
};

// ============== LEGAL (Impressum / Datenschutz) ==============

const LegalSections = ({ sections, note }) => (
  <section style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px 96px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {sections.map((s, i) => (
        <article key={i} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 26px',
        }}>
          <h2 style={{
            margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.005em',
          }}>{s.h}</h2>
          {s.body.map((p, j) => (
            <p key={j} style={{
              margin: j === 0 ? '12px 0 0' : '10px 0 0',
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65,
            }}>{p}</p>
          ))}
        </article>
      ))}
      {note && (
        <div style={{
          marginTop: 8,
          padding: '14px 18px',
          border: '1px dashed var(--status-yellow)',
          background: 'var(--status-yellow-bg)',
          borderRadius: 10,
          fontSize: 12, color: 'var(--status-yellow)',
          fontFamily: 'var(--font-mono)', lineHeight: 1.55,
        }}>⚠ {note}</div>
      )}
    </div>
  </section>
);

// ============== shared atoms ==============

const SimpleH = ({ title }) => (
  <h2 style={{
    margin: 0, fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 700,
    letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 760,
  }}>{title}</h2>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M17.6 6.3A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12L4 21l5.1-1.34a7.93 7.93 0 0 0 11.78-7.06 7.85 7.85 0 0 0-3.28-6.3Zm-5.6 12.2a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.97.78.79-2.9-.16-.25a6.6 6.6 0 0 1 10.18-8.16 6.55 6.55 0 0 1-4.24 11.59Z" fill="currentColor"/>
    <path d="M15.6 13.45c-.2-.1-1.18-.58-1.36-.65s-.32-.1-.45.1c-.13.2-.5.65-.62.78-.11.13-.23.15-.43.05a5.42 5.42 0 0 1-2.7-2.36c-.2-.35.21-.32.59-1.07.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.4-.33-.34-.45-.34h-.38a.74.74 0 0 0-.54.25 2.25 2.25 0 0 0-.7 1.67 3.9 3.9 0 0 0 .82 2.07c.1.13 1.41 2.16 3.42 3.03.48.21.85.33 1.14.42.48.15.92.13 1.27.08a2.07 2.07 0 0 0 1.36-.96 1.7 1.7 0 0 0 .12-.96c-.05-.08-.18-.13-.38-.23Z" fill="currentColor"/>
  </svg>
);

const sBtnAccent = {
  padding: '12px 22px',
  background: 'var(--accent)', color: 'var(--text-on-accent)',
  border: 'none', borderRadius: 999,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
};
const sBtnGhost = {
  padding: '12px 22px',
  background: 'transparent', color: 'var(--text-primary)',
  border: '1px solid var(--border-strong)', borderRadius: 999,
  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
};

Object.assign(window, {
  PageHero,
  AboutMission, AboutPrinciples, AboutFounder, AboutTimeline, AboutContact,
  OwnersBenefits, OwnersShare, OwnersProcess, OwnersPricing, OwnersFAQ, OwnersContact,
  LegalSections,
});
