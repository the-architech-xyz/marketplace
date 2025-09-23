import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware configuration
const config = {
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply middleware in order
  let response = NextResponse.next();
  
  // 1. Security headers
  response = addSecurityHeaders(response);
  
  // 2. Rate limiting
  response = await applyRateLimit(request, response);
  
  // 3. Authentication
  response = await handleAuthentication(request, response, pathname);
  
  // 4. Redirects
  response = handleRedirects(request, response, pathname);
  
  // 5. Logging
  logRequest(request, response);
  
  return response;
}

// Security headers middleware
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

// Rate limiting middleware
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

async function applyRateLimit(
  request: NextRequest, 
  response: NextResponse
): Promise<NextResponse> {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // 100 requests per window
  
  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return response;
  }
  
  if (current.count >= maxRequests) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString(),
      },
    });
  }
  
  current.count++;
  return response;
}

// Authentication middleware
async function handleAuthentication(
  request: NextRequest,
  response: NextResponse,
  pathname: string
): Promise<NextResponse> {
  // Protected routes
  const protectedRoutes = ['/dashboard', '/admin', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    try {
      const token = await getToken({ req: request });
      
      if (!token) {
        const loginUrl = new URL('/auth/signin', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
      
      // Add user info to headers for API routes
      response.headers.set('x-user-id', token.sub || '');
      response.headers.set('x-user-email', token.email || '');
    } catch (error) {
      console.error('Auth middleware error:', error);
      const loginUrl = new URL('/auth/signin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Redirect authenticated users away from auth pages
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  if (isAuthRoute) {
    try {
      const token = await getToken({ req: request });
      
      if (token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Auth redirect error:', error);
    }
  }
  
  return response;
}

// Redirects middleware
function handleRedirects(
  request: NextRequest,
  response: NextResponse,
  pathname: string
): NextResponse {
  // Custom redirects
  const redirects: Record<string, string> = {
    '/home': '/',
    '/login': '/auth/signin',
    '/register': '/auth/signup',
  };
  
  if (redirects[pathname]) {
    return NextResponse.redirect(new URL(redirects[pathname], request.url));
  }
  
  // Trailing slash handling
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
  
  return response;
}

// Logging middleware
function logRequest(request: NextRequest, response: NextResponse): void {
  if (process.env.NODE_ENV === 'development') {
    const { pathname, search } = request.nextUrl;
    const method = request.method;
    const status = response.status;
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    console.log(\`\${method} \${pathname}\${search} - \${status} - \${userAgent}\`);
  }
}

export { config };
    },
    {
