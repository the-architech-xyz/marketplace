/**
 * Session Management
 * 
 * Comprehensive session management utilities for Better Auth
 * Provides secure session handling with refresh, validation, and cleanup
 */

import { auth } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Session management result type
 */
interface SessionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  session?: any;
  user?: any;
}

/**
 * Session refresh options
 */
interface SessionRefreshOptions {
  extendExpiry?: boolean;
  updateLastActivity?: boolean;
  validatePermissions?: boolean;
  maxAge?: number; // in seconds
}

/**
 * Session validation options
 */
interface SessionValidationOptions {
  checkExpiry?: boolean;
  checkPermissions?: boolean;
  checkDevice?: boolean;
  checkLocation?: boolean;
  allowedRoles?: string[];
  requiredPermissions?: string[];
}

/**
 * Session management utilities
 */
export class SessionManager {
  /**
   * Refresh user session
   * 
   * @param request - Next.js request object
   * @param options - Refresh options
   * @returns Session result
   */
  static async refreshSession(
    request: NextRequest,
    options: SessionRefreshOptions = {}
  ): Promise<SessionResult> {
    try {
      const {
        extendExpiry = true,
        updateLastActivity = true,
        validatePermissions = false,
        maxAge = 7 * 24 * 60 * 60 // 7 days
      } = options;

      // Get current session
      const session = await auth.api.getSession({
        headers: request.headers
      });

      if (!session) {
        return {
          success: false,
          error: 'No active session found'
        };
      }

      // Check if session needs refresh
      const now = Date.now();
      const sessionAge = now - (session.createdAt?.getTime() || 0);
      const maxAgeMs = maxAge * 1000;

      if (sessionAge > maxAgeMs) {
        return {
          success: false,
          error: 'Session has expired'
        };
      }

      // Update session if needed
      if (extendExpiry || updateLastActivity) {
        await auth.api.updateSession({
          headers: request.headers,
          body: {
            extendExpiry,
            updateLastActivity,
            lastActivityAt: new Date().toISOString()
          }
        });
      }

      // Validate permissions if required
      if (validatePermissions) {
        const user = await auth.api.getUser({
          headers: request.headers
        });

        if (!user) {
          return {
            success: false,
            error: 'User not found'
          };
        }

        // Add permission validation logic here
        // This would depend on your specific permission system
      }

      return {
        success: true,
        session,
        data: {
          refreshed: true,
          expiresAt: session.expiresAt,
          lastActivityAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Session refresh failed'
      };
    }
  }

  /**
   * Validate session
   * 
   * @param request - Next.js request object
   * @param options - Validation options
   * @returns Session result
   */
  static async validateSession(
    request: NextRequest,
    options: SessionValidationOptions = {}
  ): Promise<SessionResult> {
    try {
      const {
        checkExpiry = true,
        checkPermissions = false,
        checkDevice = false,
        checkLocation = false,
        allowedRoles = [],
        requiredPermissions = []
      } = options;

      // Get current session
      const session = await auth.api.getSession({
        headers: request.headers
      });

      if (!session) {
        return {
          success: false,
          error: 'No active session found'
        };
      }

      // Check expiry
      if (checkExpiry && session.expiresAt) {
        const now = new Date();
        const expiresAt = new Date(session.expiresAt);
        
        if (now > expiresAt) {
          return {
            success: false,
            error: 'Session has expired'
          };
        }
      }

      // Get user for additional validation
      const user = await auth.api.getUser({
        headers: request.headers
      });

      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Check roles
      if (allowedRoles.length > 0) {
        const userRole = user.role || 'user';
        if (!allowedRoles.includes(userRole)) {
          return {
            success: false,
            error: 'Insufficient role permissions'
          };
        }
      }

      // Check permissions
      if (checkPermissions && requiredPermissions.length > 0) {
        const userPermissions = user.permissions || [];
        const hasAllPermissions = requiredPermissions.every(permission =>
          userPermissions.includes(permission)
        );

        if (!hasAllPermissions) {
          return {
            success: false,
            error: 'Insufficient permissions'
          };
        }
      }

      // Check device (if implemented)
      if (checkDevice) {
        const deviceId = request.headers.get('x-device-id');
        const sessionDeviceId = session.deviceId;

        if (deviceId && sessionDeviceId && deviceId !== sessionDeviceId) {
          return {
            success: false,
            error: 'Device mismatch'
          };
        }
      }

      // Check location (if implemented)
      if (checkLocation) {
        const clientIP = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
        const sessionIP = session.ipAddress;

        if (sessionIP && clientIP !== sessionIP) {
          return {
            success: false,
            error: 'Location mismatch'
          };
        }
      }

      return {
        success: true,
        session,
        user,
        data: {
          valid: true,
          userId: user.id,
          role: user.role,
          permissions: user.permissions
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Session validation failed'
      };
    }
  }

  /**
   * Invalidate session
   * 
   * @param request - Next.js request object
   * @param reason - Reason for invalidation
   * @returns Session result
   */
  static async invalidateSession(
    request: NextRequest,
    reason: string = 'Manual logout'
  ): Promise<SessionResult> {
    try {
      await auth.api.signOut({
        headers: request.headers
      });

      return {
        success: true,
        data: {
          invalidated: true,
          reason
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Session invalidation failed'
      };
    }
  }

  /**
   * Cleanup expired sessions
   * 
   * @param maxAge - Maximum age in seconds
   * @returns Session result
   */
  static async cleanupExpiredSessions(
    maxAge: number = 30 * 24 * 60 * 60 // 30 days
  ): Promise<SessionResult> {
    try {
      // This would need to be implemented based on your database
      // For now, we'll return a placeholder
      return {
        success: true,
        data: {
          cleaned: 0,
          maxAge
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Session cleanup failed'
      };
    }
  }

  /**
   * Get session statistics
   * 
   * @returns Session statistics
   */
  static async getSessionStats(): Promise<SessionResult> {
    try {
      // This would need to be implemented based on your database
      // For now, we'll return placeholder data
      return {
        success: true,
        data: {
          totalSessions: 0,
          activeSessions: 0,
          expiredSessions: 0,
          lastCleanup: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get session stats'
      };
    }
  }
}

/**
 * Session middleware for Next.js
 * Provides automatic session validation and refresh
 */
export class SessionMiddleware {
  /**
   * Create session middleware
   * 
   * @param options - Middleware options
   * @returns Middleware function
   */
  static create(options: {
    validateOnEveryRequest?: boolean;
    refreshThreshold?: number; // in seconds
    allowedPaths?: string[];
    excludedPaths?: string[];
  } = {}) {
    const {
      validateOnEveryRequest = true,
      refreshThreshold = 24 * 60 * 60, // 24 hours
      allowedPaths = [],
      excludedPaths = ['/api/auth', '/login', '/register']
    } = options;

    return async (request: NextRequest) => {
      const pathname = request.nextUrl.pathname;

      // Skip validation for excluded paths
      if (excludedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
      }

      // Check if path requires authentication
      if (allowedPaths.length > 0 && !allowedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
      }

      try {
        // Validate session
        const validation = await SessionManager.validateSession(request, {
          checkExpiry: true,
          checkPermissions: false
        });

        if (!validation.success) {
          return NextResponse.redirect(new URL('/login', request.url));
        }

        // Check if session needs refresh
        if (validation.session?.expiresAt) {
          const now = new Date();
          const expiresAt = new Date(validation.session.expiresAt);
          const timeUntilExpiry = expiresAt.getTime() - now.getTime();
          const refreshThresholdMs = refreshThreshold * 1000;

          if (timeUntilExpiry < refreshThresholdMs) {
            // Refresh session
            await SessionManager.refreshSession(request, {
              extendExpiry: true,
              updateLastActivity: true
            });
          }
        }

        return NextResponse.next();
      } catch (error) {
        console.error('Session middleware error:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    };
  }
}

/**
 * Session hooks for React components
 * Provides easy-to-use hooks for session management
 */
export class SessionHooks {
  /**
   * Hook for session validation
   * 
   * @param options - Validation options
   * @returns Session validation state
   */
  static useSessionValidation(options: SessionValidationOptions = {}) {
    // This would be implemented as a React hook
    // For now, we'll return a placeholder
    return {
      isValid: false,
      isLoading: true,
      error: null,
      session: null,
      user: null
    };
  }

  /**
   * Hook for session refresh
   * 
   * @param options - Refresh options
   * @returns Session refresh state
   */
  static useSessionRefresh(options: SessionRefreshOptions = {}) {
    // This would be implemented as a React hook
    // For now, we'll return a placeholder
    return {
      refresh: async () => {},
      isRefreshing: false,
      error: null
    };
  }

  /**
   * Hook for session cleanup
   * 
   * @returns Session cleanup state
   */
  static useSessionCleanup() {
    // This would be implemented as a React hook
    // For now, we'll return a placeholder
    return {
      cleanup: async () => {},
      isCleaning: false,
      error: null
    };
  }
}

/**
 * Session security utilities
 * Provides additional security measures for sessions
 */
export class SessionSecurity {
  /**
   * Generate secure session token
   * 
   * @param userId - User ID
   * @param deviceId - Device ID
   * @returns Secure session token
   */
  static generateSecureToken(userId: string, deviceId?: string): string {
    // This would generate a secure token
    // For now, we'll return a placeholder
    return `secure_token_${userId}_${deviceId || 'unknown'}`;
  }

  /**
   * Validate session token
   * 
   * @param token - Session token
   * @returns Validation result
   */
  static validateToken(token: string): { valid: boolean; userId?: string; deviceId?: string } {
    // This would validate the token
    // For now, we'll return a placeholder
    return {
      valid: false,
      userId: undefined,
      deviceId: undefined
    };
  }

  /**
   * Encrypt session data
   * 
   * @param data - Session data
   * @returns Encrypted data
   */
  static encryptSessionData(data: any): string {
    // This would encrypt the session data
    // For now, we'll return a placeholder
    return JSON.stringify(data);
  }

  /**
   * Decrypt session data
   * 
   * @param encryptedData - Encrypted session data
   * @returns Decrypted data
   */
  static decryptSessionData(encryptedData: string): any {
    // This would decrypt the session data
    // For now, we'll return a placeholder
    try {
      return JSON.parse(encryptedData);
    } catch {
      return null;
    }
  }
}
