#!/usr/bin/env tsx

/**
 * Migration Script: Context Variables to Module Parameters
 * 
 * This script migrates all template files from using `context.xxx` 
 * to the standardized `module.parameters.xxx` approach.
 * 
 * Usage: tsx scripts/utilities/migrate-context-to-module-params.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface MigrationRule {
  pattern: RegExp;
  replacement: string;
  description: string;
}

const MIGRATION_RULES: MigrationRule[] = [
  // Direct parameter mappings
  {
    pattern: /context\.devtools/g,
    replacement: 'module.parameters.devtools',
    description: 'devtools parameter'
  },
  {
    pattern: /context\.suspense/g,
    replacement: 'module.parameters.suspense',
    description: 'suspense parameter'
  },
  {
    pattern: /context\.hasCustomStaleTime/g,
    replacement: 'module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.staleTime',
    description: 'staleTime parameter check'
  },
  {
    pattern: /context\.staleTime/g,
    replacement: 'module.parameters.defaultOptions.queries.staleTime',
    description: 'staleTime value'
  },
  {
    pattern: /context\.hasCustomGcTime/g,
    replacement: 'module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.gcTime',
    description: 'gcTime parameter check'
  },
  {
    pattern: /context\.gcTime/g,
    replacement: 'module.parameters.defaultOptions.queries.gcTime',
    description: 'gcTime value'
  },
  {
    pattern: /context\.hasCustomRetry/g,
    replacement: 'module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.retry',
    description: 'retry parameter check'
  },
  {
    pattern: /context\.retry/g,
    replacement: 'module.parameters.defaultOptions.queries.retry',
    description: 'retry value'
  },
  {
    pattern: /context\.hasCustomRefetchOnWindowFocus/g,
    replacement: 'module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.refetchOnWindowFocus',
    description: 'refetchOnWindowFocus parameter check'
  },
  {
    pattern: /context\.refetchOnWindowFocus/g,
    replacement: 'module.parameters.defaultOptions.queries.refetchOnWindowFocus',
    description: 'refetchOnWindowFocus value'
  },
  {
    pattern: /context\.hasCustomMutationRetry/g,
    replacement: 'module.parameters.defaultOptions && module.parameters.defaultOptions.mutations && module.parameters.defaultOptions.mutations.retry',
    description: 'mutation retry parameter check'
  },
  {
    pattern: /context\.mutationRetry/g,
    replacement: 'module.parameters.defaultOptions.mutations.retry',
    description: 'mutation retry value'
  },
  {
    pattern: /context\.hasSuspense/g,
    replacement: 'module.parameters.suspense',
    description: 'suspense parameter check'
  }
];

async function findTemplateFiles(): Promise<string[]> {
  const patterns = [
    '**/*.tpl',
    '**/*.template',
    '**/templates/**/*.ts',
    '**/templates/**/*.tsx',
    '**/templates/**/*.js',
    '**/templates/**/*.jsx'
  ];
  
  const files: string[] = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern, { 
      cwd: process.cwd(),
      ignore: ['node_modules/**', 'dist/**', '.git/**']
    });
    files.push(...matches);
  }
  
  return [...new Set(files)]; // Remove duplicates
}

function migrateFile(filePath: string): { changed: boolean; changes: string[] } {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  const changes: string[] = [];
  
  for (const rule of MIGRATION_RULES) {
    if (rule.pattern.test(newContent)) {
      newContent = newContent.replace(rule.pattern, rule.replacement);
      changes.push(rule.description);
    }
  }
  
  const changed = newContent !== content;
  
  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
  
  return { changed, changes };
}

async function main() {
  console.log('🔄 Starting template context migration...\n');
  
  const templateFiles = await findTemplateFiles();
  console.log(`📁 Found ${templateFiles.length} template files\n`);
  
  let totalChanged = 0;
  const results: Array<{ file: string; changes: string[] }> = [];
  
  for (const file of templateFiles) {
    const { changed, changes } = migrateFile(file);
    
    if (changed) {
      totalChanged++;
      results.push({ file, changes });
      console.log(`✅ ${file}`);
      changes.forEach(change => console.log(`   - ${change}`));
      console.log('');
    }
  }
  
  console.log(`\n📊 Migration Summary:`);
  console.log(`   - Files processed: ${templateFiles.length}`);
  console.log(`   - Files changed: ${totalChanged}`);
  console.log(`   - Files unchanged: ${templateFiles.length - totalChanged}`);
  
  if (totalChanged > 0) {
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Test the migrated templates`);
    console.log(`   2. Update any remaining context.xxx references manually`);
    console.log(`   3. Update template documentation`);
  } else {
    console.log(`\n✨ No files needed migration - all templates are already up to date!`);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { migrateFile, MIGRATION_RULES };
