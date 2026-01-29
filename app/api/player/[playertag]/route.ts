import { NextRequest, NextResponse } from 'next/server';
import type { PlayerStatsResponse } from '@/types/player-stats';
import { isValidLanguage, defaultLanguage, type LanguageCode } from '@/lib/i18n';
import { fetchPlayerStatsWithFallback } from '@/lib/platform-fallback';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ playertag: string }> }
) {
  try {
    const { playertag } = await params;
    
    if (!playertag) {
      return NextResponse.json(
        { error: 'Player tag is required' },
        { status: 400 }
      );
    }

    // Get locale from cookie or header, default to 'en'
    const locale = request.cookies.get('bf6-locale')?.value || 
                   request.headers.get('x-locale') || 
                   defaultLanguage;
    const language: LanguageCode = isValidLanguage(locale) ? locale : defaultLanguage;

    // Try all platforms in order
    const result = await fetchPlayerStatsWithFallback(playertag, language);

    if (!result) {
      return NextResponse.json(
        { error: 'Player not found on any platform' },
        { status: 404 }
      );
    }

    // Include platform in response for reference
    const response: PlayerStatsResponse & { platform?: string | null } = {
      ...result.data,
      platform: result.platform || null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player stats' },
      { status: 500 }
    );
  }
}
