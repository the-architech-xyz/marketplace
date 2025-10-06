/**
 * GitHub Workflows Management
 * 
 * Handles GitHub Actions workflow creation and management
 */

import { Octokit } from '@octokit/rest';
import { GitHubResponse, WorkflowInfo, CreateWorkflowOptions } from './types';

export class GitHubWorkflows {
  constructor(private octokit: Octokit) {}

  /**
   * List repository workflows
   */
  async listWorkflows(
    owner: string, 
    repo: string
  ): Promise<GitHubResponse<WorkflowInfo[]>> {
    try {
      const { data } = await this.octokit.rest.actions.listWorkflowsForRepo({
        owner,
        repo
      });

      return {
        success: true,
        data: data.workflows.map(workflow => this.mapWorkflowData(workflow))
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
   * Get workflow information
   */
  async getWorkflow(
    owner: string, 
    repo: string, 
    workflowId: number
  ): Promise<GitHubResponse<WorkflowInfo>> {
    try {
      const { data } = await this.octokit.rest.actions.getWorkflow({
        owner,
        repo,
        workflow_id: workflowId
      });

      return {
        success: true,
        data: this.mapWorkflowData(data)
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
   * Create workflow file
   */
  async createWorkflow(
    owner: string, 
    repo: string, 
    options: CreateWorkflowOptions
  ): Promise<GitHubResponse<boolean>> {
    try {
      const workflowPath = `.github/workflows/${options.name}`;
      
      // Create the workflow file
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: workflowPath,
        message: options.message || `Add ${options.name} workflow`,
        content: Buffer.from(options.content).toString('base64'),
        branch: options.branch || 'main'
      });

      return {
        success: true,
        data: true,
        message: `Workflow '${options.name}' created successfully`
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
   * Update workflow file
   */
  async updateWorkflow(
    owner: string, 
    repo: string, 
    workflowName: string, 
    options: CreateWorkflowOptions
  ): Promise<GitHubResponse<boolean>> {
    try {
      const workflowPath = `.github/workflows/${workflowName}`;
      
      // Get current file to get SHA
      const { data: currentFile } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: workflowPath
      });

      if (Array.isArray(currentFile)) {
        return {
          success: false,
          data: false,
          error: 'Path is a directory, not a file'
        };
      }

      // Update the workflow file
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: workflowPath,
        message: options.message || `Update ${workflowName} workflow`,
        content: Buffer.from(options.content).toString('base64'),
        sha: currentFile.sha,
        branch: options.branch || 'main'
      });

      return {
        success: true,
        data: true,
        message: `Workflow '${workflowName}' updated successfully`
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
   * Delete workflow file
   */
  async deleteWorkflow(
    owner: string, 
    repo: string, 
    workflowName: string, 
    options: {
      branch?: string;
      message?: string;
    } = {}
  ): Promise<GitHubResponse<boolean>> {
    try {
      const workflowPath = `.github/workflows/${workflowName}`;
      
      // Get current file to get SHA
      const { data: currentFile } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: workflowPath
      });

      if (Array.isArray(currentFile)) {
        return {
          success: false,
          data: false,
          error: 'Path is a directory, not a file'
        };
      }

      // Delete the workflow file
      await this.octokit.rest.repos.deleteFile({
        owner,
        repo,
        path: workflowPath,
        message: options.message || `Remove ${workflowName} workflow`,
        sha: currentFile.sha,
        branch: options.branch || 'main'
      });

      return {
        success: true,
        data: true,
        message: `Workflow '${workflowName}' deleted successfully`
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
   * Enable workflow
   */
  async enableWorkflow(
    owner: string, 
    repo: string, 
    workflowId: number
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.actions.enableWorkflow({
        owner,
        repo,
        workflow_id: workflowId
      });

      return {
        success: true,
        data: true,
        message: 'Workflow enabled successfully'
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
   * Disable workflow
   */
  async disableWorkflow(
    owner: string, 
    repo: string, 
    workflowId: number
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.actions.disableWorkflow({
        owner,
        repo,
        workflow_id: workflowId
      });

      return {
        success: true,
        data: true,
        message: 'Workflow disabled successfully'
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
   * Get workflow runs
   */
  async getWorkflowRuns(
    owner: string, 
    repo: string, 
    workflowId: number,
    options: {
      actor?: string;
      branch?: string;
      event?: string;
      status?: 'completed' | 'action_required' | 'cancelled' | 'failure' | 'neutral' | 'skipped' | 'stale' | 'success' | 'timed_out' | 'in_progress' | 'queued' | 'requested' | 'waiting';
      per_page?: number;
      page?: number;
    } = {}
  ): Promise<GitHubResponse<any[]>> {
    try {
      const { data } = await this.octokit.rest.actions.listWorkflowRuns({
        owner,
        repo,
        workflow_id: workflowId,
        actor: options.actor,
        branch: options.branch,
        event: options.event,
        status: options.status,
        per_page: options.per_page || 30,
        page: options.page || 1
      });

      return {
        success: true,
        data: data.workflow_runs
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
   * Map GitHub API workflow data to our WorkflowInfo type
   */
  private mapWorkflowData(data: any): WorkflowInfo {
    return {
      id: data.id,
      name: data.name,
      path: data.path,
      state: data.state,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      url: data.url,
      htmlUrl: data.html_url,
      badgeUrl: data.badge_url
    };
  }
}
