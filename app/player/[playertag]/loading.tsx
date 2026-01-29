'use client';

import { useTranslation } from '@/lib/use-translation';

export default function Loading() {
  const t = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-800 border-t-cyan-500 mx-auto" />
        <p className="text-zinc-400">{t('player.loading')}</p>
      </div>
    </div>
  );
}
