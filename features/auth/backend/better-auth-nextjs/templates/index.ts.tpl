/**
 * Auth Backend - Better Auth Next.js
 * 
 * This is the main export file for the auth backend.
 * Frontend components import from this file to get all auth functionality.
 * 
 * Architecture:
 * - Backend: Better Auth + Drizzle + Next.js (handles ALL security concerns)
 * - Frontend: Any React framework (consumes this contract)
 * 
 * Security handled by Better Auth:
 * - JWT tokens and session management
 * - CSRF protection with trusted origins
 * - Rate limiting and brute force protection
 * - Password hashing (bcrypt/argon2)
 * - XSS protection (httpOnly cookies)
 * - OAuth flows and account linking
 */

// ============================================================================
// CORE EXPORTS
// ============================================================================

// Better Auth configuration
export { auth } from '@/lib/auth/config';
export { authHandler } from '@/lib/auth/config';

// Better Auth client
export { authClient } from '@/lib/auth/client';
export type { AuthClient } from '@/lib/auth/client';

// Query keys factory
export { authKeys } from '@/lib/auth/query-keys';
export type { AuthKeys } from '@/lib/auth/query-keys';

// ============================================================================
// CORE HOOKS (Phase 2)
// ============================================================================

// Session management
export { 
  useSession,
  useSessionValid,
  useSessionExpired,
  useSessionExpiring,
  useSessionToken,
  useSessionId,
  useSessionCreatedAt,
  useSessionUpdatedAt,
  useRefreshSession,
  useExtendSession,
  useSessionDuration,
  useSessionTimeRemaining,
} from './use-session';

// Authentication
export { useAuthentication } from './use-authentication';

// Password management
export { usePassword } from './use-password';

// ============================================================================
// SECURITY HOOKS (Phase 3)
// ============================================================================

// Two-factor authentication
export { useTwoFactor } from './use-two-factor';

// Email verification
export { useEmailVerification } from './use-email-verification';

// ============================================================================
// ADVANCED HOOKS (Phase 4)
// ============================================================================

// Organizations (optional subfeature)
export { useOrganizations } from './use-organizations';

// Session management
export { useSessionManagement } from './use-session-management';

// Connected accounts
export { useAccounts } from './use-accounts';

// ============================================================================
// TYPES
// ============================================================================

// Better Auth types
export type { Session, User } from 'better-auth/types';

// Custom types
export type { AuthClient } from '@/lib/auth/client';
export type { AuthKeys } from '@/lib/auth/query-keys';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

// Re-export commonly used hooks for convenience
export {
  useSession as useAuthSession,
  useAuthentication as useAuth,
  usePassword as useAuthPassword,
  useTwoFactor as useAuth2FA,
  useEmailVerification as useAuthEmail,
  useOrganizations as useAuthOrganizations,
  useSessionManagement as useAuthSessions,
  useAccounts as useAuthAccounts,
} from './index';

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Frontend Usage Examples:
 * 
 * ```typescript
 * // Import what you need
 * import { 
 *   useSession, 
 *   useAuthentication, 
 *   usePassword,
 *   useTwoFactor,
 *   useOrganizations 
 * } from '@auth-backend-better-auth-nextjs';
 * 
 * // Use in components
 * function LoginForm() {
 *   const { signIn, isSigningIn, signInError } = useAuthentication();
 *   const { session } = useSession();
 *   
 *   const handleLogin = (email: string, password: string) => {
 *     signIn({ email, password });
 *   };
 *   
 *   return (
 *     <form onSubmit={handleLogin}>
 *       {/* Your form UI */}
 *     </form>
 *   );
 * }
 * 
 * function ProfileSettings() {
 *   const { changePassword, isChangingPassword } = usePassword();
 *   const { setupTwoFactor, isSettingUp } = useTwoFactor();
 *   
 *   return (
 *     <div>
 *       {/* Your settings UI */}
 *     </div>
 *   );
 * }
 * ```
 */
