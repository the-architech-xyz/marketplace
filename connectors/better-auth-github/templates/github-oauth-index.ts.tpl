/**
 * GitHub OAuth Integration - Main Export
 * 
 * Central export point for all GitHub OAuth functionality
 */

// Main services
export { GitHubOAuthService } from './github-oauth-service';
export { GitHubOAuthConfig } from './github-oauth-config';
export { GitHubTokenManager, InMemoryTokenStorage, DatabaseTokenStorage } from './github-token-manager';
export { GitHubOAuthClient } from './github-oauth-client';

// Types
export type {
  GitHubOAuthResponse,
  GitHubTokenInfo,
  GitHubUserInfo,
  OAuthState,
  TokenRefreshResult,
  GitHubOAuthConfigOptions,
  OAuthFlowOptions,
  TokenExchangeOptions,
  TokenRefreshOptions,
  TokenRevokeOptions,
  GitHubRepositoryAccess,
  GitHubOAuthError,
  GitHubTokenResponse,
  GitHubUserResponse,
  GitHubOAuthServiceOptions,
  GitHubOAuthClientOptions,
  GitHubOAuthClient,
  GitHubOAuthMiddlewareOptions,
  GitHubOAuthMiddleware,
  GitHubOAuthWebhookPayload,
  GitHubOAuthWebhookOptions,
  GitHubOAuthRateLimit,
  GitHubOAuthPermissions,
  GitHubOAuthRepository
} from './github-oauth-types';

// Re-export GitHub client for advanced usage
export { GitHubClient } from '@/lib/github/client';
