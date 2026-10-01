import { MIN_PLAYERS, MIN_TEAM_PLAYERS } from '@/constants/game';
import { membersOf } from '@/lib/game';
import { findDuplicateIds, normalizeName } from '@/lib/players';
import type { GameSetup } from '@/types/game';
import type { WizardStep } from '@/types/setup';

export function smallTeamIds(draft: GameSetup) {
  return new Set(
    draft.teams
      .filter(({ id }) => membersOf(draft, id).length < MIN_TEAM_PLAYERS)
      .map(({ id }) => id),
  );
}

function hasValidPlayers(draft: GameSetup) {
  return (
    draft.players.length >= MIN_PLAYERS &&
    draft.players.every(({ name }) => normalizeName(name)) &&
    findDuplicateIds(draft.players).size === 0
  );
}

function hasValidTeams(draft: GameSetup) {
  return (
    draft.teams.every(({ name }) => normalizeName(name)) &&
    smallTeamIds(draft).size === 0
  );
}

export function isStepComplete(step: WizardStep, draft: GameSetup) {
  if (step === 'rules') return draft.settings.categories.length > 0;
  if (step !== 'players') return true;
  if (!hasValidPlayers(draft)) return false;
  return draft.mode === 'solo' || hasValidTeams(draft);
}

export function toGameSetup(draft: GameSetup): GameSetup {
  const players = draft.players.map((player) => ({
    ...player,
    name: normalizeName(player.name),
    teamId: draft.mode === 'teams' ? player.teamId : null,
  }));
  const teams =
    draft.mode === 'teams'
      ? draft.teams.map((team) => ({ ...team, name: normalizeName(team.name) }))
      : [];
  return { ...draft, players, teams };
}
