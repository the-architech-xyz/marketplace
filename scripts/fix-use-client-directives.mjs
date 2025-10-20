#!/usr/bin/env node

/**
 * Automated "use client" Directive Fixer
 * 
 * Scans all .tsx.tpl templates, detects React hooks usage,
 * and adds "use client" directive if missing.
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React hooks that require "use client"
const CLIENT_HOOKS = [
  'useState',
  'useEffect',
  'useReducer',
  'useContext',
  'useCallback',
  'useMemo',
  'useRef',
  'useImperativeHandle',
  'useLayoutEffect',
  'useDebugValue',
  'useId',
  'useTransition',
  'useDeferredValue',
  'useSyncExternalStore',
  'useInsertionEffect',
];

// Next.js client-only hooks
const NEXTJS_CLIENT_HOOKS = [
  'useRouter',
  'usePathname',
  'useSearchParams',
  'useParams',
  'useSelectedLayoutSegment',
  'useSelectedLayoutSegments',
];

const ALL_CLIENT_HOOKS = [...CLIENT_HOOKS, ...NEXTJS_CLIENT_HOOKS];

/**
 * Check if file uses any client hooks
 */
function usesClientHooks(content) {
  for (const hook of ALL_CLIENT_HOOKS) {
    // Check for import with hook
    const importRegex = new RegExp(`import.*\\{[^}]*\\b${hook}\\b[^}]*\\}`, 'g');
    if (importRegex.test(content)) {
      return true;
    }
    
    // Check for direct usage
    const usageRegex = new RegExp(`\\b${hook}\\s*\\(`, 'g');
    if (usageRegex.test(content)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if file already has "use client" directive
 */
function hasUseClientDirective(content) {
  const lines = content.split('\n');
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    if (line === '"use client";' || line === "'use client';") {
      return true;
    }
  }
  return false;
}

/**
 * Add "use client" directive to file
 * Adds it after comments but before imports
 */
function addUseClientDirective(content) {
  const lines = content.split('\n');
  let insertIndex = 0;
  
  // Skip opening comments
  let inBlockComment = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Handle block comments
    if (line.startsWith('/*')) inBlockComment = true;
    if (inBlockComment) {
      if (line.includes('*/')) {
        inBlockComment = false;
        insertIndex = i + 1;
      }
      continue;
    }
    
    // Handle single-line comments at start
    if (line.startsWith('//') || line === '') {
      insertIndex = i + 1;
      continue;
    }
    
    // Found first non-comment line
    break;
  }
  
  // Insert "use client" with proper spacing
  const before = lines.slice(0, insertIndex);
  const after = lines.slice(insertIndex);
  
  // Add blank line after comments if needed
  if (before.length > 0 && before[before.length - 1].trim() !== '') {
    before.push('');
  }
  
  // Add "use client" directive
  before.push('"use client";');
  
  // Add blank line before imports if needed
  if (after.length > 0 && after[0].trim() !== '') {
    before.push('');
  }
  
  return [...before, ...after].join('\n');
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it uses client hooks
    if (!usesClientHooks(content)) {
      return { status: 'skip', reason: 'No client hooks detected' };
    }
    
    // Check if it already has "use client"
    if (hasUseClientDirective(content)) {
      return { status: 'skip', reason: 'Already has "use client"' };
    }
    
    // Add "use client" directive
    const updated = addUseClientDirective(content);
    fs.writeFileSync(filePath, updated, 'utf8');
    
    return { status: 'fixed', reason: 'Added "use client" directive' };
  } catch (error) {
    return { status: 'error', reason: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning for .tsx.tpl files...\n');
  
  // Find all .tsx.tpl files in features
  const files = await glob('features/**/*.tsx.tpl', {
    cwd: path.join(__dirname, '..'),
    absolute: true,
  });
  
  console.log(`📊 Found ${files.length} template files\n`);
  
  const results = {
    fixed: [],
    skipped: [],
    errors: [],
  };
  
  // Process each file
  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    const result = processFile(file);
    
    if (result.status === 'fixed') {
      results.fixed.push({ path: relativePath, reason: result.reason });
      console.log(`✅ FIXED: ${relativePath}`);
    } else if (result.status === 'error') {
      results.errors.push({ path: relativePath, reason: result.reason });
      console.log(`❌ ERROR: ${relativePath} - ${result.reason}`);
    } else {
      results.skipped.push({ path: relativePath, reason: result.reason });
      // console.log(`⏭️  SKIP: ${relativePath} - ${result.reason}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Fixed: ${results.fixed.length} files`);
  console.log(`⏭️  Skipped: ${results.skipped.length} files`);
  console.log(`❌ Errors: ${results.errors.length} files`);
  console.log('='.repeat(80));
  
  if (results.fixed.length > 0) {
    console.log('\n✨ Successfully added "use client" to:');
    results.fixed.forEach(({ path }) => console.log(`  - ${path}`));
  }
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors occurred in:');
    results.errors.forEach(({ path, reason }) => console.log(`  - ${path}: ${reason}`));
    process.exit(1);
  }
  
  console.log('\n🎉 Done!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});



