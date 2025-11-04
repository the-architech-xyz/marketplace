/**
 * Batch update all capability genomes to new structure
 * - Removes modules arrays
 * - Converts old structure to new structure
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
  const files = await glob('**/*.genome.ts', {
    cwd: genomesPath,
    ignore: ['node_modules/**', 'test/**']
  });
  
  const capabilityFiles = [];
  for (const file of files) {
    const content = readFileSync(resolve(genomesPath, file), 'utf-8');
    if (content.includes('defineCapabilityGenome')) {
      capabilityFiles.push({
        path: resolve(genomesPath, file),
        name: file,
        content
      });
    }
  }
  return capabilityFiles;
}

function removeModulesArray(content) {
  // Remove modules array and its comment
  let updated = content;
  
  // Pattern 1: modules: [ ... ] before closing });
  updated = updated.replace(/,\s*\n\s*\/\/[^\n]*\n\s*modules:\s*\[[\s\S]*?\],?\s*(?=\s*\}\);)/g, '');
  
  // Pattern 2: modules: [ ... ] with leading comment on same capability line
  updated = updated.replace(/\s+modules:\s*\[[\s\S]*?\],?\s*(?=\s*\}\);)/g, '');
  
  // Pattern 3: standalone modules array before closing
  const modulesRegex = /(,\s*)?(\/\/[^\n]*\n)?\s*modules:\s*\[[\s\S]*?\],?\s*(?=\n\s*\}\);)/g;
  updated = updated.replace(modulesRegex, '');
  
  return updated;
}

async function updateAllGenomes() {
  console.log('🔄 Updating all capability genomes...\n');
  
  const files = await findCapabilityGenomes();
  console.log(`Found ${files.length} capability genomes\n`);
  
  const results = [];
  for (const file of files) {
    try {
      let content = file.content;
      const originalContent = content;
      
      // Remove modules array
      content = removeModulesArray(content);
      
      if (content !== originalContent) {
        writeFileSync(file.path, content, 'utf-8');
        results.push({ file: file.name, status: 'updated' });
        console.log(`✅ Updated: ${file.name}`);
      } else {
        results.push({ file: file.name, status: 'no_modules' });
        console.log(`⏭️  No modules to remove: ${file.name}`);
      }
    } catch (error) {
      results.push({ file: file.name, status: 'error', error: error.message });
      console.error(`❌ Error in ${file.name}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Updated: ${results.filter(r => r.status === 'updated').length}`);
  console.log(`⏭️  No changes: ${results.filter(r => r.status === 'no_modules').length}`);
  console.log(`❌ Errors: ${results.filter(r => r.status === 'error').length}`);
}

updateAllGenomes().catch(console.error);

