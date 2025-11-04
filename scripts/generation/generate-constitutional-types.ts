/**
 * Constitutional Architecture Type Generator
 * 
 * Generates TypeScript types that fully support the Constitutional Architecture
 * with parameters.features, internal_structure, and type-safe genome definitions
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlueprintParser } from '../utilities/blueprint-parser.js';
import { TemplatePathResolver } from '../utilities/template-path-resolver.js';
import { CapabilityAnalyzer } from './capability-analyzer.js';
import { ConstitutionalTypeGeneratorHelpers } from './generate-constitutional-types-helpers.js';
import { BlueprintAnalysisResult, ModuleArtifacts } from '@thearchitech.xyz/types';

// Extend the imported type to support new module types
type ExtendedBlueprintAnalysisResult = Omit<BlueprintAnalysisResult, 'moduleType'> & {
  moduleType: 'adapter' | 'connector' | 'feature';
};

export class ConstitutionalTypeGenerator {
  private parser: BlueprintParser;
  private pathResolver: TemplatePathResolver;
  private capabilityAnalyzer: CapabilityAnalyzer;
  private marketplacePath: string;
  private outputPath: string;
  private moduleIds: string[] = [];

  constructor(marketplacePath: string, outputPath: string) {
    this.marketplacePath = marketplacePath;
    this.outputPath = outputPath;
    this.parser = new BlueprintParser(marketplacePath);
    this.pathResolver = new TemplatePathResolver();
    this.capabilityAnalyzer = new CapabilityAnalyzer(marketplacePath);
  }

  /**
   * Generate all Constitutional Architecture types
   */
  async generateAllTypes(): Promise<void> {
    console.log('🔍 Analyzing blueprints with Constitutional Architecture support...');
    const analysisResults = this.parser.parseAllBlueprints(this.marketplacePath) as ExtendedBlueprintAnalysisResult[];
    
    console.log(`📊 Found ${analysisResults.length} modules to analyze`);
    
    // Group results by module type
    const adapters = analysisResults.filter(r => r.moduleType === 'adapter');
    const connectors = analysisResults.filter(r => r.moduleType === 'connector');
    const features = analysisResults.filter(r => r.moduleType === 'feature');
    
    console.log(`📦 ${adapters.length} adapters, ${connectors.length} connectors, ${features.length} features`);
    
    // Collect all module IDs for type generation with correct format
    this.moduleIds = analysisResults.map(r => {
      const moduleId = r.moduleId;
      const moduleType = r.moduleType;
      
      // Module IDs already have correct format from parser
      // Adapters: 'database/drizzle' (no prefix)
      // Connectors: 'connectors/better-auth-github' (with connectors/ prefix)
      // Features: 'features/auth/frontend/shadcn' (with features/ prefix)
      return moduleId;
    });
    
    // Generate adapter types
    for (const adapter of adapters) {
      await this.generateConstitutionalAdapterTypes(adapter);
    }
    
    // Generate connector types
    for (const connector of connectors) {
      await this.generateConstitutionalConnectorTypes(connector);
    }
    
    // Generate feature types
    for (const feature of features) {
      await this.generateConstitutionalFeatureTypes(feature);
    }
    
    // Generate master index with Constitutional Architecture support
    await ConstitutionalTypeGeneratorHelpers.generateConstitutionalMasterIndex(analysisResults as any, this.outputPath, this.moduleIds);
    
    // Generate blueprint parameter types
    await this.generateBlueprintParameterTypes(analysisResults);
    
    // Generate capability analysis using enhanced analyzer
    console.log('🎯 Analyzing capability patterns with enhanced analyzer...');
    const capabilityAnalysis = await this.capabilityAnalyzer.analyzeCapabilities();
    
    // Generate capability types with new structure
    await this.generateCapabilityTypes(capabilityAnalysis);
    
    // Generate defineGenome function
    await this.generateDefineGenomeFunction();
    
    // Generate runtime companion files
    await ConstitutionalTypeGeneratorHelpers.generateRuntimeFiles(this.outputPath);
    
    console.log('✅ Constitutional Architecture type generation completed successfully!');
  }

  /**
   * Generate types for a single adapter with Constitutional Architecture support
   */
  private async generateConstitutionalAdapterTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    console.log(`🔍 Processing adapter: ${moduleId}`);
    
    // Load adapter.json for Constitutional Architecture metadata
    const adapterJsonPath = path.join(this.marketplacePath, 'adapters', moduleId, 'adapter.json');
    const adapterJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(adapterJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalAdapterTypeContent(moduleId, adapterJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'adapters', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated Constitutional Architecture types for adapter: ${moduleId}`);
  }

  /**
   * Generate types for a single integration with Constitutional Architecture support
   */
  private async generateConstitutionalIntegrationTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // Load integration.json for Constitutional Architecture metadata
    const integrationJsonPath = path.join(this.marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'integration.json');
    const integrationJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(integrationJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalIntegrationTypeContent(moduleId, integrationJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'integrations', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated Constitutional Architecture types for integration: ${moduleId}`);
  }

  /**
   * Generate types for a single connector with Constitutional Architecture support
   */
  private async generateConstitutionalConnectorTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // moduleId already includes 'connectors/' prefix (e.g., 'connectors/sentry/nextjs')
    // Strip the prefix to get the actual path
    const connectorPath = moduleId.replace(/^connectors\//, '');
    
    // Load connector.json for Constitutional Architecture metadata
    const connectorJsonPath = path.join(this.marketplacePath, 'connectors', connectorPath, 'connector.json');
    const connectorJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(connectorJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalConnectorTypeContent(moduleId, connectorJson, artifacts);
    
    // Write to file - use moduleId as-is (already has 'connectors/' prefix)
    const outputDir = path.join(this.outputPath, moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated Constitutional Architecture types for connector: ${moduleId}`);
  }

  /**
   * Generate types for a single feature with Constitutional Architecture support
   */
  private async generateConstitutionalFeatureTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // moduleId already includes 'features/' prefix (e.g., 'features/auth/frontend/shadcn')
    // Strip the prefix to get the actual path
    const featurePath = moduleId.replace(/^features\//, '');
    
    // Load feature.json for Constitutional Architecture metadata
    const featureJsonPath = path.join(this.marketplacePath, 'features', featurePath, 'feature.json');
    const featureJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(featureJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalFeatureTypeContent(moduleId, featureJson, artifacts);
    
    // Write to file - use moduleId as-is (already has 'features/' prefix)
    const outputDir = path.join(this.outputPath, moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated Constitutional Architecture types for feature: ${moduleId}`);
  }

  /**
   * Generate blueprint parameter types for all modules
   */
  private async generateBlueprintParameterTypes(analysisResults: ExtendedBlueprintAnalysisResult[]): Promise<void> {
    console.log('🔧 Generating blueprint parameter types...');
    
    const blueprintParameterTypes = await ConstitutionalTypeGeneratorHelpers.generateBlueprintParameterTypes(analysisResults, this.marketplacePath);
    
    // Write blueprint parameter types to a dedicated file
    const outputFile = path.join(this.outputPath, 'blueprint-parameters.d.ts');
    const content = `/**
 * Generated Blueprint Parameter Types
 * 
 * These types provide type safety for blueprint parameters based on module schemas.
 * Import these types in your blueprints for full type safety.
 */

${blueprintParameterTypes}
`;
    
    await fs.promises.writeFile(outputFile, content);
    console.log(`📝 Generated blueprint parameter types: ${outputFile}`);
  }

  /**
   * Generate capability types from analysis
   */
  private async generateCapabilityTypes(analysis: any): Promise<void> {
    console.log('🔧 Generating capability types...');
    
    const capabilitySchema = this.capabilityAnalyzer.generateCapabilitySchema(analysis);
    // Also generate framework param types for project.apps[]
    const frameworkTypes = await this.generateFrameworkTypes();
    
    // Generate capability ID union type
    const capabilityIds = Array.from(analysis.keys());
    const capabilityIdUnion = capabilityIds.map(id => `  | '${id}'`).join('\n');
    
    const providerUnionTypes = this.generateCapabilityProviderUnions(analysis);

    const capabilityTypesContent = `/**
 * Capability-Driven Genome Types
 * 
 * Auto-generated type definitions for capability-driven genome authoring.
 * Provides strict type safety for capability IDs and their parameters.
 */

import { Genome } from '@thearchitech.xyz/types';

// Capability ID union type (for strict typing)
export type CapabilityId = 
${capabilityIdUnion};

// Framework parameter types (for project.apps[])
${frameworkTypes.frameworkInterfaces}

export type FrameworkId = ${frameworkTypes.frameworkUnion || "'nextjs' | 'expo'"};

// Discriminated app type based on framework id
export type FrameworkApp =
${frameworkTypes.frameworkAppUnion || "  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: FrameworkId; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: Record<string, unknown>; }"};

// Generated capability schema
${capabilitySchema}

// Provider-discriminated adapter unions per capability
${providerUnionTypes.interfaces}
export type CapabilityAdapterUnion = {
${providerUnionTypes.mapping}
};

// Capability-driven genome interface with strict typing
export interface CapabilityGenome {
  version: string;
  project: {
    name: string;
    description?: string;
    path?: string;
    structure?: 'monorepo' | 'single-app';
    // Multiple apps instead of single framework
    apps: FrameworkApp[];
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages?: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        ui?: string;
        [key: string]: string | undefined;
      };
    };
  };
  // Strict typing: capability schema with provider-discriminated adapter typing
  capabilities: {
    [K in CapabilityId]?: Omit<CapabilitySchema[K], 'adapter' | 'provider'> & CapabilityAdapterUnion[K];
  };
  // Legacy support
  modules?: any[];
}

// Type-safe defineGenome function for capabilities
// Enforces strict capability ID and parameter typing
export function defineCapabilityGenome<T extends CapabilityGenome>(genome: T): T {
  return genome;
}

// Re-export for convenience
export type { Genome } from '@thearchitech.xyz/types';
`;

    // Write types AND implementation to capability-types.ts
    const capabilityTypesPath = path.join(this.outputPath, 'capability-types.ts');
    await fs.promises.writeFile(capabilityTypesPath, capabilityTypesContent, 'utf8');
    
    // Write .d.ts file for type declarations (NodeNext requires this for .js imports)
    const capabilityTypesDtsContent = capabilityTypesContent
      .replace(
        'export function defineCapabilityGenome<T extends CapabilityGenome>(genome: T): T {\n  return genome;\n}',
        'export declare function defineCapabilityGenome<T extends CapabilityGenome>(genome: T): T;'
      );
    const capabilityTypesDtsPath = path.join(this.outputPath, 'capability-types.d.ts');
    await fs.promises.writeFile(capabilityTypesDtsPath, capabilityTypesDtsContent, 'utf8');
    
    console.log(`✅ Capability types written to: ${capabilityTypesPath}`);
    console.log(`✅ Capability types declarations written to: ${capabilityTypesDtsPath}`);
  }
  private async generateDefineGenomeFunction(): Promise<void> {
    // Generate ModuleParameters type from all schema files
    const analysisResults = this.parser.parseAllBlueprints(this.marketplacePath) as ExtendedBlueprintAnalysisResult[];
    const moduleParametersType = await ConstitutionalTypeGeneratorHelpers.generateModuleParametersType(analysisResults, this.marketplacePath);
    const discriminatedUnionType = await ConstitutionalTypeGeneratorHelpers.generateDiscriminatedUnionTypes(analysisResults, this.marketplacePath);
    
    const defineGenomeContent = `/**
 * Define Genome with Full Type Safety
 * 
 * This function provides complete type safety for genome definitions,
 * including autocompletion for module IDs and parameter validation.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 
${this.moduleIds.map(id => `  | '${id}'`).join('\n')};

${moduleParametersType}

// Discriminated union for better IDE support
${discriminatedUnionType}

export interface TypedGenome {
  version: string;
  project: {
    name: string;
    description?: string;
    path?: string;
    version?: string;
    author?: string;
    license?: string;
    structure?: 'monorepo' | 'single-app';
    apps: Array<{
      id: string;
      type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker';
      framework: 'nextjs' | 'expo' | 'react-native' | string;
      package?: string;
      router?: 'app' | 'pages';
      alias?: string;
      options?: Record<string, unknown>;
    }>;
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages?: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        ui?: string;
        [key: string]: string | undefined;
      };
    };
  };
  modules: TypedGenomeModule[];
  options?: Record<string, any>;
}

/**
 * Define a genome with full type safety
 * 
 * @param genome - The genome configuration with type safety
 * @returns The genome with validated types
 * 
 * @example
 * \`\`\`typescript
 * import { defineGenome } from '@thearchitech.xyz/marketplace-types';
 * 
 * const genome = defineGenome({
 *   version: '1.0',
 *   project: {
 *     name: 'my-app',
 *     framework: 'nextjs'
 *   },
 *   modules: [
 *     {
 *       id: 'framework/nextjs', // ✅ Autocompletion works
 *       parameters: {
 *         appRouter: true, // ✅ Type-safe parameters
 *         srcDir: true,    // ✅ Only boolean allowed
 *         importAlias: '@/'
 *       }
 *     },
 *     {
 *       id: 'ui/shadcn-ui', // ✅ Autocompletion works
 *       parameters: {
 *         components: ['button', 'input'], // ✅ Only valid components allowed
 *       }
 *     }
 *   ]
 * });
 * \`\`\`
 */
export declare function defineGenome<T extends TypedGenome>(genome: T): T;

// Re-export for convenience
export { Genome } from '@thearchitech.xyz/types';
`;

    // Write TYPE DEFINITIONS to genome-types.d.ts
    const genomeTypesContent = `/**
 * Marketplace-Generated Genome Types
 * 
 * Auto-generated type definitions for type-safe genome authoring.
 */

import { Genome } from '@thearchitech.xyz/types';

// Generated ModuleId union type
export type ModuleId = 
${this.moduleIds.map(id => `  | '${id}'`).join('\n')};

${moduleParametersType}

// Discriminated union for better IDE support
${discriminatedUnionType}

export interface TypedGenome {
  version: string;
  project: {
    name: string;
    framework: string;
    path?: string;
    description?: string;
    version?: string;
    author?: string;
    license?: string;
    structure?: 'monorepo' | 'single-app';
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        [key: string]: string | undefined;
      };
    };
  };
  modules: TypedGenomeModule[];
  options?: Record<string, any>;
}

// Re-export for convenience
export { Genome } from '@thearchitech.xyz/types';
`;

    // Write IMPLEMENTATION to define-genome.ts (with strict constraint)
    const defineGenomeImplContent = `/**
 * Define Genome with Full Type Safety - Implementation
 */

import type { TypedGenome } from './genome-types.js';

/**
 * Define a genome with full type safety
 * 
 * @param genome - The genome configuration with type safety
 * @returns The genome with validated types
 */
export function defineGenome<T extends TypedGenome>(genome: T): T {
  return genome;
}
`;

    const genomeTypesFile = path.join(this.outputPath, 'genome-types.d.ts');
    const defineGenomeFile = path.join(this.outputPath, 'define-genome.ts');
    const defineGenomeDtsFile = path.join(this.outputPath, 'define-genome.d.ts');
    
    // Generate .d.ts declaration file for define-genome
    const defineGenomeDtsContent = `/**
 * Define Genome with Full Type Safety - Type Declarations
 */

import type { TypedGenome } from './genome-types.js';

/**
 * Define a genome with full type safety
 * 
 * @param genome - The genome configuration with type safety
 * @returns The genome with validated types
 */
export declare function defineGenome<T extends TypedGenome>(genome: T): T;
`;
    
    await fs.promises.writeFile(genomeTypesFile, genomeTypesContent);
    await fs.promises.writeFile(defineGenomeFile, defineGenomeImplContent);
    await fs.promises.writeFile(defineGenomeDtsFile, defineGenomeDtsContent);
    
    console.log('📝 Generated genome-types.d.ts with all type definitions');
    console.log('📝 Generated define-genome.ts with strict type constraint');
    console.log('📝 Generated define-genome.d.ts with type declarations');
  }

  /**
   * Scan framework adapters and build parameter interfaces + app union
   */
  private async generateFrameworkTypes(): Promise<{ frameworkInterfaces: string; frameworkUnion: string; frameworkAppUnion: string }> {
    const fsPromises = fs.promises as typeof fs.promises;
    const adaptersRoot = path.join(this.marketplacePath, 'adapters', 'framework');
    const interfaces: string[] = [];
    const appVariants: string[] = [];
    const ids: string[] = [];

    try {
      const entries = await fsPromises.readdir(adaptersRoot, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const frameworkId = entry.name; // e.g., 'nextjs', 'expo'
        const adapterJsonPath = path.join(adaptersRoot, frameworkId, 'adapter.json');
        if (!fs.existsSync(adapterJsonPath)) continue;

        const schema = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(adapterJsonPath);
        const params = (schema && schema.parameters) ? schema.parameters : {};

        const ifaceName = `${frameworkId.charAt(0).toUpperCase()}${frameworkId.slice(1)}FrameworkParams`;
        const propLines: string[] = [];
        for (const [paramName, paramConfig] of Object.entries(params)) {
          if (paramName === 'features') continue; // framework adapters rarely expose features; skip
          let tsType = 'any';
          if (paramConfig && typeof paramConfig === 'object' && (paramConfig as any).type) {
            const t = (paramConfig as any).type;
            if (t === 'boolean') tsType = 'boolean';
            else if (t === 'string') {
              if ((paramConfig as any).options && Array.isArray((paramConfig as any).options)) {
                tsType = (paramConfig as any).options.map((opt: any) => `'${opt}'`).join(' | ') || 'string';
              } else tsType = 'string';
            }
            else if (t === 'number') tsType = 'number';
            else if (t === 'array') {
              const items = (paramConfig as any).items;
              if (items?.type === 'string') tsType = 'string[]';
              else if (items?.type === 'number') tsType = 'number[]';
              else if (items?.type === 'boolean') tsType = 'boolean[]';
              else tsType = 'any[]';
            } else if (t === 'object') tsType = 'Record<string, unknown>';
          } else if (typeof paramConfig === 'boolean') tsType = 'boolean';
          else if (typeof paramConfig === 'string') tsType = 'string';
          else if (typeof paramConfig === 'number') tsType = 'number';
          else if (Array.isArray(paramConfig)) tsType = 'any[]';

          const quoted = /[^a-zA-Z0-9_]/.test(paramName) ? `'${paramName}'` : paramName;
          propLines.push(`  ${quoted}?: ${tsType};`);
        }
        interfaces.push(`export interface ${ifaceName} {\n${propLines.join('\n')}\n}`);
        ids.push(`'${frameworkId}'`);
        appVariants.push(`  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: '${frameworkId}'; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: ${ifaceName}; }`);
      }
    } catch {
      // no-op if folder not found; provide sensible defaults
    }

    return {
      frameworkInterfaces: interfaces.join('\n\n'),
      frameworkUnion: ids.join(' | '),
      frameworkAppUnion: appVariants.join('\n')
    };
  }

  /**
   * Build provider-discriminated adapter unions from analyzer results
   */
  private generateCapabilityProviderUnions(analysis: Map<string, any>): { interfaces: string; mapping: string } {
    const interfaces: string[] = [];
    const mappingLines: string[] = [];

    for (const [capabilityName, info] of analysis as any) {
      const capKey = capabilityName.includes('-') ? capabilityName.replace(/-([a-z])/g, (_: any, c: string) => c.toUpperCase()) : capabilityName;
      const unionVariants: string[] = [];

      const providers: string[] = Array.from(info.providers || []);
      for (const provider of providers) {
        // Skip framework-specific variants
        if (/-(nextjs|expo|react-native)$/.test(provider)) continue;
        const params = info.adapterParameters?.get(provider) || {};
        const ifaceName = `${capKey.charAt(0).toUpperCase()}${capKey.slice(1)}_${provider.replace(/-([a-z])/g, (_: any, c: string) => c.toUpperCase())}AdapterParams`;

        const propLines: string[] = [];
        for (const [paramName, paramConfig] of Object.entries(params)) {
          if (paramName === 'features') continue;
          let tsType = 'any';
          if (paramConfig && typeof paramConfig === 'object' && (paramConfig as any).type) {
            const t = (paramConfig as any).type;
            if (t === 'boolean') tsType = 'boolean';
            else if (t === 'string') {
              if ((paramConfig as any).options && Array.isArray((paramConfig as any).options)) {
                tsType = (paramConfig as any).options.map((opt: any) => `'${opt}'`).join(' | ') || 'string';
              } else tsType = 'string';
            } else if (t === 'number') tsType = 'number';
            else if (t === 'array') {
              const items = (paramConfig as any).items;
              if (items?.type === 'string') tsType = 'string[]';
              else if (items?.type === 'number') tsType = 'number[]';
              else if (items?.type === 'boolean') tsType = 'boolean[]';
              else tsType = 'any[]';
            } else if (t === 'object') tsType = 'Record<string, unknown>';
          } else if (typeof paramConfig === 'boolean') tsType = 'boolean';
          else if (typeof paramConfig === 'string') tsType = 'string';
          else if (typeof paramConfig === 'number') tsType = 'number';
          else if (Array.isArray(paramConfig)) tsType = 'any[]';

          const quoted = /[^a-zA-Z0-9_]/.test(paramName) ? `'${paramName}'` : paramName;
          propLines.push(`  ${quoted}?: ${tsType};`);
        }
        interfaces.push(`export interface ${ifaceName} {\n${propLines.join('\n')}\n}`);
        unionVariants.push(`  | { provider: '${provider}'; adapter: ${ifaceName} }`);
      }

      // Also allow custom provider
      unionVariants.push(`  | { provider: 'custom'; adapter: Record<string, unknown> }`);
      mappingLines.push(`  '${capabilityName}':\n${unionVariants.join('\n')};`);
    }

    return { interfaces: interfaces.join('\n\n'), mapping: mappingLines.join('\n') };
  }
}
