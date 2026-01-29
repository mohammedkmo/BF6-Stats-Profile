'use client';

import { Footer } from '@/components/footer';
import { useLanguage } from '@/lib/language-context';
import { useTranslation } from '@/lib/use-translation';

export function HomeClient() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="flex flex-1 items-center justify-center">
        <div className={`container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8`}>
          <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {t('app.title')}
            </h1>
            <p className="mt-4 text-base text-zinc-400 sm:text-lg">
              {t('app.description')}
            </p>
            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              {t('app.subtitle', { subdomain: 'yourname.bf6.me' })}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
