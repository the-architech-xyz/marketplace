/**
 * Capability Analyzer
 * 
 * Analyzes marketplace modules to identify capability patterns, providers, and layers.
 * Generates capability schemas and parameter types for capability-driven genomes.
 * 
 * Enhanced to support new capability-first structure with:
 * - Provider-specific adapter parameters
 * - UI-agnostic frontend parameters
 * - Standardized tech-stack parameters
 * - Shared parameters across layers
 * 
 * @author The Architech Team
 * @version 2.0.0
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
// import { loadModuleSchema } from '../utilities/schema-loader.js'; // Reserved for future use
import { extractModuleId, extractCapabilityCategory, extractProvider, extractLayer } from '../utilities/module-id-extractor.js';
import { filterUISpecificParams } from '../utilities/ui-param-filter.js';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CapabilityInfo {
  providers: Set<string>;
  layers: Set<string>;
  adapters: Set<string>;
  connectors: Set<string>;
  features: Set<string>;
  
  // NEW: Layer-separated parameter storage
  adapterParameters: Map<string, Record<string, any>>;  // provider -> params (from adapter.json)
  frontendParameters: Map<string, Record<string, any>>; // layer -> params (UI-agnostic only)
  techStackParameters: Map<string, Record<string, any>>; // layer -> params (standardized)
  backendParameters: Map<string, Record<string, any>>;  // layer -> params
  databaseParameters: Map<string, Record<string, any>>;   // layer -> params
  sharedParameters: Map<string, any>;                     // shared params across layers
  
  // Legacy: Keep for backward compatibility during transition
  parameters: Map<string, any>;
}

interface BlueprintAnalysisResult {
  parameters?: any;
  features?: any;
  providers?: any;
  layers?: any;
}

// ============================================================================
// CAPABILITY ANALYZER CLASS
// ============================================================================

export class CapabilityAnalyzer {
  private capabilities: Map<string, CapabilityInfo> = new Map();
  private marketplacePath: string;

  constructor(marketplacePath: string) {
    this.marketplacePath = marketplacePath;
  }

  /**
   * Analyze all modules in the marketplace to identify capabilities
   */
  async analyzeCapabilities(): Promise<Map<string, CapabilityInfo>> {
    console.log('🔍 Analyzing marketplace for capability patterns...');
    
    // Find all modules
    const moduleFiles = await glob('**/*.json', { 
      cwd: this.marketplacePath,
      ignore: ['node_modules/**', 'types/**', 'scripts/**', 'genomes/**']
    });

    console.log(`📊 Found ${moduleFiles.length} modules to analyze`);

    // Analyze each module
    for (const file of moduleFiles) {
      await this.analyzeModule(file);
    }

    console.log(`🎯 Identified ${this.capabilities.size} capabilities:`);
    for (const [capability, info] of this.capabilities) {
      console.log(`  - ${capability}: ${info.providers.size} providers, ${info.layers.size} layers`);
    }

    return this.capabilities;
  }

  /**
   * Analyze a single module file
   */
  private async analyzeModule(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(this.marketplacePath, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      const module = JSON.parse(content);

      // Extract module ID from file path
      const moduleId = this.extractModuleId(filePath);
      if (!moduleId) return;

      // Determine capability category
      const capability = this.extractCapabilityCategory(moduleId);
      if (!capability) return;
      
      // Initialize capability info if not exists
      if (!this.capabilities.has(capability)) {
        this.capabilities.set(capability, {
          providers: new Set(),
          layers: new Set(),
          adapters: new Set(),
          connectors: new Set(),
          features: new Set(),
          adapterParameters: new Map(),
          frontendParameters: new Map(),
          techStackParameters: new Map(),
          backendParameters: new Map(),
          databaseParameters: new Map(),
          sharedParameters: new Map(),
          parameters: new Map() // Legacy
        });
      }

      const capabilityInfo = this.capabilities.get(capability)!;

      // Determine module type from file path
      const moduleType = filePath.includes('/adapter.json') ? 'adapter' 
        : filePath.includes('/connector.json') ? 'connector'
        : filePath.includes('/feature.json') ? 'feature'
        : null;
      
      if (!moduleType) return;

      // Analyze based on module type
      try {
        if (moduleType === 'adapter') {
          this.analyzeAdapterModule(moduleId, capabilityInfo, module);
        } else if (moduleType === 'connector') {
          this.analyzeConnectorModule(moduleId, capabilityInfo, module);
        } else if (moduleType === 'feature') {
          this.analyzeFeatureModule(moduleId, capabilityInfo, module);
        }
      } catch (analysisError) {
        console.warn(`⚠️ Failed to analyze module ${moduleId}:`, analysisError);
      }

    } catch (error) {
      console.warn(`⚠️ Failed to analyze module ${filePath}:`, error);
    }
  }

  /**
   * Extract module ID from file path
   * Uses centralized utility
   */
  private extractModuleId(filePath: string): string | null {
    if (filePath.includes('/adapter.json')) {
      return extractModuleId(filePath, 'adapter');
    } else if (filePath.includes('/connector.json')) {
      return extractModuleId(filePath, 'connector');
    } else if (filePath.includes('/feature.json')) {
      return extractModuleId(filePath, 'feature');
    }
    return null;
  }

  /**
   * Extract capability category from module ID
   * Uses centralized utility
   */
  private extractCapabilityCategory(moduleId: string): string | null {
    return extractCapabilityCategory(moduleId);
  }

  /**
   * Analyze adapter module
   * Extracts provider name (framework-agnostic) and stores provider-specific adapter parameters
   */
  private analyzeAdapterModule(moduleId: string, capability: CapabilityInfo, module: any): void {
    // Extract provider name (framework-agnostic)
    // e.g., 'auth/better-auth' -> 'better-auth' (not 'better-auth-nextjs')
    const provider = extractProvider(moduleId);
    if (!provider) return;
    
    // Remove framework-specific suffixes for framework-agnostic provider name
    const frameworkAgnosticProvider = provider
      .replace(/-nextjs$/, '')
      .replace(/-expo$/, '')
      .replace(/-react-native$/, '')
      .replace(/-postgres$/, '')
      .replace(/-docker$/, '');
    
    capability.providers.add(frameworkAgnosticProvider);
    capability.adapters.add(moduleId);

    // NEW: Store provider-specific adapter parameters
    if (module.parameters && typeof module.parameters === 'object') {
      capability.adapterParameters.set(frameworkAgnosticProvider, module.parameters);
      
      // Legacy: Keep for backward compatibility
      capability.parameters.set(moduleId, module.parameters);
    }
  }

  /**
   * Analyze connector module
   * NOTE: Connectors should NOT add providers - only adapters provide capabilities
   */
  private analyzeConnectorModule(moduleId: string, capability: CapabilityInfo, module: any): void {
    capability.connectors.add(moduleId);
    
    // Connectors do NOT add providers - providers come only from adapters
    // Connectors are framework-specific bridges, not capability providers
    
    // Collect parameters from the module JSON (for reference, but not used for provider detection)
    if (module.parameters && typeof module.parameters === 'object') {
      capability.parameters.set(moduleId, module.parameters);
    }
  }

  /**
   * Analyze feature module
   * Separates parameters by layer and filters UI-specific params from frontend
   */
  private analyzeFeatureModule(
    moduleId: string, 
    capability: CapabilityInfo, 
    module: any
  ): void {
    // Extract layer using utility
    const layer = extractLayer(moduleId);
    if (layer) {
      capability.layers.add(layer);
    }
    
    capability.features.add(moduleId);

    // Extract parameters and store by layer
    if (module.parameters && typeof module.parameters === 'object') {
      if (layer === 'frontend') {
        // NEW: Filter UI-specific params, store UI-agnostic only
        const uiAgnosticParams = filterUISpecificParams(module.parameters);
        capability.frontendParameters.set('frontend', uiAgnosticParams);
      } else if (layer === 'tech-stack') {
        // NEW: Store standardized tech-stack params
        // Handle JSON schema format: extract properties if present
        let techStackParams = module.parameters;
        if (techStackParams && typeof techStackParams === 'object' && techStackParams.type === 'object' && techStackParams.properties) {
          // It's a JSON schema format - extract the properties
          techStackParams = techStackParams.properties;
        }
        capability.techStackParameters.set('techStack', techStackParams);
      } else if (layer === 'backend') {
        // NEW: Store backend params
        capability.backendParameters.set('backend', module.parameters);
      } else if (layer === 'database') {
        // NEW: Store database params
        capability.databaseParameters.set('database', module.parameters);
      }
      
      // Legacy: Keep for backward compatibility
      capability.parameters.set(moduleId, module.parameters);
    }

    // Extract features from parameters.features
    if (module.parameters?.features) {
      const features = module.parameters.features;
      if (typeof features === 'object' && features !== null) {
        for (const [featureName, enabled] of Object.entries(features)) {
          if (enabled === true || enabled === 'true') {
            capability.features.add(featureName);
          }
        }
      }
    }
  }

  /**
   * Generate capability schema with new structure (adapter, frontend, techStack, shared)
   * NO layer flags - layers are added automatically when capability is specified
   */
  generateCapabilitySchema(analysis: Map<string, CapabilityInfo>): string {
    const schemaLines: string[] = [];
    schemaLines.push('export interface CapabilitySchema {');

    for (const [capabilityName, capabilityInfo] of analysis) {
      // Quote capability names that contain hyphens
      const quotedName = capabilityName.includes('-') ? `'${capabilityName}'` : capabilityName;
      schemaLines.push(`  ${quotedName}: {`);
      
      // Provider union type (framework-agnostic - only from adapters)
      const frameworkAgnosticProviders = Array.from(capabilityInfo.providers)
        .filter(p => !p.includes('-nextjs') && !p.includes('-expo') && !p.includes('-react-native'))
        .filter(p => capabilityInfo.adapterParameters.has(p)); // Only providers that have adapter parameters
        
      if (frameworkAgnosticProviders.length > 0) {
        const providerUnion = frameworkAgnosticProviders.map(p => `'${p}'`).join(' | ') + " | 'custom'";
        schemaLines.push(`    provider: ${providerUnion};`);
      } else if (capabilityInfo.providers.size > 0) {
        // Fallback: if we have providers but no adapter params, still show them
        schemaLines.push(`    provider: 'custom';`);
      }
      
      // NEW: Provider-specific adapter parameters
      // Only add adapter structure if we have adapter parameters
      const hasAdapterParams = Array.from(capabilityInfo.providers).some(p => 
        !p.includes('-nextjs') && !p.includes('-expo') && !p.includes('-react-native') &&
        capabilityInfo.adapterParameters.has(p)
      );
      
      if (hasAdapterParams) {
        const adapterType = this.generateProviderAdapterType(capabilityInfo);
        schemaLines.push(`    adapter: ${adapterType};`);
      }
      
      // NEW: UI-agnostic frontend parameters
      if (capabilityInfo.frontendParameters.size > 0) {
        const frontendParams = capabilityInfo.frontendParameters.get('frontend');
        if (frontendParams) {
          // Use generateFeaturesType to avoid double nesting (frontendParams already has features property)
          const featuresType = this.generateFeaturesType(frontendParams);
          schemaLines.push(`    frontend?: {`);
          schemaLines.push(`      features: ${featuresType};`);
          schemaLines.push(`    };`);
        }
      }
      
      // NEW: Standardized tech-stack parameters
      if (capabilityInfo.techStackParameters.size > 0) {
        const techStackParams = capabilityInfo.techStackParameters.get('techStack');
        if (techStackParams) {
          // Tech-stack params come from feature.json with schema format
          // generateParameterType() will handle schema objects correctly now
          const techStackType = this.generateParameterType(techStackParams, 'techStack');
          schemaLines.push(`    techStack?: ${techStackType};`);
        }
      }
      
      // NEW: Shared parameters (applied to all layers)
      if (capabilityInfo.sharedParameters.size > 0) {
        const sharedType = this.generateParameterType(
          Object.fromEntries(capabilityInfo.sharedParameters),
          'shared'
        );
        schemaLines.push(`    shared?: ${sharedType};`);
      }
      
      schemaLines.push(`  };`);
    }

    schemaLines.push('}');
    
    return schemaLines.join('\n');
  }
  
  /**
   * Generate provider-specific adapter type
   * Generates proper TypeScript type from adapter.json parameters schema
   */
  private generateProviderAdapterType(capabilityInfo: CapabilityInfo): string {
    const providerTypes: string[] = [];
    
    for (const provider of capabilityInfo.providers) {
      // Skip framework-specific providers (from connectors)
      if (provider.includes('-nextjs') || provider.includes('-expo') || provider.includes('-react-native')) {
        continue;
      }
      
      const adapterParams = capabilityInfo.adapterParameters.get(provider);
      if (adapterParams) {
        // Generate proper type from adapter parameters schema (uses schema format)
        const paramType = this.generateAdapterParametersType(adapterParams);
        providerTypes.push(paramType);
      }
    }
    
    if (providerTypes.length === 0) {
      return 'Record<string, any>';
    }
    
    // If only one provider, return its type directly
    if (providerTypes.length === 1) {
      return providerTypes[0];
    }
    
    // Multiple providers: return intersection type for now
    // Future: Could be discriminated union with provider as discriminant
    return providerTypes.join(' & ');
  }
  
  /**
   * Generate TypeScript type from adapter parameters schema
   * Handles schema format from adapter.json (with type, default, description)
   */
  private generateAdapterParametersType(params: Record<string, any>): string {
    if (!params || typeof params !== 'object') {
      return 'Record<string, any>';
    }
    
    const properties: string[] = [];
    
    for (const [paramName, paramDef] of Object.entries(params)) {
      const quotedName = paramName.includes('-') ? `'${paramName}'` : paramName;
      
      // Handle schema format: { type: 'boolean', default: true, description: '...' }
      if (paramDef && typeof paramDef === 'object' && 'type' in paramDef) {
        const type = this.getTypeScriptType(paramDef);
        properties.push(`  ${quotedName}?: ${type};`);
      } else if (typeof paramDef === 'boolean') {
        properties.push(`  ${quotedName}?: boolean;`);
      } else if (typeof paramDef === 'string') {
        properties.push(`  ${quotedName}?: string;`);
      } else if (typeof paramDef === 'number') {
        properties.push(`  ${quotedName}?: number;`);
      } else if (Array.isArray(paramDef)) {
        properties.push(`  ${quotedName}?: ${this.getTypeScriptTypeFromValue(paramDef)};`);
      } else {
        properties.push(`  ${quotedName}?: any;`);
      }
    }
    
    if (properties.length === 0) {
      return 'Record<string, any>';
    }
    
    return `{\n${properties.join('\n')}\n  }`;
  }
  
  /**
   * Generate TypeScript type from parameter object
   * Handles features object, nested objects, and schema definitions
   */
  private generateParameterType(params: Record<string, any>, layer: string): string {
    if (!params || typeof params !== 'object') {
      return 'Record<string, any>';
    }
    
    const properties: string[] = [];
    
    // Handle features object (common in frontend)
    if (params.features && typeof params.features === 'object') {
      properties.push('features?: {');
      for (const [featureName, featureConfig] of Object.entries(params.features)) {
        const quotedName = featureName.includes('-') ? `'${featureName}'` : featureName;
        if (typeof featureConfig === 'object' && featureConfig !== null && 'type' in featureConfig) {
          const config = featureConfig as any;
          const type = this.getTypeScriptType(config);
          properties.push(`    ${quotedName}?: ${type};`);
        } else if (typeof featureConfig === 'boolean') {
          properties.push(`    ${quotedName}?: boolean;`);
        } else {
          properties.push(`    ${quotedName}?: any;`);
        }
      }
      properties.push('  };');
    }
    
    // Handle other parameters
    for (const [paramName, paramValue] of Object.entries(params)) {
      if (paramName === 'features') continue; // Already handled
      
      const quotedName = paramName.includes('-') ? `'${paramName}'` : paramName;
      
      // Check if paramValue is a schema object (from feature.json with type property)
      let type: string;
      if (paramValue && typeof paramValue === 'object' && paramValue !== null && 'type' in paramValue) {
        // It's a schema object (e.g., {type: "boolean", default: true}) - use getTypeScriptType()
        type = this.getTypeScriptType(paramValue);
      } else {
        // It's a direct value (e.g., true, "string", 123) - use getTypeScriptTypeFromValue()
        type = this.getTypeScriptTypeFromValue(paramValue);
      }
      
      properties.push(`  ${quotedName}?: ${type};`);
    }
    
    if (properties.length === 0) {
      return 'Record<string, any>';
    }
    
    return `{\n${properties.join('\n')}\n  }`;
  }
  
  /**
   * Generate TypeScript type for features object (to avoid double nesting)
   */
  private generateFeaturesType(params: Record<string, any>): string {
    if (!params || typeof params !== 'object') {
      return 'Record<string, any>';
    }
    
    // If params has a features property, extract it directly
    if (params.features && typeof params.features === 'object') {
      const featuresProperties: string[] = [];
      for (const [featureName, featureConfig] of Object.entries(params.features)) {
        const quotedName = featureName.includes('-') ? `'${featureName}'` : featureName;
        if (typeof featureConfig === 'object' && featureConfig !== null && 'type' in featureConfig) {
          const config = featureConfig as any;
          const type = this.getTypeScriptType(config);
          featuresProperties.push(`    ${quotedName}?: ${type};`);
        } else if (typeof featureConfig === 'boolean') {
          featuresProperties.push(`    ${quotedName}?: boolean;`);
        } else {
          featuresProperties.push(`    ${quotedName}?: any;`);
        }
      }
      
      if (featuresProperties.length === 0) {
        return 'Record<string, any>';
      }
      
      return `{\n${featuresProperties.join('\n')}\n  }`;
    }
    
    // If no features property, return empty object type
    return '{}';
  }
  
  /**
   * Get TypeScript type from parameter config object (schema format)
   */
  private getTypeScriptType(config: any): string {
    if (!config || typeof config !== 'object') {
      return 'any';
    }
    
    if (config.type === 'boolean') return 'boolean';
    if (config.type === 'string') {
      // Check for enum/options
      if (config.options && Array.isArray(config.options)) {
        return config.options.map((opt: any) => `'${opt}'`).join(' | ');
      }
      return 'string';
    }
    if (config.type === 'number') return 'number';
    if (config.type === 'array') {
      if (config.items) {
        if (config.items.type === 'string') return 'string[]';
        if (config.items.type === 'number') return 'number[]';
        if (config.items.type === 'boolean') return 'boolean[]';
        // Handle enum in items
        if (config.items.options && Array.isArray(config.items.options)) {
          const enumType = config.items.options.map((opt: any) => `'${opt}'`).join(' | ');
          return `(${enumType})[]`;
        }
      }
      return 'any[]';
    }
    if (config.type === 'object') return 'Record<string, any>';
    return 'any';
  }
  
  /**
   * Get TypeScript type from parameter value
   */
  private getTypeScriptTypeFromValue(value: any): string {
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'string') return 'string[]';
      return 'any[]';
    }
    if (value && typeof value === 'object') return 'Record<string, any>';
    return 'any';
  }

  // Legacy method removed - replaced by generateParameterType() which handles layer-separated params
}