import { describe, expect, it } from 'vitest';
import { CATEGORIES } from '@/constants/game';
import { isStepComplete, toGameSetup } from '@/lib/setup';
import { createDraft, setupReducer } from '@/lib/setupReducer';
import type { GameSetup } from '@/types/game';
import type { SetupAction } from '@/types/setup';

const NAMES = ['Pink', 'Gold', 'Teal', 'Violet'];

function build(actions: SetupAction[]) {
  return actions.reduce<GameSetup>(setupReducer, createDraft(null, NAMES));
}

const add = (name: string): SetupAction => ({ type: 'addPlayer', name });

describe('setupReducer', () => {
  it('spreads new players across the smallest teams', () => {
    const draft = build([add('Ana'), add('Bia'), add('Caio'), add('Duda')]);
    const [pink, gold] = draft.teams;
    expect(draft.players.map(({ teamId }) => teamId)).toEqual([
      pink.id,
      gold.id,
      pink.id,
      gold.id,
    ]);
  });

  it('moves players and keeps them inside the list', () => {
    const draft = build([add('Ana'), add('Bia')]);
    const [ana] = draft.players;
    const moved = setupReducer(draft, {
      type: 'movePlayer',
      id: ana.id,
      offset: 1,
    });
    expect(moved.players.map(({ name }) => name)).toEqual(['Bia', 'Ana']);
    expect(
      setupReducer(moved, { type: 'movePlayer', id: ana.id, offset: 1 }),
    ).toBe(moved);
  });

  it('adds a player straight into the chosen team', () => {
    const base = build([]);
    const [, gold] = base.teams;
    const draft = setupReducer(base, {
      type: 'addPlayer',
      name: 'Ana',
      teamId: gold.id,
    });
    expect(draft.players[0].teamId).toBe(gold.id);
  });

  it('moves a player to another team and ignores unknown teams', () => {
    const draft = build([add('Ana'), add('Bia')]);
    const [, gold] = draft.teams;
    const [ana] = draft.players;
    const moved = setupReducer(draft, {
      type: 'setPlayerTeam',
      id: ana.id,
      teamId: gold.id,
    });
    expect(moved.players.map(({ teamId }) => teamId)).toEqual([
      gold.id,
      gold.id,
    ]);
    expect(
      setupReducer(moved, { type: 'setPlayerTeam', id: ana.id, teamId: 'x' }),
    ).toBe(moved);
  });

  it('shuffles players into balanced teams in the given order', () => {
    const draft = build([add('Ana'), add('Bia'), add('Caio'), add('Duda')]);
    const [pink, gold] = draft.teams;
    const order = [...draft.players].reverse().map(({ id }) => id);
    const shuffled = setupReducer(draft, { type: 'shuffleTeams', order });
    expect(shuffled.players.map(({ name }) => name)).toEqual([
      'Duda',
      'Caio',
      'Bia',
      'Ana',
    ]);
    expect(shuffled.players.map(({ teamId }) => teamId)).toEqual([
      pink.id,
      gold.id,
      pink.id,
      gold.id,
    ]);
  });

  it('rehomes players when a team is removed', () => {
    const draft = build([
      { type: 'setTeamCount', count: 3, names: NAMES },
      add('Ana'),
      add('Bia'),
      add('Caio'),
    ]);
    const smaller = setupReducer(draft, {
      type: 'setTeamCount',
      count: 2,
      names: NAMES,
    });
    const teamIds = new Set(smaller.teams.map(({ id }) => id));
    expect(
      smaller.players.every(({ teamId }) => teamIds.has(teamId ?? '')),
    ).toBe(true);
  });

  it('requires two players per team and unique names', () => {
    const solo = build([add('Ana'), add('ana')]);
    expect(isStepComplete('players', solo)).toBe(false);
    const teams = build([
      { type: 'setMode', mode: 'teams' },
      add('Ana'),
      add('Bia'),
      add('Caio'),
    ]);
    expect(isStepComplete('players', teams)).toBe(false);
    expect(isStepComplete('players', setupReducer(teams, add('Duda')))).toBe(
      true,
    );
  });

  it('drops teams from solo games', () => {
    const setup = toGameSetup(build([add(' Ana  '), add('Bia')]));
    expect(setup.teams).toEqual([]);
    expect(setup.players[0]).toMatchObject({ name: 'Ana', teamId: null });
  });

  it('keeps at least one category selected', () => {
    const one = build([]);
    const onlyFood = one.settings.categories
      .filter((category) => category !== 'food')
      .reduce<GameSetup>(
        (draft, category) =>
          setupReducer(draft, { type: 'toggleCategory', category }),
        one,
      );
    expect(onlyFood.settings.categories).toEqual(['food']);
    const still = setupReducer(onlyFood, {
      type: 'toggleCategory',
      category: 'food',
    });
    expect(still.settings.categories).toEqual(['food']);
    const all = setupReducer(still, { type: 'selectAllCategories' });
    expect(all.settings.categories.length).toBe(CATEGORIES.length);
  });
});
