'use client';

import { useEffect, useRef, useState } from 'react';
import { COUNTDOWN_TICK_MS } from '@/constants/motion';
import type { CountdownOptions } from '@/types/hooks';

const MS_PER_SECOND = 1000;

export function useCountdown({ endsAt, onExpire }: CountdownOptions) {
  const [now, setNow] = useState(() => Date.now());
  const expired = useRef(false);
  const secondsLeft = endsAt
    ? Math.max(0, Math.ceil((endsAt - now) / MS_PER_SECOND))
    : 0;

  useEffect(() => {
    if (!endsAt) return;
    expired.current = false;
    const timer = setInterval(() => setNow(Date.now()), COUNTDOWN_TICK_MS);
    return () => clearInterval(timer);
  }, [endsAt]);

  useEffect(() => {
    if (!endsAt || secondsLeft > 0 || expired.current) return;
    expired.current = true;
    onExpire();
  }, [endsAt, secondsLeft, onExpire]);

  return secondsLeft;
}
