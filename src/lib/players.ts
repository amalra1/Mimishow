import type { Player } from '@/types/game';

export function normalizeName(name: string) {
  return name.replace(/\s+/g, ' ').trim();
}

export function nameKey(name: string) {
  return normalizeName(name).toLocaleLowerCase();
}

export function findDuplicateIds(players: readonly Player[]) {
  const idsByKey = new Map<string, string[]>();
  players.forEach(({ id, name }) => {
    const key = nameKey(name);
    if (!key) return;
    idsByKey.set(key, [...(idsByKey.get(key) ?? []), id]);
  });
  return new Set([...idsByKey.values()].filter((ids) => ids.length > 1).flat());
}
