// Authentication-related TypeScript types and interfaces

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  createdAt: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
}

export interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreedToTerms: boolean;
  marketingEmails?: boolean;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationConfirm {
  token: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerify {
  code: string;
  backupCode?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeEmailRequest {
  newEmail: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  avatar?: string;
}

export interface UpdatePreferencesRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
  language?: string;
  timezone?: string;
  theme?: 'light' | 'dark' | 'system';
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  session?: AuthSession;
  error?: AuthError;
  requiresTwoFactor?: boolean;
  requiresEmailVerification?: boolean;
}

export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  clientId?: string;
  redirectUrl?: string;
}

export interface SocialSignInRequest {
  provider: string;
  code?: string;
  state?: string;
}

export interface ConnectedAccount {
  id: string;
  provider: string;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  connectedAt: string;
  lastUsedAt?: string;
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'email_change' | 'two_factor_enabled' | 'two_factor_disabled' | 'account_locked' | 'suspicious_activity';
  description: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  timestamp: string;
  metadata?: any;
}

export interface AuthConfig {
  sessionTimeout: number; // in minutes
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  twoFactorRequired: boolean;
  emailVerificationRequired: boolean;
  socialProviders: SocialProvider[];
}

export interface AuthStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  loginAttemptsToday: number;
  failedLoginAttemptsToday: number;
  twoFactorEnabledUsers: number;
  emailVerifiedUsers: number;
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<AuthResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  error: AuthError | null;
}

export interface UseSignInReturn {
  signIn: (credentials: SignInCredentials) => Promise<AuthResponse>;
  isLoading: boolean;
  error: AuthError | null;
  requiresTwoFactor: boolean;
  requiresEmailVerification: boolean;
}

export interface UseSignUpReturn {
  signUp: (credentials: SignUpCredentials) => Promise<AuthResponse>;
  isLoading: boolean;
  error: AuthError | null;
  requiresEmailVerification: boolean;
}

export interface UsePasswordResetReturn {
  requestReset: (email: string) => Promise<boolean>;
  confirmReset: (data: PasswordResetConfirm) => Promise<boolean>;
  isLoading: boolean;
  error: AuthError | null;
  success: boolean;
}

export interface UseEmailVerificationReturn {
  requestVerification: (email: string) => Promise<boolean>;
  confirmVerification: (token: string) => Promise<boolean>;
  isLoading: boolean;
  error: AuthError | null;
  success: boolean;
}

export interface UseTwoFactorReturn {
  setup: () => Promise<TwoFactorSetup>;
  verify: (code: string) => Promise<boolean>;
  disable: (password: string) => Promise<boolean>;
  generateBackupCodes: () => Promise<string[]>;
  isLoading: boolean;
  error: AuthError | null;
  isEnabled: boolean;
}

export interface UseProfileReturn {
  profile: User | null;
  updateProfile: (data: UpdateProfileRequest) => Promise<User>;
  updatePreferences: (data: UpdatePreferencesRequest) => Promise<User>;
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
  changeEmail: (data: ChangeEmailRequest) => Promise<boolean>;
  deleteAccount: (password: string) => Promise<boolean>;
  isLoading: boolean;
  isUpdating: boolean;
  error: AuthError | null;
}

export interface UseSocialAuthReturn {
  providers: SocialProvider[];
  signInWithProvider: (provider: string) => Promise<void>;
  connectAccount: (provider: string) => Promise<void>;
  disconnectAccount: (accountId: string) => Promise<void>;
  connectedAccounts: ConnectedAccount[];
  isLoading: boolean;
  error: AuthError | null;
}

export interface UseSecurityReturn {
  events: SecurityEvent[];
  stats: AuthStats;
  refreshEvents: () => Promise<void>;
  refreshStats: () => Promise<void>;
  isLoading: boolean;
  error: AuthError | null;
}

// Utility types
export type AuthProvider = 'email' | 'google' | 'github' | 'microsoft' | 'apple';

export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';

export type SessionStatus = 'active' | 'expired' | 'invalid' | 'revoked';

export type TwoFactorMethod = 'totp' | 'sms' | 'email' | 'backup_code';

export type AuthEventType = 
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'session_created'
  | 'session_expired'
  | 'session_revoked'
  | 'password_changed'
  | 'email_changed'
  | 'two_factor_enabled'
  | 'two_factor_disabled'
  | 'account_locked'
  | 'account_unlocked'
  | 'suspicious_activity_detected';

// Configuration types
export interface EmailConfig {
  from: string;
  replyTo?: string;
  templates: {
    welcome: string;
    passwordReset: string;
    emailVerification: string;
    twoFactorCode: string;
    securityAlert: string;
  };
}

export interface SessionConfig {
  secret: string;
  maxAge: number; // in milliseconds
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
}

export interface RateLimitConfig {
  windowMs: number; // in milliseconds
  maxAttempts: number;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface SecurityConfig {
  rateLimit: RateLimitConfig;
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    maxAge: number; // in days
  };
  sessionPolicy: {
    maxAge: number; // in minutes
    maxConcurrentSessions: number;
    requireReauthForSensitiveActions: boolean;
  };
  twoFactorPolicy: {
    required: boolean;
    methods: TwoFactorMethod[];
    backupCodesCount: number;
  };
}
