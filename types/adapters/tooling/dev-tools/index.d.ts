/**
 * Development Tools
 * 
 * Essential development tools for code quality, formatting, and git hooks
 */

export interface ToolingDevToolsParams {

  /** Enable Prettier for code formatting */
  prettier?: boolean;

  /** Enable Husky for git hooks */
  husky?: boolean;

  /** Enable lint-staged for pre-commit hooks */
  lintStaged?: boolean;

  /** Enable commitlint for commit message validation */
  commitlint?: boolean;

  /** Enable ESLint configuration */
  eslint?: boolean;
}

export interface ToolingDevToolsFeatures {}

// 🚀 Auto-discovered artifacts
export declare const ToolingDevToolsArtifacts: {
  creates: [
    '.prettierrc',
    '.prettierignore',
    '.husky/pre-commit',
    '.lintstagedrc',
    'commitlint.config.js',
    '.eslintrc.js'
  ],
  enhances: [],
  installs: [
    { packages: ['prettier'], isDev: true },
    { packages: ['husky'], isDev: true },
    { packages: ['lint-staged'], isDev: true },
    { packages: ['@commitlint/cli', '@commitlint/config-conventional'], isDev: true },
    { packages: ['eslint'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type ToolingDevToolsCreates = typeof ToolingDevToolsArtifacts.creates[number];
export type ToolingDevToolsEnhances = typeof ToolingDevToolsArtifacts.enhances[number];
