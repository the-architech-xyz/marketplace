/**
 * Constitutional Architecture Type Generator
 * 
 * Generates TypeScript types that fully support the Constitutional Architecture
 * with parameters.features, internal_structure, and type-safe genome definitions
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlueprintParser } from '../utilities/blueprint-parser';
import { TemplatePathResolver } from '../utilities/template-path-resolver';
import { ConstitutionalTypeGeneratorHelpers } from './generate-constitutional-types-helpers';
import { BlueprintAnalysisResult, ModuleArtifacts } from '@thearchitech.xyz/types';

// Extend the imported type to support new module types
type ExtendedBlueprintAnalysisResult = Omit<BlueprintAnalysisResult, 'moduleType'> & {
  moduleType: 'adapter' | 'connector' | 'feature';
};

export class ConstitutionalTypeGenerator {
  private parser: BlueprintParser;
  private pathResolver: TemplatePathResolver;
  private marketplacePath: string;
  private outputPath: string;
  private moduleIds: string[] = [];

  constructor(marketplacePath: string, outputPath: string) {
    this.marketplacePath = marketplacePath;
    this.outputPath = outputPath;
    this.parser = new BlueprintParser(marketplacePath);
    this.pathResolver = new TemplatePathResolver();
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
    
    // Generate defineGenome function
    await this.generateDefineGenomeFunction();
    
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
    
    // Load connector.json for Constitutional Architecture metadata
    const connectorJsonPath = path.join(this.marketplacePath, 'connectors', moduleId, 'connector.json');
    const connectorJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(connectorJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalConnectorTypeContent(moduleId, connectorJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'connectors', moduleId);
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
    
    // Load feature.json for Constitutional Architecture metadata
    const featureJsonPath = path.join(this.marketplacePath, 'features', moduleId.replace('features/', ''), 'feature.json');
    const featureJson = ConstitutionalTypeGeneratorHelpers.loadConstitutionalSchema(featureJsonPath);
    
    // Generate Constitutional Architecture TypeScript content
    const tsContent = ConstitutionalTypeGeneratorHelpers.generateConstitutionalFeatureTypeContent(moduleId, featureJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'features', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated Constitutional Architecture types for feature: ${moduleId}`);
  }

  /**
   * Generate the defineGenome function with full type safety
   */
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
export type ModuleId = ${this.moduleIds.map(id => `'${id}'`).join(' | ')};

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

    const outputFile = path.join(this.outputPath, 'define-genome.d.ts');
    await fs.promises.writeFile(outputFile, defineGenomeContent);
    
    console.log('📝 Generated defineGenome function with full type safety');
  }
}
