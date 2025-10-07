/**
 * Authentication Backend Implementation: Better Auth + Next.js
 * 
 * This implementation provides the backend logic for the authentication capability
 * using Better Auth and Next.js. It generates API routes and hooks that fulfill
 * the contract defined in the parent feature's contract.ts.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const authBetterAuthNextjsBlueprint: Blueprint = {
  id: 'auth-backend-better-auth-nextjs',
  name: 'Authentication Backend (Better Auth + Next.js)',
  description: 'Backend implementation for authentication capability using Better Auth and Next.js',
  actions: [
    // Install Better Auth
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'better-auth@^0.7.0',
        '@tanstack/react-query@^5.0.0',
        'next-auth@^4.24.5'
      ]
    },

    // Create auth service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/service.ts',
      content: `/**
 * Authentication Service - Better Auth Implementation
 * 
 * This service provides the backend implementation for the authentication capability
 * using Better Auth. It implements all the operations defined in the contract.
 */

import { betterAuth ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'better-auth';
import { 
  User, 
  Session, 
  Account, 
  VerificationToken, 
  PasswordResetToken,
  TwoFactorSecret,
  TwoFactorBackupCode,
  SignInCredentials,
  SignUpCredentials,
  ResetPasswordData,
  UpdatePasswordData,
  UpdateProfileData,
  VerifyEmailData,
  EnableTwoFactorData,
  VerifyTwoFactorData,
  OAuthProviderData
} from '../contract';

// Initialize Better Auth
export const auth = betterAuth({
  database: {
    provider: 'sqlite', // This would be configured based on the database adapter
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  twoFactor: {
    enabled: true,
    issuer: process.env.NEXT_PUBLIC_APP_NAME || 'Your App',
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
  },
});

export class AuthService {
  // Authentication state
  async getCurrentUser(): Promise<User | null> {
    try {
      // This would be called from the client-side hook
      // The actual implementation would depend on how Better Auth exposes the current user
      return null; // Placeholder
    } catch (error) {
      throw new Error(\`Failed to get current user: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getCurrentSession(): Promise<Session | null> {
    try {
      // This would be called from the client-side hook
      return null; // Placeholder
    } catch (error) {
      throw new Error(\`Failed to get current session: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Sign in/out operations
  async signIn(credentials: SignInCredentials): Promise<{ user: User; session: Session }> {
    try {
      const result = await auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
          rememberMe: credentials.rememberMe || false,
        },
      });

      if (!result.user || !result.session) {
        throw new Error('Sign in failed');
      }

      return {
        user: this.mapUser(result.user),
        session: this.mapSession(result.session),
      };
    } catch (error) {
      throw new Error(\`Failed to sign in: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async signUp(credentials: SignUpCredentials): Promise<{ user: User; session: Session }> {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        },
      });

      if (!result.user || !result.session) {
        throw new Error('Sign up failed');
      }

      return {
        user: this.mapUser(result.user),
        session: this.mapSession(result.session),
      };
    } catch (error) {
      throw new Error(\`Failed to sign up: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.api.signOut({
        body: {},
      });
    } catch (error) {
      throw new Error(\`Failed to sign out: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Password management
  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      await auth.api.forgetPassword({
        body: {
          email: data.email,
          redirectTo: \`\${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password\`,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to reset password: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async updatePassword(data: UpdatePasswordData): Promise<void> {
    try {
      await auth.api.changePassword({
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to update password: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Profile management
  async updateProfile(data: UpdateProfileData): Promise<User> {
    try {
      const result = await auth.api.updateUser({
        body: {
          name: data.name,
          email: data.email,
          image: data.image,
          // Better Auth might handle preferences differently
        },
      });

      if (!result.user) {
        throw new Error('Update profile failed');
      }

      return this.mapUser(result.user);
    } catch (error) {
      throw new Error(\`Failed to update profile: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Email verification
  async verifyEmail(data: VerifyEmailData): Promise<void> {
    try {
      await auth.api.verifyEmail({
        body: {
          token: data.token,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to verify email: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async resendVerification(email: string): Promise<void> {
    try {
      await auth.api.resendVerificationEmail({
        body: {
          email,
          redirectTo: \`\${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email\`,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to resend verification: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Two-factor authentication
  async enableTwoFactor(): Promise<TwoFactorSecret> {
    try {
      const result = await auth.api.twoFactor.setup({
        body: {},
      });

      return {
        secret: result.secret,
        qrCode: result.qrCode,
        backupCodes: result.backupCodes,
      };
    } catch (error) {
      throw new Error(\`Failed to enable two-factor: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async verifyTwoFactor(data: VerifyTwoFactorData): Promise<void> {
    try {
      await auth.api.twoFactor.verify({
        body: {
          code: data.code,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to verify two-factor: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async disableTwoFactor(backupCode: string): Promise<void> {
    try {
      await auth.api.twoFactor.disable({
        body: {
          backupCode,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to disable two-factor: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getTwoFactorSecret(): Promise<TwoFactorSecret | null> {
    try {
      const result = await auth.api.twoFactor.getSecret({
        body: {},
      });

      return result ? {
        secret: result.secret,
        qrCode: result.qrCode,
        backupCodes: result.backupCodes,
      } : null;
    } catch (error) {
      throw new Error(\`Failed to get two-factor secret: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getTwoFactorBackupCodes(): Promise<TwoFactorBackupCode[]> {
    try {
      const result = await auth.api.twoFactor.getBackupCodes({
        body: {},
      });

      return result.codes.map(code => ({
        id: code.id,
        userId: code.userId,
        code: code.code,
        used: code.used,
        usedAt: code.usedAt ? new Date(code.usedAt) : undefined,
        createdAt: new Date(code.createdAt),
      }));
    } catch (error) {
      throw new Error(\`Failed to get backup codes: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async generateBackupCodes(): Promise<TwoFactorBackupCode[]> {
    try {
      const result = await auth.api.twoFactor.generateBackupCodes({
        body: {},
      });

      return result.codes.map(code => ({
        id: code.id,
        userId: code.userId,
        code: code.code,
        used: false,
        createdAt: new Date(code.createdAt),
      }));
    } catch (error) {
      throw new Error(\`Failed to generate backup codes: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // OAuth operations
  async getOAuthSignInUrl(data: OAuthProviderData): Promise<{ url: string }> {
    try {
      const result = await auth.api.getOAuthSignInUrl({
        body: {
          provider: data.provider,
          redirectTo: data.redirectUrl || \`\${process.env.NEXT_PUBLIC_APP_URL}/auth/callback\`,
        },
      });

      return { url: result.url };
    } catch (error) {
      throw new Error(\`Failed to get OAuth URL: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async handleOAuthCallback(provider: string, code: string, state?: string): Promise<{ user: User; session: Session }> {
    try {
      const result = await auth.api.signInSocial({
        body: {
          provider: provider as any,
          code,
          state,
        },
      });

      if (!result.user || !result.session) {
        throw new Error('OAuth callback failed');
      }

      return {
        user: this.mapUser(result.user),
        session: this.mapSession(result.session),
      };
    } catch (error) {
      throw new Error(\`Failed to handle OAuth callback: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const result = await auth.api.getAccounts({
        body: {},
      });

      return result.accounts.map(account => this.mapAccount(account));
    } catch (error) {
      throw new Error(\`Failed to get accounts: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async linkAccount(data: OAuthProviderData): Promise<Account> {
    try {
      const result = await auth.api.linkAccount({
        body: {
          provider: data.provider,
          redirectTo: data.redirectUrl || \`\${process.env.NEXT_PUBLIC_APP_URL}/auth/callback\`,
        },
      });

      return this.mapAccount(result.account);
    } catch (error) {
      throw new Error(\`Failed to link account: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async unlinkAccount(accountId: string): Promise<void> {
    try {
      await auth.api.unlinkAccount({
        body: {
          accountId,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to unlink account: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Account management
  async deleteAccount(userId: string): Promise<void> {
    try {
      await auth.api.deleteUser({
        body: {
          userId,
        },
      });
    } catch (error) {
      throw new Error(\`Failed to delete account: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async exportData(): Promise<Blob> {
    try {
      const result = await auth.api.exportUserData({
        body: {},
      });

      return new Blob([JSON.stringify(result.data)], { type: 'application/json' });
    } catch (error) {
      throw new Error(\`Failed to export data: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Helper methods
  private mapUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified ? new Date(user.emailVerified) : undefined,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
      preferences: {
        theme: user.preferences?.theme || 'system',
        language: user.preferences?.language || 'en',
        timezone: user.preferences?.timezone || 'UTC',
        notifications: {
          email: user.preferences?.notifications?.email ?? true,
          push: user.preferences?.notifications?.push ?? true,
          marketing: user.preferences?.notifications?.marketing ?? false,
          security: user.preferences?.notifications?.security ?? true,
        },
      },
      metadata: user.metadata || {},
    };
  }

  private mapSession(session: any): Session {
    return {
      id: session.id,
      userId: session.userId,
      expiresAt: new Date(session.expiresAt),
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      isActive: session.isActive,
    };
  }

  private mapAccount(account: any): Account {
    return {
      id: account.id,
      userId: account.userId,
      provider: account.provider,
      providerAccountId: account.providerAccountId,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      expiresAt: account.expiresAt ? new Date(account.expiresAt) : undefined,
      scope: account.scope,
      idToken: account.idToken,
      createdAt: new Date(account.createdAt),
      updatedAt: new Date(account.updatedAt),
    };
  }
}

export const authService = new AuthService();`
    },

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/auth/[...auth]/route.ts',
      content: `/**
 * Authentication API Route
 * 
 * This route handles all authentication operations using Better Auth
 */

import { auth ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/lib/auth/service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return auth.handler(request);
}

export async function POST(request: NextRequest) {
  return auth.handler(request);
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/auth/signin/route.ts',
      content: `/**
 * Sign In API Route
 */

import { NextRequest, NextResponse ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'next/server';
import { authService } from '@/lib/auth/service';
import { SignInCredentials } from '@/lib/auth/contract';

export async function POST(request: NextRequest) {
  try {
    const credentials: SignInCredentials = await request.json();
    const result = await authService.signIn(credentials);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error signing in:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sign in' },
      { status: 401 }
    );
  }
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/auth/signup/route.ts',
      content: `/**
 * Sign Up API Route
 */

import { NextRequest, NextResponse ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'next/server';
import { authService } from '@/lib/auth/service';
import { SignUpCredentials } from '@/lib/auth/contract';

export async function POST(request: NextRequest) {
  try {
    const credentials: SignUpCredentials = await request.json();
    const result = await authService.signUp(credentials);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error signing up:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sign up' },
      { status: 400 }
    );
  }
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/auth/signout/route.ts',
      content: `/**
 * Sign Out API Route
 */

import { NextRequest, NextResponse ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'next/server';
import { authService } from '@/lib/auth/service';

export async function POST(request: NextRequest) {
  try {
    await authService.signOut();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error signing out:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to sign out' },
      { status: 500 }
    );
  }
}`
    },

    // Create TanStack Query hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/hooks.ts',
      content: `/**
 * Authentication Hooks - Better Auth + Next.js Implementation
 * 
 * This file provides the TanStack Query hooks that fulfill the contract
 * defined in the parent feature's contract.ts.
 */

import { useQuery, useMutation, useQueryClient ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@tanstack/react-query';
import { 
  User, 
  Session, 
  Account, 
  TwoFactorSecret,
  TwoFactorBackupCode,
  SignInCredentials,
  SignUpCredentials,
  ResetPasswordData,
  UpdatePasswordData,
  UpdateProfileData,
  VerifyEmailData,
  VerifyTwoFactorData,
  OAuthProviderData,
  UseUserResult,
  UseSessionResult,
  UseAuthStateResult,
  UseAccountsResult,
  UseAccountResult,
  UseTwoFactorSecretResult,
  UseTwoFactorBackupCodesResult,
  UseSignInResult,
  UseSignUpResult,
  UseSignOutResult,
  UseResetPasswordResult,
  UseUpdatePasswordResult,
  UseUpdateProfileResult,
  UseVerifyEmailResult,
  UseResendVerificationResult,
  UseEnableTwoFactorResult,
  UseVerifyTwoFactorResult,
  UseDisableTwoFactorResult,
  UseGenerateBackupCodesResult,
  UseOAuthSignInResult,
  UseOAuthCallbackResult,
  UseDeleteAccountResult
} from './contract';

// ============================================================================
// AUTH STATE HOOKS
// ============================================================================

export function useUser(): UseUserResult {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/user');
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    }
  });
}

export function useSession(): UseSessionResult {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const response = await fetch('/api/auth/session');
      if (!response.ok) throw new Error('Failed to fetch session');
      return response.json();
    }
  });
}

export function useAuthState(): UseAuthStateResult {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const { data: session, isLoading: sessionLoading, error: sessionError } = useSession();

  return {
    data: {
      user: user || null,
      session: session || null,
      isLoading: userLoading || sessionLoading,
      error: userError || sessionError || null,
    },
    isLoading: userLoading || sessionLoading,
    error: userError || sessionError || null,
  } as UseAuthStateResult;
}

export function useIsAuthenticated(): boolean {
  const { data: user } = useUser();
  return !!user;
}

export function useIsLoading(): boolean {
  const { isLoading } = useAuthState();
  return isLoading;
}

export function useAuthError() {
  const { error } = useAuthState();
  return error;
}

// ============================================================================
// AUTH ACTION HOOKS
// ============================================================================

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) throw new Error('Failed to sign in');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useSignUp(): UseSignUpResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) throw new Error('Failed to sign up');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useSignOut(): UseSignOutResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/signout', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to sign out');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useResetPassword(): UseResetPasswordResult {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to reset password');
    }
  });
}

export function useUpdatePassword(): UseUpdatePasswordResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePasswordData) => {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update password');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useUpdateProfile(): UseUpdateProfileResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    }
  });
}

// ============================================================================
// EMAIL VERIFICATION HOOKS
// ============================================================================

export function useVerifyEmail(): UseVerifyEmailResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyEmailData) => {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to verify email');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    }
  });
}

export function useResendVerification(): UseResendVerificationResult {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!response.ok) throw new Error('Failed to resend verification');
    }
  });
}

// ============================================================================
// TWO-FACTOR AUTHENTICATION HOOKS
// ============================================================================

export function useEnableTwoFactor(): UseEnableTwoFactorResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/two-factor/enable', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to enable two-factor');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'two-factor'] });
    }
  });
}

export function useVerifyTwoFactor(): UseVerifyTwoFactorResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyTwoFactorData) => {
      const response = await fetch('/api/auth/two-factor/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to verify two-factor');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'two-factor'] });
    }
  });
}

export function useDisableTwoFactor(): UseDisableTwoFactorResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (backupCode: string) => {
      const response = await fetch('/api/auth/two-factor/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backupCode })
      });
      if (!response.ok) throw new Error('Failed to disable two-factor');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'two-factor'] });
    }
  });
}

export function useTwoFactorSecret(): UseTwoFactorSecretResult {
  return useQuery({
    queryKey: ['auth', 'two-factor', 'secret'],
    queryFn: async () => {
      const response = await fetch('/api/auth/two-factor/secret');
      if (!response.ok) throw new Error('Failed to fetch two-factor secret');
      return response.json();
    }
  });
}

export function useTwoFactorBackupCodes(): UseTwoFactorBackupCodesResult {
  return useQuery({
    queryKey: ['auth', 'two-factor', 'backup-codes'],
    queryFn: async () => {
      const response = await fetch('/api/auth/two-factor/backup-codes');
      if (!response.ok) throw new Error('Failed to fetch backup codes');
      return response.json();
    }
  });
}

export function useGenerateBackupCodes(): UseGenerateBackupCodesResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/two-factor/generate-backup-codes', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to generate backup codes');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'two-factor', 'backup-codes'] });
    }
  });
}

// ============================================================================
// OAUTH HOOKS
// ============================================================================

export function useOAuthSignIn(): UseOAuthSignInResult {
  return useMutation({
    mutationFn: async (data: OAuthProviderData) => {
      const response = await fetch('/api/auth/oauth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to get OAuth URL');
      return response.json();
    }
  });
}

export function useOAuthCallback(): UseOAuthCallbackResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ provider, code, state }: { provider: string; code: string; state?: string }) => {
      const response = await fetch('/api/auth/oauth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, code, state })
      });
      if (!response.ok) throw new Error('Failed to handle OAuth callback');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useAccounts(): UseAccountsResult {
  return useQuery({
    queryKey: ['auth', 'accounts'],
    queryFn: async () => {
      const response = await fetch('/api/auth/accounts');
      if (!response.ok) throw new Error('Failed to fetch accounts');
      return response.json();
    }
  });
}

export function useAccount(provider: string): UseAccountResult {
  return useQuery({
    queryKey: ['auth', 'accounts', provider],
    queryFn: async () => {
      const response = await fetch(\`/api/auth/accounts/\${provider}\`);
      if (!response.ok) throw new Error('Failed to fetch account');
      return response.json();
    },
    enabled: !!provider
  });
}

export function useLinkAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OAuthProviderData) => {
      const response = await fetch('/api/auth/accounts/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to link account');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'accounts'] });
    }
  });
}

export function useUnlinkAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      const response = await fetch(\`/api/auth/accounts/\${accountId}/unlink\`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to unlink account');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'accounts'] });
    }
  });
}

// ============================================================================
// ACCOUNT MANAGEMENT HOOKS
// ============================================================================

export function useDeleteAccount(): UseDeleteAccountResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(\`/api/auth/account/\${userId}\`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete account');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
}

export function useExportData() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/export-data', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to export data');
      return response.blob();
    }
  });
}`
    }
  ]
};
