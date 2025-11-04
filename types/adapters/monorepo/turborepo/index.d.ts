/**
 * Turborepo
 * 
 * High-performance build system for JavaScript/TypeScript monorepos with intelligent caching and task orchestration
 */

export interface MonorepoTurborepoParams {

  /** Package manager (npm, yarn, pnpm, bun) */
  packageManager?: string;

  /** Enable remote caching with Vercel */
  remoteCaching?: boolean;
}

export interface MonorepoTurborepoFeatures {}

// 🚀 Auto-discovered artifacts
export declare const MonorepoTurborepoArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type MonorepoTurborepoCreates = typeof MonorepoTurborepoArtifacts.creates[number];
export type MonorepoTurborepoEnhances = typeof MonorepoTurborepoArtifacts.enhances[number];
