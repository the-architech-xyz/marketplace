/**
 * GitHub OAuth Service
 * 
 * Handles OAuth 2.0 flow for GitHub Application Authorization
 * This is for giving our app permission to act on behalf of users
 */

import { GitHubOAuthConfig } from './github-oauth-config';
import { GitHubTokenManager } from './github-token-manager';
import { 
  GitHubOAuthResponse, 
  GitHubTokenInfo, 
  GitHubUserInfo,
  OAuthState,
  TokenRefreshResult
} from './github-oauth-types';

export class GitHubOAuthService {
  private config: GitHubOAuthConfig;
  private tokenManager: GitHubTokenManager;

  constructor(config: GitHubOAuthConfig, tokenManager: GitHubTokenManager) {
    this.config = config;
    this.tokenManager = tokenManager;
  }

  /**
   * Generate OAuth authorization URL
   */
  generateAuthUrl(userId: string, state?: string): GitHubOAuthResponse<{ url: string; state: string }> {
    try {
      const generatedState = state || this.generateState();
      const scopes = this.config.scopes.join(' ');
      
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', this.config.clientId);
      authUrl.searchParams.set('redirect_uri', this.config.redirectUri);
      authUrl.searchParams.set('scope', scopes);
      authUrl.searchParams.set('state', generatedState);
      authUrl.searchParams.set('response_type', 'code');

      // Store state for validation
      this.tokenManager.storeOAuthState(userId, generatedState);

      return {
        success: true,
        data: {
          url: authUrl.toString(),
          state: generatedState
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(
    code: string, 
    state: string, 
    userId: string
  ): Promise<GitHubOAuthResponse<GitHubTokenInfo>> {
    try {
      // Validate state
      const isValidState = await this.tokenManager.validateOAuthState(userId, state);
      if (!isValidState) {
        return {
          success: false,
          data: null,
          error: 'Invalid OAuth state'
        };
      }

      // Exchange code for token
      const tokenResponse = await this.exchangeCodeWithGitHub(code);
      if (!tokenResponse.success) {
        return tokenResponse;
      }

      // Get user information
      const userInfo = await this.getUserInfo(tokenResponse.data!.access_token);
      if (!userInfo.success) {
        return {
          success: false,
          data: null,
          error: 'Failed to get user information'
        };
      }

      // Store token securely
      const tokenInfo: GitHubTokenInfo = {
        accessToken: tokenResponse.data!.access_token,
        tokenType: tokenResponse.data!.token_type,
        scope: tokenResponse.data!.scope,
        userId: userId,
        githubUserId: userInfo.data!.id,
        githubUsername: userInfo.data!.login,
        expiresAt: tokenResponse.data!.expires_in 
          ? new Date(Date.now() + tokenResponse.data!.expires_in * 1000)
          : null,
        refreshToken: tokenResponse.data!.refresh_token || null,
        createdAt: new Date()
      };

      await this.tokenManager.storeToken(userId, tokenInfo);

      return {
        success: true,
        data: tokenInfo
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(userId: string): Promise<GitHubOAuthResponse<TokenRefreshResult>> {
    try {
      const tokenInfo = await this.tokenManager.getToken(userId);
      if (!tokenInfo) {
        return {
          success: false,
          data: null,
          error: 'No token found for user'
        };
      }

      if (!tokenInfo.refreshToken) {
        return {
          success: false,
          data: null,
          error: 'No refresh token available'
        };
      }

      // Refresh token with GitHub
      const refreshResponse = await this.refreshTokenWithGitHub(tokenInfo.refreshToken);
      if (!refreshResponse.success) {
        return refreshResponse;
      }

      // Update stored token
      const updatedTokenInfo: GitHubTokenInfo = {
        ...tokenInfo,
        accessToken: refreshResponse.data!.access_token,
        tokenType: refreshResponse.data!.token_type,
        scope: refreshResponse.data!.scope,
        expiresAt: refreshResponse.data!.expires_in 
          ? new Date(Date.now() + refreshResponse.data!.expires_in * 1000)
          : null,
        refreshToken: refreshResponse.data!.refresh_token || tokenInfo.refreshToken
      };

      await this.tokenManager.storeToken(userId, updatedTokenInfo);

      return {
        success: true,
        data: {
          accessToken: updatedTokenInfo.accessToken,
          tokenType: updatedTokenInfo.tokenType,
          scope: updatedTokenInfo.scope,
          expiresAt: updatedTokenInfo.expiresAt
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Revoke access token
   */
  async revokeToken(userId: string): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const tokenInfo = await this.tokenManager.getToken(userId);
      if (!tokenInfo) {
        return {
          success: false,
          data: false,
          error: 'No token found for user'
        };
      }

      // Revoke token with GitHub
      const revokeResponse = await this.revokeTokenWithGitHub(tokenInfo.accessToken);
      if (!revokeResponse.success) {
        return revokeResponse;
      }

      // Remove token from storage
      await this.tokenManager.removeToken(userId);

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get stored token for user
   */
  async getToken(userId: string): Promise<GitHubOAuthResponse<GitHubTokenInfo | null>> {
    try {
      const tokenInfo = await this.tokenManager.getToken(userId);
      return {
        success: true,
        data: tokenInfo
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check if user has valid token
   */
  async hasValidToken(userId: string): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const tokenInfo = await this.tokenManager.getToken(userId);
      if (!tokenInfo) {
        return {
          success: true,
          data: false
        };
      }

      // Check if token is expired
      if (tokenInfo.expiresAt && tokenInfo.expiresAt < new Date()) {
        return {
          success: true,
          data: false
        };
      }

      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Exchange authorization code with GitHub
   */
  private async exchangeCodeWithGitHub(code: string): Promise<GitHubOAuthResponse<{
    access_token: string;
    token_type: string;
    scope: string;
    expires_in?: number;
    refresh_token?: string;
  }>> {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: code,
          redirect_uri: this.config.redirectUri
        })
      });

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: `GitHub API error: ${response.status}`
        };
      }

      const data = await response.json();
      
      if (data.error) {
        return {
          success: false,
          data: null,
          error: `GitHub OAuth error: ${data.error_description || data.error}`
        };
      }

      return {
        success: true,
        data: {
          access_token: data.access_token,
          token_type: data.token_type,
          scope: data.scope,
          expires_in: data.expires_in,
          refresh_token: data.refresh_token
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Refresh token with GitHub
   */
  private async refreshTokenWithGitHub(refreshToken: string): Promise<GitHubOAuthResponse<{
    access_token: string;
    token_type: string;
    scope: string;
    expires_in?: number;
    refresh_token?: string;
  }>> {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: `GitHub API error: ${response.status}`
        };
      }

      const data = await response.json();
      
      if (data.error) {
        return {
          success: false,
          data: null,
          error: `GitHub OAuth error: ${data.error_description || data.error}`
        };
      }

      return {
        success: true,
        data: {
          access_token: data.access_token,
          token_type: data.token_type,
          scope: data.scope,
          expires_in: data.expires_in,
          refresh_token: data.refresh_token
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Revoke token with GitHub
   */
  private async revokeTokenWithGitHub(accessToken: string): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const response = await fetch('https://api.github.com/applications/revoke', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${accessToken}`
        },
        body: JSON.stringify({
          access_token: accessToken
        })
      });

      return {
        success: response.ok,
        data: response.ok,
        error: response.ok ? undefined : `GitHub API error: ${response.status}`
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get user information from GitHub
   */
  private async getUserInfo(accessToken: string): Promise<GitHubOAuthResponse<GitHubUserInfo>> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${accessToken}`
        }
      });

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: `GitHub API error: ${response.status}`
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: {
          id: data.id,
          login: data.login,
          name: data.name,
          email: data.email,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
          type: data.type
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate random state for OAuth
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}
