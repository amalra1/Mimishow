import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '@/constants/game';
import {
  canSkip,
  createTurn,
  findWinner,
  performerIdAt,
  roundAt,
  scorerIdOf,
  skipCost,
  withPoints,
} from '@/lib/game';
import { createInitialState } from '@/lib/storage';
import type { GameSetup } from '@/types/game';

const solo: GameSetup = {
  mode: 'solo',
  players: [
    { id: 'ana', name: 'Ana', teamId: null },
    { id: 'bia', name: 'Bia', teamId: null },
    { id: 'caio', name: 'Caio', teamId: null },
  ],
  teams: [],
  settings: DEFAULT_SETTINGS,
};

const teams: GameSetup = {
  mode: 'teams',
  players: [
    { id: 'ana', name: 'Ana', teamId: 'pink' },
    { id: 'bia', name: 'Bia', teamId: 'gold' },
    { id: 'caio', name: 'Caio', teamId: 'pink' },
    { id: 'duda', name: 'Duda', teamId: 'gold' },
    { id: 'edu', name: 'Edu', teamId: 'pink' },
  ],
  teams: [
    { id: 'pink', name: 'Pink' },
    { id: 'gold', name: 'Gold' },
  ],
  settings: DEFAULT_SETTINGS,
};

describe('game', () => {
  it('rotates players in the order they were added', () => {
    const order = [0, 1, 2, 3].map((index) => performerIdAt(solo, index));
    expect(order).toEqual(['ana', 'bia', 'caio', 'ana']);
    expect(roundAt(solo, 3)).toBe(2);
  });

  it('alternates teams and rotates the performer inside each team', () => {
    const order = [0, 1, 2, 3, 4, 5, 6].map((index) =>
      performerIdAt(teams, index),
    );
    expect(order).toEqual(['ana', 'bia', 'caio', 'duda', 'edu', 'bia', 'ana']);
  });

  it('scores for the player in solo and for the team in teams', () => {
    expect(scorerIdOf(solo, 'bia')).toBe('bia');
    expect(scorerIdOf(teams, 'bia')).toBe('gold');
  });

  it('charges only the skips past the free ones', () => {
    expect([1, 3, 4, 5].map((skips) => skipCost(skips, 3))).toEqual([
      0, 0, 1, 1,
    ]);
  });

  it('never lets a score drop below zero', () => {
    expect(withPoints({ ana: 0, bia: 2 }, ['ana', 'bia'], -1)).toEqual({
      ana: 0,
      bia: 1,
    });
  });

  it('picks the highest score and breaks ties by priority', () => {
    expect(findWinner({ ana: 29, bia: 31 }, 30, [])).toBe('bia');
    expect(findWinner({ ana: 30, bia: 30 }, 30, ['bia', 'ana'])).toBe('bia');
    expect(findWinner({ ana: 12 }, 30, [])).toBeNull();
  });

  it('only lets a paid swap happen when the side can afford it', () => {
    const base = {
      ...createInitialState(),
      ...solo,
      settings: { ...DEFAULT_SETTINGS, freeSkips: 1 },
      turn: { ...createTurn('ana'), skips: 1 },
    };
    expect(canSkip({ ...base, scores: { ana: 0 } })).toBe(false);
    expect(canSkip({ ...base, scores: { ana: 1 } })).toBe(true);
    expect(canSkip({ ...base, turn: createTurn('ana'), scores: {} })).toBe(
      true,
    );
  });
});
