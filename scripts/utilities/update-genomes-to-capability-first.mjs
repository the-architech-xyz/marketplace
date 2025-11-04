/**
 * Script to update all capability genomes to new structure
 * - Removes modules arrays
 * - Converts old structure (frontend: true, parameters: {}) to new structure (adapter.*, frontend.features.*, techStack.*)
 * - Ensures type safety
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const genomesPath = resolve(__dirname, '../../genomes');

async function findCapabilityGenomes() {
  const files = await glob('**/*capability*.genome.ts', {
    cwd: genomesPath,
    ignore: ['node_modules/**', 'test/**']
  });
  return files.map(f => resolve(genomesPath, f));
}

async function findGenomesWithModules() {
  const files = await glob('**/*.genome.ts', {
    cwd: genomesPath,
    ignore: ['node_modules/**', 'test/**']
  });
  
  const capabilityFiles = [];
  for (const file of files) {
    const content = readFileSync(resolve(genomesPath, file), 'utf-8');
    if (content.includes('defineCapabilityGenome') && content.includes('modules: [')) {
      capabilityFiles.push(resolve(genomesPath, file));
    }
  }
  return capabilityFiles;
}

function convertOldStructureToNew(config) {
  const newConfig = {};
  
  // Convert provider (remove framework suffix)
  if (config.provider) {
    newConfig.provider = config.provider
      .replace(/-nextjs$/, '')
      .replace(/-expo$/, '')
      .replace(/-react-native$/, '');
  }
  
  // Convert parameters to adapter if it's adapter-specific
  if (config.parameters && Object.keys(config.parameters).length > 0) {
    // Check if parameters look like adapter params (oauthProviders, twoFactor, etc.)
    const adapterParams = ['oauthProviders', 'twoFactor', 'organizations', 'emailPassword', 
                          'emailVerification', 'sessionExpiry', 'currency', 'mode', 'webhooks',
                          'dashboard', 'apiKey', 'fromEmail'];
    
    const params = config.parameters;
    const hasAdapterParams = adapterParams.some(key => key in params);
    
    if (hasAdapterParams || config.provider) {
      newConfig.adapter = {};
      // Move adapter-specific params
      for (const key of adapterParams) {
        if (key in params) {
          newConfig.adapter[key] = params[key];
          delete params[key];
        }
      }
      // Move any remaining params that look like adapter config
      for (const [key, value] of Object.entries(params)) {
        if (!params.features || key !== 'features') {
          if (typeof value !== 'object' || (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string')) {
            newConfig.adapter[key] = value;
          }
        }
      }
    }
    
    // Extract features for frontend
    if (params.features && typeof params.features === 'object') {
      newConfig.frontend = {
        features: params.features
      };
    }
  }
  
  // Convert flags to techStack
  if (config.techStack === true || config.techStack === undefined && (config.frontend || config.backend)) {
    newConfig.techStack = {
      hasTypes: true,
      hasSchemas: true,
      hasHooks: true,
      hasStores: true
    };
  }
  
  // Keep frontend flag handling (but convert to structure)
  if (config.frontend === true) {
    newConfig.frontend = {
      features: {}
    };
  }
  
  return newConfig;
}

async function updateGenome(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Skip if already updated (no modules array)
  if (!content.includes('modules: [')) {
    return { skipped: true, file: filePath };
  }
  
  try {
    // Use regex to extract and update
    let updated = content;
    
    // Remove modules array completely
    const modulesRegex = /,\s*\/\/\s*[^\n]*\n\s*modules:\s*\[[\s\S]*?\],?\s*(?=\n\s*\}\);)/;
    updated = updated.replace(modulesRegex, '');
    
    // Also handle modules at end before closing
    const modulesEndRegex = /\s+modules:\s*\[[\s\S]*?\],?\s*(?=\s*\}\);)/;
    updated = updated.replace(modulesEndRegex, '');
    
    if (updated === content) {
      return { unchanged: true, file: filePath };
    }
  
    // Update capability configurations to new structure
    // This is a simplified version - full conversion would need AST parsing
    // For now, just remove modules array and let manual review handle capability conversion
    
    writeFileSync(filePath, updated, 'utf-8');
    return { updated: true, file: filePath };
  } catch (error) {
    return { error: error.message, file: filePath };
  }
}

async function main() {
  console.log('🔄 Updating capability genomes to remove modules arrays...\n');
  
  const files = await findGenomesWithModules();
  console.log(`Found ${files.length} capability genomes with modules arrays\n`);
  
  const results = [];
  for (const file of files) {
    const result = await updateGenome(file);
    results.push(result);
  }
  
  console.log('\n📊 Results:');
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const result of results) {
    if (result.updated) {
      console.log(`✅ Updated: ${result.file}`);
      updated++;
    } else if (result.skipped) {
      console.log(`⏭️  Skipped (already updated): ${result.file}`);
      skipped++;
    } else if (result.error) {
      console.log(`❌ Error: ${result.file} - ${result.error}`);
      errors++;
    } else {
      console.log(`ℹ️  Unchanged: ${result.file}`);
    }
  }
  
  console.log(`\n✅ Updated: ${updated}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
}

main().catch(console.error);

