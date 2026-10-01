'use client';

import { GAME_MODES } from '@/constants/game';
import { useCopy } from '@/hooks/useCopy';
import ChoiceCard from '@/components/ui/ChoiceCard/ChoiceCard';
import type { SetupStepProps } from '@/types/components/sections';
import styles from './ModeStep.module.css';

const MODE_LOOKS = {
  solo: { icon: 'star', tone: 'tone-crimson' },
  teams: { icon: 'users', tone: 'tone-gold' },
} as const;

export default function ModeStep({ draft, dispatch }: SetupStepProps) {
  const { modes } = useCopy();

  return (
    <div className={styles.modes}>
      {GAME_MODES.map((mode) => (
        <ChoiceCard
          key={mode}
          title={modes[mode].title}
          description={modes[mode].description}
          icon={MODE_LOOKS[mode].icon}
          tone={MODE_LOOKS[mode].tone}
          selected={draft.mode === mode}
          onSelect={() => dispatch({ type: 'setMode', mode })}
        />
      ))}
    </div>
  );
}
