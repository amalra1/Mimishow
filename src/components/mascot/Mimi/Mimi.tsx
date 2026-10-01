import { cx } from '@/lib/classNames';
import Mascot from '@/components/mascot/Mascot/Mascot';
import type { MimiProps } from '@/types/components/mascot';
import MimiWhisper from './MimiWhisper';
import styles from './Mimi.module.css';

export default function Mimi({
  mood,
  line,
  size = 'md',
  trackPointer = false,
  className,
}: MimiProps) {
  return (
    <div className={cx(styles.mimi, styles[size], className)}>
      <Mascot
        mood={mood}
        trackPointer={trackPointer}
        className={styles.figure}
      />
      <svg
        className={styles.trail}
        viewBox="0 0 80 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 6C18 2 26 34 46 24S66 12 78 20" />
      </svg>
      <MimiWhisper key={line} text={line} className={styles.whisper} />
    </div>
  );
}
