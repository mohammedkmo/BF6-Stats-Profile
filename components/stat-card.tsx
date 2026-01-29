'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { Stat } from '@/types/player-stats';
import { useTranslation } from '@/lib/use-translation';
import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';

interface StatCardProps {
  stat: Stat;
  highlighted?: boolean;
}

export function StatCard({ stat, highlighted = false }: StatCardProps) {
  const t = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <Card
      className={`group relative overflow-hidden rounded-2xl border-0 bg-zinc-900/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] py-0 ${
        highlighted ? 'ring-1 ring-cyan-500/20 shadow-[0_8px_24px_rgba(34,211,238,0.15)]' : ''
      }`}
    >
      <CardContent className="flex flex-col gap-4 p-6">
        {stat.icon && (
          <div className={`flex items-center `}>
            <div className="rounded-xl bg-zinc-800/50 p-2.5 backdrop-blur-sm">
              <Image
                src={stat.icon.ar1X1}
                alt={stat.icon.alternateText || stat.name}
                width={24}
                height={24}
                className="h-6 w-6 opacity-90"
                unoptimized
              />
            </div>
            {stat.percentile_rank !== null && stat.percentile_rank !== undefined && (
              <div className="rounded-full bg-cyan-500/10 px-2 py-1">
                <span className="text-xs font-semibold text-cyan-400">
                  {t('stat.topPercent', { percent: (100 - Math.round(stat.percentile_rank)).toString() })}
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className={`space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-xs font-medium text-zinc-500 tracking-wide">{stat.name}</p>
          <p
            className={`text-3xl font-semibold tracking-tight ${
              highlighted ? 'text-cyan-400' : 'text-white'
            }`}
          >
            {stat.value}
          </p>
          {stat.percentile_rank !== null && stat.percentile_rank !== undefined && !stat.icon && (
            <p className="text-xs font-medium text-cyan-400">
              {t('stat.topPercent', { percent: (100 - Math.round(stat.percentile_rank)).toString() })}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
