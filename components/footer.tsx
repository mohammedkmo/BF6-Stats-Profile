'use client';

import { useTranslation } from '@/lib/use-translation';
import { useLanguage } from '@/lib/language-context';
import { LanguageSwitcher } from './language-switcher';

export function Footer() {
  const t = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={`flex flex-col gap-6 ${isRTL ? 'items-end' : 'items-start'}`}>
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          <div className={`flex w-full flex-col items-center justify-between gap-4 sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
              <p className="text-sm font-medium text-white">{t('footer.appName')}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {t('footer.description')}
              </p>
            </div>
            
            <div className={`flex flex-col items-center gap-2 sm:flex-row sm:gap-6 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <p className="text-xs text-zinc-500">
                {t('footer.poweredBy')}{' '}
                <span className="font-medium text-zinc-400">{t('footer.apiName')}</span>
              </p>
              <div className="h-1 w-1 rounded-full bg-zinc-700 hidden sm:block" />
              <p className="text-xs text-zinc-500">
                {t('footer.copyright', { year: new Date().getFullYear().toString() })}
              </p>
              <div className="h-1 w-1 rounded-full bg-zinc-700 hidden sm:block" />
              <p className="text-xs text-zinc-500">
                {t('footer.createdBy')}{' '}
                <a
                  href="https://x.com/imohammedkareem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-red-500 hover:text-red-300 transition-colors"
                >
                  @imohammedkareem
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
