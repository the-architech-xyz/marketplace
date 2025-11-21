/**
 * Schema Loader Utility
 * 
 * Centralized utility for loading JSON schema files (schema.json).
 * All modules use schema.json regardless of type (adapter, connector, feature).
 * Single source of truth for schema loading across all marketplace scripts.
 * 
 * Reused from: ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema()
 * 
 * @author The Architech Team
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Load JSON schema file (schema.json)
 * 
 * @param filePath - Full path to the JSON schema file
 * @returns Parsed JSON object or empty object if file doesn't exist or is invalid
 * 
 * @example
 * ```typescript
 * const schema = loadSchema('/path/to/adapters/auth/better-auth/schema.json');
 * ```
 */
export function loadSchema(filePath: string): any {
  try {
    if (!fs.existsSync(filePath)) {
      return {};
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️ Failed to load schema from ${filePath}:`, error instanceof Error ? error.message : 'Unknown error');
    return {};
  }
}

/**
 * Load schema for a module by ID
 * 
 * @param moduleId - Module ID (e.g., 'auth/better-auth', 'connectors/auth/better-auth-nextjs', 'features/auth/frontend')
 * @param moduleType - Type of module ('adapter' | 'connector' | 'feature')
 * @param marketplacePath - Root path to the marketplace directory
 * @returns Parsed JSON schema object or empty object if not found
 * 
 * @example
 * ```typescript
 * const adapterSchema = loadModuleSchema('auth/better-auth', 'adapter', '/path/to/marketplace');
 * const connectorSchema = loadModuleSchema('connectors/auth/better-auth-nextjs', 'connector', '/path/to/marketplace');
 * const featureSchema = loadModuleSchema('features/auth/frontend', 'feature', '/path/to/marketplace');
 * ```
 */
export function loadModuleSchema(
  moduleId: string,
  moduleType: 'adapter' | 'connector' | 'feature',
  marketplacePath: string
): any {
  let schemaPath: string;
  
  // All modules use schema.json (standardized naming)
  if (moduleType === 'adapter') {
    // adapters/auth/better-auth -> adapters/auth/better-auth/schema.json
    schemaPath = path.join(marketplacePath, 'adapters', moduleId, 'schema.json');
  } else if (moduleType === 'connector') {
    // connectors/auth/better-auth-nextjs -> connectors/auth/better-auth-nextjs/schema.json
    const connectorPath = moduleId.replace(/^connectors\//, '');
    schemaPath = path.join(marketplacePath, 'connectors', connectorPath, 'schema.json');
  } else if (moduleType === 'feature') {
    // features/auth/frontend -> features/auth/frontend/schema.json
    const featurePath = moduleId.replace(/^features\//, '');
    schemaPath = path.join(marketplacePath, 'features', featurePath, 'schema.json');
  } else {
    return {};
  }
  
  return loadSchema(schemaPath);
}

/**
 * Extract parameters from a schema object
 * 
 * @param schema - Schema object (from schema.json)
 * @returns Parameters object or empty object
 */
export function extractParameters(schema: any): Record<string, any> {
  return schema?.parameters || {};
}

/**
 * Extract features object from parameters (if it exists)
 * 
 * @param parameters - Parameters object
 * @returns Features object or undefined
 */
export function extractFeatures(parameters: Record<string, any>): Record<string, any> | undefined {
  return parameters?.features;
}
