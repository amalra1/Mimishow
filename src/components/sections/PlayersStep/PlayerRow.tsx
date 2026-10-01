'use client';

import { PLAYER_NAME_MAX_LENGTH } from '@/constants/game';
import { cx } from '@/lib/classNames';
import { fill, padIndex } from '@/lib/format';
import Icon from '@/components/ornaments/Icon/Icon';
import type { PlayerRowProps } from '@/types/components/sections';
import { usePlayerEditor } from './usePlayerEditor';
import styles from './PlayersStep.module.css';

export default function PlayerRow({
  index,
  total,
  player,
  duplicate,
  copy,
  dispatch,
}: PlayerRowProps) {
  const { id, name } = player;
  const { play, rename, remove, onBlur, onKeyDown } = usePlayerEditor(
    player,
    dispatch,
  );

  const move = (offset: number) => {
    play('tap');
    dispatch({ type: 'movePlayer', id, offset });
  };

  return (
    <li className={cx(styles.row, duplicate && styles.duplicate)}>
      <span className={cx(styles.index, 'label')} aria-hidden="true">
        {padIndex(index + 1)}
      </span>
      <input
        className={styles.name}
        type="text"
        value={name}
        maxLength={PLAYER_NAME_MAX_LENGTH}
        aria-label={fill(copy.rename, { index: index + 1 })}
        aria-invalid={duplicate}
        autoComplete="off"
        autoCapitalize="words"
        enterKeyHint="enter"
        onChange={(event) => rename(event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {duplicate && (
        <span className={cx(styles.tag, 'label')}>{copy.duplicate}</span>
      )}
      <span className={styles.moves}>
        <button
          type="button"
          className={styles.icon}
          onClick={() => move(-1)}
          disabled={index === 0}
          aria-label={fill(copy.moveUp, { name })}
        >
          <Icon name="arrowUp" className={styles.iconSvg} />
        </button>
        <button
          type="button"
          className={styles.icon}
          onClick={() => move(1)}
          disabled={index === total - 1}
          aria-label={fill(copy.moveDown, { name })}
        >
          <Icon name="arrowDown" className={styles.iconSvg} />
        </button>
      </span>
      <button
        type="button"
        className={cx(styles.icon, styles.remove)}
        onClick={remove}
        aria-label={fill(copy.remove, { name })}
      >
        <Icon name="close" className={styles.iconSvg} />
      </button>
    </li>
  );
}
