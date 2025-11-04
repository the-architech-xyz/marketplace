/**
 * UI Parameter Filter Utility
 * 
 * Filters UI-specific parameters from frontend feature parameters.
 * UI-specific parameters (theme, tokens, variants, etc.) are handled by UI adapters
 * (Shadcn, Tamagui, etc.) and should NOT be in capability-level frontend parameters.
 * 
 * Frontend capability parameters should be UI-agnostic (work with any UI library).
 * 
 * @author The Architech Team
 */

/**
 * Known UI-specific parameters that should not be in frontend capability params.
 * These are handled by UI adapters (Shadcn, Tamagui, etc.), not by capability features.
 */
const UI_SPECIFIC_PARAMS = [
  'theme',        // Shadcn theme system (e.g., 'default', 'dark', 'light', 'minimal')
  'tokens',       // Tamagui design tokens
  'variants',     // Component variants (e.g., { size: 'sm' | 'md' | 'lg' })
  'colors',       // Color schemes and palettes
  'spacing',      // Spacing tokens
  'typography',   // Typography tokens
  'radius',       // Border radius tokens
  'shadows',      // Shadow tokens
  'animations',   // Animation tokens
  'breakpoints',  // Responsive breakpoints
] as const;

/**
 * Check if a parameter name is UI-specific
 * 
 * @param paramName - Parameter name to check
 * @returns True if parameter is UI-specific
 * 
 * @example
 * ```typescript
 * isUISpecificParam('theme') // Returns: true
 * isUISpecificParam('signIn') // Returns: false
 * ```
 */
export function isUISpecificParam(paramName: string): boolean {
  return UI_SPECIFIC_PARAMS.includes(paramName as any);
}

/**
 * Filter UI-specific parameters from a parameters object.
 * Only keeps UI-agnostic parameters that work with any UI library.
 * 
 * @param params - Parameters object to filter
 * @returns Filtered parameters object (without UI-specific params)
 * 
 * @example
 * ```typescript
 * const params = {
 *   features: { signIn: true, signUp: true },
 *   theme: 'dark',  // UI-specific
 *   tokens: {...}   // UI-specific
 * };
 * 
 * const filtered = filterUISpecificParams(params);
 * // Returns: { features: { signIn: true, signUp: true } }
 * ```
 */
export function filterUISpecificParams(params: Record<string, any>): Record<string, any> {
  if (!params || typeof params !== 'object') {
    return {};
  }
  
  const filtered: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(params)) {
    // Skip UI-specific parameters
    if (isUISpecificParam(key)) {
      continue;
    }
    
    // Recursively filter nested objects (e.g., parameters.features)
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const filteredNested = filterUISpecificParams(value);
      // Only add if filtered object has properties
      if (Object.keys(filteredNested).length > 0) {
        filtered[key] = filteredNested;
      }
    } else {
      // Keep non-UI-specific parameters
      filtered[key] = value;
    }
  }
  
  return filtered;
}

/**
 * Validate that frontend parameters are UI-agnostic
 * 
 * @param params - Frontend parameters to validate
 * @returns Validation result with errors and warnings
 * 
 * @example
 * ```typescript
 * const result = validateUIAgnostic({
 *   features: { signIn: true },
 *   theme: 'dark' // This would be flagged
 * });
 * // result.errors = ["UI-specific parameter 'theme' found in frontend params"]
 * ```
 */
export function validateUIAgnostic(params: Record<string, any>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!params || typeof params !== 'object') {
    return { valid: true, errors, warnings };
  }
  
  for (const [key, value] of Object.entries(params)) {
    if (isUISpecificParam(key)) {
      errors.push(`UI-specific parameter '${key}' found in frontend capability parameters. This should be handled by the UI adapter (Shadcn, Tamagui, etc.), not by the capability feature.`);
    }
    
    // Recursively validate nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedResult = validateUIAgnostic(value);
      errors.push(...nestedResult.errors);
      warnings.push(...nestedResult.warnings);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get list of all UI-specific parameter names
 * 
 * @returns Array of UI-specific parameter names
 */
export function getUISpecificParams(): readonly string[] {
  return UI_SPECIFIC_PARAMS;
}
