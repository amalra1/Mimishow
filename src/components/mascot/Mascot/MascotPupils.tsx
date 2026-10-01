import { cx } from '@/lib/classNames';
import type { MascotPupilsProps } from '@/types/components/mascot';
import styles from './Mascot.module.css';

const EYES_X = [82, 118];

export default function MascotPupils({
  y = 74,
  small = false,
}: MascotPupilsProps) {
  const radius = small ? 2 : 3.2;

  return (
    <g className={cx(styles.pupils, small && styles.small)}>
      {EYES_X.map((x) => (
        <g key={x}>
          <circle className={styles.pupil} cx={x} cy={y} r={radius} />
        </g>
      ))}
    </g>
  );
}
