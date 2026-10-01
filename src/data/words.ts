import enWords from '@/data/words.en.json';
import ptBRWords from '@/data/words.pt-BR.json';
import type { WordBank } from '@/types/game';
import type { Language } from '@/types/language';

export const wordBanks: Record<Language, WordBank> = {
  en: enWords,
  'pt-BR': ptBRWords,
};
