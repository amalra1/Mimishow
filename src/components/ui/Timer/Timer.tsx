import { cx } from '@/lib/classNames';
import { formatClock } from '@/lib/format';
import type { TimerProps } from '@/types/components/ui';
import styles from './Timer.module.css';

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer({ seconds, total, tense, label }: TimerProps) {
  const progress = total > 0 ? seconds / total : 0;

  return (
    <div
      className={cx(styles.timer, tense && styles.tense)}
      role="timer"
      aria-label={label}
    >
      <svg viewBox="0 0 100 100" className={styles.ring} aria-hidden="true">
        <circle className={styles.track} cx="50" cy="50" r={RADIUS} />
        <circle
          className={styles.arc}
          cx="50"
          cy="50"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span
        key={tense ? seconds : 'calm'}
        className={cx(styles.value, 'headline')}
      >
        {formatClock(seconds)}
      </span>
    </div>
  );
}
