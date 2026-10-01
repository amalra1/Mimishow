'use client';

import type { Dispatch, KeyboardEvent } from 'react';
import { normalizeName } from '@/lib/players';
import { useSound } from '@/hooks/useSound';
import type { Player } from '@/types/game';
import type { SetupAction } from '@/types/setup';

export function usePlayerEditor(
  { id, name }: Player,
  dispatch: Dispatch<SetupAction>,
) {
  const { play } = useSound();

  const rename = (value: string) =>
    dispatch({ type: 'renamePlayer', id, name: value });

  const remove = () => {
    play('remove');
    dispatch({ type: 'removePlayer', id });
  };

  const onBlur = () => {
    const cleaned = normalizeName(name);
    if (!cleaned) return dispatch({ type: 'removePlayer', id });
    if (cleaned !== name) rename(cleaned);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    event.currentTarget.blur();
  };

  return { play, rename, remove, onBlur, onKeyDown };
}
