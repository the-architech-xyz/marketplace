/**
 * Query Keys Factory
 * 
 * Centralized query key management for consistent caching and invalidation.
 * Used by both backend service and frontend components.
 */

export const authKeys = {
  all: ['auth'] as const,
  
  // Session management
  session: {
    all: ['auth', 'session'] as const,
    get: () => [...authKeys.session.all, 'get'] as const,
  },
  
  // User management
  user: {
    all: ['auth', 'user'] as const,
    get: () => [...authKeys.user.all, 'get'] as const,
    profile: () => [...authKeys.user.all, 'profile'] as const,
  },
  
  // Authentication
  auth: {
    all: ['auth', 'auth'] as const,
    state: () => [...authKeys.auth.all, 'state'] as const,
  },
  
  // Password management
  password: {
    all: ['auth', 'password'] as const,
    reset: () => [...authKeys.password.all, 'reset'] as const,
  },
  
  // Email verification
  email: {
    all: ['auth', 'email'] as const,
    verification: () => [...authKeys.email.all, 'verification'] as const,
  },
  
  // Two-factor authentication
  twoFactor: {
    all: ['auth', 'twoFactor'] as const,
    setup: () => [...authKeys.twoFactor.all, 'setup'] as const,
    verify: () => [...authKeys.twoFactor.all, 'verify'] as const,
    recoveryCodes: () => [...authKeys.twoFactor.all, 'recoveryCodes'] as const,
  },
  
  // Connected accounts (OAuth)
  accounts: {
    all: ['auth', 'accounts'] as const,
    list: () => [...authKeys.accounts.all, 'list'] as const,
  },
  
  // Organizations (optional subfeature)
  organizations: {
    all: ['auth', 'organizations'] as const,
    list: () => [...authKeys.organizations.all, 'list'] as const,
    detail: (id: string) => [...authKeys.organizations.all, 'detail', id] as const,
    members: (id: string) => [...authKeys.organizations.all, 'members', id] as const,
  },
  
  // Session management (active sessions)
  sessions: {
    all: ['auth', 'sessions'] as const,
    list: () => [...authKeys.sessions.all, 'list'] as const,
  },
} as const;

export type AuthKeys = typeof authKeys;
