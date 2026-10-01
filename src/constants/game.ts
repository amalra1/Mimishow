import type { Difficulty, Settings } from '@/types/game';

export const GAME_MODES = ['solo', 'teams'] as const;

export const GAME_STATUSES = ['idle', 'playing', 'finished'] as const;

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export const CATEGORIES = [
  'animals',
  'food',
  'objects',
  'places',
  'jobs',
  'characters',
  'sports',
  'party',
  'nature',
  'transport',
] as const;

export const TURN_PHASES = [
  'handoff',
  'reveal',
  'acting',
  'scoring',
  'result',
] as const;

export const DIFFICULTY_POINTS = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const satisfies Record<Difficulty, number>;

export const MIN_PLAYERS = 2;

export const MAX_PLAYERS = 15;

export const MIN_TEAMS = 2;

export const MAX_TEAMS = 4;

export const MIN_TEAM_PLAYERS = 2;

export const PLAYER_NAME_MAX_LENGTH = 24;

export const TEAM_NAME_MAX_LENGTH = 20;

export const TARGET_SCORE_RANGE = { min: 10, max: 60, step: 5 };

export const TURN_SECONDS_RANGE = { min: 30, max: 180, step: 15 };

export const FREE_SKIPS_RANGE = { min: 0, max: 5, step: 1 };

export const DEFAULT_SETTINGS: Settings = {
  targetScore: 30,
  turnSeconds: 60,
  freeSkips: 3,
  categories: [...CATEGORIES],
};

export const SKIP_PENALTY = 1;

export const TENSE_SECONDS = 10;

export const WORD_KEY_SEPARATOR = ':';
