/**
 * Auth Types
 * 
 * TypeScript definitions for authentication
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  permissions: string[];
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Session interface
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Auth error interface
export interface AuthError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

// Sign in data
export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Sign up data
export interface SignUpData {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

// Sign in response
export interface SignInResponse {
  user: User;
  session: Session;
  message?: string;
}

// Sign up response
export interface SignUpResponse {
  user: User;
  session: Session;
  message?: string;
  requiresVerification?: boolean;
}

// Auth status
export interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  isUnauthenticated: boolean;
}

// Auth context value
export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (data: SignInData) => Promise<SignInResponse>;
  signUp: (data: SignUpData) => Promise<SignUpResponse>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

// OAuth provider
export type OAuthProvider = 'google' | 'github' | 'discord' | 'twitter' | 'facebook' | 'apple';

// OAuth sign in data
export interface OAuthSignInData {
  provider: OAuthProvider;
  redirectTo?: string;
}

// Magic link data
export interface MagicLinkData {
  email: string;
  redirectTo?: string;
}

// Phone sign in data
export interface PhoneSignInData {
  phone: string;
  countryCode?: string;
}

// OTP verification data
export interface OTPVerificationData {
  phone: string;
  otp: string;
}

// Password reset data
export interface PasswordResetData {
  email: string;
  redirectTo?: string;
}

// Password reset confirmation data
export interface PasswordResetConfirmationData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Change password data
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Update profile data
export interface UpdateProfileData {
  name?: string;
  avatar?: string;
  email?: string;
}

// Update user data
export interface UpdateUserData {
  name?: string;
  avatar?: string;
  role?: string;
  permissions?: string[];
}

// Auth configuration
export interface AuthConfig {
  baseUrl: string;
  secret: string;
  providers: OAuthProvider[];
  features: {
    emailVerification: boolean;
    magicLink: boolean;
    phoneSignIn: boolean;
    passwordReset: boolean;
    twoFactor: boolean;
  };
}

// Auth session data
export interface AuthSessionData {
  user: User;
  session: Session;
  expiresAt: Date;
}

// Auth callback data
export interface AuthCallbackData {
  code: string;
  state?: string;
  error?: string;
  errorDescription?: string;
}

// Auth redirect data
export interface AuthRedirectData {
  url: string;
  state?: string;
}

// Auth hook return type
export interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  isUnauthenticated: boolean;
  refetch: () => void;
  invalidate: () => void;
}

// Auth mutation return type
export interface UseAuthMutationReturn<TData, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  isLoading: boolean;
  error: AuthError | null;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

// Auth query return type
export interface UseAuthQueryReturn<TData> {
  data: TData | undefined;
  isLoading: boolean;
  error: AuthError | null;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
}

// Auth provider props
export interface AuthProviderProps {
  children: React.ReactNode;
  config?: Partial<AuthConfig>;
}

// Auth guard props
export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  requireRole?: string;
  requirePermission?: string;
  requireAnyRole?: string[];
  requireAnyPermission?: string[];
  requireAllPermissions?: string[];
}

// Auth form props
export interface AuthFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: AuthError | null;
  className?: string;
}

// Auth button props
export interface AuthButtonProps {
  provider: OAuthProvider;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

// Auth input props
export interface AuthInputProps {
  name: string;
  type: 'email' | 'password' | 'text' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Auth error boundary props
export interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: AuthError) => React.ReactNode;
  onError?: (error: AuthError) => void;
}
