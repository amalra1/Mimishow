import type { Dispatch, ReactNode } from 'react';
import type { AppCopy } from '@/types/copy';
import type {
  Category,
  Difficulty,
  GameSetup,
  Player,
  Team,
} from '@/types/game';
import type { MascotMood } from '@/types/mascot';
import type { SetupAction } from '@/types/setup';

export type PlayersCopy = AppCopy['wizard']['players'];

export interface WizardFormProps {
  previous: GameSetup | null;
}

export interface SetupStepProps {
  draft: GameSetup;
  dispatch: Dispatch<SetupAction>;
}

export interface PlayerComposerOptions extends SetupStepProps {
  teamId?: string;
}

export interface PlayerComposerProps extends PlayerComposerOptions {
  label: string;
  copy: PlayersCopy;
}

export interface PlayerRowProps {
  index: number;
  total: number;
  player: Player;
  duplicate: boolean;
  copy: PlayersCopy;
  dispatch: Dispatch<SetupAction>;
}

export interface TeamOption {
  id: string;
  name: string;
  tone: string;
}

export interface TeamCardProps extends SetupStepProps {
  team: Team;
  index: number;
  duplicates: ReadonlySet<string>;
  copy: PlayersCopy;
}

export interface TeamMemberProps {
  player: Player;
  others: readonly TeamOption[];
  duplicate: boolean;
  copy: PlayersCopy;
  dispatch: Dispatch<SetupAction>;
}

export interface TeamsPanelProps extends SetupStepProps {
  copy: PlayersCopy;
  duplicates: ReadonlySet<string>;
}

export interface PhaseFrameProps {
  mood: MascotMood;
  line: string;
  kicker: string;
  title?: string;
  actions: ReactNode;
  children?: ReactNode;
  className?: string;
}

export interface ScoreboardProps {
  highlightId?: string | null;
  className?: string;
}

export type RulesComment = keyof AppCopy['wizard']['rules']['comments'];

export interface FateBadgeProps {
  difficulty: Difficulty;
  category: Category | null;
}
