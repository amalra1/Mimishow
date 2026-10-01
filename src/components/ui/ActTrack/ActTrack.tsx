import type { CSSProperties } from 'react';
import { cx } from '@/lib/classNames';
import Icon from '@/components/ornaments/Icon/Icon';
import type { ActTrackProps } from '@/types/components/ui';
import styles from './ActTrack.module.css';

const NUMERALS = ['I', 'II', 'III', 'IV'];

export default function ActTrack({ current, names, label }: ActTrackProps) {
  const progress = names.length > 1 ? (current - 1) / (names.length - 1) : 0;

  return (
    <div
      className={styles.track}
      style={{ '--progress': progress } as CSSProperties}
    >
      <p className="visually-hidden" aria-live="polite">
        {label}
      </p>
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.lit} />
        <span className={styles.marker}>
          <Icon name="mask" className={styles.mask} />
        </span>
      </span>
      <ol className={styles.acts} aria-hidden="true">
        {names.map((name, index) => (
          <li
            key={name}
            className={cx(
              styles.act,
              index + 1 < current && styles.done,
              index + 1 === current && styles.current,
            )}
          >
            <span className={cx(styles.numeral, 'headline')}>
              {NUMERALS[index]}
            </span>
            <span className="label">{name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
