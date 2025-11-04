/**
 * Capability-First Manifest Generator
 * 
 * Generates a capability-first manifest matching the new genome structure.
 * Maintains backward compatibility with existing manifest.json for SaaS builds.
 * 
 * Structure:
 * - Capability-first organization (matches new genome format)
 * - Provider-specific adapter parameters
 * - UI-agnostic frontend parameters
 * - Standardized tech-stack parameters
 * - Backward-compatible module manifest
 * 
 * @author The Architech Team
 * @version 2.0.0
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { CapabilityAnalyzer } from './capability-analyzer.js';
import { loadModuleSchema } from '../utilities/schema-loader.js';
import { extractModuleId } from '../utilities/module-id-extractor.js';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CapabilityFirstManifest {
  version: '2.1.0';
  generatedAt: string;
  
  // NEW: Capability-first structure
  capabilities: Record<string, CapabilityDefinition>;
  
  // Backward compatibility: Module manifest (for SaaS builds)
  modules: {
    adapters: ModuleEntry[];
    connectors: ModuleEntry[];
    features: ModuleEntry[];
  };
}

interface CapabilityDefinition {
  id: string;
  name: string;
  description: string;
  
  // Providers available for this capability (framework-agnostic)
  providers: ProviderDefinition[];
  
  // Layer definitions
  layers: {
    adapter?: LayerDefinition;
    frontend?: LayerDefinition;
    techStack?: LayerDefinition;
    backend?: LayerDefinition;
    database?: LayerDefinition;
  };
}

interface ProviderDefinition {
  id: string; // e.g., 'better-auth'
  name: string;
  adapterModuleId: string; // e.g., 'auth/better-auth'
  adapterParameters: Record<string, any>; // From adapter.json
  frameworkVariants?: string[]; // e.g., ['nextjs', 'expo']
}

interface LayerDefinition {
  moduleIds: string[]; // e.g., ['features/auth/frontend', 'features/auth/tech-stack']
  parameters: Record<string, any>; // UI-agnostic for frontend, standardized for tech-stack
}

interface ModuleEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'adapter' | 'connector' | 'feature';
  version: string;
  blueprint: string;
  jsonFile: string;
  parameters?: Record<string, any>;
  dependencies?: string[];
  requires?: string[];
  provides?: string[];
  connects?: string[];
  tags?: string[];
  complexity?: 'simple' | 'intermediate' | 'advanced';
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

export async function generateCapabilityFirstManifest(
  marketplacePath: string = process.cwd(),
  outputPath: string = path.join(process.cwd(), 'dist')
): Promise<void> {
  console.log('🚀 Generating Capability-First Manifest...\n');
  
  // 1. Analyze capabilities using enhanced analyzer
  const analyzer = new CapabilityAnalyzer(marketplacePath);
  const capabilityAnalysis = await analyzer.analyzeCapabilities();
  
  // 2. Build capability-first structure
  const manifest: CapabilityFirstManifest = {
    version: '2.1.0',
    generatedAt: new Date().toISOString(),
    capabilities: {},
    modules: {
      adapters: [],
      connectors: [],
      features: []
    }
  };
  
  // 3. Process each capability
  for (const [capabilityId, capabilityInfo] of capabilityAnalysis) {
    const capabilityDef: CapabilityDefinition = {
      id: capabilityId,
      name: capitalize(capabilityId),
      description: `Capability: ${capabilityId}`,
      providers: [],
      layers: {}
    };
    
    // 3.1. Process providers (adapters)
    for (const provider of capabilityInfo.providers) {
      const adapterModuleId = `${capabilityId}/${provider}`; // e.g., 'auth/better-auth'
      const adapterSchema = loadModuleSchema(adapterModuleId, 'adapter', marketplacePath);
      
      // Extract framework variants (check for framework-specific adapters)
      const frameworkVariants = extractFrameworkVariants(
        capabilityInfo.adapters,
        provider,
        capabilityId
      );
      
      const providerDef: ProviderDefinition = {
        id: provider,
        name: adapterSchema.name || capitalize(provider),
        adapterModuleId,
        adapterParameters: capabilityInfo.adapterParameters.get(provider) || {},
        frameworkVariants: frameworkVariants.length > 0 ? frameworkVariants : undefined
      };
      
      capabilityDef.providers.push(providerDef);
      
      // Set adapter layer definition
      if (capabilityInfo.adapterParameters.has(provider)) {
        capabilityDef.layers.adapter = {
          moduleIds: Array.from(capabilityInfo.adapters).filter(id => 
            id.includes(`/${provider}`) || id.includes(`/${provider}-`)
          ),
          parameters: capabilityInfo.adapterParameters.get(provider) || {}
        };
      }
    }
    
    // 3.2. Process layers
    if (capabilityInfo.layers.has('frontend')) {
      const frontendParams = capabilityInfo.frontendParameters.get('frontend') || {};
      const frontendModules = Array.from(capabilityInfo.features).filter(id => 
        id.includes('/frontend')
      );
      
      capabilityDef.layers.frontend = {
        moduleIds: frontendModules,
        parameters: frontendParams
      };
    }
    
    if (capabilityInfo.layers.has('techStack')) {
      const techStackParams = capabilityInfo.techStackParameters.get('techStack') || {};
      const techStackModules = Array.from(capabilityInfo.features).filter(id => 
        id.includes('/tech-stack')
      );
      
      capabilityDef.layers.techStack = {
        moduleIds: techStackModules,
        parameters: techStackParams
      };
    }
    
    if (capabilityInfo.layers.has('backend')) {
      const backendParams = capabilityInfo.backendParameters.get('backend') || {};
      const backendModules = Array.from(capabilityInfo.features).filter(id => 
        id.includes('/backend')
      );
      
      capabilityDef.layers.backend = {
        moduleIds: backendModules,
        parameters: backendParams
      };
    }
    
    if (capabilityInfo.layers.has('database')) {
      const databaseParams = capabilityInfo.databaseParameters.get('database') || {};
      const databaseModules = Array.from(capabilityInfo.features).filter(id => 
        id.includes('/database')
      );
      
      capabilityDef.layers.database = {
        moduleIds: databaseModules,
        parameters: databaseParams
      };
    }
    
    manifest.capabilities[capabilityId] = capabilityDef;
  }
  
  // 4. Build backward-compatible module manifest (for SaaS builds)
  // Reuse logic from generate-marketplace-manifest.ts
  manifest.modules = await buildModuleManifest(marketplacePath);
  
  // 5. Ensure output directory exists
  await fs.mkdir(outputPath, { recursive: true });
  
  // 6. Write capability-first manifest
  const manifestPath = path.join(outputPath, 'capability-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`✅ Capability-First Manifest generated: ${manifestPath}`);
  console.log(`   - ${Object.keys(manifest.capabilities).length} capabilities`);
  console.log(`   - ${manifest.modules.adapters.length} adapters`);
  console.log(`   - ${manifest.modules.connectors.length} connectors`);
  console.log(`   - ${manifest.modules.features.length} features`);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Build backward-compatible module manifest (reuses logic from generate-marketplace-manifest.ts)
 */
async function buildModuleManifest(marketplacePath: string): Promise<{
  adapters: ModuleEntry[];
  connectors: ModuleEntry[];
  features: ModuleEntry[];
}> {
  const modules = {
    adapters: [] as ModuleEntry[],
    connectors: [] as ModuleEntry[],
    features: [] as ModuleEntry[]
  };
  
  // Process adapters
  const adapterFiles = await glob('adapters/**/adapter.json', { cwd: marketplacePath });
  for (const file of adapterFiles) {
    const moduleEntry = await processModuleFile(file, 'adapter', marketplacePath);
    if (moduleEntry) {
      modules.adapters.push(moduleEntry);
    }
  }
  
  // Process connectors
  const connectorFiles = await glob('connectors/**/connector.json', { cwd: marketplacePath });
  for (const file of connectorFiles) {
    const moduleEntry = await processModuleFile(file, 'connector', marketplacePath);
    if (moduleEntry) {
      modules.connectors.push(moduleEntry);
    }
  }
  
  // Process features (from feature manifests for backward compatibility)
  const featureManifestFiles = await glob('dist/features/*.manifest.json', { cwd: marketplacePath });
  for (const file of featureManifestFiles) {
    const featureModules = await processFeatureManifest(file, marketplacePath);
    modules.features.push(...featureModules);
  }
  
  // Also process direct feature.json files for completeness
  const featureFiles = await glob('features/**/feature.json', { cwd: marketplacePath });
  for (const file of featureFiles) {
    const moduleEntry = await processModuleFile(file, 'feature', marketplacePath);
    if (moduleEntry && !modules.features.some(m => m.id === moduleEntry.id)) {
      modules.features.push(moduleEntry);
    }
  }
  
  return modules;
}

/**
 * Process module file (reuses logic from generate-marketplace-manifest.ts)
 */
async function processModuleFile(
  filePath: string,
  type: 'adapter' | 'connector' | 'feature',
  marketplacePath: string
): Promise<ModuleEntry | null> {
  try {
    const fullPath = path.join(marketplacePath, filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    const data = JSON.parse(content);
    
    // Extract module ID using utility
    const moduleId = extractModuleId(filePath, type);
    if (!moduleId) return null;
    
    // Extract category from path
    const pathParts = filePath.split('/');
    const categoryIndex = type === 'adapter' ? 1 : type === 'connector' ? 1 : 1;
    const category = pathParts[categoryIndex] || 'uncategorized';
    
    // Build blueprint path (assume blueprint.ts in same directory)
    const blueprintPath = filePath.replace(/(adapter|connector|feature)\.json$/, 'blueprint.ts');
    
    const moduleEntry: ModuleEntry = {
      id: moduleId,
      name: data.name || moduleId,
      description: data.description || '',
      category: data.category || category,
      type,
      version: data.version || '1.0.0',
      blueprint: blueprintPath,
      jsonFile: filePath
    };
    
    // Add optional fields
    if (data.requires) moduleEntry.requires = data.requires;
    if (data.provides) moduleEntry.provides = data.provides;
    if (data.connects) moduleEntry.connects = data.connects;
    if (data.dependencies) moduleEntry.dependencies = data.dependencies;
    if (data.tags) moduleEntry.tags = data.tags;
    if (data.parameters) moduleEntry.parameters = data.parameters;
    
    // Infer complexity
    if (data.complexity) {
      moduleEntry.complexity = data.complexity;
    } else if (moduleEntry.parameters && Object.keys(moduleEntry.parameters).length > 10) {
      moduleEntry.complexity = 'advanced';
    } else if (moduleEntry.parameters && Object.keys(moduleEntry.parameters).length > 5) {
      moduleEntry.complexity = 'intermediate';
    } else {
      moduleEntry.complexity = 'simple';
    }
    
    return moduleEntry;
  } catch (error) {
    console.warn(`   ⚠️  Failed to process ${filePath}:`, error);
    return null;
  }
}

/**
 * Process feature manifest (reuses logic from generate-marketplace-manifest.ts)
 */
async function processFeatureManifest(
  manifestPath: string,
  marketplacePath: string
): Promise<ModuleEntry[]> {
  try {
    const fullPath = path.join(marketplacePath, manifestPath);
    const content = await fs.readFile(fullPath, 'utf-8');
    const featureManifest = JSON.parse(content);
    
    const entries: ModuleEntry[] = [];
    
    // Process each implementation as a separate module entry
    for (const impl of featureManifest.implementations || []) {
      const entry: ModuleEntry = {
        id: impl.moduleId,
        name: `${featureManifest.name} (${impl.type})`,
        description: featureManifest.description || `${featureManifest.name} ${impl.type} implementation`,
        category: 'features',
        type: 'feature',
        version: featureManifest.version || '1.0.0',
        dependencies: impl.dependencies || [],
        tags: [featureManifest.id, impl.type, ...(impl.stack || [])],
        parameters: impl.parameters || {},
        blueprint: `features/${featureManifest.id}/${impl.type}/${impl.moduleId.split('/').pop()}/blueprint.ts`,
        jsonFile: manifestPath
      };
      
      if (impl.capabilities) entry.provides = impl.capabilities;
      if (impl.constraints) entry.complexity = 'intermediate';
      
      entries.push(entry);
    }
    
    return entries;
  } catch (error) {
    console.warn(`⚠️  Failed to process feature manifest ${manifestPath}:`, error);
    return [];
  }
}

/**
 * Extract framework variants for a provider
 */
function extractFrameworkVariants(
  adapters: Set<string>,
  provider: string,
  capabilityId: string
): string[] {
  const variants: string[] = [];
  const frameworkSuffixes = ['-nextjs', '-expo', '-react-native', '-postgres', '-docker'];
  
  for (const adapterId of adapters) {
    for (const suffix of frameworkSuffixes) {
      if (adapterId.includes(`${provider}${suffix}`)) {
        const variant = suffix.replace(/^-/, ''); // Remove leading dash
        if (!variants.includes(variant)) {
          variants.push(variant);
        }
      }
    }
  }
  
  return variants;
}

/**
 * Capitalize first letter of string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

// ES module entry point check
if (import.meta.url === `file://${process.argv[1]}`) {
  const marketplacePath = process.argv[2] || process.cwd();
  const outputPath = process.argv[3] || path.join(process.cwd(), 'dist');
  
  generateCapabilityFirstManifest(marketplacePath, outputPath)
    .then(() => {
      console.log('\n✅ Capability-First Manifest generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Failed to generate capability-first manifest:', error);
      process.exit(1);
    });
}
