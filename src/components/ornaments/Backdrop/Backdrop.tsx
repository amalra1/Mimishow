import Emblem from '@/components/ornaments/Emblem/Emblem';
import styles from './Backdrop.module.css';

export default function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <Emblem className={styles.emblem} />
    </div>
  );
}
