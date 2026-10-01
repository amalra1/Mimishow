'use client';

import { content } from '@/data/content';
import { useLanguage } from '@/hooks/useLanguage';

export function useCopy() {
  const { language } = useLanguage();
  return content[language];
}
