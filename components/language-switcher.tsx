'use client';

import { useLanguage } from '@/lib/language-context';
import { supportedLanguages } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex flex-wrap items-center gap-2 justify-start`}>
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xs transition-colors ${
            language === lang.code
              ? 'font-semibold text-red-500'
              : 'font-medium text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
