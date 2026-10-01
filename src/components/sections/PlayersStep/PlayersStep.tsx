'use client';

import { useMemo } from 'react';
import { MAX_PLAYERS, MIN_PLAYERS } from '@/constants/game';
import { cx } from '@/lib/classNames';
import { fill, padIndex } from '@/lib/format';
import { findDuplicateIds } from '@/lib/players';
import { useCopy } from '@/hooks/useCopy';
import Icon from '@/components/ornaments/Icon/Icon';
import type { SetupStepProps } from '@/types/components/sections';
import PlayerComposer from './PlayerComposer';
import PlayerRow from './PlayerRow';
import TeamsPanel from './TeamsPanel';
import styles from './PlayersStep.module.css';

export default function PlayersStep({ draft, dispatch }: SetupStepProps) {
  const { wizard } = useCopy();
  const copy = wizard.players;
  const { players } = draft;
  const duplicates = useMemo(() => findDuplicateIds(players), [players]);

  const status = (
    <div className={cx(styles.status, 'label')}>
      <span aria-live="polite">
        {fill(copy.count, {
          count: padIndex(players.length),
          max: MAX_PLAYERS,
        })}
      </span>
      {players.length < MIN_PLAYERS && (
        <span className={styles.minimum}>
          {fill(copy.minimum, { min: MIN_PLAYERS })}
        </span>
      )}
    </div>
  );

  if (draft.mode === 'teams') {
    return (
      <div className={styles.players}>
        {status}
        <TeamsPanel
          draft={draft}
          dispatch={dispatch}
          copy={copy}
          duplicates={duplicates}
        />
      </div>
    );
  }

  return (
    <div className={styles.players}>
      <PlayerComposer
        draft={draft}
        dispatch={dispatch}
        label={copy.label}
        copy={copy}
      />
      {status}
      {players.length === 0 ? (
        <div className={styles.empty}>
          <Icon name="mask" className={styles.emptyGlyph} strokeWidth={1.2} />
          <p className="whisper">{copy.empty}</p>
        </div>
      ) : (
        <ol className={styles.list}>
          {players.map((player, index) => (
            <PlayerRow
              key={player.id}
              index={index}
              total={players.length}
              player={player}
              duplicate={duplicates.has(player.id)}
              copy={copy}
              dispatch={dispatch}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
