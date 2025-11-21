/**
 * Schema File Rename Script
 * 
 * Renames all module schema files to schema.json:
 * - adapter.json → schema.json
 * - connector.json → schema.json
 * - feature.json → schema.json
 * 
 * Usage: tsx scripts/utilities/rename-schemas.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MARKETPLACE_ROOT = path.join(__dirname, '../..');

interface RenameResult {
  oldPath: string;
  newPath: string;
  success: boolean;
  error?: string;
}

async function renameSchemaFiles(): Promise<void> {
  console.log('🔄 Starting schema file rename...\n');
  
  const results: RenameResult[] = [];
  
  // Find all adapter.json files
  console.log('📦 Processing adapters...');
  const adapterFiles = await glob('adapters/**/adapter.json', { cwd: MARKETPLACE_ROOT });
  for (const file of adapterFiles) {
    const oldPath = path.join(MARKETPLACE_ROOT, file);
    const newPath = oldPath.replace(/adapter\.json$/, 'schema.json');
    const result = await renameFile(oldPath, newPath);
    results.push(result);
    if (result.success) {
      console.log(`   ✅ ${file} → ${file.replace('adapter.json', 'schema.json')}`);
    } else {
      console.log(`   ❌ ${file}: ${result.error}`);
    }
  }
  console.log(`   Found ${adapterFiles.length} adapter files\n`);
  
  // Find all connector.json files
  console.log('🔗 Processing connectors...');
  const connectorFiles = await glob('connectors/**/connector.json', { cwd: MARKETPLACE_ROOT });
  for (const file of connectorFiles) {
    const oldPath = path.join(MARKETPLACE_ROOT, file);
    const newPath = oldPath.replace(/connector\.json$/, 'schema.json');
    const result = await renameFile(oldPath, newPath);
    results.push(result);
    if (result.success) {
      console.log(`   ✅ ${file} → ${file.replace('connector.json', 'schema.json')}`);
    } else {
      console.log(`   ❌ ${file}: ${result.error}`);
    }
  }
  console.log(`   Found ${connectorFiles.length} connector files\n`);
  
  // Find all feature.json files
  console.log('✨ Processing features...');
  const featureFiles = await glob('features/**/feature.json', { cwd: MARKETPLACE_ROOT });
  for (const file of featureFiles) {
    const oldPath = path.join(MARKETPLACE_ROOT, file);
    const newPath = oldPath.replace(/feature\.json$/, 'schema.json');
    const result = await renameFile(oldPath, newPath);
    results.push(result);
    if (result.success) {
      console.log(`   ✅ ${file} → ${file.replace('feature.json', 'schema.json')}`);
    } else {
      console.log(`   ❌ ${file}: ${result.error}`);
    }
  }
  console.log(`   Found ${featureFiles.length} feature files\n`);
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('📊 Summary:');
  console.log(`   ✅ Successfully renamed: ${successful}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Total files: ${results.length}\n`);
  
  if (failed > 0) {
    console.log('❌ Errors:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.oldPath}: ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('✅ All schema files renamed successfully!');
  }
}

async function renameFile(oldPath: string, newPath: string): Promise<RenameResult> {
  try {
    // Check if old file exists
    if (!fs.existsSync(oldPath)) {
      return {
        oldPath,
        newPath,
        success: false,
        error: 'File does not exist'
      };
    }
    
    // Check if new file already exists
    if (fs.existsSync(newPath)) {
      return {
        oldPath,
        newPath,
        success: false,
        error: 'Target file already exists'
      };
    }
    
    // Rename file
    fs.renameSync(oldPath, newPath);
    
    return {
      oldPath,
      newPath,
      success: true
    };
  } catch (error) {
    return {
      oldPath,
      newPath,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Run the script
renameSchemaFiles().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

