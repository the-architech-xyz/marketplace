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
  creates: [
    '{{paths.shared_library}}/github/config.ts',
    '{{paths.shared_library}}/github/client.ts',
    '{{paths.shared_library}}/github/repository.ts',
    '{{paths.shared_library}}/github/files.ts',
    '{{paths.shared_library}}/github/pull-requests.ts',
    '{{paths.shared_library}}/github/secrets.ts',
    '{{paths.shared_library}}/github/workflows.ts',
    '{{paths.shared_library}}/github/types.ts',
    '{{paths.shared_library}}/github/index.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['@octokit/rest', '@octokit/auth-app', '@octokit/plugin-retry'], isDev: false }
  ],
  envVars: [
    { key: 'GITHUB_TOKEN', value: '{{module.parameters.token}}', description: 'GitHub Personal Access Token or OAuth access token' },
    { key: 'GITHUB_API_URL', value: '{{module.parameters.baseUrl}}', description: 'GitHub API base URL' }
  ]
};

// Type-safe artifact access
export type ServicesGithubApiCreates = typeof ServicesGithubApiArtifacts.creates[number];
export type ServicesGithubApiEnhances = typeof ServicesGithubApiArtifacts.enhances[number];
