/**
 * GitHub API
 * 
 * GitHub API client for repository management and operations
 */

export interface ServicesGithubApiParams {

  /** GitHub Personal Access Token or OAuth access token */
  token: any;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: any;

  /** User agent string for API requests */
  userAgent?: any;
}

export interface ServicesGithubApiFeatures {}

// 🚀 Auto-discovered artifacts
export declare const ServicesGithubApiArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ServicesGithubApiCreates = typeof ServicesGithubApiArtifacts.creates[number];
export type ServicesGithubApiEnhances = typeof ServicesGithubApiArtifacts.enhances[number];
