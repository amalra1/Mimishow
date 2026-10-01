'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { releaseIntro } from '@/lib/preloader';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Preloader.module.css';

const ENTER_ROTATION = -120;
const SPIN_ROTATION = 360;
const LEAVE_ROTATION = '+=90';
const STAMP_SCALE = 2.2;
const STAMP_ROTATION = -30;
const RING_START_SCALE = 0.6;
const RING_END_SCALE = 2.6;
const BLINK_SCALE_Y = 0.08;
const NOD_ROTATION = 14;

export function usePreloaderAnimation(
  ref: RefObject<HTMLDivElement | null>,
  onDone: () => void,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      root.style.animation = 'none';

      const [emblem, eye, mask] = gsap.utils.toArray<Element>(
        `.${styles.symbol}`,
        root,
      );
      const ring = root.querySelector(`.${styles.ring}`);
      const timeline = gsap.timeline({ onComplete: onDone });

      const leave = (symbol: Element, position?: string) =>
        timeline.to(
          symbol,
          {
            scale: 0,
            rotate: LEAVE_ROTATION,
            duration: 0.18,
            ease: 'power3.in',
          },
          position,
        );

      const stamp = (symbol: Element) =>
        timeline
          .fromTo(
            symbol,
            { scale: STAMP_SCALE, rotate: STAMP_ROTATION, autoAlpha: 0 },
            {
              scale: 1,
              rotate: 0,
              autoAlpha: 1,
              duration: 0.3,
              ease: 'back.out(2.5)',
            },
          )
          .fromTo(
            ring,
            { scale: RING_START_SCALE, autoAlpha: 1 },
            {
              scale: RING_END_SCALE,
              autoAlpha: 0,
              duration: 0.45,
              ease: 'power2.out',
            },
            '<0.1',
          );

      timeline
        .fromTo(
          emblem,
          { scale: 0, rotate: ENTER_ROTATION, autoAlpha: 1 },
          { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.8)' },
        )
        .to(emblem, {
          rotate: SPIN_ROTATION,
          duration: 0.5,
          ease: 'power2.inOut',
        });

      leave(emblem);
      stamp(eye);
      timeline.to(
        eye,
        {
          scaleY: BLINK_SCALE_Y,
          duration: 0.07,
          repeat: 1,
          yoyo: true,
          ease: 'power1.inOut',
        },
        '-=0.2',
      );

      leave(eye, '+=0.08');
      stamp(mask);
      timeline
        .to(
          mask,
          {
            keyframes: [
              { rotate: -NOD_ROTATION, duration: 0.1 },
              { rotate: NOD_ROTATION, duration: 0.14 },
              { rotate: 0, duration: 0.1 },
            ],
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .to(mask, {
          scale: 0,
          rotate: LEAVE_ROTATION,
          duration: 0.18,
          ease: 'power3.in',
        })
        .add(releaseIntro)
        .to(root, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, '<');
    },
    { scope: ref },
  );
}
