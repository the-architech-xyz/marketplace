/**
 * Prettier
 * 
 * Golden Core code formatting with Prettier for consistent code style
 */

export interface QualityPrettierParams {

  /** Add semicolons at the end of statements */
  semi?: boolean;

  /** Use single quotes instead of double quotes */
  singleQuote?: boolean;

  /** Number of spaces per indentation level */
  tabWidth?: number;

  /** Use tabs instead of spaces for indentation */
  useTabs?: boolean;

  /** Print trailing commas where valid in ES5 */
  trailingComma?: 'none' | 'es5' | 'all';

  /** Wrap lines that exceed this length */
  printWidth?: number;

  /** Print spaces between brackets in object literals */
  bracketSpacing?: boolean;

  /** Include parentheses around a sole arrow function parameter */
  arrowParens?: 'avoid' | 'always';

  /** Line ending style */
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';

  /** Prettier plugins to use */
  plugins?: string[];
}

export interface QualityPrettierFeatures {}

// 🚀 Auto-discovered artifacts
export declare const QualityPrettierArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type QualityPrettierCreates = typeof QualityPrettierArtifacts.creates[number];
export type QualityPrettierEnhances = typeof QualityPrettierArtifacts.enhances[number];
