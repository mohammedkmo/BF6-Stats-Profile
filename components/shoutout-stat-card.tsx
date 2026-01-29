'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { Stat } from '@/types/player-stats';
import { useTranslation } from '@/lib/use-translation';
import Image from 'next/image';

interface ShoutoutStatCardProps {
  stat: Stat;
}

export function ShoutoutStatCard({ stat }: ShoutoutStatCardProps) {
  const t = useTranslation();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-cyan-500/10 via-zinc-900/40 to-zinc-900/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(34,211,238,0.2)] py-0 ring-1 ring-cyan-500/20">
      <CardContent className="p-6">
        <div className={`flex items-center gap-4`}>
          {stat.icon && (
            <div className="rounded-xl bg-cyan-500/20 p-3 backdrop-blur-sm">
              <Image
                src={stat.icon.ar1X1}
                alt={stat.icon.alternateText || stat.name}
                width={32}
                height={32}
                className="h-8 w-8 opacity-90"
                unoptimized
              />
            </div>
          )}
          
          <div className={`space-y-1`}>
            <p className="text-xs font-medium text-zinc-400 tracking-wide uppercase">{t('stat.standoutPerformance')}</p>
            <p className="text-lg font-semibold tracking-tight text-white">{stat.name}</p>
            <p className="text-2xl font-bold tracking-tight text-cyan-400">{stat.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
