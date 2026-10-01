'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { releaseIntro } from '@/lib/preloader';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Emblem from '@/components/ornaments/Emblem/Emblem';
import Ornament from '@/components/ornaments/Ornament/Ornament';
import { usePreloaderAnimation } from './usePreloaderAnimation';
import styles from './Preloader.module.css';

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [openedOnHome] = useState(pathname === ROUTES.home);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  const active = openedOnHome && !done && !reduced;

  const finish = useCallback(() => setDone(true), []);
  usePreloaderAnimation(ref, finish);

  useEffect(() => {
    if (!active) releaseIntro();
  }, [active]);

  if (!active) return null;

  return (
    <div ref={ref} className={styles.preloader} aria-hidden="true">
      <span className={styles.ring} />
      <Emblem className={styles.symbol} />
      <Ornament name="eye" className={styles.symbol} />
      <Ornament name="mask" className={styles.symbol} />
    </div>
  );
}
