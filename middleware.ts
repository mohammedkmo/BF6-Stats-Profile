import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidLanguage, defaultLanguage, type LanguageCode } from './lib/i18n';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  // Get language from cookie or default
  const locale = request.cookies.get('bf6-locale')?.value;
  const language: LanguageCode = (locale && isValidLanguage(locale)) ? locale : defaultLanguage;
  
  // Set language in response header for API routes
  response.headers.set('x-locale', language);

  // Extract subdomain (e.g., "moeka9" from "moeka9.bf6.me" or "moeka9.localhost:3000")
  const parts = hostname.split('.');
  const subdomain = parts[0];

  // Skip if it's the root path or API routes
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_next')) {
    return response;
  }

  // For localhost development, check if hostname has a subdomain pattern
  // e.g., "moeka9.localhost:3000" or just check the first part
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  // If there's a subdomain and it's not "www" or common reserved names
  // For localhost, we'll use a query param approach or check the first part
  if (isLocalhost) {
    // For localhost, you can test with query param: ?player=moeka9
    // Or configure your hosts file to use subdomain.localhost
    const playerParam = url.searchParams.get('player');
    if (playerParam) {
      url.pathname = `/player/${playerParam}`;
      url.searchParams.delete('player');
      const rewriteResponse = NextResponse.rewrite(url);
      rewriteResponse.headers.set('x-locale', language);
      return rewriteResponse;
    }
  } else if (subdomain && subdomain !== 'www' && parts.length > 1) {
    // Production: rewrite subdomain to player page
    url.pathname = `/player/${subdomain}`;
    const rewriteResponse = NextResponse.rewrite(url);
    rewriteResponse.headers.set('x-locale', language);
    return rewriteResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
