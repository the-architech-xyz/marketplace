# Authentication Capability

Complete authentication capability with user management, sessions, OAuth, and security features.

## Overview

The Authentication capability provides a comprehensive user authentication system with support for:
- User registration and login
- Session management and security
- OAuth providers (Google, GitHub, Facebook, Twitter)
- Two-factor authentication
- Password reset and email verification
- Account management and data export

## Architecture

This feature follows the Two-Headed architecture pattern:

### Backend Implementations
- **`better-auth-nextjs/`** - Better Auth integration with Next.js
- **`auth0-nextjs/`** - Auth0 integration with Next.js (planned)
- **`firebase-nextjs/`** - Firebase Auth integration with Next.js (planned)

### Frontend Implementations
- **`shadcn/`** - Shadcn/ui components
- **`mui/`** - Material-UI components (planned)
- **`chakra/`** - Chakra UI components (planned)

## Contract

The feature contract is defined in `feature.json` and includes:

### Hooks
- **User Hooks**: `useUser`, `useSession`, `useAuthState`, `useAccounts`
- **Authentication Hooks**: `useSignIn`, `useSignUp`, `useSignOut`
- **Password Hooks**: `useResetPassword`, `useUpdatePassword`
- **Profile Hooks**: `useUpdateProfile`
- **Email Hooks**: `useVerifyEmail`, `useResendVerification`
- **2FA Hooks**: `useEnableTwoFactor`, `useVerifyTwoFactor`, `useDisableTwoFactor`
- **OAuth Hooks**: `useOAuthSignIn`, `useOAuthCallback`
- **Account Hooks**: `useDeleteAccount`, `useExportData`

### API Endpoints
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User sign up
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/me` - Get current user
- `POST /api/auth/reset-password` - Reset password
- `PATCH /api/auth/update-password` - Update password
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/resend-verification` - Resend verification
- `POST /api/auth/2fa/enable` - Enable 2FA
- `POST /api/auth/2fa/verify` - Verify 2FA
- `POST /api/auth/2fa/disable` - Disable 2FA
- `POST /api/auth/oauth/:provider` - OAuth sign in
- `POST /api/auth/oauth/:provider/callback` - OAuth callback
- `DELETE /api/auth/delete-account` - Delete account
- `POST /api/auth/export-data` - Export user data

### Types
- `User` - User information
- `Session` - Session data
- `AuthState` - Authentication state
- `Account` - OAuth account information
- `SignInData` - Sign in parameters
- `SignUpData` - Sign up parameters
- `ResetPasswordData` - Password reset parameters
- `UpdatePasswordData` - Password update parameters
- `UpdateProfileData` - Profile update parameters
- `TwoFactorData` - 2FA configuration
- `OAuthData` - OAuth provider data

## Implementation Requirements

### Backend Implementation
1. **Must implement all API endpoints** defined in the contract
2. **Must integrate with authentication provider** (Better Auth, Auth0, etc.)
3. **Must handle session management** and security
4. **Must support OAuth providers** as configured
5. **Must provide password security** (hashing, validation, etc.)
6. **Must handle email verification** and password reset flows

### Frontend Implementation
1. **Must provide authentication forms** (login, signup, etc.)
2. **Must integrate with backend hooks** using TanStack Query
3. **Must handle authentication state** and redirects
4. **Must provide OAuth buttons** for configured providers
5. **Must support the selected UI library** (Shadcn, MUI, etc.)

## Usage Example

```typescript
// Using the auth hooks
import { useUser, useSignIn, useSignOut } from '@/lib/auth/hooks';

function AuthButton() {
  const { data: user } = useUser();
  const signIn = useSignIn();
  const signOut = useSignOut();

  if (user) {
    return (
      <button onClick={() => signOut.mutate()}>
        Sign Out
      </button>
    );
  }

  return (
    <button onClick={() => signIn.mutate({ email: 'user@example.com', password: 'password' })}>
      Sign In
    </button>
  );
}
```

## Configuration

The feature can be configured through the `parameters` section in `feature.json`:

- **`backend`**: Choose authentication provider implementation
- **`frontend`**: Choose UI library implementation
- **`features`**: Enable/disable specific auth features
- **`oauthProviders`**: Configure OAuth providers

## Security Considerations

- **Use secure password hashing** (bcrypt, Argon2, etc.)
- **Implement proper session management** with secure cookies
- **Validate all input data** on both frontend and backend
- **Use HTTPS** for all authentication endpoints
- **Implement rate limiting** for authentication attempts
- **Handle OAuth securely** with proper state validation

## Dependencies

### Required Adapters
- `better-auth` - Authentication service adapter

### Required Integrators
- `better-auth-nextjs-integration` - Better Auth + Next.js integration

### Required Capabilities
- `user-authentication` - User authentication capability

## Development

To add a new backend implementation:

1. Create a new directory under `backend/`
2. Implement the required API endpoints
3. Create the service layer with auth provider integration
4. Handle session management and security
5. Update the feature.json to include the new implementation

To add a new frontend implementation:

1. Create a new directory under `frontend/`
2. Implement auth UI components using the selected library
3. Integrate with the backend hooks
4. Handle authentication state and redirects
5. Update the feature.json to include the new implementation
