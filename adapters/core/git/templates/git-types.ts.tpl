/**
 * Git Types
 * 
 * TypeScript type definitions for Git operations
 */

export interface GitResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  message?: string;
}

export interface GitClientOptions {
  userName?: string;
  userEmail?: string;
  defaultBranch?: string;
  autoInit?: boolean;
}

export interface RepositoryInfo {
  path: string;
  isRepository: boolean;
  currentBranch: string;
  remotes: RemoteInfo[];
  lastCommit: CommitInfo | null;
  config: Record<string, any>;
}

export interface CommitInfo {
  hash: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  parents: string[];
  tree: string;
  refs: string[];
}

export interface BranchInfo {
  name: string;
  commit: string;
  isCurrent: boolean;
  isRemote: boolean;
  remote?: string;
  ahead?: number;
  behind?: number;
}

export interface RemoteInfo {
  name: string;
  url: string;
  refs: {
    fetch: string;
    push: string;
  };
}

export interface StatusInfo {
  current: string;
  tracking: string | null;
  ahead: number;
  behind: number;
  staged: string[];
  not_added: string[];
  conflicted: string[];
  created: string[];
  deleted: string[];
  modified: string[];
  renamed: Array<{
    from: string;
    to: string;
  }>;
  files: Array<{
    path: string;
    index: string;
    working_dir: string;
  }>;
}

export interface CreateRepositoryOptions {
  bare?: boolean;
  shared?: boolean;
  initialBranch?: string;
}

export interface CommitOptions {
  message: string;
  author?: {
    name: string;
    email: string;
  };
  committer?: {
    name: string;
    email: string;
  };
  all?: boolean;
  files?: string[];
}

export interface CreateBranchOptions {
  checkout?: boolean;
  startPoint?: string;
  track?: string;
}

export interface AddRemoteOptions {
  url: string;
  fetch?: boolean;
  push?: boolean;
}

export interface PushOptions {
  remote?: string;
  branch?: string;
  setUpstream?: boolean;
  force?: boolean;
}

export interface PullOptions {
  remote?: string;
  branch?: string;
  rebase?: boolean;
  ffOnly?: boolean;
}

export interface MergeOptions {
  branch: string;
  noFf?: boolean;
  squash?: boolean;
  message?: string;
}

export interface TagInfo {
  name: string;
  commit: string;
  message?: string;
  isAnnotated: boolean;
  author?: {
    name: string;
    email: string;
    date: Date;
  };
}

export interface CreateTagOptions {
  message?: string;
  annotated?: boolean;
  force?: boolean;
}

export interface LogOptions {
  from?: string;
  to?: string;
  maxCount?: number;
  since?: string;
  until?: string;
  author?: string;
  committer?: string;
  grep?: string;
  all?: boolean;
  branches?: boolean;
  tags?: boolean;
  remotes?: boolean;
  firstParent?: boolean;
  merge?: boolean;
  noMerges?: boolean;
  reverse?: boolean;
  oneline?: boolean;
  graph?: boolean;
  decorate?: boolean;
  stat?: boolean;
  shortstat?: boolean;
  numstat?: boolean;
  summary?: boolean;
  patch?: boolean;
  nameOnly?: boolean;
  nameStatus?: boolean;
  raw?: boolean;
  format?: string;
}

export interface DiffOptions {
  cached?: boolean;
  staged?: boolean;
  working?: boolean;
  from?: string;
  to?: string;
  paths?: string[];
  nameOnly?: boolean;
  nameStatus?: boolean;
  stat?: boolean;
  shortstat?: boolean;
  numstat?: boolean;
  summary?: boolean;
  patch?: boolean;
  raw?: boolean;
  format?: string;
}

export interface StashInfo {
  index: number;
  name: string;
  message: string;
  commit: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
}

export interface StashOptions {
  message?: string;
  includeUntracked?: boolean;
  keepIndex?: boolean;
  patch?: boolean;
}

export interface ResetOptions {
  mode?: 'soft' | 'mixed' | 'hard' | 'merge' | 'keep';
  commit?: string;
  paths?: string[];
}

export interface CheckoutOptions {
  branch?: string;
  paths?: string[];
  create?: boolean;
  startPoint?: string;
  track?: string;
  force?: boolean;
  detach?: boolean;
}
