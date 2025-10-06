/**
 * Git Client
 * 
 * Main client class for local git operations using simple-git
 * Handles repository initialization, commits, branches, and remotes
 */

import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import { GitConfig } from './config';
import { GitRepository } from './repository';
import { GitCommits } from './commits';
import { GitBranches } from './branches';
import { GitRemotes } from './remotes';
import { 
  GitClientOptions, 
  GitResponse, 
  RepositoryInfo, 
  CommitInfo,
  BranchInfo,
  RemoteInfo,
  StatusInfo
} from './types';

/**
 * Main Git Client
 * 
 * Provides a high-level interface for local git operations
 * with built-in error handling and configuration management
 */
export class GitClient {
  private git: SimpleGit;
  private config: GitConfig;
  private repositoryPath: string;
  
  // Service modules
  public repository: GitRepository;
  public commits: GitCommits;
  public branches: GitBranches;
  public remotes: GitRemotes;

  constructor(repositoryPath: string, options: GitClientOptions = {}) {
    this.repositoryPath = repositoryPath;
    this.config = new GitConfig(options);
    
    // Initialize simple-git with configuration
    const gitOptions: SimpleGitOptions = {
      baseDir: repositoryPath,
      binary: 'git',
      maxConcurrentProcesses: 1,
      config: this.config.getGitConfig()
    };
    
    this.git = simpleGit(gitOptions);

    // Initialize service modules
    this.repository = new GitRepository(this.git, this.config);
    this.commits = new GitCommits(this.git, this.config);
    this.branches = new GitBranches(this.git, this.config);
    this.remotes = new GitRemotes(this.git, this.config);
  }

  /**
   * Test the git installation and repository access
   */
  async testConnection(): Promise<GitResponse<boolean>> {
    try {
      const version = await this.git.version();
      return {
        success: true,
        data: true,
        message: `Git version ${version} detected`
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get repository status
   */
  async getStatus(): Promise<GitResponse<StatusInfo>> {
    try {
      const status = await this.git.status();
      
      return {
        success: true,
        data: {
          current: status.current,
          tracking: status.tracking,
          ahead: status.ahead,
          behind: status.behind,
          staged: status.staged,
          not_added: status.not_added,
          conflicted: status.conflicted,
          created: status.created,
          deleted: status.deleted,
          modified: status.modified,
          renamed: status.renamed,
          files: status.files.map(file => ({
            path: file.path,
            index: file.index,
            working_dir: file.working_dir
          }))
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check if repository is clean (no uncommitted changes)
   */
  async isClean(): Promise<GitResponse<boolean>> {
    try {
      const status = await this.git.status();
      const isClean = status.files.length === 0;
      
      return {
        success: true,
        data: isClean,
        message: isClean ? 'Repository is clean' : 'Repository has uncommitted changes'
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get current branch name
   */
  async getCurrentBranch(): Promise<GitResponse<string>> {
    try {
      const branch = await this.git.revparse(['--abbrev-ref', 'HEAD']);
      
      return {
        success: true,
        data: branch.trim()
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get repository information
   */
  async getRepositoryInfo(): Promise<GitResponse<RepositoryInfo>> {
    try {
      const [isRepo, currentBranch, remotes, lastCommit] = await Promise.all([
        this.repository.isRepository(),
        this.getCurrentBranch(),
        this.remotes.listRemotes(),
        this.commits.getLastCommit()
      ]);

      if (!isRepo.data) {
        return {
          success: false,
          data: null,
          error: 'Not a git repository'
        };
      }

      return {
        success: true,
        data: {
          path: this.repositoryPath,
          isRepository: true,
          currentBranch: currentBranch.data || 'unknown',
          remotes: remotes.data || [],
          lastCommit: lastCommit.data,
          config: this.config.getSummary()
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get the underlying simple-git instance for advanced operations
   */
  getSimpleGit(): SimpleGit {
    return this.git;
  }

  /**
   * Get client configuration
   */
  getConfig(): GitConfig {
    return this.config;
  }

  /**
   * Get repository path
   */
  getRepositoryPath(): string {
    return this.repositoryPath;
  }
}

/**
 * Factory function to create a Git client
 */
export function createGitClient(repositoryPath: string, options?: GitClientOptions): GitClient {
  return new GitClient(repositoryPath, options);
}

/**
 * Create Git client from environment variables
 */
export function createGitClientFromEnv(repositoryPath: string): GitClient {
  const userName = process.env.GIT_USER_NAME;
  const userEmail = process.env.GIT_USER_EMAIL;
  const defaultBranch = process.env.GIT_DEFAULT_BRANCH || 'main';

  return new GitClient(repositoryPath, {
    userName: userName || 'The Architech',
    userEmail: userEmail || 'architech@example.com',
    defaultBranch
  });
}
