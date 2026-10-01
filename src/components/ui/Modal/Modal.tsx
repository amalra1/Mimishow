'use client';

import { useEffect, useRef } from 'react';
import type { MouseEvent, SyntheticEvent } from 'react';
import type { ModalProps } from '@/types/components/ui';
import styles from './Modal.module.css';

export default function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={onCancel}
      onClick={onBackdropClick}
    >
      {open && <div className={styles.panel}>{children}</div>}
    </dialog>
  );
}
