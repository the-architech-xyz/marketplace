/**
 * Next.js API Routes Feature Blueprint
 * 
 * Comprehensive API routes with middleware, error handling, and utilities
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

export const nextjsApiRoutesBlueprint: Blueprint = {
  id: 'nextjs-api-routes',
  name: 'Next.js API Routes',
  description: 'Comprehensive API routes with middleware and error handling',
  actions: [
    // Create API utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/utils.ts',
      content: `/**
 * API utilities for Next.js 15+
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * API response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

/**
 * API error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code: string = 'API_ERROR'
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * API utilities class
 */
export class ApiUtils {
  /**
   * Create a successful response
   */
  static success<T>(data: T, message?: string, statusCode: number = 200): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    }, { status: statusCode });
  }

  /**
   * Create an error response
   */
  static error(error: string, statusCode: number = 400, code?: string): NextResponse<ApiResponse> {
    return NextResponse.json({
      success: false,
      error,
      code,
      timestamp: new Date().toISOString(),
    }, { status: statusCode });
  }

  /**
   * Handle API errors
   */
  static handleError(error: unknown): NextResponse<ApiResponse> {
    if (error instanceof ApiError) {
      return this.error(error.message, error.statusCode, error.code);
    }

    if (error instanceof Error) {
      return this.error(error.message, 500, 'INTERNAL_ERROR');
    }

    return this.error('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
  }

  /**
   * Get request body
   */
  static async getBody<T = any>(request: NextRequest): Promise<T> {
    try {
      const contentType = request.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        return await request.json();
      }
      
      if (contentType?.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        const body: any = {};
        formData.forEach((value, key) => {
          body[key] = value;
        });
        return body;
      }
      
      return {} as T;
    } catch (error) {
      throw new ApiError('Invalid request body', 400, 'INVALID_BODY');
    }
  }

  /**
   * Get query parameters
   */
  static getQueryParams(request: NextRequest): URLSearchParams {
    return request.nextUrl.searchParams;
  }

  /**
   * Get client IP
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
   * Validate required fields
   */
  static validateRequired(
    data: Record<string, any>,
    requiredFields: string[]
  ): void {
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new ApiError(
        \`Missing required fields: \${missingFields.join(', ')}\`,
        400,
        'MISSING_FIELDS'
      );
    }
  }

  /**
   * Add CORS headers
   */
  static addCorsHeaders(response: NextResponse): NextResponse {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
  }

  /**
   * Handle OPTIONS request
   */
  static handleOptions(): NextResponse {
    const response = new NextResponse(null, { status: 200 });
    return this.addCorsHeaders(response);
  }
}

/**
 * Rate limiting for API routes
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const apiRateLimit = {
  /**
   * Check if request is rate limited
   */
  isRateLimited: (identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean => {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
      return false;
    }

    if (record.count >= maxRequests) {
      return true;
    }

    record.count++;
    return false;
  },

  /**
   * Clear rate limit for identifier
   */
  clear: (identifier: string): void => {
    rateLimitMap.delete(identifier);
  },
};`
    },
    // Create API middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/middleware.ts',
      content: `/**
 * API middleware for Next.js 15+
 */

import { NextRequest, NextResponse } from 'next/server';
import { ApiUtils, ApiError, apiRateLimit } from './utils';

/**
 * API middleware configuration
 */
export interface ApiMiddlewareConfig {
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
  cors?: boolean;
  auth?: boolean;
  validateBody?: boolean;
}

/**
 * API middleware class
 */
export class ApiMiddleware {
  /**
   * Apply rate limiting
   */
  static rateLimit(config: ApiMiddlewareConfig = {}) {
    return (request: NextRequest): NextResponse | null => {
      const { rateLimit: rateLimitConfig } = config;
      
      if (!rateLimitConfig) return null;

      const ip = ApiUtils.getClientIP(request);
      const isLimited = apiRateLimit.isRateLimited(
        ip,
        rateLimitConfig.maxRequests,
        rateLimitConfig.windowMs
      );

      if (isLimited) {
        return ApiUtils.error('Too many requests', 429, 'RATE_LIMITED');
      }

      return null;
    };
  }

  /**
   * Apply CORS headers
   */
  static cors(config: ApiMiddlewareConfig = {}) {
    return (request: NextRequest): NextResponse | null => {
      const { cors } = config;
      
      if (!cors) return null;

      if (request.method === 'OPTIONS') {
        return ApiUtils.handleOptions();
      }

      return null;
    };
  }

  /**
   * Apply authentication (basic implementation)
   */
  static auth(config: ApiMiddlewareConfig = {}) {
    return (request: NextRequest): NextResponse | null => {
      const { auth } = config;
      
      if (!auth) return null;

      const authHeader = request.headers.get('authorization');
      
      if (!authHeader) {
        return ApiUtils.error('Authorization header required', 401, 'UNAUTHORIZED');
      }

      // Basic auth validation (in production, use proper JWT validation)
      if (!authHeader.startsWith('Bearer ')) {
        return ApiUtils.error('Invalid authorization format', 401, 'INVALID_AUTH');
      }

      return null;
    };
  }

  /**
   * Apply all middleware
   */
  static apply(config: ApiMiddlewareConfig = {}) {
    return async (request: NextRequest): Promise<NextResponse | null> => {
      // Apply middleware in order
      const middlewares = [
        this.rateLimit(config),
        this.cors(config),
        this.auth(config),
      ];

      for (const middleware of middlewares) {
        const result = middleware(request);
        if (result) return result;
      }

      return null;
    };
  }
}

/**
 * API route handler wrapper
 */
export function withApiHandler<T = any>(
  handler: (request: NextRequest) => Promise<NextResponse<T>>,
  config: ApiMiddlewareConfig = {}
) {
  return async (request: NextRequest): Promise<NextResponse<T>> => {
    try {
      // Apply middleware
      const middlewareResult = await ApiMiddleware.apply(config)(request);
      if (middlewareResult) return middlewareResult;

      // Call the actual handler
      return await handler(request);
    } catch (error) {
      return ApiUtils.handleError(error);
    }
  };
}`
    },
    // Create example API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/health/route.ts',
      content: `/**
 * Health check API route
 */

import { NextRequest } from 'next/server';
import.*';

export const GET = withApiHandler(async (request: NextRequest) => {
  return ApiUtils.success({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
}, {
  rateLimit: { maxRequests: 1000, windowMs: 60000 },
  cors: true,
});`
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/echo/route.ts',
      content: `/**
 * Echo API route - returns the request data
 */

import { NextRequest } from 'next/server';
import.*';

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await ApiUtils.getBody(request);
  const query = ApiUtils.getQueryParams(request);
  const ip = ApiUtils.getClientIP(request);

  return ApiUtils.success({
    method: request.method,
    body,
    query: Object.fromEntries(query.entries()),
    headers: Object.fromEntries(request.headers.entries()),
    ip,
    url: request.url,
  });
}, {
  rateLimit: { maxRequests: 100, windowMs: 60000 },
  cors: true,
});`
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/calculate/route.ts',
      content: `/**
 * Calculator API route
 */

import { NextRequest } from 'next/server';
import.*';

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await ApiUtils.getBody<{ operation: string; a: number; b: number }>(request);
  
  // Validate required fields
  ApiUtils.validateRequired(body, ['operation', 'a', 'b']);

  const { operation, a, b } = body;

  // Validate numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new ApiError('Both a and b must be numbers', 400, 'INVALID_NUMBERS');
  }

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new ApiError('Both a and b must be finite numbers', 400, 'INVALID_NUMBERS');
  }

  let result: number;

  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        throw new ApiError('Division by zero is not allowed', 400, 'DIVISION_BY_ZERO');
      }
      result = a / b;
      break;
    default:
      throw new ApiError('Invalid operation. Must be add, subtract, multiply, or divide', 400, 'INVALID_OPERATION');
  }

  return ApiUtils.success({
    operation,
    a,
    b,
    result,
    expression: \`\${a} \${operation} \${b} = \${result}\`,
  });
}, {
  rateLimit: { maxRequests: 50, windowMs: 60000 },
  cors: true,
});`
    }
  ]
};
