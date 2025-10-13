/**
 * Vitest
 * 
 * Fast unit test framework powered by Vite
 */

export interface TestingVitestParams {

  /** Test environment */
  environment?: 'jsdom' | 'node' | 'happy-dom';
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic testing setup (config, setup, utils) */
    core?: boolean;

    /** Unit testing capabilities */
    unitTests?: boolean;

    /** Code coverage reporting */
    coverage?: boolean;

    /** Interactive test runner UI */
    ui?: boolean;

    /** End-to-end testing support */
    e2e?: boolean;

    /** Integration testing support */
    integrationTests?: boolean;
  };
}

export interface TestingVitestFeatures {

  /** Basic testing setup (config, setup, utils) */
  core: boolean;

  /** Unit testing capabilities */
  unitTests: boolean;

  /** Code coverage reporting */
  coverage: boolean;

  /** Interactive test runner UI */
  ui: boolean;

  /** End-to-end testing support */
  e2e: boolean;

  /** Integration testing support */
  integrationTests: boolean;
}

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
