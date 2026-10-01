import type { WIZARD_STEPS } from '@/constants/wizard';
import type { Category, GameMode, Settings } from '@/types/game';

export type WizardStep = (typeof WIZARD_STEPS)[number];

export type SetupAction =
  | { type: 'setMode'; mode: GameMode }
  | { type: 'addPlayer'; name: string; teamId?: string }
  | { type: 'renamePlayer'; id: string; name: string }
  | { type: 'removePlayer'; id: string }
  | { type: 'movePlayer'; id: string; offset: number }
  | { type: 'setPlayerTeam'; id: string; teamId: string }
  | { type: 'shuffleTeams'; order: readonly string[] }
  | { type: 'setTeamCount'; count: number; names: readonly string[] }
  | { type: 'renameTeam'; id: string; name: string }
  | { type: 'setSettings'; settings: Partial<Omit<Settings, 'categories'>> }
  | { type: 'toggleCategory'; category: Category }
  | { type: 'selectAllCategories' };
