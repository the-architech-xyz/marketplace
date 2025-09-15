/**
 * Better Auth Session Management Feature
 * 
 * Adds advanced session management capabilities to Better Auth
 */

import { Blueprint } from '@thearchitech.xyz/types';

const sessionManagementBlueprint: Blueprint = {
  id: 'better-auth-session-management',
  name: 'Better Auth Session Management',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/auth/session-config.ts',
      content: `// Advanced Session Management Configuration
export const sessionConfig = {
  strategy: '{{module.parameters.strategy}}',
  {{#if (eq module.parameters.strategy "jwt")}}
  jwt: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    secret: process.env.AUTH_SECRET!,
  },
  {{else if (eq module.parameters.strategy "database")}}
  database: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cleanupInterval: 60 * 60 * 24, // 1 day
  },
  {{else if (eq module.parameters.strategy "hybrid")}}
  hybrid: {
    jwt: {
      expiresIn: 60 * 60 * 24, // 1 day
      secret: process.env.AUTH_SECRET!,
    },
    database: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
  },
  {{/if}}
  security: {
    csrfProtection: true,
    rateLimiting: {
      enabled: true,
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    },
    trustedOrigins: [
      process.env.AUTH_URL || "{{env.APP_URL}}",
    ],
  },
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/auth/session-utils.ts',
      content: `import { auth } from './config';
import { sessionConfig } from './session-config';

// Session utilities
export class SessionManager {
  static async createSession(userId: string, metadata?: Record<string, any>) {
    return await auth.api.createSession({
      userId,
      metadata,
    });
  }

  static async getSession(sessionId: string) {
    return await auth.api.getSession({
      sessionId,
    });
  }

  static async updateSession(sessionId: string, metadata: Record<string, any>) {
    return await auth.api.updateSession({
      sessionId,
      metadata,
    });
  }

  static async deleteSession(sessionId: string) {
    return await auth.api.deleteSession({
      sessionId,
    });
  }

  static async deleteAllUserSessions(userId: string) {
    return await auth.api.deleteAllUserSessions({
      userId,
    });
  }

  static async validateSession(sessionId: string) {
    try {
      const session = await this.getSession(sessionId);
      if (!session) return false;

      const now = Date.now();
      const expiresAt = new Date(session.expiresAt).getTime();
      
      if (now > expiresAt) {
        await this.deleteSession(sessionId);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }
}

// Session middleware
export function withSession(handler: any) {
  return async (req: any, res: any) => {
    const sessionId = req.cookies['better-auth.session_token'];
    
    if (!sessionId) {
      return res.status(401).json({ error: 'No session found' });
    }

    const isValid = await SessionManager.validateSession(sessionId);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.session = await SessionManager.getSession(sessionId);
    return handler(req, res);
  };
}`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/auth/session-middleware.ts',
      content: `import { SessionManager } from './session-utils';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimitMiddleware(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
  return (ip: string) => {
    const now = Date.now();
    
    const current = rateLimitStore.get(ip);
    
    if (!current || now > current.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return { allowed: true };
    }
    
    if (current.count >= maxAttempts) {
      return { allowed: false, error: 'Too Many Requests' };
    }
    
    current.count++;
    return { allowed: true };
  };
}

export function sessionMiddleware(sessionId: string) {
  if (!sessionId) {
    return { valid: false };
  }

  // Validate session
  return SessionManager.validateSession(sessionId).then(isValid => {
    return { valid: isValid };
  });
}`
    },
  ]
};
export default sessionManagementBlueprint;
