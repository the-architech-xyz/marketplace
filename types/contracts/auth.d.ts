/**
 * Auth Feature Contract - Universal Authentication Interface
 * 
 * This contract enables ANY backend to provide auth features and ANY UI to consume them.
 * Backend implementations: Better Auth, Auth0, Supabase, Firebase, etc.
 * Frontend implementations: React, Vue, Svelte, Angular, etc.
 * 
 * The contract defines cohesive business services, not individual hooks.
 * All security concerns (JWT, CSRF, cookies, tokens) are handled by the backend.
 * Frontend only knows about User, Session, and business operations.
 */

// ============================================================================
// CORE TYPES - What Frontend Sees (No JWT, CSRF, or Security Details)
// ============================================================================

export type AuthStatus = 
  | 'authenticated' 
  | 'unauthenticated' 
  | 'loading' 
  | 'error';

export type OAuthProvider = 
  | 'google' 
  | 'github' 
  | 'discord' 
  | 'twitter' 
  | 'facebook' 
  | 'apple' 
  | 'microsoft' 
  | 'linkedin';

export type SessionStatus = 
  | 'active' 
  | 'expired' 
  | 'invalid' 
  | 'revoked';

export type TwoFactorMethod = 
  | 'totp' 
  | 'sms' 
  | 'email';

// ============================================================================
// DATA TYPES - Frontend Only Knows These
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata?: Record<string, any>;
}

export interface Session {
  id: string;
  userId: string;
  status: SessionStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  
  // Multi-tenancy context
  activeOrganizationId?: string;
  activeTeamId?: string;
}

export interface ConnectedAccount {
  id: string;
  userId: string;
  provider: OAuthProvider;
  providerAccountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TwoFactorSecret {
  qrCode: string;
  secret: string;
  recoveryCodes: string[];
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  teamId: string;
  organizationId: string;
  joinedAt: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: string;
  createdAt: string;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  teamId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: string;
  createdAt: string;
}

// Data transfer objects
export interface CreateOrganizationData {
  name: string;
  description?: string;
}

export interface UpdateOrganizationData {
  name?: string;
  description?: string;
}

export interface CreateTeamData {
  name: string;
  description?: string;
}

export interface UpdateTeamData {
  name?: string;
  description?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  status: AuthStatus;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// INPUT TYPES - What Frontend Sends
// ============================================================================

export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
  marketingEmails?: boolean;
}

export interface OAuthSignInData {
  provider: OAuthProvider;
  redirectTo?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  image?: string;
  metadata?: Record<string, any>;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface TwoFactorSetupData {
  password: string;
}

export interface TwoFactorVerifyData {
  code: string;
}

export interface MagicLinkData {
  email: string;
  redirectTo?: string;
}

// ============================================================================
// RESULT TYPES - What Frontend Receives
// ============================================================================

export interface AuthResult {
  user: User;
  session: Session;
  success: boolean;
  message?: string;
}

export interface OAuthResult {
  user: User;
  session: Session;
  account: ConnectedAccount;
  success: boolean;
  message?: string;
}

export interface PasswordResetResult {
  success: boolean;
  message: string;
}

export interface EmailVerificationResult {
  success: boolean;
  message: string;
}

export interface TwoFactorResult {
  success: boolean;
  message?: string;
  qrCode?: string;
  secret?: string;
  recoveryCodes?: string[];
}

export interface MagicLinkResult {
  success: boolean;
  message: string;
}

// ============================================================================
// ERROR TYPES - Frontend Error Handling
// ============================================================================

export interface AuthError {
  code: string;
  message: string;
  type: 'validation_error' | 'authentication_error' | 'authorization_error' | 'network_error';
  field?: string;
  details?: Record<string, any>;
}

// ============================================================================
// CONFIGURATION TYPES - Backend Configuration
// ============================================================================

export interface AuthConfig {
  providers: {
    email: boolean;
    oauth: OAuthProvider[];
    magicLink: boolean;
  };
  features: {
    emailVerification: boolean;
    twoFactorAuth: boolean;
    passwordReset: boolean;
    accountLinking: boolean;
    sessionManagement: boolean;
    organizations: boolean;
  };
  security: {
    passwordMinLength: number;
    passwordRequireUppercase: boolean;
    passwordRequireLowercase: boolean;
    passwordRequireNumbers: boolean;
    passwordRequireSymbols: boolean;
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
  };
  ui: {
    theme: 'default' | 'dark' | 'light' | 'minimal';
    showSocialAuth: boolean;
    showRememberMe: boolean;
    showForgotPassword: boolean;
    showSignUp: boolean;
  };
}

// ============================================================================
// UNIVERSAL AUTH SERVICE CONTRACT
// ============================================================================

/**
 * Universal Auth Service Contract
 * 
 * This interface enables ANY backend to provide auth features and ANY UI to consume them.
 * 
 * Backend Implementations:
 * - Better Auth (your current choice)
 * - Auth0
 * - Supabase Auth
 * - Firebase Auth
 * - NextAuth.js
 * - Custom JWT implementation
 * 
 * Frontend Implementations:
 * - React (Next.js, Vite, CRA)
 * - Vue (Nuxt, Vite)
 * - Svelte (SvelteKit)
 * - Angular
 * - Vanilla JS
 * 
 * The contract defines cohesive business services that group related functionality.
 * Each service method returns an object containing all related queries and mutations.
 */
export interface IAuthService {
  /**
   * Authentication Service
   * Provides all authentication-related operations in a cohesive interface
   */
  useAuthentication: () => {
    // Query operations
    getAuthState: any; // UseQueryResult<AuthState, Error>
    getSession: any; // UseQueryResult<Session, Error>
    isAuthenticated: any; // UseQueryResult<boolean, Error>
    
    // Mutation operations
    signIn: any; // UseMutationResult<AuthResult, Error, SignInData>
    signUp: any; // UseMutationResult<AuthResult, Error, SignUpData>
    signOut: any; // UseMutationResult<void, Error, void>
    oauthSignIn: any; // UseMutationResult<OAuthResult, Error, OAuthSignInData>
    magicLinkSignIn: any; // UseMutationResult<MagicLinkResult, Error, MagicLinkData>
    refreshSession: any; // UseMutationResult<Session, Error, void>
  };

  /**
   * Profile Management Service
   * Provides all user profile-related operations in a cohesive interface
   */
  useProfile: () => {
    // Query operations
    getUser: any; // UseQueryResult<User, Error>
    
    // Mutation operations
    updateProfile: any; // UseMutationResult<AuthResult, Error, UpdateProfileData>
    changePassword: any; // UseMutationResult<PasswordResetResult, Error, ChangePasswordData>
    deleteAccount: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Security Service
   * Provides all security-related operations in a cohesive interface
   */
  useSecurity: () => {
    // Query operations
    getAccounts: any; // UseQueryResult<ConnectedAccount[], Error>
    
    // Mutation operations
    setupTwoFactor: any; // UseMutationResult<TwoFactorResult, Error, TwoFactorSetupData>
    verifyTwoFactor: any; // UseMutationResult<TwoFactorResult, Error, TwoFactorVerifyData>
    disableTwoFactor: any; // UseMutationResult<TwoFactorResult, Error, TwoFactorVerifyData>
    regenerateRecoveryCodes: any; // UseMutationResult<TwoFactorResult, Error, void>
    unlinkAccount: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Password Management Service
   * Provides all password-related operations in a cohesive interface
   */
  usePasswordManagement: () => {
    // Mutation operations
    forgotPassword: any; // UseMutationResult<PasswordResetResult, Error, ForgotPasswordData>
    resetPassword: any; // UseMutationResult<PasswordResetResult, Error, ResetPasswordData>
  };

  /**
   * Email Verification Service
   * Provides all email verification-related operations in a cohesive interface
   */
  useEmailVerification: () => {
    // Mutation operations
    verifyEmail: any; // UseMutationResult<EmailVerificationResult, Error, VerifyEmailData>
    resendVerification: any; // UseMutationResult<EmailVerificationResult, Error, ResendVerificationData>
    changeEmail: any; // UseMutationResult<EmailVerificationResult, Error, ResendVerificationData>
  };

  /**
   * Session Management Service
   * Provides all session-related operations in a cohesive interface
   */
  useSessionManagement: () => {
    // Query operations
    getActiveSessions: any; // UseQueryResult<Session[], Error>
    
    // Mutation operations
    revokeSession: any; // UseMutationResult<void, Error, string>
    revokeAllSessions: any; // UseMutationResult<void, Error, void>
  };

  /**
   * Organization Service (if organizations feature is enabled)
   * Provides all organization-related operations in a cohesive interface
   */
  useOrganizations?: () => {
    // Query operations
    getOrganizations: any; // UseQueryResult<Organization[], Error>
    getOrganization: any; // UseQueryResult<Organization, Error>
    getMembers: any; // UseQueryResult<Member[], Error>
    getInvitations: any; // UseQueryResult<Invitation[], Error>
    
    // Mutation operations
    createOrganization: any; // UseMutationResult<Organization, Error, CreateOrganizationData>
    updateOrganization: any; // UseMutationResult<Organization, Error, { id: string; data: UpdateOrganizationData }>
    deleteOrganization: any; // UseMutationResult<void, Error, string>
    inviteMember: any; // UseMutationResult<void, Error, { orgId: string; email: string; role: string }>
    removeMember: any; // UseMutationResult<void, Error, { orgId: string; userId: string }>
    updateMemberRole: any; // UseMutationResult<void, Error, { orgId: string; userId: string; role: string }>
    acceptInvitation: any; // UseMutationResult<void, Error, string>
    rejectInvitation: any; // UseMutationResult<void, Error, string>
    cancelInvitation: any; // UseMutationResult<void, Error, string>
    leaveOrganization: any; // UseMutationResult<void, Error, string>
    
    // Session Context
    switchActiveOrganization: any; // UseMutationResult<void, Error, string>
    getActiveOrganization: any; // UseQueryResult<Organization | null, Error>
  };

  /**
   * Teams Service (if teams feature is enabled within organizations)
   * Provides all team-related operations in a cohesive interface
   */
  useTeams?: () => {
    // Query operations
    getTeams: any; // UseQueryResult<Team[], Error>
    getTeam: any; // UseQueryResult<Team, Error>
    getTeamMembers: any; // UseQueryResult<TeamMember[], Error>
    getTeamInvitations: any; // UseQueryResult<TeamInvitation[], Error>
    
    // Mutation operations
    createTeam: any; // UseMutationResult<Team, Error, { orgId: string; data: CreateTeamData }>
    updateTeam: any; // UseMutationResult<Team, Error, { orgId: string; teamId: string; data: UpdateTeamData }>
    deleteTeam: any; // UseMutationResult<void, Error, { orgId: string; teamId: string }>
    addTeamMember: any; // UseMutationResult<void, Error, { orgId: string; teamId: string; userId: string; role: string }>
    removeTeamMember: any; // UseMutationResult<void, Error, { orgId: string; teamId: string; userId: string }>
    updateTeamMemberRole: any; // UseMutationResult<void, Error, { orgId: string; teamId: string; userId: string; role: string }>
    inviteToTeam: any; // UseMutationResult<void, Error, { orgId: string; teamId: string; email: string; role: string }>
    acceptTeamInvitation: any; // UseMutationResult<void, Error, string>
    rejectTeamInvitation: any; // UseMutationResult<void, Error, string>
    
    // Session Context
    switchActiveTeam: any; // UseMutationResult<void, Error, { orgId: string; teamId: string }>
    getActiveTeam: any; // UseQueryResult<Team | null, Error>
  };
}

// ============================================================================
// PROVIDER TYPES - For React Context (if using React)
// ============================================================================

export interface AuthProviderProps {
  children: any; // React.ReactNode
  config?: Partial<AuthConfig>;
}

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  status: AuthStatus;
  isLoading: boolean;
  error: string | null;
  signIn: (data: SignInData) => Promise<AuthResult>;
  signUp: (data: SignUpData) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  oauthSignIn: (data: OAuthSignInData) => Promise<OAuthResult>;
  magicLinkSignIn: (data: MagicLinkData) => Promise<MagicLinkResult>;
  forgotPassword: (data: ForgotPasswordData) => Promise<PasswordResetResult>;
  resetPassword: (data: ResetPasswordData) => Promise<PasswordResetResult>;
  updateProfile: (data: UpdateProfileData) => Promise<AuthResult>;
  changePassword: (data: ChangePasswordData) => Promise<PasswordResetResult>;
  verifyEmail: (data: VerifyEmailData) => Promise<EmailVerificationResult>;
  resendVerification: (data: ResendVerificationData) => Promise<EmailVerificationResult>;
  refreshSession: () => Promise<Session>;
}

// ============================================================================
// MIDDLEWARE TYPES - For Route Protection
// ============================================================================

export interface AuthMiddleware {
  requireAuth: (options?: { redirectTo?: string }) => void;
  requireGuest: (options?: { redirectTo?: string }) => void;
  requireRole: (role: string, options?: { redirectTo?: string }) => void;
  requirePermission: (permission: string, options?: { redirectTo?: string }) => void;
}
