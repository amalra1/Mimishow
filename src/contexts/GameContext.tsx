'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
} from 'react';
import { DEFAULT_LANGUAGE } from '@/constants/language';
import { wordBanks } from '@/data/words';
import { drawWord, randomDifficulty } from '@/lib/deck';
import { gameReducer } from '@/lib/gameReducer';
import { createInitialState, readState, writeState } from '@/lib/storage';
import type { GameContextValue, GameSetup } from '@/types/game';
import type { GameProviderProps } from '@/types/components/providers';

const MS_PER_SECOND = 1000;

export const GameContext = createContext<GameContextValue | undefined>(
  undefined,
);

function loadState() {
  if (typeof window === 'undefined') return createInitialState();
  return readState() ?? createInitialState();
}

function subscribeNothing() {
  return () => {};
}

function isClient() {
  return true;
}

function isServer() {
  return false;
}

const DECK = wordBanks[DEFAULT_LANGUAGE];

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);
  const hydrated = useSyncExternalStore(subscribeNothing, isClient, isServer);
  const { usedWords, turn, settings } = state;

  useEffect(() => {
    if (hydrated) writeState(state);
  }, [state, hydrated]);

  const ready = useCallback(() => {
    const difficulty = randomDifficulty();
    dispatch({
      type: 'ready',
      difficulty,
      drawn: drawWord(difficulty, settings.categories, usedWords, DECK),
    });
  }, [settings.categories, usedWords]);

  const skipWord = useCallback(() => {
    const difficulty = turn?.difficulty;
    if (!difficulty) return;
    dispatch({
      type: 'skipWord',
      drawn: drawWord(difficulty, settings.categories, usedWords, DECK),
    });
  }, [turn?.difficulty, settings.categories, usedWords]);

  const startActing = useCallback(
    () =>
      dispatch({
        type: 'startActing',
        endsAt: Date.now() + settings.turnSeconds * MS_PER_SECOND,
      }),
    [settings.turnSeconds],
  );

  const actions = useMemo(
    () => ({
      start: (setup: GameSetup) => dispatch({ type: 'start', setup }),
      stopActing: () => dispatch({ type: 'stopActing' }),
      award: (guesserId: string | null) =>
        dispatch({ type: 'award', guesserId }),
      nextTurn: () => dispatch({ type: 'nextTurn' }),
      rematch: () => dispatch({ type: 'rematch' }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  );

  return (
    <GameContext.Provider
      value={{
        state,
        hydrated,
        ready,
        skipWord,
        startActing,
        ...actions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
