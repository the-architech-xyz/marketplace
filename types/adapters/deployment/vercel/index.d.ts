/**
 * Vercel Deployment
 * 
 * Pure Vercel deployment configuration for any framework
 */

export interface DeploymentVercelParams {

  /** Target framework */
  framework: string;

  /** Build command to run */
  buildCommand: string;

  /** Output directory for build */
  outputDirectory: string;

  /** Install command */
  installCommand: string;

  /** Development command */
  devCommand: string;

  /** Environment variables to configure */
  envVars: string[];

  /** Serverless function configuration */
  functions: Record<string, any>;
}

export interface DeploymentVercelFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DeploymentVercelArtifacts: {
  creates: [
    'vercel.json',
    '.vercelignore',
    '.env.example',
    'scripts/deploy.sh'
  ],
  enhances: [
    'package.json'
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DeploymentVercelCreates = typeof DeploymentVercelArtifacts.creates[number];
export type DeploymentVercelEnhances = typeof DeploymentVercelArtifacts.enhances[number];
