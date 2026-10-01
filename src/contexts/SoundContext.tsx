'use client';

import { createContext, useCallback, useSyncExternalStore } from 'react';
import { SOUND_MUTED_VALUE, SOUND_STORAGE_KEY } from '@/constants/storage';
import { SOUNDS } from '@/constants/sound';
import { playVoices } from '@/lib/sound';
import { readLocal, setLocal, subscribeLocal } from '@/lib/storage';
import type { SoundContextValue, SoundName } from '@/types/sound';
import type { SoundProviderProps } from '@/types/components/providers';

export const SoundContext = createContext<SoundContextValue | undefined>(
  undefined,
);

function readMuted() {
  return readLocal(SOUND_STORAGE_KEY) === SOUND_MUTED_VALUE;
}

function readServerMuted() {
  return false;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const muted = useSyncExternalStore(
    subscribeLocal,
    readMuted,
    readServerMuted,
  );

  const toggleMuted = () => {
    setLocal(SOUND_STORAGE_KEY, muted ? null : SOUND_MUTED_VALUE);
  };

  const play = useCallback((name: SoundName) => {
    if (!readMuted()) playVoices(SOUNDS[name]);
  }, []);

  return (
    <SoundContext.Provider value={{ muted, toggleMuted, play }}>
      {children}
    </SoundContext.Provider>
  );
}
