'use client';

import { createContext, useEffect, useSyncExternalStore } from 'react';
import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  PORTUGUESE_LANGUAGE,
} from '@/constants/language';
import { readLocal, setLocal, subscribeLocal } from '@/lib/storage';
import type { Language, LanguageContextValue } from '@/types/language';
import type { LanguageProviderProps } from '@/types/components/providers';

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function isLanguage(value: string | null): value is Language {
  return LANGUAGES.some((language) => language === value);
}

function readLanguage() {
  return readLocal(LANGUAGE_STORAGE_KEY);
}

function readServerLanguage() {
  return null;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const stored = useSyncExternalStore(
    subscribeLocal,
    readLanguage,
    readServerLanguage,
  );
  const language = isLanguage(stored) ? stored : DEFAULT_LANGUAGE;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLocal(
      LANGUAGE_STORAGE_KEY,
      language === PORTUGUESE_LANGUAGE ? ENGLISH_LANGUAGE : PORTUGUESE_LANGUAGE,
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
