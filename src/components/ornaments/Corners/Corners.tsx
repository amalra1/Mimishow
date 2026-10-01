import styles from './Corners.module.css';

export default function Corners() {
  return (
    <span className={styles.corners} aria-hidden="true">
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
    </span>
  );
}
