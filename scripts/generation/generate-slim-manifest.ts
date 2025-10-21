/**
 * Slim Manifest Generator for AI Agents
 * 
 * Generates an AI-optimized manifest (manifest.ai.json) from the full manifest.
 * Reduces token usage by ~76% while preserving all decision-critical information.
 * 
 * What's included:
 * - Identity (id, name, description, category)
 * - Capabilities (provides, requiresCapabilities)
 * - Dependencies (requires, connects)
 * - Discovery (tags)
 * 
 * What's removed:
 * - Parameters (defaults, types, validation)
 * - Blueprint paths
 * - Version numbers
 * - Implementation details
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SlimModule {
  id: string;
  name: string;
  description: string;
  category: string;
  provides?: string[];
  requiresCapabilities?: Array<{
    category: string;
    optional: boolean;
    reason: string;
  }>;
  requires?: string[];
  connects?: string[];
  role?: string;           // NEW: Architectural role
  pattern?: string;        // NEW: Architectural pattern
  tags?: string[];
}

interface SlimManifest {
  version: string;
  generatedFrom: string;
  generatedAt: string;
  purpose: string;
  stats: {
    totalModules: number;
    adapters: number;
    connectors: number;
    features: number;
  };
  modules: {
    adapters: SlimModule[];
    connectors: SlimModule[];
    features: SlimModule[];
  };
}

function generateSlimManifest() {
  console.log('📦 Generating Slim Manifest for AI Agents...\n');

  const manifestPath = resolve(__dirname, '../../manifest.json');
  const outputPath = resolve(__dirname, '../../manifest.ai.json');

  // Read full manifest
  const fullManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  // Initialize slim manifest
  const slimManifest: SlimManifest = {
    version: '1.0.0-ai',
    generatedFrom: fullManifest.version,
    generatedAt: new Date().toISOString(),
    purpose: 'AI-optimized manifest for module selection agents. Includes only decision-critical data.',
    stats: {
      totalModules: 0,
      adapters: 0,
      connectors: 0,
      features: 0,
    },
    modules: {
      adapters: [],
      connectors: [],
      features: [],
    },
  };

  // Transform each category
  for (const [category, modules] of Object.entries(fullManifest.modules) as [string, any[]][]) {
    if (!['adapters', 'connectors', 'features'].includes(category)) {
      continue; // Skip genomes and other categories
    }

    slimManifest.modules[category as keyof typeof slimManifest.modules] = modules.map((module) =>
      transformModule(module, category)
    );

    slimManifest.stats[category as keyof typeof slimManifest.stats] = modules.length;
    slimManifest.stats.totalModules += modules.length;
  }

  // Write slim manifest
  writeFileSync(outputPath, JSON.stringify(slimManifest, null, 2));

  // Report results
  const fullSize = JSON.stringify(fullManifest).length;
  const slimSize = JSON.stringify(slimManifest).length;
  const reduction = ((1 - slimSize / fullSize) * 100).toFixed(1);

  console.log('✅ Slim Manifest Generated!\n');
  console.log(`📊 Stats:`);
  console.log(`   Total Modules: ${slimManifest.stats.totalModules}`);
  console.log(`   - Adapters:    ${slimManifest.stats.adapters}`);
  console.log(`   - Connectors:  ${slimManifest.stats.connectors}`);
  console.log(`   - Features:    ${slimManifest.stats.features}`);
  console.log();
  console.log(`💾 Size Comparison:`);
  console.log(`   Full Manifest:  ${(fullSize / 1024).toFixed(1)} KB`);
  console.log(`   Slim Manifest:  ${(slimSize / 1024).toFixed(1)} KB`);
  console.log(`   Reduction:      ${reduction}% smaller`);
  console.log();
  console.log(`📝 Output: ${outputPath}`);
}

function transformModule(module: any, category: string): SlimModule {
  const slim: SlimModule = {
    id: module.id,
    name: module.name,
    description: module.description || '',
    category: module.type || category.slice(0, -1), // Remove trailing 's'
  };

  // Simplify provides
  if (module.provides) {
    slim.provides = simplifyProvides(module.provides);
  }

  // Include requiresCapabilities (our new semantic field!)
  if (module.requiresCapabilities) {
    slim.requiresCapabilities = module.requiresCapabilities;
  }

  // CONSOLIDATED DEPENDENCIES
  // Unify requires/dependencies/prerequisites into single "requires" field
  const consolidated = consolidateDependencies(module);
  if (consolidated && consolidated.length > 0) {
    slim.requires = consolidated;
  }

  // Include connector bridges
  if (module.connects && module.connects.length > 0) {
    slim.connects = module.connects;
  }

  // Include architectural metadata (NEW!)
  if (module.role) {
    slim.role = module.role;
  }

  if (module.pattern) {
    slim.pattern = module.pattern;
  }

  // Generate semantic tags
  slim.tags = generateTags(module, category);

  return slim;
}

/**
 * Consolidate various dependency field formats into a single array
 * Handles: requires, dependencies, prerequisites.adapters, prerequisites.modules
 */
function consolidateDependencies(module: any): string[] {
  // Priority order: requires > dependencies > prerequisites
  if (module.requires && Array.isArray(module.requires) && module.requires.length > 0) {
    return module.requires;
  }

  if (module.dependencies && Array.isArray(module.dependencies) && module.dependencies.length > 0) {
    return module.dependencies;
  }

  // Handle prerequisites object (features often use this)
  if (module.prerequisites) {
    // prerequisites.adapters (array of adapter IDs)
    if (Array.isArray(module.prerequisites.adapters) && module.prerequisites.adapters.length > 0) {
      return module.prerequisites.adapters;
    }
    
    // prerequisites.modules (array of module IDs)
    if (Array.isArray(module.prerequisites.modules) && module.prerequisites.modules.length > 0) {
      return module.prerequisites.modules;
    }
    
    // prerequisites.capabilities (array of capability names - different semantic meaning)
    // Skip this - it's covered by requiresCapabilities
  }

  return [];
}

function simplifyProvides(provides: any): string[] {
  let result: string[] = [];

  // Already simple array of strings
  if (Array.isArray(provides) && (provides.length === 0 || typeof provides[0] === 'string')) {
    result = provides;
  }
  // Array of objects with 'name' property
  else if (Array.isArray(provides) && typeof provides[0] === 'object' && provides[0].name) {
    result = provides.map((p) => p.name);
  }
  // Single string
  else if (typeof provides === 'string') {
    result = [provides];
  }

  // Clean up: remove template variables and duplicates
  result = result
    .filter((item) => !item.includes('{{')) // Remove EJS/Handlebars templates
    .filter((item) => item !== 'unknown')    // Remove placeholder values
    .filter((item, index, self) => self.indexOf(item) === index); // Remove duplicates

  return result;
}

function generateTags(module: any, category: string): string[] {
  const tags = new Set<string>();

  // Add category
  tags.add(category.slice(0, -1)); // Remove trailing 's' (adapters → adapter)

  // Add from provides
  if (module.provides) {
    const provides = simplifyProvides(module.provides);
    provides.forEach((p) => tags.add(p));
  }

  // Add from connects (for connectors)
  if (module.connects && Array.isArray(module.connects)) {
    module.connects.forEach((c: string) => tags.add(c));
  }

  // Extract keywords from name and description
  const text = `${module.name} ${module.description}`.toLowerCase();
  const keywords = [
    // Frameworks
    'nextjs',
    'react',
    'expo',
    
    // Features
    'auth',
    'authentication',
    'database',
    'payment',
    'email',
    'monitoring',
    'ai',
    'chat',
    'teams',
    'organizations',
    
    // Technologies
    'ui',
    'api',
    'backend',
    'frontend',
    'typescript',
    'javascript',
    
    // Capabilities
    'state',
    'forms',
    'validation',
    'testing',
    'styling',
    'deployment',
  ];

  keywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  });

  // Clean up: remove template variables and duplicates
  const cleanTags = Array.from(tags)
    .filter((tag) => !tag.includes('{{'))     // Remove EJS/Handlebars templates
    .filter((tag) => tag !== 'unknown')        // Remove placeholder values
    .sort();

  return cleanTags;
}

// Run generator
try {
  generateSlimManifest();
} catch (error) {
  console.error('❌ Error generating slim manifest:', error);
  process.exit(1);
}

