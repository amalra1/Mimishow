import enData from '@/data/en.json';
import ptBRData from '@/data/pt-BR.json';
import type { AppCopy } from '@/types/copy';
import type { Language } from '@/types/language';

const ptBR: AppCopy = ptBRData;

export const content: Record<Language, AppCopy> = {
  en: enData,
  'pt-BR': ptBR,
};
