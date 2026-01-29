import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const playertag = searchParams.get('player') || 'moeka9';
  
  const EA_API_BASE = 'https://drop-api.ea.com';
  const GAME_SLUG = 'battlefield-6';
  const EVENT_NAME = 'BF6_S1B3_9a2cS6p05Z';
  
  const results: any[] = [];
  
  const platforms = ['ea', 'ps3', 'xbox', 'epic'];
  
  for (const platform of platforms) {
    try {
      const apiUrl = `${EA_API_BASE}/player/${playertag}/stats?gameSlug=${GAME_SLUG}&eventName=${EVENT_NAME}&locale=en&platform=${platform}&source=web_search`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      results.push({
        platform,
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        ok: response.ok,
      });
      
      if (response.ok) {
        const data = await response.json();
        results[results.length - 1].data = {
          hasPlayerStatsSummary: !!data.playerStatsSummary,
          playerDisplayName: data.playerStatsSummary?.playerDisplayName || null,
        };
      }
    } catch (error: any) {
      results.push({
        platform,
        error: error.message,
      });
    }
  }
  
  return NextResponse.json({
    playertag,
    results,
  });
}
