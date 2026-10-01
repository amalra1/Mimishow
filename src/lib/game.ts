import { DIFFICULTY_POINTS, SKIP_PENALTY } from '@/constants/game';
import type {
  GameSetup,
  GameState,
  Standing,
  Turn,
  TurnOutcome,
} from '@/types/game';

export function createTurn(performerId: string): Turn {
  return {
    phase: 'handoff',
    performerId,
    difficulty: null,
    wordKey: null,
    skips: 0,
    endsAt: null,
    outcome: null,
  };
}

export function sides(setup: GameSetup) {
  return setup.mode === 'teams' ? setup.teams : setup.players;
}

export function createScores(setup: GameSetup) {
  return Object.fromEntries(sides(setup).map(({ id }) => [id, 0]));
}

export function membersOf(setup: GameSetup, teamId: string) {
  return setup.players.filter((player) => player.teamId === teamId);
}

export function performerIdAt(setup: GameSetup, turnIndex: number) {
  if (setup.mode === 'solo') {
    return setup.players[turnIndex % setup.players.length].id;
  }
  const { teams } = setup;
  const team = teams[turnIndex % teams.length];
  const members = membersOf(setup, team.id);
  return members[Math.floor(turnIndex / teams.length) % members.length].id;
}

export function roundAt(setup: GameSetup, turnIndex: number) {
  return Math.floor(turnIndex / sides(setup).length) + 1;
}

export function scorerIdOf(setup: GameSetup, playerId: string) {
  if (setup.mode === 'solo') return playerId;
  return setup.players.find(({ id }) => id === playerId)?.teamId ?? playerId;
}

export function skipCost(skips: number, freeSkips: number) {
  return skips > freeSkips ? SKIP_PENALTY : 0;
}

export function canSkip(state: GameState) {
  const { turn } = state;
  if (!turn) return false;
  const cost = skipCost(turn.skips + 1, state.settings.freeSkips);
  const score = state.scores[scorerIdOf(state, turn.performerId)] ?? 0;
  return score >= cost;
}

export function withPoints(
  scores: Record<string, number>,
  ids: readonly string[],
  points: number,
) {
  const next = { ...scores };
  ids.forEach((id) => {
    next[id] = Math.max((next[id] ?? 0) + points, 0);
  });
  return next;
}

export function scoreTurn(state: GameState, guesserId: string | null) {
  const { turn } = state;
  if (!turn?.difficulty || !guesserId) {
    return { scores: state.scores, outcome: { guesserId: null, points: 0 } };
  }
  const points = DIFFICULTY_POINTS[turn.difficulty];
  const performerSide = scorerIdOf(state, turn.performerId);
  const ids =
    state.mode === 'solo' ? [performerSide, guesserId] : [performerSide];
  const outcome: TurnOutcome = { guesserId, points };
  return { scores: withPoints(state.scores, ids, points), outcome };
}

export function findWinner(
  scores: Record<string, number>,
  targetScore: number,
  priority: readonly string[],
) {
  const reached = Object.entries(scores).filter(
    ([, score]) => score >= targetScore,
  );
  if (!reached.length) return null;
  const best = Math.max(...reached.map(([, score]) => score));
  const leaders = reached.filter(([, score]) => score === best);
  const preferred = priority.find((id) => leaders.some(([key]) => key === id));
  return preferred ?? leaders[0][0];
}

export function standings(state: GameState): Standing[] {
  return sides(state)
    .map(({ id, name }, tone) => ({
      id,
      name,
      score: state.scores[id] ?? 0,
      tone,
    }))
    .sort((a, b) => b.score - a.score);
}

export function sideName(setup: GameSetup, id: string | null) {
  if (!id) return '';
  return sides(setup).find((side) => side.id === id)?.name ?? '';
}

export function playerName(setup: GameSetup, id: string) {
  return setup.players.find((player) => player.id === id)?.name ?? '';
}
