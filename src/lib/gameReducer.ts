import {
  canSkip,
  createScores,
  createTurn,
  findWinner,
  performerIdAt,
  scorerIdOf,
  scoreTurn,
  skipCost,
  withPoints,
} from '@/lib/game';
import { createInitialState } from '@/lib/storage';
import type { GameAction, GameSetup, GameState, Turn } from '@/types/game';

function startGame(
  state: GameState,
  setup: GameSetup,
  usedWords: string[],
): GameState {
  return {
    ...state,
    ...setup,
    status: 'playing',
    scores: createScores(setup),
    turnIndex: 0,
    turn: createTurn(performerIdAt(setup, 0)),
    usedWords,
    winnerId: null,
  };
}

function updateTurn(state: GameState, changes: Partial<Turn>): GameState {
  if (!state.turn) return state;
  return { ...state, turn: { ...state.turn, ...changes } };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'start':
      return startGame(state, action.setup, state.usedWords);
    case 'ready':
      return {
        ...updateTurn(state, {
          phase: 'reveal',
          difficulty: action.difficulty,
          wordKey: action.drawn.wordKey,
        }),
        usedWords: action.drawn.usedWords,
      };
    case 'skipWord': {
      if (!state.turn || !canSkip(state)) return state;
      const skips = state.turn.skips + 1;
      const cost = skipCost(skips, state.settings.freeSkips);
      const scorerId = scorerIdOf(state, state.turn.performerId);
      return {
        ...updateTurn(state, { skips, wordKey: action.drawn.wordKey }),
        usedWords: action.drawn.usedWords,
        scores: withPoints(state.scores, [scorerId], -cost),
      };
    }
    case 'startActing':
      return updateTurn(state, { phase: 'acting', endsAt: action.endsAt });
    case 'stopActing':
      return updateTurn(state, { phase: 'scoring', endsAt: null });
    case 'award': {
      if (!state.turn) return state;
      const { scores, outcome } = scoreTurn(state, action.guesserId);
      const priority = [
        scorerIdOf(state, state.turn.performerId),
        action.guesserId ?? '',
      ];
      const winnerId = findWinner(scores, state.settings.targetScore, priority);
      return {
        ...updateTurn(state, { phase: 'result', outcome }),
        status: winnerId ? 'finished' : state.status,
        scores,
        winnerId,
      };
    }
    case 'nextTurn': {
      const turnIndex = state.turnIndex + 1;
      return {
        ...state,
        turnIndex,
        turn: createTurn(performerIdAt(state, turnIndex)),
      };
    }
    case 'rematch':
      return startGame(state, state, state.usedWords);
    case 'reset':
      return { ...createInitialState(), usedWords: state.usedWords };
  }
}
