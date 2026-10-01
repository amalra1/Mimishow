import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import type { Category } from '@/types/game';
import type { IconName } from '@/types/icon';
import type { SoundName } from '@/types/sound';

export type ButtonVariant = 'primary' | 'yellow' | 'ghost' | 'quiet';

export type ButtonSize = 'md' | 'lg';

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}

export interface ButtonContentProps {
  children: ReactNode;
  icon?: IconName;
}

export interface ButtonSoundProps {
  sound?: SoundName | null;
}

export interface ButtonProps
  extends
    ButtonStyleProps,
    ButtonContentProps,
    ButtonSoundProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {}

export interface ButtonLinkProps
  extends
    ButtonStyleProps,
    ButtonContentProps,
    ButtonSoundProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string;
}

export interface FieldControlProps {
  id: string;
  className: string;
  'aria-invalid': boolean;
  'aria-describedby'?: string;
}

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  line: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ToastMessage {
  id: number;
  text: string;
}

export interface ToastProps {
  toast: ToastMessage | null;
}

export interface ActTrackProps {
  current: number;
  names: readonly string[];
  label: string;
}

export interface SparkBurstProps {
  active: boolean;
  count?: number;
  className?: string;
}

export interface ChoiceCardProps {
  title: string;
  description: string;
  icon: IconName;
  tone: string;
  selected?: boolean;
  className?: string;
  onSelect: () => void;
}

export interface StageSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (value: number) => string;
  hint?: string;
  onChange: (value: number) => void;
}

export interface CategoryChipsProps {
  label: string;
  hint: string;
  allLabel: string;
  selected: readonly Category[];
  names: Record<Category, string>;
  onToggle: (category: Category) => void;
  onSelectAll: () => void;
}

export interface CurtainCardProps {
  label: string;
  holdingLabel: string;
  hint: string;
  children: ReactNode;
  className?: string;
}

export interface TimerProps {
  seconds: number;
  total: number;
  tense: boolean;
  label: string;
}
