/**
 * Git Version Control
 * 
 * Local git repository management and operations
 */

export interface CoreGitParams {

  /** Git user name for commits */
  userName?: string;

  /** Git user email for commits */
  userEmail?: string;

  /** Default branch name for new repositories */
  defaultBranch?: string;

  /** Automatically initialize git repository after project creation */
  autoInit?: boolean;
}

export interface CoreGitFeatures {}

// 🚀 Auto-discovered artifacts
export declare const CoreGitArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type CoreGitCreates = typeof CoreGitArtifacts.creates[number];
export type CoreGitEnhances = typeof CoreGitArtifacts.enhances[number];
