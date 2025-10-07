/**
 * Vitest
 * 
 * Fast unit test framework powered by Vite
 */

export interface TestingVitestParams {

  /** Enable code coverage reporting */
  coverage?: boolean;

  /** Enable watch mode for development */
  watch?: boolean;

  /** Enable Vitest UI */
  ui?: boolean;

  /** Enable JSX support for React testing */
  jsx?: boolean;

  /** Test environment */
  environment?: string;
}

export interface TestingVitestFeatures {}

// 🚀 Auto-discovered artifacts
export declare const TestingVitestArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type TestingVitestCreates = typeof TestingVitestArtifacts.creates[number];
export type TestingVitestEnhances = typeof TestingVitestArtifacts.enhances[number];
