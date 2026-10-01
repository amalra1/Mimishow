import {
  CATEGORIES,
  DEFAULT_SETTINGS,
  MAX_PLAYERS,
  MIN_TEAMS,
} from '@/constants/game';
import { createId } from '@/lib/id';
import type { GameSetup, Player, Team } from '@/types/game';
import type { SetupAction } from '@/types/setup';

function smallestTeamId(teams: readonly Team[], players: readonly Player[]) {
  const sizes = teams.map(
    ({ id }) => players.filter((player) => player.teamId === id).length,
  );
  return teams[sizes.indexOf(Math.min(...sizes))]?.id ?? null;
}

function distribute(players: readonly Player[], teams: readonly Team[]) {
  return players.map((player, index) => ({
    ...player,
    teamId: teams[index % teams.length]?.id ?? null,
  }));
}

function moveItem<T>(items: readonly T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function createTeams(count: number, names: readonly string[]) {
  return Array.from({ length: count }, (_, index) => ({
    id: createId(),
    name: names[index] ?? String(index + 1),
  }));
}

export function createDraft(
  previous: GameSetup | null,
  teamNames: readonly string[],
): GameSetup {
  if (previous?.players.length) {
    const teams = previous.teams.length
      ? previous.teams
      : createTeams(MIN_TEAMS, teamNames);
    const players = previous.teams.length
      ? previous.players
      : distribute(previous.players, teams);
    return { ...previous, players, teams };
  }
  return {
    mode: 'solo',
    players: [],
    teams: createTeams(MIN_TEAMS, teamNames),
    settings: DEFAULT_SETTINGS,
  };
}

export function setupReducer(draft: GameSetup, action: SetupAction): GameSetup {
  switch (action.type) {
    case 'setMode':
      return { ...draft, mode: action.mode };
    case 'addPlayer': {
      if (draft.players.length >= MAX_PLAYERS) return draft;
      const chosen = draft.teams.some(({ id }) => id === action.teamId);
      const player = {
        id: createId(),
        name: action.name,
        teamId: chosen
          ? (action.teamId ?? null)
          : smallestTeamId(draft.teams, draft.players),
      };
      return { ...draft, players: [...draft.players, player] };
    }
    case 'renamePlayer':
      return {
        ...draft,
        players: draft.players.map((player) =>
          player.id === action.id ? { ...player, name: action.name } : player,
        ),
      };
    case 'removePlayer':
      return {
        ...draft,
        players: draft.players.filter(({ id }) => id !== action.id),
      };
    case 'movePlayer': {
      const from = draft.players.findIndex(({ id }) => id === action.id);
      const to = from + action.offset;
      if (from < 0 || to < 0 || to >= draft.players.length) return draft;
      return { ...draft, players: moveItem(draft.players, from, to) };
    }
    case 'setPlayerTeam':
      if (!draft.teams.some(({ id }) => id === action.teamId)) return draft;
      return {
        ...draft,
        players: draft.players.map((player) =>
          player.id === action.id
            ? { ...player, teamId: action.teamId }
            : player,
        ),
      };
    case 'shuffleTeams': {
      const byId = new Map(draft.players.map((player) => [player.id, player]));
      const ordered = action.order.flatMap((id) => byId.get(id) ?? []);
      if (ordered.length !== draft.players.length) return draft;
      return { ...draft, players: distribute(ordered, draft.teams) };
    }
    case 'setTeamCount': {
      const kept = draft.teams.slice(0, action.count);
      const added = createTeams(action.count, action.names).slice(kept.length);
      const teams = [...kept, ...added];
      const keptIds = new Set(teams.map(({ id }) => id));
      const players = draft.players.reduce<Player[]>(
        (result, player) => [
          ...result,
          player.teamId && keptIds.has(player.teamId)
            ? player
            : { ...player, teamId: smallestTeamId(teams, result) },
        ],
        [],
      );
      return { ...draft, teams, players };
    }
    case 'renameTeam':
      return {
        ...draft,
        teams: draft.teams.map((team) =>
          team.id === action.id ? { ...team, name: action.name } : team,
        ),
      };
    case 'setSettings':
      return { ...draft, settings: { ...draft.settings, ...action.settings } };
    case 'toggleCategory': {
      const { categories } = draft.settings;
      const selected = categories.includes(action.category);
      if (selected && categories.length === 1) return draft;
      const next = CATEGORIES.filter((category) =>
        category === action.category
          ? !selected
          : categories.includes(category),
      );
      return { ...draft, settings: { ...draft.settings, categories: next } };
    }
    case 'selectAllCategories':
      return {
        ...draft,
        settings: { ...draft.settings, categories: [...CATEGORIES] },
      };
  }
}
