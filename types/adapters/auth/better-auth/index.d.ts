/**
     * Generated TypeScript definitions for Better Auth
     * Generated from: adapters/auth/better-auth/adapter.json
     */

/**
     * Parameters for the Better Auth adapter
     */
export interface Better_authAuthParams {
  /**
   * Authentication providers to enable
   */
  providers?: Array<any>;
  /**
   * Session management strategy
   */
  session?: any;
  /**
   * Enable CSRF protection
   */
  csrf?: boolean;
  /**
   * Enable rate limiting
   */
  rateLimit?: boolean;
}

/**
     * Features for the Better Auth adapter
     */
export interface Better_authAuthFeatures {
  /**
   * Google, GitHub, Discord, Twitter authentication
   */
  'oauth-providers'?: boolean;
  /**
   * JWT, database sessions, session security
   */
  'session-management'?: boolean;
  /**
   * Email verification system with templates
   */
  'email-verification'?: boolean;
  /**
   * Secure password reset flow
   */
  'password-reset'?: boolean;
  /**
   * 2FA/TOTP support
   */
  'multi-factor'?: boolean;
  /**
   * User management admin interface
   */
  'admin-panel'?: boolean;
}
