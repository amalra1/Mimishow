'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import { PUPIL_FOCUS_Y } from '@/constants/mascot';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function clamp(value: number) {
  return Math.min(Math.max(value, -1), 1);
}

export function usePupilTracking(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!enabled || reduced || !node) return;

    const follow = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * PUPIL_FOCUS_Y;
      const x = clamp((event.clientX - centerX) / (window.innerWidth / 2));
      const y = clamp((event.clientY - centerY) / (window.innerHeight / 2));
      node.style.setProperty('--px', x.toFixed(3));
      node.style.setProperty('--py', y.toFixed(3));
    };

    window.addEventListener('pointermove', follow, { passive: true });
    window.addEventListener('pointerdown', follow, { passive: true });
    return () => {
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('pointerdown', follow);
    };
  }, [ref, enabled, reduced]);
}
