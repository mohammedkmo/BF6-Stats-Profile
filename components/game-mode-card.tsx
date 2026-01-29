'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { GameMode } from '@/types/player-stats';
import { useTranslation } from '@/lib/use-translation';
import Image from 'next/image';

interface GameModeCardProps {
  gameMode: GameMode;
}

export function GameModeCard({ gameMode }: GameModeCardProps) {
  const t = useTranslation();

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 bg-zinc-900/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] py-0">
      <CardContent className="p-6">
        <div className={`flex items-start gap-4`}>
          {/* Icon Container */}
          <div className="flex-shrink-0 rounded-xl bg-zinc-800/50 p-2.5 backdrop-blur-sm">
            <Image
              src={gameMode.icon.ar1X1}
              alt={gameMode.name}
              width={24}
              height={24}
              className="h-6 w-6 opacity-90"
              unoptimized
            />
          </div>
          
          {/* Content */}
          <div className={`space-y-2`}>
            <div>
              <p className="text-xs font-medium text-zinc-500 tracking-wide uppercase">{t('section.gameMode')}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
                {gameMode.name}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">
              {gameMode.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
