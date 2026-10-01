'use client';

import { PLAYER_NAME_MAX_LENGTH } from '@/constants/game';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import Icon from '@/components/ornaments/Icon/Icon';
import type { TeamMemberProps } from '@/types/components/sections';
import { usePlayerEditor } from './usePlayerEditor';
import styles from './TeamsPanel.module.css';

export default function TeamMember({
  player,
  others,
  duplicate,
  copy,
  dispatch,
}: TeamMemberProps) {
  const { id, name } = player;
  const { play, rename, remove, onBlur, onKeyDown } = usePlayerEditor(
    player,
    dispatch,
  );

  const moveTo = (teamId: string) => {
    play('move');
    dispatch({ type: 'setPlayerTeam', id, teamId });
  };

  return (
    <li className={cx(styles.member, duplicate && styles.duplicate)}>
      <input
        className={styles.memberName}
        type="text"
        value={name}
        maxLength={PLAYER_NAME_MAX_LENGTH}
        aria-label={fill(copy.renameMember, { name })}
        aria-invalid={duplicate}
        autoComplete="off"
        autoCapitalize="words"
        enterKeyHint="done"
        onChange={(event) => rename(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {duplicate && (
        <span className={cx(styles.tag, 'label')}>{copy.duplicate}</span>
      )}
      {others.map((team) => {
        const label = fill(copy.moveTo, { name, team: team.name });
        return (
          <button
            key={team.id}
            type="button"
            className={cx(styles.moveTo, team.tone)}
            onClick={() => moveTo(team.id)}
            aria-label={label}
            title={label}
          >
            <Icon name="arrowRight" className={styles.moveIcon} />
            <span className={styles.moveSwatch} aria-hidden="true" />
          </button>
        );
      })}
      <button
        type="button"
        className={styles.remove}
        onClick={remove}
        aria-label={fill(copy.remove, { name })}
      >
        <Icon name="close" className={styles.removeIcon} />
      </button>
    </li>
  );
}
