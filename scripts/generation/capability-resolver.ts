/**
 * Capability Resolver
 * 
 * Converts capability-driven genome declarations to executable module lists
 * for the CLI to process.
 */

import { Module } from '@thearchitech.xyz/types';
import { CapabilityGenome, CapabilitySchema, CapabilityId } from '../../types/capability-types.js';

// Use CapabilitySchema[K] directly - no need for separate interface
type CapabilityConfig<K extends CapabilityId = CapabilityId> = CapabilitySchema[K];

export class CapabilityResolver {
  private marketplacePath: string;

  constructor(marketplacePath: string) {
    this.marketplacePath = marketplacePath;
  }

  /**
   * Convert capability-driven genome to executable module list
   */
  async resolveCapabilities(genome: CapabilityGenome): Promise<Module[]> {
    console.log('🔧 Resolving capabilities to modules...');
    
    const modules: Module[] = [];
    
    // 1. Resolve each capability
    for (const [capabilityName, config] of Object.entries(genome.capabilities)) {
      if (config) {
        console.log(`  📦 Resolving capability: ${capabilityName}`);
        // Type assertion: capabilityName from Object.entries is string, but we know it's CapabilityId
        const resolvedModules = await this.resolveCapability(
          capabilityName as CapabilityId, 
          config
        );
        modules.push(...resolvedModules);
      }
    }
    
    // 2. Add infrastructure modules (frameworks, monorepo tools, etc.)
    const infrastructureModules = await this.resolveInfrastructure(genome.project);
    modules.push(...infrastructureModules);
    
    // 3. Add legacy modules if present
    if (genome.modules) {
      console.log('  📦 Adding legacy modules...');
      const legacyModules = genome.modules.map(this.convertGenomeModuleToModule);
      modules.push(...legacyModules);
    }
    
    // 4. Resolve dependencies and conflicts
    const resolvedModules = await this.resolveDependencies(modules);
    
    console.log(`✅ Resolved ${resolvedModules.length} modules from capabilities`);
    return resolvedModules;
  }

  /**
   * Resolve a single capability to its required modules
   */
  private async resolveCapability<K extends CapabilityId>(
    capabilityName: K, 
    config: CapabilitySchema[K]
  ): Promise<Module[]> {
    const modules: Module[] = [];
    
    // 1. Resolve provider adapter
    if ('provider' in config && config.provider && config.provider !== 'custom') {
      const adapterModule = await this.resolveProviderAdapter(capabilityName, config);
      if (adapterModule) {
        modules.push(adapterModule);
      }
    }
    
    // 2. Resolve tech-stack layer (default: included if capability is specified)
    if ('techStack' in config && config.techStack) {
      const techStackModule = await this.resolveTechStackLayer(capabilityName, config);
      if (techStackModule) {
        modules.push(techStackModule);
      }
    }
    
    // 3. Resolve frontend layer (always included if capability is specified)
    if ('frontend' in config && config.frontend?.features) {
      const frontendModule = await this.resolveFrontendLayer(capabilityName, config);
      if (frontendModule) {
        modules.push(frontendModule);
      }
    }
    
    // 4. Resolve backend layer (only if explicitly specified)
    if ('backend' in config && config.backend) {
      const backendModule = await this.resolveBackendLayer(capabilityName, config);
      if (backendModule) {
        modules.push(backendModule);
      }
    }
    
    // 5. Resolve database layer (only if explicitly specified)
    if ('database' in config && config.database) {
      const databaseModule = await this.resolveDatabaseLayer(capabilityName, config);
      if (databaseModule) {
        modules.push(databaseModule);
      }
    }
    
    return modules;
  }

  /**
   * Resolve provider adapter (e.g., 'better-auth' -> 'adapters/auth/better-auth')
   */
  private async resolveProviderAdapter<K extends CapabilityId>(
    capabilityName: K,
    config: CapabilitySchema[K]
  ): Promise<Module | null> {
    // Extract provider name - must check if provider exists in config
    if (!('provider' in config) || !config.provider || config.provider === 'custom') {
      return null;
    }
    
    const providerName = this.extractProviderName(config.provider);
    const adapterId = `adapters/${capabilityName}/${providerName}`;
    
    // Check if adapter exists
    const adapterExists = await this.moduleExists(adapterId);
    if (!adapterExists) {
      console.log(`    ⚠️  Adapter not found: ${adapterId}`);
      return null;
    }
    
    console.log(`    ✅ Resolved adapter: ${adapterId}`);
    
    // Extract adapter parameters if available
    const adapterParams = ('adapter' in config && config.adapter) ? config.adapter : {};
    
    return {
      id: adapterId,
      category: 'adapter',
      parameters: adapterParams,
      features: {},
      externalFiles: [],
      config: undefined
    };
  }

  /**
   * Resolve tech-stack layer (e.g., 'features/auth/tech-stack')
   */
  private async resolveTechStackLayer<K extends CapabilityId>(
    capabilityName: K,
    config: CapabilitySchema[K]
  ): Promise<Module | null> {
    const techStackId = `features/${capabilityName}/tech-stack`;
    
    // Check if tech-stack exists
    const techStackExists = await this.moduleExists(techStackId);
    if (!techStackExists) {
      console.log(`    ⚠️  Tech-stack layer not found: ${techStackId}`);
      return null;
    }
    
    console.log(`    ✅ Resolved tech-stack: ${techStackId}`);
    
    // Extract tech-stack parameters if available
    const techStackParams = ('techStack' in config && config.techStack) ? config.techStack : {};
    
    return {
      id: techStackId,
      category: 'feature',
      parameters: techStackParams,
      features: {},
      externalFiles: [],
      config: undefined
    };
  }

  /**
   * Resolve frontend layer (e.g., 'features/auth/frontend')
   */
  private async resolveFrontendLayer<K extends CapabilityId>(
    capabilityName: K,
    config: CapabilitySchema[K]
  ): Promise<Module | null> {
    const frontendId = `features/${capabilityName}/frontend`;
    
    // Check if frontend exists
    const frontendExists = await this.moduleExists(frontendId);
    if (!frontendExists) {
      console.log(`    ⚠️  Frontend layer not found: ${frontendId}`);
      return null;
    }
    
    console.log(`    ✅ Resolved frontend: ${frontendId}`);
    
    // Extract frontend parameters (features object)
    const frontendParams = ('frontend' in config && config.frontend?.features) 
      ? { features: config.frontend.features }
      : { features: {} };
    
    return {
      id: frontendId,
      category: 'feature',
      parameters: frontendParams,
      features: {},
      externalFiles: [],
      config: undefined
    };
  }

  /**
   * Resolve backend layer (e.g., 'features/auth/backend/nextjs')
   */
  private async resolveBackendLayer<K extends CapabilityId>(
    capabilityName: K,
    config: CapabilitySchema[K]
  ): Promise<Module | null> {
    // Determine framework from project configuration
    const framework = 'nextjs'; // Default framework
    const backendId = `features/${capabilityName}/backend/${framework}`;
    
    // Check if backend exists
    const backendExists = await this.moduleExists(backendId);
    if (!backendExists) {
      console.log(`    ⚠️  Backend layer not found: ${backendId}`);
      return null;
    }
    
    console.log(`    ✅ Resolved backend: ${backendId}`);
    
    // Extract backend parameters if available
    const backendParams = ('backend' in config && config.backend) ? config.backend : {};
    
    return {
      id: backendId,
      category: 'feature',
      parameters: backendParams,
      features: {},
      externalFiles: [],
      config: undefined
    };
  }

  /**
   * Resolve database layer (e.g., 'features/auth/database/drizzle')
   */
  private async resolveDatabaseLayer<K extends CapabilityId>(
    capabilityName: K,
    config: CapabilitySchema[K]
  ): Promise<Module | null> {
    // Determine database from project configuration
    const database = 'drizzle'; // Default database
    const databaseId = `features/${capabilityName}/database/${database}`;
    
    // Check if database exists
    const databaseExists = await this.moduleExists(databaseId);
    if (!databaseExists) {
      console.log(`    ⚠️  Database layer not found: ${databaseId}`);
      return null;
    }
    
    console.log(`    ✅ Resolved database: ${databaseId}`);
    
    // Extract database parameters if available
    const databaseParams = ('database' in config && config.database) ? config.database : {};
    
    return {
      id: databaseId,
      category: 'feature',
      parameters: databaseParams,
      features: {},
      externalFiles: [],
      config: undefined
    };
  }

  /**
   * Extract provider name from connector ID
   */
  private extractProviderName(connectorId: string): string {
    // Examples:
    // 'better-auth-nextjs' -> 'better-auth'
    // 'resend-nextjs' -> 'resend'
    // 'stripe-nextjs' -> 'stripe'
    
    const parts = connectorId.split('-');
    if (parts.length > 1) {
      // Remove framework suffix
      const frameworkSuffixes = ['nextjs', 'expo', 'react-native'];
      if (frameworkSuffixes.includes(parts[parts.length - 1])) {
        parts.pop();
      }
    }
    
    return parts.join('-');
  }

  /**
   * Extract features from capability configuration
   * NOTE: This method is no longer needed with new structure, but kept for compatibility
   */
  private extractFeaturesFromConfig<K extends CapabilityId>(
    config: CapabilitySchema[K]
  ): Record<string, any> {
    const features: Record<string, any> = {};
    
    // Extract features from frontend.features if available
    if ('frontend' in config && config.frontend?.features) {
      Object.assign(features, config.frontend.features);
    }
    
    // Add layer presence flags (for compatibility)
    if ('frontend' in config && config.frontend) features.frontend = true;
    if ('backend' in config && config.backend) features.backend = true;
    if ('techStack' in config && config.techStack) features.techStack = true;
    if ('database' in config && config.database) features.database = true;
    
    return features;
  }

  /**
   * Resolve infrastructure modules (frameworks, monorepo tools, etc.)
   */
  private async resolveInfrastructure(project: any): Promise<Module[]> {
    const modules: Module[] = [];
    
    console.log('  🏗️  Resolving infrastructure modules...');
    
    // Add framework module
    if (project.framework) {
      const frameworkId = `framework/${project.framework}`;
      const frameworkExists = await this.moduleExists(frameworkId);
      
      if (frameworkExists) {
        modules.push({
          id: frameworkId,
          category: 'adapter',
          parameters: {
            typescript: true,
            tailwind: true,
            eslint: true,
            appRouter: true,
            srcDir: true,
            importAlias: '@'
          },
          features: {},
          externalFiles: [],
          config: undefined
        });
        console.log(`    ✅ Resolved framework: ${frameworkId}`);
      }
    }
    
    // Add monorepo tool
    if (project.structure === 'monorepo' && project.monorepo?.tool) {
      const monorepoId = `monorepo/${project.monorepo.tool}`;
      const monorepoExists = await this.moduleExists(monorepoId);
      
      if (monorepoExists) {
        modules.push({
          id: monorepoId,
          category: 'adapter',
          parameters: project.monorepo,
          features: {},
          externalFiles: [],
          config: undefined
        });
        console.log(`    ✅ Resolved monorepo tool: ${monorepoId}`);
      }
    }
    
    return modules;
  }

  /**
   * Convert legacy genome module to CLI module format
   */
  private convertGenomeModuleToModule(genomeModule: any): Module {
    return {
      id: genomeModule.id,
      category: genomeModule.category || this.extractCategoryFromModuleId(genomeModule.id),
      parameters: genomeModule.parameters || {},
      features: genomeModule.features || {},
      externalFiles: genomeModule.externalFiles || [],
      config: genomeModule.config
    };
  }

  /**
   * Extract category from module ID
   */
  private extractCategoryFromModuleId(moduleId: string): string {
    const parts = moduleId.split('/');
    return parts[0] || 'unknown';
  }

  /**
   * Check if module exists in marketplace
   */
  private async moduleExists(moduleId: string): Promise<boolean> {
    const fs = await import('fs');
    const path = await import('path');
    
    // Check for adapter
    if (moduleId.startsWith('adapters/')) {
      const adapterPath = path.join(this.marketplacePath, moduleId);
      return fs.existsSync(adapterPath);
    }
    
    // Check for connector
    if (moduleId.startsWith('connectors/')) {
      const connectorPath = path.join(this.marketplacePath, moduleId);
      return fs.existsSync(connectorPath);
    }
    
    // Check for feature
    if (moduleId.startsWith('features/')) {
      const featurePath = path.join(this.marketplacePath, moduleId);
      return fs.existsSync(featurePath);
    }
    
    return false;
  }

  /**
   * Resolve dependencies and conflicts between modules
   */
  private async resolveDependencies(modules: Module[]): Promise<Module[]> {
    // 1. Remove duplicates
    const uniqueModules = this.removeDuplicateModules(modules);
    
    // 2. Resolve conflicts
    const resolvedModules = await this.resolveModuleConflicts(uniqueModules);
    
    // 3. Add missing dependencies
    const modulesWithDependencies = await this.addMissingDependencies(resolvedModules);
    
    return modulesWithDependencies;
  }

  /**
   * Remove duplicate modules (same ID)
   */
  private removeDuplicateModules(modules: Module[]): Module[] {
    const seen = new Set<string>();
    return modules.filter(module => {
      if (seen.has(module.id)) {
        console.log(`    🔄 Removed duplicate module: ${module.id}`);
        return false;
      }
      seen.add(module.id);
      return true;
    });
  }

  /**
   * Resolve conflicts between modules
   */
  private async resolveModuleConflicts(modules: Module[]): Promise<Module[]> {
    // For now, just return modules as-is
    // TODO: Implement conflict resolution logic
    return modules;
  }

  /**
   * Add missing dependencies
   */
  private async addMissingDependencies(modules: Module[]): Promise<Module[]> {
    // For now, just return modules as-is
    // TODO: Implement dependency resolution logic
    return modules;
  }
}

