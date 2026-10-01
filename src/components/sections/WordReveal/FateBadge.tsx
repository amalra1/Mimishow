'use client';

import { useEffect, useState } from 'react';
import { DIFFICULTIES, DIFFICULTY_POINTS } from '@/constants/game';
import { CATEGORY_ICONS } from '@/constants/icons';
import { FATE_SPIN_MS, FATE_SPINS } from '@/constants/motion';
import { DIFFICULTY_TONES } from '@/constants/tones';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSound } from '@/hooks/useSound';
import Icon from '@/components/ornaments/Icon/Icon';
import type { FateBadgeProps } from '@/types/components/sections';
import styles from './WordReveal.module.css';

export default function FateBadge({ difficulty, category }: FateBadgeProps) {
  const { difficulties, categories, stage } = useCopy();
  const reduced = useReducedMotion();
  const { play } = useSound();
  const [spins, setSpins] = useState(0);
  const settled = reduced || spins >= FATE_SPINS;
  const shown = settled
    ? difficulty
    : DIFFICULTIES[spins % DIFFICULTIES.length];

  useEffect(() => {
    if (reduced) return;
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setSpins(count);
      const landed = count >= FATE_SPINS;
      play(landed ? 'fateLand' : 'fate');
      if (landed) clearInterval(timer);
    }, FATE_SPIN_MS);
    return () => clearInterval(timer);
  }, [reduced, play]);

  return (
    <div
      className={cx(
        styles.fate,
        DIFFICULTY_TONES[shown],
        settled && styles.settled,
      )}
    >
      <span className={cx(styles.difficulty, 'headline')}>
        {difficulties[shown]}
      </span>
      <span className={cx(styles.points, 'headline')}>
        {fill(stage.reveal.points, { points: DIFFICULTY_POINTS[shown] })}
      </span>
      {category && (
        <span className={cx(styles.category, 'label')}>
          <Icon
            name={CATEGORY_ICONS[category]}
            className={styles.categoryIcon}
          />
          {categories[category]}
        </span>
      )}
    </div>
  );
}
