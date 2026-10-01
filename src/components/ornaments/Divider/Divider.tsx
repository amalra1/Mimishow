import { cx } from '@/lib/classNames';
import Ornament from '@/components/ornaments/Ornament/Ornament';
import type { DividerProps } from '@/types/components/ornaments';
import styles from './Divider.module.css';

export default function Divider({ center = 'mask', className }: DividerProps) {
  return (
    <div className={cx(styles.divider, className)} aria-hidden="true">
      <span className={styles.line} />
      <Ornament name="diamond" className={styles.small} />
      <Ornament name={center} className={styles.center} />
      <Ornament name="diamond" className={styles.small} />
      <span className={styles.line} />
    </div>
  );
}
