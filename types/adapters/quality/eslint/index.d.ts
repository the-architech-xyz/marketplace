/**
 * ESLint
 * 
 * Golden Core code linting with ESLint for JavaScript and TypeScript
 */

export interface QualityEslintParams {

  /** Enable TypeScript support */
  typescript?: any;

  /** Enable React support */
  react?: any;

  /** Enable Next.js specific rules */
  nextjs?: any;

  /** Enable Node.js specific rules */
  nodejs?: any;

  /** Enable accessibility rules */
  accessibility?: any;

  /** Enable import/export rules */
  imports?: any;

  /** Enable strict mode rules */
  strict?: any;

  /** Enable formatting rules */
  format?: any;
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
