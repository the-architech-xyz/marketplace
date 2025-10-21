/**
 * Enhanced Marketplace Manifest Generator v2.0
 * 
 * Generates a comprehensive manifest.json file for the marketplace
 * with rich metadata, module relationships, and genome information.
 * 
 * @author The Architech Team
 * @version 2.0.0
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface EnhancedMarketplaceManifest {
  version: '2.0.0';
  generatedAt: string;
  
  stats: {
    totalModules: number;
    adapters: number;
    connectors: number;
    features: number;
    genomes: number;
    lastUpdated: string;
  };
  
  modules: {
    adapters: ModuleEntry[];
    connectors: ModuleEntry[];
    features: ModuleEntry[];
  };
  
  genomes: GenomeEntry[];
  categories: CategoryInfo[];
  tags: string[];
}

interface ModuleEntry {
    id: string;
  name: string;
  description: string;
  category: string;
  type: 'adapter' | 'connector' | 'feature';
    version: string;
  
  // Relationships
  requires?: string[];
  provides?: string[];
  connects?: string[];
    dependencies?: string[];
  requiresCapabilities?: Array<{
    category: string;
    optional: boolean;
    reason: string;
  }>;
  
  // Metadata
    tags?: string[];
  complexity?: 'simple' | 'intermediate' | 'advanced';
  role?: string;           // NEW: Architectural role
  pattern?: string;        // NEW: Architectural pattern
  
  // Parameters
  parameters?: Record<string, any>;
  
  // Paths
  blueprint: string;
  jsonFile: string;
}

interface GenomeEntry {
  id: string;
  name: string;
  description: string;
  path: string;
  
  // Metadata
  stack?: string;
  useCase?: string;
  pattern?: string;
  
  // Categorization
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  tags: string[];
  
  // Modules
  modules: {
    adapters: string[];
    connectors: string[];
    features: string[];
  };
  moduleCount: number;
  
  // Aliases
  aliases?: string[];
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon?: string;
  moduleCount: number;
  modules: string[];
}

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================

const CATEGORY_INFO: Record<string, Omit<CategoryInfo, 'moduleCount' | 'modules'>> = {
  'framework': {
    id: 'framework',
    name: 'Frameworks',
    description: 'Core application frameworks',
    icon: '🏗️'
  },
  'database': {
    id: 'database',
    name: 'Databases',
    description: 'Database ORMs and integrations',
    icon: '🗄️'
  },
  'ui': {
    id: 'ui',
    name: 'UI Libraries',
    description: 'User interface libraries and components',
    icon: '🎨'
  },
  'auth': {
    id: 'auth',
    name: 'Authentication',
    description: 'Authentication and authorization',
    icon: '🔐'
  },
  'payment': {
    id: 'payment',
    name: 'Payments',
    description: 'Payment processing integrations',
    icon: '💳'
  },
  'email': {
    id: 'email',
    name: 'Email',
    description: 'Email service integrations',
    icon: '📧'
  },
  'state': {
    id: 'state',
    name: 'State Management',
    description: 'Client-side state management',
    icon: '🔄'
  },
  'data-fetching': {
    id: 'data-fetching',
    name: 'Data Fetching',
    description: 'Data fetching and caching',
    icon: '📡'
  },
  'testing': {
    id: 'testing',
    name: 'Testing',
    description: 'Testing frameworks and tools',
    icon: '🧪'
  },
  'quality': {
    id: 'quality',
    name: 'Code Quality',
    description: 'Linting, formatting, and quality tools',
    icon: '✨'
  },
  'observability': {
    id: 'observability',
    name: 'Observability',
    description: 'Monitoring, logging, and error tracking',
    icon: '📊'
  },
  'deployment': {
    id: 'deployment',
    name: 'Deployment',
    description: 'Deployment platforms and tools',
    icon: '🚀'
  },
  'content': {
    id: 'content',
    name: 'Content Management',
    description: 'Content and internationalization',
    icon: '📝'
  },
  'blockchain': {
    id: 'blockchain',
    name: 'Web3 & Blockchain',
    description: 'Blockchain and Web3 integrations',
    icon: '⛓️'
  },
  'ai': {
    id: 'ai',
    name: 'AI & ML',
    description: 'Artificial intelligence and machine learning',
    icon: '🤖'
  },
  'services': {
    id: 'services',
    name: 'External Services',
    description: 'Third-party service integrations',
    icon: '🔌'
  },
  'core': {
    id: 'core',
    name: 'Core Utilities',
    description: 'Essential utilities and tools',
    icon: '⚙️'
  }
};

// ============================================================================
// MAIN GENERATOR
// ============================================================================

async function generateEnhancedManifest(): Promise<void> {
  console.log('🔍 Scanning marketplace for modules and genomes...\n');
  
  const manifest: EnhancedMarketplaceManifest = {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    stats: {
      totalModules: 0,
      adapters: 0,
      connectors: 0,
      features: 0,
      genomes: 0,
      lastUpdated: new Date().toISOString()
    },
    modules: {
      adapters: [],
      connectors: [],
      features: []
    },
    genomes: [],
    categories: [],
    tags: []
  };

  try {
    // Process Adapters
    console.log('📦 Processing adapters...');
    const adapterFiles = await glob('adapters/**/adapter.json', { cwd: process.cwd() });
    for (const file of adapterFiles) {
      const moduleEntry = await processModuleFile(file, 'adapter');
      if (moduleEntry) {
        manifest.modules.adapters.push(moduleEntry);
      }
    }
    console.log(`   ✅ Found ${manifest.modules.adapters.length} adapters\n`);

    // Process Connectors
    console.log('🔗 Processing connectors...');
    const connectorFiles = await glob('connectors/**/connector.json', { cwd: process.cwd() });
    for (const file of connectorFiles) {
      const moduleEntry = await processModuleFile(file, 'connector');
      if (moduleEntry) {
        manifest.modules.connectors.push(moduleEntry);
      }
    }
    console.log(`   ✅ Found ${manifest.modules.connectors.length} connectors\n`);

    // Process Features (from feature manifests)
    console.log('✨ Processing features...');
    const featureManifestFiles = await glob('dist/features/*.manifest.json', { cwd: process.cwd() });
    for (const file of featureManifestFiles) {
      const featureModules = await processFeatureManifest(file);
      manifest.modules.features.push(...featureModules);
    }
    console.log(`   ✅ Found ${manifest.modules.features.length} feature implementations\n`);

    // Process Genomes
    console.log('🧬 Processing genomes...');
    const genomeFiles = await glob('genomes/**/*.genome.ts', { cwd: process.cwd() });
    for (const file of genomeFiles) {
      const genomeEntry = await processGenomeFile(file);
      if (genomeEntry) {
        manifest.genomes.push(genomeEntry);
      }
    }
    console.log(`   ✅ Found ${manifest.genomes.length} genomes\n`);

    // Calculate stats
    manifest.stats.adapters = manifest.modules.adapters.length;
    manifest.stats.connectors = manifest.modules.connectors.length;
    manifest.stats.features = manifest.modules.features.length;
    manifest.stats.genomes = manifest.genomes.length;
    manifest.stats.totalModules = manifest.stats.adapters + manifest.stats.connectors + manifest.stats.features;

    // Build categories
    manifest.categories = buildCategories(manifest.modules);

    // Build tags (unique from all modules)
    const allTags = new Set<string>();
    [...manifest.modules.adapters, ...manifest.modules.connectors, ...manifest.modules.features]
      .forEach(m => m.tags?.forEach(t => allTags.add(t)));
    manifest.genomes.forEach(g => g.tags.forEach(t => allTags.add(t)));
    manifest.tags = Array.from(allTags).sort();

    // Write manifest
    const manifestPath = path.join(process.cwd(), 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log('✅ Enhanced manifest generated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Total Modules: ${manifest.stats.totalModules}`);
    console.log(`   - Adapters: ${manifest.stats.adapters}`);
    console.log(`   - Connectors: ${manifest.stats.connectors}`);
    console.log(`   - Features: ${manifest.stats.features}`);
    console.log(`   - Genomes: ${manifest.stats.genomes}`);
    console.log(`   - Categories: ${manifest.categories.length}`);
    console.log(`   - Tags: ${manifest.tags.length}`);
    console.log(`\n📄 Manifest saved to: ${manifestPath}\n`);
    
  } catch (error) {
    console.error('❌ Failed to generate manifest:', error);
    process.exit(1);
  }
}

// ============================================================================
// FEATURE MANIFEST PROCESSOR
// ============================================================================

async function processFeatureManifest(manifestPath: string): Promise<ModuleEntry[]> {
  try {
    const content = await fs.readFile(manifestPath, 'utf-8');
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
        
        // Dependencies from implementation
        dependencies: impl.dependencies || [],
        
        // Feature-specific metadata
        tags: [featureManifest.id, impl.type, ...(impl.stack || [])],
        
        // Parameters from implementation
        parameters: impl.parameters || {},
        
        // Paths
        blueprint: `features/${featureManifest.id}/${impl.type}/${impl.moduleId.split('/').pop()}/blueprint.ts`,
        jsonFile: manifestPath
      };
      
      // Add feature-specific fields
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

// ============================================================================
// MODULE PROCESSOR
// ============================================================================

async function processModuleFile(
  filePath: string,
  type: 'adapter' | 'connector' | 'feature'
): Promise<ModuleEntry | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // Extract category from path
    const pathParts = filePath.split('/');
    const categoryIndex = type === 'adapter' ? 1 : type === 'connector' ? 1 : 1;
    const category = pathParts[categoryIndex] || 'uncategorized';
    
    // Build module ID from path
    let moduleId: string;
    if (type === 'adapter') {
      // adapters/framework/nextjs/adapter.json -> framework/nextjs
      moduleId = pathParts.slice(1, -1).join('/');
    } else if (type === 'connector') {
      // connectors/tanstack-query-nextjs/connector.json -> connectors/tanstack-query-nextjs
      moduleId = `connectors/${pathParts.slice(1, -1).join('/')}`;
    } else {
      // features/auth/tech-stack/feature.json -> features/auth/tech-stack
      moduleId = pathParts.slice(0, -1).join('/');
    }
    
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
    if (data.requiresCapabilities) moduleEntry.requiresCapabilities = data.requiresCapabilities;
    if (data.tags) moduleEntry.tags = data.tags;
    if (data.parameters) moduleEntry.parameters = data.parameters;
    
    // Infer complexity from module metadata
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

// ============================================================================
// GENOME PROCESSOR
// ============================================================================

async function processGenomeFile(filePath: string): Promise<GenomeEntry | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Extract metadata from JSDoc comments
    const nameMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/);
    const descMatch = content.match(/\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\s*\n/);
    const stackMatch = content.match(/\*\s*Stack:\s*(.+)/);
    const useCaseMatch = content.match(/\*\s*Use Case:\s*(.+)/);
    const patternMatch = content.match(/\*\s*Pattern:\s*(.+)/);
    
    // Extract genome ID from filename
    const filename = path.basename(filePath, '.genome.ts');
    const genomeId = filename.replace(/^\d+-/, ''); // Remove numbering like "01-"
    
    // Extract modules from genome definition
    const modulesMatch = content.match(/modules:\s*\[([\s\S]*?)\]/);
    const adapters: string[] = [];
    const connectors: string[] = [];
    const features: string[] = [];
    
    if (modulesMatch) {
      const modulesContent = modulesMatch[1];
      const idMatches = modulesContent.matchAll(/id:\s*['"`]([^'"`]+)['"`]/g);
      
      for (const match of idMatches) {
        const id = match[1];
        if (id.startsWith('features/')) {
          features.push(id);
        } else if (id.startsWith('connectors/')) {
          connectors.push(id);
        } else {
          adapters.push(id);
        }
      }
    }
    
    // Infer complexity from module count
    const totalModules = adapters.length + connectors.length + features.length;
    let complexity: 'simple' | 'intermediate' | 'advanced';
    if (totalModules <= 5) {
      complexity = 'simple';
    } else if (totalModules <= 15) {
      complexity = 'intermediate';
    } else {
      complexity = 'advanced';
    }
    
    // Extract tags from content
    const tags: string[] = [];
    if (content.includes('nextjs')) tags.push('nextjs');
    if (content.includes('drizzle')) tags.push('drizzle');
    if (content.includes('prisma')) tags.push('prisma');
    if (content.includes('better-auth')) tags.push('auth');
    if (content.includes('stripe')) tags.push('payments');
    if (content.includes('vercel-ai')) tags.push('ai');
    if (content.includes('web3')) tags.push('web3');
    if (content.includes('shadcn')) tags.push('shadcn-ui');
    if (content.includes('tailwind')) tags.push('tailwind');
    if (content.includes('typescript')) tags.push('typescript');
    
    // Determine estimated time based on complexity
    let estimatedTime: string;
    if (complexity === 'simple') {
      estimatedTime = '5 minutes';
    } else if (complexity === 'intermediate') {
      estimatedTime = '15-30 minutes';
    } else {
      estimatedTime = '45+ minutes';
    }
    
    const genomeEntry: GenomeEntry = {
      id: genomeId,
      name: nameMatch?.[1]?.trim() || genomeId,
      description: descMatch?.[1]?.trim() || '',
      path: filePath,
      complexity,
      estimatedTime,
      tags,
      modules: {
        adapters,
        connectors,
        features
      },
      moduleCount: totalModules
    };
    
    if (stackMatch) genomeEntry.stack = stackMatch[1].trim();
    if (useCaseMatch) genomeEntry.useCase = useCaseMatch[1].trim();
    if (patternMatch) genomeEntry.pattern = patternMatch[1].trim();
    
    // Add aliases (common variations)
    genomeEntry.aliases = [genomeId];
    if (genomeId.includes('-')) {
      genomeEntry.aliases.push(genomeId.replace(/-/g, ''));
    }
    if (filename.match(/^\d+-/)) {
      genomeEntry.aliases.push(filename.match(/^(\d+)-/)?.[1] || '');
    }
    
    return genomeEntry;
  } catch (error) {
    console.warn(`   ⚠️  Failed to process ${filePath}:`, error);
    return null;
  }
}

// ============================================================================
// CATEGORY BUILDER
// ============================================================================

function buildCategories(modules: EnhancedMarketplaceManifest['modules']): CategoryInfo[] {
  const categoryMap = new Map<string, Set<string>>();
  
  // Collect modules by category
  const allModules = [...modules.adapters, ...modules.connectors, ...modules.features];
  allModules.forEach(module => {
    if (!categoryMap.has(module.category)) {
      categoryMap.set(module.category, new Set());
    }
    categoryMap.get(module.category)!.add(module.id);
  });
  
  // Build category info
  const categories: CategoryInfo[] = [];
  categoryMap.forEach((moduleIds, categoryId) => {
    const info = CATEGORY_INFO[categoryId] || {
      id: categoryId,
      name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
      description: `${categoryId} modules`,
      icon: '📦'
    };
    
    categories.push({
      ...info,
      moduleCount: moduleIds.size,
      modules: Array.from(moduleIds).sort()
    });
  });
  
  return categories.sort((a, b) => b.moduleCount - a.moduleCount);
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (import.meta.url === `file://${process.argv[1]}`) {
  generateEnhancedManifest().catch(console.error);
}

export { generateEnhancedManifest };
