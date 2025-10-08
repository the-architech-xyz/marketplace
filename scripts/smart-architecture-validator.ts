/**
 * Smart Architecture Validator
 * 
 * Uses auto-generated ModuleArtifacts to perform pre-execution architectural validation
 */

import { ModuleArtifacts, ValidationResult, ValidationError, ValidationWarning, ModuleArtifactsRegistry } from '@thearchitech.xyz/types';
import { TemplatePathResolver } from './template-path-resolver';

export interface Module {
  id: string;
  type: 'adapter' | 'integration';
  dependencies?: string[];
  parameters?: Record<string, any>;
}

export interface Genome {
  project: {
    name: string;
    framework: string;
    [key: string]: any;
  };
  modules: Module[];
}

export class SmartArchitectureValidator {
  private pathResolver: TemplatePathResolver;
  private artifactCache = new Map<string, ModuleArtifacts>();

  constructor() {
    this.pathResolver = new TemplatePathResolver();
  }

  /**
   * Validate the entire genome for architectural compliance
   */
  async validateGenome(genome: Genome): Promise<ValidationResult> {
    console.log('🔍 Starting architectural validation...');
    
    const results = await Promise.all([
      this.validateFileOwnership(genome),
      this.detectCreateConflicts(genome),
      this.validateDependencies(genome)
    ]);
    
    const allErrors = results.flatMap(r => r.errors);
    const allWarnings = results.flatMap(r => r.warnings);
    
    const isValid = allErrors.length === 0;
    
    if (isValid) {
      console.log('✅ Architectural validation passed!');
    } else {
      console.log(`❌ Architectural validation failed with ${allErrors.length} errors`);
      allErrors.forEach(error => {
        console.log(`  - ${error.message}`);
      });
    }
    
    return {
      isValid,
      errors: allErrors,
      warnings: allWarnings
    };
  }

  /**
   * Validate file ownership - ensure integrators only enhance files owned by their dependencies
   */
  async validateFileOwnership(genome: Genome): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    console.log('🔍 Validating file ownership...');
    
    // Load artifacts for all modules
    const moduleArtifacts = await this.loadModuleArtifacts(genome.modules);
    
    // Build ownership map from adapters
    const ownershipMap = new Map<string, string>();
    for (const [moduleId, artifacts] of moduleArtifacts) {
      const module = genome.modules.find(m => m.id === moduleId);
      if (!module || module.type !== 'adapter') continue;
      
      for (const fileArtifact of artifacts.creates) {
        const resolvedPath = this.pathResolver.resolvePath(fileArtifact.path, module.parameters || {});
        ownershipMap.set(resolvedPath, moduleId);
      }
    }
    
    console.log(`📊 Built ownership map with ${ownershipMap.size} files`);
    
    // Validate integrators
    for (const [moduleId, artifacts] of moduleArtifacts) {
      const module = genome.modules.find(m => m.id === moduleId);
      if (!module || module.type !== 'integration') continue;
      
      const adapterDependencies = this.getAdapterDependencies(module);
      
      for (const enhanceFile of artifacts.enhances) {
        const resolvedPath = this.pathResolver.resolvePath(enhanceFile.path, module.parameters || {});
        const actualOwner = ownershipMap.get(resolvedPath);
        
        if (!actualOwner) {
          errors.push({
            type: 'FILE_OWNERSHIP_VIOLATION',
            module: moduleId,
            message: `File '${resolvedPath}' is not created by any adapter`,
            details: { file: resolvedPath }
          });
        } else if (!adapterDependencies.includes(actualOwner)) {
          errors.push({
            type: 'FILE_OWNERSHIP_VIOLATION',
            module: moduleId,
            message: `File '${resolvedPath}' is owned by '${actualOwner}' which is not a declared dependency`,
            details: { 
              file: resolvedPath, 
              actualOwner,
              expectedOwner: adapterDependencies.join(', ')
            }
          });
        } else if (enhanceFile.owner && enhanceFile.owner !== actualOwner) {
          errors.push({
            type: 'FILE_OWNERSHIP_VIOLATION',
            module: moduleId,
            message: `File '${resolvedPath}' is owned by '${actualOwner}', expected '${enhanceFile.owner}'`,
            details: { 
              file: resolvedPath, 
              actualOwner,
              expectedOwner: enhanceFile.owner
            }
          });
        }
      }
    }
    
    console.log(`📊 File ownership validation: ${errors.length} errors, ${warnings.length} warnings`);
    
    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Detect conflicts where multiple modules try to create the same file
   */
  async detectCreateConflicts(genome: Genome): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    console.log('🔍 Detecting create conflicts...');
    
    const moduleArtifacts = await this.loadModuleArtifacts(genome.modules);
    const createMap = new Map<string, string[]>();
    
    // Collect all create paths
    for (const [moduleId, artifacts] of moduleArtifacts) {
      const module = genome.modules.find(m => m.id === moduleId);
      if (!module) continue;
      
      for (const fileArtifact of artifacts.creates) {
        const resolvedPath = this.pathResolver.resolvePath(fileArtifact.path, module.parameters || {});
        if (!createMap.has(resolvedPath)) {
          createMap.set(resolvedPath, []);
        }
        createMap.get(resolvedPath)!.push(moduleId);
      }
    }
    
    // Detect conflicts
    for (const [path, modules] of createMap.entries()) {
      if (modules.length > 1) {
        errors.push({
          type: 'CREATE_CONFLICT',
          module: modules[0], // Primary module
          message: `Multiple modules trying to create '${path}'`,
          details: { 
            file: path, 
            conflictingModules: modules 
          }
        });
      }
    }
    
    console.log(`📊 Create conflict detection: ${errors.length} conflicts found`);
    
    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate module dependencies
   */
  async validateDependencies(genome: Genome): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    console.log('🔍 Validating dependencies...');
    
    const moduleIds = new Set(genome.modules.map(m => m.id));
    
    for (const module of genome.modules) {
      if (module.dependencies) {
        for (const dependency of module.dependencies) {
          if (!moduleIds.has(dependency)) {
            errors.push({
              type: 'MISSING_DEPENDENCY',
              module: module.id,
              message: `Module '${module.id}' depends on '${dependency}' which is not in the genome`,
              details: { file: dependency }
            });
          }
        }
      }
    }
    
    console.log(`📊 Dependency validation: ${errors.length} errors, ${warnings.length} warnings`);
    
    return { isValid: errors.length === 0, errors, warnings };
  }

  /**
   * Load artifacts for all modules in the genome
   */
  private async loadModuleArtifacts(modules: Module[]): Promise<Map<string, ModuleArtifacts>> {
    const artifacts = new Map<string, ModuleArtifacts>();
    
    for (const module of modules) {
      if (this.artifactCache.has(module.id)) {
        artifacts.set(module.id, this.artifactCache.get(module.id)!);
        continue;
      }
      
      try {
        // Load artifacts from generated types
        const artifactLoader = (ModuleArtifacts as ModuleArtifactsRegistry)[module.id];
        if (artifactLoader) {
          const moduleArtifacts = await artifactLoader();
          this.artifactCache.set(module.id, moduleArtifacts);
          artifacts.set(module.id, moduleArtifacts);
        } else {
          console.warn(`⚠️  No artifacts found for module: ${module.id}`);
          // Create empty artifacts for missing modules
          const emptyArtifacts: ModuleArtifacts = {
            creates: [],
            enhances: [],
            installs: [],
            envVars: []
          };
          artifacts.set(module.id, emptyArtifacts);
        }
      } catch (error) {
        console.warn(`⚠️  Failed to load artifacts for module ${module.id}:`, error);
        // Create empty artifacts for failed modules
        const emptyArtifacts: ModuleArtifacts = {
          creates: [],
          enhances: [],
          installs: [],
          envVars: []
        };
        artifacts.set(module.id, emptyArtifacts);
      }
    }
    
    return artifacts;
  }

  /**
   * Get adapter dependencies for a module
   */
  private getAdapterDependencies(module: Module): string[] {
    if (!module.dependencies) return [];
    
    // Filter to only include adapter dependencies
    // For now, we'll assume all dependencies are adapters
    // In a more sophisticated implementation, we'd check the module type
    return module.dependencies;
  }

  /**
   * Clear the artifact cache
   */
  clearCache(): void {
    this.artifactCache.clear();
  }
}
