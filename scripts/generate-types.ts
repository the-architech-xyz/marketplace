/**
 * Smart Type Generator
 * 
 * Generates rich TypeScript definition files with auto-discovered artifacts
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlueprintParser } from './blueprint-parser';
import { TemplatePathResolver } from './template-path-resolver';
import { TypeGeneratorHelpers } from './generate-types-helpers';
import { CapabilityTypeGenerator } from './generate-capability-types';
import { BlueprintAnalysisResult, ModuleArtifacts } from '@thearchitech.xyz/marketplace/types';

// Extend the imported type to support new module types
type ExtendedBlueprintAnalysisResult = Omit<BlueprintAnalysisResult, 'moduleType'> & {
  moduleType: 'adapter' | 'integration' | 'connector' | 'feature';
};

export class SmartTypeGenerator {
  private parser: BlueprintParser;
  private pathResolver: TemplatePathResolver;
  private capabilityGenerator: CapabilityTypeGenerator;
  private marketplacePath: string;
  private outputPath: string;

  constructor(marketplacePath: string, outputPath: string) {
    this.marketplacePath = marketplacePath;
    this.outputPath = outputPath;
    this.parser = new BlueprintParser(marketplacePath);
    this.pathResolver = new TemplatePathResolver();
    this.capabilityGenerator = new CapabilityTypeGenerator();
  }

  /**
   * Generate all type definition files
   */
  async generateAllTypes(): Promise<void> {
    console.log('🔍 Analyzing blueprints...');
    const analysisResults = this.parser.parseAllBlueprints(this.marketplacePath) as ExtendedBlueprintAnalysisResult[];
    
    console.log(`📊 Found ${analysisResults.length} modules to analyze`);
    
    // Group results by module type
    const adapters = analysisResults.filter(r => r.moduleType === 'adapter');
    const integrations = analysisResults.filter(r => r.moduleType === 'integration');
    const connectors = analysisResults.filter(r => r.moduleType === 'connector');
    const features = analysisResults.filter(r => r.moduleType === 'feature');
    
    console.log(`📦 ${adapters.length} adapters, ${integrations.length} integrations, ${connectors.length} connectors, ${features.length} features`);
    
    // Generate adapter types
    for (const adapter of adapters) {
      await this.generateAdapterTypes(adapter);
    }
    
    // Generate integration types
    for (const integration of integrations) {
      await this.generateIntegrationTypes(integration);
    }
    
    // Generate connector types
    for (const connector of connectors) {
      await this.generateConnectorTypes(connector);
    }
    
    // Generate feature types
    for (const feature of features) {
      await this.generateFeatureTypes(feature);
    }
    
    // Generate master index (includes contract exports)
    await TypeGeneratorHelpers.generateMasterIndex(analysisResults as any, this.outputPath);
    
    console.log('✅ Type generation completed successfully!');
  }

  /**
   * Generate types for specific changed files (incremental)
   */
  async generateTypesForFiles(changedFiles: string[]): Promise<void> {
    console.log('🔍 Analyzing changed files...');
    
    const modulesToRegenerate = new Set<string>();
    
    // Analyze each changed file to determine which modules need regeneration
    for (const filePath of changedFiles) {
      const relativePath = path.relative(this.marketplacePath, filePath);
      
      // Check if it's an adapter file
      const adapterMatch = relativePath.match(/^adapters\/([^\/]+)\/([^\/]+)\/.*\.json$/);
      if (adapterMatch) {
        const [, category, adapterId] = adapterMatch;
        modulesToRegenerate.add(`adapter:${category}/${adapterId}`);
        console.log(`📝 Will regenerate adapter: ${category}/${adapterId}`);
        continue;
      }
      
      // Check if it's an integration file
      const integrationMatch = relativePath.match(/^integrations\/([^\/]+)\/.*\.json$/);
      if (integrationMatch) {
        const [, integrationId] = integrationMatch;
        modulesToRegenerate.add(`integration:${integrationId}`);
        console.log(`📝 Will regenerate integration: ${integrationId}`);
        continue;
      }
      
      // Check if it's the type generation script itself
      if (relativePath.includes('scripts/generate-types.ts')) {
        console.log('📝 Type generation script changed, regenerating all types...');
        return this.generateAllTypes();
      }
    }
    
    if (modulesToRegenerate.size === 0) {
      console.log('ℹ️ No modules need type regeneration');
      return;
    }
    
    console.log(`📊 Found ${modulesToRegenerate.size} modules to regenerate`);
    
    // Parse all blueprints to get the data we need
    const analysisResults = this.parser.parseAllBlueprints(this.marketplacePath) as ExtendedBlueprintAnalysisResult[];
    
    // Generate types only for changed modules
    for (const moduleKey of modulesToRegenerate) {
      const [moduleType, moduleId] = moduleKey.split(':');
      const moduleResult = analysisResults.find(r => 
        r.moduleType === moduleType && r.moduleId === moduleId
      );
      
      if (moduleResult) {
        if (moduleType === 'adapter') {
          await this.generateAdapterTypes(moduleResult);
        } else if (moduleType === 'integration') {
          await this.generateIntegrationTypes(moduleResult);
        }
      }
    }
    
    // Always regenerate master index when any module changes
    await TypeGeneratorHelpers.generateMasterIndex(analysisResults as any, this.outputPath);
    
    console.log('✅ Incremental type generation completed successfully!');
  }

  /**
   * Generate types for a single adapter
   */
  private async generateAdapterTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    console.log(`🔍 Processing adapter: ${moduleId}`);
    
    // Load adapter.json for additional metadata
    const adapterJsonPath = path.join(this.marketplacePath, 'adapters', moduleId, 'adapter.json');
    const adapterJson = TypeGeneratorHelpers.loadAdapterJson(adapterJsonPath);
    
    // Generate TypeScript content
    const tsContent = TypeGeneratorHelpers.generateAdapterTypeContent(moduleId, adapterJson, artifacts);
    
    // Write to file - moduleId is like 'database/drizzle', need to create 'adapters/database/drizzle'
    const outputDir = path.join(this.outputPath, 'adapters', moduleId);
    console.log(`📁 Creating directory: ${outputDir}`);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated types for adapter: ${moduleId}`);
  }

  /**
   * Generate types for a single integration
   */
  private async generateIntegrationTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // Load integration.json for additional metadata
    const integrationJsonPath = path.join(this.marketplacePath, 'integrations', moduleId, 'integration.json');
    const integrationJson = TypeGeneratorHelpers.loadIntegrationJson(integrationJsonPath);
    
    // Generate TypeScript content
    const tsContent = TypeGeneratorHelpers.generateIntegrationTypeContent(moduleId, integrationJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'integrations', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated types for integration: ${moduleId}`);
  }

  /**
   * Generate types for a single connector
   */
  private async generateConnectorTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // Load connector.json for additional metadata
    const connectorJsonPath = path.join(this.marketplacePath, 'connectors', moduleId, 'connector.json');
    const connectorJson = TypeGeneratorHelpers.loadIntegrationJson(connectorJsonPath); // Reuse integration loader
    
    // Generate TypeScript content
    const tsContent = TypeGeneratorHelpers.generateIntegrationTypeContent(moduleId, connectorJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'connectors', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated types for connector: ${moduleId}`);
  }


  /**
   * Generate types for a single feature
   */
  private async generateFeatureTypes(analysis: ExtendedBlueprintAnalysisResult): Promise<void> {
    const moduleId = analysis.moduleId;
    const artifacts = analysis.artifacts;
    
    // Load feature.json for additional metadata
    const featureJsonPath = path.join(this.marketplacePath, 'features', moduleId, 'feature.json');
    const featureJson = TypeGeneratorHelpers.loadIntegrationJson(featureJsonPath); // Reuse integration loader
    
    // Generate TypeScript content
    const tsContent = TypeGeneratorHelpers.generateIntegrationTypeContent(moduleId, featureJson, artifacts);
    
    // Write to file
    const outputDir = path.join(this.outputPath, 'features', moduleId);
    await fs.promises.mkdir(outputDir, { recursive: true });
    
    const outputFile = path.join(outputDir, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log(`📝 Generated types for feature: ${moduleId}`);
  }
}