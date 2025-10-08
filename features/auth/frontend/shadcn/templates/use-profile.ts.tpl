// User profile management hook

import { useState, useEffect, useCallback } from 'react';
import { User, AuthError } from './auth-types';
import { validateEmail, sanitizeInput } from './auth-utils';

interface UseProfileReturn {
  profile: User | null;
  isLoading: boolean;
  error: AuthError | null;
  isUpdating: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  deleteAvatar: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load profile on mount
  useEffect(() => {
    refreshProfile();
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load profile');
      }

      const userData: User = await response.json();
      setProfile(userData);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PROFILE_LOAD_ERROR',
        message: err.message || 'Failed to load profile',
      };
      setError(authError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validate and sanitize input data
      const sanitizedData: Partial<User> = {};
      
      if (data.name) {
        sanitizedData.name = sanitizeInput(data.name);
        if (sanitizedData.name.length < 2) {
          throw new Error('Name must be at least 2 characters long');
        }
      }

      if (data.email) {
        const email = sanitizeInput(data.email);
        if (!validateEmail(email)) {
          throw new Error('Please enter a valid email address');
        }
        sanitizedData.email = email;
      }

      if (data.bio) {
        sanitizedData.bio = sanitizeInput(data.bio);
      }

      if (data.website) {
        const website = sanitizeInput(data.website);
        if (website && !website.match(/^https?:\/\/.+/)) {
          throw new Error('Website must be a valid URL');
        }
        sanitizedData.website = website;
      }

      if (data.location) {
        sanitizedData.location = sanitizeInput(data.location);
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile: User = await response.json();
      setProfile(updatedProfile);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PROFILE_UPDATE_ERROR',
        message: err.message || 'Failed to update profile',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      setIsUpdating(true);
      setError(null);

      if (!currentPassword) {
        throw new Error('Current password is required');
      }

      if (!newPassword || newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
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

      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'PASSWORD_CHANGE_ERROR',
        message: err.message || 'Failed to change password',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteAccount = useCallback(async (password: string) => {
    try {
      setIsUpdating(true);
      setError(null);

      if (!password) {
        throw new Error('Password is required to delete account');
      }

      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }

      // Clear profile after successful deletion
      setProfile(null);
    } catch (err: any) {
      const authError: AuthError = {
        code: 'ACCOUNT_DELETE_ERROR',
        message: err.message || 'Failed to delete account',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<string> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validate file
      if (!file) {
        throw new Error('No file selected');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Create form data
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload avatar');
      }

      const result = await response.json();
      
      // Update profile with new avatar URL
      if (profile) {
        const updatedProfile: User = {
          ...profile,
          avatar: result.avatarUrl,
        };
        setProfile(updatedProfile);
      }

      return result.avatarUrl;
    } catch (err: any) {
      const authError: AuthError = {
        code: 'AVATAR_UPLOAD_ERROR',
        message: err.message || 'Failed to upload avatar',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsUpdating(false);
    }
  }, [profile]);

  const deleteAvatar = useCallback(async () => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch('/api/auth/delete-avatar', {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete avatar');
      }

      // Update profile to remove avatar
      if (profile) {
        const updatedProfile: User = {
          ...profile,
          avatar: undefined,
        };
        setProfile(updatedProfile);
      }
    } catch (err: any) {
      const authError: AuthError = {
        code: 'AVATAR_DELETE_ERROR',
        message: err.message || 'Failed to delete avatar',
      };
      setError(authError);
      throw authError;
    } finally {
      setIsUpdating(false);
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    isUpdating,
    updateProfile,
    changePassword,
    deleteAccount,
    uploadAvatar,
    deleteAvatar,
    refreshProfile,
  };
};