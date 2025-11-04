/**
 * React Native
 * 
 * A framework for building native apps using React
 */

export interface FrameworkReactNativeParams {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;

  /** React version to use */
  reactVersion?: string;

  platforms: any;
}

export interface FrameworkReactNativeFeatures {}

// 🚀 Auto-discovered artifacts
export declare const FrameworkReactNativeArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FrameworkReactNativeCreates = typeof FrameworkReactNativeArtifacts.creates[number];
export type FrameworkReactNativeEnhances = typeof FrameworkReactNativeArtifacts.enhances[number];
