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

  // Skip if it's API routes or Next.js internal routes
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_next')) {
    return response;
  }

  // Extract hostname parts (e.g., ["moeka9", "bf6", "me"] or ["bf6", "me"])
  const hostnameParts = hostname.split('.');
  
  // Check if we're on localhost (development)
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  if (isLocalhost) {
    // For localhost, use query param approach: ?player=moeka9
    const playerParam = url.searchParams.get('player');
    if (playerParam) {
      url.pathname = `/player/${playerParam}`;
      url.searchParams.delete('player');
      const rewriteResponse = NextResponse.rewrite(url);
      rewriteResponse.headers.set('x-locale', language);
      return rewriteResponse;
    }
    // If no player param, let it continue to homepage
    return response;
  }

  // Production: Check if we have a subdomain
  // Root domain: bf6.me -> ["bf6", "me"] (length 2)
  // Subdomain: moeka9.bf6.me -> ["moeka9", "bf6", "me"] (length 3+)
  const hasSubdomain = hostnameParts.length >= 3;
  
  if (hasSubdomain) {
    const subdomain = hostnameParts[0];
    
    // Skip common reserved subdomains
    const reservedSubdomains = ['www', 'api', 'admin', 'mail', 'ftp', 'cpanel', 'webmail'];
    if (reservedSubdomains.includes(subdomain.toLowerCase())) {
      return response;
    }
    
    // Rewrite subdomain to player page
    url.pathname = `/player/${subdomain}`;
    const rewriteResponse = NextResponse.rewrite(url);
    rewriteResponse.headers.set('x-locale', language);
    return rewriteResponse;
  }

  // Root domain - let it continue to homepage
  return response;

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
