/**
 * The Architech Marketplace Type Definitions
 */

/**
 * Get the marketplace root directory
 */
export function getMarketplaceRoot(): string;

/**
 * Load the marketplace manifest
 */
export function loadManifest(): MarketplaceManifest;

/**
 * Load an adapter configuration
 */
export function loadAdapter(category: string, adapterId: string): any;

/**
 * Load an integration configuration
 */
export function loadIntegration(integrationId: string): any;

/**
 * Load a blueprint file (TypeScript)
 */
export function loadBlueprint(category: string, moduleId: string, type?: 'adapter' | 'integration'): string;

/**
 * Get all available adapters
 */
export function getAllAdapters(): any[];

/**
 * Get all available integrations
 */
export function getAllIntegrations(): any[];

/**
 * Check if an adapter exists
 */
export function adapterExists(category: string, adapterId: string): boolean;

/**
 * Check if an integration exists
 */
export function integrationExists(integrationId: string): boolean;

/**
 * Marketplace Manifest Structure
 */
export interface MarketplaceManifest {
  version: string;
  modules?: {
    adapters?: ModuleMetadata[];
    connectors?: ModuleMetadata[];
    features?: FeatureMetadata[];
  };
  genomes?: GenomeMetadata[];
}

export interface ModuleMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  dependencies?: string[];
  conflicts?: string[];
  tags?: string[];
}

export interface FeatureMetadata extends ModuleMetadata {
  backend?: {
    technologies: string[];
    dependencies?: string[];
  };
  frontend?: {
    technologies: string[];
    dependencies?: string[];
  };
  database?: {
    required: boolean;
    providers?: string[];
  };
  auth?: {
    required: boolean;
    providers?: string[];
  };
}

export interface GenomeMetadata {
  id: string;
  name: string;
  description: string;
  complexity: 'simple' | 'intermediate' | 'advanced';
  modules: string[];
  tags?: string[];
}

// Re-export types from types package
export * from '@thearchitech.xyz/types';

