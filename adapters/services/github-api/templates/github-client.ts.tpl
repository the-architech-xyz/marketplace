/**
 * GitHub API Client
 * 
 * Main client class for interacting with GitHub API using Octokit
 * Handles authentication, rate limiting, and error handling
 */

import { Octokit } from '@octokit/rest';
import { retry } from '@octokit/plugin-retry';
import { GitHubConfig } from './config';
import { GitHubRepository } from './repository';
import { GitHubFiles } from './files';
import { GitHubPullRequests } from './pull-requests';
import { GitHubSecrets } from './secrets';
import { GitHubWorkflows } from './workflows';
import { 
  GitHubClientOptions, 
  GitHubResponse, 
  RepositoryInfo, 
  FileContent, 
  PullRequestInfo,
  WorkflowInfo,
  SecretInfo
} from './types';

/**
 * Main GitHub API Client
 * 
 * Provides a high-level interface for GitHub API operations
 * with built-in error handling, rate limiting, and retry logic
 */
export class GitHubClient {
  private octokit: Octokit;
  private config: GitHubConfig;
  
  // Service modules
  public repositories: GitHubRepository;
  public files: GitHubFiles;
  public pullRequests: GitHubPullRequests;
  public secrets: GitHubSecrets;
  public workflows: GitHubWorkflows;

  constructor(authToken: string, options: GitHubClientOptions = {}) {
    this.config = new GitHubConfig(authToken, options);
    
    // Initialize Octokit with retry plugin
    this.octokit = new Octokit({
      auth: authToken,
      baseUrl: this.config.baseUrl,
      userAgent: this.config.userAgent,
      plugins: [retry],
      retry: {
        doRetry: (error, retryCount) => {
          // Retry on rate limit and server errors
          return error.status >= 500 || error.status === 403;
        },
        retryAfter: (error) => {
          // Use Retry-After header if available
          return error.headers?.['retry-after'] ? 
            parseInt(error.headers['retry-after']) * 1000 : 1000;
        }
      }
    });

    // Initialize service modules
    this.repositories = new GitHubRepository(this.octokit);
    this.files = new GitHubFiles(this.octokit);
    this.pullRequests = new GitHubPullRequests(this.octokit);
    this.secrets = new GitHubSecrets(this.octokit);
    this.workflows = new GitHubWorkflows(this.octokit);
  }

  /**
   * Test the connection to GitHub API
   */
  async testConnection(): Promise<GitHubResponse<boolean>> {
    try {
      const { data } = await this.octokit.rest.users.getAuthenticated();
      return {
        success: true,
        data: true,
        message: `Connected as ${data.login}`
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
   * Get current user information
   */
  async getCurrentUser(): Promise<GitHubResponse<any>> {
    try {
      const { data } = await this.octokit.rest.users.getAuthenticated();
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
   * Get rate limit information
   */
  async getRateLimit(): Promise<GitHubResponse<any>> {
    try {
      const { data } = await this.octokit.rest.rateLimit.get();
      return {
        success: true,
        data: {
          limit: data.rate.limit,
          remaining: data.rate.remaining,
          reset: new Date(data.rate.reset * 1000),
          used: data.rate.used
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
   * Check if the client has sufficient permissions for an operation
   */
  async checkPermissions(requiredScopes: string[]): Promise<GitHubResponse<boolean>> {
    try {
      const { data } = await this.octokit.rest.apps.getAuthenticated();
      const tokenScopes = data.permissions || {};
      
      const hasPermissions = requiredScopes.every(scope => {
        const [resource, action] = scope.split(':');
        return tokenScopes[resource] === 'write' || tokenScopes[resource] === 'admin';
      });

      return {
        success: true,
        data: hasPermissions,
        message: hasPermissions ? 'Sufficient permissions' : 'Insufficient permissions'
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
   * Get the underlying Octokit instance for advanced operations
   */
  getOctokit(): Octokit {
    return this.octokit;
  }

  /**
   * Get client configuration
   */
  getConfig(): GitHubConfig {
    return this.config;
  }
}

/**
 * Factory function to create a GitHub client
 */
export function createGitHubClient(authToken: string, options?: GitHubClientOptions): GitHubClient {
  return new GitHubClient(authToken, options);
}

/**
 * Create GitHub client from environment variables
 */
export function createGitHubClientFromEnv(): GitHubClient {
  const token = process.env.GITHUB_TOKEN;
  const baseUrl = process.env.GITHUB_API_URL;
  
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  return new GitHubClient(token, {
    baseUrl: baseUrl || 'https://api.github.com',
    userAgent: 'the-architech-cli'
  });
}
