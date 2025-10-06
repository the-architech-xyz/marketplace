/**
 * Git Repository Operations
 * 
 * Handles repository initialization and management
 */

import { SimpleGit } from 'simple-git';
import { GitConfig } from './config';
import { GitResponse, RepositoryInfo, CreateRepositoryOptions } from './types';

export class GitRepository {
  constructor(
    private git: SimpleGit,
    private config: GitConfig
  ) {}

  /**
   * Initialize a new git repository
   */
  async initRepository(options: CreateRepositoryOptions = {}): Promise<GitResponse<boolean>> {
    try {
      await this.git.init({
        bare: options.bare || false,
        shared: options.shared || false
      });

      // Set initial branch if specified
      if (options.initialBranch) {
        await this.git.checkoutLocalBranch(options.initialBranch);
      } else if (this.config.defaultBranch !== 'main') {
        await this.git.checkoutLocalBranch(this.config.defaultBranch);
      }

      // Configure user name and email
      await this.git.addConfig('user.name', this.config.userName);
      await this.git.addConfig('user.email', this.config.userEmail);

      return {
        success: true,
        data: true,
        message: 'Repository initialized successfully'
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
   * Check if current directory is a git repository
   */
  async isRepository(): Promise<GitResponse<boolean>> {
    try {
      await this.git.status();
      return {
        success: true,
        data: true
      };
    } catch (error) {
      return {
        success: true,
        data: false
      };
    }
  }

  /**
   * Clone a repository
   */
  async cloneRepository(
    url: string, 
    localPath: string, 
    options: {
      branch?: string;
      depth?: number;
      singleBranch?: boolean;
      noCheckout?: boolean;
    } = {}
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.clone(url, localPath, {
        '--branch': options.branch,
        '--depth': options.depth,
        '--single-branch': options.singleBranch,
        '--no-checkout': options.noCheckout
      });

      return {
        success: true,
        data: true,
        message: `Repository cloned from ${url}`
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
   * Get repository information
   */
  async getRepositoryInfo(): Promise<GitResponse<RepositoryInfo>> {
    try {
      const [isRepo, currentBranch, remotes, lastCommit] = await Promise.all([
        this.isRepository(),
        this.getCurrentBranch(),
        this.getRemotes(),
        this.getLastCommit()
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
          path: process.cwd(),
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
   * Get list of remotes
   */
  async getRemotes(): Promise<GitResponse<Array<{ name: string; url: string }>>> {
    try {
      const remotes = await this.git.getRemotes(true);
      return {
        success: true,
        data: remotes.map(remote => ({
          name: remote.name,
          url: remote.refs.fetch || remote.refs.push
        }))
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get last commit information
   */
  async getLastCommit(): Promise<GitResponse<any>> {
    try {
      const log = await this.git.log({ maxCount: 1 });
      if (log.latest) {
        return {
          success: true,
          data: {
            hash: log.latest.hash,
            message: log.latest.message,
            author: log.latest.author_name,
            email: log.latest.author_email,
            date: log.latest.date
          }
        };
      }
      return {
        success: true,
        data: null
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
   * Get repository size
   */
  async getRepositorySize(): Promise<GitResponse<number>> {
    try {
      const size = await this.git.raw(['count-objects', '-vH']);
      // Parse size from git count-objects output
      const sizeMatch = size.match(/size-pack: (\d+)/);
      if (sizeMatch) {
        return {
          success: true,
          data: parseInt(sizeMatch[1])
        };
      }
      return {
        success: true,
        data: 0
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
   * Get repository statistics
   */
  async getRepositoryStats(): Promise<GitResponse<{
    commits: number;
    branches: number;
    tags: number;
    contributors: number;
    files: number;
  }>> {
    try {
      const [commits, branches, tags, contributors, files] = await Promise.all([
        this.getCommitCount(),
        this.getBranchCount(),
        this.getTagCount(),
        this.getContributorCount(),
        this.getFileCount()
      ]);

      return {
        success: true,
        data: {
          commits: commits.data || 0,
          branches: branches.data || 0,
          tags: tags.data || 0,
          contributors: contributors.data || 0,
          files: files.data || 0
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

  private async getCommitCount(): Promise<GitResponse<number>> {
    try {
      const log = await this.git.log();
      return {
        success: true,
        data: log.total
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getBranchCount(): Promise<GitResponse<number>> {
    try {
      const branches = await this.git.branchLocal();
      return {
        success: true,
        data: branches.all.length
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getTagCount(): Promise<GitResponse<number>> {
    try {
      const tags = await this.git.tags();
      return {
        success: true,
        data: tags.all.length
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getContributorCount(): Promise<GitResponse<number>> {
    try {
      const log = await this.git.log();
      const contributors = new Set(log.all.map(commit => commit.author_email));
      return {
        success: true,
        data: contributors.size
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async getFileCount(): Promise<GitResponse<number>> {
    try {
      const files = await this.git.raw(['ls-files']);
      return {
        success: true,
        data: files.split('\n').filter(line => line.trim().length > 0).length
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
