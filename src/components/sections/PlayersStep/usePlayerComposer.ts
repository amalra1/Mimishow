'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { MAX_PLAYERS } from '@/constants/game';
import { fill } from '@/lib/format';
import { nameKey, normalizeName } from '@/lib/players';
import { useSound } from '@/hooks/useSound';
import type {
  PlayerComposerOptions,
  PlayersCopy,
} from '@/types/components/sections';

export function usePlayerComposer(
  { draft, dispatch, teamId }: PlayerComposerOptions,
  copy: PlayersCopy,
) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { play } = useSound();

  const fail = (message: string) => {
    play('deselect');
    setError(message);
  };

  const change = (value: string) => {
    setText(value);
    setError(null);
  };

  const submit = () => {
    const name = normalizeName(text);
    if (!name) return;
    if (draft.players.length >= MAX_PLAYERS) {
      fail(fill(copy.full, { max: MAX_PLAYERS }));
      return;
    }
    if (
      draft.players.some((player) => nameKey(player.name) === nameKey(name))
    ) {
      fail(fill(copy.alreadyIn, { name }));
      return;
    }
    play('add');
    dispatch({ type: 'addPlayer', name, teamId });
    setText('');
    setError(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    submit();
  };

  return { text, change, error, submit, onKeyDown };
}
