/**
 * GitHub Token Manager
 * 
 * Handles secure storage and management of GitHub OAuth tokens
 */

import { GitHubTokenInfo, OAuthState } from './github-oauth-types';

export interface TokenStorage {
  storeToken(userId: string, token: GitHubTokenInfo): Promise<void>;
  getToken(userId: string): Promise<GitHubTokenInfo | null>;
  removeToken(userId: string): Promise<void>;
  storeOAuthState(userId: string, state: string): Promise<void>;
  getOAuthState(userId: string, state: string): Promise<OAuthState | null>;
  removeOAuthState(userId: string, state: string): Promise<void>;
}

export class GitHubTokenManager {
  private storage: TokenStorage;
  private encryptionKey: string;

  constructor(storage: TokenStorage, encryptionKey: string) {
    this.storage = storage;
    this.encryptionKey = encryptionKey;
  }

  /**
   * Store OAuth token securely
   */
  async storeToken(userId: string, token: GitHubTokenInfo): Promise<void> {
    try {
      // Encrypt sensitive data
      const encryptedToken = this.encryptToken(token);
      await this.storage.storeToken(userId, encryptedToken);
    } catch (error) {
      throw new Error(`Failed to store token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get OAuth token for user
   */
  async getToken(userId: string): Promise<GitHubTokenInfo | null> {
    try {
      const encryptedToken = await this.storage.getToken(userId);
      if (!encryptedToken) {
        return null;
      }

      // Decrypt token
      return this.decryptToken(encryptedToken);
    } catch (error) {
      throw new Error(`Failed to get token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Remove OAuth token for user
   */
  async removeToken(userId: string): Promise<void> {
    try {
      await this.storage.removeToken(userId);
    } catch (error) {
      throw new Error(`Failed to remove token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Store OAuth state for validation
   */
  async storeOAuthState(userId: string, state: string): Promise<void> {
    try {
      const oauthState: OAuthState = {
        state,
        userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      };

      await this.storage.storeOAuthState(userId, state);
    } catch (error) {
      throw new Error(`Failed to store OAuth state: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate OAuth state
   */
  async validateOAuthState(userId: string, state: string): Promise<boolean> {
    try {
      const oauthState = await this.storage.getOAuthState(userId, state);
      if (!oauthState) {
        return false;
      }

      // Check if state has expired
      if (oauthState.expiresAt < new Date()) {
        await this.storage.removeOAuthState(userId, state);
        return false;
      }

      // Remove used state
      await this.storage.removeOAuthState(userId, state);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: GitHubTokenInfo): boolean {
    if (!token.expiresAt) {
      return false; // No expiry set
    }
    return token.expiresAt < new Date();
  }

  /**
   * Check if token needs refresh
   */
  needsRefresh(token: GitHubTokenInfo, thresholdSeconds: number = 300): boolean {
    if (!token.expiresAt) {
      return false; // No expiry set
    }
    
    const threshold = new Date(Date.now() + thresholdSeconds * 1000);
    return token.expiresAt < threshold;
  }

  /**
   * Encrypt token data
   */
  private encryptToken(token: GitHubTokenInfo): GitHubTokenInfo {
    // In a real implementation, you would use proper encryption
    // For now, we'll just return the token as-is
    // TODO: Implement proper encryption using the encryption key
    return {
      ...token,
      accessToken: this.encryptString(token.accessToken),
      refreshToken: token.refreshToken ? this.encryptString(token.refreshToken) : null
    };
  }

  /**
   * Decrypt token data
   */
  private decryptToken(encryptedToken: GitHubTokenInfo): GitHubTokenInfo {
    // In a real implementation, you would use proper decryption
    // For now, we'll just return the token as-is
    // TODO: Implement proper decryption using the encryption key
    return {
      ...encryptedToken,
      accessToken: this.decryptString(encryptedToken.accessToken),
      refreshToken: encryptedToken.refreshToken ? this.decryptString(encryptedToken.refreshToken) : null
    };
  }

  /**
   * Simple string encryption (placeholder)
   */
  private encryptString(str: string): string {
    // TODO: Implement proper encryption
    return Buffer.from(str).toString('base64');
  }

  /**
   * Simple string decryption (placeholder)
   */
  private decryptString(encryptedStr: string): string {
    // TODO: Implement proper decryption
    return Buffer.from(encryptedStr, 'base64').toString('utf-8');
  }
}

/**
 * In-memory token storage implementation
 * In production, use a proper database
 */
export class InMemoryTokenStorage implements TokenStorage {
  private tokens: Map<string, GitHubTokenInfo> = new Map();
  private oauthStates: Map<string, OAuthState> = new Map();

  async storeToken(userId: string, token: GitHubTokenInfo): Promise<void> {
    this.tokens.set(userId, token);
  }

  async getToken(userId: string): Promise<GitHubTokenInfo | null> {
    return this.tokens.get(userId) || null;
  }

  async removeToken(userId: string): Promise<void> {
    this.tokens.delete(userId);
  }

  async storeOAuthState(userId: string, state: string): Promise<void> {
    const oauthState: OAuthState = {
      state,
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    };
    this.oauthStates.set(`${userId}:${state}`, oauthState);
  }

  async getOAuthState(userId: string, state: string): Promise<OAuthState | null> {
    return this.oauthStates.get(`${userId}:${state}`) || null;
  }

  async removeOAuthState(userId: string, state: string): Promise<void> {
    this.oauthStates.delete(`${userId}:${state}`);
  }
}

/**
 * Database token storage implementation
 * This would be used in production with a real database
 */
export class DatabaseTokenStorage implements TokenStorage {
  constructor(private db: any) {} // Database connection

  async storeToken(userId: string, token: GitHubTokenInfo): Promise<void> {
    // TODO: Implement database storage
    throw new Error('Database storage not implemented');
  }

  async getToken(userId: string): Promise<GitHubTokenInfo | null> {
    // TODO: Implement database retrieval
    throw new Error('Database storage not implemented');
  }

  async removeToken(userId: string): Promise<void> {
    // TODO: Implement database removal
    throw new Error('Database storage not implemented');
  }

  async storeOAuthState(userId: string, state: string): Promise<void> {
    // TODO: Implement database storage
    throw new Error('Database storage not implemented');
  }

  async getOAuthState(userId: string, state: string): Promise<OAuthState | null> {
    // TODO: Implement database retrieval
    throw new Error('Database storage not implemented');
  }

  async removeOAuthState(userId: string, state: string): Promise<void> {
    // TODO: Implement database removal
    throw new Error('Database storage not implemented');
  }
}
