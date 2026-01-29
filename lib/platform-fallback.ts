import type { PlayerStatsResponse } from '@/types/player-stats';

const EA_API_BASE = 'https://drop-api.ea.com';
const GAME_SLUG = 'battlefield-6';
const EVENT_NAME = 'BF6_S1B3_9a2cS6p05Z';

export type Platform = 'ea' | 'ps3' | 'xbox' | 'epic';

export const PLATFORMS: Platform[] = ['ea', 'ps3', 'xbox', 'epic'];

export interface PlayerStatsResult {
  data: PlayerStatsResponse;
  platform: Platform;
}

/**
 * Tries to fetch player stats from multiple platforms in order
 * Returns the first successful response with the platform that worked
 */
export async function fetchPlayerStatsWithFallback(
  playertag: string,
  locale: string
): Promise<PlayerStatsResult | null> {
  for (const platform of PLATFORMS) {
    try {
      const apiUrl = `${EA_API_BASE}/player/${playertag}/stats?gameSlug=${GAME_SLUG}&eventName=${EVENT_NAME}&locale=${locale}&platform=${platform}&source=web_search`;

      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (response.ok) {
        const data: PlayerStatsResponse = await response.json();
        // Verify the data structure
        if (data && data.playerStatsSummary) {
          return { data, platform };
        } else {
          console.warn(`Platform ${platform} returned invalid data structure for player ${playertag}`);
          continue;
        }
      }

      // If 404, try next platform
      if (response.status === 404) {
        continue;
      }

      // For other errors, log but continue to next platform
      console.warn(`Platform ${platform} returned status ${response.status} for player ${playertag}`);
    } catch (error) {
      // Log error but continue to next platform
      console.warn(`Error fetching from platform ${platform}:`, error);
      continue;
    }
  }

  // No platform returned a successful response
  return null;
}

/**
 * Builds the cover image URL for a player on a specific platform
 */
export function buildCoverImageUrl(
  playertag: string,
  locale: string,
  platform: Platform
): string {
  return `${EA_API_BASE}/player/${playertag}/image?aspectRatio=16x9&gameSlug=${GAME_SLUG}&eventName=${EVENT_NAME}&locale=${locale}&platform=${platform}&source=web_search`;
}
