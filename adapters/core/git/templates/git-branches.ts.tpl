/**
 * Git Branch Operations
 * 
 * Handles branch creation, management, and operations
 */

import { SimpleGit } from 'simple-git';
import { GitConfig } from './config';
import { GitResponse, BranchInfo, CreateBranchOptions } from './types';

export class GitBranches {
  constructor(
    private git: SimpleGit,
    private config: GitConfig
  ) {}

  /**
   * Create a new branch
   */
  async createBranch(
    name: string, 
    options: CreateBranchOptions = {}
  ): Promise<GitResponse<boolean>> {
    try {
      if (options.checkout) {
        await this.git.checkoutLocalBranch(name, options.startPoint);
      } else {
        await this.git.branch([name, options.startPoint || 'HEAD']);
      }

      return {
        success: true,
        data: true,
        message: `Branch '${name}' created successfully`
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
   * List all branches
   */
  async listBranches(): Promise<GitResponse<BranchInfo[]>> {
    try {
      const [localBranches, remoteBranches] = await Promise.all([
        this.git.branchLocal(),
        this.git.branch(['-r'])
      ]);

      const currentBranch = await this.getCurrentBranch();
      const branches: BranchInfo[] = [];

      // Add local branches
      for (const [name, branch] of Object.entries(localBranches.branches)) {
        branches.push({
          name: branch.name,
          commit: branch.commit,
          isCurrent: branch.current,
          isRemote: false
        });
      }

      // Add remote branches
      for (const [name, branch] of Object.entries(remoteBranches.branches)) {
        const branchName = branch.name.replace(/^origin\//, '');
        branches.push({
          name: branchName,
          commit: branch.commit,
          isCurrent: false,
          isRemote: true,
          remote: 'origin'
        });
      }

      return {
        success: true,
        data: branches
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
   * Get current branch
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
   * Switch to a branch
   */
  async switchBranch(name: string): Promise<GitResponse<boolean>> {
    try {
      await this.git.checkout(name);
      return {
        success: true,
        data: true,
        message: `Switched to branch '${name}'`
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
   * Delete a branch
   */
  async deleteBranch(
    name: string, 
    force: boolean = false
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.deleteLocalBranch(name, force);
      return {
        success: true,
        data: true,
        message: `Branch '${name}' deleted successfully`
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
   * Merge a branch
   */
  async mergeBranch(
    branch: string, 
    options: {
      noFf?: boolean;
      squash?: boolean;
      message?: string;
    } = {}
  ): Promise<GitResponse<boolean>> {
    try {
      const mergeResult = await this.git.merge([branch], {
        '--no-ff': options.noFf || false,
        '--squash': options.squash || false,
        '--message': options.message
      });

      return {
        success: true,
        data: true,
        message: `Branch '${branch}' merged successfully`
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
   * Get branch information
   */
  async getBranchInfo(name: string): Promise<GitResponse<BranchInfo>> {
    try {
      const [branches, currentBranch] = await Promise.all([
        this.listBranches(),
        this.getCurrentBranch()
      ]);

      const branch = branches.data?.find(b => b.name === name);
      if (!branch) {
        return {
          success: false,
          data: null,
          error: 'Branch not found'
        };
      }

      return {
        success: true,
        data: {
          ...branch,
          isCurrent: branch.name === currentBranch.data
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
   * Check if branch exists
   */
  async branchExists(name: string): Promise<GitResponse<boolean>> {
    try {
      const branches = await this.listBranches();
      const exists = branches.data?.some(branch => branch.name === name) || false;
      
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
   * Rename a branch
   */
  async renameBranch(
    oldName: string, 
    newName: string
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.branch(['-m', oldName, newName]);
      return {
        success: true,
        data: true,
        message: `Branch renamed from '${oldName}' to '${newName}'`
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
   * Get branch ahead/behind information
   */
  async getBranchStatus(branch: string): Promise<GitResponse<{
    ahead: number;
    behind: number;
  }>> {
    try {
      const status = await this.git.status();
      return {
        success: true,
        data: {
          ahead: status.ahead || 0,
          behind: status.behind || 0
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
   * Create and switch to a new branch
   */
  async createAndSwitchBranch(
    name: string, 
    startPoint?: string
  ): Promise<GitResponse<boolean>> {
    try {
      await this.git.checkoutLocalBranch(name, startPoint);
      return {
        success: true,
        data: true,
        message: `Created and switched to branch '${name}'`
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
