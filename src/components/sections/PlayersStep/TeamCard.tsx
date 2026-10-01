'use client';

import { MIN_TEAM_PLAYERS, TEAM_NAME_MAX_LENGTH } from '@/constants/game';
import { toneAt } from '@/constants/tones';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { membersOf } from '@/lib/game';
import { normalizeName } from '@/lib/players';
import { useCopy } from '@/hooks/useCopy';
import type { TeamCardProps } from '@/types/components/sections';
import PlayerComposer from './PlayerComposer';
import TeamMember from './TeamMember';
import styles from './TeamsPanel.module.css';

export default function TeamCard({
  draft,
  dispatch,
  team,
  index,
  duplicates,
  copy,
}: TeamCardProps) {
  const { teamDefaults } = useCopy();
  const members = membersOf(draft, team.id);
  const small = members.length < MIN_TEAM_PLAYERS;
  const others = draft.teams.flatMap((other, otherIndex) =>
    other.id === team.id
      ? []
      : [{ id: other.id, name: other.name, tone: toneAt(otherIndex) }],
  );

  const rename = (name: string) =>
    dispatch({ type: 'renameTeam', id: team.id, name });

  return (
    <li className={cx(styles.card, toneAt(index))}>
      <div className={styles.header}>
        <span className={styles.swatch} aria-hidden="true" />
        <input
          className={cx(styles.teamName, 'headline')}
          type="text"
          value={team.name}
          maxLength={TEAM_NAME_MAX_LENGTH}
          aria-label={fill(copy.teamName, { index: index + 1 })}
          autoComplete="off"
          onChange={(event) => rename(event.target.value)}
          onBlur={(event) =>
            rename(normalizeName(event.target.value) || teamDefaults[index])
          }
        />
        <span className={cx(styles.size, small && styles.small, 'label')}>
          {small
            ? fill(copy.teamTooSmall, { min: MIN_TEAM_PLAYERS })
            : fill(copy.teamSize, { count: members.length })}
        </span>
      </div>
      {members.length > 0 ? (
        <ol className={styles.members}>
          {members.map((player) => (
            <TeamMember
              key={player.id}
              player={player}
              others={others}
              duplicate={duplicates.has(player.id)}
              copy={copy}
              dispatch={dispatch}
            />
          ))}
        </ol>
      ) : (
        <p className={cx(styles.vacant, 'whisper')}>{copy.teamEmpty}</p>
      )}
      <PlayerComposer
        draft={draft}
        dispatch={dispatch}
        teamId={team.id}
        label={fill(copy.addTo, { team: team.name })}
        copy={copy}
      />
    </li>
  );
}
