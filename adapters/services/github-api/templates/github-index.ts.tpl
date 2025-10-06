/**
 * GitHub API Client - Main Export
 * 
 * Central export point for all GitHub API functionality
 */

// Main client
export { GitHubClient, createGitHubClient, createGitHubClientFromEnv } from './client';

// Configuration
export { GitHubConfig } from './config';

// Service modules
export { GitHubRepository } from './repository';
export { GitHubFiles } from './files';
export { GitHubPullRequests } from './pull-requests';
export { GitHubSecrets } from './secrets';
export { GitHubWorkflows } from './workflows';

// Types
export type {
  GitHubResponse,
  GitHubClientOptions,
  RepositoryInfo,
  CreateRepositoryOptions,
  UpdateRepositoryOptions,
  FileContent,
  CreateFileOptions,
  UpdateFileOptions,
  DeleteFileOptions,
  PullRequestInfo,
  CreatePullRequestOptions,
  UpdatePullRequestOptions,
  SecretInfo,
  CreateSecretOptions,
  WorkflowInfo,
  CreateWorkflowOptions,
  CommitInfo,
  BranchInfo,
  IssueInfo
} from './types';

// Re-export Octokit for advanced usage
export { Octokit } from '@octokit/rest';
