/**
 * Docker Next.js Integration
 * 
 * Complete Docker containerization for Next.js applications with multi-stage builds, optimization, and production-ready configuration
 */

export interface DockerNextjsIntegrationParams {

  /** Optimized multi-stage Docker builds for production */
  multiStageBuild: boolean;

  /** Docker setup for development with hot reloading */
  developmentMode: boolean;

  /** Production-ready Docker configuration with optimization */
  productionMode: boolean;

  /** Nginx configuration for reverse proxy and static file serving */
  nginxReverseProxy: boolean;

  /** SSL/TLS configuration and certificate management */
  sslSupport: boolean;

  /** Docker health checks and monitoring endpoints */
  healthChecks: boolean;

  /** Environment-specific configuration management */
  environmentConfig: boolean;

  /** Docker volumes for persistent data and logs */
  volumeManagement: boolean;

  /** Docker networking configuration and service discovery */
  networking: boolean;

  /** Docker monitoring with Prometheus and Grafana */
  monitoring: boolean;

  /** Backup and restore scripts for data persistence */
  backupRestore: boolean;

  /** Security hardening and best practices */
  securityHardening: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const DockerNextjsIntegrationArtifacts: {
  creates: [
    'Dockerfile',
    '.dockerignore'
  ],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DockerNextjsIntegrationCreates = typeof DockerNextjsIntegrationArtifacts.creates[number];
export type DockerNextjsIntegrationEnhances = typeof DockerNextjsIntegrationArtifacts.enhances[number];
