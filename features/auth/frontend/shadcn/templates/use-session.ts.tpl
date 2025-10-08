// Session management hook

import { useState, useEffect, useCallback } from 'react';
import { AuthSession, User, AuthError } from './auth-types';
import { getAuthStorage, setAuthStorage, removeAuthStorage, isSessionValid } from './auth-utils';

interface UseSessionReturn {
  session: AuthSession | null;
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: { name: string; email: string; password: string; confirmPassword: string; agreedToTerms: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  enableTwoFactor: (code: string) => Promise<void>;
  disableTwoFactor: (code: string) => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
}

export const useSession = (): UseSessionReturn => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Initialize session from storage
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const storedSession = getAuthStorage('auth_session');
        if (storedSession && isSessionValid(storedSession)) {
          setSession(storedSession);
          setUser(storedSession.user);
        } else if (storedSession) {
          // Session expired, try to refresh
          await refreshSession();
        }
      } catch (err) {
        console.error('Failed to initialize session:', err);
        setError({
          code: 'SESSION_INIT_ERROR',
          message: 'Failed to initialize session',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  // Auto-refresh session before expiry
  useEffect(() => {
    if (!session) return;

    const expiresAt = new Date(session.expiresAt);
    const now = new Date();
    const timeUntilExpiry = expiresAt.getTime() - now.getTime();
    const refreshTime = timeUntilExpiry - 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (refreshTime > 0) {
      const timeout = setTimeout(() => {
        refreshSession();
      }, refreshTime);

      return () => clearTimeout(timeout);
    }
  }, [session]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign in failed');
      }

      const sessionData: AuthSession = await response.json();
      setSession(sessionData);
      setUser(sessionData.user);
      setAuthStorage('auth_session', sessionData);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'SIGNIN_ERROR',
        message: err.message || 'Sign in failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign up failed');
      }

      const result = await response.json();
      
      // If auto-signin is enabled, set the session
      if (result.session) {
        setSession(result.session);
        setUser(result.session.user);
        setAuthStorage('auth_session', result.session);
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'SIGNUP_ERROR',
        message: err.message || 'Sign up failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (session?.accessToken) {
        await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
          },
        });
      }

      setSession(null);
      setUser(null);
      removeAuthStorage('auth_session');
    } catch (err: any) {
      console.error('Sign out error:', err);
      // Even if the API call fails, clear the local session
      setSession(null);
      setUser(null);
      removeAuthStorage('auth_session');
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const refreshSession = useCallback(async () => {
    try {
      if (!session?.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh session');
      }

      const newSession: AuthSession = await response.json();
      setSession(newSession);
      setUser(newSession.user);
      setAuthStorage('auth_session', newSession);
    } catch (err: any) {
      console.error('Session refresh failed:', err);
      // If refresh fails, sign out
      setSession(null);
      setUser(null);
      removeAuthStorage('auth_session');
      throw err;
    }
  }, [session]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      const updatedUser: User = await response.json();
      setUser(updatedUser);
      
      // Update session with new user data
      const updatedSession: AuthSession = {
        ...session,
        user: updatedUser,
      };
      setSession(updatedSession);
      setAuthStorage('auth_session', updatedSession);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PROFILE_UPDATE_ERROR',
        message: err.message || 'Profile update failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password change failed');
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PASSWORD_CHANGE_ERROR',
        message: err.message || 'Password change failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PASSWORD_RESET_ERROR',
        message: err.message || 'Password reset failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Email verification failed');
      }

      const result = await response.json();
      
      // Update user email verification status
      if (user) {
        const updatedUser: User = {
          ...user,
          emailVerified: true,
        };
        setUser(updatedUser);
        
        if (session) {
          const updatedSession: AuthSession = {
            ...session,
            user: updatedUser,
          };
          setSession(updatedSession);
          setAuthStorage('auth_session', updatedSession);
        }
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'EMAIL_VERIFICATION_ERROR',
        message: err.message || 'Email verification failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [user, session]);

  const resendVerification = useCallback(async () => {
    try {
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend verification');
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'RESEND_VERIFICATION_ERROR',
        message: err.message || 'Failed to resend verification',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const enableTwoFactor = useCallback(async (code: string) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/enable-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enable two-factor authentication');
      }

      const result = await response.json();
      
      // Update user two-factor status
      if (user) {
        const updatedUser: User = {
          ...user,
          twoFactorEnabled: true,
          twoFactorSecret: result.secret,
        };
        setUser(updatedUser);
        
        if (session) {
          const updatedSession: AuthSession = {
            ...session,
            user: updatedUser,
          };
          setSession(updatedSession);
          setAuthStorage('auth_session', updatedSession);
        }
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'ENABLE_2FA_ERROR',
        message: err.message || 'Failed to enable two-factor authentication',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [user, session]);

  const disableTwoFactor = useCallback(async (code: string) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/disable-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to disable two-factor authentication');
      }

      // Update user two-factor status
      if (user) {
        const updatedUser: User = {
          ...user,
          twoFactorEnabled: false,
          twoFactorSecret: undefined,
        };
        setUser(updatedUser);
        
        if (session) {
          const updatedSession: AuthSession = {
            ...session,
            user: updatedUser,
          };
          setSession(updatedSession);
          setAuthStorage('auth_session', updatedSession);
        }
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'DISABLE_2FA_ERROR',
        message: err.message || 'Failed to disable two-factor authentication',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [user, session]);

  const verifyTwoFactor = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Two-factor verification failed');
      }

      const sessionData: AuthSession = await response.json();
      setSession(sessionData);
      setUser(sessionData.user);
      setAuthStorage('auth_session', sessionData);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'VERIFY_2FA_ERROR',
        message: err.message || 'Two-factor verification failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    session,
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    refreshSession,
    updateProfile,
    changePassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    enableTwoFactor,
    disableTwoFactor,
    verifyTwoFactor,
  };
};
