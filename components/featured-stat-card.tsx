'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { FeaturedStat } from '@/types/player-stats';
import Image from 'next/image';

interface FeaturedStatCardProps {
  stat: FeaturedStat;
}

export function FeaturedStatCard({ stat }: FeaturedStatCardProps) {

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 bg-zinc-900/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] py-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className={`flex items-start justify-between`}>
            <div className={`space-y-1`}>
              <p className="text-xs font-medium text-zinc-500 tracking-wide">{stat.name}</p>
              <p className="text-5xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
            </div>
            
            {stat.icon && (
              <div className="rounded-xl bg-zinc-800/50 p-3 backdrop-blur-sm">
                <Image
                  src={stat.icon.ar1X1}
                  alt={stat.icon.alternateText || stat.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 opacity-90"
                  unoptimized
                />
              </div>
            )}
          </div>
          
          {/* Weapon category */}
          <div className={`flex items-center gap-3 rounded-xl bg-zinc-800/30 px-4 py-3 backdrop-blur-sm`}>
            <Image
              src={stat.gameplayItem.image.ar1X1}
              alt={stat.gameplayItem.name}
              width={24}
              height={24}
              className="h-6 w-6 opacity-90"
              unoptimized
            />
            <span className="text-sm font-medium text-zinc-300">{stat.gameplayItem.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
