import { cx } from '@/lib/classNames';
import Mimi from '@/components/mascot/Mimi/Mimi';
import type { PhaseFrameProps } from '@/types/components/sections';
import styles from './Stage.module.css';

export default function PhaseFrame({
  mood,
  line,
  kicker,
  title,
  actions,
  children,
  className,
}: PhaseFrameProps) {
  return (
    <section className={cx(styles.phase, className)}>
      <Mimi mood={mood} line={line} className={styles.host} />
      <header className={styles.heading}>
        <p className={cx(styles.kicker, 'label')}>{kicker}</p>
        {title && <h1 className={cx(styles.title, 'headline')}>{title}</h1>}
      </header>
      <div className={styles.body}>{children}</div>
      <div className={styles.actions}>{actions}</div>
    </section>
  );
}
