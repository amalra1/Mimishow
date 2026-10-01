'use client';

import { useId, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { HAPTIC_PULSE_MS } from '@/constants/motion';
import { cx } from '@/lib/classNames';
import { useSound } from '@/hooks/useSound';
import Icon from '@/components/ornaments/Icon/Icon';
import Ornament from '@/components/ornaments/Ornament/Ornament';
import type { CurtainCardProps } from '@/types/components/ui';
import styles from './CurtainCard.module.css';

const PEEK_KEYS = new Set([' ', 'Enter']);
const DECOY = 'MIMISHOW';

export default function CurtainCard({
  label,
  holdingLabel,
  hint,
  children,
  className,
}: CurtainCardProps) {
  const hintId = useId();
  const [peeking, setPeeking] = useState(false);
  const { play } = useSound();

  const show = () => {
    if (peeking) return;
    navigator.vibrate?.(HAPTIC_PULSE_MS);
    play('peek');
    setPeeking(true);
  };

  const hide = () => setPeeking(false);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    show();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!PEEK_KEYS.has(event.key)) return;
    event.preventDefault();
    if (!event.repeat) show();
  };

  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (PEEK_KEYS.has(event.key)) hide();
  };

  return (
    <button
      type="button"
      className={cx(styles.card, peeking && styles.peeking, className)}
      aria-describedby={hintId}
      onPointerDown={onPointerDown}
      onPointerUp={hide}
      onPointerCancel={hide}
      onLostPointerCapture={hide}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={hide}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className={cx(styles.word, 'headline')} aria-live="polite">
        {peeking ? children : DECOY}
      </span>
      <span className={cx(styles.drape, styles.left)} aria-hidden="true" />
      <span className={cx(styles.drape, styles.right)} aria-hidden="true" />
      <Ornament name="tassel" className={styles.tassel} />
      <span className={cx(styles.label, 'label')}>
        <Icon name="eye" className={styles.icon} />
        {peeking ? holdingLabel : label}
      </span>
      <span id={hintId} className="visually-hidden">
        {hint}
      </span>
    </button>
  );
}
