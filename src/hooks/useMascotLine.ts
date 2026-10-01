'use client';

import { useEffect, useState } from 'react';
import { MURMUR_INTERVAL_MS } from '@/constants/mascot';
import { randomInt } from '@/lib/random';
import { useCopy } from '@/hooks/useCopy';
import type { MascotMoment } from '@/types/mascot';

export function useMascotLine(moment: MascotMoment, seed = 0, murmur = false) {
  const { mascot } = useCopy();
  const [murmurIndex, setMurmurIndex] = useState<number | null>(null);
  const murmurCount = mascot.murmurs.length;

  useEffect(() => {
    if (!murmur) return;
    const timer = setInterval(
      () => setMurmurIndex(randomInt(murmurCount)),
      MURMUR_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [murmur, murmurCount]);

  if (murmur && murmurIndex !== null) return mascot.murmurs[murmurIndex];
  const lines = mascot[moment];
  return lines[Math.abs(seed) % lines.length];
}
