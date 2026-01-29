import { PlayerProfile } from '@/components/player-profile';
import { notFound } from 'next/navigation';
import type { PlayerStatsResponse } from '@/types/player-stats';
import { getServerLanguage } from '@/lib/server-language';
import { fetchPlayerStatsWithFallback, buildCoverImageUrl } from '@/lib/platform-fallback';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ playertag: string }>;
}) {
  const { playertag } = await params;
  const locale = await getServerLanguage();
  const result = await fetchPlayerStatsWithFallback(playertag, locale);

  if (!result || !result.data?.playerStatsSummary) {
    return {
      title: 'Player Not Found - BF6 Stats',
    };
  }

  return {
    title: `${result.data.playerStatsSummary.playerDisplayName} - BF6 Stats`,
    description: `View ${result.data.playerStatsSummary.playerDisplayName}'s Battlefield 6 statistics`,
  };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ playertag: string }>;
}) {
  const { playertag } = await params;
  const locale = await getServerLanguage();
  const result = await fetchPlayerStatsWithFallback(playertag, locale);

  if (!result || !result.data?.playerStatsSummary) {
    notFound();
  }

  // Build cover image URL with the platform that worked
  const coverImageUrl = buildCoverImageUrl(playertag, locale, result.platform);

  return <PlayerProfile stats={result.data.playerStatsSummary} coverImageUrl={coverImageUrl} />;
}
