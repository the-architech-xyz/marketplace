/**
 * GitHub API Adapter Blueprint
 * 
 * Provides GitHub API client functionality for repository management,
 * file operations, pull requests, and more.
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const githubApiBlueprint: Blueprint = {
  id: 'github-api-setup',
  name: 'GitHub API Client Setup',
  actions: [
    // Install Octokit dependency
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@octokit/rest', '@octokit/auth-app', '@octokit/plugin-retry']
    },
    
    // Create GitHub client configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/config.ts',
      template: 'templates/github-config.ts.tpl',
    },
    
    // Create main GitHub client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/client.ts',
      template: 'templates/github-client.ts.tpl',
    },
    
    // Create repository operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/repository.ts',
      template: 'templates/github-repository.ts.tpl',
    },
    
    // Create file operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/files.ts',
      template: 'templates/github-files.ts.tpl',
    },
    
    // Create pull request operations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/pull-requests.ts',
      template: 'templates/github-pull-requests.ts.tpl',
    },
    
    // Create secrets management
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/secrets.ts',
      template: 'templates/github-secrets.ts.tpl',
    },
    
    // Create workflow management
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/workflows.ts',
      template: 'templates/github-workflows.ts.tpl',
    },
    
    // Create types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/types.ts',
      template: 'templates/github-types.ts.tpl',
    },
    
    // Create main index file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}/github/index.ts',
      template: 'templates/github-index.ts.tpl',
    },
    
    // Add environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_TOKEN',
      value: '${context..token}',
      description: 'GitHub Personal Access Token or OAuth access token'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_API_URL',
      value: '${context..baseUrl}',
      description: 'GitHub API base URL'
    }
  ]
};

export default githubApiBlueprint;
