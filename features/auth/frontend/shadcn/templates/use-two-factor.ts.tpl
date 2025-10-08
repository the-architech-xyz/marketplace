// Two-factor authentication hook

import { useState, useCallback } from 'react';
import { AuthError } from './auth-types';
import { generateTwoFactorSecret, generateTwoFactorQRCode, verifyTwoFactorCode } from './auth-utils';

interface UseTwoFactorReturn {
  isLoading: boolean;
  error: AuthError | null;
  secret: string | null;
  qrCodeUrl: string | null;
  backupCodes: string[];
  generateSecret: (email: string, issuer?: string) => { secret: string; qrCodeUrl: string };
  verifyCode: (secret: string, code: string) => boolean;
  enableTwoFactor: (secret: string, code: string) => Promise<void>;
  disableTwoFactor: (code: string) => Promise<void>;
  generateBackupCodes: () => string[];
  verifyBackupCode: (code: string) => Promise<boolean>;
  regenerateBackupCodes: () => Promise<string[]>;
}

export const useTwoFactor = (): UseTwoFactorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const generateSecret = useCallback((email: string, issuer: string = 'Your App') => {
    try {
      const newSecret = generateTwoFactorSecret();
      const qrCode = generateTwoFactorQRCode(newSecret, email, issuer);
      
      setSecret(newSecret);
      setQrCodeUrl(qrCode);
      
      return {
        secret: newSecret,
        qrCodeUrl: qrCode,
      };
    } catch (err: any) {
      const authError: AuthError = {
        code: 'GENERATE_SECRET_ERROR',
        message: err.message || 'Failed to generate two-factor secret',
      };
      setError(authError);
      throw authError;
    }
  }, []);

  const verifyCode = useCallback((secret: string, code: string): boolean => {
    try {
      return verifyTwoFactorCode(secret, code);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'VERIFY_CODE_ERROR',
        message: err.message || 'Failed to verify two-factor code',
      };
      setError(authError);
      return false;
    }
  }, []);

  const enableTwoFactor = useCallback(async (secret: string, code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Verify the code before enabling
      if (!verifyTwoFactorCode(secret, code)) {
        throw new Error('Invalid verification code');
      }

      const response = await fetch('/api/auth/enable-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enable two-factor authentication');
      }

      const result = await response.json();
      
      // Store backup codes if provided
      if (result.backupCodes) {
        setBackupCodes(result.backupCodes);
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
  }, []);

  const disableTwoFactor = useCallback(async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/disable-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to disable two-factor authentication');
      }

      // Clear local state
      setSecret(null);
      setQrCodeUrl(null);
      setBackupCodes([]);
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
  }, []);

  const generateBackupCodes = useCallback((): string[] => {
    try {
      const codes = [];
      for (let i = 0; i < 10; i++) {
        codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
      }
      setBackupCodes(codes);
      return codes;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'GENERATE_BACKUP_CODES_ERROR',
        message: err.message || 'Failed to generate backup codes',
      };
      setError(authError);
      return [];
    }
  }, []);

  const verifyBackupCode = useCallback(async (code: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/verify-backup-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid backup code');
      }

      return true;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'VERIFY_BACKUP_CODE_ERROR',
        message: err.message || 'Invalid backup code',
      };
      setError(authError);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerateBackupCodes = useCallback(async (): Promise<string[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/regenerate-backup-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to regenerate backup codes');
      }

      const result = await response.json();
      setBackupCodes(result.backupCodes);
      return result.backupCodes;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'REGENERATE_BACKUP_CODES_ERROR',
        message: err.message || 'Failed to regenerate backup codes',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    secret,
    qrCodeUrl,
    backupCodes,
    generateSecret,
    verifyCode,
    enableTwoFactor,
    disableTwoFactor,
    generateBackupCodes,
    verifyBackupCode,
    regenerateBackupCodes,
  };
};
