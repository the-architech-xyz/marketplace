/**
 * Module ID Extractor Utility
 * 
 * Centralized utility for extracting module IDs from file paths.
 * Single source of truth for module ID extraction across all marketplace scripts.
 * 
 * Reused from: processModuleFile() in generate-marketplace-manifest.ts
 *              extractModuleId() in capability-analyzer.ts
 * 
 * @author The Architech Team
 */

/**
 * Extract module ID from file path
 * 
 * @param filePath - File path (e.g., 'adapters/auth/better-auth/adapter.json')
 * @param type - Type of module ('adapter' | 'connector' | 'feature')
 * @returns Module ID or null if path is invalid
 * 
 * @example
 * ```typescript
 * // Adapters
 * extractModuleId('adapters/auth/better-auth/adapter.json', 'adapter')
 * // Returns: 'auth/better-auth'
 * 
 * // Connectors
 * extractModuleId('connectors/auth/better-auth-nextjs/connector.json', 'connector')
 * // Returns: 'connectors/auth/better-auth-nextjs'
 * 
 * // Features
 * extractModuleId('features/auth/frontend/feature.json', 'feature')
 * // Returns: 'features/auth/frontend'
 * ```
 */
export function extractModuleId(
  filePath: string,
  type: 'adapter' | 'connector' | 'feature'
): string | null {
  const pathParts = filePath.split('/').filter(part => part.length > 0);
  
  if (type === 'adapter') {
    // adapters/auth/better-auth/adapter.json -> auth/better-auth
    // Expected path: adapters/[category]/[provider]/adapter.json
    if (pathParts.length < 3 || pathParts[0] !== 'adapters') {
      return null;
    }
    // Skip 'adapters' prefix and 'adapter.json' suffix
    return pathParts.slice(1, -1).join('/');
  } 
  
  if (type === 'connector') {
    // connectors/auth/better-auth-nextjs/connector.json -> connectors/auth/better-auth-nextjs
    // Expected path: connectors/[category]/[name]/connector.json
    if (pathParts.length < 3 || pathParts[0] !== 'connectors') {
      return null;
    }
    // Keep 'connectors/' prefix, skip 'connector.json' suffix
    return `connectors/${pathParts.slice(1, -1).join('/')}`;
  } 
  
  if (type === 'feature') {
    // features/auth/frontend/feature.json -> features/auth/frontend
    // Expected path: features/[capability]/[layer]/feature.json
    if (pathParts.length < 3 || pathParts[0] !== 'features') {
      return null;
    }
    // Keep 'features/' prefix, skip 'feature.json' suffix
    return `features/${pathParts.slice(1, -1).join('/')}`;
  }
  
  return null;
}

/**
 * Extract module ID from file path (auto-detect type from path)
 * 
 * @param filePath - File path
 * @returns Object with moduleId and type, or null if path is invalid
 */
export function extractModuleIdAuto(filePath: string): { moduleId: string; type: 'adapter' | 'connector' | 'feature' } | null {
  if (filePath.includes('/adapter.json')) {
    const moduleId = extractModuleId(filePath, 'adapter');
    return moduleId ? { moduleId, type: 'adapter' as const } : null;
  }
  
  if (filePath.includes('/connector.json')) {
    const moduleId = extractModuleId(filePath, 'connector');
    return moduleId ? { moduleId, type: 'connector' as const } : null;
  }
  
  if (filePath.includes('/feature.json')) {
    const moduleId = extractModuleId(filePath, 'feature');
    return moduleId ? { moduleId, type: 'feature' as const } : null;
  }
  
  return null;
}

/**
 * Extract capability category from module ID
 * 
 * @param moduleId - Module ID
 * @returns Capability category or null if not a capability module
 * 
 * @example
 * ```typescript
 * extractCapabilityCategory('auth/better-auth') // Returns: 'auth'
 * extractCapabilityCategory('adapters/payment/stripe') // Returns: null (infrastructure)
 * extractCapabilityCategory('features/auth/frontend') // Returns: 'auth'
 * ```
 */
export function extractCapabilityCategory(moduleId: string): string | null {
  const parts = moduleId.split('/');
  
  // Infrastructure categories (not capabilities)
  const infrastructureCategories = [
    'core', 'framework', 'monorepo', 'ui', 'data-fetching', 
    'database', 'deployment', 'observability', 'services', 'content',
    'blockchain', 'testing', 'infrastructure', 'integrations'
  ];
  
  // Main capabilities
  const mainCapabilities = ['auth', 'payments', 'emailing', 'ai-chat', 'teams-management', 'monitoring'];
  
  if (parts.length >= 2) {
    // For adapters: format is "auth/better-auth" - first part is capability
    // For features: format is "features/auth/frontend" - second part is capability
    // For connectors: format is "connectors/auth/better-auth-nextjs" - second part is capability
    
    let category: string;
    
    if (parts[0] === 'adapters' || parts[0] === 'connectors' || parts[0] === 'features') {
      // Has prefix: features/auth/frontend -> category is parts[1]
      category = parts[1];
    } else {
      // No prefix: auth/better-auth -> category is parts[0]
      category = parts[0];
    }
    
    if (infrastructureCategories.includes(category)) {
      return null; // Not a capability
    }
    
    // Handle specific mappings
    if (category === 'payment') return 'payments';
    if (category === 'email') return 'emailing';
    
    // Direct capability matches
    if (mainCapabilities.includes(category)) {
      return category;
    }
  }
  
  return null;
}

/**
 * Extract provider name from adapter module ID
 * 
 * @param moduleId - Adapter module ID (e.g., 'auth/better-auth')
 * @returns Provider name or null if invalid
 * 
 * @example
 * ```typescript
 * extractProvider('auth/better-auth') // Returns: 'better-auth'
 * extractProvider('payment/stripe') // Returns: 'stripe'
 * ```
 */
export function extractProvider(moduleId: string): string | null {
  const parts = moduleId.split('/');
  // For adapters, format is: category/provider
  if (parts.length >= 2) {
    return parts[parts.length - 1]; // Last part is the provider
  }
  return null;
}

/**
 * Extract layer from feature module ID
 * 
 * @param moduleId - Feature module ID (e.g., 'features/auth/frontend')
 * @returns Layer name ('frontend' | 'tech-stack' | 'backend' | 'database') or null
 * 
 * @example
 * ```typescript
 * extractLayer('features/auth/frontend') // Returns: 'frontend'
 * extractLayer('features/auth/tech-stack') // Returns: 'tech-stack'
 * ```
 */
export function extractLayer(moduleId: string): 'frontend' | 'tech-stack' | 'backend' | 'database' | null {
  if (moduleId.includes('/frontend')) {
    return 'frontend';
  }
  if (moduleId.includes('/tech-stack')) {
    return 'tech-stack';
  }
  if (moduleId.includes('/backend')) {
    return 'backend';
  }
  if (moduleId.includes('/database')) {
    return 'database';
  }
  return null;
}
