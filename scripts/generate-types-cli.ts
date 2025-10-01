#!/usr/bin/env node

/**
 * CLI script for generating types with artifact discovery
 */

import { SmartTypeGenerator } from './generate-types.js';
import * as path from 'path';
import * as process from 'process';

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let marketplacePath = args[0] || process.cwd();
  let changedFiles: string[] = [];
  
  // Check if we're being called with specific files (from lint-staged)
  if (args.length > 0 && args.every(arg => path.extname(arg) === '.json' || arg.includes('generate-types.ts'))) {
    // We have specific files, use incremental generation
    changedFiles = args.map(arg => path.isAbsolute(arg) ? arg : path.resolve(arg));
    
    // Find marketplace root from the first file
    const firstFile = changedFiles[0];
    let tempPath = path.dirname(firstFile);
    
    // Navigate up to find marketplace root
    while (tempPath !== path.dirname(tempPath)) {
      if (path.basename(tempPath) === 'marketplace') {
        marketplacePath = tempPath;
        break;
      } else if (path.basename(tempPath) === 'adapters' && path.basename(path.dirname(tempPath)) === 'marketplace') {
        marketplacePath = path.dirname(tempPath);
        break;
      } else if (path.basename(tempPath) === 'integrations' && path.basename(path.dirname(tempPath)) === 'marketplace') {
        marketplacePath = path.dirname(tempPath);
        break;
      }
      tempPath = path.dirname(tempPath);
    }
    
    // If we didn't find marketplace root, use the original logic
    if (marketplacePath === args[0]) {
      marketplacePath = path.dirname(firstFile);
      if (marketplacePath.endsWith('/scripts') || marketplacePath.endsWith('\\scripts')) {
        marketplacePath = path.dirname(marketplacePath);
      }
      if (path.basename(marketplacePath) === 'scripts') {
        marketplacePath = path.dirname(marketplacePath);
      }
    }
  } else {
    // If the path is a file, get its parent directory
    if (marketplacePath && path.extname(marketplacePath)) {
      marketplacePath = path.dirname(marketplacePath);
    }
    
    // If we're in a subdirectory (like scripts/), go up to marketplace root
    if (marketplacePath.endsWith('/scripts') || marketplacePath.endsWith('\\scripts')) {
      marketplacePath = path.dirname(marketplacePath);
    }
    
    // Final check: if we're still in scripts directory, go up one more level
    if (path.basename(marketplacePath) === 'scripts') {
      marketplacePath = path.dirname(marketplacePath);
    }
  }
  
  // Ensure we have the absolute path
  marketplacePath = path.resolve(marketplacePath);
  
  // Only use args[1] as output path if we're not in incremental mode
  const outputPath = (changedFiles.length === 0 && args[1]) ? args[1] : path.join(marketplacePath, 'types');
  
  console.log('🚀 Smart Type Generator');
  console.log(`📁 Marketplace path: ${marketplacePath}`);
  console.log(`📁 Output path: ${outputPath}`);
  if (changedFiles.length > 0) {
    console.log(`📝 Changed files: ${changedFiles.length}`);
  }
  console.log('');
  
  try {
    const generator = new SmartTypeGenerator(marketplacePath, outputPath);
    
    if (changedFiles.length > 0) {
      // Use incremental generation
      await generator.generateTypesForFiles(changedFiles);
    } else {
      // Use full generation
      await generator.generateAllTypes();
    }
    
    console.log('');
    console.log('🎉 Type generation completed successfully!');
    console.log(`📁 Generated types are available at: ${outputPath}`);
  } catch (error) {
    console.error('❌ Type generation failed:', error);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);
