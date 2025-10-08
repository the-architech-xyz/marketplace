// Social authentication hook

import { useState, useCallback } from 'react';
import { SocialProvider, AuthSession, User, AuthError } from './auth-types';
import { generateSocialAuthUrl, getSocialProviderConfig } from './auth-utils';

interface UseSocialAuthReturn {
  providers: SocialProvider[];
  isLoading: boolean;
  error: AuthError | null;
  signInWithProvider: (provider: string) => Promise<void>;
  handleCallback: (provider: string, code: string, state: string) => Promise<void>;
  isProviderEnabled: (provider: string) => boolean;
}

export const useSocialAuth = (): UseSocialAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  // Get available social providers
  const providers: SocialProvider[] = [
    getSocialProviderConfig('google'),
    getSocialProviderConfig('github'),
    getSocialProviderConfig('microsoft'),
  ].filter(Boolean) as SocialProvider[];

  const signInWithProvider = useCallback(async (provider: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const config = getSocialProviderConfig(provider);
      if (!config || !config.enabled) {
        throw new Error(`Provider ${provider} is not available`);
      }

      // Generate state parameter for CSRF protection
      const state = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
      
      // Store state in session storage for verification
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('oauth_state', state);
      }

      // Generate the OAuth URL
      const authUrl = generateSocialAuthUrl(provider, state);
      
      // Redirect to the OAuth provider
      if (typeof window !== 'undefined') {
        window.location.href = authUrl;
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'SOCIAL_AUTH_ERROR',
        message: err.message || `Failed to initiate ${provider} authentication`,
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCallback = useCallback(async (provider: string, code: string, state: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Verify state parameter
      if (typeof window !== 'undefined') {
        const storedState = sessionStorage.getItem('oauth_state');
        if (storedState !== state) {
          throw new Error('Invalid state parameter');
        }
        sessionStorage.removeItem('oauth_state');
      }

      // Exchange code for tokens
      const response = await fetch('/api/auth/social/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider, code, state }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Social authentication failed');
      }

      const result = await response.json();
      
      // Handle the authentication result
      if (result.session) {
        // Store the session
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_session', JSON.stringify(result.session));
        }
        
        // Redirect to the intended page or dashboard
        if (typeof window !== 'undefined') {
          const redirectTo = sessionStorage.getItem('auth_redirect') || '/dashboard';
          sessionStorage.removeItem('auth_redirect');
          window.location.href = redirectTo;
        }
      } else if (result.requiresTwoFactor) {
        // Redirect to two-factor verification
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/verify-2fa';
        }
      } else if (result.requiresEmailVerification) {
        // Redirect to email verification
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/verify-email';
        }
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'SOCIAL_CALLBACK_ERROR',
        message: err.message || 'Social authentication callback failed',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isProviderEnabled = useCallback((provider: string): boolean => {
    const config = getSocialProviderConfig(provider);
    return config?.enabled || false;
  }, []);

  return {
    providers,
    isLoading,
    error,
    signInWithProvider,
    handleCallback,
    isProviderEnabled,
  };
};
