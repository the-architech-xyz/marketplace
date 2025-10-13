/**
 * Next.js
 * 
 * The React Framework for Production
 */

export interface FrameworkNextjsParams {

  /** Enable TypeScript support */
  typescript?: any;

  /** Enable Tailwind CSS */
  tailwind?: any;

  /** Enable ESLint */
  eslint?: any;

  /** Use App Router (recommended) */
  appRouter?: any;

  /** Use src/ directory */
  srcDir?: any;

  /** Import alias for absolute imports */
  importAlias?: any;

  /** React version to use (18 for Radix UI compatibility, 19 for latest, or specify exact version like '18.2.0') */
  reactVersion?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable SEO optimization features */
    seo?: boolean;

    /** Enable Next.js image optimization */
    imageOptimization?: boolean;

    /** Enable MDX support for markdown content */
    mdx?: boolean;

    /** Enable performance optimization features */
    performance?: boolean;

    /** Enable streaming features */
    streaming?: boolean;

    /** Enable internationalization features */
    i18n?: boolean;
  };
}

export interface FrameworkNextjsFeatures {

  /** Enable SEO optimization features */
  seo: boolean;

  /** Enable Next.js image optimization */
  imageOptimization: boolean;

  /** Enable MDX support for markdown content */
  mdx: boolean;

  /** Enable performance optimization features */
  performance: boolean;

  /** Enable streaming features */
  streaming: boolean;

  /** Enable internationalization features */
  i18n: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const FrameworkNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FrameworkNextjsCreates = typeof FrameworkNextjsArtifacts.creates[number];
export type FrameworkNextjsEnhances = typeof FrameworkNextjsArtifacts.enhances[number];
