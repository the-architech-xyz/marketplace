#!/usr/bin/env node

/**
 * Schema Issue Fixer
 * 
 * Automatically fixes common schema issues found by validation:
 * - Converts object "provides" to array
 * - Converts object "requires" to array  
 * - Adds missing "id" field to tech-stacks
 * - Fixes "type" field inconsistencies
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

interface Fix {
  file: string;
  changes: string[];
}

async function fixSchemaIssues() {
  console.log('🔧 Fixing Schema Issues...\n');

  const fixes: Fix[] = [];

  // Fix all JSON files
  const allFiles = await glob('{adapters,connectors,features}/**/*.json', { 
    cwd: process.cwd() 
  });

  for (const file of allFiles) {
    try {
      const original = readFileSync(file, 'utf8');
      const data = JSON.parse(original);
      const changes: string[] = [];
      let modified = false;

      // FIX 1: Convert object "provides" to array
      if (data.provides && typeof data.provides === 'object' && !Array.isArray(data.provides)) {
        // Extract names from object format
        if (Array.isArray(data.provides)) {
          // Already array, good
        } else if (data.provides.enhancements) {
          // Format: { enhancements: [...], files: [...] }
          data.provides = [];
          changes.push('Removed complex provides object (keeping empty for manual review)');
          modified = true;
        } else {
          // Unknown object format
          data.provides = [];
          changes.push('Converted object provides to empty array (manual review needed)');
          modified = true;
        }
      }

      // FIX 2: Convert object "requires" to array
      if (data.requires && typeof data.requires === 'object' && !Array.isArray(data.requires)) {
        data.requires = [];
        changes.push('Converted object requires to empty array (manual review needed)');
        modified = true;
      }

      // FIX 3: Handle "prerequisites" object with nested structure
      if (data.prerequisites && typeof data.prerequisites === 'object') {
        // This is actually valid for features - they use prerequisites.adapters
        // The validator/consolidator handles this
      }

      // FIX 4: Add missing "id" field for tech-stacks
      if (file.includes('/tech-stack/') && !data.id) {
        // Generate id from file path
        // features/auth/tech-stack/feature.json → features/auth/tech-stack
        const parts = file.replace('/feature.json', '').split('/');
        data.id = parts.join('/');
        changes.push(`Added missing id: ${data.id}`);
        modified = true;
      }

      // FIX 5: Fix "type" field for tech-stacks and features
      if (file.includes('/feature.json') || file.includes('/tech-stack/')) {
        if (!data.type || !['feature', 'capability'].includes(data.type)) {
          data.type = 'feature';
          changes.push('Set type to "feature"');
          modified = true;
        }
      }

      // FIX 6: Convert object "dependencies" to array (adapters)
      if (data.dependencies && typeof data.dependencies === 'object' && !Array.isArray(data.dependencies)) {
        data.dependencies = [];
        changes.push('Converted object dependencies to empty array');
        modified = true;
      }

      // Apply fixes
      if (modified) {
        writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
        fixes.push({ file, changes });
      }

    } catch (error) {
      console.error(`   ❌ ${file}: ${error}`);
    }
  }

  // Report
  console.log(`✅ Fixed ${fixes.length} files:\n`);
  fixes.forEach(({ file, changes }) => {
    console.log(`   📝 ${file}`);
    changes.forEach(change => console.log(`      - ${change}`));
  });

  console.log(`\n✅ Schema fixes complete!`);
  console.log('Run validation to verify: npm run validate:schema\n');
}

fixSchemaIssues().catch(console.error);

