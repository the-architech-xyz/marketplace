import { vi } from 'vitest';
import type { Session } from 'next-auth';

// Mock NextAuth session
export const mockSession: Session = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg'
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
};

// Mock NextAuth session with no user (unauthenticated)
export const mockUnauthenticatedSession: Session = {
  user: null,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
};

// Mock NextAuth session with admin user
export const mockAdminSession: Session = {
  user: {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    image: 'https://example.com/admin-avatar.jpg',
    role: 'admin'
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
};

// Mock NextAuth hooks
export const mockUseSession = vi.fn(() => ({
  data: mockSession,
  status: 'authenticated',
  update: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn()
}));

export const mockUseSessionUnauthenticated = vi.fn(() => ({
  data: mockUnauthenticatedSession,
  status: 'unauthenticated',
  update: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn()
}));

export const mockUseSessionLoading = vi.fn(() => ({
  data: undefined,
  status: 'loading',
  update: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn()
}));

// Mock NextAuth providers
export const mockProviders = {
  google: {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    signinUrl: 'https://accounts.google.com/oauth/authorize',
    callbackUrl: 'http://localhost:3000/api/auth/callback/google'
  },
  github: {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    signinUrl: 'https://github.com/login/oauth/authorize',
    callbackUrl: 'http://localhost:3000/api/auth/callback/github'
  }
};

// Mock NextAuth client
export const mockNextAuthClient = {
  getSession: vi.fn(() => Promise.resolve(mockSession)),
  getProviders: vi.fn(() => Promise.resolve(mockProviders)),
  signIn: vi.fn(() => Promise.resolve({ ok: true, url: null, error: null })),
  signOut: vi.fn(() => Promise.resolve({ url: '/' })),
  getCsrfToken: vi.fn(() => Promise.resolve('mock-csrf-token')),
  getProviders: vi.fn(() => Promise.resolve(mockProviders))
};

// Mock NextAuth API routes
export const mockNextAuthApi = {
  '/api/auth/session': {
    GET: vi.fn(() => Promise.resolve(mockSession))
  },
  '/api/auth/providers': {
    GET: vi.fn(() => Promise.resolve(mockProviders))
  },
  '/api/auth/csrf': {
    GET: vi.fn(() => Promise.resolve({ csrfToken: 'mock-csrf-token' }))
  }
};

// Helper function to set up NextAuth mocks
export const setupNextAuthMocks = (session: Session | null = mockSession) => {
  vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({
      data: session,
      status: session ? 'authenticated' : 'unauthenticated',
      update: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn()
    })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(() => Promise.resolve(session)),
    getProviders: vi.fn(() => Promise.resolve(mockProviders)),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children
  }));

  vi.mock('next-auth', () => ({
    getServerSession: vi.fn(() => Promise.resolve(session)),
    getSession: vi.fn(() => Promise.resolve(session)),
    getProviders: vi.fn(() => Promise.resolve(mockProviders))
  }));
};

// Helper function to create custom session
export const createMockSession = (overrides: Partial<Session> = {}): Session => ({
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg'
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  ...overrides
});

// Helper function to create custom user
export const createMockUser = (overrides: any = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  image: 'https://example.com/avatar.jpg',
  ...overrides
});
