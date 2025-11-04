#!/usr/bin/env tsx

/**
 * Add targetPackage field to all TypedGenomeModule types
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addTargetPackageToTypes() {
  const typesFile = path.join(__dirname, '../../types/genome-types.d.ts');
  
  try {
    let content = await fs.readFile(typesFile, 'utf-8');
    
    // Replace all module type definitions to include targetPackage
    content = content.replace(
      /\| \{ id: '([^']+)'; parameters\?: \{/g,
      "| { id: '$1'; targetPackage?: string; parameters?: {"
    );
    
    await fs.writeFile(typesFile, content, 'utf-8');
    
    console.log('✅ Successfully added targetPackage field to all TypedGenomeModule types');
  } catch (error) {
    console.error('❌ Error updating types:', error);
    process.exit(1);
  }
}

addTargetPackageToTypes();
