'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { introReady } from '@/lib/preloader';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Home.module.css';

export function useHomeAnimation(ref: RefObject<HTMLElement | null>) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const intro = q(`.${styles.intro}`);
      const mimi = q(`.${styles.mimi}`);
      const rest = q(
        `.${styles.tagline}, .${styles.actions} > *, .${styles.credit}`,
      );
      gsap.set([intro, mimi, rest], { autoAlpha: 0 });

      let cancelled = false;
      introReady.then(() => {
        if (cancelled) return;
        gsap
          .timeline()
          .fromTo(
            intro,
            { autoAlpha: 0, filter: 'blur(12px)', scale: 1.08 },
            { autoAlpha: 1, filter: 'blur(0px)', scale: 1, duration: 1.1 },
          )
          .fromTo(
            mimi,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' },
            0.35,
          )
          .fromTo(
            rest,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
            0.7,
          );
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: ref },
  );
}
