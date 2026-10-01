'use client';

import { useRef } from 'react';
import { MAIN_CONTENT_ID } from '@/constants/routes';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';

export function useRouteIrisAnimation(pathname: string) {
  const previous = useRef(pathname);

  useMediaAnimation(
    () => {
      if (previous.current === pathname) return;
      previous.current = pathname;
      const main = document.getElementById(MAIN_CONTENT_ID);
      if (!main) return;

      gsap.fromTo(
        main,
        { clipPath: 'circle(0% at 50% 40%)' },
        {
          clipPath: 'circle(150% at 50% 40%)',
          duration: 0.85,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
        },
      );
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
}
