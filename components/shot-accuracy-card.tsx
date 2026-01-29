'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { Stat } from '@/types/player-stats';
import { useTranslation } from '@/lib/use-translation';
import { useLanguage } from '@/lib/language-context';
import Image from 'next/image';

interface ShotAccuracyCardProps {
  stat: Stat;
}

export function ShotAccuracyCard({ stat }: ShotAccuracyCardProps) {
  const t = useTranslation();
  const { isRTL } = useLanguage();
  
  // Extract percentage value
  const percentage = parseFloat(stat.value.replace('%', '')) || 0;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 bg-zinc-900/40 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] py-0">
      <CardContent className="p-6">
        <div className={`flex items-center justify-between gap-6`}>
          <div className={`flex items-start gap-4`}>
            {/* Icon */}
          {stat.icon && (
            <div className="rounded-xl bg-zinc-800/50 p-3 backdrop-blur-sm">
              <Image
                src={stat.icon.ar1X1}
                alt={stat.icon.alternateText || stat.name}
                width={24}
                height={24}
                className="h-6 w-6 opacity-90"
                unoptimized
              />
            </div>
          )}

           {/* Content */}
           <div className={`space-y-1`}>
            <p className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
              {stat.name}
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              {t('stat.precisionPerformance')}
            </p>
          </div>
          </div>

          {/* Circular Progress Ring */}
          <div className="relative">
            <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                className="stroke-red-500 transition-all duration-1000 ease-out"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-semibold tracking-tight text-white">
                {percentage}%
              </p>
            </div>
          </div>

         
        </div>
      </CardContent>
    </Card>
  );
}
