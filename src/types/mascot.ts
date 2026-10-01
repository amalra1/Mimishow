import type { MASCOT_MOODS } from '@/constants/mascot';
import type { AppCopy } from '@/types/copy';

export type MascotMood = (typeof MASCOT_MOODS)[number];

export type MascotMoment = keyof AppCopy['mascot'];

export type MimiSize = 'sm' | 'md' | 'lg';
