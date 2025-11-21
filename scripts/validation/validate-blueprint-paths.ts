#!/usr/bin/env tsx

/**
 * Blueprint Path Validation Script
 * 
 * Validates that all blueprint files use valid path tokens (e.g. paths.someKey)
 * that exist in the framework adapter configuration.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import { PathKey } from '@thearchitech.xyz/types';

interface ValidationResult {
  file: string;
  valid: boolean;
  missingPaths: string[];
  usedPaths: string[];
  errors: string[];
}

/**
 * Extract path variables from a template string
 */
function extractPathVariables(template: string): string[] {
  const pathVariableRegex = /\{\{paths\.([^}]+)\}\}/g;
  const pathKeys: string[] = [];
  let match;

  while ((match = pathVariableRegex.exec(template)) !== null) {
    const pathKey = match[1];
    if (!pathKeys.includes(pathKey)) {
      pathKeys.push(pathKey);
    }
  }

  return pathKeys;
}

/**
 * Get all valid path keys from the PathKey enum
 */
function getValidPathKeys(): string[] {
  return Object.values(PathKey);
}

/**
 * Validate a single blueprint file
 */
async function validateBlueprintFile(filePath: string): Promise<ValidationResult> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const usedPaths = extractPathVariables(content);
    const validPathKeys = getValidPathKeys();
    
    const missingPaths: string[] = [];
    const errors: string[] = [];
    
    // Check if all used paths are valid
    for (const usedPath of usedPaths) {
      if (!validPathKeys.includes(usedPath)) {
        missingPaths.push(usedPath);
        errors.push(`Invalid path key: '${usedPath}' is not defined in PathKey enum`);
      }
    }
    
    const valid = missingPaths.length === 0;
    
    return {
      file: filePath,
      valid,
      missingPaths,
      usedPaths,
      errors
    };
  } catch (error) {
    return {
      file: filePath,
      valid: false,
      missingPaths: [],
      usedPaths: [],
      errors: [`Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
}

/**
 * Main validation function
 */
async function validateAllBlueprints(): Promise<void> {
  console.log('🔍 Starting Blueprint Path Validation...\n');
  
  try {
    // Find all blueprint files
    const blueprintFiles = await glob('**/blueprint.ts', {
      cwd: process.cwd(),
      absolute: true
    });
    
    console.log(`📁 Found ${blueprintFiles.length} blueprint files\n`);
    
    const results: ValidationResult[] = [];
    let validCount = 0;
    let invalidCount = 0;
    
    // Validate each blueprint file
    for (const filePath of blueprintFiles) {
      const result = await validateBlueprintFile(filePath);
      results.push(result);
      
      if (result.valid) {
        validCount++;
        console.log(`✅ ${path.relative(process.cwd(), result.file)}`);
      } else {
        invalidCount++;
        console.log(`❌ ${path.relative(process.cwd(), result.file)}`);
        for (const error of result.errors) {
          console.log(`   • ${error}`);
        }
        if (result.usedPaths.length > 0) {
          console.log(`   • Used paths: ${result.usedPaths.join(', ')}`);
        }
        if (result.missingPaths.length > 0) {
          console.log(`   • Missing paths: ${result.missingPaths.join(', ')}`);
        }
      }
    }
    
    console.log('\n📊 Validation Summary:');
    console.log(`   • Total files: ${blueprintFiles.length}`);
    console.log(`   • Valid files: ${validCount}`);
    console.log(`   • Invalid files: ${invalidCount}`);
    
    if (invalidCount > 0) {
      console.log('\n❌ Validation failed! Some blueprints use invalid path keys.');
      console.log('\n🔧 Available path keys:');
      const validPathKeys = getValidPathKeys();
      validPathKeys.forEach(key => {
        console.log(`   • ${key}`);
      });
      process.exit(1);
    } else {
      console.log('\n✅ All blueprints use valid path keys!');
      console.log('🎉 Path validation system is working correctly.');
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

// Run the validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAllBlueprints().catch(console.error);
}

export { validateAllBlueprints, validateBlueprintFile };
