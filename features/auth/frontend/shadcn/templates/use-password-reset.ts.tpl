// Password reset hook

import { useState, useCallback } from 'react';
import { AuthError } from './auth-types';
import { validateEmail, generatePasswordResetToken } from './auth-utils';

interface UsePasswordResetReturn {
  isLoading: boolean;
  error: AuthError | null;
  isEmailSent: boolean;
  isTokenValid: boolean;
  resetToken: string | null;
  requestReset: (email: string) => Promise<void>;
  verifyToken: (token: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string, confirmPassword: string) => Promise<void>;
  clearState: () => void;
}

export const usePasswordReset = (): UsePasswordResetReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const requestReset = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsEmailSent(false);

      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send password reset email');
      }

      setIsEmailSent(true);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PASSWORD_RESET_REQUEST_ERROR',
        message: err.message || 'Failed to send password reset email',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsTokenValid(false);

      if (!token || token.length < 10) {
        throw new Error('Invalid reset token');
      }

      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid or expired reset token');
      }

      const result = await response.json();
      setIsTokenValid(true);
      setResetToken(token);
      return true;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'TOKEN_VERIFICATION_ERROR',
        message: err.message || 'Invalid or expired reset token',
      };
      setError(authError);
      setIsTokenValid(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate inputs
      if (!token) {
        throw new Error('Reset token is required');
      }

      if (!newPassword || newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Additional password validation
      const passwordValidation = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: false,
      };

      const validation = validatePassword(newPassword, passwordValidation);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      // Clear state after successful reset
      setIsEmailSent(false);
      setIsTokenValid(false);
      setResetToken(null);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PASSWORD_RESET_ERROR',
        message: err.message || 'Failed to reset password',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearState = useCallback(() => {
    setError(null);
    setIsEmailSent(false);
    setIsTokenValid(false);
    setResetToken(null);
  }, []);

  return {
    isLoading,
    error,
    isEmailSent,
    isTokenValid,
    resetToken,
    requestReset,
    verifyToken,
    resetPassword,
    clearState,
  };
};
