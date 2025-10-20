/**
 * GitHub OAuth Types
 * 
 * TypeScript type definitions for GitHub OAuth operations
 */

export interface GitHubOAuthResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  message?: string;
}

export interface GitHubTokenInfo {
  accessToken: string;
  tokenType: string;
  scope: string;
  userId: string;
  githubUserId: number;
  githubUsername: string;
  expiresAt: Date | null;
  refreshToken: string | null;
  createdAt: Date;
}

export interface GitHubUserInfo {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatarUrl: string;
  htmlUrl: string;
  type: string;
}

export interface OAuthState {
  state: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface TokenRefreshResult {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresAt: Date | null;
}

export interface GitHubOAuthConfigOptions {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes?: string[];
  baseUrl?: string;
}

export interface OAuthFlowOptions {
  userId: string;
  state?: string;
  scopes?: string[];
}

export interface TokenExchangeOptions {
  code: string;
  state: string;
  userId: string;
}

export interface TokenRefreshOptions {
  userId: string;
  refreshToken?: string;
}

export interface TokenRevokeOptions {
  userId: string;
  accessToken?: string;
}

export interface GitHubRepositoryAccess {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
  cloneUrl: string;
  sshUrl: string;
  defaultBranch: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}

export interface GitHubOAuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
}

export interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in?: number;
  refresh_token?: string;
}

export interface GitHubUserResponse {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubOAuthServiceOptions {
  config: GitHubOAuthConfigOptions;
  tokenManager: {
    storeToken: (userId: string, token: GitHubTokenInfo) => Promise<void>;
    getToken: (userId: string) => Promise<GitHubTokenInfo | null>;
    removeToken: (userId: string) => Promise<void>;
    storeOAuthState: (userId: string, state: string) => Promise<void>;
    validateOAuthState: (userId: string, state: string) => Promise<boolean>;
  };
}

export interface GitHubOAuthClientOptions {
  userId: string;
  autoRefresh?: boolean;
  refreshThreshold?: number; // seconds before expiry to refresh
}

export interface GitHubOAuthClient {
  getToken: () => Promise<GitHubTokenInfo | null>;
  refreshToken: () => Promise<TokenRefreshResult | null>;
  revokeToken: () => Promise<boolean>;
  hasValidToken: () => Promise<boolean>;
  getRepositories: () => Promise<GitHubRepositoryAccess[]>;
  createRepository: (options: any) => Promise<any>;
  updateRepository: (owner: string, repo: string, options: any) => Promise<any>;
  deleteRepository: (owner: string, repo: string) => Promise<boolean>;
  createPullRequest: (owner: string, repo: string, options: any) => Promise<any>;
  createFile: (owner: string, repo: string, options: any) => Promise<any>;
  updateFile: (owner: string, repo: string, options: any) => Promise<any>;
  deleteFile: (owner: string, repo: string, options: any) => Promise<boolean>;
}

export interface GitHubOAuthMiddlewareOptions {
  requiredScopes?: string[];
  allowExpiredTokens?: boolean;
  autoRefresh?: boolean;
}

export interface GitHubOAuthMiddleware {
  (req: any, res: any, next: any): Promise<void>;
}

export interface GitHubOAuthWebhookPayload {
  action: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
  };
  sender: {
    id: number;
    login: string;
    type: string;
  };
}

export interface GitHubOAuthWebhookOptions {
  secret: string;
  events: string[];
  handler: (payload: GitHubOAuthWebhookPayload) => Promise<void>;
}

export interface GitHubOAuthRateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  used: number;
}

export interface GitHubOAuthPermissions {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
}

export interface GitHubOAuthRepository {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  owner: {
    id: number;
    login: string;
    type: string;
  };
  htmlUrl: string;
  cloneUrl: string;
  sshUrl: string;
  gitUrl: string;
  defaultBranch: string;
  permissions: GitHubOAuthPermissions;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date | null;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
  language: string | null;
  topics: string[];
  archived: boolean;
  disabled: boolean;
}
