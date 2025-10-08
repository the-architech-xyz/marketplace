/**
 * Capability Type Generator
 * 
 * Generates TypeScript types for capabilities based on marketplace modules
 */

import * as fs from 'fs';
import * as path from 'path';
import { CapabilityRegistry, ModuleProvider } from '@thearchitech.xyz/marketplace/types';

export class CapabilityTypeGenerator {
  private capabilityRegistry: CapabilityRegistry = {};

  /**
   * Generate capability types from marketplace
   */
  async generateCapabilityTypes(marketplacePath: string, outputPath: string): Promise<void> {
    console.log('🔍 Scanning marketplace for capabilities...');
    
    // Build capability registry
    await this.buildCapabilityRegistry(marketplacePath);
    
    // Generate TypeScript types
    await this.generateTypeScriptTypes(outputPath);
    
    console.log('✅ Capability types generated successfully');
  }

  /**
   * Build capability registry by scanning marketplace
   */
  private async buildCapabilityRegistry(marketplacePath: string): Promise<void> {
    const adaptersPath = path.join(marketplacePath, 'adapters');
    const integrationsPath = path.join(marketplacePath, 'integrations');
    const featuresPath = path.join(marketplacePath, 'features');

    // Scan adapters
    await this.scanDirectory(adaptersPath, 'adapter');
    
    // Scan integrations
    await this.scanDirectory(integrationsPath, 'integration');
    
    // Scan features
    await this.scanDirectory(featuresPath, 'feature');
  }

  /**
   * Scan directory for modules
   */
  private async scanDirectory(dirPath: string, moduleType: string): Promise<void> {
    if (!fs.existsSync(dirPath)) return;

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const modulePath = path.join(dirPath, entry.name);
        await this.scanModule(modulePath, moduleType, entry.name);
      }
    }
  }

  /**
   * Scan individual module for capabilities
   */
  private async scanModule(modulePath: string, moduleType: string, moduleName: string): Promise<void> {
    const configPath = path.join(modulePath, `${moduleType}.json`);
    
    if (!fs.existsSync(configPath)) return;

    try {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      
      const moduleId = `${moduleType}s/${moduleName}`;
      
      // Register capabilities
      if (config.capabilities) {
        for (const [capabilityName, details] of Object.entries(config.capabilities)) {
          if (!this.capabilityRegistry[capabilityName]) {
            this.capabilityRegistry[capabilityName] = { providers: [], consumers: [], conflicts: [] };
          }
          
          this.capabilityRegistry[capabilityName].providers.push({
            moduleId,
            capabilityVersion: (details as any).version || '1.0.0',
            confidence: 95,
            metadata: {
              description: (details as any).description,
              provides: (details as any).provides || [],
              requires: (details as any).requires || []
            }
          });
        }
      }
      
      // Register prerequisites
      if (config.prerequisites?.capabilities) {
        for (const capability of config.prerequisites.capabilities) {
          if (!this.capabilityRegistry[capability]) {
            this.capabilityRegistry[capability] = { providers: [], consumers: [], conflicts: [] };
          }
          
          this.capabilityRegistry[capability].consumers.push({
            moduleId,
            requiredVersion: '1.0.0',
            metadata: {
              description: `Required by ${moduleId}`,
              context: 'prerequisite'
            }
          });
        }
      }
      
    } catch (error) {
      console.warn(`Failed to process ${configPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate TypeScript types
   */
  private async generateTypeScriptTypes(outputPath: string): Promise<void> {
    const capabilities = Object.keys(this.capabilityRegistry);
    
    // Generate capability type definitions
    const capabilityTypes = capabilities.map(capability => 
      `export type ${this.toPascalCase(capability)} = '${capability}';`
    ).join('\n');

    // Generate capability union type
    const capabilityUnion = `export type Capability = ${capabilities.map(c => `'${c}'`).join(' | ')};`;

    // Generate module capability mappings
    const moduleCapabilities = this.generateModuleCapabilityMappings();

    // Generate capability provider mappings
    const capabilityProviders = this.generateCapabilityProviderMappings();

    const tsContent = `/**
 * The Architech Capability Types
 * 
 * Auto-generated TypeScript definitions for marketplace capabilities
 */

// Individual capability types
${capabilityTypes}

// Capability union type
${capabilityUnion}

// Module capability mappings
export interface ModuleCapabilities {
${moduleCapabilities}
}

// Capability provider mappings
export interface CapabilityProviders {
${capabilityProviders}
}

// Capability registry (for runtime use)
export const CAPABILITY_REGISTRY: Record<string, {
  providers: Array<{
    moduleId: string;
    capabilityVersion: string;
    confidence: number;
    metadata: {
      description?: string;
      provides?: string[];
      requires?: string[];
    };
  }>;
  consumers: Array<{
    moduleId: string;
    requiredVersion: string;
    metadata: {
      description?: string;
      context?: string;
    };
  }>;
  conflicts: Array<{
    capability: string;
    providers: any[];
    severity: 'error' | 'warning';
    message: string;
  }>;
}> = ${JSON.stringify(this.capabilityRegistry, null, 2)};

// Utility types
export type CapabilityProvider = {
  moduleId: string;
  capabilityVersion: string;
  confidence: number;
  metadata: {
    description?: string;
    provides?: string[];
    requires?: string[];
  };
};

export type CapabilityConsumer = {
  moduleId: string;
  requiredVersion: string;
  metadata: {
    description?: string;
    context?: string;
  };
};

// Helper functions
export function getCapabilityProviders(capability: Capability): CapabilityProvider[] {
  return CAPABILITY_REGISTRY[capability]?.providers || [];
}

export function getCapabilityConsumers(capability: Capability): CapabilityConsumer[] {
  return CAPABILITY_REGISTRY[capability]?.consumers || [];
}

export function hasCapabilityProvider(capability: Capability): boolean {
  return (CAPABILITY_REGISTRY[capability]?.providers.length || 0) > 0;
}

export function getModuleCapabilities(moduleId: string): Capability[] {
  const capabilities: Capability[] = [];
  for (const [capability, data] of Object.entries(CAPABILITY_REGISTRY)) {
    if (data.providers.some(p => p.moduleId === moduleId)) {
      capabilities.push(capability as Capability);
    }
  }
  return capabilities;
}
`;

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    
    console.log(`📄 Capability types written to: ${outputPath}`);
    console.log(`📊 Generated ${capabilities.length} capability types`);
  }

  /**
   * Generate module capability mappings
   */
  private generateModuleCapabilityMappings(): string {
    const mappings: string[] = [];
    
    for (const [capability, data] of Object.entries(this.capabilityRegistry)) {
      const providers = data.providers.map(p => p.moduleId);
      if (providers.length > 0) {
        mappings.push(`  '${capability}': [${providers.map(p => `'${p}'`).join(', ')}];`);
      }
    }
    
    return mappings.join('\n');
  }

  /**
   * Generate capability provider mappings
   */
  private generateCapabilityProviderMappings(): string {
    const mappings: string[] = [];
    
    for (const [capability, data] of Object.entries(this.capabilityRegistry)) {
      const providers = data.providers.map(p => `'${p.moduleId}'`);
      if (providers.length > 0) {
        mappings.push(`  '${capability}': [${providers.join(', ')}];`);
      }
    }
    
    return mappings.join('\n');
  }

  /**
   * Convert kebab-case to PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new CapabilityTypeGenerator();
  const marketplacePath = process.argv[2] || './marketplace';
  const outputPath = process.argv[3] || './types/capabilities.ts';
  
  generator.generateCapabilityTypes(marketplacePath, outputPath)
    .then(() => console.log('✅ Capability type generation complete'))
    .catch(error => {
      console.error('❌ Capability type generation failed:', error);
      process.exit(1);
    });
}
