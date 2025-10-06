/**
 * GitHub Pull Request Operations
 * 
 * Handles pull request creation, management, and operations
 */

import { Octokit } from '@octokit/rest';
import { GitHubResponse, PullRequestInfo, CreatePullRequestOptions, UpdatePullRequestOptions } from './types';

export class GitHubPullRequests {
  constructor(private octokit: Octokit) {}

  /**
   * Create a pull request
   */
  async createPullRequest(
    owner: string, 
    repo: string, 
    options: CreatePullRequestOptions
  ): Promise<GitHubResponse<PullRequestInfo>> {
    try {
      const { data } = await this.octokit.rest.pulls.create({
        owner,
        repo,
        title: options.title,
        head: options.head,
        base: options.base,
        body: options.body,
        maintainer_can_modify: options.maintainerCanModify,
        draft: options.draft
      });

      return {
        success: true,
        data: this.mapPullRequestData(data),
        message: `Pull request #${data.number} created successfully`
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
   * Get pull request information
   */
  async getPullRequest(
    owner: string, 
    repo: string, 
    pullNumber: number
  ): Promise<GitHubResponse<PullRequestInfo>> {
    try {
      const { data } = await this.octokit.rest.pulls.get({
        owner,
        repo,
        pull_number: pullNumber
      });

      return {
        success: true,
        data: this.mapPullRequestData(data)
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
   * List pull requests
   */
  async listPullRequests(
    owner: string, 
    repo: string, 
    options: {
      state?: 'open' | 'closed' | 'all';
      head?: string;
      base?: string;
      sort?: 'created' | 'updated' | 'popularity' | 'long-running';
      direction?: 'asc' | 'desc';
      per_page?: number;
      page?: number;
    } = {}
  ): Promise<GitHubResponse<PullRequestInfo[]>> {
    try {
      const { data } = await this.octokit.rest.pulls.list({
        owner,
        repo,
        state: options.state || 'open',
        head: options.head,
        base: options.base,
        sort: options.sort || 'created',
        direction: options.direction || 'desc',
        per_page: options.per_page || 30,
        page: options.page || 1
      });

      return {
        success: true,
        data: data.map(pr => this.mapPullRequestData(pr))
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
   * Update pull request
   */
  async updatePullRequest(
    owner: string, 
    repo: string, 
    pullNumber: number, 
    options: UpdatePullRequestOptions
  ): Promise<GitHubResponse<PullRequestInfo>> {
    try {
      const { data } = await this.octokit.rest.pulls.update({
        owner,
        repo,
        pull_number: pullNumber,
        title: options.title,
        body: options.body,
        state: options.state,
        base: options.base,
        maintainer_can_modify: options.maintainerCanModify
      });

      return {
        success: true,
        data: this.mapPullRequestData(data),
        message: `Pull request #${pullNumber} updated successfully`
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
   * Merge pull request
   */
  async mergePullRequest(
    owner: string, 
    repo: string, 
    pullNumber: number, 
    options: {
      commitTitle?: string;
      commitMessage?: string;
      mergeMethod?: 'merge' | 'squash' | 'rebase';
      sha?: string;
    } = {}
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: pullNumber,
        commit_title: options.commitTitle,
        commit_message: options.commitMessage,
        merge_method: options.mergeMethod || 'merge',
        sha: options.sha
      });

      return {
        success: true,
        data: true,
        message: `Pull request #${pullNumber} merged successfully`
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
   * Close pull request
   */
  async closePullRequest(
    owner: string, 
    repo: string, 
    pullNumber: number
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.pulls.update({
        owner,
        repo,
        pull_number: pullNumber,
        state: 'closed'
      });

      return {
        success: true,
        data: true,
        message: `Pull request #${pullNumber} closed successfully`
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
   * Map GitHub API pull request data to our PullRequestInfo type
   */
  private mapPullRequestData(data: any): PullRequestInfo {
    return {
      id: data.id,
      number: data.number,
      title: data.title,
      body: data.body,
      state: data.state,
      locked: data.locked,
      user: {
        id: data.user.id,
        login: data.user.login,
        avatarUrl: data.user.avatar_url,
        htmlUrl: data.user.html_url
      },
      head: {
        ref: data.head.ref,
        sha: data.head.sha,
        repo: {
          id: data.head.repo.id,
          name: data.head.repo.name,
          fullName: data.head.repo.full_name,
          private: data.head.repo.private
        }
      },
      base: {
        ref: data.base.ref,
        sha: data.base.sha,
        repo: {
          id: data.base.repo.id,
          name: data.base.repo.name,
          fullName: data.base.repo.full_name,
          private: data.base.repo.private
        }
      },
      htmlUrl: data.html_url,
      diffUrl: data.diff_url,
      patchUrl: data.patch_url,
      issueUrl: data.issue_url,
      commitsUrl: data.commits_url,
      reviewCommentsUrl: data.review_comments_url,
      reviewCommentUrl: data.review_comment_url,
      commentsUrl: data.comments_url,
      statusesUrl: data.statuses_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      closedAt: data.closed_at ? new Date(data.closed_at) : null,
      mergedAt: data.merged_at ? new Date(data.merged_at) : null,
      mergeCommitSha: data.merge_commit_sha,
      assignees: data.assignees?.map((assignee: any) => ({
        id: assignee.id,
        login: assignee.login,
        avatarUrl: assignee.avatar_url,
        htmlUrl: assignee.html_url
      })) || [],
      requestedReviewers: data.requested_reviewers?.map((reviewer: any) => ({
        id: reviewer.id,
        login: reviewer.login,
        avatarUrl: reviewer.avatar_url,
        htmlUrl: reviewer.html_url
      })) || [],
      labels: data.labels?.map((label: any) => ({
        id: label.id,
        name: label.name,
        color: label.color,
        description: label.description
      })) || [],
      milestone: data.milestone ? {
        id: data.milestone.id,
        title: data.milestone.title,
        description: data.milestone.description,
        state: data.milestone.state,
        createdAt: new Date(data.milestone.created_at),
        updatedAt: new Date(data.milestone.updated_at),
        closedAt: data.milestone.closed_at ? new Date(data.milestone.closed_at) : null,
        dueOn: data.milestone.due_on ? new Date(data.milestone.due_on) : null
      } : null,
      draft: data.draft,
      merged: data.merged,
      mergeable: data.mergeable,
      rebaseable: data.rebaseable,
      mergeableState: data.mergeable_state,
      comments: data.comments,
      reviewComments: data.review_comments,
      maintainerCanModify: data.maintainer_can_modify,
      commits: data.commits,
      additions: data.additions,
      deletions: data.deletions,
      changedFiles: data.changed_files
    };
  }
}
