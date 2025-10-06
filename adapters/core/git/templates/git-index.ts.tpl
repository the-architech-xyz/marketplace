/**
 * Git Client - Main Export
 * 
 * Central export point for all Git functionality
 */

// Main client
export { GitClient, createGitClient, createGitClientFromEnv } from './client';

// Configuration
export { GitConfig } from './config';

// Service modules
export { GitRepository } from './repository';
export { GitCommits } from './commits';
export { GitBranches } from './branches';
export { GitRemotes } from './remotes';

// Types
export type {
  GitResponse,
  GitClientOptions,
  RepositoryInfo,
  CommitInfo,
  CommitOptions,
  BranchInfo,
  CreateBranchOptions,
  RemoteInfo,
  AddRemoteOptions,
  PushOptions,
  PullOptions,
  MergeOptions,
  StatusInfo,
  CreateRepositoryOptions,
  TagInfo,
  CreateTagOptions,
  LogOptions,
  DiffOptions,
  StashInfo,
  StashOptions,
  ResetOptions,
  CheckoutOptions
} from './types';

// Re-export simple-git for advanced usage
export { simpleGit } from 'simple-git';
