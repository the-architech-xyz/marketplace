/**
 * Git Configuration
 * 
 * Handles configuration and validation for Git client
 */

export interface GitClientOptions {
  userName?: string;
  userEmail?: string;
  defaultBranch?: string;
  autoInit?: boolean;
}

export class GitConfig {
  public readonly userName: string;
  public readonly userEmail: string;
  public readonly defaultBranch: string;
  public readonly autoInit: boolean;

  constructor(options: GitClientOptions = {}) {
    this.userName = options.userName || 'The Architech';
    this.userEmail = options.userEmail || 'architech@example.com';
    this.defaultBranch = options.defaultBranch || 'main';
    this.autoInit = options.autoInit ?? true;
  }

  /**
   * Get git configuration object for simple-git
   */
  getGitConfig(): Record<string, string> {
    return {
      'user.name': this.userName,
      'user.email': this.userEmail,
      'init.defaultBranch': this.defaultBranch
    };
  }

  /**
   * Validate configuration
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.userName || this.userName.trim().length === 0) {
      errors.push('User name is required');
    }

    if (!this.userEmail || this.userEmail.trim().length === 0) {
      errors.push('User email is required');
    }

    if (!this.isValidEmail(this.userEmail)) {
      errors.push('User email must be a valid email address');
    }

    if (!this.defaultBranch || this.defaultBranch.trim().length === 0) {
      errors.push('Default branch is required');
    }

    if (!this.isValidBranchName(this.defaultBranch)) {
      errors.push('Default branch name contains invalid characters');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if branch name is valid
   */
  private isValidBranchName(branch: string): boolean {
    // Git branch naming rules: no spaces, no special characters except - and _
    const branchRegex = /^[a-zA-Z0-9._-]+$/;
    return branchRegex.test(branch);
  }

  /**
   * Get configuration summary
   */
  getSummary(): Record<string, any> {
    return {
      userName: this.userName,
      userEmail: this.userEmail,
      defaultBranch: this.defaultBranch,
      autoInit: this.autoInit
    };
  }
}
