#!/usr/bin/env tsx
/**
 * Fix JSON files that were incorrectly converted from {{}} to ${}
 * JSON files should keep {{}} syntax, only .ts/.js/.tpl files should use ${}
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const JSON_PATTERN = /\$\{([^}]+)\}/g;

function fixJsonSyntax(content: string): string {
  return content.replace(JSON_PATTERN, (match, expression) => {
    // Convert ${expression} back to {{expression}} in JSON files
    return `{{${expression}}}`;
  });
}

async function main() {
  console.log('🔍 Fixing JSON files with incorrect template syntax...\n');
  
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
      
      if (JSON_PATTERN.test(content)) {
        const fixedContent = fixJsonSyntax(content);
        
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
    console.log('\n🎉 JSON syntax fixed!');
  } else {
    console.log('\n🎉 No fixes needed!');
  }
}

main().catch(console.error);
