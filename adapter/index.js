import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/** @typedef {import('@thearchitech.xyz/types').MarketplaceAdapter} MarketplaceAdapter */
/** @typedef {import('@thearchitech.xyz/types').MarketplaceManifest} MarketplaceManifest */
/** @typedef {import('@thearchitech.xyz/types').MarketplaceManifestModule} MarketplaceManifestModule */
/** @typedef {import('@thearchitech.xyz/types').Genome} Genome */
/** @typedef {import('@thearchitech.xyz/types').MarketplaceTransformationOptions} MarketplaceTransformationOptions */

const manifestUrl = new URL('../manifest.json', import.meta.url);
const manifestPath = fileURLToPath(manifestUrl);

const pathKeysUrl = new URL('../path-keys.json', import.meta.url);
const pathKeysPath = fileURLToPath(pathKeysUrl);

// Marketplace root directory (parent of adapter/)
const marketplaceRoot = fileURLToPath(new URL('../', import.meta.url));

/** @type {MarketplaceManifest | undefined} */
let manifestCache;
/** @type {Map<string, MarketplaceManifestModule> | undefined} */
let moduleIndex;

/** @type {import('@thearchitech.xyz/types').MarketplacePathKeys | undefined} */
let pathKeysCache;

function flattenModules(manifest) {
  if (!manifest || !manifest.modules) {
    return [];
  }

  const modules = manifest.modules;
  if (Array.isArray(modules)) {
    return modules;
  }

  const collected = [];
  for (const key of Object.keys(modules)) {
    const group = modules[key];
    if (Array.isArray(group)) {
      collected.push(...group);
    }
  }
  return collected;
}

async function ensureManifestLoaded() {
  if (manifestCache && moduleIndex) {
    return;
  }

  const raw = await readFile(manifestPath, 'utf-8');
  manifestCache = JSON.parse(raw);
  moduleIndex = new Map(flattenModules(manifestCache).map((mod) => [mod.id, mod]));
}

async function ensurePathKeysLoaded() {
  if (pathKeysCache) {
    return pathKeysCache;
  }
  try {
    const raw = await readFile(pathKeysPath, 'utf-8');
    pathKeysCache = JSON.parse(raw);
  } catch (error) {
    console.warn('[core-marketplace] Unable to load path-keys.json', error);
    pathKeysCache = undefined;
  }
  return pathKeysCache;
}

function normalizeDirectory(value, fallback) {
  const source = typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
  if (!source) {
    return './';
  }
  let normalized = source.replace(/^\/*/, '');
  if (!normalized.startsWith('./')) {
    normalized = `./${normalized}`;
  }
  normalized = normalized.replace(/\\+|\/+/g, '/');
  if (!normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }
  return normalized;
}

function joinDirectory(base, segment) {
  if (!segment) {
    return normalizeDirectory(base);
  }
  const cleanedBase = normalizeDirectory(base);
  const cleanedSegment = segment.replace(/^\/*/, '').replace(/\\+|\/+/g, '/');
  const combined = path.posix.join(cleanedBase, cleanedSegment);
  return normalizeDirectory(combined);
}

function computeWorkspacePaths() {
  return {
    'workspace.root': './',
    'workspace.scripts': './scripts/',
    'workspace.docs': './docs/',
    'workspace.env': './.env',
    'workspace.config': './config/',
  };
}

// REMOVED: computeSingleAppPaths() - V1 only, replaced by generatePathsFromDefinitions()

/**
 * Generate paths from path-keys.json definitions
 * This replaces hard-coded path computation with definition-driven generation
 */
async function generatePathsFromDefinitions(project = {}, pathKeys, structure) {
  const packages = (project?.monorepo?.packages) || {};
  const apps = Array.isArray(project?.apps) ? project.apps : [];

  const webApp = apps.find((app) => app?.type === 'web');
  const apiApp = apps.find((app) => app?.type === 'api' || app?.framework === 'hono');

  // Reference defaults (can be overridden by user)
  const referenceDefaults = {
    web: 'apps/web',
    api: 'apps/api',
    shared: 'packages/shared',
    database: 'packages/database',
    ui: 'packages/ui',
  };

  const webRoot = normalizeDirectory(webApp?.package, packages.web || referenceDefaults.web);
  const apiRoot = normalizeDirectory(apiApp?.package, packages.api || referenceDefaults.api);
  const sharedRoot = normalizeDirectory(packages.shared, referenceDefaults.shared);
  const databaseRoot = normalizeDirectory(packages.database, referenceDefaults.database);
  const uiRoot = normalizeDirectory(packages.ui, referenceDefaults.ui);

  const generatedPaths = {};

  // Generate paths from path-keys.json definitions
  for (const keyDef of pathKeys.pathKeys) {
    // Skip if structure doesn't match
    if (keyDef.structure && keyDef.structure !== 'both' && keyDef.structure !== structure) {
      continue;
    }

    // Handle dynamic path keys with variables
    if (keyDef.variables && keyDef.variables.length > 0) {
      // Generate paths for all known packages/apps
      if (keyDef.key.includes('{packageName}')) {
        // Generate for all packages in monorepo
        const allPackages = {
          ...packages,
          // Add known packages if not in packages object
          auth: packages.auth || 'packages/auth',
          db: packages.db || packages.database || 'packages/db',
          ui: packages.ui || 'packages/ui',
          shared: packages.shared || 'packages/shared'
        };
        
        for (const [pkgName, pkgPath] of Object.entries(allPackages)) {
          if (pkgPath && typeof pkgPath === 'string') {
            const resolvedKey = keyDef.key.replace('{packageName}', pkgName);
            const resolvedValue = resolvePathWithVariables(
              keyDef.defaultValue,
              { packageName: pkgName },
              structure
            );
            if (resolvedValue) {
              generatedPaths[resolvedKey] = resolvedValue;
            }
          }
        }
      } else if (keyDef.key.includes('{appId}')) {
        // Generate for all apps
        for (const app of apps) {
          const appId = app.id || app.type;
          if (appId) {
            const resolvedKey = keyDef.key.replace('{appId}', appId);
            let resolvedValue = null;
            
            if (keyDef.computed && typeof keyDef.defaultValue === 'object') {
              // Framework-specific defaultValue
              const framework = app.framework || app.type;
              const frameworkDefault = keyDef.defaultValue[framework];
              if (frameworkDefault) {
                resolvedValue = resolvePathWithVariables(
                  frameworkDefault,
                  { appId },
                  structure
                );
              }
            } else if (keyDef.defaultValue) {
              resolvedValue = resolvePathWithVariables(
                keyDef.defaultValue,
                { appId },
                structure
              );
            }
            
            if (resolvedValue) {
              generatedPaths[resolvedKey] = resolvedValue;
            }
          }
        }
      }
      continue; // Skip normal processing for variable keys
    }

    // Handle non-variable keys (existing logic)
    let pathValue = null;

    if (keyDef.computed) {
      // Compute path from genome structure
      pathValue = computePathFromDefinition(keyDef, {
        webRoot,
        apiRoot,
        sharedRoot,
        databaseRoot,
        uiRoot,
        structure
      });
    } else if (keyDef.defaultValue) {
      // Use static default value (can be string or object for framework-specific)
      if (typeof keyDef.defaultValue === 'object') {
        // Framework-specific: use first available or skip
        // This will be resolved by PathService at runtime
        pathValue = null; // Don't generate static value for framework-specific
      } else {
        pathValue = keyDef.defaultValue;
      }
    }

    if (pathValue) {
      generatedPaths[keyDef.key] = pathValue;
    }
  }

  return generatedPaths;
}

/**
 * Resolve path template with variables
 * Example: "packages/{packageName}/src/" with {packageName: "auth"} → "packages/auth/src/"
 */
function resolvePathWithVariables(template, variables, structure) {
  if (!template || typeof template !== 'string') {
    return null;
  }
  
  let resolved = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    resolved = resolved.replace(regex, value);
  }
  
  return resolved;
}

/**
 * Compute a path value from a path key definition
 * Handles both monorepo and single-app structures
 */
function computePathFromDefinition(keyDef, context) {
  const { webRoot, apiRoot, sharedRoot, databaseRoot, uiRoot, structure } = context;
  const key = keyDef.key;
  const isSingleApp = structure === 'single-app';

  // Apps paths
  if (key.startsWith('apps.web.')) {
    if (key === 'apps.web.root') {
      return isSingleApp ? './' : webRoot;
    }
    if (key === 'apps.web.src') {
      return isSingleApp ? './src/' : joinDirectory(webRoot, 'src/');
    }
    if (key === 'apps.web.app') {
      return isSingleApp ? './src/app/' : joinDirectory(webRoot, 'src/app/');
    }
    if (key === 'apps.web.components') {
      return isSingleApp ? './src/components/' : joinDirectory(webRoot, 'src/components/');
    }
    if (key === 'apps.web.public') {
      return isSingleApp ? './public/' : joinDirectory(webRoot, 'public/');
    }
    if (key === 'apps.web.middleware') {
      return isSingleApp ? './src/middleware/' : joinDirectory(webRoot, 'src/middleware/');
    }
    if (key === 'apps.web.server') {
      return isSingleApp ? './src/server/' : joinDirectory(webRoot, 'src/server/');
    }
    if (key === 'apps.web.collections') {
      return isSingleApp ? './src/collections/' : joinDirectory(webRoot, 'src/collections/');
    }
  }

  if (key.startsWith('apps.api.')) {
    if (key === 'apps.api.root') {
      return isSingleApp ? './' : apiRoot;
    }
    if (key === 'apps.api.src') {
      return isSingleApp ? './src/' : joinDirectory(apiRoot, 'src/');
    }
    if (key === 'apps.api.routes') {
      return isSingleApp ? './src/routes/' : joinDirectory(apiRoot, 'src/routes/');
    }
  }

  // Packages paths - map to single-app structure
  if (key.startsWith('packages.shared.')) {
    if (key === 'packages.shared.root') {
      return isSingleApp ? './src/lib/' : sharedRoot;
    }
    if (key === 'packages.shared.src') {
      return isSingleApp ? './src/lib/' : joinDirectory(sharedRoot, 'src/');
    }
    if (key === 'packages.shared.src.components') {
      return isSingleApp ? './src/lib/components/' : joinDirectory(sharedRoot, 'src/components/');
    }
    if (key === 'packages.shared.src.hooks') {
      return isSingleApp ? './src/lib/hooks/' : joinDirectory(sharedRoot, 'src/hooks/');
    }
    if (key === 'packages.shared.src.providers') {
      return isSingleApp ? './src/lib/providers/' : joinDirectory(sharedRoot, 'src/providers/');
    }
    if (key === 'packages.shared.src.stores') {
      return isSingleApp ? './src/lib/stores/' : joinDirectory(sharedRoot, 'src/stores/');
    }
    if (key === 'packages.shared.src.types') {
      return isSingleApp ? './src/lib/types/' : joinDirectory(sharedRoot, 'src/types/');
    }
    if (key === 'packages.shared.src.utils') {
      return isSingleApp ? './src/lib/utils/' : joinDirectory(sharedRoot, 'src/utils/');
    }
    if (key === 'packages.shared.src.scripts') {
      return isSingleApp ? './src/lib/scripts/' : joinDirectory(sharedRoot, 'src/scripts/');
    }
    if (key === 'packages.shared.src.routes') {
      return isSingleApp ? './src/lib/routes/' : joinDirectory(sharedRoot, 'src/routes/');
    }
    if (key === 'packages.shared.src.jobs') {
      return isSingleApp ? './src/lib/jobs/' : joinDirectory(sharedRoot, 'src/jobs/');
    }
  }

  if (key.startsWith('packages.database.')) {
    if (key === 'packages.database.root') {
      return isSingleApp ? './src/lib/db/' : databaseRoot;
    }
    if (key === 'packages.database.src') {
      return isSingleApp ? './src/lib/db/' : joinDirectory(databaseRoot, 'src/');
    }
  }

  if (key.startsWith('packages.ui.')) {
    if (key === 'packages.ui.root') {
      return isSingleApp ? './src/components/ui/' : uiRoot;
    }
    if (key === 'packages.ui.src') {
      return isSingleApp ? './src/components/ui/' : joinDirectory(uiRoot, 'src/');
    }
  }

  // Workspace paths (same for both structures)
  if (key.startsWith('workspace.')) {
    if (key === 'workspace.root') return './';
    if (key === 'workspace.scripts') return './scripts/';
    if (key === 'workspace.docs') return './docs/';
    if (key === 'workspace.env') return './.env';
    if (key === 'workspace.config') return './config/';
  }

  return null;
}

/**
 * Generate feature-specific paths from path requirements
 * These are paths like packages.shared.src.payment.config that aren't in path-keys.json
 * Handles both monorepo and single-app structures
 */
function generateFeaturePaths(pathRequirements, sharedRoot, structure) {
  const featurePaths = {};
  const isSingleApp = structure === 'single-app';
  
  if (!pathRequirements || !pathRequirements.domains) {
    return featurePaths;
  }

  for (const domain of pathRequirements.domains) {
    // Generate standard domain paths
    // For monorepo: packages/shared/src/{domain}/
    // For single-app: src/lib/{domain}/
    const domainBase = isSingleApp
      ? joinDirectory('./src/lib/', `${domain}/`)
      : joinDirectory(sharedRoot, `src/${domain}/`);
    
    // Standard paths for each domain
    featurePaths[`packages.shared.src.${domain}.config`] = joinDirectory(domainBase, 'config/');
    featurePaths[`packages.shared.src.${domain}.types`] = joinDirectory(domainBase, 'types/');
    featurePaths[`packages.shared.src.${domain}.client`] = joinDirectory(domainBase, 'client/');
    
    // Additional paths from requirements
    if (pathRequirements.requiredPaths) {
      for (const requiredPath of pathRequirements.requiredPaths) {
        if (requiredPath.startsWith(`packages.shared.src.${domain}.`)) {
          const subPath = requiredPath.replace(`packages.shared.src.${domain}.`, '');
          featurePaths[requiredPath] = joinDirectory(domainBase, `${subPath}/`);
        }
      }
    }
  }

  return featurePaths;
}

// REMOVED: computeMonorepoPaths() - V1 only, replaced by generatePathsFromDefinitions()

function detectUIFrameworkFromGenome(genome = {}) {
  const modules = Array.isArray(genome?.modules) ? genome.modules : [];
  const ids = modules.map((m) => (typeof m === 'string' ? m : m?.id)).filter(Boolean);
  // Normalize to short keys expected by CLI and docs
  if (ids.some((id) => id === 'ui/shadcn-ui' || id === 'features/monitoring/shadcn' || id.includes('shadcn'))) {
    return 'shadcn';
  }
  if (ids.some((id) => id === 'ui/tamagui' || id.includes('tamagui'))) {
    return 'tamagui';
  }
  if (ids.some((id) => id === 'ui/tailwind' || id.includes('tailwind'))) {
    return 'tailwind';
  }
  return null;
}

/** @type {MarketplaceAdapter} */
export const coreMarketplaceAdapter = {
  async loadManifest() {
    await ensureManifestLoaded();
    return manifestCache;
  },

  async loadRecipeBook() {
    const recipeBookUrl = new URL('../recipe-book.json', import.meta.url);
    const recipeBookPath = fileURLToPath(recipeBookUrl);
    
    try {
      const raw = await readFile(recipeBookPath, 'utf-8');
      return JSON.parse(raw);
    } catch (error) {
      throw new Error(`recipe-book.json not found in marketplace: ${error.message}`);
    }
  },

  async loadPathKeys() {
    return ensurePathKeysLoaded();
  },

  async resolvePathDefaults(context) {
    const genome = context?.genome ?? {};
    const project = context?.project ?? genome?.project ?? {};
    const structure = project?.structure === 'monorepo' ? 'monorepo' : 'single-app';

    // Load path key definitions
    const pathKeys = await ensurePathKeysLoaded();
    if (!pathKeys) {
      // Fail fast if path-keys.json not available
      throw new Error(
        '[core-marketplace] path-keys.json not found. ' +
        'Path generation requires path-keys.json definitions. ' +
        'Please ensure the marketplace has a valid path-keys.json file.'
      );
    }

    // Generate base paths from path-keys.json definitions
    const basePaths = await generatePathsFromDefinitions(project, pathKeys, structure);

    // Generate feature-specific paths from path requirements (from genome transformer)
    const pathRequirements = genome?.metadata?.pathRequirements;
    let featurePaths = {};
    if (pathRequirements && pathRequirements.domains) {
      // Get shared root for feature path generation
      const packages = (project?.monorepo?.packages) || {};
      const referenceDefaults = { shared: 'packages/shared' };
      const sharedRoot = normalizeDirectory(packages.shared, referenceDefaults.shared);
      
      // Pass structure to generateFeaturePaths for proper path generation
      featurePaths = generateFeaturePaths(pathRequirements, sharedRoot, structure);
    }

    // Merge all paths
    const defaults = {
      ...basePaths,
      ...featurePaths,
    };

    // Best-effort UI framework detection; CLI will still resolve marketplace path
    const uiFramework = detectUIFrameworkFromGenome(genome);
    if (uiFramework) {
      defaults['ui.framework'] = uiFramework;
    }

    return defaults;
  },

  async resolveModule(moduleId) {
    await ensureManifestLoaded();
    return moduleIndex.get(moduleId);
  },

  getDefaultParameters(moduleId) {
    if (!moduleIndex?.has(moduleId)) {
      return undefined;
    }
    const entry = moduleIndex.get(moduleId);
    if (!entry?.parameters) {
      return undefined;
    }

    const defaults = {};
    for (const [key, schema] of Object.entries(entry.parameters)) {
      if (schema && typeof schema === 'object' && 'default' in schema) {
        defaults[key] = schema.default;
      }
    }

    return Object.keys(defaults).length > 0 ? defaults : undefined;
  },

  validateGenome(genome) {
    if (!genome || typeof genome !== 'object') {
      throw new Error('Genome must be an object.');
    }
    if (!genome.project || typeof genome.project !== 'object') {
      throw new Error('Genome must include a project configuration.');
    }
    // V2: Only validate module-based genomes (capabilities are V1-only)
    const hasModules = Array.isArray(genome.modules) && genome.modules.length > 0;
    if (!hasModules) {
      throw new Error('Genome must include at least one module.');
    }
    if (genome.project.structure === 'monorepo' && !genome.project.monorepo) {
      throw new Error('Monorepo projects must declare monorepo configuration.');
    }
  },

  // REMOVED: transformGenome() - V1 only, replaced by Composition Engine in CLI
  // V2 genomes are handled by CLI's Composition Engine, not marketplace adapter
};

export default coreMarketplaceAdapter;
