#!/usr/bin/env tsx

/**
 * Comprehensive Context Migration Script
 * 
 * Migrates all template context variables from context.xxx to module.parameters.xxx
 * while preserving function parameters and API context variables.
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Template context variables that should be migrated to module.parameters
const TEMPLATE_CONTEXT_VARS = [
  'customTitle', 'customDescription', 'showTechStack', 'showComponents', 
  'showProjectStructure', 'showQuickStart', 'showArchitechBranding',
  'hasAdvancedValidation', 'hasTemplates', 'hasBulkEmail', 'hasAnalytics',
  'hasOrganizations', 'hasTeams', 'defaultModel', 'maxTokens', 'temperature',
  'hasStreaming', 'hasChat', 'hasTextGeneration', 'hasImageGeneration',
  'hasEmbeddings', 'hasFunctionCalling', 'hasTypography', 'hasForms',
  'hasAspectRatio', 'hasDarkMode', 'hasTypeScript', 'hasReact', 'hasNextJS',
  'hasAccessibility', 'hasImports', 'hasFormat', 'hasImmer', 'currency'
];

// Function parameters that should stay as context.
const FUNCTION_PARAMETER_VARS = [
  'queryKey', 'previousData', 'organizationId', 'teamId', 'teamRole'
];

// API context variables that should stay as context.
const API_CONTEXT_VARS = [
  'request', 'response', 'session', 'user', 'organization'
];

// Unknown variables that need manual review
const UNKNOWN_VARS = [
  'canViewBilling', 'canManageBilling', 'canManageSeats', 'canTrackUsage'
];

interface MigrationResult {
  file: string;
  changed: boolean;
  changes: Array<{
    from: string;
    to: string;
    line: number;
    context: string;
  }>;
  errors: string[];
}

async function findTemplateFiles(): Promise<string[]> {
  const patterns = [
    '**/*.tpl',
    '**/*.template',
    '**/templates/**/*.ts',
    '**/templates/**/*.tsx',
    '**/templates/**/*.js',
    '**/templates/**/*.jsx'
  ];
  
  const files: string[] = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern, { 
      cwd: process.cwd(),
      ignore: ['node_modules/**', 'dist/**', '.git/**']
    });
    files.push(...matches);
  }
  
  return [...new Set(files)];
}

function migrateFile(filePath: string): MigrationResult {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const changes: MigrationResult['changes'] = [];
  const errors: string[] = [];
  
  let newContent = content;
  
  // Process each line
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Find all context.xxx patterns
    const contextPattern = /context\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    
    while ((match = contextPattern.exec(line)) !== null) {
      const fullMatch = match[0];
      const property = match[1];
      
      // Determine what to do with this context variable
      if (TEMPLATE_CONTEXT_VARS.includes(property)) {
        // Migrate to module.parameters
        const replacement = `module.parameters.${property}`;
        newContent = newContent.replace(fullMatch, replacement);
        changes.push({
          from: fullMatch,
          to: replacement,
          line: lineNumber,
          context: line.trim()
        });
      } else if (FUNCTION_PARAMETER_VARS.includes(property)) {
        // Keep as context. (function parameter)
        // No change needed
      } else if (API_CONTEXT_VARS.includes(property)) {
        // Keep as context. (API context)
        // No change needed
      } else if (UNKNOWN_VARS.includes(property)) {
        // Flag for manual review
        errors.push(`Line ${lineNumber}: ${fullMatch} - needs manual review (unknown context variable)`);
      } else {
        // Unknown variable
        errors.push(`Line ${lineNumber}: ${fullMatch} - unknown context variable, needs manual review`);
      }
    }
  });
  
  const changed = newContent !== content;
  
  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
  
  return {
    file: filePath,
    changed,
    changes,
    errors
  };
}

async function main() {
  console.log('🔄 Starting comprehensive context migration...\n');
  
  const templateFiles = await findTemplateFiles();
  console.log(`📁 Found ${templateFiles.length} template files\n`);
  
  let totalChanged = 0;
  let totalChanges = 0;
  let totalErrors = 0;
  const results: MigrationResult[] = [];
  
  for (const file of templateFiles) {
    const result = migrateFile(file);
    results.push(result);
    
    if (result.changed) {
      totalChanged++;
      totalChanges += result.changes.length;
    }
    
    if (result.errors.length > 0) {
      totalErrors += result.errors.length;
    }
    
    if (result.changed || result.errors.length > 0) {
      console.log(`📝 ${file}`);
      
      if (result.changes.length > 0) {
        result.changes.forEach(change => {
          console.log(`   ✅ ${change.from} → ${change.to} (line ${change.line})`);
        });
      }
      
      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          console.log(`   ⚠️  ${error}`);
        });
      }
      console.log('');
    }
  }
  
  // Summary
  console.log('📊 Migration Summary:');
  console.log('='.repeat(50));
  console.log(`Files processed: ${templateFiles.length}`);
  console.log(`Files changed: ${totalChanged}`);
  console.log(`Total changes: ${totalChanges}`);
  console.log(`Errors/warnings: ${totalErrors}`);
  
  // Show what was migrated
  const allChanges = results.flatMap(r => r.changes);
  const migratedVars = new Set(allChanges.map(c => c.from.replace('context.', '')));
  
  if (migratedVars.size > 0) {
    console.log('\n✅ Successfully migrated variables:');
    Array.from(migratedVars).sort().forEach(varName => {
      console.log(`   - context.${varName} → module.parameters.${varName}`);
    });
  }
  
  // Show what was preserved
  const preservedVars = new Set([
    ...FUNCTION_PARAMETER_VARS,
    ...API_CONTEXT_VARS
  ]);
  
  if (preservedVars.size > 0) {
    console.log('\n🔒 Preserved variables (kept as context.):');
    Array.from(preservedVars).sort().forEach(varName => {
      console.log(`   - context.${varName} (function parameter or API context)`);
    });
  }
  
  // Show what needs manual review
  const allErrors = results.flatMap(r => r.errors);
  const unknownVars = new Set(
    allErrors
      .filter(e => e.includes('unknown context variable'))
      .map(e => e.match(/context\.([a-zA-Z_][a-zA-Z0-9_]*)/)?.[1])
      .filter(Boolean)
  );
  
  if (unknownVars.size > 0) {
    console.log('\n⚠️  Variables needing manual review:');
    Array.from(unknownVars).sort().forEach(varName => {
      console.log(`   - context.${varName} (unknown - needs manual review)`);
    });
  }
  
  if (totalChanged > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test the migrated templates');
    console.log('   2. Review and fix any unknown context variables manually');
    console.log('   3. Update template documentation');
    console.log('   4. Run tests to ensure everything works');
  } else {
    console.log('\n✨ No files needed migration - all templates are already up to date!');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { migrateFile, TEMPLATE_CONTEXT_VARS, FUNCTION_PARAMETER_VARS, API_CONTEXT_VARS };
