/**
 * React Native with Expo
 * 
 * A framework for building native apps using React Native and Expo
 */

export interface FrameworkExpoParams {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  /** Use Expo Router for navigation */
  expoRouter?: boolean;

  platforms: any;
}

export interface FrameworkExpoFeatures {}

// 🚀 Auto-discovered artifacts
export declare const FrameworkExpoArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FrameworkExpoCreates = typeof FrameworkExpoArtifacts.creates[number];
export type FrameworkExpoEnhances = typeof FrameworkExpoArtifacts.enhances[number];
