import { DEFAULT_SETTINGS } from '@/constants/game';
import { STATE_STORAGE_KEY, STATE_VERSION } from '@/constants/storage';
import type { GameState } from '@/types/game';

export function createInitialState(): GameState {
  return {
    version: STATE_VERSION,
    status: 'idle',
    mode: 'solo',
    players: [],
    teams: [],
    settings: DEFAULT_SETTINGS,
    scores: {},
    turnIndex: 0,
    turn: null,
    usedWords: [],
    winnerId: null,
  };
}

function isGameState(value: unknown): value is GameState {
  if (typeof value !== 'object' || value === null) return false;
  const data = value as Partial<GameState>;
  return (
    data.version === STATE_VERSION &&
    typeof data.status === 'string' &&
    Array.isArray(data.players) &&
    Array.isArray(data.teams) &&
    Array.isArray(data.usedWords) &&
    typeof data.scores === 'object' &&
    data.scores !== null &&
    typeof data.settings === 'object' &&
    data.settings !== null
  );
}

export function readState(): GameState | null {
  try {
    const raw = window.localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!isGameState(data)) return null;
    return { ...createInitialState(), ...data };
  } catch {
    return null;
  }
}

export function writeState(state: GameState) {
  try {
    window.localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function readLocal(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {}
}

const localListeners = new Set<() => void>();

export function subscribeLocal(listener: () => void) {
  localListeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    localListeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

export function setLocal(key: string, value: string | null) {
  writeLocal(key, value);
  localListeners.forEach((listener) => listener());
}
