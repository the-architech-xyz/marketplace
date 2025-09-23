#!/usr/bin/env node

/**
 * Type Generator Script for The Architech Marketplace
 * 
 * This script runs the TypeScript type generator to create type definitions
 * from adapter.json files.
 */

// Run the TypeScript file using ts-node
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});

// Execute the generator
require('./generate-types.ts');

