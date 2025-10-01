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
  creates: [
    'vitest.config.ts',
    'tests/setup/setup.ts',
    'tests/setup/utils.tsx',
    'tests/unit/example.test.tsx'
  ],
  enhances: [],
  installs: [
    { packages: ['vitest', '@vitejs/plugin-react', 'jsdom', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event', '@types/react', '@types/react-dom'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type TestingVitestCreates = typeof TestingVitestArtifacts.creates[number];
export type TestingVitestEnhances = typeof TestingVitestArtifacts.enhances[number];
