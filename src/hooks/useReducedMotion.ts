'use client';

import { useSyncExternalStore } from 'react';
import { REDUCED } from '@/constants/media';

function subscribe(callback: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
