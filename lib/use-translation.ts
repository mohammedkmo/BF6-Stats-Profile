'use client';

import { useLanguage } from './language-context';
import { getTranslation } from './translations';
import type { TranslationKey } from './translations';

export function useTranslation() {
  const { language } = useLanguage();

  return (key: TranslationKey, params?: Record<string, string>) => {
    return getTranslation(language, key, params);
  };
}
