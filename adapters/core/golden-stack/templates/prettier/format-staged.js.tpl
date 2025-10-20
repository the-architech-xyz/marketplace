#!/usr/bin/env node

/**
 * Format Staged Files
 * 
 * Script to format only staged files using Prettier.
 * This script is used by the quality/prettier adapter for pre-commit hooks.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const CONFIG = {
  // File patterns to format
  patterns: [
    '**/*.{js,jsx,ts,tsx,json,css,scss,md,yml,yaml}',
    '!node_modules/**',
    '!.next/**',
    '!dist/**',
    '!build/**',
    '!.git/**',
  ],
  
  // Prettier options
  prettierOptions: {
    '--write': true,
    '--config': '.prettierrc',
    '--ignore-path': '.prettierignore',
  },
  
  // Exit codes
  EXIT_CODES: {
    SUCCESS: 0,
    ERROR: 1,
    NO_FILES: 2,
  },
};

/**
 * Check if Prettier is installed
 */
function checkPrettierInstalled() {
  try {
    execSync('npx prettier --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error('❌ Prettier is not installed. Please install it first:');
    console.error('   npm install --save-dev prettier');
    return false;
  }
}

/**
 * Check if Prettier config exists
 */
function checkPrettierConfig() {
  const configFiles = ['.prettierrc', '.prettierrc.js', '.prettierrc.json', 'prettier.config.js'];
  
  for (const configFile of configFiles) {
    if (fs.existsSync(configFile)) {
      return true;
    }
  }
  
  console.warn('⚠️  No Prettier configuration file found. Using default settings.');
  return false;
}

/**
 * Get staged files
 */
function getStagedFiles() {
  try {
    const command = 'git diff --cached --name-only --diff-filter=ACMR';
    const output = execSync(command, { encoding: 'utf8' });
    return output.trim().split('\n').filter(file => file.length > 0);
  } catch (error) {
    console.error('❌ Error getting staged files:', error.message);
    return [];
  }
}

/**
 * Filter files by patterns
 */
function filterFilesByPatterns(files) {
  const filteredFiles = [];
  
  for (const file of files) {
    const ext = path.extname(file);
    const supportedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md', '.yml', '.yaml'];
    
    if (supportedExtensions.includes(ext)) {
      filteredFiles.push(file);
    }
  }
  
  return filteredFiles;
}

/**
 * Format staged files using Prettier
 */
function formatStagedFiles(files) {
  if (files.length === 0) {
    console.log('✅ No staged files to format.');
    return CONFIG.EXIT_CODES.NO_FILES;
  }
  
  try {
    console.log(`🎨 Formatting ${files.length} staged files...`);
    
    const command = `npx prettier ${Object.entries(CONFIG.prettierOptions)
      .map(([key, value]) => value === true ? key : `${key} ${value}`)
      .join(' ')} ${files.join(' ')}`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('✅ All staged files formatted successfully!');
    return CONFIG.EXIT_CODES.SUCCESS;
  } catch (error) {
    console.error('❌ Error formatting staged files:', error.message);
    return CONFIG.EXIT_CODES.ERROR;
  }
}

/**
 * Check if staged files are already formatted
 */
function checkStagedFormatting(files) {
  if (files.length === 0) {
    console.log('✅ No staged files to check.');
    return CONFIG.EXIT_CODES.NO_FILES;
  }
  
  try {
    console.log('🔍 Checking if staged files are already formatted...');
    
    const command = `npx prettier --check ${files.join(' ')}`;
    execSync(command, { stdio: 'pipe' });
    
    console.log('✅ All staged files are already formatted!');
    return CONFIG.EXIT_CODES.SUCCESS;
  } catch (error) {
    // Files need formatting
    return formatStagedFiles(files);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting Prettier formatting for staged files...');
  
  // Check if Prettier is installed
  if (!checkPrettierInstalled()) {
    process.exit(CONFIG.EXIT_CODES.ERROR);
  }
  
  // Check if Prettier config exists
  checkPrettierConfig();
  
  // Get staged files
  const stagedFiles = getStagedFiles();
  
  if (stagedFiles.length === 0) {
    console.log('✅ No staged files to format.');
    process.exit(CONFIG.EXIT_CODES.NO_FILES);
  }
  
  // Filter files by supported patterns
  const filesToFormat = filterFilesByPatterns(stagedFiles);
  
  if (filesToFormat.length === 0) {
    console.log('✅ No supported files to format.');
    process.exit(CONFIG.EXIT_CODES.NO_FILES);
  }
  
  // Check if files need formatting
  const exitCode = checkStagedFormatting(filesToFormat);
  process.exit(exitCode);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  formatStagedFiles,
  checkStagedFormatting,
  getStagedFiles,
  filterFilesByPatterns,
  checkPrettierInstalled,
  checkPrettierConfig,
};
