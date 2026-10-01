'use client';

import { useState } from 'react';
import {
  FREE_SKIPS_RANGE,
  SKIP_PENALTY,
  TARGET_SCORE_RANGE,
  TURN_SECONDS_RANGE,
} from '@/constants/game';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useMascotLine } from '@/hooks/useMascotLine';
import Mimi from '@/components/mascot/Mimi/Mimi';
import CategoryChips from '@/components/ui/CategoryChips/CategoryChips';
import StageSlider from '@/components/ui/StageSlider/StageSlider';
import type { RulesComment, SetupStepProps } from '@/types/components/sections';
import type { Category } from '@/types/game';
import styles from './RulesStep.module.css';

const SLIDERS = [
  { key: 'targetScore', comment: 'target', range: TARGET_SCORE_RANGE },
  { key: 'turnSeconds', comment: 'time', range: TURN_SECONDS_RANGE },
  { key: 'freeSkips', comment: 'skips', range: FREE_SKIPS_RANGE },
] as const;

export default function RulesStep({ draft, dispatch }: SetupStepProps) {
  const { wizard, categories } = useCopy();
  const copy = wizard.rules;
  const fallback = useMascotLine('rules');
  const [comment, setComment] = useState<RulesComment | null>(null);
  const { settings } = draft;

  const labels = {
    target: [copy.target, copy.targetValue],
    time: [copy.time, copy.timeValue],
    skips: [copy.skips, copy.skipsValue],
  } as const;

  const onToggle = (category: Category) => {
    const selected = settings.categories.includes(category);
    const nextCount = settings.categories.length + (selected ? -1 : 1);
    dispatch({ type: 'toggleCategory', category });
    setComment(nextCount === 1 ? 'categoriesOne' : null);
  };

  const onSelectAll = () => {
    dispatch({ type: 'selectAllCategories' });
    setComment('categoriesAll');
  };

  return (
    <div className={styles.rules}>
      <Mimi
        mood={comment ? 'sly' : 'idle'}
        line={comment ? copy.comments[comment] : fallback}
        size="sm"
        className={styles.host}
      />
      {SLIDERS.map(({ key, comment: prefix, range }) => (
        <StageSlider
          key={key}
          label={labels[prefix][0]}
          {...range}
          value={settings[key]}
          format={(value) => fill(labels[prefix][1], { value })}
          hint={
            key === 'freeSkips'
              ? fill(copy.skipsHint, { points: SKIP_PENALTY })
              : undefined
          }
          onChange={(value) => {
            dispatch({ type: 'setSettings', settings: { [key]: value } });
            if (value === range.min) setComment(`${prefix}Low` as const);
            else if (value === range.max) setComment(`${prefix}High` as const);
            else setComment(null);
          }}
        />
      ))}
      <CategoryChips
        label={copy.categories}
        hint={copy.categoriesHint}
        allLabel={copy.all}
        selected={settings.categories}
        names={categories}
        onToggle={onToggle}
        onSelectAll={onSelectAll}
      />
    </div>
  );
}
