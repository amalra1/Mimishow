'use client';

import { CATEGORIES } from '@/constants/game';
import { CATEGORY_ICONS } from '@/constants/icons';
import { cx } from '@/lib/classNames';
import { useSound } from '@/hooks/useSound';
import Icon from '@/components/ornaments/Icon/Icon';
import type { CategoryChipsProps } from '@/types/components/ui';
import type { Category } from '@/types/game';
import styles from './CategoryChips.module.css';

export default function CategoryChips({
  label,
  hint,
  allLabel,
  selected,
  names,
  onToggle,
  onSelectAll,
}: CategoryChipsProps) {
  const { play } = useSound();
  const allSelected = selected.length === CATEGORIES.length;

  const selectAll = () => {
    play('select');
    onSelectAll();
  };

  const toggle = (category: Category, on: boolean) => {
    play(on ? 'deselect' : 'select');
    onToggle(category);
  };

  return (
    <fieldset className={styles.group}>
      <legend className={cx(styles.legend, 'label')}>{label}</legend>
      <div className={styles.chips}>
        <button
          type="button"
          className={cx(styles.chip, styles.all, allSelected && styles.on)}
          aria-pressed={allSelected}
          onClick={selectAll}
        >
          <Icon name="sparkle" className={styles.icon} />
          {allLabel}
        </button>
        {CATEGORIES.map((category) => {
          const on = selected.includes(category);
          return (
            <button
              key={category}
              type="button"
              className={cx(styles.chip, on && styles.on)}
              aria-pressed={on}
              onClick={() => toggle(category, on)}
            >
              <Icon name={CATEGORY_ICONS[category]} className={styles.icon} />
              {names[category]}
            </button>
          );
        })}
      </div>
      <p className={styles.hint}>{hint}</p>
    </fieldset>
  );
}
