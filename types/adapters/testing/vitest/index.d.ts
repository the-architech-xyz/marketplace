/**
     * Generated TypeScript definitions for Vitest
     * Generated from: adapters/testing/vitest/adapter.json
     */

/**
     * Parameters for the Vitest adapter
     */
export interface VitestTestingParams {
  /**
   * Enable code coverage reporting
   */
  coverage?: boolean;
  /**
   * Enable watch mode for development
   */
  watch?: boolean;
  /**
   * Enable Vitest UI
   */
  ui?: boolean;
  /**
   * Enable JSX support for React testing
   */
  jsx?: boolean;
  /**
   * Test environment
   */
  environment?: string;
}

/**
     * Features for the Vitest adapter
     */
export interface VitestTestingFeatures {
  /**
   * Comprehensive code coverage reporting with HTML and LCOV reports
   */
  coverage?: boolean;
  /**
   * Interactive web-based test runner interface
   */
  ui?: boolean;
}
