/**
 * Next.js Security Feature Blueprint
 * 
 * Comprehensive security middleware and headers for Next.js 15+
 * Includes CSP, HSTS, and other security best practices
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const nextjsSecurityBlueprint: Blueprint = {
  id: 'nextjs-security-setup',
  name: 'Next.js Security Headers',
  description: 'Comprehensive security middleware and headers for Next.js 15+',
  actions: [
    // Install security packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'helmet@^7.1.0',
        '@types/helmet@^4.0.0'
      ]
    },
    // Create comprehensive security middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      content: `import { NextRequest, NextResponse } from 'next/server';

/**
 * Security middleware for Next.js 15+
 * Implements comprehensive security headers and protections
 */

// Security headers configuration
const securityHeaders = {
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https: wss:",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),

  // HTTP Strict Transport Security
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // X-Frame-Options
  'X-Frame-Options': 'DENY',

  // X-Content-Type-Options
  'X-Content-Type-Options': 'nosniff',

  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions Policy
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', '),

  // X-DNS-Prefetch-Control
  'X-DNS-Prefetch-Control': 'on',

  // Cross-Origin Embedder Policy
  'Cross-Origin-Embedder-Policy': 'require-corp',

  // Cross-Origin Opener Policy
  'Cross-Origin-Opener-Policy': 'same-origin',

  // Cross-Origin Resource Policy
  'Cross-Origin-Resource-Policy': 'same-origin',
};

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// IP whitelist for admin routes
const ADMIN_IPS = process.env.ADMIN_IPS?.split(',') || [];

function isAdminIP(ip: string): boolean {
  return ADMIN_IPS.includes(ip);
}

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /php/i,
];

function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

// Suspicious request patterns
const SUSPICIOUS_PATTERNS = [
  /\.\.\//, // Directory traversal
  /<script/i, // XSS attempts
  /union\s+select/i, // SQL injection
  /javascript:/i, // JavaScript injection
  /on\w+\s*=/i, // Event handler injection
];

function isSuspiciousRequest(pathname: string, searchParams: string): boolean {
  const fullPath = pathname + searchParams;
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(fullPath));
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';

  // Rate limiting
  if (!rateLimit(ip)) {
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
        ...securityHeaders,
      },
    });
  }

  // Bot detection and handling
  if (isBot(userAgent)) {
    // Allow bots for SEO purposes but with limited access
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/health')) {
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: securityHeaders,
      });
    }
  }

  // Suspicious request detection
  if (isSuspiciousRequest(pathname, searchParams.toString())) {
    return new NextResponse('Bad Request', { 
      status: 400,
      headers: securityHeaders,
    });
  }

  // Admin route protection
  if (pathname.startsWith('/admin') && !isAdminIP(ip)) {
    return new NextResponse('Forbidden', { 
      status: 403,
      headers: securityHeaders,
    });
  }

  // Create response with security headers
  const response = NextResponse.next();

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Additional security headers based on request
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }

  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
  }

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};`
    },
    // Create security utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/security.ts',
      content: `/**
 * Security utilities for Next.js 15+
 */

import { NextRequest } from 'next/server';

/**
 * Security configuration
 */
export const securityConfig = {
  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    skipSuccessfulRequests: false,
  },
  
  // CORS
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  
  // Content Security Policy
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://vercel.live"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https:", "wss:"],
      mediaSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};

/**
 * Security utilities class
 */
export class SecurityUtils {
  /**
   * Validate and sanitize input
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  }

  /**
   * Check if request is from a trusted origin
   */
  static isTrustedOrigin(origin: string | null): boolean {
    if (!origin) return false;
    return securityConfig.cors.allowedOrigins.includes(origin);
  }

  /**
   * Generate secure random string
   */
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Validate CSRF token
   */
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken && token.length > 0;
  }

  /**
   * Check if IP is in whitelist
   */
  static isWhitelistedIP(ip: string): boolean {
    const whitelist = process.env.IP_WHITELIST?.split(',') || [];
    return whitelist.includes(ip);
  }

  /**
   * Detect potential XSS attacks
   */
  static detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<link/i,
      /<meta/i,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Detect potential SQL injection
   */
  static detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+set/i,
      /or\s+1\s*=\s*1/i,
      /and\s+1\s*=\s*1/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Detect potential directory traversal
   */
  static detectDirectoryTraversal(input: string): boolean {
    const traversalPatterns = [
      /\.\.\//,
      /\.\.\\\\/,
      /%2e%2e%2f/i,
      /%2e%2e%5c/i,
    ];
    
    return traversalPatterns.some(pattern => pattern.test(input));
  }

  /**
   * Get client IP address
   */
  static getClientIP(request: NextRequest): string {
    return (
      request.ip ||
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'
    );
  }

  /**
   * Check if request is from a bot
   */
  static isBot(userAgent: string): boolean {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
      /php/i,
    ];
    
    return botPatterns.some(pattern => pattern.test(userAgent));
  }

  /**
   * Generate security headers
   */
  static generateSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    };
  }
}

/**
 * Security middleware helpers
 */
export const securityMiddleware = {
  /**
   * Apply security headers to response
   */
  applyHeaders: (response: Response): Response => {
    const headers = SecurityUtils.generateSecurityHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  },

  /**
   * Validate request security
   */
  validateRequest: (request: NextRequest): { isValid: boolean; reason?: string } => {
    const userAgent = request.headers.get('user-agent') || '';
    const ip = SecurityUtils.getClientIP(request);
    
    // Check for bots
    if (SecurityUtils.isBot(userAgent)) {
      return { isValid: false, reason: 'Bot detected' };
    }
    
    // Check IP whitelist
    if (!SecurityUtils.isWhitelistedIP(ip)) {
      return { isValid: false, reason: 'IP not whitelisted' };
    }
    
    return { isValid: true };
  },
};`
    },
    // Create security monitoring component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/security/SecurityMonitor.tsx',
      content: `'use client';

import React, { useEffect, useState } from 'react';

interface SecurityEvent {
  id: string;
  type: 'blocked' | 'allowed' | 'warning';
  message: string;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}

export const SecurityMonitor: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate security events (in production, this would come from a real monitoring system)
    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'allowed',
        message: 'Request allowed from trusted IP',
        timestamp: new Date(),
        ip: '192.168.1.1',
      },
      {
        id: '2',
        type: 'blocked',
        message: 'Blocked suspicious request pattern',
        timestamp: new Date(Date.now() - 60000),
        ip: '10.0.0.1',
      },
      {
        id: '3',
        type: 'warning',
        message: 'Rate limit approaching',
        timestamp: new Date(Date.now() - 120000),
        ip: '192.168.1.2',
      },
    ];

    setEvents(mockEvents);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
      >
        Security Monitor
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-900">Security Events</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className={\`p-2 rounded text-sm \${{
              blocked: 'bg-red-50 border-l-4 border-red-400',
              allowed: 'bg-green-50 border-l-4 border-green-400',
              warning: 'bg-yellow-50 border-l-4 border-yellow-400',
            }[event.type]}\`}
          >
            <div className="flex justify-between items-start">
              <span className="font-medium">{event.message}</span>
              <span className="text-xs text-gray-500">
                {event.timestamp.toLocaleTimeString()}
              </span>
            </div>
            {event.ip && (
              <div className="text-xs text-gray-600 mt-1">
                IP: {event.ip}
              </div>
            )}
          </div>
        ))}
        
        {events.length === 0 && (
          <p className="text-sm text-gray-500">No security events</p>
        )}
      </div>
    </div>
  );
};`
    }
  ]
};
