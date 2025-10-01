/**
 * Docker Deployment
 * 
 * Containerization and deployment setup with Docker
 */

export interface DeploymentDockerParams {

  /** Node.js version for Docker image */
  nodeVersion?: string;

  /** Enable production optimizations */
  optimization?: boolean;

  /** Enable health check endpoint */
  healthCheck?: boolean;
}

export interface DeploymentDockerFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DeploymentDockerArtifacts: {
  creates: [
    'Dockerfile',
    '.dockerignore'
  ],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DeploymentDockerCreates = typeof DeploymentDockerArtifacts.creates[number];
export type DeploymentDockerEnhances = typeof DeploymentDockerArtifacts.enhances[number];
