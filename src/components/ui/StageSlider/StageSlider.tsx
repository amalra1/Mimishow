'use client';

import { useId } from 'react';
import type { CSSProperties } from 'react';
import { cx } from '@/lib/classNames';
import { useSound } from '@/hooks/useSound';
import type { StageSliderProps } from '@/types/components/ui';
import styles from './StageSlider.module.css';

export default function StageSlider({
  label,
  min,
  max,
  step,
  value,
  format,
  hint,
  onChange,
}: StageSliderProps) {
  const id = useId();
  const { play } = useSound();
  const fill = (value - min) / (max - min);

  return (
    <div className={styles.slider} style={{ '--fill': fill } as CSSProperties}>
      <label htmlFor={id} className={cx(styles.label, 'label')}>
        {label}
      </label>
      <div className={styles.rail}>
        <output
          htmlFor={id}
          className={cx(styles.value, 'headline')}
          aria-hidden="true"
        >
          {format(value)}
        </output>
        <input
          id={id}
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={format(value)}
          onChange={(event) => {
            play('slide');
            onChange(Number(event.target.value));
          }}
        />
      </div>
      <div className={cx(styles.ends, 'label')} aria-hidden="true">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
