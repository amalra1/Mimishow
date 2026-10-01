import { useId } from 'react';
import { cx } from '@/lib/classNames';
import type { FieldProps } from '@/types/components/ui';
import styles from './Field.module.css';

export default function Field({
  label,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={cx(styles.label, 'label')}>
        {label}
      </label>
      {children({
        id,
        className: styles.control,
        'aria-invalid': Boolean(error),
        'aria-describedby': message ? messageId : undefined,
      })}
      {message && (
        <p id={messageId} className={styles.message} aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
