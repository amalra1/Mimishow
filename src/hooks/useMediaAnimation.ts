'use client';

import { MEDIA } from '@/constants/media';
import { gsap, useGSAP } from '@/lib/gsap';
import type {
  MediaAnimationOptions,
  MediaAnimationSetup,
  MediaConditions,
} from '@/types/hooks';

export function useMediaAnimation(
  setup: MediaAnimationSetup,
  options: MediaAnimationOptions = {},
) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MEDIA, (context) => {
      const conditions: MediaConditions = context.conditions ?? {};
      if (conditions.reduce) return;
      return setup(conditions);
    });
  }, options);
}
