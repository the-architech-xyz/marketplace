/**
 * AuthService - Cohesive Business Hook Services Implementation
 * 
 * This service implements the IAuthService interface using Better Auth and TanStack Query.
 * It provides cohesive business services that group related functionality.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IAuthService, 
  User, Session, Account, AuthState, AuthResult, OAuthResult, PasswordResetResult, EmailVerificationResult,
  SignInData, SignUpData, OAuthSignInData, ForgotPasswordData, ResetPasswordData, UpdateProfileData,
  ChangePasswordData, VerifyEmailData, ResendVerificationData
} from '@/features/auth/contract';
import { authApi } from '@/lib/auth/api';

/**
 * AuthService - Main service implementation
 * 
 * This service provides all authentication-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
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
      queryKey: ['auth-state'],
      queryFn: async () => {
        return await authApi.getAuthState();
      }
    });

    const getSession = () => useQuery({
      queryKey: ['auth-session'],
      queryFn: async () => {
        return await authApi.getSession();
      }
    });

    const isAuthenticated = () => useQuery({
      queryKey: ['auth-authenticated'],
      queryFn: async () => {
        const session = await authApi.getSession();
        return !!session;
      }
    });

    // Mutation operations
    const signIn = () => useMutation({
      mutationFn: async (data: SignInData) => {
        return await authApi.signIn(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-authenticated'] });
      }
    });

    const signUp = () => useMutation({
      mutationFn: async (data: SignUpData) => {
        return await authApi.signUp(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-authenticated'] });
      }
    });

    const signOut = () => useMutation({
      mutationFn: async () => {
        return await authApi.signOut();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-authenticated'] });
        queryClient.clear();
      }
    });

    const oauthSignIn = () => useMutation({
      mutationFn: async (data: OAuthSignInData) => {
        return await authApi.oauthSignIn(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-authenticated'] });
      }
    });

    const refreshSession = () => useMutation({
      mutationFn: async () => {
        return await authApi.refreshSession();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
      }
    });

    return { getAuthState, getSession, isAuthenticated, signIn, signUp, signOut, oauthSignIn, refreshSession };
  },

  /**
   * Profile Management Service
   * Provides all user profile-related operations in a cohesive interface
   */
  useProfile: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getUser = () => useQuery({
      queryKey: ['auth-user'],
      queryFn: async () => {
        return await authApi.getUser();
      }
    });

    // Mutation operations
    const updateProfile = () => useMutation({
      mutationFn: async (data: UpdateProfileData) => {
        return await authApi.updateProfile(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
      }
    });

    const changePassword = () => useMutation({
      mutationFn: async (data: ChangePasswordData) => {
        return await authApi.changePassword(data);
      }
    });

    const deleteAccount = () => useMutation({
      mutationFn: async (userId: string) => {
        return await authApi.deleteAccount(userId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-authenticated'] });
        queryClient.clear();
      }
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
      queryKey: ['auth-accounts'],
      queryFn: async () => {
        return await authApi.getAccounts();
      }
    });

    // Mutation operations
    const setupTwoFactor = () => useMutation({
      mutationFn: async () => {
        return await authApi.setupTwoFactor();
      }
    });

    const verifyTwoFactor = () => useMutation({
      mutationFn: async (code: string) => {
        return await authApi.verifyTwoFactor(code);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
      }
    });

    const disableTwoFactor = () => useMutation({
      mutationFn: async (code: string) => {
        return await authApi.disableTwoFactor(code);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
      }
    });

    const unlinkAccount = () => useMutation({
      mutationFn: async (accountId: string) => {
        return await authApi.unlinkAccount(accountId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-accounts'] });
      }
    });

    return { getAccounts, setupTwoFactor, verifyTwoFactor, disableTwoFactor, unlinkAccount };
  },

  /**
   * Password Management Service
   * Provides all password-related operations in a cohesive interface
   */
  usePasswordManagement: () => {
    // Mutation operations
    const forgotPassword = () => useMutation({
      mutationFn: async (data: ForgotPasswordData) => {
        return await authApi.forgotPassword(data);
      }
    });

    const resetPassword = () => useMutation({
      mutationFn: async (data: ResetPasswordData) => {
        return await authApi.resetPassword(data);
      }
    });

    return { forgotPassword, resetPassword };
  },

  /**
   * Email Verification Service
   * Provides all email verification-related operations in a cohesive interface
   */
  useEmailVerification: () => {
    // Mutation operations
    const verifyEmail = () => useMutation({
      mutationFn: async (data: VerifyEmailData) => {
        return await authApi.verifyEmail(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        queryClient.invalidateQueries({ queryKey: ['auth-state'] });
      }
    });

    const resendVerification = () => useMutation({
      mutationFn: async (data: ResendVerificationData) => {
        return await authApi.resendVerification(data);
      }
    });

    return { verifyEmail, resendVerification };
  }
};
