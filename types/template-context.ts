/**
 * Template Context Type Definitions
 * 
 * Standardized TypeScript interfaces for EJS template context variables.
 * All template context variables have been migrated from context.xxx to module.parameters.xxx.
 */

export interface ProjectContext {
  project: {
    name: string;
    framework: string;
    description?: string;
    version?: string;
    author?: string;
    license?: string;
  };
  module: {
    id: string;
    parameters: ModuleParameters;
  };
  framework: string;
  paths: {
    app_root: string;
    components: string;
    shared_library: string;
    styles: string;
    scripts: string;
    hooks: string;
  };
  modules?: Record<string, any>;
  databaseModule?: any;
  paymentModule?: any;
  authModule?: any;
  emailModule?: any;
  observabilityModule?: any;
  stateModule?: any;
  uiModule?: any;
  testingModule?: any;
  deploymentModule?: any;
  contentModule?: any;
  blockchainModule?: any;
}

export interface ModuleParameters {
  // UI Module Parameters
  hasTypography?: boolean;
  hasForms?: boolean;
  hasAspectRatio?: boolean;
  hasDarkMode?: boolean;
  
  // Quality Module Parameters
  hasTypeScript?: boolean;
  hasReact?: boolean;
  hasNextJS?: boolean;
  hasAccessibility?: boolean;
  hasImports?: boolean;
  hasFormat?: boolean;
  
  // State Module Parameters
  hasImmer?: boolean;
  
  // AI Module Parameters
  defaultModel?: string;
  maxTokens?: number;
  temperature?: number;
  hasStreaming?: boolean;
  hasChat?: boolean;
  hasTextGeneration?: boolean;
  hasImageGeneration?: boolean;
  hasEmbeddings?: boolean;
  hasFunctionCalling?: boolean;
  
  // Form Module Parameters
  hasAdvancedValidation?: boolean;
  
  // Email Module Parameters
  hasOrganizations?: boolean;
  hasTeams?: boolean;
  hasTemplates?: boolean;
  hasBulkEmail?: boolean;
  hasAnalytics?: boolean;
  
  // Payment Module Parameters
  currency?: string;
  
  // Welcome Page Parameters
  customTitle?: string;
  customDescription?: string;
  showTechStack?: boolean;
  showComponents?: boolean;
  showProjectStructure?: boolean;
  showQuickStart?: boolean;
  showArchitechBranding?: boolean;
  
  // TanStack Query Parameters
  devtools?: boolean;
  suspense?: boolean;
  defaultOptions?: {
    queries?: {
      staleTime?: number;
      gcTime?: number;
      retry?: number;
      refetchOnWindowFocus?: boolean;
    };
    mutations?: {
      retry?: number;
    };
  };
  
  // Generic parameters for extensibility
  [key: string]: any;
}

/**
 * Function Context Types
 * These are function parameters from libraries and should remain as context.
 */
export interface TanStackQueryContext {
  previousData?: any;
  queryKey?: any;
}

export interface TeamEmailContext {
  teamRole?: 'owner' | 'admin' | 'member';
  userId?: string;
  organizationId?: string;
  teamId?: string;
}

export interface PaymentContext {
  organizationId?: string;
  teamId?: string;
  canViewBilling?: boolean;
  canManageBilling?: boolean;
  canManageSeats?: boolean;
  canTrackUsage?: boolean;
}

/**
 * API Context Types
 * These represent API request/response context and should remain as context.
 */
export interface APIContext {
  request?: any;
  response?: any;
  session?: any;
  user?: any;
  organization?: any;
}

/**
 * Template Context Validation
 * Utility functions to validate template context usage
 */
export class TemplateContextValidator {
  /**
   * Validates that a context variable follows the new naming convention
   */
  static validateContextUsage(templateContent: string): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Check for deprecated context. usage (except function parameters and API context)
    const deprecatedPattern = /context\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const functionParams = ['previousData', 'queryKey', 'teamRole', 'organizationId', 'teamId'];
    const apiContext = ['request', 'response', 'session', 'user', 'organization'];
    
    let match;
    while ((match = deprecatedPattern.exec(templateContent)) !== null) {
      const property = match[1];
      
      if (!functionParams.includes(property) && !apiContext.includes(property)) {
        errors.push(`Deprecated context.${property} usage found. Use module.parameters.${property} instead.`);
      }
    }
    
    // Check for proper module.parameters usage
    const moduleParamsPattern = /module\.parameters\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const validModuleParams = [
      'hasTypography', 'hasForms', 'hasAspectRatio', 'hasDarkMode',
      'hasTypeScript', 'hasReact', 'hasNextJS', 'hasAccessibility', 'hasImports', 'hasFormat',
      'hasImmer', 'defaultModel', 'maxTokens', 'temperature', 'hasStreaming', 'hasChat',
      'hasTextGeneration', 'hasImageGeneration', 'hasEmbeddings', 'hasFunctionCalling',
      'hasAdvancedValidation', 'hasOrganizations', 'hasTeams', 'hasTemplates',
      'hasBulkEmail', 'hasAnalytics', 'currency', 'customTitle', 'customDescription',
      'showTechStack', 'showComponents', 'showProjectStructure', 'showQuickStart',
      'showArchitechBranding', 'devtools', 'suspense'
    ];
    
    while ((match = moduleParamsPattern.exec(templateContent)) !== null) {
      const property = match[1];
      
      if (!validModuleParams.includes(property)) {
        warnings.push(`Unknown module.parameters.${property} usage. Consider adding to type definitions.`);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  /**
   * Generates a migration report for a template file
   */
  static generateMigrationReport(templateContent: string): {
    needsMigration: boolean;
    deprecatedUsages: string[];
    recommendations: string[];
  } {
    const deprecatedUsages: string[] = [];
    const recommendations: string[] = [];
    
    const deprecatedPattern = /context\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const functionParams = ['previousData', 'queryKey', 'teamRole', 'organizationId', 'teamId'];
    const apiContext = ['request', 'response', 'session', 'user', 'organization'];
    
    let match;
    while ((match = deprecatedPattern.exec(templateContent)) !== null) {
      const property = match[1];
      
      if (!functionParams.includes(property) && !apiContext.includes(property)) {
        deprecatedUsages.push(`context.${property}`);
        recommendations.push(`Replace context.${property} with module.parameters.${property}`);
      }
    }
    
    return {
      needsMigration: deprecatedUsages.length > 0,
      deprecatedUsages,
      recommendations
    };
  }
}
