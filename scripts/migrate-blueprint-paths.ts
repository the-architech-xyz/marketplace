#!/usr/bin/env tsx

/**
 * Blueprint Path Migration Script
 * 
 * Automatically migrates all blueprint files to use {{paths.*}} variables
 * instead of hardcoded paths, making them framework-agnostic.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

// Path mapping from hardcoded paths to path variables
const PATH_MAPPINGS = [
  // Core framework paths
  { from: /^src\/$/, to: '{{paths.source_root}}' },
  { from: /^src\/app\//, to: '{{paths.app_root}}' },
  { from: /^src\/pages\//, to: '{{paths.pages_root}}' },
  
  // Library and utility paths
  { from: /^src\/lib\//, to: '{{paths.shared_library}}' },
  { from: /^src\/lib\/utils\//, to: '{{paths.utils}}' },
  { from: /^src\/types\//, to: '{{paths.types}}' },
  { from: /^src\/hooks\//, to: '{{paths.hooks}}' },
  { from: /^src\/stores\//, to: '{{paths.stores}}' },
  
  // Component paths
  { from: /^src\/components\//, to: '{{paths.components}}' },
  { from: /^src\/components\/ui\//, to: '{{paths.ui_components}}' },
  { from: /^src\/components\/layouts\//, to: '{{paths.layouts}}' },
  { from: /^src\/components\/providers\//, to: '{{paths.providers}}' },
  
  // API and route paths
  { from: /^src\/app\/api\//, to: '{{paths.api_routes}}' },
  { from: /^src\/middleware\//, to: '{{paths.middleware}}' },
  
  // Configuration paths
  { from: /^src\/config\//, to: '{{paths.config}}' },
  { from: /^scripts\//, to: '{{paths.scripts}}' },
  
  // Feature-specific configuration paths
  { from: /^src\/lib\/db\//, to: '{{paths.database_config}}' },
  { from: /^src\/lib\/auth\//, to: '{{paths.auth_config}}' },
  { from: /^src\/lib\/payment\//, to: '{{paths.payment_config}}' },
  { from: /^src\/lib\/email\//, to: '{{paths.email_config}}' },
  { from: /^src\/lib\/observability\//, to: '{{paths.observability_config}}' },
  { from: /^src\/lib\/state\//, to: '{{paths.state_config}}' },
  { from: /^src\/lib\/testing\//, to: '{{paths.testing_config}}' },
  { from: /^src\/lib\/deployment\//, to: '{{paths.deployment_config}}' },
  { from: /^src\/lib\/content\//, to: '{{paths.content_config}}' },
  { from: /^src\/lib\/blockchain\//, to: '{{paths.blockchain_config}}' },
  
  // Asset and static paths
  { from: /^public\//, to: '{{paths.public}}' },
  { from: /^src\/styles\//, to: '{{paths.styles}}' },
  
  // Testing paths
  { from: /^__tests__\//, to: '{{paths.tests}}' },
  { from: /^src\/__tests__\//, to: '{{paths.tests}}' },
  { from: /^src\/__mocks__\//, to: '{{paths.mocks}}' },
  
  // Build and output paths
  { from: /^\.next\//, to: '{{paths.build}}' },
  { from: /^dist\//, to: '{{paths.dist}}' },
  { from: /^out\//, to: '{{paths.out}}' },
  
  // Documentation paths
  { from: /^docs\//, to: '{{paths.docs}}' },
  { from: /^README\.md$/, to: '{{paths.readme}}' },
  
  // Environment files
  { from: /^\.env$/, to: '{{paths.env}}' },
  { from: /^\.env\./, to: '{{paths.env}}.' }
];

/**
 * Migrate a single file path to use path variables
 */
function migratePath(filePath: string): string {
  let migratedPath = filePath;
  
  // Apply path mappings in order of specificity (most specific first)
  for (const mapping of PATH_MAPPINGS) {
    if (mapping.from.test(migratedPath)) {
      migratedPath = migratedPath.replace(mapping.from, mapping.to);
      break; // Only apply the first matching mapping
    }
  }
  
  return migratedPath;
}

/**
 * Migrate a blueprint file
 */
async function migrateBlueprintFile(filePath: string): Promise<{ migrated: boolean; changes: number }> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    let migratedContent = content;
    let changes = 0;
    
    // Find all path properties in CREATE_FILE actions
    const pathRegex = /path:\s*['"`]([^'"`]+)['"`]/g;
    let match;
    
    while ((match = pathRegex.exec(content)) !== null) {
      const originalPath = match[1];
      const migratedPath = migratePath(originalPath);
      
      if (originalPath !== migratedPath) {
        migratedContent = migratedContent.replace(
          `path: '${originalPath}'`,
          `path: '${migratedPath}'`
        );
        migratedContent = migratedContent.replace(
          `path: "${originalPath}"`,
          `path: "${migratedPath}"`
        );
        migratedContent = migratedContent.replace(
          `path: \`${originalPath}\``,
          `path: \`${migratedPath}\``
        );
        changes++;
      }
    }
    
    if (changes > 0) {
      await fs.writeFile(filePath, migratedContent, 'utf-8');
      console.log(`✅ Migrated ${filePath} (${changes} changes)`);
      return { migrated: true, changes };
    } else {
      console.log(`⏭️  No changes needed for ${filePath}`);
      return { migrated: false, changes: 0 };
    }
  } catch (error) {
    console.error(`❌ Error migrating ${filePath}:`, error);
    return { migrated: false, changes: 0 };
  }
}

/**
 * Main migration function
 */
async function migrateAllBlueprints(): Promise<void> {
  console.log('🚀 Starting Blueprint Path Migration...\n');
  
  try {
    // Find all blueprint files
    const blueprintFiles = await glob('**/blueprint.ts', {
      cwd: process.cwd(),
      absolute: true
    });
    
    console.log(`📁 Found ${blueprintFiles.length} blueprint files\n`);
    
    let totalMigrated = 0;
    let totalChanges = 0;
    
    // Migrate each blueprint file
    for (const filePath of blueprintFiles) {
      const result = await migrateBlueprintFile(filePath);
      if (result.migrated) {
        totalMigrated++;
        totalChanges += result.changes;
      }
    }
    
    console.log('\n🎉 Migration Complete!');
    console.log(`📊 Summary:`);
    console.log(`   • Files migrated: ${totalMigrated}/${blueprintFiles.length}`);
    console.log(`   • Total path changes: ${totalChanges}`);
    
    if (totalMigrated > 0) {
      console.log('\n✨ All blueprints now use framework-agnostic path variables!');
      console.log('🔧 Next: Run Phase 4 to add path validation');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  migrateAllBlueprints().catch(console.error);
}

export { migrateAllBlueprints, migrateBlueprintFile, migratePath };
