'use client';
import { useState } from 'react';
import { IMPRESSUM } from '@/data/legal-copy';

// The address is kept in two parts and only joined on click, so it never
// appears as plain text in the page: scrapers that harvest emails miss it.
const address = () => [IMPRESSUM.email.user, IMPRESSUM.email.domain].join('@');

export default function EmailButtons({ write, copy, copied, subject }) {
  const [done, setDone] = useState(false);

  const open = () => {
    const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${address()}${q}`;
  };

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(address());
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      window.prompt(copy, address());
    }
  };

  return (
    <div className="ak-lokale-pair">
      <button type="button" className="ak-btn" onClick={open}>{write}</button>
      <button type="button" className="ak-btn" onClick={doCopy} aria-live="polite">{done ? copied : copy}</button>
    </div>
  );
}
