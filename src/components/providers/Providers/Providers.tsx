'use client';

import { GameProvider } from '@/contexts/GameContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SoundProvider } from '@/contexts/SoundContext';
import type { ProvidersProps } from '@/types/components/providers';

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <SoundProvider>
        <GameProvider>{children}</GameProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}
