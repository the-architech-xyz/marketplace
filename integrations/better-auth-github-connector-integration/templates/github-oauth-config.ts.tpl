/**
 * GitHub OAuth Configuration
 * 
 * Handles configuration for GitHub OAuth Application Authorization
 */

export interface GitHubOAuthConfigOptions {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes?: string[];
  baseUrl?: string;
}

export class GitHubOAuthConfig {
  public readonly clientId: string;
  public readonly clientSecret: string;
  public readonly redirectUri: string;
  public readonly scopes: string[];
  public readonly baseUrl: string;

  constructor(options: GitHubOAuthConfigOptions) {
    this.clientId = this.validateClientId(options.clientId);
    this.clientSecret = this.validateClientSecret(options.clientSecret);
    this.redirectUri = this.validateRedirectUri(options.redirectUri);
    this.scopes = options.scopes || ['repo', 'workflow', 'admin:org', 'user:email'];
    this.baseUrl = options.baseUrl || 'https://api.github.com';
  }

  /**
   * Validate client ID
   */
  private validateClientId(clientId: string): string {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('GitHub Client ID is required');
    }

    if (clientId.length < 10) {
      throw new Error('GitHub Client ID appears to be invalid');
    }

    return clientId;
  }

  /**
   * Validate client secret
   */
  private validateClientSecret(clientSecret: string): string {
    if (!clientSecret || typeof clientSecret !== 'string') {
      throw new Error('GitHub Client Secret is required');
    }

    if (clientSecret.length < 20) {
      throw new Error('GitHub Client Secret appears to be invalid');
    }

    return clientSecret;
  }

  /**
   * Validate redirect URI
   */
  private validateRedirectUri(redirectUri: string): string {
    if (!redirectUri || typeof redirectUri !== 'string') {
      throw new Error('Redirect URI is required');
    }

    try {
      const url = new URL(redirectUri);
      if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production') {
        throw new Error('Redirect URI must use HTTPS in production');
      }
    } catch (error) {
      throw new Error('Invalid redirect URI format');
    }

    return redirectUri;
  }

  /**
   * Get OAuth authorization URL parameters
   */
  getAuthUrlParams(): Record<string, string> {
    return {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scopes.join(' '),
      response_type: 'code'
    };
  }

  /**
   * Get token exchange parameters
   */
  getTokenExchangeParams(code: string): Record<string, string> {
    return {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.redirectUri
    };
  }

  /**
   * Validate configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      this.validateClientId(this.clientId);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid client ID');
    }

    try {
      this.validateClientSecret(this.clientSecret);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid client secret');
    }

    try {
      this.validateRedirectUri(this.redirectUri);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid redirect URI');
    }

    if (this.scopes.length === 0) {
      errors.push('At least one scope must be specified');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get configuration summary (without secrets)
   */
  getSummary(): Record<string, any> {
    return {
      clientId: this.clientId.substring(0, 8) + '...',
      redirectUri: this.redirectUri,
      scopes: this.scopes,
      baseUrl: this.baseUrl,
      hasClientSecret: !!this.clientSecret
    };
  }

  /**
   * Create from environment variables
   */
  static fromEnv(): GitHubOAuthConfig {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_REDIRECT_URI;
    const scopes = process.env.GITHUB_OAUTH_SCOPES?.split(',') || ['repo', 'workflow', 'admin:org', 'user:email'];

    if (!clientId) {
      throw new Error('GITHUB_CLIENT_ID environment variable is required');
    }

    if (!clientSecret) {
      throw new Error('GITHUB_CLIENT_SECRET environment variable is required');
    }

    if (!redirectUri) {
      throw new Error('GITHUB_REDIRECT_URI environment variable is required');
    }

    return new GitHubOAuthConfig({
      clientId,
      clientSecret,
      redirectUri,
      scopes
    });
  }
}
