/**
 * GitHub API Types
 * 
 * TypeScript type definitions for GitHub API operations
 */

export interface GitHubResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  message?: string;
}

export interface GitHubClientOptions {
  baseUrl?: string;
  userAgent?: string;
  timeout?: number;
  retries?: number;
}

export interface RepositoryInfo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  private: boolean;
  htmlUrl: string;
  cloneUrl: string;
  sshUrl: string;
  gitUrl: string;
  defaultBranch: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date | null;
  language: string | null;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
  hasIssues: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  hasDownloads: boolean;
  isTemplate: boolean;
  allowSquashMerge: boolean;
  allowMergeCommit: boolean;
  allowRebaseMerge: boolean;
  deleteBranchOnMerge: boolean;
  topics: string[];
  archived: boolean;
  disabled: boolean;
}

export interface CreateRepositoryOptions {
  name: string;
  description?: string;
  private?: boolean;
  autoInit?: boolean;
  gitignoreTemplate?: string;
  licenseTemplate?: string;
  allowSquashMerge?: boolean;
  allowMergeCommit?: boolean;
  allowRebaseMerge?: boolean;
  deleteBranchOnMerge?: boolean;
  hasIssues?: boolean;
  hasProjects?: boolean;
  hasWiki?: boolean;
  hasDownloads?: boolean;
  isTemplate?: boolean;
}

export interface UpdateRepositoryOptions {
  name?: string;
  description?: string;
  private?: boolean;
  allowSquashMerge?: boolean;
  allowMergeCommit?: boolean;
  allowRebaseMerge?: boolean;
  deleteBranchOnMerge?: boolean;
  hasIssues?: boolean;
  hasProjects?: boolean;
  hasWiki?: boolean;
  hasDownloads?: boolean;
  isTemplate?: boolean;
}

export interface FileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  htmlUrl: string;
  gitUrl: string;
  downloadUrl: string | null;
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  content?: string;
  encoding?: 'base64' | 'utf-8';
  target?: string; // for symlinks
  submoduleGitUrl?: string; // for submodules
}

export interface CreateFileOptions {
  path: string;
  content: string;
  message: string;
  branch?: string;
  committer?: {
    name: string;
    email: string;
  };
  author?: {
    name: string;
    email: string;
  };
}

export interface UpdateFileOptions extends CreateFileOptions {
  sha: string; // Required for updates
}

export interface DeleteFileOptions {
  path: string;
  message: string;
  branch?: string;
  sha: string;
  committer?: {
    name: string;
    email: string;
  };
  author?: {
    name: string;
    email: string;
  };
}

export interface PullRequestInfo {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  locked: boolean;
  user: {
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };
  head: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      name: string;
      fullName: string;
      private: boolean;
    };
  };
  base: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      name: string;
      fullName: string;
      private: boolean;
    };
  };
  htmlUrl: string;
  diffUrl: string;
  patchUrl: string;
  issueUrl: string;
  commitsUrl: string;
  reviewCommentsUrl: string;
  reviewCommentUrl: string;
  commentsUrl: string;
  statusesUrl: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
  mergedAt: Date | null;
  mergeCommitSha: string | null;
  assignees: Array<{
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  }>;
  requestedReviewers: Array<{
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  }>;
  labels: Array<{
    id: number;
    name: string;
    color: string;
    description: string | null;
  }>;
  milestone: {
    id: number;
    title: string;
    description: string | null;
    state: 'open' | 'closed';
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date | null;
    dueOn: Date | null;
  } | null;
  draft: boolean;
  merged: boolean;
  mergeable: boolean | null;
  rebaseable: boolean | null;
  mergeableState: 'clean' | 'dirty' | 'unstable' | 'blocked';
  comments: number;
  reviewComments: number;
  maintainerCanModify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changedFiles: number;
}

export interface CreatePullRequestOptions {
  title: string;
  head: string;
  base: string;
  body?: string;
  maintainerCanModify?: boolean;
  draft?: boolean;
}

export interface UpdatePullRequestOptions {
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
  base?: string;
  maintainerCanModify?: boolean;
}

export interface SecretInfo {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: 'all' | 'private' | 'selected';
  selectedRepositories?: Array<{
    id: number;
    name: string;
    fullName: string;
  }>;
}

export interface CreateSecretOptions {
  name: string;
  value: string;
  visibility?: 'all' | 'private' | 'selected';
  selectedRepositoryIds?: number[];
}

export interface WorkflowInfo {
  id: number;
  name: string;
  path: string;
  state: 'active' | 'deleted' | 'disabled_fork' | 'disabled_inactivity' | 'disabled_manually';
  createdAt: Date;
  updatedAt: Date;
  url: string;
  htmlUrl: string;
  badgeUrl: string;
}

export interface CreateWorkflowOptions {
  name: string;
  content: string;
  branch?: string;
  message?: string;
}

export interface CommitInfo {
  sha: string;
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
  htmlUrl: string;
  parents: Array<{
    sha: string;
    url: string;
    htmlUrl: string;
  }>;
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
  files: Array<{
    sha: string;
    filename: string;
    status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
    additions: number;
    deletions: number;
    changes: number;
    blobUrl: string;
    rawUrl: string;
    contentsUrl: string;
    patch?: string;
  }>;
}

export interface BranchInfo {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  protection?: {
    enabled: boolean;
    requiredStatusChecks: {
      enforcement_level: 'off' | 'non_admins' | 'everyone';
      contexts: string[];
    };
    enforceAdmins: {
      enabled: boolean;
      url: string;
    };
    requiredPullRequestReviews: {
      dismissal_restrictions: {
        users: Array<{ login: string; id: number; }>;
        teams: Array<{ name: string; id: number; }>;
      };
      dismiss_stale_reviews: boolean;
      require_code_owner_reviews: boolean;
      required_approving_review_count: number;
    };
    restrictions: {
      users: Array<{ login: string; id: number; }>;
      teams: Array<{ name: string; id: number; }>;
      apps: Array<{ name: string; id: number; }>;
    };
  };
}

export interface IssueInfo {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  locked: boolean;
  user: {
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
    description: string | null;
  }>;
  assignees: Array<{
    id: number;
    login: string;
    avatarUrl: string;
    htmlUrl: string;
  }>;
  milestone: {
    id: number;
    title: string;
    description: string | null;
    state: 'open' | 'closed';
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date | null;
    dueOn: Date | null;
  } | null;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
  htmlUrl: string;
  pullRequest?: {
    url: string;
    htmlUrl: string;
    diffUrl: string;
    patchUrl: string;
  };
}
