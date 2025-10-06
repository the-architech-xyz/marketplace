/**
 * Git Remote Operations
 * 
 * Handles remote repository management and operations
 */

import { SimpleGit } from 'simple-git';
import { GitConfig } from './config';
import { GitResponse, RemoteInfo, AddRemoteOptions, PushOptions, PullOptions } from './types';

export class GitRemotes {
  constructor(
    private git: SimpleGit,
    private config: GitConfig
  ) {}

  /**
   * Add a remote repository
   */
  async addRemote(
    name: string, 
    options: AddRemoteOptions
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.addRemote(name, options.url);
      
      if (options.fetch) {
        await this.git.fetch(name);
      }

      return {
        success: true,
        data: true,
        message: `Remote '${name}' added successfully`
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
   * List all remotes
   */
  async listRemotes(): Promise<GitResponse<RemoteInfo[]>> {
    try {
      const remotes = await this.git.getRemotes(true);
      
      const remoteInfos: RemoteInfo[] = remotes.map(remote => ({
        name: remote.name,
        url: remote.refs.fetch || remote.refs.push,
        refs: {
          fetch: remote.refs.fetch || '',
          push: remote.refs.push || ''
        }
      }));

      return {
        success: true,
        data: remoteInfos
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
   * Remove a remote
   */
  async removeRemote(name: string): Promise<GitResponse<boolean>> {
    try {
      await this.git.removeRemote(name);
      return {
        success: true,
        data: true,
        message: `Remote '${name}' removed successfully`
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
   * Get remote information
   */
  async getRemote(name: string): Promise<GitResponse<RemoteInfo>> {
    try {
      const remotes = await this.listRemotes();
      const remote = remotes.data?.find(r => r.name === name);
      
      if (!remote) {
        return {
          success: false,
          data: null,
          error: 'Remote not found'
        };
      }

      return {
        success: true,
        data: remote
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
   * Update remote URL
   */
  async updateRemoteUrl(
    name: string, 
    newUrl: string
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.remote(['set-url', name, newUrl]);
      return {
        success: true,
        data: true,
        message: `Remote '${name}' URL updated successfully`
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
   * Push to remote
   */
  async pushToRemote(options: PushOptions = {}): Promise<GitResponse<boolean>> {
    try {
      const pushOptions = [
        options.remote || 'origin',
        options.branch || this.config.defaultBranch
      ];

      if (options.setUpstream) {
        pushOptions.push('--set-upstream');
      }

      if (options.force) {
        pushOptions.push('--force');
      }

      await this.git.push(pushOptions);

      return {
        success: true,
        data: true,
        message: `Pushed to ${options.remote || 'origin'}/${options.branch || this.config.defaultBranch}`
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
   * Pull from remote
   */
  async pullFromRemote(options: PullOptions = {}): Promise<GitResponse<boolean>> {
    try {
      const pullOptions = [];

      if (options.remote) {
        pullOptions.push(options.remote);
      }

      if (options.branch) {
        pullOptions.push(options.branch);
      }

      if (options.rebase) {
        pullOptions.push('--rebase');
      }

      if (options.ffOnly) {
        pullOptions.push('--ff-only');
      }

      await this.git.pull(pullOptions);

      return {
        success: true,
        data: true,
        message: `Pulled from ${options.remote || 'origin'}/${options.branch || 'current branch'}`
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
   * Fetch from remote
   */
  async fetchFromRemote(
    remote: string = 'origin'
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.fetch(remote);
      return {
        success: true,
        data: true,
        message: `Fetched from ${remote}`
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
   * Check if remote exists
   */
  async remoteExists(name: string): Promise<GitResponse<boolean>> {
    try {
      const remotes = await this.listRemotes();
      const exists = remotes.data?.some(remote => remote.name === name) || false;
      
      return {
        success: true,
        data: exists
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
   * Get remote branches
   */
  async getRemoteBranches(
    remote: string = 'origin'
  ): Promise<GitResponse<string[]>> {
    try {
      const branches = await this.git.branch(['-r']);
      const remoteBranches = Object.keys(branches.branches)
        .filter(branch => branch.startsWith(`${remote}/`))
        .map(branch => branch.replace(`${remote}/`, ''));

      return {
        success: true,
        data: remoteBranches
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
   * Set upstream branch
   */
  async setUpstreamBranch(
    localBranch: string, 
    remoteBranch: string, 
    remote: string = 'origin'
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.push(['--set-upstream', remote, `${localBranch}:${remoteBranch}`]);
      return {
        success: true,
        data: true,
        message: `Set upstream branch ${localBranch} -> ${remote}/${remoteBranch}`
      };
    } catch (error) {
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
