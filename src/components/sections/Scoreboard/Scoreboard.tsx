'use client';

import type { CSSProperties } from 'react';
import { toneAt } from '@/constants/tones';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { standings } from '@/lib/game';
import { useCopy } from '@/hooks/useCopy';
import { useGame } from '@/hooks/useGame';
import type { ScoreboardProps } from '@/types/components/sections';
import styles from './Scoreboard.module.css';

export default function Scoreboard({
  highlightId,
  className,
}: ScoreboardProps) {
  const { stage } = useCopy();
  const copy = stage.scoreboard;
  const { state } = useGame();
  const { targetScore } = state.settings;

  return (
    <section className={cx(styles.board, className)} aria-label={copy.title}>
      <header className={cx(styles.head, 'label')}>
        <span>{copy.title}</span>
        <span>{fill(copy.target, { target: targetScore })}</span>
      </header>
      <ol className={styles.list}>
        {standings(state).map((row) => (
          <li
            key={row.id}
            className={cx(
              styles.row,
              toneAt(row.tone),
              row.id === highlightId && styles.current,
            )}
            style={
              {
                '--share': Math.min(row.score / targetScore, 1),
              } as CSSProperties
            }
          >
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.name}>{row.name}</span>
            <span className={cx(styles.score, 'headline')}>{row.score}</span>
            <span className={styles.bar} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}
