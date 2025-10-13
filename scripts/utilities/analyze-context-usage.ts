#!/usr/bin/env tsx

/**
 * Context Usage Analysis Script
 * 
 * Analyzes all context. usage patterns across templates and categorizes them
 * to determine the proper replacement strategy.
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface ContextUsage {
  file: string;
  line: number;
  pattern: string;
  context: string;
  category: 'template_context' | 'function_parameter' | 'api_context' | 'unknown';
  suggestedReplacement: string;
}

const CATEGORIES = {
  // Template context variables (should be module.parameters)
  template_context: [
    'customTitle', 'customDescription', 'showTechStack', 'showComponents', 
    'showProjectStructure', 'showQuickStart', 'showArchitechBranding',
    'hasAdvancedValidation', 'hasTemplates', 'hasBulkEmail', 'hasAnalytics',
    'hasOrganizations', 'hasTeams', 'defaultModel', 'maxTokens', 'temperature',
    'hasStreaming', 'hasChat', 'hasTextGeneration', 'hasImageGeneration',
    'hasEmbeddings', 'hasFunctionCalling', 'hasTypography', 'hasForms',
    'hasAspectRatio', 'hasDarkMode', 'hasTypeScript', 'hasReact', 'hasNextJS',
    'hasAccessibility', 'hasImports', 'hasFormat', 'hasImmer', 'currency'
  ],
  
  // Function parameters (should stay as context)
  function_parameter: [
    'previousData', 'queryKey', 'teamRole', 'userId', 'organizationId',
    'role', 'teamId', 'teamRole'
  ],
  
  // API/Service context (should stay as context)
  api_context: [
    'request', 'response', 'session', 'user', 'organization'
  ]
};

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

function analyzeFile(filePath: string): ContextUsage[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const usages: ContextUsage[] = [];
  
  const contextPattern = /context\.([a-zA-Z_][a-zA-Z0-9_]*)/g;
  
  lines.forEach((line, index) => {
    let match;
    while ((match = contextPattern.exec(line)) !== null) {
      const pattern = match[0];
      const property = match[1];
      
      // Determine category
      let category: ContextUsage['category'] = 'unknown';
      let suggestedReplacement = pattern;
      
      if (CATEGORIES.template_context.includes(property)) {
        category = 'template_context';
        suggestedReplacement = `module.parameters.${property}`;
      } else if (CATEGORIES.function_parameter.includes(property)) {
        category = 'function_parameter';
        suggestedReplacement = pattern; // Keep as is
      } else if (CATEGORIES.api_context.includes(property)) {
        category = 'api_context';
        suggestedReplacement = pattern; // Keep as is
      }
      
      usages.push({
        file: filePath,
        line: index + 1,
        pattern,
        context: line.trim(),
        category,
        suggestedReplacement
      });
    }
  });
  
  return usages;
}

async function main() {
  console.log('🔍 Analyzing context usage patterns...\n');
  
  const templateFiles = await findTemplateFiles();
  console.log(`📁 Found ${templateFiles.length} template files\n`);
  
  const allUsages: ContextUsage[] = [];
  
  for (const file of templateFiles) {
    const usages = analyzeFile(file);
    allUsages.push(...usages);
  }
  
  // Group by category
  const byCategory = allUsages.reduce((acc, usage) => {
    if (!acc[usage.category]) acc[usage.category] = [];
    acc[usage.category].push(usage);
    return acc;
  }, {} as Record<string, ContextUsage[]>);
  
  // Print analysis
  console.log('📊 Context Usage Analysis:\n');
  
  for (const [category, usages] of Object.entries(byCategory)) {
    console.log(`## ${category.toUpperCase()} (${usages.length} usages)`);
    console.log('='.repeat(50));
    
    // Group by property
    const byProperty = usages.reduce((acc, usage) => {
      const property = usage.pattern.replace('context.', '');
      if (!acc[property]) acc[property] = [];
      acc[property].push(usage);
      return acc;
    }, {} as Record<string, ContextUsage[]>);
    
    for (const [property, propertyUsages] of Object.entries(byProperty)) {
      console.log(`\n### ${property} (${propertyUsages.length} usages)`);
      
      const firstUsage = propertyUsages[0];
      console.log(`**Suggested replacement:** ${firstUsage.suggestedReplacement}`);
      
      if (propertyUsages.length <= 3) {
        propertyUsages.forEach(usage => {
          console.log(`  - ${usage.file}:${usage.line} - ${usage.context}`);
        });
      } else {
        console.log(`  - ${propertyUsages.length} usages across ${new Set(propertyUsages.map(u => u.file)).size} files`);
        propertyUsages.slice(0, 2).forEach(usage => {
          console.log(`  - ${usage.file}:${usage.line} - ${usage.context}`);
        });
        console.log(`  - ... and ${propertyUsages.length - 2} more`);
      }
    }
    console.log('');
  }
  
  // Summary
  console.log('📋 SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Total context usages: ${allUsages.length}`);
  console.log(`Template context (needs migration): ${byCategory.template_context?.length || 0}`);
  console.log(`Function parameters (keep as is): ${byCategory.function_parameter?.length || 0}`);
  console.log(`API context (keep as is): ${byCategory.api_context?.length || 0}`);
  console.log(`Unknown (needs manual review): ${byCategory.unknown?.length || 0}`);
  
  // Generate migration recommendations
  console.log('\n🎯 MIGRATION RECOMMENDATIONS:');
  console.log('='.repeat(50));
  
  if (byCategory.template_context?.length > 0) {
    console.log('\n1. TEMPLATE CONTEXT VARIABLES (Migrate to module.parameters):');
    const templateProps = new Set(byCategory.template_context.map(u => u.pattern.replace('context.', '')));
    templateProps.forEach(prop => {
      console.log(`   - context.${prop} → module.parameters.${prop}`);
    });
  }
  
  if (byCategory.function_parameter?.length > 0) {
    console.log('\n2. FUNCTION PARAMETERS (Keep as context.):');
    const funcProps = new Set(byCategory.function_parameter.map(u => u.pattern.replace('context.', '')));
    funcProps.forEach(prop => {
      console.log(`   - context.${prop} (function parameter - keep as is)`);
    });
  }
  
  if (byCategory.unknown?.length > 0) {
    console.log('\n3. UNKNOWN USAGES (Manual review needed):');
    const unknownProps = new Set(byCategory.unknown.map(u => u.pattern.replace('context.', '')));
    unknownProps.forEach(prop => {
      console.log(`   - context.${prop} (needs manual review)`);
    });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { analyzeFile, CATEGORIES };
