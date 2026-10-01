'use client';

import { cx } from '@/lib/classNames';
import { useSound } from '@/hooks/useSound';
import Corners from '@/components/ornaments/Corners/Corners';
import Icon from '@/components/ornaments/Icon/Icon';
import type { ChoiceCardProps } from '@/types/components/ui';
import styles from './ChoiceCard.module.css';

export default function ChoiceCard({
  title,
  description,
  icon,
  tone,
  selected,
  className,
  onSelect,
}: ChoiceCardProps) {
  const { play } = useSound();

  const onClick = () => {
    play('select');
    onSelect();
  };

  return (
    <button
      type="button"
      className={cx(styles.card, tone, selected && styles.selected, className)}
      aria-pressed={selected}
      onClick={onClick}
    >
      {selected && <Corners />}
      <span className={styles.orb}>
        <Icon name={icon} className={styles.icon} />
      </span>
      <span className={styles.text}>
        <span className={cx(styles.title, 'headline')}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <span className={styles.check} aria-hidden="true">
        <Icon name="check" className={styles.checkIcon} strokeWidth={2.4} />
      </span>
    </button>
  );
}
