'use client';

import { useRef } from 'react';
import { MAX_PLAYERS, PLAYER_NAME_MAX_LENGTH } from '@/constants/game';
import Field from '@/components/ui/Field/Field';
import Icon from '@/components/ornaments/Icon/Icon';
import type { PlayerComposerProps } from '@/types/components/sections';
import { usePlayerComposer } from './usePlayerComposer';
import styles from './PlayersStep.module.css';

export default function PlayerComposer({
  draft,
  dispatch,
  teamId,
  label,
  copy,
}: PlayerComposerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const composer = usePlayerComposer({ draft, dispatch, teamId }, copy);
  const full = draft.players.length >= MAX_PLAYERS;

  return (
    <Field label={label} error={composer.error ?? undefined}>
      {(control) => (
        <div className={styles.composer}>
          <input
            {...control}
            ref={inputRef}
            type="text"
            value={composer.text}
            maxLength={PLAYER_NAME_MAX_LENGTH}
            placeholder={copy.placeholder}
            autoComplete="off"
            autoCapitalize="words"
            enterKeyHint="enter"
            disabled={full}
            onChange={(event) => composer.change(event.target.value)}
            onKeyDown={composer.onKeyDown}
          />
          <button
            type="button"
            className={styles.add}
            onClick={() => {
              composer.submit();
              inputRef.current?.focus();
            }}
            disabled={full || !composer.text.trim()}
            aria-label={label}
          >
            <Icon name="plus" className={styles.addIcon} />
          </button>
        </div>
      )}
    </Field>
  );
}
