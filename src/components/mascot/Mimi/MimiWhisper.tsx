'use client';

import { cx } from '@/lib/classNames';
import { useTypewriter } from '@/hooks/useTypewriter';
import type { MimiWhisperProps } from '@/types/components/mascot';
import styles from './Mimi.module.css';

export default function MimiWhisper({ text, className }: MimiWhisperProps) {
  const count = useTypewriter(text);

  return (
    <p className={cx(styles.text, 'whisper', className)}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className={styles.ghost} aria-hidden="true">
        {text.slice(count)}
      </span>
    </p>
  );
}
