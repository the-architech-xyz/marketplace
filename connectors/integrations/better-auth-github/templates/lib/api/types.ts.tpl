/**
 * GitHub OAuth API Types and Contracts
 * 
 * TypeScript types for the GitHub OAuth connector API endpoints.
 * These types define the request/response shapes for all OAuth routes.
 */

// ============================================================================
// AUTHORIZATION API TYPES
// ============================================================================

export interface GitHubAuthorizeRequest {
  redirect?: string; // Optional redirect URL after authentication
  state?: string; // Optional state parameter (auto-generated if not provided)
}

export interface GitHubAuthorizeResponse {
  // 302 Redirect - no JSON response
  // Redirects to GitHub OAuth authorization page
}

// ============================================================================
// CALLBACK API TYPES
// ============================================================================

export interface GitHubCallbackRequest {
  code: string; // Authorization code from GitHub
  state: string; // State parameter for CSRF protection
}

export interface GitHubCallbackResponse {
  // 302 Redirect - no JSON response
  // Redirects to application with session cookie set
}

export interface GitHubCallbackErrorResponse {
  error: {
    code: 'OAUTH_ERROR' | 'INVALID_STATE' | 'INVALID_CODE' | 'ACCESS_DENIED' | 'ACCOUNT_EXISTS';
    message: string;
    type: 'authentication_error' | 'validation_error' | 'permission_error';
    details?: {
      provider: 'github';
      error_description?: string;
      error_uri?: string;
    };
  };
}

// ============================================================================
// REVOKE API TYPES
// ============================================================================

export interface GitHubRevokeRequest {
  accountId?: string; // Optional - specific account ID to revoke
}

export interface GitHubRevokeResponse {
  success: boolean;
  message: string;
}

export interface GitHubRevokeErrorResponse {
  error: {
    code: 'UNAUTHORIZED' | 'ACCOUNT_NOT_FOUND' | 'REVOKE_FAILED';
    message: string;
    type: 'authentication_error' | 'not_found_error' | 'system_error';
    details?: {
      provider: 'github';
      accountId?: string;
    };
  };
}

// ============================================================================
// OAUTH TOKEN TYPES (Internal - not exposed via API)
// ============================================================================

export interface GitHubOAuthToken {
  access_token: string;
  token_type: 'bearer';
  scope: string;
}

export interface GitHubUserProfile {
  id: number;
  login: string;
  email: string | null;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  html_url: string;
}

// ============================================================================
// ERROR RESPONSE TYPES
// ============================================================================

export interface OAuthErrorResponse {
  error: {
    code: string;
    message: string;
    type: 'authentication_error' | 'validation_error' | 'permission_error' | 'not_found_error' | 'system_error';
    provider?: 'github';
    details?: Record<string, any>;
  };
}

// ============================================================================
// SUCCESS RESPONSE TYPES
// ============================================================================

export interface OAuthSuccessResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ============================================================================
// API ENDPOINT TYPES
// ============================================================================

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestType?: string;
  responseType?: string;
  errorTypes?: string[];
  requiresAuth?: boolean;
}

// ============================================================================
// API CONTRACT DEFINITION
// ============================================================================

export const GITHUB_OAUTH_API_CONTRACT: Record<string, ApiEndpoint> = {
  // Authorization
  'GET /auth/github/authorize': {
    method: 'GET',
    path: '/auth/github/authorize',
    description: 'Initiate GitHub OAuth authorization flow',
    requestType: 'GitHubAuthorizeRequest (query params)',
    responseType: '302 Redirect to GitHub',
    errorTypes: ['OAUTH_ERROR'],
    requiresAuth: false,
  },
  
  // Callback
  'GET /auth/github/callback': {
    method: 'GET',
    path: '/auth/github/callback',
    description: 'Handle GitHub OAuth callback',
    requestType: 'GitHubCallbackRequest (query params)',
    responseType: '302 Redirect to app (with session cookie)',
    errorTypes: ['OAUTH_ERROR', 'INVALID_STATE', 'INVALID_CODE', 'ACCESS_DENIED', 'ACCOUNT_EXISTS'],
    requiresAuth: false,
  },
  
  // Revoke
  'POST /auth/github/revoke': {
    method: 'POST',
    path: '/auth/github/revoke',
    description: 'Revoke GitHub OAuth access token',
    requestType: 'GitHubRevokeRequest',
    responseType: 'GitHubRevokeResponse',
    errorTypes: ['UNAUTHORIZED', 'ACCOUNT_NOT_FOUND', 'REVOKE_FAILED'],
    requiresAuth: true,
  },
};

// ============================================================================
// HELPER TYPES FOR EXPORT
// ============================================================================

export type GitHubOAuthErrorCode = 
  | 'OAUTH_ERROR'
  | 'INVALID_STATE'
  | 'INVALID_CODE'
  | 'ACCESS_DENIED'
  | 'ACCOUNT_EXISTS'
  | 'UNAUTHORIZED'
  | 'ACCOUNT_NOT_FOUND'
  | 'REVOKE_FAILED';

export type GitHubOAuthEndpoint = keyof typeof GITHUB_OAUTH_API_CONTRACT;

