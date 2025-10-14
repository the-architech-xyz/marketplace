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
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable development environment */
    development?: boolean;

    /** Enable production environment */
    production?: boolean;

    /** Enable docker-compose setup */
    compose?: boolean;
  };
}

export interface DeploymentDockerFeatures {

  /** Enable development environment */
  development: boolean;

  /** Enable production environment */
  production: boolean;

  /** Enable docker-compose setup */
  compose: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const DeploymentDockerArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DeploymentDockerCreates = typeof DeploymentDockerArtifacts.creates[number];
export type DeploymentDockerEnhances = typeof DeploymentDockerArtifacts.enhances[number];
