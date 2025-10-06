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
  creates: [
    '{{paths.shared_library}}/git/config.ts',
    '{{paths.shared_library}}/git/client.ts',
    '{{paths.shared_library}}/git/repository.ts',
    '{{paths.shared_library}}/git/commits.ts',
    '{{paths.shared_library}}/git/branches.ts',
    '{{paths.shared_library}}/git/remotes.ts',
    '{{paths.shared_library}}/git/types.ts',
    '{{paths.shared_library}}/git/index.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['simple-git'], isDev: false }
  ],
  envVars: [
    { key: 'GIT_USER_NAME', value: '{{module.parameters.userName}}', description: 'Git user name for commits' },
    { key: 'GIT_USER_EMAIL', value: '{{module.parameters.userEmail}}', description: 'Git user email for commits' },
    { key: 'GIT_DEFAULT_BRANCH', value: '{{module.parameters.defaultBranch}}', description: 'Default branch name for new repositories' }
  ]
};

// Type-safe artifact access
export type CoreGitCreates = typeof CoreGitArtifacts.creates[number];
export type CoreGitEnhances = typeof CoreGitArtifacts.enhances[number];
