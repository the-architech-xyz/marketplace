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
