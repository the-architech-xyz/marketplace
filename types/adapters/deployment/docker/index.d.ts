/**
     * Generated TypeScript definitions for Docker Deployment
     * Generated from: adapters/deployment/docker/adapter.json
     */

/**
     * Parameters for the Docker Deployment adapter
     */
export interface DockerDeploymentParams {
  /**
   * Node.js version for Docker image
   */
  nodeVersion?: string;
  /**
   * Enable production optimizations
   */
  optimization?: boolean;
  /**
   * Enable health check endpoint
   */
  healthCheck?: boolean;
}

/**
     * Features for the Docker Deployment adapter
     */
export interface DockerDeploymentFeatures {
  /**
   * Optimized multi-stage Docker builds for production
   */
  multi-stage?: boolean;
  /**
   * Production-ready configuration with security and monitoring
   */
  production-ready?: boolean;
}
