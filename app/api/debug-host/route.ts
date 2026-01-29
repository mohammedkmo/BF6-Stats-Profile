import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const hostnameWithoutPort = hostname.split(':')[0];
  const hostnameParts = hostnameWithoutPort.split('.');
  
  return NextResponse.json({
    hostname,
    hostnameWithoutPort,
    hostnameParts,
    partsLength: hostnameParts.length,
    hasSubdomain: hostnameParts.length >= 3,
    subdomain: hostnameParts.length >= 3 ? hostnameParts[0] : null,
    allHeaders: Object.fromEntries(request.headers.entries()),
  }, { 
    headers: {
      'Cache-Control': 'no-store',
    }
  });
}
