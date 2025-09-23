import { NextRequest, NextResponse } from 'next/server';

// Security headers configuration
export interface SecurityHeaders {
  'X-Frame-Options'?: string;
  'X-Content-Type-Options'?: string;
  'Referrer-Policy'?: string;
  'X-XSS-Protection'?: string;
  'Content-Security-Policy'?: string;
  'Strict-Transport-Security'?: string;
  'Permissions-Policy'?: string;
}

// Default security headers
export const defaultSecurityHeaders: SecurityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Content Security Policy
export const defaultCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
].join('; ');

// Security middleware utilities
export class SecurityMiddleware {
  static addSecurityHeaders(
    response: NextResponse,
    customHeaders: SecurityHeaders = {}
  ): NextResponse {
    const headers = { ...defaultSecurityHeaders, ...customHeaders };
    
    // Add CSP if not provided
    if (!headers['Content-Security-Policy']) {
      headers['Content-Security-Policy'] = defaultCSP;
    }
    
    // Apply headers
    Object.entries(headers).forEach(([key, value]) => {
      if (value) {
        response.headers.set(key, value);
      }
    });
    
    return response;
  }

  static blockSuspiciousRequests(
    request: NextRequest
  ): NextResponse | null {
    const { pathname, search } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';
    
    // Block common attack patterns
    const suspiciousPatterns = [
      /\.\./, // Directory traversal
      /<script/i, // XSS attempts
      /union.*select/i, // SQL injection
      /javascript:/i, // JavaScript protocol
      /vbscript:/i, // VBScript protocol
    ];
    
    const fullPath = pathname + search;
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(fullPath) || pattern.test(userAgent)) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
    
    // Block suspicious user agents
    const suspiciousUserAgents = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /masscan/i,
    ];
    
    for (const pattern of suspiciousUserAgents) {
      if (pattern.test(userAgent)) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
    
    return null; // Request is safe
  }

  static validateOrigin(
    request: NextRequest,
    allowedOrigins: string[] = []
  ): NextResponse | null {
    const origin = request.headers.get('origin');
    
    if (!origin) {
      return null; // No origin header (same-origin request)
    }
    
    if (allowedOrigins.length === 0) {
      return null; // No restrictions
    }
    
    if (!allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    
    return null; // Origin is allowed
  }

  static addCorsHeaders(
    response: NextResponse,
    allowedOrigins: string[] = ['*']
  ): NextResponse {
    const origin = response.headers.get('origin');
    
    if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Max-Age', '86400');
    }
    
    return response;
  }
}
    },
    {
