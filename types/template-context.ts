/**
 * Template Context Types
 * 
 * Extended ProjectContext with CLI-specific fields for template path resolution
 * and import path handling.
 * 
 * This extends the full ProjectContext from @thearchitech.xyz/types (agent.ts),
 * adding CLI-specific fields needed for blueprint template rendering.
 */

import type { ProjectContext as BaseProjectContext } from '@thearchitech.xyz/types';

/**
 * Extended ProjectContext for CLI template rendering
 * 
 * Adds CLI-specific fields:
 * - paths: Framework-specific path mappings (e.g., src, app, components)
 * - importPaths: Pre-computed import paths for templates
 * - importPath: Helper function to convert file paths to import paths
 */
export interface ProjectContext extends BaseProjectContext {
  /**
   * Framework-specific path mappings
   * Examples: { src: './src', app: './src/app', components: './src/components' }
   */
  paths?: Record<string, string>;
  
  /**
   * Pre-computed import paths for templates (optional)
   * Used for performance optimization in template rendering
   */
  importPaths?: Record<string, string>;
  
  /**
   * Helper function for converting file paths to import paths
   * Automatically adapts based on project structure (single-app vs monorepo)
   * 
   * @param filePath - File path to convert (e.g., './src/server/trpc/router')
   * @returns Import path (e.g., '@/server/trpc/router' or '@repo/api/router')
   * 
   * @example
   * ```ejs
   * import type { AppRouter } from '<%= importPath(paths.trpcRouter) %>';
   * ```
   */
  importPath?: (filePath: string) => string;
  
  /**
   * Environment variables context
   * Note: This is already in BaseProjectContext as `env`, but we keep it
   * here for clarity and to match CLI usage patterns
   */
  env?: Record<string, string>;
  
  /**
   * Additional parameters from genome options
   * Used for template variable access
   */
  parameters?: Record<string, any>;
  
  /**
   * Marketplace paths for template resolution
   * Resolved early in context creation for efficient access
   */
  marketplace?: {
    /**
     * Core marketplace path (features, adapters, connectors)
     */
    core: string;
    /**
     * UI marketplace paths by framework
     */
    ui: {
      /**
       * Default UI framework (auto-detected or specified)
       */
      default: string;
      /**
       * UI marketplace paths by framework name
       * e.g., { shadcn: '/path/to/marketplace-shadcn', tamagui: '/path/to/marketplace-tamagui' }
       */
      [framework: string]: string;
    };
  };
}

