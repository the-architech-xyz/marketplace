import { NextRequest, NextResponse } from 'next/server';

// Redirect configuration
export interface RedirectRule {
  from: string | RegExp;
  to: string;
  status?: 301 | 302 | 307 | 308;
  permanent?: boolean;
}

// Default redirect rules
export const defaultRedirects: RedirectRule[] = [
  {
    from: '/home',
    to: '/',
    status: 301,
  },
  {
    from: '/login',
    to: '/auth/signin',
    status: 301,
  },
  {
    from: '/register',
    to: '/auth/signup',
    status: 301,
  },
  {
    from: '/dashboard',
    to: '/dashboard/overview',
    status: 302,
  },
];

// Redirect middleware utilities
export class RedirectMiddleware {
  static applyRedirects(
    request: NextRequest,
    redirects: RedirectRule[] = defaultRedirects
  ): NextResponse | null {
    const { pathname } = request.nextUrl;
    
    for (const redirect of redirects) {
      if (this.matchesPath(pathname, redirect.from)) {
        const url = new URL(redirect.to, request.url);
        
        // Preserve query parameters
        request.nextUrl.searchParams.forEach((value, key) => {
          url.searchParams.set(key, value);
        });
        
        return NextResponse.redirect(url, redirect.status || 301);
      }
    }
    
    return null; // No redirect needed
  }

  private static matchesPath(pathname: string, pattern: string | RegExp): boolean {
    if (typeof pattern === 'string') {
      return pathname === pattern || pathname.startsWith(pattern + '/');
    }
    
    return pattern.test(pathname);
  }

  static handleTrailingSlash(
    request: NextRequest,
    removeTrailingSlash: boolean = true
  ): NextResponse | null {
    const { pathname } = request.nextUrl;
    
    if (removeTrailingSlash && pathname.length > 1 && pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.slice(0, -1);
      return NextResponse.redirect(url, 301);
    }
    
    if (!removeTrailingSlash && pathname.length > 1 && !pathname.endsWith('/')) {
      const url = request.nextUrl.clone();
      url.pathname = pathname + '/';
      return NextResponse.redirect(url, 301);
    }
    
    return null;
  }

  static handleWwwRedirect(
    request: NextRequest,
    addWww: boolean = false
  ): NextResponse | null {
    const { hostname } = request.nextUrl;
    
    if (addWww && !hostname.startsWith('www.')) {
      const url = request.nextUrl.clone();
      url.hostname = 'www.' + hostname;
      return NextResponse.redirect(url, 301);
    }
    
    if (!addWww && hostname.startsWith('www.')) {
      const url = request.nextUrl.clone();
      url.hostname = hostname.slice(4);
      return NextResponse.redirect(url, 301);
    }
    
    return null;
  }

  static handleHttpsRedirect(
    request: NextRequest,
    forceHttps: boolean = true
  ): NextResponse | null {
    if (forceHttps && request.nextUrl.protocol === 'http:') {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
    
    return null;
  }
}
    },
    {
