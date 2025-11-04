#!/usr/bin/env node

/**
 * Module Schema Validator
 * 
 * Validates that all marketplace modules have complete metadata
 * for AI agent decision-making and architectural clarity.
 * 
 * This runs in the build process to ensure data quality.
 */

import { z } from 'zod';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

// ============================================================================
// SCHEMAS
// ============================================================================

const ModuleRoleSchema = z.enum([
  'adapter',
  'sdk-backend-connector',
  'framework-wiring-connector',
  'backend-feature',
  'tech-stack-layer',
  'frontend-feature'
]);

const ArchitecturalPatternSchema = z.enum([
  'sdk-driven',      // Connector acts as backend
  'custom-logic',    // Dedicated backend feature
  'infrastructure'   // Just framework wiring
]);

const RequiresCapabilitySchema = z.object({
  category: z.string().min(1, 'Category is required'),
  optional: z.boolean(),
  reason: z.string().min(10, 'Reason must be descriptive (min 10 chars)')
});

// Provides can be either string[] or object[] with {name, version, description}
const ProvidesSchema = z.union([
  z.array(z.string()),
  z.array(z.object({
    name: z.string(),
    version: z.string().optional(),
    description: z.string().optional()
  }))
]);

const AdapterSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(10, 'Description must be meaningful'),
  category: z.string(),
  provides: ProvidesSchema.optional(),
  requires: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  requiresCapabilities: z.array(RequiresCapabilitySchema).optional(),
  role: ModuleRoleSchema.optional().default('adapter'),
  // Adapters don't need pattern
});

const ConnectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(10, 'Description must be meaningful'),
  type: z.literal('connector'),
  provides: ProvidesSchema.optional(),  // Accept both formats
  requires: z.array(z.string()).optional(),  // Made optional for some connectors
  connects: z.array(z.string()).optional(),
  requiresCapabilities: z.array(RequiresCapabilitySchema).optional(),
  role: z.enum(['sdk-backend-connector', 'framework-wiring-connector']),
  pattern: ArchitecturalPatternSchema,
});

const FeatureSchema = z.object({
  id: z.string().optional(),  // Tech-stacks sometimes don't have id in file
  name: z.string(),
  description: z.string().min(10, 'Description must be meaningful'),
  type: z.enum(['feature', 'capability']),
  provides: z.array(z.string()).optional(),  // Some features don't provide anything explicitly
  requires: z.union([
    z.array(z.string()),  // Legacy format: array of module IDs
    z.object({
      components: z.record(z.string(), z.array(z.string())).optional()  // New format: component requirements per UI technology
    })
  ]).optional(),
  prerequisites: z.object({
    capabilities: z.array(z.string()).optional(),
    adapters: z.array(z.string()).optional(),
    modules: z.array(z.string()).optional()
  }).optional(),
  requiresCapabilities: z.array(RequiresCapabilitySchema).optional(),
  role: z.enum(['backend-feature', 'tech-stack-layer', 'frontend-feature']).optional(),
  pattern: ArchitecturalPatternSchema.optional(),
});

// ============================================================================
// VALIDATION LOGIC
// ============================================================================

interface ValidationResult {
  file: string;
  module: string;
  type: string;
  role?: string;
  pattern?: string;
  issues: string[];
  warnings: string[];
  score: number;
}

interface ValidationSummary {
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  results: ValidationResult[];
}

async function validateModuleFile(
  filePath: string,
  expectedType: 'adapter' | 'connector' | 'feature'
): Promise<ValidationResult> {
  const result: ValidationResult = {
    file: filePath,
    module: '',
    type: expectedType,
    issues: [],
    warnings: [],
    score: 100
  };

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(content);
    result.module = data.id || data.name || filePath;
    result.role = data.role;
    result.pattern = data.pattern;

    // Schema validation based on type
    let validationResult;
    if (expectedType === 'adapter') {
      validationResult = AdapterSchema.safeParse(data);
    } else if (expectedType === 'connector') {
      validationResult = ConnectorSchema.safeParse(data);
    } else {
      validationResult = FeatureSchema.safeParse(data);
    }

    if (!validationResult.success) {
      validationResult.error.issues.forEach((err: any) => {
        const pathStr = err.path && err.path.length > 0 ? err.path.join('.') : 'root';
        result.issues.push(`${pathStr}: ${err.message}`);
      });
    }

    // Custom validation rules
    try {
      validateArchitecturalConsistency(data, expectedType, result);
    } catch (error) {
      result.issues.push(`Architectural validation error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
    
    try {
      validateProvidesClarity(data, result);
    } catch (error) {
      result.issues.push(`Provides validation error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
    
    try {
      validateDependencyCompleteness(data, result);
    } catch (error) {
      result.issues.push(`Dependency validation error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }

    // Calculate score
    result.score = 100 - (result.issues.length * 10) - (result.warnings.length * 2);
    result.score = Math.max(0, result.score);

  } catch (error) {
    result.issues.push(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    result.score = 0;
  }

  return result;
}

function validateArchitecturalConsistency(data: any, type: string, result: ValidationResult) {
  // RULE: Tech-stack must provide schemas, stores, hooks
  if (data.role === 'tech-stack-layer' || data.id?.includes('/tech-stack')) {
    if (!data.provides || data.provides.length === 0) {
      result.issues.push('Tech-stack layer must declare provides (schemas, stores, hooks)');
    } else if (Array.isArray(data.provides)) {
      const expected = ['schemas', 'stores', 'hooks'];
      const hasAll = expected.every(e => 
        data.provides.some((p: string) => p.includes(e) || p === 'unknown')
      );
      if (!hasAll) {
        result.warnings.push(`Tech-stack should provide: schemas, stores, and hooks`);
      }
    }
  }

  // RULE: Backend (connector or feature) must declare role
  if (data.id?.includes('/backend/') && !data.role) {
    result.warnings.push('Backend implementation should declare role (backend-feature or sdk-backend-connector)');
  }

  // RULE: Connectors must have role and pattern
  if (type === 'connector') {
    if (!data.role) {
      result.issues.push('Connector must declare role (sdk-backend-connector or framework-wiring-connector)');
    }
    if (!data.pattern) {
      result.issues.push('Connector must declare pattern (sdk-driven, custom-logic, or infrastructure)');
    }
  }

  // RULE: SDK-backend-connector must use sdk-driven pattern
  if (data.role === 'sdk-backend-connector' && data.pattern !== 'sdk-driven') {
    result.issues.push('SDK-backend-connector must use sdk-driven pattern');
  }

  // RULE: Backend-feature must use custom-logic pattern
  if (data.role === 'backend-feature' && data.pattern !== 'custom-logic') {
    result.issues.push('Backend-feature must use custom-logic pattern');
  }
}

function validateProvidesClarity(data: any, result: ValidationResult) {
  if (!data.provides) {
    return; // Not all modules need provides
  }

  // Handle both array and non-array provides
  const providesArray = Array.isArray(data.provides) ? data.provides : [data.provides];

  // RULE: No "unknown" in provides
  const hasUnknown = providesArray.some((p: any) => p === 'unknown');
  if (hasUnknown) {
    result.warnings.push('Replace "unknown" in provides with actual capability names');
  }

  // RULE: No unresolved template variables
  const hasTemplates = providesArray.some((p: any) => typeof p === 'string' && p.includes('{{'));
  if (hasTemplates) {
    result.warnings.push('Provides contains template variables - these will be filtered in slim manifest');
  }
}

function validateDependencyCompleteness(data: any, result: ValidationResult) {
  // RULE: requiresCapabilities should have meaningful reasons
  if (data.requiresCapabilities && Array.isArray(data.requiresCapabilities)) {
    data.requiresCapabilities.forEach((req: any, index: number) => {
      if (req && req.reason && req.reason.length < 20) {
        result.warnings.push(`requiresCapabilities[${index}].reason is too brief - be more descriptive`);
      }
    });
  }

  // RULE: Backend modules should have requiresCapabilities
  if (['backend-feature', 'sdk-backend-connector'].includes(data.role)) {
    if (!data.requiresCapabilities || data.requiresCapabilities.length === 0) {
      // Check if they use database or auth
      const needsDb = data.description?.toLowerCase().includes('database') || 
                      data.description?.toLowerCase().includes('store') ||
                      data.description?.toLowerCase().includes('persist');
      const needsAuth = data.description?.toLowerCase().includes('user') ||
                        data.description?.toLowerCase().includes('session') ||
                        data.description?.toLowerCase().includes('auth');
      
      if (needsDb || needsAuth) {
        result.warnings.push('Backend module likely needs requiresCapabilities (mentions database/auth in description)');
      }
    }
  }
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

async function validateAllModules(): Promise<ValidationSummary> {
  console.log('🔍 Validating Module Metadata Schemas...\n');

  const summary: ValidationSummary = {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    results: []
  };

  // Validate Adapters
  console.log('📦 Validating adapters...');
  const adapterFiles = await glob('adapters/**/adapter.json', { cwd: process.cwd() });
  for (const file of adapterFiles) {
    const result = await validateModuleFile(file, 'adapter');
    summary.results.push(result);
    summary.total++;
    if (result.issues.length === 0) {
      summary.passed++;
    } else {
      summary.failed++;
    }
    summary.warnings += result.warnings.length;
  }
  console.log(`   ✅ Validated ${adapterFiles.length} adapters\n`);

  // Validate Connectors
  console.log('🔗 Validating connectors...');
  const connectorFiles = await glob('connectors/**/connector.json', { cwd: process.cwd() });
  for (const file of connectorFiles) {
    const result = await validateModuleFile(file, 'connector');
    summary.results.push(result);
    summary.total++;
    if (result.issues.length === 0) {
      summary.passed++;
    } else {
      summary.failed++;
    }
    summary.warnings += result.warnings.length;
  }
  console.log(`   ✅ Validated ${connectorFiles.length} connectors\n`);

  // Validate Features
  console.log('✨ Validating features...');
  const featureFiles = await glob('features/**/feature.json', { cwd: process.cwd() });
  for (const file of featureFiles) {
    const result = await validateModuleFile(file, 'feature');
    summary.results.push(result);
    summary.total++;
    if (result.issues.length === 0) {
      summary.passed++;
    } else {
      summary.failed++;
    }
    summary.warnings += result.warnings.length;
  }
  console.log(`   ✅ Validated ${featureFiles.length} features\n`);

  return summary;
}

function printResults(summary: ValidationSummary) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 MODULE SCHEMA VALIDATION RESULTS');
  console.log('='.repeat(80) + '\n');

  // Group by status
  const failed = summary.results.filter(r => r.issues.length > 0);
  const warnings = summary.results.filter(r => r.issues.length === 0 && r.warnings.length > 0);
  const perfect = summary.results.filter(r => r.issues.length === 0 && r.warnings.length === 0);

  // Print failures
  if (failed.length > 0) {
    console.log(`❌ FAILED (${failed.length} modules):\n`);
    failed.forEach(r => {
      console.log(`   ${r.module} (${r.file})`);
      console.log(`   Role: ${r.role || 'not set'}, Pattern: ${r.pattern || 'not set'}`);
      r.issues.forEach(issue => console.log(`      ❌ ${issue}`));
      if (r.warnings.length > 0) {
        r.warnings.forEach(warning => console.log(`      ⚠️  ${warning}`));
      }
      console.log();
    });
  }

  // Print warnings
  if (warnings.length > 0 && failed.length === 0) {
    console.log(`⚠️  WARNINGS (${warnings.length} modules):\n`);
    warnings.slice(0, 10).forEach(r => {  // Show first 10
      console.log(`   ${r.module}`);
      r.warnings.forEach(warning => console.log(`      ⚠️  ${warning}`));
    });
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more with warnings\n`);
    }
  }

  // Summary
  console.log('\n' + '-'.repeat(80));
  console.log(`📈 Summary:`);
  console.log(`   Total:     ${summary.total}`);
  console.log(`   ✅ Perfect: ${perfect.length} (${((perfect.length / summary.total) * 100).toFixed(1)}%)`);
  console.log(`   ⚠️  Warnings: ${warnings.length} (${((warnings.length / summary.total) * 100).toFixed(1)}%)`);
  console.log(`   ❌ Failed:  ${failed.length} (${((failed.length / summary.total) * 100).toFixed(1)}%)`);
  console.log('-'.repeat(80) + '\n');

  // Module Role Coverage
  console.log('📊 Module Role Coverage:');
  const roleCount = new Map<string, number>();
  summary.results.forEach(r => {
    const role = r.role || 'not-set';
    roleCount.set(role, (roleCount.get(role) || 0) + 1);
  });
  Array.from(roleCount.entries()).sort((a, b) => b[1] - a[1]).forEach(([role, count]) => {
    const percentage = ((count / summary.total) * 100).toFixed(1);
    console.log(`   ${role.padEnd(30)} ${count}/${summary.total} (${percentage}%)`);
  });

  // Pattern Coverage
  console.log('\n📊 Pattern Coverage:');
  const patternCount = new Map<string, number>();
  summary.results.forEach(r => {
    if (r.pattern) {
      patternCount.set(r.pattern, (patternCount.get(r.pattern) || 0) + 1);
    }
  });
  const noPattern = summary.results.filter(r => !r.pattern).length;
  Array.from(patternCount.entries()).sort((a, b) => b[1] - a[1]).forEach(([pattern, count]) => {
    const percentage = ((count / summary.total) * 100).toFixed(1);
    console.log(`   ${pattern.padEnd(30)} ${count}/${summary.total} (${percentage}%)`);
  });
  console.log(`   ${'not-set'.padEnd(30)} ${noPattern}/${summary.total} (${((noPattern / summary.total) * 100).toFixed(1)}%)`);

  console.log();
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  try {
    const summary = await validateAllModules();
    printResults(summary);

    // Exit with error if any module failed
    if (summary.failed > 0) {
      console.error(`\n❌ Validation failed: ${summary.failed} modules have schema errors`);
      console.error('Please fix the issues above before building.\n');
      process.exit(1);
    }

    if (summary.warnings > 0) {
      console.log(`\n⚠️  ${summary.warnings} warnings found - consider addressing them for better AI agent quality`);
      console.log('Build will continue...\n');
    } else {
      console.log('✅ All module schemas are valid!\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Validation script error:', error);
    process.exit(1);
  }
}

main();

