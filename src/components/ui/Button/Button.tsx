'use client';

import type { MouseEvent } from 'react';
import { useSound } from '@/hooks/useSound';
import type { ButtonProps } from '@/types/components/ui';
import ButtonContent from './ButtonContent';
import { buttonClassName } from './buttonClassName';

export default function Button({
  children,
  icon,
  variant,
  size,
  block,
  className,
  sound = 'tap',
  type = 'button',
  onClick,
  ...buttonProps
}: ButtonProps) {
  const { play } = useSound();

  const onPress = (event: MouseEvent<HTMLButtonElement>) => {
    if (sound) play(sound);
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, block, className })}
      onClick={onPress}
      {...buttonProps}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}
