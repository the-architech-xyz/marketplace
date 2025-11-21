/**
 * Recipe Book Builder
 * 
 * Generates recipe-book.json that maps Business Packages to Technical Modules.
 * 
 * The recipe book is the V2 equivalent of capability-manifest.json, but structured
 * for declarative package → module resolution.
 * 
 * IMPORTANT: Features should be generic (no technology-specific frontend modules).
 * UI marketplaces (shadcn, tamagui) handle technology-specific parts.
 * Always use generic feature IDs like 'features/{name}/frontend', not 'features/{name}/frontend/shadcn'.
 */

import fs from 'fs';
import path from 'path';
import type { RecipeBook, PackageRecipe, ProviderRecipe } from '@thearchitech.xyz/types';

interface ManifestModule {
  id: string;
  name: string;
  category: string;
  type: 'adapter' | 'connector' | 'feature';
  version: string;
  requires?: string[];
  provides?: any[];
  [key: string]: any;
}

interface MarketplaceManifest {
  modules: {
    adapters: ManifestModule[];
    connectors: ManifestModule[];
    features: ManifestModule[];
  };
}

/**
 * Load marketplace manifest
 */
async function loadManifest(): Promise<MarketplaceManifest> {
  const manifestPath = path.join(process.cwd(), 'marketplace', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('manifest.json not found');
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

/**
 * Find connectors that bridge a capability and framework
 */
function findRelevantConnectors(
  capabilityName: string,
  providerName: string,
  manifest: MarketplaceManifest
): string[] {
  const connectors: string[] = [];

  // Search for connectors matching this capability/provider
  for (const connector of manifest.modules.connectors || []) {
    const connectorId = connector.id.toLowerCase();
    const capabilityLower = capabilityName.toLowerCase();
    const providerLower = providerName.toLowerCase();

    // Pattern: connectors/{capability}/{provider}-{framework}
    if (
      connectorId.includes(capabilityLower) &&
      connectorId.includes(providerLower)
    ) {
      connectors.push(connector.id);
    }
  }

  return connectors;
}

/**
 * Infer package dependencies from modules
 */
function inferPackageDependencies(modules: string[], manifest: MarketplaceManifest): string[] {
  const deps = new Set<string>();

  for (const moduleId of modules) {
    // Heuristic: If auth module, likely depends on database and ui
    if (moduleId.includes('auth') && !moduleId.includes('connector')) {
      deps.add('database');
      deps.add('ui');
    }

    // If payments module, likely depends on database
    if (moduleId.includes('payment') && !moduleId.includes('connector')) {
      deps.add('database');
    }

    // If any feature, likely depends on ui
    if (moduleId.startsWith('features/')) {
      deps.add('ui');
    }
  }

  return Array.from(deps);
}

/**
 * Map capability to modules based on manifest
 */
function mapCapabilityToModules(
  capabilityName: string,
  providerName: string,
  manifest: MarketplaceManifest
): string[] {
  const modules: string[] = [];

  // 1. Find adapter
  const adapterId = `adapters/${capabilityName}/${providerName}`;
  const adapter = manifest.modules.adapters.find(m => m.id === adapterId);
  if (adapter) {
    modules.push(adapterId);
  }

  // 2. Find connectors
  const connectors = findRelevantConnectors(capabilityName, providerName, manifest);
  modules.push(...connectors);

  // 3. Find feature layers
  const frontendFeature = manifest.modules.features.find(
    m => m.id === `features/${capabilityName}/frontend`
  );
  if (frontendFeature) {
    modules.push(frontendFeature.id);
  }

  const techStackFeature = manifest.modules.features.find(
    m => m.id === `features/${capabilityName}/tech-stack`
  );
  if (techStackFeature) {
    modules.push(techStackFeature.id);
  }

  const backendFeature = manifest.modules.features.find(
    m => m.id.includes(`features/${capabilityName}/backend`)
  );
  if (backendFeature) {
    modules.push(backendFeature.id);
  }

  return modules;
}

/**
 * Build recipe book from manifest
 */
async function buildRecipeBook(): Promise<RecipeBook> {
  const manifest = await loadManifest();

  const recipeBook: RecipeBook = {
    version: '1.0.0',
    packages: {}
  };

  // ============================================================================
  // AUTH PACKAGE
  // ============================================================================
  recipeBook.packages['auth'] = {
    defaultProvider: 'better-auth',
    providers: {
      'better-auth': {
        modules: [
          { id: 'adapters/auth/better-auth', version: '1.0.0' },
          { id: 'connectors/auth/better-auth-nextjs', version: '1.0.0' },
          { id: 'features/auth/frontend', version: '1.0.0' },
          { id: 'features/auth/tech-stack', version: '1.0.0' }
        ],
        dependencies: {
          packages: ['ui', 'database']
        }
      }
    }
  };

  // ============================================================================
  // UI PACKAGE
  // ============================================================================
  recipeBook.packages['ui'] = {
    defaultProvider: 'tamagui',
    providers: {
      'tamagui': {
        modules: [
          { id: 'adapters/ui/tamagui', version: '1.0.0' },
          { id: 'connectors/ui/tamagui-nextjs', version: '1.0.0' },
          { id: 'connectors/ui/tamagui-expo', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      },
      'shadcn': {
        modules: [
          { id: 'adapters/ui/shadcn-ui', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // ============================================================================
  // DATABASE PACKAGE
  // ============================================================================
  recipeBook.packages['database'] = {
    defaultProvider: 'drizzle',
    providers: {
      'drizzle': {
        modules: [
          { id: 'adapters/database/drizzle', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // ============================================================================
  // PAYMENTS PACKAGE
  // ============================================================================
  recipeBook.packages['payments'] = {
    defaultProvider: 'stripe',
    providers: {
      'stripe': {
        modules: [
          { id: 'adapters/payment/stripe', version: '1.0.0' },
          { id: 'features/payments/frontend', version: '1.0.0' },
          { id: 'features/payments/tech-stack', version: '1.0.0' }
        ],
        dependencies: {
          packages: ['database', 'auth']
        }
      }
    }
  };

  // ============================================================================
  // EMAILING PACKAGE
  // ============================================================================
  recipeBook.packages['emailing'] = {
    defaultProvider: 'resend',
    providers: {
      'resend': {
        modules: [
          { id: 'adapters/email/resend', version: '1.0.0' },
          { id: 'connectors/email/resend-nextjs', version: '1.0.0' },
          { id: 'features/emailing/frontend', version: '1.0.0' },
          { id: 'features/emailing/tech-stack', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // ============================================================================
  // AI-CHAT PACKAGE
  // ============================================================================
  // NOTE: Features should be generic (no technology-specific frontend modules)
  // UI marketplaces (shadcn, tamagui) handle technology-specific parts
  // Backend modules can be framework-specific (e.g., backend/nextjs, backend/hono)
  recipeBook.packages['ai-chat'] = {
    defaultProvider: 'custom',
    providers: {
      'custom': {
        modules: [
          { id: 'features/ai-chat/frontend', version: '1.0.0' }, // Generic frontend, not technology-specific
          { id: 'features/ai-chat/tech-stack', version: '1.0.0' },
          { id: 'features/ai-chat/backend/nextjs', version: '1.0.0' } // Framework-specific backend is OK
        ],
        dependencies: {
          packages: ['ui', 'database']
        }
      }
    }
  };

  // ============================================================================
  // INFRASTRUCTURE PACKAGES
  // ============================================================================

  // Monorepo
  recipeBook.packages['monorepo'] = {
    defaultProvider: 'turborepo',
    providers: {
      'turborepo': {
        modules: [
          { id: 'adapters/monorepo/turborepo', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      },
      'nx': {
        modules: [
          { id: 'adapters/monorepo/nx', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Backend
  recipeBook.packages['backend'] = {
    defaultProvider: 'hono',
    providers: {
      'hono': {
        modules: [
          { id: 'adapters/backend/api-hono', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Jobs
  recipeBook.packages['jobs'] = {
    defaultProvider: 'inngest',
    providers: {
      'inngest': {
        modules: [
          { id: 'adapters/jobs/inngest', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      },
      'bullmq': {
        modules: [
          { id: 'adapters/jobs/bullmq', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Storage
  recipeBook.packages['storage'] = {
    defaultProvider: 's3-compatible',
    providers: {
      's3-compatible': {
        modules: [
          { id: 'adapters/storage/s3-compatible', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Data Fetching
  recipeBook.packages['data-fetching'] = {
    defaultProvider: 'trpc',
    providers: {
      'trpc': {
        modules: [
          { id: 'adapters/data-fetching/trpc', version: '1.0.0' },
          { id: 'connectors/trpc-hono', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      },
      'tanstack-query': {
        modules: [
          { id: 'adapters/data-fetching/tanstack-query', version: '1.0.0' },
          { id: 'connectors/infrastructure/tanstack-query-nextjs', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // AI
  recipeBook.packages['ai'] = {
    defaultProvider: 'vercel-ai-sdk',
    providers: {
      'vercel-ai-sdk': {
        modules: [
          { id: 'adapters/ai/vercel-ai-sdk', version: '1.0.0' },
          { id: 'connectors/ai/vercel-ai-nextjs', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Core Stack
  recipeBook.packages['golden-stack'] = {
    defaultProvider: 'default',
    providers: {
      'default': {
        modules: [
          { id: 'adapters/core/golden-stack', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // Deployment
  recipeBook.packages['deployment'] = {
    defaultProvider: 'vercel',
    providers: {
      'vercel': {
        modules: [
          { id: 'adapters/deployment/vercel', version: '1.0.0' }
        ],
        dependencies: {
          packages: []
        }
      }
    }
  };

  // ============================================================================
  // FRAMEWORK PACKAGES (AUTOMATICALLY DISCOVERED)
  // ============================================================================
  // Automatically discover framework adapters from manifest
  // Framework adapters have category: "framework" and are in adapters/framework/*
  const frameworkAdapters = manifest.modules.adapters.filter(
    (adapter) => adapter.category === 'framework' || adapter.id.startsWith('framework/') || adapter.id.startsWith('adapters/framework/')
  );

  for (const frameworkAdapter of frameworkAdapters) {
    // Extract framework name from module ID
    // IDs can be: "framework/nextjs", "adapters/framework/nextjs", etc.
    let frameworkName: string;
    if (frameworkAdapter.id.startsWith('adapters/framework/')) {
      frameworkName = frameworkAdapter.id.replace('adapters/framework/', '');
    } else if (frameworkAdapter.id.startsWith('framework/')) {
      frameworkName = frameworkAdapter.id.replace('framework/', '');
    } else {
      // Fallback: use the last part of the ID
      const parts = frameworkAdapter.id.split('/');
      frameworkName = parts[parts.length - 1];
    }

    // Normalize module ID to use adapters/framework/* format
    const normalizedModuleId = frameworkAdapter.id.startsWith('adapters/framework/')
      ? frameworkAdapter.id
      : `adapters/framework/${frameworkName}`;

    // Check if framework package already exists (might have been manually added)
    if (!recipeBook.packages[frameworkName]) {
      recipeBook.packages[frameworkName] = {
        defaultProvider: 'default',
        providers: {
          'default': {
            modules: [
              {
                id: normalizedModuleId,
                version: frameworkAdapter.version || '1.0.0'
              }
            ],
            dependencies: {
              packages: []
            }
          }
        }
      };
      console.log(`   ✅ Auto-discovered framework package: ${frameworkName} → ${normalizedModuleId}`);
    } else {
      // Package exists, check if module is already in it
      const existingPackage = recipeBook.packages[frameworkName];
      const defaultProvider = existingPackage.providers['default'] || existingPackage.providers[Object.keys(existingPackage.providers)[0]];
      const moduleExists = defaultProvider?.modules.some(m => m.id === normalizedModuleId);
      
      if (!moduleExists) {
        // Add module to existing package
        if (!defaultProvider) {
          // Create default provider if it doesn't exist
          existingPackage.providers['default'] = {
            modules: [],
            dependencies: { packages: [] }
          };
        }
        existingPackage.providers['default'].modules.push({
          id: normalizedModuleId,
          version: frameworkAdapter.version || '1.0.0'
        });
        console.log(`   ✅ Added framework module to existing package: ${frameworkName} → ${normalizedModuleId}`);
      }
    }
  }

  return recipeBook;
}

/**
 * Main function
 */
async function main() {
  console.log('🏗️  Building recipe book...\n');

  try {
    const recipeBook = await buildRecipeBook();

    const outputPath = path.join(process.cwd(), 'marketplace', 'recipe-book.json');
    fs.writeFileSync(outputPath, JSON.stringify(recipeBook, null, 2));

    console.log(`✅ Recipe book generated: ${outputPath}`);
    console.log(`   Total packages: ${Object.keys(recipeBook.packages).length}\n`);

    // Validation and summary
    for (const [packageName, packageDef] of Object.entries(recipeBook.packages)) {
      const packageRecipe = packageDef as PackageRecipe;
      const providerCount = Object.keys(packageRecipe.providers).length;
      const totalModules = Object.values(packageRecipe.providers).reduce(
        (sum, provider: ProviderRecipe) => sum + provider.modules.length,
        0
      );
      console.log(`   - ${packageName}: ${providerCount} provider(s), ${totalModules} total module(s)`);
    }

    console.log('\n✅ Framework packages automatically discovered from manifest');
    console.log('⚠️  NEXT STEP: Review recipe-book.json and manually correct module lists and dependencies if needed');
  } catch (error) {
    console.error('❌ Error building recipe book:', error);
    process.exit(1);
  }
}

main().catch(console.error);

