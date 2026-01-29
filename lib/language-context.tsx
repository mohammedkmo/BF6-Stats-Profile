'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { LanguageCode } from './i18n';

const LanguageContext = createContext<{
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
} | null>(null);

const LANGUAGE_COOKIE_NAME = 'bf6-locale';

export function LanguageProvider({ 
  children, 
  initialLanguage 
}: { 
  children: ReactNode;
  initialLanguage: LanguageCode;
}) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);
  const isRTL = language === 'ar';

  useEffect(() => {
    // Update HTML dir attribute
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  useEffect(() => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_COOKIE_NAME, language);
      
      // Save to cookie
      document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; path=/; max-age=31536000`; // 1 year
    }
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    // Save immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_COOKIE_NAME, lang);
      document.cookie = `${LANGUAGE_COOKIE_NAME}=${lang}; path=/; max-age=31536000`;
      // Reload page to apply language changes
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
