/**
 * GitHub Repository Operations
 * 
 * Handles all repository-related operations including creation, 
 * management, and information retrieval
 */

import { Octokit } from '@octokit/rest';
import { GitHubResponse, RepositoryInfo, CreateRepositoryOptions, UpdateRepositoryOptions } from './types';

export class GitHubRepository {
  constructor(private octokit: Octokit) {}

  /**
   * Create a new repository
   */
  async createRepository(options: CreateRepositoryOptions): Promise<GitHubResponse<RepositoryInfo>> {
    try {
      const { data } = await this.octokit.rest.repos.createForAuthenticatedUser({
        name: options.name,
        description: options.description,
        private: options.private ?? false,
        auto_init: options.autoInit ?? true,
        gitignore_template: options.gitignoreTemplate,
        license_template: options.licenseTemplate,
        allow_squash_merge: options.allowSquashMerge ?? true,
        allow_merge_commit: options.allowMergeCommit ?? true,
        allow_rebase_merge: options.allowRebaseMerge ?? true,
        delete_branch_on_merge: options.deleteBranchOnMerge ?? false,
        has_issues: options.hasIssues ?? true,
        has_projects: options.hasProjects ?? true,
        has_wiki: options.hasWiki ?? true,
        has_downloads: options.hasDownloads ?? true,
        is_template: options.isTemplate ?? false
      });

      return {
        success: true,
        data: this.mapRepositoryData(data),
        message: `Repository '${options.name}' created successfully`
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
  async getRepository(owner: string, repo: string): Promise<GitHubResponse<RepositoryInfo>> {
    try {
      const { data } = await this.octokit.rest.repos.get({
        owner,
        repo
      });

      return {
        success: true,
        data: this.mapRepositoryData(data)
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
   * List user repositories
   */
  async listRepositories(options: {
    type?: 'all' | 'owner' | 'public' | 'private' | 'member';
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}): Promise<GitHubResponse<RepositoryInfo[]>> {
    try {
      const { data } = await this.octokit.rest.repos.listForAuthenticatedUser({
        type: options.type || 'all',
        sort: options.sort || 'updated',
        direction: options.direction || 'desc',
        per_page: options.per_page || 30,
        page: options.page || 1
      });

      return {
        success: true,
        data: data.map(repo => this.mapRepositoryData(repo))
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
   * Update repository settings
   */
  async updateRepository(
    owner: string, 
    repo: string, 
    options: UpdateRepositoryOptions
  ): Promise<GitHubResponse<RepositoryInfo>> {
    try {
      const { data } = await this.octokit.rest.repos.update({
        owner,
        repo,
        name: options.name,
        description: options.description,
        private: options.private,
        allow_squash_merge: options.allowSquashMerge,
        allow_merge_commit: options.allowMergeCommit,
        allow_rebase_merge: options.allowRebaseMerge,
        delete_branch_on_merge: options.deleteBranchOnMerge,
        has_issues: options.hasIssues,
        has_projects: options.hasProjects,
        has_wiki: options.hasWiki,
        has_downloads: options.hasDownloads,
        is_template: options.isTemplate
      });

      return {
        success: true,
        data: this.mapRepositoryData(data),
        message: `Repository '${repo}' updated successfully`
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
   * Delete repository
   */
  async deleteRepository(owner: string, repo: string): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.repos.delete({
        owner,
        repo
      });

      return {
        success: true,
        data: true,
        message: `Repository '${repo}' deleted successfully`
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
   * Check if repository exists
   */
  async repositoryExists(owner: string, repo: string): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.repos.get({ owner, repo });
      return {
        success: true,
        data: true
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return {
          success: true,
          data: false
        };
      }
      return {
        success: false,
        data: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get repository statistics
   */
  async getRepositoryStats(owner: string, repo: string): Promise<GitHubResponse<{
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    size: number;
    language: string | null;
    languages: Record<string, number>;
  }>> {
    try {
      const [repoData, languagesData] = await Promise.all([
        this.octokit.rest.repos.get({ owner, repo }),
        this.octokit.rest.repos.listLanguages({ owner, repo })
      ]);

      return {
        success: true,
        data: {
          stars: repoData.data.stargazers_count,
          forks: repoData.data.forks_count,
          watchers: repoData.data.watchers_count,
          openIssues: repoData.data.open_issues_count,
          size: repoData.data.size,
          language: repoData.data.language,
          languages: languagesData.data
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
   * Map GitHub API repository data to our RepositoryInfo type
   */
  private mapRepositoryData(data: any): RepositoryInfo {
    return {
      id: data.id,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      private: data.private,
      htmlUrl: data.html_url,
      cloneUrl: data.clone_url,
      sshUrl: data.ssh_url,
      gitUrl: data.git_url,
      defaultBranch: data.default_branch,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      pushedAt: data.pushed_at ? new Date(data.pushed_at) : null,
      language: data.language,
      size: data.size,
      stargazersCount: data.stargazers_count,
      watchersCount: data.watchers_count,
      forksCount: data.forks_count,
      openIssuesCount: data.open_issues_count,
      hasIssues: data.has_issues,
      hasProjects: data.has_projects,
      hasWiki: data.has_wiki,
      hasDownloads: data.has_downloads,
      isTemplate: data.is_template,
      allowSquashMerge: data.allow_squash_merge,
      allowMergeCommit: data.allow_merge_commit,
      allowRebaseMerge: data.allow_rebase_merge,
      deleteBranchOnMerge: data.delete_branch_on_merge,
      topics: data.topics || [],
      archived: data.archived,
      disabled: data.disabled
    };
  }
}
