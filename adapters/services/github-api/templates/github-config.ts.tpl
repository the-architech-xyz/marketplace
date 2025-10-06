/**
 * GitHub API Configuration
 * 
 * Handles configuration and validation for GitHub API client
 */

export interface GitHubClientOptions {
  baseUrl?: string;
  userAgent?: string;
  timeout?: number;
  retries?: number;
}

export class GitHubConfig {
  public readonly authToken: string;
  public readonly baseUrl: string;
  public readonly userAgent: string;
  public readonly timeout: number;
  public readonly retries: number;

  constructor(authToken: string, options: GitHubClientOptions = {}) {
    this.authToken = this.validateToken(authToken);
    this.baseUrl = options.baseUrl || 'https://api.github.com';
    this.userAgent = options.userAgent || 'the-architech-cli';
    this.timeout = options.timeout || 30000; // 30 seconds
    this.retries = options.retries || 3;
  }

  /**
   * Validate GitHub token format
   */
  private validateToken(token: string): string {
    if (!token || typeof token !== 'string') {
      throw new Error('GitHub token is required and must be a string');
    }

    // Basic token format validation
    if (token.startsWith('ghp_') || token.startsWith('gho_') || token.startsWith('ghu_') || token.startsWith('ghs_') || token.startsWith('ghr_')) {
      // Personal Access Token format
      return token;
    }

    if (token.startsWith('ghp_') || token.length >= 40) {
      // OAuth token or other valid format
      return token;
    }

    throw new Error('Invalid GitHub token format. Expected Personal Access Token or OAuth token');
  }

  /**
   * Get headers for API requests
   */
  getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.authToken}`,
      'User-Agent': this.userAgent,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  /**
   * Validate configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.authToken) {
      errors.push('Auth token is required');
    }

    if (!this.baseUrl || !this.isValidUrl(this.baseUrl)) {
      errors.push('Base URL must be a valid URL');
    }

    if (!this.userAgent || this.userAgent.length < 3) {
      errors.push('User agent must be at least 3 characters long');
    }

    if (this.timeout < 1000 || this.timeout > 300000) {
      errors.push('Timeout must be between 1 and 300 seconds');
    }

    if (this.retries < 0 || this.retries > 10) {
      errors.push('Retries must be between 0 and 10');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if URL is valid
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get configuration summary
   */
  getSummary(): Record<string, any> {
    return {
      baseUrl: this.baseUrl,
      userAgent: this.userAgent,
      timeout: this.timeout,
      retries: this.retries,
      hasToken: !!this.authToken,
      tokenPrefix: this.authToken ? this.authToken.substring(0, 4) + '...' : 'none'
    };
  }
}
