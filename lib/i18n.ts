export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'cs', name: 'Čeština' },
  { code: 'da', name: 'Dansk' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'es-mx', name: 'Español (México)' },
  { code: 'fi', name: 'Suomi' },
  { code: 'fr', name: 'Français' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'nb', name: 'Norsk' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt-br', name: 'Português (Brasil)' },
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'sv', name: 'Svenska' },
  { code: 'th', name: 'ไทย' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'zh-hans', name: '简体中文' },
  { code: 'zh-hant', name: '繁體中文' },
] as const;

export type LanguageCode = typeof supportedLanguages[number]['code'];

export const defaultLanguage: LanguageCode = 'en';

export function isValidLanguage(code: string): code is LanguageCode {
  return supportedLanguages.some(lang => lang.code === code);
}

export function getLanguageName(code: LanguageCode): string {
  return supportedLanguages.find(lang => lang.code === code)?.name || 'English';
}
