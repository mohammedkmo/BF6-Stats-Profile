import { cookies } from 'next/headers';
import { isValidLanguage, defaultLanguage, type LanguageCode } from './i18n';

export async function getServerLanguage(): Promise<LanguageCode> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('bf6-locale')?.value;
  
  if (locale && isValidLanguage(locale)) {
    return locale;
  }
  
  return defaultLanguage;
}
