import type {
  CATEGORIES,
  DIFFICULTIES,
  GAME_MODES,
  GAME_STATUSES,
  TURN_PHASES,
} from '@/constants/game';

export type GameMode = (typeof GAME_MODES)[number];

export type GameStatus = (typeof GAME_STATUSES)[number];

export type Difficulty = (typeof DIFFICULTIES)[number];

export type Category = (typeof CATEGORIES)[number];

export type TurnPhase = (typeof TURN_PHASES)[number];

export type WordBank = Record<Category, Record<Difficulty, string[]>>;

export type RandomSource = () => number;

export interface Player {
  id: string;
  name: string;
  teamId: string | null;
}

export interface Team {
  id: string;
  name: string;
}

export interface Settings {
  targetScore: number;
  turnSeconds: number;
  freeSkips: number;
  categories: Category[];
}

export interface GameSetup {
  mode: GameMode;
  players: Player[];
  teams: Team[];
  settings: Settings;
}

export interface TurnOutcome {
  guesserId: string | null;
  points: number;
}

export interface Turn {
  phase: TurnPhase;
  performerId: string;
  difficulty: Difficulty | null;
  wordKey: string | null;
  skips: number;
  endsAt: number | null;
  outcome: TurnOutcome | null;
}

export interface GameState extends GameSetup {
  version: number;
  status: GameStatus;
  scores: Record<string, number>;
  turnIndex: number;
  turn: Turn | null;
  usedWords: string[];
  winnerId: string | null;
}

export interface DrawnWord {
  wordKey: string;
  usedWords: string[];
}

export interface Standing {
  id: string;
  name: string;
  score: number;
  tone: number;
}

export type GameAction =
  | { type: 'start'; setup: GameSetup }
  | { type: 'ready'; difficulty: Difficulty; drawn: DrawnWord }
  | { type: 'skipWord'; drawn: DrawnWord }
  | { type: 'startActing'; endsAt: number }
  | { type: 'stopActing' }
  | { type: 'award'; guesserId: string | null }
  | { type: 'nextTurn' }
  | { type: 'rematch' }
  | { type: 'reset' };

export interface GameContextValue {
  state: GameState;
  hydrated: boolean;
  start: (setup: GameSetup) => void;
  ready: () => void;
  skipWord: () => void;
  startActing: () => void;
  stopActing: () => void;
  award: (guesserId: string | null) => void;
  nextTurn: () => void;
  rematch: () => void;
  reset: () => void;
}
