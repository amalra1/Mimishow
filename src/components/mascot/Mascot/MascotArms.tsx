import { cx } from '@/lib/classNames';
import styles from './Mascot.module.css';

export default function MascotArms() {
  return (
    <>
      <g className={cx(styles.arm, styles.armLeft)}>
        <path className={styles.limb} d="M66 150C58 166 56 182 60 196" />
        <circle className={styles.glove} cx="60" cy="203" r="7" />
        <path className={styles.finger} d="M55 199v-5M60 197v-6M65 199v-5" />
      </g>
      <g className={cx(styles.arm, styles.armRight)}>
        <path className={styles.limb} d="M134 150C142 166 144 182 140 196" />
        <circle className={styles.glove} cx="140" cy="203" r="7" />
        <path className={styles.finger} d="M135 199v-5M140 197v-6M145 199v-5" />
      </g>
    </>
  );
}
