'use client';
// The wall clock as an external store.
//
// Opening hours ("open now") depend on the current time, which the server
// cannot know. useSyncExternalStore gives null during SSR and a real Date
// after hydration, without a setState-in-effect.

import { useSyncExternalStore } from 'react';

function subscribe(onChange) {
  const id = setInterval(onChange, 30000);
  return () => clearInterval(id);
}

// Bucketed to the minute so the snapshot is stable between ticks.
const getSnapshot = () => Math.floor(Date.now() / 60000);
const getServerSnapshot = () => null;

/** @returns {Date|null} null while rendering on the server */
export function useNow() {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date();
}
