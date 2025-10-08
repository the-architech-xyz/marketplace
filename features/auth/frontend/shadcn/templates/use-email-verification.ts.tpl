// Email verification hook

import { useState, useCallback } from 'react';
import { AuthError } from './auth-types';
import { validateEmail, generateEmailVerificationToken } from './auth-utils';

interface UseEmailVerificationReturn {
  isLoading: boolean;
  error: AuthError | null;
  isEmailSent: boolean;
  isVerified: boolean;
  verificationToken: string | null;
  sendVerification: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<void>;
  clearState: () => void;
}

export const useEmailVerification = (): UseEmailVerificationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);

  const sendVerification = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsEmailSent(false);

      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send verification email');
      }

      setIsEmailSent(true);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'SEND_VERIFICATION_ERROR',
        message: err.message || 'Failed to send verification email',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsVerified(false);

      if (!token || token.length < 10) {
        throw new Error('Invalid verification token');
      }

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid or expired verification token');
      }

      const result = await response.json();
      setIsVerified(true);
      setVerificationToken(token);
      return true;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'EMAIL_VERIFICATION_ERROR',
        message: err.message || 'Invalid or expired verification token',
      };
      setError(authError);
      setIsVerified(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendVerification = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend verification email');
      }

      setIsEmailSent(true);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'RESEND_VERIFICATION_ERROR',
        message: err.message || 'Failed to resend verification email',
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
    setIsVerified(false);
    setVerificationToken(null);
  }, []);

  return {
    isLoading,
    error,
    isEmailSent,
    isVerified,
    verificationToken,
    sendVerification,
    verifyEmail,
    resendVerification,
    clearState,
  };
};
