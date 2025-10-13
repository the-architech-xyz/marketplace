#!/usr/bin/env tsx

/**
 * Blueprint IDE Type Generator CLI
 * 
 * Generates TypeScript declaration files for blueprints to provide
 * IDE IntelliSense, autocomplete, and type validation.
 */

import { BlueprintIDETypeGenerator } from './generate-blueprint-ide-types.js';
import * as path from 'path';

async function main() {
  console.log('🚀 Blueprint IDE Type Generator');
  
  // Get paths
  const marketplacePath = process.cwd();
  const outputPath = path.join(marketplacePath, 'types');
  
  console.log(`📁 Marketplace path: ${marketplacePath}`);
  console.log(`📁 Output path: ${outputPath}`);
  
  try {
    // Generate IDE types
    const generator = new BlueprintIDETypeGenerator(marketplacePath, outputPath);
    await generator.generateAllBlueprintTypes();
    
    console.log('\n🎉 Blueprint IDE type generation completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Import blueprint types in your blueprint files');
    console.log('   2. Use the generated interfaces for type safety');
    console.log('   3. Enjoy full IDE IntelliSense and validation!');
    
  } catch (error) {
    console.error('❌ Blueprint IDE type generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
