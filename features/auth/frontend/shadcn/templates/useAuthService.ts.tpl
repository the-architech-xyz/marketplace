/**
 * useAuthService - Frontend Hook for Auth Contract
 * 
 * This hook provides a clean interface to the IAuthService contract.
 * The frontend NEVER knows about Better Auth, JWT, CSRF, or any security implementation.
 * It only knows about User, Session, and business operations.
 * 
 * This enables:
 * - Same UI for any React framework (Next.js, Vite, CRA, etc.)
 * - Same contract for any backend (Better Auth, Auth0, Supabase, etc.)
 * - Clean separation of concerns
 * - Easy testing and mocking
 */

import { AuthService } from '@/lib/auth/AuthService';
import type { IAuthService } from '@/features/auth/contract';

/**
 * Main Auth Service Hook
 * 
 * Provides access to all authentication services through the contract.
 * This is the ONLY hook the frontend should use for auth operations.
 */
export function useAuthService(): IAuthService {
  return AuthService;
}

/**
 * Authentication Hook
 * 
 * Convenience hook for authentication operations only.
 * Use this when you only need sign in, sign up, sign out, etc.
 */
export function useAuthentication() {
  return AuthService.useAuthentication();
}

/**
 * Profile Hook
 * 
 * Convenience hook for profile management operations only.
 * Use this when you only need user profile operations.
 */
export function useProfile() {
  return AuthService.useProfile();
}

/**
 * Security Hook
 * 
 * Convenience hook for security operations only.
 * Use this when you only need 2FA, account linking, etc.
 */
export function useSecurity() {
  return AuthService.useSecurity();
}

/**
 * Password Management Hook
 * 
 * Convenience hook for password operations only.
 * Use this when you only need password reset, change password, etc.
 */
export function usePasswordManagement() {
  return AuthService.usePasswordManagement();
}

/**
 * Email Verification Hook
 * 
 * Convenience hook for email verification operations only.
 * Use this when you only need email verification operations.
 */
export function useEmailVerification() {
  return AuthService.useEmailVerification();
}

/**
 * Session Management Hook
 * 
 * Convenience hook for session management operations only.
 * Use this when you only need session operations.
 */
export function useSessionManagement() {
  return AuthService.useSessionManagement();
}

/**
 * Organizations Hook
 * 
 * Convenience hook for organization operations only.
 * Use this when you only need organization operations.
 * Only available if organizations feature is enabled.
 */
export function useOrganizations() {
  return AuthService.useOrganizations?.();
}

// Re-export types for convenience
export type {
  User,
  Session,
  ConnectedAccount,
  Organization,
  AuthState,
  AuthResult,
  OAuthResult,
  PasswordResetResult,
  EmailVerificationResult,
  TwoFactorResult,
  MagicLinkResult,
  SignInData,
  SignUpData,
  OAuthSignInData,
  ForgotPasswordData,
  ResetPasswordData,
  UpdateProfileData,
  ChangePasswordData,
  VerifyEmailData,
  ResendVerificationData,
  TwoFactorSetupData,
  TwoFactorVerifyData,
  MagicLinkData,
  AuthError,
  AuthConfig,
  IAuthService,
} from '@/features/auth/contract';
