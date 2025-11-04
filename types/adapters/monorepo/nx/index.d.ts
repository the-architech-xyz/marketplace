/**
 * Nx
 * 
 * Smart, extensible build framework for monorepos with powerful dev tools and code generation
 */

export interface MonorepoNxParams {

  /** Package manager (npm, yarn, pnpm) */
  packageManager?: string;

  /** Enable Nx Cloud for distributed caching */
  nxCloud?: boolean;
}

export interface MonorepoNxFeatures {}

// 🚀 Auto-discovered artifacts
export declare const MonorepoNxArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type MonorepoNxCreates = typeof MonorepoNxArtifacts.creates[number];
export type MonorepoNxEnhances = typeof MonorepoNxArtifacts.enhances[number];
