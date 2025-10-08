/**
 * auth Contract Types
 * 
 * Auto-generated from contract.ts
 */
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
}
export interface Account {
  id: string;
  userId: string;
  provider: OAuthProvider;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  scope?: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthState {
  user: User | null;
  session: Session | null;
  status: AuthStatus;
  isLoading: boolean;
  error: string | null;
}
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
export interface AuthResult {
  user: User;
  session: Session;
  success: boolean;
  message?: string;
}
export interface OAuthResult {
  user: User;
  session: Session;
  account: Account;
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
export interface AuthError {
  code: string;
  message: string;
  type: 'validation_error' | 'authentication_error' | 'authorization_error' | 'network_error';
  field?: string;
  details?: Record<string, any>;
}
export interface AuthConfig {
  providers: {
    email: boolean;
    oauth: OAuthProvider[];
  };
  features: {
    emailVerification: boolean;
    twoFactorAuth: boolean;
    passwordReset: boolean;
    accountLinking: boolean;
    sessionManagement: boolean;
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
export interface AuthMiddleware {
  requireAuth: (options?: { redirectTo?: string }) => void;
  requireGuest: (options?: { redirectTo?: string }) => void;
  requireRole: (role: string, options?: { redirectTo?: string }) => void;
  requirePermission: (permission: string, options?: { redirectTo?: string }) => void;
}
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
  forgotPassword: (data: ForgotPasswordData) => Promise<PasswordResetResult>;
  resetPassword: (data: ResetPasswordData) => Promise<PasswordResetResult>;
  updateProfile: (data: UpdateProfileData) => Promise<AuthResult>;
  changePassword: (data: ChangePasswordData) => Promise<PasswordResetResult>;
  verifyEmail: (data: VerifyEmailData) => Promise<EmailVerificationResult>;
  resendVerification: (data: ResendVerificationData) => Promise<EmailVerificationResult>;
  refreshSession: () => Promise<Session>;
}
export interface IAuthService {
  useAuthentication: () => {
    getAuthState: any; // UseQueryResult<AuthState, Error>
    getSession: any; // UseQueryResult<Session, Error>
    isAuthenticated: any; // UseQueryResult<boolean, Error>
    signIn: any; // UseMutationResult<AuthResult, Error, SignInData>
    signUp: any; // UseMutationResult<AuthResult, Error, SignUpData>
    signOut: any; // UseMutationResult<void, Error, void>
    oauthSignIn: any; // UseMutationResult<OAuthResult, Error, OAuthSignInData>
    refreshSession: any; // UseMutationResult<Session, Error, void>
  };
  useProfile: () => {
    getUser: any; // UseQueryResult<User, Error>
    updateProfile: any; // UseMutationResult<AuthResult, Error, UpdateProfileData>
    changePassword: any; // UseMutationResult<PasswordResetResult, Error, ChangePasswordData>
    deleteAccount: any; // UseMutationResult<void, Error, string>
  };
  useSecurity: () => {
    getAccounts: any; // UseQueryResult<Account[], Error>
    setupTwoFactor: any; // UseMutationResult<{ qrCode: string; secret: string }, Error, void>
    verifyTwoFactor: any; // UseMutationResult<{ success: boolean }, Error, string>
    disableTwoFactor: any; // UseMutationResult<{ success: boolean }, Error, string>
    unlinkAccount: any; // UseMutationResult<void, Error, string>
  };
  usePasswordManagement: () => {
    forgotPassword: any; // UseMutationResult<PasswordResetResult, Error, ForgotPasswordData>
    resetPassword: any; // UseMutationResult<PasswordResetResult, Error, ResetPasswordData>
  };
  useEmailVerification: () => {
    verifyEmail: any; // UseMutationResult<EmailVerificationResult, Error, VerifyEmailData>
    resendVerification: any; // UseMutationResult<EmailVerificationResult, Error, ResendVerificationData>
  };
}