'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useSound } from '@/hooks/useSound';
import ButtonContent from '@/components/ui/Button/ButtonContent';
import { buttonClassName } from '@/components/ui/Button/buttonClassName';
import type { ButtonLinkProps } from '@/types/components/ui';

export default function ButtonLink({
  children,
  icon,
  variant,
  size,
  block,
  className,
  href,
  sound = 'tap',
  onClick,
  ...anchorProps
}: ButtonLinkProps) {
  const { play } = useSound();

  const onPress = (event: MouseEvent<HTMLAnchorElement>) => {
    if (sound) play(sound);
    onClick?.(event);
  };

  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, block, className })}
      onClick={onPress}
      {...anchorProps}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}
