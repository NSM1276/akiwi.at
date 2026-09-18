'use client';
// Single source of truth for the DE/EN switch.
//
// The choice lives in localStorage, which is an external store: reading it
// through useSyncExternalStore keeps the value correct from the first client
// render, survives navigation, and stays in sync across browser tabs.

import { createContext, useContext, useCallback, useEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'akiwi.lang';

const listeners = new Set();

function subscribe(onChange) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'de';
  } catch {
    return 'de';
  }
}

const getServerSnapshot = () => 'de';

function writeLang(next) {
  try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  listeners.forEach((fn) => fn());
}

const LangContext = createContext(['de', () => {}]);

export function LangProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep the document in sync — updating an external system, not React state.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === 'de' || next === 'en') writeLang(next);
  }, []);

  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  );
}

/** @returns {[('de'|'en'), (l: 'de'|'en') => void]} */
export function useLang() {
  return useContext(LangContext);
}
