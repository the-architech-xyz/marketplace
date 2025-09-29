#!/usr/bin/env tsx

/**
 * Script to fix genome file property names and values
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

async function fixGenomeFiles() {
  try {
    // Find all genome files
    const genomeFiles = await glob('genomes/*.genome.ts');
    
    console.log(`Found ${genomeFiles.length} genome files to fix`);
    
    for (const file of genomeFiles) {
      console.log(`Fixing ${file}...`);
      
      let content = readFileSync(file, 'utf-8');
      let originalContent = content;
      
      // Fix common issues
      const fixes = [
        // Fix property names
        { pattern: /params:/g, replacement: 'parameters:' },
        { pattern: /author:/g, replacement: '// author:' },
        
        // Fix invalid shadcn-ui parameters
        { pattern: /theme:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
        { pattern: /darkMode:\s*true,?\s*\n/, replacement: '' },
        
        // Fix invalid tailwind parameter
        { pattern: /tailwind:\s*\d+,?\s*\n/, replacement: 'tailwind: true,\n' },
        
        // Fix invalid component names
        { pattern: /'invalid-component'/, replacement: "'button'" },
        
        // Clean up trailing commas and empty lines
        { pattern: /,\s*\n\s*}/g, replacement: '\n    }' },
        { pattern: /,\s*\n\s*]/g, replacement: '\n  ]' },
        { pattern: /\n\s*\n\s*\n/g, replacement: '\n\n' },
      ];
      
      // Apply all fixes
      for (const fix of fixes) {
        content = content.replace(fix.pattern, fix.replacement);
      }
      
      // Only write if content changed
      if (content !== originalContent) {
        writeFileSync(file, content, 'utf-8');
        console.log(`  ✅ Fixed ${file}`);
      } else {
        console.log(`  ⏭️  No changes needed for ${file}`);
      }
    }
    
    console.log('\n🎉 All genome files have been fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing genome files:', error);
    process.exit(1);
  }
}

// Run the script
fixGenomeFiles();
