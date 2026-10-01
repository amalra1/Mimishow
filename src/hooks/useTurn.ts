'use client';

import { toneAt } from '@/constants/tones';
import { playerName, roundAt, scorerIdOf, sideName, sides } from '@/lib/game';
import { useGame } from '@/hooks/useGame';

export function useTurn() {
  const game = useGame();
  const { state } = game;
  const performerId = state.turn?.performerId ?? '';
  const sideId = scorerIdOf(state, performerId);
  const sideIndex = sides(state).findIndex(({ id }) => id === sideId);

  return {
    ...game,
    turn: state.turn,
    teams: state.mode === 'teams',
    performerName: playerName(state, performerId),
    sideId,
    sideName: sideName(state, sideId),
    tone: toneAt(Math.max(sideIndex, 0)),
    round: roundAt(state, state.turnIndex),
  };
}
