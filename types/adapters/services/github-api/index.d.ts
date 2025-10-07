/**
 * GitHub API
 * 
 * GitHub API client for repository management and operations
 */

export interface ServicesGithubApiParams {

  /** GitHub Personal Access Token or OAuth access token */
  token: string;

  /** GitHub API base URL (for GitHub Enterprise) */
  baseUrl?: string;

  /** User agent string for API requests */
  userAgent?: string;
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
