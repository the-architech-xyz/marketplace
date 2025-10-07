import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormProvider } from '@/components/forms/FormProvider';
import { FormInput } from '@/components/forms/FormInput';
import { FormCheckbox } from '@/components/forms/FormCheckbox';
import { FormError } from '@/components/forms/FormError';
import { Button } from '@/components/ui/button';

// Login form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  className?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  className,
  showRememberMe = true,
  showForgotPassword = true,
  onForgotPassword,
}: LoginFormProps) {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Login form submission error:', error);
    }
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to access your account
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Login Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <FormInput
              name="email"
              label="Email address"
              type="email"
              placeholder="Enter your email"
              register={methods.register}
              error={errors.email}
              required
              autoComplete="email"
              autoFocus
            />

            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              register={methods.register}
              error={errors.password}
              required
              autoComplete="current-password"
            />

            {showRememberMe && (
              <FormCheckbox
                name="rememberMe"
                label="Remember me"
                register={methods.register}
                error={errors.rememberMe}
                description="Keep me signed in for 30 days"
              />
            )}

            {showForgotPassword && onForgotPassword && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

// Export default for easier imports
export default LoginForm;
