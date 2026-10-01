import { cx } from '@/lib/classNames';
import type { ButtonStyleProps } from '@/types/components/ui';
import styles from './Button.module.css';

export function buttonClassName({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
}: ButtonStyleProps) {
  return cx(
    styles.button,
    styles[variant],
    styles[size],
    block && styles.block,
    className,
  );
}

export const buttonPartStyles = {
  label: styles.label,
  icon: styles.icon,
};
