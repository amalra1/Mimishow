import type { Difficulty } from '@/types/game';

export const TONES = [
  'tone-crimson',
  'tone-gold',
  'tone-slate',
  'tone-plum',
] as const;

export const DIFFICULTY_TONES = {
  easy: 'tone-slate',
  medium: 'tone-gold',
  hard: 'tone-crimson',
} as const satisfies Record<Difficulty, (typeof TONES)[number]>;

export function toneAt(index: number) {
  return TONES[index % TONES.length];
}
