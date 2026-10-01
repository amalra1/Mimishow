import type { LANGUAGES } from '@/constants/language';

export type Language = (typeof LANGUAGES)[number];

export interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
}
