import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  avatar?: string;
}

// API functions
const fetchCurrentUser = async (): Promise<User | null> => {
  const response = await fetch('/api/auth/me');
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

const signIn = async (credentials: SignInCredentials): Promise<User> => {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  return response.json();
};

const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create account');
  }
  return response.json();
};

const signOut = async (): Promise<void> => {
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to sign out');
  }
};

const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json();
};

const sendPasswordResetEmail = async (email: string): Promise<void> => {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error('Failed to send password reset email');
  }
};

const resetPassword = async (token: string, password: string): Promise<void> => {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  });
  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
};

const verifyEmail = async (token: string): Promise<void> => {
  const response = await fetch('/api/auth/verify-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  if (!response.ok) {
    throw new Error('Failed to verify email');
  }
};

// Hooks
export const useAuth = () => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signIn,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'user'], user);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'user'], user);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'user'], user);
    },
  });
};

export const useSendPasswordResetEmail = () => {
  return useMutation({
    mutationFn: sendPasswordResetEmail,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
};

// Utility hooks
export const useIsAuthenticated = () => {
  const { data: user } = useAuth();
  return !!user;
};

export const useRequireAuth = (redirectTo = '/login') => {
  const { data: user, isLoading } = useAuth();
  
  React.useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = redirectTo;
    }
  }, [user, isLoading, redirectTo]);
  
  return { user, isLoading };
};

export const useOptionalAuth = () => {
  const { data: user, isLoading } = useAuth();
  return { user, isLoading, isAuthenticated: !!user };
};
