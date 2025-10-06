/**
 * GitHub Secrets Management
 * 
 * Handles repository and organization secrets management
 */

import { Octokit } from '@octokit/rest';
import { GitHubResponse, SecretInfo, CreateSecretOptions } from './types';

export class GitHubSecrets {
  constructor(private octokit: Octokit) {}

  /**
   * List repository secrets
   */
  async listRepositorySecrets(
    owner: string, 
    repo: string
  ): Promise<GitHubResponse<SecretInfo[]>> {
    try {
      const { data } = await this.octokit.rest.actions.listRepoSecrets({
        owner,
        repo
      });

      return {
        success: true,
        data: data.secrets.map(secret => this.mapSecretData(secret))
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
   * Get repository secret
   */
  async getRepositorySecret(
    owner: string, 
    repo: string, 
    secretName: string
  ): Promise<GitHubResponse<SecretInfo>> {
    try {
      const { data } = await this.octokit.rest.actions.getRepoSecret({
        owner,
        repo,
        secret_name: secretName
      });

      return {
        success: true,
        data: this.mapSecretData(data)
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
   * Create or update repository secret
   */
  async createOrUpdateRepositorySecret(
    owner: string, 
    repo: string, 
    options: CreateSecretOptions
  ): Promise<GitHubResponse<boolean>> {
    try {
      // Note: GitHub API requires the secret value to be encrypted with the repository's public key
      // This is a simplified implementation - in production, you'd need to handle encryption
      await this.octokit.rest.actions.createOrUpdateRepoSecret({
        owner,
        repo,
        secret_name: options.name,
        encrypted_value: options.value, // This should be encrypted in production
        key_id: 'placeholder' // This should be the actual key ID
      });

      return {
        success: true,
        data: true,
        message: `Secret '${options.name}' created/updated successfully`
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
   * Delete repository secret
   */
  async deleteRepositorySecret(
    owner: string, 
    repo: string, 
    secretName: string
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.actions.deleteRepoSecret({
        owner,
        repo,
        secret_name: secretName
      });

      return {
        success: true,
        data: true,
        message: `Secret '${secretName}' deleted successfully`
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
   * List organization secrets
   */
  async listOrganizationSecrets(
    org: string
  ): Promise<GitHubResponse<SecretInfo[]>> {
    try {
      const { data } = await this.octokit.rest.actions.listOrgSecrets({
        org
      });

      return {
        success: true,
        data: data.secrets.map(secret => this.mapSecretData(secret))
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
   * Create or update organization secret
   */
  async createOrUpdateOrganizationSecret(
    org: string, 
    options: CreateSecretOptions
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.actions.createOrUpdateOrgSecret({
        org,
        secret_name: options.name,
        encrypted_value: options.value, // This should be encrypted in production
        key_id: 'placeholder', // This should be the actual key ID
        visibility: options.visibility || 'all',
        selected_repository_ids: options.selectedRepositoryIds
      });

      return {
        success: true,
        data: true,
        message: `Organization secret '${options.name}' created/updated successfully`
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
   * Delete organization secret
   */
  async deleteOrganizationSecret(
    org: string, 
    secretName: string
  ): Promise<GitHubResponse<boolean>> {
    try {
      await this.octokit.rest.actions.deleteOrgSecret({
        org,
        secret_name: secretName
      });

      return {
        success: true,
        data: true,
        message: `Organization secret '${secretName}' deleted successfully`
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
   * Get repository public key for encryption
   */
  async getRepositoryPublicKey(
    owner: string, 
    repo: string
  ): Promise<GitHubResponse<{ keyId: string; key: string }>> {
    try {
      const { data } = await this.octokit.rest.actions.getRepoPublicKey({
        owner,
        repo
      });

      return {
        success: true,
        data: {
          keyId: data.key_id,
          key: data.key
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
   * Get organization public key for encryption
   */
  async getOrganizationPublicKey(
    org: string
  ): Promise<GitHubResponse<{ keyId: string; key: string }>> {
    try {
      const { data } = await this.octokit.rest.actions.getOrgPublicKey({
        org
      });

      return {
        success: true,
        data: {
          keyId: data.key_id,
          key: data.key
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
   * Map GitHub API secret data to our SecretInfo type
   */
  private mapSecretData(data: any): SecretInfo {
    return {
      name: data.name,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      visibility: data.visibility,
      selectedRepositories: data.selected_repositories?.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name
      }))
    };
  }
}
