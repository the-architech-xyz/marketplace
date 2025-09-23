import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting for email endpoints
const emailRateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply rate limiting to email API routes
  if (pathname.startsWith('/api/email/')) {
    const ip = request.ip || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 100; // Max 100 requests per window

    const userLimit = emailRateLimit.get(ip);
    
    if (!userLimit || now > userLimit.resetTime) {
      emailRateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (userLimit.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    } else {
      userLimit.count++;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/email/:path*',
  ],
};
