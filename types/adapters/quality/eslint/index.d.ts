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
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type QualityEslintCreates = typeof QualityEslintArtifacts.creates[number];
export type QualityEslintEnhances = typeof QualityEslintArtifacts.enhances[number];
