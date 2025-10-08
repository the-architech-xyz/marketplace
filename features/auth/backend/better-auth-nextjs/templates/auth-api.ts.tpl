/**
 * Auth API Service
 * 
 * API service layer for authentication using Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { auth } from '@/lib/auth/config';
import type { 
  User, 
  Session, 
  SignInData, 
  SignUpData, 
  SignInResponse, 
  SignUpResponse,
  AuthError,
  OAuthProvider,
  MagicLinkData,
  PhoneSignInData,
  OTPVerificationData,
  PasswordResetData,
  PasswordResetConfirmationData,
  ChangePasswordData,
  UpdateProfileData,
  UpdateUserData
} from '@/lib/auth/types';

export const authApi = {
  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const session = await auth.api.getSession({
        headers: {
          cookie: document.cookie,
        },
      });
      
      if (!session) {
        throw new Error('No active session');
      }
      
      return session.user;
    } catch (error) {
      throw new Error(`Failed to get current user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get current session
  async getSession(): Promise<Session> {
    try {
      const session = await auth.api.getSession({
        headers: {
          cookie: document.cookie,
        },
      });
      
      if (!session) {
        throw new Error('No active session');
      }
      
      return session;
    } catch (error) {
      throw new Error(`Failed to get session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign in with email and password
  async signIn(data: SignInData): Promise<SignInResponse> {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe || false,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Signed in successfully',
      };
    } catch (error) {
      throw new Error(`Sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign up with email and password
  async signUp(data: SignUpData): Promise<SignUpResponse> {
    try {
      const response = await auth.api.signUpEmail({
        body: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Account created successfully',
        requiresVerification: !response.user.emailVerified,
      };
    } catch (error) {
      throw new Error(`Sign up failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    try {
      await auth.api.signOut({
        headers: {
          cookie: document.cookie,
        },
      });
    } catch (error) {
      throw new Error(`Sign out failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign out from all sessions
  async signOutAll(): Promise<void> {
    try {
      await auth.api.signOutAll({
        headers: {
          cookie: document.cookie,
        },
      });
    } catch (error) {
      throw new Error(`Sign out all failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign out from specific session
  async signOutSession(sessionId: string): Promise<void> {
    try {
      await auth.api.signOutSession({
        body: { sessionId },
        headers: {
          cookie: document.cookie,
        },
      });
    } catch (error) {
      throw new Error(`Sign out session failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign in with OAuth provider
  async signInWithProvider(provider: OAuthProvider): Promise<SignInResponse> {
    try {
      const response = await auth.api.signInSocial({
        body: {
          provider,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Signed in successfully',
      };
    } catch (error) {
      throw new Error(`OAuth sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign up with OAuth provider
  async signUpWithProvider(provider: OAuthProvider): Promise<SignUpResponse> {
    try {
      const response = await auth.api.signUpSocial({
        body: {
          provider,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Account created successfully',
      };
    } catch (error) {
      throw new Error(`OAuth sign up failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign in with magic link
  async signInWithMagicLink(email: string): Promise<SignInResponse> {
    try {
      const response = await auth.api.signInEmail({
        body: {
          email,
          magicLink: true,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Magic link sent to your email',
      };
    } catch (error) {
      throw new Error(`Magic link sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Sign in with phone number
  async signInWithPhone(phone: string): Promise<SignInResponse> {
    try {
      const response = await auth.api.signInPhone({
        body: {
          phone,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'OTP sent to your phone',
      };
    } catch (error) {
      throw new Error(`Phone sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Verify OTP
  async verifyOTP(phone: string, otp: string): Promise<SignInResponse> {
    try {
      const response = await auth.api.verifyOTP({
        body: {
          phone,
          otp,
        },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Phone verified successfully',
      };
    } catch (error) {
      throw new Error(`OTP verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Resend OTP
  async resendOTP(phone: string): Promise<void> {
    try {
      await auth.api.resendOTP({
        body: { phone },
      });
    } catch (error) {
      throw new Error(`Resend OTP failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Verify email
  async verifyEmail(token: string): Promise<SignUpResponse> {
    try {
      const response = await auth.api.verifyEmail({
        body: { token },
      });
      
      return {
        user: response.user,
        session: response.session,
        message: 'Email verified successfully',
      };
    } catch (error) {
      throw new Error(`Email verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Resend verification email
  async resendVerificationEmail(email: string): Promise<void> {
    try {
      await auth.api.resendVerificationEmail({
        body: { email },
      });
    } catch (error) {
      throw new Error(`Resend verification email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Check email availability
  async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      const response = await auth.api.checkEmailAvailability({
        body: { email },
      });
      
      return response.available;
    } catch (error) {
      throw new Error(`Check email availability failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Check username availability
  async checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const response = await auth.api.checkUsernameAvailability({
        body: { username },
      });
      
      return response.available;
    } catch (error) {
      throw new Error(`Check username availability failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Update profile
  async updateProfile(data: UpdateProfileData): Promise<User> {
    try {
      const response = await auth.api.updateProfile({
        body: data,
        headers: {
          cookie: document.cookie,
        },
      });
      
      return response.user;
    } catch (error) {
      throw new Error(`Update profile failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Change password
  async changePassword(data: ChangePasswordData): Promise<void> {
    try {
      await auth.api.changePassword({
        body: data,
        headers: {
          cookie: document.cookie,
        },
      });
    } catch (error) {
      throw new Error(`Change password failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Request password reset
  async requestPasswordReset(data: PasswordResetData): Promise<void> {
    try {
      await auth.api.requestPasswordReset({
        body: data,
      });
    } catch (error) {
      throw new Error(`Request password reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Confirm password reset
  async confirmPasswordReset(data: PasswordResetConfirmationData): Promise<void> {
    try {
      await auth.api.confirmPasswordReset({
        body: data,
      });
    } catch (error) {
      throw new Error(`Confirm password reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
