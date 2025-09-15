#!/usr/bin/env node

/**
 * Script to update all blueprint imports to use the centralized types package
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MARKETPLACE_ROOT = join(__dirname, '..');

// Patterns to replace
const OLD_IMPORT_PATTERNS = [
  /import\s*{\s*Blueprint\s*}\s*from\s*['"]\.\.\/\.\.\/types\/adapter\.js['"];?/g,
  /import\s*{\s*Blueprint\s*}\s*from\s*['"]\.\.\/\.\.\/\.\.\/types\/adapter\.js['"];?/g,
  /import\s*{\s*Blueprint\s*}\s*from\s*['"]\.\.\/\.\.\/\.\.\/\.\.\/types\/adapter\.js['"];?/g,
];

const NEW_IMPORT = "import { Blueprint } from '@thearchitech.xyz/types';";

async function findTsFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findTsFiles(fullPath));
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function updateFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let updated = content;
    let hasChanges = false;
    
    for (const pattern of OLD_IMPORT_PATTERNS) {
      if (pattern.test(updated)) {
        updated = updated.replace(pattern, NEW_IMPORT);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      await writeFile(filePath, updated, 'utf8');
      console.log(`✅ Updated: ${filePath.replace(MARKETPLACE_ROOT, '')}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔄 Updating blueprint imports to use centralized types...\n');
  
  const tsFiles = await findTsFiles(MARKETPLACE_ROOT);
  let updatedCount = 0;
  
  for (const file of tsFiles) {
    if (await updateFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\n🎉 Updated ${updatedCount} files successfully!`);
}

main().catch(console.error);

