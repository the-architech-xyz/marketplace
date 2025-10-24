#!/usr/bin/env tsx
/**
 * Fix JSON files with invalid conditional syntax
 * Removes complex conditional logic from JSON provides arrays
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const CONDITIONAL_PATTERN = /\{\{[^}]*\?[^}]*:[^}]*\}\}/g;

function fixConditionalSyntax(content: string): string {
  return content.replace(CONDITIONAL_PATTERN, (match) => {
    // Extract the static part before the conditional
    const staticMatch = match.match(/^(\{\{[^?]*\?[^:]*:)([^}]*)\}\}$/);
    if (staticMatch) {
      // Return just the static part without the conditional logic
      return staticMatch[2].replace(/"/g, '').trim();
    }
    return match;
  });
}

async function main() {
  console.log('🔍 Fixing JSON files with invalid conditional syntax...\n');
  
  // Find all JSON files
  const files = await glob('**/*.json', {
    cwd: process.cwd(),
    ignore: ['node_modules/**', 'dist/**', 'build/**']
  });
  
  let fixedCount = 0;
  let alreadyCorrectCount = 0;
  let totalScanned = 0;
  
  for (const file of files) {
    totalScanned++;
    
    try {
      const filePath = path.resolve(file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      if (CONDITIONAL_PATTERN.test(content)) {
        const fixedContent = fixConditionalSyntax(content);
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent, 'utf-8');
          console.log(`✅ Fixed: ${file}`);
          fixedCount++;
        } else {
          console.log(`⏭️  Already correct: ${file}`);
          alreadyCorrectCount++;
        }
      } else {
        alreadyCorrectCount++;
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}: ${error}`);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   ✅ Fixed: ${fixedCount} files`);
  console.log(`   ⏭️  Already correct: ${alreadyCorrectCount} files`);
  console.log(`   📁 Total scanned: ${totalScanned} files`);
  
  if (fixedCount > 0) {
    console.log('\n🎉 JSON conditional syntax fixed!');
  } else {
    console.log('\n🎉 No fixes needed!');
  }
}

main().catch(console.error);
