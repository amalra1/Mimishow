'use client';

import { useRef } from 'react';
import { cx } from '@/lib/classNames';
import { usePupilTracking } from '@/hooks/usePupilTracking';
import type { MascotProps } from '@/types/components/mascot';
import MascotArms from './MascotArms';
import MascotBody from './MascotBody';
import MascotMask from './MascotMask';
import styles from './Mascot.module.css';

export default function Mascot({
  mood = 'idle',
  trackPointer = false,
  className,
}: MascotProps) {
  const ref = useRef<HTMLDivElement>(null);
  usePupilTracking(ref, trackPointer);

  return (
    <div ref={ref} className={cx(styles.mascot, styles[mood], className)}>
      <svg
        viewBox="0 0 200 260"
        className={styles.svg}
        aria-hidden="true"
        focusable="false"
      >
        <ellipse className={styles.floor} cx="100" cy="252" rx="46" ry="5" />
        <g className={styles.figure}>
          <MascotBody />
          <MascotArms />
          <g className={styles.head}>
            <MascotMask mood={mood} />
          </g>
        </g>
      </svg>
    </div>
  );
}
