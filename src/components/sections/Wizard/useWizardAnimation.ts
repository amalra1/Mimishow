'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Wizard.module.css';

export function useWizardAnimation(
  ref: RefObject<HTMLElement | null>,
  step: number,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      gsap
        .timeline()
        .from(q(`.${styles.heading} > *`), {
          autoAlpha: 0,
          filter: 'blur(10px)',
          y: 10,
          duration: 0.7,
          stagger: 0.08,
          clearProps: 'filter',
        })
        .from(
          q(`.${styles.panel} > * > *`),
          { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.05 },
          0.15,
        );
    },
    { scope: ref, dependencies: [step], revertOnUpdate: true },
  );
}
