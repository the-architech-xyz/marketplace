/**
 * Authentication Frontend Implementation: Shadcn/ui
 * 
 * This implementation provides the UI components for the authentication capability
 * using Shadcn/ui. It generates components that consume the hooks defined
 * in the contract.ts file.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const authShadcnBlueprint: Blueprint = {
  id: 'auth-frontend-shadcn',
  name: 'Authentication Frontend (Shadcn/ui)',
  description: 'Frontend implementation for authentication capability using Shadcn/ui',
  actions: [
    // Install additional dependencies for auth UI
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'lucide-react@^0.294.0',
        '@tanstack/react-query@^5.0.0',
        'next-auth@^4.24.5'
      ]
    },

    // Create login form component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/LoginForm.tsx',
      content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignIn, useOAuthSignIn } from '@/lib/auth/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2, Eye, EyeOff, Mail, Lock, Github } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const oauthSignIn = useOAuthSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn.mutateAsync(data);
      // Redirect will be handled by the auth system
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      const { url } = await oauthSignIn.mutateAsync({ provider });
      window.location.href = url;
    } catch (error) {
      console.error('Error with OAuth sign in:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {signIn.error && (
            <Alert>
              <AlertDescription>{signIn.error.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <Alert>
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <Alert>
                <AlertDescription>{errors.password.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                {...register('rememberMe')}
              />
              <Label htmlFor="rememberMe" className="text-sm">
                Remember me
              </Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={signIn.isPending}>
            {signIn.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Sign In
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthSignIn.isPending}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('github')}
              disabled={oauthSignIn.isPending}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create signup form component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/SignupForm.tsx',
      content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignUp, useOAuthSignIn } from '@/lib/auth/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Loader2, Eye, EyeOff, Mail, Lock, User, Github } from 'lucide-react';
import Link from 'next/link';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signUp = useSignUp();
  const oauthSignIn = useOAuthSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signUp.mutateAsync(data);
      // Redirect will be handled by the auth system
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      const { url } = await oauthSignIn.mutateAsync({ provider });
      window.location.href = url;
    } catch (error) {
      console.error('Error with OAuth sign in:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {signUp.error && (
            <Alert>
              <AlertDescription>{signUp.error.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                {...register('name')}
              />
            </div>
            {errors.name && (
              <Alert>
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <Alert>
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="pl-10 pr-10"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <Alert>
                <AlertDescription>{errors.password.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="pl-10 pr-10"
                {...register('confirmPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <Alert>
                <AlertDescription>{errors.confirmPassword.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              I agree to the{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <Alert>
              <AlertDescription>{errors.acceptTerms.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={signUp.isPending}>
            {signUp.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create Account
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthSignIn.isPending}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignIn('github')}
              disabled={oauthSignIn.isPending}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create profile management component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/ProfileManager.tsx',
      content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser, useUpdateProfile, useSignOut, useAccounts, useUnlinkAccount } from '@/lib/auth/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, User, Mail, Settings, LogOut, Unlink, Github } from 'lucide-react';
import { format } from 'date-fns';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  image: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileManager() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading: userLoading } = useUser();
  const { data: accounts } = useAccounts();
  const updateProfile = useUpdateProfile();
  const signOut = useSignOut();
  const unlinkAccount = useUnlinkAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      image: user?.image || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile.mutateAsync(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = () => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email);
      setValue('image', user.image || '');
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUnlinkAccount = async (accountId: string) => {
    if (confirm('Are you sure you want to unlink this account?')) {
      try {
        await unlinkAccount.mutateAsync(accountId);
      } catch (error) {
        console.error('Error unlinking account:', error);
      }
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
          </svg>
        );
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  if (userLoading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>Please sign in to view your profile</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={handleEdit}>
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.image || ''} alt={user.name || ''} />
                  <AvatarFallback>
                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/avatar.jpg"
                    {...register('image')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <Alert>
                      <AlertDescription>{errors.name.message}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <Alert>
                      <AlertDescription>{errors.email.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={updateProfile.isPending}>
                  {updateProfile.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.image || ''} alt={user.name || ''} />
                  <AvatarFallback>
                    {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name || 'No name set'}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">
                      {user.emailVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Joined {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            Manage your connected social accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts?.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No connected accounts</h3>
              <p className="text-gray-600">Connect your social accounts for easier sign-in</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts?.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getProviderIcon(account.provider)}
                    <div>
                      <h4 className="font-medium capitalize">{account.provider}</h4>
                      <p className="text-sm text-gray-600">
                        Connected {format(new Date(account.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnlinkAccount(account.id)}
                    disabled={unlinkAccount.isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Unlink className="w-4 h-4 mr-1" />
                    Unlink
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your account and sign out
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={signOut.isPending}
              className="w-full"
            >
              {signOut.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`
    },

    // Create auth pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/login/page.tsx',
      content: `import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/signup/page.tsx',
      content: `import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/profile/page.tsx',
      content: `import { ProfileManager } from '@/components/auth/ProfileManager';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <ProfileManager />
    </div>
  );
}`
    }
  ]
};
