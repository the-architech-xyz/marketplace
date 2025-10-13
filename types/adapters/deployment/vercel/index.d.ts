/**
 * Vercel Deployment
 * 
 * Pure Vercel deployment configuration for any framework
 */

export interface DeploymentVercelParams {

  /** Target framework */
  framework?: any;

  /** Build command to run */
  buildCommand?: any;

  /** Output directory for build */
  outputDirectory?: any;

  /** Install command */
  installCommand?: any;

  /** Development command */
  devCommand?: any;

  /** Environment variables to configure */
  envVars?: any;

  /** Serverless function configuration */
  functions: any;

  /** Enable Vercel Analytics */
  analytics?: any;

  /** Enable Vercel Speed Insights */
  speedInsights?: any;
}

export interface DeploymentVercelFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DeploymentVercelArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DeploymentVercelCreates = typeof DeploymentVercelArtifacts.creates[number];
export type DeploymentVercelEnhances = typeof DeploymentVercelArtifacts.enhances[number];
