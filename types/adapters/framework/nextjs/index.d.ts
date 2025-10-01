/**
 * Next.js
 * 
 * The React Framework for Production
 */

export interface FrameworkNextjsParams {

  /** Enable TypeScript support */
  typescript?: boolean;

  /** Enable Tailwind CSS */
  tailwind?: boolean;

  /** Enable ESLint */
  eslint?: boolean;

  /** Use App Router (recommended) */
  appRouter?: boolean;

  /** Use src/ directory */
  srcDir?: boolean;

  /** Import alias for absolute imports */
  importAlias?: string;
}

export interface FrameworkNextjsFeatures {}

// 🚀 Auto-discovered artifacts
export declare const FrameworkNextjsArtifacts: {
  creates: [
    'tailwind.config.js',
    'components.json'
  ],
  enhances: [
    'src/app/globals.css'
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FrameworkNextjsCreates = typeof FrameworkNextjsArtifacts.creates[number];
export type FrameworkNextjsEnhances = typeof FrameworkNextjsArtifacts.enhances[number];
