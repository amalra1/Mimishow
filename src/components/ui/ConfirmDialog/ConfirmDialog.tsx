'use client';

import { useId } from 'react';
import { cx } from '@/lib/classNames';
import Mascot from '@/components/mascot/Mascot/Mascot';
import Corners from '@/components/ornaments/Corners/Corners';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import type { ConfirmDialogProps } from '@/types/components/ui';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  line,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Modal
      open={open}
      onClose={onCancel}
      labelledBy={titleId}
      describedBy={descriptionId}
    >
      <Corners />
      <Mascot mood="creep" className={styles.peek} />
      <p className={cx(styles.line, 'whisper')}>{line}</p>
      <h2 id={titleId} className={cx(styles.title, 'headline')}>
        {title}
      </h2>
      <p id={descriptionId} className={styles.description}>
        {description}
      </p>
      <div className={styles.actions}>
        <Button block sound="remove" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="ghost" block onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
      </div>
    </Modal>
  );
}
