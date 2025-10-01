#!/usr/bin/env node

/**
 * Wrapper script for lint-staged to run type generation
 * Ignores the file argument passed by lint-staged
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the marketplace root directory (parent of scripts)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const marketplacePath = path.dirname(__dirname);

console.log('🔧 Running type generation for lint-staged...');

try {
  // Run the type generation with the correct marketplace path
  execSync(`tsx scripts/generate-types-cli.ts "${marketplacePath}"`, {
    stdio: 'inherit',
    cwd: marketplacePath
  });
  console.log('✅ Type generation completed successfully!');
} catch (error) {
  console.error('❌ Type generation failed:', error.message);
  process.exit(1);
}
