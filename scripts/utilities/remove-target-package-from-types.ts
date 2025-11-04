#!/usr/bin/env tsx

/**
 * Remove targetPackage field from all TypedGenomeModule types
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function removeTargetPackageFromTypes() {
  const typesFile = path.join(__dirname, '../../types/genome-types.d.ts');
  
  try {
    let content = await fs.readFile(typesFile, 'utf-8');
    
    // Remove targetPackage field from all module type definitions
    content = content.replace(
      /\| \{ id: '([^']+)'; targetPackage\?: string; parameters\?: \{/g,
      "| { id: '$1'; parameters?: {"
    );
    
    await fs.writeFile(typesFile, content, 'utf-8');
    
    console.log('✅ Successfully removed targetPackage field from all TypedGenomeModule types');
  } catch (error) {
    console.error('❌ Error updating types:', error);
    process.exit(1);
  }
}

removeTargetPackageFromTypes();
