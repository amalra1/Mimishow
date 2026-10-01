'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './SparkBurst.module.css';

const SPREAD = 0.4;

export function useSparkBurstAnimation(
  ref: RefObject<HTMLDivElement | null>,
  active: boolean,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!active || !root) return;
      const sparks = gsap.utils.toArray<Element>(`.${styles.spark}`, root);
      const reach = Math.min(window.innerWidth, window.innerHeight) * SPREAD;

      gsap
        .timeline()
        .fromTo(
          sparks,
          { x: 0, y: 0, scale: 0, rotate: 0, autoAlpha: 1 },
          {
            x: () => gsap.utils.random(-reach, reach),
            y: () => gsap.utils.random(-reach, reach * 0.4),
            rotate: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.6, 1.4),
            duration: () => gsap.utils.random(0.8, 1.2),
            ease: 'expo.out',
          },
        )
        .to(
          sparks,
          { y: '+=40', autoAlpha: 0, duration: 0.8, stagger: 0.02 },
          '-=0.4',
        );
    },
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );
}
