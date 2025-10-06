/**
 * GitHub File Operations
 * 
 * Handles file and directory operations in GitHub repositories
 */

import { Octokit } from '@octokit/rest';
import { GitHubResponse, FileContent, CreateFileOptions, UpdateFileOptions, DeleteFileOptions } from './types';

export class GitHubFiles {
  constructor(private octokit: Octokit) {}

  /**
   * Get file or directory contents
   */
  async getContents(
    owner: string, 
    repo: string, 
    path: string, 
    branch?: string
  ): Promise<GitHubResponse<FileContent | FileContent[]>> {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });

      if (Array.isArray(data)) {
        // Directory contents
        return {
          success: true,
          data: data.map(item => this.mapFileContent(item))
        };
      } else {
        // Single file
        return {
          success: true,
          data: this.mapFileContent(data)
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Create a new file
   */
  async createFile(
    owner: string, 
    repo: string, 
    options: CreateFileOptions
  ): Promise<GitHubResponse<FileContent>> {
    try {
      const { data } = await this.octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: options.path,
        message: options.message,
        content: Buffer.from(options.content).toString('base64'),
        branch: options.branch,
        committer: options.committer,
        author: options.author
      });

      return {
        success: true,
        data: this.mapFileContent(data.content),
        message: `File '${options.path}' created successfully`
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
   * Update an existing file
   */
  async updateFile(
    owner: string, 
    repo: string, 
    options: UpdateFileOptions
  ): Promise<GitHubResponse<FileContent>> {
    try {
      const { data } = await this.octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: options.path,
        message: options.message,
        content: Buffer.from(options.content).toString('base64'),
        sha: options.sha,
        branch: options.branch,
        committer: options.committer,
        author: options.author
      });

      return {
        success: true,
        data: this.mapFileContent(data.content),
        message: `File '${options.path}' updated successfully`
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
   * Delete a file
   */
  async deleteFile(
    owner: string, 
    repo: string, 
    options: DeleteFileOptions
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.repos.deleteFile({
        owner,
        repo,
        path: options.path,
        message: options.message,
        sha: options.sha,
        branch: options.branch,
        committer: options.committer,
        author: options.author
      });

      return {
        success: true,
        data: true,
        message: `File '${options.path}' deleted successfully`
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
   * Check if file exists
   */
  async fileExists(
    owner: string, 
    repo: string, 
    path: string, 
    branch?: string
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });
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
   * Get file contents as text
   */
  async getFileText(
    owner: string, 
    repo: string, 
    path: string, 
    branch?: string
  ): Promise<GitHubResponse<string>> {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });

      if (Array.isArray(data)) {
        return {
          success: false,
          data: null,
          error: 'Path is a directory, not a file'
        };
      }

      if (data.type !== 'file') {
        return {
          success: false,
          data: null,
          error: 'Path is not a file'
        };
      }

      const content = data.content ? Buffer.from(data.content, 'base64').toString('utf-8') : '';
      
      return {
        success: true,
        data: content
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
   * Get file size
   */
  async getFileSize(
    owner: string, 
    repo: string, 
    path: string, 
    branch?: string
  ): Promise<GitHubResponse<number>> {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });

      if (Array.isArray(data)) {
        return {
          success: false,
          data: null,
          error: 'Path is a directory, not a file'
        };
      }

      return {
        success: true,
        data: data.size
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
   * List files in directory
   */
  async listDirectory(
    owner: string, 
    repo: string, 
    path: string = '', 
    branch?: string
  ): Promise<GitHubResponse<FileContent[]>> {
    try {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      });

      if (!Array.isArray(data)) {
        return {
          success: false,
          data: [],
          error: 'Path is not a directory'
        };
      }

      return {
        success: true,
        data: data.map(item => this.mapFileContent(item))
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
   * Map GitHub API file content to our FileContent type
   */
  private mapFileContent(data: any): FileContent {
    return {
      name: data.name,
      path: data.path,
      sha: data.sha,
      size: data.size,
      url: data.url,
      htmlUrl: data.html_url,
      gitUrl: data.git_url,
      downloadUrl: data.download_url,
      type: data.type,
      content: data.content,
      encoding: data.encoding,
      target: data.target,
      submoduleGitUrl: data.submodule_git_url
    };
  }
}
