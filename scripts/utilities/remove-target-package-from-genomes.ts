#!/usr/bin/env tsx

/**
 * Remove targetPackage fields from all monorepo genome files
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function removeTargetPackageFromGenomes() {
  try {
    // Find all monorepo genome files
    const genomeFiles = await glob('genomes/**/*monorepo*.genome.ts', {
      cwd: path.join(__dirname, '../..')
    });
    
    console.log(`Found ${genomeFiles.length} monorepo genome files:`);
    genomeFiles.forEach(file => console.log(`  - ${file}`));
    
    for (const file of genomeFiles) {
      const filePath = path.join(__dirname, '../..', file);
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Remove targetPackage fields (with various indentation patterns)
      const originalContent = content;
      content = content.replace(/,\s*targetPackage:\s*['"`][^'"`]*['"`]/g, '');
      content = content.replace(/targetPackage:\s*['"`][^'"`]*['"`],?\s*/g, '');
      
      // Clean up any trailing commas that might be left
      content = content.replace(/,(\s*[}\]])/g, '$1');
      
      if (content !== originalContent) {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`✅ Updated ${file}`);
      } else {
        console.log(`⏭️  No changes needed for ${file}`);
      }
    }
    
    console.log('✅ Successfully removed targetPackage fields from all monorepo genomes');
  } catch (error) {
    console.error('❌ Error updating genomes:', error);
    process.exit(1);
  }
}

removeTargetPackageFromGenomes();
