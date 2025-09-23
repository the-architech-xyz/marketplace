/**
     * Generated TypeScript definitions for Next.js
     * Generated from: adapters/framework/nextjs/adapter.json
     */

/**
     * Parameters for the Next.js adapter
     */
export interface NextjsFrameworkParams {
  /**
   * Enable TypeScript support
   */
  typescript?: boolean;
  /**
   * Enable Tailwind CSS
   */
  tailwind?: boolean;
  /**
   * Enable ESLint
   */
  eslint?: boolean;
  /**
   * Use App Router (recommended)
   */
  appRouter?: boolean;
  /**
   * Use src/ directory
   */
  srcDir?: boolean;
  /**
   * Import alias for absolute imports
   */
  importAlias?: string;
}

/**
     * Features for the Next.js adapter
     */
export interface NextjsFrameworkFeatures {
  /**
   * Comprehensive API routes with middleware and error handling
   */
  api-routes?: boolean;
  /**
   * Advanced performance optimization tools for Next.js 15+
   */
  performance?: boolean;
  /**
   * Comprehensive security middleware and headers for Next.js 15+
   */
  security?: boolean;
  /**
   * Modern Server Actions implementation for Next.js 15+
   */
  server-actions?: boolean;
  /**
   * Next.js middleware for auth, redirects, and more
   */
  middleware?: boolean;
  /**
   * Next.js SEO tools with next-seo and sitemap generation
   */
  seo?: boolean;
}
