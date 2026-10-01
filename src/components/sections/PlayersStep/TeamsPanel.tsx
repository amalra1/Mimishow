'use client';

import { MAX_TEAMS, MIN_PLAYERS, MIN_TEAMS } from '@/constants/game';
import { shuffle } from '@/lib/random';
import { useCopy } from '@/hooks/useCopy';
import Button from '@/components/ui/Button/Button';
import StageSlider from '@/components/ui/StageSlider/StageSlider';
import type { TeamsPanelProps } from '@/types/components/sections';
import TeamCard from './TeamCard';
import styles from './TeamsPanel.module.css';

export default function TeamsPanel({
  draft,
  dispatch,
  copy,
  duplicates,
}: TeamsPanelProps) {
  const { teamDefaults } = useCopy();

  const shuffleTeams = () =>
    dispatch({
      type: 'shuffleTeams',
      order: shuffle(draft.players.map(({ id }) => id)),
    });

  return (
    <div className={styles.teams}>
      <StageSlider
        label={copy.teamsLabel}
        min={MIN_TEAMS}
        max={MAX_TEAMS}
        step={1}
        value={draft.teams.length}
        format={String}
        onChange={(count) =>
          dispatch({ type: 'setTeamCount', count, names: teamDefaults })
        }
      />
      <Button
        variant="ghost"
        block
        icon="shuffle"
        sound="shuffle"
        disabled={draft.players.length < MIN_PLAYERS}
        onClick={shuffleTeams}
      >
        {copy.shuffle}
      </Button>
      <ul className={styles.cards}>
        {draft.teams.map((team, index) => (
          <TeamCard
            key={team.id}
            draft={draft}
            dispatch={dispatch}
            team={team}
            index={index}
            duplicates={duplicates}
            copy={copy}
          />
        ))}
      </ul>
    </div>
  );
}
