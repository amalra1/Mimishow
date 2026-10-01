'use client';

import { useRef } from 'react';
import { BURST_ICONS } from '@/constants/icons';
import { BURST_COUNT } from '@/constants/motion';
import { cx } from '@/lib/classNames';
import Icon from '@/components/ornaments/Icon/Icon';
import type { SparkBurstProps } from '@/types/components/ui';
import { useSparkBurstAnimation } from './useSparkBurstAnimation';
import styles from './SparkBurst.module.css';

export default function SparkBurst({
  active,
  count = BURST_COUNT,
  className,
}: SparkBurstProps) {
  const ref = useRef<HTMLDivElement>(null);
  useSparkBurstAnimation(ref, active);
  const sparks = Array.from({ length: count }, (_, index) => index);

  return (
    <div ref={ref} className={cx(styles.burst, className)} aria-hidden="true">
      {sparks.map((index) => (
        <Icon
          key={index}
          name={BURST_ICONS[index % BURST_ICONS.length]}
          className={cx(styles.spark, styles[`tone${index % 3}`])}
        />
      ))}
    </div>
  );
}
