#!/usr/bin/env node

/**
 * Wrapper script for lint-staged to run incremental type generation
 * Receives file arguments from lint-staged and passes them to the CLI
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const marketplacePath = path.dirname(__dirname);

// Get all file arguments from lint-staged
const changedFiles = process.argv.slice(2);

console.log('🔧 Running incremental type generation for lint-staged...');
console.log(`📝 Changed files: ${changedFiles.length}`);

if (changedFiles.length === 0) {
  console.log('ℹ️ No files to process');
  process.exit(0);
}

try {
  // Run the type generation CLI with the changed files
  const command = `tsx scripts/generate-types-cli.ts ${changedFiles.map(f => `"${f}"`).join(' ')}`;
  console.log(`🚀 Executing: ${command}`);
  
  execSync(command, {
    stdio: 'inherit',
    cwd: marketplacePath
  });
  
  console.log('✅ Incremental type generation completed successfully!');
} catch (error) {
  console.error('❌ Type generation failed:', error.message);
  process.exit(1);
}
