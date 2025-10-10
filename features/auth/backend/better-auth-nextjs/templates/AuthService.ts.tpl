/**
 * AuthService - Universal Authentication Service Implementation
 * 
 * This service implements the IAuthService contract using Better Auth and TanStack Query.
 * It provides cohesive business services that group related functionality.
 * 
 * Backend: Better Auth + Drizzle + Next.js (handles ALL security concerns)
 * Frontend: Any React framework (consumes this contract)
 * 
 * Security handled by Better Auth:
 * - JWT tokens and session management
 * - CSRF protection with trusted origins
 * - Rate limiting and brute force protection
 * - Password hashing (bcrypt/argon2)
 * - XSS protection (httpOnly cookies)
 * - OAuth flows and account linking
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IAuthService, 
  User, Session, ConnectedAccount, Organization, AuthState, AuthResult, OAuthResult, 
  PasswordResetResult, EmailVerificationResult, TwoFactorResult, MagicLinkResult,
  SignInData, SignUpData, OAuthSignInData, ForgotPasswordData, ResetPasswordData, 
  UpdateProfileData, ChangePasswordData, VerifyEmailData, ResendVerificationData,
  TwoFactorSetupData, TwoFactorVerifyData, MagicLinkData
} from '@/features/auth/contract';
import { authClient } from '@/lib/auth/client';
import { queryKeys } from '@/lib/auth/query-keys';

/**
 * AuthService - Main service implementation
 * 
 * This service provides all authentication-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
 * 
 * The frontend NEVER knows about JWT, CSRF, cookies, or any security implementation details.
 * It only knows about User, Session, and business operations.
 */
export const AuthService: IAuthService = {
  /**
   * Authentication Service
   * Provides all authentication-related operations in a cohesive interface
   */
  useAuthentication: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getAuthState = () => useQuery({
      queryKey: queryKeys.auth.state(),
      queryFn: async (): Promise<AuthState> => {
        const { data: session, error } = await authClient.getSession();
        
        if (error) {
          return {
            user: null,
            session: null,
            status: 'error',
            isLoading: false,
            error: error.message,
          };
        }

        if (!session) {
          return {
            user: null,
            session: null,
            status: 'unauthenticated',
            isLoading: false,
            error: null,
          };
        }

        return {
          user: session.user,
          session: {
            id: session.session.id,
            userId: session.user.id,
            status: 'active',
            expiresAt: session.session.expiresAt,
            createdAt: session.session.createdAt,
            updatedAt: session.session.updatedAt,
            ipAddress: session.session.ipAddress,
            userAgent: session.session.userAgent,
            metadata: session.session.metadata,
          },
          status: 'authenticated',
          isLoading: false,
          error: null,
        };
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    });

    const getSession = () => useQuery({
      queryKey: queryKeys.auth.session(),
      queryFn: async (): Promise<Session | null> => {
        const { data: session } = await authClient.getSession();
        if (!session) return null;
        
        return {
          id: session.session.id,
          userId: session.user.id,
          status: 'active',
          expiresAt: session.session.expiresAt,
          createdAt: session.session.createdAt,
          updatedAt: session.session.updatedAt,
          ipAddress: session.session.ipAddress,
          userAgent: session.session.userAgent,
          metadata: session.session.metadata,
        };
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    });

    const isAuthenticated = () => useQuery({
      queryKey: queryKeys.auth.authenticated(),
      queryFn: async (): Promise<boolean> => {
        const { data: session } = await authClient.getSession();
        return !!session;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    });

    // Mutation operations
    const signIn = () => useMutation({
      mutationFn: async (data: SignInData): Promise<AuthResult> => {
        const { data: result, error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          user: result.user,
          session: {
            id: result.session.id,
            userId: result.user.id,
            status: 'active',
            expiresAt: result.session.expiresAt,
            createdAt: result.session.createdAt,
            updatedAt: result.session.updatedAt,
            ipAddress: result.session.ipAddress,
            userAgent: result.session.userAgent,
            metadata: result.session.metadata,
          },
          success: true,
          message: 'Successfully signed in',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      },
    });

    const signUp = () => useMutation({
      mutationFn: async (data: SignUpData): Promise<AuthResult> => {
        const { data: result, error } = await authClient.signUp.email({
          email: data.email,
          password: data.password,
          name: data.name,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          user: result.user,
          session: {
            id: result.session.id,
            userId: result.user.id,
            status: 'active',
            expiresAt: result.session.expiresAt,
            createdAt: result.session.createdAt,
            updatedAt: result.session.updatedAt,
            ipAddress: result.session.ipAddress,
            userAgent: result.session.userAgent,
            metadata: result.session.metadata,
          },
          success: true,
          message: 'Account created successfully',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      },
    });

    const signOut = () => useMutation({
      mutationFn: async (): Promise<void> => {
        const { error } = await authClient.signOut();
        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
        queryClient.clear();
      },
    });

    const oauthSignIn = () => useMutation({
      mutationFn: async (data: OAuthSignInData): Promise<OAuthResult> => {
        const { data: result, error } = await authClient.signIn.social({
          provider: data.provider,
          callbackURL: data.redirectTo,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          user: result.user,
          session: {
            id: result.session.id,
            userId: result.user.id,
            status: 'active',
            expiresAt: result.session.expiresAt,
            createdAt: result.session.createdAt,
            updatedAt: result.session.updatedAt,
            ipAddress: result.session.ipAddress,
            userAgent: result.session.userAgent,
            metadata: result.session.metadata,
          },
          account: {
            id: result.account.id,
            userId: result.user.id,
            provider: result.account.provider,
            providerAccountId: result.account.providerAccountId,
            createdAt: result.account.createdAt,
            updatedAt: result.account.updatedAt,
          },
          success: true,
          message: 'Successfully signed in with OAuth',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      },
    });

    const magicLinkSignIn = () => useMutation({
      mutationFn: async (data: MagicLinkData): Promise<MagicLinkResult> => {
        const { error } = await authClient.signIn.magicLink({
          email: data.email,
          callbackURL: data.redirectTo,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Magic link sent to your email',
        };
      },
    });

    const refreshSession = () => useMutation({
      mutationFn: async (): Promise<Session> => {
        const { data: session, error } = await authClient.getSession();
        
        if (error || !session) {
          throw new Error('Failed to refresh session');
        }

        return {
          id: session.session.id,
          userId: session.user.id,
          status: 'active',
          expiresAt: session.session.expiresAt,
          createdAt: session.session.createdAt,
          updatedAt: session.session.updatedAt,
          ipAddress: session.session.ipAddress,
          userAgent: session.session.userAgent,
          metadata: session.session.metadata,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
      },
    });

    return { 
      getAuthState, 
      getSession, 
      isAuthenticated, 
      signIn, 
      signUp, 
      signOut, 
      oauthSignIn, 
      magicLinkSignIn,
      refreshSession 
    };
  },

  /**
   * Profile Management Service
   * Provides all user profile-related operations in a cohesive interface
   */
  useProfile: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getUser = () => useQuery({
      queryKey: queryKeys.auth.user(),
      queryFn: async (): Promise<User | null> => {
        const { data: session } = await authClient.getSession();
        return session?.user || null;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    });

    // Mutation operations
    const updateProfile = () => useMutation({
      mutationFn: async (data: UpdateProfileData): Promise<AuthResult> => {
        const { data: result, error } = await authClient.updateUser(data);

        if (error) {
          throw new Error(error.message);
        }

        return {
          user: result.user,
          session: {
            id: result.session.id,
            userId: result.user.id,
            status: 'active',
            expiresAt: result.session.expiresAt,
            createdAt: result.session.createdAt,
            updatedAt: result.session.updatedAt,
            ipAddress: result.session.ipAddress,
            userAgent: result.session.userAgent,
            metadata: result.session.metadata,
          },
          success: true,
          message: 'Profile updated successfully',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.state() });
      },
    });

    const changePassword = () => useMutation({
      mutationFn: async (data: ChangePasswordData): Promise<PasswordResetResult> => {
        const { error } = await authClient.changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Password changed successfully',
        };
      },
    });

    const deleteAccount = () => useMutation({
      mutationFn: async (password: string): Promise<void> => {
        const { error } = await authClient.deleteUser({ password });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
        queryClient.clear();
      },
    });

    return { getUser, updateProfile, changePassword, deleteAccount };
  },

  /**
   * Security Service
   * Provides all security-related operations in a cohesive interface
   */
  useSecurity: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getAccounts = () => useQuery({
      queryKey: queryKeys.auth.accounts(),
      queryFn: async (): Promise<ConnectedAccount[]> => {
        const { data: accounts } = await authClient.listAccounts();
        return accounts || [];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Mutation operations
    const setupTwoFactor = () => useMutation({
      mutationFn: async (data: TwoFactorSetupData): Promise<TwoFactorResult> => {
        const { data: result, error } = await authClient.twoFactor.enable({
          password: data.password,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          qrCode: result.qrCode,
          secret: result.secret,
          recoveryCodes: result.backupCodes,
          message: 'Two-factor authentication enabled',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.state() });
      },
    });

    const verifyTwoFactor = () => useMutation({
      mutationFn: async (data: TwoFactorVerifyData): Promise<TwoFactorResult> => {
        const { error } = await authClient.twoFactor.verify({
          code: data.code,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Two-factor authentication verified',
        };
      },
    });

    const disableTwoFactor = () => useMutation({
      mutationFn: async (data: TwoFactorVerifyData): Promise<TwoFactorResult> => {
        const { error } = await authClient.twoFactor.disable({
          password: data.code, // Better Auth uses password for disable
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Two-factor authentication disabled',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.state() });
      },
    });

    const regenerateRecoveryCodes = () => useMutation({
      mutationFn: async (): Promise<TwoFactorResult> => {
        const { data: result, error } = await authClient.twoFactor.generateBackupCodes();

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          recoveryCodes: result.backupCodes,
          message: 'Recovery codes regenerated',
        };
      },
    });

    const unlinkAccount = () => useMutation({
      mutationFn: async (accountId: string): Promise<void> => {
        const { error } = await authClient.unlinkAccount({ accountId });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.accounts() });
      },
    });

    return { 
      getAccounts, 
      setupTwoFactor, 
      verifyTwoFactor, 
      disableTwoFactor, 
      regenerateRecoveryCodes,
      unlinkAccount 
    };
  },

  /**
   * Password Management Service
   * Provides all password-related operations in a cohesive interface
   */
  usePasswordManagement: () => {
    // Mutation operations
    const forgotPassword = () => useMutation({
      mutationFn: async (data: ForgotPasswordData): Promise<PasswordResetResult> => {
        const { error } = await authClient.forgetPassword({ email: data.email });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Password reset email sent',
        };
      },
    });

    const resetPassword = () => useMutation({
      mutationFn: async (data: ResetPasswordData): Promise<PasswordResetResult> => {
        const { error } = await authClient.resetPassword({
          token: data.token,
          newPassword: data.password,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Password reset successfully',
        };
      },
    });

    return { forgotPassword, resetPassword };
  },

  /**
   * Email Verification Service
   * Provides all email verification-related operations in a cohesive interface
   */
  useEmailVerification: () => {
    const queryClient = useQueryClient();

    // Mutation operations
    const verifyEmail = () => useMutation({
      mutationFn: async (data: VerifyEmailData): Promise<EmailVerificationResult> => {
        const { error } = await authClient.verifyEmail({ token: data.token });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Email verified successfully',
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.state() });
      },
    });

    const resendVerification = () => useMutation({
      mutationFn: async (data: ResendVerificationData): Promise<EmailVerificationResult> => {
        const { error } = await authClient.sendVerificationEmail({ email: data.email });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Verification email sent',
        };
      },
    });

    const changeEmail = () => useMutation({
      mutationFn: async (data: ResendVerificationData): Promise<EmailVerificationResult> => {
        const { error } = await authClient.changeEmail({ newEmail: data.email });

        if (error) {
          throw new Error(error.message);
        }

        return {
          success: true,
          message: 'Email change request sent',
        };
      },
    });

    return { verifyEmail, resendVerification, changeEmail };
  },

  /**
   * Session Management Service
   * Provides all session-related operations in a cohesive interface
   */
  useSessionManagement: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getActiveSessions = () => useQuery({
      queryKey: queryKeys.auth.sessions(),
      queryFn: async (): Promise<Session[]> => {
        const { data: sessions } = await authClient.listSessions();
        return sessions || [];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Mutation operations
    const revokeSession = () => useMutation({
      mutationFn: async (sessionId: string): Promise<void> => {
        const { error } = await authClient.revokeSession({ sessionId });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.sessions() });
      },
    });

    const revokeAllSessions = () => useMutation({
      mutationFn: async (): Promise<void> => {
        const { error } = await authClient.revokeAllSessions();

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
        queryClient.clear();
      },
    });

    return { getActiveSessions, revokeSession, revokeAllSessions };
  },

  /**
   * Organization Service (if organizations feature is enabled)
   * Provides all organization-related operations in a cohesive interface
   */
  useOrganizations: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getOrganizations = () => useQuery({
      queryKey: queryKeys.auth.organizations(),
      queryFn: async (): Promise<Organization[]> => {
        const { data: orgs } = await authClient.organization.list();
        return orgs || [];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const getOrganization = () => useQuery({
      queryKey: queryKeys.auth.organization(),
      queryFn: async (): Promise<Organization | null> => {
        const { data: org } = await authClient.organization.get();
        return org || null;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Mutation operations
    const createOrganization = () => useMutation({
      mutationFn: async (data: { name: string }): Promise<Organization> => {
        const { data: org, error } = await authClient.organization.create({ name: data.name });

        if (error) {
          throw new Error(error.message);
        }

        return org;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organizations() });
      },
    });

    const updateOrganization = () => useMutation({
      mutationFn: async (data: { id: string; name: string }): Promise<Organization> => {
        const { data: org, error } = await authClient.organization.update({
          organizationId: data.id,
          name: data.name,
        });

        if (error) {
          throw new Error(error.message);
        }

        return org;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organizations() });
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organization() });
      },
    });

    const deleteOrganization = () => useMutation({
      mutationFn: async (orgId: string): Promise<void> => {
        const { error } = await authClient.organization.delete({ organizationId: orgId });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organizations() });
      },
    });

    const inviteMember = () => useMutation({
      mutationFn: async (data: { orgId: string; email: string; role: string }): Promise<void> => {
        const { error } = await authClient.organization.invite({
          organizationId: data.orgId,
          email: data.email,
          role: data.role,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
    });

    const removeMember = () => useMutation({
      mutationFn: async (data: { orgId: string; userId: string }): Promise<void> => {
        const { error } = await authClient.organization.removeMember({
          organizationId: data.orgId,
          userId: data.userId,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organizations() });
      },
    });

    const leaveOrganization = () => useMutation({
      mutationFn: async (orgId: string): Promise<void> => {
        const { error } = await authClient.organization.leave({ organizationId: orgId });

        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.organizations() });
      },
    });

    return { 
      getOrganizations, 
      getOrganization, 
      createOrganization, 
      updateOrganization, 
      deleteOrganization,
      inviteMember, 
      removeMember, 
      leaveOrganization 
    };
  },
};