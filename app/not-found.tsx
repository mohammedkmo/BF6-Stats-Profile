'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';
import { useLanguage } from '@/lib/language-context';

export default function NotFound() {
  const t = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className={`text-center px-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-6xl font-bold tracking-tight text-white">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-zinc-300">{t('player.notFound')}</h2>
        <p className="mt-2 text-zinc-400">
          {t('player.notFoundDescription')}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-900 hover:border-cyan-500/30"
        >
          {t('player.goHome')}
        </Link>
      </div>
    </div>
  );
}
