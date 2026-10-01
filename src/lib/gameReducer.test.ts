import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '@/constants/game';
import { gameReducer } from '@/lib/gameReducer';
import { createInitialState } from '@/lib/storage';
import type {
  Difficulty,
  GameAction,
  GameSetup,
  GameState,
} from '@/types/game';

const setup: GameSetup = {
  mode: 'solo',
  players: [
    { id: 'ana', name: 'Ana', teamId: null },
    { id: 'bia', name: 'Bia', teamId: null },
  ],
  teams: [],
  settings: { ...DEFAULT_SETTINGS, targetScore: 4, freeSkips: 1 },
};

function play(actions: GameAction[], state = createInitialState()) {
  return actions.reduce<GameState>(gameReducer, state);
}

const drawn = (wordKey: string) => ({ wordKey, usedWords: [wordKey] });

const ready = (difficulty: Difficulty, key = `food:${difficulty}:0`) =>
  ({ type: 'ready', difficulty, drawn: drawn(key) }) as const;

describe('gameReducer', () => {
  it('goes straight to the word with the drawn difficulty', () => {
    const state = play([{ type: 'start', setup }, ready('medium')]);
    expect(state.turn?.phase).toBe('reveal');
    expect(state.turn?.difficulty).toBe('medium');
    expect(state.turn?.wordKey).toBe('food:medium:0');
  });

  it('gives points to performer and guesser in solo', () => {
    const state = play([
      { type: 'start', setup },
      ready('hard'),
      { type: 'startActing', endsAt: 1000 },
      { type: 'stopActing' },
      { type: 'award', guesserId: 'bia' },
    ]);
    expect(state.turn?.phase).toBe('result');
    expect(state.scores).toEqual({ ana: 3, bia: 3 });
  });

  it('gives nothing when nobody guesses and moves to the next performer', () => {
    const state = play([
      { type: 'start', setup },
      ready('easy'),
      { type: 'award', guesserId: null },
      { type: 'nextTurn' },
    ]);
    expect(state.scores).toEqual({ ana: 0, bia: 0 });
    expect(state.turn?.performerId).toBe('bia');
    expect(state.turn?.phase).toBe('handoff');
  });

  it('refuses paid swaps when the performer has no points to pay', () => {
    const state = play([
      { type: 'start', setup },
      ready('easy'),
      { type: 'skipWord', drawn: drawn('food:easy:1') },
      { type: 'skipWord', drawn: drawn('food:easy:2') },
    ]);
    expect(state.turn?.skips).toBe(1);
    expect(state.turn?.wordKey).toBe('food:easy:1');
    expect(state.scores.ana).toBe(0);
  });

  it('charges a paid swap when the performer can afford it', () => {
    const scored = play([
      { type: 'start', setup },
      ready('hard'),
      { type: 'award', guesserId: 'bia' },
      { type: 'nextTurn' },
      { type: 'nextTurn' },
      ready('easy'),
      { type: 'skipWord', drawn: drawn('food:easy:1') },
      { type: 'skipWord', drawn: drawn('food:easy:2') },
    ]);
    expect(scored.turn?.skips).toBe(2);
    expect(scored.scores.ana).toBe(2);
  });

  it('ends the show the moment someone reaches the target', () => {
    const state = play([
      { type: 'start', setup },
      ready('hard'),
      { type: 'award', guesserId: 'bia' },
      { type: 'nextTurn' },
      ready('easy'),
      { type: 'award', guesserId: 'ana' },
    ]);
    expect(state.status).toBe('finished');
    expect(state.winnerId).toBe('bia');
    expect(state.turn?.outcome).toEqual({ guesserId: 'ana', points: 1 });
    const rematch = gameReducer(state, { type: 'rematch' });
    expect(rematch.scores).toEqual({ ana: 0, bia: 0 });
    expect(rematch.status).toBe('playing');
  });
});
