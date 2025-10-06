/**
 * Git Commit Operations
 * 
 * Handles commit creation, management, and history
 */

import { SimpleGit } from 'simple-git';
import { GitConfig } from './config';
import { GitResponse, CommitInfo, CommitOptions } from './types';

export class GitCommits {
  constructor(
    private git: SimpleGit,
    private config: GitConfig
  ) {}

  /**
   * Create a new commit
   */
  async createCommit(options: CommitOptions): Promise<GitResponse<CommitInfo>> {
    try {
      // Add files if specified
      if (options.files && options.files.length > 0) {
        await this.git.add(options.files);
      } else if (options.all) {
        await this.git.add('.');
      }

      // Create commit
      const commitResult = await this.git.commit(options.message, {
        '--author': options.author ? `${options.author.name} <${options.author.email}>` : undefined,
        '--no-verify': false
      });

      // Get commit details
      const commitInfo = await this.getCommit(commitResult.commit);

      return {
        success: true,
        data: commitInfo.data,
        message: `Commit created: ${commitResult.commit}`
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
   * Get commit information
   */
  async getCommit(hash: string): Promise<GitResponse<CommitInfo>> {
    try {
      const log = await this.git.log({ from: hash, maxCount: 1 });
      const commit = log.latest;

      if (!commit) {
        return {
          success: false,
          data: null,
          error: 'Commit not found'
        };
      }

      return {
        success: true,
        data: {
          hash: commit.hash,
          message: commit.message,
          author: {
            name: commit.author_name,
            email: commit.author_email,
            date: new Date(commit.date)
          },
          committer: {
            name: commit.committer_name,
            email: commit.committer_email,
            date: new Date(commit.date)
          },
          parents: commit.parents || [],
          tree: commit.tree || '',
          refs: commit.refs || []
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
   * Get last commit
   */
  async getLastCommit(): Promise<GitResponse<CommitInfo>> {
    try {
      const log = await this.git.log({ maxCount: 1 });
      const commit = log.latest;

      if (!commit) {
        return {
          success: true,
          data: null
        };
      }

      return {
        success: true,
        data: {
          hash: commit.hash,
          message: commit.message,
          author: {
            name: commit.author_name,
            email: commit.author_email,
            date: new Date(commit.date)
          },
          committer: {
            name: commit.committer_name,
            email: commit.committer_email,
            date: new Date(commit.date)
          },
          parents: commit.parents || [],
          tree: commit.tree || '',
          refs: commit.refs || []
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
   * Get commit history
   */
  async getCommitHistory(options: {
    maxCount?: number;
    since?: string;
    until?: string;
    author?: string;
    committer?: string;
    grep?: string;
  } = {}): Promise<GitResponse<CommitInfo[]>> {
    try {
      const log = await this.git.log({
        maxCount: options.maxCount || 10,
        since: options.since,
        until: options.until,
        '--author': options.author,
        '--committer': options.committer,
        '--grep': options.grep
      });

      const commits = log.all.map(commit => ({
        hash: commit.hash,
        message: commit.message,
        author: {
          name: commit.author_name,
          email: commit.author_email,
          date: new Date(commit.date)
        },
        committer: {
          name: commit.committer_name,
          email: commit.committer_email,
          date: new Date(commit.date)
        },
        parents: commit.parents || [],
        tree: commit.tree || '',
        refs: commit.refs || []
      }));

      return {
        success: true,
        data: commits
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
   * Create initial commit
   */
  async createInitialCommit(message: string = 'Initial commit'): Promise<GitResponse<CommitInfo>> {
    try {
      // Add all files
      await this.git.add('.');

      // Create commit
      const commitResult = await this.git.commit(message);

      // Get commit details
      const commitInfo = await this.getCommit(commitResult.commit);

      return {
        success: true,
        data: commitInfo.data,
        message: `Initial commit created: ${commitResult.commit}`
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
   * Amend last commit
   */
  async amendCommit(options: {
    message?: string;
    files?: string[];
    noEdit?: boolean;
  } = {}): Promise<GitResponse<CommitInfo>> {
    try {
      // Add files if specified
      if (options.files && options.files.length > 0) {
        await this.git.add(options.files);
      }

      // Amend commit
      const commitResult = await this.git.commit(options.message || '', {
        '--amend': true,
        '--no-edit': options.noEdit || false
      });

      // Get commit details
      const commitInfo = await this.getCommit(commitResult.commit);

      return {
        success: true,
        data: commitInfo.data,
        message: `Commit amended: ${commitResult.commit}`
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
   * Reset to a specific commit
   */
  async resetToCommit(
    commit: string, 
    mode: 'soft' | 'mixed' | 'hard' = 'mixed'
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.reset([`--${mode}`, commit]);

      return {
        success: true,
        data: true,
        message: `Reset to commit ${commit} (${mode})`
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
   * Get commit statistics
   */
  async getCommitStats(commit: string): Promise<GitResponse<{
    additions: number;
    deletions: number;
    files: number;
  }>> {
    try {
      const stats = await this.git.raw(['show', '--stat', commit]);
      
      // Parse stats from git show output
      const lines = stats.split('\n');
      const fileLine = lines.find(line => line.includes('files changed'));
      
      if (fileLine) {
        const match = fileLine.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/);
        if (match) {
          return {
            success: true,
            data: {
              files: parseInt(match[1]),
              additions: match[2] ? parseInt(match[2]) : 0,
              deletions: match[3] ? parseInt(match[3]) : 0
            }
          };
        }
      }

      return {
        success: true,
        data: {
          files: 0,
          additions: 0,
          deletions: 0
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
}
