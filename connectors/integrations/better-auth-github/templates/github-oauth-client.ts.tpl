/**
 * GitHub OAuth Client
 * 
 * High-level client for GitHub operations with OAuth authentication
 */

import { GitHubClient } from '@/lib/github/client';
import { GitHubOAuthService } from './github-oauth-service';
import { GitHubTokenManager } from './github-token-manager';
import { 
  GitHubOAuthClientOptions, 
  GitHubRepositoryAccess,
  GitHubOAuthResponse 
} from './github-oauth-types';

export class GitHubOAuthClient {
  private oauthService: GitHubOAuthService;
  private tokenManager: GitHubTokenManager;
  private userId: string;
  private autoRefresh: boolean;
  private refreshThreshold: number;

  constructor(
    oauthService: GitHubOAuthService,
    tokenManager: GitHubTokenManager,
    options: GitHubOAuthClientOptions
  ) {
    this.oauthService = oauthService;
    this.tokenManager = tokenManager;
    this.userId = options.userId;
    this.autoRefresh = options.autoRefresh ?? true;
    this.refreshThreshold = options.refreshThreshold ?? 300; // 5 minutes
  }

  /**
   * Get current token
   */
  async getToken(): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.tokenManager.getToken(this.userId);
      return {
        success: true,
        data: token
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
   * Refresh token if needed
   */
  async refreshToken(): Promise<GitHubOAuthResponse<any>> {
    try {
      const refreshResult = await this.oauthService.refreshToken(this.userId);
      return refreshResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Revoke token
   */
  async revokeToken(): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const revokeResult = await this.oauthService.revokeToken(this.userId);
      return revokeResult;
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check if user has valid token
   */
  async hasValidToken(): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const hasValidResult = await this.oauthService.hasValidToken(this.userId);
      return hasValidResult;
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get user's repositories
   */
  async getRepositories(): Promise<GitHubOAuthResponse<GitHubRepositoryAccess[]>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: [],
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const reposResult = await githubClient.repositories.listRepositories();

      if (!reposResult.success) {
        return {
          success: false,
          data: [],
          error: reposResult.error || 'Failed to fetch repositories'
        };
      }

      const repositories: GitHubRepositoryAccess[] = reposResult.data!.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.fullName,
        private: repo.private,
        htmlUrl: repo.htmlUrl,
        cloneUrl: repo.cloneUrl,
        sshUrl: repo.sshUrl,
        defaultBranch: repo.defaultBranch,
        permissions: {
          admin: true, // Assuming admin access for now
          push: true,
          pull: true
        }
      }));

      return {
        success: true,
        data: repositories
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create repository
   */
  async createRepository(options: {
    name: string;
    description?: string;
    private?: boolean;
  }): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: null,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const createResult = await githubClient.repositories.createRepository(options);

      return createResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update repository
   */
  async updateRepository(
    owner: string, 
    repo: string, 
    options: any
  ): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: null,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const updateResult = await githubClient.repositories.updateRepository(owner, repo, options);

      return updateResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Delete repository
   */
  async deleteRepository(
    owner: string, 
    repo: string
  ): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: false,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const deleteResult = await githubClient.repositories.deleteRepository(owner, repo);

      return deleteResult;
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create pull request
   */
  async createPullRequest(
    owner: string, 
    repo: string, 
    options: any
  ): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: null,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const prResult = await githubClient.pullRequests.createPullRequest(owner, repo, options);

      return prResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create file
   */
  async createFile(
    owner: string, 
    repo: string, 
    options: any
  ): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: null,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const fileResult = await githubClient.files.createFile(owner, repo, options);

      return fileResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Update file
   */
  async updateFile(
    owner: string, 
    repo: string, 
    options: any
  ): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: null,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const fileResult = await githubClient.files.updateFile(owner, repo, options);

      return fileResult;
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Delete file
   */
  async deleteFile(
    owner: string, 
    repo: string, 
    options: any
  ): Promise<GitHubOAuthResponse<boolean>> {
    try {
      const token = await this.getValidToken();
      if (!token.success) {
        return {
          success: false,
          data: false,
          error: 'No valid token available'
        };
      }

      const githubClient = new GitHubClient(token.data!.accessToken);
      const fileResult = await githubClient.files.deleteFile(owner, repo, options);

      return fileResult;
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get valid token, refreshing if necessary
   */
  private async getValidToken(): Promise<GitHubOAuthResponse<any>> {
    try {
      const token = await this.tokenManager.getToken(this.userId);
      if (!token) {
        return {
          success: false,
          data: null,
          error: 'No token found'
        };
      }

      // Check if token needs refresh
      if (this.autoRefresh && this.tokenManager.needsRefresh(token, this.refreshThreshold)) {
        const refreshResult = await this.oauthService.refreshToken(this.userId);
        if (refreshResult.success) {
          return {
            success: true,
            data: await this.tokenManager.getToken(this.userId)
          };
        }
      }

      // Check if token is expired
      if (this.tokenManager.isTokenExpired(token)) {
        return {
          success: false,
          data: null,
          error: 'Token expired'
        };
      }

      return {
        success: true,
        data: token
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
