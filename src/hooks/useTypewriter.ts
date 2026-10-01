'use client';

import { useEffect, useState } from 'react';
import { TYPE_INTERVAL_MS } from '@/constants/mascot';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function useTypewriter(text: string) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let typed = 0;
    const timer = setInterval(() => {
      typed += 1;
      setCount(typed);
      if (typed >= text.length) clearInterval(timer);
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [text, reduced]);

  return reduced ? text.length : count;
}
