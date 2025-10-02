/**
 * ESLint
 * 
 * Golden Core code linting with ESLint for JavaScript and TypeScript
 */

export interface QualityEslintParams {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable React support */
  react?: boolean;

  /** Enable Next.js specific rules */
  nextjs?: boolean;

  /** Enable Node.js specific rules */
  nodejs?: boolean;

  /** Enable accessibility rules */
  accessibility?: boolean;

  /** Enable import/export rules */
  imports?: boolean;

  /** Enable strict mode rules */
  strict?: boolean;

  /** Enable formatting rules */
  format?: boolean;
}

export interface QualityEslintFeatures {}

// 🚀 Auto-discovered artifacts
export declare const QualityEslintArtifacts: {
  creates: [
    '.eslintrc.js',
    '.eslintignore',
    'eslint.config.ts',
    'eslint-rules.js',
    'scripts/lint-staged.js',
    'scripts/eslint-fix.js'
  ],
  enhances: [],
  installs: [
    { packages: ['eslint'], isDev: true },
    { packages: ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'], isDev: true },
    { packages: ['eslint-plugin-react', 'eslint-plugin-react-hooks'], isDev: true },
    { packages: ['eslint-config-next'], isDev: true },
    { packages: ['eslint-plugin-node'], isDev: true },
    { packages: ['eslint-plugin-jsx-a11y'], isDev: true },
    { packages: ['eslint-plugin-import', 'eslint-plugin-import-resolver-typescript'], isDev: true },
    { packages: ['eslint-plugin-prettier', 'eslint-config-prettier'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type QualityEslintCreates = typeof QualityEslintArtifacts.creates[number];
export type QualityEslintEnhances = typeof QualityEslintArtifacts.enhances[number];
